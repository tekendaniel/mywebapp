importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);


workbox.routing.registerRoute(
new RegExp('.*\.js'),
workbox.strategies.networkFirst()
);


workbox.routing.registerRoute(
// Cache CSS files
/.*\.css/,
// Use cache but update in the background ASAP
workbox.strategies.staleWhileRevalidate({
// Use a custom cache name
cacheName: 'css-cache',
})
);


workbox.routing.registerRoute(
  'https://tekendaniel.github.io/mywebapp/login.html',
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  'https://tekendaniel.github.io/mywebapp/index.html',
  workbox.strategies.networkFirst()
);


workbox.routing.registerRoute(
// Cache image files
/.*\.(?:png|jpg|jpeg|svg|gif)/,
// Use the cache if it's available
workbox.strategies.cacheFirst({
// Use a custom cache name
cacheName: 'image-cache',
plugins: [
  new workbox.expiration.Plugin({
    // Cache only 20 images
    maxEntries: 20,
    // Cache for a maximum of a week
    maxAgeSeconds: 7 * 24 * 60 * 60,
  })
],
})
);


workbox.precaching.precacheAndRoute([
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl',
    { url: '/index.html', revision: '383676' },
]);



function askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}



} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

