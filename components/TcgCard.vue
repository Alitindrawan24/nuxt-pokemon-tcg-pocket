<!-- <template>
    <div class="flex items-center justify-center cursor-pointer perspective-[1000px]">
        <NuxtImg class="transition-transform duration-500 transform-style-preserve-3d hover:rotate-x-15 hover:rotate-y-15 hover:translate-z-20" :src="props.src" :alt="props.alt" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    }
});

</script>

<style></style> -->

<template>
    <div class="flex flex-col [perspective:800px]">
        <div @mouseleave="boundingRect = null" @mouseenter="setBoundingRect" @mousemove="handleMouseMove" ref="cardEl"
            class="cursor-pointer group relative transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]">
            <NuxtImg class="" :src="props.src" :alt="props.alt" />
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    }
});

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