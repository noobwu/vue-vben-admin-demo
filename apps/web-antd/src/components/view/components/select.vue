<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: [String, Boolean, Number, Array],
    default: undefined,
  },
  options: {
    type: Array,
    default: () => [],
  },
  join: {
    // 连接符
    type: String,
    default: ',',
  },
});
const cValue = computed(() => {
  return Array.isArray(props.value)
    ? props.options
        .filter((item: any) => (props.value as Array<any>).includes(item.value))
        .map((item: any) => item.label)
        .join(props.join)
    : (
        props.options.find(
          (item: any) => item.value?.toString() === props.value?.toString(),
        ) as any
      )?.label;
});
</script>
<template>
  <div>{{ cValue }}</div>
</template>
<style lang="less" scoped></style>
