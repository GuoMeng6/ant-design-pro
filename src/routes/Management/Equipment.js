import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Button, Input, Divider } from 'antd';

import styles from './Person.less';

@connect(({ manaEquip, loading }) => ({
  manaEquip,
  loading: loading.effects['manaEquip/fetchEquip'],
}))
export default class Wework extends Component {
  // 表单以及分页
  state = {
    searchInfo: '',
    filteredInfo: {},
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
      type: 'manaEquip/fetchEquip',
    });
  }

  onSearch() {
    // console.log('******** 搜索 ******** ', this.state);
  }

  onChangeSearchInfo = e => {
    this.setState({ searchInfo: e.target.value });
  };

  onEdit(text, record, index) {
    // console.log('********* 编辑 ******** ', text, record, index);
  }

  onDelete(text, record, index) {
    // console.log('********* 删除 ******** ', text, record, index);
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
            <a
              onClick={() => {
                this.onEdit(text, record, index);
              }}
            >
              解绑
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                this.onDelete(text, record, index);
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
    // console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      pagination,
    });
  };

  render() {
    const { manaEquip } = this.props;
    const { filteredInfo, pagination } = this.state;
    const columns = this.getColumns(filteredInfo);
    // console.log('********* manaEquip ********* ', manaEquip);
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
          {/* 表单 */}
          <Col span={24}>
            <Table
              rowKey="id"
              dataSource={manaEquip.equipmentlList}
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
