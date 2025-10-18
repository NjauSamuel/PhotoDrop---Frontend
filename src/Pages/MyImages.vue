<script setup>

  import axiosClient from '@/axios';
  import { onMounted, ref } from 'vue';

  const images = ref([]);

  onMounted(() => {
    axiosClient.get('/api/image')
    .then((response) => {
      console.log(response.data);
      images.value = response.data;
    })
  })

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
        class="mb-4 break-inside-avoid relative group overflow-hidden rounded-lg"
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
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Optional: Add subtle hover effect */
  .group:hover img {
    transform: scale(1.05);
  }

  .break-inside-avoid {
    break-inside: avoid;
  }
</style>
