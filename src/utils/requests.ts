import got, {Headers} from 'got';

export async function post(url: string, headers: Headers, body: string = '') {
  try {
    console.log(body);
    const res = await got(url, {method: 'POST', headers, body,throwHttpErrors:false});
     console.log(res.statusMessage);
    if (res.statusCode>199 && res.statusCode<300) {
      const data = JSON.parse(res.body);
      return data;
    }
    return null;
  } catch (e) {   
  }
}

export async function put(url: string, headers: Headers, body: string = '') {
  try {
    console.log(body);
    const res = await got(url, {
      method: 'put',
      headers,
      body,
      throwHttpErrors: false,
    });
    console.log(res.body);
    if (res.statusCode > 199 && res.statusCode < 300) {
      const data = JSON.parse(res.body);
      return data;
    }
    return null;
  } catch (e) {}
}