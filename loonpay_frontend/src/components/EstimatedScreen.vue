<template>
    <div class="w-full md:w-1/2 flex flex-col gap-y-4 items-start z-30">
      <div class="hidden md:block">
        <button @click="router.push('/')" class="backBtn sm:text-[1rem] text-xs">← Homepage</button>
      </div>
      <div class="w-full bg-white rounded-2xl shadow-2xl p-2">
        <div class="w-full bg-[#F9F9F9] rounded-2xl p-6">
          <div class="text-center mb-6 text-[#2B2B2B]">
            <p class="font-mono sm:text-[16px] text-sm mb-1">Estimated Time</p>
            <h1 class="sm:text-3xl text-2xl font-bold">{{ remainingTime }} mins</h1>
          </div>
  
          <div class="mb-8">
            <div v-for="(status, index) in statusItems" :key="index" class="flex items-center mb-3">
              <div
                :class="['flex items-center justify-center sm:w-6 sm:h-6 w-4 h-4 rounded-full mr-3', status.completed ? 'bg-[#7FC161]' : 'bg-[#9B9B9B]']">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="sm:w-4 sm:h-4 h-3 w-3 text-white">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span :class="['progress md:text-lg text-xs', status.completed ? 'text-[#7FC161]' : 'text-[#9B9B9B]']">
                {{ status.text }}
              </span>
            </div>
          </div>
  
          <div class="border-t border-gray-200 pt-6">
            <div class="flex items-center justify-center mb-4">
              <div class="w-12 h-12 rounded-full overflow-hidden">
                <img src="../assets/images/usFlag.svg" alt="US Currency" class="w-full h-full object-cover" />
              </div>
              <div class="mx-2 bg-white rounded-full border-[0.39px] border-[#EEEEEE] p-2">
                <img src="../assets/images/horizontalArrow.svg" alt="Swap" class="w-full h-full object-cover" />
              </div>
              <div class="w-12 h-12 flex items-center justify-center">
                <img src="../assets/images/usdcFlag.svg" alt="USDC" class="w-full h-full object-cover" />
              </div>
            </div>
            <div class="text-center">
              <h2 class="text-2xl font-bold text-gray-900 mb-1">100 USDC</h2>
              <p class="text-[#9B9B9B] text-sm font-mono">~$100.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import {useRouter} from 'vue-router';
  const router = useRouter();
  defineProps({
    remainingTime: Number,
    statusItems: Array
  });
  </script>
  