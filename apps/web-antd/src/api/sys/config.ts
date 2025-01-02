import { requestClient } from '#/api/request';

/**
 * 分页查询参数配置列表
 * @param data
 */
export async function sysConfigPage(data: any) {
  return requestClient.get<any>('/sys/config/page', { params: data });
}
/**
 * 添加参数配置
 * @param data 参数
 */
export async function sysConfigSave(data: any) {
  return requestClient.post('/sys/config/save', data);
}
/**
 * 修改参数配置
 * @param data 参数
 */
export async function sysConfigUpdate(data: any) {
  return requestClient.post('/sys/config/update', data);
}
/**
 * 删除参数配置
 * @param data 参数
 */
export async function sysConfigRemove(data: any) {
  return requestClient.post('/sys/config/remove', data);
}
/**
 * 参数配置详情
 * @param data 参数
 */
export async function sysConfigDetail(data: any) {
  return requestClient.post('/sys/config/detail', data);
}
