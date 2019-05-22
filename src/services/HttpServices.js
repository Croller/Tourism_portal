import axios from "axios";

export default {
  get: function (url) {
    let data = {
      headers: {},
      method: "get",
      url: url
    };
    return this.request(data);
  },
  post: function (url, msg) {
    let data = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "post",
      url: url,
      data: msg
    };
    return this.request(data);
  },
  request: function (data) {
    return axios(data).catch(err => {
      console.log(err)
    });
  }
};
