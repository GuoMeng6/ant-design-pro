import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';

const SelectOption = Select.Option;

const FormItem = Form.Item;

const children = [];
for (let i = 10; i < 36; i += 1) {
  children.push(<SelectOption key={i.toString(36) + i}>{i.toString(36) + i}</SelectOption>);
}

class NewNoticeForm extends Component {
  handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  render() {
    const { form } = this.props;
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
              filterOption={(inputValue, option) => {
                console.log('********** filterOption ********* ', { inputValue, option });
              }}
              style={{ width: '100%' }}
            >
              {children}
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NewNoticeForm);
