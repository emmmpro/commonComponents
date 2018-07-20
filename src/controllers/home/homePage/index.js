"use strict"
import React, { Component } from 'react'
import { Form, Input, Button, InputNumber, Select } from 'antd'
import DynamicParams from '../../commonComponent/dynamicForm'
import CollPanel from '../../commonComponent/collPanel'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import './style'
import BoilingVerdict from './demo'

const FormItem = Form.Item
const Option = Select.Option
// const { Description } = DescriptionList
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
const BtnLabel = { wrapperCol: { sm: { span: 2, offset: 22 } } }
class HomePage extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const { form: { validateFieldsAndScroll } } = this.props
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values, 666)
            }
        })
    }
    render() {
        const { form: { getFieldDecorator } } = this.props
        const dynamicProps = {
            form: this.props.form,
            params: [],
            btnName: "新增动态参数",
            fieldName: "dynamicParam"
        }
        const otherProps = {
            form: this.props.form,
            params: [],
            btnName: "新增其他参数",
            fieldName: "otherParam"
        }
        const gender = [{ value: "male", label: "男" }, { value: "famale", label: "女" }, { value: "other", label: "其他" }]
        const genderOpts = gender.map(item => <Option value={item.value}>{item.label}</Option>)
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="p20">
              <BoilingVerdict/>
                <CollPanel title="基本信息" fold={false}>
                    <FormItem {...formItemLayout} label="名称">
                        {getFieldDecorator('name', {
                            initialValue: '',
                            rules: [
                                { required: true, message: "请输入名称" }
                            ]
                        })(
                            <Input placeholder="请输入名称" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="年龄">
                        {getFieldDecorator('age', {
                            initialValue: 0,
                            rules: [
                                { required: true, message: "请输入年龄" }
                            ]
                        })(
                            <InputNumber placeholder="请输入年龄" min={0} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="性别">
                        {getFieldDecorator('gender', {
                            initialValue: 'male',
                            rules: [
                                { required: true, message: "请选择性别" }
                            ]
                        })(
                            <Select placeholder="请选择性别">{genderOpts}</Select>
                        )}
                    </FormItem>
                </CollPanel>
                <CollPanel title="动态表单1" fold={false}>
                    <DynamicParams {...dynamicProps} />
                </CollPanel>
                <CollPanel title="动态表单2" fold={false}>
                    <DynamicParams {...otherProps} />
                </CollPanel>
                <FormItem {...BtnLabel}>
                    <Button type="primary" icon="save" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create()(HomePage)
