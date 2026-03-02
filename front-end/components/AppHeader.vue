<template>
  <div class="w-full flex justify-between items-center bg-[#fcfcfe] xl:h-[91px] lg:h-[81px] md:h-[80px] sm:h-[80px] border-b-gray-300 text-[#575175] px-4 gap-4">
    <div class="flex-none xl:w-[15%] lg:w-[15%] md:w-[25%]">
      <div class="flex justify-center text-3xl font-semibold">
        <img src="/assets/images/logo/Adhivasindo.png" alt="" class="xl:h-[70px] lg:h-[70px] md:h-[60px]">
      </div>
    </div>
    <div class="xl:text-2xl lg:text-lg md:text-lg sm:text-sm">
      LEARNING MANAGEMENT SYSTEM
    </div>
    <div class="">
      <FormInputField
        :placeholder="'Search docs'"
        :icon="MagnifyingGlassIcon"
        class="w-[30vw]"
      ></FormInputField>
    </div>
    <!-- PROFILE -->
    <div class="w-[20%] flex-auto align-middle justify-end">
      <div class="w-full flex justify-end pr-4">
        <div class="flex gap-4">
          <BellAlertIcon class="w-8 h-8 text-[#565656] border-[#565656]" />
          <div class="">
              <EnvelopeIcon class="w-8 h-8 text-[#565656] border-[#565656]" />
              <div class="absolute inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-red-500 bg-red-500 border-2 rounded-full top-7 end-7"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import Swal from 'sweetalert2'
import { EnvelopeIcon, BellAlertIcon } from '@heroicons/vue/24/outline'

const notifTrigger = useState('notif-trigger')


const { $fetchAuth } = useNuxtApp()
const { $toast } = useNuxtApp()

const list_notif = ref([])
const total_notif = ref(0)

function handleMenu(menu) {
  if (menu === "logout") {
    logout()
  }
  if (menu === "profile") console.log("Go to profile")
  if (menu === "settings") console.log("Go to settings")
} 


const logout = async() => {
    const response = await $fetchAuth(`/api/auth/logout`, {
        method: 'POST',
        headers: {  
            'content-type' : 'application/json'
        }
    })
    
    let data = response.data
    if(data.status == true)
      navigateTo('/login', { external: true })
    else{
      $toast.error('cannot logout', {timeout: 2000})
    }
}

</script>
