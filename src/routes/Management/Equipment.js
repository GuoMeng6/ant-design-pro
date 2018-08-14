import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Button, Input, Divider, Popconfirm, message, Pagination, Icon } from 'antd';

import G from '../../gobal';
import styles from './Person.less';
import EquipModal from './components/EquipModal.js';

@connect(({ manaEquip, loading }) => ({
  manaEquip,
  loading: loading.effects['manaEquip/resourceList'],
}))
export default class Wework extends Component {
  // 表单以及分页
  state = {
    query: '',
    filterParam: '',
    sortParam: '',
    loading: false,
    visible: false,
    editValue: {},
  };

  componentDidMount() {
    const { manaEquip } = this.props;
    const { currentPage, currentNum } = manaEquip.data;
    this.fetchDataList(currentPage, currentNum);
  }

  onSearch() {
    const { manaEquip } = this.props;
    const { currentNum } = manaEquip.data;
    const { query } = this.state;
    this.fetchDataList(1, currentNum);
  }

  onChangeSearchInfo = e => {
    this.setState({ query: e.target.value });
  };

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ query: '' });
  }

  untied(text, record, index) { }

  untiedConfirm() { }

  // 解除弹窗
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  //备注
  handleOk = () => {
    // console.log('******* handleOK ******* ', fieldsValue);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
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

  getColumns(filteredInfo) {
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
        filters: [{ text: '全部', value: '1' }, { text: '使用中', value: '2' }, { text: '空闲', value: '3' }, { text: '离线', value: '4' }],
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
              onConfirm={this.untiedConfirm.bind(this)}
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
  //排序筛选
  handleChange = (pagination, filters, sorter) => {
    const { manaEquip } = this.props;
    let filterParam = '';
    let sortParam = '';
    if (!G._.isEmpty(filters)) {
      console.log(filters.status);
      filterParam = JSON.stringify({ stauts: filters.status });
    }
    if (!G._.isEmpty(sorter)) {
      sortParam = JSON.stringify({ daskId: sorter.order === 'descend' ? 'desc' : 'asc' });
      console.log(sortParam);
    }
    this.setState({
      filterParam,
      sortParam,
    });
    const { currentPage, currentNum } = manaEquip.data;
    this.fetchDataList(currentPage, currentNum);
  };

  pageChange = pageNumber => {
    const { manaEquip } = this.props;
    const { currentNum } = manaEquip.data;
    this.fetchDataList(pageNumber, currentNum);
  };

  fetchDataList(currentPage, currentNum) {
    console.log('******** fetchDataList ********', { currentPage, currentNum, query });
    const { query, filterParam, sortParam } = this.state;
    const { dispatch } = this.props;

    dispatch({
      type: 'manaEquip/resourceList',
      payload: { currentPage, currentNum, query, filterParam, sortParam },
    });
  }

  render() {
    const { manaEquip } = this.props;
    const { filteredInfo, visible, loading, editValue, query } = this.state;
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
              ref={node => this.userNameInput = node}
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
          loading={loading}
          editValue={editValue}
          handleOk={this.handleOk.bind(this)}
          handleCancel={this.handleCancel.bind(this)}
        />
      </div>
    );
  }
}
