export default {
  namespace: 'user',

  state: {
    user: {
      token: '',
      name: '9am-manager',
      avatar: '1111',
    },
  },

  effects: {
    *user({ payload }, { call, put }) {
      yield put({
        type: 'saveUser',
        payload,
      });
    },
  },

  reducers: {
    saveUser(state, { payload }) {
      return {
        ...state,
        user: payload,
      };
    },
  },
};
