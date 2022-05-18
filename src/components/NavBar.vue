<template>
  <nav class="nav__container">
    <div class="nav__tab selected">
      <span class="nav__tab_title">All</span>
      <span class="nav__tab_count">14</span>
    </div>
    <div class="nav__tab">
      <span class="nav__tab_title">Twitter</span>
      <span class="nav__tab_count">3</span>
    </div>
    <div class="nav__tab">
      <span class="nav__tab_title">Oracle</span>
      <span class="nav__tab_count">6</span>
    </div>
  </nav>
</template>

<style lang="postcss">
.nav__container {
  @apply w-full;
  @apply mb-8;
  @apply flex items-center gap-8;
}
.nav__tab {
  @apply flex items-end gap-1.5;
  @apply cursor-pointer;
}
.nav__tab.selected {
  @apply px-1 border-b-2 border-red-400;
}
.nav__tab_title {
  @apply text-xl text-gray-500 font-medium;
}
.selected .nav__tab_title {
  @apply text-3xl text-gray-800 font-bold;
}
.nav__tab_count {
  @apply pb-0.5 text-sm text-gray-400;
}
.selected .nav__tab_count {
  @apply p-0 text-xl font-semibold;
}


</style>