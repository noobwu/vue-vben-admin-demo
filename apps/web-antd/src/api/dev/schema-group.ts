import { requestClient } from '#/api/request';

/**
 * 分页查询模型分组列表
 * @param data
 */
export async function devSchemaGroupPage(data: any) {
  return requestClient.post<any>('/dev/schemaGroup/page', data);
}
/**
 * 添加模型分组
 * @param data 参数
 */
export async function devSchemaGroupSave(data: any) {
  return requestClient.post('/dev/schemaGroup/save', data);
}
/**
 * 修改模型分组
 * @param data 参数
 */
export async function devSchemaGroupUpdate(data: any) {
  return requestClient.post('/dev/schemaGroup/update', data);
}
/**
 * 删除模型分组
 * @param data 参数
 */
export async function devSchemaGroupRemove(data: any) {
  return requestClient.post('/dev/schemaGroup/remove', data);
}
/**
 * 模型分组详情
 * @param data 参数
 */
export async function devSchemaGroupDetail(data: any) {
  return requestClient.post('/dev/schemaGroup/detail', data);
}
