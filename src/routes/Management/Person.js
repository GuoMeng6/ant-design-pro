import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './Person.less';
@connect(() => ({}))
export default class Wework extends Component {
  render() {
    return (
      <div className={styles.main}>
        <h4>hello</h4>
      </div>
    );
  }
}
