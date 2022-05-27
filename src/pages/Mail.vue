<template>
  <div class="page__container">
    <div class="mb-1 sm:mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 leading-none">
      <span class="text-xs font-medium sm:text-base sm:font-normal">{{mail.to_address.split('@')[0]}}</span>
      <span class="text-2xs sm:text-xs text-gray-600 ">{{mail.to_address}}</span>
    </div>
    <div class="pb-4 mb-4 border-b flex flex-wrap items-center gap-x-3 gap-y-0.5 leading-none">
      <span class="text-xs font-medium sm:text-base sm:font-normal">{{mail.from_name}}</span>
      <span class="text-2xs sm:text-xs text-gray-600 ">{{mail.from_address}}</span>
    </div>
    <div class="page__mail_subject">{{mail.subject}}</div>
    <div class="page__mail_content" v-html="view === 'text' ? mail.textAsHtml || mail.html : mail.html"></div>
    <div v-if="mail.textAsHtml && mail.html" class="page__view_mode">
      <div class="view_mode" :class="{'selected': view === 'text'}" @click="view = 'text'">text</div>
      <div class="view_mode" :class="{'selected': view === 'html'}" @click="view = 'html'">html</div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const $api = inject("$api")
const view = ref("text")
const mail = ref(await $api.get(`mail/${route.query.id}`).json())

</script>

<style lang="postcss" scoped>
.page__container {
  @apply relative;
  @apply w-full;
  @apply p-4 sm:p-6;
  @apply bg-white rounded-lg shadow-md;
}

.page__view_mode {
  @apply absolute top-0 right-0;
  @apply flex;
  @apply text-xs font-medium tracking-wide;
}
.view_mode {
  @apply px-3 py-2;
  @apply bg-gray-50;
  @apply text-gray-400;
  @apply transition-colors;
  @apply cursor-pointer select-none;
}
.view_mode:first-of-type {
  @apply rounded-bl-lg;
}
.view_mode:last-of-type {
  @apply rounded-tr-lg;
}
.view_mode.selected {
  @apply text-gray-500 bg-gray-100 shadow-inner;
}

.page__mail_subject {
  @apply mb-4 sm:mb-6;
  @apply text-lg sm:text-2xl font-medium leading-tight;
}
.page__mail_content {
  @apply flex flex-col;
  @apply text-2xs sm:text-sm text-gray-700 sm:tracking-wide break-words;
}
.page__mail_content p {
  @apply pb-1 sm:pb-2;
}
.page__mail_content a {
  @apply underline underline-offset-1;
}
.page__mail_content > :not(p) {
  min-width: 100%!important;
  width: 100%!important;
  max-width: 100%!important;
}
</style>