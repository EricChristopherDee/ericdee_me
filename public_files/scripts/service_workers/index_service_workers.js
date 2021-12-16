function registers_index_service_workers() {
  console.log("A call to registers_index_service_workers has been made.");
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(
        "/scripts/service_workers/index_service_workers.js",
        {
          scope: "/scripts/service_workers/",
        }
      );
    });
  }
}

let cache_name = "images_index_1";
let cache_objects = [
  "/images/copyrighted/renders/edited/styled_oreo_tiki.png",
  "/images/copyrighted/renders/edited/styled_shattered_tiki.png",
  "/css/theme_lizard_green.css",
  "/css/theme_stone_gray.css",
];

self.addEventListener("install", function (event) {
  console.log("The index service worker was installed.");
  event.waitUntil(
    caches
      .open(cache_name)
      .then((cache) => {
        cache.addAll(cache_objects);
        console.log("Images have been cached.");
      })
      .catch((error) => {
        console("Images were not cached due to this error: " + error);
      })
  );
});
