
const  dev = 'weixin';
const  appId = 0;

const  apiUrl 	 = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:81/' :'https://api.vipcard.cloud/';

const  staticUrl = 'https://img.vipcard.cloud/';


export default {
	appId,
	dev,
	apiUrl,
	staticUrl,
}