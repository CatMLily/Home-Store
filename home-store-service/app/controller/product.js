'use strict'

const { Controller } = require('egg');
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const Response = require('../common/Response');

class ProductController extends Controller {

  async getAllProducts() {
    const { ctx } = this;
    const products = await ctx.model.Product.findAll();
    if (products) {
      ctx.body = Response.success("0000_0", products);
    } else {
      ctx.body = Response.failure("0000_1");
    }
  }

  async getProductsByType() {
    const { ctx } = this;
    const type = ctx.query.type;
    const products = await ctx.model.Product.findByType(type);
    if (products) {
      ctx.body = Response.success("0000_0", products);
    } else {
      ctx.body = Response.failure("0000_1");
    }
  }

  async addProduct() {
    const { ctx } = this;
    const req = ctx.request.body;
    const prodectModel = {
      title: req.title,
      tags: req.tags,
      type: req.type,
      img: req.img,
    }
    const product = await ctx.model.Product.create(prodectModel);
    if(product) {
      ctx.body = Response.success("0000_0", "新增成功");
    } else {
      ctx.body = Response.failure("0000_1");
    }
  }

  async uploadImg() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = new Date().getTime() + stream.filename;
    const localPath = 'http://localhost:7001/public/img/';
    // 设置存储本地服务器的路径
    const target = path.join(this.config.baseDir, 'app/public/img', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
      ctx.body = Response.success("0000_0", localPath + filename);
      return localPath + filename;
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      ctx.body = Response.failure("0000_1");
    } 
  }

  // 关键字搜索
  async searchProduct() {
    const { ctx } = this;
    const searchReq = ctx.request.body;
    const { type, searchType, keyword } = searchReq;
    // searchType 0: 根据title搜索， 1: 根据tag搜索
    switch(searchType) {
      case 'title':
        const productsByTitle = await ctx.model.Product.findBySearchTitle(type, keyword);
        if(productsByTitle) {
          ctx.body = Response.success("0000_0", productsByTitle);
        } else {
          ctx.body = Response.failure("0000_1");
        }
        break;
      case 'tag':
        const productsBytag = await ctx.model.Product.findBySearchTags(type, keyword);
        if(productsBytag) {
          ctx.body = Response.success("0000_0", productsBytag);
        } else {
          ctx.body = Response.failure("0000_1");
        }
        break;
      default:
        ctx.body = Response.failure('0001_1', '搜索类型错误');
        break;
    }
  }
}

module.exports = ProductController;