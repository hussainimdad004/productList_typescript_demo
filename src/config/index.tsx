import axios from 'axios';
const _TIME_OUT = 15000

export default class WebApi {

    _BASE_URL = "https://my-json-server.typicode.com/"

    GET_PRODUCT_LIST = "benirvingplt/products/products"

    async sendGetRequest( _url: string | string[] | null,) {
        _url = this._BASE_URL + _url;
        console.log('___url', _url)

        if (_url.indexOf('?') >= 0) {
            _url = _url + '&' + 'ts=' + Date.now().toString();
        } else {
            _url = _url + '?' + 'ts=' + Date.now().toString();
        }



        try {
            let response = await axios.get(_url, {
                timeout: _TIME_OUT
            });

            console.log("API call success GET", _url, "response: ", response)
            return response;
        } catch (error) {
            console.log("catch error on ", _url, " call fail", error)
            return error;
        }
    }

    getProductList(){
      let url = this.GET_PRODUCT_LIST;
      return this.sendGetRequest(url);
    }
    
}
