<script setup>

  import axiosClient from '@/axios';
  import { onMounted, ref, nextTick } from 'vue';
  import { initTooltips } from 'flowbite'
  import { RouterLink } from 'vue-router'

  const images = ref([]);
  const showWelcome = ref(false); // <-- flag for new users

  const defaultImages = [
    { id: 1, label: 'Nature', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg', description: 'Peaceful green landscape.' },
    { id: 2, label: 'Mountains', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg', description: 'Snow peaks at dawn.' },
    { id: 3, label: 'Sky', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg', description: 'Clear blue sky view.' },
    { id: 4, label: 'Sunset', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg', description: 'Warm evening glow.' },
    { id: 5, label: 'Forest', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg', description: 'Dense green woods.' },
    { id: 6, label: 'City', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg', description: 'Night city lights.' },
    { id: 7, label: 'River', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg', description: 'Calm flowing water.' },
    { id: 8, label: 'Desert', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg', description: 'Golden sand dunes.' },
    { id: 9, label: 'Beach', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg', description: 'Waves hitting shore.' },
    { id: 10, label: 'Valley', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg', description: 'Green valley hills.' },
    { id: 11, label: 'Canyon', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg', description: 'Deep red cliffs.' },
    { id: 12, label: 'Ocean', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg', description: 'Vast blue horizon.' }
  ]


  onMounted(async () => {
  try {
    const response = await axiosClient.get('/api/image')
    images.value = response.data

    // Fallback: if user has no uploads, show default images
    if (images.value.length === 0) {
      showWelcome.value = true;
      images.value = defaultImages
    }

    // Wait for Vue to finish rendering the new images
    await nextTick()

    // Now initialize Flowbite tooltips
    initTooltips()
  } catch (error) {
    console.error('Error loading images:', error)
    showWelcome.value = true; // also show welcome if API fails
    images.value = defaultImages // fallback in case API fails
    await nextTick();
    initTooltips(); // Ensure tooltips also work after API fail
  }
})

</script>

<template>
  <div class="px-8 my-8">
    <!-- Show welcome message if no user uploads -->
    <div v-if="showWelcome" class="text-center py-16">
      <h2 class="text-2xl font-semibold mb-4">Welcome to <span class="text-primary-600">Photo Drop</span>!</h2>
      <p class="text-gray-600 mb-6">You haven’t uploaded any photos yet.</p>
      <RouterLink
        :to="{ name: 'Home' }"
        class="inline-block px-5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
      >
        Click here to start uploading
      </RouterLink>
    </div>

    <div v-if="showWelcome">
      <h2 class="text-2xl font-semibold mb-4"><span class="text-primary-600">Examples</span></h2>
    </div>

    <!-- Gallery grid -->
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

        <div
          v-if="image.description"
          :id="`tooltip-${image.id}`"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white
          transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
        >
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
