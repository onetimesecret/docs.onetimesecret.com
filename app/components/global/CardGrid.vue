<template>
  <div class="my-8">
    <!-- Optional root slot content -->
    <slot name="root" />

    <!-- Grid of cards -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <slot />
    </div>
  </div>
</template>
