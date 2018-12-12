import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export const bar = (id,title,Xdata,Ydata) => {
    var myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    const option = {
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
    myChart.setOption(option);
    setTimeout(() => {
        myChart.resize();
    },0)
    window.onresize = () => {
        myChart.resize();
    }
}