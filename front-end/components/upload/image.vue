<template>
  <div 
    v-if="props.type !== 'simple'"
    class="flex items-center justify-start w-full max-h-max text-gray-700 font-sans"
    :style="file && !error ? { backgroundImage: `url(${imageUrl})`, opacity: '0.4'  ,backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    @click="triggerFileInput"  
  >
    <div for="dropzone-file"
    class="flex flex-col items-center justify-center w-full h-[15em] bg-neutral-secondary-medium border border-dashed border-default-strong rounded-md cursor-pointer hover:bg-neutral-tertiary-medium">
        <div class="flex flex-col items-center justify-center text-body pt-5 pb-6 inset-0" :class="{'text-[#faffae] bg-black opacity-100 rounded-md' : file}">
            <div class="flex gap-3">
              <!-- overlay -->
              <CloudArrowUpIcon class="w-[32px] h-[32px] mb-5"></CloudArrowUpIcon>
              <TrashIcon class="w-[32px] h-[32px] mb-5 text-red-600" v-if="file" @click.stop="removeImage"></TrashIcon>
            </div>
            
            <p class="mb-2 text-sm"><span class="font-semibold">Klik untuk unggah file</span> atau tarik file lalu taruh disini</p>
            <p class="text-xs">{{ text_file }}</p>
        </div>
        <input ref="fileInput" @change="onFileChange" id="dropzone-file" type="file" class="hidden" />
    </div>
  </div>

  <div class="flex items-center justify-start w-full h-full text-gray-700 font-sans" v-if="props.type === 'simple'">

      <input 
      @change="onFileChange"
      type="file" name="file-input" id="file-input" 
      class="block border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:color-default focus:text-[#8a8a0a] disabled:opacity-50 disabled:pointer-events-none dark:bg-white
      file:bg-gray-50 file:border-0 font-light font-sans
      file:me-4
      file:py-1 file:px-4"
      :class="{'bg-black opacity-100 rounded-md' : file}"
      >

    </div>
</template>

<script setup lang="ts">
import { CloudArrowUpIcon, TrashIcon } from '@heroicons/vue/24/outline';
import Swal from 'sweetalert2';

const emit = defineEmits(['update_image'])
const file = defineModel('file', {
  required: true
})

const props = defineProps<{
  text_file?: string,
  type?: string
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

const error = ref(false)
const error_message = ref('')

const uploaded = ref(false)

const imageUrl = ref()

onBeforeUnmount(() => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }
})

const updateImage = (val: any) => {
  if (!val) {
    imageUrl.value = ''
    file.value = ''
    error.value = false
    return
  }

  if (val instanceof File) {
    imageUrl.value = URL.createObjectURL(val)
  } else if (typeof val === 'string') {
    imageUrl.value = val
  }

  file.value = imageUrl.value
  error.value = false
}


watch(
  () => file.value,
  (newVal) => {
    updateImage(newVal)
  },
  { immediate: true }
)


function onDragOver() {
    isDragging.value = true
}

function onDragLeave() {
    isDragging.value = false
}

function onDrop(event: any) {
    isDragging.value = false
    error.value = false;
    const droppedFiles = event.dataTransfer.files
    if (droppedFiles.length) {
        if(!file.value){
            file.value = droppedFiles[0]
            checkFile(file.value)
        }else{
            file.value = droppedFiles[0]
            checkFile(file.value)
        }
    }
}

function onFileChange(event: any) {
    const selectedFile = event.target.files[0]
    if (!selectedFile) return

    file.value = selectedFile
    imageUrl.value = URL.createObjectURL(selectedFile)
    error.value = false

    if (selectedFile) {
      if(!file.value){
          file.value = selectedFile
          checkFile(file.value)
      }else{
          file.value = selectedFile;
          checkFile(file.value)
      }
    }

    emit('update_image', file.value)
}

function triggerFileInput() {
  if (!fileInput.value) return

  fileInput.value.click()
  error.value = false
}

async function checkFile(selectedFile: any) {
    if (!selectedFile) {
        error.value = true
        error_message.value = 'Please select a file first.'
        return
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(selectedFile.type) && !error.value) {
        error.value = true
        error_message.value = 'File type must be an image.'
        return
    }

    const validImage = await validateImage(selectedFile) as any;
    if (!validImage.valid) {
        error.value = true
        error_message.value = validImage.message;
        file.value = null;

        Swal.fire({
            icon: 'error',
            title: 'Invalid Image Cover',
            text: validImage.message,
            confirmButtonText: 'OK'
        });

        return
    }

    const img = new Image();

    if (!error.value) {
        img.onerror = () => {
            error.value = true;
            error_message.value = 'Invalid image file.';
            file.value = null;
        };

        img.src = URL.createObjectURL(selectedFile);
    }
}

const validateImage = async (file: any) => {
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5MB
  const MIN_WIDTH = 1028;
  const MAX_WIDTH = 1628;

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, message: 'File size exceeds 5MB limit.' };
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      const { width, height } = img;
      URL.revokeObjectURL(objectUrl);

      // Width constraints
    //   if (width < MIN_WIDTH) {
    //     resolve({ valid: false, message: 'Image resolution is too low.' });
    //     return;
    //   } else if (width > MAX_WIDTH) {
    //     resolve({ valid: false, message: 'Image resolution is too high.' });
    //     return;
    //   }

      // Compression / quality check
      const pixelCount = width * height;
      const sizePerPixel = file.size / pixelCount;
      if (sizePerPixel < 0.05) {
        resolve({
          valid: false,
          message: 'Image may be too compressed or blurry.',
        });
        return;
      }

      resolve({ valid: true });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ valid: false, message: 'Failed to load image.' });
    };
  });
};

const removeImage = () => {
  file.value = null
  emit('update_image', null)
}
</script>