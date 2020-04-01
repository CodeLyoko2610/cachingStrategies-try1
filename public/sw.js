var CACHE_STATIC_NAME = 'static-v3';
var CACHE_DYNAMIC_NAME = 'dynamic-v2';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
    .then(function (cache) {
      cache.addAll([
        '/',
        '/index.html',
        '/src/css/app.css',
        '/src/css/main.css',
        '/src/js/main.js',
        '/src/js/material.min.js',
        'https://fonts.googleapis.com/css?family=Roboto:400,700',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
      ]);
    })
  )
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
    .then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});


//1. [cache with network fallback] Caching strategy
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request)
//     .then(function (response) {
//       if (response) {
//         return response;
//       } else {
//         return fetch(event.request)
//           .then(function (res) {
//             return caches.open(CACHE_DYNAMIC_NAME)
//               .then(function (cache) {
//                 cache.put(event.request.url, res.clone());
//                 return res;
//               });
//           })
//           .catch(function (err) {

//           });
//       }
//     })
//   );
// });

//2. [Network-only] Caching strategy
//not work without network
// self.addEventListener(function (event) {
//   event.respondWith(
//     fetch(event.request)
//   )
// })

//3. [Cache-only] Caching strategy
//Pages cached before can work without network, others cannot
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request.url)
//     .then(function (response) {
//       return response;
//     })
//   )
// })

//4. [Network, with cache fallback] Caching strategy
//Work offline with pages cached before, dynamic caching new pages for later offline support
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     //Reach out to the network
//     fetch(event.request)
//     .then(function (response) {
//       //If response okay - use network      
//       //Add dynamic caching
//       return caches.open(CACHE_DYNAMIC_NAME)
//         .then(function (cache) {
//           cache.put(event.request.url, response.clone());
//           console.log('[SW] Served from the network.');
//           return response;
//         })
//     })
//     //Cache fallback when network fails
//     .catch(function (err) {
//       return caches.match(event.request)
//         .then(function (res) {
//           console.log('[SW] Served from the cache.');
//           return res;
//         })
//     })
//   )
// })

//5. [Cache then network] Caching strategy

self.addEventListener('fetch',
  function (event) {
    //[Cache then network for url requested from main.js]
    let url = 'https://httpbin.org/ip';
    if (event.request.url.indexOf(url) > -1) {
      event.respondWith(
        fetch(event.request.url)
        .then(function (response) {
          if (response) {
            //Update cached url and its response
            return caches.open(CACHE_DYNAMIC_NAME)
              .then(function (cache) {
                cache.put(event.request.url, response.clone());
                return response;
              })
          }
        })
      )
    }
  })