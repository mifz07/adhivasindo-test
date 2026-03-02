<template>
  <div class="max-w-max min-h-[2em] p-0 m-0 bg-red-500 rounded-md flex justify-center align-middle">
    <button type="button" class="flex justify-center items-center gap-1 text-white bg-success box-border border border-transparent shadow-xs font-medium leading-5 rounded-base text-sm focus:outline-none p-1" @click="clicked">
      <!-- <TrashIcon class="text-white w-4 p-0" /> -->
       <component :is="icon" class="text-white w-4 p-0" />
       <span class="text-white font-sans" v-if="text">{{ text }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/solid';

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