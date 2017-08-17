// 收费管理 - 审核成功
import React from 'react'
import {Table, Spin, Popconfirm, Icon, notification} from 'antd'
import { apiPost } from '../../../../api'
import PropertyFeeHeadComponent from '../../components/PropertyFee/PropertyFeeHead'
// 引入组件
// React component
class PropertyFeeFinanceSuccess extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            columns: [],
            dataSource: [],
            ListBuildingInfo: []
        }
    }
    handleUpdate = async (id) => {
        await apiPost(
            '/propertyFee/updatePropertyFeeByRecall',
            {id: id}
        )
        notification.open({
            message: '撤回成功',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
        })
        this.refresh1()
    }
    info = (url) => {
        this.props.pro.history.push(url)
    }
    async initialRemarks () {
        this.setState({loading: true})
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        let result = await apiPost(
            '/propertyFee/propertyFeeList',
            {auditStatus: 2}
        )
        const handleUpdate = this.handleUpdate
        const info = this.info
        this.setState({loading: false,
            ListBuildingInfo: ListBuildingInfo.data,
            columns: [{
                title: '序号',
                width: 100,
                dataIndex: 'id',
                key: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '所属楼宇',
                width: 150,
                dataIndex: 'buildName',
                key: 'buildName'
            }, {
                title: '房间编号',
                width: 250,
                dataIndex: 'roomNum',
                key: 'roomNum'
            }, {
                title: '客户名称',
                width: 320,
                dataIndex: 'clientName',
                key: 'clientName'
            }, {
                title: '本期物业费周期',
                width: 280,
                dataIndex: 'periodPropertyFee',
                key: 'periodPropertyFee'
            }, {
                title: '应收金额',
                width: 150,
                dataIndex: 'actualPaidMoney',
                key: 'actualPaidMoney'
            }, {
                title: '交费期限',
                width: 150,
                dataIndex: 'payDeadline',
                key: 'payDeadline'
            }, {
                title: '实收物业费日期',
                width: 150,
                dataIndex: 'receiptDate',
                key: 'receiptDate'
            }, {
                title: '逾期天数',
                width: 150,
                dataIndex: 'overdueDay',
                key: 'overdueDay'
            }, {
                title: '延期下个月电费',
                width: 150,
                dataIndex: 'lateConductWay',
                key: 'lateConductWay',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.lateConductWay === 0) {
                        whType = '否'
                    }
                    if (record.lateConductWay === 1) {
                        whType = '是'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '物业费开票状态',
                width: 150,
                dataIndex: 'invoicePropertyStatus',
                key: 'invoicePropertyStatus',
                render: function (text, record, index) {
                    let whType = ''
                    if (record.invoicePropertyStatus === 0) {
                        whType = '未开票'
                    }
                    if (record.invoicePropertyStatus === 1) {
                        whType = '已开票'
                    }
                    return (
                        <span>{whType}</span>
                    )
                }
            }, {
                title: '审核时间',
                width: 150,
                dataIndex: 'auditDate',
                key: 'auditDate'
            }, {
                title: '审核人',
                width: 150,
                dataIndex: 'auditName',
                key: 'auditName'
            }, {
                title: '申请人',
                width: 150,
                dataIndex: 'updateName',
                key: 'updateName'
            }, {
                title: '申请日期',
                width: 150,
                dataIndex: 'updateDate',
                key: 'updateDate'
            }, {
                title: '操作',
                width: 100,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    if (record.lateMoney === 0 && record.paidMoney === 0) {
                        let url = '/home/finance/propertyFeeDetails/PropertyFeeDetailNoPaid/' + record.id
                        return (
                            <div>
                                <a onClick={() => info(url)}> 收款 &nbsp;</a>
                                <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                    <a> 撤回 </a>
                                </Popconfirm>
                            </div>
                        )
                    } else if (record.whetherRentPaid !== 1) {
                        let url = '/home/finance/propertyFeeDetails/PropertyFeeDetailNoLate/' + record.id
                        return (
                            <div>
                                <a onClick={() => info(url)}> 收款 &nbsp;</a>
                                <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                    <a> 撤回 </a>
                                </Popconfirm>
                            </div>
                        )
                    } else if (record.lateMoney === 0 && record.whetherRentPaid === 1) {
                        let url = '/home/finance/propertyFeeDetails/NoLateAndPropertyFinish/' + record.id
                        return (
                            <div>
                                <a onClick={() => info(url)}> 收款 &nbsp;</a>
                                <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                    <a> 撤回 </a>
                                </Popconfirm>
                            </div>
                        )
                    } else if (record.lateMoney !== 0 && record.whetherRentPaid === 1 && record.whetherLatePaid !== 1) {
                        let url = '/home/finance/propertyFeeDetails/PropertyFinishAndLate/' + record.id
                        return (
                            <div>
                                <a onClick={() => info(url)}> 收款 &nbsp;</a>
                                <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                    <a> 撤回 </a>
                                </Popconfirm>
                            </div>
                        )
                    } else if (record.lateMoney !== 0 && record.whetherRentPaid === 1 && record.whetherLatePaid === 1) {
                        let url = '/home/finance/propertyFeeDetails/PropertyFeeDetail/' + record.id
                        return (
                            <div>
                                <a onClick={() => info(url)}> 收款 &nbsp;</a>
                                <Popconfirm title="确定撤回吗?" onConfirm={() => handleUpdate(record.id)}>
                                    <a> 撤回 </a>
                                </Popconfirm>
                            </div>
                        )
                    }
                }
            }],
            dataSource: result.data
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async (pagination, filters, sorter) => {
        filters['auditStatus'] = 2
        // 刷新表格
        let result = await apiPost(
            '/propertyFee/propertyFeeList',
            filters
        )
        this.setState({
            openAdd: false,
            openTableAddUp: false,
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    clientName = null
    entryNameOnChange = (e) => {
        this.clientName = e.target.value
    }
    roomNum = ''
    entryNumberOnChange = (e) => {
        this.roomNum = e.target.value
    }
    query = () => {
        this.refresh()
    }
    render () {
        return (
            <div>
                <PropertyFeeHeadComponent
                    refresh={this.refresh}
                    ListBuildingInfo={this.state.ListBuildingInfo}
                />
                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 2200 }}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default PropertyFeeFinanceSuccess


