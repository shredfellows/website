import superagent from 'superagent';
import * as utils from './utils.js';

const dev = false;

let base = dev ? 'http://localhost:3000/api/v1' : 'https://shred-fellows-server.herokuapp.com/api/v1';

export const get = async payload => {
    let url = base + '/' + Object.values(payload).join('/');
    let data = await utils.fetchData(url);
    return data;
    // console.log('ding!', Object.values(data));
}

export const post = async payload => {
    let {endpoint, body} = payload;
    let url = base + '/' + endpoint;
    let code = {code:body}

    let data = await superagent.post(url)
        .set('Content-Type','application/json')
        .send(JSON.stringify(code));
   
    return data.body;
}