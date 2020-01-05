import request from '../../src/index';

// request({
//   method: 'post',
//   url: '/base',
//   data: {
//     id: 1,
//     content: {
//       a: 1,
//       b: 1
//     }
//   }
// });

// request({
//   method: 'post',
//   url: '/base',
//   headers: {
//     'content-type': 'application/json;charset=utf-8'
//   },
//   data: {
//     id: 1,
//     content: {
//       a: 1,
//       b: 1
//     }
//   }
// });

// request({
//   method: 'post',
//   url: '/base',
//   headers: {
//     'content-type': 'application/json;',
//     Accept: 'application/json, text/plain , */*'
//   },
//   data: {}
// });

// const paramsString = 'q=URLUtils.searchParams&topic=api';
// const searchParams = new URLSearchParams(paramsString);

// request({
//   method: 'post',
//   url: '/base',
//   data: searchParams
// });

request({
  method: 'post',
  url: '/base',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res);
});

request({
  method: 'post',
  url: '/base',
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res);
});
