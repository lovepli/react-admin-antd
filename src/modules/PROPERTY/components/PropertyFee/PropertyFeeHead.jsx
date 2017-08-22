import {Form, Select, Input, Button, Row, Col, DatePicker, notification, Icon} from 'antd'
import React from 'react'
import PropertyAddComponent from '../../components/PropertyFee/PropertyFeeAdd'
import { apiPost } from '../../../../api'
const Option = Select.Option
const FormItem = Form.Item
const { RangePicker } = DatePicker


class CollectRentHead extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: '展开',
            none: 'none',
            openPropertyAdd: false
        }
    }
    // 清除
    handleReset = () => {
        this.props.form.resetFields()
    }
    // 弹出框设置
    showModal = () => {
        this.setState({
            openPropertyAdd: true
        })
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        let adopt = false
        this.props.form.validateFields(
            (err) => {
                if (err) {
                    adopt = false
                } else {
                    adopt = true
                }
            },
        )
        if (adopt) {
            let json = this.props.form.getFieldsValue()
            json['startDate'] = this.startDate
            json['endDate'] = this.endDate
            this.props.refresh(null, json, null)
        }
    }
    open = () => {
        if (this.state.open === '展开') {
            this.setState({
                open: '收起搜索',
                none: ''
            })
        } else {
            this.setState({
                open: '展开',
                none: 'none'
            })
        }
    }
    startDate = ''
    endDate = ''
    getDate = (date, dateString) => {
        this.startDate = dateString[0]
        if (dateString[1] > 0) {
            this.endDate = dateString[1] + ' 23:59:59'
        } else {
            this.endDate = dateString[1]
        }
    }
    BatchAuditPropertyFee = async () => {
        await apiPost(
            '/propertyFee/BatchAuditProperty',
            {ids: this.props.RowKeys.toString(),
                auditStatus: 1}
        )
        notification.open({
            message: '提交成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.handleSubmit()
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let { type, ListBuildingInfo} = this.props
        return (
            <div>
                <Form layout="horizontal">
                    <Row>
                        <Col span={8}>
                            <FormItem label="所属楼宇" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('buildId')(
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{ width: 200 }}
                                        placeholder="请选择所属楼宇"
                                        optionFilterProp="children"
                                    >
                                        {ListBuildingInfo.map(BuildingInfo => {
                                            return <Option key={BuildingInfo.id}>{BuildingInfo.buildName}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="客户名称" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('clientName')(
                                    <Input placeholder="请输入" style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="房间编号" labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                {getFieldDecorator('roomNum')(
                                    <Input placeholder="请输入" style={{ width: 200 }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    {type === 2 &&
                <Row style={{display: this.state.none}}>
                    <Col span={8}>
                        <FormItem label="开票状态" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('invoicePropertyStatus')(
                                <Select
                                    showSearch
                                    allowClear
                                    style={{ width: 200 }}
                                    placeholder="请选择开票状态"
                                    optionFilterProp="children"
                                >
                                    <Option key="0">未开票</Option>
                                    <Option key="1">已开票</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="收费状态" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('whetherRentPaid')(
                                <Select
                                    showSearch
                                    allowClear
                                    style={{ width: 200 }}
                                    placeholder="请选择收费状态"
                                    optionFilterProp="children"
                                >
                                    <Option key="0">未收款</Option>
                                    <Option key="1">已收全</Option>
                                    <Option key="2">未收全</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="打印状态" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('whetherPrinted')(
                                <Select
                                    showSearch
                                    allowClear
                                    style={{ width: 200 }}
                                    placeholder="请选择打印状态"
                                    optionFilterProp="children"
                                >
                                    <Option key="0">未打印</Option>
                                    <Option key="1">已打印</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>}
                    {type === 2 &&
                <Row style={{display: this.state.none}}>
                    <Col span={8}>
                        <FormItem label="查询类型" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('dateSelect')(
                                <Select
                                    showSearch
                                    allowClear
                                    style={{ width: 200 }}
                                    placeholder="请选择查询类型"
                                    optionFilterProp="children"
                                >
                                    <Option key="0">实交日期</Option>
                                    <Option key="1">交费期限</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="" labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <RangePicker onChange={this.getDate} />
                        </FormItem>
                    </Col>
                </Row>}
                    <Row>
                        <Col span={16} />
                        <Col span={8}>
                            <div style={{paddingLeft: '25%',
                                marginBottom: 10}}
                            >
                                <Button type="primary" onClick={this.handleSubmit}>搜索</Button>&nbsp;&nbsp;
                                {type === 2 &&
                                <Button onClick={this.handleReset}>清除</Button>}&nbsp;&nbsp;
                                {type === 2 &&
                                <Button onClick={this.open}>{this.state.open}</Button>}
                                {type === 0 &&
                            <Button type="primary" onClick={this.showModal}>收物业费</Button>}
                                {type === 0 &&
                            <Button type="primary" onClick={this.BatchAuditPropertyFee}>批量提交</Button>}
                            </div>
                        </Col>
                    </Row>
                </Form>
                <PropertyAddComponent
                    id={null}
                    refreshTable={this.handleSubmit}
                    visible={this.state.openPropertyAdd}
                />
            </div>
        )
    }
}

let ContractHeadComponent = Form.create()(CollectRentHead)

export default ContractHeadComponent
