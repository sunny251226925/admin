import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

//条形柱状图
let barChart = '';
export const bar = (id,title,Xdata,Ydata) => {
    barChart = echarts.init(document.getElementById(id))
    var option = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            containLabel: false
        },
        xAxis : [
            {
                type : 'category',
                data : Xdata,
                axisTick: {
                    alignWithLabel: true,
                    lineStyle: {
                        color: '#EFF1F4',
                        fontSize: "12px"
                    }
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    rotate: 0,
                    textStyle: {
                        color: '#9A9FA8'
                    },
                    formatter:function(value) {
                        var ret = '';//拼接加\n返回的类目项
                        var maxLength = 5;//每项显示文字个数
                        var valLength = value.length;//X轴类目项的文字个数
                        var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                        if (rowN > 1) {
                            for (var i = 0; i < rowN; i++) {
                                var temp = '';//每次截取的字符串
                                var start = i * maxLength;//开始截取的位置
                                var end = start + maxLength;//结束截取的位置
                                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                temp = value.substring(start, end) + '\n';
                                ret += temp; //凭借最终的字符串
                            }
                            return ret;
                        } else {
                            return value;
                        }
                    }
                },
            }
        ],
        yAxis : [
            {
                axisLabel: {
                    textStyle: {
                        color: '#999EA7'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#E6EAEE'
                    }
                },
                type: 'value',
                minInterval: 1,
                boundaryGap: [0, 0.1],
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            }
        ],
        series : [
            {
                name:'直接访问',
                type: 'bar',
                barWidth: '10px',
                barMaxWidth: '10px',
                data: Ydata,
                itemStyle: {
                    normal: {
                        barBorderRadius: [10, 10, 0, 0]
                    }
                },
            }
        ]
    };
    barChart.setOption(option);
    setTimeout(() => {
        barChart.resize();
    },0)
}

//堆叠条形图
let stripChart = '';
export const strip = (id,title,Xdata,Ydata,legend) => {
    stripChart = echarts.init(document.getElementById(id));
    const option = {
        title: title,
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: legend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis:  {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine:{
                lineStyle: {
                    color: '#bbb'
                }
            },
        },
        yAxis: {
            type: 'category',
            data: Ydata,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        series: [
            {
                type: 'bar',
                stack: '总量',
                barWidth: '10px',
                barMaxWidth: '10px',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: [0, 4, 4, 0]
                    }
                },
                data: Xdata
            }
        ]
    };
    stripChart.setOption(option);
    setTimeout(() => {
        stripChart.resize();
    },0)

}

//饼图
let pieChart = '';
export const pie = (id,title,title2,data,legend) => {
    pieChart = echarts.init(document.getElementById(id));
    const option = {
        color: ['#CC99CC','#99CCFF','#0099CC','#99CCCC','#FF6666'],
        title : {
            text: title,
            subtext: title2,
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: legend
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    pieChart.setOption(option);
    setTimeout(() => {
        pieChart.resize();
    },0)

}

window.onresize = () => {
    if(barChart){
        barChart.resize();
    }
    if(stripChart){
        stripChart.resize();
    }
    if(pieChart){
        pieChart.resize();
    }
}