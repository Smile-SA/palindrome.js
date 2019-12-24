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
})({"dist/OrbitControls.js":[function(require,module,exports) {
/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 * @author mrflix / http://felixniklas.de
 * 
 * released under MIT License (MIT)
 */

/*global THREE, console */
// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe
//
// This is a drop-in replacement for (most) TrackballControls used in examples.
// That is, include this js file and wherever you see:
//    	controls = new THREE.TrackballControls( camera );
//      controls.target.z = 150;
// Simple substitute "OrbitControls" and the control should work as-is.
THREE.OrbitControls = function (object, domElement, localElement) {
  this.object = object;
  this.domElement = domElement !== undefined ? domElement : document;
  this.localElement = localElement !== undefined ? localElement : document; // API
  // Set to false to disable this control

  this.enabled = true; // "target" sets the location of focus, where the control orbits around
  // and where it pans with respect to.

  this.target = new THREE.Vector3(); // center is old, deprecated; use "target" instead

  this.center = this.target; // This option actually enables dollying in and out; left as "zoom" for
  // backwards compatibility

  this.noZoom = false;
  this.zoomSpeed = 1.0; // Limits to how far you can dolly in and out

  this.minDistance = 0;
  this.maxDistance = Infinity; // Set to true to disable this control

  this.noRotate = false;
  this.rotateSpeed = 1.0; // Set to true to disable this control

  this.noPan = false;
  this.keyPanSpeed = 7.0; // pixels moved per arrow key push
  // Set to true to automatically rotate around the target

  this.autoRotate = false;
  this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
  // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.

  this.minPolarAngle = 0; // radians

  this.maxPolarAngle = Math.PI; // radians
  // Set to true to disable use of the keys

  this.noKeys = false; // The four arrow keys

  this.keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    BOTTOM: 40
  }; ////////////
  // internals

  var scope = this;
  var EPS = 0.000001;
  var rotateStart = new THREE.Vector2();
  var rotateEnd = new THREE.Vector2();
  var rotateDelta = new THREE.Vector2();
  var panStart = new THREE.Vector2();
  var panEnd = new THREE.Vector2();
  var panDelta = new THREE.Vector2();
  var dollyStart = new THREE.Vector2();
  var dollyEnd = new THREE.Vector2();
  var dollyDelta = new THREE.Vector2();
  var phiDelta = 0;
  var thetaDelta = 0;
  var scale = 1;
  var pan = new THREE.Vector3();
  var lastPosition = new THREE.Vector3();
  var STATE = {
    NONE: -1,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2,
    TOUCH_ROTATE: 3,
    TOUCH_DOLLY: 4,
    TOUCH_PAN: 5
  };
  var state = STATE.NONE; // events

  var changeEvent = {
    type: 'change'
  };

  this.rotateLeft = function (angle) {
    if (angle === undefined) {
      angle = getAutoRotationAngle();
    }

    thetaDelta -= angle;
  };

  this.rotateUp = function (angle) {
    if (angle === undefined) {
      angle = getAutoRotationAngle();
    }

    phiDelta -= angle;
  }; // pass in distance in world space to move left


  this.panLeft = function (distance) {
    var panOffset = new THREE.Vector3();
    var te = this.object.matrix.elements; // get X column of matrix

    panOffset.set(te[0], te[1], te[2]);
    panOffset.multiplyScalar(-distance);
    pan.add(panOffset);
  }; // pass in distance in world space to move up


  this.panUp = function (distance) {
    var panOffset = new THREE.Vector3();
    var te = this.object.matrix.elements; // get Y column of matrix

    panOffset.set(te[4], te[5], te[6]);
    panOffset.multiplyScalar(distance);
    pan.add(panOffset);
  }; // main entry point; pass in Vector2 of change desired in pixel space,
  // right and down are positive


  this.pan = function (delta) {
    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    if (scope.object.fov !== undefined) {
      // perspective
      var position = scope.object.position;
      var offset = position.clone().sub(scope.target);
      var targetDistance = offset.length(); // half of the fov is center to top of screen

      targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0); // we actually don't use screenWidth, since perspective camera is fixed to screen height

      scope.panLeft(2 * delta.x * targetDistance / element.clientHeight);
      scope.panUp(2 * delta.y * targetDistance / element.clientHeight);
    } else if (scope.object.top !== undefined) {
      // orthographic
      scope.panLeft(delta.x * (scope.object.right - scope.object.left) / element.clientWidth);
      scope.panUp(delta.y * (scope.object.top - scope.object.bottom) / element.clientHeight);
    } else {
      // camera neither orthographic or perspective - warn user
      console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
    }
  };

  this.dollyIn = function (dollyScale) {
    if (dollyScale === undefined) {
      dollyScale = getZoomScale();
    }

    scale /= dollyScale;
  };

  this.dollyOut = function (dollyScale) {
    if (dollyScale === undefined) {
      dollyScale = getZoomScale();
    }

    scale *= dollyScale;
  };

  this.update = function () {
    var position = this.object.position;
    var offset = position.clone().sub(this.target); // angle from z-axis around y-axis

    var theta = Math.atan2(offset.x, offset.z); // angle from y-axis

    var phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);

    if (this.autoRotate) {
      this.rotateLeft(getAutoRotationAngle());
    }

    theta += thetaDelta;
    phi += phiDelta; // restrict phi to be between desired limits

    phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi)); // restrict phi to be betwee EPS and PI-EPS

    phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));
    var radius = offset.length() * scale; // restrict radius to be between desired limits

    radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius)); // move target to panned location

    this.target.add(pan);
    offset.x = radius * Math.sin(phi) * Math.sin(theta);
    offset.y = radius * Math.cos(phi);
    offset.z = radius * Math.sin(phi) * Math.cos(theta);
    position.copy(this.target).add(offset);
    this.object.lookAt(this.target);
    thetaDelta = 0;
    phiDelta = 0;
    scale = 1;
    pan.set(0, 0, 0);

    if (lastPosition.distanceTo(this.object.position) > 0) {
      this.dispatchEvent(changeEvent);
      lastPosition.copy(this.object.position);
    }
  };

  function getAutoRotationAngle() {
    return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
  }

  function getZoomScale() {
    return Math.pow(0.95, scope.zoomSpeed);
  }

  function onMouseDown(event) {
    if (scope.enabled === false) {
      return;
    }

    event.preventDefault();

    if (event.button === 0) {
      if (scope.noRotate === true) {
        return;
      }

      state = STATE.ROTATE;
      rotateStart.set(event.clientX, event.clientY);
    } else if (event.button === 1) {
      if (scope.noZoom === true) {
        return;
      }

      state = STATE.DOLLY;
      dollyStart.set(event.clientX, event.clientY);
    } else if (event.button === 2) {
      if (scope.noPan === true) {
        return;
      }

      state = STATE.PAN;
      panStart.set(event.clientX, event.clientY);
    } // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be


    scope.domElement.addEventListener('mousemove', onMouseMove, false);
    scope.domElement.addEventListener('mouseup', onMouseUp, false);
  }

  function onMouseMove(event) {
    if (scope.enabled === false) return;
    event.preventDefault();
    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    if (state === STATE.ROTATE) {
      if (scope.noRotate === true) return;
      rotateEnd.set(event.clientX, event.clientY);
      rotateDelta.subVectors(rotateEnd, rotateStart); // rotating across whole screen goes 360 degrees around

      scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed); // rotating up and down along whole screen attempts to go 360, but limited to 180

      scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);
      rotateStart.copy(rotateEnd);
    } else if (state === STATE.DOLLY) {
      if (scope.noZoom === true) return;
      dollyEnd.set(event.clientX, event.clientY);
      dollyDelta.subVectors(dollyEnd, dollyStart);

      if (dollyDelta.y > 0) {
        scope.dollyIn();
      } else {
        scope.dollyOut();
      }

      dollyStart.copy(dollyEnd);
    } else if (state === STATE.PAN) {
      if (scope.noPan === true) return;
      panEnd.set(event.clientX, event.clientY);
      panDelta.subVectors(panEnd, panStart);
      scope.pan(panDelta);
      panStart.copy(panEnd);
    } // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be


    scope.update();
  }

  function onMouseUp()
  /* event */
  {
    if (scope.enabled === false) return; // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be

    scope.domElement.removeEventListener('mousemove', onMouseMove, false);
    scope.domElement.removeEventListener('mouseup', onMouseUp, false);
    state = STATE.NONE;
  }

  function onMouseWheel(event) {
    if (scope.enabled === false || scope.noZoom === true) return;
    var delta = 0;

    if (event.wheelDelta) {
      // WebKit / Opera / Explorer 9
      delta = event.wheelDelta;
    } else if (event.detail) {
      // Firefox
      delta = -event.detail;
    }

    if (delta > 0) {
      scope.dollyOut();
    } else {
      scope.dollyIn();
    }
  }

  function onKeyDown(event) {
    if (scope.enabled === false) {
      return;
    }

    if (scope.noKeys === true) {
      return;
    }

    if (scope.noPan === true) {
      return;
    } // pan a pixel - I guess for precise positioning?
    // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be


    var needUpdate = false;

    switch (event.keyCode) {
      case scope.keys.UP:
        scope.pan(new THREE.Vector2(0, scope.keyPanSpeed));
        needUpdate = true;
        break;

      case scope.keys.BOTTOM:
        scope.pan(new THREE.Vector2(0, -scope.keyPanSpeed));
        needUpdate = true;
        break;

      case scope.keys.LEFT:
        scope.pan(new THREE.Vector2(scope.keyPanSpeed, 0));
        needUpdate = true;
        break;

      case scope.keys.RIGHT:
        scope.pan(new THREE.Vector2(-scope.keyPanSpeed, 0));
        needUpdate = true;
        break;
    } // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be


    if (needUpdate) {
      scope.update();
    }
  }

  function touchstart(event) {
    if (scope.enabled === false) {
      return;
    }

    switch (event.touches.length) {
      case 1:
        // one-fingered touch: rotate
        if (scope.noRotate === true) {
          return;
        }

        state = STATE.TOUCH_ROTATE;
        rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
        break;

      case 2:
        // two-fingered touch: dolly
        if (scope.noZoom === true) {
          return;
        }

        state = STATE.TOUCH_DOLLY;
        var dx = event.touches[0].pageX - event.touches[1].pageX;
        var dy = event.touches[0].pageY - event.touches[1].pageY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        dollyStart.set(0, distance);
        break;

      case 3:
        // three-fingered touch: pan
        if (scope.noPan === true) {
          return;
        }

        state = STATE.TOUCH_PAN;
        panStart.set(event.touches[0].pageX, event.touches[0].pageY);
        break;

      default:
        state = STATE.NONE;
    }
  }

  function touchmove(event) {
    if (scope.enabled === false) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    switch (event.touches.length) {
      case 1:
        // one-fingered touch: rotate
        if (scope.noRotate === true) {
          return;
        }

        if (state !== STATE.TOUCH_ROTATE) {
          return;
        }

        rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
        rotateDelta.subVectors(rotateEnd, rotateStart); // rotating across whole screen goes 360 degrees around

        scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed); // rotating up and down along whole screen attempts to go 360, but limited to 180

        scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);
        rotateStart.copy(rotateEnd);
        break;

      case 2:
        // two-fingered touch: dolly
        if (scope.noZoom === true) {
          return;
        }

        if (state !== STATE.TOUCH_DOLLY) {
          return;
        }

        var dx = event.touches[0].pageX - event.touches[1].pageX;
        var dy = event.touches[0].pageY - event.touches[1].pageY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        dollyEnd.set(0, distance);
        dollyDelta.subVectors(dollyEnd, dollyStart);

        if (dollyDelta.y > 0) {
          scope.dollyOut();
        } else {
          scope.dollyIn();
        }

        dollyStart.copy(dollyEnd);
        break;

      case 3:
        // three-fingered touch: pan
        if (scope.noPan === true) {
          return;
        }

        if (state !== STATE.TOUCH_PAN) {
          return;
        }

        panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
        panDelta.subVectors(panEnd, panStart);
        scope.pan(panDelta);
        panStart.copy(panEnd);
        break;

      default:
        state = STATE.NONE;
    }
  }

  function touchend()
  /* event */
  {
    if (scope.enabled === false) {
      return;
    }

    state = STATE.NONE;
  }

  this.domElement.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  }, false);
  this.localElement.addEventListener('mousedown', onMouseDown, false);
  this.domElement.addEventListener('mousewheel', onMouseWheel, false);
  this.domElement.addEventListener('DOMMouseScroll', onMouseWheel, false); // firefox

  this.domElement.addEventListener('keydown', onKeyDown, false);
  this.localElement.addEventListener('touchstart', touchstart, false);
  this.domElement.addEventListener('touchend', touchend, false);
  this.domElement.addEventListener('touchmove', touchmove, false);
};

THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dist/OrbitControls.js"], null)
//# sourceMappingURL=/OrbitControls.2a0db039.js.map