<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div v-if="!isLoading" class="container mx-auto px-4 py-8">

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Card Image Section -->
                <div class="flex justify-center">
                    <div class="relative">
                        <NuxtImg :src="url + card?.image" :alt="card?.name" placeholder
                            class="w-full max-w-sm rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300" />
                    </div>
                </div>

                <!-- Card Information Section -->
                <div class="space-y-6">
                    <!-- Card Header -->
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
                                {{ card?.name }}
                            </h1>
                            <UBadge v-if="card?.pokemonType" color="secondary" variant="soft">
                                {{ card?.pokemonType }}
                            </UBadge>
                        </div>
                        <p class="text-lg text-gray-600 dark:text-gray-400">
                            {{ card?.set }} • #{{ card?.number }}
                        </p>
                    </div>

                    <!-- Card Pokemon Stats -->
                    <UCard v-if="card?.cardType == 'pokemon'">
                        <template #header>
                            <h2 class="text-xl font-semibold">Card Details</h2>
                        </template>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">HP</p>
                                <p class="text-2xl font-bold text-secondary">{{ card?.hp }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Retreat Cost</p>
                                <div class="flex gap-1 mt-1">
                                    <UIcon v-for="n in card?.retreat" :key="n" name="i-heroicons-star-solid"
                                        class="w-5 h-5 text-yellow-400" />
                                </div>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Weakness</p>
                                <UBadge color="secondary" v-if="card?.weakness" variant="soft">
                                    {{ card.weakness }}
                                </UBadge>
                                <span v-else class="text-gray-400">None</span>
                            </div>
                        </div>
                    </UCard>

                    <!-- Card Item -->
                    <UCard v-if="card?.cardType == 'Trainer'">
                        <template #header>
                            <h2 class="text-xl font-semibold">Card Details</h2>
                        </template>

                        <div class="grid grid-cols gap-4">
                            <div>
                                <p class="font-semibold text-lg">{{ card?.description }}</p>
                            </div>
                        </div>
                    </UCard>

                    <!-- Abilities Section -->
                    <UCard v-if="card?.ability">
                        <template #header>
                            <h2 class="text-xl font-semibold">Abilities</h2>
                        </template>

                        <div class="space-y-4">
                            <div class="border-l-4 border-blue-500 pl-4">
                                <h3 class="font-semibold text-lg">{{ card?.ability.name }}</h3>
                                <p class="text-gray-600 dark:text-gray-400 mt-1">{{ card?.ability.effect }}</p>
                            </div>
                        </div>
                    </UCard>

                    <!-- Attacks Section -->
                    <UCard v-if="card?.attack_1 || card?.attack_2">
                        <template #header>
                            <h2 class="text-xl font-semibold">Attacks</h2>
                        </template>

                        <div v-if="card?.attack_1" class="space-y-6">
                            <div class="border border-gray-500 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                                <div class="flex justify-between items-start mb-2">
                                    <h3 class="font-semibold text-lg">{{ card?.attack_1.name }}</h3>
                                    <span class="text-2xl font-bold text-secondary">{{ card?.attack_1.power }}</span>
                                </div>

                                <div class="flex gap-1 mb-2">
                                    <UBadge color="secondary" v-for="(energy, index) in card?.attack_1.energy" :key="index" variant="soft" size="sm">
                                        {{ energy }}
                                    </UBadge>
                                </div>

                                <p class="text-gray-600 dark:text-gray-400">{{ card?.attack_1.effect }}</p>
                            </div>
                        </div>
                        
                        <div  v-if="card?.attack_2" class="space-y-6 mt-5">
                            <div class="border border-gray-500 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                                <div class="flex justify-between items-start mb-2">
                                    <h3 class="font-semibold text-lg">{{ card?.attack_2.name }}</h3>
                                    <span class="text-2xl font-bold text-secondary">{{ card?.attack_2.power }}</span>
                                </div>

                                <div class="flex gap-1 mb-2">
                                    <UBadge color="secondary" v-for="(energy, index) in card?.attack_2.energy" :key="index" variant="soft" size="sm">
                                        {{ energy }}
                                    </UBadge>
                                </div>

                                <p class="text-gray-600 dark:text-gray-400">{{ card?.attack_2.effect }}</p>
                            </div>
                        </div>
                    </UCard>

                    <!-- Set Information -->
                    <UCard>
                        <template #header>
                            <h2 class="text-xl font-semibold">Set Information</h2>
                        </template>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Set Name</p>
                                <p class="font-semibold">{{ set?.name }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Release Date</p>
                                <p class="font-semibold">{{ set?.date }}</p>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const set = ref<ISet>();
const card = ref<ICard>();
const isLoading = ref(true)

const config = useRuntimeConfig()
const url = config.public.apiHost

const fetchCardData = async () => {
    const cardResponse = await useApi<ICard>({
        "method": "GET",
        "path": `/api/cards/${route.params.code}/${route.params.number}`
    })

    isLoading.value = false
    return cardResponse.data
}

const fetchSetData = async () => {
    const setResponse = await useApi<ISet>({
        "method": "GET",
        "path": `/api/sets/${route.params.code}`
    })

    return setResponse.data
}


onMounted(async () => {
    card.value = await fetchCardData();
    set.value = await fetchSetData();
})

</script>

<style scoped>
.shadow-3xl {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>