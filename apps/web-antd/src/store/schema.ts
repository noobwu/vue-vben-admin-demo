import { defineStore } from 'pinia';

import { devSchemaGetByTableName } from '#/api/dev/schema';

const toComponentProps = (column: any) => {
  const componentProps = {} as any;
  // 组件属性的配置规则为 组件名_属性名
  Object.keys(column.ext)
    .filter((item) => {
      return item.startsWith(`${column.component}_`);
    })
    .forEach((item) => {
      componentProps[item.replace(`${column.component}_`, '')] =
        column.ext[item];
    });
  componentProps.placeholder =
    column.ext?.placeholder || `请输入${column.remark}`;
  if (
    [
      'ApiCascader',
      'ApiDict',
      'ApiSelect',
      'ApiTreeSelect',
      'AutoComplete',
      'Select',
      'Upload',
    ].includes(column.component)
  ) {
    componentProps.placeholder =
      column.ext?.placeholder || `请选择${column.remark}`;
  }
  if (column.component === 'RangePicker') {
    componentProps.placeholder = column.placeholder
      ? column.ext.placeholder.split(',')
      : ['开始日期', '结束日期'];
  } else if (column.component === 'CustomComponent') {
    // 自定义组件需要特殊处理
    column.component = componentProps.componentName;
    delete componentProps.componentName;
  } else if (
    column.component === 'Switch' &&
    componentProps.dataType === 'number'
  ) {
    componentProps.unCheckedValue = Number(componentProps.unCheckedValue || 0);
    componentProps.checkedValue = Number(componentProps.checkedValue || 1);
  }
  if (column.component === 'Select') {
    componentProps.class = 'w-full';
  }
  if (column.ext.popupContainerInBody) {
    componentProps.getPopupContainer = () => document.body;
  }
  return componentProps;
};
interface SchemaState {
  cache: any; // 元数据缓存
}
export const useSchemaStore = defineStore({
  id: 'app-schema',
  state: (): SchemaState => ({
    cache: {},
  }),
  getters: {
    getSchema(state) {
      return (code: string) => {
        const schema: any = state.cache[code] || {};
        if (Object.keys(schema).length > 0) {
          return {
            wrapperClass: 'grid-cols-12', // 24栅格,
            commonConfig: {
              formItemClass: 'col-span-12',
            },
            schema: schema.columns
              .filter((item: any) => item.ext.addHide !== true)
              .map((item: any) => {
                const componentProps = toComponentProps(item);
                const res: any = {
                  fieldName: item.fieldCamelName,
                  label: item.remark,
                  component: item.component,
                  componentProps,
                  help: item.ext.help || undefined,
                  formItemClass: item.ext.span
                    ? `col-span-${Number(item.ext.span) / 2}`
                    : 'col-span-12',
                  detailSpan: item.ext.span ? Number(item.ext.span) / 2 : 12,
                  ifDetail() {
                    return !item.ext?.viewHide;
                  },
                };
                // 处理隐藏域
                if (
                  item.fieldCamelName === 'id' ||
                  (item.component === 'Input' &&
                    componentProps.type === 'hidden')
                ) {
                  res.dependencies = {
                    show: false,
                    triggerFields: [item.fieldCamelName],
                  };
                }
                // 处理必填校验
                if (item.ext.required === 1) {
                  res.rules = 'required';
                }
                // 默认值处理
                if (item.defaultValue) {
                  if (item.dataType === '12') {
                    // 整形
                    res.defaultValue = Number(item.defaultValue);
                  } else if (item.dataType === '30') {
                    // 对象
                    res.defaultValue = JSON.parse(item.defaultValue);
                  }
                }
                if (res.component === 'Divider') {
                  // 分割线
                  return {
                    ...res,
                    formItemClass: 'col-span-12',
                    hideLabel: true,
                    renderComponentContent: () => {
                      return {
                        default: () => {
                          return item.remark;
                        },
                      };
                    },
                  };
                } else if (res.component === 'CustomComponent') {
                  // 如果为自定义组件，则读取配置
                  res.component = item.ext.CustomComponent_componentName;
                  res.componentProps = {
                    ...res.componentProps,
                    ...JSON.parse(item.ext.CustomComponent_params || '{}'),
                  };
                }
                return res;
              }),
          };
        }
        return schema;
      };
    },
  },
  actions: {
    requestData(code: string) {
      if (!code) return Promise.resolve({});
      return new Promise((resolve, reject) => {
        let dictData = this.cache[code];
        if (dictData) {
          let maxTime = 1000;
          const timerFun = () => {
            dictData = this.cache[code];
            if (dictData.length > 0) {
              resolve(dictData);
            } else {
              maxTime--;
              if (maxTime <= 0) {
                resolve(dictData);
              } else {
                setTimeout(() => {
                  timerFun();
                }, 100);
              }
            }
          };
          timerFun();
          return;
        }
        this.cache[code] = {};
        devSchemaGetByTableName({
          tableName: code,
        })
          .then((res) => {
            this.cache[code] = res;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete this.cache[code];
          });
      });
    },
  },
});
