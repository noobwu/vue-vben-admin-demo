<script lang="ts" setup>
import { computed, markRaw, onMounted, watch } from 'vue';

import { useVbenForm } from '@vben/common-ui';

import { Spin } from 'ant-design-vue';

import { Description } from '#/components/description';
import { useSchemaStore } from '#/store/schema';
import { schemaToDetailForm } from '#/util/tool';

const props = defineProps({
  tableName: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  view: {
    type: Boolean,
    default: false,
  },
  addFieldPrefix: {
    // 追加字段前辍
    type: String,
    default: '',
  },
});
const schemaStore = useSchemaStore();
const schema = computed(() => {
  return schemaStore.getSchema(props.tableName);
});
const schemaDescItems = computed(() => {
  return schemaToDetailForm(schema.value, props.data);
});

const formObj = computed(() => {
  const [Form, api] = useVbenForm({
    showDefaultActions: false,
    ...schema.value,
  });
  return {
    form: Form,
    api,
  };
});
const cData = computed(() => {
  const newData: any = {};
  Object.keys(props.data || {}).forEach((key: string) => {
    // 如果key不以addFieldPrefix为前辍，则自动追加
    if (key.startsWith(props.addFieldPrefix)) {
      newData[key] = props.data[key];
    } else {
      newData[props.addFieldPrefix + key] = props.data[key];
    }
  });
  return newData;
});
watch(
  () => props.tableName,
  () => {
    schemaStore.requestData(props.tableName);
  },
);
onMounted(() => {
  schemaStore.requestData(props.tableName);
});
defineExpose({
  getForm() {
    return markRaw(formObj.value?.form);
  },
  getFormApi() {
    return formObj.value?.api;
  },
});
const spinning = computed(() => {
  return Object.keys(schema.value).length === 0;
});
</script>
<template>
  <Spin :spinning="spinning">
    <div v-if="view" class="desc-wrap">
      <div v-for="item in schemaDescItems" :key="item.field" class="desc-card">
        <Description
          :data="cData"
          :label-style="{
            width: '120px',
          }"
          :schema="item.children"
          :title="schemaDescItems.length === 1 ? undefined : item.label"
        />
      </div>
    </div>
    <Spin v-else :spinning="spinning">
      <component :is="markRaw(formObj?.form)" />
    </Spin>
  </Spin>
</template>
<style scoped lang="less">
@import '#/assets/styles/common-form.less';
@import '#/assets/styles/common-detail.less';
</style>
