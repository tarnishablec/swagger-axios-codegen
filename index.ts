import * as fs from 'fs'
import axios from 'axios'
import * as YAML from 'yaml'

const swaggerApis = YAML.parse(fs.readFileSync('./bootstrap.yml', 'utf8')).apis;

run();

function run() {
	for (let swaggerApi of swaggerApis) {
		if (!swaggerApi.url) {
			break;
		}
		let dir = "./target/" + swaggerApi.name;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		axios.get(swaggerApi.url).then(res => {
			handleSwagger(res.data, dir, swaggerApi.name, swaggerApi.prepend);
		}).catch()
	}
}

function handleSwagger(data, dir, name, prepend) {
	let host = data.host + data.basePath;
	let paths = data.paths;
	let apis = [];

	for (let key in paths) {
		let u = key.toString().replace(/{/g, '${');
		let ms = Object.keys(paths[key]);
		for (let m of ms) {
			let a: any = {url: u, method: m, host: host, prepend: prepend};
			if (paths[key][m].parameters !== undefined) {
				a.params = new Array<String>();
				for (let param of paths[key][m].parameters) {
					// console.log(param['in']);
					if (param['in'] === 'body') {
						a.data = '1'
					}
					if (param['in'] === 'query') {
						// console.log(param.name);
						a.params.push(param['name'])
					}
				}
			}
			apis.push(a);
		}
	}

	const fileHead = `import request from '@/plugins/axios'\n\n//host:${host}\n\n`;
	const re = /^\/([a-z]+)(?:(?:\b|\/)|[A-Z]+)/;
	let pres = new Map<string, Array<any>>();

	for (let api of apis) {
		// console.log(api);
		let fileName = re.exec(api.url)[1];

		if (!pres.has(fileName)) {
			pres.set(fileName, []);
		}

		let val = pres.get(fileName);
		pres.set(fileName, val.concat(api));
	}


	pres.forEach((pre, key) => {
		let content: string = '';
		for (let a of pre) {
			content = content.concat(buildApi(a))
		}
		fs.writeFileSync(dir + '/' + key + '.js', fileHead + '' + content)
	});

}

function buildApi(api: any) {
	let tempUrl = api.url.replace(/\$/g, 'By');

	tempUrl = cleanString(tempUrl).replace(/(([\/{])|})/g, '');

	let re = /{([a-zA-Z]+)}/g;
	let ar: Array<string> = api.url.match(re);
	// console.log(ar)
	let paramStr = api.params ? `params:{${array2String(api.params)}},` : '';
	return `export function ${api.method}${tempUrl}(${(!!api.params) ? array2String(api.params) : ''}${!!ar ? array2String(ar) : ''}${(!!api.data) ? 'data' : ''}){return request({url: ${!!ar ? '\`' : '\''}http://${api.prepend ? api.prepend : api.host}${api.url}${!!ar ? '\`' : '\''},method:'${api.method}',${(!!api.data) ? 'data,' : ''}${paramStr}}).then(res => {
		return res.data
	})}`;
}

function array2String(ar: Array<String>) {
	let str = '';
	for (let i of ar) {
		str = str.concat(i + ",");
	}
	return str.replace(/([{}])/g, '');
}

function cleanString(str: string) {
	let arr = str.split(/\W/);
	let arr2 = str.split(/\//).reverse();
	let prep = [];
	let num = checkVars(arr2);
	if (num > 0) {
		for (let i = 0; i < num; i++) {
			prep.push(arr.pop());
		}
		prep.reverse();
		prep = prep.concat('From');

		arr.splice(0, 0, ...prep);
	}


	for (let i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).replace(/_/, '');
	}
	return arr.join('');
}

function checkVars(arr: Array<string>) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].match(/{/)) {
			return i;
		}
	}
}


