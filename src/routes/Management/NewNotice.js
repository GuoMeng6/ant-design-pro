import React, { Component, Fragment } from 'react';
import NewNoticeForm from './components/NewNoticeForm';

import styles from './Person.less';

export default class NewNotice extends Component {
  render() {
    return (
      <div className={styles.main}>
        <h3>新建通知</h3>
        <br />
        <NewNoticeForm />
      </div>
    );
  }
}
