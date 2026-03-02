<template>
  <div class="max-h-[calc(100vh-91px)] scrollbar-hide w-full overflow-y-auto p-4">
    <div class="w-full h-full flex flex-col gap-3">
      <div class="flex justify-between">
        <h3 class="text-2xl font-bold text-black">MODUL</h3>
        <NuxtLink to="/modul/tambah-modul">
          <ButtonAddButton :icon="PlusCircleIcon" :text="'Tambah Modul'"></ButtonAddButton>
        </NuxtLink>
        
      </div>
      
      <div class="py-6 bg-white p-2">
        <div class="w-1/2">
          <FormInputField
            :placeholder="'Search docs'"
            :icon="MagnifyingGlassIcon"
            v-model:model-value="keyword"
            class="w-[30vw]"
            @input="getSearch"
          ></FormInputField>
        </div>
        <TableSimpleTable
        :headers="header"
        :columns="column"
        :model-value="list_data"
        :pagination="true"
        :page="page"
        :per-page="perPage"
        :total="total"
        :actions="actions"
        :show_action=true
        :show_number=true
        @change_page="changePage"
        @handle_view="view"
        @handle_edit="edit"
        @handle_delete="delete_modul"
        class="p-4 bg-white rounded-lg"
        ></TableSimpleTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/vue/24/solid'
import Swal from 'sweetalert2'


const { $fetchAuth } = useNuxtApp()

const header = ref([
  'No.', 'Title', 'Body', 'Image'
])

const column = ref(['title', 'body', 'image'])

const actions = ref({
  view: true, edit: true, delete: true
})

const list_data = ref()
const page = ref(1)
const perPage = ref(3)
const total = ref(0)
const keyword = ref('')

const changePage = async (nextPage: number) => {
  page.value = nextPage
  await getData()
}

const edit = (data: any) => {
  navigateTo(`/modul/edit/${data.id}`)
}

const view = (data: any) => {
  navigateTo(`/modul/view/${data.id}`)
}

let timeout: ReturnType<typeof setTimeout>;

const getSearch = async (data: any) => {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    await getData()
  }, 500); 
};

const delete_modul = async (data: any) => {
  Swal.fire({
    title: "Apakah Anda yakin?",
    text: "Data yang sudah dihapus tidak bisa dikembalikan",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya!"
  }).then(async(result) => {
    if (result.isConfirmed) {
      try{
        let result = await $fetchAuth(`/api/modul/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: data.id})
        });
        
        if(result.data.status){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: result.data.message
          })
          await getData()
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: result.data.message
          })
        }

      }catch (error) {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Server dalam perbaikan'
        })
      }
    }
  });
}

const getData = async () => {
  try{
    const result = await $fetchAuth(`/api/modul/list-module`, {
      method: 'POST',
      header: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify({
        keyword: keyword.value,
        page: page.value,
        perpage: perPage.value
      })
    })

    list_data.value = result.data.data.data
    total.value = result.data.data.total
  }catch(error){
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: 'Server dalam perbaikan'
    })
  }
}

onMounted(async() => {
  await getData()
})

</script>

<style>

</style>