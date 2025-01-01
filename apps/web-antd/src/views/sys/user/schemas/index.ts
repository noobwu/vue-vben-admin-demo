import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type { VbenFormProps } from '#/adapter/form';

import { z } from '#/adapter/form';
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
    { field: 'user_name', title: '用户名' },
    {
      field: 'roleIds',
      title: '所属角色',
      cellRender: {
        name: 'ApiSelect',
        props: {
          api: '/sys/role/select',
        },
      },
    },
    { field: 'real_name', title: '姓名' },
    { field: 'nick_name', title: '昵称' },
    {
      field: 'sex',
      title: '性别',
      cellRender: {
        name: 'ApiDict',
        props: {
          code: 'sex',
        },
      },
    },
    {
      field: 'is_locked',
      title: '是否锁定',
      cellRender: {
        name: 'ApiDict',
        props: {
          code: 'yes_no',
        },
      },
    },
    { field: 'mobile_phone', title: '手机号码' },
    { field: 'tel', title: '联系电话' },
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
      component: 'Input',
      fieldName: 'user_name',
      label: '用户名',
      componentProps: {
        placeholder: '请输入用户名',
        allowClear: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'real_name',
      label: '姓名',
      componentProps: {
        placeholder: '请输入姓名',
        allowClear: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'mobile_phone',
      label: '手机号码',
      componentProps: {
        placeholder: '请输入手机号码',
        allowClear: true,
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
      label: '用户ID',
      component: 'Input',
      ifDetail: false,
      dependencies: {
        show: false,
        triggerFields: ['id'],
      },
    },
    {
      fieldName: 'baseinfo',
      component: 'Divider',
      label: '基础信息',
      formItemClass: 'col-span-12',
      componentProps: {},
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () => {
            return '基础信息';
          },
        };
      },
    },
    {
      fieldName: 'user_name',
      label: '用户名',
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户名',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      rules: 'required',
      detailSpan: 6,
    },
    {
      fieldName: 'real_name',
      label: '姓名',
      component: 'Input',
      componentProps: {
        placeholder: '请输入姓名',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      rules: 'required',
      detailSpan: 6,
    },
    {
      fieldName: 'password',
      label: '密码',
      component: 'InputPassword',
      help: '5-18位数字、字母、特殊字符组成。',
      componentProps: {
        placeholder: '请输入密码',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      rules: z
        .string()
        .regex(/[\w!@#$%^&*]{5,18}/, '密码由5-18位数字、字母、特殊字符组成。'),
      dependencies: {
        if({ id }) {
          return !id;
        },
        triggerFields: ['id'],
      },
      ifDetail: false,
    },
    {
      fieldName: 'confirmPassword',
      label: '确认密码',
      component: 'InputPassword',
      componentProps: {
        placeholder: '请输入确认密码',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      rules: z
        .string()
        .regex(/[\w!@#$%^&*]{5,18}/, '密码由5-18位数字、字母、特殊字符组成。'),
      dependencies: {
        if({ id }) {
          return !id;
        },
        triggerFields: ['id', 'confirmPassword'],
        rules: (values) => {
          return z
            .string()
            .regex(
              /[\w!@#$%^&*]{5,18}/,
              '密码由5-18位数字、字母、特殊字符组成。',
            )
            .refine(
              (confirmPassword) => {
                return confirmPassword === values.password;
              },
              {
                message: '确认密码必须与密码一致',
              },
            );
        },
      },
      ifDetail: false,
    },
    {
      fieldName: 'nick_name',
      label: '昵称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入昵称',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'sex',
      label: '性别',
      component: 'ApiDict',
      defaultValue: 3,
      componentProps: {
        placeholder: '请选择性别',
        code: 'sex',
        renderType: 'RadioGroup',
        isBtn: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'email',
      label: '邮箱',
      component: 'Input',
      componentProps: {
        placeholder: '请输入邮箱',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'mobile_phone',
      label: '手机号码',
      component: 'Input',
      componentProps: {
        placeholder: '请输入手机号码',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      rules: 'required',
      detailSpan: 6,
    },
    {
      fieldName: 'otherinfo',
      label: '其他信息',
      component: 'Divider',
      formItemClass: 'col-span-12',
      componentProps: {},
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () => {
            return '其他信息';
          },
        };
      },
    },
    {
      fieldName: 'deptId',
      label: '所属部门',
      component: 'ApiTreeSelect',
      componentProps: {
        placeholder: '请选择所属部门',
        allowClear: true,
        api: '/sys/dept/tree',
        labelField: 'name',
        valueField: 'id',
      },
      formItemClass: 'col-span-6',
      rules: 'selectRequired',
      detailSpan: 6,
    },
    {
      fieldName: 'postId',
      label: '所属岗位',
      component: 'ApiSelect',
      componentProps: {
        placeholder: '请选择所属岗位',
        allowClear: true,
        api: '/sys/post/select',
      },
      formItemClass: 'col-span-6',
      rules: 'selectRequired',
      detailSpan: 6,
    },
    {
      fieldName: 'tel',
      label: '联系电话',
      component: 'Input',
      componentProps: {
        placeholder: '请输入联系电话',
        allowClear: true,
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'avatar',
      label: '头像',
      component: 'Avatar',
      componentProps: {
        placeholder: '请选择头像',
      },
      formItemClass: 'col-span-12',
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
