<script setup lang="ts">
import { IconPicker } from '@vben/common-ui';
import { addCollection } from '@vben/icons';

import AntDesignIcons from '@iconify/json/json/ant-design.json';
import { useVModel } from '@vueuse/core';
import { Input } from 'ant-design-vue';

const props = defineProps({
  value: {
    type: [String],
    default: undefined,
  },
});
const emits = defineEmits(['update:value']);
addCollection(AntDesignIcons);
const mValue = useVModel(props, 'value', emits, {
  defaultValue: props.value,
  passive: true,
});
</script>
<template>
  <Input
    v-model:value="mValue"
    allow-clear
    class="w-full"
    placeholder="点击这里选择图标"
  >
    <template #addonAfter>
      <IconPicker v-model="mValue" class="w-full" />
    </template>
  </Input>
</template>
<style lang="less" scoped>
.m-icon-wrap {
  height: 36px;
  cursor: pointer;
}
.m-icon-wrap:hover {
  border: 1px solid blue;
}
.m-icon-wrap-selected {
  height: 36px;
  border: 1px solid blue;
  cursor: pointer;
}
</style>
