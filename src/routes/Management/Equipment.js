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
import EquipModal from './components/EquipModal.js';

@connect(({ manaEquip, loading }) => ({
  manaEquip,
  loading: loading.effects['manaEquip/fetch'],
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

  untiedConfirm(value) {
    const { dispatch } = this.props;
    dispatch({
      type: 'manaEquip/release',
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
  handleOk = () => {
    this.setState({ modalLoading: true });
    setTimeout(() => {
      this.setState({ modalLoading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false, editValue: {} });
  };

  onMack(text, record, index) {
    this.setState({
      visible: true,
      editValue: text,
    });
  }

  getColumns() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '桌子编号',
        dataIndex: 'number',
        key: 'number',
        sorter: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text: '全部', value: 1 },
          { text: '使用中', value: 2 },
          { text: '空闲', value: 3 },
          { text: '离线', value: 4 },
        ],
      },
      {
        title: '用户',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '最后使用时间',
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
              title="解除绑定后，该用户将被强制退出该设备，导致用户无法正常使用（可重新登录使用）"
              onConfirm={this.untiedConfirm.bind(this, text)}
              okText="解绑"
              cancelText="取消"
            >
              <a>解绑</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a
              onClick={() => {
                this.onMack(text, record, index);
              }}
            >
              备注
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
    let sortParam = {};
    if (!G._.isEmpty(filters && filters.status)) {
      filterParam = { status: filters.status };
    }
    if (!G._.isEmpty(sorter)) {
      sortParam = { number: sorter.order === 'descend' ? 'desc' : 'asc' };
    }
    this.setState({
      filterParam,
      sortParam,
    });
    this.fetchDataList({ filterParam, sortParam });
  };

  pageChange = pageNumber => {
    this.fetchDataList({ currentPage: pageNumber });
  };

  fetchDataList(value) {
    const { dispatch, manaEquip } = this.props;
    const equipData = manaEquip.data;
    const { query, filterParam, sortParam } = this.state;
    dispatch({
      type: 'manaEquip/fetch',
      payload: {
        currentPage: (value && value.currentPage) || equipData.currentPage,
        currentNum: (value && value.currentNum) || equipData.currentNum,
        query: (value && value.query) || query,
        filterParam: (value && value.filterParam) || filterParam,
        sortParam: (value && value.sortParam) || sortParam,
      },
    });
  }

  render() {
    const { manaEquip, loading } = this.props;
    const { filteredInfo, visible, modalLoading, editValue, query } = this.state;
    const columns = this.getColumns(filteredInfo);
    const { currentNum, currentPage, totalNum } = manaEquip.data;
    const suffix = query ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this)} /> : null;
    // console.log('********* manaEquip ********* ', manaEquip.data);
    return (
      <div className={styles.main}>
        <h3>设备管理</h3>
        <br />
        <Row className={styles.lageBox}>
          {/* 查询 */}
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
              placeholder="设备编号 / 使用者 / 备注"
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
              dataSource={manaEquip.data.rows}
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
        <EquipModal
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
