<template>
  <div class="temp-editor">
    <el-row :gutter="20">
      <el-col :span="12">
        <tinymce-editor v-model="content" :height="300"></tinymce-editor>
      </el-col>
      <el-col :span="12">
        <div class="editor-content" v-html="content" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import tinymceEditor from '@/components/Tinymce'
  export default {
    name: 'TempEditor',
    components: { tinymceEditor },
    data() {
      return {
        content: '',
      }
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .tinymceEditorStyle {
    width: 50%;
  }
  .editor-content {
    margin-top: 20px;
  }
</style>
