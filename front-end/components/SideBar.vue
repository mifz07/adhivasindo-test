<template>
  <aside
    class="bg-[#302a4e] transition-all duration-300 xl:min-h-[calc(100vh-91px)] lg:min-h-[calc(100vh-81px)] md:min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-80px)] text-white rounded-tr-3xl"
    :class="isCollapsed ? 'w-16' : 'w-[15%]'"
  >
    <!-- Burger Button -->
    <div class="flex" :class="{'p-4 justify-end' : !isCollapsed, 'p-4 justify-center' : isCollapsed}">
      <button @click="toggleSidebar">
        <Bars3Icon class="w-6 h-6 text-white" v-if="isCollapsed"/>
        <XMarkIcon class="w-6 h-6 text-white" v-if="!isCollapsed"/>
      </button>
    </div>

    <!-- Menu -->
    <div class="flex flex-col gap-1 p-3" :class="{'p-6' : !isCollapsed}">
      <MenuButton
        label="Dashboard"
        :icon="Squares2X2Icon"
        to="/"
        :menu="'dashboard'"
        :activeMenu="activeMenu"
        :collapsed="isCollapsed"
        @click="handleClick('dashboard')"
      />
      
      <MenuButton
        label="Modul"
        :icon="BriefcaseIcon"
        to="/modul"
        :menu="'modul'"
        :activeMenu="activeMenu"
        :collapsed="isCollapsed"
        @click="handleClick('modul')"
      />
      
      <MenuButton
        label="Peserta"
        :icon="UserGroupIcon"
        to="/peserta"
        :menu="'peserta'"
        :activeMenu="activeMenu"
        :collapsed="isCollapsed"
        @click="handleClick('peserta')"
      />
      
      <MenuButton
        label="Group Chat"
        :icon="ChatBubbleLeftRightIcon"
        to="/group-chat"
        :menu="'group-chat'"
        :activeMenu="activeMenu"
        :collapsed="isCollapsed"
        @click="handleClick('group-chat')"
      />
      
      <MenuButton
        label="Pemateri"
        :icon="UserIcon"
        to="/pemateri"
        :menu="'pemateri'"
        :activeMenu="activeMenu"
        :collapsed="isCollapsed"
        @click="handleClick('pemateri')"
      />
      
      <div class="w-full border-[1px] border-[#575175] rounded-full my-2"></div>

      <div class="my-3" v-if="!isCollapsed">
        <h1 class="text-light font-sans text-white">Profile</h1>
      </div>

      <MenuButton
        label="Settings"
        :icon="Cog6ToothIcon"
        to="/settings"
        :menu="'settings'"
        :activeMenu="activeMenu"
        :collapsed="isCollapsed"
        @click="handleClick('settings')"
        :class="{'text-white' : activeMenu !== 'settings', 'text-[#575175]' : activeMenu === 'settings'}"
      />
      
      <MenuButton
        label="Kalender"
        :icon="CalendarDaysIcon"
        to="/kalender"
        :menu="'kalender'"
        :activeMenu="activeMenu"
        :collapsed="isCollapsed"
        @click="handleClick('kalender')"
        :class="{'text-white' : activeMenu !== 'kalender', 'text-[#575175]' : activeMenu === 'kalender'}"
      />

      <div class="w-full border-[1px] border-[#575175] rounded-full my-2"></div>

      <MenuButton
        label="Logout"
        :icon="PowerIcon"
        to="#"
        :menu="'logout'"
        :activeMenu="activeMenu"
        :collapsed="isCollapsed"
        @click="logout"
        :class="{'text-white' : activeMenu !== 'logout', 'text-[#575175]' : activeMenu === 'logout'}"
      />
      
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { HomeIcon, UserGroupIcon, UserIcon, Bars3Icon, XMarkIcon, AcademicCapIcon, BookOpenIcon, PencilSquareIcon, ClipboardDocumentCheckIcon, BriefcaseIcon, RectangleGroupIcon, ClipboardDocumentListIcon, NumberedListIcon, BookmarkSquareIcon, CalendarDaysIcon, TicketIcon, VariableIcon, Squares2X2Icon, ChatBubbleLeftRightIcon, Cog6ToothIcon, PowerIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
const { $fetchAuth } = useNuxtApp()

const activeMenu = ref('dashboard')
const isCollapsed = ref(false)
const userType = useCookie('user_type')
// const authStore.isAdmin = computed(() => (authStore.role || '').toLowerCase() === 'admin')

const route = useRoute()

onMounted(() => {
  activeMenu.value = route.name
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleClick = (menu) => {
  activeMenu.value = menu
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
