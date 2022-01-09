<template>
  <div class="add-share">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="主标题" prop="title">
        <el-row>
          <el-col :span="6">
            <el-input
              v-model="form.title"
              maxlength="30"
              placeholder="最多30字"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="所属类别" prop="isSelectProfession">
        <el-row>
          <el-col :span="6">
            <el-cascader
              ref="mycascader"
              v-model="form.isSelectProfession"
              style="width: 100%"
              :props="props"
              :clearable="true"
              @change="getProfession"
            ></el-cascader>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="价值共享" prop="shareMode" class="vab-quill-content">
        <div class="mt8">
          <el-radio-group v-model="form.shareMode">
            <el-radio :label="2">
              共享模式
              <el-popover
                placement="right"
                title="规则"
                width="300"
                trigger="click"
              >
                <p>
                  1:
                  您的打赏中90%(100%-10%)的象币将按一定比例90天内分享给每位分享者
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="算法： 每位分享者所得到的象币 = 发起者打赏象币的90% * 分享者个人获得的点赞数 / 所有分享者的总点赞数"
                    placement="top-start"
                  >
                    <el-link
                      icon="el-icon-question"
                      :underline="false"
                    ></el-link>
                  </el-tooltip>
                </p>
                <p>
                  2:
                  您自己将会得到自己打赏自己的10%(既上面的10%)象币，因为发起分享的人，属于分享者的一种特殊群体
                </p>
                <p>
                  3:
                  只要有人打赏您发起的分享，或打赏您名下分享者的经验时，您都将固定获得打赏人总象币的10%;
                  &nbsp;&nbsp;&nbsp;
                  <b style="color: red">且是永久的</b>
                </p>
                <p>
                  4: 上架中的经验分享将在180天后，自动转为付费模式（0.1元/次）
                </p>
                <el-button
                  slot="reference"
                  class="tipRule"
                  icon="el-icon-question"
                ></el-button>
              </el-popover>
            </el-radio>
            <el-radio :label="1">
              打赏模式
              <el-popover
                placement="right"
                title="规则"
                width="300"
                trigger="click"
              >
                <p>
                  1: 您打赏的象币将按一定比例90天内全部分享给每位分享者
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="算法： 每位分享者所得到的象币 = 发起者打赏象币的100% * 分享者个人获得的点赞数 / 所有分享者的总点赞数"
                    placement="top-start"
                  >
                    <el-link
                      icon="el-icon-question"
                      :underline="false"
                    ></el-link>
                  </el-tooltip>
                </p>
                <p>
                  2:上架中的经验分享将在180天后，自动转为付费模式（0.1元/次）
                </p>
                <el-button
                  slot="reference"
                  class="tipRule"
                  icon="el-icon-question"
                ></el-button>
              </el-popover>
            </el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="打赏额度" prop="bounty">
        <el-row>
          <el-col :span="6">
            <el-input
              v-model="form.bounty"
              placeholder="1人民币= 10象币"
              suffix-icon="el-icon-potato-strips"
              type="text"
              max-length="6"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="简单描述" prop="content" class="vab-quill-content">
        <el-row>
          <el-col :span="8">
            <el-input
              v-model="form.content"
              type="textarea"
              maxlength="300"
              show-word-limit
              :autosize="{ minRows: 8 }"
              placeholder="限300字"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave">提 交</el-button>
        <el-button type="primary" @click="handleSee">预览效果</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="预览" :visible.sync="dialogTableVisible">
      <div style="min-height: 60vh">
        <h3 class="news-title">{{ form.title }}</h3>
        <div class="news-content" v-html="form.content"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import vabQuill from '@/plugins/vabQuill'
  let id = 0
  export default {
    name: 'AddShare',
    components: { vabQuill },
    data() {
      return {
        topicTimeLine: [
          {
            id: 1,
            title: '子标题',
            content:
              ' 为一个全局变量的仓库。但是和单纯的全局变量又有一些区别，主要体现在当 store 中的状态发生改变时，相应的 vue',
            timeValue: '2020-08-23 10:02:10',
          },
          {
            id: 2,
            title: '子标题',
            content:
              '都应当存放在 store.js 里面，Vue 组件可以从 store.js 里面获取状态，可以把 store 通俗的理解',
            timeValue: '2020-08-23 08:25:30',
          },
          {
            id: 3,
            title: '子标题',
            content: '中的状态发生改变时，相应的 vue 组件也会得到高效更新。',
            timeValue: '2020-08-23 06:00:12',
          },
        ],
        options: {
          theme: 'snow',
          bounds: document.body,
          debug: 'warn',
          modules: {
            toolbar: [
              ['bold', 'underline', 'strike'],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ size: ['small', false, 'large', 'huge'] }],
              // [{ color: [] }, { background: [] }],
              [{ color: [] }],
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              // [{ indent: '-1' }, { indent: '+1' }],
              [{ align: [] }],
              // [{ direction: 'rtl' }],
              [{ font: [] }],
              // ['clean'],
              ['link'],
            ],
          },
          placeholder: '最多500字.',
          readOnly: false,
        },
        borderColor: '#dcdfe6',
        dialogTableVisible: false,
        isOpenMoenyShare: false,
        props: {
          lazy: true,
          lazyLoad(node, resolve) {
            const { level } = node
            setTimeout(() => {
              const nodes = Array.from({ length: level + 1 }).map((item) => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2,
              }))
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes)
            }, 300)
          },
        },
        form: {
          title: '',
          content: '',
          isOpenSwitch: false,
          shareMode: 2,
          isSelectProfession: '',
        },
        rules: {
          title: [
            {
              required: true,
              message: '请输入标题',
              trigger: 'change',
            },
          ],
          isSelectProfession: [
            {
              required: true,
              message: '请选择所属类别',
              trigger: 'change',
            },
          ],
          shareMode: [
            {
              required: true,
              trigger: 'change',
            },
          ],
          bounty: [
            {
              required: true,
              message: '请输入',
              trigger: 'change',
            },
          ],
          content: [
            {
              required: true,
              message: '请输入内容',
              trigger: 'change',
            },
          ],
        },
      }
    },
    methods: {
      handleSee() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.dialogTableVisible = true
          } else {
            return false
          }
        })
      },
      deleEditedContent() {},
      swichChange() {
        this.isOpenSwitch = this.form.isOpenSwitch
      },
      getProfession(val) {
        if (!this.$refs.mycascader.getCheckedNodes()[0].pathLabels) {
          this.isSelectCity = ''
        }
        console.dir(this.$refs.mycascader.getCheckedNodes()[0].pathLabels)
      },
      handleSave() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$baseMessage('提交成功', 'success')
          } else {
            return false
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .add-share {
    .tipRule {
      font-size: 14px;
      border: none;
      padding: 0px;
    }
    .mainTitle {
      text-align: center;
      width: 100%;
      height: 30px;
      min-width: 200px;
    }
    .timeLineDele {
      font-weight: bold;
    }
    .tipRule:hover {
      color: #606266;
    }
    .news {
      &-title {
        text-align: center;
      }

      &-content {
        ::v-deep {
          p {
            line-height: 30px;

            img {
              display: block;
              margin-right: auto;
              margin-left: auto;
            }
          }
        }
      }
    }

    .vab-quill-content {
      ::v-deep {
        .el-form-item__content {
          line-height: normal;
        }
      }
    }
  }
</style>
