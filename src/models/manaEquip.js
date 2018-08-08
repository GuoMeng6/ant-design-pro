import { getEquipmentlList } from '../services/api';

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
    *fetchEquip({ payload }, { call, put }) {
      const response = yield call(getEquipmentlList, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'equipSave',
          payload: response.data,
        });
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
