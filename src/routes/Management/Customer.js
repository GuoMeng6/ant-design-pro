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
  message,
  Pagination,
  Icon,
} from 'antd';

import G from '../../gobal';
import styles from './Person.less';
// import manaCustomer from './components/manaCustomer.js';

@connect(({ manaCustomer, loading }) => ({
  manaCustomer,
  loading: loading.effects['manaCustomer/fetch'],
}))
export default class Wework extends Component {
  // 表单以及分页
  state = {
    query: '',
    filterParam: {},
    modalLoading: false,
    visible: false,
    editValue: {},
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
      payload: { id: value.id, callback: this.release.bind(this) },
    });
  }

  release(response) {
    this.fetchDataList();
  }

  // 解除弹窗
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 备注
  handleOk = (fieldsValue, id) => {
    this.setState({ modalLoading: true });
    // delete fieldsValue.upload;
    if (G._.isEmpty(this.state.editValue)) {
      return;
    }
    fieldsValue.id = id;
    this.addRemark({ ...fieldsValue, callback: this.upload.bind(this) });
  };

  upload = res => {
    console.log(res);

    if (res.status === 'success') {
      this.setState({ modalLoading: false, visible: false });
      this.fetchDataList();
    } else {
      this.setState({ modalLoading: false });
    }
  };
  //编辑
  addRemark(data) {
    const { dispatch } = this.props;
    dispatch({
      type: 'manaCustomer/editCustomer',
      payload: data,
    });
  }

  handleCancel = () => {
    this.setState({ visible: false, editValue: {} });
  };

  onMark(text, record, index) {
    this.setState({
      visible: true,
      editValue: text,
    });
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
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: '账号',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: '设备数',
        dataIndex: 'number',
        key: 'number',
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
    const { filteredInfo, visible, modalLoading, editValue, query } = this.state;
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
        {/* 弹窗 */}
        <manaCustomer
          visible={visible}
          loading={modalLoading}
          editValue={editValue}
          handleOk={this.handleOk.bind(this)}
          handleCancel={this.handleCancel.bind(this)}
        />
      </div>
    );
  }
}
