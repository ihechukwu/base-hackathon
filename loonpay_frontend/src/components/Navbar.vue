<template>
    <header class="w-full flex items-center justify-between sm:p-[3rem] p-[2rem]">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <img src="../assets/images/logoImage.svg" alt="Loonpay" class="h-6 w-auto" />
        <img src="../assets/images/logoText.svg" alt="Loonpay" class="sm:h-6 h-4 w-auto" />
      </div>
  
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        <a href="#swap" class="text-sm text-blue-900 font-medium hover:text-blue-600">Swap</a>
        <button class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-mono px-4 py-2 rounded-full flex items-center space-x-1">
          <span>Connect</span>
          <!-- <img src="/wallet-icon.svg" alt="wallet" class="w-4 h-4" /> -->
        </button>
      </nav>
  
      <!-- Mobile Hamburger -->
      <div class="md:hidden">
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-blue-700 focus:outline-none">
            <img src="../assets/images/hamburger.svg" alt="Loonpay" class="h-6 w-auto" />
        </button>
      </div>
  
      <!-- Mobile Dropdown -->
      <div v-if="mobileMenuOpen" class="absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden z-50">
        <a href="#swap" class="text-sm text-blue-900 font-medium hover:text-blue-600">Swap</a>
        <button class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-mono px-4 py-2 rounded-full flex items-center space-x-1 w-max">
          <span>Connect</span>
          <!-- <img src="/wallet-icon.svg" alt="wallet" class="w-4 h-4" /> -->
        </button>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'

  const mobileMenuOpen = ref(false)
  </script>
  <style scoped>
header{
    /* padding: 2rem; */

}
</style>