import request from '@/plugins/axios'

//host:api.instagram.com/v1

export function getUsersSearch(params,){
 return request({url: `http://api.instagram.com/v1/users/search`,method:'get',params,}).then(res => {
		return res.data
	})}
export function getUsersSelfFeed(params,){
 return request({url: `http://api.instagram.com/v1/users/self/feed`,method:'get',params,}).then(res => {
		return res.data
	})}
export function getSelfMediaLikedFromUsers(params,){
 return request({url: `http://api.instagram.com/v1/users/self/media/liked`,method:'get',params,}).then(res => {
		return res.data
	})}
export function getSelfRequestedByFromUsers(){
 return request({url: `http://api.instagram.com/v1/users/self/requested-by`,method:'get',}).then(res => {
		return res.data
	})}
export function getUsersByUserid(user_id,){
 return request({url: `http://api.instagram.com/v1/users/${user_id}`,method:'get',}).then(res => {
		return res.data
	})}
export function getByFromUsersByUseridFollowed(user_id,){
 return request({url: `http://api.instagram.com/v1/users/${user_id}/followed-by`,method:'get',}).then(res => {
		return res.data
	})}
export function getFollowsFromUsersByUserid(user_id,){
 return request({url: `http://api.instagram.com/v1/users/${user_id}/follows`,method:'get',}).then(res => {
		return res.data
	})}
export function getMediaRecentFromUsersByUserid(user_id,params,){
 return request({url: `http://api.instagram.com/v1/users/${user_id}/media/recent`,method:'get',params,}).then(res => {
		return res.data
	})}
export function getRelationshipFromUsersByUserid(user_id,){
 return request({url: `http://api.instagram.com/v1/users/${user_id}/relationship`,method:'get',}).then(res => {
		return res.data
	})}
export function postRelationshipFromUsersByUserid(user_id,params,){
 return request({url: `http://api.instagram.com/v1/users/${user_id}/relationship`,method:'post',params,}).then(res => {
		return res.data
	})}
