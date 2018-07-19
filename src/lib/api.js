import superagent from 'superagent';
import * as utils from './utils.js';

const dev = true;

let base = dev ? 'http://localhost:3000/api/v1' : 'https://shred-fellows-server.herokuapp.com/api/v1';

export const get = async payload => {
    
    let url = base + '/' + Object.values(payload).join('/');
    console.log({payload});
    if(payload.model==='github'){
        let data = await utils.fetchData(url);
        return data;
    }
    else if(document.cookie && document.cookie.match(/token/i)){
        let token = document.cookie.split('Token=')[1];
        let data = await superagent.get(url)
        .set('Authorization', `Bearer ${token}`);
        return data.body;
    }

}

export const post = async payload => {
    console.log({payload});
    let {endpoint, body} = payload;
    let url = base + '/' + endpoint;

    if(document.cookie && document.cookie.match(/token/i)){
        let token = document.cookie.split('Token=')[1];
        let data = await superagent.post(url)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type','application/json')
        .send(body);

        return data.body;
    }
    else{
    //This isn't generic enough!!
    let code = {code:body}

    let data = await superagent.post(url)
        .set('Content-Type','application/json')
        .send(JSON.stringify(code));
    
    return data.body;
    }
}

export const login = async payload => {
    let token = payload;
    // let url = base.replace(/api\/v1\//,'')+'/login';
    let url = base.split('/api/v1')[0]+'/login';
    let data = await superagent.get(url)
        .set('Authorization', `Bearer ${token}`);

        return data.body;
}