import React, { Component } from 'react';
import * as qiniu from 'qiniu-js';
import { Modal, Button, Input, Form, Icon, Upload } from 'antd';
import G from '../../../gobal';
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

  componentWillReceiveProps(nextProps) {
    const { visible, editValue } = nextProps;
    if (this.visible !== visible && !G._.isEqual(this.editValue, editValue)) {
      this.visible = visible;
      this.editValue = editValue;
      if (visible && !G._.isEmpty(editValue)) {
        nextProps.form.setFieldsValue({
          name: editValue.name,
          phone: editValue.phone,
          duty: editValue.duty,
          mark: editValue.mark,
        });
      } else {
        nextProps.form.setFieldsValue({
          name: '',
          phone: '',
          duty: '',
          mark: '',
        });
      }
    }
  }

  normFile = e => {
    if (!e || !e.fileList) {
      return e;
    }
    const { fileList } = e;
    return fileList;
  };

  checkPhone = (rule, value, callback) => {
    if (!value) {
      callback(' ');
      return;
    }
    const re = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (value.length === 11 || re.test(value)) {
      callback();
    } else {
      callback('手机号格式有误');
    }
  };

  okHandle = () => {
    const { form, handleOk } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleOk(fieldsValue);
    });
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ avatarLoading: true });
      return;
    }
    if (info.file.status === 'error') {
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          avatarLoading: false,
        });
      });
    }
  };

  next(value) {
    console.log('******* next ******* ', value);
  }

  error(err) {
    console.log('******* error ******* ', err);
  }

  complete(response) {
    console.log('******* complete ******* ', response);
  }

  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isGIF = file.type === 'image/gif';
    // console.log('******* beforeUpload ******** ', file, isJPG, isPNG, isGIF);
    if (!isJPG && !isPNG && !isGIF) {
      // message.error('格式不支持');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    console.log(file.size, isLt2M);
    if (!isLt2M) {
      // message.error('图片大小不能超过2MB!');
    }
    const { user } = this.props.user;
    const config = {
      useCdnDomain: true,
    };
    const putExtra = {
      fname: '',
      params: {},
      mimeType: ['image/png', 'image/jpeg', 'image/gif'],
    };
    const observable = qiniu.upload(
      file,
      '000001.png',
      'h07mPP3LHfjO8BHJfCyIRsiichflVYIHtyNkXNoM:ZyKB9eOlJ8mmTdH_VumDxehPjXI=:eyJzY29wZSI6ImRzaG93OjAwMDAwMS5wbmciLCJkZWFkbGluZSI6MTUzMzY0NTc0M30=',
      putExtra,
      config
    );
    observable.subscribe(this.next.bind(this), this.error.bind(this), this.complete.bind(this));
    return false;
    // return (isJPG && isLt2M) || (isPNG && isLt2M) || (isGIF && isLt2M);
  }

  render() {
    const { visible, loading, handleCancel, form, user } = this.props;

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
        onOk={this.okHandle}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            关闭
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.okHandle}>
            提交
          </Button>,
        ]}
      >
        <FormItem {...formItemLayout} label="头像">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              className={styles.avatarUploader}
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              // action="http://upload.qiniup.com"
              onChange={this.handleChange.bind(this)}
              beforeUpload={this.beforeUpload.bind(this)}
            >
              {imageUrl ? (
                <img className={styles.avatar} src={imageUrl} alt="avatar" />
              ) : (
                uploadButton
              )}
            </Upload>
          )}
        </FormItem>
        <br />
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '姓名不能为空',
              },
              {
                max: 20,
                message: '最大长度20',
              },
            ],
          })(<Input placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="手机">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: '手机号不能为空',
              },
              {
                validator: this.checkPhone.bind(this),
              },
            ],
          })(<Input placeholder="请输入手机号" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="职务">
          {getFieldDecorator('duty', {
            rules: [
              {
                max: 10,
                message: '最大长度10',
              },
            ],
          })(<Input placeholder="请输入职务" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('mark', {
            rules: [
              {
                max: 50,
                message: '最大长度50',
              },
            ],
          })(<Input placeholder="请输入职务" />)}
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create()(PersonModal);
