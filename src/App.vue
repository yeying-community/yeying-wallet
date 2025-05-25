<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

// const auth = useAuth();

onMounted(() => {
  // auth.initialize();
});
</script>

<style lang="less">
body{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
</style>