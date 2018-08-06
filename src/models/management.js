import { getPersonnelList } from '../services/api';

export default {
  namespace: 'management',

  state: {
    data: {
      list: [],
      pagination: {},
      data: [],
      personnelList: [],
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getPersonnelList, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    *add({ payload, callback }, { call, put }) {
      // const response = yield call(addRule, payload);
      // yield put({
      //   type: 'save',
      //   payload: [],
      // });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      // const response = yield call(removeRule, payload);
      // yield put({
      //   type: 'save',
      //   payload: [],
      // });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        personnelList: action.payload,
      };
    },
  },
};
