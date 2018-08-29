import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Button, Input, Divider, Pagination, Icon, Popconfirm } from 'antd';

import G from '../../gobal';
import styles from './Person.less';
import PersonModal from './components/PersonModal';

@connect(({ manaPerson, user, loading }) => ({
  manaPerson,
  user,
  loading: loading.effects['manaPerson/fetch'],
}))
export default class Wework extends Component {
  // 表单以及分页
  state = {
    query: '',
    filterParam: {},
    sortParam: {},
    modalLoading: false,
    visible: false,
    editValue: {},
  };

  componentDidMount() {
    const { manaPerson } = this.props;
    const { offset } = manaPerson.data;
    this.fetchDataList({ offset: offset });
  }

  onSearch() {
    this.fetchDataList({ offset: 1 });
  }

  onChangeSearchInfo = e => {
    this.setState({ query: e.target.value });
  };

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ query: '' });
  };

  onEdit(text) {
    this.setState({
      visible: true,
      editValue: text,
    });
  }

  onDelete(text) {
    this.updatePerson({ uid: text.uid, isDel: true, callback: this.update.bind(this) });
  }

  getColumns() {
    const columns = [
      {
        title: '序号',
        key: 'uid',
        render: (text, record, index) => (
          <Fragment>
            <font>{index + 1}</font>
          </Fragment>
        ),
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '职务',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        key: 'status',
        sorter: true,
        filters: [
          { text: '全部', value: 1 },
          { text: '连接中', value: 2 },
          { text: '未连接', value: 3 },
        ],
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <Fragment>
            <a
              onClick={() => {
                this.onEdit(text, record, index);
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <Popconfirm
              placement="left"
              title="确定要删除此条信息吗？"
              onConfirm={this.onDelete.bind(this, text)}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ];
    return columns;
  }

  // 弹窗
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (fieldsValue, avatar, uid) => {
    this.setState({ modalLoading: true });
    delete fieldsValue.upload;
    if (G._.isEmpty(this.state.editValue)) {
      this.addPerson({ ...fieldsValue, avatar, callback: this.upload.bind(this) });
      return;
    }
    fieldsValue.uid = uid;
    fieldsValue.isDel = false;
    this.updatePerson({ ...fieldsValue, avatar, callback: this.update.bind(this) });
  };

  upload = res => {
    if (res.status === 'success') {
      this.setState({ modalLoading: false, visible: false });
      this.fetchDataList();
    } else {
      this.setState({ modalLoading: false });
    }
  };

  update = res => {
    if (res.status === 'success') {
      this.setState({ modalLoading: false, visible: false, editValue: {} });
      this.fetchDataList();
    } else {
      this.setState({ modalLoading: false });
    }
  };

  handleCancel = () => {
    this.setState({ visible: false, editValue: {} });
  };

  handleChange = (pagination, filters, sorter) => {
    let filterParam = {};
    let sortParam = {};
    if (!G._.isEmpty(filters && filters.status)) {
      filterParam = { status: filters.status };
    }
    if (!G._.isEmpty(sorter)) {
      sortParam = { status: sorter.order === 'descend' ? 'desc' : 'asc' };
    }
    this.setState({
      filterParam,
      sortParam,
    });
    this.fetchDataList({ filterParam, sortParam });
  };

  pageChange = offset => {
    this.fetchDataList({ offset: offset });
  };

  fetchDataList(value) {
    const { dispatch, manaPerson } = this.props;
    const personData = manaPerson.data;
    const { query, filterParam, sortParam } = this.state;
    dispatch({
      type: 'manaPerson/fetch',
      payload: {
        limit: (value && value.limit) || personData.limit,
        offset: (value && value.offset) || personData.offset,
        query: (value && value.query) || query,
        filterParam: (value && value.filterParam) || filterParam,
        sortParam: (value && value.sortParam) || sortParam,
      },
    });
  }

  addPerson(data) {
    const { dispatch } = this.props;
    dispatch({
      type: 'manaPerson/addPerson',
      payload: data,
    });
  }

  updatePerson(data) {
    const { dispatch } = this.props;
    dispatch({
      type: 'manaPerson/updatePerson',
      payload: data,
    });
  }

  render() {
    const { manaPerson, user, loading } = this.props;
    const { modalLoading, visible, editValue, query } = this.state;
    const columns = this.getColumns();
    const { limit, offset, count } = manaPerson.data;
    const suffix = query ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this)} /> : null;
    return (
      <div className={styles.main}>
        <h3>人员管理</h3>
        <br />
        <Row className={styles.lageBox}>
          <Col span={12}>
            <Button icon="plus" type="primary" onClick={this.showModal}>
              添加
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
              placeholder="姓名 / 手机 / 备注"
              suffix={suffix}
              ref={node => {
                this.userNameInput = node;
              }}
              onChange={this.onChangeSearchInfo.bind(this)}
            />
          </Col>
          <br />
        </Row>
        <Row className={styles.lageBox}>
          {/* 表单 */}
          <Col span={24}>
            <Table
              rowKey="uid"
              loading={loading}
              dataSource={manaPerson.data.rows}
              columns={columns}
              onChange={this.handleChange.bind(this)}
              pagination={false}
            />
            <Pagination
              style={{ marginTop: 20, float: 'right' }}
              current={offset}
              showQuickJumper
              total={count}
              limit={limit}
              onChange={this.pageChange.bind(this)}
            />
          </Col>
        </Row>
        {/* 弹窗 */}
        <PersonModal
          user={user}
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
