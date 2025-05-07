<template>
    <div v-if="route.path !== '/connect-wallet'" class="sm:px-8 p-0" >

    <Navbar />
    <div :style="backgroundStyle" class="hero-background  min-h-fit
  sm:h-[75vh] h-screen bg-white sm:rounded-2xl rounded-none pb-4  flex flex-col">
      <slot/>
    </div>
    <footer v-if="
      currentRouteName !== 'Home' ||
      (currentRouteName === 'Home' && !isMobile)
    " 
  class="w-full flex items-center justify-center p-2"
  :class="[isMobile ? '' : 'bg-white p-4']">
    <div class="md:w-3/4 w-full flex md:flex-row flex-col items-center justify-between gap-2">

      <p>©2025 Loonpay. All Rights Reserved.</p>
      <ul class="flex items-center space-x-4">
        <li>
          <a href="" target="_blank"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.2174 1.26904H14.4663L9.55298 6.88471L15.3332 14.5264H10.8073L7.26253 9.89174L3.20647 14.5264H0.956125L6.21146 8.51977L0.666504 1.26904H5.30724L8.51143 5.50526L12.2174 1.26904ZM11.428 13.1802H12.6742L4.6301 2.54446H3.29281L11.428 13.1802Z"
                fill="#4B4B4B" />
            </svg>
          </a>
        </li>
        <li>
          <a href="" target="_blank">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_84_318)">
                <rect width="16" height="16" rx="8" fill="#EEEEEE" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M3.62118 7.91547C5.95334 6.89938 7.50848 6.22952 8.2866 5.90587C10.5083 4.9818 10.9699 4.82128 11.2708 4.81597C11.337 4.81481 11.485 4.83121 11.5808 4.90899C11.6618 4.97466 11.684 5.06337 11.6947 5.12563C11.7053 5.1879 11.7186 5.32974 11.7081 5.44057C11.5877 6.70556 11.0667 9.77535 10.8017 11.1922C10.6896 11.7917 10.4687 11.9927 10.255 12.0123C9.7904 12.0551 9.43762 11.7053 8.98766 11.4104C8.28356 10.9488 7.88578 10.6615 7.20233 10.2111C6.41248 9.69061 6.9245 9.40454 7.37464 8.93701C7.49244 8.81466 9.53937 6.95282 9.57899 6.78392C9.58394 6.7628 9.58854 6.68406 9.54176 6.64248C9.49499 6.60091 9.42595 6.61512 9.37613 6.62643C9.30551 6.64246 8.18069 7.38592 6.00168 8.85681C5.6824 9.07605 5.39321 9.18287 5.13411 9.17727C4.84847 9.1711 4.29901 9.01577 3.89054 8.88299C3.38954 8.72014 2.99136 8.63403 3.02603 8.35745C3.04409 8.2134 3.24247 8.06607 3.62118 7.91547Z"
                  fill="#4B4B4B" />
              </g>
              <defs>
                <clipPath id="clip0_84_318">
                  <rect width="16" height="16" rx="8" fill="white" />
                </clipPath>
              </defs>
            </svg>


          </a>
        </li>
        <li>
          <a href="" target="_blank">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_84_315)">
                <path
                  d="M8 1.44062C10.1375 1.44062 10.3906 1.45 11.2313 1.4875C12.0125 1.52187 12.4344 1.65313 12.7156 1.7625C13.0875 1.90625 13.3563 2.08125 13.6344 2.35938C13.9156 2.64062 14.0875 2.90625 14.2313 3.27813C14.3406 3.55938 14.4719 3.98438 14.5063 4.7625C14.5438 5.60625 14.5531 5.85938 14.5531 7.99375C14.5531 10.1313 14.5438 10.3844 14.5063 11.225C14.4719 12.0063 14.3406 12.4281 14.2313 12.7094C14.0875 13.0813 13.9125 13.35 13.6344 13.6281C13.3531 13.9094 13.0875 14.0813 12.7156 14.225C12.4344 14.3344 12.0094 14.4656 11.2313 14.5C10.3875 14.5375 10.1344 14.5469 8 14.5469C5.8625 14.5469 5.60938 14.5375 4.76875 14.5C3.9875 14.4656 3.56563 14.3344 3.28438 14.225C2.9125 14.0813 2.64375 13.9063 2.36563 13.6281C2.08438 13.3469 1.9125 13.0813 1.76875 12.7094C1.65938 12.4281 1.52813 12.0031 1.49375 11.225C1.45625 10.3813 1.44688 10.1281 1.44688 7.99375C1.44688 5.85625 1.45625 5.60313 1.49375 4.7625C1.52813 3.98125 1.65938 3.55938 1.76875 3.27813C1.9125 2.90625 2.0875 2.6375 2.36563 2.35938C2.64688 2.07812 2.9125 1.90625 3.28438 1.7625C3.56563 1.65313 3.99063 1.52187 4.76875 1.4875C5.60938 1.45 5.8625 1.44062 8 1.44062ZM8 0C5.82813 0 5.55625 0.009375 4.70313 0.046875C3.85313 0.084375 3.26875 0.221875 2.7625 0.41875C2.23438 0.625 1.7875 0.896875 1.34375 1.34375C0.896875 1.7875 0.625 2.23438 0.41875 2.75938C0.221875 3.26875 0.084375 3.85 0.046875 4.7C0.009375 5.55625 0 5.82812 0 8C0 10.1719 0.009375 10.4438 0.046875 11.2969C0.084375 12.1469 0.221875 12.7313 0.41875 13.2375C0.625 13.7656 0.896875 14.2125 1.34375 14.6562C1.7875 15.1 2.23438 15.375 2.75938 15.5781C3.26875 15.775 3.85 15.9125 4.7 15.95C5.55313 15.9875 5.825 15.9969 7.99688 15.9969C10.1688 15.9969 10.4406 15.9875 11.2938 15.95C12.1438 15.9125 12.7281 15.775 13.2344 15.5781C13.7594 15.375 14.2063 15.1 14.65 14.6562C15.0938 14.2125 15.3688 13.7656 15.5719 13.2406C15.7688 12.7313 15.9063 12.15 15.9438 11.3C15.9813 10.4469 15.9906 10.175 15.9906 8.00313C15.9906 5.83125 15.9813 5.55938 15.9438 4.70625C15.9063 3.85625 15.7688 3.27188 15.5719 2.76562C15.375 2.23438 15.1031 1.7875 14.6563 1.34375C14.2125 0.9 13.7656 0.625 13.2406 0.421875C12.7313 0.225 12.15 0.0875 11.3 0.05C10.4438 0.009375 10.1719 0 8 0Z"
                  fill="#4B4B4B" />
                <path
                  d="M8 3.89062C5.73125 3.89062 3.89062 5.73125 3.89062 8C3.89062 10.2688 5.73125 12.1094 8 12.1094C10.2688 12.1094 12.1094 10.2688 12.1094 8C12.1094 5.73125 10.2688 3.89062 8 3.89062ZM8 10.6656C6.52813 10.6656 5.33437 9.47188 5.33437 8C5.33437 6.52813 6.52813 5.33437 8 5.33437C9.47188 5.33437 10.6656 6.52813 10.6656 8C10.6656 9.47188 9.47188 10.6656 8 10.6656Z"
                  fill="#4B4B4B" />
                <path
                  d="M13.2312 3.72793C13.2312 4.25918 12.8 4.68731 12.2719 4.68731C11.7406 4.68731 11.3125 4.25606 11.3125 3.72793C11.3125 3.19668 11.7438 2.76855 12.2719 2.76855C12.8 2.76855 13.2312 3.19981 13.2312 3.72793Z"
                  fill="#4B4B4B" />
              </g>
              <defs>
                <clipPath id="clip0_84_315">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

          </a>
        </li>
        <li>
          <a href="" target="_blank">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_84_317)">
                <path
                  d="M14.8189 0H1.18111C0.867861 0 0.567441 0.124438 0.34594 0.34594C0.124438 0.567441 0 0.867861 0 1.18111V14.8189C0 15.1321 0.124438 15.4326 0.34594 15.6541C0.567441 15.8756 0.867861 16 1.18111 16H14.8189C15.1321 16 15.4326 15.8756 15.6541 15.6541C15.8756 15.4326 16 15.1321 16 14.8189V1.18111C16 0.867861 15.8756 0.567441 15.6541 0.34594C15.4326 0.124438 15.1321 0 14.8189 0ZM4.76889 13.63H2.36333V5.98889H4.76889V13.63ZM3.56445 4.93C3.29158 4.92846 3.02528 4.84613 2.79916 4.69339C2.57304 4.54065 2.39723 4.32435 2.29392 4.07179C2.19061 3.81923 2.16443 3.54173 2.21869 3.2743C2.27294 3.00688 2.4052 2.76152 2.59877 2.56919C2.79234 2.37686 3.03854 2.24618 3.30631 2.19364C3.57408 2.1411 3.85141 2.16906 4.1033 2.27399C4.35519 2.37892 4.57036 2.55611 4.72164 2.78321C4.87293 3.01031 4.95355 3.27713 4.95333 3.55C4.95591 3.73269 4.92167 3.91403 4.85267 4.0832C4.78368 4.25238 4.68132 4.40593 4.55171 4.53471C4.42211 4.66349 4.2679 4.76486 4.09828 4.83277C3.92867 4.90068 3.74711 4.93375 3.56445 4.93ZM13.6356 13.6367H11.2311V9.46222C11.2311 8.23111 10.7078 7.85111 10.0322 7.85111C9.31889 7.85111 8.61889 8.38889 8.61889 9.49333V13.6367H6.21333V5.99445H8.52667V7.05333H8.55778C8.79 6.58333 9.60333 5.78 10.8444 5.78C12.1867 5.78 13.6367 6.57667 13.6367 8.91L13.6356 13.6367Z"
                  fill="#4B4B4B" />
              </g>
              <defs>
                <clipPath id="clip0_84_317">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>


          </a>
        </li>
      </ul>
    </div>
    </footer>
  </div>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";

// Static imports of images
import desktopImage from "../assets/images/desktop-bgImage.png";
import desktopGradient from "../assets/images/desktop-gradient.png";
import mobileImage from "../assets/images/mobile-bgImage.png";
import mobileGradient from "../assets/images/mobile-gradient.png";

const route = useRoute();
const isMobile = ref(window.innerWidth <= 640);
const currentRouteName = ref(route.name);

// Listen for route changes
watch(
  () => route.name,
  (newVal) => {
    currentRouteName.value = newVal;
  }
);

// Handle screen resizing
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 640;
};

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});

// Compute the correct background style
const backgroundStyle = computed(() => {
  const isHome = currentRouteName.value === "Home" || route.path === "/";

  if (isMobile.value) {
    return {
      backgroundImage: `url(${isHome ? mobileImage : mobileGradient})`,
      backgroundPosition: "bottom",

      // height: '100vh',
    };
  }

  return {
    backgroundImage: `url(${isHome ? desktopImage : desktopGradient})`,
    backgroundPosition: `${isHome ? "center" : "bottom"}`,
  };
});
</script>

<style>
.hero-background {
  background-size: cover;
  background-repeat: no-repeat;
}
footer p{
  color: #5A5A5A;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: -0.24px;
}
</style>
