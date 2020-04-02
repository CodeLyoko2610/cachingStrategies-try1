var box = document.querySelector('.box');
var button = document.querySelector('button');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Registered Service Worker!');
    });
}

button.addEventListener('click', function (event) {
  if (box.classList.contains('visible')) {
    box.classList.remove('visible');
  } else {
    box.classList.add('visible');
  }
});

//5. [Cache then network] Caching strategy
let url = 'https://httpbin.org/ip';
let servedFromNetwork = false;

//5.1.0 Fetch url from network
fetch(url)
  .then(function (res) {
    //Fetch returns a promise, regardless of sucess or failure
    //Need not to check
    return res.json();
  })
  .then(function (data) {
    servedFromNetwork = true
    console.log('Served from network: ', data.origin);
    box.style.height = (data.origin.substr(0, 2) * 5) + 'px';
  });

//5.1 Fetch url from cache
if ('caches' in window) {
  caches.match(url)
    .then(function (res) {
      //Match returns a promise resolves to success when succeeded or to undefined when fail
      //Only continues if the promise resolves to success 
      if (res) {
        return res.json();
      }
    })
    .then(function (data) {
      if (!servedFromNetwork) {
        console.log('Served from cache: ', data.origin);
        box.style.height = (data.origin.substr(0, 2) * 5) + 'px';
      }
    })
}



// 1) Identify the strategy we currently use in the Service Worker (for caching)
// Caching Strategy: cache with network fallback

// 2) Replace it with a "Network only" strategy => Clear Storage (in Dev Tools), reload & try using your app offline

// 3) Replace it with a "Cache only" strategy => Clear Storage (in Dev Tools), reload & try using your app offline

// 4) Replace it with "Network, cache fallback" strategy =>  => Clear Storage (in Dev Tools), reload & try using your app offline
// 5) Replace it with a "Cache, then network" strategy => Clear Storage (in Dev Tools), reload & try using your app offline

// 6) Add "Routing"/ URL Parsing to pick the right strategies: Try to implement "Cache, then network", "Cache with network fallback" and "Cache only" (all of these, with appropriate URL selection)

// Important: Clear your Application Storage first to get rid of the old SW & Cache from the Main Course Project!