<template>
    <div class="header">
        <div class="left">
            <img class="w-24 h-6 pr-4 border-r" src="../../assets/img/logo.svg"/>
            <span class="text-base opacity-85 font-medium pl-4">My Profile</span>
        </div>
        <div class="hidden lg:flex">
            <!-- <Language/>
            <UserMenu/> -->
        </div>
        <!-- <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="openSlide">
              <span class="sr-only">Open main menu</span>
              <span class="iconfont icon-horizon scale-125"/>
            </button>
          </div> -->
    </div>
</template>
<script setup>
// import Language from '@/components/common/Language.vue'
// import UserMenu from '@/components/common/UserMenu.vue'
// import {useProfileStore} from '@/stores/index'
// const profileStore = useProfileStore()
const openSlide = () => {
    // profileStore.changeSlide(true)
}
</script>
<style scoped lang="less">
.header{
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
    .left{
        display: flex;
        align-items: center;
        gap: 10px;
    }
}
</style>