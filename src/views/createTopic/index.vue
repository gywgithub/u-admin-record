<template>
  <div class="editor-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" maxlength="100" placeholder="最多100字"></el-input>
      </el-form-item>
<!--      <el-form-item label="标题" prop="selectDate">-->
<!--        <el-date-picker-->
<!--          v-model="form.selectDate"-->
<!--          type="date"-->
<!--          placeholder="选择日期">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item label="所属行业" prop="isSelectProfession">
        <el-cascader
          ref="mycascader"
          :props="props"
          v-model="form.isSelectProfession"
          @change="getProfession"
          :clearable="true"></el-cascader>
      </el-form-item>
      <el-form-item label="价值共享" prop="radio" class="vab-quill-content">
<!--        <el-switch-->
<!--          class="mt5"-->
<!--          v-model="form.isOpenSwitch"-->
<!--          active-color="#409eff"-->
<!--          inactive-color="#dcdfe6"-->
<!--          @change="swichChange">-->
<!--        </el-switch>-->
        <div class="mt8">
          <el-radio-group v-model="form.radio">
            <el-radio :label="2">
              共享模式
              <el-popover
                placement="right"
                title="规则"
                width="300"
                trigger="hover">
                <p>1: 您的打赏中90%(100%-10%)的象币将按一定比例分享给每位分享者
                  <el-tooltip class="item" effect="dark" content="算法： 每位分享者所得到的象币 = 发起者打赏象币的90% * 分享者个人获得的点赞数 / 所有分享者的总点赞数" placement="top-start">
                    <el-link icon="el-icon-question" :underline="false"></el-link>
                  </el-tooltip>
                </p>
                <p>2: 您自己将会得到自己打赏自己的10%(既上面的10%)象币，因为发起分享的人，属于分享者的一种特殊情况</p>
                <p>3: 只要有人打赏你发起的分享，或打赏你名下分享者的经验时，你都将固定获得打赏人总象币的10%; &nbsp;&nbsp;&nbsp; <b style="color:red;">且是永久的 </b></p>
                <el-button slot="reference" class="tipRule" icon="el-icon-question"></el-button>
              </el-popover>
            </el-radio>
            <el-radio :label="1">
              打赏模式
              <el-popover
                placement="right"
                title="规则"
                width="300"
                trigger="hover">
                <p>1: 您打赏的象币将按一定比例全部分享给每位分享者
                  <el-tooltip class="item" effect="dark" content="算法： 每位分享者所得到的象币 = 发起者打赏象币的100% * 分享者个人获得的点赞数 / 所有分享者的总点赞数" placement="top-start">
                    <el-link icon="el-icon-question" :underline="false"></el-link>
                  </el-tooltip>
                </p>
                <el-button slot="reference" class="tipRule" icon="el-icon-question"></el-button>
              </el-popover>
            </el-radio>
          </el-radio-group>
          <div class="mt10">
            打赏额度：
            <el-input
              placeholder="1人民币= 10象币"
              suffix-icon="el-icon-potato-strips"
              style="width:200px;"
              type="text"
              maxLength="6"
              v-model="form.moneyVal">
            </el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="详细描述" prop="content" class="vab-quill-content">
        <vab-quill
          v-model="form.content"
          :min-height="400"
          :options="options"
        ></vab-quill>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSee">预览效果</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
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
    let id = 0;
    export default {
        name: 'Editor',
        components: { vabQuill },
        data() {
            return {
                options: {
                    theme: 'snow',
                    bounds: document.body,
                    debug: 'warn',
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            [{ size: ['small', false, 'large', 'huge'] }],
                            [{ color: [] }, { background: [] }],
                            ['blockquote', 'code-block'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ script: 'sub' }, { script: 'super' }],
                            [{ indent: '-1' }, { indent: '+1' }],
                            [{ align: [] }],
                            [{ direction: 'rtl' }],
                            [{ font: [] }],
                            ['clean'],
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
                    lazyLoad (node, resolve) {
                        const { level } = node;
                        setTimeout(() => {
                            const nodes = Array.from({ length: level + 1 })
                                .map(item => ({
                                    value: ++id,
                                    label: `选项${id}`,
                                    leaf: level >= 2
                                }));
                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                            resolve(nodes);
                        }, 1000);
                    }
                },
                form: {
                    title: '',
                    content: '',
                    isOpenSwitch:false,
                    radio:2,
                    moneyVal:'',
                    isSelectProfession : ''
                },
                rules: {
                    title: [
                        {
                            required: true,
                            message: '请输入标题',
                            trigger: 'blur',
                        },
                    ],
                    isSelectProfession: [
                        {
                            required: true,
                            message: '请选择所属行业',
                            trigger: 'blur',
                        },
                    ],
                    radio: [
                        {
                            required: true,
                            trigger: 'blur',
                        },
                    ],
                    content: [
                        {
                            required: true,
                            message: '请输入内容',
                            trigger: 'blur',
                        },
                    ],
                },
            }
        },
        methods: {
            handleSee() {
                this.$refs['form'].validate((valid) => {
                    this.$refs.form.validateField('content', (errorMsg) => {})
                    if (valid) {
                        this.dialogTableVisible = true
                    } else {
                        return false
                    }
                })
            },
            swichChange(){
                this.isOpenSwitch = this.form.isOpenSwitch;
            },
            getProfession(val){
                if(!this.$refs.mycascader.getCheckedNodes()[0].pathLabels){
                    this.isSelectCity = '';
                }
                console.dir(this.$refs.mycascader.getCheckedNodes()[0].pathLabels);
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    this.$refs.form.validateField('content', (errorMsg) => {
                        this.borderColor = '#dcdfe6'
                        if (errorMsg) {
                            this.borderColor = '#F56C6C'
                        }
                    })
                    if (valid) {
                        this.$baseMessage('submit!', 'success')
                    } else {
                        return false
                    }
                })
            },
        },
    }
</script>
<style lang="scss" scoped>
  .editor-container {
    .tipRule{
      font-size:14px;
      border:none;
      padding:0px;
    }
    .tipRule:hover{
      color:#606266;
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
