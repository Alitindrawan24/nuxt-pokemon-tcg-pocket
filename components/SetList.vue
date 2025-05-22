<template>
    <div class="w-full">
        <UTable 
            :loading="isLoading" 
            loading-color="secondary" 
            loading-animation="carousel" 
            :data="sets"
            :columns="columns" 
            @select="onSelect" 

        />
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

const columns: TableColumn<Set>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const image = url + row.getValue("image");

            return h('span', { class: 'inline-flex items-center gap-2' }, [h('img', { src: image, class: '' }), h('span', row.getValue("name")), h('span', { class: 'text-xs opacity-75' }, row.getValue("code"))]);
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
                month: 'long',
                year: 'numeric'
            })
        }
    },
    {
        accessorKey: 'count',
        header: 'Cards'
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