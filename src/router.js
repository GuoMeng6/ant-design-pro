import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import { getQueryPath } from './utils/utils';
import { setAuthority } from './utils/storage';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  // console.log('******* routerData ******* ', routerData);
  // console.log('******* url ******* ', window.location.href);
  const url = window.location.href;
  let userPath = '/user'
  setAuthority('user');
  if (url.indexOf('admin_user') > -1) {
    //admin用戶
    userPath = '/admin_user'
    setAuthority('admin');
  }

  const UserLayout = routerData['/user'].component;
  const AdminLayout = routerData['/admin_user'].component;
  // console.log('****** UserLayout ******* ', UserLayout);

  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path='/user' component={UserLayout} />
          <Route path='/admin_user' component={AdminLayout} />
          {/* 判定权限默认全部 */}
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath={getQueryPath('/user/login', {
              redirect: window.location.href,
            })}
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
