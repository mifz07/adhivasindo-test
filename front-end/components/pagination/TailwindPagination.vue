<template>
  <nav
    class="flex items-center justify-center gap-1 mt-6 select-none text-gray-700"
    aria-label="Pagination"
  >
    <!-- Prev -->
    <button
      @click="changePage(page - 1)"
      :disabled="page === 1"
      class="px-3 py-2 rounded-md text-sm font-medium
             border border-gray-300
             hover:bg-gray-100
             disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ChevronDoubleLeftIcon class="w-4 h-4 mr-1 inline-block" />
      Prev
    </button>

    <!-- Pages -->
    <button
      v-for="p in pages"
      :key="p"
      @click="changePage(p)"
      class="px-3 py-2 rounded-md text-sm font-medium border transition"
      :class="p === page
        ? 'bg-blue-600 text-white border-blue-600'
        : 'border-gray-300 hover:bg-gray-100'"
    >
      {{ p }}
    </button>

    <!-- Next -->
    <button
      @click="changePage(page + 1)"
      :disabled="page === totalPages"
      class="px-3 py-2 rounded-md text-sm font-medium
             border border-gray-300
             hover:bg-gray-100
             disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
      <ChevronDoubleRightIcon class="w-4 h-4 ml-1 inline-block" />
    </button>
  </nav>
</template>


<script setup lang="ts">
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/vue/24/solid'

interface PaginationModel {
  page: number
  perPage: number
  total: number
}

const model = defineModel<PaginationModel>({
  required: true
})

const emit = defineEmits(['change_page'])

const page = computed({
  get: () => model.value.page,
  set: (val) => (model.value.page = val)
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(model.value.total / model.value.perPage))
})

const pages = computed(() => {
  const delta = 2
  const range: number[] = []

  const start = Math.max(1, page.value - delta)
  const end = Math.min(totalPages.value, page.value + delta)

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return range
})

const changePage = (p: number) => {
  if (p < 1 || p > totalPages.value) return
  page.value = p
  emit('change_page', p)
}
</script>

