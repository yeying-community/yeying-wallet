<template>
  <el-row class="content" :gutter="20">
    <el-col class="left" :xs="0" :span="12">
      <div @click="changeRouter('/')">
        <img class="title-img" src="../../assets/img/logo.svg" />
      </div>
      <div>phone left==</div>
    </el-col>
    <el-col class="right" :xs="24" :span="12">
      <div class="title">{{ $t("common.apply_reg") }}</div>
      <div class="sub-title">
        {{ $t("common.member") }}?
        <span style="color: #1677ff; cursor: pointer" @click="changeRouter('/login')">{{
          $t("common.register")
        }}</span>
      </div>
      <div class="reg-form">
        <el-form
          ref="ruleFormRef"
          style="width: 500px"
          :model="form"
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item v-if="isContinue" :label="$t('common.disiplay_name')" prop="name">
            <el-input :placeholder="$t('common.pleaseInput')" v-model="form.name" />
          </el-form-item>
          <el-form-item v-if="isContinue" label="Avatar">
            <UserAvatar ref="userAdvatarRef" />
          </el-form-item>
          <el-form-item v-if="isContinue" label="Account Type" prop="code">
            <el-select-v2
              v-model="form.code"
              :placeholder="$t('common.pleaseInput')"
              :options="$account.codeList"
            />
          </el-form-item>
          <el-form-item v-if="isContinue" :label="$t('common.password')" prop="password">
            <el-input
              :placeholder="$t('common.pleaseInput')"
              v-model="form.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            v-if="isContinue"
            :label="$t('common.cofirm_pwd')"
            prop="confirm_pwd"
          >
            <el-input
              :placeholder="$t('common.pleaseInput')"
              v-model="form.confirm_pwd"
              type="password"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item v-if="!isContinue" :label="$t('common.network')" prop="network">
            <el-select-v2
              :placeholder="$t('common.pleaseInput')"
              v-model="form.network"
              :options="$account.networkList"
            />
          </el-form-item>
          <el-form-item v-if="!isContinue">
            <!-- <label> -->
            <el-checkbox style="margin-right: 5px" v-model="form.isAgree" size="large" />
            {{ $t("common.agree") }} {{ $t("common.deal") }} & {{ $t("common.policy") }}
            <!-- </label> -->
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              @click="handleSubmit(ruleFormRef)"
            >
              {{ isContinue ? $t("common.continue") : $t("common.completed") }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import $account from "@/plugins/account";
import UserAvatar from "./avatar/index.vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { IdentityCodeEnum, NetworkTypeEnum } from "@yeying-community/yeying-web3";

const instance = getCurrentInstance();
const proxy = instance && instance.proxy;
const { $t } = proxy || {};
const isContinue = ref(true);
const router = useRouter();
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const userAdvatarRef = ref();
interface RuleForm {
  password: string;
  confirm_pwd: string;
  code: IdentityCodeEnum | null;
  name: string;
  network: NetworkTypeEnum | null;
  isAgree: boolean;
  avatar: any;
}
const form = reactive<RuleForm>({
  password: "",
  confirm_pwd: "",
  code: null, //Account code
  name: "", //Display name
  network: null, //Bloack chain network
  isAgree: false,
  avatar: null,
});
// const form = ref({
//     password: "",
//     confirm_pwd: "",
//     code: null, //Account code
//     name: "", //Display name
//     network: null,//Bloack chain network
//     isAgree: false,
// })
// 自定义校验规则
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value !== form.password) {
    callback(new Error("两次输入不一致!"));
  } else {
    callback();
  }
};
watch(form, (info) => {
  const name = info.name;
  if (name && userAdvatarRef.value && userAdvatarRef.value.userUpload) {
    const url = userAdvatarRef.value.userUpload(name);
    if (url) {
      form.avatar = url;
    }
  }
});
// const rules = reactive<FormRules<RuleForm>>({
//   password: [
//     { required: true, message: '请输入密码', trigger: 'blur' },
//   ],
//   confirm_pwd: [
//     { required: true, message: '请再次输入密码', trigger: 'blur' },
//     { validator: validatePass2, trigger: 'blur' }
//   ],
//   name: [
//     { required: true, message: '请输入名称', trigger: 'blur' },
//   ],
//   code: [
//     { required: true, message: '请选择', trigger: 'change' },
//   ],
// })
const rules = computed(() => {
  const rules1: FormRules<RuleForm> = {
    password: [{ required: true, message: proxy!.$t("common.pleaseInput"), trigger: "blur" }],
    confirm_pwd: [
      { required: true, message: proxy!.$t("common.pleaseInput"), trigger: "blur" },
      { validator: validatePass2, trigger: "blur" },
    ],
    name: [{ required: true, message: proxy!.$t("common.pleaseInput"), trigger: "blur" }],
    code: [{ required: true, message: proxy!.$t("common.pleaseSelect"), trigger: "change" }],
  };
  const rules2: FormRules<RuleForm> = {
    network: [{ required: true, message: proxy!.$t("common.pleaseSelect"), trigger: "change" }],
  };
  if (isContinue.value) {
    return rules1;
  }
  return rules2;
});
const handleSubmit = async (formEl: FormInstance | undefined) => {
  // $identity.createPersonal("", form.displayName, "", "", form.password, {email: form.email, telephone: form.phone}).then(
  //     (identity) => {
  //       console.log(`${JSON.stringify(identity)}`)
  //     }
  // ).catch(err => console.error(err));
  if (!formEl) return;
  if (isContinue.value) {
    formEl.validate((valid, fields) => {
      if (valid) {
        isContinue.value = false;
      } else {
        console.log("error submit!", fields);
      }
    });
  } else {
    formEl.validate(async (valid, fields) => {
      if (valid) {
        try {
          const { isAgree, password } = form || {};
          if (!isAgree) {
            ElMessage({ message: proxy!.$t("common.please_check"), type: "warning" });
            return;
          }
          const info = await $account.createIdentity(password, { ...form });
          console.log("register:", info);
          const did = info && info.metadata && info.metadata.did;
          if (did) {
            const identity = await $account.exportIdentity(did);
            const fileName = `${form.name}.id`;
            downloadTextFile(fileName, identity);
            ElMessage({ message: proxy!.$t("common.reg_success"), type: "success" });
            console.log("identity", identity, did); // 输出导出的身份信息
            router.push("/");
          }
        } catch (e) {
          console.error(e);
          ElMessage({ message: proxy!.$t("common.reg_fail"), type: "error" });
        }
      }
    });
    // loginStore.register(form.value)
  }
};
const downloadTextFile = (filename: string, text: any) => {
  // 创建一个 Blob 对象，存储文本数据
  const blob = new Blob([text], { type: "text/plain" });

  // 创建一个指向该 Blob 对象的 URL
  const url = URL.createObjectURL(blob);

  // 创建一个临时的 <a> 标签，用于触发下载
  const a = document.createElement("a");
  a.href = url;
  a.download = filename; // 设置下载文件名
  document.body.appendChild(a); // 将 <a> 标签添加到文档中
  a.click(); // 模拟点击下载

  // 下载完成后移除 <a> 标签和 URL 对象
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // 释放 URL 对象
};

const changeRouter = (url: string) => {
  router.push(url);
};
</script>
<style scoped lang="less">
.content {
  height: 100vh;
  margin-left: 0;
  margin-right: 0;
  .left {
    padding: 3rem !important;
    background: linear-gradient(111deg, #c268df 1%, #6c8aed 44.4%, #8ccffa 98.52%);
    .title-img {
      width: 11rem;
      height: 3rem;
    }
  }
  .right {
    padding-top: 3.5rem;
    text-align: center;
    padding-left: 20px !important;
    padding-right: 20px !important;
    .title {
      font-size: 1.875rem;
      line-height: 2.25rem;
      font-weight: 600;
    }
    .sub-title {
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.5rem;
      margin-top: 0.5rem;
    }
    .reg-form {
      margin-top: 0.75rem;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
