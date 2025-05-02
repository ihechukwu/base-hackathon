<template>
    <section class="flex w-full flex-col justify-center items-center sm:mt-16 mt-8 sm:px-8 px-4">
        <div class="w-full md:w-1/2  flex flex-col gap-y-4 items-start">
            <div class="hidden md:block">
                <button @click="router.back()" class=" backBtn sm:text-[1rem] text-xs">
                    ← Back
                </button>
            </div>
            <div class="w-full bg-[#ffffff] p-2 shadow-2xl rounded-xl mt-4">
                <div class="w-full p-4 flex flex-col rounded-xl items-start gap-2">
                    <div class="relative w-full ">
                        <!-- Swap Section -->
                        <div
                            class="bg-[#f9f9f9] p-4 rounded-t-xl sm:min-h-[172px] h-fit flex flex-col items-start sm:gap-y-2 gap-y-1">
                            <div class="flex justify-between items-center w-full ">
                                <p
                                    class="sm:leading-[20px] tracking-[0.5px] font-medium text-[#B9B9B9] sm:text-[16px] text-xs">
                                    Swap</p>
                                <div
                                    class="flex items-center bg-white rounded-full sm:px-4 sm:py-3  px-2 py-1 border text-sm border-[#EEEEEE] gap-x-2">
                                    <!-- <img class="rounded-full"/> -->
                                    🇺🇸
                                    <p class="sm:leading-[20px] tracking-[0.5px] font-medium text-xs">USD</p>
                                </div>
                            </div>
                            <p class="usdtAmount text-2xl sm:text-4xl"><span class="mr-1">$</span>100</p>
                            <p class="exchangeRate">1 USDC ≈ 1 USD</p>
                        </div>

                        <!-- Swap Icon (centered and overlapping) -->
                        <div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                            <div class="bg-white border  border-[#F9F9F9] rounded-full p-2 shadow">
                                <div class="bg-[#F9F9F9] p-2 rounded-full">

                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M10.698 0.313504C10.9703 0.193742 11.2875 0.246172 11.5068 0.44715L17.5068 5.94715C17.8121 6.22704 17.8328 6.70147 17.5529 7.00681C17.273 7.31215 16.7985 7.33277 16.4932 7.05288L11.75 2.70494L11.75 17C11.75 17.4142 11.4142 17.75 11 17.75C10.5858 17.75 10.25 17.4142 10.25 17L10.25 1.00002C10.25 0.70259 10.4258 0.433266 10.698 0.313504ZM7 0.250015C7.41422 0.250015 7.75 0.585802 7.75 1.00002L7.75001 17C7.75001 17.2974 7.57425 17.5668 7.302 17.6865C7.02976 17.8063 6.71246 17.7539 6.49321 17.5529L0.493211 12.0529C0.187872 11.773 0.167245 11.2986 0.447139 10.9932C0.727033 10.6879 1.20146 10.6673 1.5068 10.9471L6.25001 15.2951L6.25 1.00002C6.25 0.585802 6.58579 0.250015 7 0.250015Z"
                                            fill="#2B2B2B" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Receive Section -->
                        <div
                            class="bg-[#f9f9f9] p-4 rounded-b-xl sm:min-h-[172px] h-fit flex flex-col items-start sm:gap-y-2 gap-y-1 mt-4">
                            <div class="flex justify-between items-center w-full ">
                                <p
                                    class="sm:leading-[20px] tracking-[0.5px] font-medium text-[#B9B9B9] sm:text-[16px] text-xs">
                                    Receive</p>
                                <div
                                    class="flex items-center bg-white rounded-full sm:px-4 sm:py-3  px-2 py-1 border text-sm border-[#EEEEEE] gap-x-2">
                                    <!-- <img class="rounded-full"/> -->
                                    🇺🇸
                                    <p class="sm:leading-[20px] tracking-[0.5px] font-medium text-xs">USD</p>
                                </div>
                            </div>
                            <p class="usdtAmount text-2xl sm:text-4xl">100</p>
                            <p class="exchangeRate">1 USDC ≈ 1 USD</p>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="router.push('/review-transaction')"
                class="bg-[#0F77FF] hover:bg-blue-600 text-white text-sm font-mono px-4 sm:py-3 py-2 rounded-full flex items-center w-full">
                <span>Review</span>
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
.usdtAmount {
    font-family: "Geist Mono", monospace;
    font-weight: 500;
    letter-spacing: -0.5px;
    vertical-align: middle;

    span {
        color: #9B9B9B;
    }
}

.exchangeRate {
    font-family: "Geist Mono", monospace;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.5px;
    color: #9B9B9B;

    @media (max-width:640px) {
        font-size: 12px;

    }
}
</style>
