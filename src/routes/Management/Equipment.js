import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './Equipment.less';
@connect(() => ({}))
export default class Wework extends Component {
  render() {
    return (
      <div className={styles.main}>
        <h3>设备管理</h3>
      </div>
    );
  }
}
