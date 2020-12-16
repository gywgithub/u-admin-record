<template>
  <div class="editor-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content" class="vab-quill-content">
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
    <el-dialog title="预览效果" :visible.sync="dialogTableVisible">
      <div style="min-height: 60vh">
        <h1 class="news-title">{{ form.title }}</h1>
        <div class="news-content" v-html="form.content"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import vabQuill from '@/plugins/vabQuill'
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
                    placeholder: '内容...',
                    readOnly: false,
                },
                borderColor: '#dcdfe6',
                dialogTableVisible: false,
                form: {
                    title: '',
                    content: '',
                },
                rules: {
                    title: [
                        {
                            required: true,
                            message: '请输入标题',
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
