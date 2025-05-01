<template>
    <Navbar />
    <section class="flex w-full flex-col justify-center items-center  mt-8 sm:px-8 px-4">
        <div class="w-full md:w-1/2 flex flex-col gap-y-4 items-start">
            <button @click="router.back()" class="backBtn sm:text-[1rem] text-xs">
                ← Back
            </button>
            <div class="w-full bg-[#ffffff] p-2 shadow-2xl rounded-xl mt-4">
                <div class="w-full p-4 flex flex-col rounded-xl items-center justify-center gap-2">
                    <p class="sm:leading-[20px] tracking-[0.5px] font-medium text-[#B9B9B9] sm:text-[16px] text-xs">
                        Review and Swap
                    </p>
                    <p class="usdtAmount text-2xl sm:text-4xl">100 USDC</p>
                    <p>~$100.00</p>
                    <div
                        class="bg-[#f9f9f9] p-4 rounded-b-xl sm:min-h-[172px] h-fit flex flex-col items-start sm:gap-y-2 gap-y-1 mt-4 w-full">
                        <div class="w-full text-sm font-sans text-gray-600 space-y-2">
                            <!-- You're Sending -->
                            <div class="flex justify-between w-full">
                                <span class="font-medium">You’re Sending</span>
                                <span class="flex items-center gap-1">
                                    <!-- <img src="/flags/us.svg" alt="USD" class="w-4 h-4" /> -->
                                    <span class="font-mono text-black">$100.00</span>
                                </span>
                            </div>

                            <!-- Recipient gets -->
                            <div class="flex justify-between w-full">
                                <span class="font-medium">Recipient get’s</span>
                                <span class="flex items-center gap-1">
                                    <!-- <img src="/tokens/usdc.svg" alt="USDC" class="w-4 h-4" /> -->
                                    <span class="font-mono text-black">$100.00</span>
                                </span>
                            </div>

                            <!-- Fee -->
                            <div class="flex justify-between w-full">
                                <span class="font-medium">Fee</span>
                                <span class="font-mono text-black">1.25 USDC</span>
                            </div>

                            <!-- Duration -->
                            <div class="flex justify-between w-full">
                                <span class="font-medium">Duration</span>
                                <span class="font-mono text-black">~ 2 mins</span>
                            </div>

                            <!-- Recipient -->
                            <div class="flex justify-between w-full">
                                <span class="font-medium">Recipient</span>
                                <span class="font-mono text-black">0xc9f...a4E7</span>
                            </div>
                        </div>

                        
                    </div>
                    <!-- Deposit Address Box -->
                    <div
                        class="bg-[#f9f9f9] mt-4 w-full rounded-xl px-4 py-3 text-sm font-mono flex justify-between items-center">
                        <div>
                            <p>Deposit Address</p>
                            <span class="truncate">0x5b4G8cGFe7fD82....</span>
                        </div>
                        <div class="flex gap-2">
                            <button class="hover:opacity-80">
                                <!-- Copy icon -->
                           <img src="../assets/images/copy.svg" alt="">
                            </button>
                            <button class="hover:opacity-80">
                                <!-- QR Code icon -->
                                <img src="../assets/images/qrIcon.svg" alt="">

                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <button @click=""
                class="bg-[#0F77FF] hover:bg-blue-600 text-white text-sm font-mono px-4 sm:py-3 py-2 rounded-full flex items-center w-full">
                <span>Review</span>
            </button>
            <p>Confirm the amount, token & recipient before sending</p>
        </div>
    </section>
</template>
<script setup>
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
const router = useRouter();
</script>
<style scoped></style>
