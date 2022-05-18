<template>
  <header>
    <nav-bar />
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <suspense>
        <component :is="Component" />
        <template #fallback> Loading... </template>
      </suspense>
    </router-view>
    <form-api-key />
  </main>
</template>

<style lang="postcss">
#app {
  @apply min-h-screen;
  @apply pt-6 pb-10 px-4;
  @apply bg-gray-100;
}
#app > * {
  @apply max-w-7xl mx-auto;
}
</style>