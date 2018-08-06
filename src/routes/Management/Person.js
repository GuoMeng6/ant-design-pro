import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Button, Input, Divider } from 'antd';

import styles from './Person.less';

@connect(({ management, loading }) => ({
  management,
  loading: loading.effects['management/fetch'],
}))
export default class Wework extends Component {
  state = {
    filteredInfo: {},
    sortedInfo: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'management/fetch',
    });
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  render() {
    const { management } = this.props;
    const { filteredInfo, sortedInfo } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '手机',
        dataIndex: 'phone',
      },
      {
        title: '职务',
        dataIndex: 'duty',
      },
      {
        title: '使用状态',
        dataIndex: 'status',
      },
      {
        title: '备注',
        dataIndex: 'mark',
        filters: [
          { text: '管理员', value: '管理员' },
          { text: '内部员工', value: '内部员工' },
          { text: '游客', value: '游客' },
        ],
        filteredValue: filteredInfo.mark || null,
        onFilter: (value, record) => record.mark.includes(value),
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="">编辑</a>
            <Divider type="vertical" />
            <a href="">删除</a>
          </Fragment>
        ),
      },
    ];
    // console.log('********* management ********* ', management);
    return (
      <div className={styles.main}>
        <h3>人员管理</h3>
        <br />
        <Row className={styles.lageBox}>
          {/* 查询 */}
          <Col span={12}>
            <Button icon="plus" type="primary">
              添加
            </Button>
          </Col>
          <Col span={12}>
            <Button className={styles.rights} icon="search" type="primary">
              搜索
            </Button>
            <Input className={styles.widthInput} placeholder="姓名 / 手机 / 备注" />
          </Col>
          <br />
        </Row>
        <Row className={styles.lageBox}>
          {/* 表单 */}
          <Col span={24}>
            <Table
              dataSource={management.personnelList}
              columns={columns}
              onChange={this.handleChange.bind(this)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
