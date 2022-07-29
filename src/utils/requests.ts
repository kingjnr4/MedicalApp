
import got, { Headers } from 'got'


export async function post(
  url: string,
  headers: Headers,
  body: string = '',
) {
  try {
    const res = await got(url, {method:'POST',headers,body});
    if (res.statusCode == 200) {
      const data = JSON.parse(res.body)
      return data
    }
    return null;
  } catch (e) {
  }
};
