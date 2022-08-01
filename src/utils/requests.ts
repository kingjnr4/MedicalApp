import got, {Headers} from 'got';

export async function post(url: string, headers: Headers, body: string = '') {
  try {
    console.log(body);
    
    const res = await got(url, {method: 'POST', headers, body,throwHttpErrors:false});
    if (res.statusCode>199 && res.statusCode<300) {
      const data = JSON.parse(res.body);
      return data;
    }
    console.log(res.body
    );
    
    return null;
  } catch (e) {
   console.log(e);
   
  }
}
