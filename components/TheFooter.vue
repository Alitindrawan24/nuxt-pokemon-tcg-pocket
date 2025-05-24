<template>
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <UContainer class="py-6">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                <!-- Copyright -->
                <div class="text-sm text-gray-500 dark:text-gray-400">
                    &copy; {{ new Date().getFullYear() }} Alt24
                </div>

                <!-- External links -->
                <div class="flex items-center gap-4">
                    <UButton to="https://github.com/alitindrawan24" target="_blank" color="gray" variant="ghost"
                        icon="i-simple-icons-github" aria-label="GitHub Profile"
                        :ui="{ rounded: 'rounded-full', padding: { sm: 'p-2' } }" />

                    <UButton to="https://alitindrawan.com" target="_blank" color="gray" variant="ghost"
                        icon="i-heroicons-globe-alt" aria-label="Personal Website"
                        :ui="{ rounded: 'rounded-full', padding: { sm: 'p-2' } }" />

                </div>
            </div>
        </UContainer>
    </footer>
</template>