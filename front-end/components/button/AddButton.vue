<template>
  <div class="max-w-max min-h-[2em] p-0 m-0 bg-green-500 rounded-md flex justify-center align-middle">
    <button type="button" class="flex gap-1 justify-center items-center text-white bg-success box-border border border-transparent shadow-xs font-medium leading-5 rounded-base text-sm focus:outline-none p-1" @click="clicked">
      <!-- <PlusCircle class="text-white w-4 p-0" /> -->
      <component :is="icon" class="text-white w-4 p-0" /> 
      <span class="text-white font-sans" v-if="text">{{ text }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { PlusCircle } from 'lucide-vue-next';

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