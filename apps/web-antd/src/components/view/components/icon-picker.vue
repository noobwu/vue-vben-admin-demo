<script setup lang="ts">
import { Icon } from '#/components/icon';

defineOptions({
  inheritAttrs: false,
});
defineProps({
  value: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: '16px',
  },
});
</script>
<template>
  <Icon v-if="value" :icon="value" :size="size" />
  <span v-else></span>
</template>
<style lang="less" scoped></style>
