import { message } from 'antd';
import { getResourceList, addRemark, releaseDevice } from '../services/api';


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
    *fetch({ payload }, { call, put }) {
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
    *addRemark({ payload }, { call }) {
      const response = yield call(addRemark, payload);
      payload.callback(response);
      if (response && response.status === 'success') {
        message.success(response.data);
      } else {
        const { errors } = response.message;
        if (!errors[0]) {
          return message.error('添加失败');
        }
        message.error(`${errors[0].field} ${errors[0].message}`);
      }
    },
    *release({ payload }, { call, put }) {
      const response = yield call(releaseDevice, payload);
      payload.callback();
      if (response && response.status === 'success') {
        message.success('解绑成功');
      } else {
        message.error('解绑失败' && (response && response.message));
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
