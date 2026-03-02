<script setup lang="ts">
import { error } from 'console';
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    // model?: string
    label?: string
    placeholder?: string
    type?: string
    icon?: any
    error?: string,
    required?:boolean,
    loop?: any,
    value_select?: string,
    text_select?: string,
    disabled?: boolean
  }>(),
  {
    // model: '',
    label: '',
    placeholder: '',
    type: 'text',
    icon: null,
    error: '',
    required:false,
    loop: null,
    value_select: '',
    text_select: '',
    disabled: false,
  }
)

const model = defineModel<any>({
  required: true
})
</script>

<template>
  <div class="relative">
    <label v-if="props.label" class="block mb-1 text-sm font-sans font-light">
      {{ props.label }}
      <span class="text-red-500 font-sans font-light" v-if="required">*</span>
    </label>

    <div class="relative">
      <component v-if="props.icon" :is="props.icon" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
      <input
        v-if="props.type !== 'select' && props.type !== 'textarea' && props.type !== 'radio'"
        v-model="model"
        :type="props.type"
        :placeholder="props.placeholder"
        class="w-full h-10 px-5 rounded-lg text-sm border-[1px] border-gray-100 focus:outline-none focus:bg-gray-100 focus:border-yellow-100 font-sans font-light"
        :class="{'pl-10': props.icon, 'border-red-500': props.error, 'cursor-not-allowed' : disabled}"
        :disabled="disabled"
      />
      <select
        v-if="props.type === 'select'"
        v-model="model"
        :type="props.type"
        :placeholder="props.placeholder"
        class="w-full h-10 px-5 rounded-lg text-sm border-[1px] border-gray-100 focus:outline-none focus:bg-gray-100 focus:border-yellow-100 font-sans font-light"
        :class="{'pl-10': props.icon, 'border-red-500': props.error, 'cursor-not-allowed' : disabled}"
        :disabled="disabled"
      >
        <option value="" disabled selected>{{ props.placeholder }}</option>
        <option v-for="(value, key) in props.loop" :value="value[value_select]">{{ value[text_select] }}</option>
      </select>
      <textarea
       v-if="props.type === 'textarea'"
        v-model="model"
        :type="props.type"
        :placeholder="props.placeholder"
        class="w-full h-17 px-5 rounded-lg text-sm border-[1px] border-gray-100 focus:outline-none focus:bg-gray-100 focus:border-yellow-100 font-sans font-light"
        :class="{'pl-10': props.icon, 'border-red-500': props.error, 'cursor-not-allowed' : disabled}"
        :disabled="disabled"
        rows="8" cols="9"
      ></textarea>

      <div class="w-1/2 flex gap-6 mt-3" v-if="props.type === 'radio'">
        <div class="relative flex flex-col grow rounded-xl bg-white shadow">
          <nav class="flex flex-row gap-1 p-2" :class="{' border-red-400 border-[1px] rounded-md': props.error}">
            <div
              role="button"
              class="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              v-for="(value, key) in props.loop"
            >
              <label
                :for="`react-horizontal-${key}`"
                class="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <div class="inline-flex items-center">
                  <label class="relative flex items-center cursor-pointer" for="react-horizontal">
                    <input
                      :name="`framework-horizontal-${key}`"
                      type="radio"
                      class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                      :id="`react-horizontal-${key}`"
                      :value="value[value_select]"
                      v-model="model"
                    />
                    <span class="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label class="ml-2 text-slate-700 cursor-pointer text-sm font-sans" for="react-horizontal">
                    {{ value[text_select] }}
                  </label>
                </div>
              </label>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <p v-if="props.error" class="text-[10px] text-red-500 mt-1 italic font-mono font-light">{{ props.error }}</p>
  </div>
</template>
