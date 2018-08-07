import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Button, Input, Divider } from 'antd';

import styles from './Person.less';

@connect(({ manaNotice, loading }) => ({
  manaNotice,
  loading: loading.effects['manaNotice/fetch'],
}))
export default class Notice extends Component {
  // 表单以及分页
  state = {
    searchInfo: '',
    pagination: {
      current: 1,
      pageSize: 15,
      showQuickJumper: true,
      total: 250,
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'manaNotice/fetch',
    });
  }

  onSearch() {
    // console.log('******** 搜索 ******** ', this.state);
  }

  onChangeSearchInfo = e => {
    this.setState({ searchInfo: e.target.value });
  };

  getColumns(filteredInfo) {
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '接收人',
        dataIndex: 'receiver',
        key: 'receiver',
      },
      {
        title: '发布时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: '操作',
        key: 'setting',
        render: (text, record, index) => (
          <Fragment>
            <a onClick={() => {}}>复制</a>
            <Divider type="vertical" />
            <a onClick={() => {}}>置顶</a>
          </Fragment>
        ),
      },
    ];
    return columns;
  }

  handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      pagination,
    });
  };

  newNotice() {
    console.log('*********  新建 ********* ', `${window.location.origin}/#/newNotice`);
    window.location.href = `${window.location.origin}/#/management/newNotice`;
  }

  render() {
    const { manaNotice } = this.props;
    const { filteredInfo, pagination } = this.state;
    const columns = this.getColumns(filteredInfo);
    // console.log('********* manaPerson ********* ', manaPerson);
    return (
      <div className={styles.main}>
        <h3>通知列表</h3>
        <br />
        <Row className={styles.lageBox}>
          {/* 查询 */}
          <Col span={12}>
            <Button icon="plus" type="primary" onClick={this.newNotice}>
              新建
            </Button>
          </Col>
          <Col span={12}>
            <Button
              className={styles.rights}
              icon="search"
              type="primary"
              onClick={this.onSearch.bind(this)}
            >
              搜索
            </Button>
            <Input
              className={styles.widthInput}
              placeholder="标题"
              onChange={this.onChangeSearchInfo.bind(this)}
            />
          </Col>
          <br />
        </Row>
        <Row className={styles.lageBox}>
          {/* 表单 */}
          <Col span={24}>
            <Table
              rowKey="id"
              dataSource={manaNotice.noticeList}
              columns={columns}
              onChange={this.handleChange.bind(this)}
              pagination={pagination}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
