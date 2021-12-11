<template>
  <label class="block">
    <span class="block text-sm font-medium text-gray-700">{{ label }}</span>
    <input
      type="text"
      :value="value"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      @input="emitInput($event.target.value)"
    />
  </label>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    value: String,
    label: String
  },
  setup(props, { emit }) {
    return {
      emitInput: (value) => {
        emit('input', value);
      }
    };
  }
});
</script>
