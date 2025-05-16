<template>
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
                    <p class="usdtAmount text-xl sm:text-4xl">{{ deductedValue }} USDC</p>
                    <p class="text-[#9B9B9B] font-mono">~{{ selectedItem?.value }}</p>
                    <div
                        class="bg-[#f9f9f9] p-4 rounded-xl sm:min-h-[172px] h-fit flex flex-col items-start sm:gap-y-2 gap-y-1 mt-4 w-full">
                        <div class="w-full text-sm font-sans text-gray-600 space-y-2">
                            <!-- You're Sending -->
                            <div class="flex justify-between w-full">
                                <span class="title">You’re Sending</span>
                                <span class="flex items-center gap-1">
                                    <!-- <img src="/flags/us.svg" alt="USD" class="w-4 h-4" /> -->
                                    <span class="body">${{ selectedItem?.value }}</span>
                                </span>
                            </div>

                            <!-- Recipient gets -->
                            <div class="flex justify-between w-full">
                                <span class="title">Recipient get’s</span>
                                <span class="flex items-center gap-1">
                                    <!-- <img src="/tokens/usdc.svg" alt="USDC" class="w-4 h-4" /> -->
                                    <span class="body">${{ deductedValue }}</span>
                                </span>
                            </div>

                            <!-- Fee -->
                            <div class="flex justify-between w-full">
                                <span class="title">Fee</span>
                                <span class="body">{{ chargedFees }} USDC</span>
                            </div>

                            <!-- Duration -->
                            <div class="flex justify-between w-full">
                                <span class="title">Duration</span>
                                <span class="body">~ 30 secs</span>
                            </div>

                            <!-- Recipient -->
                            <div class="flex justify-between w-full">
                                <span class="title">Recipient</span>
                                <span class="body truncate max-w-[200px]">{{ connectedToWallet || 'Not connected'
                                }}</span>
                            </div>
                        </div>


                    </div>
                    <!-- Deposit Address Box -->
                    <div
                        class="bg-[#f9f9f9] mt-4 w-full rounded-xl px-4 py-3 text-sm font-mono flex justify-between items-center">
                        <div class="flex flex-col items-start gap-1">
                            <span class="title">Deposit Address</span>
                            <span class="truncate font-mono body max-w-[80%]">{{ connectedToWallet || 'Not Connected'
                            }}</span>
                        </div>
                        <div class="flex gap-2">
                            <button class="hover:opacity-80" @click="copyToClipboard">
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
            <div class="w-full flex items-center justify-center">

                <button @click="send()"
                    class="bg-[#0F77FF] hover:bg-blue-600 text-white text-sm font-mono px-4 sm:py-3 py-2 rounded-full flex items-center w-full">
                    <span v-if="!isLoading">Send</span>
                    <span v-else>Sending </span>
                </button>
            </div>
            <div class="w-full items-center flex justify-center">

                <p class="text-[#BD4F55] font-mono text-center sm:text-sm text-xs">Confirm the amount, token & recipient
                    before
                    sending</p>
            </div>
        </div>
        <EstimatedScreen v-if="showEstimatedScreen" :remainingTime="remainingTime" :statusItems="statusItems" />

    </section>
</template>
<script setup>

import { useRouter } from "vue-router";
import EstimatedScreen from "../components/EstimatedScreen.vue";
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useMyData } from '../composables/useMyData'
import { useToast } from '../composables/useToast'
const { showToast } = useToast()
const { selectedItem, loadFromSession } = useMyData();
import SwapCard from '../service/swapCard'
import { ethers } from "ethers";
const router = useRouter();
const deductedValue = computed(() => {
    const value = Number(selectedItem?.value?.value);
    if (isNaN(value)) return 0;
    return Number((value - value * 0.05).toFixed(2));
});
const isLoading = ref(false)
const chargedFees = computed(() => {
    const value = Number(selectedItem?.value?.value);
    if (isNaN(value)) return 0;
    return Number((value * 0.05).toFixed(2));
});


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
const send = async () => {
    
    if (!connectedToWallet.value) {
        router.push('/connect-wallet');
        return;
    }

    try {
        
        isLoading.value = true;
        const contract = await SwapCard.getContractInstance();        
        const amount = ethers.parseUnits(deductedValue.value.toString(), 6);
        
        // const gas = await contract.claimTokens.estimateGas(amount);
        // console.log("Estimated gas:", gas.toString());

        const tx = await contract.claimTokens(amount);
        console.log("Transaction hash:", tx.hash);

        await tx.wait(1);
       await startStatusProgress()
    } catch (error) {
        console.log(error);
        showToast(error.message, 'error');
    } finally {
        isLoading.value = false;
    }
};

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
const copyToClipboard = () => {
    if (connectedToWallet?.value) {
        navigator.clipboard.writeText(connectedToWallet.value)
            .then(() => {
                showToast(`copied!`, 'success')
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    }
};

const startStatusProgress = async () => {
    updateNextStatus();
    statusInterval = setInterval(() => {
        updateNextStatus();
    }, 2000);
};

onMounted(async () => {
    if (!selectedItem?.value) {
        loadFromSession()
    }
     try {
    if (!window.ethereum) throw new Error("MetaMask not installed");

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      connectedToWallet.value = accounts[0];
    } else {
      console.log('Wallet not connected yet');
    }
  } catch (err) {
    console.log('Error checking wallet connection:', err);
  }
})
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
