import { requestClient } from '#/api/request';

/**
 * 分页查询模型字段列表
 * @param data
 */
export async function devSchemaFieldPage(data: any) {
  return requestClient.post<any>('/dev/schemaField/page', data);
}
/**
 * 添加模型字段
 * @param data 参数
 */
export async function devSchemaFieldSave(data: any) {
  return requestClient.post('/dev/schemaField/save', data);
}
/**
 * 修改模型字段
 * @param data 参数
 */
export async function devSchemaFieldUpdate(data: any) {
  return requestClient.post('/dev/schemaField/update', data);
}
/**
 * 删除模型字段
 * @param data 参数
 */
export async function devSchemaFieldRemove(data: any) {
  return requestClient.post('/dev/schemaField/remove', data);
}
/**
 * 模型字段详情
 * @param data 参数
 */
export async function devSchemaFieldDetail(data: any) {
  return requestClient.post('/dev/schemaField/detail', data);
}
/**
 * 更新模型字段排序
 * @param data 参数
 */
export async function updateSort(data: any) {
  return requestClient.post('/dev/schemaField/updateSort', data);
}
