<script setup lang="ts">
import { Cog6ToothIcon } from '@heroicons/vue/24/solid';
import AppHeader from '~/components/AppHeader.vue';

</script>

<template>
  <div class="text-black min-h-screen bg-[#F7F7F7] hidden sm:block">
    <AppHeader></AppHeader>
    <!-- Content -->
    <div class="flex w-full gap-2">
      <!-- Sidebar -->
      <SideBar />

      <!-- Main content -->
      <main class="flex flex-col flex-1">
        <NuxtPage />
      </main>
    </div>
  </div>

  <div class="text-black min-h-screen bg-[#F7F7F7] block sm:hidden">
    <div class="flex flex-col justify-center items-center p-4">
      <div class="">
        <NuxtImg src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="rounded-full w-40 h-40 object-cover"></NuxtImg>
        <div class="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold  rounded-full top-7 end-28">
          <Cog6ToothIcon class=""></Cog6ToothIcon>
        </div>
      </div>

      <div class="text-2xl font-semibold font-san mt-5">
        Selamat Datang Juliana
      </div>
      <div class="text-sm text-gray-600 font-semibold font-san mt-2">
        Di LMS by Adhivasindo
      </div>

      <div class="mt-4">
        <Calendar></Calendar>
      </div>
    </div>

    <div class="flex flex-col justify-start items-start p-4">
      <div class="text-lg font-semibold font-san mt-5">
        Jadwal Pemateri
      </div>

      <div class="flex justify-between items-center w-full mt-5 gap-3 p-4">
        <div class="flex gap-3">
          <div class="w-10 h-10 rounded-md bg-violet-500"></div>
          <div class="block">
            <p class="text-sm font-semibold font-sans">Storytelling dalam pemasaran</p>
            <p class="text-sm font-light text-gray-600 font-sans">09:00 - 11:00 with Mr. John</p>
          </div>
        </div>
        <div class="text-3xl font-sans text-gray-500">
          >
        </div>
      </div>
      <div class="flex justify-between items-center w-full gap-3 p-4">
        <div class="flex gap-3">
          <div class="w-10 h-10 rounded-md bg-[#ff9889]"></div>
          <div class="block">
            <p class="text-sm font-semibold font-sans">Storytelling dalam pemasaran</p>
            <p class="text-sm font-light text-gray-600 font-sans">12:00 - 14:00 with Mr. Eman</p>
          </div>
        </div>
        <div class="text-3xl font-sans text-gray-500">
          >
        </div>
      </div>
      <div class="flex justify-between items-center w-full gap-3 p-4">
        <div class="flex gap-3">
          <div class="w-10 h-10 rounded-md bg-[#ffdf85]"></div>
          <div class="block">
            <p class="text-sm font-semibold font-sans">Pengembangan API</p>
            <p class="text-sm font-light text-gray-600 font-sans">14:30 - 15:30 with Mr. Mandja</p>
          </div>
        </div>
        <div class="text-3xl font-sans text-gray-500">
          >
        </div>
      </div>

      <div class="rounded-lg w-full p-4">
        <NuxtImg src="https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="w-full h-auto object-cover rounded-lg"></NuxtImg>
        <div class="rounded-full w-full h-1/3 bg-gray-500 mt-2"></div>
      </div>
    </div>
  </div>
</template>