<script setup>
import { ref, inject } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const $api = inject("$api")
const mails = ref(await $api.get("mails").json())

function imgFallback(e) {
  e.srcElement.classList.add("hidden")
  e.srcElement.nextSibling.classList.remove("hidden")
}

function timeAgo(timestamp) {
  const sec = 1000,
    min = 60000,
    hour = 3600000,
    day = 86400000,
    diff = Date.now() - timestamp

  if (diff < 10 * sec) return "Just now"
  else if (diff < min) return Math.floor(diff / sec) + "s"
  else if (diff < hour) return Math.floor(diff / min) + "m"
  else if (diff < day) return Math.floor(diff / hour) + "h"
  else return new Date(timestamp).getDate() + "/" + new Date(timestamp).getMonth()
}

async function deleteMail(event, id) {
  event.stopPropagation()
  await $api.delete(`mail/${id}`)
  mails.value = mails.value.filter((mail) => mail._id !== id)
}
function goToMailPage(id) {
  router.push({ path: "/mail", query: { id } })
}
</script>

<template>
  <div id="mails-container" class="page__container">
    <div v-for="mail in mails" :key="mail.date" class="row" @click="goToMailPage(mail._id)">
      <div>
        <img
          class="w-7.5 sm:w-7 rounded-full"
          :src="`https://logo.clearbit.com/${mail.from_address.split('@')[1]}`"
          @error="imgFallback"
        />
        <div
          class="h-7.5 w-7.5 sm:h-7 sm:w-7 bg-gray-100 rounded-full flex justify-center items-center text-gray-600 font-semibold uppercase hidden"
        >
          <span>{{mail.from_name[0] || mail.from_address[0]}}</span>
        </div>
      </div>
      <span class="from">
        <p>{{mail.from_name || mail.from_address.split('@')[1]}}</p>
        <p class="mt-0.5 text-2xs font-normal leading-none sm:hidden">{{mail.subject}}</p>
      </span>
      <span class="to">{{mail.to_address}}</span>
      <span class="subject">{{mail.subject}}</span>
      <span class="delete" @click="deleteMail($event, mail._id)"><icon class="w-4" variant="trash" /></span>
      <span class="date">{{timeAgo(mail.timestamp)}}</span>
    </div>
  </div>
</template>

<style lang="postcss">
.page__container {
}

.row {
  @apply h-14 sm:h-11 z-0;
  @apply mb-3 px-2.5 sm:px-2;
  @apply grid items-center;
  grid-template-columns: 2.7rem 1fr 0 0 0 3.5rem;
  @apply bg-white rounded-lg shadow;
  @apply text-xs sm:text-sm;
  @apply transition-all;
  @apply cursor-pointer;
}
@media (min-width: 1024px) {
  .row {
    grid-template-columns: 3rem 12rem 12rem 1fr 2rem 3.5rem;
  }
}
.row > * {
  @apply overflow-hidden;
}
.row:hover {
  @apply shadow-md -translate-y-1;
}
.row:active {
  @apply shadow -translate-y-0.5;
}

.from {
  @apply font-bold text-gray-600;
}
.to {
  @apply text-gray-500;
}
.date {
  @apply text-2xs sm:text-xs text-right text-gray-400;
  @apply select-none;
}

.delete {
  @apply relative;
  @apply text-gray-500;
  @apply opacity-0;
  @apply transition-all;
}
.delete:before {
  content: "";
  @apply absolute -top-2 -left-2 -z-10;
  @apply h-8 w-8;
  @apply bg-red-100 rounded-full;
  @apply scale-0 transition-transform duration-300;
}
.delete:hover {
  @apply text-red-500;
}
.delete:hover:before {
  @apply scale-100;
}
.row:hover .delete {
  @apply opacity-100;
}
</style>