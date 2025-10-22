<script setup>

  import axiosClient from '@/axios';
  import { onMounted, ref, nextTick } from 'vue';
  import { initTooltips } from 'flowbite'

  const images = ref([]);

  onMounted(async () => {
  try {
    const response = await axiosClient.get('/api/image')
    images.value = response.data

    // Wait for Vue to finish rendering the new images
    await nextTick()

    // Now initialize Flowbite tooltips
    initTooltips()
  } catch (error) {
    console.error('Error loading images:', error)
  }
})
  console.log(images);

  // Default example images

  // const images = [
  //   { id: 1, label: 'Nature', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg' },
  //   { id: 2, label: 'Mountains', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg' },
  //   { id: 3, label: 'Sky', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg' },
  //   { id: 4, label: 'Sunset', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg' },
  //   { id: 5, label: 'Forest', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg' },
  //   { id: 6, label: 'City', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg' },
  //   { id: 7, label: 'River', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg' },
  //   { id: 8, label: 'Desert', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg' },
  //   { id: 9, label: 'Beach', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg' },
  //   { id: 10, label: 'Valley', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg' },
  //   { id: 11, label: 'Canyon', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg' },
  //   { id: 12, label: 'Ocean', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg' }
  // ];

</script>

<template>
  <div class="px-8 my-8">
    <!-- Masonry layout using CSS columns -->
    <div class="columns-2 md:columns-4 gap-4 [column-fill:_balance]">
      <div
        v-for="image in images"
        :key="image.id"
        v-bind="image.description ? { 'data-tooltip-target': `tooltip-${image.id}` } : {}"
        class="mb-4 break-inside-avoid relative group overflow-visible rounded-lg"
      >
        <img
          :src="image.url"
          :alt="image.label"
          class="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <!-- Overlay label -->
        <div
          class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-2 text-sm text-white"
        >
          {{ image.label }}
        </div>

        <div v-if="image.description" :id="`tooltip-${image.id}`" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
            {{ image.description }}
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .break-inside-avoid {
    break-inside: avoid;
  }
</style>
