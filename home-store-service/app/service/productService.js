const Service = require('egg').Service;

class ProductService extends Service {
  async uploadImg() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = new Date().getTime() + stream.filename;
    const localPath = 'localhost:7001/public/img/';
    // 设置存储本地服务器的路径
    const target = path.join(this.config.baseDir, 'app/public/img', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
      // ctx.body = Response.success("0000_0", localPath + filename);
      return localPath + filename;
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      return false;
    }    
  }
}

module.exports = ProductService;