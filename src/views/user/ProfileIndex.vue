<template>
  <div class="layout_bg">
    <Header/>
    <Main />
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Header from './Header.vue'
import Main from './Main.vue'

</script>
<style scoped>
.layout_bg{
  background:url('../../assets/img/user_bg.jpg') white 0px 0px / 100% 100% no-repeat;
  background-size:100% 100%; 
}
</style>