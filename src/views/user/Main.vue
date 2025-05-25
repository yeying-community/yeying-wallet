<template>
  <div class="profile">
    <!-- Static sidebar for desktop -->
    <div class="left">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="cont">
        <div v-for="item in navigation" 
          :key="item.title" 
          @click="changeRouter(item.to)"
          class="item"
          :class="selectName==item.name?'active':''"
        >
          <!-- <span class="iconfont" :class="item.icon"/> -->
          <el-icon><User/></el-icon>
          <span style="margin-left:5px">{{item.title}}</span>
        </div>
      </div>
    </div>


    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import { ElDrawer, ElMenu, ElMenuItem } from 'element-plus'
import { User } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const selectName = ref("")
const sidebarOpen = ref(false)

const navigation = [
  { title: "Account", to: '/profile/', name: 'user' },
  { title: "Message", to: '/profile/message', name: 'message', icon:"icon-bell-full" },

]

// 监听路由变化
watch(
  () => route,
  (newRoute) => {
    if(newRoute?.name){
        selectName.value = newRoute.name
    }
  },{ deep: true, immediate: true }
);

const changeRouter = (url) => {
  router.push(url)
  if(sidebarOpen.value){
    sidebarOpen.value = false
  }
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<style scoped lang="less">
.profile {
  height: calc(100vh - 3.8rem);
  display: flex;
  .right{
    flex:1;
  }
  .left{
    width: 13rem;
    border-right: 1px solid #e5e7eb;
    .cont{
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    .item{
      height:2.5rem;
      line-height:2.5rem;
      opacity: 0.6;
      padding-left: 0.875rem;
      cursor:pointer;
    }
  }
}
@media (max-width: 768px) {
  .left{
    display:none;
  }
}
.active {
  background: rgba(0, 0, 0, 0.03);
  opacity: 1;
}
</style>



