import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Table,
  Button,
  Input,
  Divider,
  Popconfirm,
  Pagination,
  Icon,
} from 'antd';

import G from '../../gobal';
import styles from './Person.less';

@connect(({ manaCustomer, loading }) => ({
  manaCustomer,
  loading: loading.effects['manaCustomer/fetch'],
}))
export default class Wework extends Component {
  // 表单以及分页
  state = {
    query: '',
    filterParam: {},
    modalLoading: false
  };

  componentDidMount() {
    this.fetchDataList();
  }

  onSearch() {
    this.fetchDataList({ currentPage: 1 });
  }

  onChangeSearchInfo = e => {
    this.setState({ query: e.target.value });
  };

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ query: '' });
  };

  //重置密码
  untiedConfirm(value) {
    const { dispatch } = this.props;
    dispatch({
      type: 'manaCustomer/resetPassword',
      payload: { companyId: value.companyId, callback: this.fetchDataList.bind(this) },
    });
  }

  //编辑
  onMark(text, record, index) {
    const { dispatch, manaCustomer } = this.props;
    const { editValue } = manaCustomer;
    dispatch({
      type: 'manaCustomer/setEditValue',
      payload: text,
    });
    console.log(editValue);
    this.newCustomer();
  }
  //添加客户
  newCustomer() {
    if (G.env === 'prod') {
      window.location.href = `${window.location.origin}/home/#/management/newCustomer`;
      return;
    }
    window.location.href = `${window.location.origin}/#/management/newCustomer`;
  }

  getColumns() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '客户名称',
        dataIndex: 'companyName',
        key: 'companyName',
      },
      {
        title: '账号',
        dataIndex: 'number',
        key: 'numbers',
      },
      {
        title: '设备数',
        dataIndex: 'number',
        key: 'numbesr',
      },
      {
        title: '离线设备数',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '用户数',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '操作',
        key: 'setting',
        render: (text, record, index) => (
          <Fragment>
            <Popconfirm
              placement="left"
              title="确定要重置密码吗？"
              onConfirm={this.untiedConfirm.bind(this, text)}
              okText="确定"
              cancelText="取消"
            >
              <a>重置密码</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a
              onClick={() => {
                this.onMark(text, record, index);
              }}
            >
              编辑
            </a>
          </Fragment>
        ),
      },
    ];
    return columns;
  }

  // 排序筛选
  handleChange = (pagination, filters, sorter) => {
    let filterParam = {};
    if (!G._.isEmpty(filters && filters.status)) {
      filterParam = { status: filters.status };
    }
    this.setState({
      filterParam,
    });
    this.fetchDataList({ filterParam });
  };

  pageChange = pageNumber => {
    this.fetchDataList({ currentPage: pageNumber });
  };

  fetchDataList(value) {
    const { dispatch, manaCustomer } = this.props;
    const equipData = manaCustomer.data;
    const { query, filterParam } = this.state;
    dispatch({
      type: 'manaCustomer/fetch',
      payload: {
        currentPage: (value && value.currentPage) || equipData.currentPage,
        currentNum: (value && value.currentNum) || equipData.currentNum,
        query: (value && value.query) || query,
        filterParam: (value && value.filterParam) || filterParam,
      },
    });
  }

  render() {
    const { manaCustomer, loading } = this.props;
    const { filteredInfo, query } = this.state;
    const columns = this.getColumns(filteredInfo);
    const { currentNum, currentPage, totalNum } = manaCustomer.data;
    const suffix = query ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this)} /> : null;
    // console.log('********* manaCustomer ********* ', manaCustomer.data);
    return (
      <div className={styles.main}>
        <h3>客户管理</h3>
        <br />
        <Row className={styles.lageBox}>
          {/* 查询 */}
          <Col span={12}>
            <Button icon="plus" type="primary" onClick={this.newCustomer}>
              新建
            </Button>
          </Col>
          <Col span={24}>
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
              placeholder="客户名称 / 账号 / 备注"
              suffix={suffix}
              ref={node => (this.userNameInput = node)}
              onChange={this.onChangeSearchInfo.bind(this)}
            />
          </Col>
          <br />
        </Row>
        <Row className={styles.lageBox}>
          {/* 表格 */}
          <Col span={24}>
            <Table
              rowKey="id"
              loading={loading}
              dataSource={manaCustomer.data.rows}
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
      </div>
    );
  }
}
