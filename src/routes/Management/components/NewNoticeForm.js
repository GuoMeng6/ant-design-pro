import React, { Component } from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import G from '../../../gobal';

const SelectOption = Select.Option;

const FormItem = Form.Item;

const children = [];
const valueOfAll = [];
for (let i = 10; i < 36; i += 1) {
  children.push(<SelectOption key={`hai${i}`}>{i.toString(36) + i}</SelectOption>);
  valueOfAll.push(`hai${i}`);
}
children.unshift(<SelectOption key="all">全部</SelectOption>);

class NewNoticeForm extends Component {
  state = {
    editorState: '',
    value: [],
  };

  onEditorStateChange(editorState) {
    this.setState({
      editorState: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  }

  selectAll() {
    const { form } = this.props;
    form.setFieldsValue({
      person: valueOfAll,
    });
  }

  handleChange(value) {
    const isContainerAll = G._.find(value, o => {
      return o === 'all';
    });
    this.setState({
      value: isContainerAll ? valueOfAll : value,
    });
    if (isContainerAll) {
      setTimeout(() => {
        this.selectAll();
      }, 100);
    }
  }

  handleCommit() {
    const { form } = this.props;
    form.validateFields((err, values) => {
      const { editorState } = this.state;
    });
  }

  checkEditor(rule, value, callback) {
    const { editorState } = this.state;
    if (editorState === '' || editorState.length === 8) {
      callback('请填写内容');
    } else {
      callback();
    }
  }

  render() {
    const { form } = this.props;
    const { value } = this.state;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('title', {
            rules: [
              { required: true, message: '请输入标题' },
              {
                max: 20,
                message: '最大长度20',
              },
            ],
          })(<Input placeholder="请输入标题" size="large" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('person', {
            rules: [{ required: true, message: '请选择接收人' }],
          })(
            <Select
              mode="multiple"
              allowClear
              size="large"
              placeholder="请选择接收人"
              onChange={this.handleChange.bind(this)}
              style={{ width: '100%' }}
            >
              {children}
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('editor', {
            rules: [{ validator: this.checkEditor.bind(this) }],
          })(
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              editorStyle={{ width: '100%', height: 350, backgroundColor: '#ffffff' }}
              onEditorStateChange={this.onEditorStateChange.bind(this)}
            />
          )}
        </FormItem>
        <Row>
          <Col span={24} style={{ textAlign: 'left' }}>
            <Button type="primary" htmlType="submit" onClick={this.handleCommit.bind(this)}>
              发布
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => {
                this.selectAll();
                return;
                history.back(-1);
              }}
            >
              取消
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(NewNoticeForm);
