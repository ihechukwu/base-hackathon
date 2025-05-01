import { createRouter, createWebHistory } from "vue-router";
import GiftCardInfo from "../views/GiftCardInfo.vue";
import Home from "../views/Home.vue";
import Swap from "../views/Swap.vue";
import Review from "../views/Review.vue";
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/enter-giftcard-info", name: "GiftCardInfo", component: GiftCardInfo },
  { path: "/swap", name: "Swap", component: Swap },
  { path: "/review-transaction", name: "Review", component: Review },
 ];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});


export default router;
