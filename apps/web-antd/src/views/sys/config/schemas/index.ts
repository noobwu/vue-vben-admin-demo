import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type { VbenFormProps } from '#/adapter/form';
// 表格参数定义
export const gridSchemas: VxeGridProps<any> = {
  toolbarConfig: {
    refresh: true, // 刷新
    print: false, // 打印
    export: false, // 导出
    // custom: true, // 自定义列
    zoom: true, // 最大化最小化
  },
  columns: [
    { type: 'checkbox', width: 60 },
    {
      field: 'groupCode',
      title: '所属分组',
      cellRender: {
        name: 'ApiDict',
        props: {
          code: 'sys_config_group_code',
        },
      },
    },
    { field: 'name', title: '配置名称' },
    { field: 'code', title: '唯一编码' },
    { field: 'content', title: '参数值' },
    {
      field: 'isSys',
      title: '系统参数',
      cellRender: {
        name: 'ApiDict',
        props: {
          code: 'yes_no',
        },
      },
    },
    {
      field: 'enabled',
      title: '是否启用',
      cellRender: {
        name: 'ApiDict',
        props: {
          code: 'yes_no',
        },
      },
    },
    {
      width: 160,
      title: '操作',
      align: 'center',
      slots: { default: 'ACTION' },
      fixed: 'right',
    },
  ],
};
// 搜索表单参数定义
export const searchFormSchemas: VbenFormProps = {
  schema: [
    {
      component: 'ApiDict',
      fieldName: 'm_IN_groupCode',
      label: '所属分组',
      componentProps: {
        placeholder: '请选择所属分组',
        allowClear: true,
        code: 'sys_config_group_code',
        renderType: 'Select',
        mode: 'multiple',
      },
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: '配置名称',
      componentProps: {
        placeholder: '请输入配置名称',
        allowClear: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'code',
      label: '唯一编码',
      componentProps: {
        placeholder: '请输入唯一编码',
        allowClear: true,
      },
    },
    {
      component: 'ApiDict',
      fieldName: 'isSys',
      label: '系统参数',
      componentProps: {
        placeholder: '请选择',
        allowClear: true,
        code: 'yes_no',
        renderType: 'Select',
      },
    },
    {
      component: 'ApiDict',
      fieldName: 'enabled',
      label: '是否启用',
      componentProps: {
        placeholder: '请选择',
        allowClear: true,
        code: 'yes_no',
        renderType: 'Select',
      },
    },
  ],
};
// 表单参数定义
export const formSchamas: VbenFormProps = {
  wrapperClass: 'grid-cols-12', // 24栅格,
  commonConfig: {
    formItemClass: 'col-span-12',
  },
  schema: [
    {
      fieldName: 'id',
      label: '参数配置ID',
      component: 'Input',
      ifDetail: false,
      dependencies: {
        show: false,
        triggerFields: ['id'],
      },
    },
    {
      fieldName: 'groupCode',
      label: '所属分组',
      component: 'ApiDict',
      defaultValue: 'default',
      componentProps: {
        placeholder: '请选择所属分组',
        code: 'sys_config_group_code',
        renderType: 'Select',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
      rules: 'selectRequired',
    },
    {
      fieldName: 'name',
      label: '配置名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入配置名称',
        allowClear: true,
      },
      formItemClass: 'col-span-12',
      rules: 'required',
      detailSpan: 12,
    },
    {
      fieldName: 'code',
      label: '唯一编码',
      component: 'Input',
      componentProps: {
        placeholder: '请输入唯一编码',
        allowClear: true,
      },
      formItemClass: 'col-span-12',
      rules: 'required',
      detailSpan: 12,
    },
    {
      fieldName: 'content',
      label: '参数值',
      component: 'Input',
      componentProps: {
        placeholder: '请输入参数值',
        allowClear: true,
      },
      formItemClass: 'col-span-12',
      rules: 'required',
      detailSpan: 12,
    },
    {
      fieldName: 'isSys',
      label: '系统参数',
      component: 'ApiDict',
      defaultValue: 1,
      componentProps: {
        placeholder: '请选择',
        code: 'yes_no',
        isBtn: true,
        renderType: 'RadioGroup',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
      rules: 'selectRequired',
    },
    {
      fieldName: 'enabled',
      label: '是否启用',
      component: 'ApiDict',
      defaultValue: 1,
      componentProps: {
        placeholder: '请选择是否启用',
        code: 'yes_no',
        isBtn: true,
        renderType: 'RadioGroup',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
      rules: 'selectRequired',
    },
    {
      fieldName: 'remark',
      label: '备注',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入备注',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
  ],
};
