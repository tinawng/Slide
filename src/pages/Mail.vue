<template>
  <div class="page__container">
    <div class="mb-2.5 flex items-center gap-3 leading-none">
      <span class="">{{mail.to_address.split('@')[0]}}</span>
      <span class="text-xs text-gray-600 ">{{mail.to_address}}</span>
    </div>
    <div class="pb-4 mb-4 border-b flex items-center gap-3 leading-none">
      <span class="">{{mail.from_name}}</span>
      <span class="text-xs text-gray-600 ">{{mail.from_address}}</span>
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
  @apply p-6;
  @apply bg-white rounded-lg shadow-md;
}
</style>
<style lang="postcss">
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
  @apply cursor-pointer;
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
  @apply mb-6;
  @apply text-2xl font-medium;
}
.page__mail_content {
  @apply flex flex-col;
  @apply text-sm text-gray-700 tracking-wide break-words;
}
.page__mail_content p {
  @apply pb-2;
}
.page__mail_content a {
  @apply underline underline-offset-1;
}
</style>