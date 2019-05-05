import request from '@/plugins/axios'
export function postWechat(data){return request({url: '/api1/wechat ',method:'post',data})}export function postWechatAddAppchat(data){return request({url: '/api1/wechat/addAppchat ',method:'post',data})}export function getWechatAll(){return request({url: '/api1/wechat/all ',method:'get',})}export function getWechatDepartmentByWechatId(wechatId,){return request({url: `/api1/wechat/department/${wechatId} `,method:'get',})}export function putWechatEditAppchat(data){return request({url: '/api1/wechat/editAppchat ',method:'put',data})}export function deleteWechatEnabledByWechatIdByEnabledId(wechatId,enabledId,){return request({url: `/api1/wechat/enabled/${wechatId}/${enabledId} `,method:'delete',})}export function getWechatGetAppchat(data){return request({url: '/api1/wechat/getAppchat ',method:'get',data})}export function getWechatIdByWechatId(wechatId,){return request({url: `/api1/wechat/id/${wechatId} `,method:'get',})}export function getWechatUserByWechatId(wechatId,){return request({url: `/api1/wechat/user/${wechatId} `,method:'get',})}export function deleteWechatByWechatId(wechatId,){return request({url: `/api1/wechat/${wechatId} `,method:'delete',})}