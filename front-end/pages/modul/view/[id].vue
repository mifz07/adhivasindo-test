<template>
  <div class="max-h-[calc(100vh-91px)] scrollbar-hide w-full overflow-y-auto p-4">
    <div class="w-full flex flex-col mb-5">
      <div class="flex items-center gap-4">
        <NuxtLink to="/modul">
          <ArrowLeft class="w-6 h-6"></ArrowLeft>
        </NuxtLink>
        <h3 class="text-2xl font-bold text-black">TAMBAH MODUL</h3>
      </div>
    </div>
    
    <div class="bg-white rounded-md w-full">
      <div class="w-1/2 flex flex-col p-4 gap-3">
        <FormInputField
          type="text" label="Judul" placeholder="Masukan Judul" :required="true"
          v-model:model-value="content.title" :disabled="true"
          class="w-full"
        ></FormInputField>
        <FormInputField
          type="textarea" label="Isi" placeholder="Masukan Isi Module" :required="true" 
          v-model:model-value="content.body"
          class="w-full"
          :disabled="true"
        ></FormInputField>

        <NuxtImg :src="file" class="w-[50vh] h-[50vh]"></NuxtImg>

        <div class="flex gap-3">
          <NuxtLink to="/modul">
            <ButtonEditButton :icon="XCircleIcon" text="Back"></ButtonEditButton>
          </NuxtLink>
        </div>
        
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { PlusCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid';
import { ArrowLeft } from 'lucide-vue-next';
import Swal from 'sweetalert2';

const { $fetchAuth } = useNuxtApp()
const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.URL_API

const content = ref({
  title: '',
  body: ''
})

const detail = ref()

const file = ref<any>()

const getDetail = async () => {
  const id = route.params.id as string;
  
  const result = await $fetchAuth(`/api/modul/get-detail`, {
    method: 'POST',
    header: {
      'Content-type': 'Application/json'
    },
    body: JSON.stringify({id: id})
  })

  if(!result.status){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: result.message
    })
    return
  }
  let data = result.data.data
  detail.value  = data
  content.value.title = data.title
  content.value.body = data.body
  file.value = data.image ? baseUrl + '/' + data.image : ''
}

onMounted(async () => {
  await getDetail()
})

</script>

<style>

</style>