var box = document.querySelector('.box');
var button = document.querySelector('button');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function () {
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
    servedFromNetwork = true;
    console.log('Served from network: ', data.origin);
    box.style.height = data.origin.substr(0, 2) * 5 + 'px';
  });

//5.1 Fetch url from cache
if ('caches' in window) {
  caches
    .match(url)
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
        box.style.height = data.origin.substr(0, 2) * 20 + 'px';
      }
    });
}

// Important: Clear your Application Storage first to get rid of the old SW & Cache from the Main Course Project!