import request from '@/plugins/axios'
export function postMail(data){return request({url: '/api1/mail ',method:'post',data})}export function getMailAll(){return request({url: '/api1/mail/all ',method:'get',})}export function getMailIdByEmailId(emailId,){return request({url: `/api1/mail/id/${emailId} `,method:'get',})}export function deleteMailByEmailId(emailId,){return request({url: `/api1/mail/${emailId} `,method:'delete',})}