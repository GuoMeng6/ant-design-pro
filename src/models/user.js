export default {
  namespace: 'user',

  state: {
    user: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI4ZDQ2OGQ0YS1lM2RlLTRmMjYtOTY3OC1hN2Y3Y2ZkZjVhMjIiLCJ1c2VyTmFtZSI6IjlhbS1tYW5hZ2VyIiwibmlja05hbWUiOiI5YW0tbWFuYWdlciIsImNvbXBhbnlJZCI6MTEsImRlcGFydG1lbnQiOjAsInBvc2l0aW9uIjpudWxsLCJwaG9uZSI6bnVsbCwiYXZhdGFyIjoiMTExMSIsImRuIjoiY249OWFtLW1hbmFnZXIsb3U9OWFtLGRjPVNwYWNlU2VydmVyLGRjPWNvbSIsImlhdCI6MTUzMzk4NjU4OCwiZXhwIjoxNTMzOTkwMTg4fQ.jYBHfVWqGq2quR7WRjFCdzYzqRKsjj09oNcvRSGcU8A',
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
