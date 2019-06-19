import request from '@/plugins/axios'

//host:api.github.com

export function getEventsFromNetworksByOwnerByRepo(owner,repo,){
 return request({url: `http://api.github.com/networks/${owner}/${repo}/events`,method:'get',}).then(res => {
		return res.data
	})}
