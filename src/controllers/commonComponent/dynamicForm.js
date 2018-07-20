"use strict"
import React, { Component } from 'react'
import { Form, Input, Button, Icon, Row, Col } from 'antd'

const FormItem = Form.Item
const BtnItemLayout = { wrapperCol: { sm: { span: 12, offset: 8 } } }
class DynamicParams extends Component {
    state = {
        uuid: -1,
        paramKeys: []
    }
    componentDidMount() {
        const { params } = this.props
        let { uuid } = this.state
        this.setState({
            paramKeys: params.map(() => ++uuid),
            uuid,
        })
    }
    add = () => {
        let { uuid, paramKeys } = this.state
        uuid++
        this.setState({
            uuid,
            paramKeys: paramKeys.concat(uuid)
        })

    }
    remove = (k) => {
        const { paramKeys } = this.state
        this.setState({ paramKeys: paramKeys.filter(item => item !== k) })
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        const { paramKeys } = this.state
        const { params, fieldName, btnName, readonly } = this.props
        const paramItems = paramKeys.map((k, i) => {
            return (
                <Form key={k}>
                    <Row gutter={8}>
                        <Col span={6} offset={4}>
                            <FormItem>
                                {getFieldDecorator(`${fieldName}[${k}].key`, {
                                    initialValue: params[k] && params[k].key,
                                    rules: [{ required: true, message: '请输入参数的key' }],
                                })(
                                    <Input placeholder='请输入参数的key' disabled={readonly} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                {getFieldDecorator(`${fieldName}[${k}].value`, {
                                    initialValue: params[k] && params[k].value,
                                    rules: [{ required: true, message: '请输入参数的value' }],
                                })(
                                    <Input placeholder='请输入参数的value'  disabled={readonly} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            {!readonly && <FormItem>
                                <Icon type="close-circle-o" className="default-pointer" onClick={this.remove.bind(this, k)} />
                            </FormItem>}
                        </Col>
                    </Row>
                </Form>
            )
        })
        return (
            <Row className="dynamic-form">
                {!readonly && <div className="dynamic-title">
                    <Button icon="plus" onClick={this.add.bind(this)}>{btnName}</Button>
                </div>}
                <div className="dynamic-content">{paramItems}</div>
            </Row>
        )
    }

}
export default Form.create()(DynamicParams)