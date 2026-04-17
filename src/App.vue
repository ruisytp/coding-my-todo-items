<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800 flex items-center">
          <span class="text-blue-500 mr-2">YTP</span>
          <span>代办事项</span>
          <span class="ml-2 w-6 h-0.5 bg-blue-500 inline-block align-middle"></span>
        </h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// 主应用组件
</script>