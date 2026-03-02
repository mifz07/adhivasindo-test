<template>
  <div class="w-full h-screen flex justify-center items-center bg-gray-50">
    <div class="mr-6">
      <NuxtImg src="/logo/Adhivasindo.png" alt="" class="w-[15vw] mb-5" />
    </div>
    <div class="border-r border-gray-300 h-1/2 "></div>
    <div class="w-[30%] shadow-lg rounded-lg bg-white ml-6">

       <!-- FORM -->
        <div class="w-full flex justify-center items-center p-4">
          <div class="block">
            <div class="font-bold text-sky-600 text-3xl text-center mb-8">
              Register
            </div>
            <div class="w-[20vw] mt-4">
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <UserIcon class="text-gray-300 w-[16px] h-[16px]"/>
                </div>
                <input v-model="register.full_name" type="text" id="full_name" 
                class="w-full h-10 px-5 pl-10 rounded-lg text-sm text-gray-800 border-[1px] border-gray-100 focus:outline-none focus:bg-gray-100 focus:border-yellow-100" placeholder="Your Full Name"
                >
              </div>
              <div class="relative mt-4">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <EnvelopeIcon class="text-gray-300 w-[16px] h-[16px]"/>
                </div>
                <input v-model="register.email" type="text" id="email" 
                class="w-full h-10 px-5 pl-10 rounded-lg text-sm text-gray-800 border-[1px] border-gray-100 focus:outline-none focus:bg-gray-100 focus:border-yellow-100" placeholder="your@mail.com"
                >
              </div>
              <div class="relative mt-4">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <VariableIcon class="text-gray-300 w-[16px] h-[16px]"/>
                </div>
                <select v-model="register.gender" type="text" id="email" 
                class="w-full h-10 px-5 pl-10 rounded-lg text-sm text-gray-800 border-[1px] border-gray-100 focus:outline-none focus:bg-gray-100 focus:border-yellow-100" placeholder="Gender"
                >
                  <option class="text-gray-600" value="" disabled>Select Gender</option>
                  <option class="text-gray-600" value="male">Male</option>
                  <option class="text-gray-600" value="female">Female</option>
                </select>
              </div>
              <div class="relative mt-4">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <PhoneIcon class="text-gray-300 w-[16px] h-[16px]"/>
                </div>
                <input v-model="register.phone_number" type="text" id="phone" 
                class="w-full h-10 px-5 pl-10 rounded-lg text-sm text-gray-800 border-[1px] border-gray-100 focus:outline-none focus:bg-gray-100 focus:border-yellow-100" placeholder="08xxxx"
                @input="register.phone_number = register.phone_number.replace(/[^0-9]/g, '')"
                >
              </div>
            </div>
            <div class="w-[20vw] mt-4">
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <KeyIcon class="text-gray-300 w-[16px] h-[16px]"/>
                </div>
                <input v-model="register.password" :type="show_password ? 'text' : 'password'" id="password" 
                class="w-full h-10 px-5 pl-10 rounded-lg text-sm text-gray-800 border-[1px] border-gray-100 focus:outline-none focus:bg-gray-100 focus:border-yellow-100" placeholder="password"
                >
                <div class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-300 hover:text-sky-700 hover:cursor-pointer" @click="showPassword">
                  <EyeIcon class="w-[16px] h-[16px]" v-if="!show_password"/>
                  <EyeSlashIcon class="w-[16px] h-[16px]" v-if="show_password"/>
                </div>
              </div>
            </div>

            <div class="text text-red-400 italic mt-3 font-thin text-[10px]" v-if="err">
              {{ errMessage }}
            </div>

            <ClientOnly>
            <div class="mt-5">
              <button @click="handleRegister" class="text-black bg-sky-400 box-border border border-transparent rounded-lg hover:bg-sky-500 shadow-xs font-medium leading-5 text-sm focus:outline-none w-full">
                <div class="flex gap-2 justify-center items-center text-white p-2" v-if="loading">
                    <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24">
                    <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
                    </path>
                  </svg>
                </div>
                <div class="text-white p-2">
                  Daftar
                </div>
              </button>
              
            </div>
            </ClientOnly>

            <div class="mt-5">
              <hr class="w-48 h-1 mx-auto my-4 bg-gray-200 border-0 rounded-sm md:my-6"></hr>
            </div> 
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EnvelopeIcon, EyeSlashIcon, PhoneIcon, UserIcon, VariableIcon } from '@heroicons/vue/24/solid'
import { EyeIcon, KeyIcon } from 'lucide-vue-next'
import Swal from 'sweetalert2'

definePageMeta({
  layout: false
})

const { $fetchAuth } = useNuxtApp()

const err = ref(false)
const errMessage = ref('')
const error = ref({
  email: false,
})

const register = ref({
  full_name: '',
  email: '',
  phone_number: '',
  gender: '',
  password: ''
})

const loading = ref(false)

const show_password = ref(false)

const showPassword = () => {
  show_password.value = !show_password.value
}

interface Register {
  full_name: number | null,
  email: string,
  phone_number: number,
  gender: any,
  password: string,
}

const handleRegister = async () => {
  Object.keys(register.value).some(key => {
    if(register.value[key as keyof Register] === ''){
      let message = key.replace(/_/g, ' ')
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: `Pleas fill the ${message} form`
      })
      return true
    }
    return false
  })

  const result = await $fetchAuth(`/api/auth/register`, {
    method: 'POST',
    header: {
      'Content-type': 'Application/json'
    },
    body: JSON.stringify({
      ...register.value,
      role: 'user'
    })
  })
  
  if(!result.status){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: result.message?.[0]?.replace(/_/g, ' ') ?? 'An error occurred'
    })
  }else{
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Register successfull'
    })
    navigateTo('/login')
  }
  
}

</script>

<style>

</style>