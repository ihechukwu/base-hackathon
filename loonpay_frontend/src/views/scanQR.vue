<template>
    <section class="bg-white fixed top-0 h-full w-full sm:p-8 p-4 overflow-hidden ">

        <!-- Blurred Background Section -->
  
        <Navbar />
        <div class="flex justify-center items-center h-full w-full main">
            <div v-if="showEstimatedScreen"
                class="w-full lg:w-2/5 bg-white md:w-1/2 shadow-lg p-6 rounded-3xl backdrop-blur-2xl flex flex-col gap-y-6 items-center">             
                <!-- Verify Address View -->
                <div class="w-full flex flex-col gap-y-6 items-center">
                    <h1 class="text-[#2B2B2B] sm:text-[24px] text-lg font-semibold text-center">
                        Verify Address
                    </h1>

                    <!-- Address Field -->
                    <div
                        class="border-gray-300 border w-full rounded-xl px-4 py-3 flex flex-col items-start gap-4 font-inter">
                        <p class="text-[#9B9B9B] tracking-[-1px] text-xs">Wallet Address</p>
                        <input type="text" class="w-full text-sm text-[#2B2B2B] font-mono"
                            value="0xBx5dA60d9F7f082...E30bC760d9bDE2f82" readonly />
                    </div>

                    <!-- Checkbox -->
                    <div class="flex items-center w-full">
                        <input type="checkbox" id="agree" v-model="agree" class="mr-2 w-6 h-6" />
                        <label for="agree" class="text-sm font-medium text-[#7B7B7B]">
                            I agree to the <a href="#" class="text-[#368DFF] font-bold">Terms & Conditions</a>
                        </label>
                    </div>

                    <!-- Terms Info -->
                    <p class="text-sm sm:mt-4 mt-0 text-[#7B7B7B] font-medium text-left w-full leading-relaxed">
                        By clicking the button below, you agree to our Terms & Conditions and also agree that all
                        submitted transactions cannot be reversed
                    </p>

                    <!-- Confirm Button -->
                     <div class="w-full flex items-center justify-center">
                      <button @click="startStatusProgress" :disabled="!agree"
                             class="w-full py-3 rounded-3xl sm:mt-4 mt-0 font-medium transition bg-[#3A72FF] text-white hover:bg-[#2d5ee2]"
                             :class="agree ? 'opacity-100' : 'opacity-30'">
                             Confirm
                         </button>
                     </div>
                </div>
            </div>
            <EstimatedScreen v-else :remainingTime="remainingTime" :statusItems="statusItems" />

        </div>
    </section>
</template>

<script setup>
import EstimatedScreen from '../components/EstimatedScreen.vue'
import { ref, onBeforeUnmount } from 'vue';
import Navbar from '../components/Navbar.vue';
const agree = ref(false)

// State
const remainingTime = ref(2);
const statusItems = ref([
    { text: 'Create Swap Address', completed: false },
    { text: 'Confirming Deposit', completed: false },
    { text: 'Transaction Complete', completed: false }
]);
const currentStatusIndex = ref(-1);
let statusInterval = null;

const showEstimatedScreen = ref(false)

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
    showEstimatedScreen.value = true;
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