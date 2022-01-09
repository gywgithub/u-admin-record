<template>
  <div id="edit-share" class="edit-share">
    <el-row>
      <el-col :span="24">
        <h3 style="margin-top: 20px; margin-bottom: 50px; text-align: center">
          美国51区是否有外星人？
        </h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="form">
          <el-form-item label="子标题" prop="title" label-width="70px">
            <el-input
              v-model="form.title"
              size="medium"
              maxlength="50"
              placeholder="最多50字"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="content" class="vab-quill-content">
            <vab-quill
              v-model="form.content"
              :min-height="400"
              :options="options"
            ></vab-quill>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="cusee" @click="handleSee">
              添加至右侧预览
              <!--                <el-tooltip class="item" effect="dark" content="" placement="top-start">-->
              <!--                  <el-link icon="el-icon-question" :underline="false"></el-link>-->
              <!--                </el-tooltip>-->
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in topicTimeLine"
            :key="index"
            timestamp="2018/4/12"
            placement="top"
            :timestamp="item.timeValue"
          >
            <el-card>
              <div slot="header" class="clearfix ovfl">
                <span class="timeLineDele">{{ item.title }}</span>
                <el-button
                  style="float: right; padding: 0"
                  type="text"
                  @click="deleEditedContent(item, index)"
                >
                  删除
                </el-button>
              </div>
              <p>{{ item.content }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
    <el-row :span="24">
      <el-col>
        <el-button type="primary cusub" @click="handleSave">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import vabQuill from '@/plugins/vabQuill'
  export default {
    name: 'EditShare',
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
        form: {
          title: '',
          content: '',
        },
        options: {
          theme: 'snow',
          bounds: document.body,
          debug: 'warn',
          modules: {
            toolbar: [
              ['bold', 'underline', 'strike'],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ color: [] }],
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ align: [] }],
              [{ font: [] }],
              ['link'],
            ],
          },
          placeholder: '最多500字.',
          readOnly: false,
        },
        borderColor: '#dcdfe6',
        dialogTableVisible: false,
        isOpenMoenyShare: false,
      }
    },
    methods: {
      handleSee() {
        if (this.form.content == '' || this.form.title == '') {
          this.$baseMessage('未填写完整', 'error')
          return
        }
        let o = {
          id: new Date().getTime(),
          title: this.form.title,
          content: this.form.content,
          timeValue: '2020-05-36 18:25:21',
        }
        this.topicTimeLine.unshift(o)
        this.$baseMessage('已添加至右侧', 'success')
        this.form.content = ''
        this.form.title = ''
      },
      handleSave() {
        this.$baseMessage('提交成功', 'success')
        let that = this
        setTimeout(function () {
          that.$router.push('/topicManage/index')
        }, 1500)
      },
      deleEditedContent(o, i) {
        this.topicTimeLine.splice(i, 1)
        this.$baseMessage('删除成功', 'success')
      },
    },
  }
</script>

<style scoped>
  .cusub {
    width: 200px;
    height: 45px;
    border: none;
    display: block;
    margin: 0px auto;
    margin-bottom: 40px;
  }
  .cusee {
    border: none;
    display: block;
    margin: 0px auto;
    margin-bottom: 40px;
  }
</style>
