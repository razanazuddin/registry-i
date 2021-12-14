<template>
  <button
    class="py-2 px-4 font-semibold rounded-lg text-white bg-sky-500 hover:bg-sky-700"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup() {}
});
</script>
