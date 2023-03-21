<template>
  <div class="root">
    <TitleBar />
    <router-view />
  </div>
</template>

<script>
import TitleBar from "./components/TitleBar.vue";
export default {
  data() {
    return {}
  },
  components: {
    TitleBar
  }
};
</script>

<style scoped>

.root{
  margin-top: 30px;
  color: white;
  background-color: #2f2f2f;
  position: relative;
}

.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
