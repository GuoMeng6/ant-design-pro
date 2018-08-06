import { getEquipmentlList } from '../services/api';

export default {
  namespace: 'manaEquip',

  state: {
    // equipData: {
    //   list: [],
    //   pagination: {},
    //   data: [],
    //   equipmentlList: [],
    // },
    equipmentlList: [],
  },

  effects: {
    *fetchEquip({ payload }, { call, put }) {
      const response = yield call(getEquipmentlList, payload);
      console.log('********* fetchEquip ********* ', response);
      if (response.status === 'ok') {
        yield put({
          type: 'equipSave',
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
    equipSave(state, action) {
      return {
        ...state,
        equipmentlList: action.payload,
      };
    },
  },
};
