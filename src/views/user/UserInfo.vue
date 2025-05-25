<template>
    <div class="account-container">
      <div class="account-header">
        <div class="header-title">Account</div>
        <div class="header-subtitle">注释、描述摘要等</div>
      </div>
      
      <div class="account-form-container">
        <el-form
          ref="formRef"
          :model="form"
          label-position="top"
          @submit.prevent="handleSubmit"
          class="account-form"
          :rules="rules"
        >
          <!-- 头像部分 -->
          <el-form-item label="头像">
            <div class="avatar-section">
              <!-- <img class="avatar-img"  :src="form.avatar"/> -->
              <el-avatar :size="80" :src="form.avatar" class="avatar-img" />
              <el-button
                v-if="isEdit"
                type="primary"
                @click="openHead"
                class="change-avatar-btn"
              >
                <el-icon><Upload /></el-icon>
                更换头像
              </el-button>
            </div>
          </el-form-item>
  
          <!-- 显示名称 -->
          <el-form-item label="Display Name">
            <el-input
              v-if="isEdit"
              v-model="form.name"
              placeholder="请输入显示名称"
              clearable
            />
            <span v-else>{{ form.name }}</span>
          </el-form-item>
  
          <!-- 电话 -->
          <!-- <el-form-item label="Telephone">
            <el-input
              v-if="isEdit"
              v-model="form.phone"
              placeholder="请输入电话号码"
              clearable
            />
            <span v-else>{{ form.phone }}</span>
          </el-form-item> -->
  
          <!-- 邮箱 -->
          <!-- <el-form-item label="Email">
            <el-input
              v-if="isEdit"
              v-model="form.email"
              placeholder="请输入邮箱"
              clearable
              type="email"
            />
            <span v-else>{{ form.email }}</span>
          </el-form-item> -->
  
          <!-- 密码 -->
          <el-form-item label="Password">
            <el-input
              v-if="isEdit"
              v-model="form.password"
              placeholder="请输入密码"
              clearable
              type="password"
              show-password
            />
            <span v-else>{{ form.password }}</span>
          </el-form-item>
  
          <!-- 操作按钮 -->
          <el-form-item>
            <div class="form-actions">
              <template v-if="isEdit">
                <el-button type="primary" @click="editUser">确认</el-button>
                <el-button @click="cancel">取消</el-button>
              </template>
              <template v-else>
                <el-button type="primary" @click="toEdit">编辑</el-button>
                <el-button type="primary" @click="exit">退出登录</el-button>
              </template>
            </div>
          </el-form-item>
        </el-form>
      </div>
  
      <EditHead :isOpen="open" @confirmAvatar="confirmAvatar" ref="RefContact" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, getCurrentInstance } from 'vue'
  import { Upload } from '@element-plus/icons-vue'
  import EditHead from '@/views/user/EditHead.vue'
  import $account from '@/plugins/account'
  import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
  import { useRouter } from 'vue-router'

  const open = ref(false)
  const RefContact = ref()
  const formRef = ref()
  const isEdit = ref(false)
  const router = useRouter();
  interface RuleForm {
    name: string,
    password: string,
    avatar:string,
  }
  const instance = getCurrentInstance();
  const proxy = instance && instance.proxy;
  const form = ref<RuleForm>({
    name: "",
    password: "",
    avatar: "",
  })
  // const form = ref({
  //   phone: "1",
  //   email: "1",
  //   password: "1",
  //   confirm_pwd: "",
  //   mscode: "1",
  //   accode: "1",
  //   displayName: "1",
  //   bc_network: "1",
  //   head_url:"../../assets/img/default.jpg"
  // })
  const rules:FormRules<RuleForm> = { name: [
      { required: true, message: proxy!.$t('common.pleaseInput'), trigger: 'blur' },
    ],
    password: [
      { required: true, message: proxy!.$t('common.pleaseInput'), trigger: 'blur' },
    ],
  }
  const getUserInfo = async () => {
    const info = await $account.getActiveIdentity()
    console.log(111,info)
    form.value = info&&info.metadata||{}
  }
  const toEdit = () => {
    isEdit.value = true
  }
  const exit = () => {
    $account.logout()
    router.push("/toLogin")
  }
  
  const handleSubmit = () => {
    console.log(form.value)
  }
  
  const editUser = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        isEdit.value = false
        const {password,name,avatar} = form.value
        $account.updateIdentity({name,avatar},password)
        // 这里可以添加提交表单的逻辑
      }
    })
  }
  const confirmAvatar = async (img:string) => {
    if(img){
      form.value.avatar = img
    }
  }
  const cancel = () => {
    isEdit.value = false
  }
  
  const openHead = () => {
    open.value = true
    RefContact.value.openModal(form.value.avatar)
  }
  onMounted(async () => {
    getUserInfo()
  })
  </script>
  
  <style lang="less" scoped>
  .account-container {
    .account-header {
      display: flex;
      align-items: center;
      padding: 16px 40px;
      border-bottom: 1px solid #f0f0f0;
      
      .header-title {
        font-size: 18px;
        font-weight: 500;
        color: #333;
      }
      
      .header-subtitle {
        font-size: 14px;
        color: #666;
        margin-left: 16px;
      }
    }
    
    .account-form-container {
      padding: 20px;
      
      .account-form {
        background: #fff;
        padding: 24px;
        border-radius: 4px;
        
        .avatar-section {
          display: flex;
          align-items: center;
          
          .avatar-img {
            margin-right: 16px;
          }
          
          .change-avatar-btn {
            height: 40px;
          }
        }
        
        .form-actions {
          margin-top: 24px;
          
          .el-button {
            padding: 0 24px;
            height: 36px;
            
            & + .el-button {
              margin-left: 12px;
            }
          }
        }
        
        :deep(.el-form-item__label) {
          font-weight: 800;
          color: rgba(0, 0, 0, 0.85);
        }
        :deep(.el-form-item) {
          margin-bottom:8px;
        }
        
        .el-input {
          width: 288px;
        }
      }
    }
  }
  </style>