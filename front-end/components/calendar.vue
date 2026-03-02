<template>
  <div class="bg-[#575175] text-white rounded-2xl p-4
            w-full
            sm:max-w-md
            mx-auto
            shadow-lg
            overflow-x-hidden">
    
    <div class="flex items-center justify-between mb-6">
      <button class="text-xl">‹</button>
      <h2 class="font-semibold text-sm">{{ currentMonth }}</h2>
      <button class="text-xl">›</button>
    </div>

    <div class="flex justify-between gap-2">
      <div
        v-for="day in days"
        :key="day.date"
        @click="selectDate(day.date)"
        class="flex flex-col items-center justify-center w-8 h-12 rounded-xl cursor-pointer transition font-sans font-light bg-white text-[#575175]"
      >
        <span class="text-sm opacity-80">{{ day.label }}</span>
        <span 
          class="text-sm font-semibold border-[1px] rounded-lg px-2" 
          :class="selectedDate === day.date ? 
          'bg-[#575175] text-white' : 
          'bg-white hover:bg-white/20'">
          {{ day.date }}
        </span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentMonth = ref('April 2025')

const days = ref([
  { label: 'Su', date: 1 },
  { label: 'Mo', date: 2 },
  { label: 'Tu', date: 3 },
  { label: 'We', date: 4 },
  { label: 'Th', date: 5 },
  { label: 'Fr', date: 6 },
  { label: 'Sa', date: 7 },
])

const selectedDate = ref(4)

const selectDate = (date: number) => {
  selectedDate.value = date
}
</script>