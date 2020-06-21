"use strict";

(function() {
  let resizeTimeout = null;
  let map;
  let t = Date.now();
  let delta = 0;

  if ("loading" != document.readyState) {
    init();
  } else {
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", init)
    } else {
      document.attachEvent("onreadystatechange", function() {
        "complete" == document.readyState && init();
      });
    }
  }

  window.addEventListener("resize", function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(map.resize.bind(map), 200);
  });

  function init() {
    map = new WeatherMap(document.querySelector('.map'));
    map.resize();
    animateMap();
  }

  function animateMap() {
    let lastTimestamp = t;
    let now = Date.now();
    delta = now - lastTimestamp;
    t = Date.now();
    map.paint(delta);
    requestAnimationFrame(animateMap);
  }

  class WeatherMap {
    constructor(el) {
      this.el = el;
      const outputCanvas = document.getElementById("map-canvas");
      outputCanvas.getContext("2d").imageSmoothingEnabled = false;

      this.data = {
        outputCanvas: outputCanvas,
        internalCanvas: document.createElement("canvas"),
        pixels: [],
        resolution: 3, // TODO: scale resolution with Screen Width, must always be more than 2
        noise: new SimplexNoise(),
        t: 0,
        x: 0,
        y: 0,
      };

      this.bounds = { width: 0, height: 0 };
    }

    resize() {
      const { width: prevWidth, height: prevHeight } = this.bounds;
      const { width, height } = this.el.getBoundingClientRect();
      this.bounds = { width, height };
      if (prevHeight !== width || prevHeight !== height) {
        // Resize Canvas'
        this.data.internalCanvas.width = this.bounds.width;
        this.data.internalCanvas.height = this.bounds.height;
        this.data.outputCanvas.width = this.bounds.width;
        this.data.outputCanvas.height = this.bounds.height;
        this.data.outputCanvas.style.width = this.bounds.width + "px";
        this.data.outputCanvas.style.height = this.bounds.height + "px";

        // Init Pixel Grid
        this.data.cw = Math.floor(this.data.internalCanvas.width / this.data.resolution);
        this.data.ch = Math.floor(this.data.internalCanvas.height / this.data.resolution);
        this.data.pixels = [];
        for (let x = 0; x < this.data.cw; x++) {
          this.data.pixels[x] = [];
          for (let y = 0; y < this.data.ch; y++) {
            this.data.pixels[x][y] = 0
          }
        }
      }
    }

    paint(delta) {
      const { data }  = this;

      // Move Pixels Around
      data.t += delta;
      for (let x = 0; x < data.cw; x++) {
        for (let y = 0; y < data.ch; y++) {
          data.pixels[x][y] = data.noise.noise3D(
            (x + data.x) / 40, (y + data.y) / 40, data.t / 10000
          );
        }
      }

      // Decide if a pixel is on or off, and paint the internal canvas
      const internalContext = data.internalCanvas.getContext("2d");
      internalContext.clearRect(0, 0, data.cw * data.resolution, data.ch * data.resolution);

      for (let x = 0; x < data.cw; x++) {
        for (let y = 0; y < data.ch; y++) {
          let pixel = data.pixels[x][y];
          let i = false;
          if (0.6 < pixel) {
            i = true;
          } else {
            if (0.2 < pixel) {
              x % 2 == 0 && y % 2 == 0 || (i = true)
            } else {
              if (-0.1 < pixel) {
                (x + y) % 2 != 0 && (i = true)
              } else {
                -0.1 < pixel && x % 2 != 0 && y % 2 != 0 && (i = true)
              }
            }
          }
          internalContext.fillStyle = i ? "#0000FF" : "rgba(255, 255, 255, 0)";
          internalContext.fillRect(x * this.data.resolution, y * this.data.resolution, 1 * this.data.resolution, 1 * this.data.resolution);
        }
      }

      // Move internal canvas image to output
      let widthRatio = Math.ceil(data.outputCanvas.width / data.internalCanvas.width);
      let heightRatio = Math.ceil(data.outputCanvas.height / data.internalCanvas.height);
      let outputContext = data.outputCanvas.getContext("2d");
      outputContext.clearRect(
        0,
        0,
        data.internalCanvas.width * widthRatio,
        data.internalCanvas.height * heightRatio
      );
      outputContext.drawImage(
        data.internalCanvas,
        0,
        0,
        data.internalCanvas.width * widthRatio,
        data.internalCanvas.height * heightRatio
      );
    }
  }
})();
