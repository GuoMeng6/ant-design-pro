import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Button, Input, Divider, Popconfirm, message, Pagination } from 'antd';

import styles from './Person.less';
import EquipModal from './components/EquipModal.js';

@connect(({ manaEquip, loading }) => ({
  manaEquip,
  loading: loading.effects['manaEquip/fetchEquip'],
}))
export default class Wework extends Component {
  // 表单以及分页
  state = {
    quire: '',
    filteredInfo: {},
    sorter: {},
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
    const { quire } = this.state;
    this.fetchDataList(1, currentNum, quire);
  }

  onChangeSearchInfo = e => {
    this.setState({ quire: e.target.value });
  };

  untied(text, record, index) {}

  untiedConfirm() {}

  // 解除弹窗
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

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

  // 解除弹窗
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
        dataIndex: 'daskId',
        key: 'daskId',
        sorter: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        filters: [{ text: '使用中', value: '使用中' }, { text: '空闲', value: '空闲' }],
        filteredValue: filteredInfo.mark || null,
        onFilter: (value, record) => record.mark.includes(value),
      },
      {
        title: '用户',
        dataIndex: 'user',
        key: 'user',
      },
      {
        title: '备注',
        dataIndex: 'mark',
        key: 'mark',
      },
      {
        title: '最后使用时间',
        dataIndex: 'lastTime',
        key: 'lastTime',
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

  handleChange = (pagination, filters, sorter) => {
    // console.log('********** handleChange ************ ', sorter);
    this.setState({
      filteredInfo: filters,
    });
  };

  pageChange = pageNumber => {
    const { manaEquip } = this.props;
    const { currentNum } = manaEquip.data;
    const { quire } = this.state;
    this.fetchDataList(pageNumber, currentNum, quire);
  };

  fetchDataList(currentPage, currentNum) {
    const { dispatch } = this.props;
    dispatch({
      type: 'manaEquip/fetchEquip',
      payload: { currentPage, currentNum },
    });
  }

  render() {
    const { manaEquip } = this.props;
    const { filteredInfo, visible, loading, editValue } = this.state;
    const columns = this.getColumns(filteredInfo);
    const { currentNum, currentPage, totalNum } = manaEquip.data;
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
              className={styles.widthInput}
              placeholder="设备编号 / 使用者 / 备注"
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
              dataSource={manaEquip.data.dataList}
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
