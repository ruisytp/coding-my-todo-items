<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm">
      <div class="py-4 flex items-center justify-between px-[60px]">
        <h1 class="text-2xl font-bold text-white">
          <span class="mr-2">YTP</span>
          <span>代办事项</span>
        </h1>
      </div>
    </header>

    <main class="py-8 px-[60px]">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// 主应用组件
</script>