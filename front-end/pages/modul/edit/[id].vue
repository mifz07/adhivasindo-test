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
          type="text" label="Judul" placeholder="Masukan Judul" :required="true" :error="err.title"
          v-model:model-value="content.title"
          class="w-full"
        ></FormInputField>
        <FormInputField
          type="textarea" label="Isi" placeholder="Masukan Isi Module" :required="true" :error="err.body"
          v-model:model-value="content.body"
          class="w-full"
        ></FormInputField>

        <UploadImage @update_image="getImage" :file="file" text_file="JPG, PNG, JPEG MAX 2MB"></UploadImage>

        <div class="flex gap-3">
          <ButtonAddButton :icon="PlusCircleIcon" text="Save" @handle_click="save"></ButtonAddButton>
          <NuxtLink to="/modul">
            <ButtonEditButton :icon="XCircleIcon" text="Cancel"></ButtonEditButton>
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

const err = ref({
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

const getImage = (data: any) => {
  file.value = data
}

const save = async () => {
  let error = false
  let message = ''
  if(!content.value.title){
    message = 'Please fill title form'
    error = true
  }

  if(!content.value.body && error === false){
    message = 'Please fill the body form'
    error = true
  }

  if(error){
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: message
    })
    return
  }

  if(file.value && !(file.value instanceof File)){
    file.value = detail.value.image
  }

  const formdata = new FormData()
  formdata.append('title', content.value.title)
  formdata.append('body', content.value.body)
  formdata.append('image', file.value)

  const result = await $fetchAuth(`/api/modul/update-module/${detail.value.id}`, {
    method: 'POST',
    body: formdata
  })

  if(result.status){
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: result.data.message
    })
    navigateTo('/modul')
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: result.data.message
    })
  }
}
</script>

<style>

</style>