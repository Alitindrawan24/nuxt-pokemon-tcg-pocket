<script setup lang="ts">
const {
    public: { googleAdsClient }
} = useRuntimeConfig();

if (googleAdsClient) {
    useHead({
        script: [
            {
                src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsClient}`,
                async: true,
                crossorigin: 'anonymous'
            }
        ]
    });
}
</script>

<template>
    <NuxtLoadingIndicator :color="'#51A3FF'" :throttle="0" />
    <UApp>
        <div class="flex flex-col min-h-screen">
            <TheNavbar />
            <main class="flex-grow">
                <NuxtPage />
            </main>
            <div class="mt-auto">
                <TheFooter />
            </div>
        </div>
    </UApp>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
