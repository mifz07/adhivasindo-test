<template>
  <div class="w-full bg-[#5cbe1ab6] rounded-lg p-1 text-gray-100 font-sans text-center cursor-pointer hover:bg-[#72f11ddc] text-sm hover:text-gray-500">{{ text }}</div>
</template>

<script lang="ts" setup>

const props = defineModel('text', {
  type: String,
  required: true,
}) 


</script>