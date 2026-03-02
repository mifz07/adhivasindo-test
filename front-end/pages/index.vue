<template>
  <div class="max-h-[calc(100vh-91px)] scrollbar-hide w-full overflow-y-auto p-4">
    <div class="w-full p-4 flex bg-gradient-to-b from-violet-400 to-violet-700 rounded-lg">
      <div class="w-[60%]">
        <div class="my-5">
          <h3 class="text-xl font-bold text-[#deca97]">PEMOGRAMAN</h3>
          <p class="text-gray-200 mt-5 text-5xl font-sans leading-[3.5rem]">
            Pemograman Frontend Modern dengan React dan Angular
          </p>
          <p class="mt-3 leading-6 font-sans font-light text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolorem aliquam rerum deleniti vero voluptates iure hic. Error, reiciendis, velit sit eligendi inventore odit quidem enim pariatur vitae illum itaque. 
          </p>
        </div>
        
        <div class="flex justify-between my-10">
          <div class="flex items-center gap-3">
            <UserIcon class="w-5 h-5 text-white" />
            <div class="text-white font-mono text-light text-xl">
              Pemateri by Josep
            </div>
          </div>
          <div class="flex items-center gap-3">
            <CalendarDateRangeIcon class="w-5 h-5 text-white" />
            <div class="text-white font-mono text-light text-xl">
              14-06-2025
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-[40%] justify-center items-end text-white my-10">
        <div class="bg-white justify-center items-center text-black rounded-lg p-6 cursor-pointer hover:bg-orange-600 hover:text-white transition-all">
          Mulai Learning
        </div>
      </div>
    </div>

    <div class="my-8 p-4">
      <h3 class="text-2xl font-bold text-black">MODUL KOMPETENSI</h3>
      <div class="flex gap-4 mt-4">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>

    <div class="my-8 p-4">
      <h3 class="text-2xl font-bold text-black">NILAI KOMPETENSI</h3>
      <div class="flex mt-4">
        <TableSimpleTable
        :headers="header"
        :columns="column"
        :model-value="list_data"
        :pagination="true"
        :page="page"
        :per-page="perPage"
        :total="total"
        :actions="actions"
        :show_action=false
        @change_page="changePage"
        class="p-4 bg-white rounded-lg"
        ></TableSimpleTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CalendarDateRangeIcon, UserIcon } from '@heroicons/vue/24/outline';
import Card from '~/components/card.vue';

const header = ref([
  'Rank', 'Name', 'Class', 'Modul', 'Point'
])

const column = ref([
  'rank', 'name', 'class', 'modul', 'point'
])

const page = ref(1)
const perPage = ref(10)
const total = ref(10)

const actions = ref({
  edit: false, view: false, delete: false
})

const list_data = ref([
  {
    rank: 1,
    name: 'Pariza faiza',
    class: 'PEMOGRAMAN',
    modul: 'L1',
    point: '1,234'
  },
  {
    rank: 2,
    name: 'Pariza faiza',
    class: 'PEMOGRAMAN',
    modul: 'L1',
    point: '1,234'
  },
  {
    rank: 3,
    name: 'Pariza faiza',
    class: 'PEMOGRAMAN',
    modul: 'L1',
    point: '1,234'
  }
])

const changePage = (nextPage: number) => {

}
</script>

<style>

</style>