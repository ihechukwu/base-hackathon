<template>
    <Navbar />
    <section class="flex w-full flex-col justify-center items-center  mt-8 sm:px-8 px-4">
        <div v-if="!showEstimatedScreen" class="w-full md:w-1/2 flex flex-col gap-y-4 items-start">
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
            <button @click="send()"
                class="bg-[#0F77FF] hover:bg-blue-600 text-white text-sm font-mono px-4 sm:py-3 py-2 rounded-full flex items-center w-full">
                <span>Send</span>
            </button>
            <div class="w-full items-center flex justify-center">

                <p class="text-[#BD4F55] font-mono text-center sm:text-sm text-xs">Confirm the amount, token & recipient before
                    sending</p>
            </div>
        </div>
        <div v-else class="w-full md:w-1/2 flex flex-col gap-y-4 items-start">
            <div class="hidden md:block">
                <button @click="router.push('/')" class=" backBtn sm:text-[1rem] text-xs">
                    ← Homepage
                </button>
            </div>
            <div class=" w-full  bg-white rounded-2xl shadow-2xl p-2">
                <div class=" w-full  bg-[#F9F9F9] rounded-2xl p-6">
                    <!-- Estimated Time Section -->
                    <div class="text-center mb-6 text-[#2B2B2B]">
                        <p class="font-mono sm:text-[16px] text-sm mb-1">Estimated Time</p>
                        <h1 class="sm:text-3xl text-2xl font-bold ">{{ remainingTime }} mins</h1>
                    </div>

                    <!-- Status Items -->
                    <div class="mb-8">
                        <div v-for="(status, index) in statusItems" :key="index" class="flex items-center mb-3">
                            <div
                                :class="['flex items-center justify-center sm:w-6 sm:h-6 w-4 h-4 rounded-full mr-3', status.completed ? 'bg-[#7FC161]' : 'bg-[#9B9B9B]']">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="sm:w-4 sm:h-4 h-3 w-3 text-white">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span
                                :class="['progress md:text-lg text-xs', status.completed ? 'text-[#7FC161] ' : 'text-[#9B9B9B]']">{{
                             status.text }}</span>
                        </div>
                    </div>

                    <!-- Currency Exchange Section -->
                    <div class="border-t border-gray-200 pt-6">
                        <div class="flex items-center justify-center mb-4">
                            <!-- US Flag Icon -->
                            <div class="w-12 h-12 rounded-full overflow-hidden">
                                <img src="../assets/images/usFlag.svg" alt="US Currency"
                                    class="w-full h-full object-cover">
                            </div>

                            <!-- Swap Arrow -->
                            <div class="mx-2 bg-white rounded-full border-[0.39px] border-[#EEEEEE] p-2">
                                <img src="../assets/images/horizontalArrow.svg" alt="US Currency"
                                    class="w-full h-full object-cover">


                            </div>

                            <!-- USDC Icon -->
                            <div class="w-12 h-12 flex items-center justify-center">
                                <img src="../assets/images/usdcFlag.svg" alt="US Currency"
                                    class="w-full h-full object-cover">

                            </div>
                        </div>

                        <!-- Amount -->
                        <div class="text-center">
                            <h2 class="text-2xl font-bold text-gray-900 mb-1">100 USDC</h2>
                            <p class="text-[#9B9B9B] text-sm font-mono">~$100.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';
const router = useRouter();

// State
const remainingTime = ref(2);
const statusItems = ref([
    { text: 'Create Swap Address', completed: false },
    { text: 'Confirming Deposit', completed: false },
    { text: 'Transaction Complete', completed: false }
]);
const currentStatusIndex = ref(-1);
let statusInterval = null;

const connectedToWallet = ref(false)
const showEstimatedScreen = ref(false)
const send = () => {
    if (connectedToWallet.value) {
        showEstimatedScreen.value = true
        startStatusProgress();

    }
    else {
        router.push('/connect-wallet')
    }
}
const updateNextStatus = () => {
    currentStatusIndex.value++;

    if (currentStatusIndex.value < statusItems.value.length) {
        statusItems.value[currentStatusIndex.value].completed = true;

        if (currentStatusIndex.value === 0) {
            remainingTime.value = 1;
        } else if (currentStatusIndex.value === statusItems.value.length - 1) {
            remainingTime.value = 0;
            clearInterval(statusInterval);
        }
    } else {
        clearInterval(statusInterval);
    }
};

const startStatusProgress = () => {
    updateNextStatus();
    statusInterval = setInterval(() => {
        updateNextStatus();
    }, 2000);
};



onBeforeUnmount(() => {
    if (statusInterval) {
        clearInterval(statusInterval);
    }
});
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

.progress {
    font-family: "Inter", sans-serif;
    font-weight: 400;
    letter-spacing: -0.33px;

}
</style>
