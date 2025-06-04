<template>
  <div
    class="relative w-32 h-44 bg-gradient-to-br from-red-600 to-red-800 border-red-500 border-2 group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 rounded-lg"
  >
    <div class="h-full flex flex-col items-center justify-center p-4">
      <div
        class="w-full h-full bg-gradient-to-br from-red-500 to-red-700 rounded-md flex items-center justify-center relative overflow-hidden"
      >
        <div class="absolute inset-2 border-2 border-red-400 rounded opacity-50"></div>
        <div class="absolute inset-4 border border-red-400 rounded opacity-30"></div>
        <div class="w-8 h-8 bg-red-400 rounded-full opacity-60"></div>
        <div class="absolute top-2 left-2 w-2 h-2 bg-red-400 rounded-full opacity-40"></div>
        <div class="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full opacity-40"></div>
        <div class="absolute bottom-2 left-2 w-2 h-2 bg-red-400 rounded-full opacity-40"></div>
        <div class="absolute bottom-2 right-2 w-2 h-2 bg-red-400 rounded-full opacity-40"></div>
      </div>
    </div>
  </div>
</template>
