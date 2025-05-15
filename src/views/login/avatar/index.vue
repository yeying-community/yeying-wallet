<template>
  <div style="width: 50px; height: 50px; transform: translateY(-10px)">
    <!-- <el-button style="width: 100%" type="primary" @click="userUpload(ruleFormRef)">
      test
    </el-button> -->
    <div
      id="dialog-humanity-identity--step4"
      class="dialog-humanity-identity--step"
      style="flex-direction: column"
    >
      <div class="identity-avatar-origin-image--container">
        <img
          class="identity-avatar--preview"
          id="humanity-identity-avatar--preview"
          src=""
        />
        <span class="mdc-typography--caption" style="margin-left: 5px">
          <!-- You can specify a unique and exclusive avatar that belongs only to yourself. -->
        </span>
      </div>
      <div class="identity-avatar-origin-image--container">
        <div
          class="identity-avatar-origin-image--frame"
          id="humanity-identity-avatar__origin"
        ></div>
      </div>
    </div>
    <!-- <img class="identity-avatar--preview" id="humanity-identity-avatar--preview" src="" />
    <div
      class="identity-avatar-origin-image--frame"
      id="humanity-identity-avatar__origin"
    ></div> -->
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
// @ts-ignore
import { convertSvgToDataUrl } from "./Image.js";
import multiavatar from "@multiavatar/multiavatar";
// @ts-ignore
import { Avatar } from "./Avatar.js";
// import { readTextFile, selectFile } from "./File";
// import type { UploadUserFile } from 'element-plus'
let avatarMaker: any = null;
onMounted(() => {
  console.log(66666);
  avatarMaker = new Avatar(
    document.getElementById("humanity-identity-avatar--preview") as any,
    document.getElementById("humanity-identity-avatar__origin") as any
  );
  // const identityFileUpload = document.querySelector(
  //   "#existing-humanity-identity-file__upload"
  // );
  // identityFileUpload.addEventListener("click", () =>
  //   selectFile([".id"], false, (file: any) => {
  //     readTextFile(file, (content: any) => {
  //       this.cipherContent = content;
  //       this.existingIdentityFile.value = file.name;
  //     });
  //   })
  // );
});
// const emit = defineEmits(['change']);
// const props = defineProps({
//   desc: String,
//   multiple: {
//     type: Boolean,
//     default: false,
//   },
// })
const userUpload = (name: any) => {
  avatarMaker.updatePreview(convertSvgToDataUrl(multiavatar(name)));
  console.log(555, avatarMaker.dataUrl);
  return avatarMaker.dataUrl;
  // emit("change",uploadFile)
};
// const removeAllFile = () => {
//   fileList.value = []
// }
defineExpose({ userUpload });
</script>
