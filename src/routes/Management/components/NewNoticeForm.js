import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
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

  handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  onEditorStateChange(editorState) {
    console.log(
      '******** onEditorStateChange ******* ',
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );

    this.setState({
      editorState,
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { editorState } = this.state;
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
            rules: [{ required: true, message: '请填写内容' }],
          })(
            <div style={{ height: 400 }}>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorStyle={{ width: '100%', height: 370, backgroundColor: '#ffffff' }}
                onEditorStateChange={this.onEditorStateChange.bind(this)}
              />
            </div>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NewNoticeForm);
