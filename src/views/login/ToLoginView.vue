<template>
  <div class="content bg">
    <div class="win">
        <!-- <DialogTitle as="h3" class="text-base font-semibold text-gray-900">登录</DialogTitle> -->
        <div class="top">
          <img class="img" src="../../assets/img/logo.svg"/>
          <p class="title">{{$t('common.welcome2')}}</p>
          <div class="sub-title">{{$t("common.welcome_desc1")}}<span class="sub"> {{ $t('common.community') }} </span>{{$t('common.drive')}}</div>
        </div>
        <div class="bottom">
          <!-- <button type="button" @click="changeRouter('/reg')" class="blue-color ml-2.5 font-puhuiRegular rounded-full bg-white px-8 py-2.5 text-xl shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-50">{{$t("common.register")}}</button>
          <button type="button" @click="changeRouter('/login')" class="font-puhuiRegular mx-2.5 rounded-full bg-blue-600 px-8 py-2.5 text-xl text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            {{$t("common.apply")}}
          </button> -->
          <el-button class="btn" type="primary" @click="go('/login')" >
            {{$t('common.identity_yes')}}
          </el-button>
          <el-button class="btn" type="success" @click="go('/reg')" >
            {{$t('common.identity_new')}}
          </el-button>
          <!-- <button type="button" class="inline-flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-indigo-600 hover:bg-indigo-400" @click="login">登录</button>
          <button type="button" class="inline-flex w-20 justify-center rounded-md  px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50" @click="login">取消</button> -->
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const instance = getCurrentInstance()
const { proxy } = getCurrentInstance()!;
const { $t } = proxy || {}
const sidebarOpen = ref(false)
import { ElMessage } from 'element-plus'

const go = (url:string) => {
  router.push(url)
}
</script>
<style scoped lang="less">
.bg{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(111deg, #C268DF 1%, #6C8AED 44.4%, #8CCFFA 98.52%);
}
.content{
  display:flex;
  justify-content: center;
  padding-top: 8rem;
  .win{
    width: 24rem;
    height: 17rem;
    text-align: center;
    padding-top: 2rem;
    background: #fff;
    border-radius: 0.375rem;
    .top{
      display: flex;
      flex-direction: column;
      align-items: center;
      .img{
        width: 6rem;
        height: 1.5rem;
      }
      .title{
        font-size: 1.125rem;
        line-height: 1.75rem;
        margin-top: 0.75rem;
        font-weight: 500;
      }
      .sub-title{
        font-size: 0.75rem;
        line-height: 1rem;
        margin-top: 0.25rem;
        font-weight: 500;
      }
      .sub{
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: 500;
      }
    }
    .bottom{
      display: flex;
      margin-top: 2rem;
      text-align: center;
      gap: 0.5rem;
      justify-content: center;
      .btn{
        width: 40%;
        span{
          font-weight: 500;
        }
      }
    }
  }
}
</style>
