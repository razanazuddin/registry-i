<template>
  <div
    :class="[
      'py-2 px-4 rounded-lg border text-sm',
      { 'border-pink-500 text-pink-600 bg-pink-50': error },
      { 'border-emerald-400 text-emerald-400 bg-emerald-50': success }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    error: Boolean,
    success: Boolean
  },
  setup() {}
});
</script>
