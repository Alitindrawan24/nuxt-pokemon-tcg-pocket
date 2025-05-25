<template>
    <div>
        <div class="container justify-self-center">
            <div class="p-4 mb-4 text-center">
                <UContainer class="py-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-400 dark:border-gray-600">
                    <USkeleton v-if="!titleShow" class="h-6 w-64 md:w-128 mx-auto" />
                    <div v-if="titleShow" class="flex flex-row gap-5">
                        <div class="self-center">
                            <NuxtImg class="w-16" :src="url + set?.image" />
                        </div>
                        <div class="flex-column text-left">
                            <h1 class="text-lg md:text-xl font-bold text-grey:900 dark:text-white">{{ set?.name }} ({{ set?.code }})</h1>
                            <h1 class="text-sm md:text-lg font-light text-grey:900 dark:text-white">{{ toDateFormatted(set?.date ?? "") }} • {{ set?.count }} Cards</h1>
                        </div>
                    </div>
                </UContainer>
            </div>

            <div>
                <div class="flex flex-wrap mx-2 mb-4">
                    <div v-for="card in cards" :key="card._id" class="w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-4">
                        <TcgCard :is-linkable="false" :card="card" />
                    </div>
                </div>

                <div v-if="isLoading" class="w-24 justify-self-center my-12">
                    <img src="/loading.svg" alt="loading" loading="lazy">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const route = useRoute()
const config = useRuntimeConfig()
const url = config.public.apiHost
const cards = ref<ICard[]>([]);
const set = ref<ISet>();
const limit = ref(300)
const skip = ref(0)
const titleShow = ref(false)
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
    const cardResponse = await useApi<ICard[]>({
        "method": "GET",
        "path": `/api/cards?set=${route.params.code}&limit=${limit.value}&skip=${skip.value}`
    })

    skip.value += limit.value

    return cardResponse.data
}

const fetchSetData = async () => {
    const setResponse = await useApi<ISet>({
        "method": "GET",
        "path": `/api/sets/${route.params.code}`
    })

    titleShow.value = true

    return setResponse.data
}

const toDateFormatted = (date: string) => {
    const dateFormat = new Date(date);

    if (isNaN(dateFormat.getTime())) {
        return "";
    }

    return dateFormat.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
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