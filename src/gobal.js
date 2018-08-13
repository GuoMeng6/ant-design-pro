import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';

moment.locale('zh-cn');
const env = 'dev';
// let env = 'dev';
// const env = 'prod';

let API_URL = 'http://39.108.86.241:9201';
if (env === 'prod') {
  API_URL = 'http://39.108.86.241:9201';
} else if (env === 'dev') {
  API_URL = 'http://192.168.1.141:7001';
  // API_URL = 'http://39.108.86.241:9201';
}
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Ocp-Apim-Trace'] = true;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['X-Client'] = 'WEB';
axios.defaults.baseURL = API_URL;

export default {
  API_URL,
  env,
  _,
  moment,
  axios,
};
