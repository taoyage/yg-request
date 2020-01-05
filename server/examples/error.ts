import request, { ResponseError } from '../../src/index';

// request({
//   method: 'get',
//   url: '/error'
// })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(e => {
//     console.log(e);
//   });

// request({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(e => {
//     console.log(123, e);
//   });

setTimeout(() => {
  request({
    method: 'get',
    url: '/error'
  })
    .then(res => {
      console.log(res);
    })
    .catch((e: ResponseError) => {
      console.log(e.message);
      console.log(e.config);
      console.log(e.code);
      console.log(e.request);
    });
}, 5000);

// request({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(e => {
//     console.log(e.message);
//     console.log(e.config);
//     console.log(e.code);
//     console.log(e.request);
//     console.log(e.isrequestError);
//   });
