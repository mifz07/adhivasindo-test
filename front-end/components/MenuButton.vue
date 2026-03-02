<template>
  <NuxtLink
    :to="to"
    class="flex items-center rounded-xl transition-all w-full font-medium
           text-[#575175] hover:bg-[#dedaf1] hover:text-[#302a4e]"
    :class="[
      collapsed ? 'justify-center px-2 py-3' : 'gap-2 px-4 py-4',
      activeMenu === menu
        ? 'bg-white text-[#575175] shadow-sm'
        : 'text-[#575175] hover:bg-sky-50 hover:text-[#575175]'
    ]"
    :title="collapsed ? label : ''"
  >
    <component
      :is="icon"
      class="lg:w-5 lg:h-5 md:w-5 md:h-5"
    />

    <!-- Hide label when collapsed -->
    <span v-if="!collapsed" class="font-sans xl:text-[14px] lg:text-[14px] md:text-[10px]">{{ label }}</span>
  </NuxtLink>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  icon: { type: [Object, Function], required: true },
  to: { type: String },
  activeMenu: { type: String, default: false },
  menu: { type: String, required: true },
  collapsed: { type: Boolean, default: false } 
})
</script>
