<!-- Data yang diperlukan -->
<!-- 1. list data = modelValue
2. Header = headers
3. Columns = coloms
4. pagination = pagination -->
<template>
  <div class="p-4 w-full text-gray-800">
    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base scroll-auto">
        <table class="w-full text-sm text-left rtl:text-right">
            <thead class="bg-neutral-secondary-soft border-b-[1px] border-gray-100 text-gray-600">
                <tr>
                    <th scope="col" class="px-6 py-3 font-medium" v-for="header in headers" :key="header">
                        {{ header }}
                    </th>
                    
                    <th scope="col" class="px-6 py-3 font-medium" v-if="!action_header && show_action">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody class="font-sans font-thin">
                <tr v-if="total < 1" class="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default bg-gray-50">
                    <td scope="row" colspan="8" class="px-6 py-4 font-light text-heading whitespace-nowrap text-center italic">
                        Data is empty.
                    </td>
                </tr>
                <tr v-else v-for="(value, index) in modelValue" :key="value.id"
                    class="border-b border-default hover:bg-gray-100"
                    :class="index % 2 === 1 ? 'bg-gray-50' : 'bg-white'">
                    <td scope="row" class="px-6 py-4 font-light text-heading whitespace-nowrap" v-if="show_number">
                        {{ (page - 1) * perPage + (index + 1) }}.
                    </td>
                    <td class="px-6 py-4" v-for="(col, colIndex) in props.columns" :key="colIndex" :class="{'font-semibold': col === 'name', 'text-green-400': col === 'point'}">
                        <div v-if="Array.isArray(value[col])">
                          <ul class="list-disc list-inside items-center text-heading">
                            <li
                              class="mr-4"
                              v-for="(item, i) in value[col]"
                              :key="item.id ?? i"
                            >
                              <!-- ClassSubject -->
                              <template v-if="item.class_label">
                                Semester {{ item.class_label }}
                              </template>

                              <!-- Object lain setelah class_subject -->
                              <template
                                v-else-if="typeof item === 'object' && item !== null"
                              >
                                {{ item.label ?? item.name ?? JSON.stringify(item) }}
                              </template>

                              <!-- Object biasa -->
                              <template v-else-if="item.name">
                                {{ item.name }}
                              </template>

                              <!-- Primitive -->
                              <template v-else>
                                {{ item }}
                              </template>
                            </li>
                          </ul>
                        </div>

                        <div v-else-if="isObject(value[col])">
                           {{ value[col].name }}
                        </div>

                        <div v-else-if="isBoolean(value[col]) || status.includes(value[col])" class="text-white font-sans font-normal rounded-md max-w-max p-2" 
                        :class="{ 
                          'bg-green-600' : value[col] || value[col] === 'Active',  
                          'bg-red-500' : !value[col] || value[col] === 'Not Active',
                          'bg-sky-600' : value[col] === 'Waiting' 
                          }">
                            {{ value[col] === true || value[col] === 'Active' ? 'Aktif' : 
                               value[col] === 'Not Active' ? 'Tidak Aktif' : 
                               value[col] === 'Waiting' ? 'Menunggu' : 'Tidak Aktif' 
                            }}
                        </div>

                        <div v-else-if="typeof value[col] === 'string' && value[col].includes('uploads/')">
                          <NuxtImg :src="apiUrl + '/' + value[col]" alt="Image" class="w-10 h-10 object-cover rounded-md" />
                        </div>

                        <div v-else>
                            {{ checkData(value[col]) ? checkData(value[col]) : '-'}}
                        </div>
                        
                    </td>
                    <td class="px-6 py-4" v-if="show_action">
                        <div class="font-medium text-fg-brand hover:underline flex align-middle">
                            <ClientOnly>
                                <ButtonEditButton class="mr-2" @click="editClick(value)" :icon="EditIcon" v-show="props.actions.edit"/>
                                <ButtonViewButton class="mr-2" @click="viewClick(value)" :icon="EyeIcon" v-show="props.actions.view"/>
                                <ButtonDeleteButton class="mr-2" @handle_click="deleteClick(value)" :icon="TrashIcon" v-show="props.actions.delete"/>
                            </ClientOnly>
                        </div>
                    </td>
                </tr>
            </tbody> 
        </table>
        <div class="mt-4">
          <PaginationTailwindPagination v-model="pages" v-show="pagination" @change_page="changePage" />
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { TrashIcon, EyeIcon, EditIcon } from 'lucide-vue-next'

interface TableActions {
  edit?: boolean
  view?: boolean
  delete?: boolean
}

interface PaginationState {
  page: number
  perPage: number
  total: number
}

const config = useRuntimeConfig()
const apiUrl = config.public.URL_API

const props = defineProps<{
  headers?: string[]
  columns?: string[]
  action_header?: boolean
  actions: TableActions
  show_action?: boolean
  show_number?: boolean
  pagination: boolean
  perPage: number
  page: number,
  total: number
}>()

const status = ref([
  'Active', 'Not Active', 'Waiting'
])

const modelValue = defineModel<any[]>({ required: true })

const pages = ref<PaginationState>({
  page: props.page ?? 1,
  perPage: props.perPage ?? 10,
  total: props.total
})

// but filter soal aja
const checkData = (text: any) => {
  if(typeof text === 'string'){
    if(text === 'multiple_choice') return 'Pilihan Ganda'
    else if(text === 'multiple_answer') return 'Banyak Jawaban'
    else if(text === 'true_false') return 'Benar atau salah'
    else if(text === 'short_answer') return 'Jawaban Pendek'
    else if(text === 'essay') return 'essay'
    else
      return text.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase())
  }else
    return text
}

const totalPages = computed(() => {
  return Math.ceil(pages.value.total / pages.value.perPage)
})

const toLabel = (text: string) => text ? text.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase()) : ''
const toPlaceHolder = (key: string): string => {
  const string = toLabel(key)
  return `${string}`
}

watch(
  () => props.total,
  (len) => {
    pages.value.total = len
    if (pages.value.page > totalPages.value) {
      pages.value.page = totalPages.value || 1
    }
  },
  { immediate: true }
)

const paginatedData = computed(() => {
  if (!props.pagination) return modelValue.value

  const start = (pages.value.page - 1) * pages.value.perPage
  const end = start + pages.value.perPage
  return modelValue.value.slice(start, end)
})

const emit = defineEmits<{
  (e: 'handle_edit', value: any): void
  (e: 'handle_view', value: any): void
  (e: 'handle_delete', value: any): void
  (e: 'change_page', value: number): void
}>()

const viewClick = (value: any) => emit('handle_view', value)
const editClick = (value: any) => emit('handle_edit', value)
const deleteClick = (value: any) => emit('handle_delete', value)

const isObject = (val: any) => {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

const isBoolean = (val: unknown): val is boolean => {
  return typeof val === 'boolean'
}

const changePage = (page: number) => {
    emit('change_page', page)
}
</script>


