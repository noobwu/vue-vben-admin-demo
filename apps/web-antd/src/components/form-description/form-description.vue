<script setup lang="ts">
import type { PropType } from 'vue';

import type { VbenFormProps } from '@vben/common-ui';

import type { DescItem } from '../description';

import { onMounted, ref, watch } from 'vue';

import { schemaToDetailForm } from '#/util/tool';

import { Description } from '../description';

const props = defineProps({
  formOptions: {
    type: Object as PropType<VbenFormProps>,
    default: () => ({}),
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  descriptionProps: {
    type: Object,
    default: () => ({}),
  },
});

const schemaDescItems = ref<DescItem[]>([]);
const initialSchemaDescItems = () => {
  if (
    Object.keys(props.formOptions).length > 0 &&
    Object.keys(props.data).length > 0
  ) {
    schemaDescItems.value = schemaToDetailForm(props.formOptions, props.data);
  }
};
onMounted(() => {
  initialSchemaDescItems();
});
watch(
  () => props.data,
  () => {
    initialSchemaDescItems();
  },
  {
    deep: true,
  },
);
watch(
  () => props.formOptions,
  () => {
    initialSchemaDescItems();
  },
  {
    deep: true,
  },
);
</script>
<template>
  <div class="desc-wrap">
    <div
      v-for="schema in schemaDescItems"
      :key="schema.field"
      class="desc-card"
    >
      <Description
        :data="data"
        :label-style="{
          width: '150px',
        }"
        :schema="schema.children"
        :title="schemaDescItems.length === 1 ? undefined : schema.label"
        v-bind="descriptionProps"
      />
    </div>
  </div>
</template>
<style lang="less" scoped></style>
