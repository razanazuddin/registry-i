<template>
  <div
    :class="[
      'py-2 px-4 rounded-lg border text-sm',
      { 'border-pink-500 text-pink-600 bg-pink-50': alertType === 'alert-danger' },
      { 'border-emerald-400 text-emerald-400 bg-emerald-50': alertType === 'alert-success' }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    alertType: String
  },
  setup() {}
});
</script>
