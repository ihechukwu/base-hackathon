<template>
    <Navbar />
    <section class="flex w-full flex-col justify-center items-center sm:mt-16 mt-8 sm:px-8 px-4">
        <div class="w-full sm:w-1/2 md:w-2/5 flex flex-col gap-y-4 items-start">
            <div class="hidden md:block">
                <button @click="router.back()" class=" backBtn sm:text-[1rem] text-xs">
                    ← Back
                </button>
            </div>            <div class="w-full bg-[#ffffff] p-4 shadow-2xl rounded-xl mt-4">
                <div class="w-full bg-[#F9F9F9] p-4 flex flex-col rounded-xl items-start gap-2">
                    <input type="text" placeholder="Enter Giftcard Code"
                        class="w-full bg-white border border-[#eeeeee]  rounded-xl" />
                    <input type="text" placeholder="Enter wallet Address"
                        class="w-full bg-white border border-[#eeeeee]  rounded-xl" />
                </div>
            </div>
            <button @click="router.push('/swap')"
                class="bg-[#0F77FF] hover:bg-blue-600 text-white text-sm font-mono px-4 sm:py-3 py-2 rounded-full flex items-center w-full">
                <span>Continue</span>
            </button>
        </div>
    </section>
</template>
<script setup>
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue';
const router = useRouter();
</script>
<style scoped>
input {
    font-family: "Geist Mono", monospace;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.5px;
    padding: 1rem;
    vertical-align: middle;

}
</style>
