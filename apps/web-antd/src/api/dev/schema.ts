import { requestClient } from '#/api/request';

/**
 * 分页查询数据模型列表
 * @param data
 */
export async function devSchemaPage(data: any) {
  return requestClient.post<any>('/dev/schema/page', data);
}
/**
 * 添加数据模型
 * @param data 参数
 */
export async function devSchemaSave(data: any) {
  return requestClient.post('/dev/schema/save', data);
}
/**
 * 修改数据模型
 * @param data 参数
 */
export async function devSchemaUpdate(data: any) {
  return requestClient.post('/dev/schema/update', data);
}
/**
 * 删除数据模型
 * @param data 参数
 */
export async function devSchemaRemove(data: any) {
  return requestClient.post('/dev/schema/remove', data);
}
/**
 * 数据模型详情
 * @param data 参数
 */
export async function devSchemaDetail(data: any) {
  return requestClient.post('/dev/schema/detail', data);
}
/**
 * 根表名称获取元数据
 * @param data 参数
 */
export async function devSchemaGetByTableName(data: any) {
  return requestClient.get('/dev/schema/getByTableName', {
    params: data,
  });
}
/**
 * 导入表
 * @param data 参数
 */
export async function devSchemaImportTable(data: any) {
  return requestClient.post('/dev/schema/importTable', data);
}
/**
 * 获取数据库树
 * @param data 参数
 */
export async function devSchemaDbTable(data: any) {
  return requestClient.post('/dev/schema/dbTable', data);
}
/**
 * 修改数据模型列表字段
 * @param data 参数
 */
export async function updateListKeys(data: any) {
  return requestClient.post('/dev/schema/updateListKeys', data);
}
/**
 * 修改数据模型搜索表单字段
 * @param data 参数
 */
export async function updateSearchFormKeys(data: any) {
  return requestClient.post('/dev/schema/updateSearchFormKeys', data);
}
