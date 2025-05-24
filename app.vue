<template>
    <NuxtLoadingIndicator :color="'#51A3FF'" :throttle="0" />
    <div class="flex flex-col min-h-screen">
        <main class="flex-grow">
            <NuxtPage />
        </main>
        <div class="mt-auto">
            <TheFooter />
        </div>
    </div>
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
