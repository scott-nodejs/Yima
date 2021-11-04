(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"tim","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"tim","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"tim","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"tim","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"tim","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!******************************************!*\
  !*** D:/appshuo/oneCode/Yima/pages.json ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/*!**************************************************!*\
  !*** D:/appshuo/oneCode/Yima/commen/tim/user.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var userList = [{
  user: 'tsj',
  userId: '1',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoZQweKU7MSCgswUJStDEwMDI3NzM0tLiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxazMLYwMbI0NYGakpkONDPPI0Y-OcctwjIp0izIsLg4Mdjb28e9ytu02NUl3zsnNNwis7I0u7TULbfCwFapFgBCAjBt',
  img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1735490596,2760195857&fm=26&gp=0.jpg' },

{
  user: 'user1',
  userId: '2',
  img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2262632647,543198910&fm=26&gp=0.jpg',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zIhwlDB4pTsxIKCzBQlK0MTAwMjc3MzS0uITGpFQWZRKlDc1NTUyMDAACJakpkLFrMwtjAxsjCCqi3OTAeaGZUe6GnglGVh5uQZUWbo4ucW7BulbeiZE2GZ6FtkkuHvb64dklfibu5qUmyrVAsA7bAuSQ__' },

{
  user: 'user2',
  userId: '3',
  img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=366135374,1364401596&fm=26&gp=0.jpg',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsZQweKU7MSCgswUJStDEwMDI3NzM0tLiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxazMDEwMjWwNISakpkONDM5y8e-2M*syqfcIqPMUTvb1SnMNcs4yDDRpTik2DWyzL200D05oDzVsyjfVqkWABWxMCc_' },

{
  user: 'user3',
  userId: '4',
  img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=275868592,2250122918&fm=26&gp=0.jpg',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwiZQweKU7MSCgswUJStDEwMDI3NzM0tLiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxazMDEwMjUyg4oWZ6YDzQzzNvYsD3dPz0qP9Ekqci8xM832LXNJ90wxDkwKywsM8jbPjsjRdoosrIy0VaoFABNEL9E_' },

{
  user: 'user4',
  userId: '5',
  img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2473035870,2692619587&fm=26&gp=0.jpg',
  userSig: 'eJwtzMEKgkAUheF3mXXIdfTqjNDCCgMTCnLTcmBm5BbmYGZi9O6Jujzfgf-LyuLq9aZlCeMesM28SZtnR5ZmxhVf*qGcI80SPwTgcRxJuTxmcNSayRGRA8CiHdWziRA4*gGuFaqmZncZpLDv-FzCfd9-MmcOQp2a0d4iJY9Z4dd5M*6CRqTVlv3*F5svpQ__' },

{
  user: 'user5',
  userId: '6',
  img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293099503,606929711&fm=26&gp=0.jpg',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwmZQweKU7MSCgswUJStDEwMDI3NzM0tLiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxazMDEwMjU0NYSakpkONNPSx7Sw0DOlyKcqOTMtwMw42dxS2w9oZJJbVUBigUW4u5OXc3J*eUWYUbatUi0AAvUvMA__' },

{
  user: 'user6',
  userId: '7',
  img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1643922863,2228588017&fm=26&gp=0.jpg',
  userSig: 'eJwtzD0PgjAUheH-0tmQ2xtKKYmDAxgjGzLIprSQm-rRIBJT43*XFMbznOT9slNZRZMZWMYwArYJm7R5jNRRYLniS9uLc6RZxmMAlDJRannMx9FgZhdCIAAsOtI9WBoDCp6ItUL93OTnqa-8Uzv*vub21lq-zw*l7xtVpDV6lNjtsNZNcmy37PcHIzwvpA__' },

{
  user: 'user7',
  userId: '8',
  img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1179876196,102524513&fm=26&gp=0.jpg',
  userSig: 'eJwtzF0LwiAYhuH-4nGMd07TDTrpYBBGMCoWnQW69dKXbCJi9N8bbofP9cD9Jaf9MfNmIBWhGZBV2qjN22GHieWCo37crEVNqpwBUCHWZTk-JlgczOSccwoAszp8JZMMKM*lWCrYT81r8wySFWrbqbqt78Xl48c22hgRNHNeWH1W4rDjoZEb8vsDGUUv4A__' },

{
  user: 'user8',
  userId: '9',
  img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3206878631,547916318&fm=26&gp=0.jpg',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwpZQweKU7MSCgswUJStDEwMDI3NzM0tLiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxazMDEwMjU2M4GakpkONLPILNDQ3CLYtCQ3NCq50qDS3aXcySdGPyuyOCg9PMqowNPHuaCgoCrHIrWw3FapFgA*NjBr' },

{
  user: 'user9',
  userId: '10',
  img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1779444511,689185070&fm=26&gp=0.jpg',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoYw0eKU7MSCgswUJStDEwMDI3NzM0tLiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxazMDEwMjUytoCakpkONNQv0ihbOzPPI9Q-LTcy39EpszI1PNI9wihGvzzI3z-FsdjLuSg-oiK8stQr0lapFgBoUDC1' }];var _default =






userList;exports.default = _default;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 12 */
/*!*************************************************!*\
  !*** D:/appshuo/oneCode/Yima/commen/tim/tim.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timJsSdk = _interopRequireDefault(__webpack_require__(/*! tim-js-sdk */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// import COS from "cos-js-sdk-v5";


var options = {
  SDKAppID: 1400277699 // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
var tim = _timJsSdk.default.create(options); // SDK 实例通常用 tim 表示
var TIMData = _timJsSdk.default;
// 注册 COS SDK 插件
// tim.registerPlugin({'cos-js-sdk': COS});



/* eslint-disable require-jsdoc */
function genTestUserSig(userID) {
  var SDKAPPID = 1400277699;
  var EXPIRETIME = 604800;
  var SECRETKEY = '281d8830bb13fa0923bc5c34cc13690faac214906fd5342782daba5a3e645f3c';

  if (SDKAPPID === '' || SECRETKEY === '') {
    alert(
    '请先配置好您的账号信息： SDKAPPID 及 SECRETKEY ' +
    '\r\n\r\nPlease configure your SDKAPPID/SECRETKEY in js/debug/GenerateTestUserSig.js');

  }
  var generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  var userSig = generator.genTestUserSig(userID);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig };

}var _default =

{
  tim: tim,
  TIMData: TIMData,
  genTestUserSig: genTestUserSig };exports.default = _default;

/***/ }),
/* 13 */
/*!*****************************************************************!*\
  !*** D:/appshuo/oneCode/Yima/node_modules/tim-js-sdk/tim-js.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, uni) {!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};function t(e, t) {return e(t = { exports: {} }, t.exports), t.exports;}var n = function n(e) {return e && e.Math == Math && e;},o = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof e && e) || Function("return this")(),r = function r(e) {try {return !!e();} catch (t) {return !0;}},a = !r(function () {return 7 != Object.defineProperty({}, 1, { get: function get() {return 7;} })[1];}),s = {}.propertyIsEnumerable,i = Object.getOwnPropertyDescriptor,u = { f: i && !s.call({ 1: 2 }, 1) ? function (e) {var t = i(this, e);return !!t && t.enumerable;} : s },c = function c(e, t) {return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };},l = {}.toString,p = function p(e) {return l.call(e).slice(8, -1);},d = "".split,g = r(function () {return !Object("z").propertyIsEnumerable(0);}) ? function (e) {return "String" == p(e) ? d.call(e, "") : Object(e);} : Object,h = function h(e) {if (null == e) throw TypeError("Can't call method on " + e);return e;},_f2 = function f(e) {return g(h(e));},_ = function _(e) {return "object" == typeof e ? null !== e : "function" == typeof e;},m = function m(e, t) {if (!_(e)) return e;var n, o;if (t && "function" == typeof (n = e.toString) && !_(o = n.call(e))) return o;if ("function" == typeof (n = e.valueOf) && !_(o = n.call(e))) return o;if (!t && "function" == typeof (n = e.toString) && !_(o = n.call(e))) return o;throw TypeError("Can't convert object to primitive value");},v = {}.hasOwnProperty,M = function M(e, t) {return v.call(e, t);},y = o.document,I = _(y) && _(y.createElement),S = function S(e) {return I ? y.createElement(e) : {};},T = !a && !r(function () {return 7 != Object.defineProperty(S("div"), "a", { get: function get() {return 7;} }).a;}),D = Object.getOwnPropertyDescriptor,E = { f: a ? D : function (e, t) {if (e = _f2(e), t = m(t, !0), T) try {return D(e, t);} catch (n) {}if (M(e, t)) return c(!u.f.call(e, t), e[t]);} },C = function C(e) {if (!_(e)) throw TypeError(String(e) + " is not an object");return e;},A = Object.defineProperty,k = { f: a ? A : function (e, t, n) {if (C(e), t = m(t, !0), C(n), T) try {return A(e, t, n);} catch (o) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported");return "value" in n && (e[t] = n.value), e;} },N = a ? function (e, t, n) {return k.f(e, t, c(1, n));} : function (e, t, n) {return e[t] = n, e;},O = function O(e, t) {try {N(o, e, t);} catch (n) {o[e] = t;}return t;},L = o["__core-js_shared__"] || O("__core-js_shared__", {}),R = Function.toString;"function" != typeof L.inspectSource && (L.inspectSource = function (e) {return R.call(e);});var b,w,P,G = L.inspectSource,U = o.WeakMap,F = "function" == typeof U && /native code/.test(G(U)),q = t(function (e) {(e.exports = function (e, t) {return L[e] || (L[e] = void 0 !== t ? t : {});})("versions", []).push({ version: "3.6.4", mode: "global", copyright: "© 2020 Denis Pushkarev (zloirock.ru)" });}),x = 0,V = Math.random(),K = function K(e) {return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++x + V).toString(36);},B = q("keys"),H = function H(e) {return B[e] || (B[e] = K(e));},j = {},$ = o.WeakMap;if (F) {var Y = new $(),z = Y.get,W = Y.has,J = Y.set;b = function b(e, t) {return J.call(Y, e, t), t;}, w = function w(e) {return z.call(Y, e) || {};}, P = function P(e) {return W.call(Y, e);};} else {var X = H("state");j[X] = !0, b = function b(e, t) {return N(e, X, t), t;}, w = function w(e) {return M(e, X) ? e[X] : {};}, P = function P(e) {return M(e, X);};}var Q,Z,ee = { set: b, get: w, has: P, enforce: function enforce(e) {return P(e) ? w(e) : b(e, {});}, getterFor: function getterFor(e) {return function (t) {var n;if (!_(t) || (n = w(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");return n;};} },te = t(function (e) {var t = ee.get,n = ee.enforce,r = String(String).split("String");(e.exports = function (e, t, a, s) {var i = !!s && !!s.unsafe,u = !!s && !!s.enumerable,c = !!s && !!s.noTargetGet;"function" == typeof a && ("string" != typeof t || M(a, "name") || N(a, "name", t), n(a).source = r.join("string" == typeof t ? t : "")), e !== o ? (i ? !c && e[t] && (u = !0) : delete e[t], u ? e[t] = a : N(e, t, a)) : u ? e[t] = a : O(t, a);})(Function.prototype, "toString", function () {return "function" == typeof this && t(this).source || G(this);});}),ne = o,oe = function oe(e) {return "function" == typeof e ? e : void 0;},re = function re(e, t) {return arguments.length < 2 ? oe(ne[e]) || oe(o[e]) : ne[e] && ne[e][t] || o[e] && o[e][t];},ae = Math.ceil,se = Math.floor,ie = function ie(e) {return isNaN(e = +e) ? 0 : (e > 0 ? se : ae)(e);},ue = Math.min,ce = function ce(e) {return e > 0 ? ue(ie(e), 9007199254740991) : 0;},le = Math.max,pe = Math.min,de = function de(e, t) {var n = ie(e);return n < 0 ? le(n + t, 0) : pe(n, t);},ge = function ge(e) {return function (t, n, o) {var r,a = _f2(t),s = ce(a.length),i = de(o, s);if (e && n != n) {for (; s > i;) {if ((r = a[i++]) != r) return !0;}} else for (; s > i; i++) {if ((e || i in a) && a[i] === n) return e || i || 0;}return !e && -1;};},he = { includes: ge(!0), indexOf: ge(!1) },fe = he.indexOf,_e = function _e(e, t) {var n,o = _f2(e),r = 0,a = [];for (n in o) {!M(j, n) && M(o, n) && a.push(n);}for (; t.length > r;) {M(o, n = t[r++]) && (~fe(a, n) || a.push(n));}return a;},me = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],ve = me.concat("length", "prototype"),Me = { f: Object.getOwnPropertyNames || function (e) {return _e(e, ve);} },ye = { f: Object.getOwnPropertySymbols },Ie = re("Reflect", "ownKeys") || function (e) {var t = Me.f(C(e)),n = ye.f;return n ? t.concat(n(e)) : t;},Se = function Se(e, t) {for (var n = Ie(t), o = k.f, r = E.f, a = 0; a < n.length; a++) {var s = n[a];M(e, s) || o(e, s, r(t, s));}},Te = /#|\.prototype\./,De = function De(e, t) {var n = Ce[Ee(e)];return n == ke || n != Ae && ("function" == typeof t ? r(t) : !!t);},Ee = De.normalize = function (e) {return String(e).replace(Te, ".").toLowerCase();},Ce = De.data = {},Ae = De.NATIVE = "N",ke = De.POLYFILL = "P",Ne = De,Oe = E.f,Le = function Le(e, t) {var n,r,a,s,i,u = e.target,c = e.global,l = e.stat;if (n = c ? o : l ? o[u] || O(u, {}) : (o[u] || {}).prototype) for (r in t) {if (s = t[r], a = e.noTargetGet ? (i = Oe(n, r)) && i.value : n[r], !Ne(c ? r : u + (l ? "." : "#") + r, e.forced) && void 0 !== a) {if (typeof s == typeof a) continue;Se(s, a);}(e.sham || a && a.sham) && N(s, "sham", !0), te(n, r, s, e);}},Re = Array.isArray || function (e) {return "Array" == p(e);},be = function be(e) {return Object(h(e));},we = function we(e, t, n) {var o = m(t);o in e ? k.f(e, o, c(0, n)) : e[o] = n;},Pe = !!Object.getOwnPropertySymbols && !r(function () {return !String(Symbol());}),Ge = Pe && !Symbol.sham && "symbol" == typeof Symbol.iterator,Ue = q("wks"),Fe = o.Symbol,qe = Ge ? Fe : Fe && Fe.withoutSetter || K,xe = function xe(e) {return M(Ue, e) || (Pe && M(Fe, e) ? Ue[e] = Fe[e] : Ue[e] = qe("Symbol." + e)), Ue[e];},Ve = xe("species"),Ke = function Ke(e, t) {var n;return Re(e) && ("function" != typeof (n = e.constructor) || n !== Array && !Re(n.prototype) ? _(n) && null === (n = n[Ve]) && (n = void 0) : n = void 0), new (void 0 === n ? Array : n)(0 === t ? 0 : t);},Be = re("navigator", "userAgent") || "",He = o.process,je = He && He.versions,$e = je && je.v8;$e ? Z = (Q = $e.split("."))[0] + Q[1] : Be && (!(Q = Be.match(/Edge\/(\d+)/)) || Q[1] >= 74) && (Q = Be.match(/Chrome\/(\d+)/)) && (Z = Q[1]);var Ye = Z && +Z,ze = xe("species"),We = function We(e) {return Ye >= 51 || !r(function () {var t = [];return (t.constructor = {})[ze] = function () {return { foo: 1 };}, 1 !== t[e](Boolean).foo;});},Je = xe("isConcatSpreadable"),Xe = Ye >= 51 || !r(function () {var e = [];return e[Je] = !1, e.concat()[0] !== e;}),Qe = We("concat"),Ze = function Ze(e) {if (!_(e)) return !1;var t = e[Je];return void 0 !== t ? !!t : Re(e);};Le({ target: "Array", proto: !0, forced: !Xe || !Qe }, { concat: function concat(e) {var t,n,o,r,a,s = be(this),i = Ke(s, 0),u = 0;for (t = -1, o = arguments.length; t < o; t++) {if (a = -1 === t ? s : arguments[t], Ze(a)) {if (u + (r = ce(a.length)) > 9007199254740991) throw TypeError("Maximum allowed index exceeded");for (n = 0; n < r; n++, u++) {n in a && we(i, u, a[n]);}} else {if (u >= 9007199254740991) throw TypeError("Maximum allowed index exceeded");we(i, u++, a);}}return i.length = u, i;} });var et = function et(e) {if ("function" != typeof e) throw TypeError(String(e) + " is not a function");return e;},nt = function nt(e, t, n) {if (et(e), void 0 === t) return e;switch (n) {case 0:return function () {return e.call(t);};case 1:return function (n) {return e.call(t, n);};case 2:return function (n, o) {return e.call(t, n, o);};case 3:return function (n, o, r) {return e.call(t, n, o, r);};}return function () {return e.apply(t, arguments);};},ot = [].push,rt = function rt(e) {var t = 1 == e,n = 2 == e,o = 3 == e,r = 4 == e,a = 6 == e,s = 5 == e || a;return function (i, u, c, l) {for (var p, d, h = be(i), f = g(h), _ = nt(u, c, 3), m = ce(f.length), v = 0, M = l || Ke, y = t ? M(i, m) : n ? M(i, 0) : void 0; m > v; v++) {if ((s || v in f) && (d = _(p = f[v], v, h), e)) if (t) y[v] = d;else if (d) switch (e) {case 3:return !0;case 5:return p;case 6:return v;case 2:ot.call(y, p);} else if (r) return !1;}return a ? -1 : o || r ? r : y;};},at = { forEach: rt(0), map: rt(1), filter: rt(2), some: rt(3), every: rt(4), find: rt(5), findIndex: rt(6) },st = function st(e, t) {var n = [][e];return !!n && r(function () {n.call(null, t || function () {throw 1;}, 1);});},it = Object.defineProperty,ut = {},ct = function ct(e) {throw e;},lt = function lt(e, t) {if (M(ut, e)) return ut[e];t || (t = {});var n = [][e],o = !!M(t, "ACCESSORS") && t.ACCESSORS,s = M(t, 0) ? t[0] : ct,i = M(t, 1) ? t[1] : void 0;return ut[e] = !!n && !r(function () {if (o && !a) return !0;var e = { length: -1 };o ? it(e, 1, { enumerable: !0, get: ct }) : e[1] = 1, n.call(e, s, i);});},pt = at.forEach,dt = st("forEach"),gt = lt("forEach"),ht = dt && gt ? [].forEach : function (e) {return pt(this, e, arguments.length > 1 ? arguments[1] : void 0);};Le({ target: "Array", proto: !0, forced: [].forEach != ht }, { forEach: ht });var ft = function ft(e, t, n, o) {try {return o ? t(C(n)[0], n[1]) : t(n);} catch (a) {var r = e.return;throw void 0 !== r && C(r.call(e)), a;}},_t = {},mt = xe("iterator"),vt = Array.prototype,Mt = function Mt(e) {return void 0 !== e && (_t.Array === e || vt[mt] === e);},yt = {};yt[xe("toStringTag")] = "z";var It = "[object z]" === String(yt),St = xe("toStringTag"),Tt = "Arguments" == p(function () {return arguments;}()),Dt = It ? p : function (e) {var t, n, o;return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {try {return e[t];} catch (n) {}}(t = Object(e), St)) ? n : Tt ? p(t) : "Object" == (o = p(t)) && "function" == typeof t.callee ? "Arguments" : o;},Et = xe("iterator"),Ct = function Ct(e) {if (null != e) return e[Et] || e["@@iterator"] || _t[Dt(e)];},At = function At(e) {var t,n,o,r,a,s,i = be(e),u = "function" == typeof this ? this : Array,c = arguments.length,l = c > 1 ? arguments[1] : void 0,p = void 0 !== l,d = Ct(i),g = 0;if (p && (l = nt(l, c > 2 ? arguments[2] : void 0, 2)), null == d || u == Array && Mt(d)) for (n = new u(t = ce(i.length)); t > g; g++) {s = p ? l(i[g], g) : i[g], we(n, g, s);} else for (a = (r = d.call(i)).next, n = new u(); !(o = a.call(r)).done; g++) {s = p ? ft(r, l, [o.value, g], !0) : o.value, we(n, g, s);}return n.length = g, n;},kt = xe("iterator"),Nt = !1;try {var Ot = 0,Lt = { next: function next() {return { done: !!Ot++ };}, return: function _return() {Nt = !0;} };Lt[kt] = function () {return this;}, Array.from(Lt, function () {throw 2;});} catch (jv) {}var Rt = function Rt(e, t) {if (!t && !Nt) return !1;var n = !1;try {var o = {};o[kt] = function () {return { next: function next() {return { done: n = !0 };} };}, e(o);} catch (jv) {}return n;},bt = !Rt(function (e) {Array.from(e);});Le({ target: "Array", stat: !0, forced: bt }, { from: At });var wt,Pt = Object.keys || function (e) {return _e(e, me);},Gt = a ? Object.defineProperties : function (e, t) {C(e);for (var n, o = Pt(t), r = o.length, a = 0; r > a;) {k.f(e, n = o[a++], t[n]);}return e;},Ut = re("document", "documentElement"),Ft = H("IE_PROTO"),qt = function qt() {},xt = function xt(e) {return "<script>" + e + "<\/script>";},_Vt = function Vt() {try {wt = document.domain && new ActiveXObject("htmlfile");} catch (jv) {}var e, t;_Vt = wt ? function (e) {e.write(xt("")), e.close();var t = e.parentWindow.Object;return e = null, t;}(wt) : ((t = S("iframe")).style.display = "none", Ut.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(xt("document.F=Object")), e.close(), e.F);for (var n = me.length; n--;) {delete _Vt.prototype[me[n]];}return _Vt();};j[Ft] = !0;var Kt = Object.create || function (e, t) {var n;return null !== e ? (qt.prototype = C(e), n = new qt(), qt.prototype = null, n[Ft] = e) : n = _Vt(), void 0 === t ? n : Gt(n, t);};Le({ target: "Object", stat: !0, sham: !a }, { create: Kt });var Bt = r(function () {Pt(1);});Le({ target: "Object", stat: !0, forced: Bt }, { keys: function keys(e) {return Pt(be(e));} });var Ht = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF",jt = "[" + Ht + "]",$t = RegExp("^" + jt + jt + "*"),Yt = RegExp(jt + jt + "*$"),zt = function zt(e) {return function (t) {var n = String(h(t));return 1 & e && (n = n.replace($t, "")), 2 & e && (n = n.replace(Yt, "")), n;};},Wt = { start: zt(1), end: zt(2), trim: zt(3) },Jt = Wt.trim,Xt = o.parseInt,Qt = /^[+-]?0[Xx]/,Zt = 8 !== Xt(Ht + "08") || 22 !== Xt(Ht + "0x16") ? function (e, t) {var n = Jt(String(e));return Xt(n, t >>> 0 || (Qt.test(n) ? 16 : 10));} : Xt;Le({ global: !0, forced: parseInt != Zt }, { parseInt: Zt });var en,tn,nn,on = function on(e) {return function (t, n) {var o,r,a = String(h(t)),s = ie(n),i = a.length;return s < 0 || s >= i ? e ? "" : void 0 : (o = a.charCodeAt(s)) < 55296 || o > 56319 || s + 1 === i || (r = a.charCodeAt(s + 1)) < 56320 || r > 57343 ? e ? a.charAt(s) : o : e ? a.slice(s, s + 2) : r - 56320 + (o - 55296 << 10) + 65536;};},rn = { codeAt: on(!1), charAt: on(!0) },an = !r(function () {function e() {}return e.prototype.constructor = null, Object.getPrototypeOf(new e()) !== e.prototype;}),sn = H("IE_PROTO"),un = Object.prototype,cn = an ? Object.getPrototypeOf : function (e) {return e = be(e), M(e, sn) ? e[sn] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? un : null;},ln = xe("iterator"),pn = !1;[].keys && ("next" in (nn = [].keys()) ? (tn = cn(cn(nn))) !== Object.prototype && (en = tn) : pn = !0), null == en && (en = {}), M(en, ln) || N(en, ln, function () {return this;});var dn = { IteratorPrototype: en, BUGGY_SAFARI_ITERATORS: pn },gn = k.f,hn = xe("toStringTag"),fn = function fn(e, t, n) {e && !M(e = n ? e : e.prototype, hn) && gn(e, hn, { configurable: !0, value: t });},_n = dn.IteratorPrototype,mn = function mn() {return this;},vn = function vn(e, t, n) {var o = t + " Iterator";return e.prototype = Kt(_n, { next: c(1, n) }), fn(e, o, !1), _t[o] = mn, e;},Mn = Object.setPrototypeOf || ("__proto__" in {} ? function () {var e,t = !1,n = {};try {(e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), t = n instanceof Array;} catch (jv) {}return function (n, o) {return C(n), function (e) {if (!_(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype");}(o), t ? e.call(n, o) : n.__proto__ = o, n;};}() : void 0),yn = dn.IteratorPrototype,In = dn.BUGGY_SAFARI_ITERATORS,Sn = xe("iterator"),Tn = function Tn() {return this;},Dn = function Dn(e, t, n, o, r, a, s) {vn(n, t, o);var i,u,c,l = function l(e) {if (e === r && f) return f;if (!In && e in g) return g[e];switch (e) {case "keys":case "values":case "entries":return function () {return new n(this, e);};}return function () {return new n(this);};},p = t + " Iterator",d = !1,g = e.prototype,h = g[Sn] || g["@@iterator"] || r && g[r],f = !In && h || l(r),_ = "Array" == t && g.entries || h;if (_ && (i = cn(_.call(new e())), yn !== Object.prototype && i.next && (cn(i) !== yn && (Mn ? Mn(i, yn) : "function" != typeof i[Sn] && N(i, Sn, Tn)), fn(i, p, !0))), "values" == r && h && "values" !== h.name && (d = !0, f = function f() {return h.call(this);}), g[Sn] !== f && N(g, Sn, f), _t[t] = f, r) if (u = { values: l("values"), keys: a ? f : l("keys"), entries: l("entries") }, s) for (c in u) {(In || d || !(c in g)) && te(g, c, u[c]);} else Le({ target: t, proto: !0, forced: In || d }, u);return u;},En = rn.charAt,Cn = ee.set,An = ee.getterFor("String Iterator");Dn(String, "String", function (e) {Cn(this, { type: "String Iterator", string: String(e), index: 0 });}, function () {var e,t = An(this),n = t.string,o = t.index;return o >= n.length ? { value: void 0, done: !0 } : (e = En(n, o), t.index += e.length, { value: e, done: !1 });});var kn = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };for (var Nn in kn) {var On = o[Nn],Ln = On && On.prototype;if (Ln && Ln.forEach !== ht) try {N(Ln, "forEach", ht);} catch (jv) {Ln.forEach = ht;}}function Rn(e) {return (Rn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;})(e);}function bn(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function wn(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}function Pn(e, t, n) {return t && wn(e.prototype, t), n && wn(e, n), e;}function Gn(e, t, n) {return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;}function Un(e, t) {var n = Object.keys(e);if (Object.getOwnPropertySymbols) {var o = Object.getOwnPropertySymbols(e);t && (o = o.filter(function (t) {return Object.getOwnPropertyDescriptor(e, t).enumerable;})), n.push.apply(n, o);}return n;}function Fn(e) {for (var t = 1; t < arguments.length; t++) {var n = null != arguments[t] ? arguments[t] : {};t % 2 ? Un(Object(n), !0).forEach(function (t) {Gn(e, t, n[t]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Un(Object(n)).forEach(function (t) {Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));});}return e;}function qn(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && Vn(e, t);}function xn(e) {return (xn = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {return e.__proto__ || Object.getPrototypeOf(e);})(e);}function Vn(e, t) {return (Vn = Object.setPrototypeOf || function (e, t) {return e.__proto__ = t, e;})(e, t);}function Kn() {if ("undefined" == typeof Reflect || !Reflect.construct) return !1;if (Reflect.construct.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;} catch (e) {return !1;}}function Bn(e, t, n) {return (Bn = Kn() ? Reflect.construct : function (e, t, n) {var o = [null];o.push.apply(o, t);var r = new (Function.bind.apply(e, o))();return n && Vn(r, n.prototype), r;}).apply(null, arguments);}function Hn(e) {var t = "function" == typeof Map ? new Map() : void 0;return (Hn = function Hn(e) {if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;var n;if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");if (void 0 !== t) {if (t.has(e)) return t.get(e);t.set(e, o);}function o() {return Bn(e, arguments, xn(this).constructor);}return o.prototype = Object.create(e.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), Vn(o, e);})(e);}function jn(e, t) {if (null == e) return {};var n,o,r = function (e, t) {if (null == e) return {};var n,o,r = {},a = Object.keys(e);for (o = 0; o < a.length; o++) {n = a[o], t.indexOf(n) >= 0 || (r[n] = e[n]);}return r;}(e, t);if (Object.getOwnPropertySymbols) {var a = Object.getOwnPropertySymbols(e);for (o = 0; o < a.length; o++) {n = a[o], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);}}return r;}function $n(e) {if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e;}function Yn(e, t) {return !t || "object" != typeof t && "function" != typeof t ? $n(e) : t;}function zn(e) {return function () {var t,n = xn(e);if (Kn()) {var o = xn(this).constructor;t = Reflect.construct(n, arguments, o);} else t = n.apply(this, arguments);return Yn(this, t);};}function Wn(e, t) {return Xn(e) || function (e, t) {if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;var n = [],o = !0,r = !1,a = void 0;try {for (var s, i = e[Symbol.iterator](); !(o = (s = i.next()).done) && (n.push(s.value), !t || n.length !== t); o = !0) {;}} catch (u) {r = !0, a = u;} finally {try {o || null == i.return || i.return();} finally {if (r) throw a;}}return n;}(e, t) || Zn(e, t) || to();}function Jn(e) {return function (e) {if (Array.isArray(e)) return eo(e);}(e) || Qn(e) || Zn(e) || function () {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}();}function Xn(e) {if (Array.isArray(e)) return e;}function Qn(e) {if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);}function Zn(e, t) {if (e) {if ("string" == typeof e) return eo(e, t);var n = Object.prototype.toString.call(e).slice(8, -1);return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? eo(e, t) : void 0;}}function eo(e, t) {(null == t || t > e.length) && (t = e.length);for (var n = 0, o = new Array(t); n < t; n++) {o[n] = e[n];}return o;}function to() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function no(e) {if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {if (Array.isArray(e) || (e = Zn(e))) {var t = 0,n = function n() {};return { s: n, n: function n() {return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };}, e: function e(_e2) {throw _e2;}, f: n };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var o,r,a = !0,s = !1;return { s: function s() {o = e[Symbol.iterator]();}, n: function n() {var e = o.next();return a = e.done, e;}, e: function e(_e3) {s = !0, r = _e3;}, f: function f() {try {a || null == o.return || o.return();} finally {if (s) throw r;}} };}var oo = { SDK_READY: "sdkStateReady", SDK_NOT_READY: "sdkStateNotReady", SDK_DESTROY: "sdkDestroy", MESSAGE_RECEIVED: "onMessageReceived", MESSAGE_MODIFIED: "onMessageModified", MESSAGE_REVOKED: "onMessageRevoked", MESSAGE_READ_BY_PEER: "onMessageReadByPeer", CONVERSATION_LIST_UPDATED: "onConversationListUpdated", GROUP_LIST_UPDATED: "onGroupListUpdated", GROUP_SYSTEM_NOTICE_RECEIVED: "receiveGroupSystemNotice", GROUP_ATTRIBUTES_UPDATED: "groupAttributesUpdated", PROFILE_UPDATED: "onProfileUpdated", BLACKLIST_UPDATED: "blacklistUpdated", FRIEND_LIST_UPDATED: "onFriendListUpdated", FRIEND_GROUP_LIST_UPDATED: "onFriendGroupListUpdated", FRIEND_APPLICATION_LIST_UPDATED: "onFriendApplicationListUpdated", KICKED_OUT: "kickedOut", ERROR: "error", NET_STATE_CHANGE: "netStateChange", SDK_RELOAD: "sdkReload" },ro = { MSG_TEXT: "TIMTextElem", MSG_IMAGE: "TIMImageElem", MSG_SOUND: "TIMSoundElem", MSG_AUDIO: "TIMSoundElem", MSG_FILE: "TIMFileElem", MSG_FACE: "TIMFaceElem", MSG_VIDEO: "TIMVideoFileElem", MSG_GEO: "TIMLocationElem", MSG_GRP_TIP: "TIMGroupTipElem", MSG_GRP_SYS_NOTICE: "TIMGroupSystemNoticeElem", MSG_CUSTOM: "TIMCustomElem", MSG_MERGER: "TIMRelayElem", MSG_PRIORITY_HIGH: "High", MSG_PRIORITY_NORMAL: "Normal", MSG_PRIORITY_LOW: "Low", MSG_PRIORITY_LOWEST: "Lowest", CONV_C2C: "C2C", CONV_GROUP: "GROUP", CONV_SYSTEM: "@TIM#SYSTEM", CONV_AT_ME: 1, CONV_AT_ALL: 2, CONV_AT_ALL_AT_ME: 3, GRP_PRIVATE: "Private", GRP_WORK: "Private", GRP_PUBLIC: "Public", GRP_CHATROOM: "ChatRoom", GRP_MEETING: "ChatRoom", GRP_AVCHATROOM: "AVChatRoom", GRP_MBR_ROLE_OWNER: "Owner", GRP_MBR_ROLE_ADMIN: "Admin", GRP_MBR_ROLE_MEMBER: "Member", GRP_TIP_MBR_JOIN: 1, GRP_TIP_MBR_QUIT: 2, GRP_TIP_MBR_KICKED_OUT: 3, GRP_TIP_MBR_SET_ADMIN: 4, GRP_TIP_MBR_CANCELED_ADMIN: 5, GRP_TIP_GRP_PROFILE_UPDATED: 6, GRP_TIP_MBR_PROFILE_UPDATED: 7, MSG_REMIND_ACPT_AND_NOTE: "AcceptAndNotify", MSG_REMIND_ACPT_NOT_NOTE: "AcceptNotNotify", MSG_REMIND_DISCARD: "Discard", GENDER_UNKNOWN: "Gender_Type_Unknown", GENDER_FEMALE: "Gender_Type_Female", GENDER_MALE: "Gender_Type_Male", KICKED_OUT_MULT_ACCOUNT: "multipleAccount", KICKED_OUT_MULT_DEVICE: "multipleDevice", KICKED_OUT_USERSIG_EXPIRED: "userSigExpired", ALLOW_TYPE_ALLOW_ANY: "AllowType_Type_AllowAny", ALLOW_TYPE_NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_TYPE_DENY_ANY: "AllowType_Type_DenyAny", FORBID_TYPE_NONE: "AdminForbid_Type_None", FORBID_TYPE_SEND_OUT: "AdminForbid_Type_SendOut", JOIN_OPTIONS_FREE_ACCESS: "FreeAccess", JOIN_OPTIONS_NEED_PERMISSION: "NeedPermission", JOIN_OPTIONS_DISABLE_APPLY: "DisableApply", JOIN_STATUS_SUCCESS: "JoinedSuccess", JOIN_STATUS_ALREADY_IN_GROUP: "AlreadyInGroup", JOIN_STATUS_WAIT_APPROVAL: "WaitAdminApproval", GRP_PROFILE_OWNER_ID: "ownerID", GRP_PROFILE_CREATE_TIME: "createTime", GRP_PROFILE_LAST_INFO_TIME: "lastInfoTime", GRP_PROFILE_MEMBER_NUM: "memberNum", GRP_PROFILE_MAX_MEMBER_NUM: "maxMemberNum", GRP_PROFILE_JOIN_OPTION: "joinOption", GRP_PROFILE_INTRODUCTION: "introduction", GRP_PROFILE_NOTIFICATION: "notification", GRP_PROFILE_MUTE_ALL_MBRS: "muteAllMembers", SNS_ADD_TYPE_SINGLE: "Add_Type_Single", SNS_ADD_TYPE_BOTH: "Add_Type_Both", SNS_DELETE_TYPE_SINGLE: "Delete_Type_Single", SNS_DELETE_TYPE_BOTH: "Delete_Type_Both", SNS_APPLICATION_TYPE_BOTH: "Pendency_Type_Both", SNS_APPLICATION_SENT_TO_ME: "Pendency_Type_ComeIn", SNS_APPLICATION_SENT_BY_ME: "Pendency_Type_SendOut", SNS_APPLICATION_AGREE: "Response_Action_Agree", SNS_APPLICATION_AGREE_AND_ADD: "Response_Action_AgreeAndAdd", SNS_CHECK_TYPE_BOTH: "CheckResult_Type_Both", SNS_CHECK_TYPE_SINGLE: "CheckResult_Type_Single", SNS_TYPE_NO_RELATION: "CheckResult_Type_NoRelation", SNS_TYPE_A_WITH_B: "CheckResult_Type_AWithB", SNS_TYPE_B_WITH_A: "CheckResult_Type_BWithA", SNS_TYPE_BOTH_WAY: "CheckResult_Type_BothWay", NET_STATE_CONNECTED: "connected", NET_STATE_CONNECTING: "connecting", NET_STATE_DISCONNECTED: "disconnected", MSG_AT_ALL: "__kImSDK_MesssageAtALL__" },ao = at.map,so = We("map"),io = lt("map");Le({ target: "Array", proto: !0, forced: !so || !io }, { map: function map(e) {return ao(this, e, arguments.length > 1 ? arguments[1] : void 0);} });var uo = [].slice,co = {},lo = function lo(e, t, n) {if (!(t in co)) {for (var o = [], r = 0; r < t; r++) {o[r] = "a[" + r + "]";}co[t] = Function("C,a", "return new C(" + o.join(",") + ")");}return co[t](e, n);},po = Function.bind || function (e) {var t = et(this),n = uo.call(arguments, 1),o = function o() {var r = n.concat(uo.call(arguments));return this instanceof o ? lo(t, r.length, r) : t.apply(e, r);};return _(t.prototype) && (o.prototype = t.prototype), o;};Le({ target: "Function", proto: !0 }, { bind: po });var go = function () {function e() {bn(this, e), this.cache = [], this.options = null;}return Pn(e, [{ key: "use", value: function value(e) {if ("function" != typeof e) throw "middleware must be a function";return this.cache.push(e), this;} }, { key: "next", value: function value(e) {if (this.middlewares && this.middlewares.length > 0) return this.middlewares.shift().call(this, this.options, this.next.bind(this));} }, { key: "run", value: function value(e) {return this.middlewares = this.cache.map(function (e) {return e;}), this.options = e, this.next();} }]), e;}(),ho = k.f,fo = Function.prototype,_o = fo.toString,mo = /^\s*function ([^ (]*)/;a && !("name" in fo) && ho(fo, "name", { configurable: !0, get: function get() {try {return _o.call(this).match(mo)[1];} catch (jv) {return "";}} });var vo = t(function (t, n) {var o, r, a, s, i, u, c, l, p, d, g, h, f, _, m, v, M, y;t.exports = (o = "function" == typeof Promise, r = "object" == typeof self ? self : e, a = "undefined" != typeof Symbol, s = "undefined" != typeof Map, i = "undefined" != typeof Set, u = "undefined" != typeof WeakMap, c = "undefined" != typeof WeakSet, l = "undefined" != typeof DataView, p = a && void 0 !== Symbol.iterator, d = a && void 0 !== Symbol.toStringTag, g = i && "function" == typeof Set.prototype.entries, h = s && "function" == typeof Map.prototype.entries, f = g && Object.getPrototypeOf(new Set().entries()), _ = h && Object.getPrototypeOf(new Map().entries()), m = p && "function" == typeof Array.prototype[Symbol.iterator], v = m && Object.getPrototypeOf([][Symbol.iterator]()), M = p && "function" == typeof String.prototype[Symbol.iterator], y = M && Object.getPrototypeOf(""[Symbol.iterator]()), function (e) {var t = typeof e;if ("object" !== t) return t;if (null === e) return "null";if (e === r) return "global";if (Array.isArray(e) && (!1 === d || !(Symbol.toStringTag in e))) return "Array";if ("object" == typeof window && null !== window) {if ("object" == typeof window.location && e === window.location) return "Location";if ("object" == typeof window.document && e === window.document) return "Document";if ("object" == typeof window.navigator) {if ("object" == typeof window.navigator.mimeTypes && e === window.navigator.mimeTypes) return "MimeTypeArray";if ("object" == typeof window.navigator.plugins && e === window.navigator.plugins) return "PluginArray";}if (("function" == typeof window.HTMLElement || "object" == typeof window.HTMLElement) && e instanceof window.HTMLElement) {if ("BLOCKQUOTE" === e.tagName) return "HTMLQuoteElement";if ("TD" === e.tagName) return "HTMLTableDataCellElement";if ("TH" === e.tagName) return "HTMLTableHeaderCellElement";}}var n = d && e[Symbol.toStringTag];if ("string" == typeof n) return n;var a = Object.getPrototypeOf(e);return a === RegExp.prototype ? "RegExp" : a === Date.prototype ? "Date" : o && a === Promise.prototype ? "Promise" : i && a === Set.prototype ? "Set" : s && a === Map.prototype ? "Map" : c && a === WeakSet.prototype ? "WeakSet" : u && a === WeakMap.prototype ? "WeakMap" : l && a === DataView.prototype ? "DataView" : s && a === _ ? "Map Iterator" : i && a === f ? "Set Iterator" : m && a === v ? "Array Iterator" : M && a === y ? "String Iterator" : null === a ? "Object" : Object.prototype.toString.call(e).slice(8, -1);});});Le({ target: "Array", stat: !0 }, { isArray: Re });var Mo = xe("unscopables"),yo = Array.prototype;null == yo[Mo] && k.f(yo, Mo, { configurable: !0, value: Kt(null) });var Io = function Io(e) {yo[Mo][e] = !0;},So = at.find,To = !0,Do = lt("find");"find" in [] && Array(1).find(function () {To = !1;}), Le({ target: "Array", proto: !0, forced: To || !Do }, { find: function find(e) {return So(this, e, arguments.length > 1 ? arguments[1] : void 0);} }), Io("find");var Eo = he.includes,Co = lt("indexOf", { ACCESSORS: !0, 1: 0 });Le({ target: "Array", proto: !0, forced: !Co }, { includes: function includes(e) {return Eo(this, e, arguments.length > 1 ? arguments[1] : void 0);} }), Io("includes");var Ao = he.indexOf,ko = [].indexOf,No = !!ko && 1 / [1].indexOf(1, -0) < 0,Oo = st("indexOf"),Lo = lt("indexOf", { ACCESSORS: !0, 1: 0 });Le({ target: "Array", proto: !0, forced: No || !Oo || !Lo }, { indexOf: function indexOf(e) {return No ? ko.apply(this, arguments) || 0 : Ao(this, e, arguments.length > 1 ? arguments[1] : void 0);} });var Ro = ee.set,bo = ee.getterFor("Array Iterator"),wo = Dn(Array, "Array", function (e, t) {Ro(this, { type: "Array Iterator", target: _f2(e), index: 0, kind: t });}, function () {var e = bo(this),t = e.target,n = e.kind,o = e.index++;return !t || o >= t.length ? (e.target = void 0, { value: void 0, done: !0 }) : "keys" == n ? { value: o, done: !1 } : "values" == n ? { value: t[o], done: !1 } : { value: [o, t[o]], done: !1 };}, "values");_t.Arguments = _t.Array, Io("keys"), Io("values"), Io("entries");var Po = [].join,Go = g != Object,Uo = st("join", ",");Le({ target: "Array", proto: !0, forced: Go || !Uo }, { join: function join(e) {return Po.call(_f2(this), void 0 === e ? "," : e);} });var Fo = We("slice"),qo = lt("slice", { ACCESSORS: !0, 0: 0, 1: 2 }),xo = xe("species"),Vo = [].slice,Ko = Math.max;Le({ target: "Array", proto: !0, forced: !Fo || !qo }, { slice: function slice(e, t) {var n,o,r,a = _f2(this),s = ce(a.length),i = de(e, s),u = de(void 0 === t ? s : t, s);if (Re(a) && ("function" != typeof (n = a.constructor) || n !== Array && !Re(n.prototype) ? _(n) && null === (n = n[xo]) && (n = void 0) : n = void 0, n === Array || void 0 === n)) return Vo.call(a, i, u);for (o = new (void 0 === n ? Array : n)(Ko(u - i, 0)), r = 0; i < u; i++, r++) {i in a && we(o, r, a[i]);}return o.length = r, o;} }), Le({ target: "Date", stat: !0 }, { now: function now() {return new Date().getTime();} });var Bo = "".repeat || function (e) {var t = String(h(this)),n = "",o = ie(e);if (o < 0 || Infinity == o) throw RangeError("Wrong number of repetitions");for (; o > 0; (o >>>= 1) && (t += t)) {1 & o && (n += t);}return n;},Ho = Math.ceil,jo = function jo(e) {return function (t, n, o) {var r,a,s = String(h(t)),i = s.length,u = void 0 === o ? " " : String(o),c = ce(n);return c <= i || "" == u ? s : (r = c - i, (a = Bo.call(u, Ho(r / u.length))).length > r && (a = a.slice(0, r)), e ? s + a : a + s);};},$o = { start: jo(!1), end: jo(!0) }.start,Yo = Math.abs,zo = Date.prototype,Wo = zo.getTime,Jo = zo.toISOString,Xo = r(function () {return "0385-07-25T07:06:39.999Z" != Jo.call(new Date(-50000000000001));}) || !r(function () {Jo.call(new Date(NaN));}) ? function () {if (!isFinite(Wo.call(this))) throw RangeError("Invalid time value");var e = this.getUTCFullYear(),t = this.getUTCMilliseconds(),n = e < 0 ? "-" : e > 9999 ? "+" : "";return n + $o(Yo(e), n ? 6 : 4, 0) + "-" + $o(this.getUTCMonth() + 1, 2, 0) + "-" + $o(this.getUTCDate(), 2, 0) + "T" + $o(this.getUTCHours(), 2, 0) + ":" + $o(this.getUTCMinutes(), 2, 0) + ":" + $o(this.getUTCSeconds(), 2, 0) + "." + $o(t, 3, 0) + "Z";} : Jo;Le({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== Xo }, { toISOString: Xo });var Qo = Date.prototype,Zo = Qo.toString,er = Qo.getTime;new Date(NaN) + "" != "Invalid Date" && te(Qo, "toString", function () {var e = er.call(this);return e == e ? Zo.call(this) : "Invalid Date";});var tr = function tr(e, t, n) {var o, r;return Mn && "function" == typeof (o = t.constructor) && o !== n && _(r = o.prototype) && r !== n.prototype && Mn(e, r), e;},nr = Me.f,or = E.f,rr = k.f,ar = Wt.trim,sr = o.Number,ir = sr.prototype,ur = "Number" == p(Kt(ir)),cr = function cr(e) {var t,n,o,r,a,s,i,u,c = m(e, !1);if ("string" == typeof c && c.length > 2) if (43 === (t = (c = ar(c)).charCodeAt(0)) || 45 === t) {if (88 === (n = c.charCodeAt(2)) || 120 === n) return NaN;} else if (48 === t) {switch (c.charCodeAt(1)) {case 66:case 98:o = 2, r = 49;break;case 79:case 111:o = 8, r = 55;break;default:return +c;}for (s = (a = c.slice(2)).length, i = 0; i < s; i++) {if ((u = a.charCodeAt(i)) < 48 || u > r) return NaN;}return parseInt(a, o);}return +c;};if (Ne("Number", !sr(" 0o1") || !sr("0b1") || sr("+0x1"))) {for (var lr, pr = function pr(e) {var t = arguments.length < 1 ? 0 : e,n = this;return n instanceof pr && (ur ? r(function () {ir.valueOf.call(n);}) : "Number" != p(n)) ? tr(new sr(cr(t)), n, pr) : cr(t);}, dr = a ? nr(sr) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), gr = 0; dr.length > gr; gr++) {M(sr, lr = dr[gr]) && !M(pr, lr) && rr(pr, lr, or(sr, lr));}pr.prototype = ir, ir.constructor = pr, te(o, "Number", pr);}var hr = Me.f,fr = {}.toString,_r = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],mr = { f: function f(e) {return _r && "[object Window]" == fr.call(e) ? function (e) {try {return hr(e);} catch (jv) {return _r.slice();}}(e) : hr(_f2(e));} },vr = mr.f,Mr = r(function () {return !Object.getOwnPropertyNames(1);});Le({ target: "Object", stat: !0, forced: Mr }, { getOwnPropertyNames: vr });var yr = r(function () {cn(1);});Le({ target: "Object", stat: !0, forced: yr, sham: !an }, { getPrototypeOf: function getPrototypeOf(e) {return cn(be(e));} });var Ir = It ? {}.toString : function () {return "[object " + Dt(this) + "]";};It || te(Object.prototype, "toString", Ir, { unsafe: !0 });var Sr,Tr,Dr,Er = o.Promise,Cr = function Cr(e, t, n) {for (var o in t) {te(e, o, t[o], n);}return e;},Ar = xe("species"),kr = function kr(e) {var t = re(e),n = k.f;a && t && !t[Ar] && n(t, Ar, { configurable: !0, get: function get() {return this;} });},Nr = function Nr(e, t, n) {if (!(e instanceof t)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");return e;},Or = t(function (e) {var t = function t(e, _t2) {this.stopped = e, this.result = _t2;};(e.exports = function (e, n, o, r, a) {var s,i,u,c,l,p,d,g = nt(n, o, r ? 2 : 1);if (a) s = e;else {if ("function" != typeof (i = Ct(e))) throw TypeError("Target is not iterable");if (Mt(i)) {for (u = 0, c = ce(e.length); c > u; u++) {if ((l = r ? g(C(d = e[u])[0], d[1]) : g(e[u])) && l instanceof t) return l;}return new t(!1);}s = i.call(e);}for (p = s.next; !(d = p.call(s)).done;) {if ("object" == typeof (l = ft(s, g, d.value, r)) && l && l instanceof t) return l;}return new t(!1);}).stop = function (e) {return new t(!0, e);};}),Lr = xe("species"),Rr = function Rr(e, t) {var n,o = C(e).constructor;return void 0 === o || null == (n = C(o)[Lr]) ? t : et(n);},br = /(iphone|ipod|ipad).*applewebkit/i.test(Be),wr = o.location,Pr = o.setImmediate,Gr = o.clearImmediate,Ur = o.process,Fr = o.MessageChannel,qr = o.Dispatch,xr = 0,Vr = {},Kr = function Kr(e) {if (Vr.hasOwnProperty(e)) {var t = Vr[e];delete Vr[e], t();}},Br = function Br(e) {return function () {Kr(e);};},Hr = function Hr(e) {Kr(e.data);},jr = function jr(e) {o.postMessage(e + "", wr.protocol + "//" + wr.host);};Pr && Gr || (Pr = function Pr(e) {for (var t = [], n = 1; arguments.length > n;) {t.push(arguments[n++]);}return Vr[++xr] = function () {("function" == typeof e ? e : Function(e)).apply(void 0, t);}, Sr(xr), xr;}, Gr = function Gr(e) {delete Vr[e];}, "process" == p(Ur) ? Sr = function Sr(e) {Ur.nextTick(Br(e));} : qr && qr.now ? Sr = function Sr(e) {qr.now(Br(e));} : Fr && !br ? (Dr = (Tr = new Fr()).port2, Tr.port1.onmessage = Hr, Sr = nt(Dr.postMessage, Dr, 1)) : !o.addEventListener || "function" != typeof postMessage || o.importScripts || r(jr) ? Sr = "onreadystatechange" in S("script") ? function (e) {Ut.appendChild(S("script")).onreadystatechange = function () {Ut.removeChild(this), Kr(e);};} : function (e) {setTimeout(Br(e), 0);} : (Sr = jr, o.addEventListener("message", Hr, !1)));var $r,Yr,zr,Wr,Jr,Xr,Qr,Zr,ea = { set: Pr, clear: Gr },ta = E.f,na = ea.set,oa = o.MutationObserver || o.WebKitMutationObserver,ra = o.process,aa = o.Promise,sa = "process" == p(ra),ia = ta(o, "queueMicrotask"),ua = ia && ia.value;ua || ($r = function $r() {var e, t;for (sa && (e = ra.domain) && e.exit(); Yr;) {t = Yr.fn, Yr = Yr.next;try {t();} catch (jv) {throw Yr ? Wr() : zr = void 0, jv;}}zr = void 0, e && e.enter();}, sa ? Wr = function Wr() {ra.nextTick($r);} : oa && !br ? (Jr = !0, Xr = document.createTextNode(""), new oa($r).observe(Xr, { characterData: !0 }), Wr = function Wr() {Xr.data = Jr = !Jr;}) : aa && aa.resolve ? (Qr = aa.resolve(void 0), Zr = Qr.then, Wr = function Wr() {Zr.call(Qr, $r);}) : Wr = function Wr() {na.call(o, $r);});var ca,la,pa,da,ga = ua || function (e) {var t = { fn: e, next: void 0 };zr && (zr.next = t), Yr || (Yr = t, Wr()), zr = t;},ha = function ha(e) {var t, n;this.promise = new e(function (e, o) {if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");t = e, n = o;}), this.resolve = et(t), this.reject = et(n);},fa = { f: function f(e) {return new ha(e);} },_a = function _a(e, t) {if (C(e), _(t) && t.constructor === e) return t;var n = fa.f(e);return (0, n.resolve)(t), n.promise;},ma = function ma(e) {try {return { error: !1, value: e() };} catch (jv) {return { error: !0, value: jv };}},va = ea.set,Ma = xe("species"),ya = "Promise",Ia = ee.get,Sa = ee.set,Ta = ee.getterFor(ya),_Da = Er,Ea = o.TypeError,Ca = o.document,Aa = o.process,ka = re("fetch"),Na = fa.f,Oa = Na,La = "process" == p(Aa),Ra = !!(Ca && Ca.createEvent && o.dispatchEvent),ba = Ne(ya, function () {if (!(G(_Da) !== String(_Da))) {if (66 === Ye) return !0;if (!La && "function" != typeof PromiseRejectionEvent) return !0;}if (Ye >= 51 && /native code/.test(_Da)) return !1;var e = _Da.resolve(1),t = function t(e) {e(function () {}, function () {});};return (e.constructor = {})[Ma] = t, !(e.then(function () {}) instanceof t);}),wa = ba || !Rt(function (e) {_Da.all(e).catch(function () {});}),Pa = function Pa(e) {var t;return !(!_(e) || "function" != typeof (t = e.then)) && t;},Ga = function Ga(e, t, n) {if (!t.notified) {t.notified = !0;var o = t.reactions;ga(function () {for (var r = t.value, a = 1 == t.state, s = 0; o.length > s;) {var i,u,c,l = o[s++],p = a ? l.ok : l.fail,d = l.resolve,g = l.reject,h = l.domain;try {p ? (a || (2 === t.rejection && xa(e, t), t.rejection = 1), !0 === p ? i = r : (h && h.enter(), i = p(r), h && (h.exit(), c = !0)), i === l.promise ? g(Ea("Promise-chain cycle")) : (u = Pa(i)) ? u.call(i, d, g) : d(i)) : g(r);} catch (jv) {h && !c && h.exit(), g(jv);}}t.reactions = [], t.notified = !1, n && !t.rejection && Fa(e, t);});}},Ua = function Ua(e, t, n) {var r, a;Ra ? ((r = Ca.createEvent("Event")).promise = t, r.reason = n, r.initEvent(e, !1, !0), o.dispatchEvent(r)) : r = { promise: t, reason: n }, (a = o["on" + e]) ? a(r) : "unhandledrejection" === e && function (e, t) {var n = o.console;n && n.error && (1 === arguments.length ? n.error(e) : n.error(e, t));}("Unhandled promise rejection", n);},Fa = function Fa(e, t) {va.call(o, function () {var n,o = t.value;if (qa(t) && (n = ma(function () {La ? Aa.emit("unhandledRejection", o, e) : Ua("unhandledrejection", e, o);}), t.rejection = La || qa(t) ? 2 : 1, n.error)) throw n.value;});},qa = function qa(e) {return 1 !== e.rejection && !e.parent;},xa = function xa(e, t) {va.call(o, function () {La ? Aa.emit("rejectionHandled", e) : Ua("rejectionhandled", e, t.value);});},Va = function Va(e, t, n, o) {return function (r) {e(t, n, r, o);};},Ka = function Ka(e, t, n, o) {t.done || (t.done = !0, o && (t = o), t.value = n, t.state = 2, Ga(e, t, !0));},Ba = function Ba(e, t, n, o) {if (!t.done) {t.done = !0, o && (t = o);try {if (e === n) throw Ea("Promise can't be resolved itself");var r = Pa(n);r ? ga(function () {var o = { done: !1 };try {r.call(n, Va(Ba, e, o, t), Va(Ka, e, o, t));} catch (jv) {Ka(e, o, jv, t);}}) : (t.value = n, t.state = 1, Ga(e, t, !1));} catch (jv) {Ka(e, { done: !1 }, jv, t);}}};ba && (_Da = function Da(e) {Nr(this, _Da, ya), et(e), ca.call(this);var t = Ia(this);try {e(Va(Ba, this, t), Va(Ka, this, t));} catch (jv) {Ka(this, t, jv);}}, (ca = function ca(e) {Sa(this, { type: ya, done: !1, notified: !1, parent: !1, reactions: [], rejection: !1, state: 0, value: void 0 });}).prototype = Cr(_Da.prototype, { then: function then(e, t) {var n = Ta(this),o = Na(Rr(this, _Da));return o.ok = "function" != typeof e || e, o.fail = "function" == typeof t && t, o.domain = La ? Aa.domain : void 0, n.parent = !0, n.reactions.push(o), 0 != n.state && Ga(this, n, !1), o.promise;}, catch: function _catch(e) {return this.then(void 0, e);} }), la = function la() {var e = new ca(),t = Ia(e);this.promise = e, this.resolve = Va(Ba, e, t), this.reject = Va(Ka, e, t);}, fa.f = Na = function Na(e) {return e === _Da || e === pa ? new la(e) : Oa(e);}, "function" == typeof Er && (da = Er.prototype.then, te(Er.prototype, "then", function (e, t) {var n = this;return new _Da(function (e, t) {da.call(n, e, t);}).then(e, t);}, { unsafe: !0 }), "function" == typeof ka && Le({ global: !0, enumerable: !0, forced: !0 }, { fetch: function fetch(e) {return _a(_Da, ka.apply(o, arguments));} }))), Le({ global: !0, wrap: !0, forced: ba }, { Promise: _Da }), fn(_Da, ya, !1), kr(ya), pa = re(ya), Le({ target: ya, stat: !0, forced: ba }, { reject: function reject(e) {var t = Na(this);return t.reject.call(void 0, e), t.promise;} }), Le({ target: ya, stat: !0, forced: ba }, { resolve: function resolve(e) {return _a(this, e);} }), Le({ target: ya, stat: !0, forced: wa }, { all: function all(e) {var t = this,n = Na(t),o = n.resolve,r = n.reject,a = ma(function () {var n = et(t.resolve),a = [],s = 0,i = 1;Or(e, function (e) {var u = s++,c = !1;a.push(void 0), i++, n.call(t, e).then(function (e) {c || (c = !0, a[u] = e, --i || o(a));}, r);}), --i || o(a);});return a.error && r(a.value), n.promise;}, race: function race(e) {var t = this,n = Na(t),o = n.reject,r = ma(function () {var r = et(t.resolve);Or(e, function (e) {r.call(t, e).then(n.resolve, o);});});return r.error && o(r.value), n.promise;} });var Ha = function Ha() {var e = C(this),t = "";return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.sticky && (t += "y"), t;};function ja(e, t) {return RegExp(e, t);}var $a,Ya,za = { UNSUPPORTED_Y: r(function () {var e = ja("a", "y");return e.lastIndex = 2, null != e.exec("abcd");}), BROKEN_CARET: r(function () {var e = ja("^r", "gy");return e.lastIndex = 2, null != e.exec("str");}) },Wa = RegExp.prototype.exec,Ja = String.prototype.replace,Xa = Wa,Qa = ($a = /a/, Ya = /b*/g, Wa.call($a, "a"), Wa.call(Ya, "a"), 0 !== $a.lastIndex || 0 !== Ya.lastIndex),Za = za.UNSUPPORTED_Y || za.BROKEN_CARET,es = void 0 !== /()??/.exec("")[1];(Qa || es || Za) && (Xa = function Xa(e) {var t,n,o,r,a = this,s = Za && a.sticky,i = Ha.call(a),u = a.source,c = 0,l = e;return s && (-1 === (i = i.replace("y", "")).indexOf("g") && (i += "g"), l = String(e).slice(a.lastIndex), a.lastIndex > 0 && (!a.multiline || a.multiline && "\n" !== e[a.lastIndex - 1]) && (u = "(?: " + u + ")", l = " " + l, c++), n = new RegExp("^(?:" + u + ")", i)), es && (n = new RegExp("^" + u + "$(?!\\s)", i)), Qa && (t = a.lastIndex), o = Wa.call(s ? n : a, l), s ? o ? (o.input = o.input.slice(c), o[0] = o[0].slice(c), o.index = a.lastIndex, a.lastIndex += o[0].length) : a.lastIndex = 0 : Qa && o && (a.lastIndex = a.global ? o.index + o[0].length : t), es && o && o.length > 1 && Ja.call(o[0], n, function () {for (r = 1; r < arguments.length - 2; r++) {void 0 === arguments[r] && (o[r] = void 0);}}), o;});var ts = Xa;Le({ target: "RegExp", proto: !0, forced: /./.exec !== ts }, { exec: ts });var ns = RegExp.prototype,os = ns.toString,rs = r(function () {return "/a/b" != os.call({ source: "a", flags: "b" });}),as = "toString" != os.name;(rs || as) && te(RegExp.prototype, "toString", function () {var e = C(this),t = String(e.source),n = e.flags;return "/" + t + "/" + String(void 0 === n && e instanceof RegExp && !("flags" in ns) ? Ha.call(e) : n);}, { unsafe: !0 });var ss = rn.codeAt;Le({ target: "String", proto: !0 }, { codePointAt: function codePointAt(e) {return ss(this, e);} });var is = xe("match"),us = function us(e) {var t;return _(e) && (void 0 !== (t = e[is]) ? !!t : "RegExp" == p(e));},cs = function cs(e) {if (us(e)) throw TypeError("The method doesn't accept regular expressions");return e;},ls = xe("match"),ps = function ps(e) {var t = /./;try {"/./"[e](t);} catch (n) {try {return t[ls] = !1, "/./"[e](t);} catch (o) {}}return !1;};Le({ target: "String", proto: !0, forced: !ps("includes") }, { includes: function includes(e) {return !!~String(h(this)).indexOf(cs(e), arguments.length > 1 ? arguments[1] : void 0);} });var ds = xe("species"),gs = !r(function () {var e = /./;return e.exec = function () {var e = [];return e.groups = { a: "7" }, e;}, "7" !== "".replace(e, "$<a>");}),hs = "$0" === "a".replace(/./, "$0"),fs = xe("replace"),_s = !!/./[fs] && "" === /./[fs]("a", "$0"),ms = !r(function () {var e = /(?:)/,t = e.exec;e.exec = function () {return t.apply(this, arguments);};var n = "ab".split(e);return 2 !== n.length || "a" !== n[0] || "b" !== n[1];}),vs = function vs(e, t, n, o) {var a = xe(e),s = !r(function () {var t = {};return t[a] = function () {return 7;}, 7 != ""[e](t);}),i = s && !r(function () {var t = !1,n = /a/;return "split" === e && ((n = {}).constructor = {}, n.constructor[ds] = function () {return n;}, n.flags = "", n[a] = /./[a]), n.exec = function () {return t = !0, null;}, n[a](""), !t;});if (!s || !i || "replace" === e && (!gs || !hs || _s) || "split" === e && !ms) {var u = /./[a],c = n(a, ""[e], function (e, t, n, o, r) {return t.exec === ts ? s && !r ? { done: !0, value: u.call(t, n, o) } : { done: !0, value: e.call(n, t, o) } : { done: !1 };}, { REPLACE_KEEPS_$0: hs, REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: _s }),l = c[0],p = c[1];te(String.prototype, e, l), te(RegExp.prototype, a, 2 == t ? function (e, t) {return p.call(e, this, t);} : function (e) {return p.call(e, this);});}o && N(RegExp.prototype[a], "sham", !0);},Ms = rn.charAt,ys = function ys(e, t, n) {return t + (n ? Ms(e, t).length : 1);},Is = function Is(e, t) {var n = e.exec;if ("function" == typeof n) {var o = n.call(e, t);if ("object" != typeof o) throw TypeError("RegExp exec method returned something other than an Object or null");return o;}if ("RegExp" !== p(e)) throw TypeError("RegExp#exec called on incompatible receiver");return ts.call(e, t);};vs("match", 1, function (e, t, n) {return [function (t) {var n = h(this),o = null == t ? void 0 : t[e];return void 0 !== o ? o.call(t, n) : new RegExp(t)[e](String(n));}, function (e) {var o = n(t, e, this);if (o.done) return o.value;var r = C(e),a = String(this);if (!r.global) return Is(r, a);var s = r.unicode;r.lastIndex = 0;for (var i, u = [], c = 0; null !== (i = Is(r, a));) {var l = String(i[0]);u[c] = l, "" === l && (r.lastIndex = ys(a, ce(r.lastIndex), s)), c++;}return 0 === c ? null : u;}];});var Ss = Math.max,Ts = Math.min,Ds = Math.floor,Es = /\$([$&'`]|\d\d?|<[^>]*>)/g,Cs = /\$([$&'`]|\d\d?)/g;vs("replace", 2, function (e, t, n, o) {var r = o.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,a = o.REPLACE_KEEPS_$0,s = r ? "$" : "$0";return [function (n, o) {var r = h(this),a = null == n ? void 0 : n[e];return void 0 !== a ? a.call(n, r, o) : t.call(String(r), n, o);}, function (e, o) {if (!r && a || "string" == typeof o && -1 === o.indexOf(s)) {var u = n(t, e, this, o);if (u.done) return u.value;}var c = C(e),l = String(this),p = "function" == typeof o;p || (o = String(o));var d = c.global;if (d) {var g = c.unicode;c.lastIndex = 0;}for (var h = [];;) {var f = Is(c, l);if (null === f) break;if (h.push(f), !d) break;"" === String(f[0]) && (c.lastIndex = ys(l, ce(c.lastIndex), g));}for (var _, m = "", v = 0, M = 0; M < h.length; M++) {f = h[M];for (var y = String(f[0]), I = Ss(Ts(ie(f.index), l.length), 0), S = [], T = 1; T < f.length; T++) {S.push(void 0 === (_ = f[T]) ? _ : String(_));}var D = f.groups;if (p) {var E = [y].concat(S, I, l);void 0 !== D && E.push(D);var A = String(o.apply(void 0, E));} else A = i(y, l, I, S, D, o);I >= v && (m += l.slice(v, I) + A, v = I + y.length);}return m + l.slice(v);}];function i(e, n, o, r, a, s) {var i = o + e.length,u = r.length,c = Cs;return void 0 !== a && (a = be(a), c = Es), t.call(s, c, function (t, s) {var c;switch (s.charAt(0)) {case "$":return "$";case "&":return e;case "`":return n.slice(0, o);case "'":return n.slice(i);case "<":c = a[s.slice(1, -1)];break;default:var l = +s;if (0 === l) return t;if (l > u) {var p = Ds(l / 10);return 0 === p ? t : p <= u ? void 0 === r[p - 1] ? s.charAt(1) : r[p - 1] + s.charAt(1) : t;}c = r[l - 1];}return void 0 === c ? "" : c;});}});var As = xe("iterator"),ks = xe("toStringTag"),Ns = wo.values;for (var Os in kn) {var Ls = o[Os],Rs = Ls && Ls.prototype;if (Rs) {if (Rs[As] !== Ns) try {N(Rs, As, Ns);} catch (jv) {Rs[As] = Ns;}if (Rs[ks] || N(Rs, ks, Os), kn[Os]) for (var bs in wo) {if (Rs[bs] !== wo[bs]) try {N(Rs, bs, wo[bs]);} catch (jv) {Rs[bs] = wo[bs];}}}}var ws = Wt.trim,Ps = o.parseFloat,Gs = 1 / Ps(Ht + "-0") != -Infinity ? function (e) {var t = ws(String(e)),n = Ps(t);return 0 === n && "-" == t.charAt(0) ? -0 : n;} : Ps;Le({ global: !0, forced: parseFloat != Gs }, { parseFloat: Gs });var Us = { WEB: 7, WX_MP: 8, QQ_MP: 9, TT_MP: 10, BAIDU_MP: 11, ALI_MP: 12, UNI_NATIVE_APP: 14 },Fs = "1.7.3",qs = 537048168,xs = 1,Vs = 2,Ks = 3,Bs = { HOST: { CURRENT: { DEFAULT: "", BACKUP: "" }, TEST: { DEFAULT: "wss://wss-dev.tim.qq.com", BACKUP: "wss://wss-dev.tim.qq.com" }, PRODUCTION: { DEFAULT: "wss://wss.im.qcloud.com", BACKUP: "wss://wss.tim.qq.com" }, OVERSEA_PRODUCTION: { DEFAULT: "wss://wss.im.qcloud.com", BACKUP: "wss://wss.im.qcloud.com" }, setCurrent: function setCurrent() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2;e === xs ? this.CURRENT = this.TEST : e === Vs ? this.CURRENT = this.PRODUCTION : e === Ks && (this.CURRENT = this.OVERSEA_PRODUCTION);} }, NAME: { OPEN_IM: "openim", GROUP: "group_open_http_svc", GROUP_ATTR: "group_open_attr_http_svc", FRIEND: "sns", PROFILE: "profile", RECENT_CONTACT: "recentcontact", PIC: "openpic", BIG_GROUP_NO_AUTH: "group_open_http_noauth_svc", BIG_GROUP_LONG_POLLING: "group_open_long_polling_http_svc", BIG_GROUP_LONG_POLLING_NO_AUTH: "group_open_long_polling_http_noauth_svc", IM_OPEN_STAT: "imopenstat", WEB_IM: "webim", IM_COS_SIGN: "im_cos_sign_svr", CUSTOM_UPLOAD: "im_cos_msg", HEARTBEAT: "heartbeat", IM_OPEN_PUSH: "im_open_push", IM_OPEN_STATUS: "im_open_status", IM_LONG_MESSAGE: "im_long_msg", CLOUD_CONTROL: "im_sdk_config_mgr" }, CMD: { ACCESS_LAYER: "accesslayer", LOGIN: "wslogin", LOGOUT_LONG_POLL: "longpollinglogout", LOGOUT: "wslogout", HELLO: "wshello", PORTRAIT_GET: "portrait_get_all", PORTRAIT_SET: "portrait_set", GET_LONG_POLL_ID: "getlongpollingid", LONG_POLL: "longpolling", AVCHATROOM_LONG_POLL: "get_msg", ADD_FRIEND: "friend_add", UPDATE_FRIEND: "friend_update", GET_FRIEND_LIST: "friend_get", GET_FRIEND_PROFILE: "friend_get_list", DELETE_FRIEND: "friend_delete", CHECK_FRIEND: "friend_check", GET_FRIEND_GROUP_LIST: "group_get", RESPOND_FRIEND_APPLICATION: "friend_response", GET_FRIEND_APPLICATION_LIST: "pendency_get", DELETE_FRIEND_APPLICATION: "pendency_delete", REPORT_FRIEND_APPLICATION: "pendency_report", GET_GROUP_APPLICATION: "get_pendency", CREATE_FRIEND_GROUP: "group_add", DELETE_FRIEND_GROUP: "group_delete", UPDATE_FRIEND_GROUP: "group_update", GET_BLACKLIST: "black_list_get", ADD_BLACKLIST: "black_list_add", DELETE_BLACKLIST: "black_list_delete", CREATE_GROUP: "create_group", GET_JOINED_GROUPS: "get_joined_group_list", SET_GROUP_ATTRIBUTES: "set_group_attr", MODIFY_GROUP_ATTRIBUTES: "modify_group_attr", DELETE_GROUP_ATTRIBUTES: "delete_group_attr", CLEAR_GROUP_ATTRIBUTES: "clear_group_attr", GET_GROUP_ATTRIBUTES: "get_group_attr", SEND_MESSAGE: "sendmsg", REVOKE_C2C_MESSAGE: "msgwithdraw", DELETE_C2C_MESSAGE: "delete_c2c_msg_ramble", SEND_GROUP_MESSAGE: "send_group_msg", REVOKE_GROUP_MESSAGE: "group_msg_recall", DELETE_GROUP_MESSAGE: "delete_group_ramble_msg_by_seq", GET_GROUP_INFO: "get_group_info", GET_GROUP_MEMBER_INFO: "get_specified_group_member_info", GET_GROUP_MEMBER_LIST: "get_group_member_info", QUIT_GROUP: "quit_group", CHANGE_GROUP_OWNER: "change_group_owner", DESTROY_GROUP: "destroy_group", ADD_GROUP_MEMBER: "add_group_member", DELETE_GROUP_MEMBER: "delete_group_member", SEARCH_GROUP_BY_ID: "get_group_public_info", APPLY_JOIN_GROUP: "apply_join_group", HANDLE_APPLY_JOIN_GROUP: "handle_apply_join_group", HANDLE_GROUP_INVITATION: "handle_invite_join_group", MODIFY_GROUP_INFO: "modify_group_base_info", MODIFY_GROUP_MEMBER_INFO: "modify_group_member_info", DELETE_GROUP_SYSTEM_MESSAGE: "deletemsg", DELETE_GROUP_AT_TIPS: "deletemsg", GET_CONVERSATION_LIST: "get", PAGING_GET_CONVERSATION_LIST: "page_get", DELETE_CONVERSATION: "delete", PIN_CONVERSATION: "top", GET_MESSAGES: "getmsg", GET_C2C_ROAM_MESSAGES: "getroammsg", GET_GROUP_ROAM_MESSAGES: "group_msg_get", SET_C2C_MESSAGE_READ: "msgreaded", GET_PEER_READ_TIME: "get_peer_read_time", SET_GROUP_MESSAGE_READ: "msg_read_report", FILE_READ_AND_WRITE_AUTHKEY: "authkey", FILE_UPLOAD: "pic_up", COS_SIGN: "cos", COS_PRE_SIG: "pre_sig", TIM_WEB_REPORT_V2: "tim_web_report_v2", BIG_DATA_HALLWAY_AUTH_KEY: "authkey", GET_ONLINE_MEMBER_NUM: "get_online_member_num", ALIVE: "alive", MESSAGE_PUSH: "msg_push", MESSAGE_PUSH_ACK: "ws_msg_push_ack", STATUS_FORCEOFFLINE: "stat_forceoffline", DOWNLOAD_MERGER_MESSAGE: "get_relay_json_msg", UPLOAD_MERGER_MESSAGE: "save_relay_json_msg", FETCH_CLOUD_CONTROL_CONFIG: "fetch_config", PUSHED_CLOUD_CONTROL_CONFIG: "push_configv2" }, CHANNEL: { SOCKET: 1, XHR: 2, AUTO: 0 }, NAME_VERSION: { openim: "v4", group_open_http_svc: "v4", sns: "v4", profile: "v4", recentcontact: "v4", openpic: "v4", group_open_http_noauth_svc: "v4", group_open_long_polling_http_svc: "v4", group_open_long_polling_http_noauth_svc: "v4", imopenstat: "v4", im_cos_sign_svr: "v4", im_cos_msg: "v4", webim: "v4", im_open_push: "v4", im_open_status: "v4" } };Bs.HOST.setCurrent(Vs);var Hs,js,$s,Ys = "undefined" != typeof wx && "function" == typeof wx.getSystemInfoSync && Boolean(wx.getSystemInfoSync().fontSizeSetting),zs = "undefined" != typeof qq && "function" == typeof qq.getSystemInfoSync && Boolean(qq.getSystemInfoSync().fontSizeSetting),Ws = "undefined" != typeof tt && "function" == typeof tt.getSystemInfoSync && Boolean(tt.getSystemInfoSync().fontSizeSetting),Js = "undefined" != typeof swan && "function" == typeof swan.getSystemInfoSync && Boolean(swan.getSystemInfoSync().fontSizeSetting),Xs = "undefined" != typeof my && "function" == typeof my.getSystemInfoSync && Boolean(my.getSystemInfoSync().fontSizeSetting),Qs = "undefined" != typeof uni && "undefined" == typeof window,Zs = Ys || zs || Ws || Js || Xs || Qs,ei = ("undefined" != typeof uni || "undefined" != typeof window) && !Zs,ti = zs ? qq : Ws ? tt : Js ? swan : Xs ? my : Ys ? wx : Qs ? uni : {},ni = (Hs = "WEB", _i ? Hs = "WEB" : zs ? Hs = "QQ_MP" : Ws ? Hs = "TT_MP" : Js ? Hs = "BAIDU_MP" : Xs ? Hs = "ALI_MP" : Ys ? Hs = "WX_MP" : Qs && (Hs = "UNI_NATIVE_APP"), Us[Hs]),oi = ei && window && window.navigator && window.navigator.userAgent || "",ri = /AppleWebKit\/([\d.]+)/i.exec(oi),ai = (ri && parseFloat(ri.pop()), /iPad/i.test(oi)),si = /iPhone/i.test(oi) && !ai,ii = /iPod/i.test(oi),ui = si || ai || ii,ci = (function () {var e = oi.match(/OS (\d+)_/i);e && e[1] && e[1];}(), /Android/i.test(oi)),li = function () {var e = oi.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if (!e) return null;var t = e[1] && parseFloat(e[1]),n = e[2] && parseFloat(e[2]);return t && n ? parseFloat(e[1] + "." + e[2]) : t || null;}(),pi = (ci && /webkit/i.test(oi), /Firefox/i.test(oi), /Edge/i.test(oi)),di = !pi && /Chrome/i.test(oi),gi = (function () {var e = oi.match(/Chrome\/(\d+)/);e && e[1] && parseFloat(e[1]);}(), /MSIE/.test(oi)),hi = (/MSIE\s8\.0/.test(oi), function () {var e = /MSIE\s(\d+)\.\d/.exec(oi),t = e && parseFloat(e[1]);return !t && /Trident\/7.0/i.test(oi) && /rv:11.0/.test(oi) && (t = 11), t;}()),fi = (/Safari/i.test(oi), /TBS\/\d+/i.test(oi)),_i = (function () {var e = oi.match(/TBS\/(\d+)/i);if (e && e[1]) e[1];}(), !fi && /MQQBrowser\/\d+/i.test(oi), !fi && / QQBrowser\/\d+/i.test(oi), /(micromessenger|webbrowser)/i.test(oi)),mi = /Windows/i.test(oi),vi = /MAC OS X/i.test(oi),Mi = (/MicroMessenger/i.test(oi), !r(function () {return Object.isExtensible(Object.preventExtensions({}));})),yi = t(function (e) {var t = k.f,n = K("meta"),o = 0,r = Object.isExtensible || function () {return !0;},a = function a(e) {t(e, n, { value: { objectID: "O" + ++o, weakData: {} } });},s = e.exports = { REQUIRED: !1, fastKey: function fastKey(e, t) {if (!_(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;if (!M(e, n)) {if (!r(e)) return "F";if (!t) return "E";a(e);}return e[n].objectID;}, getWeakData: function getWeakData(e, t) {if (!M(e, n)) {if (!r(e)) return !0;if (!t) return !1;a(e);}return e[n].weakData;}, onFreeze: function onFreeze(e) {return Mi && s.REQUIRED && r(e) && !M(e, n) && a(e), e;} };j[n] = !0;}),Ii = (yi.REQUIRED, yi.fastKey, yi.getWeakData, yi.onFreeze, k.f),Si = yi.fastKey,Ti = ee.set,Di = ee.getterFor,Ei = (function (e, t, n) {var a = -1 !== e.indexOf("Map"),s = -1 !== e.indexOf("Weak"),i = a ? "set" : "add",u = o[e],c = u && u.prototype,l = u,p = {},d = function d(e) {var t = c[e];te(c, e, "add" == e ? function (e) {return t.call(this, 0 === e ? 0 : e), this;} : "delete" == e ? function (e) {return !(s && !_(e)) && t.call(this, 0 === e ? 0 : e);} : "get" == e ? function (e) {return s && !_(e) ? void 0 : t.call(this, 0 === e ? 0 : e);} : "has" == e ? function (e) {return !(s && !_(e)) && t.call(this, 0 === e ? 0 : e);} : function (e, n) {return t.call(this, 0 === e ? 0 : e, n), this;});};if (Ne(e, "function" != typeof u || !(s || c.forEach && !r(function () {new u().entries().next();})))) l = n.getConstructor(t, e, a, i), yi.REQUIRED = !0;else if (Ne(e, !0)) {var g = new l(),h = g[i](s ? {} : -0, 1) != g,f = r(function () {g.has(1);}),m = Rt(function (e) {new u(e);}),v = !s && r(function () {for (var e = new u(), t = 5; t--;) {e[i](t, t);}return !e.has(-0);});m || ((l = t(function (t, n) {Nr(t, l, e);var o = tr(new u(), t, l);return null != n && Or(n, o[i], o, a), o;})).prototype = c, c.constructor = l), (f || v) && (d("delete"), d("has"), a && d("get")), (v || h) && d(i), s && c.clear && delete c.clear;}p[e] = l, Le({ global: !0, forced: l != u }, p), fn(l, e), s || n.setStrong(l, e, a);}("Map", function (e) {return function () {return e(this, arguments.length ? arguments[0] : void 0);};}, { getConstructor: function getConstructor(e, t, n, o) {var r = e(function (e, s) {Nr(e, r, t), Ti(e, { type: t, index: Kt(null), first: void 0, last: void 0, size: 0 }), a || (e.size = 0), null != s && Or(s, e[o], e, n);}),s = Di(t),i = function i(e, t, n) {var o,r,i = s(e),c = u(e, t);return c ? c.value = n : (i.last = c = { index: r = Si(t, !0), key: t, value: n, previous: o = i.last, next: void 0, removed: !1 }, i.first || (i.first = c), o && (o.next = c), a ? i.size++ : e.size++, "F" !== r && (i.index[r] = c)), e;},u = function u(e, t) {var n,o = s(e),r = Si(t);if ("F" !== r) return o.index[r];for (n = o.first; n; n = n.next) {if (n.key == t) return n;}};return Cr(r.prototype, { clear: function clear() {for (var e = s(this), t = e.index, n = e.first; n;) {n.removed = !0, n.previous && (n.previous = n.previous.next = void 0), delete t[n.index], n = n.next;}e.first = e.last = void 0, a ? e.size = 0 : this.size = 0;}, delete: function _delete(e) {var t = s(this),n = u(this, e);if (n) {var o = n.next,r = n.previous;delete t.index[n.index], n.removed = !0, r && (r.next = o), o && (o.previous = r), t.first == n && (t.first = o), t.last == n && (t.last = r), a ? t.size-- : this.size--;}return !!n;}, forEach: function forEach(e) {for (var t, n = s(this), o = nt(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.next : n.first;) {for (o(t.value, t.key, this); t && t.removed;) {t = t.previous;}}}, has: function has(e) {return !!u(this, e);} }), Cr(r.prototype, n ? { get: function get(e) {var t = u(this, e);return t && t.value;}, set: function set(e, t) {return i(this, 0 === e ? 0 : e, t);} } : { add: function add(e) {return i(this, e = 0 === e ? 0 : e, e);} }), a && Ii(r.prototype, "size", { get: function get() {return s(this).size;} }), r;}, setStrong: function setStrong(e, t, n) {var o = t + " Iterator",r = Di(t),a = Di(o);Dn(e, t, function (e, t) {Ti(this, { type: o, target: e, state: r(e), kind: t, last: void 0 });}, function () {for (var e = a(this), t = e.kind, n = e.last; n && n.removed;) {n = n.previous;}return e.target && (e.last = n = n ? n.next : e.state.first) ? "keys" == t ? { value: n.key, done: !1 } : "values" == t ? { value: n.value, done: !1 } : { value: [n.key, n.value], done: !1 } : (e.target = void 0, { value: void 0, done: !0 });}, n ? "entries" : "values", !n, !0), kr(t);} }), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});js = "undefined" != typeof console ? console : void 0 !== Ei && Ei.console ? Ei.console : "undefined" != typeof window && window.console ? window.console : {};for (var Ci = function Ci() {}, Ai = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], ki = Ai.length; ki--;) {$s = Ai[ki], console[$s] || (js[$s] = Ci);}js.methods = Ai;var Ni = js,Oi = 0,Li = function Li() {return new Date().getTime() + Oi;},Ri = function Ri() {Oi = 0;},bi = 0,wi = new Map();function Pi() {var e,t = ((e = new Date()).setTime(Li()), e);return "TIM " + t.toLocaleTimeString("en-US", { hour12: !1 }) + "." + function (e) {var t;switch (e.toString().length) {case 1:t = "00" + e;break;case 2:t = "0" + e;break;default:t = e;}return t;}(t.getMilliseconds()) + ":";}var Gi = { arguments2String: function arguments2String(e) {var t;if (1 === e.length) t = Pi() + e[0];else {t = Pi();for (var n = 0, o = e.length; n < o; n++) {Hi(e[n]) ? $i(e[n]) ? t += Qi(e[n]) : t += JSON.stringify(e[n]) : t += e[n], t += " ";}}return t;}, debug: function debug() {if (bi <= -1) {var e = this.arguments2String(arguments);Ni.debug(e);}}, log: function log() {if (bi <= 0) {var e = this.arguments2String(arguments);Ni.log(e);}}, info: function info() {if (bi <= 1) {var e = this.arguments2String(arguments);Ni.info(e);}}, warn: function warn() {if (bi <= 2) {var e = this.arguments2String(arguments);Ni.warn(e);}}, error: function error() {if (bi <= 3) {var e = this.arguments2String(arguments);Ni.error(e);}}, time: function time(e) {wi.set(e, Ji.now());}, timeEnd: function timeEnd(e) {if (wi.has(e)) {var t = Ji.now() - wi.get(e);return wi.delete(e), t;}return Ni.warn("未找到对应label: ".concat(e, ", 请在调用 logger.timeEnd 前，调用 logger.time")), 0;}, setLevel: function setLevel(e) {e < 4 && Ni.log(Pi() + "set level from " + bi + " to " + e), bi = e;}, getLevel: function getLevel() {return bi;} },Ui = function Ui(e) {return "file" === Yi(e);},Fi = function Fi(e) {return null !== e && ("number" == typeof e && !isNaN(e - 0) || "object" === Rn(e) && e.constructor === Number);},qi = function qi(e) {return "string" == typeof e;},xi = function xi(e) {return null !== e && "object" === Rn(e);},Vi = function Vi(e) {if ("object" !== Rn(e) || null === e) return !1;var t = Object.getPrototypeOf(e);if (null === t) return !0;for (var n = t; null !== Object.getPrototypeOf(n);) {n = Object.getPrototypeOf(n);}return t === n;},Ki = function Ki(e) {return "function" == typeof Array.isArray ? Array.isArray(e) : "array" === Yi(e);},Bi = function Bi(e) {return void 0 === e;},Hi = function Hi(e) {return Ki(e) || xi(e);},ji = function ji(e) {return "function" == typeof e;},$i = function $i(e) {return e instanceof Error;},Yi = function Yi(e) {return Object.prototype.toString.call(e).match(/^\[object (.*)\]$/)[1].toLowerCase();},zi = function zi(e) {if ("string" != typeof e) return !1;var t = e[0];return !/[^a-zA-Z0-9]/.test(t);},Wi = 0;Date.now || (Date.now = function () {return new Date().getTime();});var Ji = { now: function now() {0 === Wi && (Wi = Date.now() - 1);var e = Date.now() - Wi;return e > 4294967295 ? (Wi += 4294967295, Date.now() - Wi) : e;}, utc: function utc() {return Math.round(Date.now() / 1e3);} },Xi = function e(t, n, o, r) {if (!Hi(t) || !Hi(n)) return 0;for (var a, s = 0, i = Object.keys(n), u = 0, c = i.length; u < c; u++) {if (a = i[u], !(Bi(n[a]) || o && o.includes(a))) if (Hi(t[a]) && Hi(n[a])) s += e(t[a], n[a], o, r);else {if (r && r.includes(n[a])) continue;t[a] !== n[a] && (t[a] = n[a], s += 1);}}return s;},Qi = function Qi(e) {return JSON.stringify(e, ["message", "code"]);},Zi = function Zi(e) {if (0 === e.length) return 0;for (var t = 0, n = 0, o = "undefined" != typeof document && void 0 !== document.characterSet ? document.characterSet : "UTF-8"; void 0 !== e[t];) {n += e[t++].charCodeAt[t] <= 255 ? 1 : !1 === o ? 3 : 2;}return n;},eu = function eu(e) {var t = e || 99999999;return Math.round(Math.random() * t);},tu = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",nu = tu.length,ou = function ou(e, t) {for (var n in e) {if (e[n] === t) return !0;}return !1;},ru = {},au = function au() {if (Zs) return "https:";if (ei && "undefined" == typeof window) return "https:";var e = window.location.protocol;return ["http:", "https:"].indexOf(e) < 0 && (e = "http:"), e;},su = function su(e) {return -1 === e.indexOf("http://") || -1 === e.indexOf("https://") ? "https://" + e : e.replace(/https|http/, "https");},iu = function e(t) {if (0 === Object.getOwnPropertyNames(t).length) return Object.create(null);var n = Array.isArray(t) ? [] : Object.create(null),o = "";for (var r in t) {null !== t[r] ? void 0 !== t[r] ? (o = Rn(t[r]), ["string", "number", "function", "boolean"].indexOf(o) >= 0 ? n[r] = t[r] : n[r] = e(t[r])) : n[r] = void 0 : n[r] = null;}return n;};function uu(e, t) {Ki(e) && Ki(t) ? t.forEach(function (t) {var n = t.key,o = t.value,r = e.find(function (e) {return e.key === n;});r ? r.value = o : e.push({ key: n, value: o });}) : Gi.warn("updateCustomField target 或 source 不是数组，忽略此次更新。");}var cu = function cu(e) {return e === ro.GRP_PUBLIC;},lu = function lu(e) {return e === ro.GRP_AVCHATROOM;},pu = function pu(e) {return qi(e) && e.slice(0, 3) === ro.CONV_C2C;},du = function du(e) {return qi(e) && e.slice(0, 5) === ro.CONV_GROUP;},gu = function gu(e) {return qi(e) && e === ro.CONV_SYSTEM;};function hu(e, t) {var n = {};return Object.keys(e).forEach(function (o) {n[o] = t(e[o], o);}), n;}function fu() {function e() {return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);}return "".concat(e() + e()).concat(e()).concat(e()).concat(e()).concat(e()).concat(e()).concat(e());}function _u() {var e = "unknown";if (vi && (e = "mac"), mi && (e = "windows"), ui && (e = "ios"), ci && (e = "android"), Zs) try {var t = ti.getSystemInfoSync().platform;void 0 !== t && (e = t);} catch (jv) {}return e;}function mu(e) {var t = e.originUrl,n = void 0 === t ? void 0 : t,o = e.originWidth,r = e.originHeight,a = e.min,s = void 0 === a ? 198 : a,i = parseInt(o),u = parseInt(r),c = { url: void 0, width: 0, height: 0 };return (i <= u ? i : u) <= s ? (c.url = n, c.width = i, c.height = u) : (u <= i ? (c.width = Math.ceil(i * s / u), c.height = s) : (c.width = s, c.height = Math.ceil(u * s / i)), c.url = "".concat(n, 198 === s ? "?imageView2/3/w/198/h/198" : "?imageView2/3/w/720/h/720")), Bi(n) ? jn(c, ["url"]) : c;}function vu(e) {var t = e[2];e[2] = e[1], e[1] = t;for (var n = 0; n < e.length; n++) {e[n].setType(n);}}function Mu(e) {var t = e.servcmd;return t.slice(t.indexOf(".") + 1);}function yu(e, t) {return Math.round(Number(e) * Math.pow(10, t)) / Math.pow(10, t);}function Iu(e, t) {return e.includes(t);}function Su(e, t) {return e.includes(t);}var Tu = Object.prototype.hasOwnProperty;function Du(e) {if (null == e) return !0;if ("boolean" == typeof e) return !1;if ("number" == typeof e) return 0 === e;if ("string" == typeof e) return 0 === e.length;if ("function" == typeof e) return 0 === e.length;if (Array.isArray(e)) return 0 === e.length;if (e instanceof Error) return "" === e.message;if (Vi(e)) {for (var t in e) {if (Tu.call(e, t)) return !1;}return !0;}return !("map" !== Yi(e) && !function (e) {return "set" === Yi(e);}(e) && !Ui(e)) && 0 === e.size;}function Eu(e, t, n) {if (void 0 === t) return !0;var o = !0;if ("object" === vo(t).toLowerCase()) Object.keys(t).forEach(function (r) {var a = 1 === e.length ? e[0][r] : void 0;o = !!Cu(a, t[r], n, r) && o;});else if ("array" === vo(t).toLowerCase()) for (var r = 0; r < t.length; r++) {o = !!Cu(e[r], t[r], n, t[r].name) && o;}if (o) return o;throw new Error("Params validate failed.");}function Cu(e, t, n, o) {if (void 0 === t) return !0;var r = !0;return t.required && Du(e) && (Ni.error("TIM [".concat(n, '] Missing required params: "').concat(o, '".')), r = !1), Du(e) || vo(e).toLowerCase() === t.type.toLowerCase() || (Ni.error("TIM [".concat(n, '] Invalid params: type check failed for "').concat(o, '".Expected ').concat(t.type, ".")), r = !1), t.validator && !t.validator(e) && (Ni.error("TIM [".concat(n, "] Invalid params: custom validator check failed for params.")), r = !1), r;}var Au = { f: xe },ku = k.f,Nu = at.forEach,Ou = H("hidden"),Lu = xe("toPrimitive"),Ru = ee.set,bu = ee.getterFor("Symbol"),wu = Object.prototype,_Pu = o.Symbol,Gu = re("JSON", "stringify"),Uu = E.f,Fu = k.f,qu = mr.f,xu = u.f,Vu = q("symbols"),Ku = q("op-symbols"),Bu = q("string-to-symbol-registry"),Hu = q("symbol-to-string-registry"),ju = q("wks"),$u = o.QObject,Yu = !$u || !$u.prototype || !$u.prototype.findChild,zu = a && r(function () {return 7 != Kt(Fu({}, "a", { get: function get() {return Fu(this, "a", { value: 7 }).a;} })).a;}) ? function (e, t, n) {var o = Uu(wu, t);o && delete wu[t], Fu(e, t, n), o && e !== wu && Fu(wu, t, o);} : Fu,Wu = function Wu(e, t) {var n = Vu[e] = Kt(_Pu.prototype);return Ru(n, { type: "Symbol", tag: e, description: t }), a || (n.description = t), n;},Ju = Ge ? function (e) {return "symbol" == typeof e;} : function (e) {return Object(e) instanceof _Pu;},Xu = function Xu(e, t, n) {e === wu && Xu(Ku, t, n), C(e);var o = m(t, !0);return C(n), M(Vu, o) ? (n.enumerable ? (M(e, Ou) && e[Ou][o] && (e[Ou][o] = !1), n = Kt(n, { enumerable: c(0, !1) })) : (M(e, Ou) || Fu(e, Ou, c(1, {})), e[Ou][o] = !0), zu(e, o, n)) : Fu(e, o, n);},Qu = function Qu(e, t) {C(e);var n = _f2(t),o = Pt(n).concat(nc(n));return Nu(o, function (t) {a && !Zu.call(n, t) || Xu(e, t, n[t]);}), e;},Zu = function Zu(e) {var t = m(e, !0),n = xu.call(this, t);return !(this === wu && M(Vu, t) && !M(Ku, t)) && (!(n || !M(this, t) || !M(Vu, t) || M(this, Ou) && this[Ou][t]) || n);},ec = function ec(e, t) {var n = _f2(e),o = m(t, !0);if (n !== wu || !M(Vu, o) || M(Ku, o)) {var r = Uu(n, o);return !r || !M(Vu, o) || M(n, Ou) && n[Ou][o] || (r.enumerable = !0), r;}},tc = function tc(e) {var t = qu(_f2(e)),n = [];return Nu(t, function (e) {M(Vu, e) || M(j, e) || n.push(e);}), n;},nc = function nc(e) {var t = e === wu,n = qu(t ? Ku : _f2(e)),o = [];return Nu(n, function (e) {!M(Vu, e) || t && !M(wu, e) || o.push(Vu[e]);}), o;};if (Pe || (te((_Pu = function Pu() {if (this instanceof _Pu) throw TypeError("Symbol is not a constructor");var e = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,t = K(e),n = function n(e) {this === wu && n.call(Ku, e), M(this, Ou) && M(this[Ou], t) && (this[Ou][t] = !1), zu(this, t, c(1, e));};return a && Yu && zu(wu, t, { configurable: !0, set: n }), Wu(t, e);}).prototype, "toString", function () {return bu(this).tag;}), te(_Pu, "withoutSetter", function (e) {return Wu(K(e), e);}), u.f = Zu, k.f = Xu, E.f = ec, Me.f = mr.f = tc, ye.f = nc, Au.f = function (e) {return Wu(xe(e), e);}, a && (Fu(_Pu.prototype, "description", { configurable: !0, get: function get() {return bu(this).description;} }), te(wu, "propertyIsEnumerable", Zu, { unsafe: !0 }))), Le({ global: !0, wrap: !0, forced: !Pe, sham: !Pe }, { Symbol: _Pu }), Nu(Pt(ju), function (e) {!function (e) {var t = ne.Symbol || (ne.Symbol = {});M(t, e) || ku(t, e, { value: Au.f(e) });}(e);}), Le({ target: "Symbol", stat: !0, forced: !Pe }, { for: function _for(e) {var t = String(e);if (M(Bu, t)) return Bu[t];var n = _Pu(t);return Bu[t] = n, Hu[n] = t, n;}, keyFor: function keyFor(e) {if (!Ju(e)) throw TypeError(e + " is not a symbol");if (M(Hu, e)) return Hu[e];}, useSetter: function useSetter() {Yu = !0;}, useSimple: function useSimple() {Yu = !1;} }), Le({ target: "Object", stat: !0, forced: !Pe, sham: !a }, { create: function create(e, t) {return void 0 === t ? Kt(e) : Qu(Kt(e), t);}, defineProperty: Xu, defineProperties: Qu, getOwnPropertyDescriptor: ec }), Le({ target: "Object", stat: !0, forced: !Pe }, { getOwnPropertyNames: tc, getOwnPropertySymbols: nc }), Le({ target: "Object", stat: !0, forced: r(function () {ye.f(1);}) }, { getOwnPropertySymbols: function getOwnPropertySymbols(e) {return ye.f(be(e));} }), Gu) {var oc = !Pe || r(function () {var e = _Pu();return "[null]" != Gu([e]) || "{}" != Gu({ a: e }) || "{}" != Gu(Object(e));});Le({ target: "JSON", stat: !0, forced: oc }, { stringify: function stringify(e, t, n) {for (var o, r = [e], a = 1; arguments.length > a;) {r.push(arguments[a++]);}if (o = t, (_(t) || void 0 !== e) && !Ju(e)) return Re(t) || (t = function t(e, _t3) {if ("function" == typeof o && (_t3 = o.call(this, e, _t3)), !Ju(_t3)) return _t3;}), r[1] = t, Gu.apply(null, r);} });}_Pu.prototype[Lu] || N(_Pu.prototype, Lu, _Pu.prototype.valueOf), fn(_Pu, "Symbol"), j[Ou] = !0;var rc = k.f,ac = o.Symbol;if (a && "function" == typeof ac && (!("description" in ac.prototype) || void 0 !== ac().description)) {var sc = {},ic = function ic() {var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0]),t = this instanceof ic ? new ac(e) : void 0 === e ? ac() : ac(e);return "" === e && (sc[t] = !0), t;};Se(ic, ac);var uc = ic.prototype = ac.prototype;uc.constructor = ic;var cc = uc.toString,lc = "Symbol(test)" == String(ac("test")),pc = /^Symbol\((.*)\)[^)]+$/;rc(uc, "description", { configurable: !0, get: function get() {var e = _(this) ? this.valueOf() : this,t = cc.call(e);if (M(sc, e)) return "";var n = lc ? t.slice(7, -1) : t.replace(pc, "$1");return "" === n ? void 0 : n;} }), Le({ global: !0, forced: !0 }, { Symbol: ic });}var dc,gc = E.f,hc = "".startsWith,fc = Math.min,_c = ps("startsWith"),mc = !(_c || (dc = gc(String.prototype, "startsWith"), !dc || dc.writable));Le({ target: "String", proto: !0, forced: !mc && !_c }, { startsWith: function startsWith(e) {var t = String(h(this));cs(e);var n = ce(fc(arguments.length > 1 ? arguments[1] : void 0, t.length)),o = String(e);return hc ? hc.call(t, o, n) : t.slice(n, n + o.length) === o;} });var vc = { UNSEND: "unSend", SUCCESS: "success", FAIL: "fail" },Mc = { NOT_START: "notStart", PENDING: "pengding", RESOLVED: "resolved", REJECTED: "rejected" },yc = function yc(e) {return !!e && (!!(pu(e) || du(e) || gu(e)) || (console.warn("非法的会话 ID:".concat(e, "。会话 ID 组成方式：C2C + userID（单聊）GROUP + groupID（群聊）@TIM#SYSTEM（系统通知会话）")), !1));},Ic = "请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#",Sc = function Sc(e) {return e.param ? "".concat(e.api, " ").concat(e.param, " ").concat(e.desc, "。").concat(Ic).concat(e.api) : "".concat(e.api, " ").concat(e.desc, "。").concat(Ic).concat(e.api);},Tc = { type: "String", required: !0 },Dc = { type: "Array", required: !0 },Ec = { type: "Object", required: !0 },Cc = { login: { userID: Tc, userSig: Tc }, addToBlacklist: { userIDList: Dc }, on: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn(Sc({ api: "on", param: "eventName", desc: "类型必须为 String，且不能为空" })), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn(Sc({ api: "on", param: "handler", desc: "参数必须为 Function" })), !1) : ("" === e.name && console.warn("on 接口的 handler 参数推荐使用具名函数。具名函数可以使用 off 接口取消订阅，匿名函数无法取消订阅。"), !0);} }], once: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn(Sc({ api: "once", param: "eventName", desc: "类型必须为 String，且不能为空" })), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn(Sc({ api: "once", param: "handler", desc: "参数必须为 Function" })), !1) : ("" === e.name && console.warn("once 接口的 handler 参数推荐使用具名函数。"), !0);} }], off: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn(Sc({ api: "off", param: "eventName", desc: "类型必须为 String，且不能为空" })), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn(Sc({ api: "off", param: "handler", desc: "参数必须为 Function" })), !1) : ("" === e.name && console.warn("off 接口无法为匿名函数取消监听事件。"), !0);} }], sendMessage: [Fn({ name: "message" }, Ec)], getMessageList: { conversationID: Fn({}, Tc, { validator: function validator(e) {return yc(e);} }), nextReqMessageID: { type: "String" }, count: { type: "Number", validator: function validator(e) {return !(!Bi(e) && !/^[1-9][0-9]*$/.test(e)) || (console.warn(Sc({ api: "getMessageList", param: "count", desc: "必须为正整数" })), !1);} } }, setMessageRead: { conversationID: Fn({}, Tc, { validator: function validator(e) {return yc(e);} }) }, getConversationProfile: [Fn({ name: "conversationID" }, Tc, { validator: function validator(e) {return yc(e);} })], deleteConversation: [Fn({ name: "conversationID" }, Tc, { validator: function validator(e) {return yc(e);} })], pinConversation: { conversationID: Fn({}, Tc, { validator: function validator(e) {return yc(e);} }), isPinned: Fn({}, { type: "Boolean", required: !0 }) }, getGroupList: { groupProfileFilter: { type: "Array" } }, getGroupProfile: { groupID: Tc, groupCustomFieldFilter: { type: "Array" }, memberCustomFieldFilter: { type: "Array" } }, getGroupProfileAdvance: { groupIDList: Dc }, createGroup: { name: Tc }, joinGroup: { groupID: Tc, type: { type: "String" }, applyMessage: { type: "String" } }, quitGroup: [Fn({ name: "groupID" }, Tc)], handleApplication: { message: Ec, handleAction: Tc, handleMessage: { type: "String" } }, changeGroupOwner: { groupID: Tc, newOwnerID: Tc }, updateGroupProfile: { groupID: Tc, muteAllMembers: { type: "Boolean" } }, dismissGroup: [Fn({ name: "groupID" }, Tc)], searchGroupByID: [Fn({ name: "groupID" }, Tc)], initGroupAttributes: { groupID: Tc, groupAttributes: Fn({}, Ec, { validator: function validator(e) {var t = !0;return Object.keys(e).forEach(function (n) {if (!qi(e[n])) return console.warn(Sc({ api: "initGroupAttributes", desc: "群属性 value 必须是字符串" })), t = !1;}), t;} }) }, setGroupAttributes: { groupID: Tc, groupAttributes: Fn({}, Ec, { validator: function validator(e) {var t = !0;return Object.keys(e).forEach(function (n) {if (!qi(e[n])) return console.warn(Sc({ api: "setGroupAttributes", desc: "群属性 value 必须是字符串" })), t = !1;}), t;} }) }, deleteGroupAttributes: { groupID: Tc, keyList: { type: "Array", validator: function validator(e) {if (Bi(e)) return console.warn(Sc({ api: "deleteGroupAttributes", desc: "缺少必填参数：keyList" })), !1;if (!Ki(e)) return !1;if (!Du(e)) {var t = !0;return e.forEach(function (e) {if (!qi(e)) return console.warn(Sc({ api: "deleteGroupAttributes", desc: "群属性 key 必须是字符串" })), t = !1;}), t;}return !0;} } }, getGroupAttributes: { groupID: Tc, keyList: { type: "Array", validator: function validator(e) {if (Bi(e)) return console.warn(Sc({ api: "getGroupAttributes", desc: "缺少必填参数：keyList" })), !1;if (!Ki(e)) return !1;if (!Du(e)) {var t = !0;return e.forEach(function (e) {if (!qi(e)) return console.warn(Sc({ api: "getGroupAttributes", desc: "群属性 key 必须是字符串" })), t = !1;}), t;}return !0;} } }, getGroupMemberList: { groupID: Tc, offset: { type: "Number" }, count: { type: "Number" } }, getGroupMemberProfile: { groupID: Tc, userIDList: Dc, memberCustomFieldFilter: { type: "Array" } }, addGroupMember: { groupID: Tc, userIDList: Dc }, setGroupMemberRole: { groupID: Tc, userID: Tc, role: Tc }, setGroupMemberMuteTime: { groupID: Tc, userID: Tc, muteTime: { type: "Number", validator: function validator(e) {return e >= 0;} } }, setGroupMemberNameCard: { groupID: Tc, userID: { type: "String" }, nameCard: { type: "String", validator: function validator(e) {return qi(e) ? (e.length, !0) : (console.warn(Sc({ api: "setGroupMemberNameCard", param: "nameCard", desc: "类型必须为 String" })), !1);} } }, setMessageRemindType: { groupID: Tc, messageRemindType: Tc }, setGroupMemberCustomField: { groupID: Tc, userID: { type: "String" }, memberCustomField: Dc }, deleteGroupMember: { groupID: Tc }, createTextMessage: { to: Tc, conversationType: Tc, payload: Fn({}, Ec, { validator: function validator(e) {return Vi(e) ? qi(e.text) ? 0 !== e.text.length || (console.warn(Sc({ api: "createTextMessage", desc: "消息内容不能为空" })), !1) : (console.warn(Sc({ api: "createTextMessage", param: "payload.text", desc: "类型必须为 String" })), !1) : (console.warn(Sc({ api: "createTextMessage", param: "payload", desc: "类型必须为 plain object" })), !1);} }) }, createTextAtMessage: { to: Tc, conversationType: Tc, payload: Fn({}, Ec, { validator: function validator(e) {return Vi(e) ? qi(e.text) ? 0 === e.text.length ? (console.warn(Sc({ api: "createTextAtMessage", desc: "消息内容不能为空" })), !1) : !(e.atUserList && !Ki(e.atUserList)) || (console.warn(Sc({ api: "createTextAtMessage", desc: "payload.atUserList 类型必须为数组" })), !1) : (console.warn(Sc({ api: "createTextAtMessage", param: "payload.text", desc: "类型必须为 String" })), !1) : (console.warn(Sc({ api: "createTextAtMessage", param: "payload", desc: "类型必须为 plain object" })), !1);} }) }, createCustomMessage: { to: Tc, conversationType: Tc, payload: Fn({}, Ec, { validator: function validator(e) {return Vi(e) ? e.data && !qi(e.data) ? (console.warn(Sc({ api: "createCustomMessage", param: "payload.data", desc: "类型必须为 String" })), !1) : e.description && !qi(e.description) ? (console.warn(Sc({ api: "createCustomMessage", param: "payload.description", desc: "类型必须为 String" })), !1) : !(e.extension && !qi(e.extension)) || (console.warn(Sc({ api: "createCustomMessage", param: "payload.extension", desc: "类型必须为 String" })), !1) : (console.warn(Sc({ api: "createCustomMessage", param: "payload", desc: "类型必须为 plain object" })), !1);} }) }, createImageMessage: { to: Tc, conversationType: Tc, payload: Fn({}, Ec, { validator: function validator(e) {if (!Vi(e)) return console.warn(Sc({ api: "createImageMessage", param: "payload", desc: "类型必须为 plain object" })), !1;if (Bi(e.file)) return console.warn(Sc({ api: "createImageMessage", param: "payload.file", desc: "不能为 undefined" })), !1;if (ei) {if (!(e.file instanceof HTMLInputElement || Ui(e.file))) return Vi(e.file) && "undefined" != typeof uni ? 0 !== e.file.tempFilePaths.length && 0 !== e.file.tempFiles.length || (console.warn(Sc({ api: "createImageMessage", param: "payload.file", desc: "您没有选择文件，无法发送" })), !1) : (console.warn(Sc({ api: "createImageMessage", param: "payload.file", desc: "类型必须是 HTMLInputElement 或 File" })), !1);if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn(Sc({ api: "createImageMessage", param: "payload.file", desc: "您没有选择文件，无法发送" })), !1;}return !0;}, onProgress: { type: "Function", required: !1, validator: function validator(e) {return Bi(e) && console.warn(Sc({ api: "createImageMessage", desc: "没有 onProgress 回调，您将无法获取上传进度" })), !0;} } }) }, createAudioMessage: { to: Tc, conversationType: Tc, payload: Fn({}, Ec, { validator: function validator(e) {return !!Vi(e) || (console.warn(Sc({ api: "createAudioMessage", param: "payload", desc: "类型必须为 plain object" })), !1);} }), onProgress: { type: "Function", required: !1, validator: function validator(e) {return Bi(e) && console.warn(Sc({ api: "createAudioMessage", desc: "没有 onProgress 回调，您将无法获取上传进度" })), !0;} } }, createVideoMessage: { to: Tc, conversationType: Tc, payload: Fn({}, Ec, { validator: function validator(e) {if (!Vi(e)) return console.warn(Sc({ api: "createVideoMessage", param: "payload", desc: "类型必须为 plain object" })), !1;if (Bi(e.file)) return console.warn(Sc({ api: "createVideoMessage", param: "payload.file", desc: "不能为 undefined" })), !1;if (ei) {if (!(e.file instanceof HTMLInputElement || Ui(e.file))) return Vi(e.file) && "undefined" != typeof uni ? !!Ui(e.file.tempFile) || (console.warn(Sc({ api: "createVideoMessage", param: "payload.file", desc: "您没有选择文件，无法发送" })), !1) : (console.warn(Sc({ api: "createVideoMessage", param: "payload.file", desc: "类型必须是 HTMLInputElement 或 File" })), !1);if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn(Sc({ api: "createVideoMessage", param: "payload.file", desc: "您没有选择文件，无法发送" })), !1;}return !0;} }), onProgress: { type: "Function", required: !1, validator: function validator(e) {return Bi(e) && console.warn(Sc({ api: "createVideoMessage", desc: "没有 onProgress 回调，您将无法获取上传进度" })), !0;} } }, createFaceMessage: { to: Tc, conversationType: Tc, payload: Fn({}, Ec, { validator: function validator(e) {return Vi(e) ? Fi(e.index) ? !!qi(e.data) || (console.warn(Sc({ api: "createFaceMessage", param: "payload.data", desc: "类型必须为 String" })), !1) : (console.warn(Sc({ api: "createFaceMessage", param: "payload.index", desc: "类型必须为 Number" })), !1) : (console.warn(Sc({ api: "createFaceMessage", param: "payload", desc: "类型必须为 plain object" })), !1);} }) }, createFileMessage: { to: Tc, conversationType: Tc, payload: Fn({}, Ec, { validator: function validator(e) {if (!Vi(e)) return console.warn(Sc({ api: "createFileMessage", param: "payload", desc: "类型必须为 plain object" })), !1;if (Bi(e.file)) return console.warn(Sc({ api: "createFileMessage", param: "payload.file", desc: "不能为 undefined" })), !1;if (ei) {if (!(e.file instanceof HTMLInputElement || Ui(e.file))) return Vi(e.file) && "undefined" != typeof uni ? 0 !== e.file.tempFilePaths.length && 0 !== e.file.tempFiles.length || (console.warn(Sc({ api: "createFileMessage", param: "payload.file", desc: "您没有选择文件，无法发送" })), !1) : (console.warn(Sc({ api: "createFileMessage", param: "payload.file", desc: "类型必须是 HTMLInputElement 或 File" })), !1);if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn(Sc({ api: "createFileMessage", desc: "您没有选择文件，无法发送" })), !1;}return !0;} }), onProgress: { type: "Function", required: !1, validator: function validator(e) {return Bi(e) && console.warn(Sc({ api: "createFileMessage", desc: "没有 onProgress 回调，您将无法获取上传进度" })), !0;} } }, createMergerMessage: { to: Tc, conversationType: Tc, payload: Fn({}, Ec, { validator: function validator(e) {if (Du(e.messageList)) return console.warn(Sc({ api: "createMergerMessage", desc: "不能为空数组" })), !1;if (Du(e.compatibleText)) return console.warn(Sc({ api: "createMergerMessage", desc: "类型必须为 String，且不能为空" })), !1;var t = !1;return e.messageList.forEach(function (e) {e.status === vc.FAIL && (t = !0);}), !t || (console.warn(Sc({ api: "createMergerMessage", desc: "不支持合并已发送失败的消息" })), !1);} }) }, revokeMessage: [Fn({ name: "message" }, Ec, { validator: function validator(e) {return Du(e) ? (console.warn("revokeMessage 请传入消息（Message）实例"), !1) : e.conversationType === ro.CONV_SYSTEM ? (console.warn("revokeMessage 不能撤回系统会话消息，只能撤回单聊消息或群消息"), !1) : !0 !== e.isRevoked || (console.warn("revokeMessage 消息已经被撤回，请勿重复操作"), !1);} })], deleteMessage: [Fn({ name: "messageList" }, Dc, { validator: function validator(e) {return !Du(e) || (console.warn(Sc({ api: "deleteMessage", param: "messageList", desc: "不能为空数组" })), !1);} })], getUserProfile: { userIDList: { type: "Array", validator: function validator(e) {return Ki(e) ? (0 === e.length && console.warn(Sc({ api: "getUserProfile", param: "userIDList", desc: "不能为空数组" })), !0) : (console.warn(Sc({ api: "getUserProfile", param: "userIDList", desc: "必须为数组" })), !1);} } }, updateMyProfile: { profileCustomField: { type: "Array", validator: function validator(e) {return !!Bi(e) || !!Ki(e) || (console.warn(Sc({ api: "updateMyProfile", param: "profileCustomField", desc: "必须为数组" })), !1);} } }, addFriend: { to: Tc, source: { type: "String", required: !0, validator: function validator(e) {return !!e && (e.startsWith("AddSource_Type_") ? !(e.replace("AddSource_Type_", "").length > 8) || (console.warn(Sc({ api: "addFriend", desc: "加好友来源字段的关键字长度不得超过8字节" })), !1) : (console.warn(Sc({ api: "addFriend", desc: "加好友来源字段的前缀必须是：AddSource_Type_" })), !1));} }, remark: { type: "String", required: !1, validator: function validator(e) {return !(qi(e) && e.length > 96) || (console.warn(Sc({ api: "updateFriend", desc: " 备注长度最长不得超过 96 个字节" })), !1);} } }, deleteFriend: { userIDList: Dc }, checkFriend: { userIDList: Dc }, getFriendProfile: { userIDList: Dc }, updateFriend: { userID: Tc, remark: { type: "String", required: !1, validator: function validator(e) {return !(qi(e) && e.length > 96) || (console.warn(Sc({ api: "updateFriend", desc: " 备注长度最长不得超过 96 个字节" })), !1);} }, friendCustomField: { type: "Array", required: !1, validator: function validator(e) {if (e) {if (!Ki(e)) return console.warn(Sc({ api: "updateFriend", param: "friendCustomField", desc: "必须为数组" })), !1;var t = !0;return e.forEach(function (e) {return qi(e.key) && -1 !== e.key.indexOf("Tag_SNS_Custom") ? qi(e.value) ? e.value.length > 8 ? (console.warn(Sc({ api: "updateFriend", desc: "好友自定义字段的关键字长度不得超过8字节" })), t = !1) : void 0 : (console.warn(Sc({ api: "updateFriend", desc: "类型必须为 String" })), t = !1) : (console.warn(Sc({ api: "updateFriend", desc: "好友自定义字段的前缀必须是 Tag_SNS_Custom" })), t = !1);}), t;}return !0;} } }, acceptFriendApplication: { userID: Tc }, refuseFriendApplication: { userID: Tc }, deleteFriendApplication: { userID: Tc }, createFriendGroup: { name: Tc }, deleteFriendGroup: { name: Tc }, addToFriendGroup: { name: Tc, userIDList: Dc }, removeFromFriendGroup: { name: Tc, userIDList: Dc }, renameFriendGroup: { oldName: Tc, newName: Tc } },Ac = { login: "login", logout: "logout", on: "on", once: "once", off: "off", setLogLevel: "setLogLevel", registerPlugin: "registerPlugin", destroy: "destroy", createTextMessage: "createTextMessage", createTextAtMessage: "createTextAtMessage", createImageMessage: "createImageMessage", createAudioMessage: "createAudioMessage", createVideoMessage: "createVideoMessage", createCustomMessage: "createCustomMessage", createFaceMessage: "createFaceMessage", createFileMessage: "createFileMessage", createMergerMessage: "createMergerMessage", downloadMergerMessage: "downloadMergerMessage", createForwardMessage: "createForwardMessage", sendMessage: "sendMessage", resendMessage: "resendMessage", revokeMessage: "revokeMessage", deleteMessage: "deleteMessage", getMessageList: "getMessageList", setMessageRead: "setMessageRead", getConversationList: "getConversationList", getConversationProfile: "getConversationProfile", deleteConversation: "deleteConversation", pinConversation: "pinConversation", getGroupList: "getGroupList", getGroupProfile: "getGroupProfile", createGroup: "createGroup", joinGroup: "joinGroup", updateGroupProfile: "updateGroupProfile", quitGroup: "quitGroup", dismissGroup: "dismissGroup", changeGroupOwner: "changeGroupOwner", searchGroupByID: "searchGroupByID", setMessageRemindType: "setMessageRemindType", handleGroupApplication: "handleGroupApplication", initGroupAttributes: "initGroupAttributes", setGroupAttributes: "setGroupAttributes", deleteGroupAttributes: "deleteGroupAttributes", getGroupAttributes: "getGroupAttributes", getGroupMemberProfile: "getGroupMemberProfile", getGroupMemberList: "getGroupMemberList", addGroupMember: "addGroupMember", deleteGroupMember: "deleteGroupMember", setGroupMemberNameCard: "setGroupMemberNameCard", setGroupMemberMuteTime: "setGroupMemberMuteTime", setGroupMemberRole: "setGroupMemberRole", setGroupMemberCustomField: "setGroupMemberCustomField", getGroupOnlineMemberCount: "getGroupOnlineMemberCount", getMyProfile: "getMyProfile", getUserProfile: "getUserProfile", updateMyProfile: "updateMyProfile", getBlacklist: "getBlacklist", addToBlacklist: "addToBlacklist", removeFromBlacklist: "removeFromBlacklist", getFriendList: "getFriendList", addFriend: "addFriend", deleteFriend: "deleteFriend", checkFriend: "checkFriend", updateFriend: "updateFriend", getFriendProfile: "getFriendProfile", getFriendApplicationList: "getFriendApplicationList", refuseFriendApplication: "refuseFriendApplication", deleteFriendApplication: "deleteFriendApplication", acceptFriendApplication: "acceptFriendApplication", setFriendApplicationRead: "setFriendApplicationRead", getFriendGroupList: "getFriendGroupList", createFriendGroup: "createFriendGroup", renameFriendGroup: "renameFriendGroup", deleteFriendGroup: "deleteFriendGroup", addToFriendGroup: "addToFriendGroup", removeFromFriendGroup: "removeFromFriendGroup", callExperimentalAPI: "callExperimentalAPI" },kc = !!Er && r(function () {Er.prototype.finally.call({ then: function then() {} }, function () {});});Le({ target: "Promise", proto: !0, real: !0, forced: kc }, { finally: function _finally(e) {var t = Rr(this, re("Promise")),n = "function" == typeof e;return this.then(n ? function (n) {return _a(t, e()).then(function () {return n;});} : e, n ? function (n) {return _a(t, e()).then(function () {throw n;});} : e);} }), "function" != typeof Er || Er.prototype.finally || te(Er.prototype, "finally", re("Promise").prototype.finally);var Nc = [].slice,Oc = /MSIE .\./.test(Be),Lc = function Lc(e) {return function (t, n) {var o = arguments.length > 2,r = o ? Nc.call(arguments, 2) : void 0;return e(o ? function () {("function" == typeof t ? t : Function(t)).apply(this, r);} : t, n);};};Le({ global: !0, bind: !0, forced: Oc }, { setTimeout: Lc(o.setTimeout), setInterval: Lc(o.setInterval) });var Rc = at.filter,bc = We("filter"),wc = lt("filter");Le({ target: "Array", proto: !0, forced: !bc || !wc }, { filter: function filter(e) {return Rc(this, e, arguments.length > 1 ? arguments[1] : void 0);} });var Pc,Gc = "sign",Uc = "message",Fc = "user",qc = "c2c",xc = "group",Vc = "sns",Kc = "groupMember",Bc = "conversation",Hc = "context",jc = "storage",$c = "eventStat",Yc = "netMonitor",zc = "bigDataChannel",Wc = "upload",Jc = "plugin",Xc = "syncUnreadMessage",Qc = "session",Zc = "channel",el = "message_loss_detection",tl = "cloudControl",nl = "pullGroupMessage",ol = "qualityStat",rl = function () {function e(t) {bn(this, e), this._moduleManager = t, this._className = "";}return Pn(e, [{ key: "isLoggedIn", value: function value() {return this._moduleManager.getModule(Hc).isLoggedIn();} }, { key: "isOversea", value: function value() {return this._moduleManager.getModule(Hc).isOversea();} }, { key: "getMyUserID", value: function value() {return this._moduleManager.getModule(Hc).getUserID();} }, { key: "getModule", value: function value(e) {return this._moduleManager.getModule(e);} }, { key: "getPlatform", value: function value() {return ni;} }, { key: "getNetworkType", value: function value() {return this._moduleManager.getModule(Yc).getNetworkType();} }, { key: "probeNetwork", value: function value() {return this._moduleManager.getModule(Yc).probe();} }, { key: "getCloudConfig", value: function value(e) {return this._moduleManager.getModule(tl).getCloudConfig(e);} }, { key: "emitOuterEvent", value: function value(e, t) {this._moduleManager.getOuterEmitterInstance().emit(e, t);} }, { key: "emitInnerEvent", value: function value(e, t) {this._moduleManager.getInnerEmitterInstance().emit(e, t);} }, { key: "getInnerEmitterInstance", value: function value() {return this._moduleManager.getInnerEmitterInstance();} }, { key: "generateTjgID", value: function value(e) {return this._moduleManager.getModule(Hc).getTinyID() + "-" + e.random;} }, { key: "filterModifiedMessage", value: function value(e) {if (!Du(e)) {var t = e.filter(function (e) {return !0 === e.isModified;});t.length > 0 && this.emitOuterEvent(oo.MESSAGE_MODIFIED, t);}} }, { key: "filterUnmodifiedMessage", value: function value(e) {return Du(e) ? [] : e.filter(function (e) {return !1 === e.isModified;});} }, { key: "request", value: function value(e) {return this._moduleManager.getModule(Qc).request(e);} }]), e;}(),al = "wslogin",sl = "wslogout",il = "wshello",ul = "getmsg",cl = "authkey",ll = "sendmsg",pl = "send_group_msg",dl = "portrait_get_all",gl = "portrait_set",hl = "black_list_get",fl = "black_list_add",_l = "black_list_delete",ml = "msgwithdraw",vl = "msgreaded",Ml = "getroammsg",yl = "get_peer_read_time",Il = "delete_c2c_msg_ramble",Sl = "page_get",Tl = "get",Dl = "delete",El = "top",Cl = "deletemsg",Al = "get_joined_group_list",kl = "get_group_info",Nl = "create_group",Ol = "destroy_group",Ll = "modify_group_base_info",Rl = "apply_join_group",bl = "apply_join_group_noauth",wl = "quit_group",Pl = "get_group_public_info",Gl = "change_group_owner",Ul = "handle_apply_join_group",Fl = "handle_invite_join_group",ql = "group_msg_recall",xl = "msg_read_report",Vl = "group_msg_get",Kl = "get_pendency",Bl = "deletemsg",Hl = "get_msg",jl = "get_msg_noauth",$l = "get_online_member_num",Yl = "delete_group_ramble_msg_by_seq",zl = "set_group_attr",Wl = "modify_group_attr",Jl = "delete_group_attr",Xl = "clear_group_attr",Ql = "get_group_attr",Zl = "get_group_member_info",ep = "get_specified_group_member_info",tp = "add_group_member",np = "delete_group_member",op = "modify_group_member_info",rp = "cos",ap = "pre_sig",sp = "tim_web_report_v2",ip = "alive",up = "msg_push",cp = "ws_msg_push_ack",lp = "stat_forceoffline",pp = "save_relay_json_msg",dp = "get_relay_json_msg",gp = "fetch_config",hp = "push_configv2",fp = { NO_SDKAPPID: 2e3, NO_ACCOUNT_TYPE: 2001, NO_IDENTIFIER: 2002, NO_USERSIG: 2003, NO_TINYID: 2022, NO_A2KEY: 2023, USER_NOT_LOGGED_IN: 2024, REPEAT_LOGIN: 2025, COS_UNDETECTED: 2040, COS_GET_SIG_FAIL: 2041, MESSAGE_SEND_FAIL: 2100, MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS: 2103, MESSAGE_SEND_NEED_MESSAGE_INSTANCE: 2105, MESSAGE_SEND_INVALID_CONVERSATION_TYPE: 2106, MESSAGE_FILE_IS_EMPTY: 2108, MESSAGE_ONPROGRESS_FUNCTION_ERROR: 2109, MESSAGE_REVOKE_FAIL: 2110, MESSAGE_DELETE_FAIL: 2111, MESSAGE_IMAGE_SELECT_FILE_FIRST: 2251, MESSAGE_IMAGE_TYPES_LIMIT: 2252, MESSAGE_IMAGE_SIZE_LIMIT: 2253, MESSAGE_AUDIO_UPLOAD_FAIL: 2300, MESSAGE_AUDIO_SIZE_LIMIT: 2301, MESSAGE_VIDEO_UPLOAD_FAIL: 2350, MESSAGE_VIDEO_SIZE_LIMIT: 2351, MESSAGE_VIDEO_TYPES_LIMIT: 2352, MESSAGE_FILE_UPLOAD_FAIL: 2400, MESSAGE_FILE_SELECT_FILE_FIRST: 2401, MESSAGE_FILE_SIZE_LIMIT: 2402, MESSAGE_FILE_URL_IS_EMPTY: 2403, MESSAGE_MERGER_TYPE_INVALID: 2450, MESSAGE_MERGER_KEY_INVALID: 2451, MESSAGE_MERGER_DOWNLOAD_FAIL: 2452, MESSAGE_FORWARD_TYPE_INVALID: 2453, CONVERSATION_NOT_FOUND: 2500, USER_OR_GROUP_NOT_FOUND: 2501, CONVERSATION_UN_RECORDED_TYPE: 2502, ILLEGAL_GROUP_TYPE: 2600, CANNOT_JOIN_WORK: 2601, CANNOT_CHANGE_OWNER_IN_AVCHATROOM: 2620, CANNOT_CHANGE_OWNER_TO_SELF: 2621, CANNOT_DISMISS_Work: 2622, MEMBER_NOT_IN_GROUP: 2623, CANNOT_USE_GRP_ATTR_NOT_AVCHATROOM: 2641, CANNOT_USE_GRP_ATTR_AVCHATROOM_UNJOIN: 2642, JOIN_GROUP_FAIL: 2660, CANNOT_ADD_MEMBER_IN_AVCHATROOM: 2661, CANNOT_JOIN_NON_AVCHATROOM_WITHOUT_LOGIN: 2662, CANNOT_KICK_MEMBER_IN_AVCHATROOM: 2680, NOT_OWNER: 2681, CANNOT_SET_MEMBER_ROLE_IN_WORK_AND_AVCHATROOM: 2682, INVALID_MEMBER_ROLE: 2683, CANNOT_SET_SELF_MEMBER_ROLE: 2684, CANNOT_MUTE_SELF: 2685, NOT_MY_FRIEND: 2700, ALREADY_MY_FRIEND: 2701, FRIEND_GROUP_EXISTED: 2710, FRIEND_GROUP_NOT_EXIST: 2711, FRIEND_APPLICATION_NOT_EXIST: 2716, UPDATE_PROFILE_INVALID_PARAM: 2721, UPDATE_PROFILE_NO_KEY: 2722, ADD_BLACKLIST_INVALID_PARAM: 2740, DEL_BLACKLIST_INVALID_PARAM: 2741, CANNOT_ADD_SELF_TO_BLACKLIST: 2742, ADD_FRIEND_INVALID_PARAM: 2760, NETWORK_ERROR: 2800, NETWORK_TIMEOUT: 2801, NETWORK_BASE_OPTIONS_NO_URL: 2802, NETWORK_UNDEFINED_SERVER_NAME: 2803, NETWORK_PACKAGE_UNDEFINED: 2804, NO_NETWORK: 2805, CONVERTOR_IRREGULAR_PARAMS: 2900, NOTICE_RUNLOOP_UNEXPECTED_CONDITION: 2901, NOTICE_RUNLOOP_OFFSET_LOST: 2902, UNCAUGHT_ERROR: 2903, GET_LONGPOLL_ID_FAILED: 2904, INVALID_OPERATION: 2905, CANNOT_FIND_PROTOCOL: 2997, CANNOT_FIND_MODULE: 2998, SDK_IS_NOT_READY: 2999, LONG_POLL_KICK_OUT: 91101, MESSAGE_A2KEY_EXPIRED: 20002, ACCOUNT_A2KEY_EXPIRED: 70001, LONG_POLL_API_PARAM_ERROR: 90001, HELLO_ANSWER_KICKED_OUT: 1002 },_p = "无 SDKAppID",mp = "无 userID",vp = "无 userSig",Mp = "无 tinyID",yp = "无 a2key",Ip = "用户未登录",Sp = "重复登录",Tp = "未检测到 COS 上传插件",Dp = "获取 COS 预签名 URL 失败",Ep = "消息发送失败",Cp = "需要 Message 的实例",Ap = 'Message.conversationType 只能为 "C2C" 或 "GROUP"',kp = "无法发送空文件",Np = "回调函数运行时遇到错误，请检查接入侧代码",Op = "消息撤回失败",Lp = "消息删除失败",Rp = "请先选择一个图片",bp = "只允许上传 jpg png jpeg gif bmp格式的图片",wp = "图片大小超过20M，无法发送",Pp = "语音上传失败",Gp = "语音大小大于20M，无法发送",Up = "视频上传失败",Fp = "视频大小超过100M，无法发送",qp = "只允许上传 mp4 格式的视频",xp = "文件上传失败",Vp = "请先选择一个文件",Kp = "文件大小超过100M，无法发送 ",Bp = "缺少必要的参数文件 URL",Hp = "非合并消息",jp = "合并消息的 messageKey 无效",$p = "下载合并消息失败",Yp = "选择的消息类型（如群提示消息）不可以转发",zp = "没有找到相应的会话，请检查传入参数",Wp = "没有找到相应的用户或群组，请检查传入参数",Jp = "未记录的会话类型",Xp = "非法的群类型，请检查传入参数",Qp = "不能加入 Work 类型的群组",Zp = "AVChatRoom 类型的群组不能转让群主",ed = "不能把群主转让给自己",td = "不能解散 Work 类型的群组",nd = "用户不在该群组内",od = "加群失败，请检查传入参数或重试",rd = "AVChatRoom 类型的群不支持邀请群成员",ad = "非 AVChatRoom 类型的群组不允许匿名加群，请先登录后再加群",sd = "不能在 AVChatRoom 类型的群组踢人",id = "你不是群主，只有群主才有权限操作",ud = "不能在 Work / AVChatRoom 类型的群中设置群成员身份",cd = "不合法的群成员身份，请检查传入参数",ld = "不能设置自己的群成员身份，请检查传入参数",pd = "不能将自己禁言，请检查传入参数",dd = "传入 updateMyProfile 接口的参数无效",gd = "updateMyProfile 无标配资料字段或自定义资料字段",hd = "传入 addToBlacklist 接口的参数无效",fd = "传入 removeFromBlacklist 接口的参数无效",_d = "不能拉黑自己",md = "网络错误",vd = "请求超时",Md = "未连接到网络",yd = "无效操作，如调用了未定义或者未实现的方法等",Id = "无法找到协议",Sd = "无法找到模块",Td = "接口需要 SDK 处于 ready 状态后才能调用",Dd = "upload",Ed = "networkRTT",Cd = "messageE2EDelay",Ad = "sendMessageC2C",kd = "sendMessageGroup",Nd = "sendMessageGroupAV",Od = "sendMessageRichMedia",Ld = "cosUpload",Rd = "messageReceivedGroup",bd = "messageReceivedGroupAVPush",wd = "messageReceivedGroupAVPull",Pd = (Gn(Pc = {}, Ed, 2), Gn(Pc, Cd, 3), Gn(Pc, Ad, 4), Gn(Pc, kd, 5), Gn(Pc, Nd, 6), Gn(Pc, Od, 7), Gn(Pc, Rd, 8), Gn(Pc, bd, 9), Gn(Pc, wd, 10), Gn(Pc, Ld, 11), Pc),Gd = { info: 4, warning: 5, error: 6 },Ud = { wifi: 1, "2g": 2, "3g": 3, "4g": 4, "5g": 5, unknown: 6, none: 7, online: 8 },Fd = function () {function e(t) {bn(this, e), this.eventType = 0, this.timestamp = 0, this.networkType = 8, this.code = 0, this.message = "", this.moreMessage = "", this.extension = t, this.costTime = 0, this.duplicate = !1, this.level = 4, this._sentFlag = !1, this._startts = Li();}return Pn(e, [{ key: "updateTimeStamp", value: function value() {this.timestamp = Li();} }, { key: "start", value: function value(e) {return this._startts = e, this;} }, { key: "end", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];if (!this._sentFlag) {var n = Li();this.costTime = n - this._startts, this.setMoreMessage("host:".concat(_u(), " startts:").concat(this._startts, " endts:").concat(n)), t ? (this._sentFlag = !0, this._eventStatModule && this._eventStatModule.pushIn(this)) : setTimeout(function () {e._sentFlag = !0, e._eventStatModule && e._eventStatModule.pushIn(e);}, 0);}} }, { key: "setError", value: function value(e, t, n) {return e instanceof Error ? (this._sentFlag || (this.setNetworkType(n), t ? (e.code && this.setCode(e.code), e.message && this.setMoreMessage(e.message)) : (this.setCode(fp.NO_NETWORK), this.setMoreMessage(Md)), this.setLevel("error")), this) : (Gi.warn("SSOLogData.setError value not instanceof Error, please check!"), this);} }, { key: "setCode", value: function value(e) {return Bi(e) || this._sentFlag || ("ECONNABORTED" === e && (this.code = 103), Fi(e) ? this.code = e : Gi.warn("SSOLogData.setCode value not a number, please check!", e, Rn(e))), this;} }, { key: "setMessage", value: function value(e) {return Bi(e) || this._sentFlag || (Fi(e) && (this.message = e.toString()), qi(e) && (this.message = e)), this;} }, { key: "setLevel", value: function value(e) {return Bi(e) || this._sentFlag || (this.level = Gd[e]), this;} }, { key: "setMoreMessage", value: function value(e) {return Du(this.moreMessage) ? this.moreMessage = "".concat(e) : this.moreMessage += " ".concat(e), this;} }, { key: "setNetworkType", value: function value(e) {return Bi(e) || Bi(Ud[e]) ? Gi.warn("SSOLogData.setNetworkType value is undefined, please check!") : this.networkType = Ud[e], this;} }, { key: "getStartTs", value: function value() {return this._startts;} }], [{ key: "bindEventStatModule", value: function value(t) {e.prototype._eventStatModule = t;} }]), e;}(),qd = "sdkConstruct",xd = "sdkReady",Vd = "login",Kd = "logout",Bd = "kickedOut",Hd = "registerPlugin",jd = "wsConnect",$d = "wsOnOpen",Yd = "wsOnClose",zd = "wsOnError",Wd = "getCosAuthKey",Jd = "getCosPreSigUrl",Xd = "upload",Qd = "sendMessage",Zd = "getC2CRoamingMessages",eg = "getGroupRoamingMessages",tg = "revokeMessage",ng = "deleteMessage",og = "setC2CMessageRead",rg = "setGroupMessageRead",ag = "emptyMessageBody",sg = "getPeerReadTime",ig = "uploadMergerMessage",ug = "downloadMergerMessage",cg = "jsonParseError",lg = "messageE2EDelayException",pg = "getConversationList",dg = "getConversationProfile",gg = "deleteConversation",hg = "pinConversation",fg = "getConversationListInStorage",_g = "syncConversationList",mg = "createGroup",vg = "applyJoinGroup",Mg = "quitGroup",yg = "searchGroupByID",Ig = "changeGroupOwner",Sg = "handleGroupApplication",Tg = "handleGroupInvitation",Dg = "setMessageRemindType",Eg = "dismissGroup",Cg = "updateGroupProfile",Ag = "getGroupList",kg = "getGroupProfile",Ng = "getGroupListInStorage",Og = "getGroupLastSequence",Lg = "getGroupMissingMessage",Rg = "pagingGetGroupList",bg = "getGroupSimplifiedInfo",wg = "joinWithoutAuth",Pg = "initGroupAttributes",Gg = "setGroupAttributes",Ug = "deleteGroupAttributes",Fg = "getGroupAttributes",qg = "getGroupMemberList",xg = "getGroupMemberProfile",Vg = "addGroupMember",Kg = "deleteGroupMember",Bg = "setGroupMemberMuteTime",Hg = "setGroupMemberNameCard",jg = "setGroupMemberRole",$g = "setGroupMemberCustomField",Yg = "getGroupOnlineMemberCount",zg = "longPollingAVError",Wg = "messageLoss",Jg = "messageStacked",Xg = "getUserProfile",Qg = "updateMyProfile",Zg = "getBlacklist",eh = "addToBlacklist",th = "removeFromBlacklist",nh = "callbackFunctionError",oh = "fetchCloudControlConfig",rh = "pushedCloudControlConfig",ah = "error",sh = u.f,ih = function ih(e) {return function (t) {for (var n, o = _f2(t), r = Pt(o), s = r.length, i = 0, u = []; s > i;) {n = r[i++], a && !sh.call(o, n) || u.push(e ? [n, o[n]] : o[n]);}return u;};},uh = { entries: ih(!0), values: ih(!1) }.values;Le({ target: "Object", stat: !0 }, { values: function values(e) {return uh(e);} });var ch = function () {function e(t) {bn(this, e), this.type = ro.MSG_TEXT, this.content = { text: t.text || "" };}return Pn(e, [{ key: "setText", value: function value(e) {this.content.text = e;} }, { key: "sendable", value: function value() {return 0 !== this.content.text.length;} }]), e;}(),lh = Object.assign,ph = Object.defineProperty,dh = !lh || r(function () {if (a && 1 !== lh({ b: 1 }, lh(ph({}, "a", { enumerable: !0, get: function get() {ph(this, "b", { value: 3, enumerable: !1 });} }), { b: 2 })).b) return !0;var e = {},t = {},n = Symbol();return e[n] = 7, "abcdefghijklmnopqrst".split("").forEach(function (e) {t[e] = e;}), 7 != lh({}, e)[n] || "abcdefghijklmnopqrst" != Pt(lh({}, t)).join("");}) ? function (e, t) {for (var n = be(e), o = arguments.length, r = 1, s = ye.f, i = u.f; o > r;) {for (var c, l = g(arguments[r++]), p = s ? Pt(l).concat(s(l)) : Pt(l), d = p.length, h = 0; d > h;) {c = p[h++], a && !i.call(l, c) || (n[c] = l[c]);}}return n;} : lh;Le({ target: "Object", stat: !0, forced: Object.assign !== dh }, { assign: dh });var gh = xe("iterator"),hh = !r(function () {var e = new URL("b?a=1&b=2&c=3", "http://a"),t = e.searchParams,n = "";return e.pathname = "c%20d", t.forEach(function (e, o) {t.delete("b"), n += o + e;}), !t.sort || "http://a/c%20d?a=1&c=3" !== e.href || "3" !== t.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !t[gh] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("http://тест").host || "#%D0%B1" !== new URL("http://a#б").hash || "a1c3" !== n || "x" !== new URL("http://x", void 0).host;}),fh = /[^\0-\u007E]/,_h = /[.\u3002\uFF0E\uFF61]/g,mh = "Overflow: input needs wider integers to process",vh = Math.floor,Mh = String.fromCharCode,yh = function yh(e) {return e + 22 + 75 * (e < 26);},Ih = function Ih(e, t, n) {var o = 0;for (e = n ? vh(e / 700) : e >> 1, e += vh(e / t); e > 455; o += 36) {e = vh(e / 35);}return vh(o + 36 * e / (e + 38));},Sh = function Sh(e) {var t,n,o = [],r = (e = function (e) {for (var t = [], n = 0, o = e.length; n < o;) {var r = e.charCodeAt(n++);if (r >= 55296 && r <= 56319 && n < o) {var a = e.charCodeAt(n++);56320 == (64512 & a) ? t.push(((1023 & r) << 10) + (1023 & a) + 65536) : (t.push(r), n--);} else t.push(r);}return t;}(e)).length,a = 128,s = 0,i = 72;for (t = 0; t < e.length; t++) {(n = e[t]) < 128 && o.push(Mh(n));}var u = o.length,c = u;for (u && o.push("-"); c < r;) {var l = 2147483647;for (t = 0; t < e.length; t++) {(n = e[t]) >= a && n < l && (l = n);}var p = c + 1;if (l - a > vh((2147483647 - s) / p)) throw RangeError(mh);for (s += (l - a) * p, a = l, t = 0; t < e.length; t++) {if ((n = e[t]) < a && ++s > 2147483647) throw RangeError(mh);if (n == a) {for (var d = s, g = 36;; g += 36) {var h = g <= i ? 1 : g >= i + 26 ? 26 : g - i;if (d < h) break;var f = d - h,_ = 36 - h;o.push(Mh(yh(h + f % _))), d = vh(f / _);}o.push(Mh(yh(d))), i = Ih(s, p, c == u), s = 0, ++c;}}++s, ++a;}return o.join("");},Th = function Th(e) {var t = Ct(e);if ("function" != typeof t) throw TypeError(String(e) + " is not iterable");return C(t.call(e));},Dh = re("fetch"),Eh = re("Headers"),Ch = xe("iterator"),Ah = ee.set,kh = ee.getterFor("URLSearchParams"),Nh = ee.getterFor("URLSearchParamsIterator"),Oh = /\+/g,Lh = Array(4),Rh = function Rh(e) {return Lh[e - 1] || (Lh[e - 1] = RegExp("((?:%[\\da-f]{2}){" + e + "})", "gi"));},bh = function bh(e) {try {return decodeURIComponent(e);} catch (jv) {return e;}},wh = function wh(e) {var t = e.replace(Oh, " "),n = 4;try {return decodeURIComponent(t);} catch (jv) {for (; n;) {t = t.replace(Rh(n--), bh);}return t;}},Ph = /[!'()~]|%20/g,Gh = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+" },Uh = function Uh(e) {return Gh[e];},Fh = function Fh(e) {return encodeURIComponent(e).replace(Ph, Uh);},qh = function qh(e, t) {if (t) for (var n, o, r = t.split("&"), a = 0; a < r.length;) {(n = r[a++]).length && (o = n.split("="), e.push({ key: wh(o.shift()), value: wh(o.join("=")) }));}},xh = function xh(e) {this.entries.length = 0, qh(this.entries, e);},Vh = function Vh(e, t) {if (e < t) throw TypeError("Not enough arguments");},Kh = vn(function (e, t) {Ah(this, { type: "URLSearchParamsIterator", iterator: Th(kh(e).entries), kind: t });}, "Iterator", function () {var e = Nh(this),t = e.kind,n = e.iterator.next(),o = n.value;return n.done || (n.value = "keys" === t ? o.key : "values" === t ? o.value : [o.key, o.value]), n;}),Bh = function Bh() {Nr(this, Bh, "URLSearchParams");var e,t,n,o,r,a,s,i,u,c = arguments.length > 0 ? arguments[0] : void 0,l = this,p = [];if (Ah(l, { type: "URLSearchParams", entries: p, updateURL: function updateURL() {}, updateSearchParams: xh }), void 0 !== c) if (_(c)) {if ("function" == typeof (e = Ct(c))) for (n = (t = e.call(c)).next; !(o = n.call(t)).done;) {if ((s = (a = (r = Th(C(o.value))).next).call(r)).done || (i = a.call(r)).done || !a.call(r).done) throw TypeError("Expected sequence with length 2");p.push({ key: s.value + "", value: i.value + "" });} else for (u in c) {M(c, u) && p.push({ key: u, value: c[u] + "" });}} else qh(p, "string" == typeof c ? "?" === c.charAt(0) ? c.slice(1) : c : c + "");},Hh = Bh.prototype;Cr(Hh, { append: function append(e, t) {Vh(arguments.length, 2);var n = kh(this);n.entries.push({ key: e + "", value: t + "" }), n.updateURL();}, delete: function _delete(e) {Vh(arguments.length, 1);for (var t = kh(this), n = t.entries, o = e + "", r = 0; r < n.length;) {n[r].key === o ? n.splice(r, 1) : r++;}t.updateURL();}, get: function get(e) {Vh(arguments.length, 1);for (var t = kh(this).entries, n = e + "", o = 0; o < t.length; o++) {if (t[o].key === n) return t[o].value;}return null;}, getAll: function getAll(e) {Vh(arguments.length, 1);for (var t = kh(this).entries, n = e + "", o = [], r = 0; r < t.length; r++) {t[r].key === n && o.push(t[r].value);}return o;}, has: function has(e) {Vh(arguments.length, 1);for (var t = kh(this).entries, n = e + "", o = 0; o < t.length;) {if (t[o++].key === n) return !0;}return !1;}, set: function set(e, t) {Vh(arguments.length, 1);for (var n, o = kh(this), r = o.entries, a = !1, s = e + "", i = t + "", u = 0; u < r.length; u++) {(n = r[u]).key === s && (a ? r.splice(u--, 1) : (a = !0, n.value = i));}a || r.push({ key: s, value: i }), o.updateURL();}, sort: function sort() {var e,t,n,o = kh(this),r = o.entries,a = r.slice();for (r.length = 0, n = 0; n < a.length; n++) {for (e = a[n], t = 0; t < n; t++) {if (r[t].key > e.key) {r.splice(t, 0, e);break;}}t === n && r.push(e);}o.updateURL();}, forEach: function forEach(e) {for (var t, n = kh(this).entries, o = nt(e, arguments.length > 1 ? arguments[1] : void 0, 3), r = 0; r < n.length;) {o((t = n[r++]).value, t.key, this);}}, keys: function keys() {return new Kh(this, "keys");}, values: function values() {return new Kh(this, "values");}, entries: function entries() {return new Kh(this, "entries");} }, { enumerable: !0 }), te(Hh, Ch, Hh.entries), te(Hh, "toString", function () {for (var e, t = kh(this).entries, n = [], o = 0; o < t.length;) {e = t[o++], n.push(Fh(e.key) + "=" + Fh(e.value));}return n.join("&");}, { enumerable: !0 }), fn(Bh, "URLSearchParams"), Le({ global: !0, forced: !hh }, { URLSearchParams: Bh }), hh || "function" != typeof Dh || "function" != typeof Eh || Le({ global: !0, enumerable: !0, forced: !0 }, { fetch: function fetch(e) {var t,n,o,r = [e];return arguments.length > 1 && (t = arguments[1], _(t) && (n = t.body, "URLSearchParams" === Dt(n) && ((o = t.headers ? new Eh(t.headers) : new Eh()).has("content-type") || o.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), t = Kt(t, { body: c(0, String(n)), headers: c(0, o) }))), r.push(t)), Dh.apply(this, r);} });var jh,$h = { URLSearchParams: Bh, getState: kh },Yh = rn.codeAt,zh = o.URL,Wh = $h.URLSearchParams,Jh = $h.getState,Xh = ee.set,Qh = ee.getterFor("URL"),Zh = Math.floor,ef = Math.pow,tf = /[A-Za-z]/,nf = /[\d+\-.A-Za-z]/,of = /\d/,rf = /^(0x|0X)/,af = /^[0-7]+$/,sf = /^\d+$/,uf = /^[\dA-Fa-f]+$/,cf = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,lf = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/,pf = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,df = /[\u0009\u000A\u000D]/g,gf = function gf(e, t) {var n, o, r;if ("[" == t.charAt(0)) {if ("]" != t.charAt(t.length - 1)) return "Invalid host";if (!(n = ff(t.slice(1, -1)))) return "Invalid host";e.host = n;} else if (Tf(e)) {if (t = function (e) {var t,n,o = [],r = e.toLowerCase().replace(_h, ".").split(".");for (t = 0; t < r.length; t++) {n = r[t], o.push(fh.test(n) ? "xn--" + Sh(n) : n);}return o.join(".");}(t), cf.test(t)) return "Invalid host";if (null === (n = hf(t))) return "Invalid host";e.host = n;} else {if (lf.test(t)) return "Invalid host";for (n = "", o = At(t), r = 0; r < o.length; r++) {n += If(o[r], mf);}e.host = n;}},hf = function hf(e) {var t,n,o,r,a,s,i,u = e.split(".");if (u.length && "" == u[u.length - 1] && u.pop(), (t = u.length) > 4) return e;for (n = [], o = 0; o < t; o++) {if ("" == (r = u[o])) return e;if (a = 10, r.length > 1 && "0" == r.charAt(0) && (a = rf.test(r) ? 16 : 8, r = r.slice(8 == a ? 1 : 2)), "" === r) s = 0;else {if (!(10 == a ? sf : 8 == a ? af : uf).test(r)) return e;s = parseInt(r, a);}n.push(s);}for (o = 0; o < t; o++) {if (s = n[o], o == t - 1) {if (s >= ef(256, 5 - t)) return null;} else if (s > 255) return null;}for (i = n.pop(), o = 0; o < n.length; o++) {i += n[o] * ef(256, 3 - o);}return i;},ff = function ff(e) {var t,n,o,r,a,s,i,u = [0, 0, 0, 0, 0, 0, 0, 0],c = 0,l = null,p = 0,d = function d() {return e.charAt(p);};if (":" == d()) {if (":" != e.charAt(1)) return;p += 2, l = ++c;}for (; d();) {if (8 == c) return;if (":" != d()) {for (t = n = 0; n < 4 && uf.test(d());) {t = 16 * t + parseInt(d(), 16), p++, n++;}if ("." == d()) {if (0 == n) return;if (p -= n, c > 6) return;for (o = 0; d();) {if (r = null, o > 0) {if (!("." == d() && o < 4)) return;p++;}if (!of.test(d())) return;for (; of.test(d());) {if (a = parseInt(d(), 10), null === r) r = a;else {if (0 == r) return;r = 10 * r + a;}if (r > 255) return;p++;}u[c] = 256 * u[c] + r, 2 != ++o && 4 != o || c++;}if (4 != o) return;break;}if (":" == d()) {if (p++, !d()) return;} else if (d()) return;u[c++] = t;} else {if (null !== l) return;p++, l = ++c;}}if (null !== l) for (s = c - l, c = 7; 0 != c && s > 0;) {i = u[c], u[c--] = u[l + s - 1], u[l + --s] = i;} else if (8 != c) return;return u;},_f = function _f(e) {var t, n, o, r;if ("number" == typeof e) {for (t = [], n = 0; n < 4; n++) {t.unshift(e % 256), e = Zh(e / 256);}return t.join(".");}if ("object" == typeof e) {for (t = "", o = function (e) {for (var t = null, n = 1, o = null, r = 0, a = 0; a < 8; a++) {0 !== e[a] ? (r > n && (t = o, n = r), o = null, r = 0) : (null === o && (o = a), ++r);}return r > n && (t = o, n = r), t;}(e), n = 0; n < 8; n++) {r && 0 === e[n] || (r && (r = !1), o === n ? (t += n ? ":" : "::", r = !0) : (t += e[n].toString(16), n < 7 && (t += ":")));}return "[" + t + "]";}return e;},mf = {},vf = dh({}, mf, { " ": 1, '"': 1, "<": 1, ">": 1, "`": 1 }),Mf = dh({}, vf, { "#": 1, "?": 1, "{": 1, "}": 1 }),yf = dh({}, Mf, { "/": 1, ":": 1, ";": 1, "=": 1, "@": 1, "[": 1, "\\": 1, "]": 1, "^": 1, "|": 1 }),If = function If(e, t) {var n = Yh(e, 0);return n > 32 && n < 127 && !M(t, e) ? e : encodeURIComponent(e);},Sf = { ftp: 21, file: null, http: 80, https: 443, ws: 80, wss: 443 },Tf = function Tf(e) {return M(Sf, e.scheme);},Df = function Df(e) {return "" != e.username || "" != e.password;},Ef = function Ef(e) {return !e.host || e.cannotBeABaseURL || "file" == e.scheme;},Cf = function Cf(e, t) {var n;return 2 == e.length && tf.test(e.charAt(0)) && (":" == (n = e.charAt(1)) || !t && "|" == n);},Af = function Af(e) {var t;return e.length > 1 && Cf(e.slice(0, 2)) && (2 == e.length || "/" === (t = e.charAt(2)) || "\\" === t || "?" === t || "#" === t);},kf = function kf(e) {var t = e.path,n = t.length;!n || "file" == e.scheme && 1 == n && Cf(t[0], !0) || t.pop();},Nf = function Nf(e) {return "." === e || "%2e" === e.toLowerCase();},Of = {},Lf = {},Rf = {},bf = {},wf = {},Pf = {},Gf = {},Uf = {},Ff = {},qf = {},xf = {},Vf = {},Kf = {},Bf = {},Hf = {},jf = {},$f = {},Yf = {},zf = {},Wf = {},Jf = {},Xf = function Xf(e, t, n, o) {var r,a,s,i,u,c = n || Of,l = 0,p = "",d = !1,g = !1,h = !1;for (n || (e.scheme = "", e.username = "", e.password = "", e.host = null, e.port = null, e.path = [], e.query = null, e.fragment = null, e.cannotBeABaseURL = !1, t = t.replace(pf, "")), t = t.replace(df, ""), r = At(t); l <= r.length;) {switch (a = r[l], c) {case Of:if (!a || !tf.test(a)) {if (n) return "Invalid scheme";c = Rf;continue;}p += a.toLowerCase(), c = Lf;break;case Lf:if (a && (nf.test(a) || "+" == a || "-" == a || "." == a)) p += a.toLowerCase();else {if (":" != a) {if (n) return "Invalid scheme";p = "", c = Rf, l = 0;continue;}if (n && (Tf(e) != M(Sf, p) || "file" == p && (Df(e) || null !== e.port) || "file" == e.scheme && !e.host)) return;if (e.scheme = p, n) return void (Tf(e) && Sf[e.scheme] == e.port && (e.port = null));p = "", "file" == e.scheme ? c = Bf : Tf(e) && o && o.scheme == e.scheme ? c = bf : Tf(e) ? c = Uf : "/" == r[l + 1] ? (c = wf, l++) : (e.cannotBeABaseURL = !0, e.path.push(""), c = zf);}break;case Rf:if (!o || o.cannotBeABaseURL && "#" != a) return "Invalid scheme";if (o.cannotBeABaseURL && "#" == a) {e.scheme = o.scheme, e.path = o.path.slice(), e.query = o.query, e.fragment = "", e.cannotBeABaseURL = !0, c = Jf;break;}c = "file" == o.scheme ? Bf : Pf;continue;case bf:if ("/" != a || "/" != r[l + 1]) {c = Pf;continue;}c = Ff, l++;break;case wf:if ("/" == a) {c = qf;break;}c = Yf;continue;case Pf:if (e.scheme = o.scheme, a == jh) e.username = o.username, e.password = o.password, e.host = o.host, e.port = o.port, e.path = o.path.slice(), e.query = o.query;else if ("/" == a || "\\" == a && Tf(e)) c = Gf;else if ("?" == a) e.username = o.username, e.password = o.password, e.host = o.host, e.port = o.port, e.path = o.path.slice(), e.query = "", c = Wf;else {if ("#" != a) {e.username = o.username, e.password = o.password, e.host = o.host, e.port = o.port, e.path = o.path.slice(), e.path.pop(), c = Yf;continue;}e.username = o.username, e.password = o.password, e.host = o.host, e.port = o.port, e.path = o.path.slice(), e.query = o.query, e.fragment = "", c = Jf;}break;case Gf:if (!Tf(e) || "/" != a && "\\" != a) {if ("/" != a) {e.username = o.username, e.password = o.password, e.host = o.host, e.port = o.port, c = Yf;continue;}c = qf;} else c = Ff;break;case Uf:if (c = Ff, "/" != a || "/" != p.charAt(l + 1)) continue;l++;break;case Ff:if ("/" != a && "\\" != a) {c = qf;continue;}break;case qf:if ("@" == a) {d && (p = "%40" + p), d = !0, s = At(p);for (var f = 0; f < s.length; f++) {var _ = s[f];if (":" != _ || h) {var m = If(_, yf);h ? e.password += m : e.username += m;} else h = !0;}p = "";} else if (a == jh || "/" == a || "?" == a || "#" == a || "\\" == a && Tf(e)) {if (d && "" == p) return "Invalid authority";l -= At(p).length + 1, p = "", c = xf;} else p += a;break;case xf:case Vf:if (n && "file" == e.scheme) {c = jf;continue;}if (":" != a || g) {if (a == jh || "/" == a || "?" == a || "#" == a || "\\" == a && Tf(e)) {if (Tf(e) && "" == p) return "Invalid host";if (n && "" == p && (Df(e) || null !== e.port)) return;if (i = gf(e, p)) return i;if (p = "", c = $f, n) return;continue;}"[" == a ? g = !0 : "]" == a && (g = !1), p += a;} else {if ("" == p) return "Invalid host";if (i = gf(e, p)) return i;if (p = "", c = Kf, n == Vf) return;}break;case Kf:if (!of.test(a)) {if (a == jh || "/" == a || "?" == a || "#" == a || "\\" == a && Tf(e) || n) {if ("" != p) {var v = parseInt(p, 10);if (v > 65535) return "Invalid port";e.port = Tf(e) && v === Sf[e.scheme] ? null : v, p = "";}if (n) return;c = $f;continue;}return "Invalid port";}p += a;break;case Bf:if (e.scheme = "file", "/" == a || "\\" == a) c = Hf;else {if (!o || "file" != o.scheme) {c = Yf;continue;}if (a == jh) e.host = o.host, e.path = o.path.slice(), e.query = o.query;else if ("?" == a) e.host = o.host, e.path = o.path.slice(), e.query = "", c = Wf;else {if ("#" != a) {Af(r.slice(l).join("")) || (e.host = o.host, e.path = o.path.slice(), kf(e)), c = Yf;continue;}e.host = o.host, e.path = o.path.slice(), e.query = o.query, e.fragment = "", c = Jf;}}break;case Hf:if ("/" == a || "\\" == a) {c = jf;break;}o && "file" == o.scheme && !Af(r.slice(l).join("")) && (Cf(o.path[0], !0) ? e.path.push(o.path[0]) : e.host = o.host), c = Yf;continue;case jf:if (a == jh || "/" == a || "\\" == a || "?" == a || "#" == a) {if (!n && Cf(p)) c = Yf;else if ("" == p) {if (e.host = "", n) return;c = $f;} else {if (i = gf(e, p)) return i;if ("localhost" == e.host && (e.host = ""), n) return;p = "", c = $f;}continue;}p += a;break;case $f:if (Tf(e)) {if (c = Yf, "/" != a && "\\" != a) continue;} else if (n || "?" != a) {if (n || "#" != a) {if (a != jh && (c = Yf, "/" != a)) continue;} else e.fragment = "", c = Jf;} else e.query = "", c = Wf;break;case Yf:if (a == jh || "/" == a || "\\" == a && Tf(e) || !n && ("?" == a || "#" == a)) {if (".." === (u = (u = p).toLowerCase()) || "%2e." === u || ".%2e" === u || "%2e%2e" === u ? (kf(e), "/" == a || "\\" == a && Tf(e) || e.path.push("")) : Nf(p) ? "/" == a || "\\" == a && Tf(e) || e.path.push("") : ("file" == e.scheme && !e.path.length && Cf(p) && (e.host && (e.host = ""), p = p.charAt(0) + ":"), e.path.push(p)), p = "", "file" == e.scheme && (a == jh || "?" == a || "#" == a)) for (; e.path.length > 1 && "" === e.path[0];) {e.path.shift();}"?" == a ? (e.query = "", c = Wf) : "#" == a && (e.fragment = "", c = Jf);} else p += If(a, Mf);break;case zf:"?" == a ? (e.query = "", c = Wf) : "#" == a ? (e.fragment = "", c = Jf) : a != jh && (e.path[0] += If(a, mf));break;case Wf:n || "#" != a ? a != jh && ("'" == a && Tf(e) ? e.query += "%27" : e.query += "#" == a ? "%23" : If(a, mf)) : (e.fragment = "", c = Jf);break;case Jf:a != jh && (e.fragment += If(a, vf));}l++;}},Qf = function Qf(e) {var t,n,o = Nr(this, Qf, "URL"),r = arguments.length > 1 ? arguments[1] : void 0,s = String(e),i = Xh(o, { type: "URL" });if (void 0 !== r) if (r instanceof Qf) t = Qh(r);else if (n = Xf(t = {}, String(r))) throw TypeError(n);if (n = Xf(i, s, null, t)) throw TypeError(n);var u = i.searchParams = new Wh(),c = Jh(u);c.updateSearchParams(i.query), c.updateURL = function () {i.query = String(u) || null;}, a || (o.href = e_.call(o), o.origin = t_.call(o), o.protocol = n_.call(o), o.username = o_.call(o), o.password = r_.call(o), o.host = a_.call(o), o.hostname = s_.call(o), o.port = i_.call(o), o.pathname = u_.call(o), o.search = c_.call(o), o.searchParams = l_.call(o), o.hash = p_.call(o));},Zf = Qf.prototype,e_ = function e_() {var e = Qh(this),t = e.scheme,n = e.username,o = e.password,r = e.host,a = e.port,s = e.path,i = e.query,u = e.fragment,c = t + ":";return null !== r ? (c += "//", Df(e) && (c += n + (o ? ":" + o : "") + "@"), c += _f(r), null !== a && (c += ":" + a)) : "file" == t && (c += "//"), c += e.cannotBeABaseURL ? s[0] : s.length ? "/" + s.join("/") : "", null !== i && (c += "?" + i), null !== u && (c += "#" + u), c;},t_ = function t_() {var e = Qh(this),t = e.scheme,n = e.port;if ("blob" == t) try {return new URL(t.path[0]).origin;} catch (jv) {return "null";}return "file" != t && Tf(e) ? t + "://" + _f(e.host) + (null !== n ? ":" + n : "") : "null";},n_ = function n_() {return Qh(this).scheme + ":";},o_ = function o_() {return Qh(this).username;},r_ = function r_() {return Qh(this).password;},a_ = function a_() {var e = Qh(this),t = e.host,n = e.port;return null === t ? "" : null === n ? _f(t) : _f(t) + ":" + n;},s_ = function s_() {var e = Qh(this).host;return null === e ? "" : _f(e);},i_ = function i_() {var e = Qh(this).port;return null === e ? "" : String(e);},u_ = function u_() {var e = Qh(this),t = e.path;return e.cannotBeABaseURL ? t[0] : t.length ? "/" + t.join("/") : "";},c_ = function c_() {var e = Qh(this).query;return e ? "?" + e : "";},l_ = function l_() {return Qh(this).searchParams;},p_ = function p_() {var e = Qh(this).fragment;return e ? "#" + e : "";},d_ = function d_(e, t) {return { get: e, set: t, configurable: !0, enumerable: !0 };};if (a && Gt(Zf, { href: d_(e_, function (e) {var t = Qh(this),n = String(e),o = Xf(t, n);if (o) throw TypeError(o);Jh(t.searchParams).updateSearchParams(t.query);}), origin: d_(t_), protocol: d_(n_, function (e) {var t = Qh(this);Xf(t, String(e) + ":", Of);}), username: d_(o_, function (e) {var t = Qh(this),n = At(String(e));if (!Ef(t)) {t.username = "";for (var o = 0; o < n.length; o++) {t.username += If(n[o], yf);}}}), password: d_(r_, function (e) {var t = Qh(this),n = At(String(e));if (!Ef(t)) {t.password = "";for (var o = 0; o < n.length; o++) {t.password += If(n[o], yf);}}}), host: d_(a_, function (e) {var t = Qh(this);t.cannotBeABaseURL || Xf(t, String(e), xf);}), hostname: d_(s_, function (e) {var t = Qh(this);t.cannotBeABaseURL || Xf(t, String(e), Vf);}), port: d_(i_, function (e) {var t = Qh(this);Ef(t) || ("" == (e = String(e)) ? t.port = null : Xf(t, e, Kf));}), pathname: d_(u_, function (e) {var t = Qh(this);t.cannotBeABaseURL || (t.path = [], Xf(t, e + "", $f));}), search: d_(c_, function (e) {var t = Qh(this);"" == (e = String(e)) ? t.query = null : ("?" == e.charAt(0) && (e = e.slice(1)), t.query = "", Xf(t, e, Wf)), Jh(t.searchParams).updateSearchParams(t.query);}), searchParams: d_(l_), hash: d_(p_, function (e) {var t = Qh(this);"" != (e = String(e)) ? ("#" == e.charAt(0) && (e = e.slice(1)), t.fragment = "", Xf(t, e, Jf)) : t.fragment = null;}) }), te(Zf, "toJSON", function () {return e_.call(this);}, { enumerable: !0 }), te(Zf, "toString", function () {return e_.call(this);}, { enumerable: !0 }), zh) {var g_ = zh.createObjectURL,h_ = zh.revokeObjectURL;g_ && te(Qf, "createObjectURL", function (e) {return g_.apply(zh, arguments);}), h_ && te(Qf, "revokeObjectURL", function (e) {return h_.apply(zh, arguments);});}fn(Qf, "URL"), Le({ global: !0, forced: !hh, sham: !a }, { URL: Qf });var f_ = { JSON: { TYPE: { C2C: { NOTICE: 1, COMMON: 9, EVENT: 10 }, GROUP: { COMMON: 3, TIP: 4, SYSTEM: 5, TIP2: 6 }, FRIEND: { NOTICE: 7 }, PROFILE: { NOTICE: 8 } }, SUBTYPE: { C2C: { COMMON: 0, READED: 92, KICKEDOUT: 96 }, GROUP: { COMMON: 0, LOVEMESSAGE: 1, TIP: 2, REDPACKET: 3 } }, OPTIONS: { GROUP: { JOIN: 1, QUIT: 2, KICK: 3, SET_ADMIN: 4, CANCEL_ADMIN: 5, MODIFY_GROUP_INFO: 6, MODIFY_MEMBER_INFO: 7 } } }, PROTOBUF: {}, IMAGE_TYPES: { ORIGIN: 1, LARGE: 2, SMALL: 3 }, IMAGE_FORMAT: { JPG: 1, JPEG: 1, GIF: 2, PNG: 3, BMP: 4, UNKNOWN: 255 } },__ = { NICK: "Tag_Profile_IM_Nick", GENDER: "Tag_Profile_IM_Gender", BIRTHDAY: "Tag_Profile_IM_BirthDay", LOCATION: "Tag_Profile_IM_Location", SELFSIGNATURE: "Tag_Profile_IM_SelfSignature", ALLOWTYPE: "Tag_Profile_IM_AllowType", LANGUAGE: "Tag_Profile_IM_Language", AVATAR: "Tag_Profile_IM_Image", MESSAGESETTINGS: "Tag_Profile_IM_MsgSettings", ADMINFORBIDTYPE: "Tag_Profile_IM_AdminForbidType", LEVEL: "Tag_Profile_IM_Level", ROLE: "Tag_Profile_IM_Role" },m_ = { UNKNOWN: "Gender_Type_Unknown", FEMALE: "Gender_Type_Female", MALE: "Gender_Type_Male" },v_ = { NONE: "AdminForbid_Type_None", SEND_OUT: "AdminForbid_Type_SendOut" },M_ = { NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_ANY: "AllowType_Type_AllowAny", DENY_ANY: "AllowType_Type_DenyAny" },y_ = "JoinedSuccess",I_ = "WaitAdminApproval",S_ = function () {function e(t) {bn(this, e), this._imageMemoryURL = "", Zs ? this.createImageDataASURLInWXMiniApp(t.file) : this.createImageDataASURLInWeb(t.file), this._initImageInfoModel(), this.type = ro.MSG_IMAGE, this._percent = 0, this.content = { imageFormat: t.imageFormat || f_.IMAGE_FORMAT.UNKNOWN, uuid: t.uuid, imageInfoArray: [] }, this.initImageInfoArray(t.imageInfoArray), this._defaultImage = "http://imgcache.qq.com/open/qcloud/video/act/webim-images/default.jpg", this._autoFixUrl();}return Pn(e, [{ key: "_initImageInfoModel", value: function value() {var e = this;this._ImageInfoModel = function (t) {this.instanceID = eu(9999999), this.sizeType = t.type || 0, this.type = 0, this.size = t.size || 0, this.width = t.width || 0, this.height = t.height || 0, this.imageUrl = t.url || "", this.url = t.url || e._imageMemoryURL || e._defaultImage;}, this._ImageInfoModel.prototype = { setSizeType: function setSizeType(e) {this.sizeType = e;}, setType: function setType(e) {this.type = e;}, setImageUrl: function setImageUrl(e) {e && (this.imageUrl = e);}, getImageUrl: function getImageUrl() {return this.imageUrl;} };} }, { key: "initImageInfoArray", value: function value(e) {for (var t = 0, n = null, o = null; t <= 2;) {o = Bi(e) || Bi(e[t]) ? { type: 0, size: 0, width: 0, height: 0, url: "" } : e[t], (n = new this._ImageInfoModel(o)).setSizeType(t + 1), n.setType(t), this.addImageInfo(n), t++;}this.updateAccessSideImageInfoArray();} }, { key: "updateImageInfoArray", value: function value(e) {for (var t, n = this.content.imageInfoArray.length, o = 0; o < n; o++) {t = this.content.imageInfoArray[o], e[o].size && (t.size = e[o].size), e[o].url && t.setImageUrl(e[o].url), e[o].width && (t.width = e[o].width), e[o].height && (t.height = e[o].height);}} }, { key: "_autoFixUrl", value: function value() {for (var e = this.content.imageInfoArray.length, t = "", n = "", o = ["http", "https"], r = null, a = 0; a < e; a++) {this.content.imageInfoArray[a].url && "" !== (r = this.content.imageInfoArray[a]).imageUrl && (n = r.imageUrl.slice(0, r.imageUrl.indexOf("://") + 1), t = r.imageUrl.slice(r.imageUrl.indexOf("://") + 1), o.indexOf(n) < 0 && (n = "https:"), this.content.imageInfoArray[a].setImageUrl([n, t].join("")));}} }, { key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateImageFormat", value: function value(e) {this.content.imageFormat = f_.IMAGE_FORMAT[e.toUpperCase()] || f_.IMAGE_FORMAT.UNKNOWN;} }, { key: "createImageDataASURLInWeb", value: function value(e) {void 0 !== e && e.files.length > 0 && (this._imageMemoryURL = window.URL.createObjectURL(e.files[0]));} }, { key: "createImageDataASURLInWXMiniApp", value: function value(e) {e && e.url && (this._imageMemoryURL = e.url);} }, { key: "replaceImageInfo", value: function value(e, t) {this.content.imageInfoArray[t] instanceof this._ImageInfoModel || (this.content.imageInfoArray[t] = e);} }, { key: "addImageInfo", value: function value(e) {this.content.imageInfoArray.length >= 3 || this.content.imageInfoArray.push(e);} }, { key: "updateAccessSideImageInfoArray", value: function value() {var e = this.content.imageInfoArray,t = e[0],n = t.width,o = void 0 === n ? 0 : n,r = t.height,a = void 0 === r ? 0 : r;0 !== o && 0 !== a && (vu(e), Object.assign(e[2], mu({ originWidth: o, originHeight: a, min: 720 })));} }, { key: "sendable", value: function value() {return 0 !== this.content.imageInfoArray.length && "" !== this.content.imageInfoArray[0].imageUrl && 0 !== this.content.imageInfoArray[0].size;} }]), e;}(),T_ = function () {function e(t) {bn(this, e), this.type = ro.MSG_FACE, this.content = t || null;}return Pn(e, [{ key: "sendable", value: function value() {return null !== this.content;} }]), e;}(),D_ = function () {function e(t) {bn(this, e), this.type = ro.MSG_AUDIO, this._percent = 0, this.content = { downloadFlag: 2, second: t.second, size: t.size, url: t.url, remoteAudioUrl: t.url || "", uuid: t.uuid };}return Pn(e, [{ key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateAudioUrl", value: function value(e) {this.content.remoteAudioUrl = e;} }, { key: "sendable", value: function value() {return "" !== this.content.remoteAudioUrl;} }]), e;}();Le({ target: "Object", stat: !0, forced: !a, sham: !a }, { defineProperty: k.f });var E_ = { from: !0, groupID: !0, groupName: !0, to: !0 },C_ = function () {function e(t) {bn(this, e), this.type = ro.MSG_GRP_TIP, this.content = {}, this._initContent(t);}return Pn(e, [{ key: "_initContent", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "remarkInfo":break;case "groupProfile":t.content.groupProfile = {}, t._initGroupProfile(e[n]);break;case "operatorInfo":case "memberInfoList":break;case "msgMemberInfo":t.content.memberList = e[n], Object.defineProperty(t.content, "msgMemberInfo", { get: function get() {return Gi.warn("!!! 禁言的群提示消息中的 payload.msgMemberInfo 属性即将废弃，请使用 payload.memberList 属性替代。 \n", "msgMemberInfo 中的 shutupTime 属性对应更改为 memberList 中的 muteTime 属性，表示禁言时长。 \n", "参考：群提示消息 https://web.sdk.qcloud.com/im/doc/zh-cn/Message.html#.GroupTipPayload"), t.content.memberList.map(function (e) {return { userID: e.userID, shutupTime: e.muteTime };});} });break;case "onlineMemberInfo":break;case "memberNum":t.content[n] = e[n], t.content.memberCount = e[n];break;default:t.content[n] = e[n];}}), this.content.userIDList || (this.content.userIDList = [this.content.operatorID]);} }, { key: "_initGroupProfile", value: function value(e) {for (var t = Object.keys(e), n = 0; n < t.length; n++) {var o = t[n];E_[o] && (this.content.groupProfile[o] = e[o]);}} }]), e;}(),A_ = { from: !0, groupID: !0, groupName: !0, to: !0 },k_ = function () {function e(t) {bn(this, e), this.type = ro.MSG_GRP_SYS_NOTICE, this.content = {}, this._initContent(t);}return Pn(e, [{ key: "_initContent", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "memberInfoList":break;case "remarkInfo":t.content.handleMessage = e[n];break;case "groupProfile":t.content.groupProfile = {}, t._initGroupProfile(e[n]);break;default:t.content[n] = e[n];}});} }, { key: "_initGroupProfile", value: function value(e) {for (var t = Object.keys(e), n = 0; n < t.length; n++) {var o = t[n];A_[o] && ("groupName" === o ? this.content.groupProfile.name = e[o] : this.content.groupProfile[o] = e[o]);}} }]), e;}(),N_ = Math.min,O_ = [].lastIndexOf,L_ = !!O_ && 1 / [1].lastIndexOf(1, -0) < 0,R_ = st("lastIndexOf"),b_ = lt("indexOf", { ACCESSORS: !0, 1: 0 }),w_ = L_ || !R_ || !b_ ? function (e) {if (L_) return O_.apply(this, arguments) || 0;var t = _f2(this),n = ce(t.length),o = n - 1;for (arguments.length > 1 && (o = N_(o, ie(arguments[1]))), o < 0 && (o = n + o); o >= 0; o--) {if (o in t && t[o] === e) return o || 0;}return -1;} : O_;Le({ target: "Array", proto: !0, forced: w_ !== [].lastIndexOf }, { lastIndexOf: w_ });var P_ = function () {function e(t) {bn(this, e), this.type = ro.MSG_FILE, this._percent = 0;var n = this._getFileInfo(t);this.content = { downloadFlag: 2, fileUrl: t.url || "", uuid: t.uuid, fileName: n.name || "", fileSize: n.size || 0 };}return Pn(e, [{ key: "_getFileInfo", value: function value(e) {if (e.fileName && e.fileSize) return { size: e.fileSize, name: e.fileName };if (Zs) return {};var t = e.file.files[0];return { size: t.size, name: t.name, type: t.type.slice(t.type.lastIndexOf("/") + 1).toLowerCase() };} }, { key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateFileUrl", value: function value(e) {this.content.fileUrl = e;} }, { key: "sendable", value: function value() {return "" !== this.content.fileUrl && "" !== this.content.fileName && 0 !== this.content.fileSize;} }]), e;}(),G_ = function () {function e(t) {bn(this, e), this.type = ro.MSG_CUSTOM, this.content = { data: t.data || "", description: t.description || "", extension: t.extension || "" };}return Pn(e, [{ key: "setData", value: function value(e) {return this.content.data = e, this;} }, { key: "setDescription", value: function value(e) {return this.content.description = e, this;} }, { key: "setExtension", value: function value(e) {return this.content.extension = e, this;} }, { key: "sendable", value: function value() {return 0 !== this.content.data.length || 0 !== this.content.description.length || 0 !== this.content.extension.length;} }]), e;}(),U_ = function () {function e(t) {bn(this, e), this.type = ro.MSG_VIDEO, this._percent = 0, this.content = { remoteVideoUrl: t.remoteVideoUrl || t.videoUrl || "", videoFormat: t.videoFormat, videoSecond: parseInt(t.videoSecond, 10), videoSize: t.videoSize, videoUrl: t.videoUrl, videoDownloadFlag: 2, videoUUID: t.videoUUID, thumbUUID: t.thumbUUID, thumbFormat: t.thumbFormat, thumbWidth: t.thumbWidth, thumbHeight: t.thumbHeight, thumbSize: t.thumbSize, thumbDownloadFlag: 2, thumbUrl: t.thumbUrl };}return Pn(e, [{ key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateVideoUrl", value: function value(e) {e && (this.content.remoteVideoUrl = e);} }, { key: "sendable", value: function value() {return "" !== this.content.remoteVideoUrl;} }]), e;}(),F_ = function e(t) {bn(this, e), this.type = ro.MSG_GEO, this.content = t;},q_ = function () {function e(t) {if (bn(this, e), this.from = t.from, this.messageSender = t.from, this.time = t.time, this.messageSequence = t.sequence, this.clientSequence = t.clientSequence || t.sequence, this.messageRandom = t.random, this.cloudCustomData = t.cloudCustomData || "", t.ID) this.nick = t.nick || "", this.avatar = t.avatar || "", this.messageBody = [{ type: t.type, payload: t.payload }], t.conversationType.startsWith(ro.CONV_C2C) ? this.receiverUserID = t.to : t.conversationType.startsWith(ro.CONV_GROUP) && (this.receiverGroupID = t.to), this.messageReceiver = t.to;else {this.nick = t.nick || "", this.avatar = t.avatar || "", this.messageBody = [];var n = t.elements[0].type,o = t.elements[0].content;this._patchRichMediaPayload(n, o), n === ro.MSG_MERGER ? this.messageBody.push({ type: n, payload: new x_(o).content }) : this.messageBody.push({ type: n, payload: o }), t.groupID && (this.receiverGroupID = t.groupID, this.messageReceiver = t.groupID), t.to && (this.receiverUserID = t.to, this.messageReceiver = t.to);}}return Pn(e, [{ key: "_patchRichMediaPayload", value: function value(e, t) {e === ro.MSG_IMAGE ? t.imageInfoArray.forEach(function (e) {!e.imageUrl && e.url && (e.imageUrl = e.url, e.sizeType = e.type, 1 === e.type ? e.type = 0 : 3 === e.type && (e.type = 1));}) : e === ro.MSG_VIDEO ? !t.remoteVideoUrl && t.videoUrl && (t.remoteVideoUrl = t.videoUrl) : e === ro.MSG_AUDIO ? !t.remoteAudioUrl && t.url && (t.remoteAudioUrl = t.url) : e === ro.MSG_FILE && !t.fileUrl && t.url && (t.fileUrl = t.url, t.url = void 0);} }]), e;}(),x_ = function () {function e(t) {if (bn(this, e), this.type = ro.MSG_MERGER, this.content = { downloadKey: "", pbDownloadKey: "", messageList: [], title: "", abstractList: [], compatibleText: "", version: 0, layersOverLimit: !1 }, t.downloadKey) {var n = t.downloadKey,o = t.pbDownloadKey,r = t.title,a = t.abstractList,s = t.compatibleText,i = t.version;this.content.downloadKey = n, this.content.pbDownloadKey = o, this.content.title = r, this.content.abstractList = a, this.content.compatibleText = s, this.content.version = i || 0;} else if (Du(t.messageList)) 1 === t.layersOverLimit && (this.content.layersOverLimit = !0);else {var u = t.messageList,c = t.title,l = t.abstractList,p = t.compatibleText,d = t.version,g = [];u.forEach(function (e) {if (!Du(e)) {var t = new q_(e);g.push(t);}}), this.content.messageList = g, this.content.title = c, this.content.abstractList = l, this.content.compatibleText = p, this.content.version = d || 0;}Gi.debug("MergerElement.content:", this.content);}return Pn(e, [{ key: "sendable", value: function value() {return !Du(this.content.messageList) || !Du(this.content.downloadKey);} }]), e;}(),V_ = { 1: ro.MSG_PRIORITY_HIGH, 2: ro.MSG_PRIORITY_NORMAL, 3: ro.MSG_PRIORITY_LOW, 4: ro.MSG_PRIORITY_LOWEST },K_ = function () {function e(t) {bn(this, e), this.ID = "", this.conversationID = t.conversationID || null, this.conversationType = t.conversationType || ro.CONV_C2C, this.conversationSubType = t.conversationSubType, this.time = t.time || Math.ceil(Date.now() / 1e3), this.sequence = t.sequence || 0, this.clientSequence = t.clientSequence || t.sequence || 0, this.random = t.random || 0 === t.random ? t.random : eu(), this.priority = this._computePriority(t.priority), this.nick = t.nick || "", this.avatar = t.avatar || "", this.isPeerRead = !1, this.nameCard = "", this._elements = [], this.isPlaceMessage = t.isPlaceMessage || 0, this.isRevoked = 2 === t.isPlaceMessage || 8 === t.msgFlagBits, this.geo = {}, this.from = t.from || null, this.to = t.to || null, this.flow = "", this.isSystemMessage = t.isSystemMessage || !1, this.protocol = t.protocol || "JSON", this.isResend = !1, this.isRead = !1, this.status = t.status || vc.SUCCESS, this._onlineOnlyFlag = !1, this._groupAtInfoList = [], this._relayFlag = !1, this.atUserList = [], this.cloudCustomData = t.cloudCustomData || "", this.isDeleted = !1, this.isModified = !1, this.reInitialize(t.currentUser), this.extractGroupInfo(t.groupProfile || null), this.handleGroupAtInfo(t);}return Pn(e, [{ key: "getElements", value: function value() {return this._elements;} }, { key: "extractGroupInfo", value: function value(e) {if (null !== e) {qi(e.nick) && (this.nick = e.nick), qi(e.avatar) && (this.avatar = e.avatar);var t = e.messageFromAccountExtraInformation;Vi(t) && qi(t.nameCard) && (this.nameCard = t.nameCard);}} }, { key: "handleGroupAtInfo", value: function value(e) {var t = this;e.payload && e.payload.atUserList && e.payload.atUserList.forEach(function (e) {e !== ro.MSG_AT_ALL ? (t._groupAtInfoList.push({ groupAtAllFlag: 0, groupAtUserID: e }), t.atUserList.push(e)) : (t._groupAtInfoList.push({ groupAtAllFlag: 1 }), t.atUserList.push(ro.MSG_AT_ALL));}), Ki(e.groupAtInfo) && e.groupAtInfo.forEach(function (e) {1 === e.groupAtAllFlag ? t.atUserList.push(e.groupAtUserID) : 2 === e.groupAtAllFlag && t.atUserList.push(ro.MSG_AT_ALL);});} }, { key: "getGroupAtInfoList", value: function value() {return this._groupAtInfoList;} }, { key: "_initProxy", value: function value() {this._elements[0] && (this.payload = this._elements[0].content, this.type = this._elements[0].type);} }, { key: "reInitialize", value: function value(e) {e && (this.status = this.from ? vc.SUCCESS : vc.UNSEND, !this.from && (this.from = e)), this._initFlow(e), this._initSequence(e), this._concatConversationID(e), this.generateMessageID(e);} }, { key: "isSendable", value: function value() {return 0 !== this._elements.length && ("function" != typeof this._elements[0].sendable ? (Gi.warn("".concat(this._elements[0].type, ' need "boolean : sendable()" method')), !1) : this._elements[0].sendable());} }, { key: "_initTo", value: function value(e) {this.conversationType === ro.CONV_GROUP && (this.to = e.groupID);} }, { key: "_initSequence", value: function value(e) {0 === this.clientSequence && e && (this.clientSequence = function (e) {if (!e) return Gi.error("autoIncrementIndex(string: key) need key parameter"), !1;if (void 0 === ru[e]) {var t = new Date(),n = "3".concat(t.getHours()).slice(-2),o = "0".concat(t.getMinutes()).slice(-2),r = "0".concat(t.getSeconds()).slice(-2);ru[e] = parseInt([n, o, r, "0001"].join("")), n = null, o = null, r = null, Gi.log("autoIncrementIndex start index:".concat(ru[e]));}return ru[e]++;}(e)), 0 === this.sequence && this.conversationType === ro.CONV_C2C && (this.sequence = this.clientSequence);} }, { key: "generateMessageID", value: function value(e) {var t = e === this.from ? 1 : 0,n = this.sequence > 0 ? this.sequence : this.clientSequence;this.ID = "".concat(this.conversationID, "-").concat(n, "-").concat(this.random, "-").concat(t);} }, { key: "_initFlow", value: function value(e) {"" !== e && (e === this.from ? (this.flow = "out", this.isRead = !0) : this.flow = "in");} }, { key: "_concatConversationID", value: function value(e) {var t = this.to,n = "",o = this.conversationType;o !== ro.CONV_SYSTEM ? (n = o === ro.CONV_C2C ? e === this.from ? t : this.from : this.to, this.conversationID = "".concat(o).concat(n)) : this.conversationID = ro.CONV_SYSTEM;} }, { key: "isElement", value: function value(e) {return e instanceof ch || e instanceof S_ || e instanceof T_ || e instanceof D_ || e instanceof P_ || e instanceof U_ || e instanceof C_ || e instanceof k_ || e instanceof G_ || e instanceof F_ || e instanceof x_;} }, { key: "setElement", value: function value(e) {var t = this;if (this.isElement(e)) return this._elements = [e], void this._initProxy();var n = function n(e) {if (e.type && e.content) switch (e.type) {case ro.MSG_TEXT:t.setTextElement(e.content);break;case ro.MSG_IMAGE:t.setImageElement(e.content);break;case ro.MSG_AUDIO:t.setAudioElement(e.content);break;case ro.MSG_FILE:t.setFileElement(e.content);break;case ro.MSG_VIDEO:t.setVideoElement(e.content);break;case ro.MSG_CUSTOM:t.setCustomElement(e.content);break;case ro.MSG_GEO:t.setGEOElement(e.content);break;case ro.MSG_GRP_TIP:t.setGroupTipElement(e.content);break;case ro.MSG_GRP_SYS_NOTICE:t.setGroupSystemNoticeElement(e.content);break;case ro.MSG_FACE:t.setFaceElement(e.content);break;case ro.MSG_MERGER:t.setMergerElement(e.content);break;default:Gi.warn(e.type, e.content, "no operation......");}};if (Ki(e)) for (var o = 0; o < e.length; o++) {n(e[o]);} else n(e);this._initProxy();} }, { key: "clearElement", value: function value() {this._elements.length = 0;} }, { key: "setTextElement", value: function value(e) {var t = "string" == typeof e ? e : e.text,n = new ch({ text: t });this._elements.push(n);} }, { key: "setImageElement", value: function value(e) {var t = new S_(e);this._elements.push(t);} }, { key: "setAudioElement", value: function value(e) {var t = new D_(e);this._elements.push(t);} }, { key: "setFileElement", value: function value(e) {var t = new P_(e);this._elements.push(t);} }, { key: "setVideoElement", value: function value(e) {var t = new U_(e);this._elements.push(t);} }, { key: "setGEOElement", value: function value(e) {var t = new F_(e);this._elements.push(t);} }, { key: "setCustomElement", value: function value(e) {var t = new G_(e);this._elements.push(t);} }, { key: "setGroupTipElement", value: function value(e) {var t = {},n = e.operationType;Du(e.memberInfoList) ? e.operatorInfo && (t = e.operatorInfo) : n !== ro.GRP_TIP_MBR_JOIN && n !== ro.GRP_TIP_MBR_KICKED_OUT && n !== ro.GRP_TIP_MBR_SET_ADMIN && n !== ro.GRP_TIP_MBR_CANCELED_ADMIN || (t = e.memberInfoList[0]);var o = t,r = o.nick,a = o.avatar;qi(r) && (this.nick = r), qi(a) && (this.avatar = a);var s = new C_(e);this._elements.push(s);} }, { key: "setGroupSystemNoticeElement", value: function value(e) {var t = new k_(e);this._elements.push(t);} }, { key: "setFaceElement", value: function value(e) {var t = new T_(e);this._elements.push(t);} }, { key: "setMergerElement", value: function value(e) {var t = new x_(e);this._elements.push(t);} }, { key: "setIsRead", value: function value(e) {this.isRead = e;} }, { key: "setRelayFlag", value: function value(e) {this._relayFlag = e;} }, { key: "getRelayFlag", value: function value() {return this._relayFlag;} }, { key: "setOnlineOnlyFlag", value: function value(e) {this._onlineOnlyFlag = e;} }, { key: "getOnlineOnlyFlag", value: function value() {return this._onlineOnlyFlag;} }, { key: "_computePriority", value: function value(e) {if (Bi(e)) return ro.MSG_PRIORITY_NORMAL;if (qi(e) && -1 !== Object.values(V_).indexOf(e)) return e;if (Fi(e)) {var t = "" + e;if (-1 !== Object.keys(V_).indexOf(t)) return V_[t];}return ro.MSG_PRIORITY_NORMAL;} }, { key: "setNickAndAvatar", value: function value(e) {var t = e.nick,n = e.avatar;qi(t) && (this.nick = t), qi(n) && (this.avatar = n);} }, { key: "setNameCard", value: function value(e) {qi(e) && (this.nameCard = e);} }, { key: "elements", get: function get() {return Gi.warn("！！！Message 实例的 elements 属性即将废弃，请尽快修改。使用 type 和 payload 属性处理单条消息，兼容组合消息使用 _elements 属性！！！"), this._elements;} }]), e;}(),B_ = function B_(e) {return { code: 0, data: e || {} };},H_ = "https://cloud.tencent.com/document/product/",j_ = "您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。",$_ = "UserSig 非法，请使用官网提供的 API 重新生成 UserSig(".concat(H_, "269/32688)。"),Y_ = "#.E6.B6.88.E6.81.AF.E5.85.83.E7.B4.A0-timmsgelement",z_ = { 70001: "UserSig 已过期，请重新生成。建议 UserSig 有效期设置不小于24小时。", 70002: "UserSig 长度为0，请检查传入的 UserSig 是否正确。", 70003: $_, 70005: $_, 70009: "UserSig 验证失败，可能因为生成 UserSig 时混用了其他 SDKAppID 的私钥或密钥导致，请使用对应 SDKAppID 下的私钥或密钥重新生成 UserSig(".concat(H_, "269/32688)。"), 70013: "请求中的 UserID 与生成 UserSig 时使用的 UserID 不匹配。".concat(j_), 70014: "请求中的 SDKAppID 与生成 UserSig 时使用的 SDKAppID 不匹配。".concat(j_), 70016: "密钥不存在，UserSig 验证失败，请在即时通信 IM 控制台获取密钥(".concat(H_, "269/32578#.E8.8E.B7.E5.8F.96.E5.AF.86.E9.92.A5)。"), 70020: "SDKAppID 未找到，请在即时通信 IM 控制台确认应用信息。", 70050: "UserSig 验证次数过于频繁。请检查 UserSig 是否正确，并于1分钟后重新验证。".concat(j_), 70051: "帐号被拉入黑名单。", 70052: "UserSig 已经失效，请重新生成，再次尝试。", 70107: "因安全原因被限制登录，请不要频繁登录。", 70169: "请求的用户帐号不存在。", 70114: "".concat("服务端内部超时，请稍后重试。"), 70202: "".concat("服务端内部超时，请稍后重试。"), 70206: "请求中批量数量不合法。", 70402: "参数非法，请检查必填字段是否填充，或者字段的填充是否满足协议要求。", 70403: "请求失败，需要 App 管理员权限。", 70398: "帐号数超限。如需创建多于100个帐号，请将应用升级为专业版，具体操作指引请参见购买指引(".concat(H_, "269/32458)。"), 70500: "".concat("服务端内部错误，请重试。"), 71e3: "删除帐号失败。仅支持删除体验版帐号，您当前应用为专业版，暂不支持帐号删除。", 20001: "请求包非法。", 20002: "UserSig 或 A2 失效。", 20003: "消息发送方或接收方 UserID 无效或不存在，请检查 UserID 是否已导入即时通信 IM。", 20004: "网络异常，请重试。", 20005: "".concat("服务端内部错误，请重试。"), 20006: "触发发送".concat("单聊消息", "之前回调，App 后台返回禁止下发该消息。"), 20007: "发送".concat("单聊消息", "，被对方拉黑，禁止发送。消息发送状态默认展示为失败，您可以登录控制台修改该场景下的消息发送状态展示结果，具体操作请参见消息保留设置(").concat(H_, "269/38656)。"), 20009: "消息发送双方互相不是好友，禁止发送（配置".concat("单聊消息", "校验好友关系才会出现）。"), 20010: "发送".concat("单聊消息", "，自己不是对方的好友（单向关系），禁止发送。"), 20011: "发送".concat("单聊消息", "，对方不是自己的好友（单向关系），禁止发送。"), 20012: "发送方被禁言，该条消息被禁止发送。", 20016: "消息撤回超过了时间限制（默认2分钟）。", 20018: "删除漫游内部错误。", 90001: "JSON 格式解析失败，请检查请求包是否符合 JSON 规范。", 90002: "".concat("JSON 格式请求包体", "中 MsgBody 不符合消息格式描述，或者 MsgBody 不是 Array 类型，请参考 TIMMsgElement 对象的定义(").concat(H_, "269/2720").concat(Y_, ")。"), 90003: "".concat("JSON 格式请求包体", "中缺少 To_Account 字段或者 To_Account 帐号不存在。"), 90005: "".concat("JSON 格式请求包体", "中缺少 MsgRandom 字段或者 MsgRandom 字段不是 Integer 类型。"), 90006: "".concat("JSON 格式请求包体", "中缺少 MsgTimeStamp 字段或者 MsgTimeStamp 字段不是 Integer 类型。"), 90007: "".concat("JSON 格式请求包体", "中 MsgBody 类型不是 Array 类型，请将其修改为 Array 类型。"), 90008: "".concat("JSON 格式请求包体", "中缺少 From_Account 字段或者 From_Account 帐号不存在。"), 90009: "请求需要 App 管理员权限。", 90010: "".concat("JSON 格式请求包体", "不符合消息格式描述，请参考 TIMMsgElement 对象的定义(").concat(H_, "269/2720").concat(Y_, ")。"), 90011: "批量发消息目标帐号超过500，请减少 To_Account 中目标帐号数量。", 90012: "To_Account 没有注册或不存在，请确认 To_Account 是否导入即时通信 IM 或者是否拼写错误。", 90026: "消息离线存储时间错误（最多不能超过7天）。", 90031: "".concat("JSON 格式请求包体", "中 SyncOtherMachine 字段不是 Integer 类型。"), 90044: "".concat("JSON 格式请求包体", "中 MsgLifeTime 字段不是 Integer 类型。"), 90048: "请求的用户帐号不存在。", 90054: "撤回请求中的 MsgKey 不合法。", 90994: "".concat("服务端内部错误，请重试。"), 90995: "".concat("服务端内部错误，请重试。"), 91e3: "".concat("服务端内部错误，请重试。"), 90992: "".concat("服务端内部错误，请重试。", "如果所有请求都返回该错误码，且 App 配置了第三方回调，请检查 App 服务端是否正常向即时通信 IM 后台服务端返回回调结果。"), 93e3: "JSON 数据包超长，消息包体请不要超过8k。", 91101: "Web 端长轮询被踢（Web 端同时在线实例个数超出限制）。", 10002: "".concat("服务端内部错误，请重试。"), 10003: "请求中的接口名称错误，请核对接口名称并重试。", 10004: "参数非法，请根据错误描述检查请求是否正确。", 10005: "请求包体中携带的帐号数量过多。", 10006: "操作频率限制，请尝试降低调用的频率。", 10007: "操作权限不足，例如 Work ".concat("群组", "中普通成员尝试执行踢人操作，但只有 App 管理员才有权限。"), 10008: "请求非法，可能是请求中携带的签名信息验证不正确，请再次尝试。", 10009: "该群不允许群主主动退出。", 10010: "".concat("群组", "不存在，或者曾经存在过，但是目前已经被解散。"), 10011: "解析 JSON 包体失败，请检查包体的格式是否符合 JSON 格式。", 10012: "发起操作的 UserID 非法，请检查发起操作的用户 UserID 是否填写正确。", 10013: "被邀请加入的用户已经是群成员。", 10014: "群已满员，无法将请求中的用户加入".concat("群组", "，如果是批量加人，可以尝试减少加入用户的数量。"), 10015: "找不到指定 ID 的".concat("群组", "。"), 10016: "App 后台通过第三方回调拒绝本次操作。", 10017: "因被禁言而不能发送消息，请检查发送者是否被设置禁言。", 10018: "应答包长度超过最大包长（1MB），请求的内容过多，请尝试减少单次请求的数据量。", 10019: "请求的用户帐号不存在。", 10021: "".concat("群组", " ID 已被使用，请选择其他的").concat("群组", " ID。"), 10023: "发消息的频率超限，请延长两次发消息时间的间隔。", 10024: "此邀请或者申请请求已经被处理。", 10025: "".concat("群组", " ID 已被使用，并且操作者为群主，可以直接使用。"), 10026: "该 SDKAppID 请求的命令字已被禁用。", 10030: "请求撤回的消息不存在。", 10031: "消息撤回超过了时间限制（默认2分钟）。", 10032: "请求撤回的消息不支持撤回操作。", 10033: "".concat("群组", "类型不支持消息撤回操作。"), 10034: "该消息类型不支持删除操作。", 10035: "直播群和在线成员广播大群不支持删除消息。", 10036: "直播群创建数量超过了限制，请参考价格说明(".concat(H_, "269/11673)购买预付费套餐“IM直播群”。"), 10037: "单个用户可创建和加入的".concat("群组", "数量超过了限制，请参考价格说明(").concat(H_, "269/11673)购买或升级预付费套餐“单人可创建与加入").concat("群组", "数”。"), 10038: "群成员数量超过限制，请参考价格说明(".concat(H_, "269/11673)购买或升级预付费套餐“扩展群人数上限”。"), 10041: "该应用（SDKAppID）已配置不支持群消息撤回。", 10050: "群属性 key 不存在", 10056: "请在写入群属性前先使用 getGroupAttributes 接口更新本地群属性，避免冲突。", 30001: "请求参数错误，请根据错误描述检查请求参数", 30002: "SDKAppID 不匹配", 30003: "请求的用户帐号不存在", 30004: "请求需要 App 管理员权限", 30005: "关系链字段中包含敏感词", 30006: "".concat("服务端内部错误，请重试。"), 30007: "".concat("网络超时，请稍后重试. "), 30008: "并发写导致写冲突，建议使用批量方式", 30009: "后台禁止该用户发起加好友请求", 30010: "自己的好友数已达系统上限", 30011: "分组已达系统上限", 30012: "未决数已达系统上限", 30014: "对方的好友数已达系统上限", 30515: "请求添加好友时，对方在自己的黑名单中，不允许加好友", 30516: "请求添加好友时，对方的加好友验证方式是不允许任何人添加自己为好友", 30525: "请求添加好友时，自己在对方的黑名单中，不允许加好友", 30539: "等待对方同意", 30540: "添加好友请求被安全策略打击，请勿频繁发起添加好友请求", 31704: "与请求删除的帐号之间不存在好友关系", 31707: "删除好友请求被安全策略打击，请勿频繁发起删除好友请求" },W_ = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this)).code = e.code, o.message = z_[e.code] || e.message, o.data = e.data || {}, o;}return n;}(Hn(Error)),J_ = null,X_ = function X_(e) {J_ = e;},Q_ = function Q_(e) {return Promise.resolve(B_(e));},Z_ = function Z_(e) {var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (e instanceof W_) return t && null !== J_ && J_.emit(oo.ERROR, e), Promise.reject(e);if (e instanceof Error) {var n = new W_({ code: fp.UNCAUGHT_ERROR, message: e.message });return t && null !== J_ && J_.emit(oo.ERROR, n), Promise.reject(n);}if (Bi(e) || Bi(e.code) || Bi(e.message)) Gi.error("IMPromise.reject 必须指定code(错误码)和message(错误信息)!!!");else {if (Fi(e.code) && qi(e.message)) {var o = new W_(e);return t && null !== J_ && J_.emit(oo.ERROR, o), Promise.reject(o);}Gi.error("IMPromise.reject code(错误码)必须为数字，message(错误信息)必须为字符串!!!");}},em = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "C2CModule", o;}return Pn(n, [{ key: "onNewC2CMessage", value: function value(e) {var t = e.dataList,n = e.isInstantMessage,o = e.C2CRemainingUnreadList;Gi.debug("".concat(this._className, ".onNewC2CMessage count:").concat(t.length, " isInstantMessage:").concat(n));var r = this._newC2CMessageStoredAndSummary({ dataList: t, C2CRemainingUnreadList: o, isInstantMessage: n }),a = r.conversationOptionsList,s = r.messageList;(this.filterModifiedMessage(s), a.length > 0) && this.getModule(Bc).onNewMessage({ conversationOptionsList: a, isInstantMessage: n });var i = this.filterUnmodifiedMessage(s);n && i.length > 0 && this.emitOuterEvent(oo.MESSAGE_RECEIVED, i), s.length = 0;} }, { key: "_newC2CMessageStoredAndSummary", value: function value(e) {for (var t = e.dataList, n = e.C2CRemainingUnreadList, o = e.isInstantMessage, r = null, a = [], s = [], i = {}, u = this.getModule(zc), c = 0, l = t.length; c < l; c++) {var p = t[c];p.currentUser = this.getMyUserID(), p.conversationType = ro.CONV_C2C, p.isSystemMessage = !!p.isSystemMessage, r = new K_(p), p.elements = u.parseElements(p.elements, p.from), r.setElement(p.elements), r.setNickAndAvatar({ nick: p.nick, avatar: p.avatar });var d = r.conversationID;if (o) {var g = !1,h = this.getModule(Bc);if (r.from !== this.getMyUserID()) {var f = h.getLatestMessageSentByPeer(d);if (f) {var _ = f.nick,m = f.avatar;_ === r.nick && m === r.avatar || (g = !0);}} else {var v = h.getLatestMessageSentByMe(d);if (v) {var M = v.nick,y = v.avatar;M === r.nick && y === r.avatar || h.modifyMessageSentByMe({ conversationID: d, latestNick: r.nick, latestAvatar: r.avatar });}}var I = 1 === t[c].isModified;if (h.isMessageSentByCurrentInstance(r) ? r.isModified = I : I = !1, 0 === p.msgLifeTime) r.setOnlineOnlyFlag(!0), s.push(r);else {if (!h.pushIntoMessageList(s, r, I)) continue;g && (h.modifyMessageSentByPeer(d), h.updateUserProfileSpecifiedKey({ conversationID: d, nick: r.nick, avatar: r.avatar }));}this.getModule(ol).addMessageDelay({ currentTime: Date.now(), time: r.time });}if (0 !== p.msgLifeTime) {if (!1 === r.getOnlineOnlyFlag()) if (Bi(i[d])) i[d] = a.push({ conversationID: d, unreadCount: "out" === r.flow ? 0 : 1, type: r.conversationType, subType: r.conversationSubType, lastMessage: r }) - 1;else {var S = i[d];a[S].type = r.conversationType, a[S].subType = r.conversationSubType, a[S].lastMessage = r, "in" === r.flow && a[S].unreadCount++;}} else r.setOnlineOnlyFlag(!0);}if (Ki(n)) for (var T = function T(e, t) {var o = a.find(function (t) {return t.conversationID === "C2C".concat(n[e].from);});o ? o.unreadCount += n[e].count : a.push({ conversationID: "C2C".concat(n[e].from), unreadCount: n[e].count, type: ro.CONV_C2C, lastMsgTime: n[e].lastMsgTime });}, D = 0, E = n.length; D < E; D++) {T(D);}return { conversationOptionsList: a, messageList: s };} }, { key: "onC2CMessageRevoked", value: function value(e) {var t = this;Gi.debug("".concat(this._className, ".onC2CMessageRevoked count:").concat(e.dataList.length));var n = this.getModule(Bc),o = [],r = null;e.dataList.forEach(function (e) {if (e.c2cMessageRevokedNotify) {var a = e.c2cMessageRevokedNotify.revokedInfos;Bi(a) || a.forEach(function (e) {var a = t.getMyUserID() === e.from ? "".concat(ro.CONV_C2C).concat(e.to) : "".concat(ro.CONV_C2C).concat(e.from);(r = n.revoke(a, e.sequence, e.random)) && o.push(r);});}}), 0 !== o.length && (n.onMessageRevoked(o), this.emitOuterEvent(oo.MESSAGE_REVOKED, o));} }, { key: "onC2CMessageReadReceipt", value: function value(e) {var t = this;e.dataList.forEach(function (e) {if (!Du(e.c2cMessageReadReceipt)) {var n = e.c2cMessageReadReceipt.to;e.c2cMessageReadReceipt.uinPairReadArray.forEach(function (e) {var o = e.peerReadTime;Gi.debug("".concat(t._className, "._onC2CMessageReadReceipt to:").concat(n, " peerReadTime:").concat(o));var r = "".concat(ro.CONV_C2C).concat(n),a = t.getModule(Bc);a.recordPeerReadTime(r, o), a.updateMessageIsPeerReadProperty(r, o);});}});} }, { key: "onC2CMessageReadNotice", value: function value(e) {var t = this;e.dataList.forEach(function (e) {if (!Du(e.c2cMessageReadNotice)) {var n = t.getModule(Bc);e.c2cMessageReadNotice.uinPairReadArray.forEach(function (e) {var o = e.from,r = e.peerReadTime;Gi.debug("".concat(t._className, ".onC2CMessageReadNotice from:").concat(o, " lastReadTime:").concat(r));var a = "".concat(ro.CONV_C2C).concat(o);n.updateIsReadAfterReadReport({ conversationID: a, lastMessageTime: r }), n.updateUnreadCount(a);});}});} }, { key: "sendMessage", value: function value(e, t) {var n = this._createC2CMessagePack(e, t);return this.request(n);} }, { key: "_createC2CMessagePack", value: function value(e, t) {var n = null;t && (t.offlinePushInfo && (n = t.offlinePushInfo), !0 === t.onlineUserOnly && (n ? n.disablePush = !0 : n = { disablePush: !0 }));var o = "";return qi(e.cloudCustomData) && e.cloudCustomData.length > 0 && (o = e.cloudCustomData), { protocolName: ll, tjgID: this.generateTjgID(e), requestData: { fromAccount: this.getMyUserID(), toAccount: e.to, msgTimeStamp: Math.ceil(Date.now() / 1e3), msgBody: e.getElements(), cloudCustomData: o, msgSeq: e.sequence, msgRandom: e.random, msgLifeTime: this.isOnlineMessage(e, t) ? 0 : void 0, nick: e.nick, avatar: e.avatar, offlinePushInfo: n ? { pushFlag: !0 === n.disablePush ? 1 : 0, title: n.title || "", desc: n.description || "", ext: n.extension || "", apnsInfo: { badgeMode: !0 === n.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: n.androidOPPOChannelID || "" } } : void 0 } };} }, { key: "isOnlineMessage", value: function value(e, t) {return !(!t || !0 !== t.onlineUserOnly);} }, { key: "revokeMessage", value: function value(e) {return this.request({ protocolName: ml, requestData: { msgInfo: { fromAccount: e.from, toAccount: e.to, msgSeq: e.sequence, msgRandom: e.random, msgTimeStamp: e.time } } });} }, { key: "deleteMessage", value: function value(e) {var t = e.to,n = e.keyList;return Gi.log("".concat(this._className, ".deleteMessage toAccount:").concat(t, " count:").concat(n.length)), this.request({ protocolName: Il, requestData: { fromAccount: this.getMyUserID(), to: t, keyList: n } });} }, { key: "setMessageRead", value: function value(e) {var t = this,n = e.conversationID,o = e.lastMessageTime,r = "".concat(this._className, ".setMessageRead");Gi.log("".concat(r, " conversationID:").concat(n, " lastMessageTime:").concat(o)), Fi(o) || Gi.warn("".concat(r, " 请勿修改 Conversation.lastMessage.lastTime，否则可能会导致已读上报结果不准确"));var a = new Fd(og);return a.setMessage("conversationID:".concat(n, " lastMessageTime:").concat(o)), this.request({ protocolName: vl, requestData: { C2CMsgReaded: { cookie: "", C2CMsgReadedItem: [{ toAccount: n.replace("C2C", ""), lastMessageTime: o, receipt: 1 }] } } }).then(function () {a.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(r, " ok"));var e = t.getModule(Bc);return e.updateIsReadAfterReadReport({ conversationID: n, lastMessageTime: o }), e.updateUnreadCount(n), B_();}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];a.setError(e, o, r).end();}), Gi.log("".concat(r, " failed. error:"), e), Z_(e);});} }, { key: "getRoamingMessage", value: function value(e) {var t = this,n = "".concat(this._className, ".getRoamingMessage"),o = e.peerAccount,r = e.conversationID,a = e.count,s = e.lastMessageTime,i = e.messageKey,u = "peerAccount:".concat(o, " count:").concat(a || 15, " lastMessageTime:").concat(s || 0, " messageKey:").concat(i);Gi.log("".concat(n, " ").concat(u));var c = new Fd(Zd);return this.request({ protocolName: Ml, requestData: { peerAccount: o, count: a || 15, lastMessageTime: s || 0, messageKey: i } }).then(function (e) {var o = e.data,a = o.complete,s = o.messageList,i = o.messageKey;Bi(s) ? Gi.log("".concat(n, " ok. complete:").concat(a, " but messageList is undefined!")) : Gi.log("".concat(n, " ok. complete:").concat(a, " count:").concat(s.length)), c.setNetworkType(t.getNetworkType()).setMessage("".concat(u, " complete:").concat(a, " length:").concat(s.length)).end();var l = t.getModule(Bc);1 === a && l.setCompleted(r);var p = l.storeRoamingMessage(s, r);l.modifyMessageList(r), l.updateIsRead(r), l.updateRoamingMessageKey(r, i);var d = l.getPeerReadTime(r);if (Gi.log("".concat(n, " update isPeerRead property. conversationID:").concat(r, " peerReadTime:").concat(d)), d) l.updateMessageIsPeerReadProperty(r, d);else {var g = r.replace(ro.CONV_C2C, "");t.getRemotePeerReadTime([g]).then(function () {l.updateMessageIsPeerReadProperty(r, l.getPeerReadTime(r));});}return p;}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];c.setMessage(u).setError(e, o, r).end();}), Gi.warn("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "getRemotePeerReadTime", value: function value(e) {var t = this,n = "".concat(this._className, ".getRemotePeerReadTime");if (Du(e)) return Gi.warn("".concat(n, " userIDList is empty!")), Promise.resolve();var o = new Fd(sg);return Gi.log("".concat(n, " userIDList:").concat(e)), this.request({ protocolName: yl, requestData: { userIDList: e } }).then(function (r) {var a = r.data.peerReadTimeList;Gi.log("".concat(n, " ok. peerReadTimeList:").concat(a));for (var s = "", i = t.getModule(Bc), u = 0; u < e.length; u++) {s += "".concat(e[u], "-").concat(a[u], " "), a[u] > 0 && i.recordPeerReadTime("C2C".concat(e[u]), a[u]);}o.setNetworkType(t.getNetworkType()).setMessage(s).end();}).catch(function (e) {t.probeNetwork().then(function (t) {var n = Wn(t, 2),r = n[0],a = n[1];o.setError(e, r, a).end();}), Gi.warn("".concat(n, " failed. error:"), e);});} }]), n;}(rl),tm = at.findIndex,nm = !0,om = lt("findIndex");"findIndex" in [] && Array(1).findIndex(function () {nm = !1;}), Le({ target: "Array", proto: !0, forced: nm || !om }, { findIndex: function findIndex(e) {return tm(this, e, arguments.length > 1 ? arguments[1] : void 0);} }), Io("findIndex");var rm = [],am = rm.sort,sm = r(function () {rm.sort(void 0);}),im = r(function () {rm.sort(null);}),um = st("sort");Le({ target: "Array", proto: !0, forced: sm || !im || !um }, { sort: function sort(e) {return void 0 === e ? am.call(be(this)) : am.call(be(this), et(e));} });var cm = function () {function e(t) {bn(this, e), this.list = new Map(), this._className = "MessageListHandler", this._latestMessageSentByPeerMap = new Map(), this._latestMessageSentByMeMap = new Map(), this._groupLocalLastMessageSequenceMap = new Map();}return Pn(e, [{ key: "getLocalOldestMessageByConversationID", value: function value(e) {if (!e) return null;if (!this.list.has(e)) return null;var t = this.list.get(e).values();return t ? t.next().value : null;} }, { key: "pushIn", value: function value(e) {var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],n = e.conversationID,o = e.ID,r = !0;this.list.has(n) || this.list.set(n, new Map());var a = this.list.get(n).has(o);if (a) {var s = this.list.get(n).get(o);if (!t || !0 === s.isModified) return r = !1;}return this.list.get(n).set(o, e), this._setLatestMessageSentByPeer(n, e), this._setLatestMessageSentByMe(n, e), this._setGroupLocalLastMessageSequence(n, e), r;} }, { key: "unshift", value: function value(e) {var t;if (Ki(e)) {if (e.length > 0) {t = e[0].conversationID;var n = e.length;this._unshiftMultipleMessages(e), this._setGroupLocalLastMessageSequence(t, e[n - 1]);}} else t = e.conversationID, this._unshiftSingleMessage(e), this._setGroupLocalLastMessageSequence(t, e);if (t && t.startsWith(ro.CONV_C2C)) {var o = Array.from(this.list.get(t).values()),r = o.length;if (0 === r) return;for (var a = r - 1; a >= 0; a--) {if ("out" === o[a].flow) {this._setLatestMessageSentByMe(t, o[a]);break;}}for (var s = r - 1; s >= 0; s--) {if ("in" === o[s].flow) {this._setLatestMessageSentByPeer(t, o[s]);break;}}}} }, { key: "_unshiftSingleMessage", value: function value(e) {var t = e.conversationID,n = e.ID;if (!this.list.has(t)) return this.list.set(t, new Map()), void this.list.get(t).set(n, e);var o = Array.from(this.list.get(t));o.unshift([n, e]), this.list.set(t, new Map(o));} }, { key: "_unshiftMultipleMessages", value: function value(e) {for (var t = e.length, n = [], o = e[0].conversationID, r = this.list.has(o) ? Array.from(this.list.get(o)) : [], a = 0; a < t; a++) {n.push([e[a].ID, e[a]]);}this.list.set(o, new Map(n.concat(r)));} }, { key: "remove", value: function value(e) {var t = e.conversationID,n = e.ID;this.list.has(t) && this.list.get(t).delete(n);} }, { key: "revoke", value: function value(e, t, n) {if (Gi.debug("revoke message", e, t, n), this.list.has(e)) {var o,r = no(this.list.get(e));try {for (r.s(); !(o = r.n()).done;) {var a = Wn(o.value, 2)[1];if (a.sequence === t && !a.isRevoked && (Bi(n) || a.random === n)) return a.isRevoked = !0, a;}} catch (s) {r.e(s);} finally {r.f();}}return null;} }, { key: "removeByConversationID", value: function value(e) {this.list.has(e) && (this.list.delete(e), this._latestMessageSentByPeerMap.delete(e), this._latestMessageSentByMeMap.delete(e));} }, { key: "updateMessageIsPeerReadProperty", value: function value(e, t) {var n = [];if (this.list.has(e)) {var o,r = no(this.list.get(e));try {for (r.s(); !(o = r.n()).done;) {var a = Wn(o.value, 2)[1];a.time <= t && !a.isPeerRead && "out" === a.flow && (a.isPeerRead = !0, n.push(a));}} catch (s) {r.e(s);} finally {r.f();}Gi.log("".concat(this._className, ".updateMessageIsPeerReadProperty conversationID:").concat(e, " peerReadTime:").concat(t, " count:").concat(n.length));}return n;} }, { key: "updateMessageIsModifiedProperty", value: function value(e) {var t = e.conversationID,n = e.ID;if (this.list.has(t)) {var o = this.list.get(t).get(n);o && (o.isModified = !0);}} }, { key: "hasLocalMessageList", value: function value(e) {return this.list.has(e);} }, { key: "getLocalMessageList", value: function value(e) {return this.hasLocalMessageList(e) ? Jn(this.list.get(e).values()) : [];} }, { key: "hasLocalMessage", value: function value(e, t) {return !!this.hasLocalMessageList(e) && this.list.get(e).has(t);} }, { key: "getLocalMessage", value: function value(e, t) {return this.hasLocalMessage(e, t) ? this.list.get(e).get(t) : null;} }, { key: "_setLatestMessageSentByPeer", value: function value(e, t) {e.startsWith(ro.CONV_C2C) && "in" === t.flow && this._latestMessageSentByPeerMap.set(e, t);} }, { key: "_setLatestMessageSentByMe", value: function value(e, t) {e.startsWith(ro.CONV_C2C) && "out" === t.flow && this._latestMessageSentByMeMap.set(e, t);} }, { key: "_setGroupLocalLastMessageSequence", value: function value(e, t) {e.startsWith(ro.CONV_GROUP) && this._groupLocalLastMessageSequenceMap.set(e, t.sequence);} }, { key: "getLatestMessageSentByPeer", value: function value(e) {return this._latestMessageSentByPeerMap.get(e);} }, { key: "getLatestMessageSentByMe", value: function value(e) {return this._latestMessageSentByMeMap.get(e);} }, { key: "getGroupLocalLastMessageSequence", value: function value(e) {return this._groupLocalLastMessageSequenceMap.get(e) || 0;} }, { key: "modifyMessageSentByPeer", value: function value(e, t) {var n = this.list.get(e);if (!Du(n)) {var o = Array.from(n.values()),r = o.length;if (0 !== r) {var a = null,s = null;t && (s = t);for (var i = 0, u = !1, c = r - 1; c >= 0; c--) {"in" === o[c].flow && (null === s ? s = o[c] : ((a = o[c]).nick !== s.nick && (a.setNickAndAvatar({ nick: s.nick }), u = !0), a.avatar !== s.avatar && (a.setNickAndAvatar({ avatar: s.avatar }), u = !0), u && (i += 1)));}Gi.log("".concat(this._className, ".modifyMessageSentByPeer conversationID:").concat(e, " count:").concat(i));}}} }, { key: "modifyMessageSentByMe", value: function value(e) {var t = e.conversationID,n = e.latestNick,o = e.latestAvatar,r = this.list.get(t);if (!Du(r)) {var a = Array.from(r.values()),s = a.length;if (0 !== s) {for (var i = null, u = 0, c = !1, l = s - 1; l >= 0; l--) {"out" === a[l].flow && ((i = a[l]).nick !== n && (i.setNickAndAvatar({ nick: n }), c = !0), i.avatar !== o && (i.setNickAndAvatar({ avatar: o }), c = !0), c && (u += 1));}Gi.log("".concat(this._className, ".modifyMessageSentByMe conversationID:").concat(t, " count:").concat(u));}}} }, { key: "traversal", value: function value() {if (0 !== this.list.size && -1 === Gi.getLevel()) {console.group("conversationID-messageCount");var e,t = no(this.list);try {for (t.s(); !(e = t.n()).done;) {var n = Wn(e.value, 2),o = n[0],r = n[1];console.log("".concat(o, "-").concat(r.size));}} catch (a) {t.e(a);} finally {t.f();}console.groupEnd();}} }, { key: "reset", value: function value() {this.list.clear(), this._latestMessageSentByPeerMap.clear(), this._latestMessageSentByMeMap.clear(), this._groupLocalLastMessageSequenceMap.clear();} }]), e;}(),lm = { CONTEXT_A2KEY_AND_TINYID_UPDATED: "_a2KeyAndTinyIDUpdated", CLOUD_CONFIG_UPDATED: "_cloudConfigUpdated" };function pm(e) {this.mixin(e);}pm.mixin = function (e) {var t = e.prototype || e;t._isReady = !1, t.ready = function (e) {var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (e) return this._isReady ? void (t ? e.call(this) : setTimeout(e, 1)) : (this._readyQueue = this._readyQueue || [], void this._readyQueue.push(e));}, t.triggerReady = function () {var e = this;this._isReady = !0, setTimeout(function () {var t = e._readyQueue;e._readyQueue = [], t && t.length > 0 && t.forEach(function (e) {e.call(this);}, e);}, 1);}, t.resetReady = function () {this._isReady = !1, this._readyQueue = [];}, t.isReady = function () {return this._isReady;};};var dm = ["jpg", "jpeg", "gif", "png", "bmp"],gm = ["mp4"],hm = 1,fm = 2,_m = 3,mm = 255,vm = function () {function e(t) {var n = this;bn(this, e), Du(t) || (this.userID = t.userID || "", this.nick = t.nick || "", this.gender = t.gender || "", this.birthday = t.birthday || 0, this.location = t.location || "", this.selfSignature = t.selfSignature || "", this.allowType = t.allowType || ro.ALLOW_TYPE_ALLOW_ANY, this.language = t.language || 0, this.avatar = t.avatar || "", this.messageSettings = t.messageSettings || 0, this.adminForbidType = t.adminForbidType || ro.FORBID_TYPE_NONE, this.level = t.level || 0, this.role = t.role || 0, this.lastUpdatedTime = 0, this.profileCustomField = [], Du(t.profileCustomField) || t.profileCustomField.forEach(function (e) {n.profileCustomField.push({ key: e.key, value: e.value });}));}return Pn(e, [{ key: "validate", value: function value(e) {var t = !0,n = "";if (Du(e)) return { valid: !1, tips: "empty options" };if (e.profileCustomField) for (var o = e.profileCustomField.length, r = null, a = 0; a < o; a++) {if (r = e.profileCustomField[a], !qi(r.key) || -1 === r.key.indexOf("Tag_Profile_Custom")) return { valid: !1, tips: "自定义资料字段的前缀必须是 Tag_Profile_Custom" };if (!qi(r.value)) return { valid: !1, tips: "自定义资料字段的 value 必须是字符串" };}for (var s in e) {if (Object.prototype.hasOwnProperty.call(e, s)) {if ("profileCustomField" === s) continue;if (Du(e[s]) && !qi(e[s]) && !Fi(e[s])) {n = "key:" + s + ", invalid value:" + e[s], t = !1;continue;}switch (s) {case "nick":qi(e[s]) || (n = "nick should be a string", t = !1), Zi(e[s]) > 500 && (n = "nick name limited: must less than or equal to ".concat(500, " bytes, current size: ").concat(Zi(e[s]), " bytes"), t = !1);break;case "gender":ou(m_, e.gender) || (n = "key:gender, invalid value:" + e.gender, t = !1);break;case "birthday":Fi(e.birthday) || (n = "birthday should be a number", t = !1);break;case "location":qi(e.location) || (n = "location should be a string", t = !1);break;case "selfSignature":qi(e.selfSignature) || (n = "selfSignature should be a string", t = !1);break;case "allowType":ou(M_, e.allowType) || (n = "key:allowType, invalid value:" + e.allowType, t = !1);break;case "language":Fi(e.language) || (n = "language should be a number", t = !1);break;case "avatar":qi(e.avatar) || (n = "avatar should be a string", t = !1);break;case "messageSettings":0 !== e.messageSettings && 1 !== e.messageSettings && (n = "messageSettings should be 0 or 1", t = !1);break;case "adminForbidType":ou(v_, e.adminForbidType) || (n = "key:adminForbidType, invalid value:" + e.adminForbidType, t = !1);break;case "level":Fi(e.level) || (n = "level should be a number", t = !1);break;case "role":Fi(e.role) || (n = "role should be a number", t = !1);break;default:n = "unknown key:" + s + "  " + e[s], t = !1;}}}return { valid: t, tips: n };} }]), e;}(),Mm = function e(t) {bn(this, e), this.value = t, this.next = null;},ym = function () {function e(t) {bn(this, e), this.MAX_LENGTH = t, this.pTail = null, this.pNodeToDel = null, this.map = new Map(), Gi.debug("SinglyLinkedList init MAX_LENGTH:".concat(this.MAX_LENGTH));}return Pn(e, [{ key: "set", value: function value(e) {var t = new Mm(e);if (this.map.size < this.MAX_LENGTH) null === this.pTail ? (this.pTail = t, this.pNodeToDel = t) : (this.pTail.next = t, this.pTail = t), this.map.set(e, 1);else {var n = this.pNodeToDel;this.pNodeToDel = this.pNodeToDel.next, this.map.delete(n.value), n.next = null, n = null, this.pTail.next = t, this.pTail = t, this.map.set(e, 1);}} }, { key: "has", value: function value(e) {return this.map.has(e);} }, { key: "delete", value: function value(e) {this.has(e) && this.map.delete(e);} }, { key: "tail", value: function value() {return this.pTail;} }, { key: "size", value: function value() {return this.map.size;} }, { key: "data", value: function value() {return Array.from(this.map.keys());} }, { key: "reset", value: function value() {for (var e; null !== this.pNodeToDel;) {e = this.pNodeToDel, this.pNodeToDel = this.pNodeToDel.next, e.next = null, e = null;}this.pTail = null, this.map.clear();} }]), e;}(),Im = ["groupID", "name", "avatar", "type", "introduction", "notification", "ownerID", "selfInfo", "createTime", "infoSequence", "lastInfoTime", "lastMessage", "nextMessageSeq", "memberNum", "maxMemberNum", "memberList", "joinOption", "groupCustomField", "muteAllMembers"],Sm = function () {function e(t) {bn(this, e), this.groupID = "", this.name = "", this.avatar = "", this.type = "", this.introduction = "", this.notification = "", this.ownerID = "", this.createTime = "", this.infoSequence = "", this.lastInfoTime = "", this.selfInfo = { messageRemindType: "", joinTime: "", nameCard: "", role: "" }, this.lastMessage = { lastTime: "", lastSequence: "", fromAccount: "", messageForShow: "" }, this.nextMessageSeq = "", this.memberNum = "", this.memberCount = "", this.maxMemberNum = "", this.maxMemberCount = "", this.joinOption = "", this.groupCustomField = [], this.muteAllMembers = void 0, this._initGroup(t);}return Pn(e, [{ key: "_initGroup", value: function value(e) {for (var t in e) {Im.indexOf(t) < 0 || ("selfInfo" !== t ? ("memberNum" === t && (this.memberCount = e[t]), "maxMemberNum" === t && (this.maxMemberCount = e[t]), this[t] = e[t]) : this.updateSelfInfo(e[t]));}} }, { key: "updateGroup", value: function value(e) {var t = JSON.parse(JSON.stringify(e));t.lastMsgTime && (this.lastMessage.lastTime = t.lastMsgTime), Bi(t.muteAllMembers) || ("On" === t.muteAllMembers ? t.muteAllMembers = !0 : t.muteAllMembers = !1), t.groupCustomField && uu(this.groupCustomField, t.groupCustomField), Bi(t.memberNum) || (this.memberCount = t.memberNum), Bi(t.maxMemberNum) || (this.maxMemberCount = t.maxMemberNum), Xi(this, t, ["members", "errorCode", "lastMsgTime", "groupCustomField", "memberNum", "maxMemberNum"]);} }, { key: "updateSelfInfo", value: function value(e) {var t = e.nameCard,n = e.joinTime,o = e.role,r = e.messageRemindType;Xi(this.selfInfo, { nameCard: t, joinTime: n, role: o, messageRemindType: r }, [], ["", null, void 0, 0, NaN]);} }, { key: "setSelfNameCard", value: function value(e) {this.selfInfo.nameCard = e;} }, { key: "memberNum", set: function set(e) {}, get: function get() {return Gi.warn("！！！v2.8.0起弃用memberNum，请使用 memberCount"), this.memberCount;} }, { key: "maxMemberNum", set: function set(e) {}, get: function get() {return Gi.warn("！！！v2.8.0起弃用maxMemberNum，请使用 maxMemberCount"), this.maxMemberCount;} }]), e;}(),Tm = function Tm(e, t) {if (Bi(t)) return "";switch (e) {case ro.MSG_TEXT:return t.text;case ro.MSG_IMAGE:return "[图片]";case ro.MSG_GEO:return "[位置]";case ro.MSG_AUDIO:return "[语音]";case ro.MSG_VIDEO:return "[视频]";case ro.MSG_FILE:return "[文件]";case ro.MSG_CUSTOM:return "[自定义消息]";case ro.MSG_GRP_TIP:return "[群提示消息]";case ro.MSG_GRP_SYS_NOTICE:return "[群系统通知]";case ro.MSG_FACE:return "[动画表情]";case ro.MSG_MERGER:return "[聊天记录]";default:return "";}},Dm = function Dm(e) {return Bi(e) ? { lastTime: 0, lastSequence: 0, fromAccount: 0, messageForShow: "", payload: null, type: "", isRevoked: !1, cloudCustomData: "", onlineOnlyFlag: !1 } : e instanceof K_ ? { lastTime: e.time || 0, lastSequence: e.sequence || 0, fromAccount: e.from || "", messageForShow: Tm(e.type, e.payload), payload: e.payload || null, type: e.type || null, isRevoked: e.isRevoked || !1, cloudCustomData: e.cloudCustomData || "", onlineOnlyFlag: !!ji(e.getOnlineOnlyFlag) && e.getOnlineOnlyFlag() } : Fn({}, e, { messageForShow: Tm(e.type, e.payload) });},Em = function () {function e(t) {bn(this, e), this.conversationID = t.conversationID || "", this.unreadCount = t.unreadCount || 0, this.type = t.type || "", this.lastMessage = Dm(t.lastMessage), t.lastMsgTime && (this.lastMessage.lastTime = t.lastMsgTime), this._isInfoCompleted = !1, this.peerReadTime = t.peerReadTime || 0, this.groupAtInfoList = [], this.remark = "", this.isPinned = t.isPinned || !1, this._initProfile(t);}return Pn(e, [{ key: "_initProfile", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "userProfile":t.userProfile = e.userProfile;break;case "groupProfile":t.groupProfile = e.groupProfile;}}), Bi(this.userProfile) && this.type === ro.CONV_C2C ? this.userProfile = new vm({ userID: e.conversationID.replace("C2C", "") }) : Bi(this.groupProfile) && this.type === ro.CONV_GROUP && (this.groupProfile = new Sm({ groupID: e.conversationID.replace("GROUP", "") }));} }, { key: "updateUnreadCount", value: function value(e, t) {Bi(e) || (lu(this.subType) ? this.unreadCount = 0 : t && this.type === ro.CONV_GROUP ? this.unreadCount = e : this.unreadCount = this.unreadCount + e);} }, { key: "updateLastMessage", value: function value(e) {this.lastMessage = Dm(e);} }, { key: "updateGroupAtInfoList", value: function value(e) {var t,n = (Xn(t = e.groupAtType) || Qn(t) || Zn(t) || to()).slice(0);-1 !== n.indexOf(ro.CONV_AT_ME) && -1 !== n.indexOf(ro.CONV_AT_ALL) && (n = [ro.CONV_AT_ALL_AT_ME]);var o = { from: e.from, groupID: e.groupID, messageSequence: e.sequence, atTypeArray: n, __random: e.__random, __sequence: e.__sequence };this.groupAtInfoList.push(o), Gi.debug("Conversation.updateGroupAtInfoList conversationID:".concat(this.conversationID), this.groupAtInfoList);} }, { key: "clearGroupAtInfoList", value: function value() {this.groupAtInfoList.length = 0;} }, { key: "reduceUnreadCount", value: function value() {this.unreadCount >= 1 && (this.unreadCount -= 1);} }, { key: "isLastMessageRevoked", value: function value(e) {var t = e.sequence,n = e.time;return this.type === ro.CONV_C2C && t === this.lastMessage.lastSequence && n === this.lastMessage.lastTime || this.type === ro.CONV_GROUP && t === this.lastMessage.lastSequence;} }, { key: "setLastMessageRevoked", value: function value(e) {this.lastMessage.isRevoked = e;} }, { key: "toAccount", get: function get() {return this.conversationID.startsWith(ro.CONV_C2C) ? this.conversationID.replace(ro.CONV_C2C, "") : this.conversationID.startsWith(ro.CONV_GROUP) ? this.conversationID.replace(ro.CONV_GROUP, "") : "";} }, { key: "subType", get: function get() {return this.groupProfile ? this.groupProfile.type : "";} }]), e;}(),Cm = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "ConversationModule", pm.mixin($n(o)), o._messageListHandler = new cm(), o.singlyLinkedList = new ym(100), o._pagingStatus = Mc.NOT_START, o._pagingTimeStamp = 0, o._pagingStartIndex = 0, o._pagingPinnedTimeStamp = 0, o._pagingPinnedStartIndex = 0, o._conversationMap = new Map(), o._tmpGroupList = [], o._tmpGroupAtTipsList = [], o._peerReadTimeMap = new Map(), o._completedMap = new Map(), o._roamingMessageKeyMap = new Map(), o._initListeners(), o;}return Pn(n, [{ key: "_initListeners", value: function value() {this.getInnerEmitterInstance().on(lm.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._initLocalConversationList, this);} }, { key: "onCheckTimer", value: function value(e) {e % 60 == 0 && this._messageListHandler.traversal();} }, { key: "_initLocalConversationList", value: function value() {var e = this,t = new Fd(fg);Gi.log("".concat(this._className, "._initLocalConversationList."));var n = "",o = this._getStorageConversationList();if (o) {for (var r = o.length, a = 0; a < r; a++) {var s = o[a];if (s && s.groupProfile) {var i = s.groupProfile.type;if (lu(i)) continue;}this._conversationMap.set(o[a].conversationID, new Em(o[a]));}this._emitConversationUpdate(!0, !1), n = "count:".concat(r);} else n = "count:0";t.setNetworkType(this.getNetworkType()).setMessage(n).end(), this.getModule(qc) || this.triggerReady(), this.ready(function () {e._tmpGroupList.length > 0 && (e.updateConversationGroupProfile(e._tmpGroupList), e._tmpGroupList.length = 0);}), this._syncConversationList();} }, { key: "onMessageSent", value: function value(e) {this._onSendOrReceiveMessage(e.conversationOptionsList, !0);} }, { key: "onNewMessage", value: function value(e) {this._onSendOrReceiveMessage(e.conversationOptionsList, e.isInstantMessage);} }, { key: "_onSendOrReceiveMessage", value: function value(e) {var t = this,n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];this._isReady ? 0 !== e.length && (this._getC2CPeerReadTime(e), this._updateLocalConversationList(e, !1, n), this._setStorageConversationList(), this._emitConversationUpdate()) : this.ready(function () {t._onSendOrReceiveMessage(e, n);});} }, { key: "updateConversationGroupProfile", value: function value(e) {var t = this;Ki(e) && 0 === e.length || (0 !== this._conversationMap.size ? (e.forEach(function (e) {var n = "GROUP".concat(e.groupID);if (t._conversationMap.has(n)) {var o = t._conversationMap.get(n);o.groupProfile = e, o.lastMessage.lastSequence < e.nextMessageSeq && (o.lastMessage.lastSequence = e.nextMessageSeq - 1), o.subType || (o.subType = e.type);}}), this._emitConversationUpdate(!0, !1)) : this._tmpGroupList = e);} }, { key: "_updateConversationUserProfile", value: function value(e) {var t = this;e.data.forEach(function (e) {var n = "C2C".concat(e.userID);t._conversationMap.has(n) && (t._conversationMap.get(n).userProfile = e);}), this._emitConversationUpdate(!0, !1);} }, { key: "onMessageRevoked", value: function value(e) {var t = this;if (0 !== e.length) {var n = null,o = !1;e.forEach(function (e) {(n = t._conversationMap.get(e.conversationID)) && n.isLastMessageRevoked(e) && (o = !0, n.setLastMessageRevoked(!0));}), o && this._emitConversationUpdate(!0, !1);}} }, { key: "onMessageDeleted", value: function value(e) {if (0 !== e.length) {e.forEach(function (e) {e.isDeleted = !0;});for (var t = e[0].conversationID, n = this._messageListHandler.getLocalMessageList(t), o = {}, r = n.length - 1; r > 0; r--) {if (!n[r].isDeleted) {o = n[r];break;}}var a = this._conversationMap.get(t);if (a) {var s = !1;a.lastMessage.lastSequence !== o.sequence && a.lastMessage.lastTime !== o.time && (a.updateLastMessage(o), s = !0, Gi.log("".concat(this._className, ".onMessageDeleted. update conversationID:").concat(t, " with lastMessage:"), a.lastMessage)), t.startsWith(ro.CONV_C2C) && this.updateUnreadCount(t), s && this._emitConversationUpdate(!0, !1);}}} }, { key: "onNewGroupAtTips", value: function value(e) {var t = this,n = e.dataList,o = null;n.forEach(function (e) {e.groupAtTips ? o = e.groupAtTips : e.elements && (o = e.elements), o.__random = e.random, o.__sequence = e.clientSequence, t._tmpGroupAtTipsList.push(o);}), Gi.debug("".concat(this._className, ".onNewGroupAtTips isReady:").concat(this._isReady), this._tmpGroupAtTipsList), this._isReady && this._handleGroupAtTipsList();} }, { key: "_handleGroupAtTipsList", value: function value() {var e = this;if (0 !== this._tmpGroupAtTipsList.length) {var t = !1;this._tmpGroupAtTipsList.forEach(function (n) {var o = n.groupID;if (n.from !== e.getMyUserID()) {var r = e._conversationMap.get("".concat(ro.CONV_GROUP).concat(o));r && (r.updateGroupAtInfoList(n), t = !0);}}), t && this._emitConversationUpdate(!0, !1), this._tmpGroupAtTipsList.length = 0;}} }, { key: "_getC2CPeerReadTime", value: function value(e) {var t = this,n = [];if (e.forEach(function (e) {t._conversationMap.has(e.conversationID) || e.type !== ro.CONV_C2C || n.push(e.conversationID.replace(ro.CONV_C2C, ""));}), n.length > 0) {Gi.debug("".concat(this._className, "._getC2CPeerReadTime userIDList:").concat(n));var o = this.getModule(qc);o && o.getRemotePeerReadTime(n);}} }, { key: "_getStorageConversationList", value: function value() {return this.getModule(jc).getItem("conversationMap");} }, { key: "_setStorageConversationList", value: function value() {var e = this.getLocalConversationList().slice(0, 20).map(function (e) {return { conversationID: e.conversationID, type: e.type, subType: e.subType, lastMessage: e.lastMessage, groupProfile: e.groupProfile, userProfile: e.userProfile };});this.getModule(jc).setItem("conversationMap", e);} }, { key: "_emitConversationUpdate", value: function value() {var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],n = Jn(this._conversationMap.values());if (t) {var o = this.getModule(xc);o && o.updateGroupLastMessage(n);}e && this.emitOuterEvent(oo.CONVERSATION_LIST_UPDATED, n);} }, { key: "getLocalConversationList", value: function value() {return Jn(this._conversationMap.values());} }, { key: "getLocalConversation", value: function value(e) {return this._conversationMap.get(e);} }, { key: "_syncConversationList", value: function value() {var e = this,t = new Fd(_g);return this._pagingStatus === Mc.NOT_START && this._conversationMap.clear(), this._pagingGetConversationList().then(function (n) {return e._pagingStatus = Mc.RESOLVED, e._setStorageConversationList(), e._handleC2CPeerReadTime(), e.checkAndPatchRemark(), t.setMessage(e._conversationMap.size).setNetworkType(e.getNetworkType()).end(), n;}).catch(function (n) {return e._pagingStatus = Mc.REJECTED, t.setMessage(e._pagingTimeStamp), e.probeNetwork().then(function (e) {var o = Wn(e, 2),r = o[0],a = o[1];t.setError(n, r, a).end();}), Z_(n);});} }, { key: "_pagingGetConversationList", value: function value() {var e = this,t = "".concat(this._className, "._pagingGetConversationList");return Gi.log("".concat(t, " timeStamp:").concat(this._pagingTimeStamp, " startIndex:").concat(this._pagingStartIndex) + " pinnedTimeStamp:".concat(this._pagingPinnedTimeStamp, " pinnedStartIndex:").concat(this._pagingPinnedStartIndex)), this._pagingStatus = Mc.PENDING, this.request({ protocolName: Sl, requestData: { fromAccount: this.getMyUserID(), timeStamp: this._pagingTimeStamp, startIndex: this._pagingStartIndex, pinnedTimeStamp: this._pagingPinnedTimeStamp, pinnedStartIndex: this._pagingStartIndex, orderType: 1 } }).then(function (n) {var o = n.data,r = o.completeFlag,a = o.conversations,s = void 0 === a ? [] : a,i = o.timeStamp,u = o.startIndex,c = o.pinnedTimeStamp,l = o.pinnedStartIndex;if (Gi.log("".concat(t, " ok. completeFlag:").concat(r, " count:").concat(s.length)), s.length > 0) {var p = e._getConversationOptions(s);e._updateLocalConversationList(p, !0);}if (e._isReady) e._emitConversationUpdate();else {if (!e.isLoggedIn()) return Q_();e.triggerReady();}return e._pagingTimeStamp = i, e._pagingStartIndex = u, e._pagingPinnedTimeStamp = c, e._pagingPinnedStartIndex = l, 1 !== r ? e._pagingGetConversationList() : (e._handleGroupAtTipsList(), Q_());}).catch(function (n) {throw e.isLoggedIn() && (e._isReady || (Gi.warn("".concat(t, " failed. error:"), n), e.triggerReady())), n;});} }, { key: "_updateLocalConversationList", value: function value(e, t, n) {var o,r = Date.now();o = this._getTmpConversationListMapping(e, t, n), this._conversationMap = new Map(this._sortConversationList([].concat(Jn(o.toBeUpdatedConversationList), Jn(this._conversationMap)))), t || this._updateUserOrGroupProfile(o.newConversationList), Gi.debug("".concat(this._className, "._updateLocalConversationList cost ").concat(Date.now() - r, " ms"));} }, { key: "_getTmpConversationListMapping", value: function value(e, t, n) {for (var o = [], r = [], a = this.getModule(xc), s = this.getModule(Vc), i = 0, u = e.length; i < u; i++) {var c = new Em(e[i]),l = c.conversationID;if (this._conversationMap.has(l)) {var p = this._conversationMap.get(l),d = ["unreadCount", "allowType", "adminForbidType", "payload", "isPinned"];n || d.push("lastMessage"), Xi(p, c, d, [null, void 0, "", 0, NaN]), p.updateUnreadCount(c.unreadCount, t), n && (p.lastMessage.payload = e[i].lastMessage.payload), e[i].lastMessage && p.lastMessage.cloudCustomData !== e[i].lastMessage.cloudCustomData && (p.lastMessage.cloudCustomData = e[i].lastMessage.cloudCustomData || ""), this._conversationMap.delete(l), o.push([l, p]);} else {if (c.type === ro.CONV_GROUP && a) {var g = c.groupProfile.groupID,h = a.getLocalGroupProfile(g);h && (c.groupProfile = h, c.updateUnreadCount(0));} else if (c.type === ro.CONV_C2C) {var f = l.replace(ro.CONV_C2C, "");s && s.isMyFriend(f) && (c.remark = s.getFriendRemark(f));}r.push(c), o.push([l, c]);}}return { toBeUpdatedConversationList: o, newConversationList: r };} }, { key: "_sortConversationList", value: function value(e) {var t = [],n = [];return e.forEach(function (e) {!0 === e[1].isPinned ? t.push(e) : n.push(e);}), t.sort(function (e, t) {return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime;}).concat(n.sort(function (e, t) {return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime;}));} }, { key: "_sortConversationListAndEmitEvent", value: function value() {this._conversationMap = new Map(this._sortConversationList(Jn(this._conversationMap))), this._emitConversationUpdate(!0, !1);} }, { key: "_updateUserOrGroupProfile", value: function value(e) {var t = this;if (0 !== e.length) {var n = [],o = [],r = this.getModule(Fc),a = this.getModule(xc);e.forEach(function (e) {if (e.type === ro.CONV_C2C) n.push(e.toAccount);else if (e.type === ro.CONV_GROUP) {var t = e.toAccount;a.hasLocalGroup(t) ? e.groupProfile = a.getLocalGroupProfile(t) : o.push(t);}}), Gi.log("".concat(this._className, "._updateUserOrGroupProfile c2cUserIDList:").concat(n, " groupIDList:").concat(o)), n.length > 0 && r.getUserProfile({ userIDList: n }).then(function (e) {var n = e.data;Ki(n) ? n.forEach(function (e) {t._conversationMap.get("C2C".concat(e.userID)).userProfile = e;}) : t._conversationMap.get("C2C".concat(n.userID)).userProfile = n;}), o.length > 0 && a.getGroupProfileAdvance({ groupIDList: o, responseFilter: { groupBaseInfoFilter: ["Type", "Name", "FaceUrl"] } }).then(function (e) {e.data.successGroupList.forEach(function (e) {var n = "GROUP".concat(e.groupID);if (t._conversationMap.has(n)) {var o = t._conversationMap.get(n);Xi(o.groupProfile, e, [], [null, void 0, "", 0, NaN]), !o.subType && e.type && (o.subType = e.type);}});});}} }, { key: "_getConversationOptions", value: function value(e) {var t = [],n = e.filter(function (e) {var t = e.lastMsg;return Vi(t);}).map(function (e) {if (1 === e.type) {var n = { userID: e.userID, nick: e.c2CNick, avatar: e.c2CImage };return t.push(n), { conversationID: "C2C".concat(e.userID), type: "C2C", lastMessage: { lastTime: e.time, lastSequence: e.sequence, fromAccount: e.lastC2CMsgFromAccount, messageForShow: e.messageShow, type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null, payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null, cloudCustomData: e.cloudCustomData || "", isRevoked: 8 === e.lastMessageFlag, onlineOnlyFlag: !1 }, userProfile: new vm(n), peerReadTime: e.c2cPeerReadTime, isPinned: 1 === e.isPinned };}return { conversationID: "GROUP".concat(e.groupID), type: "GROUP", lastMessage: { lastTime: e.time, lastSequence: e.messageReadSeq + e.unreadCount, fromAccount: e.msgGroupFromAccount, messageForShow: e.messageShow, type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null, payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null, cloudCustomData: e.cloudCustomData || "", isRevoked: 2 === e.lastMessageFlag, onlineOnlyFlag: !1 }, groupProfile: new Sm({ groupID: e.groupID, name: e.groupNick, avatar: e.groupImage }), unreadCount: e.unreadCount, peerReadTime: 0, isPinned: 1 === e.isPinned };});t.length > 0 && this.getModule(Fc).onConversationsProfileUpdated(t);return n;} }, { key: "getLocalMessageList", value: function value(e) {return this._messageListHandler.getLocalMessageList(e);} }, { key: "deleteLocalMessage", value: function value(e) {e instanceof K_ && this._messageListHandler.remove(e);} }, { key: "onConversationDeleted", value: function value(e) {var t = this;Gi.log("".concat(this._className, ".onConversationDeleted")), Ki(e) && e.forEach(function (e) {var n = e.type,o = e.userID,r = e.groupID,a = "";1 === n ? a = "".concat(ro.CONV_C2C).concat(o) : 2 === n && (a = "".concat(ro.CONV_GROUP).concat(r)), t.deleteLocalConversation(a);});} }, { key: "onConversationPinned", value: function value(e) {var t = this;if (Ki(e)) {var n = !1;e.forEach(function (e) {var o,r = e.type,a = e.userID,s = e.groupID;1 === r ? o = t.getLocalConversation("".concat(ro.CONV_C2C).concat(a)) : 2 === r && (o = t.getLocalConversation("".concat(ro.CONV_GROUP).concat(s))), o && (Gi.log("".concat(t._className, ".onConversationPinned conversationID:").concat(o.conversationID, " isPinned:").concat(o.isPinned)), o.isPinned || (o.isPinned = !0, n = !0));}), n && this._sortConversationListAndEmitEvent();}} }, { key: "onConversationUnpinned", value: function value(e) {var t = this;if (Ki(e)) {var n = !1;e.forEach(function (e) {var o,r = e.type,a = e.userID,s = e.groupID;1 === r ? o = t.getLocalConversation("".concat(ro.CONV_C2C).concat(a)) : 2 === r && (o = t.getLocalConversation("".concat(ro.CONV_GROUP).concat(s))), o && (Gi.log("".concat(t._className, ".onConversationUnpinned conversationID:").concat(o.conversationID, " isPinned:").concat(o.isPinned)), o.isPinned && (o.isPinned = !1, n = !0));}), n && this._sortConversationListAndEmitEvent();}} }, { key: "getMessageList", value: function value(e) {var t = this,n = e.conversationID,o = e.nextReqMessageID,r = e.count,a = "".concat(this._className, ".getMessageList"),s = this.getLocalConversation(n),i = "";if (s && s.groupProfile && (i = s.groupProfile.type), lu(i)) return Gi.log("".concat(a, " not available in avchatroom. conversationID:").concat(n)), Q_({ messageList: [], nextReqMessageID: "", isCompleted: !0 });(Bi(r) || r > 15) && (r = 15);var u = this._computeLeftCount({ conversationID: n, nextReqMessageID: o });return Gi.log("".concat(a, " conversationID:").concat(n, " leftCount:").concat(u, " count:").concat(r, " nextReqMessageID:").concat(o)), this._needGetHistory({ conversationID: n, leftCount: u, count: r }) ? this.getHistoryMessages({ conversationID: n, nextReqMessageID: o, count: 20 }).then(function () {return u = t._computeLeftCount({ conversationID: n, nextReqMessageID: o }), B_(t._computeResult({ conversationID: n, nextReqMessageID: o, count: r, leftCount: u }));}) : (Gi.log("".concat(a, ".getMessageList get message list from memory")), this.modifyMessageList(n), Q_(this._computeResult({ conversationID: n, nextReqMessageID: o, count: r, leftCount: u })));} }, { key: "_computeLeftCount", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID;return n ? this._messageListHandler.getLocalMessageList(t).findIndex(function (e) {return e.ID === n;}) : this._getMessageListSize(t);} }, { key: "_getMessageListSize", value: function value(e) {return this._messageListHandler.getLocalMessageList(e).length;} }, { key: "_needGetHistory", value: function value(e) {var t = e.conversationID,n = e.leftCount,o = e.count,r = this.getLocalConversation(t),a = "";return r && r.groupProfile && (a = r.groupProfile.type), !gu(t) && !lu(a) && n < o && !this._completedMap.has(t);} }, { key: "_computeResult", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID,o = e.count,r = e.leftCount,a = this._computeMessageList({ conversationID: t, nextReqMessageID: n, count: o }),s = this._computeIsCompleted({ conversationID: t, leftCount: r, count: o }),i = this._computeNextReqMessageID({ messageList: a, isCompleted: s, conversationID: t }),u = "".concat(this._className, "._computeResult. conversationID:").concat(t);return Gi.log("".concat(u, " leftCount:").concat(r, " count:").concat(o, " nextReqMessageID:").concat(i, " isCompleted:").concat(s)), { messageList: a, nextReqMessageID: i, isCompleted: s };} }, { key: "_computeMessageList", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID,o = e.count,r = this._messageListHandler.getLocalMessageList(t),a = this._computeIndexEnd({ nextReqMessageID: n, messageList: r }),s = this._computeIndexStart({ indexEnd: a, count: o });return r.slice(s, a);} }, { key: "_computeNextReqMessageID", value: function value(e) {var t = e.messageList,n = e.isCompleted,o = e.conversationID;if (!n) return 0 === t.length ? "" : t[0].ID;var r = this._messageListHandler.getLocalMessageList(o);return 0 === r.length ? "" : r[0].ID;} }, { key: "_computeIndexEnd", value: function value(e) {var t = e.messageList,n = void 0 === t ? [] : t,o = e.nextReqMessageID;return o ? n.findIndex(function (e) {return e.ID === o;}) : n.length;} }, { key: "_computeIndexStart", value: function value(e) {var t = e.indexEnd,n = e.count;return t > n ? t - n : 0;} }, { key: "_computeIsCompleted", value: function value(e) {var t = e.conversationID;return !!(e.leftCount <= e.count && this._completedMap.has(t));} }, { key: "getHistoryMessages", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID;if (t === ro.CONV_SYSTEM) return Q_();e.count ? e.count > 20 && (e.count = 20) : e.count = 15;var o = this._messageListHandler.getLocalOldestMessageByConversationID(t);o || ((o = {}).time = 0, o.sequence = 0, 0 === t.indexOf(ro.CONV_C2C) ? (o.to = t.replace(ro.CONV_C2C, ""), o.conversationType = ro.CONV_C2C) : 0 === t.indexOf(ro.CONV_GROUP) && (o.to = t.replace(ro.CONV_GROUP, ""), o.conversationType = ro.CONV_GROUP));var r = "",a = null;switch (o.conversationType) {case ro.CONV_C2C:return r = t.replace(ro.CONV_C2C, ""), (a = this.getModule(qc)) ? a.getRoamingMessage({ conversationID: e.conversationID, peerAccount: r, count: e.count, lastMessageTime: this._roamingMessageKeyMap.has(t) ? o.time : 0, messageKey: this._roamingMessageKeyMap.get(t) }) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });case ro.CONV_GROUP:return (a = this.getModule(xc)) ? a.getRoamingMessage({ conversationID: e.conversationID, groupID: o.to, count: e.count, sequence: n && !1 === o.getOnlineOnlyFlag() ? o.sequence - 1 : o.sequence }) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });default:return Q_();}} }, { key: "patchConversationLastMessage", value: function value(e) {var t = this.getLocalConversation(e);if (t) {var n = t.lastMessage,o = n.messageForShow,r = n.payload;if (Du(o) || Du(r)) {var a = this._messageListHandler.getLocalMessageList(e);if (0 === a.length) return;var s = a[a.length - 1];Gi.log("".concat(this._className, ".patchConversationLastMessage conversationID:").concat(e, " payload:"), s.payload), t.updateLastMessage(s);}}} }, { key: "storeRoamingMessage", value: function value() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],t = arguments.length > 1 ? arguments[1] : void 0,n = t.startsWith(ro.CONV_C2C) ? ro.CONV_C2C : ro.CONV_GROUP,o = null,r = [],a = 0,s = e.length,i = null,u = n === ro.CONV_GROUP,c = this.getModule(zc),l = function l() {a = u ? e.length - 1 : 0, s = u ? 0 : e.length;},p = function p() {u ? --a : ++a;},d = function d() {return u ? a >= s : a < s;};for (l(); d(); p()) {if (u && 1 === e[a].sequence && this.setCompleted(t), 1 !== e[a].isPlaceMessage) if ((o = new K_(e[a])).to = e[a].to, o.isSystemMessage = !!e[a].isSystemMessage, o.conversationType = n, 4 === e[a].event ? i = { type: ro.MSG_GRP_TIP, content: Fn({}, e[a].elements, { groupProfile: e[a].groupProfile }) } : (e[a].elements = c.parseElements(e[a].elements, e[a].from), i = e[a].elements), u || o.setNickAndAvatar({ nick: e[a].nick, avatar: e[a].avatar }), Du(i)) {var g = new Fd(ag);g.setMessage("from:".concat(o.from, " to:").concat(o.to, " sequence:").concat(o.sequence, " event:").concat(e[a].event)), g.setNetworkType(this.getNetworkType()).setLevel("warning").end();} else o.setElement(i), o.reInitialize(this.getMyUserID()), r.push(o);}return this._messageListHandler.unshift(r), l = p = d = null, r;} }, { key: "setMessageRead", value: function value(e) {var t = e.conversationID,n = e.messageID,o = this.getLocalConversation(t);if (Gi.log("".concat(this._className, ".setMessageRead conversationID:").concat(t, " unreadCount:").concat(o ? o.unreadCount : 0)), !o) return Q_();if (o.type !== ro.CONV_GROUP || Du(o.groupAtInfoList) || this.deleteGroupAtTips(t), 0 === o.unreadCount) return Q_();var r = this._messageListHandler.getLocalMessage(t, n),a = null;switch (o.type) {case ro.CONV_C2C:return (a = this.getModule(qc)) ? a.setMessageRead({ conversationID: t, lastMessageTime: r ? r.time : o.lastMessage.lastTime }) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });case ro.CONV_GROUP:return (a = this._moduleManager.getModule(xc)) ? a.setMessageRead({ conversationID: t, lastMessageSeq: r ? r.sequence : o.lastMessage.lastSequence }) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });case ro.CONV_SYSTEM:return o.unreadCount = 0, this._emitConversationUpdate(!0, !1), Q_();default:return Q_();}} }, { key: "updateIsReadAfterReadReport", value: function value(e) {var t = e.conversationID,n = e.lastMessageSeq,o = e.lastMessageTime,r = this._messageListHandler.getLocalMessageList(t);if (0 !== r.length) for (var a, s = r.length - 1; s >= 0; s--) {if (a = r[s], !(o && a.time > o || n && a.sequence > n)) {if ("in" === a.flow && a.isRead) break;a.setIsRead(!0);}}} }, { key: "updateUnreadCount", value: function value(e) {var t = this.getLocalConversation(e),n = this._messageListHandler.getLocalMessageList(e);if (t) {var o = t.unreadCount,r = n.filter(function (e) {return !e.isRead && !e.getOnlineOnlyFlag() && !e.isDeleted;}).length;o !== r && (t.unreadCount = r, Gi.log("".concat(this._className, ".updateUnreadCount from ").concat(o, " to ").concat(r, ", conversationID:").concat(e)), this._emitConversationUpdate(!0, !1));}} }, { key: "updateIsRead", value: function value(e) {var t = this.getLocalConversation(e),n = this.getLocalMessageList(e);if (t && 0 !== n.length && !gu(t.type)) {for (var o = [], r = 0, a = n.length; r < a; r++) {"in" !== n[r].flow ? "out" !== n[r].flow || n[r].isRead || n[r].setIsRead(!0) : o.push(n[r]);}var s = 0;if (t.type === ro.CONV_C2C) {var i = o.slice(-t.unreadCount).filter(function (e) {return e.isRevoked;}).length;s = o.length - t.unreadCount - i;} else s = o.length - t.unreadCount;for (var u = 0; u < s && !o[u].isRead; u++) {o[u].setIsRead(!0);}}} }, { key: "deleteGroupAtTips", value: function value(e) {var t = "".concat(this._className, ".deleteGroupAtTips");Gi.log("".concat(t));var n = this._conversationMap.get(e);if (!n) return Promise.resolve();var o = n.groupAtInfoList;if (0 === o.length) return Promise.resolve();var r = this.getMyUserID();return this.request({ protocolName: Cl, requestData: { messageListToDelete: o.map(function (e) {return { from: e.from, to: r, messageSeq: e.__sequence, messageRandom: e.__random, groupID: e.groupID };}) } }).then(function () {return Gi.log("".concat(t, " ok. count:").concat(o.length)), n.clearGroupAtInfoList(), Promise.resolve();}).catch(function (e) {return Gi.error("".concat(t, " failed. error:"), e), Z_(e);});} }, { key: "appendToMessageList", value: function value(e) {this._messageListHandler.pushIn(e);} }, { key: "setMessageRandom", value: function value(e) {this.singlyLinkedList.set(e.random);} }, { key: "deleteMessageRandom", value: function value(e) {this.singlyLinkedList.delete(e.random);} }, { key: "pushIntoMessageList", value: function value(e, t, n) {return !(!this._messageListHandler.pushIn(t, n) || this._isMessageFromCurrentInstance(t) && !n) && (e.push(t), !0);} }, { key: "_isMessageFromCurrentInstance", value: function value(e) {return this.singlyLinkedList.has(e.random);} }, { key: "revoke", value: function value(e, t, n) {return this._messageListHandler.revoke(e, t, n);} }, { key: "getPeerReadTime", value: function value(e) {return this._peerReadTimeMap.get(e);} }, { key: "recordPeerReadTime", value: function value(e, t) {this._peerReadTimeMap.has(e) ? this._peerReadTimeMap.get(e) < t && this._peerReadTimeMap.set(e, t) : this._peerReadTimeMap.set(e, t);} }, { key: "updateMessageIsPeerReadProperty", value: function value(e, t) {if (e.startsWith(ro.CONV_C2C) && t > 0) {var n = this._messageListHandler.updateMessageIsPeerReadProperty(e, t);n.length > 0 && this.emitOuterEvent(oo.MESSAGE_READ_BY_PEER, n);}} }, { key: "updateMessageIsReadProperty", value: function value(e) {var t = this.getLocalConversation(e),n = this._messageListHandler.getLocalMessageList(e);if (t && 0 !== n.length && !gu(t.type)) {for (var o = [], r = 0; r < n.length; r++) {"in" !== n[r].flow ? "out" !== n[r].flow || n[r].isRead || n[r].setIsRead(!0) : o.push(n[r]);}var a = 0;if (t.type === ro.CONV_C2C) {var s = o.slice(-t.unreadCount).filter(function (e) {return e.isRevoked;}).length;a = o.length - t.unreadCount - s;} else a = o.length - t.unreadCount;for (var i = 0; i < a && !o[i].isRead; i++) {o[i].setIsRead(!0);}}} }, { key: "updateMessageIsModifiedProperty", value: function value(e) {this._messageListHandler.updateMessageIsModifiedProperty(e);} }, { key: "setCompleted", value: function value(e) {Gi.log("".concat(this._className, ".setCompleted. conversationID:").concat(e)), this._completedMap.set(e, !0);} }, { key: "updateRoamingMessageKey", value: function value(e, t) {this._roamingMessageKeyMap.set(e, t);} }, { key: "getConversationList", value: function value() {var e = this,t = "".concat(this._className, ".getConversationList");Gi.log(t), this._pagingStatus === Mc.REJECTED && (Gi.log("".concat(t, ". continue to sync conversationList")), this._syncConversationList());var n = new Fd(pg);return this.request({ protocolName: Tl, requestData: { fromAccount: this.getMyUserID() } }).then(function (o) {var r = o.data.conversations,a = void 0 === r ? [] : r,s = e._getConversationOptions(a);return e._updateLocalConversationList(s, !0), e._setStorageConversationList(), e._handleC2CPeerReadTime(), n.setMessage("conversation count: ".concat(a.length)).setNetworkType(e.getNetworkType()).end(), Gi.log("".concat(t, " ok")), Q_({ conversationList: e.getLocalConversationList() });}).catch(function (o) {return e.probeNetwork().then(function (e) {var t = Wn(e, 2),r = t[0],a = t[1];n.setError(o, r, a).end();}), Gi.error("".concat(t, " failed. error:"), o), Z_(o);});} }, { key: "_handleC2CPeerReadTime", value: function value() {var e,t = no(this._conversationMap);try {for (t.s(); !(e = t.n()).done;) {var n = Wn(e.value, 2),o = n[0],r = n[1];r.type === ro.CONV_C2C && (Gi.debug("".concat(this._className, "._handleC2CPeerReadTime conversationID:").concat(o, " peerReadTime:").concat(r.peerReadTime)), this.recordPeerReadTime(o, r.peerReadTime));}} catch (a) {t.e(a);} finally {t.f();}} }, { key: "getConversationProfile", value: function value(e) {var t,n = this;if ((t = this._conversationMap.has(e) ? this._conversationMap.get(e) : new Em({ conversationID: e, type: e.slice(0, 3) === ro.CONV_C2C ? ro.CONV_C2C : ro.CONV_GROUP }))._isInfoCompleted || t.type === ro.CONV_SYSTEM) return Q_({ conversation: t });var o = new Fd(dg),r = "".concat(this._className, ".getConversationProfile");return Gi.log("".concat(r, ". conversationID:").concat(e, " remark:").concat(t.remark, " lastMessage:"), t.lastMessage), this._updateUserOrGroupProfileCompletely(t).then(function (a) {o.setNetworkType(n.getNetworkType()).setMessage("conversationID:".concat(e, " unreadCount:").concat(a.data.conversation.unreadCount)).end();var s = n.getModule(Vc);if (s && t.type === ro.CONV_C2C) {var i = e.replace(ro.CONV_C2C, "");if (s.isMyFriend(i)) {var u = s.getFriendRemark(i);t.remark !== u && (t.remark = u, Gi.log("".concat(r, ". conversationID:").concat(e, " patch remark:").concat(t.remark)));}}return Gi.log("".concat(r, " ok. conversationID:").concat(e)), a;}).catch(function (t) {return n.probeNetwork().then(function (n) {var r = Wn(n, 2),a = r[0],s = r[1];o.setError(t, a, s).setMessage("conversationID:".concat(e)).end();}), Gi.error("".concat(r, " failed. error:"), t), Z_(t);});} }, { key: "_updateUserOrGroupProfileCompletely", value: function value(e) {var t = this;return e.type === ro.CONV_C2C ? this.getModule(Fc).getUserProfile({ userIDList: [e.toAccount] }).then(function (n) {var o = n.data;return 0 === o.length ? Z_(new W_({ code: fp.USER_OR_GROUP_NOT_FOUND, message: Wp })) : (e.userProfile = o[0], e._isInfoCompleted = !0, t._unshiftConversation(e), Q_({ conversation: e }));}) : this.getModule(xc).getGroupProfile({ groupID: e.toAccount }).then(function (n) {return e.groupProfile = n.data.group, e._isInfoCompleted = !0, t._unshiftConversation(e), Q_({ conversation: e });});} }, { key: "_unshiftConversation", value: function value(e) {e instanceof Em && !this._conversationMap.has(e.conversationID) && (this._conversationMap = new Map([[e.conversationID, e]].concat(Jn(this._conversationMap))), this._setStorageConversationList(), this._emitConversationUpdate(!0, !1));} }, { key: "deleteConversation", value: function value(e) {var t = this,n = { fromAccount: this.getMyUserID(), toAccount: void 0, type: void 0 };if (!this._conversationMap.has(e)) {var o = new W_({ code: fp.CONVERSATION_NOT_FOUND, message: zp });return Z_(o);}switch (this._conversationMap.get(e).type) {case ro.CONV_C2C:n.type = 1, n.toAccount = e.replace(ro.CONV_C2C, "");break;case ro.CONV_GROUP:n.type = 2, n.toGroupID = e.replace(ro.CONV_GROUP, "");break;case ro.CONV_SYSTEM:return this.getModule(xc).deleteGroupSystemNotice({ messageList: this._messageListHandler.getLocalMessageList(e) }), this.deleteLocalConversation(e), Q_({ conversationID: e });default:var r = new W_({ code: fp.CONVERSATION_UN_RECORDED_TYPE, message: Jp });return Z_(r);}var a = new Fd(gg);a.setMessage("conversationID:".concat(e));var s = "".concat(this._className, ".deleteConversation");return Gi.log("".concat(s, ". conversationID:").concat(e)), this.setMessageRead({ conversationID: e }).then(function () {return t.request({ protocolName: Dl, requestData: n });}).then(function () {return a.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(s, " ok")), t.deleteLocalConversation(e), Q_({ conversationID: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];a.setError(e, o, r).end();}), Gi.error("".concat(s, " failed. error:"), e), Z_(e);});} }, { key: "pinConversation", value: function value(e) {var t = this,n = e.conversationID,o = e.isPinned;if (!this._conversationMap.has(n)) return Z_({ code: fp.CONVERSATION_NOT_FOUND, message: zp });var r = this.getLocalConversation(n);if (r.isPinned === o) return Q_({ conversationID: n });var a = new Fd(hg);a.setMessage("conversationID:".concat(n, " isPinned:").concat(o));var s = "".concat(this._className, ".pinConversation");Gi.log("".concat(s, ". conversationID:").concat(n, " isPinned:").concat(o));var i = null;return pu(n) ? i = { type: 1, toAccount: n.replace(ro.CONV_C2C, "") } : du(n) && (i = { type: 2, groupID: n.replace(ro.CONV_GROUP, "") }), this.request({ protocolName: El, requestData: { fromAccount: this.getMyUserID(), operationType: !0 === o ? 1 : 2, itemList: [i] } }).then(function () {return a.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(s, " ok")), r.isPinned !== o && (r.isPinned = o, t._sortConversationListAndEmitEvent()), B_({ conversationID: n });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];a.setError(e, o, r).end();}), Gi.error("".concat(s, " failed. error:"), e), Z_(e);});} }, { key: "deleteLocalConversation", value: function value(e) {var t = this._conversationMap.has(e);Gi.log("".concat(this._className, ".deleteLocalConversation conversationID:").concat(e, " has:").concat(t)), t && (this._conversationMap.delete(e), this._roamingMessageKeyMap.delete(e), this._setStorageConversationList(), this._messageListHandler.removeByConversationID(e), this._completedMap.delete(e), this._emitConversationUpdate(!0, !1));} }, { key: "isMessageSentByCurrentInstance", value: function value(e) {return !(!this._messageListHandler.hasLocalMessage(e.conversationID, e.ID) && !this.singlyLinkedList.has(e.random));} }, { key: "modifyMessageList", value: function value(e) {if (e.startsWith(ro.CONV_C2C)) {var t = Date.now();this._messageListHandler.modifyMessageSentByPeer(e);var n = this.getModule(Fc).getNickAndAvatarByUserID(this.getMyUserID());this._messageListHandler.modifyMessageSentByMe({ conversationID: e, latestNick: n.nick, latestAvatar: n.avatar }), Gi.log("".concat(this._className, ".modifyMessageList conversationID:").concat(e, " cost ").concat(Date.now() - t, " ms"));}} }, { key: "updateUserProfileSpecifiedKey", value: function value(e) {Gi.log("".concat(this._className, ".updateUserProfileSpecifiedKey options:"), e);var t = e.conversationID,n = e.nick,o = e.avatar;if (this._conversationMap.has(t)) {var r = this._conversationMap.get(t).userProfile;qi(n) && r.nick !== n && (r.nick = n), qi(o) && r.avatar !== o && (r.avatar = o), this._emitConversationUpdate(!0, !1);}} }, { key: "onMyProfileModified", value: function value(e) {var t = this,n = this.getLocalConversationList(),o = Date.now();n.forEach(function (n) {t.modifyMessageSentByMe(Fn({ conversationID: n.conversationID }, e));}), Gi.log("".concat(this._className, ".onMyProfileModified. modify all messages sent by me, cost ").concat(Date.now() - o, " ms"));} }, { key: "modifyMessageSentByMe", value: function value(e) {this._messageListHandler.modifyMessageSentByMe(e);} }, { key: "getLatestMessageSentByMe", value: function value(e) {return this._messageListHandler.getLatestMessageSentByMe(e);} }, { key: "modifyMessageSentByPeer", value: function value(e, t) {this._messageListHandler.modifyMessageSentByPeer(e, t);} }, { key: "getLatestMessageSentByPeer", value: function value(e) {return this._messageListHandler.getLatestMessageSentByPeer(e);} }, { key: "pushIntoNoticeResult", value: function value(e, t) {return !(!this._messageListHandler.pushIn(t) || this.singlyLinkedList.has(t.random)) && (e.push(t), !0);} }, { key: "getGroupLocalLastMessageSequence", value: function value(e) {return this._messageListHandler.getGroupLocalLastMessageSequence(e);} }, { key: "checkAndPatchRemark", value: function value() {if (0 !== this._conversationMap.size) {var e = this.getModule(Vc);if (e) {var t = Jn(this._conversationMap.values()).filter(function (e) {return e.type === ro.CONV_C2C;});if (0 !== t.length) {var n = !1,o = 0;t.forEach(function (t) {var r = t.conversationID.replace(ro.CONV_C2C, "");if (e.isMyFriend(r)) {var a = e.getFriendRemark(r);t.remark !== a && (t.remark = a, o += 1, n = !0);}}), Gi.log("".concat(this._className, ".checkAndPatchRemark. c2c conversation count:").concat(t.length, ", patched count:").concat(o)), n && this._emitConversationUpdate(!0, !1);}}}} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._pagingStatus = Mc.NOT_START, this._messageListHandler.reset(), this._roamingMessageKeyMap.clear(), this.singlyLinkedList.reset(), this._peerReadTimeMap.clear(), this._completedMap.clear(), this._conversationMap.clear(), this._pagingTimeStamp = 0, this._pagingStartIndex = 0, this._pagingPinnedTimeStamp = 0, this._pagingPinnedStartIndex = 0, this.resetReady();} }]), n;}(rl),Am = function () {function e(t) {bn(this, e), this._groupModule = t, this._className = "GroupTipsHandler", this._cachedGroupTipsMap = new Map(), this._checkCountMap = new Map(), this.MAX_CHECK_COUNT = 4;}return Pn(e, [{ key: "onCheckTimer", value: function value(e) {e % 1 == 0 && this._cachedGroupTipsMap.size > 0 && this._checkCachedGroupTips();} }, { key: "_checkCachedGroupTips", value: function value() {var e = this;this._cachedGroupTipsMap.forEach(function (t, n) {var o = e._checkCountMap.get(n),r = e._groupModule.hasLocalGroup(n);Gi.log("".concat(e._className, "._checkCachedGroupTips groupID:").concat(n, " hasLocalGroup:").concat(r, " checkCount:").concat(o)), r ? (e._notifyCachedGroupTips(n), e._checkCountMap.delete(n), e._groupModule.deleteUnjoinedAVChatRoom(n)) : o >= e.MAX_CHECK_COUNT ? (e._deleteCachedGroupTips(n), e._checkCountMap.delete(n)) : (o++, e._checkCountMap.set(n, o));});} }, { key: "onNewGroupTips", value: function value(e) {Gi.debug("".concat(this._className, ".onReceiveGroupTips count:").concat(e.dataList.length));var t = this.newGroupTipsStoredAndSummary(e),n = t.eventDataList,o = t.result,r = t.AVChatRoomMessageList;(r.length > 0 && this._groupModule.onAVChatRoomMessage(r), n.length > 0) && (this._groupModule.getModule(Bc).onNewMessage({ conversationOptionsList: n, isInstantMessage: !0 }), this._groupModule.updateNextMessageSeq(n));o.length > 0 && (this._groupModule.emitOuterEvent(oo.MESSAGE_RECEIVED, o), this.handleMessageList(o));} }, { key: "newGroupTipsStoredAndSummary", value: function value(e) {for (var t = e.event, n = e.dataList, o = null, r = [], a = [], s = {}, i = [], u = 0, c = n.length; u < c; u++) {var l = n[u],p = l.groupProfile.groupID,d = this._groupModule.hasLocalGroup(p);if (d || !this._groupModule.isUnjoinedAVChatRoom(p)) if (d) {if (this._groupModule.isMessageFromAVChatroom(p)) {var g = iu(l);g.event = t, i.push(g);} else {l.currentUser = this._groupModule.getMyUserID(), l.conversationType = ro.CONV_GROUP, (o = new K_(l)).setElement({ type: ro.MSG_GRP_TIP, content: Fn({}, l.elements, { groupProfile: l.groupProfile }) }), o.isSystemMessage = !1;var h = this._groupModule.getModule(Bc),f = o.conversationID;if (6 === t) o.setOnlineOnlyFlag(!0), a.push(o);else if (!h.pushIntoNoticeResult(a, o)) continue;if (6 !== t || !h.getLocalConversation(f)) {if (6 !== t) this._groupModule.getModule(ol).addMessageSequence({ key: Rd, message: o });if (Bi(s[f])) s[f] = r.push({ conversationID: f, unreadCount: "in" === o.flow && o.getOnlineOnlyFlag() ? 0 : 1, type: o.conversationType, subType: o.conversationSubType, lastMessage: o }) - 1;else {var _ = s[f];r[_].type = o.conversationType, r[_].subType = o.conversationSubType, r[_].lastMessage = o, "in" !== o.flow || o.getOnlineOnlyFlag() || r[_].unreadCount++;}}}} else this._cacheGroupTipsAndProbe({ groupID: p, event: t, item: l });}return { eventDataList: r, result: a, AVChatRoomMessageList: i };} }, { key: "handleMessageList", value: function value(e) {var t = this;e.forEach(function (e) {switch (e.payload.operationType) {case 1:t._onNewMemberComeIn(e);break;case 2:t._onMemberQuit(e);break;case 3:t._onMemberKickedOut(e);break;case 4:t._onMemberSetAdmin(e);break;case 5:t._onMemberCancelledAdmin(e);break;case 6:t._onGroupProfileModified(e);break;case 7:t._onMemberInfoModified(e);break;default:Gi.warn("".concat(t._className, ".handleMessageList unknown operationType:").concat(e.payload.operationType));}});} }, { key: "_onNewMemberComeIn", value: function value(e) {var t = e.payload,n = t.memberNum,o = t.groupProfile.groupID,r = this._groupModule.getLocalGroupProfile(o);r && Fi(n) && (r.memberNum = n);} }, { key: "_onMemberQuit", value: function value(e) {var t = e.payload,n = t.memberNum,o = t.groupProfile.groupID,r = this._groupModule.getLocalGroupProfile(o);r && Fi(n) && (r.memberNum = n), this._groupModule.deleteLocalGroupMembers(o, e.payload.userIDList);} }, { key: "_onMemberKickedOut", value: function value(e) {var t = e.payload,n = t.memberNum,o = t.groupProfile.groupID,r = this._groupModule.getLocalGroupProfile(o);r && Fi(n) && (r.memberNum = n), this._groupModule.deleteLocalGroupMembers(o, e.payload.userIDList);} }, { key: "_onMemberSetAdmin", value: function value(e) {var t = e.payload.groupProfile.groupID,n = e.payload.userIDList,o = this._groupModule.getModule(Kc);n.forEach(function (e) {var n = o.getLocalGroupMemberInfo(t, e);n && n.updateRole(ro.GRP_MBR_ROLE_ADMIN);});} }, { key: "_onMemberCancelledAdmin", value: function value(e) {var t = e.payload.groupProfile.groupID,n = e.payload.userIDList,o = this._groupModule.getModule(Kc);n.forEach(function (e) {var n = o.getLocalGroupMemberInfo(t, e);n && n.updateRole(ro.GRP_MBR_ROLE_MEMBER);});} }, { key: "_onGroupProfileModified", value: function value(e) {var t = this,n = e.payload,o = n.newGroupProfile,r = n.groupProfile.groupID,a = this._groupModule.getLocalGroupProfile(r);Object.keys(o).forEach(function (e) {switch (e) {case "ownerID":t._ownerChanged(a, o);break;default:a[e] = o[e];}}), this._groupModule.emitGroupListUpdate(!0, !0);} }, { key: "_ownerChanged", value: function value(e, t) {var n = e.groupID,o = this._groupModule.getLocalGroupProfile(n),r = this.tim.context.identifier;if (r === t.ownerID) {o.updateGroup({ selfInfo: { role: ro.GRP_MBR_ROLE_OWNER } });var a = this._groupModule.getModule(Kc),s = a.getLocalGroupMemberInfo(n, r),i = this._groupModule.getLocalGroupProfile(n).ownerID,u = a.getLocalGroupMemberInfo(n, i);s && s.updateRole(ro.GRP_MBR_ROLE_OWNER), u && u.updateRole(ro.GRP_MBR_ROLE_MEMBER);}} }, { key: "_onMemberInfoModified", value: function value(e) {var t = e.payload.groupProfile.groupID,n = this._groupModule.getModule(Kc);e.payload.memberList.forEach(function (e) {var o = n.getLocalGroupMemberInfo(t, e.userID);o && e.muteTime && o.updateMuteUntil(e.muteTime);});} }, { key: "_cacheGroupTips", value: function value(e, t) {this._cachedGroupTipsMap.has(e) || this._cachedGroupTipsMap.set(e, []), this._cachedGroupTipsMap.get(e).push(t);} }, { key: "_deleteCachedGroupTips", value: function value(e) {this._cachedGroupTipsMap.has(e) && this._cachedGroupTipsMap.delete(e);} }, { key: "_notifyCachedGroupTips", value: function value(e) {var t = this,n = this._cachedGroupTipsMap.get(e) || [];n.forEach(function (e) {t.onNewGroupTips(e);}), this._deleteCachedGroupTips(e), Gi.log("".concat(this._className, "._notifyCachedGroupTips groupID:").concat(e, " count:").concat(n.length));} }, { key: "_cacheGroupTipsAndProbe", value: function value(e) {var t = this,n = e.groupID,o = e.event,r = e.item;this._cacheGroupTips(n, { event: o, dataList: [r] }), this._groupModule.getGroupSimplifiedInfo(n).then(function (e) {e.type === ro.GRP_AVCHATROOM ? t._groupModule.hasLocalGroup(n) ? t._notifyCachedGroupTips(n) : t._groupModule.setUnjoinedAVChatRoom(n) : (t._groupModule.updateGroupMap([e]), t._notifyCachedGroupTips(n));}), this._checkCountMap.has(n) || this._checkCountMap.set(n, 0), Gi.log("".concat(this._className, "._cacheGroupTipsAndProbe groupID:").concat(n));} }, { key: "reset", value: function value() {this._cachedGroupTipsMap.clear(), this._checkCountMap.clear();} }]), e;}(),km = [].push,Nm = Math.min,Om = !r(function () {return !RegExp(4294967295, "y");});vs("split", 2, function (e, t, n) {var o;return o = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function (e, n) {var o = String(h(this)),r = void 0 === n ? 4294967295 : n >>> 0;if (0 === r) return [];if (void 0 === e) return [o];if (!us(e)) return t.call(o, e, r);for (var a, s, i, u = [], c = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), l = 0, p = new RegExp(e.source, c + "g"); (a = ts.call(p, o)) && !((s = p.lastIndex) > l && (u.push(o.slice(l, a.index)), a.length > 1 && a.index < o.length && km.apply(u, a.slice(1)), i = a[0].length, l = s, u.length >= r));) {p.lastIndex === a.index && p.lastIndex++;}return l === o.length ? !i && p.test("") || u.push("") : u.push(o.slice(l)), u.length > r ? u.slice(0, r) : u;} : "0".split(void 0, 0).length ? function (e, n) {return void 0 === e && 0 === n ? [] : t.call(this, e, n);} : t, [function (t, n) {var r = h(this),a = null == t ? void 0 : t[e];return void 0 !== a ? a.call(t, r, n) : o.call(String(r), t, n);}, function (e, r) {var a = n(o, e, this, r, o !== t);if (a.done) return a.value;var s = C(e),i = String(this),u = Rr(s, RegExp),c = s.unicode,l = (s.ignoreCase ? "i" : "") + (s.multiline ? "m" : "") + (s.unicode ? "u" : "") + (Om ? "y" : "g"),p = new u(Om ? s : "^(?:" + s.source + ")", l),d = void 0 === r ? 4294967295 : r >>> 0;if (0 === d) return [];if (0 === i.length) return null === Is(p, i) ? [i] : [];for (var g = 0, h = 0, f = []; h < i.length;) {p.lastIndex = Om ? h : 0;var _,m = Is(p, Om ? i : i.slice(h));if (null === m || (_ = Nm(ce(p.lastIndex + (Om ? 0 : h)), i.length)) === g) h = ys(i, h, c);else {if (f.push(i.slice(g, h)), f.length === d) return f;for (var v = 1; v <= m.length - 1; v++) {if (f.push(m[v]), f.length === d) return f;}h = g = _;}}return f.push(i.slice(g)), f;}];}, !Om);var Lm = function () {function e(t) {bn(this, e), this._groupModule = t, this._className = "CommonGroupHandler", this.tempConversationList = null, this._cachedGroupMessageMap = new Map(), this._checkCountMap = new Map(), this.MAX_CHECK_COUNT = 4, t.getInnerEmitterInstance().once(lm.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._initGroupList, this);}return Pn(e, [{ key: "onCheckTimer", value: function value(e) {e % 1 == 0 && this._cachedGroupMessageMap.size > 0 && this._checkCachedGroupMessage();} }, { key: "_checkCachedGroupMessage", value: function value() {var e = this;this._cachedGroupMessageMap.forEach(function (t, n) {var o = e._checkCountMap.get(n),r = e._groupModule.hasLocalGroup(n);Gi.log("".concat(e._className, "._checkCachedGroupMessage groupID:").concat(n, " hasLocalGroup:").concat(r, " checkCount:").concat(o)), r ? (e._notifyCachedGroupMessage(n), e._checkCountMap.delete(n), e._groupModule.deleteUnjoinedAVChatRoom(n)) : o >= e.MAX_CHECK_COUNT ? (e._deleteCachedGroupMessage(n), e._checkCountMap.delete(n)) : (o++, e._checkCountMap.set(n, o));});} }, { key: "_initGroupList", value: function value() {var e = this;Gi.log("".concat(this._className, "._initGroupList"));var t = new Fd(Ng),n = this._groupModule.getStorageGroupList();if (Ki(n) && n.length > 0) {n.forEach(function (t) {e._groupModule.initGroupMap(t);}), this._groupModule.emitGroupListUpdate(!0, !1);var o = this._groupModule.getLocalGroupList().length;t.setNetworkType(this._groupModule.getNetworkType()).setMessage("group count:".concat(o)).end();} else t.setNetworkType(this._groupModule.getNetworkType()).setMessage("group count:0").end();Gi.log("".concat(this._className, "._initGroupList ok")), this.getGroupList();} }, { key: "handleUpdateGroupLastMessage", value: function value(e) {var t = "".concat(this._className, ".handleUpdateGroupLastMessage");if (Gi.debug("".concat(t, " conversation count:").concat(e.length, ", local group count:").concat(this._groupModule.getLocalGroupList().length)), 0 !== this._groupModule.getGroupMap().size) {for (var n, o, r, a = !1, s = 0, i = e.length; s < i; s++) {(n = e[s]).type === ro.CONV_GROUP && (o = n.conversationID.split(/^GROUP/)[1], (r = this._groupModule.getLocalGroupProfile(o)) && (r.lastMessage = n.lastMessage, a = !0));}a && (this._groupModule.sortLocalGroupList(), this._groupModule.emitGroupListUpdate(!0, !1));} else this.tempConversationList = e;} }, { key: "onNewGroupMessage", value: function value(e) {Gi.debug("".concat(this._className, ".onNewGroupMessage count:").concat(e.dataList.length));var t = this._newGroupMessageStoredAndSummary(e),n = t.conversationOptionsList,o = t.messageList,r = t.AVChatRoomMessageList;(r.length > 0 && this._groupModule.onAVChatRoomMessage(r), this._groupModule.filterModifiedMessage(o), n.length > 0) && (this._groupModule.getModule(Bc).onNewMessage({ conversationOptionsList: n, isInstantMessage: !0 }), this._groupModule.updateNextMessageSeq(n));var a = this._groupModule.filterUnmodifiedMessage(o);a.length > 0 && this._groupModule.emitOuterEvent(oo.MESSAGE_RECEIVED, a), o.length = 0;} }, { key: "_newGroupMessageStoredAndSummary", value: function value(e) {var t = e.dataList,n = e.event,o = e.isInstantMessage,r = null,a = [],s = [],i = [],u = {},c = ro.CONV_GROUP,l = this._groupModule.getModule(zc),p = t.length;p > 1 && t.sort(function (e, t) {return e.sequence - t.sequence;});for (var d = 0; d < p; d++) {var g = t[d],h = g.groupProfile.groupID,f = this._groupModule.hasLocalGroup(h);if (f || !this._groupModule.isUnjoinedAVChatRoom(h)) if (f) {if (this._groupModule.isMessageFromAVChatroom(h)) {var _ = iu(g);_.event = n, i.push(_);} else {g.currentUser = this._groupModule.getMyUserID(), g.conversationType = c, g.isSystemMessage = !!g.isSystemMessage, r = new K_(g), g.elements = l.parseElements(g.elements, g.from), r.setElement(g.elements);var m = 1 === t[d].isModified,v = this._groupModule.getModule(Bc);v.isMessageSentByCurrentInstance(r) ? r.isModified = m : m = !1;var M = this._groupModule.getModule(ol);if (o && M.addMessageDelay({ currentTime: Date.now(), time: r.time }), 1 === g.onlineOnlyFlag) r.setOnlineOnlyFlag(!0), s.push(r);else {if (!v.pushIntoMessageList(s, r, m)) continue;M.addMessageSequence({ key: Rd, message: r });var y = r.conversationID;if (Bi(u[y])) u[y] = a.push({ conversationID: y, unreadCount: "out" === r.flow ? 0 : 1, type: r.conversationType, subType: r.conversationSubType, lastMessage: r }) - 1;else {var I = u[y];a[I].type = r.conversationType, a[I].subType = r.conversationSubType, a[I].lastMessage = r, "in" === r.flow && a[I].unreadCount++;}}}} else this._cacheGroupMessageAndProbe({ groupID: h, event: n, item: g });}return { conversationOptionsList: a, messageList: s, AVChatRoomMessageList: i };} }, { key: "onGroupMessageRevoked", value: function value(e) {Gi.debug("".concat(this._className, ".onGroupMessageRevoked nums:").concat(e.dataList.length));var t = this._groupModule.getModule(Bc),n = [],o = null;e.dataList.forEach(function (e) {var r = e.elements.revokedInfos;Bi(r) || r.forEach(function (e) {(o = t.revoke("GROUP".concat(e.groupID), e.sequence, e.random)) && n.push(o);});}), 0 !== n.length && (t.onMessageRevoked(n), this._groupModule.emitOuterEvent(oo.MESSAGE_REVOKED, n));} }, { key: "_groupListTreeShaking", value: function value(e) {for (var t = new Map(Jn(this._groupModule.getGroupMap())), n = 0, o = e.length; n < o; n++) {t.delete(e[n].groupID);}this._groupModule.hasJoinedAVChatRoom() && this._groupModule.getJoinedAVChatRoom().forEach(function (e) {t.delete(e);});for (var r = Jn(t.keys()), a = 0, s = r.length; a < s; a++) {this._groupModule.deleteGroup(r[a]);}} }, { key: "getGroupList", value: function value(e) {var t = this,n = "".concat(this._className, ".getGroupList"),o = new Fd(Ag);Gi.log("".concat(n));var r = { introduction: "Introduction", notification: "Notification", createTime: "CreateTime", ownerID: "Owner_Account", lastInfoTime: "LastInfoTime", memberNum: "MemberNum", maxMemberNum: "MaxMemberNum", joinOption: "ApplyJoinOption", muteAllMembers: "ShutUpAllMember" },a = ["Type", "Name", "FaceUrl", "NextMsgSeq", "LastMsgTime"],s = [];return e && e.groupProfileFilter && e.groupProfileFilter.forEach(function (e) {r[e] && a.push(r[e]);}), this._pagingGetGroupList({ limit: 50, offset: 0, groupBaseInfoFilter: a, groupList: s }).then(function () {Gi.log("".concat(n, " ok. count:").concat(s.length)), t._groupListTreeShaking(s), t._groupModule.updateGroupMap(s);var e = t._groupModule.getLocalGroupList().length;return o.setNetworkType(t._groupModule.getNetworkType()).setMessage("remote count:".concat(s.length, ", after tree shaking, local count:").concat(e)).end(), t.tempConversationList && (Gi.log("".concat(n, " update last message with tempConversationList, count:").concat(t.tempConversationList.length)), t.handleUpdateGroupLastMessage({ data: t.tempConversationList }), t.tempConversationList = null), t._groupModule.emitGroupListUpdate(), B_({ groupList: t._groupModule.getLocalGroupList() });}).catch(function (e) {return t._groupModule.probeNetwork().then(function (t) {var n = Wn(t, 2),r = n[0],a = n[1];o.setError(e, r, a).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "_pagingGetGroupList", value: function value(e) {var t = this,n = "".concat(this._className, "._pagingGetGroupList"),o = e.limit,r = e.offset,a = e.groupBaseInfoFilter,s = e.groupList,i = new Fd(Rg);return this._groupModule.request({ protocolName: Al, requestData: { memberAccount: this._groupModule.getMyUserID(), limit: o, offset: r, responseFilter: { groupBaseInfoFilter: a, selfInfoFilter: ["Role", "JoinTime", "MsgFlag"] } } }).then(function (e) {var u = e.data,c = u.groups,l = u.totalCount;s.push.apply(s, Jn(c));var p = r + o,d = !(l > p);return i.setNetworkType(t._groupModule.getNetworkType()).setMessage("offset:".concat(r, " totalCount:").concat(l, " isCompleted:").concat(d, " currentCount:").concat(s.length)).end(), d ? (Gi.log("".concat(n, " ok. totalCount:").concat(l)), B_({ groupList: s })) : (r = p, t._pagingGetGroupList({ limit: o, offset: r, groupBaseInfoFilter: a, groupList: s }));}).catch(function (e) {return t._groupModule.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];i.setError(e, o, r).end();}), Z_(e);});} }, { key: "_cacheGroupMessage", value: function value(e, t) {this._cachedGroupMessageMap.has(e) || this._cachedGroupMessageMap.set(e, []), this._cachedGroupMessageMap.get(e).push(t);} }, { key: "_deleteCachedGroupMessage", value: function value(e) {this._cachedGroupMessageMap.has(e) && this._cachedGroupMessageMap.delete(e);} }, { key: "_notifyCachedGroupMessage", value: function value(e) {var t = this,n = this._cachedGroupMessageMap.get(e) || [];n.forEach(function (e) {t.onNewGroupMessage(e);}), this._deleteCachedGroupMessage(e), Gi.log("".concat(this._className, "._notifyCachedGroupMessage groupID:").concat(e, " count:").concat(n.length));} }, { key: "_cacheGroupMessageAndProbe", value: function value(e) {var t = this,n = e.groupID,o = e.event,r = e.item;this._cacheGroupMessage(n, { event: o, dataList: [r] }), this._groupModule.getGroupSimplifiedInfo(n).then(function (e) {e.type === ro.GRP_AVCHATROOM ? t._groupModule.hasLocalGroup(n) ? t._notifyCachedGroupMessage(n) : t._groupModule.setUnjoinedAVChatRoom(n) : (t._groupModule.updateGroupMap([e]), t._notifyCachedGroupMessage(n));}), this._checkCountMap.has(n) || this._checkCountMap.set(n, 0), Gi.log("".concat(this._className, "._cacheGroupMessageAndProbe groupID:").concat(n));} }, { key: "reset", value: function value() {this._cachedGroupMessageMap.clear(), this._checkCountMap.clear(), this._groupModule.getInnerEmitterInstance().once(lm.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._initGroupList, this);} }]), e;}(),Rm = { 1: "init", 2: "modify", 3: "clear", 4: "delete" },bm = function () {function e(t) {bn(this, e), this._groupModule = t, this._className = "GroupAttributesHandler", this._groupAttributesMap = new Map(), this.CACHE_EXPIRE_TIME = 3e4, this._groupModule.getInnerEmitterInstance().on(lm.CLOUD_CONFIG_UPDATED, this._onCloudConfigUpdated, this);}return Pn(e, [{ key: "_onCloudConfigUpdated", value: function value() {var e = this._groupModule.getCloudConfig("grp_attr_cache_time");Bi(e) || (this.CACHE_EXPIRE_TIME = Number(e));} }, { key: "updateLocalMainSequenceOnReconnected", value: function value() {this._groupAttributesMap.forEach(function (e) {e.localMainSequence = 0;});} }, { key: "onGroupAttributesUpdated", value: function value(e) {var t = this,n = e.groupID,o = e.groupAttributeOption,r = o.mainSequence,a = o.hasChangedAttributeInfo,s = o.groupAttributeList,i = void 0 === s ? [] : s,u = o.operationType;if (Gi.log("".concat(this._className, ".onGroupAttributesUpdated. hasChangedAttributeInfo:").concat(a, " operationType:").concat(u)), 1 === a) {if (4 === u) {var c = [];i.forEach(function (e) {c.push(e.key);}), i = Jn(c), c = null;}return this._refreshCachedGroupAttributes({ groupID: n, remoteMainSequence: r, groupAttributeList: i, operationType: Rm[u] }), void this._emitGroupAttributesUpdated(n);}if (this._groupAttributesMap.has(n)) {var l = this._groupAttributesMap.get(n).avChatRoomKey;this._getGroupAttributes({ groupID: n, avChatRoomKey: l }).then(function () {t._emitGroupAttributesUpdated(n);});}} }, { key: "initGroupAttributesCache", value: function value(e) {var t = e.groupID,n = e.avChatRoomKey;this._groupAttributesMap.set(t, { lastUpdateTime: 0, localMainSequence: 0, remoteMainSequence: 0, attributes: new Map(), avChatRoomKey: n }), Gi.log("".concat(this._className, ".initGroupAttributesCache groupID:").concat(t, " avChatRoomKey:").concat(n));} }, { key: "initGroupAttributes", value: function value(e) {var t = this,n = e.groupID,o = e.groupAttributes,r = this._checkCachedGroupAttributes({ groupID: n, funcName: "initGroupAttributes" });if (!0 !== r) return Z_(r);var a = this._groupAttributesMap.get(n),s = a.remoteMainSequence,i = a.avChatRoomKey,u = new Fd(Pg);return u.setMessage("groupID:".concat(n, " mainSequence:").concat(s, " groupAttributes:").concat(JSON.stringify(o))), this._groupModule.request({ protocolName: zl, requestData: { groupID: n, avChatRoomKey: i, mainSequence: s, groupAttributeList: this._transformGroupAttributes(o) } }).then(function (e) {var r = e.data,a = r.mainSequence,s = Jn(r.groupAttributeList);return s.forEach(function (e) {e.value = o[e.key];}), t._refreshCachedGroupAttributes({ groupID: n, remoteMainSequence: a, groupAttributeList: s, operationType: "init" }), u.setNetworkType(t._groupModule.getNetworkType()).end(), Gi.log("".concat(t._className, ".initGroupAttributes ok. groupID:").concat(n)), B_({ groupAttributes: o });}).catch(function (e) {return t._groupModule.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];u.setError(e, o, r).end();}), Z_(e);});} }, { key: "setGroupAttributes", value: function value(e) {var t = this,n = e.groupID,o = e.groupAttributes,r = this._checkCachedGroupAttributes({ groupID: n, funcName: "setGroupAttributes" });if (!0 !== r) return Z_(r);var a = this._groupAttributesMap.get(n),s = a.remoteMainSequence,i = a.avChatRoomKey,u = a.attributes,c = this._transformGroupAttributes(o);c.forEach(function (e) {var t = e.key;e.sequence = 0, u.has(t) && (e.sequence = u.get(t).sequence);});var l = new Fd(Gg);return l.setMessage("groupID:".concat(n, " mainSequence:").concat(s, " groupAttributes:").concat(JSON.stringify(o))), this._groupModule.request({ protocolName: Wl, requestData: { groupID: n, avChatRoomKey: i, mainSequence: s, groupAttributeList: c } }).then(function (e) {var r = e.data,a = r.mainSequence,s = Jn(r.groupAttributeList);return s.forEach(function (e) {e.value = o[e.key];}), t._refreshCachedGroupAttributes({ groupID: n, remoteMainSequence: a, groupAttributeList: s, operationType: "modify" }), l.setNetworkType(t._groupModule.getNetworkType()).end(), Gi.log("".concat(t._className, ".setGroupAttributes ok. groupID:").concat(n)), B_({ groupAttributes: o });}).catch(function (e) {return t._groupModule.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];l.setError(e, o, r).end();}), Z_(e);});} }, { key: "deleteGroupAttributes", value: function value(e) {var t = this,n = e.groupID,o = e.keyList,r = void 0 === o ? [] : o,a = this._checkCachedGroupAttributes({ groupID: n, funcName: "deleteGroupAttributes" });if (!0 !== a) return Z_(a);var s = this._groupAttributesMap.get(n),i = s.remoteMainSequence,u = s.avChatRoomKey,c = s.attributes,l = Jn(c.keys()),p = Xl,d = "clear",g = { groupID: n, avChatRoomKey: u, mainSequence: i };if (r.length > 0) {var h = [];l = [], p = Jl, d = "delete", r.forEach(function (e) {var t = 0;c.has(e) && (t = c.get(e).sequence, l.push(e)), h.push({ key: e, sequence: t });}), g.groupAttributeList = h;}var f = new Fd(Ug);return f.setMessage("groupID:".concat(n, " mainSequence:").concat(i, " keyList:").concat(r, " protocolName:").concat(p)), this._groupModule.request({ protocolName: p, requestData: g }).then(function (e) {var o = e.data.mainSequence;return t._refreshCachedGroupAttributes({ groupID: n, remoteMainSequence: o, groupAttributeList: r, operationType: d }), f.setNetworkType(t._groupModule.getNetworkType()).end(), Gi.log("".concat(t._className, ".deleteGroupAttributes ok. groupID:").concat(n)), B_({ keyList: l });}).catch(function (e) {return t._groupModule.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];f.setError(e, o, r).end();}), Z_(e);});} }, { key: "getGroupAttributes", value: function value(e) {var t = this,n = e.groupID,o = this._checkCachedGroupAttributes({ groupID: n, funcName: "getGroupAttributes" });if (!0 !== o) return Z_(o);var r = this._groupAttributesMap.get(n),a = r.avChatRoomKey,s = r.lastUpdateTime,i = r.localMainSequence,u = r.remoteMainSequence,c = new Fd(Fg);if (c.setMessage("groupID:".concat(n, " localMainSequence:").concat(i, " remoteMainSequence:").concat(u, " keyList:").concat(e.keyList)), Date.now() - s >= this.CACHE_EXPIRE_TIME || i < u) return this._getGroupAttributes({ groupID: n, avChatRoomKey: a }).then(function (o) {c.setMoreMessage("get attributes from remote. count:".concat(o.length)).setNetworkType(t._groupModule.getNetworkType()).end(), Gi.log("".concat(t._className, ".getGroupAttributes from remote. groupID:").concat(n));var r = t._getLocalGroupAttributes(e);return B_({ groupAttributes: r });}).catch(function (e) {return t._groupModule.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];c.setError(e, o, r).end();}), Z_(e);});c.setMoreMessage("get attributes from cache").setNetworkType(this._groupModule.getNetworkType()).end(), Gi.log("".concat(this._className, ".getGroupAttributes from cache. groupID:").concat(n));var l = this._getLocalGroupAttributes(e);return Q_({ groupAttributes: l });} }, { key: "_getGroupAttributes", value: function value(e) {var t = this;return this._groupModule.request({ protocolName: Ql, requestData: Fn({}, e) }).then(function (n) {var o = n.data,r = o.mainSequence,a = o.groupAttributeList,s = Jn(a);return Gi.log("".concat(t._className, "._getGroupAttributes ok. groupID:").concat(e.groupID)), t._refreshCachedGroupAttributes({ groupID: e.groupID, remoteMainSequence: r, groupAttributeList: s, operationType: "get" }), a;}).catch(function (e) {return Z_(e);});} }, { key: "_getLocalGroupAttributes", value: function value(e) {var t = e.groupID,n = e.keyList,o = void 0 === n ? [] : n,r = {};if (!this._groupAttributesMap.has(t)) return r;var a = this._groupAttributesMap.get(t).attributes;if (o.length > 0) o.forEach(function (e) {a.has(e) && (r[e] = a.get(e).value);});else {var s,i = no(a.keys());try {for (i.s(); !(s = i.n()).done;) {var u = s.value;r[u] = a.get(u).value;}} catch (c) {i.e(c);} finally {i.f();}}return r;} }, { key: "_refreshCachedGroupAttributes", value: function value(e) {var t = e.groupID,n = e.remoteMainSequence,o = e.groupAttributeList,r = e.operationType;if (this._groupAttributesMap.has(t)) {var a = this._groupAttributesMap.get(t),s = a.localMainSequence;if ("get" === r || n - s == 1) a.remoteMainSequence = n, a.localMainSequence = n, a.lastUpdateTime = Date.now(), this._updateCachedAttributes({ groupAttributes: a, groupAttributeList: o, operationType: r });else {if (s === n) return;a.remoteMainSequence = n;}this._groupAttributesMap.set(t, a);var i = "operationType:".concat(r, " localMainSequence:").concat(s, " remoteMainSequence:").concat(n);Gi.log("".concat(this._className, "._refreshCachedGroupAttributes. ").concat(i));}} }, { key: "_updateCachedAttributes", value: function value(e) {var t = e.groupAttributes,n = e.groupAttributeList,o = e.operationType;"clear" !== o ? "delete" !== o ? ("init" === o && t.attributes.clear(), n.forEach(function (e) {var n = e.key,o = e.value,r = e.sequence;t.attributes.set(n, { value: o, sequence: r });})) : n.forEach(function (e) {t.attributes.delete(e);}) : t.attributes.clear();} }, { key: "_checkCachedGroupAttributes", value: function value(e) {var t = e.groupID,n = e.funcName;if (this._groupModule.hasLocalGroup(t) && this._groupModule.getLocalGroupProfile(t).type !== ro.GRP_AVCHATROOM) {return Gi.warn("".concat(this._className, "._checkCachedGroupAttributes. ").concat("非直播群不能使用群属性 API")), new W_({ code: fp.CANNOT_USE_GRP_ATTR_NOT_AVCHATROOM, message: "非直播群不能使用群属性 API" });}var o = this._groupAttributesMap.get(t);if (Bi(o)) {var r = "如果 groupID:".concat(t, " 是直播群，使用 ").concat(n, " 前先使用 joinGroup 接口申请加入群组，详细请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#joinGroup");return Gi.warn("".concat(this._className, "._checkCachedGroupAttributes. ").concat(r)), new W_({ code: fp.CANNOT_USE_GRP_ATTR_AVCHATROOM_UNJOIN, message: r });}return !0;} }, { key: "_transformGroupAttributes", value: function value(e) {var t = [];return Object.keys(e).forEach(function (n) {t.push({ key: n, value: e[n] });}), t;} }, { key: "_emitGroupAttributesUpdated", value: function value(e) {var t = this._getLocalGroupAttributes({ groupID: e });this._groupModule.emitOuterEvent(oo.GROUP_ATTRIBUTES_UPDATED, { groupID: e, groupAttributes: t });} }, { key: "reset", value: function value() {this._groupAttributesMap.clear(), this.CACHE_EXPIRE_TIME = 3e4;} }]), e;}(),wm = function () {function e(t) {bn(this, e);var n = t.groupModule,o = t.groupID,r = t.onInit,a = t.onSuccess,s = t.onFail;this._groupModule = n, this._className = "Polling", this._onInit = r, this._onSuccess = a, this._onFail = s, this._groupID = o, this._timeoutID = -1, this._isRunning = !1, this._pollingInterval = 0, this.MAX_POLLING_INTERVAL = 2e3;}return Pn(e, [{ key: "start", value: function value() {Gi.log("".concat(this._className, ".start")), this._isRunning = !0, this._request();} }, { key: "isRunning", value: function value() {return this._isRunning;} }, { key: "_request", value: function value() {var e = this,t = this._onInit(this._groupID),n = Hl;this._groupModule.isLoggedIn() || (n = jl), this._groupModule.request({ protocolName: n, requestData: t }).then(function (t) {e._onSuccess(e._groupID, t), e.isRunning() && (clearTimeout(e._timeoutID), e._timeoutID = setTimeout(e._request.bind(e), 0));}).catch(function (t) {e._onFail(e._groupID, t), e.isRunning() && (clearTimeout(e._timeoutID), e._timeoutID = setTimeout(e._request.bind(e), e.MAX_POLLING_INTERVAL));});} }, { key: "stop", value: function value() {Gi.log("".concat(this._className, ".stop")), this._timeoutID > 0 && (clearTimeout(this._timeoutID), this._timeoutID = -1, this._pollingInterval = 0), this._isRunning = !1;} }]), e;}(),Pm = { 3: !0, 4: !0, 5: !0, 6: !0 },Gm = function () {function e(t) {bn(this, e), this._groupModule = t, this._className = "AVChatRoomHandler", this._joinedGroupMap = new Map(), this._pollingRequestInfoMap = new Map(), this._pollingInstanceMap = new Map(), this.sequencesLinkedList = new ym(100), this.messageIDLinkedList = new ym(100), this.receivedMessageCount = 0, this._reportMessageStackedCount = 0, this._onlineMemberCountMap = new Map(), this.DEFAULT_EXPIRE_TIME = 60;}return Pn(e, [{ key: "hasJoinedAVChatRoom", value: function value() {return this._joinedGroupMap.size > 0;} }, { key: "checkJoinedAVChatRoomByID", value: function value(e) {return this._joinedGroupMap.has(e);} }, { key: "getJoinedAVChatRoom", value: function value() {return this._joinedGroupMap.size > 0 ? Jn(this._joinedGroupMap.keys()) : null;} }, { key: "_updateRequestData", value: function value(e) {return Fn({}, this._pollingRequestInfoMap.get(e));} }, { key: "_handleSuccess", value: function value(e, t) {var n = t.data,o = n.key,r = n.nextSeq,a = n.rspMsgList;if (0 !== n.errorCode) {var s = this._pollingRequestInfoMap.get(e),i = new Fd(zg),u = s ? "".concat(s.key, "-").concat(s.startSeq) : "requestInfo is undefined";i.setMessage("".concat(e, "-").concat(u, "-").concat(t.errorInfo)).setCode(t.errorCode).setNetworkType(this._groupModule.getNetworkType()).end(!0);} else {if (!this.checkJoinedAVChatRoomByID(e)) return;qi(o) && Fi(r) && this._pollingRequestInfoMap.set(e, { key: o, startSeq: r }), Ki(a) && a.length > 0 && (a.forEach(function (e) {e.to = e.groupID;}), this.onMessage(a));}} }, { key: "_handleFailure", value: function value(e, t) {} }, { key: "onMessage", value: function value(e) {if (Ki(e) && 0 !== e.length) {var t = null,n = [],o = this._getModule(Bc),r = e.length;r > 1 && e.sort(function (e, t) {return e.sequence - t.sequence;});for (var a = this._getModule(Hc), s = 0; s < r; s++) {if (Pm[e[s].event]) {this.receivedMessageCount += 1, t = this.packMessage(e[s], e[s].event);var i = 1 === e[s].isModified;if ((a.isUnlimitedAVChatRoom() || !this.sequencesLinkedList.has(t.sequence)) && !this.messageIDLinkedList.has(t.ID)) {var u = t.conversationID;if (this.receivedMessageCount % 40 == 0 && this._getModule(el).detectMessageLoss(u, this.sequencesLinkedList.data()), null !== this.sequencesLinkedList.tail()) {var c = this.sequencesLinkedList.tail().value,l = t.sequence - c;l > 1 && l <= 20 ? this._getModule(el).onMessageMaybeLost(u, c + 1, l - 1) : l < -1 && l >= -20 && this._getModule(el).onMessageMaybeLost(u, t.sequence + 1, Math.abs(l) - 1);}this.sequencesLinkedList.set(t.sequence), this.messageIDLinkedList.set(t.ID);var p = !1;if (this._isMessageSentByCurrentInstance(t) ? i && (p = !0, t.isModified = i, o.updateMessageIsModifiedProperty(t)) : p = !0, p) {if (t.conversationType, ro.CONV_SYSTEM, t.conversationType !== ro.CONV_SYSTEM) {var d = this._getModule(ol),g = t.conversationID.replace(ro.CONV_GROUP, "");this._pollingInstanceMap.has(g) ? d.addMessageSequence({ key: wd, message: t }) : (t.type !== ro.MSG_GRP_TIP && d.addMessageDelay({ currentTime: Date.now(), time: t.time }), d.addMessageSequence({ key: bd, message: t }));}n.push(t);}}} else Gi.warn("".concat(this._className, ".onMessage 未处理的 event 类型: ").concat(e[s].event));}if (0 !== n.length) {this._groupModule.filterModifiedMessage(n);var h = this.packConversationOption(n);if (h.length > 0) this._getModule(Bc).onNewMessage({ conversationOptionsList: h, isInstantMessage: !0 });Gi.debug("".concat(this._className, ".onMessage count:").concat(n.length)), this._checkMessageStacked(n);var f = this._groupModule.filterUnmodifiedMessage(n);f.length > 0 && this._groupModule.emitOuterEvent(oo.MESSAGE_RECEIVED, f), n.length = 0;}}} }, { key: "_checkMessageStacked", value: function value(e) {var t = e.length;t >= 100 && (Gi.warn("".concat(this._className, "._checkMessageStacked 直播群消息堆积数:").concat(e.length, '！可能会导致微信小程序渲染时遇到 "Dom limit exceeded" 的错误，建议接入侧此时只渲染最近的10条消息')), this._reportMessageStackedCount < 5 && (new Fd(Jg).setNetworkType(this._groupModule.getNetworkType()).setMessage("count:".concat(t, " groupID:").concat(Jn(this._joinedGroupMap.keys()))).setLevel("warning").end(), this._reportMessageStackedCount += 1));} }, { key: "_isMessageSentByCurrentInstance", value: function value(e) {return !!this._getModule(Bc).isMessageSentByCurrentInstance(e);} }, { key: "packMessage", value: function value(e, t) {e.currentUser = this._groupModule.getMyUserID(), e.conversationType = 5 === t ? ro.CONV_SYSTEM : ro.CONV_GROUP, e.isSystemMessage = !!e.isSystemMessage;var n = new K_(e),o = this.packElements(e, t);return n.setElement(o), n;} }, { key: "packElements", value: function value(e, t) {return 4 === t || 6 === t ? (this._updateMemberCountByGroupTips(e), this._onGroupAttributesUpdated(e), { type: ro.MSG_GRP_TIP, content: Fn({}, e.elements, { groupProfile: e.groupProfile }) }) : 5 === t ? { type: ro.MSG_GRP_SYS_NOTICE, content: Fn({}, e.elements, { groupProfile: e.groupProfile }) } : this._getModule(zc).parseElements(e.elements, e.from);} }, { key: "packConversationOption", value: function value(e) {for (var t = new Map(), n = 0; n < e.length; n++) {var o = e[n],r = o.conversationID;if (t.has(r)) {var a = t.get(r);a.lastMessage = o, "in" === o.flow && a.unreadCount++;} else t.set(r, { conversationID: o.conversationID, unreadCount: "out" === o.flow ? 0 : 1, type: o.conversationType, subType: o.conversationSubType, lastMessage: o });}return Jn(t.values());} }, { key: "_updateMemberCountByGroupTips", value: function value(e) {var t = e.groupProfile.groupID,n = e.elements.onlineMemberInfo,o = void 0 === n ? void 0 : n;if (!Du(o)) {var r = o.onlineMemberNum,a = void 0 === r ? 0 : r,s = o.expireTime,i = void 0 === s ? this.DEFAULT_EXPIRE_TIME : s,u = this._onlineMemberCountMap.get(t) || {},c = Date.now();Du(u) ? Object.assign(u, { lastReqTime: 0, lastSyncTime: 0, latestUpdateTime: c, memberCount: a, expireTime: i }) : (u.latestUpdateTime = c, u.memberCount = a), Gi.debug("".concat(this._className, "._updateMemberCountByGroupTips info:"), u), this._onlineMemberCountMap.set(t, u);}} }, { key: "start", value: function value(e) {if (this._pollingInstanceMap.has(e)) {var t = this._pollingInstanceMap.get(e);t.isRunning() || t.start();} else {var n = new wm({ groupModule: this._groupModule, groupID: e, onInit: this._updateRequestData.bind(this), onSuccess: this._handleSuccess.bind(this), onFail: this._handleFailure.bind(this) });n.start(), this._pollingInstanceMap.set(e, n), Gi.log("".concat(this._className, ".start groupID:").concat(e));}} }, { key: "handleJoinResult", value: function value(e) {var t = this;return this._preCheck().then(function () {var n = e.longPollingKey,o = e.group,r = o.groupID;return t._joinedGroupMap.set(r, o), t._groupModule.updateGroupMap([o]), t._groupModule.deleteUnjoinedAVChatRoom(r), t._groupModule.emitGroupListUpdate(!0, !1), Bi(n) ? Q_({ status: y_, group: o }) : Promise.resolve();});} }, { key: "startRunLoop", value: function value(e) {var t = this;return this.handleJoinResult(e).then(function () {var n = e.longPollingKey,o = e.group,r = o.groupID;return t._pollingRequestInfoMap.set(r, { key: n, startSeq: 0 }), t.start(r), t._groupModule.isLoggedIn() ? Q_({ status: y_, group: o }) : Q_({ status: y_ });});} }, { key: "_preCheck", value: function value() {if (this._getModule(Hc).isUnlimitedAVChatRoom()) return Promise.resolve();if (!this.hasJoinedAVChatRoom()) return Promise.resolve();var e = Wn(this._joinedGroupMap.entries().next().value, 2),t = e[0],n = e[1];if (this._groupModule.isLoggedIn()) {if (!(n.selfInfo.role === ro.GRP_MBR_ROLE_OWNER || n.ownerID === this._groupModule.getMyUserID())) return this._groupModule.quitGroup(t);this._groupModule.deleteLocalGroupAndConversation(t);} else this._groupModule.deleteLocalGroupAndConversation(t);return this.reset(t), Promise.resolve();} }, { key: "joinWithoutAuth", value: function value(e) {var t = this,n = e.groupID,o = "".concat(this._className, ".joinWithoutAuth"),r = new Fd(wg);return this._groupModule.request({ protocolName: bl, requestData: e }).then(function (e) {var a = e.data.longPollingKey;if (r.setNetworkType(t._groupModule.getNetworkType()).setMessage("groupID:".concat(n, " longPollingKey:").concat(a)).end(!0), Bi(a)) return Z_(new W_({ code: fp.CANNOT_JOIN_NON_AVCHATROOM_WITHOUT_LOGIN, message: ad }));Gi.log("".concat(o, " ok. groupID:").concat(n)), t._getModule(Bc).setCompleted("".concat(ro.CONV_GROUP).concat(n));var s = new Sm({ groupID: n });return t.startRunLoop({ group: s, longPollingKey: a }), B_({ status: y_ });}).catch(function (e) {return Gi.error("".concat(o, " failed. groupID:").concat(n, " error:"), e), t._groupModule.probeNetwork().then(function (t) {var o = Wn(t, 2),a = o[0],s = o[1];r.setError(e, a, s).setMessage("groupID:".concat(n)).end(!0);}), Z_(e);}).finally(function () {t._groupModule.getModule($c).reportAtOnce();});} }, { key: "getGroupOnlineMemberCount", value: function value(e) {var t = this._onlineMemberCountMap.get(e) || {},n = Date.now();return Du(t) || n - t.lastSyncTime > 1e3 * t.expireTime && n - t.latestUpdateTime > 1e4 && n - t.lastReqTime > 3e3 ? (t.lastReqTime = n, this._onlineMemberCountMap.set(e, t), this._getGroupOnlineMemberCount(e).then(function (e) {return B_({ memberCount: e.memberCount });}).catch(function (e) {return Z_(e);})) : Q_({ memberCount: t.memberCount });} }, { key: "_getGroupOnlineMemberCount", value: function value(e) {var t = this,n = "".concat(this._className, "._getGroupOnlineMemberCount");return this._groupModule.request({ protocolName: $l, requestData: { groupID: e } }).then(function (o) {var r = t._onlineMemberCountMap.get(e) || {},a = o.data,s = a.onlineMemberNum,i = void 0 === s ? 0 : s,u = a.expireTime,c = void 0 === u ? t.DEFAULT_EXPIRE_TIME : u;Gi.log("".concat(n, " ok. groupID:").concat(e, " memberCount:").concat(i, " expireTime:").concat(c));var l = Date.now();return Du(r) && (r.lastReqTime = l), t._onlineMemberCountMap.set(e, Object.assign(r, { lastSyncTime: l, latestUpdateTime: l, memberCount: i, expireTime: c })), { memberCount: i };}).catch(function (o) {return Gi.warn("".concat(n, " failed. error:"), o), new Fd(Yg).setCode(o.code).setMessage("groupID:".concat(e, " error:").concat(JSON.stringify(o))).setNetworkType(t._groupModule.getNetworkType()).end(), Promise.reject(o);});} }, { key: "_onGroupAttributesUpdated", value: function value(e) {var t = e.groupProfile.groupID,n = e.elements,o = n.operationType,r = n.newGroupProfile;if (6 === o) {var a = (void 0 === r ? void 0 : r).groupAttributeOption;Bi(a) || this._groupModule.onGroupAttributesUpdated({ groupID: t, groupAttributeOption: a });}} }, { key: "_getModule", value: function value(e) {return this._groupModule.getModule(e);} }, { key: "reset", value: function value(e) {if (e) {Gi.log("".concat(this._className, ".reset groupID:").concat(e));var t = this._pollingInstanceMap.get(e);t && t.stop(), this._pollingInstanceMap.delete(e), this._joinedGroupMap.delete(e), this._pollingRequestInfoMap.delete(e), this._onlineMemberCountMap.delete(e);} else {Gi.log("".concat(this._className, ".reset all"));var n,o = no(this._pollingInstanceMap.values());try {for (o.s(); !(n = o.n()).done;) {n.value.stop();}} catch (r) {o.e(r);} finally {o.f();}this._pollingInstanceMap.clear(), this._joinedGroupMap.clear(), this._pollingRequestInfoMap.clear(), this._onlineMemberCountMap.clear();}this.sequencesLinkedList.reset(), this.messageIDLinkedList.reset(), this.receivedMessageCount = 0, this._reportMessageStackedCount = 0;} }]), e;}(),Um = 1,Fm = 15,qm = function () {function e(t) {bn(this, e), this._groupModule = t, this._className = "GroupSystemNoticeHandler", this.pendencyMap = new Map();}return Pn(e, [{ key: "onNewGroupSystemNotice", value: function value(e) {var t = e.dataList,n = e.isSyncingEnded,o = e.isInstantMessage;Gi.debug("".concat(this._className, ".onReceiveSystemNotice count:").concat(t.length));var r = this.newSystemNoticeStoredAndSummary({ notifiesList: t, isInstantMessage: o }),a = r.eventDataList,s = r.result;a.length > 0 && (this._groupModule.getModule(Bc).onNewMessage({ conversationOptionsList: a, isInstantMessage: o }), this._onReceivedGroupSystemNotice({ result: s, isInstantMessage: o }));o ? s.length > 0 && this._groupModule.emitOuterEvent(oo.MESSAGE_RECEIVED, s) : !0 === n && this._clearGroupSystemNotice();} }, { key: "newSystemNoticeStoredAndSummary", value: function value(e) {var t = e.notifiesList,n = e.isInstantMessage,o = null,r = t.length,a = 0,s = [],i = { conversationID: ro.CONV_SYSTEM, unreadCount: 0, type: ro.CONV_SYSTEM, subType: null, lastMessage: null };for (a = 0; a < r; a++) {var u = t[a];if (u.elements.operationType !== Fm) u.currentUser = this._groupModule.getMyUserID(), u.conversationType = ro.CONV_SYSTEM, u.conversationID = ro.CONV_SYSTEM, (o = new K_(u)).setElement({ type: ro.MSG_GRP_SYS_NOTICE, content: Fn({}, u.elements, { groupProfile: u.groupProfile }) }), o.isSystemMessage = !0, (1 === o.sequence && 1 === o.random || 2 === o.sequence && 2 === o.random) && (o.sequence = eu(), o.random = eu(), o.generateMessageID(u.currentUser), Gi.log("".concat(this._className, ".newSystemNoticeStoredAndSummary sequence and random maybe duplicated, regenerate. ID:").concat(o.ID))), this._groupModule.getModule(Bc).pushIntoNoticeResult(s, o) && (n ? i.unreadCount++ : o.setIsRead(!0), i.subType = o.conversationSubType);}return i.lastMessage = s[s.length - 1], { eventDataList: s.length > 0 ? [i] : [], result: s };} }, { key: "_clearGroupSystemNotice", value: function value() {var e = this;this.getPendencyList().then(function (t) {t.forEach(function (t) {e.pendencyMap.set("".concat(t.from, "_").concat(t.groupID, "_").concat(t.to), t);});var n = e._groupModule.getModule(Bc).getLocalMessageList(ro.CONV_SYSTEM),o = [];n.forEach(function (t) {var n = t.payload,r = n.operatorID,a = n.operationType,s = n.groupProfile;if (a === Um) {var i = "".concat(r, "_").concat(s.groupID, "_").concat(s.to),u = e.pendencyMap.get(i);u && Fi(u.handled) && 0 !== u.handled && o.push(t);}}), e.deleteGroupSystemNotice({ messageList: o });});} }, { key: "deleteGroupSystemNotice", value: function value(e) {var t = this,n = "".concat(this._className, ".deleteGroupSystemNotice");return Ki(e.messageList) && 0 !== e.messageList.length ? (Gi.log("".concat(n) + e.messageList.map(function (e) {return e.ID;})), this._groupModule.request({ protocolName: Bl, requestData: { messageListToDelete: e.messageList.map(function (e) {return { from: ro.CONV_SYSTEM, messageSeq: e.clientSequence, messageRandom: e.random };}) } }).then(function () {Gi.log("".concat(n, " ok"));var o = t._groupModule.getModule(Bc);return e.messageList.forEach(function (e) {o.deleteLocalMessage(e);}), B_();}).catch(function (e) {return Gi.error("".concat(n, " error:"), e), Z_(e);})) : Q_();} }, { key: "getPendencyList", value: function value(e) {var t = this;return this._groupModule.request({ protocolName: Kl, requestData: { startTime: e && e.startTime ? e.startTime : 0, limit: e && e.limit ? e.limit : 10, handleAccount: this._groupModule.getMyUserID() } }).then(function (e) {var n = e.data.pendencyList;return 0 !== e.data.nextStartTime ? t.getPendencyList({ startTime: e.data.nextStartTime }).then(function (e) {return [].concat(Jn(n), Jn(e));}) : n;});} }, { key: "_onReceivedGroupSystemNotice", value: function value(e) {var t = this,n = e.result;e.isInstantMessage && n.forEach(function (e) {switch (e.payload.operationType) {case 1:break;case 2:t._onApplyGroupRequestAgreed(e);break;case 3:break;case 4:t._onMemberKicked(e);break;case 5:t._onGroupDismissed(e);break;case 6:break;case 7:t._onInviteGroup(e);break;case 8:t._onQuitGroup(e);break;case 9:t._onSetManager(e);break;case 10:t._onDeleteManager(e);}});} }, { key: "_onApplyGroupRequestAgreed", value: function value(e) {var t = this,n = e.payload.groupProfile.groupID;this._groupModule.hasLocalGroup(n) || this._groupModule.getGroupProfile({ groupID: n }).then(function (e) {var n = e.data.group;n && (t._groupModule.updateGroupMap([n]), t._groupModule.emitGroupListUpdate());});} }, { key: "_onMemberKicked", value: function value(e) {var t = e.payload.groupProfile.groupID;this._groupModule.hasLocalGroup(t) && this._groupModule.deleteLocalGroupAndConversation(t);} }, { key: "_onGroupDismissed", value: function value(e) {var t = e.payload.groupProfile.groupID;this._groupModule.hasLocalGroup(t) && this._groupModule.deleteLocalGroupAndConversation(t);var n = this._groupModule._AVChatRoomHandler;n && n.checkJoinedAVChatRoomByID(t) && n.reset(t);} }, { key: "_onInviteGroup", value: function value(e) {var t = this,n = e.payload.groupProfile.groupID;this._groupModule.hasLocalGroup(n) || this._groupModule.getGroupProfile({ groupID: n }).then(function (e) {var n = e.data.group;n && (t._groupModule.updateGroupMap([n]), t._groupModule.emitGroupListUpdate());});} }, { key: "_onQuitGroup", value: function value(e) {var t = e.payload.groupProfile.groupID;this._groupModule.hasLocalGroup(t) && this._groupModule.deleteLocalGroupAndConversation(t);} }, { key: "_onSetManager", value: function value(e) {var t = e.payload.groupProfile,n = t.to,o = t.groupID,r = this._groupModule.getModule(Kc).getLocalGroupMemberInfo(o, n);r && r.updateRole(ro.GRP_MBR_ROLE_ADMIN);} }, { key: "_onDeleteManager", value: function value(e) {var t = e.payload.groupProfile,n = t.to,o = t.groupID,r = this._groupModule.getModule(Kc).getLocalGroupMemberInfo(o, n);r && r.updateRole(ro.GRP_MBR_ROLE_MEMBER);} }, { key: "reset", value: function value() {this.pendencyMap.clear();} }]), e;}(),xm = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "GroupModule", o._commonGroupHandler = null, o._AVChatRoomHandler = null, o._groupSystemNoticeHandler = null, o._commonGroupHandler = new Lm($n(o)), o._groupAttributesHandler = new bm($n(o)), o._AVChatRoomHandler = new Gm($n(o)), o._groupTipsHandler = new Am($n(o)), o._groupSystemNoticeHandler = new qm($n(o)), o.groupMap = new Map(), o._unjoinedAVChatRoomList = new Map(), o;}return Pn(n, [{ key: "onCheckTimer", value: function value(e) {this.isLoggedIn() && (this._commonGroupHandler.onCheckTimer(e), this._groupTipsHandler.onCheckTimer(e));} }, { key: "guardForAVChatRoom", value: function value(e) {var t = this;if (e.conversationType === ro.CONV_GROUP) {var n = e.to;return this.hasLocalGroup(n) ? Q_() : this.getGroupProfile({ groupID: n }).then(function (o) {var r = o.data.group.type;if (Gi.log("".concat(t._className, ".guardForAVChatRoom. groupID:").concat(n, " type:").concat(r)), r === ro.GRP_AVCHATROOM) {var a = "userId:".concat(e.from, " 未加入群 groupID:").concat(n, "。发消息前先使用 joinGroup 接口申请加群，详细请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#joinGroup");return Gi.warn("".concat(t._className, ".guardForAVChatRoom sendMessage not allowed. ").concat(a)), Z_(new W_({ code: fp.MESSAGE_SEND_FAIL, message: a, data: { message: e } }));}return Q_();});}return Q_();} }, { key: "checkJoinedAVChatRoomByID", value: function value(e) {return !!this._AVChatRoomHandler && this._AVChatRoomHandler.checkJoinedAVChatRoomByID(e);} }, { key: "onNewGroupMessage", value: function value(e) {this._commonGroupHandler && this._commonGroupHandler.onNewGroupMessage(e);} }, { key: "updateNextMessageSeq", value: function value(e) {var t = this;Ki(e) && e.forEach(function (e) {var n = e.conversationID.replace(ro.CONV_GROUP, "");t.groupMap.has(n) && (t.groupMap.get(n).nextMessageSeq = e.lastMessage.sequence + 1);});} }, { key: "onNewGroupTips", value: function value(e) {this._groupTipsHandler && this._groupTipsHandler.onNewGroupTips(e);} }, { key: "onGroupMessageRevoked", value: function value(e) {this._commonGroupHandler && this._commonGroupHandler.onGroupMessageRevoked(e);} }, { key: "onNewGroupSystemNotice", value: function value(e) {this._groupSystemNoticeHandler && this._groupSystemNoticeHandler.onNewGroupSystemNotice(e);} }, { key: "onGroupMessageReadNotice", value: function value(e) {var t = this;e.dataList.forEach(function (e) {var n = e.elements.groupMessageReadNotice;if (!Bi(n)) {var o = t.getModule(Bc);n.forEach(function (e) {var n = e.groupID,r = e.lastMessageSeq;Gi.debug("".concat(t._className, ".onGroupMessageReadNotice groupID:").concat(n, " lastMessageSeq:").concat(r));var a = "".concat(ro.CONV_GROUP).concat(n);o.updateIsReadAfterReadReport({ conversationID: a, lastMessageSeq: r }), o.updateUnreadCount(a);});}});} }, { key: "deleteGroupSystemNotice", value: function value(e) {this._groupSystemNoticeHandler && this._groupSystemNoticeHandler.deleteGroupSystemNotice(e);} }, { key: "initGroupMap", value: function value(e) {this.groupMap.set(e.groupID, new Sm(e));} }, { key: "deleteGroup", value: function value(e) {this.groupMap.delete(e);} }, { key: "updateGroupMap", value: function value(e) {var t = this;e.forEach(function (e) {t.groupMap.has(e.groupID) ? t.groupMap.get(e.groupID).updateGroup(e) : t.groupMap.set(e.groupID, new Sm(e));}), this._setStorageGroupList();} }, { key: "getStorageGroupList", value: function value() {return this.getModule(jc).getItem("groupMap");} }, { key: "_setStorageGroupList", value: function value() {var e = this.getLocalGroupList().filter(function (e) {var t = e.type;return !lu(t);}).slice(0, 20).map(function (e) {return { groupID: e.groupID, name: e.name, avatar: e.avatar, type: e.type };});this.getModule(jc).setItem("groupMap", e);} }, { key: "getGroupMap", value: function value() {return this.groupMap;} }, { key: "getLocalGroupList", value: function value() {return Jn(this.groupMap.values());} }, { key: "getLocalGroupProfile", value: function value(e) {return this.groupMap.get(e);} }, { key: "sortLocalGroupList", value: function value() {var e = Jn(this.groupMap).filter(function (e) {var t = Wn(e, 2);t[0];return !Du(t[1].lastMessage);});e.sort(function (e, t) {return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime;}), this.groupMap = new Map(Jn(e));} }, { key: "updateGroupLastMessage", value: function value(e) {this._commonGroupHandler && this._commonGroupHandler.handleUpdateGroupLastMessage(e);} }, { key: "emitGroupListUpdate", value: function value() {var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],n = this.getLocalGroupList();if (e && this.emitOuterEvent(oo.GROUP_LIST_UPDATED, n), t) {var o = JSON.parse(JSON.stringify(n)),r = this.getModule(Bc);r.updateConversationGroupProfile(o);}} }, { key: "getMyNameCardByGroupID", value: function value(e) {var t = this.getLocalGroupProfile(e);return t ? t.selfInfo.nameCard : "";} }, { key: "getGroupList", value: function value(e) {return this._commonGroupHandler ? this._commonGroupHandler.getGroupList(e) : Q_();} }, { key: "getGroupProfile", value: function value(e) {var t = this,n = new Fd(kg),o = "".concat(this._className, ".getGroupProfile"),r = e.groupID,a = e.groupCustomFieldFilter;Gi.log("".concat(o, " groupID:").concat(r));var s = { groupIDList: [r], responseFilter: { groupBaseInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "Owner_Account", "CreateTime", "InfoSeq", "LastInfoTime", "LastMsgTime", "MemberNum", "MaxMemberNum", "ApplyJoinOption", "NextMsgSeq", "ShutUpAllMember"], groupCustomFieldFilter: a } };return this.getGroupProfileAdvance(s).then(function (e) {var a,s = e.data,i = s.successGroupList,u = s.failureGroupList;return Gi.log("".concat(o, " ok")), u.length > 0 ? Z_(u[0]) : (lu(i[0].type) && !t.hasLocalGroup(r) ? a = new Sm(i[0]) : (t.updateGroupMap(i), a = t.getLocalGroupProfile(r)), n.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(r, " type:").concat(a.type, " muteAllMembers:").concat(a.muteAllMembers, " ownerID:").concat(a.ownerID)).end(), a && a.selfInfo && !a.selfInfo.nameCard ? t.updateSelfInfo(a).then(function (e) {return B_({ group: e });}) : B_({ group: a }));}).catch(function (r) {return t.probeNetwork().then(function (t) {var o = Wn(t, 2),a = o[0],s = o[1];n.setError(r, a, s).setMessage("groupID:".concat(e.groupID)).end();}), Gi.error("".concat(o, " failed. error:"), r), Z_(r);});} }, { key: "getGroupProfileAdvance", value: function value(e) {var t = "".concat(this._className, ".getGroupProfileAdvance");return Ki(e.groupIDList) && e.groupIDList.length > 50 && (Gi.warn("".concat(t, " 获取群资料的数量不能超过50个")), e.groupIDList.length = 50), Gi.log("".concat(t, " groupIDList:").concat(e.groupIDList)), this.request({ protocolName: kl, requestData: e }).then(function (e) {Gi.log("".concat(t, " ok"));var n = e.data.groups,o = n.filter(function (e) {return Bi(e.errorCode) || 0 === e.errorCode;}),r = n.filter(function (e) {return e.errorCode && 0 !== e.errorCode;}).map(function (e) {return new W_({ code: e.errorCode, message: e.errorInfo, data: { groupID: e.groupID } });});return B_({ successGroupList: o, failureGroupList: r });}).catch(function (e) {return Gi.error("".concat(t, " failed. error:"), e), Z_(e);});} }, { key: "updateSelfInfo", value: function value(e) {var t = "".concat(this._className, ".updateSelfInfo"),n = e.groupID;return Gi.log("".concat(t, " groupID:").concat(n)), this.getModule(Kc).getGroupMemberProfile({ groupID: n, userIDList: [this.getMyUserID()] }).then(function (n) {var o = n.data.memberList;return Gi.log("".concat(t, " ok")), e && 0 !== o.length && e.updateSelfInfo(o[0]), e;});} }, { key: "createGroup", value: function value(e) {var t = this,n = "".concat(this._className, ".createGroup");if (!["Public", "Private", "ChatRoom", "AVChatRoom"].includes(e.type)) {var o = new W_({ code: fp.ILLEGAL_GROUP_TYPE, message: Xp });return Z_(o);}lu(e.type) && !Bi(e.memberList) && e.memberList.length > 0 && (Gi.warn("".concat(n, " 创建 AVChatRoom 时不能添加群成员，自动忽略该字段")), e.memberList = void 0), cu(e.type) || Bi(e.joinOption) || (Gi.warn("".concat(n, " 创建 Work/Meeting/AVChatRoom 群时不能设置字段 joinOption，自动忽略该字段")), e.joinOption = void 0);var r = new Fd(mg);Gi.log("".concat(n, " options:"), e);var a = [];return this.request({ protocolName: Nl, requestData: Fn({}, e, { ownerID: this.getMyUserID(), webPushFlag: 1 }) }).then(function (o) {var s = o.data,i = s.groupID,u = s.overLimitUserIDList,c = void 0 === u ? [] : u;if (a = c, r.setNetworkType(t.getNetworkType()).setMessage("groupType:".concat(e.type, " groupID:").concat(i, " overLimitUserIDList=").concat(c)).end(), Gi.log("".concat(n, " ok groupID:").concat(i, " overLimitUserIDList:"), c), e.type === ro.GRP_AVCHATROOM) return t.getGroupProfile({ groupID: i });Du(e.memberList) || Du(c) || (e.memberList = e.memberList.filter(function (e) {return -1 === c.indexOf(e.userID);})), t.updateGroupMap([Fn({}, e, { groupID: i })]);var l = t.getModule(Uc),p = l.createCustomMessage({ to: i, conversationType: ro.CONV_GROUP, payload: { data: "group_create", extension: "".concat(t.getMyUserID(), "创建群组") } });return l.sendMessageInstance(p), t.emitGroupListUpdate(), t.getGroupProfile({ groupID: i });}).then(function (e) {var t = e.data.group,n = t.selfInfo,o = n.nameCard,r = n.joinTime;return t.updateSelfInfo({ nameCard: o, joinTime: r, messageRemindType: ro.MSG_REMIND_ACPT_AND_NOTE, role: ro.GRP_MBR_ROLE_OWNER }), B_({ group: t, overLimitUserIDList: a });}).catch(function (o) {return r.setMessage("groupType:".concat(e.type)), t.probeNetwork().then(function (e) {var t = Wn(e, 2),n = t[0],a = t[1];r.setError(o, n, a).end();}), Gi.error("".concat(n, " failed. error:"), o), Z_(o);});} }, { key: "dismissGroup", value: function value(e) {var t = this,n = "".concat(this._className, ".dismissGroup");if (this.hasLocalGroup(e) && this.getLocalGroupProfile(e).type === ro.GRP_WORK) return Z_(new W_({ code: fp.CANNOT_DISMISS_WORK, message: td }));var o = new Fd(Eg);return o.setMessage("groupID:".concat(e)), Gi.log("".concat(n, " groupID:").concat(e)), this.request({ protocolName: Ol, requestData: { groupID: e } }).then(function () {return o.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(n, " ok")), t.deleteLocalGroupAndConversation(e), t.checkJoinedAVChatRoomByID(e) && t._AVChatRoomHandler.reset(e), B_({ groupID: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),r = n[0],a = n[1];o.setError(e, r, a).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "updateGroupProfile", value: function value(e) {var t = this,n = "".concat(this._className, ".updateGroupProfile");!this.hasLocalGroup(e.groupID) || cu(this.getLocalGroupProfile(e.groupID).type) || Bi(e.joinOption) || (Gi.warn("".concat(n, " Work/Meeting/AVChatRoom 群不能设置字段 joinOption，自动忽略该字段")), e.joinOption = void 0), Bi(e.muteAllMembers) || (e.muteAllMembers ? e.muteAllMembers = "On" : e.muteAllMembers = "Off");var o = new Fd(Cg);return o.setMessage(JSON.stringify(e)), Gi.log("".concat(n, " groupID:").concat(e.groupID)), this.request({ protocolName: Ll, requestData: e }).then(function () {(o.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(n, " ok")), t.hasLocalGroup(e.groupID)) && (t.groupMap.get(e.groupID).updateGroup(e), t._setStorageGroupList());return B_({ group: t.groupMap.get(e.groupID) });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),r = n[0],a = n[1];o.setError(e, r, a).end();}), Gi.log("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "joinGroup", value: function value(e) {var t = this,n = e.groupID,o = e.type,r = "".concat(this._className, ".joinGroup");if (o === ro.GRP_WORK) {var a = new W_({ code: fp.CANNOT_JOIN_WORK, message: Qp });return Z_(a);}if (this.deleteUnjoinedAVChatRoom(n), this.hasLocalGroup(n)) {if (!this.isLoggedIn()) return Q_({ status: ro.JOIN_STATUS_ALREADY_IN_GROUP });var s = new Fd(vg);return this.getGroupProfile({ groupID: n }).then(function () {return s.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(n, " joinedStatus:").concat(ro.JOIN_STATUS_ALREADY_IN_GROUP)).end(), Q_({ status: ro.JOIN_STATUS_ALREADY_IN_GROUP });}).catch(function (o) {return s.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(n, " unjoined")).end(), Gi.warn("".concat(r, " ").concat(n, " was unjoined, now join!")), t.groupMap.delete(n), t.applyJoinGroup(e);});}return Gi.log("".concat(r, " groupID:").concat(n)), this.isLoggedIn() ? this.applyJoinGroup(e) : this._AVChatRoomHandler.joinWithoutAuth(e);} }, { key: "applyJoinGroup", value: function value(e) {var t = this,n = "".concat(this._className, ".applyJoinGroup"),o = e.groupID,r = new Fd(vg);return this.request({ protocolName: Rl, requestData: e }).then(function (e) {var a = e.data,s = a.joinedStatus,i = a.longPollingKey,u = a.avChatRoomFlag,c = a.avChatRoomKey,l = "groupID:".concat(o, " joinedStatus:").concat(s, " longPollingKey:").concat(i, " avChatRoomFlag:").concat(u);switch (r.setNetworkType(t.getNetworkType()).setMessage("".concat(l)).end(), Gi.log("".concat(n, " ok. ").concat(l)), s) {case I_:return B_({ status: I_ });case y_:return t.getGroupProfile({ groupID: o }).then(function (e) {var n = e.data.group,r = { status: y_, group: n };return 1 === u ? (t.getModule(Bc).setCompleted("".concat(ro.CONV_GROUP).concat(o)), t._groupAttributesHandler.initGroupAttributesCache({ groupID: o, avChatRoomKey: c }), Bi(i) ? t._AVChatRoomHandler.handleJoinResult({ group: n }) : t._AVChatRoomHandler.startRunLoop({ longPollingKey: i, group: n })) : (t.emitGroupListUpdate(!0, !1), B_(r));});default:var p = new W_({ code: fp.JOIN_GROUP_FAIL, message: od });return Gi.error("".concat(n, " error:"), p), Z_(p);}}).catch(function (o) {return r.setMessage("groupID:".concat(e.groupID)), t.probeNetwork().then(function (e) {var t = Wn(e, 2),n = t[0],a = t[1];r.setError(o, n, a).end();}), Gi.error("".concat(n, " error:"), o), Z_(o);});} }, { key: "quitGroup", value: function value(e) {var t = this,n = "".concat(this._className, ".quitGroup");Gi.log("".concat(n, " groupID:").concat(e));var o = this.checkJoinedAVChatRoomByID(e);if (!o && !this.hasLocalGroup(e)) {var r = new W_({ code: fp.MEMBER_NOT_IN_GROUP, message: nd });return Z_(r);}if (o && !this.isLoggedIn()) return Gi.log("".concat(n, " anonymously ok. groupID:").concat(e)), this.deleteLocalGroupAndConversation(e), this._AVChatRoomHandler.reset(e), Q_({ groupID: e });var a = new Fd(Mg);return a.setMessage("groupID:".concat(e)), this.request({ protocolName: wl, requestData: { groupID: e } }).then(function () {return a.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(n, " ok")), o && t._AVChatRoomHandler.reset(e), t.deleteLocalGroupAndConversation(e), B_({ groupID: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];a.setError(e, o, r).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "searchGroupByID", value: function value(e) {var t = this,n = "".concat(this._className, ".searchGroupByID"),o = { groupIDList: [e] },r = new Fd(yg);return r.setMessage("groupID:".concat(e)), Gi.log("".concat(n, " groupID:").concat(e)), this.request({ protocolName: Pl, requestData: o }).then(function (e) {var o = e.data.groupProfile;if (0 !== o[0].errorCode) throw new W_({ code: o[0].errorCode, message: o[0].errorInfo });return r.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(n, " ok")), B_({ group: new Sm(o[0]) });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],a = n[1];r.setError(e, o, a).end();}), Gi.warn("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "changeGroupOwner", value: function value(e) {var t = this,n = "".concat(this._className, ".changeGroupOwner");if (this.hasLocalGroup(e.groupID) && this.getLocalGroupProfile(e.groupID).type === ro.GRP_AVCHATROOM) return Z_(new W_({ code: fp.CANNOT_CHANGE_OWNER_IN_AVCHATROOM, message: Zp }));if (e.newOwnerID === this.getMyUserID()) return Z_(new W_({ code: fp.CANNOT_CHANGE_OWNER_TO_SELF, message: ed }));var o = new Fd(Ig);return o.setMessage("groupID:".concat(e.groupID, " newOwnerID:").concat(e.newOwnerID)), Gi.log("".concat(n, " groupID:").concat(e.groupID)), this.request({ protocolName: Gl, requestData: e }).then(function () {o.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(n, " ok"));var r = e.groupID,a = e.newOwnerID;t.groupMap.get(r).ownerID = a;var s = t.getModule(Kc).getLocalGroupMemberList(r);if (s instanceof Map) {var i = s.get(t.getMyUserID());Bi(i) || (i.updateRole("Member"), t.groupMap.get(r).selfInfo.role = "Member");var u = s.get(a);Bi(u) || u.updateRole("Owner");}return t.emitGroupListUpdate(!0, !1), B_({ group: t.groupMap.get(r) });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),r = n[0],a = n[1];o.setError(e, r, a).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "handleGroupApplication", value: function value(e) {var t = this,n = "".concat(this._className, ".handleGroupApplication"),o = e.message.payload,r = o.groupProfile.groupID,a = o.authentication,s = o.messageKey,i = o.operatorID,u = new Fd(Sg);return u.setMessage("groupID:".concat(r)), Gi.log("".concat(n, " groupID:").concat(r)), this.request({ protocolName: Ul, requestData: Fn({}, e, { applicant: i, groupID: r, authentication: a, messageKey: s }) }).then(function () {return u.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(n, " ok")), t._groupSystemNoticeHandler.deleteGroupSystemNotice({ messageList: [e.message] }), B_({ group: t.getLocalGroupProfile(r) });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];u.setError(e, o, r).end();}), Gi.error("".concat(n, " failed. error"), e), Z_(e);});} }, { key: "handleGroupInvitation", value: function value(e) {var t = this,n = "".concat(this._className, ".handleGroupInvitation"),o = e.message.payload,r = o.groupProfile.groupID,a = o.authentication,s = o.messageKey,i = o.operatorID,u = e.handleAction,c = new Fd(Tg);return c.setMessage("groupID:".concat(r, " inviter:").concat(i, " handleAction:").concat(u)), Gi.log("".concat(n, " groupID:").concat(r, " inviter:").concat(i, " handleAction:").concat(u)), this.request({ protocolName: Fl, requestData: Fn({}, e, { inviter: i, groupID: r, authentication: a, messageKey: s }) }).then(function () {return c.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(n, " ok")), t._groupSystemNoticeHandler.deleteGroupSystemNotice({ messageList: [e.message] }), B_({ group: t.getLocalGroupProfile(r) });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];c.setError(e, o, r).end();}), Gi.error("".concat(n, " failed. error"), e), Z_(e);});} }, { key: "getGroupOnlineMemberCount", value: function value(e) {return this._AVChatRoomHandler ? this._AVChatRoomHandler.checkJoinedAVChatRoomByID(e) ? this._AVChatRoomHandler.getGroupOnlineMemberCount(e) : Q_({ memberCount: 0 }) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "hasLocalGroup", value: function value(e) {return this.groupMap.has(e);} }, { key: "deleteLocalGroupAndConversation", value: function value(e) {this._deleteLocalGroup(e), this.getModule(Bc).deleteLocalConversation("GROUP".concat(e)), this.emitGroupListUpdate(!0, !1);} }, { key: "_deleteLocalGroup", value: function value(e) {this.groupMap.delete(e), this.getModule(Kc).deleteGroupMemberList(e), this._setStorageGroupList();} }, { key: "sendMessage", value: function value(e, t) {var n = this.createGroupMessagePack(e, t);return this.request(n);} }, { key: "createGroupMessagePack", value: function value(e, t) {var n = null;t && t.offlinePushInfo && (n = t.offlinePushInfo);var o = "";qi(e.cloudCustomData) && e.cloudCustomData.length > 0 && (o = e.cloudCustomData);var r = e.getGroupAtInfoList();return { protocolName: pl, tjgID: this.generateTjgID(e), requestData: { fromAccount: this.getMyUserID(), groupID: e.to, msgBody: e.getElements(), cloudCustomData: o, random: e.random, priority: e.priority, clientSequence: e.clientSequence, groupAtInfo: e.type !== ro.MSG_TEXT || Du(r) ? void 0 : r, onlineOnlyFlag: this.isOnlineMessage(e, t) ? 1 : 0, offlinePushInfo: n ? { pushFlag: !0 === n.disablePush ? 1 : 0, title: n.title || "", desc: n.description || "", ext: n.extension || "", apnsInfo: { badgeMode: !0 === n.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: n.androidOPPOChannelID || "" } } : void 0 } };} }, { key: "revokeMessage", value: function value(e) {return this.request({ protocolName: ql, requestData: { to: e.to, msgSeqList: [{ msgSeq: e.sequence }] } });} }, { key: "deleteMessage", value: function value(e) {var t = e.to,n = e.keyList;return Gi.log("".concat(this._className, ".deleteMessage groupID:").concat(t, " count:").concat(n.length)), this.request({ protocolName: Yl, requestData: { groupID: t, deleter: this.getMyUserID(), keyList: n } });} }, { key: "getRoamingMessage", value: function value(e) {var t = this,n = "".concat(this._className, ".getRoamingMessage"),o = new Fd(eg),r = 0;return this._computeLastSequence(e).then(function (n) {return r = n, Gi.log("".concat(t._className, ".getRoamingMessage groupID:").concat(e.groupID, " lastSequence:").concat(r)), t.request({ protocolName: Vl, requestData: { groupID: e.groupID, count: 21, sequence: r } });}).then(function (a) {var s = a.data,i = s.messageList,u = s.complete;Bi(i) ? Gi.log("".concat(n, " ok. complete:").concat(u, " but messageList is undefined!")) : Gi.log("".concat(n, " ok. complete:").concat(u, " count:").concat(i.length)), o.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(e.groupID, " lastSequence:").concat(r, " complete:").concat(u, " count:").concat(i ? i.length : "undefined")).end();var c = "GROUP".concat(e.groupID),l = t.getModule(Bc);if (2 === u || Du(i)) return l.setCompleted(c), [];var p = l.storeRoamingMessage(i, c);return l.updateIsRead(c), l.patchConversationLastMessage(c), p;}).catch(function (a) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),s = n[0],i = n[1];o.setError(a, s, i).setMessage("groupID:".concat(e.groupID, " lastSequence:").concat(r)).end();}), Gi.warn("".concat(n, " failed. error:"), a), Z_(a);});} }, { key: "setMessageRead", value: function value(e) {var t = this,n = e.conversationID,o = e.lastMessageSeq,r = "".concat(this._className, ".setMessageRead");Gi.log("".concat(r, " conversationID:").concat(n, " lastMessageSeq:").concat(o)), Fi(o) || Gi.warn("".concat(r, " 请勿修改 Conversation.lastMessage.lastSequence，否则可能会导致已读上报结果不准确"));var a = new Fd(rg);return a.setMessage("".concat(n, "-").concat(o)), this.request({ protocolName: xl, requestData: { groupID: n.replace("GROUP", ""), messageReadSeq: o } }).then(function () {a.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(r, " ok."));var e = t.getModule(Bc);return e.updateIsReadAfterReadReport({ conversationID: n, lastMessageSeq: o }), e.updateUnreadCount(n), B_();}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];a.setError(e, o, r).end();}), Gi.log("".concat(r, " failed. error:"), e), Z_(e);});} }, { key: "_computeLastSequence", value: function value(e) {return e.sequence > 0 ? Promise.resolve(e.sequence) : this.getGroupLastSequence(e.groupID);} }, { key: "getGroupLastSequence", value: function value(e) {var t = this,n = "".concat(this._className, ".getGroupLastSequence"),o = new Fd(Og),r = 0,a = "";if (this.hasLocalGroup(e)) {var s = this.getLocalGroupProfile(e),i = s.lastMessage;if (i.lastSequence > 0 && !1 === i.onlineOnlyFlag) return r = i.lastSequence, a = "got lastSequence:".concat(r, " from local group profile[lastMessage.lastSequence]. groupID:").concat(e), Gi.log("".concat(n, " ").concat(a)), o.setNetworkType(this.getNetworkType()).setMessage("".concat(a)).end(), Promise.resolve(r);if (s.nextMessageSeq > 1) return r = s.nextMessageSeq - 1, a = "got lastSequence:".concat(r, " from local group profile[nextMessageSeq]. groupID:").concat(e), Gi.log("".concat(n, " ").concat(a)), o.setNetworkType(this.getNetworkType()).setMessage("".concat(a)).end(), Promise.resolve(r);}var u = "GROUP".concat(e),c = this.getModule(Bc).getLocalConversation(u);if (c && c.lastMessage.lastSequence && !1 === c.lastMessage.onlineOnlyFlag) return r = c.lastMessage.lastSequence, a = "got lastSequence:".concat(r, " from local conversation profile[lastMessage.lastSequence]. groupID:").concat(e), Gi.log("".concat(n, " ").concat(a)), o.setNetworkType(this.getNetworkType()).setMessage("".concat(a)).end(), Promise.resolve(r);var l = { groupIDList: [e], responseFilter: { groupBaseInfoFilter: ["NextMsgSeq"] } };return this.getGroupProfileAdvance(l).then(function (s) {var i = s.data.successGroupList;return Du(i) ? Gi.log("".concat(n, " successGroupList is empty. groupID:").concat(e)) : (r = i[0].nextMessageSeq - 1, a = "got lastSequence:".concat(r, " from getGroupProfileAdvance. groupID:").concat(e), Gi.log("".concat(n, " ").concat(a))), o.setNetworkType(t.getNetworkType()).setMessage("".concat(a)).end(), r;}).catch(function (r) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),a = n[0],s = n[1];o.setError(r, a, s).setMessage("get lastSequence failed from getGroupProfileAdvance. groupID:".concat(e)).end();}), Gi.warn("".concat(n, " failed. error:"), r), Z_(r);});} }, { key: "isMessageFromAVChatroom", value: function value(e) {return !!this._AVChatRoomHandler && this._AVChatRoomHandler.checkJoinedAVChatRoomByID(e);} }, { key: "hasJoinedAVChatRoom", value: function value() {return this._AVChatRoomHandler ? this._AVChatRoomHandler.hasJoinedAVChatRoom() : 0;} }, { key: "getJoinedAVChatRoom", value: function value() {return this._AVChatRoomHandler ? this._AVChatRoomHandler.getJoinedAVChatRoom() : [];} }, { key: "isOnlineMessage", value: function value(e, t) {return !(!this._canIUseOnlineOnlyFlag(e) || !t || !0 !== t.onlineUserOnly);} }, { key: "_canIUseOnlineOnlyFlag", value: function value(e) {var t = this.getJoinedAVChatRoom();return !t || !t.includes(e.to) || e.conversationType !== ro.CONV_GROUP;} }, { key: "deleteLocalGroupMembers", value: function value(e, t) {this.getModule(Kc).deleteLocalGroupMembers(e, t);} }, { key: "onAVChatRoomMessage", value: function value(e) {this._AVChatRoomHandler && this._AVChatRoomHandler.onMessage(e);} }, { key: "getGroupSimplifiedInfo", value: function value(e) {var t = this,n = new Fd(bg),o = { groupIDList: [e], responseFilter: { groupBaseInfoFilter: ["Type", "Name"] } };return this.getGroupProfileAdvance(o).then(function (o) {var r = o.data.successGroupList;return n.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(e, " type:").concat(r[0].type)).end(), r[0];}).catch(function (o) {t.probeNetwork().then(function (t) {var r = Wn(t, 2),a = r[0],s = r[1];n.setError(o, a, s).setMessage("groupID:".concat(e)).end();});});} }, { key: "setUnjoinedAVChatRoom", value: function value(e) {this._unjoinedAVChatRoomList.set(e, 1);} }, { key: "deleteUnjoinedAVChatRoom", value: function value(e) {this._unjoinedAVChatRoomList.has(e) && this._unjoinedAVChatRoomList.delete(e);} }, { key: "isUnjoinedAVChatRoom", value: function value(e) {return this._unjoinedAVChatRoomList.has(e);} }, { key: "onGroupAttributesUpdated", value: function value(e) {this._groupAttributesHandler && this._groupAttributesHandler.onGroupAttributesUpdated(e);} }, { key: "updateLocalMainSequenceOnReconnected", value: function value() {this._groupAttributesHandler && this._groupAttributesHandler.updateLocalMainSequenceOnReconnected();} }, { key: "initGroupAttributes", value: function value(e) {return this._groupAttributesHandler.initGroupAttributes(e);} }, { key: "setGroupAttributes", value: function value(e) {return this._groupAttributesHandler.setGroupAttributes(e);} }, { key: "deleteGroupAttributes", value: function value(e) {return this._groupAttributesHandler.deleteGroupAttributes(e);} }, { key: "getGroupAttributes", value: function value(e) {return this._groupAttributesHandler.getGroupAttributes(e);} }, { key: "reset", value: function value() {this.groupMap.clear(), this._unjoinedAVChatRoomList.clear(), this._commonGroupHandler.reset(), this._groupSystemNoticeHandler.reset(), this._groupTipsHandler.reset(), this._AVChatRoomHandler && this._AVChatRoomHandler.reset();} }]), n;}(rl),Vm = function () {function e(t) {bn(this, e), this.userID = "", this.avatar = "", this.nick = "", this.role = "", this.joinTime = "", this.lastSendMsgTime = "", this.nameCard = "", this.muteUntil = 0, this.memberCustomField = [], this._initMember(t);}return Pn(e, [{ key: "_initMember", value: function value(e) {this.updateMember(e);} }, { key: "updateMember", value: function value(e) {var t = [null, void 0, "", 0, NaN];e.memberCustomField && uu(this.memberCustomField, e.memberCustomField), Xi(this, e, ["memberCustomField"], t);} }, { key: "updateRole", value: function value(e) {["Owner", "Admin", "Member"].indexOf(e) < 0 || (this.role = e);} }, { key: "updateMuteUntil", value: function value(e) {Bi(e) || (this.muteUntil = Math.floor((Date.now() + 1e3 * e) / 1e3));} }, { key: "updateNameCard", value: function value(e) {Bi(e) || (this.nameCard = e);} }, { key: "updateMemberCustomField", value: function value(e) {e && uu(this.memberCustomField, e);} }]), e;}(),Km = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "GroupMemberModule", o.groupMemberListMap = new Map(), o.getInnerEmitterInstance().on(lm.PROFILE_UPDATED, o._onProfileUpdated, $n(o)), o;}return Pn(n, [{ key: "_onProfileUpdated", value: function value(e) {for (var t = this, n = e.data, o = function o(e) {var o = n[e];t.groupMemberListMap.forEach(function (e) {e.has(o.userID) && e.get(o.userID).updateMember({ nick: o.nick, avatar: o.avatar });});}, r = 0; r < n.length; r++) {o(r);}} }, { key: "deleteGroupMemberList", value: function value(e) {this.groupMemberListMap.delete(e);} }, { key: "getGroupMemberList", value: function value(e) {var t = this,n = e.groupID,o = e.offset,r = void 0 === o ? 0 : o,a = e.count,s = void 0 === a ? 15 : a,i = "".concat(this._className, ".getGroupMemberList"),u = new Fd(qg);Gi.log("".concat(i, " groupID:").concat(n, " offset:").concat(r, " count:").concat(s));var c = [];return this.request({ protocolName: Zl, requestData: { groupID: n, offset: r, limit: s > 100 ? 100 : s } }).then(function (e) {var o = e.data,r = o.members,a = o.memberNum;if (!Ki(r) || 0 === r.length) return Promise.resolve([]);var s = t.getModule(xc);return s.hasLocalGroup(n) && (s.getLocalGroupProfile(n).memberNum = a), c = t._updateLocalGroupMemberMap(n, r), t.getModule(Fc).getUserProfile({ userIDList: r.map(function (e) {return e.userID;}), tagList: [__.NICK, __.AVATAR] });}).then(function (e) {var o = e.data;if (!Ki(o) || 0 === o.length) return Q_({ memberList: [] });var a = o.map(function (e) {return { userID: e.userID, nick: e.nick, avatar: e.avatar };});return t._updateLocalGroupMemberMap(n, a), u.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(n, " offset:").concat(r, " count:").concat(s)).end(), Gi.log("".concat(i, " ok.")), B_({ memberList: c });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];u.setError(e, o, r).end();}), Gi.error("".concat(i, " failed. error:"), e), Z_(e);});} }, { key: "getGroupMemberProfile", value: function value(e) {var t = this,n = "".concat(this._className, ".getGroupMemberProfile"),o = new Fd(xg);o.setMessage(e.userIDList.length > 5 ? "userIDList.length:".concat(e.userIDList.length) : "userIDList:".concat(e.userIDList)), Gi.log("".concat(n, " groupID:").concat(e.groupID, " userIDList:").concat(e.userIDList.join(","))), e.userIDList.length > 50 && (e.userIDList = e.userIDList.slice(0, 50));var r = e.groupID,a = e.userIDList;return this._getGroupMemberProfileAdvance(Fn({}, e, { userIDList: a })).then(function (e) {var n = e.data.members;return Ki(n) && 0 !== n.length ? (t._updateLocalGroupMemberMap(r, n), t.getModule(Fc).getUserProfile({ userIDList: n.map(function (e) {return e.userID;}), tagList: [__.NICK, __.AVATAR] })) : Q_([]);}).then(function (e) {var n = e.data.map(function (e) {return { userID: e.userID, nick: e.nick, avatar: e.avatar };});t._updateLocalGroupMemberMap(r, n);var s = a.filter(function (e) {return t.hasLocalGroupMember(r, e);}).map(function (e) {return t.getLocalGroupMemberInfo(r, e);});return o.setNetworkType(t.getNetworkType()).end(), B_({ memberList: s });});} }, { key: "addGroupMember", value: function value(e) {var t = this,n = "".concat(this._className, ".addGroupMember"),o = e.groupID,r = this.getModule(xc).getLocalGroupProfile(o),a = r.type,s = new Fd(Vg);if (s.setMessage("groupID:".concat(o, " groupType:").concat(a)), lu(a)) {var i = new W_({ code: fp.CANNOT_ADD_MEMBER_IN_AVCHATROOM, message: rd });return s.setCode(fp.CANNOT_ADD_MEMBER_IN_AVCHATROOM).setError(rd).setNetworkType(this.getNetworkType()).end(), Z_(i);}return e.userIDList = e.userIDList.map(function (e) {return { userID: e };}), Gi.log("".concat(n, " groupID:").concat(o)), this.request({ protocolName: tp, requestData: e }).then(function (o) {var a = o.data.members;Gi.log("".concat(n, " ok"));var i = a.filter(function (e) {return 1 === e.result;}).map(function (e) {return e.userID;}),u = a.filter(function (e) {return 0 === e.result;}).map(function (e) {return e.userID;}),c = a.filter(function (e) {return 2 === e.result;}).map(function (e) {return e.userID;}),l = a.filter(function (e) {return 4 === e.result;}).map(function (e) {return e.userID;}),p = "groupID:".concat(e.groupID, ", ") + "successUserIDList:".concat(i, ", ") + "failureUserIDList:".concat(u, ", ") + "existedUserIDList:".concat(c, ", ") + "overLimitUserIDList:".concat(l);return s.setNetworkType(t.getNetworkType()).setMoreMessage(p).end(), 0 === i.length ? B_({ successUserIDList: i, failureUserIDList: u, existedUserIDList: c, overLimitUserIDList: l }) : (r.memberNum += i.length, B_({ successUserIDList: i, failureUserIDList: u, existedUserIDList: c, overLimitUserIDList: l, group: r }));}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];s.setError(e, o, r).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "deleteGroupMember", value: function value(e) {var t = this,n = "".concat(this._className, ".deleteGroupMember"),o = e.groupID,r = e.userIDList,a = new Fd(Kg),s = "groupID:".concat(o, " ").concat(r.length > 5 ? "userIDList.length:".concat(r.length) : "userIDList:".concat(r));a.setMessage(s), Gi.log("".concat(n, " groupID:").concat(o, " userIDList:"), r);var i = this.getModule(xc).getLocalGroupProfile(o);return lu(i.type) ? Z_(new W_({ code: fp.CANNOT_KICK_MEMBER_IN_AVCHATROOM, message: sd })) : this.request({ protocolName: np, requestData: e }).then(function () {return a.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(n, " ok")), i.memberNum--, t.deleteLocalGroupMembers(o, r), B_({ group: i, userIDList: r });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];a.setError(e, o, r).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "setGroupMemberMuteTime", value: function value(e) {var t = this,n = e.groupID,o = e.userID,r = e.muteTime,a = "".concat(this._className, ".setGroupMemberMuteTime");if (o === this.getMyUserID()) return Z_(new W_({ code: fp.CANNOT_MUTE_SELF, message: pd }));Gi.log("".concat(a, " groupID:").concat(n, " userID:").concat(o));var s = new Fd(Bg);return s.setMessage("groupID:".concat(n, " userID:").concat(o, " muteTime:").concat(r)), this._modifyGroupMemberInfo({ groupID: n, userID: o, muteTime: r }).then(function (e) {s.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(a, " ok"));var o = t.getModule(xc);return B_({ group: o.getLocalGroupProfile(n), member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];s.setError(e, o, r).end();}), Gi.error("".concat(a, " failed. error:"), e), Z_(e);});} }, { key: "setGroupMemberRole", value: function value(e) {var t = this,n = "".concat(this._className, ".setGroupMemberRole"),o = e.groupID,r = e.userID,a = e.role,s = this.getModule(xc).getLocalGroupProfile(o);if (s.selfInfo.role !== ro.GRP_MBR_ROLE_OWNER) return Z_(new W_({ code: fp.NOT_OWNER, message: id }));if ([ro.GRP_WORK, ro.GRP_AVCHATROOM].includes(s.type)) return Z_(new W_({ code: fp.CANNOT_SET_MEMBER_ROLE_IN_WORK_AND_AVCHATROOM, message: ud }));if ([ro.GRP_MBR_ROLE_ADMIN, ro.GRP_MBR_ROLE_MEMBER].indexOf(a) < 0) return Z_(new W_({ code: fp.INVALID_MEMBER_ROLE, message: cd }));if (r === this.getMyUserID()) return Z_(new W_({ code: fp.CANNOT_SET_SELF_MEMBER_ROLE, message: ld }));var i = new Fd(jg);return i.setMessage("groupID:".concat(o, " userID:").concat(r, " role:").concat(a)), Gi.log("".concat(n, " groupID:").concat(o, " userID:").concat(r)), this._modifyGroupMemberInfo({ groupID: o, userID: r, role: a }).then(function (e) {return i.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(n, " ok")), B_({ group: s, member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];i.setError(e, o, r).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "setGroupMemberNameCard", value: function value(e) {var t = this,n = "".concat(this._className, ".setGroupMemberNameCard"),o = e.groupID,r = e.userID,a = void 0 === r ? this.getMyUserID() : r,s = e.nameCard;Gi.log("".concat(n, " groupID:").concat(o, " userID:").concat(a));var i = new Fd(Hg);return i.setMessage("groupID:".concat(o, " userID:").concat(a, " nameCard:").concat(s)), this._modifyGroupMemberInfo({ groupID: o, userID: a, nameCard: s }).then(function (e) {Gi.log("".concat(n, " ok")), i.setNetworkType(t.getNetworkType()).end();var r = t.getModule(xc).getLocalGroupProfile(o);return a === t.getMyUserID() && r && r.setSelfNameCard(s), B_({ group: r, member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];i.setError(e, o, r).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "setGroupMemberCustomField", value: function value(e) {var t = this,n = "".concat(this._className, ".setGroupMemberCustomField"),o = e.groupID,r = e.userID,a = void 0 === r ? this.getMyUserID() : r,s = e.memberCustomField;Gi.log("".concat(n, " groupID:").concat(o, " userID:").concat(a));var i = new Fd($g);return i.setMessage("groupID:".concat(o, " userID:").concat(a, " memberCustomField:").concat(JSON.stringify(s))), this._modifyGroupMemberInfo({ groupID: o, userID: a, memberCustomField: s }).then(function (e) {i.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(n, " ok"));var r = t.getModule(xc).getLocalGroupProfile(o);return B_({ group: r, member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];i.setError(e, o, r).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "setMessageRemindType", value: function value(e) {var t = this,n = "".concat(this._className, ".setMessageRemindType"),o = new Fd(Dg);o.setMessage("groupID:".concat(e.groupID)), Gi.log("".concat(n, " groupID:").concat(e.groupID));var r = e.groupID,a = e.messageRemindType;return this._modifyGroupMemberInfo({ groupID: r, messageRemindType: a, userID: this.getMyUserID() }).then(function () {o.setNetworkType(t.getNetworkType()).end(), Gi.log("".concat(n, " ok. groupID:").concat(e.groupID));var r = t.getModule(xc).getLocalGroupProfile(e.groupID);return r && (r.selfInfo.messageRemindType = a), B_({ group: r });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Wn(t, 2),r = n[0],a = n[1];o.setError(e, r, a).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "_modifyGroupMemberInfo", value: function value(e) {var t = this,n = e.groupID,o = e.userID;return this.request({ protocolName: op, requestData: e }).then(function () {if (t.hasLocalGroupMember(n, o)) {var r = t.getLocalGroupMemberInfo(n, o);return Bi(e.muteTime) || r.updateMuteUntil(e.muteTime), Bi(e.role) || r.updateRole(e.role), Bi(e.nameCard) || r.updateNameCard(e.nameCard), Bi(e.memberCustomField) || r.updateMemberCustomField(e.memberCustomField), r;}return t.getGroupMemberProfile({ groupID: n, userIDList: [o] }).then(function (e) {return Wn(e.data.memberList, 1)[0];});});} }, { key: "_getGroupMemberProfileAdvance", value: function value(e) {return this.request({ protocolName: ep, requestData: Fn({}, e, { memberInfoFilter: e.memberInfoFilter ? e.memberInfoFilter : ["Role", "JoinTime", "NameCard", "ShutUpUntil"] }) });} }, { key: "_updateLocalGroupMemberMap", value: function value(e, t) {var n = this;return Ki(t) && 0 !== t.length ? t.map(function (t) {return n.hasLocalGroupMember(e, t.userID) ? n.getLocalGroupMemberInfo(e, t.userID).updateMember(t) : n.setLocalGroupMember(e, new Vm(t)), n.getLocalGroupMemberInfo(e, t.userID);}) : [];} }, { key: "deleteLocalGroupMembers", value: function value(e, t) {var n = this.groupMemberListMap.get(e);n && t.forEach(function (e) {n.delete(e);});} }, { key: "getLocalGroupMemberInfo", value: function value(e, t) {return this.groupMemberListMap.has(e) ? this.groupMemberListMap.get(e).get(t) : null;} }, { key: "setLocalGroupMember", value: function value(e, t) {if (this.groupMemberListMap.has(e)) this.groupMemberListMap.get(e).set(t.userID, t);else {var n = new Map().set(t.userID, t);this.groupMemberListMap.set(e, n);}} }, { key: "getLocalGroupMemberList", value: function value(e) {return this.groupMemberListMap.get(e);} }, { key: "hasLocalGroupMember", value: function value(e, t) {return this.groupMemberListMap.has(e) && this.groupMemberListMap.get(e).has(t);} }, { key: "hasLocalGroupMemberMap", value: function value(e) {return this.groupMemberListMap.has(e);} }, { key: "reset", value: function value() {this.groupMemberListMap.clear();} }]), n;}(rl),Bm = function () {function e(t) {bn(this, e), this._userModule = t, this._className = "ProfileHandler", this.TAG = "profile", this.accountProfileMap = new Map(), this.expirationTime = 864e5;}return Pn(e, [{ key: "setExpirationTime", value: function value(e) {this.expirationTime = e;} }, { key: "getUserProfile", value: function value(e) {var t = this,n = e.userIDList;e.fromAccount = this._userModule.getMyAccount(), n.length > 100 && (Gi.warn("".concat(this._className, ".getUserProfile 获取用户资料人数不能超过100人")), n.length = 100);for (var o, r = [], a = [], s = 0, i = n.length; s < i; s++) {o = n[s], this._userModule.isMyFriend(o) && this._containsAccount(o) ? a.push(this._getProfileFromMap(o)) : r.push(o);}if (0 === r.length) return Q_(a);e.toAccount = r;var u = e.bFromGetMyProfile || !1,c = [];e.toAccount.forEach(function (e) {c.push({ toAccount: e, standardSequence: 0, customSequence: 0 });}), e.userItem = c;var l = new Fd(Xg);return l.setMessage(n.length > 5 ? "userIDList.length:".concat(n.length) : "userIDList:".concat(n)), this._userModule.request({ protocolName: dl, requestData: e }).then(function (e) {l.setNetworkType(t._userModule.getNetworkType()).end(), Gi.info("".concat(t._className, ".getUserProfile ok"));var n = t._handleResponse(e).concat(a);return B_(u ? n[0] : n);}).catch(function (e) {return t._userModule.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];l.setError(e, o, r).end();}), Gi.error("".concat(t._className, ".getUserProfile failed. error:"), e), Z_(e);});} }, { key: "getMyProfile", value: function value() {var e = this._userModule.getMyAccount();if (Gi.log("".concat(this._className, ".getMyProfile myAccount:").concat(e)), this._fillMap(), this._containsAccount(e)) {var t = this._getProfileFromMap(e);return Gi.debug("".concat(this._className, ".getMyProfile from cache, myProfile:") + JSON.stringify(t)), Q_(t);}return this.getUserProfile({ fromAccount: e, userIDList: [e], bFromGetMyProfile: !0 });} }, { key: "_handleResponse", value: function value(e) {for (var t, n, o = Ji.now(), r = e.data.userProfileItem, a = [], s = 0, i = r.length; s < i; s++) {"@TLS#NOT_FOUND" !== r[s].to && "" !== r[s].to && (t = r[s].to, n = this._updateMap(t, this._getLatestProfileFromResponse(t, r[s].profileItem)), a.push(n));}return Gi.log("".concat(this._className, "._handleResponse cost ").concat(Ji.now() - o, " ms")), a;} }, { key: "_getLatestProfileFromResponse", value: function value(e, t) {var n = {};if (n.userID = e, n.profileCustomField = [], !Du(t)) for (var o = 0, r = t.length; o < r; o++) {if (t[o].tag.indexOf("Tag_Profile_Custom") > -1) n.profileCustomField.push({ key: t[o].tag, value: t[o].value });else switch (t[o].tag) {case __.NICK:n.nick = t[o].value;break;case __.GENDER:n.gender = t[o].value;break;case __.BIRTHDAY:n.birthday = t[o].value;break;case __.LOCATION:n.location = t[o].value;break;case __.SELFSIGNATURE:n.selfSignature = t[o].value;break;case __.ALLOWTYPE:n.allowType = t[o].value;break;case __.LANGUAGE:n.language = t[o].value;break;case __.AVATAR:n.avatar = t[o].value;break;case __.MESSAGESETTINGS:n.messageSettings = t[o].value;break;case __.ADMINFORBIDTYPE:n.adminForbidType = t[o].value;break;case __.LEVEL:n.level = t[o].value;break;case __.ROLE:n.role = t[o].value;break;default:Gi.warn("".concat(this._className, "._handleResponse unknown tag:"), t[o].tag, t[o].value);}}return n;} }, { key: "updateMyProfile", value: function value(e) {var t = this,n = "".concat(this._className, ".updateMyProfile"),o = new Fd(Qg);o.setMessage(JSON.stringify(e));var r = new vm().validate(e);if (!r.valid) return o.setCode(fp.UPDATE_PROFILE_INVALID_PARAM).setMoreMessage("".concat(n, " info:").concat(r.tips)).setNetworkType(this._userModule.getNetworkType()).end(), Gi.error("".concat(n, " info:").concat(r.tips, "，请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#updateMyProfile")), Z_({ code: fp.UPDATE_PROFILE_INVALID_PARAM, message: dd });var a = [];for (var s in e) {Object.prototype.hasOwnProperty.call(e, s) && ("profileCustomField" === s ? e.profileCustomField.forEach(function (e) {a.push({ tag: e.key, value: e.value });}) : a.push({ tag: __[s.toUpperCase()], value: e[s] }));}return 0 === a.length ? (o.setCode(fp.UPDATE_PROFILE_NO_KEY).setMoreMessage(gd).setNetworkType(this._userModule.getNetworkType()).end(), Gi.error("".concat(n, " info:").concat(gd, "，请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#updateMyProfile")), Z_({ code: fp.UPDATE_PROFILE_NO_KEY, message: gd })) : this._userModule.request({ protocolName: gl, requestData: { fromAccount: this._userModule.getMyAccount(), profileItem: a } }).then(function (r) {o.setNetworkType(t._userModule.getNetworkType()).end(), Gi.info("".concat(n, " ok"));var a = t._updateMap(t._userModule.getMyAccount(), e);return t._userModule.emitOuterEvent(oo.PROFILE_UPDATED, [a]), Q_(a);}).catch(function (e) {return t._userModule.probeNetwork().then(function (t) {var n = Wn(t, 2),r = n[0],a = n[1];o.setError(e, r, a).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);});} }, { key: "onProfileModified", value: function value(e) {var t = e.dataList;if (!Du(t)) {var n,o,r = t.length;Gi.info("".concat(this._className, ".onProfileModified count:").concat(r));for (var a = [], s = this._userModule.getModule(Bc), i = 0; i < r; i++) {n = t[i].userID, o = this._updateMap(n, this._getLatestProfileFromResponse(n, t[i].profileList)), a.push(o), n === this._userModule.getMyAccount() && s.onMyProfileModified({ latestNick: o.nick, latestAvatar: o.avatar });}this._userModule.emitInnerEvent(lm.PROFILE_UPDATED, a), this._userModule.emitOuterEvent(oo.PROFILE_UPDATED, a);}} }, { key: "_fillMap", value: function value() {if (0 === this.accountProfileMap.size) {for (var e = this._getCachedProfiles(), t = Date.now(), n = 0, o = e.length; n < o; n++) {t - e[n].lastUpdatedTime < this.expirationTime && this.accountProfileMap.set(e[n].userID, e[n]);}Gi.log("".concat(this._className, "._fillMap from cache, map.size:").concat(this.accountProfileMap.size));}} }, { key: "_updateMap", value: function value(e, t) {var n,o = Date.now();return this._containsAccount(e) ? (n = this._getProfileFromMap(e), t.profileCustomField && uu(n.profileCustomField, t.profileCustomField), Xi(n, t, ["profileCustomField"]), n.lastUpdatedTime = o) : (n = new vm(t), (this._userModule.isMyFriend(e) || e === this._userModule.getMyAccount()) && (n.lastUpdatedTime = o, this.accountProfileMap.set(e, n))), this._flushMap(e === this._userModule.getMyAccount()), n;} }, { key: "_flushMap", value: function value(e) {var t = Jn(this.accountProfileMap.values()),n = this._userModule.getStorageModule();Gi.debug("".concat(this._className, "._flushMap length:").concat(t.length, " flushAtOnce:").concat(e)), n.setItem(this.TAG, t, e);} }, { key: "_containsAccount", value: function value(e) {return this.accountProfileMap.has(e);} }, { key: "_getProfileFromMap", value: function value(e) {return this.accountProfileMap.get(e);} }, { key: "_getCachedProfiles", value: function value() {var e = this._userModule.getStorageModule().getItem(this.TAG);return Du(e) ? [] : e;} }, { key: "onConversationsProfileUpdated", value: function value(e) {for (var t, n, o, r = [], a = 0, s = e.length; a < s; a++) {n = (t = e[a]).userID, this._userModule.isMyFriend(n) || (this._containsAccount(n) ? (o = this._getProfileFromMap(n), Xi(o, t) > 0 && r.push(n)) : r.push(t.userID));}0 !== r.length && (Gi.info("".concat(this._className, ".onConversationsProfileUpdated toAccountList:").concat(r)), this.getUserProfile({ userIDList: r }));} }, { key: "getNickAndAvatarByUserID", value: function value(e) {if (this._containsAccount(e)) {var t = this._getProfileFromMap(e);return { nick: t.nick, avatar: t.avatar };}return { nick: "", avatar: "" };} }, { key: "reset", value: function value() {this._flushMap(!0), this.accountProfileMap.clear();} }]), e;}(),Hm = function e(t) {bn(this, e), Du || (this.userID = t.userID || "", this.timeStamp = t.timeStamp || 0);},jm = function () {function e(t) {bn(this, e), this._userModule = t, this._className = "BlacklistHandler", this._blacklistMap = new Map(), this.startIndex = 0, this.maxLimited = 100, this.currentSequence = 0;}return Pn(e, [{ key: "getLocalBlacklist", value: function value() {return Jn(this._blacklistMap.keys());} }, { key: "getBlacklist", value: function value() {var e = this,t = "".concat(this._className, ".getBlacklist"),n = { fromAccount: this._userModule.getMyAccount(), maxLimited: this.maxLimited, startIndex: 0, lastSequence: this.currentSequence },o = new Fd(Zg);return this._userModule.request({ protocolName: hl, requestData: n }).then(function (n) {var r = n.data,a = r.blackListItem,s = r.currentSequence,i = Du(a) ? 0 : a.length;o.setNetworkType(e._userModule.getNetworkType()).setMessage("blackList count:".concat(i)).end(), Gi.info("".concat(t, " ok")), e.currentSequence = s, e._handleResponse(a, !0), e._userModule.emitOuterEvent(oo.BLACKLIST_UPDATED, Jn(e._blacklistMap.keys()));}).catch(function (n) {return e._userModule.probeNetwork().then(function (e) {var t = Wn(e, 2),r = t[0],a = t[1];o.setError(n, r, a).end();}), Gi.error("".concat(t, " failed. error:"), n), Z_(n);});} }, { key: "addBlacklist", value: function value(e) {var t = this,n = "".concat(this._className, ".addBlacklist"),o = new Fd(eh);if (!Ki(e.userIDList)) return o.setCode(fp.ADD_BLACKLIST_INVALID_PARAM).setMessage(hd).setNetworkType(this._userModule.getNetworkType()).end(), Gi.error("".concat(n, " options.userIDList 必需是数组")), Z_({ code: fp.ADD_BLACKLIST_INVALID_PARAM, message: hd });var r = this._userModule.getMyAccount();return 1 === e.userIDList.length && e.userIDList[0] === r ? (o.setCode(fp.CANNOT_ADD_SELF_TO_BLACKLIST).setMessage(_d).setNetworkType(this._userModule.getNetworkType()).end(), Gi.error("".concat(n, " 不能把自己拉黑")), Z_({ code: fp.CANNOT_ADD_SELF_TO_BLACKLIST, message: _d })) : (e.userIDList.includes(r) && (e.userIDList = e.userIDList.filter(function (e) {return e !== r;}), Gi.warn("".concat(n, " 不能把自己拉黑，已过滤"))), e.fromAccount = this._userModule.getMyAccount(), e.toAccount = e.userIDList, this._userModule.request({ protocolName: fl, requestData: e }).then(function (r) {return o.setNetworkType(t._userModule.getNetworkType()).setMessage(e.userIDList.length > 5 ? "userIDList.length:".concat(e.userIDList.length) : "userIDList:".concat(e.userIDList)).end(), Gi.info("".concat(n, " ok")), t._handleResponse(r.resultItem, !0), B_(Jn(t._blacklistMap.keys()));}).catch(function (e) {return t._userModule.probeNetwork().then(function (t) {var n = Wn(t, 2),r = n[0],a = n[1];o.setError(e, r, a).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);}));} }, { key: "_handleResponse", value: function value(e, t) {if (!Du(e)) for (var n, o, r, a = 0, s = e.length; a < s; a++) {o = e[a].to, r = e[a].resultCode, (Bi(r) || 0 === r) && (t ? ((n = this._blacklistMap.has(o) ? this._blacklistMap.get(o) : new Hm()).userID = o, !Du(e[a].addBlackTimeStamp) && (n.timeStamp = e[a].addBlackTimeStamp), this._blacklistMap.set(o, n)) : this._blacklistMap.has(o) && (n = this._blacklistMap.get(o), this._blacklistMap.delete(o)));}Gi.log("".concat(this._className, "._handleResponse total:").concat(this._blacklistMap.size, " bAdd:").concat(t));} }, { key: "deleteBlacklist", value: function value(e) {var t = this,n = "".concat(this._className, ".deleteBlacklist"),o = new Fd(th);return Ki(e.userIDList) ? (e.fromAccount = this._userModule.getMyAccount(), e.toAccount = e.userIDList, this._userModule.request({ protocolName: _l, requestData: e }).then(function (r) {return o.setNetworkType(t._userModule.getNetworkType()).setMessage(e.userIDList.length > 5 ? "userIDList.length:".concat(e.userIDList.length) : "userIDList:".concat(e.userIDList)).end(), Gi.info("".concat(n, " ok")), t._handleResponse(r.data.resultItem, !1), B_(Jn(t._blacklistMap.keys()));}).catch(function (e) {return t._userModule.probeNetwork().then(function (t) {var n = Wn(t, 2),r = n[0],a = n[1];o.setError(e, r, a).end();}), Gi.error("".concat(n, " failed. error:"), e), Z_(e);})) : (o.setCode(fp.DEL_BLACKLIST_INVALID_PARAM).setMessage(fd).setNetworkType(this._userModule.getNetworkType()).end(), Gi.error("".concat(n, " options.userIDList 必需是数组")), Z_({ code: fp.DEL_BLACKLIST_INVALID_PARAM, message: fd }));} }, { key: "onAccountDeleted", value: function value(e) {for (var t, n = [], o = 0, r = e.length; o < r; o++) {t = e[o], this._blacklistMap.has(t) && (this._blacklistMap.delete(t), n.push(t));}n.length > 0 && (Gi.log("".concat(this._className, ".onAccountDeleted count:").concat(n.length, " userIDList:"), n), this._userModule.emitOuterEvent(oo.BLACKLIST_UPDATED, Jn(this._blacklistMap.keys())));} }, { key: "onAccountAdded", value: function value(e) {for (var t, n = [], o = 0, r = e.length; o < r; o++) {t = e[o], this._blacklistMap.has(t) || (this._blacklistMap.set(t, new Hm({ userID: t })), n.push(t));}n.length > 0 && (Gi.log("".concat(this._className, ".onAccountAdded count:").concat(n.length, " userIDList:"), n), this._userModule.emitOuterEvent(oo.BLACKLIST_UPDATED, Jn(this._blacklistMap.keys())));} }, { key: "reset", value: function value() {this._blacklistMap.clear(), this.startIndex = 0, this.maxLimited = 100, this.currentSequence = 0;} }]), e;}(),$m = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "UserModule", o._profileHandler = new Bm($n(o)), o._blacklistHandler = new jm($n(o)), o.getInnerEmitterInstance().on(lm.CONTEXT_A2KEY_AND_TINYID_UPDATED, o.onContextUpdated, $n(o)), o;}return Pn(n, [{ key: "onContextUpdated", value: function value(e) {this._profileHandler.getMyProfile(), this._blacklistHandler.getBlacklist();} }, { key: "onProfileModified", value: function value(e) {this._profileHandler.onProfileModified(e);} }, { key: "onRelationChainModified", value: function value(e) {var t = e.dataList;if (!Du(t)) {var n = [];t.forEach(function (e) {e.blackListDelAccount && n.push.apply(n, Jn(e.blackListDelAccount));}), n.length > 0 && this._blacklistHandler.onAccountDeleted(n);var o = [];t.forEach(function (e) {e.blackListAddAccount && o.push.apply(o, Jn(e.blackListAddAccount));}), o.length > 0 && this._blacklistHandler.onAccountAdded(o);}} }, { key: "onConversationsProfileUpdated", value: function value(e) {this._profileHandler.onConversationsProfileUpdated(e);} }, { key: "getMyAccount", value: function value() {return this.getMyUserID();} }, { key: "getMyProfile", value: function value() {return this._profileHandler.getMyProfile();} }, { key: "getStorageModule", value: function value() {return this.getModule(jc);} }, { key: "isMyFriend", value: function value(e) {var t = this.getModule(Vc);return !!t && t.isMyFriend(e);} }, { key: "getUserProfile", value: function value(e) {return this._profileHandler.getUserProfile(e);} }, { key: "updateMyProfile", value: function value(e) {return this._profileHandler.updateMyProfile(e);} }, { key: "getNickAndAvatarByUserID", value: function value(e) {return this._profileHandler.getNickAndAvatarByUserID(e);} }, { key: "getLocalBlacklist", value: function value() {var e = this._blacklistHandler.getLocalBlacklist();return Q_(e);} }, { key: "addBlacklist", value: function value(e) {return this._blacklistHandler.addBlacklist(e);} }, { key: "deleteBlacklist", value: function value(e) {return this._blacklistHandler.deleteBlacklist(e);} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._profileHandler.reset(), this._blacklistHandler.reset();} }]), n;}(rl),Ym = function () {function e(t, n) {bn(this, e), this._moduleManager = t, this._isLoggedIn = !1, this._SDKAppID = n.SDKAppID, this._userID = n.userID || "", this._userSig = n.userSig || "", this._version = "2.14.0", this._a2Key = "", this._tinyID = "", this._contentType = "json", this._unlimitedAVChatRoom = n.unlimitedAVChatRoom, this._scene = n.scene || "", this._oversea = n.oversea, this._instanceID = n.instanceID, this._statusInstanceID = 0;}return Pn(e, [{ key: "isLoggedIn", value: function value() {return this._isLoggedIn;} }, { key: "isOversea", value: function value() {return this._oversea;} }, { key: "isUnlimitedAVChatRoom", value: function value() {return this._unlimitedAVChatRoom;} }, { key: "getUserID", value: function value() {return this._userID;} }, { key: "setUserID", value: function value(e) {this._userID = e;} }, { key: "setUserSig", value: function value(e) {this._userSig = e;} }, { key: "getUserSig", value: function value() {return this._userSig;} }, { key: "getSDKAppID", value: function value() {return this._SDKAppID;} }, { key: "getTinyID", value: function value() {return this._tinyID;} }, { key: "setTinyID", value: function value(e) {this._tinyID = e, this._isLoggedIn = !0;} }, { key: "getScene", value: function value() {return function () {var e = !1,t = [];Zs && (t = Object.keys(ti)), ei && (t = Object.keys(window));for (var n = 0, o = t.length; n < o; n++) {if (t[n].toLowerCase().includes("uikit")) {e = !0;break;}}return t = null, e;}() ? "tuikit" : this._scene;} }, { key: "getInstanceID", value: function value() {return this._instanceID;} }, { key: "getStatusInstanceID", value: function value() {return this._statusInstanceID;} }, { key: "setStatusInstanceID", value: function value(e) {this._statusInstanceID = e;} }, { key: "getVersion", value: function value() {return this._version;} }, { key: "getA2Key", value: function value() {return this._a2Key;} }, { key: "setA2Key", value: function value(e) {this._a2Key = e;} }, { key: "getContentType", value: function value() {return this._contentType;} }, { key: "reset", value: function value() {this._isLoggedIn = !1, this._userSig = "", this._a2Key = "", this._tinyID = "", this._statusInstanceID = 0;} }]), e;}(),zm = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "SignModule", o._helloInterval = 120, o._lastLoginTs = 0, pm.mixin($n(o)), o;}return Pn(n, [{ key: "onCheckTimer", value: function value(e) {this.isLoggedIn() && e % this._helloInterval == 0 && this._hello();} }, { key: "login", value: function value(e) {if (this.isLoggedIn()) {var t = "您已经登录账号".concat(e.userID, "！如需切换账号登录，请先调用 logout 接口登出，再调用 login 接口登录。");return Gi.warn(t), Q_({ actionStatus: "OK", errorCode: 0, errorInfo: t, repeatLogin: !0 });}if (Date.now() - this._lastLoginTs <= 15e3) return Gi.warn("您正在尝试登录账号".concat(e.userID, "！请勿重复登录。")), Z_({ code: fp.REPEAT_LOGIN, message: Sp });Gi.log("".concat(this._className, ".login userID:").concat(e.userID));var n = this._checkLoginInfo(e);if (0 !== n.code) return Z_(n);var o = this.getModule(Hc),r = e.userID,a = e.userSig;return o.setUserID(r), o.setUserSig(a), this.getModule(Qc).updateProtocolConfig(), this._login();} }, { key: "_login", value: function value() {var e = this,t = this.getModule(Hc),n = new Fd(Vd);return n.setMessage("".concat(t.getScene())).setMoreMessage("identifier:".concat(this.getMyUserID())), this._lastLoginTs = Date.now(), this.request({ protocolName: al }).then(function (o) {e._lastLoginTs = 0;var r = Date.now(),a = null,s = o.data,i = s.a2Key,u = s.tinyID,c = s.helloInterval,l = s.instanceID,p = s.timeStamp;Gi.log("".concat(e._className, ".login ok. helloInterval:").concat(c, " instanceID:").concat(l, " timeStamp:").concat(p));var d = 1e3 * p,g = r - n.getStartTs(),h = d + parseInt(g / 2) - r,f = n.getStartTs() + h;if (n.start(f), function (e, t) {Oi = t;var n = new Date();n.setTime(e), Gi.info("baseTime from server: ".concat(n, " offset: ").concat(Oi));}(d, h), !u) throw a = new W_({ code: fp.NO_TINYID, message: Mp }), n.setError(a, !0, e.getNetworkType()).end(), a;if (!i) throw a = new W_({ code: fp.NO_A2KEY, message: yp }), n.setError(a, !0, e.getNetworkType()).end(), a;return n.setNetworkType(e.getNetworkType()).setMoreMessage("helloInterval:".concat(c, " instanceID:").concat(l, " offset:").concat(h)).end(), t.setA2Key(i), t.setTinyID(u), t.setStatusInstanceID(l), e.getModule(Qc).updateProtocolConfig(), e.emitInnerEvent(lm.CONTEXT_A2KEY_AND_TINYID_UPDATED), e._helloInterval = c, e.triggerReady(), e._fetchCloudControlConfig(), o;}).catch(function (t) {return e.probeNetwork().then(function (e) {var o = Wn(e, 2),r = o[0],a = o[1];n.setError(t, r, a).end(!0);}), Gi.error("".concat(e._className, ".login failed. error:"), t), e._moduleManager.onLoginFailed(), Z_(t);});} }, { key: "logout", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;if (!this.isLoggedIn()) return Z_({ code: fp.USER_NOT_LOGGED_IN, message: Ip });var n = new Fd(Kd);return n.setNetworkType(this.getNetworkType()).setMessage("identifier:".concat(this.getMyUserID())).end(!0), Gi.info("".concat(this._className, ".logout type:").concat(t)), this.request({ protocolName: sl, requestData: { type: t } }).then(function () {return e.resetReady(), Q_({});}).catch(function (t) {return Gi.error("".concat(e._className, "._logout error:"), t), e.resetReady(), Q_({});});} }, { key: "_fetchCloudControlConfig", value: function value() {this.getModule(tl).fetchConfig();} }, { key: "_hello", value: function value() {var e = this;this.request({ protocolName: il }).catch(function (t) {Gi.warn("".concat(e._className, "._hello error:"), t);});} }, { key: "_checkLoginInfo", value: function value(e) {var t = 0,n = "";return Du(this.getModule(Hc).getSDKAppID()) ? (t = fp.NO_SDKAPPID, n = _p) : Du(e.userID) ? (t = fp.NO_IDENTIFIER, n = mp) : Du(e.userSig) && (t = fp.NO_USERSIG, n = vp), { code: t, message: n };} }, { key: "onMultipleAccountKickedOut", value: function value(e) {var t = this;new Fd(Bd).setNetworkType(this.getNetworkType()).setMessage("type:".concat(ro.KICKED_OUT_MULT_ACCOUNT, " newInstanceInfo:").concat(JSON.stringify(e))).end(!0), Gi.warn("".concat(this._className, ".onMultipleAccountKickedOut userID:").concat(this.getMyUserID(), " newInstanceInfo:"), e), this.logout(1).then(function () {t.emitOuterEvent(oo.KICKED_OUT, { type: ro.KICKED_OUT_MULT_ACCOUNT }), t._moduleManager.reset();});} }, { key: "onMultipleDeviceKickedOut", value: function value(e) {var t = this;new Fd(Bd).setNetworkType(this.getNetworkType()).setMessage("type:".concat(ro.KICKED_OUT_MULT_DEVICE, " newInstanceInfo:").concat(JSON.stringify(e))).end(!0), Gi.warn("".concat(this._className, ".onMultipleDeviceKickedOut userID:").concat(this.getMyUserID(), " newInstanceInfo:"), e), this.logout(1).then(function () {t.emitOuterEvent(oo.KICKED_OUT, { type: ro.KICKED_OUT_MULT_DEVICE }), t._moduleManager.reset();});} }, { key: "onUserSigExpired", value: function value() {new Fd(Bd).setNetworkType(this.getNetworkType()).setMessage(ro.KICKED_OUT_USERSIG_EXPIRED).end(!0), Gi.warn("".concat(this._className, ".onUserSigExpired: userSig 签名过期被踢下线")), 0 !== this.getModule(Hc).getStatusInstanceID() && (this.emitOuterEvent(oo.KICKED_OUT, { type: ro.KICKED_OUT_USERSIG_EXPIRED }), this._moduleManager.reset());} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this.resetReady(), this._helloInterval = 120, this._lastLoginTs = 0;} }]), n;}(rl);function Wm() {return null;}var Jm = function () {function e(t) {bn(this, e), this._moduleManager = t, this._className = "StorageModule", this._storageQueue = new Map(), this._errorTolerantHandle();}return Pn(e, [{ key: "_errorTolerantHandle", value: function value() {Zs || !Bi(window) && !Bi(window.localStorage) || (this.getItem = Wm, this.setItem = Wm, this.removeItem = Wm, this.clear = Wm);} }, { key: "onCheckTimer", value: function value(e) {if (e % 20 == 0) {if (0 === this._storageQueue.size) return;this._doFlush();}} }, { key: "_doFlush", value: function value() {try {var e,t = no(this._storageQueue);try {for (t.s(); !(e = t.n()).done;) {var n = Wn(e.value, 2),o = n[0],r = n[1];this._setStorageSync(this._getKey(o), r);}} catch (a) {t.e(a);} finally {t.f();}this._storageQueue.clear();} catch (jv) {Gi.warn("".concat(this._className, "._doFlush error:"), jv);}} }, { key: "_getPrefix", value: function value() {var e = this._moduleManager.getModule(Hc);return "TIM_".concat(e.getSDKAppID(), "_").concat(e.getUserID(), "_");} }, { key: "_getKey", value: function value(e) {return "".concat(this._getPrefix()).concat(e);} }, { key: "getItem", value: function value(e) {var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];try {var n = t ? this._getKey(e) : e;return this._getStorageSync(n);} catch (jv) {return Gi.warn("".concat(this._className, ".getItem error:"), jv), {};}} }, { key: "setItem", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];if (n) {var r = o ? this._getKey(e) : e;this._setStorageSync(r, t);} else this._storageQueue.set(e, t);} }, { key: "clear", value: function value() {try {Zs ? ti.clearStorageSync() : localStorage && localStorage.clear();} catch (jv) {Gi.warn("".concat(this._className, ".clear error:"), jv);}} }, { key: "removeItem", value: function value(e) {var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];try {var n = t ? this._getKey(e) : e;this._removeStorageSync(n);} catch (jv) {Gi.warn("".concat(this._className, ".removeItem error:"), jv);}} }, { key: "getSize", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "b";try {var o = { size: 0, limitSize: 5242880, unit: n };if (Object.defineProperty(o, "leftSize", { enumerable: !0, get: function get() {return o.limitSize - o.size;} }), Zs && (o.limitSize = 1024 * ti.getStorageInfoSync().limitSize), e) o.size = JSON.stringify(this.getItem(e)).length + this._getKey(e).length;else if (Zs) {var r = ti.getStorageInfoSync(),a = r.keys;a.forEach(function (e) {o.size += JSON.stringify(t._getStorageSync(e)).length + t._getKey(e).length;});} else if (localStorage) for (var s in localStorage) {localStorage.hasOwnProperty(s) && (o.size += localStorage.getItem(s).length + s.length);}return this._convertUnit(o);} catch (jv) {Gi.warn("".concat(this._className, " error:"), jv);}} }, { key: "_convertUnit", value: function value(e) {var t = {},n = e.unit;for (var o in t.unit = n, e) {"number" == typeof e[o] && ("kb" === n.toLowerCase() ? t[o] = Math.round(e[o] / 1024) : "mb" === n.toLowerCase() ? t[o] = Math.round(e[o] / 1024 / 1024) : t[o] = e[o]);}return t;} }, { key: "_setStorageSync", value: function value(e, t) {Zs ? Xs ? my.setStorageSync({ key: e, data: t }) : ti.setStorageSync(e, t) : localStorage && localStorage.setItem(e, JSON.stringify(t));} }, { key: "_getStorageSync", value: function value(e) {return Zs ? Xs ? my.getStorageSync({ key: e }).data : ti.getStorageSync(e) : localStorage ? JSON.parse(localStorage.getItem(e)) : {};} }, { key: "_removeStorageSync", value: function value(e) {Zs ? Xs ? my.removeStorageSync({ key: e }) : ti.removeStorageSync(e) : localStorage && localStorage.removeItem(e);} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._doFlush();} }]), e;}(),Xm = function () {function e(t) {bn(this, e), this._className = "SSOLogBody", this._report = [];}return Pn(e, [{ key: "pushIn", value: function value(e) {Gi.debug("".concat(this._className, ".pushIn"), this._report.length, e), this._report.push(e);} }, { key: "backfill", value: function value(e) {var t;Ki(e) && 0 !== e.length && (Gi.debug("".concat(this._className, ".backfill"), this._report.length, e.length), (t = this._report).unshift.apply(t, Jn(e)));} }, { key: "getLogsNumInMemory", value: function value() {return this._report.length;} }, { key: "isEmpty", value: function value() {return 0 === this._report.length;} }, { key: "_reset", value: function value() {this._report.length = 0, this._report = [];} }, { key: "getLogsInMemory", value: function value() {var e = this._report.slice();return this._reset(), e;} }]), e;}(),Qm = function Qm(e) {var t = e.getModule(Hc);return { SDKType: 10, SDKAppID: t.getSDKAppID(), SDKVersion: t.getVersion(), tinyID: Number(t.getTinyID()), userID: t.getUserID(), platform: e.getPlatform(), instanceID: t.getInstanceID(), traceID: Li() };},Zm = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;bn(this, n), (o = t.call(this, e))._className = "EventStatModule", o.TAG = "im-ssolog-event", o._reportBody = new Xm(), o.MIN_THRESHOLD = 20, o.MAX_THRESHOLD = 100, o.WAITING_TIME = 6e4, o.REPORT_LEVEL = [4, 5, 6], o.REPORT_SDKAPPID_BLACKLIST = [], o.REPORT_TINYID_WHITELIST = [], o._lastReportTime = Date.now();var r = o.getInnerEmitterInstance();return r.on(lm.CONTEXT_A2KEY_AND_TINYID_UPDATED, o._onLoginSuccess, $n(o)), r.on(lm.CLOUD_CONFIG_UPDATED, o._onCloudConfigUpdated, $n(o)), o;}return Pn(n, [{ key: "reportAtOnce", value: function value() {Gi.debug("".concat(this._className, ".reportAtOnce")), this._report();} }, { key: "_onLoginSuccess", value: function value() {var e = this,t = this.getModule(jc),n = t.getItem(this.TAG, !1);!Du(n) && ji(n.forEach) && (Gi.log("".concat(this._className, "._onLoginSuccess get ssolog in storage, count:").concat(n.length)), n.forEach(function (t) {e._reportBody.pushIn(t);}), t.removeItem(this.TAG, !1));} }, { key: "_onCloudConfigUpdated", value: function value() {var e = this.getCloudConfig("evt_rpt_threshold"),t = this.getCloudConfig("evt_rpt_waiting"),n = this.getCloudConfig("evt_rpt_level"),o = this.getCloudConfig("evt_rpt_sdkappid_bl"),r = this.getCloudConfig("evt_rpt_tinyid_wl");Bi(e) || (this.MIN_THRESHOLD = Number(e)), Bi(t) || (this.WAITING_TIME = Number(t)), Bi(n) || (this.REPORT_LEVEL = n.split(",").map(function (e) {return Number(e);})), Bi(o) || (this.REPORT_SDKAPPID_BLACKLIST = o.split(",").map(function (e) {return Number(e);})), Bi(r) || (this.REPORT_TINYID_WHITELIST = r.split(","));} }, { key: "pushIn", value: function value(e) {e instanceof Fd && (e.updateTimeStamp(), this._reportBody.pushIn(e), this._reportBody.getLogsNumInMemory() >= this.MIN_THRESHOLD && this._report());} }, { key: "onCheckTimer", value: function value() {Date.now() < this._lastReportTime + this.WAITING_TIME || this._reportBody.isEmpty() || this._report();} }, { key: "_filterLogs", value: function value(e) {var t = this,n = this.getModule(Hc),o = n.getSDKAppID(),r = n.getTinyID();return Iu(this.REPORT_SDKAPPID_BLACKLIST, o) && !Su(this.REPORT_TINYID_WHITELIST, r) ? [] : e.filter(function (e) {return t.REPORT_LEVEL.includes(e.level);});} }, { key: "_report", value: function value() {var e = this;if (!this._reportBody.isEmpty()) {var t = this._reportBody.getLogsInMemory(),n = this._filterLogs(t);if (0 !== n.length) {var o = { header: Qm(this), event: n };this.request({ protocolName: sp, requestData: Fn({}, o) }).then(function () {e._lastReportTime = Date.now();}).catch(function (n) {Gi.warn("".concat(e._className, ".report failed. networkType:").concat(e.getNetworkType(), " error:"), n), e._reportBody.backfill(t), e._reportBody.getLogsNumInMemory() > e.MAX_THRESHOLD && e._flushAtOnce();});} else this._lastReportTime = Date.now();}} }, { key: "_flushAtOnce", value: function value() {var e = this.getModule(jc),t = e.getItem(this.TAG, !1),n = this._reportBody.getLogsInMemory();if (Du(t)) Gi.log("".concat(this._className, "._flushAtOnce count:").concat(n.length)), e.setItem(this.TAG, n, !0, !1);else {var o = n.concat(t);o.length > this.MAX_THRESHOLD && (o = o.slice(0, this.MAX_THRESHOLD)), Gi.log("".concat(this._className, "._flushAtOnce count:").concat(o.length)), e.setItem(this.TAG, o, !0, !1);}} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._lastReportTime = 0, this._report(), this.REPORT_SDKAPPID_BLACKLIST = [], this.REPORT_TINYID_WHITELIST = [];} }]), n;}(rl),ev = "none",tv = "online",nv = function () {function e(t) {bn(this, e), this._moduleManager = t, this._networkType = "", this._className = "NetMonitorModule", this.MAX_WAIT_TIME = 3e3;}return Pn(e, [{ key: "start", value: function value() {var e = this;if (Zs) {ti.getNetworkType({ success: function success(t) {e._networkType = t.networkType, t.networkType === ev ? Gi.warn("".concat(e._className, ".start no network, please check!")) : Gi.info("".concat(e._className, ".start networkType:").concat(t.networkType));} });var t = this._onNetworkStatusChange.bind(this);ti.offNetworkStatusChange && (Qs || Ws ? ti.offNetworkStatusChange(t) : ti.offNetworkStatusChange()), ti.onNetworkStatusChange(t);} else this._networkType = tv;} }, { key: "_onNetworkStatusChange", value: function value(e) {e.isConnected ? (Gi.info("".concat(this._className, "._onNetworkStatusChange previousNetworkType:").concat(this._networkType, " currentNetworkType:").concat(e.networkType)), this._networkType !== e.networkType && this._moduleManager.getModule(Zc).reConnect()) : Gi.warn("".concat(this._className, "._onNetworkStatusChange no network, please check!"));this._networkType = e.networkType;} }, { key: "probe", value: function value() {var e = this;return new Promise(function (t, n) {if (Zs) ti.getNetworkType({ success: function success(n) {e._networkType = n.networkType, n.networkType === ev ? (Gi.warn("".concat(e._className, ".probe no network, please check!")), t([!1, n.networkType])) : (Gi.info("".concat(e._className, ".probe networkType:").concat(n.networkType)), t([!0, n.networkType]));} });else if (window && window.fetch) fetch("".concat(au(), "//web.sdk.qcloud.com/im/assets/speed.xml?random=").concat(Math.random())).then(function (e) {e.ok ? t([!0, tv]) : t([!1, ev]);}).catch(function (e) {t([!1, ev]);});else {var o = new XMLHttpRequest(),r = setTimeout(function () {Gi.warn("".concat(e._className, ".probe fetch timeout. Probably no network, please check!")), o.abort(), e._networkType = ev, t([!1, ev]);}, e.MAX_WAIT_TIME);o.onreadystatechange = function () {4 === o.readyState && (clearTimeout(r), 200 === o.status || 304 === o.status ? (this._networkType = tv, t([!0, tv])) : (Gi.warn("".concat(this.className, ".probe fetch status:").concat(o.status, ". Probably no network, please check!")), this._networkType = ev, t([!1, ev])));}, o.open("GET", "".concat(au(), "//web.sdk.qcloud.com/im/assets/speed.xml?random=").concat(Math.random())), o.send();}});} }, { key: "getNetworkType", value: function value() {return this._networkType;} }]), e;}(),ov = t(function (e) {var t = Object.prototype.hasOwnProperty,n = "~";function o() {}function r(e, t, n) {this.fn = e, this.context = t, this.once = n || !1;}function a(e, t, o, a, s) {if ("function" != typeof o) throw new TypeError("The listener must be a function");var i = new r(o, a || e, s),u = n ? n + t : t;return e._events[u] ? e._events[u].fn ? e._events[u] = [e._events[u], i] : e._events[u].push(i) : (e._events[u] = i, e._eventsCount++), e;}function s(e, t) {0 == --e._eventsCount ? e._events = new o() : delete e._events[t];}function i() {this._events = new o(), this._eventsCount = 0;}Object.create && (o.prototype = Object.create(null), new o().__proto__ || (n = !1)), i.prototype.eventNames = function () {var e,o,r = [];if (0 === this._eventsCount) return r;for (o in e = this._events) {t.call(e, o) && r.push(n ? o.slice(1) : o);}return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(e)) : r;}, i.prototype.listeners = function (e) {var t = n ? n + e : e,o = this._events[t];if (!o) return [];if (o.fn) return [o.fn];for (var r = 0, a = o.length, s = new Array(a); r < a; r++) {s[r] = o[r].fn;}return s;}, i.prototype.listenerCount = function (e) {var t = n ? n + e : e,o = this._events[t];return o ? o.fn ? 1 : o.length : 0;}, i.prototype.emit = function (e, t, o, r, a, s) {var i = n ? n + e : e;if (!this._events[i]) return !1;var u,c,l = this._events[i],p = arguments.length;if (l.fn) {switch (l.once && this.removeListener(e, l.fn, void 0, !0), p) {case 1:return l.fn.call(l.context), !0;case 2:return l.fn.call(l.context, t), !0;case 3:return l.fn.call(l.context, t, o), !0;case 4:return l.fn.call(l.context, t, o, r), !0;case 5:return l.fn.call(l.context, t, o, r, a), !0;case 6:return l.fn.call(l.context, t, o, r, a, s), !0;}for (c = 1, u = new Array(p - 1); c < p; c++) {u[c - 1] = arguments[c];}l.fn.apply(l.context, u);} else {var d,g = l.length;for (c = 0; c < g; c++) {switch (l[c].once && this.removeListener(e, l[c].fn, void 0, !0), p) {case 1:l[c].fn.call(l[c].context);break;case 2:l[c].fn.call(l[c].context, t);break;case 3:l[c].fn.call(l[c].context, t, o);break;case 4:l[c].fn.call(l[c].context, t, o, r);break;default:if (!u) for (d = 1, u = new Array(p - 1); d < p; d++) {u[d - 1] = arguments[d];}l[c].fn.apply(l[c].context, u);}}}return !0;}, i.prototype.on = function (e, t, n) {return a(this, e, t, n, !1);}, i.prototype.once = function (e, t, n) {return a(this, e, t, n, !0);}, i.prototype.removeListener = function (e, t, o, r) {var a = n ? n + e : e;if (!this._events[a]) return this;if (!t) return s(this, a), this;var i = this._events[a];if (i.fn) i.fn !== t || r && !i.once || o && i.context !== o || s(this, a);else {for (var u = 0, c = [], l = i.length; u < l; u++) {(i[u].fn !== t || r && !i[u].once || o && i[u].context !== o) && c.push(i[u]);}c.length ? this._events[a] = 1 === c.length ? c[0] : c : s(this, a);}return this;}, i.prototype.removeAllListeners = function (e) {var t;return e ? (t = n ? n + e : e, this._events[t] && s(this, t)) : (this._events = new o(), this._eventsCount = 0), this;}, i.prototype.off = i.prototype.removeListener, i.prototype.addListener = i.prototype.on, i.prefixed = n, i.EventEmitter = i, e.exports = i;}),rv = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "BigDataChannelModule", o.FILETYPE = { SOUND: 2106, FILE: 2107, VIDEO: 2113 }, o._bdh_download_server = "grouptalk.c2c.qq.com", o._BDHBizID = 10001, o._authKey = "", o._expireTime = 0, o.getInnerEmitterInstance().on(lm.CONTEXT_A2KEY_AND_TINYID_UPDATED, o._getAuthKey, $n(o)), o;}return Pn(n, [{ key: "_getAuthKey", value: function value() {var e = this;this.request({ protocolName: cl }).then(function (t) {t.data.authKey && (e._authKey = t.data.authKey, e._expireTime = parseInt(t.data.expireTime));});} }, { key: "_isFromOlderVersion", value: function value(e) {return !(!e.content || 2 === e.content.downloadFlag);} }, { key: "parseElements", value: function value(e, t) {if (!Ki(e) || !t) return [];for (var n = [], o = null, r = 0; r < e.length; r++) {o = e[r], this._needParse(o) ? n.push(this._parseElement(o, t)) : n.push(e[r]);}return n;} }, { key: "_needParse", value: function value(e) {return !e.cloudCustomData && !(!this._isFromOlderVersion(e) || e.type !== ro.MSG_AUDIO && e.type !== ro.MSG_FILE && e.type !== ro.MSG_VIDEO);} }, { key: "_parseElement", value: function value(e, t) {switch (e.type) {case ro.MSG_AUDIO:return this._parseAudioElement(e, t);case ro.MSG_FILE:return this._parseFileElement(e, t);case ro.MSG_VIDEO:return this._parseVideoElement(e, t);}} }, { key: "_parseAudioElement", value: function value(e, t) {return e.content.url = this._genAudioUrl(e.content.uuid, t), e;} }, { key: "_parseFileElement", value: function value(e, t) {return e.content.url = this._genFileUrl(e.content.uuid, t, e.content.fileName), e;} }, { key: "_parseVideoElement", value: function value(e, t) {return e.content.url = this._genVideoUrl(e.content.uuid, t), e;} }, { key: "_genAudioUrl", value: function value(e, t) {if ("" === this._authKey) return Gi.warn("".concat(this._className, "._genAudioUrl no authKey!")), "";var n = this.getModule(Hc).getSDKAppID();return "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(n, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.SOUND, "&openid=").concat(t, "&ver=0");} }, { key: "_genFileUrl", value: function value(e, t, n) {if ("" === this._authKey) return Gi.warn("".concat(this._className, "._genFileUrl no authKey!")), "";n || (n = "".concat(Math.floor(1e5 * Math.random()), "-").concat(Date.now()));var o = this.getModule(Hc).getSDKAppID();return "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(o, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.FILE, "&openid=").concat(t, "&ver=0&filename=").concat(encodeURIComponent(n));} }, { key: "_genVideoUrl", value: function value(e, t) {if ("" === this._authKey) return Gi.warn("".concat(this._className, "._genVideoUrl no authKey!")), "";var n = this.getModule(Hc).getSDKAppID();return "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(n, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.VIDEO, "&openid=").concat(t, "&ver=0");} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._authKey = "", this.expireTime = 0;} }]), n;}(rl),av = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "UploadModule", o.TIMUploadPlugin = null, o.timUploadPlugin = null, o.COSSDK = null, o._cosUploadMethod = null, o.expiredTimeLimit = 600, o.appid = 0, o.bucketName = "", o.ciUrl = "", o.directory = "", o.downloadUrl = "", o.uploadUrl = "", o.region = "ap-shanghai", o.cos = null, o.cosOptions = { secretId: "", secretKey: "", sessionToken: "", expiredTime: 0 }, o.uploadFileType = "", o.duration = 900, o.tryCount = 0, o.getInnerEmitterInstance().on(lm.CONTEXT_A2KEY_AND_TINYID_UPDATED, o._init, $n(o)), o;}return Pn(n, [{ key: "_init", value: function value() {var e = "".concat(this._className, "._init"),t = this.getModule(Jc);if (this.TIMUploadPlugin = t.getPlugin("tim-upload-plugin"), this.TIMUploadPlugin) this._initUploaderMethod();else {var n = Zs ? "cos-wx-sdk" : "cos-js-sdk";this.COSSDK = t.getPlugin(n), this.COSSDK ? (this._getAuthorizationKey(), Gi.warn("".concat(e, " v2.9.2起推荐使用 tim-upload-plugin 代替 ").concat(n, "，上传更快更安全。详细请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#registerPlugin"))) : Gi.warn("".concat(e, " 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#registerPlugin"));}} }, { key: "_getAuthorizationKey", value: function value() {var e = this,t = new Fd(Wd),n = Math.ceil(Date.now() / 1e3);this.request({ protocolName: rp, requestData: { duration: this.expiredTimeLimit } }).then(function (o) {var r = o.data;Gi.log("".concat(e._className, "._getAuthorizationKey ok. data:"), r);var a = r.expiredTime - n;t.setMessage("requestId:".concat(r.requestId, " requestTime:").concat(n, " expiredTime:").concat(r.expiredTime, " diff:").concat(a, "s")).setNetworkType(e.getNetworkType()).end(), !Zs && r.region && (e.region = r.region), e.appid = r.appid, e.bucketName = r.bucketName, e.ciUrl = r.ciUrl, e.directory = r.directory, e.downloadUrl = r.downloadUrl, e.uploadUrl = r.uploadUrl, e.cosOptions = { secretId: r.secretId, secretKey: r.secretKey, sessionToken: r.sessionToken, expiredTime: r.expiredTime }, Gi.log("".concat(e._className, "._getAuthorizationKey ok. region:").concat(e.region, " bucketName:").concat(e.bucketName)), e._initUploaderMethod();}).catch(function (n) {e.probeNetwork().then(function (e) {var o = Wn(e, 2),r = o[0],a = o[1];t.setError(n, r, a).end();}), Gi.warn("".concat(e._className, "._getAuthorizationKey failed. error:"), n);});} }, { key: "_getCosPreSigUrl", value: function value(e) {var t = this,n = "".concat(this._className, "._getCosPreSigUrl"),o = Math.ceil(Date.now() / 1e3),r = new Fd(Jd);return this.request({ protocolName: ap, requestData: { fileType: e.fileType, fileName: e.fileName, uploadMethod: e.uploadMethod, duration: e.duration } }).then(function (e) {t.tryCount = 0;var a = e.data || {},s = a.expiredTime - o;return Gi.log("".concat(n, " ok. data:"), a), r.setMessage("requestId:".concat(a.requestId, " expiredTime:").concat(a.expiredTime, " diff:").concat(s, "s")).setNetworkType(t.getNetworkType()).end(), a;}).catch(function (o) {return -1 === o.code && (o.code = fp.COS_GET_SIG_FAIL), t.probeNetwork().then(function (e) {var t = Wn(e, 2),n = t[0],a = t[1];r.setError(o, n, a).end();}), Gi.warn("".concat(n, " failed. error:"), o), t.tryCount < 1 ? (t.tryCount++, t._getCosPreSigUrl(e)) : (t.tryCount = 0, Z_({ code: fp.COS_GET_SIG_FAIL, message: Dp }));});} }, { key: "_initUploaderMethod", value: function value() {var e = this;if (this.TIMUploadPlugin) return this.timUploadPlugin = new this.TIMUploadPlugin(), void (this._cosUploadMethod = function (t, n) {e.timUploadPlugin.uploadFile(t, n);});this.appid && (this.cos = Zs ? new this.COSSDK({ ForcePathStyle: !0, getAuthorization: this._getAuthorization.bind(this) }) : new this.COSSDK({ getAuthorization: this._getAuthorization.bind(this) }), this._cosUploadMethod = Zs ? function (t, n) {e.cos.postObject(t, n);} : function (t, n) {e.cos.uploadFiles(t, n);});} }, { key: "onCheckTimer", value: function value(e) {this.COSSDK && (this.TIMUploadPlugin || this.isLoggedIn() && e % 60 == 0 && Math.ceil(Date.now() / 1e3) >= this.cosOptions.expiredTime - 120 && this._getAuthorizationKey());} }, { key: "_getAuthorization", value: function value(e, t) {t({ TmpSecretId: this.cosOptions.secretId, TmpSecretKey: this.cosOptions.secretKey, XCosSecurityToken: this.cosOptions.sessionToken, ExpiredTime: this.cosOptions.expiredTime });} }, { key: "upload", value: function value(e) {if (!0 === e.getRelayFlag()) return Promise.resolve();var t = this.getModule(ol);switch (e.type) {case ro.MSG_IMAGE:return t.addTotalCount(Ld), this._uploadImage(e);case ro.MSG_FILE:return t.addTotalCount(Ld), this._uploadFile(e);case ro.MSG_AUDIO:return t.addTotalCount(Ld), this._uploadAudio(e);case ro.MSG_VIDEO:return t.addTotalCount(Ld), this._uploadVideo(e);default:return Promise.resolve();}} }, { key: "_uploadImage", value: function value(e) {var t = this.getModule(Uc),n = e.getElements()[0],o = t.getMessageOptionByID(e.ID);return this.doUploadImage({ file: o.payload.file, to: o.to, onProgress: function onProgress(e) {if (n.updatePercent(e), ji(o.onProgress)) try {o.onProgress(e);} catch (t) {return Z_({ code: fp.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: Np });}} }).then(function (t) {var o = t.location,r = t.fileType,a = t.fileSize,s = t.width,i = t.height,u = su(o);n.updateImageFormat(r);var c = mu({ originUrl: u, originWidth: s, originHeight: i, min: 198 }),l = mu({ originUrl: u, originWidth: s, originHeight: i, min: 720 });return n.updateImageInfoArray([{ size: a, url: u, width: s, height: i }, Fn({}, l), Fn({}, c)]), e;});} }, { key: "_uploadFile", value: function value(e) {var t = this.getModule(Uc),n = e.getElements()[0],o = t.getMessageOptionByID(e.ID);return this.doUploadFile({ file: o.payload.file, to: o.to, onProgress: function onProgress(e) {if (n.updatePercent(e), ji(o.onProgress)) try {o.onProgress(e);} catch (t) {return Z_({ code: fp.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: Np });}} }).then(function (t) {var o = t.location,r = su(o);return n.updateFileUrl(r), e;});} }, { key: "_uploadAudio", value: function value(e) {var t = this.getModule(Uc),n = e.getElements()[0],o = t.getMessageOptionByID(e.ID);return this.doUploadAudio({ file: o.payload.file, to: o.to, onProgress: function onProgress(e) {if (n.updatePercent(e), ji(o.onProgress)) try {o.onProgress(e);} catch (t) {return Z_({ code: fp.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: Np });}} }).then(function (t) {var o = t.location,r = su(o);return n.updateAudioUrl(r), e;});} }, { key: "_uploadVideo", value: function value(e) {var t = this.getModule(Uc),n = e.getElements()[0],o = t.getMessageOptionByID(e.ID);return this.doUploadVideo({ file: o.payload.file, to: o.to, onProgress: function onProgress(e) {if (n.updatePercent(e), ji(o.onProgress)) try {o.onProgress(e);} catch (t) {return Z_({ code: fp.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: Np });}} }).then(function (t) {var o = su(t.location);return n.updateVideoUrl(o), e;});} }, { key: "doUploadImage", value: function value(e) {if (!e.file) return Z_({ code: fp.MESSAGE_IMAGE_SELECT_FILE_FIRST, message: Rp });var t = this._checkImageType(e.file);if (!0 !== t) return t;var n = this._checkImageSize(e.file);if (!0 !== n) return n;var o = null;return this._setUploadFileType(hm), this.uploadByCOS(e).then(function (e) {return o = e, t = "https://".concat(e.location), Zs ? new Promise(function (e, n) {ti.getImageInfo({ src: t, success: function success(t) {e({ width: t.width, height: t.height });}, fail: function fail() {e({ width: 0, height: 0 });} });}) : gi && 9 === hi ? Promise.resolve({ width: 0, height: 0 }) : new Promise(function (e, n) {var o = new Image();o.onload = function () {e({ width: this.width, height: this.height }), o = null;}, o.onerror = function () {e({ width: 0, height: 0 }), o = null;}, o.src = t;});var t;}).then(function (e) {return o.width = e.width, o.height = e.height, Promise.resolve(o);});} }, { key: "_checkImageType", value: function value(e) {var t = "";return t = Zs ? e.url.slice(e.url.lastIndexOf(".") + 1) : e.files[0].name.slice(e.files[0].name.lastIndexOf(".") + 1), dm.indexOf(t.toLowerCase()) >= 0 || Z_({ code: fp.MESSAGE_IMAGE_TYPES_LIMIT, message: bp });} }, { key: "_checkImageSize", value: function value(e) {var t = 0;return 0 === (t = Zs ? e.size : e.files[0].size) ? Z_({ code: fp.MESSAGE_FILE_IS_EMPTY, message: "".concat(kp) }) : t < 20971520 || Z_({ code: fp.MESSAGE_IMAGE_SIZE_LIMIT, message: "".concat(wp) });} }, { key: "doUploadFile", value: function value(e) {var t = null;return e.file ? e.file.files[0].size > 104857600 ? Z_(t = { code: fp.MESSAGE_FILE_SIZE_LIMIT, message: Kp }) : 0 === e.file.files[0].size ? (t = { code: fp.MESSAGE_FILE_IS_EMPTY, message: "".concat(kp) }, Z_(t)) : (this._setUploadFileType(mm), this.uploadByCOS(e)) : Z_(t = { code: fp.MESSAGE_FILE_SELECT_FILE_FIRST, message: Vp });} }, { key: "doUploadVideo", value: function value(e) {return e.file.videoFile.size > 104857600 ? Z_({ code: fp.MESSAGE_VIDEO_SIZE_LIMIT, message: "".concat(Fp) }) : 0 === e.file.videoFile.size ? Z_({ code: fp.MESSAGE_FILE_IS_EMPTY, message: "".concat(kp) }) : -1 === gm.indexOf(e.file.videoFile.type) ? Z_({ code: fp.MESSAGE_VIDEO_TYPES_LIMIT, message: "".concat(qp) }) : (this._setUploadFileType(fm), Zs ? this.handleVideoUpload({ file: e.file.videoFile, onProgress: e.onProgress }) : ei ? this.handleVideoUpload(e) : void 0);} }, { key: "handleVideoUpload", value: function value(e) {var t = this;return new Promise(function (n, o) {t.uploadByCOS(e).then(function (e) {n(e);}).catch(function () {t.uploadByCOS(e).then(function (e) {n(e);}).catch(function () {o(new W_({ code: fp.MESSAGE_VIDEO_UPLOAD_FAIL, message: Up }));});});});} }, { key: "doUploadAudio", value: function value(e) {return e.file ? e.file.size > 20971520 ? Z_(new W_({ code: fp.MESSAGE_AUDIO_SIZE_LIMIT, message: "".concat(Gp) })) : 0 === e.file.size ? Z_(new W_({ code: fp.MESSAGE_FILE_IS_EMPTY, message: "".concat(kp) })) : (this._setUploadFileType(_m), this.uploadByCOS(e)) : Z_(new W_({ code: fp.MESSAGE_AUDIO_UPLOAD_FAIL, message: Pp }));} }, { key: "uploadByCOS", value: function value(e) {var t = this,n = "".concat(this._className, ".uploadByCOS");if (!ji(this._cosUploadMethod)) return Gi.warn("".concat(n, " 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#registerPlugin")), Z_({ code: fp.COS_UNDETECTED, message: Tp });if (this.timUploadPlugin) return this._uploadWithPreSigUrl(e);var o = new Fd(Xd),r = Date.now(),a = Zs ? e.file : e.file.files[0];return new Promise(function (s, i) {var u = Zs ? t._createCosOptionsWXMiniApp(e) : t._createCosOptionsWeb(e),c = t;t._cosUploadMethod(u, function (e, u) {var l = Object.create(null);if (u) {if (e || Ki(u.files) && u.files[0].error) {var p = new W_({ code: fp.MESSAGE_FILE_UPLOAD_FAIL, message: xp });return o.setError(p, !0, t.getNetworkType()).end(), Gi.log("".concat(n, " failed. error:"), u.files[0].error), 403 === u.files[0].error.statusCode && (Gi.warn("".concat(n, " failed. cos AccessKeyId was invalid, regain auth key!")), t._getAuthorizationKey()), void i(p);}l.fileName = a.name, l.fileSize = a.size, l.fileType = a.type.slice(a.type.indexOf("/") + 1).toLowerCase(), l.location = Zs ? u.Location : u.files[0].data.Location;var d = Date.now() - r,g = c._formatFileSize(a.size),h = c._formatSpeed(1e3 * a.size / d),f = "size:".concat(g, " time:").concat(d, "ms speed:").concat(h);Gi.log("".concat(n, " success. name:").concat(a.name, " ").concat(f)), s(l);var _ = t.getModule(ol);return _.addCost(Ld, d), _.addFileSize(Ld, a.size), void o.setNetworkType(t.getNetworkType()).setMessage(f).end();}var m = new W_({ code: fp.MESSAGE_FILE_UPLOAD_FAIL, message: xp });o.setError(m, !0, c.getNetworkType()).end(), Gi.warn("".concat(n, " failed. error:"), e), 403 === e.statusCode && (Gi.warn("".concat(n, " failed. cos AccessKeyId was invalid, regain auth key!")), t._getAuthorizationKey()), i(m);});});} }, { key: "_uploadWithPreSigUrl", value: function value(e) {var t = this,n = "".concat(this._className, "._uploadWithPreSigUrl"),o = Zs ? e.file : e.file.files[0];return this._createCosOptionsPreSigUrl(e).then(function (e) {return new Promise(function (r, a) {var s = new Fd(Xd);Gi.time(Dd), t._cosUploadMethod(e, function (e, i) {var u = Object.create(null);if (e || 403 === i.statusCode) {var c = new W_({ code: fp.MESSAGE_FILE_UPLOAD_FAIL, message: xp });return s.setError(c, !0, t.getNetworkType()).end(), Gi.log("".concat(n, " failed, error:"), e), void a(c);}var l = i.data.location || "";0 !== l.indexOf("https://") && 0 !== l.indexOf("http://") || (l = l.split("//")[1]), u.fileName = o.name, u.fileSize = o.size, u.fileType = o.type.slice(o.type.indexOf("/") + 1).toLowerCase(), u.location = l;var p = Gi.timeEnd(Dd),d = t._formatFileSize(o.size),g = t._formatSpeed(1e3 * o.size / p),h = "size:".concat(d, ",time:").concat(p, "ms,speed:").concat(g);Gi.log("".concat(n, " success name:").concat(o.name, ",").concat(h)), s.setNetworkType(t.getNetworkType()).setMessage(h).end();var f = t.getModule(ol);f.addCost(Ld, p), f.addFileSize(Ld, o.size), r(u);});});});} }, { key: "_formatFileSize", value: function value(e) {return e < 1024 ? e + "B" : e < 1048576 ? Math.floor(e / 1024) + "KB" : Math.floor(e / 1048576) + "MB";} }, { key: "_formatSpeed", value: function value(e) {return e <= 1048576 ? yu(e / 1024, 1) + "KB/s" : yu(e / 1048576, 1) + "MB/s";} }, { key: "_createCosOptionsWeb", value: function value(e) {var t = this.getMyUserID(),n = this._genFileName(t, e.to, e.file.files[0].name);return { files: [{ Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(n), Body: e.file.files[0] }], SliceSize: 1048576, onProgress: function onProgress(t) {if ("function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {Gi.warn("onProgress callback error:", n);}}, onFileFinish: function onFileFinish(e, t, n) {} };} }, { key: "_createCosOptionsWXMiniApp", value: function value(e) {var t = this.getMyUserID(),n = this._genFileName(t, e.to, e.file.name),o = e.file.url;return { Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(n), FilePath: o, onProgress: function onProgress(t) {if (Gi.log(JSON.stringify(t)), "function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {Gi.warn("onProgress callback error:", n);}} };} }, { key: "_createCosOptionsPreSigUrl", value: function value(e) {var t = this,n = "",o = "",r = 0;return Zs ? (n = this._genFileName(e.file.name), o = e.file.url, r = 1) : (n = this._genFileName("".concat(eu(999999))), o = e.file.files[0], r = 0), this._getCosPreSigUrl({ fileType: this.uploadFileType, fileName: n, uploadMethod: r, duration: this.duration }).then(function (r) {var a = r.uploadUrl,s = r.downloadUrl;return { url: a, fileType: t.uploadFileType, fileName: n, resources: o, downloadUrl: s, onProgress: function onProgress(t) {if ("function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {Gi.warn("onProgress callback error:", n), Gi.error(n);}} };});} }, { key: "_genFileName", value: function value(e) {return "".concat(fu(), "-").concat(e);} }, { key: "_setUploadFileType", value: function value(e) {this.uploadFileType = e;} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset"));} }]), n;}(rl),sv = function () {function e(t) {bn(this, e), this._className = "MergerMessageHandler", this._messageModule = t;}return Pn(e, [{ key: "uploadMergerMessage", value: function value(e, t) {var n = this;Gi.debug("".concat(this._className, ".uploadMergerMessage message:"), e, "messageBytes:".concat(t));var o = e.payload.messageList,r = o.length,a = new Fd(ig);return this._messageModule.request({ protocolName: pp, requestData: { messageList: o } }).then(function (e) {Gi.debug("".concat(n._className, ".uploadMergerMessage ok. response:"), e.data);var o = e.data,s = o.pbDownloadKey,i = o.downloadKey,u = { pbDownloadKey: s, downloadKey: i, messageNumber: r };return a.setNetworkType(n._messageModule.getNetworkType()).setMessage("".concat(r, "-").concat(t, "-").concat(i)).end(), u;}).catch(function (e) {throw Gi.warn("".concat(n._className, ".uploadMergerMessage failed. error:"), e), n._messageModule.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];a.setError(e, o, r).end();}), e;});} }, { key: "downloadMergerMessage", value: function value(e) {var t = this;Gi.debug("".concat(this._className, ".downloadMergerMessage message:"), e);var n = e.payload.downloadKey,o = new Fd(ug);return o.setMessage("downloadKey:".concat(n)), this._messageModule.request({ protocolName: dp, requestData: { downloadKey: n } }).then(function (n) {if (Gi.debug("".concat(t._className, ".downloadMergerMessage ok. response:"), n.data), ji(e.clearElement)) {var r = e.payload,a = (r.downloadKey, r.pbDownloadKey, r.messageList, jn(r, ["downloadKey", "pbDownloadKey", "messageList"]));e.clearElement(), e.setElement({ type: e.type, content: Fn({ messageList: n.data.messageList }, a) });} else {var s = [];n.data.messageList.forEach(function (e) {if (!Du(e)) {var t = new q_(e);s.push(t);}}), e.payload.messageList = s, e.payload.downloadKey = "", e.payload.pbDownloadKey = "";}return o.setNetworkType(t._messageModule.getNetworkType()).end(), e;}).catch(function (e) {throw Gi.warn("".concat(t._className, ".downloadMergerMessage failed. key:").concat(n, " error:"), e), t._messageModule.probeNetwork().then(function (t) {var n = Wn(t, 2),r = n[0],a = n[1];o.setError(e, r, a).end();}), e;});} }, { key: "createMergerMessagePack", value: function value(e, t, n) {return e.conversationType === ro.CONV_C2C ? this._createC2CMergerMessagePack(e, t, n) : this._createGroupMergerMessagePack(e, t, n);} }, { key: "_createC2CMergerMessagePack", value: function value(e, t, n) {var o = null;t && (t.offlinePushInfo && (o = t.offlinePushInfo), !0 === t.onlineUserOnly && (o ? o.disablePush = !0 : o = { disablePush: !0 }));var r = "";qi(e.cloudCustomData) && e.cloudCustomData.length > 0 && (r = e.cloudCustomData);var a = n.pbDownloadKey,s = n.downloadKey,i = n.messageNumber,u = e.payload,c = u.title,l = u.abstractList,p = u.compatibleText,d = this._messageModule.getModule(qc);return { protocolName: ll, tjgID: this._messageModule.generateTjgID(e), requestData: { fromAccount: this._messageModule.getMyUserID(), toAccount: e.to, msgBody: [{ msgType: e.type, msgContent: { pbDownloadKey: a, downloadKey: s, title: c, abstractList: l, compatibleText: p, messageNumber: i } }], cloudCustomData: r, msgSeq: e.sequence, msgRandom: e.random, msgLifeTime: d && d.isOnlineMessage(e, t) ? 0 : void 0, offlinePushInfo: o ? { pushFlag: !0 === o.disablePush ? 1 : 0, title: o.title || "", desc: o.description || "", ext: o.extension || "", apnsInfo: { badgeMode: !0 === o.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: o.androidOPPOChannelID || "" } } : void 0 } };} }, { key: "_createGroupMergerMessagePack", value: function value(e, t, n) {var o = null;t && t.offlinePushInfo && (o = t.offlinePushInfo);var r = "";qi(e.cloudCustomData) && e.cloudCustomData.length > 0 && (r = e.cloudCustomData);var a = n.pbDownloadKey,s = n.downloadKey,i = n.messageNumber,u = e.payload,c = u.title,l = u.abstractList,p = u.compatibleText,d = this._messageModule.getModule(xc);return { protocolName: pl, tjgID: this._messageModule.generateTjgID(e), requestData: { fromAccount: this._messageModule.getMyUserID(), groupID: e.to, msgBody: [{ msgType: e.type, msgContent: { pbDownloadKey: a, downloadKey: s, title: c, abstractList: l, compatibleText: p, messageNumber: i } }], random: e.random, priority: e.priority, clientSequence: e.clientSequence, groupAtInfo: void 0, cloudCustomData: r, onlineOnlyFlag: d && d.isOnlineMessage(e, t) ? 1 : 0, offlinePushInfo: o ? { pushFlag: !0 === o.disablePush ? 1 : 0, title: o.title || "", desc: o.description || "", ext: o.extension || "", apnsInfo: { badgeMode: !0 === o.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: o.androidOPPOChannelID || "" } } : void 0 } };} }]), e;}(),iv = { ERR_SVR_COMM_SENSITIVE_TEXT: 80001, ERR_SVR_COMM_BODY_SIZE_LIMIT: 80002, ERR_SVR_MSG_PKG_PARSE_FAILED: 20001, ERR_SVR_MSG_INTERNAL_AUTH_FAILED: 20002, ERR_SVR_MSG_INVALID_ID: 20003, ERR_SVR_MSG_PUSH_DENY: 20006, ERR_SVR_MSG_IN_PEER_BLACKLIST: 20007, ERR_SVR_MSG_BOTH_NOT_FRIEND: 20009, ERR_SVR_MSG_NOT_PEER_FRIEND: 20010, ERR_SVR_MSG_NOT_SELF_FRIEND: 20011, ERR_SVR_MSG_SHUTUP_DENY: 20012, ERR_SVR_GROUP_INVALID_PARAMETERS: 10004, ERR_SVR_GROUP_PERMISSION_DENY: 10007, ERR_SVR_GROUP_NOT_FOUND: 10010, ERR_SVR_GROUP_INVALID_GROUPID: 10015, ERR_SVR_GROUP_REJECT_FROM_THIRDPARTY: 10016, ERR_SVR_GROUP_SHUTUP_DENY: 10017, MESSAGE_SEND_FAIL: 2100 },uv = [fp.MESSAGE_ONPROGRESS_FUNCTION_ERROR, fp.MESSAGE_IMAGE_SELECT_FILE_FIRST, fp.MESSAGE_IMAGE_TYPES_LIMIT, fp.MESSAGE_FILE_IS_EMPTY, fp.MESSAGE_IMAGE_SIZE_LIMIT, fp.MESSAGE_FILE_SELECT_FILE_FIRST, fp.MESSAGE_FILE_SIZE_LIMIT, fp.MESSAGE_VIDEO_SIZE_LIMIT, fp.MESSAGE_VIDEO_TYPES_LIMIT, fp.MESSAGE_AUDIO_UPLOAD_FAIL, fp.MESSAGE_AUDIO_SIZE_LIMIT, fp.COS_UNDETECTED];var cv = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "MessageModule", o._messageOptionsMap = new Map(), o._mergerMessageHandler = new sv($n(o)), o;}return Pn(n, [{ key: "createTextMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t;var n = new K_(e),o = "string" == typeof e.payload ? e.payload : e.payload.text,r = new ch({ text: o }),a = this._getNickAndAvatarByUserID(t);return n.setElement(r), n.setNickAndAvatar(a), n.setNameCard(this._getNameCardByGroupID(n)), n;} }, { key: "createImageMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t;var n = new K_(e);if (Zs) {var o = e.payload.file;if (Ui(o)) return void Gi.warn("小程序环境下调用 createImageMessage 接口时，payload.file 不支持传入 File 对象");var r = o.tempFilePaths[0],a = { url: r, name: r.slice(r.lastIndexOf("/") + 1), size: o.tempFiles && o.tempFiles[0].size || 1, type: r.slice(r.lastIndexOf(".") + 1).toLowerCase() };e.payload.file = a;} else if (ei) if (Ui(e.payload.file)) {var s = e.payload.file;e.payload.file = { files: [s] };} else if (Vi(e.payload.file) && "undefined" != typeof uni) {var i = e.payload.file.tempFiles[0];e.payload.file = { files: [i] };}var u = new S_({ imageFormat: f_.IMAGE_FORMAT.UNKNOWN, uuid: this._generateUUID(), file: e.payload.file }),c = this._getNickAndAvatarByUserID(t);return n.setElement(u), n.setNickAndAvatar(c), n.setNameCard(this._getNameCardByGroupID(n)), this._messageOptionsMap.set(n.ID, e), n;} }, { key: "createAudioMessage", value: function value(e) {if (Zs) {var t = e.payload.file;if (Zs) {var n = { url: t.tempFilePath, name: t.tempFilePath.slice(t.tempFilePath.lastIndexOf("/") + 1), size: t.fileSize, second: parseInt(t.duration) / 1e3, type: t.tempFilePath.slice(t.tempFilePath.lastIndexOf(".") + 1).toLowerCase() };e.payload.file = n;}var o = this.getMyUserID();e.currentUser = o;var r = new K_(e),a = new D_({ second: Math.floor(t.duration / 1e3), size: t.fileSize, url: t.tempFilePath, uuid: this._generateUUID() }),s = this._getNickAndAvatarByUserID(o);return r.setElement(a), r.setNickAndAvatar(s), r.setNameCard(this._getNameCardByGroupID(r)), this._messageOptionsMap.set(r.ID, e), r;}Gi.warn("createAudioMessage 目前只支持小程序环境下发语音消息");} }, { key: "createVideoMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t, e.payload.file.thumbUrl = "https://web.sdk.qcloud.com/im/assets/images/transparent.png", e.payload.file.thumbSize = 1668;var n = {};if (Zs) {if (Xs) return void Gi.warn("createVideoMessage 不支持在支付宝小程序环境下使用");if (Ui(e.payload.file)) return void Gi.warn("小程序环境下调用 createVideoMessage 接口时，payload.file 不支持传入 File 对象");var o = e.payload.file;n.url = o.tempFilePath, n.name = o.tempFilePath.slice(o.tempFilePath.lastIndexOf("/") + 1), n.size = o.size, n.second = o.duration, n.type = o.tempFilePath.slice(o.tempFilePath.lastIndexOf(".") + 1).toLowerCase();} else if (ei) {if (Ui(e.payload.file)) {var r = e.payload.file;e.payload.file.files = [r];} else if (Vi(e.payload.file) && "undefined" != typeof uni) {var a = e.payload.file.tempFile;e.payload.file.files = [a];}var s = e.payload.file;n.url = window.URL.createObjectURL(s.files[0]), n.name = s.files[0].name, n.size = s.files[0].size, n.second = s.files[0].duration || 0, n.type = s.files[0].type.split("/")[1];}e.payload.file.videoFile = n;var i = new K_(e),u = new U_({ videoFormat: n.type, videoSecond: yu(n.second, 0), videoSize: n.size, remoteVideoUrl: "", videoUrl: n.url, videoUUID: this._generateUUID(), thumbUUID: this._generateUUID(), thumbWidth: e.payload.file.width || 200, thumbHeight: e.payload.file.height || 200, thumbUrl: e.payload.file.thumbUrl, thumbSize: e.payload.file.thumbSize, thumbFormat: e.payload.file.thumbUrl.slice(e.payload.file.thumbUrl.lastIndexOf(".") + 1).toLowerCase() }),c = this._getNickAndAvatarByUserID(t);return i.setElement(u), i.setNickAndAvatar(c), i.setNameCard(this._getNameCardByGroupID(i)), this._messageOptionsMap.set(i.ID, e), i;} }, { key: "createCustomMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t;var n = new K_(e),o = new G_({ data: e.payload.data, description: e.payload.description, extension: e.payload.extension }),r = this._getNickAndAvatarByUserID(t);return n.setElement(o), n.setNickAndAvatar(r), n.setNameCard(this._getNameCardByGroupID(n)), n;} }, { key: "createFaceMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t;var n = new K_(e),o = new T_(e.payload),r = this._getNickAndAvatarByUserID(t);return n.setElement(o), n.setNickAndAvatar(r), n.setNameCard(this._getNameCardByGroupID(n)), n;} }, { key: "createMergerMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t;var n = this._getNickAndAvatarByUserID(t),o = new K_(e),r = new x_(e.payload);return o.setElement(r), o.setNickAndAvatar(n), o.setNameCard(this._getNameCardByGroupID(o)), o.setRelayFlag(!0), o;} }, { key: "createForwardMessage", value: function value(e) {var t = e.to,n = e.conversationType,o = e.priority,r = e.payload,a = this.getMyUserID(),s = this._getNickAndAvatarByUserID(a);if (r.type === ro.MSG_GRP_TIP) return Z_(new W_({ code: fp.MESSAGE_FORWARD_TYPE_INVALID, message: Yp }));var i = { to: t, conversationType: n, conversationID: "".concat(n).concat(t), priority: o, isPlaceMessage: 0, status: vc.UNSEND, currentUser: a, cloudCustomData: e.cloudCustomData || r.cloudCustomData || "" },u = new K_(i);return u.setElement(r.getElements()[0]), u.setNickAndAvatar(s), u.setNameCard(this._getNameCardByGroupID(r)), u.setRelayFlag(!0), u;} }, { key: "downloadMergerMessage", value: function value(e) {return this._mergerMessageHandler.downloadMergerMessage(e);} }, { key: "createFileMessage", value: function value(e) {if (!Zs) {if (ei) if (Ui(e.payload.file)) {var t = e.payload.file;e.payload.file = { files: [t] };} else if (Vi(e.payload.file) && "undefined" != typeof uni) {var n = e.payload.file.tempFiles[0];e.payload.file = { files: [n] };}var o = this.getMyUserID();e.currentUser = o;var r = new K_(e),a = new P_({ uuid: this._generateUUID(), file: e.payload.file }),s = this._getNickAndAvatarByUserID(o);return r.setElement(a), r.setNickAndAvatar(s), r.setNameCard(this._getNameCardByGroupID(r)), this._messageOptionsMap.set(r.ID, e), r;}Gi.warn("小程序目前不支持选择文件， createFileMessage 接口不可用！");} }, { key: "_onCannotFindModule", value: function value() {return Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "sendMessageInstance", value: function value(e, t) {var n,o = this,r = null;switch (e.conversationType) {case ro.CONV_C2C:if (!(r = this.getModule(qc))) return this._onCannotFindModule();break;case ro.CONV_GROUP:if (!(r = this.getModule(xc))) return this._onCannotFindModule();break;default:return Z_({ code: fp.MESSAGE_SEND_INVALID_CONVERSATION_TYPE, message: Ap });}var a = this.getModule(Wc),s = this.getModule(xc);return a.upload(e).then(function () {o._getSendMessageSpecifiedKey(e) === Od && o.getModule(ol).addSuccessCount(Ld);return s.guardForAVChatRoom(e).then(function () {if (!e.isSendable()) return Z_({ code: fp.MESSAGE_FILE_URL_IS_EMPTY, message: Bp });o._addSendMessageTotalCount(e), n = Date.now();var a = function (e) {var t = "utf-8";ei && document && (t = document.charset.toLowerCase());var n,o,r = 0;if (o = e.length, "utf-8" === t || "utf8" === t) for (var a = 0; a < o; a++) {(n = e.codePointAt(a)) <= 127 ? r += 1 : n <= 2047 ? r += 2 : n <= 65535 ? r += 3 : (r += 4, a++);} else if ("utf-16" === t || "utf16" === t) for (var s = 0; s < o; s++) {(n = e.codePointAt(s)) <= 65535 ? r += 2 : (r += 4, s++);} else r = e.replace(/[^\x00-\xff]/g, "aa").length;return r;}(JSON.stringify(e));return e.type === ro.MSG_MERGER && a > 7e3 ? o._mergerMessageHandler.uploadMergerMessage(e, a).then(function (n) {var r = o._mergerMessageHandler.createMergerMessagePack(e, t, n);return o.request(r);}) : (o.getModule(Bc).setMessageRandom(e), e.conversationType === ro.CONV_C2C || e.conversationType === ro.CONV_GROUP ? r.sendMessage(e, t) : void 0);}).then(function (a) {var s = a.data,i = s.time,u = s.sequence;o._addSendMessageSuccessCount(e, n), o._messageOptionsMap.delete(e.ID);var c = o.getModule(Bc);e.status = vc.SUCCESS, e.time = i;var l = !1;if (e.conversationType === ro.CONV_GROUP) e.sequence = u, e.generateMessageID(o.getMyUserID());else if (e.conversationType === ro.CONV_C2C) {var p = c.getLatestMessageSentByMe(e.conversationID);if (p) {var d = p.nick,g = p.avatar;d === e.nick && g === e.avatar || (l = !0);}}return c.appendToMessageList(e), l && c.modifyMessageSentByMe({ conversationID: e.conversationID, latestNick: e.nick, latestAvatar: e.avatar }), r.isOnlineMessage(e, t) ? e.setOnlineOnlyFlag(!0) : c.onMessageSent({ conversationOptionsList: [{ conversationID: e.conversationID, unreadCount: 0, type: e.conversationType, subType: e.conversationSubType, lastMessage: e }] }), e.getRelayFlag() || "TIMImageElem" !== e.type || vu(e.payload.imageInfoArray), B_({ message: e });});}).catch(function (t) {return o._onSendMessageFailed(e, t);});} }, { key: "_onSendMessageFailed", value: function value(e, t) {e.status = vc.FAIL, this.getModule(Bc).deleteMessageRandom(e), this._addSendMessageFailCountOnUser(e, t);var n = new Fd(Qd);return n.setMessage("tjg_id:".concat(this.generateTjgID(e), " type:").concat(e.type, " from:").concat(e.from, " to:").concat(e.to)), this.probeNetwork().then(function (e) {var o = Wn(e, 2),r = o[0],a = o[1];n.setError(t, r, a).end();}), Gi.error("".concat(this._className, "._onSendMessageFailed error:"), t), Z_(new W_({ code: t && t.code ? t.code : fp.MESSAGE_SEND_FAIL, message: t && t.message ? t.message : Ep, data: { message: e } }));} }, { key: "_getSendMessageSpecifiedKey", value: function value(e) {if ([ro.MSG_IMAGE, ro.MSG_AUDIO, ro.MSG_VIDEO, ro.MSG_FILE].includes(e.type)) return Od;if (e.conversationType === ro.CONV_C2C) return Ad;if (e.conversationType === ro.CONV_GROUP) {var t = this.getModule(xc).getLocalGroupProfile(e.to);if (!t) return;var n = t.type;return lu(n) ? Nd : kd;}} }, { key: "_addSendMessageTotalCount", value: function value(e) {var t = this._getSendMessageSpecifiedKey(e);t && this.getModule(ol).addTotalCount(t);} }, { key: "_addSendMessageSuccessCount", value: function value(e, t) {var n = Math.abs(Date.now() - t),o = this._getSendMessageSpecifiedKey(e);if (o) {var r = this.getModule(ol);r.addSuccessCount(o), r.addCost(o, n);}} }, { key: "_addSendMessageFailCountOnUser", value: function value(e, t) {var n,o,r = t.code,a = void 0 === r ? -1 : r,s = this.getModule(ol),i = this._getSendMessageSpecifiedKey(e);i === Od && (n = a, o = !1, uv.includes(n) && (o = !0), o) ? s.addFailedCountOfUserSide(Ld) : function (e) {var t = !1;return Object.values(iv).includes(e) && (t = !0), (e >= 120001 && e <= 13e4 || e >= 10100 && e <= 10200) && (t = !0), t;}(a) && i && s.addFailedCountOfUserSide(i);} }, { key: "resendMessage", value: function value(e) {return e.isResend = !0, e.status = vc.UNSEND, this.sendMessageInstance(e);} }, { key: "revokeMessage", value: function value(e) {var t = this,n = null;if (e.conversationType === ro.CONV_C2C) {if (!(n = this.getModule(qc))) return this._onCannotFindModule();} else if (e.conversationType === ro.CONV_GROUP && !(n = this.getModule(xc))) return this._onCannotFindModule();var o = new Fd(tg);return o.setMessage("tjg_id:".concat(this.generateTjgID(e), " type:").concat(e.type, " from:").concat(e.from, " to:").concat(e.to)), n.revokeMessage(e).then(function (n) {var r = n.data.recallRetList;if (!Du(r) && 0 !== r[0].retCode) {var a = new W_({ code: r[0].retCode, message: z_[r[0].retCode] || Op, data: { message: e } });return o.setCode(a.code).setMoreMessage(a.message).end(), Z_(a);}return Gi.info("".concat(t._className, ".revokeMessage ok. ID:").concat(e.ID)), e.isRevoked = !0, o.end(), t.getModule(Bc).onMessageRevoked([e]), B_({ message: e });}).catch(function (n) {t.probeNetwork().then(function (e) {var t = Wn(e, 2),r = t[0],a = t[1];o.setError(n, r, a).end();});var r = new W_({ code: n && n.code ? n.code : fp.MESSAGE_REVOKE_FAIL, message: n && n.message ? n.message : Op, data: { message: e } });return Gi.warn("".concat(t._className, ".revokeMessage failed. error:"), n), Z_(r);});} }, { key: "deleteMessage", value: function value(e) {var t = this,n = null,o = e[0],r = o.conversationID,a = "",s = [],i = [];if (o.conversationType === ro.CONV_C2C ? (n = this.getModule(qc), a = r.replace(ro.CONV_C2C, ""), e.forEach(function (e) {e && e.status === vc.SUCCESS && e.conversationID === r && (e.getOnlineOnlyFlag() || s.push("".concat(e.sequence, "_").concat(e.random, "_").concat(e.time)), i.push(e));})) : o.conversationType === ro.CONV_GROUP && (n = this.getModule(xc), a = r.replace(ro.CONV_GROUP, ""), e.forEach(function (e) {e && e.status === vc.SUCCESS && e.conversationID === r && (e.getOnlineOnlyFlag() || s.push("".concat(e.sequence)), i.push(e));})), !n) return this._onCannotFindModule();if (0 === s.length) return this._onMessageDeleted(i);s.length > 30 && (s = s.slice(0, 30), i = i.slice(0, 30));var u = new Fd(ng);return u.setMessage("to:".concat(a, " count:").concat(s.length)), n.deleteMessage({ to: a, keyList: s }).then(function (e) {return u.end(), Gi.info("".concat(t._className, ".deleteMessage ok")), t._onMessageDeleted(i);}).catch(function (e) {t.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];u.setError(e, o, r).end();}), Gi.warn("".concat(t._className, ".deleteMessage failed. error:"), e);var n = new W_({ code: e && e.code ? e.code : fp.MESSAGE_DELETE_FAIL, message: e && e.message ? e.message : Lp });return Z_(n);});} }, { key: "_onMessageDeleted", value: function value(e) {return this.getModule(Bc).onMessageDeleted(e), Q_({ messageList: e });} }, { key: "_generateUUID", value: function value() {var e = this.getModule(Hc);return "".concat(e.getSDKAppID(), "-").concat(e.getUserID(), "-").concat(function () {for (var e = "", t = 32; t > 0; --t) {e += tu[Math.floor(Math.random() * nu)];}return e;}());} }, { key: "getMessageOptionByID", value: function value(e) {return this._messageOptionsMap.get(e);} }, { key: "_getNickAndAvatarByUserID", value: function value(e) {return this.getModule(Fc).getNickAndAvatarByUserID(e);} }, { key: "_getNameCardByGroupID", value: function value(e) {if (e.conversationType === ro.CONV_GROUP) {var t = this.getModule(xc);if (t) return t.getMyNameCardByGroupID(e.to);}return "";} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._messageOptionsMap.clear();} }]), n;}(rl),lv = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "PluginModule", o.plugins = {}, o;}return Pn(n, [{ key: "registerPlugin", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {t.plugins[n] = e[n];}), new Fd(Hd).setMessage("key=".concat(Object.keys(e))).end();} }, { key: "getPlugin", value: function value(e) {return this.plugins[e];} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset"));} }]), n;}(rl),pv = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "SyncUnreadMessageModule", o._cookie = "", o._onlineSyncFlag = !1, o.getInnerEmitterInstance().on(lm.CONTEXT_A2KEY_AND_TINYID_UPDATED, o._onLoginSuccess, $n(o)), o;}return Pn(n, [{ key: "_onLoginSuccess", value: function value(e) {this._startSync({ cookie: this._cookie, syncFlag: 0, isOnlineSync: 0 });} }, { key: "_startSync", value: function value(e) {var t = this,n = e.cookie,o = e.syncFlag,r = e.isOnlineSync;Gi.log("".concat(this._className, "._startSync cookie:").concat(n, " syncFlag:").concat(o, " isOnlineSync:").concat(r)), this.request({ protocolName: ul, requestData: { cookie: n, syncFlag: o, isOnlineSync: r } }).then(function (e) {var n = e.data,o = n.cookie,r = n.syncFlag,a = n.eventArray,s = n.messageList,i = n.C2CRemainingUnreadList;if (t._cookie = o, Du(o)) ;else if (0 === r || 1 === r) {if (a) t.getModule(Qc).onMessage({ head: {}, body: { eventArray: a, isInstantMessage: t._onlineSyncFlag, isSyncingEnded: !1 } });t.getModule(qc).onNewC2CMessage({ dataList: s, isInstantMessage: !1, C2CRemainingUnreadList: i }), t._startSync({ cookie: o, syncFlag: r, isOnlineSync: 0 });} else if (2 === r) {if (a) t.getModule(Qc).onMessage({ head: {}, body: { eventArray: a, isInstantMessage: t._onlineSyncFlag, isSyncingEnded: !0 } });t.getModule(qc).onNewC2CMessage({ dataList: s, isInstantMessage: t._onlineSyncFlag, C2CRemainingUnreadList: i });}}).catch(function (e) {Gi.error("".concat(t._className, "._startSync failed. error:"), e);});} }, { key: "startOnlineSync", value: function value() {Gi.log("".concat(this._className, ".startOnlineSync")), this._onlineSyncFlag = !0, this._startSync({ cookie: this._cookie, syncFlag: 0, isOnlineSync: 1 });} }, { key: "startSyncOnReconnected", value: function value() {Gi.log("".concat(this._className, ".startSyncOnReconnected.")), this._onlineSyncFlag = !0, this._startSync({ cookie: this._cookie, syncFlag: 0, isOnlineSync: 0 });} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._onlineSyncFlag = !1, this._cookie = "";} }]), n;}(rl),dv = { request: { toAccount: "To_Account", fromAccount: "From_Account", to: "To_Account", from: "From_Account", groupID: "GroupId", groupAtUserID: "GroupAt_Account", extension: "Ext", data: "Data", description: "Desc", elements: "MsgBody", sizeType: "Type", downloadFlag: "Download_Flag", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", videoUrl: "", imageUrl: "URL", fileUrl: "Url", uuid: "UUID", priority: "MsgPriority", receiverUserID: "To_Account", receiverGroupID: "GroupId", messageSender: "SenderId", messageReceiver: "ReceiverId", nick: "From_AccountNick", avatar: "From_AccountHeadurl", messageNumber: "MsgNum", pbDownloadKey: "PbMsgKey", downloadKey: "JsonMsgKey", applicationType: "PendencyType", userIDList: "To_Account", groupNameList: "GroupName", userID: "To_Account", groupAttributeList: "GroupAttr", mainSequence: "AttrMainSeq", avChatRoomKey: "BytesKey", attributeControl: "AttrControl", sequence: "seq" }, response: { MsgPriority: "priority", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID", Download_Flag: "downloadFlag", GroupId: "groupID", Member_Account: "userID", MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", MsgSeq: "sequence", MsgRandom: "random", MsgTime: "time", MsgTimeStamp: "time", MsgContent: "content", MsgBody: "elements", From_AccountNick: "nick", From_AccountHeadurl: "avatar", GroupWithdrawInfoArray: "revokedInfos", GroupReadInfoArray: "groupMessageReadNotice", LastReadMsgSeq: "lastMessageSeq", WithdrawC2cMsgNotify: "c2cMessageRevokedNotify", C2cWithdrawInfoArray: "revokedInfos", C2cReadedReceipt: "c2cMessageReadReceipt", ReadC2cMsgNotify: "c2cMessageReadNotice", LastReadTime: "peerReadTime", MsgRand: "random", MsgType: "type", MsgShow: "messageShow", NextMsgSeq: "nextMessageSeq", FaceUrl: "avatar", ProfileDataMod: "profileModify", Profile_Account: "userID", ValueBytes: "value", ValueNum: "value", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgFrom_AccountExtraInfo: "messageFromAccountExtraInformation", Operator_Account: "operatorID", OpType: "operationType", ReportType: "operationType", UserId: "userID", User_Account: "userID", List_Account: "userIDList", MsgOperatorMemberExtraInfo: "operatorInfo", MsgMemberExtraInfo: "memberInfoList", ImageUrl: "avatar", NickName: "nick", MsgGroupNewInfo: "newGroupProfile", MsgAppDefinedData: "groupCustomField", Owner_Account: "ownerID", GroupFaceUrl: "avatar", GroupIntroduction: "introduction", GroupNotification: "notification", GroupApplyJoinOption: "joinOption", MsgKey: "messageKey", GroupInfo: "groupProfile", ShutupTime: "muteTime", Desc: "description", Ext: "extension", GroupAt_Account: "groupAtUserID", MsgNum: "messageNumber", PbMsgKey: "pbDownloadKey", JsonMsgKey: "downloadKey", MsgModifiedFlag: "isModified", PendencyItem: "applicationItem", PendencyType: "applicationType", AddTime: "time", AddSource: "source", AddWording: "wording", ProfileImImage: "avatar", PendencyAdd: "friendApplicationAdded", FrienPencydDel_Account: "friendApplicationDeletedUserIDList", Peer_Account: "userID", GroupAttr: "groupAttributeList", GroupAttrAry: "groupAttributeList", AttrMainSeq: "mainSequence", seq: "sequence", GroupAttrOption: "groupAttributeOption", BytesChangedKeys: "changedKeyList", GroupAttrInfo: "groupAttributeList", GroupAttrSeq: "mainSequence", PushChangedAttrValFlag: "hasChangedAttributeInfo", SubKeySeq: "sequence", Val: "value" }, ignoreKeyWord: ["C2C", "ID", "USP"] },gv = Wt.trim;function hv(e, t) {if ("string" != typeof e && !Array.isArray(e)) throw new TypeError("Expected the input to be `string | string[]`");t = Object.assign({ pascalCase: !1 }, t);var n;return 0 === (e = Array.isArray(e) ? e.map(function (e) {return e.trim();}).filter(function (e) {return e.length;}).join("-") : e.trim()).length ? "" : 1 === e.length ? t.pascalCase ? e.toUpperCase() : e.toLowerCase() : (e !== e.toLowerCase() && (e = fv(e)), e = e.replace(/^[_.\- ]+/, "").toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (e, t) {return t.toUpperCase();}).replace(/\d+(\w|$)/g, function (e) {return e.toUpperCase();}), n = e, t.pascalCase ? n.charAt(0).toUpperCase() + n.slice(1) : n);}Le({ target: "String", proto: !0, forced: function (e) {return r(function () {return !!Ht[e]() || "​᠎" != "​᠎"[e]() || Ht[e].name !== e;});}("trim") }, { trim: function trim() {return gv(this);} });var fv = function fv(e) {for (var t = !1, n = !1, o = !1, r = 0; r < e.length; r++) {var a = e[r];t && /[a-zA-Z]/.test(a) && a.toUpperCase() === a ? (e = e.slice(0, r) + "-" + e.slice(r), t = !1, o = n, n = !0, r++) : n && o && /[a-zA-Z]/.test(a) && a.toLowerCase() === a ? (e = e.slice(0, r - 1) + "-" + e.slice(r - 1), o = n, n = !1, t = !0) : (t = a.toLowerCase() === a && a.toUpperCase() !== a, o = n, n = a.toUpperCase() === a && a.toLowerCase() !== a);}return e;};function _v(e, t) {var n = 0;return function e(t, o) {if (++n > 100) return n--, t;if (Ki(t)) {var r = t.map(function (t) {return xi(t) ? e(t, o) : t;});return n--, r;}if (xi(t)) {var a = (s = t, i = function i(e, t) {if (!zi(t)) return !1;if ((r = t) !== hv(r)) for (var n = 0; n < dv.ignoreKeyWord.length && !t.includes(dv.ignoreKeyWord[n]); n++) {;}var r;return Bi(o[t]) ? function (e) {return "OPPOChannelID" === e ? e : e[0].toUpperCase() + hv(e).slice(1);}(t) : o[t];}, u = Object.create(null), Object.keys(s).forEach(function (e) {var t = i(s[e], e);t && (u[t] = s[e]);}), u);return a = hu(a, function (t, n) {return Ki(t) || xi(t) ? e(t, o) : t;}), n--, a;}var s, i, u;}(e, t);}function mv(e, t) {if (Ki(e)) return e.map(function (e) {return xi(e) ? mv(e, t) : e;});if (xi(e)) {var n = (o = e, r = function r(e, n) {return Bi(t[n]) ? hv(n) : t[n];}, a = {}, Object.keys(o).forEach(function (e) {a[r(o[e], e)] = o[e];}), a);return n = hu(n, function (e) {return Ki(e) || xi(e) ? mv(e, t) : e;});}var o, r, a;}var vv = function () {function e(t) {bn(this, e), this._handler = t;var n = t.getURL();this._socket = null, this._id = eu(), Zs ? Xs ? (ti.connectSocket({ url: n, header: { "content-type": "application/json" } }), ti.onSocketClose(this._onClose.bind(this)), ti.onSocketOpen(this._onOpen.bind(this)), ti.onSocketMessage(this._onMessage.bind(this)), ti.onSocketError(this._onError.bind(this))) : (this._socket = ti.connectSocket({ url: n, header: { "content-type": "application/json" }, complete: function complete() {} }), this._socket.onClose(this._onClose.bind(this)), this._socket.onOpen(this._onOpen.bind(this)), this._socket.onMessage(this._onMessage.bind(this)), this._socket.onError(this._onError.bind(this))) : ei && (this._socket = new WebSocket(n), this._socket.onopen = this._onOpen.bind(this), this._socket.onmessage = this._onMessage.bind(this), this._socket.onclose = this._onClose.bind(this), this._socket.onerror = this._onError.bind(this));}return Pn(e, [{ key: "getID", value: function value() {return this._id;} }, { key: "_onOpen", value: function value() {this._handler.onOpen({ id: this._id });} }, { key: "_onClose", value: function value(e) {this._handler.onClose({ id: this._id, e: e });} }, { key: "_onMessage", value: function value(e) {this._handler.onMessage(e);} }, { key: "_onError", value: function value(e) {this._handler.onError({ id: this._id, e: e });} }, { key: "close", value: function value(e) {if (Xs) return ti.offSocketClose(), ti.offSocketMessage(), ti.offSocketOpen(), ti.offSocketError(), void ti.closeSocket();this._socket && (Zs ? (this._socket.onClose(function () {}), this._socket.onOpen(function () {}), this._socket.onMessage(function () {}), this._socket.onError(function () {})) : ei && (this._socket.onopen = null, this._socket.onmessage = null, this._socket.onclose = null, this._socket.onerror = null), Js ? this._socket.close({ code: e }) : this._socket.close(e), this._socket = null);} }, { key: "send", value: function value(e) {Xs ? ti.sendSocketMessage({ data: e.data, fail: function fail() {e.fail && e.requestID && e.fail(e.requestID);} }) : this._socket && (Zs ? this._socket.send({ data: e.data, fail: function fail() {e.fail && e.requestID && e.fail(e.requestID);} }) : ei && this._socket.send(e.data));} }]), e;}(),Mv = 4e3,yv = 4001,Iv = "connected",Sv = "connecting",Tv = "disconnected",Dv = function () {function e(t) {bn(this, e), this._channelModule = t, this._className = "SocketHandler", this._promiseMap = new Map(), this._readyState = Tv, this._simpleRequestMap = new Map(), this.MAX_SIZE = 100, this._startSequence = eu(), this._startTs = 0, this._reConnectFlag = !1, this._nextPingTs = 0, this._reConnectCount = 0, this.MAX_RECONNECT_COUNT = 3, this._socketID = -1, this._random = 0, this._socket = null, this._url = "", this._onOpenTs = 0, this._setOverseaHost(), this._initConnection();}return Pn(e, [{ key: "_setOverseaHost", value: function value() {this._channelModule.isOversea() && Bs.HOST.setCurrent(Ks);} }, { key: "_initConnection", value: function value() {"" === this._url ? this._url = Bs.HOST.CURRENT.DEFAULT : this._url === Bs.HOST.CURRENT.DEFAULT ? this._url = Bs.HOST.CURRENT.BACKUP : this._url === Bs.HOST.CURRENT.BACKUP && (this._url = Bs.HOST.CURRENT.DEFAULT), this._connect(), this._nextPingTs = 0;} }, { key: "onCheckTimer", value: function value(e) {e % 1 == 0 && this._checkPromiseMap();} }, { key: "_checkPromiseMap", value: function value() {var e = this;0 !== this._promiseMap.size && this._promiseMap.forEach(function (t, n) {var o = t.reject,r = t.timestamp;Date.now() - r >= 15e3 && (Gi.log("".concat(e._className, "._checkPromiseMap request timeout, delete requestID:").concat(n)), e._promiseMap.delete(n), o(new W_({ code: fp.NETWORK_TIMEOUT, message: vd })), e._channelModule.onRequestTimeout(n));});} }, { key: "onOpen", value: function value(e) {this._onOpenTs = Date.now();var t = e.id;this._socketID = t, new Fd($d).setMessage(n).setMessage("socketID:".concat(t)).end();var n = Date.now() - this._startTs;Gi.log("".concat(this._className, "._onOpen cost ").concat(n, " ms. socketID:").concat(t)), e.id === this._socketID && (this._readyState = Iv, this._reConnectCount = 0, this._resend(), !0 === this._reConnectFlag && (this._channelModule.onReconnected(), this._reConnectFlag = !1), this._channelModule.onOpen());} }, { key: "onClose", value: function value(e) {var t = new Fd(Yd),n = e.id,o = e.e,r = "sourceSocketID:".concat(n, " currentSocketID:").concat(this._socketID),a = 0;0 !== this._onOpenTs && (a = Date.now() - this._onOpenTs), t.setMessage(a).setMoreMessage(r).setCode(o.code).end(), Gi.log("".concat(this._className, "._onClose code:").concat(o.code, " reason:").concat(o.reason, " ").concat(r, " onlineTime:").concat(a)), n === this._socketID && (this._readyState = Tv, a < 1e3 ? this._channelModule.onReconnectFailed() : this._channelModule.onClose());} }, { key: "onError", value: function value(e) {var t = e.id,n = e.e,o = "sourceSocketID:".concat(t, " currentSocketID:").concat(this._socketID);new Fd(zd).setMessage(n.errMsg || Qi(n)).setMoreMessage(o).setLevel("error").end(), Gi.warn("".concat(this._className, "._onError"), n, o), t === this._socketID && (this._readyState = "", this._channelModule.onError());} }, { key: "onMessage", value: function value(e) {var t;try {t = JSON.parse(e.data);} catch (jv) {new Fd(cg).setMessage(e.data).end();}if (t && t.head) {var n = this._getRequestIDFromHead(t.head),o = Mu(t.head),r = mv(t.body, this._getResponseKeyMap(o));if (Gi.debug("".concat(this._className, ".onMessage ret:").concat(JSON.stringify(r), " requestID:").concat(n, " has:").concat(this._promiseMap.has(n))), this._setNextPingTs(), this._promiseMap.has(n)) {var a = this._promiseMap.get(n),s = a.resolve,i = a.reject,u = a.timestamp;return this._promiseMap.delete(n), this._calcRTT(u), void (r.errorCode && 0 !== r.errorCode ? (this._channelModule.onErrorCodeNotZero(r), i(new W_({ code: r.errorCode, message: r.errorInfo || "" }))) : s(B_(r)));}this._channelModule.onMessage({ head: t.head, body: r });}} }, { key: "_calcRTT", value: function value(e) {var t = Date.now() - e;this._channelModule.getModule(ol).addRTT(t);} }, { key: "_connect", value: function value() {new Fd(jd).setMessage("url:".concat(this.getURL())).end(), Gi.log("".concat(this._className, "._connect url:").concat(this.getURL())), this._startTs = Date.now(), this._socket = new vv(this), this._socketID = this._socket.getID(), this._readyState = Sv;} }, { key: "getURL", value: function value() {var e = this._channelModule.getModule(Hc);return "".concat(this._url, "/info?sdkappid=").concat(e.getSDKAppID(), "&instanceid=").concat(e.getInstanceID(), "&random=").concat(this._getRandom());} }, { key: "_closeConnection", value: function value(e) {Gi.log("".concat(this._className, "._closeConnection")), this._socket && (this._socket.close(e), this._socketID = -1, this._socket = null, this._readyState = Tv);} }, { key: "_resend", value: function value() {var e = this;if (Gi.log("".concat(this._className, "._resend reConnectFlag:").concat(this._reConnectFlag), "promiseMap.size:".concat(this._promiseMap.size, " simpleRequestMap.size:").concat(this._simpleRequestMap.size)), this._promiseMap.size > 0 && this._promiseMap.forEach(function (t, n) {var o = t.uplinkData,r = t.resolve,a = t.reject;e._promiseMap.set(n, { resolve: r, reject: a, timestamp: Date.now(), uplinkData: o }), e._execute(n, o);}), this._simpleRequestMap.size > 0) {var t,n = no(this._simpleRequestMap);try {for (n.s(); !(t = n.n()).done;) {var o = Wn(t.value, 2),r = o[0],a = o[1];this._execute(r, a);}} catch (s) {n.e(s);} finally {n.f();}this._simpleRequestMap.clear();}} }, { key: "send", value: function value(e) {var t = this;e.head.seq = this._getSequence(), e.head.reqtime = Math.floor(Date.now() / 1e3);e.keyMap;var n = jn(e, ["keyMap"]),o = this._getRequestIDFromHead(e.head),r = JSON.stringify(n);return new Promise(function (e, a) {(t._promiseMap.set(o, { resolve: e, reject: a, timestamp: Date.now(), uplinkData: r }), Gi.debug("".concat(t._className, ".send uplinkData:").concat(JSON.stringify(n), " requestID:").concat(o, " readyState:").concat(t._readyState)), t._readyState !== Iv) ? t._reConnect() : (t._execute(o, r), t._channelModule.getModule(ol).addRequestCount());});} }, { key: "simplySend", value: function value(e) {e.head.seq = this._getSequence(), e.head.reqtime = Math.floor(Date.now() / 1e3);e.keyMap;var t = jn(e, ["keyMap"]),n = this._getRequestIDFromHead(e.head),o = JSON.stringify(t);this._readyState !== Iv ? (this._simpleRequestMap.size < this.MAX_SIZE ? this._simpleRequestMap.set(n, o) : Gi.log("".concat(this._className, ".simplySend. simpleRequestMap is full, drop request!")), this._reConnect()) : this._execute(n, o);} }, { key: "_execute", value: function value(e, t) {this._socket.send({ data: t, fail: Zs ? this._onSendFail.bind(this) : void 0, requestID: e });} }, { key: "_onSendFail", value: function value(e) {Gi.log("".concat(this._className, "._onSendFail requestID:").concat(e));} }, { key: "_getSequence", value: function value() {var e;if (this._startSequence < 2415919103) return e = this._startSequence, this._startSequence += 1, 2415919103 === this._startSequence && (this._startSequence = eu()), e;} }, { key: "_getRequestIDFromHead", value: function value(e) {return e.servcmd + e.seq;} }, { key: "_getResponseKeyMap", value: function value(e) {var t = this._channelModule.getKeyMap(e);return Fn({}, dv.response, {}, t.response);} }, { key: "_reConnect", value: function value() {this._readyState !== Iv && this._readyState !== Sv && this.forcedReconnect();} }, { key: "forcedReconnect", value: function value() {var e = this;Gi.log("".concat(this._className, ".forcedReconnect count:").concat(this._reConnectCount, " readyState:").concat(this._readyState)), this._reConnectFlag = !0, this._resetRandom(), this._reConnectCount < this.MAX_RECONNECT_COUNT ? (this._reConnectCount += 1, this._closeConnection(yv), this._initConnection()) : this._channelModule.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0];n[1];o ? (Gi.warn("".concat(e._className, ".forcedReconnect disconnected from wsserver but network is ok, continue...")), e._reConnectCount = 0, e._closeConnection(yv), e._initConnection()) : e._channelModule.onReconnectFailed();});} }, { key: "getReconnectFlag", value: function value() {return this._reConnectFlag;} }, { key: "_setNextPingTs", value: function value() {this._nextPingTs = Date.now() + 1e4;} }, { key: "getNextPingTs", value: function value() {return this._nextPingTs;} }, { key: "isConnected", value: function value() {return this._readyState === Iv;} }, { key: "_getRandom", value: function value() {return 0 === this._random && (this._random = Math.random()), this._random;} }, { key: "_resetRandom", value: function value() {this._random = 0;} }, { key: "close", value: function value() {Gi.log("".concat(this._className, ".close")), this._closeConnection(Mv), this._promiseMap.clear(), this._startSequence = eu(), this._readyState = Tv, this._simpleRequestMap.clear(), this._reConnectFlag = !1, this._reConnectCount = 0, this._onOpenTs = 0, this._url = "", this._random = 0;} }]), e;}(),Ev = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;if (bn(this, n), (o = t.call(this, e))._className = "ChannelModule", o._socketHandler = new Dv($n(o)), o._probing = !1, o._isAppShowing = !0, o._previousState = ro.NET_STATE_CONNECTED, Zs && "function" == typeof ti.onAppShow && "function" == typeof ti.onAppHide) {var r = o._onAppHide.bind($n(o)),a = o._onAppShow.bind($n(o));"function" == typeof ti.offAppHide && ti.offAppHide(r), "function" == typeof ti.offAppShow && ti.offAppShow(a), ti.onAppHide(r), ti.onAppShow(a);}return o._timerForNotLoggedIn = -1, o._timerForNotLoggedIn = setInterval(o.onCheckTimer.bind($n(o)), 1e3), o._fatalErrorFlag = !1, o;}return Pn(n, [{ key: "onCheckTimer", value: function value(e) {this._socketHandler && (this.isLoggedIn() ? (this._timerForNotLoggedIn > 0 && (clearInterval(this._timerForNotLoggedIn), this._timerForNotLoggedIn = -1), this._socketHandler.onCheckTimer(e)) : this._socketHandler.onCheckTimer(1), this._checkNextPing());} }, { key: "onErrorCodeNotZero", value: function value(e) {this.getModule(Qc).onErrorCodeNotZero(e);} }, { key: "onMessage", value: function value(e) {this.getModule(Qc).onMessage(e);} }, { key: "send", value: function value(e) {return this._socketHandler ? this._previousState !== ro.NET_STATE_CONNECTED && e.head.servcmd.includes(sp) ? this._sendLogViaHTTP(e) : this._socketHandler.send(e) : Promise.reject();} }, { key: "_sendLogViaHTTP", value: function value(e) {return new Promise(function (t, n) {var o = "https://webim.tim.qq.com/v4/imopenstat/tim_web_report_v2?sdkappid=".concat(e.head.sdkappid, "&reqtime=").concat(Date.now()),r = JSON.stringify(e.body),a = "application/x-www-form-urlencoded;charset=UTF-8";if (Zs) ti.request({ url: o, data: r, method: "POST", timeout: 3e3, header: { "content-type": a }, success: function success() {t();}, fail: function fail() {n(new W_({ code: fp.NETWORK_ERROR, message: md }));} });else {var s = new XMLHttpRequest(),i = setTimeout(function () {s.abort(), n(new W_({ code: fp.NETWORK_TIMEOUT, message: vd }));}, 3e3);s.onreadystatechange = function () {4 === s.readyState && (clearTimeout(i), 200 === s.status || 304 === s.status ? t() : n(new W_({ code: fp.NETWORK_ERROR, message: md })));}, s.open("POST", o, !0), s.setRequestHeader("Content-type", a), s.send(r);}});} }, { key: "simplySend", value: function value(e) {return this._socketHandler ? this._socketHandler.simplySend(e) : Promise.reject();} }, { key: "onOpen", value: function value() {this._ping();} }, { key: "onClose", value: function value() {this.reConnect();} }, { key: "onError", value: function value() {Zs && Gi.error("".concat(this._className, ".onError 从v2.11.2起，SDK 支持了 WebSocket，如您未添加相关受信域名，请先添加！升级指引: https://web.sdk.qcloud.com/im/doc/zh-cn/tutorial-02-upgradeguideline.html"));} }, { key: "getKeyMap", value: function value(e) {return this.getModule(Qc).getKeyMap(e);} }, { key: "_onAppHide", value: function value() {this._isAppShowing = !1;} }, { key: "_onAppShow", value: function value() {this._isAppShowing = !0;} }, { key: "onRequestTimeout", value: function value(e) {} }, { key: "onReconnected", value: function value() {Gi.log("".concat(this._className, ".onReconnected")), this.getModule(Qc).onReconnected(), this._emitNetStateChangeEvent(ro.NET_STATE_CONNECTED);} }, { key: "onReconnectFailed", value: function value() {Gi.log("".concat(this._className, ".onReconnectFailed")), this._emitNetStateChangeEvent(ro.NET_STATE_DISCONNECTED);} }, { key: "reConnect", value: function value() {if (!this._fatalErrorFlag && this._socketHandler) {var e = this._socketHandler.getReconnectFlag();if (Gi.log("".concat(this._className, ".reConnect previousState:").concat(this._previousState, " reconnectFlag:").concat(e)), this._previousState === ro.NET_STATE_CONNECTING && e) return;this._socketHandler.forcedReconnect(), this._emitNetStateChangeEvent(ro.NET_STATE_CONNECTING);}} }, { key: "_emitNetStateChangeEvent", value: function value(e) {this._previousState !== e && (this._previousState = e, this.emitOuterEvent(oo.NET_STATE_CHANGE, { state: e }));} }, { key: "_ping", value: function value() {var e = this;if (!0 !== this._probing) {this._probing = !0;var t = this.getModule(Qc).getProtocolData({ protocolName: ip });this.send(t).then(function () {e._probing = !1;}).catch(function (t) {if (Gi.warn("".concat(e._className, "._ping failed. error:"), t), e._probing = !1, t && 60002 === t.code) return new Fd(ah).setMessage("code:".concat(t.code, " message:").concat(t.message)).setNetworkType(e.getModule(Yc).getNetworkType()).end(), e._fatalErrorFlag = !0, void e._emitNetStateChangeEvent(ro.NET_STATE_DISCONNECTED);e.probeNetwork().then(function (t) {var n = Wn(t, 2),o = n[0],r = n[1];Gi.log("".concat(e._className, "._ping failed. isAppShowing:").concat(e._isAppShowing, " online:").concat(o, " networkType:").concat(r)), o ? e.reConnect() : e._emitNetStateChangeEvent(ro.NET_STATE_DISCONNECTED);});});}} }, { key: "_checkNextPing", value: function value() {this._socketHandler && this._socketHandler.isConnected() && Date.now() >= this._socketHandler.getNextPingTs() && this._ping();} }, { key: "dealloc", value: function value() {this._socketHandler && (this._socketHandler.close(), this._socketHandler = null), this._timerForNotLoggedIn > -1 && clearInterval(this._timerForNotLoggedIn);} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._previousState = ro.NET_STATE_CONNECTED, this._probing = !1, this._fatalErrorFlag = !1, this._timerForNotLoggedIn = setInterval(this.onCheckTimer.bind(this), 1e3);} }]), n;}(rl),Cv = function () {function e(t) {bn(this, e), this._className = "ProtocolHandler", this._sessionModule = t, this._configMap = new Map(), this._fillConfigMap();}return Pn(e, [{ key: "_fillConfigMap", value: function value() {this._configMap.clear();var e = this._sessionModule.genCommonHead(),t = this._sessionModule.genCosSpecifiedHead(),n = this._sessionModule.genSSOReportHead();this._configMap.set(al, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.IM_OPEN_STATUS, ".").concat(Bs.CMD.LOGIN) }), body: { state: "Online" }, keyMap: { response: { TinyId: "tinyID", InstId: "instanceID", HelloInterval: "helloInterval" } } };}(e)), this._configMap.set(sl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.IM_OPEN_STATUS, ".").concat(Bs.CMD.LOGOUT) }), body: { type: 0 }, keyMap: { request: { type: "wslogout_type" } } };}(e)), this._configMap.set(il, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.IM_OPEN_STATUS, ".").concat(Bs.CMD.HELLO) }), body: {}, keyMap: { response: { NewInstInfo: "newInstanceInfo" } } };}(e)), this._configMap.set(rp, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.IM_COS_SIGN, ".").concat(Bs.CMD.COS_SIGN) }), body: { cmd: "open_im_cos_svc", subCmd: "get_cos_token", duration: 300, version: 2 }, keyMap: { request: { userSig: "usersig", subCmd: "sub_cmd", cmd: "cmd", duration: "duration", version: "version" }, response: { expired_time: "expiredTime", bucket_name: "bucketName", session_token: "sessionToken", tmp_secret_id: "secretId", tmp_secret_key: "secretKey" } } };}(t)), this._configMap.set(ap, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.CUSTOM_UPLOAD, ".").concat(Bs.CMD.COS_PRE_SIG) }), body: { fileType: void 0, fileName: void 0, uploadMethod: 0, duration: 900 }, keyMap: { request: { userSig: "usersig", fileType: "file_type", fileName: "file_name", uploadMethod: "upload_method" }, response: { expired_time: "expiredTime", request_id: "requestId", head_url: "headUrl", upload_url: "uploadUrl", download_url: "downloadUrl", ci_url: "ciUrl" } } };}(t)), this._configMap.set(gp, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.CLOUD_CONTROL, ".").concat(Bs.CMD.FETCH_CLOUD_CONTROL_CONFIG) }), body: { SDKAppID: 0, version: 0 }, keyMap: { request: { SDKAppID: "uint32_sdkappid", version: "uint64_version" }, response: { int32_error_code: "errorCode", str_error_message: "errorMessage", str_json_config: "cloudControlConfig", uint32_expired_time: "expiredTime", uint32_sdkappid: "SDKAppID", uint64_version: "version" } } };}(e)), this._configMap.set(hp, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.CLOUD_CONTROL, ".").concat(Bs.CMD.PUSHED_CLOUD_CONTROL_CONFIG) }), body: {}, keyMap: { response: { int32_error_code: "errorCode", str_error_message: "errorMessage", str_json_config: "cloudControlConfig", uint32_expired_time: "expiredTime", uint32_sdkappid: "SDKAppID", uint64_version: "version" } } };}(e)), this._configMap.set(ul, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.OPEN_IM, ".").concat(Bs.CMD.GET_MESSAGES) }), body: { cookie: "", syncFlag: 0, needAbstract: 1, isOnlineSync: 0 }, keyMap: { request: { fromAccount: "From_Account", toAccount: "To_Account", from: "From_Account", to: "To_Account", time: "MsgTimeStamp", sequence: "MsgSeq", random: "MsgRandom", elements: "MsgBody" }, response: { MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", ClientSeq: "clientSequence", MsgSeq: "sequence", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgRandom: "random", MsgTimeStamp: "time", MsgContent: "content", ToGroupId: "groupID", MsgKey: "messageKey", GroupTips: "groupTips", MsgBody: "elements", MsgType: "type", C2CRemainingUnreadCount: "C2CRemainingUnreadList", C2CPairUnreadCount: "C2CPairUnreadList" } } };}(e)), this._configMap.set(cl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.OPEN_IM, ".").concat(Bs.CMD.BIG_DATA_HALLWAY_AUTH_KEY) }), body: {} };}(e)), this._configMap.set(ll, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.OPEN_IM, ".").concat(Bs.CMD.SEND_MESSAGE) }), body: { fromAccount: "", toAccount: "", msgTimeStamp: void 0, msgSeq: 0, msgRandom: 0, msgBody: [], cloudCustomData: void 0, nick: "", avatar: "", msgLifeTime: void 0, offlinePushInfo: { pushFlag: 0, title: "", desc: "", ext: "", apnsInfo: { badgeMode: 0 }, androidInfo: { OPPOChannelID: "" } } }, keyMap: { request: { fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody", count: "MaxCnt", lastMessageTime: "LastMsgTime", messageKey: "MsgKey", peerAccount: "Peer_Account", data: "Data", description: "Desc", extension: "Ext", type: "MsgType", content: "MsgContent", sizeType: "Type", uuid: "UUID", url: "", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", nick: "From_AccountNick", avatar: "From_AccountHeadurl", from: "From_Account", time: "MsgTimeStamp", messageRandom: "MsgRandom", messageSequence: "MsgSeq", elements: "MsgBody", clientSequence: "ClientSeq", payload: "MsgContent", messageList: "MsgList", messageNumber: "MsgNum", abstractList: "AbstractList", messageBody: "MsgBody" } } };}(e)), this._configMap.set(pl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.SEND_GROUP_MESSAGE) }), body: { fromAccount: "", groupID: "", random: 0, clientSequence: 0, priority: "", msgBody: [], cloudCustomData: void 0, onlineOnlyFlag: 0, offlinePushInfo: { pushFlag: 0, title: "", desc: "", ext: "", apnsInfo: { badgeMode: 0 }, androidInfo: { OPPOChannelID: "" } }, groupAtInfo: [] }, keyMap: { request: { to: "GroupId", extension: "Ext", data: "Data", description: "Desc", random: "Random", sequence: "ReqMsgSeq", count: "ReqMsgNumber", type: "MsgType", priority: "MsgPriority", content: "MsgContent", elements: "MsgBody", sizeType: "Type", uuid: "UUID", url: "", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", clientSequence: "ClientSeq", from: "From_Account", time: "MsgTimeStamp", messageRandom: "MsgRandom", messageSequence: "MsgSeq", payload: "MsgContent", messageList: "MsgList", messageNumber: "MsgNum", abstractList: "AbstractList", messageBody: "MsgBody" }, response: { MsgTime: "time", MsgSeq: "sequence" } } };}(e)), this._configMap.set(ml, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.OPEN_IM, ".").concat(Bs.CMD.REVOKE_C2C_MESSAGE) }), body: { msgInfo: { fromAccount: "", toAccount: "", msgTimeStamp: 0, msgSeq: 0, msgRandom: 0 } }, keyMap: { request: { msgInfo: "MsgInfo", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom" } } };}(e)), this._configMap.set(ql, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.REVOKE_GROUP_MESSAGE) }), body: { to: "", msgSeqList: void 0 }, keyMap: { request: { to: "GroupId", msgSeqList: "MsgSeqList", msgSeq: "MsgSeq" } } };}(e)), this._configMap.set(Ml, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.OPEN_IM, ".").concat(Bs.CMD.GET_C2C_ROAM_MESSAGES) }), body: { peerAccount: "", count: 15, lastMessageTime: 0, messageKey: "", withRecalledMessage: 1 }, keyMap: { request: { messageKey: "MsgKey", peerAccount: "Peer_Account", count: "MaxCnt", lastMessageTime: "LastMsgTime", withRecalledMessage: "WithRecalledMsg" } } };}(e)), this._configMap.set(Vl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.GET_GROUP_ROAM_MESSAGES) }), body: { withRecalledMsg: 1, groupID: "", count: 15, sequence: "" }, keyMap: { request: { sequence: "ReqMsgSeq", count: "ReqMsgNumber", withRecalledMessage: "WithRecalledMsg" }, response: { Random: "random", MsgTime: "time", MsgSeq: "sequence", ReqMsgSeq: "sequence", RspMsgList: "messageList", IsPlaceMsg: "isPlaceMessage", IsSystemMsg: "isSystemMessage", ToGroupId: "to", EnumFrom_AccountType: "fromAccountType", EnumTo_AccountType: "toAccountType", GroupCode: "groupCode", MsgPriority: "priority", MsgBody: "elements", MsgType: "type", MsgContent: "content", IsFinished: "complete", Download_Flag: "downloadFlag", ClientSeq: "clientSequence", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID" } } };}(e)), this._configMap.set(vl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.OPEN_IM, ".").concat(Bs.CMD.SET_C2C_MESSAGE_READ) }), body: { C2CMsgReaded: void 0 }, keyMap: { request: { lastMessageTime: "LastedMsgTime" } } };}(e)), this._configMap.set(xl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.SET_GROUP_MESSAGE_READ) }), body: { groupID: void 0, messageReadSeq: void 0 }, keyMap: { request: { messageReadSeq: "MsgReadedSeq" } } };}(e)), this._configMap.set(Il, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.OPEN_IM, ".").concat(Bs.CMD.DELETE_C2C_MESSAGE) }), body: { fromAccount: "", to: "", keyList: void 0 }, keyMap: { request: { keyList: "MsgKeyList" } } };}(e)), this._configMap.set(Yl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.DELETE_GROUP_MESSAGE) }), body: { groupID: "", deleter: "", keyList: void 0 }, keyMap: { request: { deleter: "Deleter_Account", keyList: "Seqs" } } };}(e)), this._configMap.set(yl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.OPEN_IM, ".").concat(Bs.CMD.GET_PEER_READ_TIME) }), body: { userIDList: void 0 }, keyMap: { request: { userIDList: "To_Account" }, response: { ReadTime: "peerReadTimeList" } } };}(e)), this._configMap.set(Tl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.RECENT_CONTACT, ".").concat(Bs.CMD.GET_CONVERSATION_LIST) }), body: { fromAccount: void 0, count: 0 }, keyMap: { request: {}, response: { SessionItem: "conversations", ToAccount: "groupID", To_Account: "userID", UnreadMsgCount: "unreadCount", MsgGroupReadedSeq: "messageReadSeq", C2cPeerReadTime: "c2cPeerReadTime" } } };}(e)), this._configMap.set(Sl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.RECENT_CONTACT, ".").concat(Bs.CMD.PAGING_GET_CONVERSATION_LIST) }), body: { fromAccount: void 0, timeStamp: void 0, startIndex: void 0, pinnedTimeStamp: void 0, pinnedStartIndex: void 0, orderType: void 0, messageAssistFlag: 4, assistFlag: 7 }, keyMap: { request: { messageAssistFlag: "MsgAssistFlags", assistFlag: "AssistFlags", pinnedTimeStamp: "TopTimeStamp", pinnedStartIndex: "TopStartIndex" }, response: { SessionItem: "conversations", ToAccount: "groupID", To_Account: "userID", UnreadMsgCount: "unreadCount", MsgGroupReadedSeq: "messageReadSeq", C2cPeerReadTime: "c2cPeerReadTime", LastMsgFlags: "lastMessageFlag", TopFlags: "isPinned", TopTimeStamp: "pinnedTimeStamp", TopStartIndex: "pinnedStartIndex" } } };}(e)), this._configMap.set(Dl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.RECENT_CONTACT, ".").concat(Bs.CMD.DELETE_CONVERSATION) }), body: { fromAccount: "", toAccount: void 0, type: 1, toGroupID: void 0 }, keyMap: { request: { toGroupID: "ToGroupid" } } };}(e)), this._configMap.set(El, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.RECENT_CONTACT, ".").concat(Bs.CMD.PIN_CONVERSATION) }), body: { fromAccount: "", operationType: 1, itemList: void 0 }, keyMap: { request: { itemList: "RecentContactItem" } } };}(e)), this._configMap.set(Cl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.OPEN_IM, ".").concat(Bs.CMD.DELETE_GROUP_AT_TIPS) }), body: { messageListToDelete: void 0 }, keyMap: { request: { messageListToDelete: "DelMsgList", messageSeq: "MsgSeq", messageRandom: "MsgRandom" } } };}(e)), this._configMap.set(dl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.PROFILE, ".").concat(Bs.CMD.PORTRAIT_GET) }), body: { fromAccount: "", userItem: [] }, keyMap: { request: { toAccount: "To_Account", standardSequence: "StandardSequence", customSequence: "CustomSequence" } } };}(e)), this._configMap.set(gl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.PROFILE, ".").concat(Bs.CMD.PORTRAIT_SET) }), body: { fromAccount: "", profileItem: [{ tag: __.NICK, value: "" }, { tag: __.GENDER, value: "" }, { tag: __.ALLOWTYPE, value: "" }, { tag: __.AVATAR, value: "" }] }, keyMap: { request: { toAccount: "To_Account", standardSequence: "StandardSequence", customSequence: "CustomSequence" } } };}(e)), this._configMap.set(hl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.FRIEND, ".").concat(Bs.CMD.GET_BLACKLIST) }), body: { fromAccount: "", startIndex: 0, maxLimited: 30, lastSequence: 0 }, keyMap: { response: { CurruentSequence: "currentSequence" } } };}(e)), this._configMap.set(fl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.FRIEND, ".").concat(Bs.CMD.ADD_BLACKLIST) }), body: { fromAccount: "", toAccount: [] } };}(e)), this._configMap.set(_l, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.FRIEND, ".").concat(Bs.CMD.DELETE_BLACKLIST) }), body: { fromAccount: "", toAccount: [] } };}(e)), this._configMap.set(Al, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.GET_JOINED_GROUPS) }), body: { memberAccount: "", limit: void 0, offset: void 0, groupType: void 0, responseFilter: { groupBaseInfoFilter: void 0, selfInfoFilter: void 0 } }, keyMap: { request: { memberAccount: "Member_Account" }, response: { GroupIdList: "groups", MsgFlag: "messageRemindType" } } };}(e)), this._configMap.set(kl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.GET_GROUP_INFO) }), body: { groupIDList: void 0, responseFilter: { groupBaseInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "Owner_Account", "CreateTime", "InfoSeq", "LastInfoTime", "LastMsgTime", "MemberNum", "MaxMemberNum", "ApplyJoinOption", "NextMsgSeq", "ShutUpAllMember"], groupCustomFieldFilter: void 0, memberInfoFilter: void 0, memberCustomFieldFilter: void 0 } }, keyMap: { request: { groupIDList: "GroupIdList", groupCustomField: "AppDefinedData", memberCustomField: "AppMemberDefinedData", groupCustomFieldFilter: "AppDefinedDataFilter_Group", memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember" }, response: { GroupIdList: "groups", MsgFlag: "messageRemindType", AppDefinedData: "groupCustomField", AppMemberDefinedData: "memberCustomField", AppDefinedDataFilter_Group: "groupCustomFieldFilter", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", InfoSeq: "infoSequence", MemberList: "members", GroupInfo: "groups", ShutUpUntil: "muteUntil", ShutUpAllMember: "muteAllMembers", ApplyJoinOption: "joinOption" } } };}(e)), this._configMap.set(Nl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.CREATE_GROUP) }), body: { type: void 0, name: void 0, groupID: void 0, ownerID: void 0, introduction: void 0, notification: void 0, maxMemberNum: void 0, joinOption: void 0, memberList: void 0, groupCustomField: void 0, memberCustomField: void 0, webPushFlag: 1, avatar: "FaceUrl" }, keyMap: { request: { ownerID: "Owner_Account", userID: "Member_Account", avatar: "FaceUrl", maxMemberNum: "MaxMemberCount", joinOption: "ApplyJoinOption", groupCustomField: "AppDefinedData", memberCustomField: "AppMemberDefinedData" }, response: { HugeGroupFlag: "avChatRoomFlag", OverJoinedGroupLimit_Account: "overLimitUserIDList" } } };}(e)), this._configMap.set(Ol, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.DESTROY_GROUP) }), body: { groupID: void 0 } };}(e)), this._configMap.set(Ll, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.MODIFY_GROUP_INFO) }), body: { groupID: void 0, name: void 0, introduction: void 0, notification: void 0, avatar: void 0, maxMemberNum: void 0, joinOption: void 0, groupCustomField: void 0, muteAllMembers: void 0 }, keyMap: { request: { maxMemberNum: "MaxMemberCount", groupCustomField: "AppDefinedData", muteAllMembers: "ShutUpAllMember", joinOption: "ApplyJoinOption", avatar: "FaceUrl" }, response: { AppDefinedData: "groupCustomField", ShutUpAllMember: "muteAllMembers", ApplyJoinOption: "joinOption" } } };}(e)), this._configMap.set(Rl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.APPLY_JOIN_GROUP) }), body: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0, webPushFlag: 1 }, keyMap: { request: { applyMessage: "ApplyMsg" }, response: { HugeGroupFlag: "avChatRoomFlag", AVChatRoomKey: "avChatRoomKey" } } };}(e)), this._configMap.set(bl, function (e) {e.a2, e.tinyid;return { head: Fn({}, jn(e, ["a2", "tinyid"]), { servcmd: "".concat(Bs.NAME.BIG_GROUP_NO_AUTH, ".").concat(Bs.CMD.APPLY_JOIN_GROUP) }), body: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0, webPushFlag: 1 }, keyMap: { request: { applyMessage: "ApplyMsg" }, response: { HugeGroupFlag: "avChatRoomFlag" } } };}(e)), this._configMap.set(wl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.QUIT_GROUP) }), body: { groupID: void 0 } };}(e)), this._configMap.set(Pl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.SEARCH_GROUP_BY_ID) }), body: { groupIDList: void 0, responseFilter: { groupBasePublicInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "CreateTime", "Owner_Account", "LastInfoTime", "LastMsgTime", "NextMsgSeq", "MemberNum", "MaxMemberNum", "ApplyJoinOption"] } }, keyMap: { response: { ApplyJoinOption: "joinOption" } } };}(e)), this._configMap.set(Gl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.CHANGE_GROUP_OWNER) }), body: { groupID: void 0, newOwnerID: void 0 }, keyMap: { request: { newOwnerID: "NewOwner_Account" } } };}(e)), this._configMap.set(Ul, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.HANDLE_APPLY_JOIN_GROUP) }), body: { groupID: void 0, applicant: void 0, handleAction: void 0, handleMessage: void 0, authentication: void 0, messageKey: void 0, userDefinedField: void 0 }, keyMap: { request: { applicant: "Applicant_Account", handleAction: "HandleMsg", handleMessage: "ApprovalMsg", messageKey: "MsgKey" } } };}(e)), this._configMap.set(Fl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.HANDLE_GROUP_INVITATION) }), body: { groupID: void 0, inviter: void 0, handleAction: void 0, handleMessage: void 0, authentication: void 0, messageKey: void 0, userDefinedField: void 0 }, keyMap: { request: { inviter: "Inviter_Account", handleAction: "HandleMsg", handleMessage: "ApprovalMsg", messageKey: "MsgKey" } } };}(e)), this._configMap.set(Kl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.GET_GROUP_APPLICATION) }), body: { startTime: void 0, limit: void 0, handleAccount: void 0 }, keyMap: { request: { handleAccount: "Handle_Account" } } };}(e)), this._configMap.set(Bl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.OPEN_IM, ".").concat(Bs.CMD.DELETE_GROUP_SYSTEM_MESSAGE) }), body: { messageListToDelete: void 0 }, keyMap: { request: { messageListToDelete: "DelMsgList", messageSeq: "MsgSeq", messageRandom: "MsgRandom" } } };}(e)), this._configMap.set(Hl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.BIG_GROUP_LONG_POLLING, ".").concat(Bs.CMD.AVCHATROOM_LONG_POLL) }), body: { USP: 1, startSeq: 1, holdTime: 90, key: void 0 }, keyMap: { request: { USP: "USP" }, response: { ToGroupId: "groupID" } } };}(e)), this._configMap.set(jl, function (e) {e.a2, e.tinyid;return { head: Fn({}, jn(e, ["a2", "tinyid"]), { servcmd: "".concat(Bs.NAME.BIG_GROUP_LONG_POLLING_NO_AUTH, ".").concat(Bs.CMD.AVCHATROOM_LONG_POLL) }), body: { USP: 1, startSeq: 1, holdTime: 90, key: void 0 }, keyMap: { request: { USP: "USP" }, response: { ToGroupId: "groupID" } } };}(e)), this._configMap.set($l, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.GET_ONLINE_MEMBER_NUM) }), body: { groupID: void 0 } };}(e)), this._configMap.set(zl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.SET_GROUP_ATTRIBUTES) }), body: { groupID: void 0, groupAttributeList: void 0, mainSequence: void 0, avChatRoomKey: void 0, attributeControl: ["RaceConflict"] }, keyMap: { request: { key: "key", value: "value" } } };}(e)), this._configMap.set(Wl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.MODIFY_GROUP_ATTRIBUTES) }), body: { groupID: void 0, groupAttributeList: void 0, mainSequence: void 0, avChatRoomKey: void 0, attributeControl: ["RaceConflict"] }, keyMap: { request: { key: "key", value: "value" } } };}(e)), this._configMap.set(Jl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.DELETE_GROUP_ATTRIBUTES) }), body: { groupID: void 0, groupAttributeList: void 0, mainSequence: void 0, avChatRoomKey: void 0, attributeControl: ["RaceConflict"] }, keyMap: { request: { key: "key" } } };}(e)), this._configMap.set(Xl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.CLEAR_GROUP_ATTRIBUTES) }), body: { groupID: void 0, mainSequence: void 0, avChatRoomKey: void 0, attributeControl: ["RaceConflict"] } };}(e)), this._configMap.set(Ql, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP_ATTR, ".").concat(Bs.CMD.GET_GROUP_ATTRIBUTES) }), body: { groupID: void 0, avChatRoomKey: void 0, groupType: 1 }, keyMap: { request: { avChatRoomKey: "Key", groupType: "GroupType" } } };}(e)), this._configMap.set(Zl, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.GET_GROUP_MEMBER_LIST) }), body: { groupID: void 0, limit: 0, offset: 0, memberRoleFilter: void 0, memberInfoFilter: ["Role", "NameCard", "ShutUpUntil", "JoinTime"], memberCustomFieldFilter: void 0 }, keyMap: { request: { memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember" }, response: { AppMemberDefinedData: "memberCustomField", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", MemberList: "members", ShutUpUntil: "muteUntil" } } };}(e)), this._configMap.set(ep, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.GET_GROUP_MEMBER_INFO) }), body: { groupID: void 0, userIDList: void 0, memberInfoFilter: void 0, memberCustomFieldFilter: void 0 }, keyMap: { request: { userIDList: "Member_List_Account", memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember" }, response: { MemberList: "members", ShutUpUntil: "muteUntil", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", AppMemberDefinedData: "memberCustomField" } } };}(e)), this._configMap.set(tp, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.ADD_GROUP_MEMBER) }), body: { groupID: void 0, silence: void 0, userIDList: void 0 }, keyMap: { request: { userID: "Member_Account", userIDList: "MemberList" }, response: { MemberList: "members" } } };}(e)), this._configMap.set(np, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.DELETE_GROUP_MEMBER) }), body: { groupID: void 0, userIDList: void 0, reason: void 0 }, keyMap: { request: { userIDList: "MemberToDel_Account" } } };}(e)), this._configMap.set(op, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.GROUP, ".").concat(Bs.CMD.MODIFY_GROUP_MEMBER_INFO) }), body: { groupID: void 0, userID: void 0, messageRemindType: void 0, nameCard: void 0, role: void 0, memberCustomField: void 0, muteTime: void 0 }, keyMap: { request: { userID: "Member_Account", memberCustomField: "AppMemberDefinedData", muteTime: "ShutUpTime", messageRemindType: "MsgFlag" } } };}(e)), this._configMap.set(sp, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.IM_OPEN_STAT, ".").concat(Bs.CMD.TIM_WEB_REPORT_V2) }), body: { header: {}, event: [], quality: [] }, keyMap: { request: { SDKType: "sdk_type", SDKVersion: "sdk_version", deviceType: "device_type", platform: "platform", instanceID: "instance_id", traceID: "trace_id", SDKAppID: "sdk_app_id", userID: "user_id", tinyID: "tiny_id", extension: "extension", timestamp: "timestamp", networkType: "network_type", eventType: "event_type", code: "error_code", message: "error_message", moreMessage: "more_message", duplicate: "duplicate", costTime: "cost_time", level: "level", qualityType: "quality_type", reportIndex: "report_index", wholePeriod: "whole_period", totalCount: "total_count", rttCount: "success_count_business", successRateOfRequest: "percent_business", countLessThan1Second: "success_count_business", percentOfCountLessThan1Second: "percent_business", countLessThan3Second: "success_count_platform", percentOfCountLessThan3Second: "percent_platform", successCountOfBusiness: "success_count_business", successRateOfBusiness: "percent_business", successCountOfPlatform: "success_count_platform", successRateOfPlatform: "percent_platform", successCountOfMessageReceived: "success_count_business", successRateOfMessageReceived: "percent_business", avgRTT: "average_value", avgDelay: "average_value", avgValue: "average_value" } } };}(n)), this._configMap.set(ip, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.HEARTBEAT, ".").concat(Bs.CMD.ALIVE) }), body: {} };}(e)), this._configMap.set(up, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.IM_OPEN_PUSH, ".").concat(Bs.CMD.MESSAGE_PUSH) }), body: {}, keyMap: { response: { C2cMsgArray: "C2CMessageArray", GroupMsgArray: "groupMessageArray", GroupTips: "groupTips", C2cNotifyMsgArray: "C2CNotifyMessageArray", ClientSeq: "clientSequence", MsgPriority: "priority", NoticeSeq: "noticeSequence", MsgContent: "content", MsgType: "type", MsgBody: "elements", ToGroupId: "to", Desc: "description", Ext: "extension", IsSyncMsg: "isSyncMessage", Flag: "needSync", NeedAck: "needAck", PendencyAdd_Account: "userID", ProfileImNick: "nick", PendencyType: "applicationType" } } };}(e)), this._configMap.set(cp, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.OPEN_IM, ".").concat(Bs.CMD.MESSAGE_PUSH_ACK) }), body: { sessionData: void 0 }, keyMap: { request: { sessionData: "SessionData" } } };}(e)), this._configMap.set(lp, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.IM_OPEN_STATUS, ".").concat(Bs.CMD.STATUS_FORCEOFFLINE) }), body: {}, keyMap: { response: { C2cNotifyMsgArray: "C2CNotifyMessageArray", NoticeSeq: "noticeSequence", KickoutMsgNotify: "kickoutMsgNotify", NewInstInfo: "newInstanceInfo" } } };}(e)), this._configMap.set(dp, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.IM_LONG_MESSAGE, ".").concat(Bs.CMD.DOWNLOAD_MERGER_MESSAGE) }), body: { downloadKey: "" }, keyMap: { response: { Data: "data", Desc: "description", Ext: "extension", Download_Flag: "downloadFlag", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID" } } };}(e)), this._configMap.set(pp, function (e) {return { head: Fn({}, e, { servcmd: "".concat(Bs.NAME.IM_LONG_MESSAGE, ".").concat(Bs.CMD.UPLOAD_MERGER_MESSAGE) }), body: { messageList: [] }, keyMap: { request: { fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody", type: "MsgType", content: "MsgContent", data: "Data", description: "Desc", extension: "Ext", sizeType: "Type", uuid: "UUID", url: "", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", from: "From_Account", time: "MsgTimeStamp", messageRandom: "MsgRandom", messageSequence: "MsgSeq", elements: "MsgBody", clientSequence: "ClientSeq", payload: "MsgContent", messageList: "MsgList", messageNumber: "MsgNum", abstractList: "AbstractList", messageBody: "MsgBody" } } };}(e));} }, { key: "has", value: function value(e) {return this._configMap.has(e);} }, { key: "get", value: function value(e) {return this._configMap.get(e);} }, { key: "update", value: function value() {this._fillConfigMap();} }, { key: "getKeyMap", value: function value(e) {return this.has(e) ? this.get(e).keyMap || {} : (Gi.warn("".concat(this._className, ".getKeyMap unknown protocolName:").concat(e)), {});} }, { key: "getProtocolData", value: function value(e) {var t = e.protocolName,n = e.requestData,o = this.get(t),r = null;if (n) {var a = this._simpleDeepCopy(o),s = a.body,i = Object.create(null);for (var u in s) {if (Object.prototype.hasOwnProperty.call(s, u)) {if (i[u] = s[u], void 0 === n[u]) continue;i[u] = n[u];}}a.body = i, r = this._getUplinkData(a);} else r = this._getUplinkData(o);return r;} }, { key: "_getUplinkData", value: function value(e) {var t = this._requestDataCleaner(e),n = Mu(t.head),o = _v(t.body, this._getRequestKeyMap(n));return t.body = o, t;} }, { key: "_getRequestKeyMap", value: function value(e) {var t = this.getKeyMap(e);return Fn({}, dv.request, {}, t.request);} }, { key: "_requestDataCleaner", value: function value(e) {var t = Array.isArray(e) ? [] : Object.create(null);for (var n in e) {Object.prototype.hasOwnProperty.call(e, n) && zi(n) && null !== e[n] && void 0 !== e[n] && ("object" !== Rn(e[n]) ? t[n] = e[n] : t[n] = this._requestDataCleaner.bind(this)(e[n]));}return t;} }, { key: "_simpleDeepCopy", value: function value(e) {for (var t, n = Object.keys(e), o = {}, r = 0, a = n.length; r < a; r++) {t = n[r], Ki(e[t]) ? o[t] = Array.from(e[t]) : xi(e[t]) ? o[t] = this._simpleDeepCopy(e[t]) : o[t] = e[t];}return o;} }]), e;}(),Av = [cp],kv = function () {function e(t) {bn(this, e), this._sessionModule = t, this._className = "DownlinkHandler", this._eventHandlerMap = new Map(), this._eventHandlerMap.set("C2CMessageArray", this._c2cMessageArrayHandler.bind(this)), this._eventHandlerMap.set("groupMessageArray", this._groupMessageArrayHandler.bind(this)), this._eventHandlerMap.set("groupTips", this._groupTipsHandler.bind(this)), this._eventHandlerMap.set("C2CNotifyMessageArray", this._C2CNotifyMessageArrayHandler.bind(this)), this._eventHandlerMap.set("profileModify", this._profileHandler.bind(this)), this._eventHandlerMap.set("friendListMod", this._relationChainHandler.bind(this)), this._eventHandlerMap.set("recentContactMod", this._recentContactHandler.bind(this)), this._keys = Jn(this._eventHandlerMap.keys());}return Pn(e, [{ key: "_c2cMessageArrayHandler", value: function value(e) {var t = this._sessionModule.getModule(qc);if (t) {if (e.dataList.forEach(function (e) {if (1 === e.isSyncMessage) {var t = e.from;e.from = e.to, e.to = t;}}), 1 === e.needSync) this._sessionModule.getModule(Xc).startOnlineSync();t.onNewC2CMessage({ dataList: e.dataList, isInstantMessage: !0 });}} }, { key: "_groupMessageArrayHandler", value: function value(e) {var t = this._sessionModule.getModule(xc);t && t.onNewGroupMessage({ event: e.event, dataList: e.dataList, isInstantMessage: !0 });} }, { key: "_groupTipsHandler", value: function value(e) {var t = this._sessionModule.getModule(xc);if (t) {var n = e.event,o = e.dataList,r = e.isInstantMessage,a = void 0 === r || r,s = e.isSyncingEnded;switch (n) {case 4:case 6:t.onNewGroupTips({ event: n, dataList: o });break;case 5:o.forEach(function (e) {Ki(e.elements.revokedInfos) ? t.onGroupMessageRevoked({ dataList: o }) : Ki(e.elements.groupMessageReadNotice) ? t.onGroupMessageReadNotice({ dataList: o }) : t.onNewGroupSystemNotice({ dataList: o, isInstantMessage: a, isSyncingEnded: s });});break;case 12:this._sessionModule.getModule(Bc).onNewGroupAtTips({ dataList: o });break;default:Gi.log("".concat(this._className, "._groupTipsHandler unknown event:").concat(n, " dataList:"), o);}}} }, { key: "_C2CNotifyMessageArrayHandler", value: function value(e) {var t = this,n = e.dataList;if (Ki(n)) {var o = this._sessionModule.getModule(qc);n.forEach(function (e) {if (Vi(e)) if (e.hasOwnProperty("kickoutMsgNotify")) {var r = e.kickoutMsgNotify,a = r.kickType,s = r.newInstanceInfo,i = void 0 === s ? {} : s;1 === a ? t._sessionModule.onMultipleAccountKickedOut(i) : 2 === a && t._sessionModule.onMultipleDeviceKickedOut(i);} else e.hasOwnProperty("c2cMessageRevokedNotify") ? o && o.onC2CMessageRevoked({ dataList: n }) : e.hasOwnProperty("c2cMessageReadReceipt") ? o && o.onC2CMessageReadReceipt({ dataList: n }) : e.hasOwnProperty("c2cMessageReadNotice") && o && o.onC2CMessageReadNotice({ dataList: n });});}} }, { key: "_profileHandler", value: function value(e) {this._sessionModule.getModule(Fc).onProfileModified({ dataList: e.dataList });var t = this._sessionModule.getModule(Vc);t && t.onFriendProfileModified({ dataList: e.dataList });} }, { key: "_relationChainHandler", value: function value(e) {this._sessionModule.getModule(Fc).onRelationChainModified({ dataList: e.dataList });var t = this._sessionModule.getModule(Vc);t && t.onRelationChainModified({ dataList: e.dataList });} }, { key: "_recentContactHandler", value: function value(e) {var t = e.dataList;if (Ki(t)) {var n = this._sessionModule.getModule(Bc);n && t.forEach(function (e) {var t = e.pushType,o = e.recentContactTopItem,r = e.recentContactDeleteItem;1 === t ? n.onConversationDeleted(r.recentContactList) : 2 === t ? n.onConversationPinned(o.recentContactList) : 3 === t && n.onConversationUnpinned(o.recentContactList);});}} }, { key: "_cloudControlConfigHandler", value: function value(e) {this._sessionModule.getModule(tl).onPushedCloudControlConfig(e);} }, { key: "onMessage", value: function value(e) {var t = this,n = e.head,o = e.body;if (this._isPushedCloudControlConfig(n)) this._cloudControlConfigHandler(o);else {var r = o.eventArray,a = o.isInstantMessage,s = o.isSyncingEnded,i = o.needSync;if (Ki(r)) for (var u = null, c = null, l = 0, p = 0, d = r.length; p < d; p++) {l = (u = r[p]).event;var g = Object.keys(u).find(function (e) {return -1 !== t._keys.indexOf(e);});g ? (c = u[g], this._eventHandlerMap.get(g)({ event: l, dataList: c, isInstantMessage: a, isSyncingEnded: s, needSync: i })) : Gi.log("".concat(this._className, ".onMessage unknown eventItem:").concat(u));}}} }, { key: "_isPushedCloudControlConfig", value: function value(e) {return e.servcmd && e.servcmd.includes(hp);} }]), e;}(),Nv = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "SessionModule", o._platform = o.getPlatform(), o._protocolHandler = new Cv($n(o)), o._messageDispatcher = new kv($n(o)), o;}return Pn(n, [{ key: "updateProtocolConfig", value: function value() {this._protocolHandler.update();} }, { key: "request", value: function value(e) {Gi.debug("".concat(this._className, ".request options:"), e);var t = e.protocolName,n = e.tjgID;if (!this._protocolHandler.has(t)) return Gi.warn("".concat(this._className, ".request unknown protocol:").concat(t)), Z_({ code: fp.CANNOT_FIND_PROTOCOL, message: Id });var o = this.getProtocolData(e);Du(n) || (o.head.tjgID = n);var r = this.getModule(Zc);return Av.includes(t) ? r.simplySend(o) : r.send(o);} }, { key: "getKeyMap", value: function value(e) {return this._protocolHandler.getKeyMap(e);} }, { key: "genCommonHead", value: function value() {var e = this.getModule(Hc);return { ver: "v4", platform: this._platform, websdkappid: qs, websdkversion: Fs, a2: e.getA2Key() || void 0, tinyid: e.getTinyID() || void 0, status_instid: e.getStatusInstanceID(), sdkappid: e.getSDKAppID(), contenttype: e.getContentType(), reqtime: 0, identifier: e.getA2Key() ? void 0 : e.getUserID(), usersig: e.getA2Key() ? void 0 : e.getUserSig(), sdkability: 2, tjgID: "" };} }, { key: "genCosSpecifiedHead", value: function value() {var e = this.getModule(Hc);return { ver: "v4", platform: this._platform, websdkappid: qs, websdkversion: Fs, sdkappid: e.getSDKAppID(), contenttype: e.getContentType(), reqtime: 0, identifier: e.getUserID(), usersig: e.getUserSig(), status_instid: e.getStatusInstanceID(), sdkability: 2 };} }, { key: "genSSOReportHead", value: function value() {var e = this.getModule(Hc);return { ver: "v4", platform: this._platform, websdkappid: qs, websdkversion: Fs, sdkappid: e.getSDKAppID(), contenttype: "", reqtime: 0, identifier: "", usersig: "", status_instid: e.getStatusInstanceID(), sdkability: 2 };} }, { key: "getProtocolData", value: function value(e) {return this._protocolHandler.getProtocolData(e);} }, { key: "onErrorCodeNotZero", value: function value(e) {var t = e.errorCode;if (t === fp.HELLO_ANSWER_KICKED_OUT) {var n = e.kickType,o = e.newInstanceInfo,r = void 0 === o ? {} : o;1 === n ? this.onMultipleAccountKickedOut(r) : 2 === n && this.onMultipleDeviceKickedOut(r);}t !== fp.MESSAGE_A2KEY_EXPIRED && t !== fp.ACCOUNT_A2KEY_EXPIRED || (this._onUserSigExpired(), this.getModule(Zc).reConnect());} }, { key: "onMessage", value: function value(e) {var t = e.body,n = t.needAck,o = void 0 === n ? 0 : n,r = t.sessionData;1 === o && this._sendACK(r), this._messageDispatcher.onMessage(e);} }, { key: "onReconnected", value: function value() {var e = this;this.isLoggedIn() && this.request({ protocolName: al }).then(function (t) {var n = t.data.instanceID;e.getModule(Hc).setStatusInstanceID(n), Gi.log("".concat(e._className, ".onReconnected, login ok. start to sync unread messages.")), e.getModule(Xc).startSyncOnReconnected(), e.getModule(nl).startPull(), e.getModule(xc).updateLocalMainSequenceOnReconnected();});} }, { key: "onMultipleAccountKickedOut", value: function value(e) {this.getModule(Gc).onMultipleAccountKickedOut(e);} }, { key: "onMultipleDeviceKickedOut", value: function value(e) {this.getModule(Gc).onMultipleDeviceKickedOut(e);} }, { key: "_onUserSigExpired", value: function value() {this.getModule(Gc).onUserSigExpired();} }, { key: "_sendACK", value: function value(e) {this.request({ protocolName: cp, requestData: { sessionData: e } });} }]), n;}(rl),Ov = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "MessageLossDetectionModule", o._maybeLostSequencesMap = new Map(), o;}return Pn(n, [{ key: "onMessageMaybeLost", value: function value(e, t, n) {this._maybeLostSequencesMap.has(e) || this._maybeLostSequencesMap.set(e, []);for (var o = this._maybeLostSequencesMap.get(e), r = 0; r < n; r++) {o.push(t + r);}Gi.debug("".concat(this._className, ".onMessageMaybeLost. maybeLostSequences:").concat(o));} }, { key: "detectMessageLoss", value: function value(e, t) {var n = this._maybeLostSequencesMap.get(e);if (!Du(n) && !Du(t)) {var o = t.filter(function (e) {return -1 !== n.indexOf(e);});if (Gi.debug("".concat(this._className, ".detectMessageLoss. matchedSequences:").concat(o)), n.length === o.length) Gi.info("".concat(this._className, ".detectMessageLoss no message loss. conversationID:").concat(e));else {var r,a = n.filter(function (e) {return -1 === o.indexOf(e);}),s = a.length;s <= 5 ? r = e + "-" + a.join("-") : (a.sort(function (e, t) {return e - t;}), r = e + " start:" + a[0] + " end:" + a[s - 1] + " count:" + s), new Fd(Wg).setMessage(r).setNetworkType(this.getNetworkType()).setLevel("warning").end(), Gi.warn("".concat(this._className, ".detectMessageLoss message loss detected. conversationID:").concat(e, " lostSequences:").concat(a));}n.length = 0;}} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._maybeLostSequencesMap.clear();} }]), n;}(rl),Lv = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "CloudControlModule", o._cloudConfig = new Map(), o._expiredTime = 0, o._version = 0, o._isFetching = !1, o;}return Pn(n, [{ key: "getCloudConfig", value: function value(e) {return Bi(e) ? this._cloudConfig : this._cloudConfig.has(e) ? this._cloudConfig.get(e) : void 0;} }, { key: "_canFetchConfig", value: function value() {return this.isLoggedIn() && !this._isFetching && Date.now() >= this._expiredTime;} }, { key: "fetchConfig", value: function value() {var e = this,t = this._canFetchConfig();if (Gi.log("".concat(this._className, ".fetchConfig canFetchConfig:").concat(t)), t) {var n = new Fd(oh),o = this.getModule(Hc).getSDKAppID();this._isFetching = !0, this.request({ protocolName: gp, requestData: { SDKAppID: o, version: this._version } }).then(function (t) {e._isFetching = !1, n.setMessage("version:".concat(e._version, " newVersion:").concat(t.data.version, " config:").concat(t.data.cloudControlConfig)).setNetworkType(e.getNetworkType()).end(), Gi.log("".concat(e._className, ".fetchConfig ok")), e._parseCloudControlConfig(t.data);}).catch(function (t) {e._isFetching = !1, e.probeNetwork().then(function (e) {var o = Wn(e, 2),r = o[0],a = o[1];n.setError(t, r, a).end();}), Gi.log("".concat(e._className, ".fetchConfig failed. error:"), t), e._setExpiredTimeOnResponseError(12e4);});}} }, { key: "onPushedCloudControlConfig", value: function value(e) {Gi.log("".concat(this._className, ".onPushedCloudControlConfig")), new Fd(rh).setNetworkType(this.getNetworkType()).setMessage("newVersion:".concat(e.version, " config:").concat(e.cloudControlConfig)).end(), this._parseCloudControlConfig(e);} }, { key: "onCheckTimer", value: function value(e) {this._canFetchConfig() && this.fetchConfig();} }, { key: "_parseCloudControlConfig", value: function value(e) {var t = this,n = "".concat(this._className, "._parseCloudControlConfig"),o = e.errorCode,r = e.errorMessage,a = e.cloudControlConfig,s = e.version,i = e.expiredTime;if (0 === o) {if (this._version !== s) {var u = null;try {u = JSON.parse(a);} catch (jv) {Gi.error("".concat(n, " JSON parse error:").concat(a));}u && (this._cloudConfig.clear(), Object.keys(u).forEach(function (e) {t._cloudConfig.set(e, u[e]);}), this._version = s, this.emitInnerEvent(lm.CLOUD_CONFIG_UPDATED));}this._expiredTime = Date.now() + 1e3 * i;} else Bi(o) ? (Gi.log("".concat(n, " failed. Invalid message format:"), e), this._setExpiredTimeOnResponseError(36e5)) : (Gi.error("".concat(n, " errorCode:").concat(o, " errorMessage:").concat(r)), this._setExpiredTimeOnResponseError(12e4));} }, { key: "_setExpiredTimeOnResponseError", value: function value(e) {this._expiredTime = Date.now() + e;} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._cloudConfig.clear(), this._expiredTime = 0, this._version = 0, this._isFetching = !1;} }]), n;}(rl),Rv = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;return bn(this, n), (o = t.call(this, e))._className = "PullGroupMessageModule", o._remoteLastMessageSequenceMap = new Map(), o.PULL_LIMIT_COUNT = 15, o;}return Pn(n, [{ key: "startPull", value: function value() {var e = this,t = this._getNeedPullConversationList();this._getRemoteLastMessageSequenceList().then(function () {var n = e.getModule(Bc);t.forEach(function (t) {var o = t.conversationID,r = o.replace(ro.CONV_GROUP, ""),a = n.getGroupLocalLastMessageSequence(o),s = e._remoteLastMessageSequenceMap.get(r) || 0,i = s - a;Gi.log("".concat(e._className, ".startPull groupID:").concat(r, " localLastMessageSequence:").concat(a, " ") + "remoteLastMessageSequence:".concat(s, " diff:").concat(i)), a > 0 && i >= 1 && i < 300 && e._pullMissingMessage({ groupID: r, localLastMessageSequence: a, remoteLastMessageSequence: s, diff: i });});});} }, { key: "_getNeedPullConversationList", value: function value() {return this.getModule(Bc).getLocalConversationList().filter(function (e) {return e.type === ro.CONV_GROUP && e.groupProfile.type !== ro.GRP_AVCHATROOM;});} }, { key: "_getRemoteLastMessageSequenceList", value: function value() {var e = this;return this.getModule(xc).getGroupList().then(function (t) {for (var n = t.data.groupList, o = void 0 === n ? [] : n, r = 0; r < o.length; r++) {var a = o[r],s = a.groupID,i = a.nextMessageSeq;if (a.type !== ro.GRP_AVCHATROOM) {var u = i - 1;e._remoteLastMessageSequenceMap.set(s, u);}}});} }, { key: "_pullMissingMessage", value: function value(e) {var t = this,n = e.localLastMessageSequence,o = e.remoteLastMessageSequence,r = e.diff;e.count = r > this.PULL_LIMIT_COUNT ? this.PULL_LIMIT_COUNT : r, e.sequence = r > this.PULL_LIMIT_COUNT ? n + this.PULL_LIMIT_COUNT : n + r, this._getGroupMissingMessage(e).then(function (a) {a.length > 0 && (a[0].sequence + 1 <= o && (e.localLastMessageSequence = n + t.PULL_LIMIT_COUNT, e.diff = r - t.PULL_LIMIT_COUNT, t._pullMissingMessage(e)), t.getModule(xc).onNewGroupMessage({ dataList: a, isInstantMessage: !1 }));});} }, { key: "_getGroupMissingMessage", value: function value(e) {var t = this,n = new Fd(Lg);return this.request({ protocolName: Vl, requestData: { groupID: e.groupID, count: e.count, sequence: e.sequence } }).then(function (o) {var r = o.data.messageList,a = void 0 === r ? [] : r;return n.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(e.groupID, " count:").concat(e.count, " sequence:").concat(e.sequence, " messageList length:").concat(a.length)).end(), a;}).catch(function (e) {t.probeNetwork().then(function (t) {var o = Wn(t, 2),r = o[0],a = o[1];n.setError(e, r, a).end();});});} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._remoteLastMessageSequenceMap.clear();} }]), n;}(rl),bv = function () {function e() {bn(this, e), this._className = "AvgE2EDelay", this._e2eDelayArray = [];}return Pn(e, [{ key: "addMessageDelay", value: function value(e) {var t = yu(e.currentTime / 1e3 - e.time, 2);this._e2eDelayArray.push(t);} }, { key: "_calcAvg", value: function value(e, t) {if (0 === t) return 0;var n = 0;return e.forEach(function (e) {n += e;}), yu(n / t, 1);} }, { key: "_calcTotalCount", value: function value() {return this._e2eDelayArray.length;} }, { key: "_calcCountWithLimit", value: function value(e) {var t = e.e2eDelayArray,n = e.min,o = e.max;return t.filter(function (e) {return n < e && e <= o;}).length;} }, { key: "_calcPercent", value: function value(e, t) {var n = yu(e / t * 100, 2);return n > 100 && (n = 100), n;} }, { key: "_checkE2EDelayException", value: function value(e, t) {var n = e.filter(function (e) {return e > t;});if (n.length > 0) {var o = n.length,r = Math.min.apply(Math, Jn(n)),a = Math.max.apply(Math, Jn(n)),s = this._calcAvg(n, o),i = yu(o / e.length * 100, 2);new Fd(lg).setMessage("message e2e delay exception. count:".concat(o, " min:").concat(r, " max:").concat(a, " avg:").concat(s, " percent:").concat(i)).setLevel("warning").end();}} }, { key: "getStatResult", value: function value() {var e = this._calcTotalCount();if (0 === e) return null;var t = Jn(this._e2eDelayArray),n = this._calcCountWithLimit({ e2eDelayArray: t, min: 0, max: 1 }),o = this._calcCountWithLimit({ e2eDelayArray: t, min: 1, max: 3 }),r = this._calcPercent(n, e),a = this._calcPercent(o, e),s = this._calcAvg(t, e);return this._checkE2EDelayException(t, 3), this.reset(), { totalCount: e, countLessThan1Second: n, percentOfCountLessThan1Second: r, countLessThan3Second: o, percentOfCountLessThan3Second: a, avgDelay: s };} }, { key: "reset", value: function value() {this._e2eDelayArray.length = 0;} }]), e;}(),wv = function () {function e() {bn(this, e), this._className = "AvgRTT", this._requestCount = 0, this._rttArray = [];}return Pn(e, [{ key: "addRequestCount", value: function value() {this._requestCount += 1;} }, { key: "addRTT", value: function value(e) {this._rttArray.push(e);} }, { key: "_calcTotalCount", value: function value() {return this._requestCount;} }, { key: "_calcRTTCount", value: function value(e) {return e.length;} }, { key: "_calcSuccessRateOfRequest", value: function value(e, t) {if (0 === t) return 0;var n = yu(e / t * 100, 2);return n > 100 && (n = 100), n;} }, { key: "_calcAvg", value: function value(e, t) {if (0 === t) return 0;var n = 0;return e.forEach(function (e) {n += e;}), parseInt(n / t);} }, { key: "_calcMax", value: function value() {return Math.max.apply(Math, Jn(this._rttArray));} }, { key: "_calcMin", value: function value() {return Math.min.apply(Math, Jn(this._rttArray));} }, { key: "getStatResult", value: function value() {var e = this._calcTotalCount(),t = Jn(this._rttArray);if (0 === e) return null;var n = this._calcRTTCount(t),o = this._calcSuccessRateOfRequest(n, e),r = this._calcAvg(t, n);return Gi.log("".concat(this._className, ".getStatResult max:").concat(this._calcMax(), " min:").concat(this._calcMin(), " avg:").concat(r)), this.reset(), { totalCount: e, rttCount: n, successRateOfRequest: o, avgRTT: r };} }, { key: "reset", value: function value() {this._requestCount = 0, this._rttArray.length = 0;} }]), e;}(),Pv = function () {function e() {bn(this, e), this._map = new Map();}return Pn(e, [{ key: "initMap", value: function value(e) {var t = this;e.forEach(function (e) {t._map.set(e, { totalCount: 0, successCount: 0, failedCountOfUserSide: 0, costArray: [], fileSizeArray: [] });});} }, { key: "addTotalCount", value: function value(e) {return !(Bi(e) || !this._map.has(e)) && (this._map.get(e).totalCount += 1, !0);} }, { key: "addSuccessCount", value: function value(e) {return !(Bi(e) || !this._map.has(e)) && (this._map.get(e).successCount += 1, !0);} }, { key: "addFailedCountOfUserSide", value: function value(e) {return !(Bi(e) || !this._map.has(e)) && (this._map.get(e).failedCountOfUserSide += 1, !0);} }, { key: "addCost", value: function value(e, t) {return !(Bi(e) || !this._map.has(e)) && (this._map.get(e).costArray.push(t), !0);} }, { key: "addFileSize", value: function value(e, t) {return !(Bi(e) || !this._map.has(e)) && (this._map.get(e).fileSizeArray.push(t), !0);} }, { key: "_calcSuccessRateOfBusiness", value: function value(e) {if (Bi(e) || !this._map.has(e)) return -1;var t = this._map.get(e),n = yu(t.successCount / t.totalCount * 100, 2);return n > 100 && (n = 100), n;} }, { key: "_calcSuccessRateOfPlatform", value: function value(e) {if (Bi(e) || !this._map.has(e)) return -1;var t = this._map.get(e),n = this._calcSuccessCountOfPlatform(e) / t.totalCount * 100;return (n = yu(n, 2)) > 100 && (n = 100), n;} }, { key: "_calcTotalCount", value: function value(e) {return Bi(e) || !this._map.has(e) ? -1 : this._map.get(e).totalCount;} }, { key: "_calcSuccessCountOfBusiness", value: function value(e) {return Bi(e) || !this._map.has(e) ? -1 : this._map.get(e).successCount;} }, { key: "_calcSuccessCountOfPlatform", value: function value(e) {if (Bi(e) || !this._map.has(e)) return -1;var t = this._map.get(e);return t.successCount + t.failedCountOfUserSide;} }, { key: "_calcAvg", value: function value(e) {return Bi(e) || !this._map.has(e) ? -1 : e === Ld ? this._calcAvgSpeed(e) : this._calcAvgCost(e);} }, { key: "_calcAvgCost", value: function value(e) {var t = this._map.get(e).costArray.length;if (0 === t) return 0;var n = 0;return this._map.get(e).costArray.forEach(function (e) {n += e;}), parseInt(n / t);} }, { key: "_calcAvgSpeed", value: function value(e) {var t = 0,n = 0;return this._map.get(e).costArray.forEach(function (e) {t += e;}), this._map.get(e).fileSizeArray.forEach(function (e) {n += e;}), parseInt(1e3 * n / t);} }, { key: "getStatResult", value: function value(e) {var t = this._calcTotalCount(e);if (0 === t) return null;var n = this._calcSuccessCountOfBusiness(e),o = this._calcSuccessRateOfBusiness(e),r = this._calcSuccessCountOfPlatform(e),a = this._calcSuccessRateOfPlatform(e),s = this._calcAvg(e);return this.reset(e), { totalCount: t, successCountOfBusiness: n, successRateOfBusiness: o, successCountOfPlatform: r, successRateOfPlatform: a, avgValue: s };} }, { key: "reset", value: function value(e) {Bi(e) ? this._map.clear() : this._map.set(e, { totalCount: 0, successCount: 0, failedCountOfUserSide: 0, costArray: [], fileSizeArray: [] });} }]), e;}(),Gv = function () {function e() {bn(this, e), this._lastMap = new Map(), this._currentMap = new Map();}return Pn(e, [{ key: "initMap", value: function value(e) {var t = this;e.forEach(function (e) {t._lastMap.set(e, new Map()), t._currentMap.set(e, new Map());});} }, { key: "addMessageSequence", value: function value(e) {var t = e.key,n = e.message;if (Bi(t) || !this._lastMap.has(t) || !this._currentMap.has(t)) return !1;var o = n.conversationID,r = n.sequence,a = o.replace(ro.CONV_GROUP, "");if (0 === this._lastMap.get(t).size) this._addCurrentMap(e);else if (this._lastMap.get(t).has(a)) {var s = this._lastMap.get(t).get(a),i = s.length - 1;r > s[0] && r < s[i] ? (s.push(r), s.sort(), this._lastMap.get(t).set(a, s)) : this._addCurrentMap(e);} else this._addCurrentMap(e);return !0;} }, { key: "_addCurrentMap", value: function value(e) {var t = e.key,n = e.message,o = n.conversationID,r = n.sequence,a = o.replace(ro.CONV_GROUP, "");this._currentMap.get(t).has(a) || this._currentMap.get(t).set(a, []), this._currentMap.get(t).get(a).push(r);} }, { key: "_copyData", value: function value(e) {if (!Bi(e)) {this._lastMap.set(e, new Map());var t,n = this._lastMap.get(e),o = no(this._currentMap.get(e));try {for (o.s(); !(t = o.n()).done;) {var r = Wn(t.value, 2),a = r[0],s = r[1];n.set(a, s);}} catch (i) {o.e(i);} finally {o.f();}n = null, this._currentMap.set(e, new Map());}} }, { key: "getStatResult", value: function value(e) {if (Bi(this._currentMap.get(e)) || Bi(this._lastMap.get(e))) return null;if (0 === this._lastMap.get(e).size) return this._copyData(e), null;var t = 0,n = 0;if (this._lastMap.get(e).forEach(function (e, o) {var r = Jn(e.values()),a = r.length,s = r[a - 1] - r[0] + 1;t += s, n += a;}), 0 === t) return null;var o = yu(n / t * 100, 2);return o > 100 && (o = 100), this._copyData(e), { totalCount: t, successCountOfMessageReceived: n, successRateOfMessageReceived: o };} }, { key: "reset", value: function value() {this._currentMap.clear(), this._lastMap.clear();} }]), e;}(),Uv = function (e) {qn(n, e);var t = zn(n);function n(e) {var o;bn(this, n), (o = t.call(this, e))._className = "QualityStatModule", o.TAG = "im-ssolog-quality-stat", o.reportIndex = 0, o.wholePeriod = !1, o._qualityItems = [Ed, Cd, Ad, kd, Nd, Od, Ld, Rd, bd, wd], o._messageSentItems = [Ad, kd, Nd, Od, Ld], o._messageReceivedItems = [Rd, bd, wd], o.REPORT_INTERVAL = 120, o.REPORT_SDKAPPID_BLACKLIST = [], o.REPORT_TINYID_WHITELIST = [], o._statInfoArr = [], o._avgRTT = new wv(), o._avgE2EDelay = new bv(), o._rateMessageSent = new Pv(), o._rateMessageReceived = new Gv();var r = o.getInnerEmitterInstance();return r.on(lm.CONTEXT_A2KEY_AND_TINYID_UPDATED, o._onLoginSuccess, $n(o)), r.on(lm.CLOUD_CONFIG_UPDATED, o._onCloudConfigUpdated, $n(o)), o;}return Pn(n, [{ key: "_onLoginSuccess", value: function value() {var e = this;this._rateMessageSent.initMap(this._messageSentItems), this._rateMessageReceived.initMap(this._messageReceivedItems);var t = this.getModule(jc),n = t.getItem(this.TAG, !1);!Du(n) && ji(n.forEach) && (Gi.log("".concat(this._className, "._onLoginSuccess.get quality stat log in storage, nums=").concat(n.length)), n.forEach(function (t) {e._statInfoArr.push(t);}), t.removeItem(this.TAG, !1));} }, { key: "_onCloudConfigUpdated", value: function value() {var e = this.getCloudConfig("q_rpt_interval"),t = this.getCloudConfig("q_rpt_sdkappid_bl"),n = this.getCloudConfig("q_rpt_tinyid_wl");Bi(e) || (this.REPORT_INTERVAL = Number(e)), Bi(t) || (this.REPORT_SDKAPPID_BLACKLIST = t.split(",").map(function (e) {return Number(e);})), Bi(n) || (this.REPORT_TINYID_WHITELIST = n.split(","));} }, { key: "onCheckTimer", value: function value(e) {this.isLoggedIn() && e % this.REPORT_INTERVAL == 0 && (this.wholePeriod = !0, this._report());} }, { key: "addRequestCount", value: function value() {this._avgRTT.addRequestCount();} }, { key: "addRTT", value: function value(e) {this._avgRTT.addRTT(e);} }, { key: "addMessageDelay", value: function value(e) {this._avgE2EDelay.addMessageDelay(e);} }, { key: "addTotalCount", value: function value(e) {this._rateMessageSent.addTotalCount(e) || Gi.warn("".concat(this._className, ".addTotalCount invalid key:"), e);} }, { key: "addSuccessCount", value: function value(e) {this._rateMessageSent.addSuccessCount(e) || Gi.warn("".concat(this._className, ".addSuccessCount invalid key:"), e);} }, { key: "addFailedCountOfUserSide", value: function value(e) {this._rateMessageSent.addFailedCountOfUserSide(e) || Gi.warn("".concat(this._className, ".addFailedCountOfUserSide invalid key:"), e);} }, { key: "addCost", value: function value(e, t) {this._rateMessageSent.addCost(e, t) || Gi.warn("".concat(this._className, ".addCost invalid key or cost:"), e, t);} }, { key: "addFileSize", value: function value(e, t) {this._rateMessageSent.addFileSize(e, t) || Gi.warn("".concat(this._className, ".addFileSize invalid key or size:"), e, t);} }, { key: "addMessageSequence", value: function value(e) {this._rateMessageReceived.addMessageSequence(e) || Gi.warn("".concat(this._className, ".addMessageSequence invalid key:"), e.key);} }, { key: "_getQualityItem", value: function value(e) {var t = {},n = Ud[this.getNetworkType()];Bi(n) && (n = 8);var o = { qualityType: Pd[e], timestamp: Li(), networkType: n, extension: "" };switch (e) {case Ed:t = this._avgRTT.getStatResult();break;case Cd:t = this._avgE2EDelay.getStatResult();break;case Ad:case kd:case Nd:case Od:case Ld:t = this._rateMessageSent.getStatResult(e);break;case Rd:case bd:case wd:t = this._rateMessageReceived.getStatResult(e);}return null === t ? null : Fn({}, o, {}, t);} }, { key: "_report", value: function value(e) {var t = this,n = [],o = null;Bi(e) ? this._qualityItems.forEach(function (e) {null !== (o = t._getQualityItem(e)) && (o.reportIndex = t.reportIndex, o.wholePeriod = t.wholePeriod, n.push(o));}) : null !== (o = this._getQualityItem(e)) && (o.reportIndex = this.reportIndex, o.wholePeriod = this.wholePeriod, n.push(o)), Gi.debug("".concat(this._className, "._report"), n), this._statInfoArr.length > 0 && (n = n.concat(this._statInfoArr), this._statInfoArr = []);var r = this.getModule(Hc),a = r.getSDKAppID(),s = r.getTinyID();Iu(this.REPORT_SDKAPPID_BLACKLIST, a) && !Su(this.REPORT_TINYID_WHITELIST, s) && (n = []), n.length > 0 && this._doReport(n);} }, { key: "_doReport", value: function value(e) {var t = this,n = { header: Qm(this), quality: e };this.request({ protocolName: sp, requestData: Fn({}, n) }).then(function () {t.reportIndex++, t.wholePeriod = !1;}).catch(function (n) {Gi.warn("".concat(t._className, "._doReport, online:").concat(t.getNetworkType(), " error:"), n), t._statInfoArr = t._statInfoArr.concat(e), t._flushAtOnce();});} }, { key: "_flushAtOnce", value: function value() {var e = this.getModule(jc),t = e.getItem(this.TAG, !1),n = this._statInfoArr;if (Du(t)) Gi.log("".concat(this._className, "._flushAtOnce count:").concat(n.length)), e.setItem(this.TAG, n, !0, !1);else {var o = n.concat(t);o.length > 10 && (o = o.slice(0, 10)), Gi.log("".concat(this.className, "._flushAtOnce count:").concat(o.length)), e.setItem(this.TAG, o, !0, !1);}this._statInfoArr = [];} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), this._report(), this.reportIndex = 0, this.wholePeriod = !1, this.REPORT_SDKAPPID_BLACKLIST = [], this.REPORT_TINYID_WHITELIST = [], this._avgRTT.reset(), this._avgE2EDelay.reset(), this._rateMessageSent.reset(), this._rateMessageReceived.reset();} }]), n;}(rl),Fv = function () {function e(t) {bn(this, e);var n = new Fd(qd);this._className = "ModuleManager", this._isReady = !1, this._startLoginTs = 0, this._moduleMap = new Map(), this._innerEmitter = null, this._outerEmitter = null, this._checkCount = 0, this._checkTimer = -1, this._moduleMap.set(Hc, new Ym(this, t)), this._moduleMap.set(tl, new Lv(this)), this._moduleMap.set(ol, new Uv(this)), this._moduleMap.set(Zc, new Ev(this)), this._moduleMap.set(Qc, new Nv(this)), this._moduleMap.set(Gc, new zm(this)), this._moduleMap.set(Uc, new cv(this)), this._moduleMap.set(Fc, new $m(this)), this._moduleMap.set(qc, new em(this)), this._moduleMap.set(Bc, new Cm(this)), this._moduleMap.set(xc, new xm(this)), this._moduleMap.set(Kc, new Km(this)), this._moduleMap.set(jc, new Jm(this)), this._moduleMap.set($c, new Zm(this)), this._moduleMap.set(Yc, new nv(this)), this._moduleMap.set(zc, new rv(this)), this._moduleMap.set(Wc, new av(this)), this._moduleMap.set(Jc, new lv(this)), this._moduleMap.set(Xc, new pv(this)), this._moduleMap.set(el, new Ov(this)), this._moduleMap.set(nl, new Rv(this));var o = t.instanceID,r = t.oversea,a = t.SDKAppID,s = "instanceID:".concat(o, " oversea:").concat(r, " host:").concat(_u(), " ") + "inBrowser:".concat(ei, " inMiniApp:").concat(Zs, " SDKAppID:").concat(a, " UserAgent:").concat(oi);Fd.bindEventStatModule(this._moduleMap.get($c)), n.setMessage("".concat(s)).end(), Gi.info("SDK ".concat(s)), this._readyList = void 0, this._ssoLogForReady = null, this._initReadyList();}return Pn(e, [{ key: "_startTimer", value: function value() {this._checkTimer < 0 && (this._checkTimer = setInterval(this._onCheckTimer.bind(this), 1e3));} }, { key: "stopTimer", value: function value() {this._checkTimer > 0 && (clearInterval(this._checkTimer), this._checkTimer = -1, this._checkCount = 0);} }, { key: "_onCheckTimer", value: function value() {this._checkCount += 1;var e,t = no(this._moduleMap);try {for (t.s(); !(e = t.n()).done;) {var n = Wn(e.value, 2)[1];n.onCheckTimer && n.onCheckTimer(this._checkCount);}} catch (o) {t.e(o);} finally {t.f();}} }, { key: "_initReadyList", value: function value() {var e = this;this._readyList = [this._moduleMap.get(Gc), this._moduleMap.get(Bc)], this._readyList.forEach(function (t) {t.ready(function () {return e._onModuleReady();});});} }, { key: "_onModuleReady", value: function value() {var e = !0;if (this._readyList.forEach(function (t) {t.isReady() || (e = !1);}), e && !this._isReady) {this._isReady = !0, this._outerEmitter.emit(oo.SDK_READY);var t = Date.now() - this._startLoginTs;Gi.warn("SDK is ready. cost ".concat(t, " ms")), this._startLoginTs = Date.now();var n = this._moduleMap.get(Yc).getNetworkType(),o = this._ssoLogForReady.getStartTs() + Oi;this._ssoLogForReady.setNetworkType(n).setMessage(t).start(o).end();}} }, { key: "login", value: function value() {0 === this._startLoginTs && (Ri(), this._startLoginTs = Date.now(), this._startTimer(), this._moduleMap.get(Yc).start(), this._ssoLogForReady = new Fd(xd));} }, { key: "onLoginFailed", value: function value() {this._startLoginTs = 0;} }, { key: "getOuterEmitterInstance", value: function value() {return null === this._outerEmitter && (this._outerEmitter = new ov(), X_(this._outerEmitter), this._outerEmitter._emit = this._outerEmitter.emit, this._outerEmitter.emit = function (e, t) {var n = arguments[0],o = [n, { name: arguments[0], data: arguments[1] }];this._outerEmitter._emit.apply(this._outerEmitter, o);}.bind(this)), this._outerEmitter;} }, { key: "getInnerEmitterInstance", value: function value() {return null === this._innerEmitter && (this._innerEmitter = new ov(), this._innerEmitter._emit = this._innerEmitter.emit, this._innerEmitter.emit = function (e, t) {var n;Vi(arguments[1]) && arguments[1].data ? (Gi.warn("inner eventData has data property, please check!"), n = [e, { name: arguments[0], data: arguments[1].data }]) : n = [e, { name: arguments[0], data: arguments[1] }], this._innerEmitter._emit.apply(this._innerEmitter, n);}.bind(this)), this._innerEmitter;} }, { key: "hasModule", value: function value(e) {return this._moduleMap.has(e);} }, { key: "getModule", value: function value(e) {return this._moduleMap.get(e);} }, { key: "isReady", value: function value() {return this._isReady;} }, { key: "onError", value: function value(e) {Gi.warn("Oops! code:".concat(e.code, " message:").concat(e.message)), new Fd(ah).setMessage("code:".concat(e.code, " message:").concat(e.message)).setNetworkType(this.getModule(Yc).getNetworkType()).setLevel("error").end(), this.getOuterEmitterInstance().emit(oo.ERROR, e);} }, { key: "reset", value: function value() {Gi.log("".concat(this._className, ".reset")), Ri();var e,t = no(this._moduleMap);try {for (t.s(); !(e = t.n()).done;) {var n = Wn(e.value, 2)[1];n.reset && n.reset();}} catch (o) {t.e(o);} finally {t.f();}this._startLoginTs = 0, this._initReadyList(), this._isReady = !1, this.stopTimer(), this._outerEmitter.emit(oo.SDK_NOT_READY);} }]), e;}(),qv = function () {function e() {bn(this, e), this._funcMap = new Map();}return Pn(e, [{ key: "defense", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;if ("string" != typeof e) return null;if (0 === e.length) return null;if ("function" != typeof t) return null;if (this._funcMap.has(e) && this._funcMap.get(e).has(t)) return this._funcMap.get(e).get(t);this._funcMap.has(e) || this._funcMap.set(e, new Map());var o = null;return this._funcMap.get(e).has(t) ? o = this._funcMap.get(e).get(t) : (o = this._pack(e, t, n), this._funcMap.get(e).set(t, o)), o;} }, { key: "defenseOnce", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;return "function" != typeof t ? null : this._pack(e, t, n);} }, { key: "find", value: function value(e, t) {return "string" != typeof e || 0 === e.length || "function" != typeof t ? null : this._funcMap.has(e) ? this._funcMap.get(e).has(t) ? this._funcMap.get(e).get(t) : (Gi.log("SafetyCallback.find: 找不到 func —— ".concat(e, "/").concat("" !== t.name ? t.name : "[anonymous]")), null) : (Gi.log("SafetyCallback.find: 找不到 eventName-".concat(e, " 对应的 func")), null);} }, { key: "delete", value: function value(e, t) {return "function" == typeof t && !!this._funcMap.has(e) && !!this._funcMap.get(e).has(t) && (this._funcMap.get(e).delete(t), 0 === this._funcMap.get(e).size && this._funcMap.delete(e), !0);} }, { key: "_pack", value: function value(e, t, n) {return function () {try {t.apply(n, Array.from(arguments));} catch (s) {var o = Object.values(oo).indexOf(e);if (-1 !== o) {var r = Object.keys(oo)[o];Gi.warn("接入侧事件 TIM.EVENT.".concat(r, " 对应的回调函数逻辑存在问题，请检查！"), s);}var a = new Fd(nh);a.setMessage("eventName:".concat(e)).setMoreMessage(s.message).end();}};} }]), e;}(),xv = function () {function e(t) {bn(this, e);var n = { SDKAppID: t.SDKAppID, unlimitedAVChatRoom: t.unlimitedAVChatRoom || !1, scene: t.scene || "", oversea: t.oversea || !1, instanceID: fu() };this._moduleManager = new Fv(n), this._safetyCallbackFactory = new qv();}return Pn(e, [{ key: "isReady", value: function value() {return this._moduleManager.isReady();} }, { key: "onError", value: function value(e) {this._moduleManager.onError(e);} }, { key: "login", value: function value(e) {return this._moduleManager.login(), this._moduleManager.getModule(Gc).login(e);} }, { key: "logout", value: function value() {var e = this;return this._moduleManager.getModule(Gc).logout().then(function (t) {return e._moduleManager.reset(), t;});} }, { key: "destroy", value: function value() {var e = this;return this.logout().finally(function () {e._moduleManager.stopTimer(), e._moduleManager.getModule(Zc).dealloc();var t = e._moduleManager.getOuterEmitterInstance(),n = e._moduleManager.getModule(Hc);t.emit(oo.SDK_DESTROY, { SDKAppID: n.getSDKAppID() });});} }, { key: "on", value: function value(e, t, n) {e === oo.GROUP_SYSTEM_NOTICE_RECEIVED && Gi.warn("！！！TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED v2.6.0起弃用，为了更好的体验，请在 TIM.EVENT.MESSAGE_RECEIVED 事件回调内接收处理群系统通知，详细请参考：https://web.sdk.qcloud.com/im/doc/zh-cn/Message.html#.GroupSystemNoticePayload"), Gi.debug("on", "eventName:".concat(e)), this._moduleManager.getOuterEmitterInstance().on(e, this._safetyCallbackFactory.defense(e, t, n), n);} }, { key: "once", value: function value(e, t, n) {Gi.debug("once", "eventName:".concat(e)), this._moduleManager.getOuterEmitterInstance().once(e, this._safetyCallbackFactory.defenseOnce(e, t, n), n || this);} }, { key: "off", value: function value(e, t, n, o) {Gi.debug("off", "eventName:".concat(e));var r = this._safetyCallbackFactory.find(e, t);null !== r && (this._moduleManager.getOuterEmitterInstance().off(e, r, n, o), this._safetyCallbackFactory.delete(e, t));} }, { key: "registerPlugin", value: function value(e) {this._moduleManager.getModule(Jc).registerPlugin(e);} }, { key: "setLogLevel", value: function value(e) {if (e <= 0) {console.log(["", " ________  ______  __       __  __       __  ________  _______", "|        \\|      \\|  \\     /  \\|  \\  _  |  \\|        \\|       \\", " \\$$$$$$$$ \\$$$$$$| $$\\   /  $$| $$ / \\ | $$| $$$$$$$$| $$$$$$$\\", "   | $$     | $$  | $$$\\ /  $$$| $$/  $\\| $$| $$__    | $$__/ $$", "   | $$     | $$  | $$$$\\  $$$$| $$  $$$\\ $$| $$  \\   | $$    $$", "   | $$     | $$  | $$\\$$ $$ $$| $$ $$\\$$\\$$| $$$$$   | $$$$$$$\\", "   | $$    _| $$_ | $$ \\$$$| $$| $$$$  \\$$$$| $$_____ | $$__/ $$", "   | $$   |   $$ \\| $$  \\$ | $$| $$$    \\$$$| $$     \\| $$    $$", "    \\$$    \\$$$$$$ \\$$      \\$$ \\$$      \\$$ \\$$$$$$$$ \\$$$$$$$", "", ""].join("\n")), console.log("%cIM 智能客服，随时随地解决您的问题 →_→ https://cloud.tencent.com/act/event/smarty-service?from=im-doc", "color:#006eff"), console.log("%c从v2.11.2起，SDK 支持了 WebSocket，小程序需要添加受信域名！升级指引: https://web.sdk.qcloud.com/im/doc/zh-cn/tutorial-02-upgradeguideline.html", "color:#ff0000");console.log(["", "参考以下文档，会更快解决问题哦！(#^.^#)\n", "SDK 更新日志: https://cloud.tencent.com/document/product/269/38492\n", "SDK 接口文档: https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html\n", "常见问题: https://web.sdk.qcloud.com/im/doc/zh-cn/tutorial-01-faq.html\n", "反馈问题？戳我提 issue: https://github.com/tencentyun/TIMSDK/issues\n", "如果您需要在生产环境关闭上面的日志，请 tim.setLogLevel(1)\n"].join("\n"));}Gi.setLevel(e);} }, { key: "createTextMessage", value: function value(e) {return this._moduleManager.getModule(Uc).createTextMessage(e);} }, { key: "createTextAtMessage", value: function value(e) {return this._moduleManager.getModule(Uc).createTextMessage(e);} }, { key: "createImageMessage", value: function value(e) {return this._moduleManager.getModule(Uc).createImageMessage(e);} }, { key: "createAudioMessage", value: function value(e) {return this._moduleManager.getModule(Uc).createAudioMessage(e);} }, { key: "createVideoMessage", value: function value(e) {return this._moduleManager.getModule(Uc).createVideoMessage(e);} }, { key: "createCustomMessage", value: function value(e) {return this._moduleManager.getModule(Uc).createCustomMessage(e);} }, { key: "createFaceMessage", value: function value(e) {return this._moduleManager.getModule(Uc).createFaceMessage(e);} }, { key: "createFileMessage", value: function value(e) {return this._moduleManager.getModule(Uc).createFileMessage(e);} }, { key: "createMergerMessage", value: function value(e) {return this._moduleManager.getModule(Uc).createMergerMessage(e);} }, { key: "downloadMergerMessage", value: function value(e) {return e.type !== ro.MSG_MERGER ? Z_(new W_({ code: fp.MESSAGE_MERGER_TYPE_INVALID, message: Hp })) : Du(e.payload.downloadKey) ? Z_(new W_({ code: fp.MESSAGE_MERGER_KEY_INVALID, message: jp })) : this._moduleManager.getModule(Uc).downloadMergerMessage(e).catch(function (e) {return Z_(new W_({ code: fp.MESSAGE_MERGER_DOWNLOAD_FAIL, message: $p }));});} }, { key: "createForwardMessage", value: function value(e) {return this._moduleManager.getModule(Uc).createForwardMessage(e);} }, { key: "sendMessage", value: function value(e, t) {return e instanceof K_ ? this._moduleManager.getModule(Uc).sendMessageInstance(e, t) : Z_(new W_({ code: fp.MESSAGE_SEND_NEED_MESSAGE_INSTANCE, message: Cp }));} }, { key: "callExperimentalAPI", value: function value(e, t) {return "handleGroupInvitation" === e ? this._moduleManager.getModule(xc).handleGroupInvitation(t) : Z_(new W_({ code: fp.INVALID_OPERATION, message: yd }));} }, { key: "revokeMessage", value: function value(e) {return this._moduleManager.getModule(Uc).revokeMessage(e);} }, { key: "resendMessage", value: function value(e) {return this._moduleManager.getModule(Uc).resendMessage(e);} }, { key: "deleteMessage", value: function value(e) {return this._moduleManager.getModule(Uc).deleteMessage(e);} }, { key: "getMessageList", value: function value(e) {return this._moduleManager.getModule(Bc).getMessageList(e);} }, { key: "setMessageRead", value: function value(e) {return this._moduleManager.getModule(Bc).setMessageRead(e);} }, { key: "getConversationList", value: function value() {return this._moduleManager.getModule(Bc).getConversationList();} }, { key: "getConversationProfile", value: function value(e) {return this._moduleManager.getModule(Bc).getConversationProfile(e);} }, { key: "deleteConversation", value: function value(e) {return this._moduleManager.getModule(Bc).deleteConversation(e);} }, { key: "pinConversation", value: function value(e) {return this._moduleManager.getModule(Bc).pinConversation(e);} }, { key: "getMyProfile", value: function value() {return this._moduleManager.getModule(Fc).getMyProfile();} }, { key: "getUserProfile", value: function value(e) {return this._moduleManager.getModule(Fc).getUserProfile(e);} }, { key: "updateMyProfile", value: function value(e) {return this._moduleManager.getModule(Fc).updateMyProfile(e);} }, { key: "getBlacklist", value: function value() {return this._moduleManager.getModule(Fc).getLocalBlacklist();} }, { key: "addToBlacklist", value: function value(e) {return this._moduleManager.getModule(Fc).addBlacklist(e);} }, { key: "removeFromBlacklist", value: function value(e) {return this._moduleManager.getModule(Fc).deleteBlacklist(e);} }, { key: "getFriendList", value: function value() {var e = this._moduleManager.getModule(Vc);return e ? e.getLocalFriendList() : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "addFriend", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.addFriend(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "deleteFriend", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.deleteFriend(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "checkFriend", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.checkFriend(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "getFriendProfile", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.getFriendProfile(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "updateFriend", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.updateFriend(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "getFriendApplicationList", value: function value() {var e = this._moduleManager.getModule(Vc);return e ? e.getLocalFriendApplicationList() : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "acceptFriendApplication", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.acceptFriendApplication(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "refuseFriendApplication", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.refuseFriendApplication(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "deleteFriendApplication", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.deleteFriendApplication(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "setFriendApplicationRead", value: function value() {var e = this._moduleManager.getModule(Vc);return e ? e.setFriendApplicationRead() : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "getFriendGroupList", value: function value() {var e = this._moduleManager.getModule(Vc);return e ? e.getLocalFriendGroupList() : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "createFriendGroup", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.createFriendGroup(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "deleteFriendGroup", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.deleteFriendGroup(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "addToFriendGroup", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.addToFriendGroup(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "removeFromFriendGroup", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.removeFromFriendGroup(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "renameFriendGroup", value: function value(e) {var t = this._moduleManager.getModule(Vc);return t ? t.renameFriendGroup(e) : Z_({ code: fp.CANNOT_FIND_MODULE, message: Sd });} }, { key: "getGroupList", value: function value(e) {return this._moduleManager.getModule(xc).getGroupList(e);} }, { key: "getGroupProfile", value: function value(e) {return this._moduleManager.getModule(xc).getGroupProfile(e);} }, { key: "createGroup", value: function value(e) {return this._moduleManager.getModule(xc).createGroup(e);} }, { key: "dismissGroup", value: function value(e) {return this._moduleManager.getModule(xc).dismissGroup(e);} }, { key: "updateGroupProfile", value: function value(e) {return this._moduleManager.getModule(xc).updateGroupProfile(e);} }, { key: "joinGroup", value: function value(e) {return this._moduleManager.getModule(xc).joinGroup(e);} }, { key: "quitGroup", value: function value(e) {return this._moduleManager.getModule(xc).quitGroup(e);} }, { key: "searchGroupByID", value: function value(e) {return this._moduleManager.getModule(xc).searchGroupByID(e);} }, { key: "getGroupOnlineMemberCount", value: function value(e) {return this._moduleManager.getModule(xc).getGroupOnlineMemberCount(e);} }, { key: "changeGroupOwner", value: function value(e) {return this._moduleManager.getModule(xc).changeGroupOwner(e);} }, { key: "handleGroupApplication", value: function value(e) {return this._moduleManager.getModule(xc).handleGroupApplication(e);} }, { key: "initGroupAttributes", value: function value(e) {return this._moduleManager.getModule(xc).initGroupAttributes(e);} }, { key: "setGroupAttributes", value: function value(e) {return this._moduleManager.getModule(xc).setGroupAttributes(e);} }, { key: "deleteGroupAttributes", value: function value(e) {return this._moduleManager.getModule(xc).deleteGroupAttributes(e);} }, { key: "getGroupAttributes", value: function value(e) {return this._moduleManager.getModule(xc).getGroupAttributes(e);} }, { key: "getGroupMemberList", value: function value(e) {return this._moduleManager.getModule(Kc).getGroupMemberList(e);} }, { key: "getGroupMemberProfile", value: function value(e) {return this._moduleManager.getModule(Kc).getGroupMemberProfile(e);} }, { key: "addGroupMember", value: function value(e) {return this._moduleManager.getModule(Kc).addGroupMember(e);} }, { key: "deleteGroupMember", value: function value(e) {return this._moduleManager.getModule(Kc).deleteGroupMember(e);} }, { key: "setGroupMemberMuteTime", value: function value(e) {return this._moduleManager.getModule(Kc).setGroupMemberMuteTime(e);} }, { key: "setGroupMemberRole", value: function value(e) {return this._moduleManager.getModule(Kc).setGroupMemberRole(e);} }, { key: "setGroupMemberNameCard", value: function value(e) {return this._moduleManager.getModule(Kc).setGroupMemberNameCard(e);} }, { key: "setGroupMemberCustomField", value: function value(e) {return this._moduleManager.getModule(Kc).setGroupMemberCustomField(e);} }, { key: "setMessageRemindType", value: function value(e) {return this._moduleManager.getModule(Kc).setMessageRemindType(e);} }]), e;}(),Vv = { login: "login", logout: "logout", destroy: "destroy", on: "on", off: "off", ready: "ready", setLogLevel: "setLogLevel", joinGroup: "joinGroup", quitGroup: "quitGroup", registerPlugin: "registerPlugin", getGroupOnlineMemberCount: "getGroupOnlineMemberCount" };function Kv(e, t) {if (e.isReady() || void 0 !== Vv[t]) return !0;var n = new W_({ code: fp.SDK_IS_NOT_READY, message: "".concat(t, " ").concat(Td, "，请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/module-EVENT.html#.SDK_READY") });return e.onError(n), !1;}var Bv = {},Hv = {};return Hv.create = function (e) {var t = 0;if (Fi(e.SDKAppID)) t = e.SDKAppID;else if (Gi.warn("TIM.create SDKAppID 的类型应该为 Number，请修改！"), t = parseInt(e.SDKAppID), isNaN(t)) return Gi.error("TIM.create failed. 解析 SDKAppID 失败，请检查传参！"), null;if (t && Bv[t]) return Bv[t];Gi.log("TIM.create");var n = new xv(Fn({}, e, { SDKAppID: t }));n.on(oo.SDK_DESTROY, function (e) {Bv[e.data.SDKAppID] = null, delete Bv[e.data.SDKAppID];});var o = function (e) {var t = Object.create(null);return Object.keys(Ac).forEach(function (n) {if (e[n]) {var o = Ac[n],r = new go();t[o] = function () {var t = Array.from(arguments);return r.use(function (t, o) {return Kv(e, n) ? o() : Z_(new W_({ code: fp.SDK_IS_NOT_READY, message: "".concat(n, " ").concat(Td, "。") }));}).use(function (e, t) {if (!0 === Eu(e, Cc[n], o)) return t();}).use(function (t, o) {return e[n].apply(e, t);}), r.run(t);};}}), t;}(n);return Bv[t] = o, Gi.log("TIM.create ok"), o;}, Hv.TYPES = ro, Hv.EVENT = oo, Hv.VERSION = "2.14.0", Gi.log("TIM.VERSION: ".concat(Hv.VERSION)), Hv;});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 14 */
/*!************************************************!*\
  !*** D:/appshuo/oneCode/Yima/commen/commen.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var commen = {};


commen.emojiList = [
[{
  "url": "100.gif",
  alt: "[微笑]" },
{
  "url": "101.gif",
  alt: "[伤心]" },
{
  "url": "102.gif",
  alt: "[美女]" },
{
  "url": "103.gif",
  alt: "[发呆]" },
{
  "url": "104.gif",
  alt: "[墨镜]" },
{
  "url": "105.gif",
  alt: "[哭]" },
{
  "url": "106.gif",
  alt: "[羞]" },
{
  "url": "107.gif",
  alt: "[哑]" },
{
  "url": "108.gif",
  alt: "[睡]" },
{
  "url": "109.gif",
  alt: "[哭]" },
{
  "url": "110.gif",
  alt: "[囧]" },
{
  "url": "111.gif",
  alt: "[怒]" },
{
  "url": "112.gif",
  alt: "[调皮]" },
{
  "url": "113.gif",
  alt: "[笑]" },
{
  "url": "114.gif",
  alt: "[惊讶]" },
{
  "url": "115.gif",
  alt: "[难过]" },
{
  "url": "116.gif",
  alt: "[酷]" },
{
  "url": "117.gif",
  alt: "[汗]" },
{
  "url": "118.gif",
  alt: "[抓狂]" },
{
  "url": "119.gif",
  alt: "[吐]" },
{
  "url": "120.gif",
  alt: "[笑]" },
{
  "url": "121.gif",
  alt: "[快乐]" },
{
  "url": "122.gif",
  alt: "[奇]" },
{
  "url": "123.gif",
  alt: "[傲]" }],

[{
  "url": "124.gif",
  alt: "[饿]" },
{
  "url": "125.gif",
  alt: "[累]" },
{
  "url": "126.gif",
  alt: "[吓]" },
{
  "url": "127.gif",
  alt: "[汗]" },
{
  "url": "128.gif",
  alt: "[高兴]" },
{
  "url": "129.gif",
  alt: "[闲]" },
{
  "url": "130.gif",
  alt: "[努力]" },
{
  "url": "131.gif",
  alt: "[骂]" },
{
  "url": "132.gif",
  alt: "[疑问]" },
{
  "url": "133.gif",
  alt: "[秘密]" },
{
  "url": "134.gif",
  alt: "[乱]" },
{
  "url": "135.gif",
  alt: "[疯]" },
{
  "url": "136.gif",
  alt: "[哀]" },
{
  "url": "137.gif",
  alt: "[鬼]" },
{
  "url": "138.gif",
  alt: "[打击]" },
{
  "url": "139.gif",
  alt: "[bye]" },
{
  "url": "140.gif",
  alt: "[汗]" },
{
  "url": "141.gif",
  alt: "[抠]" },
{
  "url": "142.gif",
  alt: "[鼓掌]" },
{
  "url": "143.gif",
  alt: "[糟糕]" },
{
  "url": "144.gif",
  alt: "[恶搞]" },
{
  "url": "145.gif",
  alt: "[什么]" },
{
  "url": "146.gif",
  alt: "[什么]" },
{
  "url": "147.gif",
  alt: "[累]" }],

[{
  "url": "148.gif",
  alt: "[看]" },
{
  "url": "149.gif",
  alt: "[难过]" },
{
  "url": "150.gif",
  alt: "[难过]" },
{
  "url": "151.gif",
  alt: "[坏]" },
{
  "url": "152.gif",
  alt: "[亲]" },
{
  "url": "153.gif",
  alt: "[吓]" },
{
  "url": "154.gif",
  alt: "[可怜]" },
{
  "url": "155.gif",
  alt: "[刀]" },
{
  "url": "156.gif",
  alt: "[水果]" },
{
  "url": "157.gif",
  alt: "[酒]" },
{
  "url": "158.gif",
  alt: "[篮球]" },
{
  "url": "159.gif",
  alt: "[乒乓]" },
{
  "url": "160.gif",
  alt: "[咖啡]" },
{
  "url": "161.gif",
  alt: "[美食]" },
{
  "url": "162.gif",
  alt: "[动物]" },
{
  "url": "163.gif",
  alt: "[鲜花]" },
{
  "url": "164.gif",
  alt: "[枯]" },
{
  "url": "165.gif",
  alt: "[唇]" },
{
  "url": "166.gif",
  alt: "[爱]" },
{
  "url": "167.gif",
  alt: "[分手]" },
{
  "url": "168.gif",
  alt: "[生日]" },
{
  "url": "169.gif",
  alt: "[电]" },
{
  "url": "170.gif",
  alt: "[炸弹]" },
{
  "url": "171.gif",
  alt: "[刀子]" }],

[{
  "url": "172.gif",
  alt: "[足球]" },
{
  "url": "173.gif",
  alt: "[瓢虫]" },
{
  "url": "174.gif",
  alt: "[翔]" },
{
  "url": "175.gif",
  alt: "[月亮]" },
{
  "url": "176.gif",
  alt: "[太阳]" },
{
  "url": "177.gif",
  alt: "[礼物]" },
{
  "url": "178.gif",
  alt: "[抱抱]" },
{
  "url": "179.gif",
  alt: "[拇指]" },
{
  "url": "180.gif",
  alt: "[贬低]" },
{
  "url": "181.gif",
  alt: "[握手]" },
{
  "url": "182.gif",
  alt: "[剪刀手]" },
{
  "url": "183.gif",
  alt: "[抱拳]" },
{
  "url": "184.gif",
  alt: "[勾引]" },
{
  "url": "185.gif",
  alt: "[拳头]" },
{
  "url": "186.gif",
  alt: "[小拇指]" },
{
  "url": "187.gif",
  alt: "[拇指八]" },
{
  "url": "188.gif",
  alt: "[食指]" },
{
  "url": "189.gif",
  alt: "[ok]" },
{
  "url": "190.gif",
  alt: "[情侣]" },
{
  "url": "191.gif",
  alt: "[爱心]" },
{
  "url": "192.gif",
  alt: "[蹦哒]" },
{
  "url": "193.gif",
  alt: "[颤抖]" },
{
  "url": "194.gif",
  alt: "[怄气]" },
{
  "url": "195.gif",
  alt: "[跳舞]" }],

[{
  "url": "196.gif",
  alt: "[发呆]" },
{
  "url": "197.gif",
  alt: "[背着]" },
{
  "url": "198.gif",
  alt: "[伸手]" },
{
  "url": "199.gif",
  alt: "[耍帅]" },
{
  "url": "200.png",
  alt: "[微笑]" },
{
  "url": "201.png",
  alt: "[生病]" },
{
  "url": "202.png",
  alt: "[哭泣]" },
{
  "url": "203.png",
  alt: "[吐舌]" },
{
  "url": "204.png",
  alt: "[迷糊]" },
{
  "url": "205.png",
  alt: "[瞪眼]" },
{
  "url": "206.png",
  alt: "[恐怖]" },
{
  "url": "207.png",
  alt: "[忧愁]" },
{
  "url": "208.png",
  alt: "[眨眉]" },
{
  "url": "209.png",
  alt: "[闭眼]" },
{
  "url": "210.png",
  alt: "[鄙视]" },
{
  "url": "211.png",
  alt: "[阴暗]" },
{
  "url": "212.png",
  alt: "[小鬼]" },
{
  "url": "213.png",
  alt: "[礼物]" },
{
  "url": "214.png",
  alt: "[拜佛]" },
{
  "url": "215.png",
  alt: "[力量]" },
{
  "url": "216.png",
  alt: "[金钱]" },
{
  "url": "217.png",
  alt: "[蛋糕]" },
{
  "url": "218.png",
  alt: "[彩带]" },
{
  "url": "219.png",
  alt: "[礼物]" }]];



/**@dateTimeFliter 转换格林日期时间格式为常用日期格式
                    * @time[必填] 						Date  		格林日期格式
                    * @part[可选,默认:0]				Number      选择返回日期时间部分  列:0:返回所有 1:只返回日期  2:只返回时间
                    * @dateComplete[可选,默认:true] 	Boolean 	日期位数不足是否添0补齐:true:补齐,false:不补齐
                    * @timeComplete[可选,默认:true] 	Boolean 	时间位数不足是否添0补齐:true:补齐,false:不补齐
                    * @dateConnector[可选,默认:-] 		String 		年月日连接符  例: - : /
                    * @timeConnector[可选,默认::] 		String 		时间连接符   例: - : /
                    * @hour12[可选,默认:false]          Boolean     是否返回12小时制时间   例: true:返回12小时制时间   false:返回24小时制时间
                    * @return   '2019-11-25 15:05:54'  String    返回示例
                    * **/
commen.dateTimeFliter = function (time)
{var part = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var dateComplete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;var timeComplete = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;var dateConnector = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '-';var timeConnector = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : ':';var hour12 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var dateStr = '';
  var timeStr = '';
  //转换日期
  if (dateComplete) {//添0补齐
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
  }
  dateStr = year + dateConnector + month + dateConnector + day;
  //转换时间
  //修改小时制
  if (hour12) {
    if (hour > 12) {
      hour = hour - 12;
      if (timeComplete) {
        if (hour < 10) {
          hour = '下午 ' + '0' + hour;
        } else {
          hour = '下午 ' + hour;
        }
      }
    } else {
      if (timeComplete) {
        if (hour < 10) {
          hour = '上午 ' + '0' + hour;
        } else {
          hour = '上午 ' + hour;
        }
      }
    }
  }
  //判断分钟与秒
  if (timeComplete) {//添0补齐
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (second < 10) {
      second = '0' + second;
    }
  }
  timeStr = hour + timeConnector + minute + timeConnector + second;
  //合成输出值
  if (part == 0) {
    return dateStr + ' ' + timeStr;
  } else if (part == 1) {
    return dateStr;
  } else if (part == 2) {
    return timeStr;
  }
  return '传参有误';
};var _default =



commen;exports.default = _default;

/***/ }),
/* 15 */
/*!********************************************************!*\
  !*** D:/appshuo/oneCode/Yima/static/js/store/store.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 16));


var _member = _interopRequireDefault(__webpack_require__(/*! ./modules/member.js */ 17));
var _location = _interopRequireDefault(__webpack_require__(/*! ./modules/location.js */ 18));
var _template = _interopRequireDefault(__webpack_require__(/*! ./modules/template.js */ 19));
var _data = _interopRequireDefault(__webpack_require__(/*! ./modules/data.js */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}_vue.default.use(_vuex.default);
var modules = {
  member: _member.default,
  location: _location.default,
  template: _template.default,
  data: _data.default };


var store = new _vuex.default.Store({
  modules: modules });var _default =


store;exports.default = _default;

/***/ }),
/* 16 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 17 */
/*!*****************************************************************!*\
  !*** D:/appshuo/oneCode/Yima/static/js/store/modules/member.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  member: null, //数据不缓存
  mToken: uni.getStorageSync('member-token') ? uni.getStorageSync('member-token') : null,
  parentId: 0,
  adviserId: 0 //员工邀请用户注册的ID
};
var mutations = {
  setParentId: function setParentId(state, param) {
    state.parentId = param;
  },
  setAdviserId: function setAdviserId(state, param) {
    state.adviserId = param;
  },
  setMember: function setMember(state, param) {
    state.member = param;
    if (null === param) {
      uni.removeStorageSync('member-token');
      state.mToken = null;
    }
  },
  setToken: function setToken(state, param) {
    state.mToken = param;
    uni.setStorageSync('member-token', param);
  } };var _default =


{
  state: state,
  mutations: mutations };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 18 */
/*!*******************************************************************!*\
  !*** D:/appshuo/oneCode/Yima/static/js/store/modules/location.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  location: {
    lat: 31.863433,
    lng: 117.292364 },

  mendianSelectId: null,
  memdianLists: [] };

var mutations = {
  setLocation: function setLocation(state, param) {
    state.location = param;
  },
  setMendianSelectId: function setMendianSelectId(state, param) {
    state.mendianSelectId = param;
  },
  setMendianLists: function setMendianLists(state, param) {
    state.mendianLists = param;
  } };var _default =



{
  state: state,
  mutations: mutations };exports.default = _default;

/***/ }),
/* 19 */
/*!*******************************************************************!*\
  !*** D:/appshuo/oneCode/Yima/static/js/store/modules/template.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  tempColor: '#00C657',
  tempColorRbg: { r: 0, g: 198, b: 87 } };

var mutations = {
  setTemp: function setTemp(state, param) {
    state.tempColor = param;
  } };var _default =

{
  state: state,
  mutations: mutations };exports.default = _default;

/***/ }),
/* 20 */
/*!***************************************************************!*\
  !*** D:/appshuo/oneCode/Yima/static/js/store/modules/data.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  headerType: 0,
  recommendArr: [],
  cardData: {},
  cId: 0 };

var mutations = {
  updateRecommend: function updateRecommend(state, config) {
    var recommendArr = config.cdata;
    state.recommendArr = recommendArr;
    state.headerType = recommendArr[0].number;
    state.cardData = recommendArr[0];
    state.cId = config.clientId;
  } };var _default =

{
  state: state,
  mutations: mutations };exports.default = _default;

/***/ }),
/* 21 */
/*!***************************************************!*\
  !*** D:/appshuo/oneCode/Yima/static/js/config.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var dev = 'weixin';
var appId = 0;

var apiUrl =  true ? 'http://127.0.0.1:81/' : undefined;

var staticUrl = 'https://img.vipcard.cloud/';var _default =


{
  appId: appId,
  dev: dev,
  apiUrl: apiUrl,
  staticUrl: staticUrl };exports.default = _default;

/***/ }),
/* 22 */
/*!*********************************************************!*\
  !*** D:/appshuo/oneCode/Yima/static/js/mixin/common.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.common = void 0;var _statics = __webpack_require__(/*! ../statics.js */ 23);
var _vuex = __webpack_require__(/*! vuex */ 16);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var common = {
  data: function data() {
    return {
      statics: _statics.statics };

  },
  computed: _objectSpread(_objectSpread({},
  (0, _vuex.mapState)({
    tempColor: function tempColor(state) {return state.template.tempColor;},
    tempColorRgb: function tempColorRgb(state) {return state.template.tempColorRbg;},
    memberToken: function memberToken(state) {return state.member.mToken;},
    latLng: function latLng(state) {return state.location.location;},
    memberInfo: function memberInfo(state) {return state.member.member;},
    adviserId: function adviserId(state) {return state.member.adviserId;}, //推广的顾问员
    parentId: function parentId(state) {return state.member.parentId;}, //父推广员ID
    mendianSelectId: function mendianSelectId(state) {return state.location.mendianSelectId;}, //当前的门店ID
    memdianLists: function memdianLists(state) {return state.location.memdianLists;},
    headerType: function headerType(state) {return state.data.headerType;},
    recommendArr: function recommendArr(state) {return state.data.recommendArr;},
    cardData: function cardData(state) {return state.data.cardData;} })), {}, {

    checkLogin: function checkLogin() {//验证是否登录
      if (this.memberToken === null) return false;
      if (this.memberInfo == null) return false;
      if (!this.memberInfo.member_id) return false;
      return true;
    },
    getHeaderType: function getHeaderType() {
      return this.headerType;
    },
    getRecommendArr: function getRecommendArr() {
      return this.recommendArr;
    },
    getCardData: function getCardData() {
      return this.cardData;
    },
    getBtnStyle: function getBtnStyle() {
      var style = 'background:' + this.tempColor + ';color:#ffffff;';
      style += "box-shadow: 0px " + uni.upx2px(8) + "px " + uni.upx2px(32) + "px -" + uni.upx2px(8) + "px rgba(" + this.tempColorRgb.r + ", " + this.tempColorRgb.g + ", " + this.tempColorRgb.b + ", 0.3);";
      return style;
    },
    getBtnDisStyle: function getBtnDisStyle() {
      var style = 'background:#F0F1F5;color:#AEB2C1;';
      return style;
    },
    getTagStyle: function getTagStyle() {
      var style = "background:rgba(" + this.tempColorRgb.r + ", " + this.tempColorRgb.g + ", " + this.tempColorRgb.b + ", 0.08);";
      style += 'color:' + this.tempColor + ';';
      return style;
    },
    getBtnPlanStyle: function getBtnPlanStyle() {
      var style = 'border: 1px solid ' + this.tempColor + ';';
      style += 'color:' + this.tempColor + ';';
      return style;
    } }),

  methods: {} };exports.common = common;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 23 */
/*!****************************************************!*\
  !*** D:/appshuo/oneCode/Yima/static/js/statics.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.statics = void 0;var _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var statics = {
  defaultFace: _config.default.staticUrl + 'vipcard_img_head_default@2x.png',
  vipbg: _config.default.staticUrl + 'vipcard_bg_vip02@2x.png',
  vipBgHas: _config.default.staticUrl + 'vipcard_bg_vip01@2x.png',
  rightIcon: _config.default.staticUrl + 'vipcard_icon_arrowr_black@2x.png',
  vipLevelImg: [
  _config.default.staticUrl + 'vipcard_icon_v1@2x.png',
  _config.default.staticUrl + 'vipcard_icon_v2@2x.png',
  _config.default.staticUrl + 'vipcard_icon_v3@2x.png',
  _config.default.staticUrl + 'vipcard_icon_v4@2x.png',
  _config.default.staticUrl + 'vipcard_icon_v5@2x.png'],

  gridLeft: _config.default.staticUrl + 'vipcard_home_entrance_left@2x.png',
  gridRight: _config.default.staticUrl + 'vipcard_home_entrance_right@2x.png',

  copyright: _config.default.staticUrl + 'vipcard_icon_copyright@2x.png',

  birthdayPic: _config.default.staticUrl + 'vipcard_img_birthday_gifts@2x.png',
  birthdayGift: _config.default.staticUrl + 'vipcard_icon_cake@2x.png',

  couponHeader: _config.default.staticUrl + 'vipcard_bg_coupon@2x.png',
  couponVipHeader: _config.default.staticUrl + 'vipcard_bg_coupon_title@2x.png',
  couponNumBg: _config.default.staticUrl + 'vipcard_box_coupon@2x.png',
  couponTitleL: _config.default.staticUrl + 'vipcard_icon_titlel@2x.png',
  couponTitleR: _config.default.staticUrl + 'vipcard_icon_titler@2x.png',

  emptyImg: _config.default.staticUrl + 'vipcard_icon_none_data@1x.png',

  vipcardDetailHeaderBg: _config.default.staticUrl + 'vipcard_bg_vipgrade@2x.png',

  vipcardBg: [
  _config.default.staticUrl + 'vipcard_bg_vipgrade01@2x.png',
  _config.default.staticUrl + 'vipcard_bg_vipgrade02@2x.png',
  _config.default.staticUrl + 'vipcard_bg_vipgrade03@2x.png',
  _config.default.staticUrl + 'vipcard_bg_vipgrade04@2x.png',
  _config.default.staticUrl + 'vipcard_bg_vipgrade05@2x.png'],

  vipTq: [
  _config.default.staticUrl + 'vipcard_icon_right01@2x.png',
  _config.default.staticUrl + 'vipcard_icon_right02@2x.png',
  _config.default.staticUrl + 'vipcard_icon_right03@2x.png',
  _config.default.staticUrl + 'vipcard_icon_right04@2x.png'],


  integralImg01: _config.default.staticUrl + 'vipcard_icon_condition01@2x.png',
  moneyImg01: _config.default.staticUrl + 'vipcard_icon_condition02@2x.png',

  cardHeader: _config.default.staticUrl + 'vipcard_img_cika@2x.png',
  cardMineFace: _config.default.staticUrl + 'vipcard_img_cicard01@2x.png',
  cardBg: [
  _config.default.staticUrl + 'vipcard_bg_cika01@2x.png',
  _config.default.staticUrl + 'vipcard_bg_cika02@2x.png'],


  moneyRecharge: _config.default.staticUrl + 'vipcard_bg_balance@2x.png',

  couponAlert: [
  _config.default.staticUrl + 'vipcard_icon_success@2x.png',
  _config.default.staticUrl + 'vipcard_pop_icon_coupon@2x.png',
  _config.default.staticUrl + 'vipcard_pop_bg_coupon@2x.png'],


  statusImg: [
  _config.default.staticUrl + 'vipcard_icon_expired@2x.png',
  _config.default.staticUrl + 'vipcard_icon_used@2x.png',
  _config.default.staticUrl + 'vipcard_icon_over@2x.png',
  _config.default.staticUrl + 'vipcard_icon_present_ing@2x.png',
  _config.default.staticUrl + 'vipcard_icon_present_yes@2x.png'],


  integralLogHeader: _config.default.staticUrl + 'vipcard_bg_integral@2x.png',
  integralMallHeader: _config.default.staticUrl + 'vipcard_bg_integralmal@2x.png',
  integralRoleHeader: _config.default.staticUrl + 'vipcard_bg_zhuanintergral@2x.png',
  integralMallMenus: [
  _config.default.staticUrl + 'vipcard_icon_integralmall01@2x.png',
  _config.default.staticUrl + 'vipcard_icon_integralmall02@2x.png'],

  integralMallCat: [
  _config.default.staticUrl + 'vipcard_icon_exchange01@2x.png',
  _config.default.staticUrl + 'vipcard_icon_exchange02@2x.png',
  _config.default.staticUrl + 'vipcard_icon_exchange03@2x.png'],

  integralRoleImg: [
  _config.default.staticUrl + 'vipcard_icon_earn01@2x.png',
  _config.default.staticUrl + 'vipcard_icon_earn02@2x.png',
  _config.default.staticUrl + 'vipcard_icon_earn03@2x.png',
  _config.default.staticUrl + 'vipcard_icon_earn04@2x.png',
  _config.default.staticUrl + 'vipcard_icon_earn05@2x.png',
  _config.default.staticUrl + 'vipcard_icon_earn06@2x.png'],

  orderType: [
  _config.default.staticUrl + 'vipcard_icon_order_cate01@2x.png',
  _config.default.staticUrl + 'vipcard_icon_order_cate02@2x.png',
  _config.default.staticUrl + 'vipcard_icon_order_cate03@2x.png'],

  achImg: [
  _config.default.staticUrl + 'vipcard_store_icon_failed@2x.png',
  _config.default.staticUrl + 'vipcard_store_icon_success@2x.png'],

  rankImg: [
  _config.default.staticUrl + 'vipcard_store_icon_rank01@2x.png',
  _config.default.staticUrl + 'vipcard_store_icon_rank02@2x.png',
  _config.default.staticUrl + 'vipcard_store_icon_rank03@2x.png'],


  weixinImg: _config.default.staticUrl + 'vipcard_store_icon_wechat@2x.png',
  telImg: _config.default.staticUrl + 'vipcard_store_icon_call@2x.png',

  memberDetailImg: [
  _config.default.staticUrl + 'vipcard_store_icon_cika@2x.png',
  _config.default.staticUrl + 'vipcard_store_icon_coupon@2x.png',
  _config.default.staticUrl + 'vipcard_store_icon_income@2x.png',
  _config.default.staticUrl + 'vipcard_store_icon_integral@2x.png',
  _config.default.staticUrl + 'vipcard_store_icon_taocan@2x.png',
  _config.default.staticUrl + 'vipcard_store_icon_ziti@2x.png',
  _config.default.staticUrl + 'vipcard_store_icon_chongzhi@2x.png',
  _config.default.staticUrl + 'vipcard_store_icon_kaika@2x.png',
  _config.default.staticUrl + 'vipcard_store_icon_banka@2x.png'],

  openCardImg: _config.default.staticUrl + 'vipcard_store_icon_banka@2x.png',
  staffShare: [
  _config.default.staticUrl + 'vip_store_icon_share_taocan@2x.png',
  _config.default.staticUrl + 'vip_store_icon_share_coupon@2x.png'] };exports.statics = statics;

/***/ }),
/* 24 */
/*!****************************************************************************!*\
  !*** D:/appshuo/oneCode/Yima/node_modules/vue-clipboard2/vue-clipboard.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Clipboard = __webpack_require__(/*! clipboard/dist/clipboard.min.js */ 25); // FIXME: workaround for browserify

var VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true // This fixes IE, see #50
};

var VueClipboard = {
  install: function install(Vue) {
    var globalPrototype = Vue.version.slice(0, 2) === '3.' ? Vue.config.globalProperties : Vue.prototype;
    globalPrototype.$clipboardConfig = VueClipboardConfig;
    globalPrototype.$copyText = function (_text, container) {
      return new Promise(function (resolve, reject) {
        var fakeElement = document.createElement('button');
        var clipboard = new Clipboard(fakeElement, {
          text: function text() {return _text;},
          action: function action() {return 'copy';},
          container: typeof container === 'object' ? container : document.body });

        clipboard.on('success', function (e) {
          clipboard.destroy();
          resolve(e);
        });
        clipboard.on('error', function (e) {
          clipboard.destroy();
          reject(e);
        });
        if (VueClipboardConfig.appendToBody) document.body.appendChild(fakeElement);
        fakeElement.click();
        if (VueClipboardConfig.appendToBody) document.body.removeChild(fakeElement);
      });
    };

    Vue.directive('clipboard', {
      bind: function bind(el, binding, vnode) {
        if (binding.arg === 'success') {
          el._vClipboard_success = binding.value;
        } else if (binding.arg === 'error') {
          el._vClipboard_error = binding.value;
        } else {
          var clipboard = new Clipboard(el, {
            text: function text() {return binding.value;},
            action: function action() {return binding.arg === 'cut' ? 'cut' : 'copy';},
            container: VueClipboardConfig.autoSetContainer ? el : undefined });

          clipboard.on('success', function (e) {
            var callback = el._vClipboard_success;
            callback && callback(e);
          });
          clipboard.on('error', function (e) {
            var callback = el._vClipboard_error;
            callback && callback(e);
          });
          el._vClipboard = clipboard;
        }
      },
      update: function update(el, binding) {
        if (binding.arg === 'success') {
          el._vClipboard_success = binding.value;
        } else if (binding.arg === 'error') {
          el._vClipboard_error = binding.value;
        } else {
          el._vClipboard.text = function () {return binding.value;};
          el._vClipboard.action = function () {return binding.arg === 'cut' ? 'cut' : 'copy';};
        }
      },
      unbind: function unbind(el, binding) {
        // FIXME: investigate why $element._vClipboard was missing
        if (!el._vClipboard) return;
        if (binding.arg === 'success') {
          delete el._vClipboard_success;
        } else if (binding.arg === 'error') {
          delete el._vClipboard_error;
        } else {
          el._vClipboard.destroy();
          delete el._vClipboard;
        }
      } });

  },
  config: VueClipboardConfig };


if (true) {
  module.exports = VueClipboard;
} else {}

/***/ }),
/* 25 */
/*!****************************************************************************!*\
  !*** D:/appshuo/oneCode/Yima/node_modules/clipboard/dist/clipboard.min.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * clipboard.js v2.0.8
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
!function (t, e) { true ? module.exports = e() : undefined;}(this, function () {return n = { 134: function _(t, e, n) {"use strict";n.d(e, { default: function _default() {return r;} });var e = n(279),i = n.n(e),e = n(370),a = n.n(e),e = n(817),o = n.n(e);function c(t) {return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;})(t);}function u(t, e) {for (var n = 0; n < e.length; n++) {var r = e[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);}}var l = function () {function e(t) {!function (t) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}(this), this.resolveOptions(t), this.initSelection();}var t, n, r;return t = e, (n = [{ key: "resolveOptions", value: function value() {var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = "";} }, { key: "initSelection", value: function value() {this.text ? this.selectFake() : this.target && this.selectTarget();} }, { key: "createFakeElement", value: function value() {var t = "rtl" === document.documentElement.getAttribute("dir");this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[t ? "right" : "left"] = "-9999px";t = window.pageYOffset || document.documentElement.scrollTop;return this.fakeElem.style.top = "".concat(t, "px"), this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.fakeElem;} }, { key: "selectFake", value: function value() {var t = this,e = this.createFakeElement();this.fakeHandlerCallback = function () {return t.removeFake();}, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.container.appendChild(e), this.selectedText = o()(e), this.copyText(), this.removeFake();} }, { key: "removeFake", value: function value() {this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null);} }, { key: "selectTarget", value: function value() {this.selectedText = o()(this.target), this.copyText();} }, { key: "copyText", value: function value() {var e;try {e = document.execCommand(this.action);} catch (t) {e = !1;}this.handleResult(e);} }, { key: "handleResult", value: function value(t) {this.emitter.emit(t ? "success" : "error", { action: this.action, text: this.selectedText, trigger: this.trigger, clearSelection: this.clearSelection.bind(this) });} }, { key: "clearSelection", value: function value() {this.trigger && this.trigger.focus(), document.activeElement.blur(), window.getSelection().removeAllRanges();} }, { key: "destroy", value: function value() {this.removeFake();} }, { key: "action", set: function set() {var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "copy";if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"');}, get: function get() {return this._action;} }, { key: "target", set: function set(t) {if (void 0 !== t) {if (!t || "object" !== c(t) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target = t;}}, get: function get() {return this._target;} }]) && u(t.prototype, n), r && u(t, r), e;}();function s(t) {return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;})(t);}function f(t, e) {for (var n = 0; n < e.length; n++) {var r = e[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);}}function h(t, e) {return (h = Object.setPrototypeOf || function (t, e) {return t.__proto__ = e, t;})(t, e);}function d(n) {var r = function () {if ("undefined" == typeof Reflect || !Reflect.construct) return !1;if (Reflect.construct.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;} catch (t) {return !1;}}();return function () {var t,e = p(n);return t = r ? (t = p(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), e = this, !(t = t) || "object" !== s(t) && "function" != typeof t ? function (t) {if (void 0 !== t) return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}(e) : t;};}function p(t) {return (p = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {return t.__proto__ || Object.getPrototypeOf(t);})(t);}function y(t, e) {t = "data-clipboard-".concat(t);if (e.hasAttribute(t)) return e.getAttribute(t);}var r = function () {!function (t, e) {if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), e && h(t, e);}(o, i());var t,e,n,r = d(o);function o(t, e) {var n;return function (t) {if (!(t instanceof o)) throw new TypeError("Cannot call a class as a function");}(this), (n = r.call(this)).resolveOptions(e), n.listenClick(t), n;}return t = o, n = [{ key: "isSupported", value: function value() {var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],t = "string" == typeof t ? [t] : t,e = !!document.queryCommandSupported;return t.forEach(function (t) {e = e && !!document.queryCommandSupported(t);}), e;} }], (e = [{ key: "resolveOptions", value: function value() {var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText, this.container = "object" === s(t.container) ? t.container : document.body;} }, { key: "listenClick", value: function value(t) {var e = this;this.listener = a()(t, "click", function (t) {return e.onClick(t);});} }, { key: "onClick", value: function value(t) {t = t.delegateTarget || t.currentTarget;this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l({ action: this.action(t), target: this.target(t), text: this.text(t), container: this.container, trigger: t, emitter: this });} }, { key: "defaultAction", value: function value(t) {return y("action", t);} }, { key: "defaultTarget", value: function value(t) {t = y("target", t);if (t) return document.querySelector(t);} }, { key: "defaultText", value: function value(t) {return y("text", t);} }, { key: "destroy", value: function value() {this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null);} }]) && f(t.prototype, e), n && f(t, n), o;}();}, 828: function _(t) {var e;"undefined" == typeof Element || Element.prototype.matches || ((e = Element.prototype).matches = e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector), t.exports = function (t, e) {for (; t && 9 !== t.nodeType;) {if ("function" == typeof t.matches && t.matches(e)) return t;t = t.parentNode;}};}, 438: function _(t, e, n) {var a = n(828);function i(t, e, n, r, o) {var i = function (e, n, t, r) {return function (t) {t.delegateTarget = a(t.target, n), t.delegateTarget && r.call(e, t);};}.apply(this, arguments);return t.addEventListener(n, i, o), { destroy: function destroy() {t.removeEventListener(n, i, o);} };}t.exports = function (t, e, n, r, o) {return "function" == typeof t.addEventListener ? i.apply(null, arguments) : "function" == typeof n ? i.bind(null, document).apply(null, arguments) : ("string" == typeof t && (t = document.querySelectorAll(t)), Array.prototype.map.call(t, function (t) {return i(t, e, n, r, o);}));};}, 879: function _(t, n) {n.node = function (t) {return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType;}, n.nodeList = function (t) {var e = Object.prototype.toString.call(t);return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]));}, n.string = function (t) {return "string" == typeof t || t instanceof String;}, n.fn = function (t) {return "[object Function]" === Object.prototype.toString.call(t);};}, 370: function _(t, e, n) {var l = n(879),s = n(438);t.exports = function (t, e, n) {if (!t && !e && !n) throw new Error("Missing required arguments");if (!l.string(e)) throw new TypeError("Second argument must be a String");if (!l.fn(n)) throw new TypeError("Third argument must be a Function");if (l.node(t)) return c = e, u = n, (a = t).addEventListener(c, u), { destroy: function destroy() {a.removeEventListener(c, u);} };if (l.nodeList(t)) return r = t, o = e, i = n, Array.prototype.forEach.call(r, function (t) {t.addEventListener(o, i);}), { destroy: function destroy() {Array.prototype.forEach.call(r, function (t) {t.removeEventListener(o, i);});} };if (l.string(t)) return t = t, e = e, n = n, s(document.body, t, e, n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var r, o, i, a, c, u;};}, 817: function _(t) {t.exports = function (t) {var e,n = "SELECT" === t.nodeName ? (t.focus(), t.value) : "INPUT" === t.nodeName || "TEXTAREA" === t.nodeName ? ((e = t.hasAttribute("readonly")) || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), e || t.removeAttribute("readonly"), t.value) : (t.hasAttribute("contenteditable") && t.focus(), n = window.getSelection(), (e = document.createRange()).selectNodeContents(t), n.removeAllRanges(), n.addRange(e), n.toString());return n;};}, 279: function _(t) {function e() {}e.prototype = { on: function on(t, e, n) {var r = this.e || (this.e = {});return (r[t] || (r[t] = [])).push({ fn: e, ctx: n }), this;}, once: function once(t, e, n) {var r = this;function o() {r.off(t, o), e.apply(n, arguments);}return o._ = e, this.on(t, o, n);}, emit: function emit(t) {for (var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), r = 0, o = n.length; r < o; r++) {n[r].fn.apply(n[r].ctx, e);}return this;}, off: function off(t, e) {var n = this.e || (this.e = {}),r = n[t],o = [];if (r && e) for (var i = 0, a = r.length; i < a; i++) {r[i].fn !== e && r[i].fn._ !== e && o.push(r[i]);}return o.length ? n[t] = o : delete n[t], this;} }, t.exports = e, t.exports.TinyEmitter = e;} }, o = {}, r.n = function (t) {var e = t && t.__esModule ? function () {return t.default;} : function () {return t;};return r.d(e, { a: e }), e;}, r.d = function (t, e) {for (var n in e) {r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: e[n] });}}, r.o = function (t, e) {return Object.prototype.hasOwnProperty.call(t, e);}, r(134).default;function r(t) {if (o[t]) return o[t].exports;var e = o[t] = { exports: {} };return n[t](e, e.exports, r), e.exports;}var n, o;});

/***/ }),
/* 26 */
/*!***********************************************!*\
  !*** D:/appshuo/oneCode/Yima/commen/music.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var bgm = uni.createInnerAudioContext();
bgm.src = 'http://img.hazer.top/music.mp3';
bgm.loop = true;

var music = {
  //mute 表示是否是静音，，默认不静音
  playBgm: function playBgm(_ref) {var _ref$mute = _ref.mute,mute = _ref$mute === void 0 ? false : _ref$mute;

    if (!bgm) return;
    if (mute) {
      bgm.pause();
    } else {
      console.log("aaa");
      bgm.play();
    }

    bgm.onPause(function () {
      console.log('暂停背景音乐');
    });
    bgm.onPlay(function () {
      console.log('开始播放音乐#######');
    });
    bgm.onError(function (res) {
      console.log(res);
    });
  } };

module.exports = music;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/*!****************************************************!*\
  !*** D:/appshuo/oneCode/Yima/commen/html-parse.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // Regular Expressions for parsing tags and attributes
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g; // Empty Elements - HTML 5

var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr'); // Block Elements - HTML 5
// fixed by xxx 将 ins 标签从块级名单中移除

var block = makeMap('a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'); // Inline Elements - HTML 5

var inline = makeMap('abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'); // Elements that you can, intentionally, leave open
// (and which close themselves)

var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr'); // Attributes that have their values filled in disabled="disabled"

var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected'); // Special Elements (can contain anything)

var special = makeMap('script,style');
function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var stack = [];
  var last = html;

  stack.last = function () {
    return this[this.length - 1];
  };

  while (html) {
    chars = true; // Make sure we're not in a script or style element

    if (!stack.last() || !special[stack.last()]) {
      // Comment
      if (html.indexOf('<!--') == 0) {
        index = html.indexOf('-->');

        if (index >= 0) {
          if (handler.comment) {
            handler.comment(html.substring(4, index));
          }

          html = html.substring(index + 3);
          chars = false;
        } // end tag

      } else if (html.indexOf('</') == 0) {
        match = html.match(endTag);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(endTag, parseEndTag);
          chars = false;
        } // start tag

      } else if (html.indexOf('<') == 0) {
        match = html.match(startTag);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(startTag, parseStartTag);
          chars = false;
        }
      }

      if (chars) {
        index = html.indexOf('<');
        var text = index < 0 ? html : html.substring(0, index);
        html = index < 0 ? '' : html.substring(index);

        if (handler.chars) {
          handler.chars(text);
        }
      }
    } else {
      html = html.replace(new RegExp('([\\s\\S]*?)<\/' + stack.last() + '[^>]*>'), function (all, text) {
        text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, '$1$2');

        if (handler.chars) {
          handler.chars(text);
        }

        return '';
      });
      parseEndTag('', stack.last());
    }

    if (html == last) {
      throw 'Parse Error: ' + html;
    }

    last = html;
  } // Clean up any remaining tags


  parseEndTag();

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag('', stack.last());
      }
    }

    if (closeSelf[tagName] && stack.last() == tagName) {
      parseEndTag('', tagName);
    }

    unary = empty[tagName] || !!unary;

    if (!unary) {
      stack.push(tagName);
    }

    if (handler.start) {
      var attrs = [];
      rest.replace(attr, function (match, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : '';
        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') // "
        });

      });

      if (handler.start) {
        handler.start(tagName, attrs, unary);
      }
    }
  }

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    if (!tagName) {
      var pos = 0;
    } // Find the closest opened tag of the same type
    else {
        for (var pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos] == tagName) {
            break;
          }
        }
      }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (handler.end) {
          handler.end(stack[i]);
        }
      } // Remove the open elements from the stack


      stack.length = pos;
    }
  }
}

function makeMap(str) {
  var obj = {};
  var items = str.split(',');

  for (var i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }

  return obj;
}

function removeDOCTYPE(html) {
  return html.replace(/<\?xml.*\?>\n/, '').replace(/<!doctype.*>\n/, '').replace(/<!DOCTYPE.*>\n/, '');
}

function parseAttrs(attrs) {
  return attrs.reduce(function (pre, attr) {
    var value = attr.value;
    var name = attr.name;

    if (pre[name]) {
      pre[name] = pre[name] + " " + value;
    } else {
      pre[name] = value;
    }

    return pre;
  }, {});
}

function parseHtml(html) {
  html = removeDOCTYPE(html);
  var stacks = [];
  var results = {
    node: 'root',
    children: [] };

  HTMLParser(html, {
    start: function start(tag, attrs, unary) {
      var node = {
        name: tag };


      if (attrs.length !== 0) {
        node.attrs = parseAttrs(attrs);
      }

      if (unary) {
        var parent = stacks[0] || results;

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      } else {
        stacks.unshift(node);
      }
    },
    end: function end(tag) {
      var node = stacks.shift();
      if (node.name !== tag) console.error('invalid state: mismatch end tag');

      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        var parent = stacks[0];

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      }
    },
    chars: function chars(text) {
      var node = {
        type: 'text',
        text: text };


      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        var parent = stacks[0];

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      }
    },
    comment: function comment(text) {
      var node = {
        node: 'comment',
        text: text };

      var parent = stacks[0];

      if (!parent.children) {
        parent.children = [];
      }

      parent.children.push(node);
    } });

  return results.children;
}var _default =

parseHtml;exports.default = _default;

/***/ }),
/* 34 */
/*!******************************************************!*\
  !*** D:/appshuo/oneCode/Yima/components/wx/share.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var wxj = __webpack_require__(/*! ./index.js */ 35); //这是wx js-sdk的js文件
//点击邀请投票分享到朋友圈
/*
*参数根据自己的业务需求
 url:是当前页面的路径，let url=location.href.split("#")[0];
*desc:分享描述
imgUrl:分享小图标的连接，这里的连接必须在js接口安全域名下可以访问的。否者小图标不生效
shareUserName与shareDesignName 进行拼接做tittle
*/
function myshare(desc, imgUrl, shareUserName, shareDesignName) {
  //分享功能
  uni.request({
    url: "http://yima.hazer.top/api/wx", //后端接口，返回微信签名串的接口,即上面的Controller
    method: 'GET',
    data: {
      'url': window.location.href },

    success: function success(res) {
      console.log(res.data);
      //转换为json对象
      var result = res.data;
      var param = window.location.href.split("#")[1];
      //设置分享的标题
      var title = "我是:" + shareUserName + ",我为***命名为：" + shareDesignName + ",请为我投票";
      var host = window.location.href.split("?")[0];
      console.log("========host======" + host);
      wxj.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.appid, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.noncestr, // 必填，生成签名的随机串
        signature: result.sgture, // 必填，签名
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
        /* 即将废弃	jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表 */ });

      wxj.ready(function () {
        //需在用户可能点击分享按钮前就先调用
        wxj.updateAppMessageShareData({

          title: title, // 分享标题
          desc: desc, // 分享描述
          // link: window.location.href,
          link: "http://yima.hazer.top/static/wxShare/redirect?host=" + encodeURIComponent(host) + "&param=" + encodeURIComponent(param), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: function success() {
            //alert("分享成功")
            // 设置成功
          },
          fail: function fail(res) {
            //alert("分享失败")
          },
          cancel: function cancel() {

            // 用户取消分享后执行的回调函数

          } });

        wxj.updateTimelineShareData({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: "http://yima.hazer.top/static/wxShare/redirect?host=" + encodeURIComponent(host) + "&param=" + encodeURIComponent(param), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          // link: window.location.href,
          imgUrl: imgUrl, // 分享图标
          success: function success(res) {

            console.log(res.data);

            // 设置成功
          },
          fail: function fail(res) {

            //alert("分享失败")
          },
          cancel: function cancel() {
            // 用户取消分享后执行的回调函数	 
          } });

      });
    } });

}var _default =

{
  myshare: myshare };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 35 */
/*!******************************************************!*\
  !*** D:/appshuo/oneCode/Yima/components/wx/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}!function (e, n) { true ? module.exports = n(e) : undefined;}(window, function (o, e) {function c(n, e, i) {o.WeixinJSBridge ? WeixinJSBridge.invoke(n, r(e), function (e) {a(n, e, i);}) : d(n, i);}function i(n, i, t) {o.WeixinJSBridge ? WeixinJSBridge.on(n, function (e) {t && t.trigger && t.trigger(e), a(n, e, i);}) : d(n, t || i);}function r(e) {return (e = e || {}).appId = M.appId, e.verifyAppId = M.appId, e.verifySignType = "sha1", e.verifyTimestamp = M.timestamp + "", e.verifyNonceStr = M.nonceStr, e.verifySignature = M.signature, e;}function n(e) {return { timeStamp: e.timestamp + "", nonceStr: e.nonceStr, package: e.package, paySign: e.paySign, signType: e.signType || "SHA1" };}function a(e, n, i) {"openEnterpriseChat" == e && (n.errCode = n.err_code), delete n.err_code, delete n.err_desc, delete n.err_detail;var t = n.errMsg;t || (t = n.err_msg, delete n.err_msg, t = function (e, n) {var i = e,t = f[i];t && (i = t);var o = "ok";if (n) {var r = n.indexOf(":");"confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail");}return n = i + ":" + o;}(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), delete i._complete), t = n.errMsg || "", M.debug && !i.isInnerInvoke && alert(JSON.stringify(n));var o = t.indexOf(":");switch (t.substring(o + 1)) {case "ok":i.success && i.success(n);break;case "cancel":i.cancel && i.cancel(n);break;default:i.fail && i.fail(n);}i.complete && i.complete(n);}function s(e) {if (e) {for (var n = 0, i = e.length; n < i; ++n) {var t = e[n],o = p[t];o && (e[n] = o);}return e;}}function d(e, n) {if (!(!M.debug || n && n.isInnerInvoke)) {var i = f[e];i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "");}}function l() {return new Date().getTime();}function u(e) {I && (o.WeixinJSBridge ? e() : t.addEventListener && t.addEventListener("WeixinJSBridgeReady", e, !1));}if (!o.jWeixin) {var _C;var p = { config: "preVerifyJSAPI", onMenuShareTimeline: "menu:share:timeline", onMenuShareAppMessage: "menu:share:appmessage", onMenuShareQQ: "menu:share:qq", onMenuShareWeibo: "menu:share:weiboApp", onMenuShareQZone: "menu:share:QZone", previewImage: "imagePreview", getLocation: "geoLocation", openProductSpecificView: "openProductViewWithPid", addCard: "batchAddCard", openCard: "batchViewCard", chooseWXPay: "getBrandWCPayRequest", openEnterpriseRedPacket: "getRecevieBizHongBaoRequest", startSearchBeacons: "startMonitoringBeacons", stopSearchBeacons: "stopMonitoringBeacons", onSearchBeacons: "onBeaconsInRange", consumeAndShareCard: "consumedShareCard", openAddress: "editAddress" },f = function () {var e = {};for (var n in p) {e[p[n]] = n;}return e;}(),t = o.document,m = t.title,g = navigator.userAgent.toLowerCase(),h = navigator.platform.toLowerCase(),v = !(!h.match("mac") && !h.match("win")),S = -1 != g.indexOf("wxdebugger"),I = -1 != g.indexOf("micromessenger"),y = -1 != g.indexOf("android"),_ = -1 != g.indexOf("iphone") || -1 != g.indexOf("ipad"),w = (O = g.match(/micromessenger\/(\d+\.\d+\.\d+)/) || g.match(/micromessenger\/(\d+\.\d+)/)) ? O[1] : "",k = { initStartTime: l(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0 },T = { version: 1, appId: "", initTime: 0, preVerifyTime: 0, networkType: "", isPreVerifyOk: 1, systemType: _ ? 1 : y ? 2 : -1, clientVersion: w, url: encodeURIComponent(location.href) },M = {},P = { _completes: [] },x = { state: 0, data: {} };u(function () {k.initEndTime = l();});var A = !1,V = [],C = (_C = { config: function config(e) {d("config", M = e);var t = !1 !== M.check;u(function () {if (t) c(p.config, { verifyJsApiList: s(M.jsApiList) }, function () {P._complete = function (e) {k.preVerifyEndTime = l(), x.state = 1, x.data = e;}, P.success = function (e) {T.isPreVerifyOk = 0;}, P.fail = function (e) {P._fail ? P._fail(e) : x.state = -1;};var t = P._completes;return t.push(function () {!function (e) {if (!(v || S || M.debug || w < "6.0.2" || T.systemType < 0)) {var i = new Image();T.appId = M.appId, T.initTime = k.initEndTime - k.initStartTime, T.preVerifyTime = k.preVerifyEndTime - k.preVerifyStartTime, C.getNetworkType({ isInnerInvoke: !0, success: function success(e) {T.networkType = e.networkType;var n = "https://open.weixin.qq.com/sdk/report?v=" + T.version + "&o=" + T.isPreVerifyOk + "&s=" + T.systemType + "&c=" + T.clientVersion + "&a=" + T.appId + "&n=" + T.networkType + "&i=" + T.initTime + "&p=" + T.preVerifyTime + "&u=" + T.url;i.src = n;} });}}();}), P.complete = function (e) {for (var n = 0, i = t.length; n < i; ++n) {t[n]();}P._completes = [];}, P;}()), k.preVerifyStartTime = l();else {x.state = 1;for (var e = P._completes, n = 0, i = e.length; n < i; ++n) {e[n]();}P._completes = [];}}), C.invoke || (C.invoke = function (e, n, i) {o.WeixinJSBridge && WeixinJSBridge.invoke(e, r(n), i);}, C.on = function (e, n) {o.WeixinJSBridge && WeixinJSBridge.on(e, n);});}, ready: function ready(e) {0 != x.state ? e() : (P._completes.push(e), !I && M.debug && e());}, error: function error(e) {w < "6.0.2" || (-1 == x.state ? e(x.data) : P._fail = e);}, checkJsApi: function checkJsApi(e) {c("checkJsApi", { jsApiList: s(e.jsApiList) }, (e._complete = function (e) {if (y) {var n = e.checkResult;n && (e.checkResult = JSON.parse(n));}e = function (e) {var n = e.checkResult;for (var i in n) {var t = f[i];t && (n[t] = n[i], delete n[i]);}return e;}(e);}, e));}, onMenuShareTimeline: function onMenuShareTimeline(e) {i(p.onMenuShareTimeline, { complete: function complete() {c("shareTimeline", { title: e.title || m, desc: e.title || m, img_url: e.imgUrl || "", link: e.link || location.href, type: e.type || "link", data_url: e.dataUrl || "" }, e);} }, e);}, onMenuShareAppMessage: function onMenuShareAppMessage(n) {i(p.onMenuShareAppMessage, { complete: function complete(e) {"favorite" === e.scene ? c("sendAppMessage", { title: n.title || m, desc: n.desc || "", link: n.link || location.href, img_url: n.imgUrl || "", type: n.type || "link", data_url: n.dataUrl || "" }) : c("sendAppMessage", { title: n.title || m, desc: n.desc || "", link: n.link || location.href, img_url: n.imgUrl || "", type: n.type || "link", data_url: n.dataUrl || "" }, n);} }, n);}, onMenuShareQQ: function onMenuShareQQ(e) {i(p.onMenuShareQQ, { complete: function complete() {c("shareQQ", { title: e.title || m, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, onMenuShareWeibo: function onMenuShareWeibo(e) {i(p.onMenuShareWeibo, { complete: function complete() {c("shareWeiboApp", { title: e.title || m, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, onMenuShareQZone: function onMenuShareQZone(e) {i(p.onMenuShareQZone, { complete: function complete() {c("shareQZone", { title: e.title || m, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, updateTimelineShareData: function updateTimelineShareData(e) {c("updateTimelineShareData", { title: e.title, link: e.link, imgUrl: e.imgUrl }, e);}, updateAppMessageShareData: function updateAppMessageShareData(e) {c("updateAppMessageShareData", { title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl }, e);}, startRecord: function startRecord(e) {c("startRecord", {}, e);}, stopRecord: function stopRecord(e) {c("stopRecord", {}, e);}, onVoiceRecordEnd: function onVoiceRecordEnd(e) {i("onVoiceRecordEnd", e);}, playVoice: function playVoice(e) {c("playVoice", { localId: e.localId }, e);}, pauseVoice: function pauseVoice(e) {c("pauseVoice", { localId: e.localId }, e);}, stopVoice: function stopVoice(e) {c("stopVoice", { localId: e.localId }, e);}, onVoicePlayEnd: function onVoicePlayEnd(e) {i("onVoicePlayEnd", e);}, uploadVoice: function uploadVoice(e) {c("uploadVoice", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, downloadVoice: function downloadVoice(e) {c("downloadVoice", { serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, translateVoice: function translateVoice(e) {c("translateVoice", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, chooseImage: function chooseImage(e) {c("chooseImage", { scene: "1|2", count: e.count || 9, sizeType: e.sizeType || ["original", "compressed"], sourceType: e.sourceType || ["album", "camera"] }, (e._complete = function (e) {if (y) {var n = e.localIds;try {n && (e.localIds = JSON.parse(n));} catch (e) {}}}, e));}, getLocation: function getLocation(e) {}, previewImage: function previewImage(e) {c(p.previewImage, { current: e.current, urls: e.urls }, e);}, uploadImage: function uploadImage(e) {c("uploadImage", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, downloadImage: function downloadImage(e) {c("downloadImage", { serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, getLocalImgData: function getLocalImgData(e) {!1 === A ? (A = !0, c("getLocalImgData", { localId: e.localId }, (e._complete = function (e) {if (A = !1, 0 < V.length) {var n = V.shift();wx.getLocalImgData(n);}}, e))) : V.push(e);}, getNetworkType: function getNetworkType(e) {c("getNetworkType", {}, (e._complete = function (e) {e = function (e) {var n = e.errMsg;e.errMsg = "getNetworkType:ok";var i = e.subtype;if (delete e.subtype, i) e.networkType = i;else {var t = n.indexOf(":"),o = n.substring(t + 1);switch (o) {case "wifi":case "edge":case "wwan":e.networkType = o;break;default:e.errMsg = "getNetworkType:fail";}}return e;}(e);}, e));}, openLocation: function openLocation(e) {c("openLocation", { latitude: e.latitude, longitude: e.longitude, name: e.name || "", address: e.address || "", scale: e.scale || 28, infoUrl: e.infoUrl || "" }, e);} }, _defineProperty(_C, "getLocation", function getLocation(e) {c(p.getLocation, { type: (e = e || {}).type || "wgs84" }, (e._complete = function (e) {delete e.type;}, e));}), _defineProperty(_C, "hideOptionMenu", function hideOptionMenu(e) {c("hideOptionMenu", {}, e);}), _defineProperty(_C, "showOptionMenu", function showOptionMenu(e) {c("showOptionMenu", {}, e);}), _defineProperty(_C, "closeWindow", function closeWindow(e) {c("closeWindow", {}, e = e || {});}), _defineProperty(_C, "hideMenuItems", function hideMenuItems(e) {c("hideMenuItems", { menuList: e.menuList }, e);}), _defineProperty(_C, "showMenuItems", function showMenuItems(e) {c("showMenuItems", { menuList: e.menuList }, e);}), _defineProperty(_C, "hideAllNonBaseMenuItem", function hideAllNonBaseMenuItem(e) {c("hideAllNonBaseMenuItem", {}, e);}), _defineProperty(_C, "showAllNonBaseMenuItem", function showAllNonBaseMenuItem(e) {c("showAllNonBaseMenuItem", {}, e);}), _defineProperty(_C, "scanQRCode", function scanQRCode(e) {c("scanQRCode", { needResult: (e = e || {}).needResult || 0, scanType: e.scanType || ["qrCode", "barCode"] }, (e._complete = function (e) {if (_) {var n = e.resultStr;if (n) {var i = JSON.parse(n);e.resultStr = i && i.scan_code && i.scan_code.scan_result;}}}, e));}), _defineProperty(_C, "openAddress", function openAddress(e) {c(p.openAddress, {}, (e._complete = function (e) {var n;(n = e).postalCode = n.addressPostalCode, delete n.addressPostalCode, n.provinceName = n.proviceFirstStageName, delete n.proviceFirstStageName, n.cityName = n.addressCitySecondStageName, delete n.addressCitySecondStageName, n.countryName = n.addressCountiesThirdStageName, delete n.addressCountiesThirdStageName, n.detailInfo = n.addressDetailInfo, delete n.addressDetailInfo, e = n;}, e));}), _defineProperty(_C, "openProductSpecificView", function openProductSpecificView(e) {c(p.openProductSpecificView, { pid: e.productId, view_type: e.viewType || 0, ext_info: e.extInfo }, e);}), _defineProperty(_C, "addCard", function addCard(e) {for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {var r = n[t],a = { card_id: r.cardId, card_ext: r.cardExt };i.push(a);}c(p.addCard, { card_list: i }, (e._complete = function (e) {var n = e.card_list;if (n) {for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {var o = n[i];o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ;}e.cardList = n, delete e.card_list;}}, e));}), _defineProperty(_C, "chooseCard", function chooseCard(e) {c("chooseCard", { app_id: M.appId, location_id: e.shopId || "", sign_type: e.signType || "SHA1", card_id: e.cardId || "", card_type: e.cardType || "", card_sign: e.cardSign, time_stamp: e.timestamp + "", nonce_str: e.nonceStr }, (e._complete = function (e) {e.cardList = e.choose_card_info, delete e.choose_card_info;}, e));}), _defineProperty(_C, "openCard", function openCard(e) {for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {var r = n[t],a = { card_id: r.cardId, code: r.code };i.push(a);}c(p.openCard, { card_list: i }, e);}), _defineProperty(_C, "consumeAndShareCard", function consumeAndShareCard(e) {c(p.consumeAndShareCard, { consumedCardId: e.cardId, consumedCode: e.code }, e);}), _defineProperty(_C, "chooseWXPay", function chooseWXPay(e) {c(p.chooseWXPay, n(e), e);}), _defineProperty(_C, "openEnterpriseRedPacket", function openEnterpriseRedPacket(e) {c(p.openEnterpriseRedPacket, n(e), e);}), _defineProperty(_C, "startSearchBeacons", function startSearchBeacons(e) {c(p.startSearchBeacons, { ticket: e.ticket }, e);}), _defineProperty(_C, "stopSearchBeacons", function stopSearchBeacons(e) {c(p.stopSearchBeacons, {}, e);}), _defineProperty(_C, "onSearchBeacons", function onSearchBeacons(e) {i(p.onSearchBeacons, e);}), _defineProperty(_C, "openEnterpriseChat", function openEnterpriseChat(e) {c("openEnterpriseChat", { useridlist: e.userIds, chatname: e.groupName }, e);}), _defineProperty(_C, "launchMiniProgram", function launchMiniProgram(e) {c("launchMiniProgram", { targetAppId: e.targetAppId, path: function (e) {if ("string" == typeof e && 0 < e.length) {var n = e.split("?")[0],i = e.split("?")[1];return n += ".html", void 0 !== i ? n + "?" + i : n;}}(e.path), envVersion: e.envVersion }, e);}), _defineProperty(_C, "miniProgram", { navigateBack: function navigateBack(e) {e = e || {}, u(function () {c("invokeMiniProgramAPI", { name: "navigateBack", arg: { delta: e.delta || 1 } }, e);});}, navigateTo: function navigateTo(e) {u(function () {c("invokeMiniProgramAPI", { name: "navigateTo", arg: { url: e.url } }, e);});}, redirectTo: function redirectTo(e) {u(function () {c("invokeMiniProgramAPI", { name: "redirectTo", arg: { url: e.url } }, e);});}, switchTab: function switchTab(e) {u(function () {c("invokeMiniProgramAPI", { name: "switchTab", arg: { url: e.url } }, e);});}, reLaunch: function reLaunch(e) {u(function () {c("invokeMiniProgramAPI", { name: "reLaunch", arg: { url: e.url } }, e);});}, postMessage: function postMessage(e) {u(function () {c("invokeMiniProgramAPI", { name: "postMessage", arg: e.data || {} }, e);});}, getEnv: function getEnv(e) {u(function () {e({ miniprogram: "miniprogram" === o.__wxjs_environment });});} }), _C),L = 1,B = {};return t.addEventListener("error", function (e) {if (!y) {var n = e.target,i = n.tagName,t = n.src;if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {e.preventDefault(), e.stopPropagation();var o = n["wx-id"];if (o || (o = L++, n["wx-id"] = o), B[o]) return;B[o] = !0, wx.ready(function () {wx.getLocalImgData({ localId: t, success: function success(e) {n.src = e.localData;} });});}}}, !0), t.addEventListener("load", function (e) {if (!y) {var n = e.target,i = n.tagName;if (n.src, "IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {var t = n["wx-id"];t && (B[t] = !1);}}}, !0), e && (o.wx = o.jWeixin = C), C;}var O;});

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 51);

/***/ }),
/* 51 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 52);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 52 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/*!***********************************************************!*\
  !*** D:/appshuo/oneCode/Yima/components/qrcode/qrcode.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var QRCode = {};
(function () {
  /**
               * 获取单个字符的utf8编码
               * unicode BMP平面约65535个字符
               * @param {num} code
               * return {array}
               */
  function unicodeFormat8(code) {
    // 1 byte
    var c0, c1, c2;
    if (code < 128) {
      return [code];
      // 2 bytes
    } else if (code < 2048) {
      c0 = 192 + (code >> 6);
      c1 = 128 + (code & 63);
      return [c0, c1];
      // 3 bytes
    } else {
      c0 = 224 + (code >> 12);
      c1 = 128 + (code >> 6 & 63);
      c2 = 128 + (code & 63);
      return [c0, c1, c2];
    }
  }
  /**
     * 获取字符串的utf8编码字节串
     * @param {string} string
     * @return {array}
     */
  function getUTF8Bytes(string) {
    var utf8codes = [];
    for (var i = 0; i < string.length; i++) {
      var code = string.charCodeAt(i);
      var utf8 = unicodeFormat8(code);
      for (var j = 0; j < utf8.length; j++) {
        utf8codes.push(utf8[j]);
      }
    }
    return utf8codes;
  }
  /**
     * 二维码算法实现
     * @param {string} data              要编码的信息字符串
     * @param {num} errorCorrectLevel 纠错等级
     */
  function QRCodeAlg(data, errorCorrectLevel) {
    this.typeNumber = -1; //版本
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null; //二维矩阵，存放最终结果
    this.moduleCount = 0; //矩阵大小
    this.dataCache = null; //数据缓存
    this.rsBlocks = null; //版本数据信息
    this.totalDataCount = -1; //可使用的数据量
    this.data = data;
    this.utf8bytes = getUTF8Bytes(data);
    this.make();
  }
  QRCodeAlg.prototype = {
    constructor: QRCodeAlg,
    /**
                             * 获取二维码矩阵大小
                             * @return {num} 矩阵大小
                             */
    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },
    /**
        * 编码
        */
    make: function make() {
      this.getRightType();
      this.dataCache = this.createData();
      this.createQrcode();
    },
    /**
        * 设置二位矩阵功能图形
        * @param  {bool} test 表示是否在寻找最好掩膜阶段
        * @param  {num} maskPattern 掩膜的版本
        */
    makeImpl: function makeImpl(maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (var row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(true, maskPattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(true);
      }
      this.mapData(this.dataCache, maskPattern);
    },
    /**
        * 设置二维码的位置探测图形
        * @param  {num} row 探测图形的中心横坐标
        * @param  {num} col 探测图形的中心纵坐标
        */
    setupPositionProbePattern: function setupPositionProbePattern(row, col) {
      for (var r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;
        for (var c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;
          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },
    /**
        * 创建二维码
        * @return {[type]} [description]
        */
    createQrcode: function createQrcode() {
      var minLostPoint = 0;
      var pattern = 0;
      var bestModules = null;
      for (var i = 0; i < 8; i++) {
        this.makeImpl(i);
        var lostPoint = QRUtil.getLostPoint(this);
        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
          bestModules = this.modules;
        }
      }
      this.modules = bestModules;
      this.setupTypeInfo(false, pattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(false);
      }
    },
    /**
        * 设置定位图形
        * @return {[type]} [description]
        */
    setupTimingPattern: function setupTimingPattern() {
      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
        if (this.modules[6][r] != null) {
          continue;
        }
        this.modules[6][r] = r % 2 == 0;
      }
    },
    /**
        * 设置矫正图形
        * @return {[type]} [description]
        */
    setupPositionAdjustPattern: function setupPositionAdjustPattern() {
      var pos = QRUtil.getPatternPosition(this.typeNumber);
      for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
          var row = pos[i];
          var col = pos[j];
          if (this.modules[row][col] != null) {
            continue;
          }
          for (var r = -2; r <= 2; r++) {
            for (var c = -2; c <= 2; c++) {
              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },
    /**
        * 设置版本信息（7以上版本才有）
        * @param  {bool} test 是否处于判断最佳掩膜阶段
        * @return {[type]}      [description]
        */
    setupTypeNumber: function setupTypeNumber(test) {
      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },
    /**
        * 设置格式信息（纠错等级和掩膜版本）
        * @param  {bool} test
        * @param  {num} maskPattern 掩膜版本
        * @return {}
        */
    setupTypeInfo: function setupTypeInfo(test, maskPattern) {
      var data = QRErrorCorrectLevel[this.errorCorrectLevel] << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);
      // vertical
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
        // horizontal
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }
      // fixed module
      this.modules[this.moduleCount - 8][8] = !test;
    },
    /**
        * 数据编码
        * @return {[type]} [description]
        */
    createData: function createData() {
      var buffer = new QRBitBuffer();
      var lengthBits = this.typeNumber > 9 ? 16 : 8;
      buffer.put(4, 4); //添加模式
      buffer.put(this.utf8bytes.length, lengthBits);
      for (var i = 0, l = this.utf8bytes.length; i < l; i++) {
        buffer.put(this.utf8bytes[i], 8);
      }
      if (buffer.length + 4 <= this.totalDataCount * 8) {
        buffer.put(0, 4);
      }
      // padding
      while (buffer.length % 8 != 0) {
        buffer.putBit(false);
      }
      // padding
      while (true) {
        if (buffer.length >= this.totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeAlg.PAD0, 8);
        if (buffer.length >= this.totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeAlg.PAD1, 8);
      }
      return this.createBytes(buffer);
    },
    /**
        * 纠错码编码
        * @param  {buffer} buffer 数据编码
        * @return {[type]}
        */
    createBytes: function createBytes(buffer) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var length = this.rsBlock.length / 3;
      var rsBlocks = new Array();
      for (var i = 0; i < length; i++) {
        var count = this.rsBlock[i * 3 + 0];
        var totalCount = this.rsBlock[i * 3 + 1];
        var dataCount = this.rsBlock[i * 3 + 2];
        for (var j = 0; j < count; j++) {
          rsBlocks.push([dataCount, totalCount]);
        }
      }
      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r][0];
        var ecCount = rsBlocks[r][1] - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i = 0; i < dcdata[r].length; i++) {
          dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        }
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i++) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }
      var data = new Array(this.totalDataCount);
      var index = 0;
      for (var i = 0; i < maxDcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < dcdata[r].length) {
            data[index++] = dcdata[r][i];
          }
        }
      }
      for (var i = 0; i < maxEcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < ecdata[r].length) {
            data[index++] = ecdata[r][i];
          }
        }
      }
      return data;

    },
    /**
        * 布置模块，构建最终信息
        * @param  {} data
        * @param  {} maskPattern
        * @return {}
        */
    mapData: function mapData(data, maskPattern) {
      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;
        while (true) {
          for (var c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              var dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }
              var mask = QRUtil.getMask(maskPattern, row, col - c);
              if (mask) {
                dark = !dark;
              }
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    } };

  /**
          * 填充字段
          */
  QRCodeAlg.PAD0 = 0xEC;
  QRCodeAlg.PAD1 = 0x11;
  //---------------------------------------------------------------------
  // 纠错等级对应的编码
  //---------------------------------------------------------------------
  var QRErrorCorrectLevel = [1, 0, 3, 2];
  //---------------------------------------------------------------------
  // 掩膜版本
  //---------------------------------------------------------------------
  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7 };

  //---------------------------------------------------------------------
  // 工具类
  //---------------------------------------------------------------------
  var QRUtil = {
    /*
                 每个版本矫正图形的位置
                  */
    PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]],

    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
    /*
                                                             BCH编码格式信息
                                                              */
    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },
    /*
       BCH编码版本信息
        */
    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },
    /*
       获取BCH位信息
        */
    getBCHDigit: function getBCHDigit(data) {
      var digit = 0;
      while (data != 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    },
    /*
       获取版本对应的矫正图形位置
        */
    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },
    /*
       掩膜算法
        */
    getMask: function getMask(maskPattern, i, j) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);}

    },
    /*
       获取RS的纠错多项式
        */
    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
      var a = new QRPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    },
    /*
       获取评价
        */
    getLostPoint: function getLostPoint(qrCode) {
      var moduleCount = qrCode.getModuleCount(),
      lostPoint = 0,
      darkCount = 0;
      for (var row = 0; row < moduleCount; row++) {
        var sameCount = 0;
        var head = qrCode.modules[row][0];
        for (var col = 0; col < moduleCount; col++) {
          var current = qrCode.modules[row][col];
          //level 3 评价
          if (col < moduleCount - 6) {
            if (current && !qrCode.modules[row][col + 1] && qrCode.modules[row][col + 2] && qrCode.modules[row][col + 3] && qrCode.modules[row][col + 4] && !qrCode.modules[row][col + 5] && qrCode.modules[row][col + 6]) {
              if (col < moduleCount - 10) {
                if (qrCode.modules[row][col + 7] && qrCode.modules[row][col + 8] && qrCode.modules[row][col + 9] && qrCode.modules[row][col + 10]) {
                  lostPoint += 40;
                }
              } else if (col > 3) {
                if (qrCode.modules[row][col - 1] && qrCode.modules[row][col - 2] && qrCode.modules[row][col - 3] && qrCode.modules[row][col - 4]) {
                  lostPoint += 40;
                }
              }
            }
          }
          //level 2 评价
          if (row < moduleCount - 1 && col < moduleCount - 1) {
            var count = 0;
            if (current) count++;
            if (qrCode.modules[row + 1][col]) count++;
            if (qrCode.modules[row][col + 1]) count++;
            if (qrCode.modules[row + 1][col + 1]) count++;
            if (count == 0 || count == 4) {
              lostPoint += 3;
            }
          }
          //level 1 评价
          if (head ^ current) {
            sameCount++;
          } else {
            head = current;
            if (sameCount >= 5) {
              lostPoint += 3 + sameCount - 5;
            }
            sameCount = 1;
          }
          //level 4 评价
          if (current) {
            darkCount++;
          }
        }
      }
      for (var col = 0; col < moduleCount; col++) {
        var sameCount = 0;
        var head = qrCode.modules[0][col];
        for (var row = 0; row < moduleCount; row++) {
          var current = qrCode.modules[row][col];
          //level 3 评价
          if (row < moduleCount - 6) {
            if (current && !qrCode.modules[row + 1][col] && qrCode.modules[row + 2][col] && qrCode.modules[row + 3][col] && qrCode.modules[row + 4][col] && !qrCode.modules[row + 5][col] && qrCode.modules[row + 6][col]) {
              if (row < moduleCount - 10) {
                if (qrCode.modules[row + 7][col] && qrCode.modules[row + 8][col] && qrCode.modules[row + 9][col] && qrCode.modules[row + 10][col]) {
                  lostPoint += 40;
                }
              } else if (row > 3) {
                if (qrCode.modules[row - 1][col] && qrCode.modules[row - 2][col] && qrCode.modules[row - 3][col] && qrCode.modules[row - 4][col]) {
                  lostPoint += 40;
                }
              }
            }
          }
          //level 1 评价
          if (head ^ current) {
            sameCount++;
          } else {
            head = current;
            if (sameCount >= 5) {
              lostPoint += 3 + sameCount - 5;
            }
            sameCount = 1;
          }
        }
      }
      // LEVEL4
      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    } };


  //---------------------------------------------------------------------
  // QRMath使用的数学工具
  //---------------------------------------------------------------------
  var QRMath = {
    /*
                 将n转化为a^m
                  */
    glog: function glog(n) {
      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }
      return QRMath.LOG_TABLE[n];
    },
    /*
       将a^m转化为n
        */
    gexp: function gexp(n) {
      while (n < 0) {
        n += 255;
      }
      while (n >= 256) {
        n -= 255;
      }
      return QRMath.EXP_TABLE[n];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256) };


  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }
  //---------------------------------------------------------------------
  // QRPolynomial 多项式
  //---------------------------------------------------------------------
  /**
   * 多项式类
   * @param {Array} num   系数
   * @param {num} shift a^shift
   */
  function QRPolynomial(num, shift) {
    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }
    var offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset++;
    }
    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }
  QRPolynomial.prototype = {
    get: function get(index) {
      return this.num[index];
    },
    getLength: function getLength() {
      return this.num.length;
    },
    /**
        * 多项式乘法
        * @param  {QRPolynomial} e 被乘多项式
        * @return {[type]}   [description]
        */
    multiply: function multiply(e) {
      var num = new Array(this.getLength() + e.getLength() - 1);
      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }
      return new QRPolynomial(num, 0);
    },
    /**
        * 多项式模运算
        * @param  {QRPolynomial} e 模多项式
        * @return {}
        */
    mod: function mod(e) {
      var tl = this.getLength(),
      el = e.getLength();
      if (tl - el < 0) {
        return this;
      }
      var num = new Array(tl);
      for (var i = 0; i < tl; i++) {
        num[i] = this.get(i);
      }
      while (num.length >= el) {
        var ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0));

        for (var i = 0; i < e.getLength(); i++) {
          num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        }
        while (num[0] == 0) {
          num.shift();
        }
      }
      return new QRPolynomial(num, 0);
    } };


  //---------------------------------------------------------------------
  // RS_BLOCK_TABLE
  //---------------------------------------------------------------------
  /*
  二维码各个版本信息[块数, 每块中的数据块数, 每块中的信息块数]
   */
  var RS_BLOCK_TABLE = [
  // L
  // M
  // Q
  // H
  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]];


  /**
                              * 根据数据获取对应版本
                              * @return {[type]} [description]
                              */
  QRCodeAlg.prototype.getRightType = function () {
    for (var typeNumber = 1; typeNumber < 41; typeNumber++) {
      var rsBlock = RS_BLOCK_TABLE[(typeNumber - 1) * 4 + this.errorCorrectLevel];
      if (rsBlock == undefined) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + this.errorCorrectLevel);
      }
      var length = rsBlock.length / 3;
      var totalDataCount = 0;
      for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0];
        var dataCount = rsBlock[i * 3 + 2];
        totalDataCount += dataCount * count;
      }
      var lengthBytes = typeNumber > 9 ? 2 : 1;
      if (this.utf8bytes.length + lengthBytes < totalDataCount || typeNumber == 40) {
        this.typeNumber = typeNumber;
        this.rsBlock = rsBlock;
        this.totalDataCount = totalDataCount;
        break;
      }
    }
  };

  //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------
  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }
  QRBitBuffer.prototype = {
    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return this.buffer[bufIndex] >>> 7 - index % 8 & 1;
    },
    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit(num >>> length - i - 1 & 1);
      }
    },
    putBit: function putBit(bit) {
      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }
      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }
      this.length++;
    } };




  // xzedit
  var qrcodeAlgObjCache = [];
  /**
                               * 二维码构造函数，主要用于绘制
                               * @param  {参数列表} opt 传递参数
                               * @return {}
                               */
  QRCode = function QRCode(opt) {
    //设置默认参数
    this.options = {
      text: '',
      size: 256,
      correctLevel: 3,
      background: '#ffffff',
      foreground: '#000000',
      pdground: '#000000',
      image: '',
      imageSize: 30,
      canvasId: opt.canvasId,
      context: opt.context,
      usingComponents: opt.usingComponents,
      showLoading: opt.showLoading,
      loadingText: opt.loadingText };

    if (typeof opt === 'string') {// 只编码ASCII字符串
      opt = {
        text: opt };

    }
    if (opt) {
      for (var i in opt) {
        this.options[i] = opt[i];
      }
    }
    //使用QRCodeAlg创建二维码结构
    var qrCodeAlg = null;
    for (var i = 0, l = qrcodeAlgObjCache.length; i < l; i++) {
      if (qrcodeAlgObjCache[i].text == this.options.text && qrcodeAlgObjCache[i].text.correctLevel == this.options.correctLevel) {
        qrCodeAlg = qrcodeAlgObjCache[i].obj;
        break;
      }
    }
    if (i == l) {
      qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel);
      qrcodeAlgObjCache.push({
        text: this.options.text,
        correctLevel: this.options.correctLevel,
        obj: qrCodeAlg });

    }
    /**
       * 计算矩阵点的前景色
       * @param {Obj} config
       * @param {Number} config.row 点x坐标
       * @param {Number} config.col 点y坐标
       * @param {Number} config.count 矩阵大小
       * @param {Number} config.options 组件的options
       * @return {String}
       */
    var getForeGround = function getForeGround(config) {
      var options = config.options;
      if (options.pdground && (
      config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5 ||
      config.row > config.count - 6 && config.row < config.count - 2 && config.col > 1 && config.col < 5 ||
      config.row > 1 && config.row < 5 && config.col > config.count - 6 && config.col < config.count - 2))
      {
        return options.pdground;
      }
      return options.foreground;
    };
    // 创建canvas
    var createCanvas = function createCanvas(options) {
      if (options.showLoading) {
        uni.showLoading({
          title: options.loadingText,
          mask: true });

      }
      var ctx = uni.createCanvasContext(options.canvasId, options.context);
      var count = qrCodeAlg.getModuleCount();
      var ratioSize = options.size;
      var ratioImgSize = options.imageSize;
      //计算每个点的长宽
      var tileW = (ratioSize / count).toPrecision(4);
      var tileH = (ratioSize / count).toPrecision(4);
      //绘制
      for (var row = 0; row < count; row++) {
        for (var col = 0; col < count; col++) {
          var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
          var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
          var foreground = getForeGround({
            row: row,
            col: col,
            count: count,
            options: options });

          ctx.setFillStyle(qrCodeAlg.modules[row][col] ? foreground : options.background);
          ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
        }
      }
      if (options.image) {




        // 画圆角矩形
        var drawRoundedRect = function drawRoundedRect(ctxi, x, y, width, height, r, lineWidth, fill, stroke) {
          ctxi.setLineWidth(lineWidth);
          ctxi.setFillStyle(options.background);
          ctxi.setStrokeStyle(options.background);
          ctxi.beginPath(); // draw top and top right corner 
          ctxi.moveTo(x + r, y);
          ctxi.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner 
          ctxi.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner 
          ctxi.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner 
          ctxi.arcTo(x, y, x + r, y, r);
          ctxi.closePath();
          if (fill) {
            ctxi.fill();
          }
          if (stroke) {
            ctxi.stroke();
          }
        };var x = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));var y = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));drawRoundedRect(ctx, x, y, ratioImgSize, ratioImgSize, 2, 6, true, true);ctx.drawImage(options.image, x, y, ratioImgSize, ratioImgSize);
      }
      setTimeout(function () {
        ctx.draw(true, function () {
          // 保存到临时区域
          setTimeout(function () {
            uni.canvasToTempFilePath({
              width: options.width,
              height: options.height,
              destWidth: options.width,
              destHeight: options.height,
              canvasId: options.canvasId,
              quality: Number(1),
              success: function success(res) {
                if (options.cbResult) {
                  options.cbResult(res.tempFilePath);
                }
              },
              fail: function fail(res) {
                if (options.cbResult) {
                  options.cbResult(res);
                }
              },
              complete: function complete() {
                if (options.showLoading) {
                  uni.hideLoading();
                }
              } },
            options.context);
          }, options.text.length + 100);
        });
      }, options.usingComponents ? 0 : 150);
    };
    createCanvas(this.options);
    // 空判定
    var empty = function empty(v) {
      var tp = typeof v,
      rt = false;
      if (tp == "number" && String(v) == "") {
        rt = true;
      } else if (tp == "undefined") {
        rt = true;
      } else if (tp == "object") {
        if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true;
      } else if (tp == "string") {
        if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true;
      } else if (tp == "function") {
        rt = false;
      }
      return rt;
    };
  };
  QRCode.prototype.clear = function (fn) {
    var ctx = uni.createCanvasContext(this.options.canvasId, this.options.context);
    ctx.clearRect(0, 0, this.options.size, this.options.size);
    ctx.draw(false, function () {
      if (fn) {
        fn();
      }
    });
  };
})();var _default =

QRCode;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map