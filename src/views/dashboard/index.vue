<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>新增用户</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="sqs"
          />
          <div class="bottom">
            <span>
              总用户:
              <vab-count
                :start-val="config2.startVal"
                :end-val="config2.endVal"
                :duration="config2.duration"
                :separator="config2.separator"
                :prefix="config2.prefix"
                :suffix="config2.suffix"
                :decimals="config2.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>用户常搜关键词</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="cy"
            @zr:click="handleZrClick"
            @click="handleClick"
          />
          <div class="bottom">
            <span>
              关键词总数量:
              <vab-count
                :start-val="config3.startVal"
                :end-val="config3.endVal"
                :duration="config3.duration"
                :separator="config3.separator"
                :prefix="config3.prefix"
                :suffix="config3.suffix"
                :decimals="config3.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>功能更新日志</span>
          </div>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              :color="activity.color"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>其他信息</span>
          </div>
          <div style="text-align: center">
            <img src="../../../public/logo.png" alt="" />
            <h1 style="font-size: 30px">经验分享平台</h1>
          </div>
          <el-alert
            title="寄语：感恩相遇，愿世间美好与我们环环相扣，屏幕前的我们，打破桎梏，坚守初心。改变人生命运的机会并没有太多，我们并不是不优秀，我们也并不是一无是处，我们也希望驻足山巅被众人仰望，也许我们缺少的只是一个机会，缺少的只是生命中的导师，希望有一天别人看到的不仅仅是你的努力，还有你的功成名就，出人头地。"
            type="warning"
            :closable="closableIs"
          ></el-alert>
          <br />
          <el-alert
            title="随笔：我一直在寻找成功的途径，我还太年轻，不懂什么是格局，我只知道，能帮助他人，解决问题，就能给我带来收入，这个世界需要赚钱，才能过上平凡的生活；在这个物欲横流的时代，理想主义的我们，即使内心坚决如铁，也似乎寸步难行。"
            type="success"
            :closable="closableIs"
          ></el-alert>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabChart from '@/plugins/echarts'
  import { dependencies, devDependencies } from '../../../package.json'
  export default {
    name: 'Index',
    components: {
      VabChart,
    },
    data() {
      return {
        closableIs: false,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        dependencies: dependencies,
        devDependencies: devDependencies,
        config1: {
          startVal: 0,
          endVal: this.$baseLodash.random(20000, 60000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        config2: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        config3: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },

        //访问量
        fwl: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '访问量',
              type: 'line',
              data: [],
              smooth: true,
              areaStyle: {},
            },
          ],
        },
        //新增用户
        sqs: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: [
                '2020-8-10',
                '2020-8-11',
                '2020-8-12',
                '2020-8-13',
                '2020-8-14',
              ],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '新增用户',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 20, 33, 39],
            },
          ],
        },
        //词云
        cy: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
          },
          series: [
            {
              type: 'wordCloud',
              gridSize: 15,
              sizeRange: [12, 40],
              rotationRange: [0, 0],
              width: '100%',
              height: '100%',
              textStyle: {
                normal: {
                  color() {
                    const arr = [
                      '#1890FF',
                      '#36CBCB',
                      '#4ECB73',
                      '#FBD437',
                      '#F2637B',
                      '#975FE5',
                    ]
                    let index = Math.floor(Math.random() * arr.length)
                    return arr[index]
                  },
                },
              },
              data: [
                {
                  name: '移居',
                  value: 15000,
                },
                {
                  name: '购物',
                  value: 10081,
                },
                {
                  name: '养老',
                  value: 9386,
                },

                {
                  name: '买房',
                  value: 6500,
                },
                {
                  name: '买车',
                  value: 6000,
                },
                {
                  name: '养娃',
                  value: 4500,
                },
                {
                  name: '定居',
                  value: 3800,
                },
                {
                  name: 'never',
                  value: 3000,
                },
                {
                  name: '学习',
                  value: 2500,
                },
                {
                  name: '吃饭',
                  value: 2300,
                },
                {
                  name: '生子',
                  value: 2000,
                },
                {
                  name: '娶妻',
                  value: 1900,
                },
                {
                  name: '旅游',
                  value: 1800,
                },
                {
                  name: '睡觉',
                  value: 1700,
                },
              ],
            },
          ],
        },
        //中国地图
        zgdt: {
          title: {
            text: '2099年全国GDP分布',
            subtext: '数据来自elephant-admin杜撰',
          },
          tooltip: {
            trigger: 'item',
          },
          dataRange: {
            orient: 'horizontal',
            min: 0,
            max: 55000,
            text: ['高', '低'],
            splitNumber: 0,
          },
          series: [
            {
              name: '2099年全国GDP分布',
              type: 'map',
              roam: false,
              zoom: 1.25,
              mapType: 'china',
              mapLocation: {
                x: 'center',
              },
              selectedMode: 'multiple',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                },
                emphasis: {
                  label: {
                    show: true,
                  },
                },
              },
              data: [
                { name: '西藏', value: 605.83 },
                { name: '青海', value: 1670.44 },
                { name: '宁夏', value: 2102.21 },
                { name: '海南', value: 2522.66 },
                { name: '甘肃', value: 5020.37 },
                { name: '贵州', value: 5701.84 },
                { name: '新疆', value: 6610.05 },
                { name: '云南', value: 8893.12 },
                { name: '重庆', value: 10011.37 },
                { name: '吉林', value: 10568.83 },
                { name: '山西', value: 11237.55 },
                { name: '天津', value: 11307.28 },
                { name: '江西', value: 11702.82 },
                { name: '广西', value: 11720.87 },
                { name: '陕西', value: 12512.3 },
                { name: '黑龙江', value: 12582 },
                { name: '内蒙古', value: 14359.88 },
                { name: '安徽', value: 15300.65 },
                { name: '北京', value: 16251.93 },
                { name: '福建', value: 17560.18 },
                { name: '上海', value: 19195.69 },
                { name: '湖北', value: 19632.26 },
                { name: '湖南', value: 19669.56 },
                { name: '四川', value: 21026.68 },
                { name: '辽宁', value: 22226.7 },
                { name: '河北', value: 24515.76 },
                { name: '河南', value: 26931.03 },
                { name: '浙江', value: 32318.85 },
                { name: '山东', value: 45361.85, selected: true },
                { name: '江苏', value: 49110.27 },
                { name: '广东', value: 53210.28 },
              ],
            },
          ],
        },

        //更新日志
        reverse: true,
        activities: [],
        noticeList: [],
        //其他信息
        userAgent: navigator.userAgent,
      }
    },
    created() {},
    mounted() {
      let base = +new Date(2020, 1, 1)
      let oneDay = 24 * 3600 * 1000
      let date = []

      let data = [Math.random() * 1500]
      let now = new Date(base)

      const addData = (shift) => {
        now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
        date.push(now)
        data.push(this.$baseLodash.random(20000, 60000))

        if (shift) {
          date.shift()
          data.shift()
        }

        now = new Date(+new Date(now) + oneDay)
      }

      for (let i = 1; i < 6; i++) {
        addData()
      }
      addData(true)
      this.fwl.xAxis[0].data = date
      this.fwl.series[0].data = data
    },
    methods: {
      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`)
      },
      handleZrClick(e) {},
      handleChangeTheme() {
        this.$baseEventBus.$emit('theme')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

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
          height: 125px;
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
