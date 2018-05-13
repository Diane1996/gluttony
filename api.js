var NewApiRootUrl = 'http://127.0.0.1:8360/api/';

module.exports = {
  cartAdd: NewApiRootUrl + 'cart/add',
  cartUpdate: NewApiRootUrl + 'cart/update',
  cartDelete: NewApiRootUrl + 'cart/delete',
  cartList: NewApiRootUrl + 'cart/getCart',

  // 需要调用微信接口
  login: NewApiRootUrl + 'login/index',

  orderCreate: NewApiRootUrl + 'order/create',
  orderPayment: NewApiRootUrl + 'order/payment',
  orderCancel: NewApiRootUrl + 'order/cancel',

//   orderShippingAdd: NewApiRootUrl + 'orderShipping/add',
//   orderShippingUpdate: NewApiRootUrl + 'orderShipping/update',
//   orderShippingDelete: NewApiRootUrl + 'orderShipping/delete',
//   orderShippingFindAll: NewApiRootUrl + 'orderShipping/findAll',

  restaurant: NewApiRootUrl + 'restaurant/index',

  // 获取分类
  categoryFindAll: NewApiRootUrl + 'category/index',

  // 获取食物
  foodFindAll: NewApiRootUrl + 'food/index',
  getFoodListByOrderId: NewApiRootUrl + 'food/getFoodListByOrderId',

  // 地址
  getAllAddress: NewApiRootUrl + 'orderShipping/findAll',
  deleteAddress: NewApiRootUrl + 'orderShipping/deleteAddress',
  updateAddress: NewApiRootUrl + 'orderShipping/update',
  addAddress: NewApiRootUrl + 'orderShipping/add',


    // 订单获取
  getAllOrderList: NewApiRootUrl + 'order/findAll',
  getOrderDetail: NewApiRootUrl + 'order/getOneDetail',
};
