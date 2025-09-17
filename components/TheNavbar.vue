<template>
  <header class="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 backdrop-blur">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14">
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <span class="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Pokémon TCG Pocket</span>
          </NuxtLink>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-center space-x-2">
            <NuxtLink to="/sets" class="px-3 py-2 rounded-md text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Sets</NuxtLink>
          </div>
        </div>
        <div class="md:hidden">
          <UButton
            icon="i-heroicons-bars-3"
            color="gray"
            variant="ghost"
            :ui="{ rounded: 'rounded-md' }"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          />
        </div>
      </div>
    </nav>
    <div v-if="isMobileMenuOpen" class="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="px-4 py-2 space-y-1">
        <NuxtLink to="/sets" @click="isMobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Sets</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)
</script>

<style scoped></style>

