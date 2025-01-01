import { requestClient } from '#/api/request';

/**
 * 分页查询用户列表
 * @param data
 */
export async function sysUserPage(data: any) {
  return requestClient.post<any>('/sys/user/page', data);
}
/**
 * 添加用户
 * @param data 参数
 */
export async function sysUserSave(data: any) {
  return requestClient.post('/sys/user/save', data);
}
/**
 * 修改用户
 * @param data 参数
 */
export async function sysUserUpdate(data: any) {
  return requestClient.post('/sys/user/update', data);
}
/**
 * 删除用户
 * @param data 参数
 */
export async function sysUserRemove(data: any) {
  return requestClient.post('/sys/user/remove', data);
}
/**
 * 用户详情
 * @param data 参数
 */
export async function sysUserDetail(data: any) {
  return requestClient.post('/sys/user/detail', data);
}
/**
 * 重置密码
 * @param data 参数
 */
export async function resetPassword(data: any) {
  return requestClient.post('/sys/user/resetPassword', data);
}
/**
 * 扮演用户
 * @param data 参数
 */
export async function playUser(data: any) {
  return requestClient.post('/sys/playUser', data);
}
/**
 * 退出扮演
 * @param data 参数
 */
export async function unPlayUser(data: any) {
  return requestClient.post('/sys/unPlayUser', data);
}
/**
 * 授权角色
 * @param data 参数
 */
export async function grantRole(data: any) {
  return requestClient.post('/sys/user/grantRole', data);
}
/**
 * 锁定用户
 * @param data 参数
 */
export async function locked(data: any) {
  return requestClient.post('/sys/user/locked', data);
}
/**
 * 取消锁定用户
 * @param data 参数
 */
export async function unLocked(data: any) {
  return requestClient.post('/sys/user/unLocked', data);
}
/**
 * 修改头像-个人
 * @param data 参数
 */
export async function updateAvatar(data: any) {
  return requestClient.post('/sys/user/updateAvatar', data);
}
/**
 * 更新用户信息-个人
 * @param data 参数
 */
export async function updateInfo(data: any) {
  return requestClient.post('/sys/user/updateInfo', data);
}
/**
 * 更新用户密码-个人
 * @param data 参数
 */
export async function updatePwd(data: any) {
  return requestClient.post('/sys/user/updatePwd', data);
}
/**
 * 我的在线设备
 * @param data 参数
 */
export async function onlineDevice(data: any) {
  return requestClient.post('/sys/user/onlineDevice', data);
}
/**
 * 踢用户下线
 * @param data 参数
 */
export async function kickoutByTokenValue(data: any) {
  return requestClient.post('/sys/user/kickoutByTokenValue', data);
}
