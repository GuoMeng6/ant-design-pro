import { message } from 'antd';
import { getCustomerList, addCustomer, editCustomer, resetPassword } from '../services/api';

export default {
  namespace: 'manaCustomer',
  state: {
    data: {
      rows: [],
      currentPage: 1,
      currentNum: 15,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getCustomerList, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'save',
          payload: response.data,
        });
      } else {
        message.error('请求失败');
      }
    },
    *addCustomer({ payload }, { call }) {
      const response = yield call(addCustomer, payload);
      payload.callback(response);
      if (response && response.status === 'success') {
        message.success(response.data.data.msg);
      } else {
        const { errors } = response.message;
        if (!errors[0]) {
          return message.error('添加失败');
        }
        message.error(`${errors[0].field} ${errors[0].message}`);
      }
    },
    *editCustomer({ payload }, { call }) {
      const response = yield call(editCustomer, payload);
      payload.callback(response);
      if (response && response.status === 'success') {
        message.success(response.data.data.msg);
      } else {
        const { errors } = response.message;
        if (!errors[0]) {
          return message.error('编辑失败');
        }
        message.error(`${errors[0].field} ${errors[0].message}`);
      }
    },
    *resetPassword({ payload }, { call }) {
      const response = yield call(resetPassword, payload);
      payload.callback(response);
      if (response && response.status === 'success') {
        message.success(response.data.data.msg);
      } else {
        const { errors } = response.message;
        if (!errors[0]) {
          return message.error('重置密码失败');
        }
        message.error(`${errors[0].field} ${errors[0].message}`);
      }
    },
  },

  reducers: {
    save(state, action) {
      const { currentPage } = action.payload;
      return {
        ...state,
        data: {
          ...action.payload,
          currentPage: Number(currentPage),
          currentNum: state.data.currentNum,
        },
      };
    },
  },
};
