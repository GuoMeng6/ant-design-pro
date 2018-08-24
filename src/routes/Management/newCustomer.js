import React, { Component } from 'react';
import { connect } from 'dva';
import CustomerModal from './components/CustomerModal';
import styles from './Person.less';

@connect(({ manaCustomer }) => ({
  manaCustomer,
}))
export default class NewNotice extends Component {
  render() {
    const { dispatch, manaCustomer } = this.props;
    return (
      <div className={styles.main}>
        <h3>新建客户</h3>
        <br />
        <CustomerModal
          dispatch={dispatch}
          copyValue={manaCustomer.copyValue}
        />
      </div>
    );
  }
}
