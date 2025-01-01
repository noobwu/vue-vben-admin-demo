import type { Component } from 'vue';

import type { CustomComponentType } from './types';

import { getFileNameWithoutExtension, toPascalCase } from '#/util/tool';

const componentMap = new Map<CustomComponentType | string, Component>();
// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob(
  ['./components/**/*.vue', '../../views/**/components/form/*.vue'],
  { eager: true },
);
// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  if (!key.includes('-ignore')) {
    const mod = (modules as any)[key].default || {};
    // ./components/ApiDict.vue
    // 获取ApiDict
    const compName = getFileNameWithoutExtension(key);
    componentMap.set(toPascalCase(compName), mod);
  }
});
/**
 * 注册组件
 * @param components
 */
export const registerComponent = (components: any) => {
  componentMap.forEach((value, key) => {
    components[key] = value as Component;
  });
};
export { componentMap };
