<template>
  <el-row class="contents" :gutter="20">
    <el-col class="left" :xs="0" :span="12">
      <!-- <div  @click="changeRouter('/')">
        <img class="title-img" src="../../assets/img/logo.svg"/>
      </div>
      <div>
        phone left
      </div> -->
    </el-col>
    <el-col class="right" :xs="24" :span="12">
      <div class="title">
        {{$t('common.reg_yeying')}}
      </div>
      <div class="sub-title">
        {{$t('common.noacount')}}?  <span style="color:#1677FF;cursor:pointer" @click="changeRouter('/reg')">{{$t('common.apply_for')}}</span>
      </div>
      <div class="reg-form">
        <el-form
          ref="ruleFormRef"
          style="width:400px"
          :model="form"
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item  v-if="!hasAccount"  :label="$t('common.identy_file')" prop="password">
            <Uploader @change="changeFile">
              <el-button type="primary">{{$t('common.upload_btn')}}</el-button>
            </Uploader>
          </el-form-item>
          <el-form-item  :label="$t('common.password')" prop="password">
            <el-input
              :placeholder="$t('common.pleaseInput')"
              v-model="form.password"
              type="password"
              autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-checkbox style="margin-right:5px" v-model="form.isAgree" size="large" />
            {{ $t('common.agree') }} {{ $t('common.deal') }} & {{ $t('common.policy') }}
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%;" type="primary" @click="handleSubmit">
              {{ $t('common.login') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
    import { ref,getCurrentInstance,reactive, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import $account from '@/plugins/account'
    import Uploader from '@/components/common/Uploader.vue'
    import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
    import { ElMessage } from 'element-plus'

    interface RuleForm {
      password: string
    }
    const instance = getCurrentInstance();
    const proxy = instance && instance.proxy;
    const { $t } = proxy || {};
    const router = useRouter();
    const hasAccount = ref(false)
    const form = ref({
        password: "",
        did: "",
        desc: "",
        content: "",
        isAgree: false,
    })
    const rules:FormRules<RuleForm> = { password: [
        { required: true, message: proxy!.$t('common.pleaseInput'), trigger: 'blur' },
      ],
    }
    const handleSubmit = async () => {
        const {password, isAgree, content} = form.value || {}
        let did = null
        if(!hasAccount.value){
          if(!content){
            ElMessage({message: proxy!.$t('common.check_file'), type: 'warning' });
              return
          }
          try{
            const info = await $account.importIdentity(content, password)
            did = info && info.metadata && info.metadata.did
            if(!did){
              ElMessage({message: proxy!.$t('common.check_file'), type: 'warning' });
                return
            }
          }catch(e){
            ElMessage({message: proxy!.$t("common.check_login"), type: 'warning' });
            return
          }
        }else{
          did = $account.getActiveDid()
        }
        if(!isAgree){
          ElMessage({message: proxy!.$t('common.please_check'), type: 'warning' });
            return
        }
        try{
            // router.push("/")
            const info = await $account.login(did, password)
            console.log("登录:", info,form.value)
            router.push("/")
        }catch(e){
          ElMessage({message: proxy!.$t("common.check_login"), type: 'warning' });
        }
        // loginStore.login(form.value)
    }

    const changeRouter = (url: string) => {
        router.push(url)
    }
    const getActiveIdentity = async () => {
        const info = await $account.getActiveIdentity()
        if(info){ // 有身份信息,帐号过期,只用输入密码
            hasAccount.value = true
        }
        return info
    }

    const changeFile = (uploadFile: { raw: File }) => {
      const reader = new FileReader();
      reader.readAsText(uploadFile.raw);
      reader.onload = (e: ProgressEvent<FileReader>) => {
          const info = e.target?.result || "";
          form.value.content = info as string
      };
    }
    onMounted(()=>{
        getActiveIdentity()
    })
</script>
<style scoped lang="less">
.contents{
  height: 100vh;
  margin-left: 0;
  margin-right: 0;
  .left {
    padding: 3rem !important;
    background: linear-gradient(111deg, #C268DF 1%, #6C8AED 44.4%, #8CCFFA 98.52%);
  }
  .right{
    padding-top: 5rem;
    text-align: center;
    padding-left: 20px !important;
    padding-right: 20px !important;
    .title{
      font-size: 1.875rem;
      line-height: 2.25rem;
      font-weight: 600;
    }
    .sub-title{
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.5rem;
      margin-top: 0.5rem;
    }
    .reg-form{
      margin-top: 0.75rem;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
