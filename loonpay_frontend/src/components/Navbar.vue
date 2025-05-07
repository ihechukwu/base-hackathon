<template>
  <header class="w-full flex items-center justify-between sm:p-[3rem] p-[2rem]">
    <!-- Logo -->
    <div class="block md:hidden" v-if="route.path !== '/'">
      <button @click="goBack()">
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5.3254 0.953877C5.53506 1.13359 5.55934 1.44924 5.37963 1.6589L1.65854 6.00017L5.37963 10.3414C5.55934 10.5511 5.53506 10.8668 5.3254 11.0465C5.11573 11.2262 4.80008 11.2019 4.62037 10.9922L0.620372 6.32557C0.459876 6.13832 0.459876 5.86202 0.620372 5.67478L4.62037 1.00811C4.80008 0.798447 5.11573 0.774166 5.3254 0.953877Z"
            fill="#9B9B9B" />
        </svg>
      </button>
    </div>
    <button @click="router.push('/')" class="flex items-center space-x-2">
      <img src="../assets/images/logoImage.svg" alt="Loonpay" class="h-6 w-auto" />
      <img src="../assets/images/logoText.svg" alt="Loonpay" class="sm:h-6 h-4 w-auto" />
    </button @click="router.push('/')">

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center space-x-6">
      <button
        class="bg-[#E3EFFF] hover:bg-blue-300 text-[#193DB1] text-sm font-mono px-8 py-2 rounded-full flex items-center space-x-1">
        Swap
      </button>
      <button
        class="bg-[#0F77FF] hover:bg-blue-600 text-white text-sm font-mono px-4 py-2 rounded-full flex items-center space-x-1">
        <span>Connect</span>
        <img src="../assets/images/connectWallet.svg" alt="wallet" class="w-4 h-4" />
      </button>
    </nav>

    <!-- Mobile Hamburger -->
    <div class="md:hidden">
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="focus:outline-none">
        <img src="../assets/images/hamburger.svg" alt="Loonpay" class="h-5 w-auto" />
      </button>
    </div>

    <!-- Mobile Dropdown -->
    <Transition name="mobile-menu">
      <div v-if="mobileMenuOpen"
        class="fixed h-full top-0 left-0 right-0 bg-white shadow-md px-4 py-8 flex flex-col space-y-4 md:hidden z-50">
        <div class="flex items-center w-full justify-between">
          <!-- logo -->
          <div class="flex items-center space-x-1">
            <img src="../assets/images/logoImage.svg" alt="Loonpay" class="h-4 w-auto" />
            <img src="../assets/images/logoText.svg" alt="Loonpay" class="h-3 w-auto" />
          </div>
          <button @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-[#9B9B9B]  bg-[#F3F3F3] text-sm font-mono px-4 py-1 rounded-full flex items-center ">
            <span>Close</span>
          </button>
        </div>
        <section class="mt-6 flex flex-col items-start gap-4 w-full">

          <button class="text-sm hover:text-[#368DFF] text-[#9B9B9B] font-medium"
            @click="router.push('/enter-giftcard-info'); mobileMenuOpen = false">Swap</button>
          <div class="relative group inline-block">
            <button disabled class="text-sm text-[#ccc] hover:text-[#368DFF] font-medium ">Transactions</button>
            <div
              class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1 bg-gray-600 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Disabled feature
            </div>
          </div>
          <button class="text-sm text-[#9B9B9B] hover:text-[#368DFF] font-medium flex items-center space-x-1">
            <span>
              Connect
            </span>
            <img src="../assets/images/connectWalletAsh.svg" alt="wallet" class="w-4 h-4" />

          </button>

        </section>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const mobileMenuOpen = ref(false)
const goBack = () => {
  if (route.path === '/review-transaction') router.push('/')
  else router.back()
}
</script>
<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
