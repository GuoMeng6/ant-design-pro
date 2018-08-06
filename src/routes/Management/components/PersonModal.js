import React, { Component } from 'react';
import { Modal, Button, Input, Row, Col, Form, Icon, Upload } from 'antd';
import styles from './PersonModal.less';

const FormItem = Form.Item;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class PersonModal extends Component {
  state = {
    imageUrl: '',
    avatarLoading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ avatarLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          avatarLoading: false,
        })
      );
    }
  };

  render() {
    const { visible, loading, handleCancel, handleOk, form } = this.props;
    const { imageUrl, avatarLoading } = this.state;
    const { getFieldDecorator } = form;
    const uploadButton = (
      <div className="avatar-uploader2">
        <Icon type={avatarLoading ? 'loading' : 'plus'} />
      </div>
    );
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
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
        {/* <Row>
          <Col span={24}>111111111111</Col>
        </Row> */}
        <FormItem
          {...formItemLayout}
          label="Upload"
          showUploadList={false}
          onChange={this.handleChange}
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              className={styles.avatarUploader}
              name="avatar"
              action="/upload.do"
              listType="picture"
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
          )}
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create()(PersonModal);
