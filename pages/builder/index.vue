<template>
    <UContainer class="py-8">
        <header class="mb-8 text-center">
            <h1 class="text-4xl font-bold text-gray-800 dark:text-white">Simple Deck Builder</h1>
            <p class="text-lg text-gray-500 dark:text-gray-400">Search mock cards and drag them to build your deck.</p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Card Search -->
            <div class="lg:col-span-1">
                <div class="space-y-4">
                    <div>
                        <label for="card-search"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Card Name</label>
                        <UInput id="card-search" color="secondary" v-model="search" placeholder="e.g., Pikachu, Potion..."
                            icon="i-heroicons-magnifying-glass" size="xl" />
                    </div>

                    <div ref="scrollContainer" class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg h-[600px] overflow-y-auto">
                        <div v-if="cards.length > 0" class="grid grid-cols-2 gap-4">
                            <!-- Card item in the search list -->
                            <div v-for="card in cards" :key="card._id" draggable="true"
                                @dragstart="handleDragStart($event, card)"
                                class="cursor-grab active:cursor-grabbing group relative">
                                <NuxtImg :src="url + card.image" :alt="card.name"
                                    class="rounded-lg shadow-md w-full select-none group-hover:opacity-30 transition-opacity"
                                    draggable="false"
                                    onerror="this.onerror=null;this.src='https://placehold.co/240x336/EFEFEF/333333?text=No+Image';" />
                                <div v-if="findCardNameInDeck(card) > 0"
                                    class="absolute -top-2 -right-2 bg-primary-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold shadow-lg pointer-events-none">
                                    {{ findCardNameInDeck(card) }}
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <UButton @click.stop="addCard(card)" size="md" variant="solid" icon="i-heroicons-plus-20-solid" class="shadow-lg !bg-blue-900 hover:!bg-blue-950 !text-white" />
                                    <UButton @click.stop="removeCard(card)" size="md" variant="solid" icon="i-heroicons-minus-20-solid" class="shadow-lg !bg-blue-900 hover:!bg-blue-950 !text-white" />
                                    <UButton @click.stop="openCardModal(card)" size="md" variant="solid" icon="i-heroicons-eye-20-solid" class="shadow-lg !bg-blue-900 hover:!bg-blue-950 !text-white" />
                                </div>
                            </div>
                        </div>
                        <div v-else class="flex items-center justify-center h-full">
                            <p class="text-gray-500">No cards found.</p>
                        </div>
                        <div v-if="isLoading" class="flex justify-center py-4">
                            <UIcon name="i-heroicons-arrow-path" class="animate-spin text-2xl text-primary-500" />
                        </div>
                        <div ref="loadMoreTrigger" class="h-4"></div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Deck List -->
            <div class="lg:col-span-2">
                <div @drop="handleDrop" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave"
                    class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg transition-colors min-h-[676px]"
                    :class="{ 'bg-primary-100 dark:bg-primary-900 ring-2 ring-primary-500': isDragOver }">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold">Your Deck ({{ totalCount }} / 20)</h2>
                        <UButton v-if="totalCount > 0" @click="confirmClearDeck" color="red" variant="soft"
                            icon="i-heroicons-trash">
                            Clear Deck
                        </UButton>
                    </div>

                    <div class="space-y-6">
                        <div v-if="totalCount === 0"
                            class="flex flex-col items-center justify-center h-full min-h-[550px] text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
                            <UIcon name="i-heroicons-document-plus"
                                class="text-5xl text-gray-400 dark:text-gray-500 mb-4" />
                            <p class="text-lg font-semibold text-gray-600 dark:text-gray-300">Drop Cards Here</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Drag or right-click cards from the left
                                panel to add them.</p>
                        </div>

                        <div v-else>
                            <!-- Unified Deck Grid -->
                            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                <div v-for="item in deck" :key="item.card._id" class="relative group">
                                    <NuxtImg :src="url + item.card.image" :alt="item.card.name"
                                        class="rounded-lg shadow-md w-full select-none group-hover:opacity-30 transition-opacity"
                                        draggable="false"
                                        onerror="this.onerror=null;this.src='https://placehold.co/240x336/EFEFEF/333333?text=No+Image';" />
                                    <div
                                        class="absolute -top-2 -right-2 bg-primary-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold shadow-lg pointer-events-none">
                                        {{ item.quantity }}
                                    </div>
                                    <div class="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <UButton @click.stop="addCard(item.card)" size="md" variant="solid" icon="i-heroicons-plus-20-solid" class="shadow-lg !bg-blue-900 hover:!bg-blue-950 !text-white" />
                                        <UButton @click.stop="removeCard(item.card)" size="md" variant="solid" icon="i-heroicons-minus-20-solid" class="shadow-lg !bg-blue-900 hover:!bg-blue-950 !text-white" />
                                        <UButton @click.stop="openCardModal(item.card)" size="md" variant="solid" icon="i-heroicons-eye-20-solid" class="shadow-lg !bg-blue-900 hover:!bg-blue-950 !text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card Detail Modal -->
        <UModal v-model:open="isModalOpen" :ui="{ width: 'sm:max-w-4xl' }" class="px-8 py-16" :close="{color: 'secondary',variant: 'outline',class: 'rounded-full'}">

            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-2xl font-semibold">{{ selectedCard?.name }}</h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="isModalOpen = false" />
                </div>
            </template>

            <template #content>
                <div v-if="selectedCard" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <NuxtImg :src="url + selectedCard.image" :alt="selectedCard.name"
                            class="rounded-lg shadow-lg w-full" />
                    </div>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <h4 class="text-xl font-bold">{{ selectedCard.name }}</h4>
                            <span v-if="selectedCard.hp" class="text-lg font-semibold text-red-500">HP {{
                                selectedCard.hp }}</span>
                        </div>
                        <p class="text-gray-500 dark:text-gray-400">{{ selectedCard.flavor }}</p>

                        <div v-if="selectedCard.attack_1">
                            <h5 class="font-bold mb-2">Attacks</h5>
                            <div class="mb-3 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <div class="flex justify-between font-semibold">
                                    <span>{{ selectedCard.attack_1.name }}</span>
                                    <span>{{ selectedCard.attack_1.power }}</span>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-300">{{ selectedCard.attack_1.effect }}
                                </p>
                            </div>
                        </div>

                        <div v-if="selectedCard.attack_2">
                            <h5 class="font-bold mb-2">Attacks</h5>
                            <div class="mb-3 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <div class="flex justify-between font-semibold">
                                    <span>{{ selectedCard.attack_2.name }}</span>
                                    <span>{{ selectedCard.attack_2.power }}</span>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-300">{{ selectedCard.attack_2.effect }}
                                </p>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div v-if="selectedCard.weakness">
                                <h5 class="font-bold">Weakness</h5>

                            </div>
                            <div v-if="selectedCard.retreat">
                                <h5 class="font-bold">Retreat Cost</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </UModal>
    </UContainer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import debounce from 'lodash/debounce.js'

const config = useRuntimeConfig()
const url = config.public.apiHost
const cards = ref<ICard[]>([]);
const limit = ref(20)
const skip = ref(0)
const search = ref("")
const isLoading = ref(false)
const scrollContainer = ref<HTMLElement | null>(null)
const loadMoreTrigger = ref<HTMLElement | null>(null)

//======================================================================
// DATA & STATE
//======================================================================

interface DeckItem {
    card: ICard;
    quantity: number;
}

// Mock card data - no API call needed
// const loadMore = async () => {
//     isLoading.value = true

//     const data = await fetchCardData()

//     canLoadMore.value = data.length > 0
//     isLoading.value = false
//     cards.value.push(...data)
// }

const fetchCardData = async () => {
    const cardResponse = await useApi<ICard[]>({
        "method": "GET",
        "path": `/api/cards?limit=${limit.value}&skip=${skip.value}&q=${search.value}`
    })

    // skip.value += limit.value

    return cardResponse.data
}
const deck = ref<DeckItem[]>([]);
const isDragOver = ref(false);
const isModalOpen = ref(false);
const selectedCard = ref<ICard | null>(null);

// Watch for the modal closing and reset the selected card
watch(isModalOpen, (newValue) => {
    if (!newValue) {
        // Use a short timeout to prevent content from disappearing before the modal fade-out animation is complete
        setTimeout(() => {
            selectedCard.value = null;
        }, 200);
    }
});


const debouncedLoadSearch = debounce(async () => {
    console.log('Search term:', search.value)
    await loadSearch()
}, 500)

watch(search, () => {
    debouncedLoadSearch()
})

onBeforeUnmount(() => {
    debouncedLoadSearch.cancel()
})

//======================================================================
// COMPUTED PROPERTIES
//======================================================================

// Filter mock cards based on search query
const loadSearch = async () => {
    console.log(search)
    isLoading.value = true

    skip.value = 0
    limit.value = 20

    const data = await fetchCardData()
    isLoading.value = false

    cards.value = data
}

// Calculate total cards in the deck
const totalCount = computed(() => deck.value.reduce((sum, item) => sum + item.quantity, 0));

onMounted(async () => {
    cards.value = await fetchCardData();
    
    if (loadMoreTrigger.value) {
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting && !isLoading.value) {
                skip.value += limit.value
                isLoading.value = true
                const data = await fetchCardData()
                if (data.length > 0) {
                    cards.value.push(...data)
                }
                isLoading.value = false
            }
        }, { root: scrollContainer.value, threshold: 0.1 })
        
        observer.observe(loadMoreTrigger.value)
        
        onBeforeUnmount(() => observer.disconnect())
    }
})

//======================================================================
// METHODS
//======================================================================

// Modal Controls
const openCardModal = (card: ICard) => {
    selectedCard.value = card;
    isModalOpen.value = true;
};

// Find the index of a card in the deck array
const findCardIndexInDeck = (card: ICard): number => {
    return deck.value.findIndex(item => item.card._id === card._id);
};

const findCardNameInDeck = (card: ICard): number => {
    return deck.value.reduce((total: number, deckItem: DeckItem) => {
        console.log(deckItem.card.name , card.name)
        return total + (deckItem.card.name === card.name ? deckItem.quantity : 0);
    }, 0);
};

// Add a card to the deck
const addCard = (card: ICard) => {
    if (totalCount.value >= 20) {
        alert("Deck is full (20 cards max).");
        return;
    }

    const existingCardName = findCardNameInDeck(card)
    
    if (existingCardName >= 2) {
        alert(`Max 2 copies of ${card.name} allowed.`);
        return;
    }

    const index = findCardIndexInDeck(card);

    if (index !== -1) {
        deck.value[index].quantity++;
    } else {
        deck.value.push({ card, quantity: 1 });
    }
};

// Remove a card from the deck
const removeCard = (card: ICard) => {
    const index = findCardIndexInDeck(card);
    if (index !== -1) {
        const item = deck.value[index];
        item.quantity--;
        if (item.quantity === 0) {
            deck.value.splice(index, 1);
        }
    }
};

// Clear the entire deck
const confirmClearDeck = () => {
    if (confirm('Are you sure you want to clear the entire deck?')) {
        deck.value = [];
    }
};

//======================================================================
// DRAG & DROP HANDLERS
//======================================================================

const handleDragStart = (event: DragEvent, card: ICard) => {
    if (event.dataTransfer) {
        event.dataTransfer.setData('application/json', JSON.stringify(card));
        event.dataTransfer.effectAllowed = 'copy';
    }
};

const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragOver.value = false;
    if (event.dataTransfer) {
        try {
            const card = JSON.parse(event.dataTransfer.getData('application/json'));
            addCard(card);
        } catch (e) {
            console.error("Failed to parse dropped card data:", e);
        }
    }
};

const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    isDragOver.value = true;
};

const handleDragLeave = () => {
    isDragOver.value = false;
};
</script>

<style>
/* Style for the draggable cards */
.cursor-pointer {
    cursor: pointer;
}

.active\:cursor-grabbing:active {
    cursor: grabbing;
}
</style>
