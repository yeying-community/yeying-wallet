<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    :multiple="multiple"
    :on-change="handleChange"
    :limit="limit"
    :auto-upload="false"
    :show-file-list="showFileList"
  >
    <slot/>
    <template #tip>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadUserFile } from 'element-plus'

const emit = defineEmits(['change']);
const props = defineProps({
  desc: String,
  action: String,
  multiple: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 1,
  },
  showFileList: {
    type: Boolean,
    default: true,
  },
})
const fileList = ref<UploadUserFile[]>([
])
const handleChange = (uploadFile: { raw: File }) => {
  emit("change",uploadFile)
  console.log(555,fileList)
}
const removeAllFile = () => {
  fileList.value = []
}
defineExpose({ removeAllFile });

</script>
