<script setup lang="ts">

const props = defineProps({
    do: Boolean,
});
</script>

<template>
    <div class="relative">
        <twemoji-thumbs-up v-if="props.do" class="absolute top-1/2 -translate-y-1/2 translate-x-[-120%] left-0 z-index-10 transform text-2xl"/>
        <twemoji-person-gesturing-no v-if="!props.do" class="absolute top-1/2 -translate-y-1/2 translate-x-[-120%] left-0 z-index-10 transform text-2xl"/>
        <slot></slot>
    </div>
</template>