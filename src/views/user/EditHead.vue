<template>
  <el-dialog
    v-model="open"
    title="修改头像"
    :before-close="closeModal"
    width="350px"
    class="avatar-dialog"
  >
    <div class="dialog-content">
      <div class="flex-container">
        <!-- <div class="upload-section">
          <div class="section-title">
            本地上传
            <span class="file-types">(支持图片类型: png, jpg, gif)</span>
          </div>
          <div class="uploader-container">
            <Uploader />
          </div>
          <div class="recommend-title">热门推荐</div>
          <div class="image-grid">
            <img
              v-for="item in imgList"
              :key="item"
              :src="item"
              class="recommend-image"
              @click="curImg = item"
            />
          </div>
        </div> -->
        <div class="preview-section">
          <!-- <div class="section-title">头像预览</div> -->
          <div class="avatar-preview">
            <EditAvatar ref="editAvatar" :curImg="curImg"/>
            <!-- <img :src="curImg" class="preview-image" /> -->
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal">{{ $t("common.cancel") }}</el-button>
        <el-button type="primary" @click="confirmAvatar">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import Uploader from '@/components/common/Uploader.vue'
import EditAvatar from "@/views/login/avatar/EditAvatar.vue";
import $account from '@/plugins/account'
const props = defineProps(["isOpen"])
const emit = defineEmits(['close','confirmAvatar'])
const editAvatar = ref()
const open = ref(false)
const curImg = ref('')

const closeModal = () => {
  open.value = false
  emit("close")
}

const openModal = (img) => {
  open.value = true
  // curImg.value = img
}

const confirmAvatar = async () => {
  // 确认选择的头像逻辑
  console.log('Selected avatar:', curImg.value)
  const img = await editAvatar.value.finish()
  // curImg.value = img
  emit("confirmAvatar",img)
  console.log('img====>',img)
  closeModal()
}

onMounted(async () => {
  open.value = props.isOpen
  // const info = await $account.getActiveIdentity()
  // console.log('init--->',info)
})

defineExpose({
  openModal
})
</script>

<style lang="less" scoped>
.avatar-dialog {
  

  .flex-container {
    display: flex;
    gap: 10px;
  }

  .upload-section {
    flex: 2;
    padding-right: 16px;
    border-right: 1px solid var(--el-border-color-light);
    width:66%;
  }

  .preview-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    margin-bottom: 12px;

    .file-types {
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }
  }

  .recommend-title {
    font-size: 14px;
    font-weight: 400;
    color: var(--el-text-color-primary);
    margin: 24px 0 12px;
  }

  .uploader-container {
    margin-top: 12px;
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    max-height: 192px;
    overflow-y: auto;
    padding-right: 8px;

    .recommend-image {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.05);
        box-shadow: var(--el-box-shadow-light);
      }
    }
  }

  .avatar-preview {

    .preview-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid var(--el-border-color-lighter);
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
    border-top: 1px solid var(--el-border-color-lighter);
  }
}
</style>