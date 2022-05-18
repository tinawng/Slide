<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const api_key = ref(sessionStorage.getItem("X-API-KEY"))
const show = ref(!api_key.value)

function onSubmit() {
  console.log("savekey", api_key.value)
  sessionStorage.setItem("X-API-KEY", api_key.value)

  router.go()
}
</script>

<template>
  <form v-if="show" class="form__container" v-on:submit.prevent="onSubmit">
    <div class="relative px-4 py-3 sm:py-2 flex gap-3 sm:gap-4 bg-gray-100 border rounded">
      <icon class="min-w-[1.25rem] w-5 text-gray-500" variant="key" />
      <input v-model="api_key" type="password" placeholder="API KEY" />
    </div>
    <input class="button" type="submit" />
  </form>
</template>

<style lang="postcss" scoped>
.form__container {
  @apply w-full sm:w-1/3;
  @apply mt-[50%] sm:mt-0 mx-auto p-4;
  @apply flex flex-col gap-8 sm:gap-4;
  @apply bg-white rounded-lg shadow-md;
}
input[type="submit"] {
  @apply w-full sm:w-fit;
  @apply ml-auto px-4 py-3 sm:py-1.5;
  @apply bg-red-400 rounded shadow-md;
  @apply text-lg sm:text-base text-red-50;
  @apply transition-all;
  @apply cursor-pointer;
}
input[type="submit"]:active {
  @apply translate-y-0.5 shadow-sm;
}
</style>