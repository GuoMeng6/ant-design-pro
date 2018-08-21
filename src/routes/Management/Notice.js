import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Button, Input, Divider, Drawer, Icon, Pagination, Popconfirm } from 'antd';

import G from '../../gobal';
import styles from './Person.less';

@connect(({ manaNotice, loading }) => ({
  manaNotice,
  loading: loading.effects['manaNotice/fetch'],
}))
export default class Notice extends Component {
  // 表单以及分页
  state = {
    query: '',
    visible: false,
    detail: {
      title: '标题',
      lookNum: 20,
      lastTime: '2018-04',
      content: '<p>Hello World</p>',
    },
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    const { dispatch, manaNotice } = this.props;
    const { currentPage } = manaNotice.data;
    this.fetchDataList(currentPage);
    dispatch({
      type: 'manaNotice/setCopyValue',
      payload: '',
    });
  }

  onSearch() {
    // console.log('******** 搜索 ******** ', this.state);
    this.fetchDataList(1);
  }

  onChangeSearchInfo = e => {
    console.log('***** e.target.value  *****', e.target.value);

    this.setState({ query: e.target.value });
  };

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ query: '' });
  };

  //置顶
  untiedConfirm(value) {
    console.log("***** value *****", value);

    const { dispatch } = this.props;
    dispatch({
      type: 'manaNotice/topNotice',
      payload: {
        status: true,
        noticeId: value.noticeId,
        callback: this.release.bind(this),
      },
    });
  }

  release(response) {
    this.fetchDataList(pageNumber);
  }

  //详情
  onDetail(text, record, index) {
    this.setState({
      detail: {
        title: text.title,
        lookNum: text.viewCount,
        lastTime: text.createdAt,
        content: text.content,
      },
    });
    this.showDrawer();
  }

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
        width: '200px',
        key: 'title',
        render: (text) => {
          return <span className={styles.colSql}>{text}</span>
        },
      },
      {
        title: '未读人数',
        dataIndex: 'unreadCount',
        key: 'unreadCount',
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
            <Popconfirm
              placement="left"
              title="确定要置顶此条通知吗？"
              onConfirm={this.untiedConfirm.bind(this, text)}
              okText="确定"
              cancelText="取消"
            >
              <a>置顶</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a onClick={this.copyPush.bind(this, text)}>复制</a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                this.onDetail(text, record, index);
              }}
            >
              详情
            </a>
          </Fragment>
        ),
      },
    ];
    return columns;
  }

  // 详情
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
  };

  copyPush = value => {
    this.props.dispatch({
      type: 'manaNotice/setCopyValue',
      payload: value,
    });
    this.newNotice();
  };

  pageChange = pageNumber => {
    this.fetchDataList(pageNumber);
  };

  fetchDataList(currentPage) {
    const { manaNotice, dispatch } = this.props;
    const { currentNum } = manaNotice.data;
    const { query } = this.state;
    dispatch({
      type: 'manaNotice/fetch',
      payload: { currentPage, currentNum, query },
    });
  }

  newNotice() {
    if (G.env === 'prod') {
      window.location.href = `${window.location.origin}/home/#/management/newNotice`;
      return;
    }
    window.location.href = `${window.location.origin}/#/management/newNotice`;
  }

  render() {
    const { manaNotice, loading } = this.props;
    const { filteredInfo, query } = this.state;
    const columns = this.getColumns(filteredInfo);
    const { currentNum, currentPage, totalNum } = manaNotice.data;
    const suffix = query ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this)} /> : null;
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
              value={query}
              className={styles.widthInput}
              placeholder="标题"
              suffix={suffix}
              ref={node => (this.userNameInput = node)}
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
              loading={loading}
              dataSource={manaNotice.data.row}
              columns={columns}
              onChange={this.handleChange.bind(this)}
              pagination={false}
            />
            <Pagination
              style={{ marginTop: 20, float: 'right' }}
              current={currentPage}
              showQuickJumper
              total={totalNum}
              pageSize={currentNum}
              onChange={this.pageChange.bind(this)}
            />
          </Col>
        </Row>
        <Drawer
          width={512}
          title={this.state.detail.title}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>
            <Icon type="eye-o" style={{ marginRight: '6px' }} />
            {this.state.detail.lookNum}
            <Icon type="clock-circle-o" style={{ marginLeft: '10px', marginRight: '6px' }} />
            {this.state.detail.lastTime}
          </p><br /><br />
          <div dangerouslySetInnerHTML={{ __html: this.state.detail.content }} />
        </Drawer>
      </div>
    );
  }
}
