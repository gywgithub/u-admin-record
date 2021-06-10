<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>访问量</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="ssq"/>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>访问量2</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="dlt"/>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card shadow="never">
          <div slot="header" class="addHanndle">
            <span>访问量3</span>
            <el-select v-model="value" placeholder="请选择" style="float:right;">
              <el-option
                v-for="item in timeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="single"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import VabChart from '@/plugins/echarts'
    export default {
        name: 'Test',
        components: {
            VabChart,
        },
        data() {
            return {
                value:1,
                //ssq
                ssqRedData:[68, 53, 49, 50, 43, 52, 63, 55, 48, 52, 62, 64, 44, 54, 43, 62],
                ssqBlueData:[182, 166, 140, 143, 152, 192, 145, 149, 178, 147, 160, 155, 149, 179, 145, 160, 155, 166, 175, 166, 137, 185, 152, 142, 157, 164, 164, 140, 153, 129, 147, 166, 132],
                //dlt
                dltRedData:[330, 360, 355, 358, 361, 334, 371, 329, 346, 389, 357, 370],
                dltBlueData:[321, 284, 313, 268, 307, 295, 310, 268, 280, 289, 303, 279, 286, 291, 267, 242, 279, 290, 309, 294, 278, 334, 307, 281, 291, 283, 294, 286, 380, 356, 325, 365, 382, 341, 372],
                //single
                singleRedData:[330, 360, 355, 358, 361, 334, 371, 329, 346, 389, 357, 370],
                singleBlueData:[321, 284, 313, 268, 307, 295, 310, 268, 280, 289, 303, 279, 286, 291, 267, 242, 279, 290, 309, 294, 278, 334, 307, 281, 291, 283, 294, 286, 380, 356, 325, 365, 382, 341, 372],
                timeList: [{
                    value: 1,
                    label: '7天'
                }, {
                    value: 2,
                    label: '15天'
                }, {
                    value: 3,
                    label: '30天'
                }, {
                    value: 4,
                    label: '90天'
                }, {
                    value: 5,
                    label: '180天'
                }, {
                    value: 6,
                    label: '365天'
                }, {
                    value: 7,
                    label: '无限'
                }],
                //访问量
                ssq: {
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        splitLine:{show:false}, //隐藏y轴网格线
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33']
                    },
                    yAxis: {
                        type: 'value',
                        interval:50,//步长
                        min:0, //起始
                        max:250 //终止
                    },
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            smooth: true, //是否开启平滑曲线
                            itemStyle : {
                                normal : {
                                    color:'#28B463',
                                    lineStyle:{
                                        color:'#28B463'
                                    }
                                }
                            },
                            data: []
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            smooth: true, //是否开启平滑曲线
                            itemStyle : {
                                normal : {
                                    color:'#FF3339', //折线节点的颜色(红色)
                                    lineStyle:{
                                        color:'#FF3339' //折线的颜色
                                    }
                                }
                            },
                            data: []
                        }
                    ]
                },
                dlt: {
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        splitLine:{show:false}, //隐藏y轴网格线
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35']
                    },
                    yAxis: {
                        type: 'value',
                        interval:50,//步长
                        min:200, //起始
                        max:450 //终止
                    },
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            smooth: true, //是否开启平滑曲线
                            itemStyle : {
                                normal : {
                                    color:'#28B463',
                                    lineStyle:{
                                        color:'#28B463'
                                    }
                                }
                            },
                            data: []
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            smooth: true, //是否开启平滑曲线
                            itemStyle : {
                                normal : {
                                    color:'#FF3339', //折线节点的颜色(红色)
                                    lineStyle:{
                                        color:'#FF3339' //折线的颜色
                                    }
                                }
                            },
                            data: []
                        }
                    ]
                },
                single: {
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        splitLine:{show:false}, //隐藏y轴网格线
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35']
                    },
                    yAxis: {
                        type: 'value',
                        interval:50,//步长
                        min:200, //起始
                        max:450 //终止
                    },
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            smooth: true, //是否开启平滑曲线
                            itemStyle : {
                                normal : {
                                    color:'#28B463',
                                    lineStyle:{
                                        color:'#28B463'
                                    }
                                }
                            },
                            data: []
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            smooth: true, //是否开启平滑曲线
                            itemStyle : {
                                normal : {
                                    color:'#FF3339', //折线节点的颜色(红色)
                                    lineStyle:{
                                        color:'#FF3339' //折线的颜色
                                    }
                                }
                            },
                            data: []
                        }
                    ]
                },
            }
        },
        created() {

        },
        mounted() {
            //ssq
            this.ssq.series[0].data = this.ssqBlueData;
            this.ssq.series[1].data = this.ssqRedData;
            //dlt
            this.dlt.series[0].data = this.dltBlueData;
            this.dlt.series[1].data = this.dltRedData;
            //single
            this.single.series[0].data = this.singleBlueData;
            this.single.series[1].data = this.singleRedData;
        },
        methods: {

        },
    }
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;
    .addHanndle{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    ::v-deep {
      .el-alert {
        padding: $base-padding;

        &--info.is-light {
          min-height: 82px;
          padding: $base-padding;
          margin-bottom: 15px;
          color: #909399;
          background-color: $base-color-white;
          border: 1px solid #ebeef5;
        }
      }

      .el-card__body {
        .echarts {
          width: 100%;
          height: 400px;
        }
      }
    }

    .card {
      min-height: 400px;
      ::v-deep {
        .el-card__body {
          .echarts {
            width: 100%;
            height: 305px;
          }
        }
      }
    }

    .bottom {
      padding-top: 20px;
      margin-top: 5px;
      color: #595959;
      text-align: left;
      border-top: 1px solid $base-border-color;
    }

    .table {
      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;

      td {
        position: relative;
        min-height: 20px;
        padding: 9px 15px;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #e6e6e6;

        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }

    .icon-panel {
      height: 100px;
      text-align: center;
      cursor: pointer;

      svg {
        font-size: 40px;
      }

      p {
        margin-top: 10px;
      }
    }

    .bottom-btn {
      button {
        margin: 5px 10px 15px 0;
      }
    }
  }
</style>
