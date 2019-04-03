module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Op = app.Sequelize.Op;
  const defaultConfig = {
    // 一些配置
    createdAt: 'createTime',
    updatedAt: false,
    freezeTableName: true,
  }
  const ProductModel = {
    // 字段
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: STRING,
    img: STRING,
    type: INTEGER,
    tags: STRING,
    price: STRING,
    source: INTEGER,
    is_delete: INTEGER,
  }
  const Product = app.model.define('tbl_products_info', ProductModel, defaultConfig);

  Product.findById = async function(id) {
    return await this.findOne({
      where: {
        id: id
      }
    });
  }

  Product.findByType = async function (type) {
    return await this.findAll({
      where: {
        type: type,
      }
    })
  }

  Product.findBySearchTitle = async function (type, keyword) {
    return await this.findAll({
      where: {
        type: type,
        title: {
          [Op.like]: '%' + keyword + '%',
        }
      }
    })
  }

  Product.findBySearchTags = async function (type, keyword) {
    return await this.findAll({
      where: {
        type: type,
        tags: {
          [Op.like]: '%' + keyword + '%',
        }
      }
    })
  }
  return Product;
};