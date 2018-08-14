import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';

moment.locale('zh-cn');
const env = 'dev';
// let env = 'dev';
// const env = 'prod';

const API_URL = '/space';
// if (env === 'prod') {
//   API_URL = 'http://39.108.86.241:9201';
// } else if (env === 'dev') {
//   API_URL = 'http://192.168.1.141:7001';
//   // API_URL = 'http://39.108.86.241:9201';
// }

export default {
  API_URL,
  env,
  _,
  moment,
  axios,
};
