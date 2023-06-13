const MONEY_FACTORY = 'https://api.moneyfactory.ai';
const MONEY_FACTORY_IMAGE = 'https://www.moneyfactory.ai';
const apis = {
  login: `/api/users/login`,
  navigationDecider: '/api/quants/isusersubscried',
  signup: `/api/users`,
  sendOTP: 'api/users/sendOTP',
  confirmOTP: 'api/users/confirmOTP',
  categories: '/api/all/categories',
  quants: '/api/all/quants',
  profileEdit: '/api/profile/updateaddress',
  myQuants: '/api/quants/activequants',
  quantDetails: '/api/discover/quants',
  brokers: '/api/all/brokers',
  savedBroker: '/api/smallcase/savedbroker',
  deployQuants: '/api/quants/deployquants',
  validateSignup: '/api/users/validate',
  orders: '/api/profile/orders',
  subscription: '/api/profile/subscriptions/create',
  subscribedQuants: '/api/quants/getsubscribequants',
  subscribedAQuant: '/api/quants/subscribequants',
  createPayment: '/api/profile/payment/create',
  resetPassword: '/api/users/reset',
  openOrders: '/api/stock/stockOrders',
  brokerList: '/api/smallcase/savedbroker',
  createTransaction: '/api/smallcase/createTransaction',
  transaction: '/api/smallcase/transaction',
  addbroker: '/api/smallcase/addbroker',
  createSignal: '/api/broker/create/signals',
  referralCode: '/api/profile/referralid',
  cash: '/api/users/referralReward',
  getUserEmail: '/api/profile/checkphone',
  getUserPhone: '/api/profile/userphone',
  testimonials: '/api/testimonial',
  video: '/api/all/media',
  trendingQuants: '/api/all/trendingquants',
  holding: '/api/smallcase/holding',
};

export default apis;
export {MONEY_FACTORY};
export {MONEY_FACTORY_IMAGE};
