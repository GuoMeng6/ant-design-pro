import React, { Component } from 'react';
import { Modal, Button, Input, Row, Col } from 'antd';

class PersonModal extends Component {
  render() {
    const { visible, loading, handleCancel, handleOk } = this.props;
    return (
      <Modal
        visible={visible}
        title="新增用户"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            关闭
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            提交
          </Button>,
        ]}
      >
        <Row>
          <Col span={24}>111111111111</Col>
        </Row>
      </Modal>
    );
  }
}

export default PersonModal;
