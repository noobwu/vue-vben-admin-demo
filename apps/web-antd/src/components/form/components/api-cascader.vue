<script setup lang="ts">
import type { CascaderOptionType } from 'ant-design-vue/es/cascader';
import type { FieldNames } from 'ant-design-vue/es/vc-cascader';

import type { PropType } from 'vue';

import { computed, ref, useAttrs, watch, watchEffect } from 'vue';

import { isFunction } from '@vben/utils';

import { useVModel } from '@vueuse/core';
import { Cascader } from 'ant-design-vue';

import { requestClient } from '#/api/request';
import { get, omit } from '#/util/tool';

const props = defineProps({
  value: {
    type: [Array] as PropType<number[] | string[]>,
    default: undefined,
  },
  api: {
    type: [Function, String] as PropType<
      (arg?: any) => Promise<CascaderOptionType[]> | String
    >,
    default: null,
  },
  requestMethod: {
    type: String,
    default: 'post',
  },
  // api params
  params: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  // support xxx.xxx.xx
  resultField: {
    type: String,
    default: '',
  },
  labelField: {
    type: String,
    default: 'name',
  },
  valueField: {
    type: String,
    default: 'id',
  },
  childrenField: {
    type: String,
    default: 'children',
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  fieldNames: {
    type: Object as PropType<FieldNames>,
    default: () => {
      return undefined;
    },
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
});
const emits = defineEmits(['update:value', 'optionsChange']);
const mValue = useVModel(props, 'value', emits, {
  defaultValue: props.value,
  passive: true,
});
const options = ref<CascaderOptionType[]>([]);
const loading = ref(false);
const isFirstLoad = ref(true);
const getOptions = computed(() => {
  return options.value as CascaderOptionType[];
});
const attrs = useAttrs();
const bindProps = computed(() => {
  return {
    ...omit(attrs, ['onChange', 'onInput', 'onBlur']),
    ...props,
    fieldNames: props.fieldNames ?? {
      label: props.labelField,
      value: props.valueField,
      children: props.childrenField,
    },
  };
});
const fetch = async () => {
  const api: any =
    typeof props.api === 'string' && props.api
      ? (params: any) => {
          return (requestClient as any)[props.requestMethod](
            props.api as any,
            params,
          );
        }
      : props.api;
  if (!api || !isFunction(api)) return;
  try {
    loading.value = true;
    const params =
      props.requestMethod === 'get' ? { params: props.params } : props.params;
    const res = await api(params);
    if (Array.isArray(res)) {
      options.value = res;
      emits('optionsChange', options.value);
    } else {
      options.value = props.resultField ? get(res, props.resultField) : [];
      emits('optionsChange', options.value);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
};
async function handleFetch() {
  if (!props.immediate && isFirstLoad.value) {
    await fetch();
    isFirstLoad.value = false;
  }
}
watchEffect(() => {
  props.immediate && fetch();
});

watch(
  () => props.params,
  () => {
    !isFirstLoad.value && fetch();
  },
  { deep: true },
);
</script>

<template>
  <Cascader
    v-model:value="mValue"
    v-bind="bindProps"
    :options="getOptions"
    class="w-full"
    @dropdown-visible-change="handleFetch"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Cascader>
</template>
