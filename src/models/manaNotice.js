import { getNoticeList } from '../services/api';

export default {
  namespace: 'manaNotice',

  state: {
    data: {
      noticeList: [],
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getNoticeList, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        noticeList: action.payload,
      };
    },
  },
};
