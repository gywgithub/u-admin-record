<template>
  <div class="editor">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <vab-markdown-editor
          ref="mde"
          v-model="value"
          @show-html="handleShowHtml"
        ></vab-markdown-editor>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card shadow="hover">
          <div slot="header">
            <span>实时演示区域</span>
          </div>
          <div v-html="html"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabMarkdownEditor from '@/plugins/vabMarkdownEditor'
  export default {
    name: 'Editor',
    components: { VabMarkdownEditor },
    data() {
      return {
        value: '',
        html: '![](http://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF)',
      }
    },
    methods: {
      handleShowHtml(html) {
        this.html = html
      },
    },
  }
</script>

<style lang="scss" scoped></style>
