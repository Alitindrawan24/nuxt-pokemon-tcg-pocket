<template>
    <div class="flex flex-col [perspective:800px]">
        <div ref="cardEl"
            class="cursor-pointer group relative transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]"
            @mouseleave="boundingRect = null" @mouseenter="setBoundingRect" @mousemove="handleMouseMove">
            <NuxtLink :to="link">
                <NuxtImg :src="url + props.card.image" :alt="props.card.name" placeholder />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    card: ICard
    isLinkable?: boolean
}>(), {
    isLinkable: true
})

const config = useRuntimeConfig()
const url = config.public.apiHost
const link = props.isLinkable ? `${props.card.set}/${props.card.number}` : undefined
const cardEl = ref<HTMLElement | null>(null)
const boundingRect = ref<DOMRect | null>(null)

const setBoundingRect = () => {
    if (!cardEl.value) return
    boundingRect.value = cardEl.value.getBoundingClientRect()
}

const handleMouseMove = (event: MouseEvent) => {
    if (!boundingRect.value || !cardEl.value) return

    const x = event.clientX - boundingRect.value.left
    const y = event.clientY - boundingRect.value.top
    const xPercentage = x / boundingRect.value.width
    const yPercentage = y / boundingRect.value.height
    const xRotation = (xPercentage - 0.5) * 20
    const yRotation = (0.5 - yPercentage) * 20

    cardEl.value.style.setProperty('--x-rotation', `${yRotation}deg`)
    cardEl.value.style.setProperty('--y-rotation', `${xRotation}deg`)
    cardEl.value.style.setProperty('--x', `${xPercentage * 100}%`)
    cardEl.value.style.setProperty('--y', `${yPercentage * 100}%`)
}
</script>