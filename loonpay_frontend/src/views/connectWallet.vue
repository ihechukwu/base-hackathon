<template>
    <div class="w-full h-full mirrored">

        <Navbar />
        </div>
        <section class="fixed top-0 flex h-full w-full items-center justify-center sm:p-8 p-4">
            <div class="w-full md:w-1/2 flex flex-col gap-y-4 items-start">
                <div class="hidden md:block">
                    <button @click="router.back()" class=" backBtn sm:text-[1rem] text-xs">
                        ← Back
                    </button>
                </div>
                <div class="w-full bg-[#ffffff] p-2 shadow-2xl rounded-xl mt-4">
                    <div class="w-full p-4 flex flex-col rounded-xl items-center justify-center sm:gap-2 gap-1">
                        <p
                            class="sm:leading-[20px] tracking-[0.5px] font-medium text-[#2B2B2B] sm:text-[16px] text-xs font-mono">
                            Review and Swap
                        </p>
                        <p class="usdtAmount text-xl sm:text-4xl">100 USDC</p>
                        <p class="text-[#9B9B9B] font-mono">~$100.00</p>
                        <div
                            class="bg-[#f9f9f9] p-4 rounded-xl sm:min-h-[172px] h-fit flex flex-col items-start sm:gap-y-2 gap-y-1 mt-4 w-full">
                            <div class="w-full text-sm font-sans text-gray-600 space-y-2">
                                <!-- You're Sending -->
                                <div class="flex justify-between w-full">
                                    <span class="title">You’re Sending</span>
                                    <span class="flex items-center gap-1">
                                        <!-- <img src="/flags/us.svg" alt="USD" class="w-4 h-4" /> -->
                                        <span class="body">$100.00</span>
                                    </span>
                                </div>
    
                                <!-- Recipient gets -->
                                <div class="flex justify-between w-full">
                                    <span class="title">Recipient get’s</span>
                                    <span class="flex items-center gap-1">
                                        <!-- <img src="/tokens/usdc.svg" alt="USDC" class="w-4 h-4" /> -->
                                        <span class="body">$100.00</span>
                                    </span>
                                </div>
    
                                <!-- Fee -->
                                <div class="flex justify-between w-full">
                                    <span class="title">Fee</span>
                                    <span class="body">1.25 USDC</span>
                                </div>
    
                                <!-- Duration -->
                                <div class="flex justify-between w-full">
                                    <span class="title">Duration</span>
                                    <span class="body">~ 2 mins</span>
                                </div>
    
                                <!-- Recipient -->
                                <div class="flex justify-between w-full">
                                    <span class="title">Recipient</span>
                                    <span class="body">0xc9f...a4E7</span>
                                </div>
                            </div>
    
    
                        </div>
                        <!-- Deposit Address Box -->
                        <div
                            class="bg-[#f9f9f9] mt-4 w-full rounded-xl px-4 py-3 text-sm font-mono flex justify-between items-center">
                            <div class="flex flex-col items-start gap-1">
                                <span class="title">Deposit Address</span>
                                <span class="truncate font-mono body">0x5b4G8cGFe7fD82....</span>
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
                    <span>Send</span>
                </button>
                <div class="w-full items-center flex justify-center">
    
                    <p class="text-[#BD4F55] text-center sm:text-sm text-xs">Confirm the amount, token & recipient before
                        sending</p>
                </div>
            </div>
        </section>
  
</template>
<script setup>
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";
const router = useRouter();
const connectedToWallet = ref(false)
const showEstimatedScreen = ref(false)
const send = () => {
    if (connectedToWallet.value) {
        showEstimatedScreen.value = true
    }
    else {
        router.push('/connectToWallet')
    }
}
</script>
<style scoped>
span.title {

    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.5px;
    color: #9B9B9B;

    @media(max-width:640px) {
        font-size: 12px;
    }
}
.mirrored{
  transform: scaleY(-1);
  opacity: 0.3;
  filter: blur(8px);

}
span.body {
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.5px;
    color: #2B2B2B;

    @media(max-width:640px) {
        font-size: 12px;
    }
}
</style>
