const baseUrl = "https://pcapi-xiaotuxian-front-devtest.itheima.net";

const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith("http")) {
      options.url = baseUrl + options.url;
      options.header = {
        "source-client": "miniapp",
      };
    }
  },
};

uni.addInterceptor("request", httpInterceptor);
uni.addInterceptor("request", httpInterceptor);

type Data<T> = {
  code: string;
  msg: string;
  result: T;
};

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>);
        } else if (res.statusCode === 401) {
          reject(res);
        } else {
          uni.showToast({
            icon: "none",
            title: (res.data as Data<T>).msg || "请求错误",
          });
          reject(res);
        }
      },

      fail(err) {
        uni.showToast({
          icon: "none",
          title: "网络错误",
        });
        reject(err);
      },
    });
  });
};
