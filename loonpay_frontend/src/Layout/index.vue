<template>
  <div v-if="route.name !== 'connect-wallet'" :style="backgroundStyle" class="hero-background bg-white">
    <Navbar />
    <slot></slot>
  </div>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '../components/Navbar.vue';

// Static imports of images
import desktopImage from '../assets/images/desktop-bgImage.png';
import desktopGradient from '../assets/images/desktop-gradient.png';
import mobileImage from '../assets/images/mobile-bgImage.png';
import mobileGradient from '../assets/images/mobile-gradient.png';

const route = useRoute();
const isMobile = ref(window.innerWidth <= 640);
const currentRouteName = ref(route.name);

// Listen for route changes
watch(
  () => route.name,
  (newVal) => {
    currentRouteName.value = newVal;
  }
);

// Handle screen resizing
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 640;
};

onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

// Compute the correct background style
const backgroundStyle = computed(() => {
  const isHome = currentRouteName.value === 'Home' || route.path === '/';

  if (isMobile.value) {
    return {
      backgroundImage: `url(${isHome ? mobileImage : mobileGradient})`,
      backgroundPosition: 'bottom',

      // height: '100vh',
    };
  }

  return {
    backgroundImage: `url(${isHome ? desktopImage : desktopGradient})`,
    backgroundPosition: `${isHome ? 'center' : 'bottom'}`,


  };
});
</script>

<style>
.hero-background {
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>