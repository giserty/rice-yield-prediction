export default function MapLoader() {
    return new Promise((resolve, reject) => {
      if (window.AMap) {
        resolve(window.AMap);
      } else {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "http://webapi.amap.com/maps?v=1.4.15&callback=onAMapLoaded&key=8253fd4b3a048dd711f4494a234c1c12";
        // script.src="http://a.amap.com/jsapi_demos/static/resource/heatmapData.js"
        script.onerror = reject;
        document.head.appendChild(script);
      }
      window.onAMapLoaded = () => {
        resolve(window.AMap);
      };
      window._AMapSecurityConfig = {
        securityJsCode: '403479ba8fd5af832bd7209c3f99e4ce'
    }
    });
  }
  