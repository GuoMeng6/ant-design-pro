import { getResourceList } from '../services/api';
import { message } from 'antd';

export default {
  namespace: 'manaEquip',
  state: {
    data: {
      dataList: [],
      currentPage: 1,
      currentNum: 15,
    },
  },

  effects: {
    *resourceList({ payload }, { call, put }) {
      const response = yield call(getResourceList, payload);
      console.log("*****response*****" + JSON.stringify(response));
      return;
      if (response.status === 'success') {
        yield put({
          type: 'equipSave',
          payload: response.rows,
        });
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    equipSave(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
