import axios, { AxiosRequestHeaders, Method } from 'axios';
import { HttpException } from '../exceptions/HttpException';

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
    return null
  } catch (e) {
    throw new HttpException(401,"axios")
  }
};
