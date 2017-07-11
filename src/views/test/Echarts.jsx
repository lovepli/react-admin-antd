// echarts-react 测试组件
import React from 'react'
import ReactEcharts from 'echarts-for-react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell
} from 'recharts'
// 日期组件
import { DatePicker } from 'antd'
import moment from 'moment'
const RangePicker = DatePicker.RangePicker

function onChange (dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1])
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
}


const data = [{name: 'Group A',
    value: 76}, {name: 'Group B',
    value: 56}, {name: 'Group C',
    value: 40}, {name: 'Group D',
    value: 20}, {name: 'Group E',
    value: 12}]
const COLORS = ['#48A9EF', '#99D97C', '#FFD96E', '#F3857A', '#8997E7']


// 今日 数据
const dateA = [
    {
        name: '电器系统',
        '故障台数': 10
    }, {
        name: '电梯系统',
        '故障台数': 12
    }, {
        name: '空调系统',
        '故障台数': 8
    }, {
        name: '水暖系统',
        '故障台数': 1
    }, {
        name: '消防监控系统',
        '故障台数': 14
    }
]

// 本周 数据
const dateB = [
    {
        name: '电器系统',
        '故障台数': 20
    }, {
        name: '电梯系统',
        '故障台数': 25
    }, {
        name: '空调系统',
        '故障台数': 22
    }, {
        name: '水暖系统',
        '故障台数': 11
    }, {
        name: '消防监控系统',
        '故障台数': 12
    }
]

// 某个时间段 数据
const dateC = [
    {
        name: '电器系统',
        '故障台数': 30
    }, {
        name: '电梯系统',
        '故障台数': 40
    }, {
        name: '空调系统',
        '故障台数': 32
    }, {
        name: '水暖系统',
        '故障台数': 6
    }, {
        name: '消防监控系统',
        '故障台数': 22
    }
]
class Echarts extends React.Component {
    constructor (props) {
        super(props)

        this.todayData = this.todayData.bind(this)
        this.yesterdayData = this.yesterdayData.bind(this)
        this.intervalData = this.intervalData.bind(this)
        this.state = {
            data1: dateA,
            data: [
                {value: 20,
                    name: '1星'},
                {value: 6,
                    name: '2星'},
                {value: 10,
                    name: '3星'},
                {value: 20,
                    name: '4星'},
                {value: 28,
                    name: '5星'},
                {value: 18,
                    name: '未评价'}
            ]
        }
    }
    todayData () {
        this.setState({data1: dateA})
    }

    yesterdayData () {
        this.setState({data1: dateB})
    }

    intervalData () {
        this.setState({data1: dateC})
    }
    getOtion = () => {
        const option = {
            title: {
                text: '客户评价情况',
                subtext: ' ',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['1星', '2星', '3星', '4星', '5星', '未评价']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    center: ['55%', '60%'],
                    data: this.state.data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option
    }
    render () {
        return (
            <div className="examples">
                <div>
                    <div style={{'float': 'left',
                        'width': '450px',
                        'height': '350px'}}>
                        <h2 style={{ 'lineHeight': 'normal',
                            'fontSize': '18px',
                            'color': '#333'}}>客户报修情况</h2>
                        <div style={{'width': '300px',
                            'height': '300px',
                            'float': 'left'}}>
                            <PieChart width={300} height={300} onMouseEnter={this.onPieEnter}>
                                <Pie
                                    data={data}
                                    cx={120}
                                    cy={180}
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={0}
                                >
                                    {
                                        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                            </PieChart>
                        </div>
                        <div style={{'width': '150px',
                            'float': 'left',
                            'color': '#000',
                            'paddingTop': '110px',
                            'lineHeight': '30px'}}>
                            <ul>
                                <li><span style={{'width': '10px',
                                    'height': '10px',
                                    'marginRight': '5px',
                                    'borderRadius': '50%',
                                    'display': 'inline-block',
                                    'background': '#48A9EF'}} />未派单 {data[0].value}</li>
                                <li><span style={{'width': '10px',
                                    'height': '10px',
                                    'marginRight': '5px',
                                    'borderRadius': '50%',
                                    'display': 'inline-block',
                                    'background': '#99D97C'}} />已完工 {data[1].value}</li>
                                <li><span style={{'width': '10px',
                                    'height': '10px',
                                    'marginRight': '5px',
                                    'borderRadius': '50%',
                                    'display': 'inline-block',
                                    'background': '#FFD96E'}} />进行中 {data[2].value}</li>
                                <li><span style={{'width': '10px',
                                    'height': '10px',
                                    'marginRight': '5px',
                                    'borderRadius': '50%',
                                    'display': 'inline-block',
                                    'background': '#F3857A'}} />取消工单 {data[3].value}</li>
                                <li><span style={{'width': '10px',
                                    'height': '10px',
                                    'marginRight': '5px',
                                    'borderRadius': '50%',
                                    'display': 'inline-block',
                                    'background': '#8997E7'}} />作废工单 {data[4].value}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="parent" style={{'float': 'left'}}>
                        <ReactEcharts
                            option={ this.getOtion() }
                            style={{
                                height: '350px',
                                width: '350px'
                            }}
                            className="react_for_echarts"
                        />
                    </div>
                    <p className="clearfix" />
                </div>

                <div>
                    <h2 style={{ 'lineHeight': 'normal',
                        'fontSize': '18px',
                        'color': '#333'}}>设备故障情况</h2>
                    <div>
                        <div style={{'float': 'left',
                            'width': '200px',
                            'height': '200px'}}>
                            <ul style={{'padding': '15px',
                                'lineHeight': '1.9'}}>
                                <li><p>设备总数</p><span style={{'fontSize': '30px'}}>124,345</span></li>
                                <li><p>在用</p><span style={{'fontSize': '30px'}}>23,345</span></li>
                                <li><p>闲置</p><span style={{'fontSize': '30px'}}>23,345</span></li>
                                <li><p>报废</p><span style={{'fontSize': '30px'}}>23,345</span></li>
                            </ul>
                        </div>
                        <div style={{'float': 'left'}}>
                            <p style={{'padding': '15px 45px'}}>
                                <a style={{ marginRight: '1rem' }} onClick={ this.todayData }> 今日 </a>
                                <a style={{ marginRight: '1rem' }} onClick={ this.yesterdayData }> 本周 </a>
                                <a style={{ marginRight: '1rem' }} onClick={ this.intervalData }> 本月 </a>
                                <RangePicker
                                    ranges={{ Today: [moment(), moment()],
                                        'This Month': [moment(), moment().endOf('month')] }}
                                    onChange={onChange}
                                />
                            </p>
                            <BarChart width={ 600 } height={ 400 } data={ this.state.data1 } >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="故障台数" fill="#8884d8" />
                            </BarChart>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Echarts
