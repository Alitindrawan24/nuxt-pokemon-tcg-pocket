<template>
    <div class="w-full lg:w-3/4 mx-auto px-0 md:px-2">
        <UTable :loading="isLoading" v-model:column-visibility="columnVisibility" loading-color="secondary"
            loading-animation="carousel" :data="sets" :columns="columns" @select="onSelect" />
    </div>
</template>

<script lang="ts" setup>
import type { TableColumn, TableRow } from '@nuxt/ui/.'

interface Set {
    _id: string
    code: string
    name: string
    image: string
    date: string
    count: number
}

const sets = ref<Set[]>([]);
const config = useRuntimeConfig()
const url = config.public.apiHost
const isLoading = ref(true)
const router = useRouter()

const columnVisibility = ref({
    image: false,
    code: false,
})

const columns: TableColumn<Set>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const image = url + row.getValue("image");
            const name = row.getValue("name") + ` (${row.getValue("code")})`;

            return h('span', { class: 'inline-flex items-center gap-2' }, [h('img', { src: image, class: 'img w-12 sm:w-16' }), h('span', { class: 'whitespace-normal' }, name)]);
        }
    },
    {
        accessorKey: 'date',
        header: 'Release Date',
        cell: ({ row }) => {
            const date = new Date(row.getValue('date'));

            if (isNaN(date.getTime())) {
                return "";
            }

            return date.toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
        }
    },
    {
        accessorKey: 'count',
        header: 'Cards',
        cell: ({ row }) => {
            return h('p', { class: 'text-right' }, row.getValue("count"));
        }
    },
    {
        accessorKey: 'image',
        header: '',
        cell: () => { return "" }
    },
    {
        accessorKey: 'code',
        header: '',
        cell: () => { return "" }
    },
]

const fetchData = async () => {
    const setResponse = await useApi<Set[]>({
        "method": "GET",
        "path": "/api/sets"
    })

    isLoading.value = false
    return setResponse.data
}

onMounted(async () => {
    sets.value = await fetchData();
})

function onSelect(row: TableRow<Set>) {
    const code = row.getValue('code')
    router.push(`/${code}`)
}
</script>

<style></style>