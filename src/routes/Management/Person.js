import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Button, Input } from 'antd';

import styles from './Person.less';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];
@connect(() => ({}))
export default class Wework extends Component {
  render() {
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
            <Table dataSource={dataSource} columns={columns} />
          </Col>
        </Row>
      </div>
    );
  }
}
