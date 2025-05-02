<template>
    <div class="w-full h-full mirrored relative">
        <!-- <div class="absolute top-0 left-0 w-full h-full backdrop-blur-2xl">
        </div> -->
    <Home/>
    </div>
    <section v-if="!showWalletList"
        class="fixed top-0 flex flex-col h-full w-full items-center justify-center sm:p-8 p-4">
        <div
            class="w-full lg:w-1/2 xl:w-2/5 shadow-lg p-4 rounded-3xl bg-white  flex flex-col gap-y-4 items-start">

            <div class="w-full p-4 flex flex-col rounded-xl items-center justify-center sm:gap-2 gap-1">
                <h1 class="sm:leading-[20px] tracking-[0.5px] text-[#2B2B2B] sm:text-[24px] text-sm font-[600] text-center">
                    Connect your wallet to continue </h1>
                <div
                    class="bg-[#f9f9f9] p-6 rounded-xl sm:min-h-[229px] h-fit flex  items-center sm:gap-y-2 gap-x-4 justify-center mt-4 w-full">
                    <div class="border gradient-border p-5 rounded-full">
                        <img src="../assets/images/bigLogo.svg" alt=""
                            class="sm:w-[72px] w-[49px] sm:h-[72px] h-[49px]">
                    </div>

                    <div class="bg-white border  border-[#F9F9F9] rounded-full p-2 shadow">
                        <div class="bg-[#F9F9F9] p-2 rounded-full">
                            <img src="../assets/images/chain.svg" alt="">
                        </div>
                    </div>
                    <div class="border gradient-border p-5 rounded-full">
                        <img src="../assets/images/walletLogo.svg" alt="">
                    </div>
                </div>

            </div>

            <button @click="showWalletList = true"
                class="bg-[#0F77FF] hover:bg-blue-600 text-white text-sm font-mono px-4 py-3  rounded-full flex items-center w-full space-x-2">
                <span>Connect</span>
                <img src="../assets/images/connectWallet.svg" alt="wallet" class="w-4 h-4" />

            </button>
        </div>

    </section>
    <section v-else class="bg-white fixed top-0  h-full w-full sm:p-8 p-4">
        <div class="flex justify-center items-center w-full pt-8">
            <button @click="router.push('/')" class="flex items-center space-x-2">
                <img src="../assets/images/logoImage.svg" alt="Loonpay" class="h-6 w-auto" />
                <img src="../assets/images/logoText.svg" alt="Loonpay" class="sm:h-6 h-4 w-auto" />
            </button @click="router.push('/')">
        </div>
        <div class="flex justify-center items-center h-full w-full">
            <div
                class="w-full md:w-2/5 sm:w-1/2 shadow-lg p-4 rounded-3xl backdrop-blur-2xl flex flex-col gap-y-4 items-center">
                <h1 class="sm:leading-[20px] tracking-[0.5px] text-[#2B2B2B] sm:text-[24px] text-lg font-[600] text-center">
                    Connect  wallet </h1>
                <ul class="w-full flex flex-col items-start gap-y-4 mt-4 sm:mt-8 sm:text-xl text-lg">
                    <li class="flex items-center w-full border border-[#EEE] rounded-xl p-3 justify-between metamask">
                        Metamask
                        <img src="../assets/images/metamask.svg" alt="">
                    </li>
                    <li class="flex items-center w-full border border-[#EEE] rounded-xl p-3 justify-between others metamask">
                        Coinbase Wallet
                        <img src="../assets/images/coinbase.svg" alt="">
                    </li>
                    <li class="flex items-center w-full border border-[#EEE] rounded-xl p-3 justify-between others metamask">
                        Other Wallets
                        <img src="../assets/images/otherwallet.svg" alt="">
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import Home from "./Home.vue";
const router = useRouter();
const showWalletList = ref(false)

</script>
<style scoped>
.mirrored {
    transform: scaleY(-1);
    opacity: 0.3;
    filter: blur(8px);

}

.gradient-border {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    background-image:
        linear-gradient(white, white),
        linear-gradient(326deg, #6943FF 21.11%, #5FA8FF 50%, #6FE5FF 78.89%, #6943FF);
    background-origin: border-box;
    background-clip: padding-box, border-box;
}

li.metamask {
    color: #2B2B2B;
    text-align: center;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    line-height: 40px;
    /* 200% */
    letter-spacing: -1px;
}
li.others{
opacity: 0.4;
}
</style>
