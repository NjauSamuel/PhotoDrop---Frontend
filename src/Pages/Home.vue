<script setup>
    import axiosClient from '@/axios';
    import router from '@/router';
    import { ref } from 'vue';

    const description = ref(false)

    const data = ref({
        label: '',
        description: '',
        image: null,
    })

    // toggle function
    const toggleDescription = () => {
        description.value = !description.value
    }

    function submit(){
        const formData = new FormData()
        formData.append('image', data.value.image)
        formData.append('label', data.value.label)
        axiosClient.post('/api/image', formData)
            .then(response => {
                router.push({name: 'MyImages'})
            })
    }
</script>

<template>

<div class="flex justify-center flex-col col-span-full max-w-3xl mx-auto px-4 lg:px-0 my-4">
    <label for="photo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Image
    </label>

    <form @submit.prevent="submit">

        <div id="photo" class="flex items-center justify-center w-full mb-4">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input @change="data.image = $event.target.files[0]" id="dropzone-file" type="file" class="hidden" />
            </label>
        </div> 

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">        
            <div class="mb-5 sm:col-span-3">
                <label for="label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Label</label>
                <input v-model="data.label" type="text" id="label" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Image A" required />
            </div>

            <div class="sm:col-span-1 flex items-end mb-3 justify-start sm:justify-end">
                <button @click="toggleDescription" type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add description?</button>
            </div>
        </div>

        <div class="mb-5" v-if="description">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea v-model="data.description" id="description" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="The image description here..."></textarea>
        </div>

        <div class="flex justify-start">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>

    </form>

</div>

</template>

<style scoped></style>
