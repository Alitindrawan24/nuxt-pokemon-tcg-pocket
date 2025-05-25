<template>
    <div>
        <div class="container justify-self-center">
            <div class="w-1/8">
                <TcgCard v-if="card" :is-linkable="false" :card="card" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const route = useRoute()
const card = ref<ICard>();
const isLoading = ref(true)



const fetchCardData = async () => {
    const cardResponse = await useApi<ICard>({
        "method": "GET",
        "path": `/api/cards/${route.params.code}/${route.params.number}`
    })

    isLoading.value = false
    return cardResponse.data
}


onMounted(async () => {
    card.value = await fetchCardData();
})

</script>