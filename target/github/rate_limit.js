import request from '@/plugins/axios'

//host:api.github.com

export function getRatelimitFrom(){
 return request({url: `http://api.github.com/rate_limit`,method:'get',}).then(res => {
		return res.data
	})}
