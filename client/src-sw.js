const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");
const { StaleWhileRevalidate } = require("workbox-strategies");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

registerRoute(
  // takes in a single request parameter and checks if the request.destination matches any of the values in the array
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  // a caching strategy provided by the workbox-strategies module that delivers cached data while trying to connect to the network to update the cached data
  new StaleWhileRevalidate({
    // sets the name of the cache to "asset-cache"
    cacheName: "asset-cache",
    plugins: [
      // allows only requests with status codes 0 (which might indicate a failed request) and 200 (OK) will be cached
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
