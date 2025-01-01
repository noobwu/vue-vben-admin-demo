<script setup lang="ts">
import { Image } from 'ant-design-vue';

defineProps({
  value: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <Image v-if="value" :src="value" :width="102" />
</template>
<style lang="less" scoped></style>
