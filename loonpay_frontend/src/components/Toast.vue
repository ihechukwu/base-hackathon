<template>
    <div class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="toast.type"
      >
        {{ toast.message }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { useToast } from '../composables/useToast'
  const { toasts } = useToast()
  </script>
  
  <style scoped>
  .toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    z-index: 1000;
  }
  
  .toast {
    padding: 1rem 1.25rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    min-width: 200px;
    width: fit-content;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease;
  }
  
  .toast.success {
    background-color: #0F77FF;
  }
  
  .toast.error {
    background-color: #FF4D4F;
  }
  
  .toast.warning {
    background-color: #FFC107;
    color: black;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  </style>
  