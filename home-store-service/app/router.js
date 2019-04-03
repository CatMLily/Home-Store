'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getAllProducts', controller.product.getAllProducts);
  router.get('/getProductsByType', controller.product.getProductsByType);
  router.post('/uploadImg', controller.product.uploadImg);
  router.post('/addProduct', controller.product.addProduct);
  router.post('/searchProduct', controller.product.searchProduct);
};
