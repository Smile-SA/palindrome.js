// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var systemMetrics = {
  cpu: {
    label: "CPU",
    unit: "cycle / seconds",
    max: 100000,
    current: 5000
  },
  ram: {
    label: "RAM",
    unit: "GB",
    max: 128,
    current: 32
  },
  ram2: {
    label: "RAM",
    unit: "GB",
    max: 128,
    current: 32
  },
  hdd: {
    label: "HDD",
    unit: "GB",
    max: 1024,
    current: 150
  },
  bandwidth: {
    label: "BW",
    unit: "MB / seconds",
    max: 10240,
    current: 1500
  }
};
var qoeMetrics = {
  hdd: {
    label: "RAM",
    unit: "GB",
    max: 128,
    current: 32
  },
  bandwidth: {
    label: "BW",
    unit: "MB / seconds",
    max: 10240,
    current: 1500
  },
  bandwidth2: {
    label: "BW",
    unit: "MB / seconds",
    max: 10240,
    current: 1500
  },
  ram: {
    label: "RAM",
    unit: "GB",
    max: 128,
    current: 32
  },
  io: {
    label: "IO",
    unit: "IO / seconds",
    max: 10240,
    current: 1500
  }
};

var SimpleLine =
/*#__PURE__*/
function (_THREE$Line) {
  _inherits(SimpleLine, _THREE$Line);

  function SimpleLine(value1, value2, material2) {
    _classCallCheck(this, SimpleLine);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(_construct(THREE.Vector3, _toConsumableArray(value1)));
    geometry.vertices.push(_construct(THREE.Vector3, _toConsumableArray(value2)));
    return _possibleConstructorReturn(this, _getPrototypeOf(SimpleLine).call(this, geometry, material2));
  }

  return SimpleLine;
}(THREE.Line);

var dataValueSystemMetrics = Object.values(systemMetrics).map(function (e) {
  return e.current / e.max;
});
var dataTitleSystemMetrics = Object.keys(systemMetrics);
var dataValueQoeMetrics = Object.values(qoeMetrics).map(function (e) {
  return e.current / e.max;
});
var dataTitleQoeMetrics = Object.keys(qoeMetrics);

var _initScene = initScene(),
    scene = _initScene.scene,
    labelRenderer = _initScene.labelRenderer,
    controls = _initScene.controls,
    renderer = _initScene.renderer,
    camera = _initScene.camera;

var material1 = createLineMaterial(0xffffff);
var material2 = createLineMaterial(0x000000);
var plane1points = [];
var plane2points = [];
loopingOverLayers(plane1points, dataValueSystemMetrics, 10);
loopingOverLayers(plane2points, dataValueQoeMetrics, -10);
var pointsCount = plane1points.length;

for (var i = 0; i < pointsCount; i++) {
  var planeOneLines = new SimpleLine(plane1points[i].toArray(), plane1points[(i + 1) % pointsCount].toArray(), material1);
  scene.add(planeOneLines);
  var lineAddingBothPlanes = new SimpleLine(plane1points[i].toArray(), plane2points[i].toArray(), material1);
  scene.add(lineAddingBothPlanes);
  var labelForPlane1 = createLabel(dataTitleSystemMetrics[i], plane1points[i]);
  scene.add(labelForPlane1);
  var labelForPlane2 = createLabel(dataTitleQoeMetrics[i], plane2points[i]);
  scene.add(labelForPlane2);
  var planeTwoLines = new SimpleLine(plane2points[i].toArray(), plane2points[(i + 1) % pointsCount].toArray(), material1);
  scene.add(planeTwoLines);
} //creates labels for all mertics and displays it on their position.

/**
 * 
 * @param {returns labels for your parameters and displays on your 3D plane} textContent 
 * @param {connects x&y coordinates to form lines between points} vector3 
 */


function createLabel(textContent, vector3) {
  var labelDiv = document.createElement('div');
  labelDiv.className = 'label';
  labelDiv.textContent = textContent;
  var metricLabel = new THREE.CSS2DObject(labelDiv);
  metricLabel.position.set(vector3.x, vector3.y + 1, vector3.z);
  return metricLabel;
} // display scene


function render() {
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

function createLineMaterial(color) {
  return new THREE.LineDashedMaterial({
    color: color,
    linewidth: 3,
    scale: 1,
    dashSize: 3,
    gapSize: 1
  });
}

function initScene() {
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.set(0, 20, 100);
  var renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    labelRenderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
  var labelRenderer = new THREE.CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = 0;
  document.body.appendChild(labelRenderer.domElement);
  var controls = new THREE.OrbitControls(camera, labelRenderer.domElement); //controls.autoRotate = true;

  controls.autoRotateSpeed = 5; //controls.target = new THREE.Vector3(.5, .5, .5);

  var scene = new THREE.Scene();
  var axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
  labelRenderer.render(scene, camera);
  return {
    scene: scene,
    labelRenderer: labelRenderer,
    controls: controls,
    renderer: renderer,
    camera: camera
  };
}

function loopingOverLayers(planepoints, planeMetrics, zplaneValues) {
  for (var _i = 0; _i < planeMetrics.length; _i++) {
    pallindrome(planepoints, planeMetrics, _i, zplaneValues);
  }
}
/**
 * Draw a palindrome
 * 
 * @param {Array} coordinates list of coordinates to reuse
 * @param {Array} metricValue list metric of a layer
 * @param {number} i iteration over the array's index
 * @param {number} zplane position on the z axis of the palindrome
 */


function pallindrome(coordinates, metricValue, i, zplane) {
  var pointValue = new SimpleLine([metricValue[i] * 50, 0, zplane], [0, 0, zplane], material2);
  pointValue.rotateZ(i * Math.PI * 2 / metricValue.length);
  scene.add(pointValue);
  scene.updateMatrixWorld();
  var points = pointValue.geometry.vertices[0].clone();
  points.applyMatrix4(pointValue.matrixWorld);
  coordinates.push(points);
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36787" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map