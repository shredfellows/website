    
/**
     * Enviroment variables required for github authorization.
     */
const ENV = {};

ENV.isProduction = !!window.location.host.match(/ccs/);
ENV.productionApiUrl = 'http://api.shredfellows.ccs.net';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiURL = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

let githubURL = 'https://github.com/login/oauth/authorize';

let clientId = ENV.isProduction ? '4476386c411872159ea9' : '0cdef2d78c2a55ed9343';

let options = {
  client_id: clientId,
  scope: 'user,user:email',
  redirect_uri: `${ENV.apiURL}/oauth`,
};

let QueryString = Object.keys(options).map(key => {
  return `${key}=` + encodeURIComponent(options[key]);
}).join('&');

export const authURL = `${githubURL}?${QueryString}`;
