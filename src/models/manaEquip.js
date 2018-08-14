import { getResourceList } from '../services/api';
import { message } from 'antd';

export default {
  namespace: 'manaEquip',
  state: {
    data: {
      rows: [],
      currentPage: 1,
      currentNum: 15,
    },
  },

  effects: {
    *resourceList({ payload }, { call, put }) {
      const response = yield call(getResourceList, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'equipSave',
          payload: response.data,
        });
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    equipSave(state, action) {
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
