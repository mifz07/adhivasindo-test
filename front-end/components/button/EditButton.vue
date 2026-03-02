<template>
  <div class="max-w-max min-h-[2em] p-0 m-0 bg-orange-400 rounded-md flex justify-center align-middle">
    <button type="button" class="flex justify-center items-center gap-1 text-white bg-warning box-border border border-transparent hover:bg-warning-strong shadow-xs font-medium leading-5 rounded-base text-sm focus:outline-none p-1" @click="clicked">
      <component :is="icon" class="text-white w-4 p-0" />
      <span class="text-white font-sans" v-if="text">{{ text }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  icon?: any,
  text?: string
}>()

const emit = defineEmits([
  'handle_click'
])

const clicked = () => {
  emit('handle_click')
}
</script>