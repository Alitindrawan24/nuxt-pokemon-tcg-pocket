<template>
    <div class="w-full lg:w-3/4 mx-auto px-0 md:px-2">
        <ClientOnly>
            <UTable :loading="isLoading" v-model:column-visibility="columnVisibility" loading-color="secondary"
                loading-animation="carousel" :data="sets" :columns="columns" @select="onSelect" />
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import type { TableColumn, TableRow } from '@nuxt/ui/.'

const sets = ref<ISet[]>([]);
const config = useRuntimeConfig()
const url = config.public.apiHost
const isLoading = ref(true)
const router = useRouter()

const columnVisibility = ref({
    image: true,
    code: false,
})

const columns: TableColumn<ISet>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const raw = row.getValue('image') as string | string[] | undefined
            let src = Array.isArray(raw) ? raw[0] : raw || ''
            if (src && !/^https?:/i.test(src)) {
                src = url + src
            }
            if (!src) {
                src = 'https://placehold.co/64x64/EFEFEF/333333?text=No+Image'
            }
            const name = row.getValue('name') + ` (${row.getValue('code')})`

            return h('span', { class: 'inline-flex items-center gap-2' }, [
                h('img', {
                    src, class: 'img w-12 sm:w-16', 
                    crossorigin: 'anonymous',
                    referrerpolicy: 'no-referrer'
                }),
                h('span', { class: 'whitespace-normal' }, name)
            ])
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
    const setResponse = await useApi<ISet[]>({
        "method": "GET",
        "path": "/api/sets"
    })

    isLoading.value = false
    return setResponse.data
}

onMounted(async () => {
    sets.value = await fetchData();
})

function onSelect(row: TableRow<ISet>) {
    const code = row.getValue('code')
    router.push(`sets/${code}`)
}
</script>

<style></style>
