import axios, { AxiosRequestHeaders, Method } from 'axios';

export const axiosFetch = async (
  url: string,
  method: Method='POST',
  headers: AxiosRequestHeaders = {},
  params: string = '',
) => {
  try {
    const res = await axios.request({ headers, url, params, method });
    if (res.status == 200) {
      return res.data;
    }
  } catch (e) {
    throw e;
  }
};
