import { message } from 'antd';
import { getPersonnelList, addPerson } from '../services/api';

export default {
  namespace: 'manaPerson',
  state: {
    data: {
      rows: [],
      currentPage: 1,
      currentNum: 15,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getPersonnelList, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'save',
          payload: response.data,
        });
      } else {
        message.error(response.message);
      }
    },
    *addPerson({ payload }, { call, put }) {
      const response = yield call(addPerson, payload);
      console.log('****** addPerson ****** ', response, payload);
      payload.callback(response);
      if (response && response.status === 'success') {
        message.success(response.data.data.msg);
      } else {
        message.error('添加失败');
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
