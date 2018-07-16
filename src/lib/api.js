// import superagent from 'superagent';
import * as utils from './utils.js';

const dev = false;

let base = dev ? 'http://localhost:3000/api/v1' : 'https://shred-fellows-server.herokuapp.com/api/v1';

export const get = async payload => {
    let url = base + '/' + Object.values(payload).join('/');
    let data = await utils.fetchData(url);
    console.log(data);
}