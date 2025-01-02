import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ant-design:setting-outlined',
      keepAlive: true,
      order: 1000,
      title: '系统设置',
      perms: ['admin', 'sys:manager'],
      component: 'BasicLayout',
    },
    name: 'sys:manager',
    path: '/sys/manager',
    redirect: '/sys/manager',
    children: [
      {
        meta: {
          icon: 'ant-design:user-outlined',
          title: '用户管理',
          order: 10,
          perms: ['admin', 'sys:user'], // 拥有权限码才能访问
          component: '/sys/user/index',
          btns: {
            'sys:user:page': '分页查询用户',
            'sys:user:detail': '查看用户详情',
            'sys:user:save': '添加用户',
            'sys:user:update': '修改用户',
            'sys:user:remove': '删除用户',
            'sys:playUser': '扮演用户',
            'sys:user:grantRole': '授权角色',
            'sys:user:locked': '锁定用户',
            'sys:user:unLocked': '取消锁定',
          },
        },
        name: 'sys:user',
        path: '/sys/user/index',
        component: () => import('#/views/sys/user/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:file-text-outlined',
          title: '参数配置',
          order: 80,
          perms: ['admin', 'sys:config'], // 拥有权限码才能访问
          component: '/sys/config/index',
          btns: {
            'sys:config:page': '分页查询参数配置',
            'sys:config:detail': '查看参数配置详情',
            'sys:config:save': '添加参数配置',
            'sys:config:update': '修改参数配置',
            'sys:config:remove': '删除参数配置',
          },
        },
        name: 'sys:config',
        path: '/sys/config/index',
        component: () => import('#/views/sys/config/index.vue'),
      },
    ],
  },
];

export default routes;
