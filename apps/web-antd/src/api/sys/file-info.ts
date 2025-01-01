import { requestClient } from '#/api/request';

/**
 * 文件上传
 * @param data
 */
export async function uploadFile(data: any) {
  return requestClient.upload('/sys/fileInfo/upload', data);
}
/**
 * 通过文件id集合获取文件信息
 * @param data
 */
export async function getFileInfoByIds(data: any) {
  return requestClient.post('/sys/fileInfo/getFileInfoByIds', data);
}
