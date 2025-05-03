<template>
    <!-- <Navbar /> -->
    <section class="w-full flex items-center flex-col justify-center mt-8 sm:mt-0 sm:px-8 px-4">

        <h1
            class="bg-gradient-to-r from-purple-600 via-blue-700 to-blue-900 bg-clip-text text-transparent md:text-5xl sm:text-4xl text-3xl tracking-tight ">
            Instantly Convert your <br />Giftcards to USDC</h1>
        <ul class="flex items-center justify-center gap-3 mt-2">
            <li>Fast</li>
            <li>• Easy</li>
            <li>• Secure</li>
        </ul>
        <div class="flex md:flex-row flex-col gap-4 sm:mt-4 mt-12 w-full items-center justify-center">
            <button
            @click="router.push('/enter-giftcard-info')"
            class="bg-[#0F77FF] hover:bg-blue-600 outline-4 outline-[#86A1C547] text-white text-sm font-mono px-4 py-2 rounded-full items-center space-x-1 sm:w-fit w-3/4  flex">
            <span>Swap Giftcards</span>
        </button>
        <button
            @click="connectToWallet();"
            class="text-[#0F77FF] hover:text-blue-600 border border-[#eee] bg-white text-sm font-mono px-4 py-2 rounded-full sm:!hidden flex items-center space-x-1 sm:w-fit w-3/4">
            <span>Connect</span>
            <img src="../assets/images/connectWalletBlue.svg" alt="">
        </button>
      
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';
import {useRouter} from 'vue-router'
import SwapCard from '../service/swapCard'
const router = useRouter();
const accountAddress = ref(null)
const connectToWallet = async ()=>{
    try {
        const signer = await SwapCard.getProviderOrSigner(); // ✅ Use correct name
        const address = await signer.getAddress();
        accountAddress.value = address;
        console.log("Connected:", address);
        // toast connected successfully
      } catch (error) {
        console.error("MetaMask connection failed:", error.message);
      }
}
</script>
<style scoped>
h1 {
    color: linear-gradient(91.03deg, #6943FF -9.16%, #193DB1 37.33%, #0B1A4B 109.11%);
    font-weight: 500;
    line-height: 120%;
    letter-spacing: -4%;
    text-align: center;

}

ul li {
    font-family: "Geist Mono", monospace;
    color: #8B8B8B;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.5px;
    vertical-align: middle;

}
</style>