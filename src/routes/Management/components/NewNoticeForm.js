import React, { Component } from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const SelectOption = Select.Option;

const FormItem = Form.Item;

const children = [];
for (let i = 10; i < 36; i += 1) {
  children.push(<SelectOption key={i.toString(36) + i}>{i.toString(36) + i}</SelectOption>);
}

class NewNoticeForm extends Component {
  state = {
    editorState: {},
  };

  onEditorStateChange(editorState) {
    console.log(
      '******** onEditorStateChange ******* ',
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );

    this.setState({
      editorState,
    });
  }

  handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  handleCommit(e) {
    console.log('********* e ********* ', e);
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', { err, values });
    });
  }

  checkEditor(rule, value, callback) {
    console.log('******** checkEditor ******** ', { rule, value });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleCommit.bind(this)}>
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
            <div style={{ height: 500, backgroundColor: '#ffffff' }}>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorStyle={{ width: '100%' }}
                onEditorStateChange={this.onEditorStateChange.bind(this)}
              />
            </div>
          )}
        </FormItem>
        <Row>
          <Col span={24} style={{ textAlign: 'left' }}>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => {}}>
              取消
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(NewNoticeForm);
