<script setup lang="ts">
import type { PropType } from 'vue';

import { Upload } from '#/components/form';

defineOptions({
  inheritAttrs: false,
});
defineProps({
  value: {
    type: String,
    default: '',
  },
  listType: {
    type: String as PropType<'picture' | 'picture-card' | 'text'>,
    default: 'text',
  },
});
</script>
<template>
  <Upload :disabled="true" :list-type="listType" :value="value">
    <template #default></template>
  </Upload>
</template>
<style lang="less" scoped></style>
