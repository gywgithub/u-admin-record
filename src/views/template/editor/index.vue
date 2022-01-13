<template>
  <div class="temp-editor">
    <tinymce-editor></tinymce-editor>
  </div>
</template>

<script>
  import tinymceEditor from '@/components/Tinymce'
  export default {
    name: 'TempEditor',
    components: { tinymceEditor },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
