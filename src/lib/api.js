import superagent from 'superagent';
import cookies from 'react-cookies';
import * as utils from './utils.js';

const production = !!window.location.host.match(/ccs/);

let base = production ? 'http://api.shredfellows.ccs.net/api/v1' : 'http://localhost:3000/api/v1';

export const get = async payload => {
    
  let url = base + '/' + Object.values(payload).join('/');
  let token = cookies.load('Token');
  console.log(payload);
  if (payload.model === 'github') {
    
    let data = await utils.fetchData(url);
    console.log('data from api.get', data);
    return data;
  }
  else if (token) {
    
    let token = document.cookie.split('Token=')[1];
    let data = await superagent.get(url)
      .set('Authorization', `Bearer ${token}`);
    console.log('data from api.get', data);
    return data.body;
  }

};

export const post = async payload => {
  console.log({payload});
  let {endpoint, body} = payload;
  let url = base + '/' + endpoint;

  let token = cookies.load('Token');
  if (token) {
    if (endpoint === 'code') {
      let code = { code: body };

      let data = await superagent.post(url)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(code));
            
      return data.body;
            
    } else {

      let data = await superagent.post(url)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type','application/json')
        .send(JSON.stringify(body));
    
      return data.body;

    }
  }
};
export const put = async payload => {

  console.log({ payload });
  let { endpoint, body } = payload;
  let url = base + '/' + endpoint;

  let token = cookies.load('Token');
    
  if (token) {
    let data = await superagent.put(url)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(body));

    return data.body;
  }
  else {

    let code = { code: body };

    let data = await superagent.post(url)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(code));

    return data.body;
  }
};

export const login = async payload => {
  let token = payload;
  let url = base.split('/api/v1')[0] + '/login';
  let data = await superagent.get(url)
    .set('Authorization', `Bearer ${token}`);

  return data.body;
};
