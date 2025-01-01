<script setup lang="ts">
import type { PropType } from 'vue';

import { computed } from 'vue';

import { Switch } from 'ant-design-vue';

const props = defineProps({
  // 值
  value: {
    type: [String, Number, Boolean] as PropType<boolean | number | string>,
    default: undefined,
  },
});
const emit = defineEmits(['update:value']);
const mValue = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit('update:value', val);
  },
});
</script>
<template>
  <Switch v-model:checked="mValue" :disabled="true" />
</template>
