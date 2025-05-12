<template>
    <section class="flex w-full flex-col justify-center items-center sm:mt-16 mt-8 sm:px-8 px-4">
        <div class="w-full sm:w-1/2 md:w-2/5 flex flex-col gap-y-4 items-start">
            <div class="hidden md:block">
                <button @click="router.back()" class=" backBtn sm:text-[1rem] text-xs">
                    ← Back
                </button>
            </div>
            <form @submit.prevent="authenticateGiftcard()" class="w-full min-h-fit flex flex-col gap-5">

                <div class="w-full bg-[#ffffff] p-4 shadow-2xl rounded-xl mt-4">
                    <div class="w-full bg-[#F9F9F9] p-4 flex flex-col rounded-xl items-start gap-2">
                        <div class="relative w-full group">
                            <input required type="text" placeholder="Enter Giftcard Code" v-model="giftcard"
                                :disabled="isDisabled"
                                class="w-full bg-white border border-[#eeeeee] cursor-not-allowed not-[]:focus:border-b-blue-500 outline-blue-500 rounded-xl" />

                            <!-- Tooltip shown only on hover -->
                            <div v-if="isDisabled"
                                class="absolute -bottom-12 left-1/4 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-2 text-white text-sm rounded-md z-10"
                                style="background: linear-gradient(326deg, #6943FF 21.11%, #5FA8FF 50%, #6FE5FF 78.89%, #fff">
                                Generated a test giftcard for you
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full flex items-center justify-center">

                    <button
                        class="bg-[#0F77FF] hover:bg-blue-600 text-white text-sm font-mono px-4 sm:py-3 py-2 rounded-full flex items-center w-full">
                        <span v-if="!fetchingCards">Continue</span>
                        <div v-else class="flex items-center justify-center gap-2">
                            <span>
                                Fetching Test Giftcard
                            </span>
                            <div class="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin">
                            </div>

                        </div>
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useMyData } from '../composables/useMyData'

import axios from 'axios'
import { ref, onMounted } from 'vue';
const router = useRouter();
const { setItem } = useMyData()
const giftcard = ref("");
const isDisabled = ref(true);
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const fetchingCards = ref(false)
const fetchCards = async () => {
    fetchingCards.value = true;
    try {
        const response = await axios.get(`${apiUrl}/api`)
        const unusedGiftcard = response.data.filter(giftcard => !giftcard.redeemed)
        let giftcardForUser = unusedGiftcard[0]
        giftcard.value = giftcardForUser.code;
        setItem(giftcardForUser)

    }
    catch(err) {
        console.log(err)

    } finally {
        fetchingCards.value = false
    }
}
const authenticateGiftcard = ()=>{
    router.push('/swap')
}
onMounted(() => {
    fetchCards()
})
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
