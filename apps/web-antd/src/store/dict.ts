import { defineStore } from 'pinia';

import { requestClient } from '#/api/request';

const getByDictType = (params: any) => {
  return requestClient.post('/sys/dict/getByDictType', params);
};
interface DictState {
  cache: any; // 字典数据缓存
  selectDataCache: any; // 下拉数据缓存
}
export const useDictStore = defineStore({
  id: 'app-dict',
  state: (): DictState => ({
    cache: {},
    selectDataCache: {},
  }),
  getters: {
    getDictData(state) {
      return (code: string) => {
        return state.cache[code] || [];
      };
    },
    getSelectData(state) {
      return (cacheKey: string, params: any) => {
        const newCacheKey = cacheKey + JSON.stringify(params).toString();
        return state.selectDataCache[newCacheKey] || [];
      };
    },
  },
  actions: {
    requestData(code: string) {
      if (!code) return Promise.resolve([]);
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
        this.cache[code] = [];
        getByDictType({
          dictType: code,
        })
          .then((res) => {
            if (res.length > 0) {
              this.cache[code] = res;
            } else {
              // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
              delete this.cache[code];
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete this.cache[code];
          });
      });
    },
    /**
     * 下拉数据
     * @param api 请求接口对象
     * @param params 请求参数
     * @param cacheKey 缓存key
     */
    select(api: (...arg: any) => Promise<any>, params: any, cacheKey: string) {
      return new Promise((resolve, reject) => {
        const newCacheKey = cacheKey + JSON.stringify(params).toString();
        const selectData = this.selectDataCache[newCacheKey];
        if (selectData) {
          resolve(selectData);
          return;
        }
        this.selectDataCache[newCacheKey] = [];
        api(params)
          .then((res) => {
            if (res.length > 0) {
              this.selectDataCache[newCacheKey] = res;
            } else {
              // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
              delete this.selectDataCache[newCacheKey];
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete this.selectDataCache[newCacheKey];
          });
      });
    },
  },
});
