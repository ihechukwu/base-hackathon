<template>
  <header class="w-full flex items-center justify-between sm:p-[3rem] p-[2rem]">
    <!-- Logo -->
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
      class="fixed h-full top-0 left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden z-50">
      <div class="flex items-center w-full justify-between">
        <!-- logo -->
        <div class="flex items-center space-x-1">
          <img src="../assets/images/logoImage.svg" alt="Loonpay" class="h-4 w-auto" />
          <img src="../assets/images/logoText.svg" alt="Loonpay" class="h-3 w-auto" />
        </div>
        <button
        @click="mobileMenuOpen = !mobileMenuOpen"
          class="text-[#9B9B9B]  bg-[#F3F3F3] text-sm font-mono px-4 py-1 rounded-full flex items-center ">
          <span>Close</span>
        </button>
      </div>
      <section class="mt-6 flex flex-col items-start gap-4 w-full">

        <a href="#swap" class="text-sm text-[#368DFF] font-medium">Swap</a>
        <a href="#swap" class="text-sm text-[#9B9B9B] font-medium ">Transactions</a>
        <a href="#swap" class="text-sm text-[#9B9B9B] font-medium flex items-center space-x-1">
          <span>
            Connect
          </span>
          <img src="../assets/images/connectWalletAsh.svg" alt="wallet" class="w-4 h-4" />

        </a>

      </section>
    </div></Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const mobileMenuOpen = ref(false)
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
