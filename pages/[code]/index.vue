<template>
    <div>
        <div class="container justify-self-center">
            <div class="bg-black-400 shadow-md p-4 mb-4 text-center">
                <h1 class="text-3xl font-bold text-white">{{ set?.name }} ({{ set?.code }}) Card List</h1>
            </div>

            <div>
                <div class="flex flex-wrap mx-2 mb-4">
                    <div v-for="card in cards" :key="card._id" class="w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-4">
                        <div class="flex items-center justify-center">
                            <img :src="url + card.image" :alt="card.name">
                        </div>
                    </div>
                </div>
                
                <div v-if="isLoading" class="w-24 justify-self-center my-12">
                    <NuxtImg src="/loading.svg" alt="loading" placeholder loading="lazy" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Card {
    _id: string;
    set: string;
    number: number;
    code: string;
    name: string;
    evolvesFrom: string;
    pokemonType: string;
    hp?: number;
    cardType: string;
    cardVariant: string;
    artist: string;
    ability?: CardAbility;
    description?: string;
    flavor: string;
    attack_1?: CardAttack;
    attack_2?: CardAttack;
    weakness: string;
    retreat: number;
    rarity: string;
    image: string;
}

interface CardAbility {
    name: string;
    effect: string;
}

interface CardAttack {
    energy: string[];
    name: string;
    effect?: string;
    power?: number;
}

interface Set {
    _id: string
    code: string
    name: string
    image: string
    date: string
    count: number
}

const route = useRoute()
const cards = ref<Card[]>([]);
const set = ref<Set>();
const config = useRuntimeConfig()
const url = config.public.apiHost
const limit = ref(50)
const skip = ref(0)
const isLoading = ref(false)
const canLoadMore = ref(true)

const loadMore = async () => {
    isLoading.value = true
    
    const data = await fetchCardData()

    canLoadMore.value = data.length > 0
    isLoading.value = false
    cards.value.push(...data)
}

const fetchCardData = async () => {
    const cardResponse = await useApi<Card[]>({
        "method": "GET",
        "path": `/api/cards?set=${route.params.code}&limit=${limit.value}&skip=${skip.value}`
    })

    skip.value += limit.value

    return cardResponse.data
}

const fetchSetData = async () => {
    const setResponse = await useApi<Set>({
        "method": "GET",
        "path": `/api/sets/${route.params.code}`
    })

    return setResponse.data
}

const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    const clientHeight = document.documentElement.clientHeight || window.innerHeight

    if (scrollTop + clientHeight >= scrollHeight - 10) {
        if (canLoadMore.value && !isLoading.value) {
            loadMore()
        }
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})

onMounted(async () => {
    cards.value = await fetchCardData();
    set.value = await fetchSetData();
})

</script>