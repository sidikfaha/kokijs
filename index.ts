import { Axios, AxiosRequestConfig } from "axios";
import { hash, getCache } from "./helpers";

export class Koki {
  private _isCacheActive: boolean = false;
  private _axios: Axios;

  constructor(config: AxiosRequestConfig) {
    this._axios = new Axios(config);
  }

  cache(): Koki {
    this._isCacheActive = true;
    return this;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const key = hash(url);
    if (this._isCacheActive) {
      return getCache(key) as T;
    }
    const response = await this._axios.get<T>(url, config);
    if (this._isCacheActive) {
      localStorage.setItem(key, JSON.stringify(response.data));
    }
    return response.data as T;
  }
}
