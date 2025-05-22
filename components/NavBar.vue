<template>
    <UNavigationMenu 
        highlight
        color="secondary"
        highlight-color="secondary"
        :items="items" class="w-full justify-center container mx-auto" 
    />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
    {   
        label: 'Cards',
        icon: 'i-lucide-book-open',
        to: '/getting-started',
        active: true,
        class:"w-full/2",
        children: [
            {
                label: 'Sets',
                description: 'Fully styled and customizable components for Nuxt.',
                icon: 'i-lucide-house'
            },
            {
                label: 'Sets',
                description: 'Fully styled and customizable components for Nuxt.',
                icon: 'i-lucide-house'
            }
        ]
    },
    {
        label: 'GitHub',
        icon: 'i-simple-icons-github',
        badge: '3.8k',
        to: 'https://github.com/nuxt/ui',
        target: '_blank'
    }
])
</script>
