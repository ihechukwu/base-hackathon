<script setup>
import Layout from './Layout/index.vue'
import Toast from './components/Toast.vue';
</script>

<template>
  <Layout>
    <Toast />

    <router-view></router-view>
  </Layout>
</template>

