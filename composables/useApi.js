const API_ENDPOINTS = {
    post:{
      postData:"/wp-json/wp/v2/posts"
    },
    page:{
      pageData:"/wp-json/wp/v2/pages"
    }
}
const NO_AUTH_API_ENDPOINTS = {
    user:{
      login:"/wp-json/api/v1/token"
    }
};
class Request {
    constructor() {
      this.baseURL = useRuntimeConfig().public.baseURL;
      this.accessToken = `Bearer ${useUserStore().userInfo.accessToken}`;
      this.headers = {};
      this.handleFetch = this.createHandleFetch();
    }
  
    createHandleFetch() {
      return {
        onRequest({ request, options }) {},
        onRequestError({ request, options, error }) {
          console.error("Request error: ", error.message);
        },
        onResponse({ request, response, options }) {},
        onResponseError({ request, response, options }) {
          useMessage().error(response._data?.message);
        },
      };
    }
  
    fetch(url, method, options) {
      if (this.accessToken) {
        this.headers = {
          "Content-type": "application/json",
          Authorization: this.accessToken,
        };
      } else {
        this.headers = {
          "Content-type": "application/json",
        };
      }
  
      return useFetch(url, {
        baseURL: this.baseURL,
        method: method,
        headers: this.headers,
        ...options,
        ...this.handleFetch,
      });
    }
  
    get(url, options) {
      return this.fetch(url, "GET", options);
    }
    post(url, options) {
      return this.fetch(url, "POST", options);
    }
    put(url, options) {
      return this.fetch(url, "PUT", options);
    }
    patch(url, options) {
      return this.fetch(url, "PATCH", options);
    }
    delete(url, options) {
      return this.fetch(url, "DELETE", options);
    }
  }

class UserManager{
  constructor(request) {
    this.request = request;
  }
  async login(data) {
    return this.request.post(NO_AUTH_API_ENDPOINTS.user.login, data);
  }
}
class CMSManager {
  constructor(request) {
    this.request = request;
  }
  async getPost(data) {
    return this.request.get(API_ENDPOINTS.post.postData, data);
  }
  async getPage(data) {
    return this.request.get(API_ENDPOINTS.page.pageData, data);
  }
}
class RestAPI {
    constructor() {
      this.request = new Request();
      this.user = new UserManager(this.request);
      this.cms = new CMSManager(this.request);
      this.API_ENDPOINTEXPORT = API_ENDPOINTS;
      this.API_NO_AUTH = NO_AUTH_API_ENDPOINTS;
    }
}
  
export default () => ({ restAPI: new RestAPI() });