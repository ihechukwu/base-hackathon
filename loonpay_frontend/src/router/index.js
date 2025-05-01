import { createRouter, createWebHistory } from "vue-router";
import GiftCardInfo from "../views/GiftCardInfo.vue";
import Home from "../views/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/enter-giftcard-info", name: "GiftCardInfo", component: GiftCardInfo },
 ];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});


export default router;
