// 接口类

const baseUrl = 'http://localhost:7001';

const Inter = {};
// 根据type获取products
Inter.getProductsByType = `${baseUrl}/getProductsByType`;

// 添加某个product
Inter.addProduct = `${baseUrl}/addProduct`;

// 上传图片
Inter.uploadImg = `${baseUrl}/uploadImg`;

/**
 * 搜索查询  post
 * @param type 类型
 * @param keyword 关键词
 * @param search 0: title 1: tag
 */
Inter.searchProducts = `${baseUrl}/searchProduct`;

export default Inter;
