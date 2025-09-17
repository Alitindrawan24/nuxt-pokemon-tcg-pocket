<template>
    <div class="font-sans bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <!-- Main -->
        <main>
            <!-- Hero -->
            <section class="pt-24 pb-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <UContainer>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">
                                The Pokémon TCG, reimagined for mobile
                            </h1>
                            <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                Collect, battle, and trade your favorite Pokémon cards with stunning immersive visuals
                                and quick, exciting battles.
                            </p>
                            <div class="mt-6 flex flex-wrap gap-3">
                                <UButton label="Get it on Google Play" icon="i-simple-icons-googleplay"
                                    color="secondary" variant="solid" size="lg"
                                    to="https://play.google.com/store/apps/details" target="_blank" />
                                <UButton label="Download on the App Store" icon="i-simple-icons-appstore"
                                    color="secondary" variant="solid" size="lg"
                                    to="https://apps.apple.com/app/id6479970832" target="_blank" />
                            </div>
                        </div>
                        <div class="relative">
                            <div class="aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center">
                                <img src="@/assets/images/tcgpocket-logo.webp" alt="Pokémon TCG Pocket Logo" class="w-3/4 h-auto object-contain" />
                            </div>
                        </div>
                    </div>
                </UContainer>
            </section>

            <!-- Highlights -->
            <section class="py-12">
                <UContainer>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <UCard
                            class="h-full cursor-pointer transition duration-200 ease-out hover:ease-in hover:-translate-y-1 hover:shadow-xl group">
                            <div class="flex items-start gap-3">
                                <UIcon name="i-heroicons-sparkles"
                                    class="w-6 h-6 text-secondary transition-transform group-hover:scale-110" />
                                <div>
                                    <h3 class="font-bold transition-colors group-hover:text-secondary">Immersive Cards
                                    </h3>
                                    <p
                                        class="text-sm text-gray-600 dark:text-gray-300 transition-colors group-hover:text-gray-700 dark:group-hover:text-gray-200">
                                        Experience vivid card art and
                                        effects that bring battles to life.</p>
                                </div>
                            </div>
                        </UCard>
                        <UCard
                            class="h-full cursor-pointer transition duration-200 ease-out hover:ease-in hover:-translate-y-1 hover:shadow-xl group">
                            <div class="flex items-start gap-3">
                                <UIcon name="i-heroicons-bolt"
                                    class="w-6 h-6 text-secondary transition-transform group-hover:scale-110" />
                                <div>
                                    <h3 class="font-bold transition-colors group-hover:text-secondary">Quick Battles
                                    </h3>
                                    <p
                                        class="text-sm text-gray-600 dark:text-gray-300 transition-colors group-hover:text-gray-700 dark:group-hover:text-gray-200">
                                        Jump into streamlined matches
                                        designed for fast, strategic fun.</p>
                                </div>
                            </div>
                        </UCard>
                        <UCard
                            class="h-full cursor-pointer transition duration-200 ease-out hover:ease-in hover:-translate-y-1 hover:shadow-xl group">
                            <div class="flex items-start gap-3">
                                <UIcon name="i-heroicons-user-group"
                                    class="w-6 h-6 text-secondary transition-transform group-hover:scale-110" />
                                <div>
                                    <h3 class="font-bold transition-colors group-hover:text-secondary">Trade & Collect
                                    </h3>
                                    <p
                                        class="text-sm text-gray-600 dark:text-gray-300 transition-colors group-hover:text-gray-700 dark:group-hover:text-gray-200">
                                        Grow your collection and trade
                                        with friends around the world.</p>
                                </div>
                            </div>
                        </UCard>
                    </div>
                </UContainer>
            </section>

            <!-- Immersive Cards Feature -->
            <section class="py-16 bg-gray-50 dark:bg-gray-800">
                <UContainer>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div class="order-2 md:order-1">
                            <div class="flex items-center gap-2 text-secondary">
                                <UIcon name="i-heroicons-sparkles" class="w-5 h-5" />
                                <span class="text-sm font-semibold uppercase tracking-wide">Immersive Cards</span>
                            </div>
                            <h2 class="text-2xl md:text-3xl font-bold mt-2">Step into the world of each card</h2>
                            <p class="mt-3 text-gray-600 dark:text-gray-300">Dive into immersive scenes that amplify the
                                thrill of every play. See attacks and abilities like never before.</p>
                        </div>
                        <div class="order-1 md:order-2">
                            <div
                                class="rounded-xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-100 dark:bg-gray-900 w-1/2 max-w-md mx-auto">
                                <video class="w-full h-full object-cover" controls playsinline autoplay muted loop
                                    src="https://tcgpocket.pokemon.com/videos/pikachuimmersive_revised_en.mp4"></video>
                            </div>
                        </div>
                    </div>
                </UContainer>
            </section>

            <!-- Sets -->
            <section id="sets" class="py-16">
                <UContainer>
                    <div class="text-center mb-6">
                        <h2 class="text-3xl font-bold">Explore the Sets</h2>
                        <p class="text-gray-600 dark:text-gray-300 mt-2">Browse the latest sets and view details.</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <UCard v-for="set in latestSets" :key="set.code"
                            class="overflow-hidden cursor-pointer transition duration-200 ease-out hover:ease-in hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-secondary group border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                            <template #header>
                                <div class="w-full h-40 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-2 flex items-center justify-center gap-1">
                                    <template v-if="imageList(set).length > 1">
                                        <img
                                            v-for="(src, i) in imageList(set)"
                                            :key="i"
                                            :src="src"
                                            :alt="`${set.name} ${i+1}`"
                                            class="h-full max-h-36 w-auto max-w-[45%] object-contain"
                                        />
                                    </template>
                                    <template v-else>
                                        <img :src="imageList(set)[0]" :alt="set.name" class="h-full max-h-36 w-auto object-contain mx-auto" />
                                    </template>
                                </div>
                            </template>
                            <div class="space-y-1 px-1">
                                <h3 class="font-bold transition-colors group-hover:text-secondary">{{ set.name }} <span
                                        class="text-sm font-normal text-gray-500">({{ set.code }})</span></h3>
                                <p class="text-sm text-gray-700 dark:text-gray-300">
                                    {{ new Date(set.date).toLocaleDateString('en-US', {
                                        day: 'numeric', month: 'short',
                                    year: 'numeric' }) }}
                                    • {{ set.count }} cards
                                </p>
                            </div>
                            <template #footer>
                                <div class="flex justify-end">
                                    <UButton color="secondary" variant="solid" size="sm" :to="`/sets/${set.code}`">View
                                        Set</UButton>
                                </div>
                            </template>
                        </UCard>
                    </div>
                </UContainer>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig()
const apiBase = config.public.apiHost

const sets = ref<ISet[]>([])
const exampleSets = ref<ISet[]>([
    {
        _id: 'ex1', code: 'A4a', name: 'Secluded Springs',
        image: 'https://assets.pokemon-zone.com/game-assets/UI/Textures/System/Pack/PACK_ICON_AN010_0010_00_000.webp',
        date: 'Aug 28, 2025', count: 105
    },
    {
        _id: 'ex2', code: 'A4', name: 'Wisdom of Sea and Sky',
        image: [
            'https://assets.pokemon-zone.com/game-assets/UI/Textures/System/Pack/PACK_ICON_AN009_0010_00_000.webp',
            'https://assets.pokemon-zone.com/game-assets/UI/Textures/System/Pack/PACK_ICON_AN009_0020_00_000.webp'
        ],
        date: 'Jul 30, 2025', count: 241
    },
    {
        _id: 'ex3', code: 'A3b', name: 'Eevee Grove',
        image: 'https://assets.pokemon-zone.com/game-assets/UI/Textures/System/Pack/PACK_ICON_AN008_0010_00_000.webp',
        date: 'Jun 26, 2025', count: 107
    }
])
const latestSets = computed(() => {
    const pool = (sets.value && sets.value.length) ? sets.value : exampleSets.value
    return [...pool]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3)
})

onMounted(async () => {
    const res = await useApi<ISet[]>({ method: 'GET', path: '/api/sets' })
    if (res && Array.isArray(res.data)) {
        sets.value = res.data
    }
})


function imageList(set: ISet): string[] {
    const imgs = Array.isArray(set.image) ? set.image : [set.image]
    return imgs
        .filter((s): s is string => typeof s === 'string' && s.length > 0)
        .slice(0, 2)
        .map(src => (/^https?:/i.test(src) ? src : (apiBase + src)))
}
</script>

<style scoped></style>
