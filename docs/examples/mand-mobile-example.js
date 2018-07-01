(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}

/**
 * Check if value is primitive
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' ||
  // $flow-disable-line
  (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol' || typeof value === 'boolean';
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

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
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop(a, b, c) {}

/**
 * Always return false.
 */
var no = function no(a, b, c) {
  return false;
};

/**
 * Return same value
 */
var identity = function identity(_) {
  return _;
};

/**
 * Generate a static keys string from compiler modules.
 */

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = ['component', 'directive', 'filter'];

var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured'];

/*  */

var config = {
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
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

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
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
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
var bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
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
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = {}.watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function isServerRendering() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    function Set() {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };
    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}

/*  */

var warn = noop;
/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
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
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function createEmptyVNode(text) {
  if (text === void 0) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned;
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // notify change
    ob.dep.notify();
    return result;
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
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
function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive(obj, key, val, customSetter, shallow) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */
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
function set(target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
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
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
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
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    return extend(res, childVal);
  } else {
    return res;
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
strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }
  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) {
    extend(ret, childVal);
  }
  return ret;
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options, vm) {
  var props = options.props;
  if (!props) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  } else {}
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options, vm) {
  var inject = options.inject;
  if (!inject) {
    return;
  }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
    }
  } else {}
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
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
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  return res;
}

/*  */

function validateProp(key, propOptions, propsData, vm) {
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
  return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }
  return -1;
}

/*  */

function handleError(err, vm, info) {
  if (vm) {
    var cur = vm;
    while (cur = cur.$parent) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) {
              return;
            }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function macroTimerFunc() {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) ||
// PhantomJS
MessageChannel.toString() === '[object MessageChannelConstructor]')) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function macroTimerFunc() {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function macroTimerFunc() {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function microTimerFunc() {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) {
      setTimeout(noop);
    }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask(fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res;
  });
}

function nextTick(cb, ctx) {
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
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
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
  };
});

function createFnInvoker(fns) {
  function invoker() {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, vm) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
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

function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }
  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
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
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i);
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
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
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}

/*  */

function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }
  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node;
}

function resolveAsyncComponent(factory, baseCtor, context) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function forceRender() {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}

/*  */

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

/*  */

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

/*  */

/*  */

function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break;
        }
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, "event handler for \"" + event + "\"");
        }
      }
    }
    return vm;
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
  var slots = {};
  if (!children) {
    return slots;
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}

function resolveScopedSlots(fns, // see flow/vnode
res) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res;
}

/*  */

var activeInstance = null;
function initLifecycle(vm) {
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

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */
      , vm.$options._parentElm, vm.$options._refElm);
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
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
      return;
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

function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  {
    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  var hasChildren = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  parentVnode.data.scopedSlots || // has new scoped slots
  vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
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

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
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

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + " hook");
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

var queue = [];
var activatedChildren = [];
var has = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
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
  queue.sort(function (a, b) {
    return a.id - b.id;
  });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    
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

function callUpdatedHooks(queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
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
function queueWatcher(watcher) {
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
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
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
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      
    }
  }
  this.value = this.lazy ? undefined : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
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
  return value;
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep(dep) {
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
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
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
Watcher.prototype.update = function update() {
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
Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
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
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown() {
  var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
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

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
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
  var loop = function loop(key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) {
    loop(key);
  }toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (props && hasOwn(props, key)) {
      
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {}
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
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

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}

/*  */

function initProvide(vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject).filter(function (key) {
      /* istanbul ignore next */
      return Object.getOwnPropertyDescriptor(inject, key).enumerable;
    }) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else {}
      }
    }
    return result;
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    ret._isVList = true;
  }
  return ret;
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes);
  } else {
    return nodes;
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}

/*  */

function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function loop(key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) {
        loop(key);
      }
    }
  }
  return data;
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree;
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}

/*  */

function installRenderHelpers(target) {
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
}

/*  */

function FunctionalRenderContext(data, props, children, parent, Ctor) {
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
    return resolveSlots(children, parent);
  };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }
    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init(vnode, hydrating, parentElm, refElm) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },

  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
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

  destroy: function destroy(vnode) {
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

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    return;
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
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
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
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
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent, // activeInstance in lifecycle state
parentElm, refElm) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    return createEmptyVNode();
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // warn against non-primitive key
  if (Array.isArray(children) && typeof children[0] === 'function') {
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
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }
    if (isDef(data)) {
      registerDeepBindings(data);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender(vm) {
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
  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
  };
}

/*  */

var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */
    {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

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

function resolveConstructorOptions(Ctor) {
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
  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified;
}

function dedupe(latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res;
  } else {
    return latest;
  }
}

function Vue(options) {
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
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
    return this;
  };
}

/*  */

function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}

/*  */

function initExtend(Vue) {
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
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;
    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
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
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}

/*  */

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(keepAliveInstance, filter) {
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

function pruneCacheEntry(cache, key, keys, current) {
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

  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed() {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },

  render: function render() {
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
      include && (!name || !matches(include, name)) ||
      // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
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
    return vnode || slot && slot[0];
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive

  /*  */

};function initGlobalAPI(Vue) {
  // config
  var configDef = {};
  configDef.get = function () {
    return config;
  };
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

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
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function mustUseProp(tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function isXlink(name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function getXlinkProp(name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function isFalsyAttrValue(val) {
  return val == null || val === false;
};

/*  */

function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject(value)) {
    return stringifyObject(value);
  }
  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */
  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }
      res += stringified;
    }
  }
  return res;
}

function stringifyObject(value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }
      res += key;
    }
  }
  return res;
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function isReservedTag(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

/*  */

function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove() {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }
      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }
      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    // assert node match
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true /* hydrating */);
      }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              return false;
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else {}
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(vnode, insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function callInsert() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];

/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && !el.__ieph) {
      var blocker = function blocker(e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs

  /*  */

};function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass

  /*  */

  /*  */

  // add a raw attr (use this in preTransforms)


  // note: this only removes the attr from the Array (attrsList) so that it
  // doesn't get processed by processAttrs.
  // By default it does NOT remove it from the map (attrsMap) because the map is
  // needed during codegen.

  /*  */

  /**
   * Cross-platform code generation for component v-model
   */

  /**
   * Cross-platform codegen helper for generating v-model value assignment code.
   */

  /*  */

  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
};var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler(handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
}

function add$1(event, handler, once$$1, capture, passive) {
  handler = withMacroTask(handler);
  if (once$$1) {
    handler = createOnceHandler(handler, event, capture);
  }
  target$1.addEventListener(event, handler, supportsPassive ? { capture: capture, passive: passive } : capture);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event, handler._withTask || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners

  /*  */

};function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}
  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false;
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }
  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps

  /*  */

};var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle ? extend(data.staticStyle, style) : style;
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res;
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function setProp(el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle

  /*  */

  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
};function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition(def) {
  if (!def) {
    return;
  }
  /* istanbul ignore else */
  if ((typeof def === 'undefined' ? 'undefined' : _typeof(def)) === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res;
  } else if (typeof def === 'string') {
    return autoCssTransition(def);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : /* istanbul ignore next */function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) {
    return cb();
  }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function end() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

function toMs(s) {
  return Number(s.slice(0, -1)) * 1000;
}

/*  */

function enter(vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [attrs, klass, events, domProps, style, transition];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show

  /*  */

  // Provides transition support for a single element/component.
  // supports transition mode (out-in / in-out)

};var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render(h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) {
      return c.tag || isAsyncPlaceholder(c);
    });
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }

    // warn multiple elements
    var mode = this.mode;

    // warn invalid mode
    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) {
      return d.name === 'show';
    })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) &&
    // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave;
        var performLeave = function performLeave() {
          delayedLeave();
        };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }

  /*  */

  // Provides transition support for list items.
  // supports move transitions using the FLIP technique.

  // Because the vdom's children update algorithm is "unstable" - i.e.
  // it doesn't guarantee the relative positioning of removed elements,
  // we force transition-group to update its children into two passes:
  // in the first pass, we remove all nodes that need to be removed,
  // triggering their leaving transition; in the second pass, we insert/move
  // into the final desired state. This way in the second pass removed
  // nodes will remain where they should be.

};var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
        } else {}
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },

  beforeUpdate: function beforeUpdate() {
    // force removing pass
    this.__patch__(this._vnode, this.kept, false, // hydrating
    true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove;
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup

  /*  */

  // install platform specific utils
};Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else {}
    }
    
  }, 0);
}

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children);
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h();
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend$1({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children);
  }
};

function resolveProps(route, config) {
  switch (typeof config === "undefined" ? "undefined" : _typeof$1(config)) {
    case 'undefined':
      return;
    case 'object':
      return config;
    case 'function':
      return config(route);
    case 'boolean':
      return config ? route.params : undefined;
    default:
      
  }
}

function extend$1(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to;
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery;
}

function parseQuery(query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route);
}

function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && (typeof value === "undefined" ? "undefined" : _typeof$1(value)) === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res;
  } else {
    return value;
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch(record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res;
}

function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;if (query === void 0) query = {};
  var hash = ref.hash;if (hash === void 0) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash;
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && a.hash === b.hash && isObjectEqual(a.query, b.query);
  } else if (a.name && b.name) {
    return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
  } else {
    return false;
  }
}

function isObjectEqual(a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {};

  // handle null value #1566
  if (!a || !b) {
    return a === b;
  }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if ((typeof aVal === "undefined" ? "undefined" : _typeof$1(aVal)) === 'object' && (typeof bVal === "undefined" ? "undefined" : _typeof$1(bVal)) === 'object') {
      return isObjectEqual(aVal, bVal);
    }
    return String(aVal) === String(bVal);
  });
}

function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, '/').indexOf(target.path.replace(trailingSlashRE, '/')) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}

function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }
  return true;
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = location.path ? createRoute(null, location, null, router) : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);

    var handler = function handler(e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default);
  }
};

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) {
    return;
  }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) {
    return;
  }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) {
      return;
    }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true;
}

function findAnchor(children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child;
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}

var _Vue;

function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return;
  }
  install.installed = true;

  _Vue = Vue;

  var isDef = function isDef(v) {
    return v !== undefined;
  };

  var registerInstance = function registerInstance(vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() {
      return this._routerRoot._router;
    }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() {
      return this._routerRoot._route;
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser$1 = typeof window !== 'undefined';

/*  */

function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function parsePath$1(path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  };
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/');
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (_typeof$1(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */keys);
  }

  if (isarray(path)) {
    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
  }

  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true });
  } catch (e) {
    return '';
  }
}

/*  */

function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;
  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    route.children.forEach(function (child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else {}
  }
}

function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  return regex;
}

function normalizePath(path, parent, strict) {
  if (!strict) {
    path = path.replace(/\/$/, '');
  }
  if (path[0] === '/') {
    return path;
  }
  if (parent == null) {
    return path;
  }
  return cleanPath(parent.path + "/" + path);
}

/*  */

function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next;
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, "path " + current.path);
    } else {}
    return next;
  }

  var parsedPath = parsePath$1(next.path || '');
  var basePath = current && current.path || '/';
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;

  var query = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  };
}

function assign(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
}

/*  */

function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (!record) {
        return _createRoute(null, location);
      }
      var paramNames = record.regex.keys.filter(function (key) {
        return !key.optional;
      }).map(function (key) {
        return key.name;
      });

      if (_typeof$1(location.params) !== 'object') {
        location.params = {};
      }

      if (currentRoute && _typeof$1(currentRoute.params) === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, "named route \"" + name + "\"");
        return _createRoute(record, location, redirectedFrom);
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    }
    // no match
    return _createRoute(null, location);
  }

  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function' ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || (typeof redirect === "undefined" ? "undefined" : _typeof$1(redirect)) !== 'object') {
      return _createRoute(null, location);
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location);
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, "redirect route with path \"" + rawPath + "\"");
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location);
    } else {
      return _createRoute(null, location);
    }
  }

  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, "aliased route with path \"" + matchAs + "\"");
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }
    return _createRoute(null, location);
  }

  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }
    return createRoute(record, location, redirectedFrom, router);
  }

  return {
    match: match,
    addRoutes: addRoutes
  };
}

function matchRoute(regex, path, params) {
  var m = path.match(regex);

  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true;
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true);
}

/*  */

var positionStore = Object.create(null);

function setupScroll() {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return;
  }

  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return;
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition(shouldScroll, position);
      }).catch(function (err) {
        
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition() {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition() {
  var key = getStateKey();
  if (key) {
    return positionStore[key];
  }
}

function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}

function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}

function isNumber(v) {
  return typeof v === 'number';
}

function scrollToPosition(shouldScroll, position) {
  var isObject = (typeof shouldScroll === "undefined" ? "undefined" : _typeof$1(shouldScroll)) === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && _typeof$1(shouldScroll.offset) === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser$1 && function () {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }

  return window.history && 'pushState' in window.history;
}();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser$1 && window.performance && window.performance.now ? window.performance : Date;

var _key = genKey();

function genKey() {
  return Time.now().toFixed(3);
}

function getStateKey() {
  return _key;
}

function setStateKey(key) {
  _key = key;
}

function pushState(url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState(url) {
  pushState(url, true);
}

/*  */

function runQueue(queue, fn, cb) {
  var step = function step(index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents(matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once$1(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function' ? resolvedDef : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once$1(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) {
      next();
    }
  };
}

function flatMapComponents(matched, fn) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key);
    });
  }));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var hasSymbol$1 = typeof Symbol === 'function' && _typeof$1(Symbol.toStringTag) === 'symbol';

function isESModule(obj) {
  return obj.__esModule || hasSymbol$1 && obj[Symbol.toStringTag] === 'Module';
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once$1(fn) {
  var called = false;
  return function () {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }if (called) {
      return;
    }
    called = true;
    return fn.apply(this, args);
  };
}

/*  */

var History = function History(router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen(cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) {
        cb(err);
      });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1 = this;

  var current = this.current;
  var abort = function abort(err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (isSameRoute(route, current) &&
  // in the case the route map has been dynamically appended to
  route.matched.length === current.matched.length) {
    this.ensureURL();
    return abort();
  }

  var ref = resolveQueue(this.current.matched, route.matched);
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;

  var queue = [].concat(
  // in-component leave guards
  extractLeaveGuards(deactivated),
  // global before hooks
  this.router.beforeHooks,
  // in-component update hooks
  extractUpdateHooks(updated),
  // in-config enter guards
  activated.map(function (m) {
    return m.beforeEnter;
  }),
  // async components
  resolveAsyncComponents(activated));

  this.pending = route;
  var iterator = function iterator(hook, next) {
    if (this$1.pending !== route) {
      return abort();
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (typeof to === 'string' || (typeof to === "undefined" ? "undefined" : _typeof$1(to)) === 'object' && (typeof to.path === 'string' || typeof to.name === 'string')) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if ((typeof to === "undefined" ? "undefined" : _typeof$1(to)) === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function isValid() {
      return this$1.current === route;
    };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort();
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase(base) {
  if (!base) {
    if (inBrowser$1) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '');
}

function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}

function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard) ? guard.map(function (guard) {
        return bind(guard, instance, match, key);
      }) : bind(guard, instance, match, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}

function extractGuard(def, key) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key];
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true);
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard);
}

function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}

function extractEnterGuards(activated, cbs, isValid) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid);
  });
}

function bindEnterGuard(guard, match, key, cbs, isValid) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    });
  };
}

function poll(cb, // somehow flow cannot infer this is a function
instances, key, isValid) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = function (History$$1) {
  function HTML5History(router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return;
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if (History$$1) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype);
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go(n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };

  return HTML5History;
}(History);

function getLocation(base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash;
}

/*  */

var HashHistory = function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return;
    }
    ensureSlash();
  }

  if (History$$1) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners() {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return;
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go(n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };

  return HashHistory;
}(History);

function checkFallback(base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true;
  }
}

function ensureSlash() {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true;
  }
  replaceHash('/' + path);
  return false;
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}

function getUrl(path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return base + "#" + path;
}

function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if (History$$1) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go(n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/';
  };

  AbstractHistory.prototype.ensureURL = function ensureURL() {
    // noop
  };

  return AbstractHistory;
}(History);

/*  */

var VueRouter = function VueRouter(options) {
  if (options === void 0) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser$1) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break;
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break;
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break;
    default:
      
  }
};

var prototypeAccessors$1 = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};

prototypeAccessors$1.currentRoute.get = function () {
  return this.history && this.history.current;
};

VueRouter.prototype.init = function init(app /* Vue component instance */) {
  var this$1 = this;

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return;
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function setupHashListener() {
      history.setupListeners();
    };
    history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};

VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};

VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};

VueRouter.prototype.onReady = function onReady(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError(errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back() {
  this.go(-1);
};

VueRouter.prototype.forward = function forward() {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;
  if (!route) {
    return [];
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key];
    });
  }));
};

VueRouter.prototype.resolve = function resolve(to, current, append) {
  var location = normalizeLocation(to, current || this.history.current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};

VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties(VueRouter.prototype, prototypeAccessors$1);

function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function createHref(base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path;
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser$1 && window.Vue) {
  window.Vue.use(VueRouter);
}

var components = [{ "category": "basic", "name": "Basic", "text": "基础", "list": [{ "name": "ActionBar", "path": "/action-bar", "icon": "action-bar", "text": "操作栏" }, { "name": "ActivityIndicator", "path": "/activity-indicator", "icon": "activity-indicator", "text": "活动指示器" }, { "path": "/button", "name": "Button", "icon": "button", "text": "按钮" }, { "name": "DropMenu", "path": "/drop-menu", "icon": "drop-menu", "text": "下拉菜单" }, { "path": "/icon", "name": "Icon", "icon": "icon", "text": "图标" }, { "name": "ImageReader", "path": "/image-reader", "icon": "image-reader", "text": "图片选择器" }, { "name": "ImageViewer", "path": "/image-viewer", "icon": "image-viewer", "text": "图片浏览器" }, { "name": "NoticeBar", "path": "/notice-bar", "icon": "notice-bar", "text": "通知栏" }, { "name": "Stepper", "path": "/stepper", "icon": "stepper", "text": "步进器" }, { "name": "Steps", "path": "/steps", "icon": "steps", "text": "步骤条" }, { "name": "Swiper", "path": "/swiper", "icon": "swiper", "text": "轮播" }, { "name": "TabBar", "path": "/tab-bar", "icon": "tab-bar", "text": "标签栏" }, { "name": "Tabs", "path": "/tabs", "icon": "tabs", "text": "标签页" }, { "name": "Tag", "path": "/tag", "icon": "tag", "text": "标签" }] }, { "category": "business", "name": "Business", "text": "业务相关", "list": [{ "name": "Amount", "path": "/amount", "icon": "amount", "text": "金融数字" }, { "name": "Captcha", "path": "/captcha", "icon": "captcha", "text": "验证码窗口" }, { "name": "Cashier", "path": "/cashier", "icon": "cashier", "text": "收银台" }, { "name": "Chart", "path": "/chart", "icon": "chart", "text": "折线图表" }, { "name": "Landscape", "path": "/landscape", "icon": "landscape", "text": "压屏窗" }, { "name": "ResultPage", "path": "/result-page", "icon": "result-page", "text": "结果页" }] }, { "category": "feedback", "name": "Feedback", "text": "操作反馈", "list": [{ "name": "ActionSheet", "path": "/action-sheet", "icon": "action-sheet", "text": "动作面板" }, { "name": "DatePicker", "path": "/date-picker", "icon": "date-picker", "text": "日期选择器" }, { "name": "Dialog", "path": "/dialog", "icon": "dialog", "text": "模态窗" }, { "name": "Picker", "path": "/picker", "icon": "picker", "text": "选择器" }, { "name": "Popup", "path": "/popup", "icon": "popup", "text": "弹出层" }, { "name": "Selector", "path": "/selector", "icon": "selector", "text": "列表选择器" }, { "name": "TabPicker", "path": "/tab-picker", "icon": "tab-picker", "text": "多频道选择器" }, { "name": "Tip", "path": "/tip", "icon": "tip", "text": "气泡提示" }, { "name": "Toast", "path": "/toast", "icon": "toast", "text": "轻提示" }] }, { "category": "form", "name": "Form", "text": "表单相关", "list": [{ "name": "Agree", "path": "/agree", "icon": "agree", "text": "勾选按钮" }, { "name": "Codebox", "path": "/codebox", "icon": "codebox", "text": "字符码输入框" }, { "name": "Field", "path": "/field", "icon": "field", "text": "区域列表组合" }, { "name": "InputItem", "path": "/input-item", "icon": "input-item", "text": "输入框" }, { "name": "NumberKeyboard", "path": "/number-keyboard", "icon": "number-keyboard", "text": "数字键盘" }, { "name": "Radio", "path": "/radio", "icon": "radio", "text": "单选框" }, { "name": "Switch", "path": "/switch", "icon": "switch", "text": "开关" }] }];

var home_indemand = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm._m(0);
  }, staticRenderFns: [function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-home" }, [_c('div', { staticClass: "md-home-logo" }, [_c('img', { attrs: { "src": "//manhattan.didistatic.com/static/manhattan/mand/docs/mand-logo-black.svg", "alt": "" } })]), _vm._v(" "), _c('div', { staticClass: "md-home-name", attrs: { "data-in-effect": "fadeInLeftBig" } }, [_vm._v(" Mand Mobile ")]), _vm._v(" "), _c('div', { staticClass: "md-home-time" }, [_vm._v("0%")]), _vm._v(" "), _c('h1', { staticClass: "md-home-copyright" }, [_vm._v("Produced By DiDi - FDC × MFE")])]);
  }],
  data: function data() {
    return {
      percent: 0
    };
  },
  mounted: function mounted() {
    var _this = this;

    $('.md-home-name').textillate().on('end.tlt');
    this.timeCount(function () {
      _this.$router.replace('/category');
    });
  },

  methods: {
    timeCount: function timeCount(fn) {
      var duration = 2000;
      var tick = 100;
      var per = 100 / (duration / tick);

      var percent = 0;
      var time = setInterval(function () {
        if (percent < 100) {
          percent += per;
          $('.md-home-time').text(parseInt(percent) + '%');
        } else {
          clearInterval(time);
          fn();
        }
      }, tick);
    }
  }
};

// import '../_style/images/hollow-plus.svg'
// import '../_style/images/arrow-up.svg'
var icons = {
  'hollow-plus': '<svg viewBox="0 0 512 512"><path d="M241.778 270.222v128c0 7.854 6.368 14.222 14.222 14.222s14.222-6.368 14.222-14.222v-128h128c7.854 0 14.222-6.368 14.222-14.222s-6.368-14.222-14.222-14.222h-128v-128c0-7.855-6.368-14.222-14.222-14.222s-14.222 6.367-14.222 14.222v128h-128c-7.855 0-14.222 6.368-14.222 14.222s6.367 14.222 14.222 14.222h128z"/><path d="M0 256C0 114.615 114.615 0 256 0s256 114.615 256 256-114.615 256-256 256S0 397.385 0 256zm28.445 0c0 125.675 101.88 227.555 227.555 227.555S483.555 381.675 483.555 256c0-125.675-101.88-227.555-227.555-227.555S28.445 130.325 28.445 256z"/></svg>',

  'arrow-up': '<svg viewBox="0 0 512 512"><path d="M145.92 315.904c-5.632-5.632-5.632-14.336 0-19.968l100.352-99.84c5.12-5.632 14.336-5.632 19.968 0l99.84 99.84c5.632 5.632 5.632 14.336 0 19.968s-14.336 5.632-19.968 0L256 225.792l-90.112 90.112c-5.632 5.632-14.336 5.632-19.968 0z"/></svg>',

  'arrow-down': '<svg viewBox="0 0 512 512"><path d="M366.08 196.096c5.632 5.632 5.632 14.336 0 19.968l-99.84 99.84c-5.632 5.632-14.848 5.632-19.968 0l-100.352-99.84c-5.632-5.632-5.632-14.336 0-19.968s14.336-5.632 19.968 0L256 286.208l90.112-90.112c5.632-5.632 14.336-5.632 19.968 0z"/></svg>',

  'arrow-left': '<svg viewBox="0 0 512 512"><path d="M315.904 366.08c-5.632 5.632-14.336 5.632-19.968 0l-99.84-100.352c-5.632-5.12-5.632-14.336 0-19.968l99.84-99.84c5.632-5.632 14.336-5.632 19.968 0s5.632 14.336 0 19.968L225.792 256l90.112 90.112c5.632 5.632 5.632 14.336 0 19.968z"/></svg>',

  'arrow-right': '<svg viewBox="0 0 512 512"><path d="M196.096 145.92c5.632-5.632 14.336-5.632 19.968 0l99.84 99.84c5.632 5.632 5.632 14.848 0 19.968l-99.84 100.352c-5.632 5.632-14.336 5.632-19.968 0s-5.632-14.336 0-19.968L286.208 256l-90.112-90.112c-5.632-5.632-5.632-14.336 0-19.968z"/></svg>',

  'cross': '<svg viewBox="0 0 512 512"><path d="M111.104 91.136L256 236.032 400.896 91.136l19.968 19.968L275.968 256l144.896 144.896-19.968 19.968L256 275.968 111.104 420.864l-19.968-19.968L236.032 256 91.136 111.104l19.968-19.968z"/></svg>',
  'circle-alert': '<svg viewBox="0 0 512 512"><path d="M256 496C123.449 496 16 388.551 16 256S123.449 16 256 16s240 107.449 240 240-107.449 240-240 240zm-23.441-375l7.031 165H271l8.441-165h-46.879zm44.692 218.76c-5.921-5.809-13.069-8.719-21.439-8.719-8.381 0-15.461 2.91-21.24 8.719-5.779 5.831-8.681 12.881-8.681 21.18 0 9.499 3.03 16.89 9.079 22.17 6.049 5.291 13.129 7.931 21.24 7.931 7.969 0 14.951-2.681 20.94-8.029 5.981-5.34 8.97-12.701 8.97-22.069 0-8.299-2.959-15.349-8.869-21.18z"/></svg>',

  'circle-cross': '<svg viewBox="0 0 512 512"><title/><path d="M256 29.696C131.072 29.696 29.696 131.072 29.696 256S131.072 482.304 256 482.304 482.304 380.928 482.304 256 380.928 29.696 256 29.696zm90.112 296.448l-19.968 19.968L256 275.968l-70.144 70.144-19.968-19.968L236.032 256l-70.144-70.144 19.968-19.968L256 236.032l70.144-70.144 19.968 19.968L275.968 256l70.144 70.144z"/></svg>',

  'circle-right': '<svg viewBox="0 0 512 512"><path d="M256 29.696C131.072 29.696 29.696 131.072 29.696 256S131.072 482.304 256 482.304 482.304 380.928 482.304 256 380.928 29.696 256 29.696zm-22.528 304.64l.512.512-19.968 19.968L128 268.8l19.968-19.968 65.536 65.536 145.92-145.92 19.968 19.968-145.92 145.92z"/></svg>',

  'spinner': '<svg class="lds-spinner" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background:0 0"><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(30 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(60 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.75s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(90 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(120 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(150 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.5s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(180 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(210 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(240 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.25s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(270 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(300 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(330 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="0s" repeatCount="indefinite"/></rect></svg>',

  'right': '<svg viewBox="0 0 670 512"><path d="M222.793 371.595L55.698 204.5-.001 260.198l222.793 222.793L640.529 65.254 584.831 9.555 222.793 371.593z"/><path d="M55.699 232.35L27.85 260.199l194.944 194.944L612.682 65.255l-27.849-27.849-362.038 362.038L55.7 232.349z"/></svg>',

  'circle': '<svg viewBox="0 0 512 512"><path fill="none" stroke="#ccc" stroke-width="24.381" d="M467.81 256c0 116.98-94.83 211.81-211.81 211.81S44.19 372.98 44.19 256 139.02 44.19 256 44.19 467.81 139.02 467.81 256z"/></svg>'
};

// inspried by https://github.com/kisenka/svg-sprite-loader/blob/master/runtime/browser-sprite.js
// Much simplified, do make sure run this after document ready
var svgSprite = function svgSprite(contents) {
  return '\n<svg\n  xmlns="http://www.w3.org/2000/svg"\n  xmlns:xlink="http://www.w3.org/1999/xlink"\n  id="__MAND_MOBILE_SVG_SPRITE_NODE__"\n  style="position:absolute;width:0;height:0"\n>\n  <defs>\n    ' + contents + '\n  </defs>\n</svg>\n';
};

var renderSvgSprite = function renderSvgSprite() {
  var symbols = Object.keys(icons).map(function (iconName) {
    var svgContent = icons[iconName].split('svg')[1];
    return '<symbol id=' + iconName + svgContent + 'symbol>';
  }).join('');
  return svgSprite(symbols);
};

var loadSprite = function loadSprite() {
  if (!document) {
    return;
  }
  var existing = document.getElementById('__MAND_MOBILE_SVG_SPRITE_NODE__');
  var mountNode = document.body;

  if (!existing) {
    mountNode.insertAdjacentHTML('afterbegin', renderSvgSprite());
  }
};

var Icon = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.name ? _c('svg', { staticClass: "md-icon", class: ['md-icon-' + _vm.name, _vm.size], style: { fill: _vm.color } }, [_c('use', { attrs: { "xlink:href": '#' + _vm.name } })]) : _vm._e();
  }, staticRenderFns: [],
  name: 'md-icon',

  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md'
    },
    color: {
      type: String,
      default: ''
    }
  },

  mounted: function mounted() {
    loadSprite();
  }
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var category = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-cg" }, [_c('h1', { staticClass: "md-cg-title" }, [_vm._v("Mand Mobile")]), _vm._v(" "), _c('h1', { staticClass: "md-cg-subtitle" }, [_vm._v("面向金融场景的移动端Vue组件库")]), _vm._v(" "), _vm._l(_vm.components, function (category, i) {
      return _c('section', { key: i, staticClass: "cg-category", class: { 'active': category.show } }, [_c('div', { staticClass: "cg-category-title", class: { 'active': category.show }, on: { "click": function click($event) {
            _vm.toggleCategory(i, category);
          } } }, [_vm._v(" " + _vm._s(category.name) + "  "), _c('span', [_vm._v(_vm._s(category.text))]), _vm._v(" "), _c('md-icon', { attrs: { "name": "arrow-right", "size": "lg" } })], 1), _vm._v(" "), _c('transition', { attrs: { "name": "slide-fade" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: category.show, expression: "category.show" }], staticClass: "cg-category-list" }, [_vm._l(category.list, function (item, j) {
        return _c('div', { key: j, staticClass: "cg-category-item", on: { "click": function click($event) {
              _vm.goToComponent(item.path);
            } } }, [_c('div', { staticClass: "cg-category-item-inner" }, [_vm._v(" " + _vm._s(item.name) + " - " + _vm._s(item.text) + " "), _c('md-icon', { attrs: { "name": "arrow-right", "size": "md" } })], 1)]);
      }), _vm._v(" "), _c('div', { staticClass: "cg-category-item", on: { "click": function click($event) {
            _vm.toggleCategory(i, category);
          } } }, [_c('div', { staticClass: "cg-category-item-inner close" }, [_vm._v("收起")])])], 2)])], 1);
    }), _vm._v(" "), _c('h1', { staticClass: "md-cg-copyright" }, [_vm._v("Produced By DiDi - FDC × MFE")])], 2);
  }, staticRenderFns: [], _scopeId: 'data-v-76437e66',
  name: 'category',
  components: _defineProperty({}, Icon.name, Icon),
  data: function data() {
    return {
      components: components
    };
  },

  methods: {
    toggleCategory: function toggleCategory(index, category) {
      category.show = !category.show;
      this.$set(this.components, index, category);
    },
    goToComponent: function goToComponent(path) {
      this.$router.push(path);
    }
  }
};

function createDemoModule () {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var demos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return {
    name: name + '-demo',
    data: function data() {
      return {
        demos: demos
      };
    }
  };
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "body{font-family:font-family-normal;-webkit-tap-highlight-color:transparent;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}li,ol{list-style:none}";
styleInject(css);

// Development environment
var isProd = "production" === 'production';

// Browser environment sniffing
var inBrowser$2 = typeof window !== 'undefined';
var UA$1 = inBrowser$2 && window.navigator.userAgent.toLowerCase();
var isAndroid$1 = UA$1 && UA$1.indexOf('android') > 0;
var isIOS$1 = UA$1 && /iphone|ipad|ipod|ios/.test(UA$1);

var warn$2 = function warn(msg) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';

  !isProd && console[fn]('[Mand-Mobile]: ' + msg);
};

function noop$1() {}

/**
 * Include external script dynamically
 */
function requireRemoteScript(src, callback) {
  var doc = document;
  var head = doc.head || doc.getElementsByTagName('head')[0];

  var node = doc.createElement('script');
  var supportOnload = 'onload' in node;
  var onload = function onload() {
    node = null;
    typeof callback === 'function' && callback();
  };

  if (supportOnload) {
    node.onload = onload;
  } else {
    node.onreadystatechange = function () {
      if (/loaded|complete/.test(node.readyState)) {
        onload();
      }
    };
  }

  node.async = true;
  node.crossOrigin = true;
  node.charset = 'utf-8';
  node.src = src;
  head.appendChild(node);
}

function getDpr() {
  var getParam = function getParam(name, str) {
    var reg = new RegExp('(^|,)' + name + '=([^,]*)(,|$)', 'i');
    var r = str.match(reg);
    if (r != null) {
      return r[2];
    }
    return null;
  };

  var viewPort = document.querySelector('meta[name=viewport]');

  if (!viewPort) {
    return 1;
  }

  var viewPortContent = viewPort.getAttribute('content');
  var initialScale = +(getParam('initial-scale', viewPortContent) || 1);
  var maximumScale = +(getParam('maximum-scale', viewPortContent) || 1);
  var minimumScale = +(getParam('minimum-scale', viewPortContent) || 1);

  return 1 / Math.min(initialScale, maximumScale, minimumScale);
}

/**
 * transform a Function to Blob Url
 */
function functionToUrl(fn) {
  var blob = new Blob(['(' + fn.toString() + ')(null)'], { type: 'application/javascript' });
  return URL.createObjectURL(blob);
}

/**
 * generate random id
 */
function randomId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

  return prefix + '-' + parseInt(Math.random() * Math.pow(10, length));
}

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Mix properties into target object.
 */
function extend$2(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Multiple Array traversal
 * @return 1 continue
 * @return 2 break
 */
function traverse$1(data) {
  var childrenKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop$1;

  if (!data) {
    return;
  }
  if (typeof childrenKeys === 'function') {
    fn = childrenKeys;
    childrenKeys = [];
  }
  var level = 0; // current level
  var indexs = []; // index set of all levels
  var walk = function walk(curData) {
    for (var i = 0, len = curData.length; i < len; i++) {
      var isArray = Array.isArray(curData[i]);
      var key = Array.isArray(childrenKeys) ? childrenKeys[level] : childrenKeys;
      if (isArray || curData[i] && curData[i][key]) {
        level++;
        indexs.push(i);
        walk(isArray ? curData[i] : curData[i][key]);
      } else if (level >= childrenKeys.length) {
        var res = fn(curData[i], level, [].concat(_toConsumableArray(indexs), [i]));
        if (res === 1) {
          continue;
        } else if (res === 2) {
          break;
        }
      } else {
        continue;
      }
    }
    level = 0;
    indexs = [];
  };
  walk(data);
}
/**
 * Merge an Array of Objects into a single Object.
 */
function toObject$1(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend$2(res, arr[i]);
    }
  }
  return res;
}

/**
 * Convert an Array-like object to a real Array.
 */


/**
 * whether item is in list or list equal item
 */
function inArray(list, item) {
  return Array.isArray(list) ? !!~list.indexOf(item) : item === list;
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */


/**
 * Convert a value to a string
 */


/**
 * Determine whether the two objects are equal or not shallowly
 */

function compareObjects(object0, object1) {
  var ret = true;

  if (!object0 || !object1) {
    ret = false;
  } else if ((typeof object0 === 'undefined' ? 'undefined' : _typeof$2(object0)) !== 'object' || (typeof object1 === 'undefined' ? 'undefined' : _typeof$2(object1)) !== 'object') {
    ret = false;
  } else if (JSON.stringify(object0) !== JSON.stringify(object1)) {
    ret = false;
  }

  return ret;
}

/**
 * Check object is empty
 */
function isEmptyObject(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Button = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-button", class: [_vm.type, _vm.size, _vm.disabled ? 'disabled' : '', _vm.icon ? 'with-icon' : ''], on: { "click": _vm.$_onBtnClick } }, [_c('div', { staticClass: "md-button-inner" }, [_vm.icon ? [_c('md-icon', { attrs: { "name": _vm.icon } })] : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'md-button',

  components: _defineProperty$1({}, Icon.name, Icon),

  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'large'
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    $_onBtnClick: function $_onBtnClick(event) {
      if (this.disabled) {
        event.stopImmediatePropagation();
      } else {
        this.$emit('click', event);
      }
    }
  }
};

var Popup = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isPopupShow, expression: "isPopupShow" }], staticClass: "md-popup", class: [_vm.hasMask ? 'with-mask' : '', _vm.position] }, [_c('transition', { attrs: { "name": "fade" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.hasMask && _vm.isPopupBoxShow, expression: "hasMask && isPopupBoxShow" }], staticClass: "md-popup-mask", on: { "click": _vm.$_onPopupMaskClick } })]), _vm._v(" "), _c('transition', { attrs: { "name": _vm.transition }, on: { "before-enter": _vm.$_onPopupTransitionStart, "before-leave": _vm.$_onPopupTransitionStart, "after-enter": _vm.$_onPopupTransitionEnd, "after-leave": _vm.$_onPopupTransitionEnd } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isPopupBoxShow, expression: "isPopupBoxShow" }], staticClass: "md-popup-box", class: [_vm.transition] }, [_vm._t("default")], 2)])], 1);
  }, staticRenderFns: [],
  name: 'md-popup',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    hasMask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'center'
    },
    transition: {
      type: String,
      default: function _default() {
        switch (this.position) {
          case 'bottom':
            return 'slide-up';
          /* istanbul ignore next */
          case 'top':
            return 'slide-down';
          /* istanbul ignore next */
          case 'left':
            return 'slide-right';
          /* istanbul ignore next */
          case 'right':
            return 'slide-left';
          default:
            return 'fade';
        }
      }
    },
    preventScroll: {
      type: Boolean,
      default: false
    },
    preventScrollExclude: {
      type: [String, HTMLElement],
      default: function _default() {
        return '';
      }
    }
  },

  data: function data() {
    return {
      // controle popup mask & popup box
      isPopupShow: false,
      // controle popup box
      isPopupBoxShow: false,
      // transtion lock
      isAnimation: false
    };
  },


  watch: {
    value: function value(val) {
      var _this = this;

      /* istanbul ignore next */
      if (val) {
        if (this.isAnimation) {
          setTimeout(function () {
            _this.$_showPopupBox();
          }, 50);
        } else {
          this.$_showPopupBox();
        }
      } else {
        this.$_hidePopupBox();
      }
    },
    preventScrollExclude: function preventScrollExclude(val, oldVal) {
      // remove old listener before add
      /* istanbul ignore next */
      this.$_preventScrollExclude(false, oldVal);
      /* istanbul ignore next */
      this.$_preventScrollExclude(true, val);
    }
  },

  mounted: function mounted() {
    this.value && this.$_showPopupBox();
  },


  methods: {
    // MARK: private methods
    $_showPopupBox: function $_showPopupBox() {
      var _this2 = this;

      this.isPopupShow = true;
      this.isAnimation = true;
      // popup box enter the animation after popup show
      this.$nextTick(function () {
        _this2.isPopupBoxShow = true;
        /* istanbul ignore if */
        
      });

      this.preventScroll && this.$_preventScroll(true);
    },
    $_hidePopupBox: function $_hidePopupBox() {
      this.isAnimation = true;
      this.isPopupBoxShow = false;
      this.preventScroll && this.$_preventScroll(false);
      this.$emit('input', false);
      /* istanbul ignore if */
      
    },
    $_preventScroll: function $_preventScroll(isBind) {
      var handler = isBind ? 'addEventListener' : 'removeEventListener';
      var masker = this.$el.querySelector('.md-popup-mask');
      var boxer = this.$el.querySelector('.md-popup-box');

      masker && masker[handler]('touchmove', this.$_preventDefault, false);
      boxer && boxer[handler]('touchmove', this.$_preventDefault, false);
      this.$_preventScrollExclude(isBind);
    },
    $_preventScrollExclude: function $_preventScrollExclude(isBind, preventScrollExclude) {
      var handler = isBind ? 'addEventListener' : 'removeEventListener';
      preventScrollExclude = preventScrollExclude || this.preventScrollExclude;
      var excluder = preventScrollExclude && typeof preventScrollExclude === 'string' ? this.$el.querySelector(preventScrollExclude) : preventScrollExclude;
      excluder && excluder[handler]('touchmove', this.$_stopImmediatePropagation, false);
    },
    $_preventDefault: function $_preventDefault(event) {
      event.preventDefault();
    },
    $_stopImmediatePropagation: function $_stopImmediatePropagation(event) {
      /* istanbul ignore next */
      event.stopImmediatePropagation();
    },


    // MARK: event handler
    $_onPopupTransitionStart: function $_onPopupTransitionStart() {
      if (!this.isPopupBoxShow) {
        this.$emit('beforeHide');
        this.$emit('before-hide');
      } else {
        this.$emit('beforeShow');
        this.$emit('before-show');
      }
    },
    $_onPopupTransitionEnd: function $_onPopupTransitionEnd() {
      /* istanbul ignore next */
      if (!this.isAnimation) {
        return;
      }

      /* istanbul ignore next */
      if (!this.isPopupBoxShow) {
        // popup hide after popup box finish animation
        this.isPopupShow = false;
        this.$emit('hide');
      } else {
        this.$emit('show');
      }

      /* istanbul ignore next */
      this.isAnimation = false;
    },
    $_onPopupMaskClick: function $_onPopupMaskClick() {
      if (this.maskClosable) {
        this.$_hidePopupBox();
        this.$emit('maskClick');
      }
    }
  }
};

var PopupTitleBar = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-popup-title-bar", on: { "touchmove": _vm.$_preventScroll } }, [_vm.cancelText ? _c('div', { staticClass: "title-bar-left md-popup-cancel", domProps: { "innerHTML": _vm._s(_vm.cancelText) }, on: { "click": function click($event) {
          _vm.$emit('cancel');
        } } }) : _vm.$slots.cancel ? _c('div', { staticClass: "title-bar-left md-popup-cancel", on: { "click": function click($event) {
          _vm.$emit('cancel');
        } } }, [_vm._t("cancel")], 2) : _vm._e(), _vm._v(" "), _vm.title ? _c('div', { staticClass: "title-bar-title", domProps: { "innerHTML": _vm._s(_vm.title) } }) : _c('div', { staticClass: "title-bar-title" }, [_vm._t("title")], 2), _vm._v(" "), _vm.okText ? _c('div', { staticClass: "title-bar-right md-popup-confirm", domProps: { "innerHTML": _vm._s(_vm.okText) }, on: { "click": function click($event) {
          _vm.$emit('confirm');
        } } }) : _vm.$slots.confirm ? _c('div', { staticClass: "title-bar-right md-popup-confirm", on: { "click": function click($event) {
          _vm.$emit('confirm');
        } } }, [_vm._t("confirm")], 2) : _vm._e()]);
  }, staticRenderFns: [], _scopeId: 'data-v-75532390',
  name: 'md-popup-title-bar',

  props: {
    title: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    }
  },

  methods: {
    $_preventScroll: function $_preventScroll(e) {
      /* istanbul ignore next */
      e.preventDefault();
    }
  }
};

var ActionBar = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-action-bar", class: { 'with-text': _vm.hasText, 'multi-action': !!this.actions.length } }, [_vm.hasText ? _c('div', { staticClass: "md-action-bar-text" }, [_vm._t("default")], 2) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "md-action-bar-button" }, [_vm._l(_vm.actions, function (item, index) {
      return [_c('div', { key: index, staticClass: "button-item", class: { disabled: !!item.disabled }, domProps: { "innerHTML": _vm._s(item.text) }, on: { "click": function click($event) {
            _vm.$_onBtnClick($event, item);
          } } })];
    })], 2)]);
  }, staticRenderFns: [],
  name: 'md-action-bar',

  props: {
    actions: {
      type: Array,
      default: []
    },
    hasText: {
      type: Boolean,
      default: function _default() {
        return !isEmptyObject(this.$slots);
      }
    }
  },

  methods: {
    // MARK: events handler
    $_onBtnClick: function $_onBtnClick(event, action) {
      if (action.disabled) {
        return;
      }
      action.onClick && action.onClick(event, action);
      this.$emit('click', event, action);
    }
  }
};

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ActionSheet = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-action-sheet" }, [_c('md-popup', { attrs: { "position": "bottom", "prevent-scroll": "", "prevent-scroll-exclude": _vm.scroller }, on: { "show": _vm.$_onShow, "hide": _vm.$_onHide }, model: { value: _vm.isActionSheetShow, callback: function callback($$v) {
          _vm.isActionSheetShow = $$v;
        }, expression: "isActionSheetShow" } }, [_c('div', { staticClass: "md-action-sheet-content", style: { maxHeight: _vm.maxHeight + 'px' } }, [_vm.title ? _c('header', [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _c('ul', [_vm._l(_vm.options, function (item, index) {
      return [_c('li', { key: index, class: { 'active': index === _vm.clickIndex, 'disabled': index === _vm.invalidIndex, 'md-action-sheet-item': true }, domProps: { "innerHTML": _vm._s(item.text || item.label) }, on: { "click": function click($event) {
            _vm.$_onSelect(item, index);
          } } })];
    }), _vm._v(" "), _c('li', { staticClass: "cancel-btn", on: { "click": _vm.$_onCancel } }, [_vm._v(_vm._s(_vm.cancelText))])], 2)])])], 1);
  }, staticRenderFns: [],
  name: 'md-action-sheet',

  components: _defineProperty$2({}, Popup.name, Popup),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultIndex: {
      type: Number,
      default: -1
    },
    invalidIndex: {
      type: Number,
      default: -1
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    maxHeight: {
      type: Number,
      default: 400
    }
  },

  data: function data() {
    return {
      isActionSheetShow: this.value,
      clickIndex: -1,
      scroller: ''
    };
  },


  watch: {
    value: function value(newVal) {
      this.isActionSheetShow = newVal;
    }
  },

  created: function created() {
    this.clickIndex = this.defaultIndex;
  },


  methods: {
    $_setScroller: function $_setScroller() {
      var boxer = this.$el ? this.$el.querySelector('.md-action-sheet-content') : null;
      if (boxer && boxer.clientHeight >= this.maxHeight) {
        this.scroller = '.md-action-sheet-content';
      } else {
        this.scroller = '';
      }
    },

    // MARK: events handler, 如 $_onButtonClick
    $_onShow: function $_onShow() {
      this.$_setScroller();
      this.$emit('show');
    },
    $_onHide: function $_onHide() {
      this.$emit('hide');
      this.$emit('input', false);
    },
    $_onSelect: function $_onSelect(item, index) {
      if (index === this.invalidIndex || inArray(this.invalidIndex, index)) {
        return;
      }
      this.clickIndex = index;
      this.$emit('selected', item);
      this.$emit('input', false);
    },
    $_onCancel: function $_onCancel() {
      this.$emit('cancel');
      this.$emit('input', false);
    }
  }
};

var ActionSheetCtor = Vue.extend(ActionSheet);

var noop$2 = function noop() {};

// all active instances
var instances = [];

/**
 * Dynamically create a ActionSheet
 *
 * @param {Object} param
 * @return {ActionSheet}
 */
ActionSheet.create = function (_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === undefined ? true : _ref$value,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? '' : _ref$title,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? [] : _ref$options,
      _ref$defaultIndex = _ref.defaultIndex,
      defaultIndex = _ref$defaultIndex === undefined ? -1 : _ref$defaultIndex,
      _ref$invalidIndex = _ref.invalidIndex,
      invalidIndex = _ref$invalidIndex === undefined ? -1 : _ref$invalidIndex,
      _ref$cancelText = _ref.cancelText,
      cancelText = _ref$cancelText === undefined ? '取消' : _ref$cancelText,
      _ref$maxHeight = _ref.maxHeight,
      maxHeight = _ref$maxHeight === undefined ? 400 : _ref$maxHeight,
      _ref$onShow = _ref.onShow,
      onShow = _ref$onShow === undefined ? noop$2 : _ref$onShow,
      _ref$onHide = _ref.onHide,
      onHide = _ref$onHide === undefined ? noop$2 : _ref$onHide,
      _ref$onSelected = _ref.onSelected,
      onSelected = _ref$onSelected === undefined ? noop$2 : _ref$onSelected;

  var vm = new ActionSheetCtor({
    propsData: {
      value: value,
      title: title,
      options: options,
      defaultIndex: defaultIndex,
      invalidIndex: invalidIndex,
      cancelText: cancelText,
      maxHeight: maxHeight
    }
  }).$mount();

  instances.push(vm);

  /* istanbul ignore else */
  if (value) {
    document.body.appendChild(vm.$el);
    vm.value = true;
  }
  vm.$watch('value',
  /* istanbul ignore next */function (val) {
    if (val) {
      document.body.appendChild(vm.$el);
    }
  });
  vm.$on('input',
  /* istanbul ignore next */function (val) {
    if (val) {
      vm.value = true;
    } else {
      vm.value = false;
    }
  });
  vm.$on('show',
  /* istanbul ignore next */function () {
    if (typeof onShow === 'function') {
      onShow.call(null);
    }
  });
  vm.$on('hide',
  /* istanbul ignore next */function () {
    var parent = vm.$el.parentNode;
    if (parent) {
      parent.removeChild(vm.$el);
    }
    if (typeof onHide === 'function') {
      onHide.call(null);
    }
  });
  vm.$on('selected',
  /* istanbul ignore next */function (item) {
    if (typeof onSelected === 'function') {
      onSelected.call(null, item);
    }
  });

  vm.$on('hook:beforeDestroy', function () {
    var parent = vm.$el.parentNode;
    var index = instances.indexOf(vm);
    if (index) {
      instances.splice(index, 1);
    }
    if (parent) {
      parent.removeChild(vm.$el);
    }
  });

  return vm;
};

/**
 * Close all actived global ActionSheets
 *
 * @static
 * @return void
 */
ActionSheet.closeAll = function () {
  instances.forEach(function (instance) {
    instance.value = false;
  });
};

/**
 * Close and destroy all actived global ActionSheets
 *
 * @static
 * @return void
 */
ActionSheet.destroyAll = function () {
  instances.forEach(function (instance) {
    instance.value = false;
    instance.$on('hide', function () {
      instance.$destroy();
    });
  });
};

var Field = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-field" }, [_vm.title !== '' ? _c('div', { staticClass: "md-field-title" }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "md-field-content" }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'md-field',

  props: {
    title: {
      type: String,
      default: ''
    }
  }
};

function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FieldItem = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-field-item", class: [_vm.arrow ? 'has-arrow' : '', _vm.disabled ? 'disabled' : ''], attrs: { "name": _vm.name }, on: { "click": function click($event) {
          _vm.$_onItemClick($event, _vm.name);
        } } }, [_c('div', { staticClass: "md-field-item-inner" }, [_vm.$slots.left ? _c('div', { staticClass: "md-field-item-extra" }, [_vm._t("left")], 2) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "md-field-item-label", class: [_vm.solid ? 'solid' : ''] }, [_c('div', { staticClass: "md-field-item-title", domProps: { "innerHTML": _vm._s(_vm.title) } }), _vm._v(" "), _vm.brief ? _c('div', { staticClass: "md-field-item-brief", domProps: { "innerHTML": _vm._s(_vm.brief) } }) : _vm._e()]), _vm._v(" "), _vm.customized ? _c('div', { staticClass: "md-field-item-content", class: [_vm.align] }, [_vm._t("default")], 2) : _c('div', { staticClass: "md-field-item-content", class: [_vm.align] }, [_vm._v(" " + _vm._s(_vm.value) + " ")]), _vm._v(" "), _vm.$slots.right ? _c('div', { staticClass: "md-field-right" }, [_vm._t("right")], 2) : _vm.arrow ? _c('md-icon', { staticClass: "md-field-arrow", attrs: { "name": _vm.arrow, "size": "lg" } }) : _vm._e()], 1)]);
  }, staticRenderFns: [],
  name: 'md-field-item',

  components: _defineProperty$3({}, Icon.name, Icon),

  props: {
    name: {
      type: Number | String,
      default: function _default() {
        return 'field-item-' + parseInt(Math.pow(Math.random() * 10, 8));
      }
    },
    title: {
      type: String,
      default: ''
    },
    brief: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: String,
      default: ''
    },
    customized: {
      type: Boolean,
      default: function _default() {
        return !isEmptyObject(this.$slots);
      }
    },
    align: {
      // left, right, center
      type: String,
      default: 'left',
      validator: function validator(value) {
        return ['left', 'right', 'center'].indexOf(value) > -1;
      }
    },
    solid: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    // MARK: events handler
    $_onItemClick: function $_onItemClick(event, name) {
      if (this.disabled) {
        return;
      }
      this.$emit('click', name);
    }
  }
};

var Keyborad = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-number-keyboard-container", class: _vm.type }, [_c('div', { staticClass: "keyboard-number" }, [_c('ul', { staticClass: "keyboard-number-list" }, [_vm._l(9, function (n) {
      return _c('li', { key: n - 1, staticClass: "keyboard-number-item", domProps: { "textContent": _vm._s(_vm.keyNumberList[n - 1]) }, on: { "click": function click($event) {
            _vm.$_onNumberKeyClick($event, _vm.keyNumberList[n - 1]);
          } } });
    }), _vm._v(" "), _vm.type === 'professional' ? [_c('li', { staticClass: "keyboard-number-item", on: { "click": function click($event) {
          _vm.$_onNumberKeyClick($event, '.');
        } } }, [_vm._v(".")]), _vm._v(" "), _c('li', { staticClass: "keyboard-number-item", on: { "click": function click($event) {
          _vm.$_onNumberKeyClick($event, _vm.keyNumberList[9]);
        } } }, [_vm._v(_vm._s(_vm.keyNumberList[9]))]), _vm._v(" "), _vm.isView ? _c('li', { staticClass: "keyboard-number-item" }) : _c('li', { staticClass: "keyboard-number-item slidedown", on: { "click": function click($event) {
          _vm.$_onSlideDoneClick();
        } } })] : [_c('li', { staticClass: "keyboard-number-item no-bg" }), _vm._v(" "), _c('li', { staticClass: "keyboard-number-item", on: { "click": function click($event) {
          _vm.$_onNumberKeyClick($event, _vm.keyNumberList[9]);
        } } }, [_vm._v(_vm._s(_vm.keyNumberList[9]))]), _vm._v(" "), _c('li', { staticClass: "keyboard-number-item no-bg delete", on: { "click": function click($event) {
          _vm.$_onDeleteClick($event);
        } } })]], 2)]), _vm._v(" "), _vm.type === 'professional' ? _c('div', { staticClass: "keyboard-operate" }, [_c('ul', { staticClass: "keyboard-operate-list" }, [_c('li', { staticClass: "keyboard-operate-item delete", on: { "click": function click($event) {
          _vm.$_onDeleteClick($event);
        } } }), _vm._v(" "), _c('li', { staticClass: "keyboard-operate-item confirm", domProps: { "textContent": _vm._s(_vm.okText) }, on: { "click": function click($event) {
          _vm.$_onConfirmeClick();
        } } })])]) : _vm._e()]);
  }, staticRenderFns: [],
  name: 'md-number-keyboard-container',

  props: {
    type: {
      // simple, professional
      type: String,
      default: 'professional'
    },
    disorder: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String,
      default: '确定'
    },
    isView: {
      type: Boolean
    }
  },

  data: function data() {
    return {
      keyNumberList: []
    };
  },
  created: function created() {
    this.$_generateKeyNumber();
  },


  methods: {
    // MARK: private methods
    $_generateKeyNumber: function $_generateKeyNumber() {
      var baseStack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
      /* istanbul ignore next */
      if (this.disorder) {
        var count = 0;
        while (baseStack.length) {
          this.$set(this.keyNumberList, count, baseStack.splice(parseInt(Math.random() * baseStack.length), 1)[0] || 0);
          count++;
        }
      } else {
        this.keyNumberList = baseStack;
      }
    },


    // MARK: events handler, 如 $_onButtonClick
    $_onNumberKeyClick: function $_onNumberKeyClick(event, val) {
      event.stopImmediatePropagation();
      this.$emit('enter', val);
    },
    $_onDeleteClick: function $_onDeleteClick(event) {
      event.stopImmediatePropagation();
      this.$emit('delete');
    },
    $_onConfirmeClick: function $_onConfirmeClick() {
      this.$emit('confirm');
    },
    $_onSlideDoneClick: function $_onSlideDoneClick() {
      this.$emit('hide');
    }
  }
};

var _components;

function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NumberKeyboard = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-number-keyboard", class: { 'in-view': _vm.isView } }, [_vm.isView ? [_c('md-number-keyboard-container', { attrs: { "type": _vm.type, "disorder": _vm.disorder, "ok-text": _vm.okText, "is-view": _vm.isView }, on: { "enter": _vm.$_onEnter, "delete": _vm.$_onDelete, "confirm": _vm.$_onConfirm, "hide": function hide($event) {
          _vm.isKeyboardShow = false;
        } } })] : [_c('md-popup', { attrs: { "position": "bottom", "has-mask": false }, on: { "show": function show($event) {
          _vm.$emit('show');
        }, "hide": function hide($event) {
          _vm.$emit('hide');
        } }, model: { value: _vm.isKeyboardShow, callback: function callback($$v) {
          _vm.isKeyboardShow = $$v;
        }, expression: "isKeyboardShow" } }, [_c('md-number-keyboard-container', { attrs: { "type": _vm.type, "disorder": _vm.disorder, "ok-text": _vm.okText, "is-view": _vm.isView }, on: { "enter": _vm.$_onEnter, "delete": _vm.$_onDelete, "confirm": _vm.$_onConfirm, "hide": function hide($event) {
          _vm.isKeyboardShow = false;
        } } })], 1)]], 2);
  }, staticRenderFns: [],
  name: 'md-number-keyboard',

  components: (_components = {}, _defineProperty$4(_components, Popup.name, Popup), _defineProperty$4(_components, Keyborad.name, Keyborad), _components),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      // simple, professional
      type: String
    },
    isView: {
      type: Boolean,
      default: false
    },
    disorder: {
      type: Boolean
    },
    okText: {
      type: String
    }
  },

  data: function data() {
    return {
      isKeyboardShow: false
    };
  },


  watch: {
    value: function value(val) {
      this.isKeyboardShow = val;
    },
    isKeyboardShow: function isKeyboardShow(val) {
      this.$emit('input', val);
    }
  },

  mounted: function mounted() {
    this.value && (this.isKeyboardShow = this.value);
  },


  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onEnter: function $_onEnter(val) {
      this.$emit('enter', val);
    },
    $_onDelete: function $_onDelete() {
      this.$emit('delete');
    },
    $_onConfirm: function $_onConfirm() {
      this.$emit('confirm');
      this.hide();
    },


    // MARK: public methods
    show: function show() {
      /* istanbul ignore next */
      this.isKeyboardShow = true;
    },
    hide: function hide() {
      /* istanbul ignore next */
      this.isKeyboardShow = false;
    }
  }
};

/**
 * get position of input cursor
 */
function getCursorsPosition(ctrl) {
  /* istanbul ignore if */
  if (!ctrl) {
    return 0;
  }
  var CaretPos = 0; // IE Support
  /* istanbul ignore next */
  if (document.selection) {
    ctrl.focus();
    var Sel = document.selection.createRange();
    Sel.moveStart('character', -ctrl.value.length);
    CaretPos = Sel.text.length;
  } else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
    // Firefox support
    CaretPos = ctrl.selectionStart;
  }
  return CaretPos;
}

/**
 * set position of input cursor
 */
function setCursorsPosition(ctrl, pos) {
  /* istanbul ignore if */
  if (!ctrl) {
    return;
  }
  setTimeout(function () {
    /* istanbul ignore next */
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }, 0);
}

function formatValueByGapRule(gapRule, value) {
  var gap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
  var range = arguments[3];
  var isAdd = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var arr = value ? value.split('') : [];
  var showValue = '';
  var rule = [];
  gapRule.split('|').some(function (n, j) {
    rule[j] = +n + (rule[j - 1] ? +rule[j - 1] : 0);
  });
  var j = 0;
  arr.some(function (n, i) {
    // Remove the excess part
    if (i > rule[rule.length - 1] - 1) {
      return;
    }
    if (i > 0 && i === rule[j]) {
      showValue = showValue + gap + n;
      j++;
    } else {
      showValue = showValue + '' + n;
    }
  });
  var adapt = 0;
  rule.some(function (n, j) {
    if (range === +n + 1 + j) {
      adapt = 1 * isAdd;
    }
  });
  range = typeof range !== 'undefined' ? range === 0 ? 0 : range + adapt : showValue.length;
  return { value: showValue, range: range };
}

function formatValueByGapStep(step, value) {
  var gap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
  var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'right';
  var range = arguments[4];
  var isAdd = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var oldValue = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';

  if (value.length === 0) {
    return { value: value, range: range };
  }

  var arr = value && value.split('');
  var _range = range;
  var showValue = '';

  if (direction === 'right') {
    for (var j = arr.length - 1, k = 0; j >= 0; j--, k++) {
      var m = arr[j];
      showValue = k > 0 && k % step === 0 ? m + gap + showValue : m + '' + showValue;
    }
    if (isAdd === 1) {
      // 在添加的情况下，如果添加前字符串的长度减去新的字符串的长度为2，说明多了一个间隔符，需要调整range
      if (oldValue.length - showValue.length === -2) {
        _range = range + 1;
      }
    } else {
      // 在删除情况下，如果删除前字符串的长度减去新的字符串的长度为2，说明少了一个间隔符，需要调整range
      if (oldValue.length - showValue.length === 2) {
        _range = range - 1;
      }
      // 删除到最开始，range 保持 0
      if (_range <= 0) {
        _range = 0;
      }
    }
  } else {
    arr.some(function (n, i) {
      showValue = i > 0 && i % step === 0 ? showValue + gap + n : showValue + '' + n;
    });
    var adapt = range % (step + 1) === 0 ? 1 * isAdd : 0;
    _range = typeof range !== 'undefined' ? range === 0 ? 0 : range + adapt : showValue.length;
  }

  return { value: showValue, range: _range };
}

function trimValue(value) {
  var gap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

  value = typeof value === 'undefined' ? '' : value;
  var reg = new RegExp(gap, 'g');
  value = value.toString().replace(reg, '');
  return value;
}

var _components$1;

function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputItem = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-input-item", class: [_vm.isHighlight ? 'is-highlight' : '', _vm.isTitleLatent ? 'is-title-latent' : '', _vm.isInputActive ? 'active' : '', _vm.isInputFocus ? 'focus' : '', _vm.isInputError ? 'error' : '', _vm.clearable ? 'is-clear' : '', _vm.inputEnv, _vm.align, _vm.size] }, [_c('div', { staticClass: "md-input-item-container" }, [_vm.$slots.left ? _c('div', { staticClass: "md-input-item-extra" }, [_vm._t("left")], 2) : _vm._e(), _vm._v(" "), _vm.title !== '' ? _c('div', { staticClass: "md-input-item-title", class: { fixed: !_vm.isTitleLatent }, domProps: { "innerHTML": _vm._s(_vm.title) } }) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "md-input-item-control" }, [!_vm.isVirtualKeyboard ? [_vm.inputType === 'checkbox' ? _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.inputBindValue, expression: "inputBindValue" }], staticClass: "md-input-item-input", attrs: { "name": _vm.name, "placeholder": _vm.inputPlaceholder, "disabled": _vm.disabled, "readonly": _vm.readonly, "maxlength": _vm.isFormative ? '' : _vm.maxlength, "autocomplete": "off", "type": "checkbox" }, domProps: { "checked": Array.isArray(_vm.inputBindValue) ? _vm._i(_vm.inputBindValue, null) > -1 : _vm.inputBindValue }, on: { "focus": _vm.$_onFocus, "blur": _vm.$_onBlur, "keyup": _vm.$_onKeyup, "keydown": _vm.$_onKeydown, "input": _vm.$_onInput, "change": function change($event) {
          var $$a = _vm.inputBindValue,
              $$el = $event.target,
              $$c = $$el.checked ? true : false;if (Array.isArray($$a)) {
            var $$v = null,
                $$i = _vm._i($$a, $$v);if ($$el.checked) {
              $$i < 0 && (_vm.inputBindValue = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_vm.inputBindValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.inputBindValue = $$c;
          }
        } } }) : _vm.inputType === 'radio' ? _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.inputBindValue, expression: "inputBindValue" }], staticClass: "md-input-item-input", attrs: { "name": _vm.name, "placeholder": _vm.inputPlaceholder, "disabled": _vm.disabled, "readonly": _vm.readonly, "maxlength": _vm.isFormative ? '' : _vm.maxlength, "autocomplete": "off", "type": "radio" }, domProps: { "checked": _vm._q(_vm.inputBindValue, null) }, on: { "focus": _vm.$_onFocus, "blur": _vm.$_onBlur, "keyup": _vm.$_onKeyup, "keydown": _vm.$_onKeydown, "input": _vm.$_onInput, "change": function change($event) {
          _vm.inputBindValue = null;
        } } }) : _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.inputBindValue, expression: "inputBindValue" }], staticClass: "md-input-item-input", attrs: { "name": _vm.name, "placeholder": _vm.inputPlaceholder, "disabled": _vm.disabled, "readonly": _vm.readonly, "maxlength": _vm.isFormative ? '' : _vm.maxlength, "autocomplete": "off", "type": _vm.inputType }, domProps: { "value": _vm.inputBindValue }, on: { "focus": _vm.$_onFocus, "blur": _vm.$_onBlur, "keyup": _vm.$_onKeyup, "keydown": _vm.$_onKeydown, "input": [function ($event) {
          if ($event.target.composing) {
            return;
          }_vm.inputBindValue = $event.target.value;
        }, _vm.$_onInput] } })] : [_c('div', { staticClass: "md-input-item-fake", class: { 'focus': _vm.isInputFocus, 'disabled': _vm.disabled, 'readonly': _vm.readonly }, on: { "click": _vm.$_onFakeInputClick } }, [_c('span', { domProps: { "textContent": _vm._s(_vm.inputValue) } }), _vm._v(" "), _vm.inputValue === '' && _vm.inputPlaceholder !== '' ? _c('span', { staticClass: "md-input-item-fake-placeholder", domProps: { "textContent": _vm._s(_vm.inputPlaceholder) } }) : _vm._e()])], _vm._v(" "), !_vm.isTitleLatent && _vm.error !== '' ? _c('div', { staticClass: "md-input-item-msg", domProps: { "textContent": _vm._s(_vm.error) } }) : _vm._e(), _vm._v(" "), _vm.clearable && !_vm.disabled && !_vm.readonly ? _c('div', { directives: [{ name: "show", rawName: "v-show", value: !_vm.isInputEmpty, expression: "!isInputEmpty" }], staticClass: "md-input-item-clear", on: { "click": function click($event) {
          _vm.$_clearInput($event);
        } } }, [_c('md-icon', { attrs: { "name": "circle-cross" } })], 1) : _vm._e(), _vm._v(" "), _vm.$slots.right ? _c('div', { staticClass: "md-input-item-right" }, [_vm._t("right")], 2) : _vm._e()], 2)]), _vm._v(" "), _vm.isTitleLatent && _vm.error !== '' ? _c('div', { staticClass: "md-input-item-msg", domProps: { "textContent": _vm._s(_vm.error) } }) : _vm._e(), _vm._v(" "), _vm.isVirtualKeyboard ? _c('md-number-keyboard', { ref: "number-keyboard", staticClass: "md-input-item-number-keyboard", attrs: { "id": _vm.name + '-number-keyboard', "ok-text": _vm.virtualKeyboardOkText, "disorder": _vm.virtualKeyboardDisorder }, on: { "enter": _vm.$_onNumberKeyBoardEnter, "delete": _vm.$_onNumberKeyBoardDelete, "confirm": _vm.$_onNumberKeyBoardConfirm } }) : _vm._e()], 1);
  }, staticRenderFns: [],
  name: 'md-input-item',

  components: (_components$1 = {}, _defineProperty$5(_components$1, Icon.name, Icon), _defineProperty$5(_components$1, NumberKeyboard.name, NumberKeyboard), _components$1),

  props: {
    type: {
      // text, bankCard, password, phone, money, digit
      type: String,
      default: 'text'
    },
    name: {
      type: [String, Number],
      default: function _default() {
        return randomId('input-item');
      }
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number],
      default: ''
    },
    size: {
      // large, normal
      type: String,
      default: 'normal'
    },
    align: {
      // left, center, right
      type: String,
      default: 'left'
    },
    error: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    isVirtualKeyboard: {
      type: Boolean,
      default: false
    },
    virtualKeyboardDisorder: {
      type: Boolean
    },
    virtualKeyboardOkText: {
      type: String
    },
    isTitleLatent: {
      type: Boolean,
      default: false
    },
    isFormative: {
      type: Boolean,
      default: function _default() {
        var type = this.type;
        return type === 'bankCard' || type === 'phone' || type === 'money' || type === 'digit';
      }
    },
    isHighlight: {
      type: Boolean,
      default: false
    },
    formation: {
      type: Function,
      default: noop$1
    }
  },

  data: function data() {
    return {
      inputValue: '',
      inputBindValue: '',
      inputNumberKeyboard: '',
      isInputFocus: false
    };
  },


  computed: {
    inputEnv: function inputEnv() {
      /* istanbul ignore next */
      if (isIOS$1) {
        return 'is-ios';
      } else if (isAndroid$1) {
        return 'is-android';
      } else {
        return 'is-browser';
      }
    },
    inputType: function inputType() {
      var inputType = this.type || 'text';
      if (inputType === 'bankCard' || inputType === 'phone' || inputType === 'digit') {
        inputType = 'tel';
      }
      return inputType;
    },
    inputMaxLength: function inputMaxLength() {
      if (this.type === 'phone') {
        return 11;
      } else {
        return this.maxlength;
      }
    },
    inputPlaceholder: function inputPlaceholder() {
      return this.isTitleLatent && this.isInputActive ? '' : this.placeholder;
    },
    isInputActive: function isInputActive() {
      return !this.isInputEmpty || this.isInputFocus;
    },
    isInputEmpty: function isInputEmpty() {
      return !this.inputValue.length;
    },
    isInputError: function isInputError() {
      return !!this.error;
    }
  },

  watch: {
    value: function value(val) {
      this.inputValue = this.$_formateValue(this.$_subValue(val)).value;
    },
    inputValue: function inputValue(val) {
      this.inputBindValue = val;
      this.$emit('input', this.$_trimValue(val));
      this.$emit('change', this.name, this.$_trimValue(val));
    },
    isInputFocus: function isInputFocus(val) {
      if (!this.isVirtualKeyboard) {
        return;
      }
      if (val) {
        this.inputNumberKeyboard.show();
        this.$emit('focus', this.name);
      } else {
        this.inputNumberKeyboard.hide();
        this.$emit('blur', this.name);
      }
    }
  },

  created: function created() {
    this.inputValue = this.$_formateValue(this.$_subValue(this.value)).value;
  },
  mounted: function mounted() {
    this.isVirtualKeyboard && this.$_initNumberKeyBoard();
  },
  beforeDestroy: function beforeDestroy() {
    var keyboard = this.inputNumberKeyboard;
    if (keyboard && keyboard.$el) {
      document.body.removeChild(keyboard.$el);
    }
  },


  methods: {
    // MARK: private methods
    $_formateValue: function $_formateValue(curValue) {
      var curPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var type = this.type;
      var name = this.name;
      var oldValue = this.inputValue;
      var isAdd = oldValue.length > curValue.length ? -1 : 1;

      var formateValue = { value: curValue, range: curPos

        // no format
      };if (!this.isFormative || curValue === '') {
        return formateValue;
      }

      // custom format by user
      var customValue = this.formation(name, curValue, curPos);

      if (customValue) {
        return customValue;
      }

      // default format by component
      var gap = ' ';
      switch (type) {
        case 'bankCard':
          curValue = this.$_subValue(trimValue(curValue.replace(/\D/g, '')));
          formateValue = formatValueByGapStep(4, curValue, gap, 'left', curPos, isAdd, oldValue);
          break;
        case 'phone':
          curValue = this.$_subValue(trimValue(curValue.replace(/\D/g, '')));
          formateValue = formatValueByGapRule('3|4|4', curValue, gap, curPos, isAdd);
          break;
        case 'money':
          gap = ',';
          curValue = this.$_subValue(trimValue(curValue.replace(/[^\d.]/g, '')));
          // curValue = curValue.replace(/\D/g, '')
          var dotPos = curValue.indexOf('.');
          // format if no dot or new add dot or insert befor dot
          var moneyCurValue = curValue.split('.')[0];
          var moneyCurDecimal = ~dotPos ? '.' + curValue.split('.')[1] : '';

          formateValue = formatValueByGapStep(3, trimValue(moneyCurValue, gap), gap, 'right', curPos, isAdd, oldValue.split('.')[0]);
          formateValue.value += moneyCurDecimal;
          break;
        case 'digit':
          curValue = this.$_subValue(trimValue(curValue.replace(/\D/g, '')));
          formateValue.value = curValue;
          break;
        default:
          break;
      }

      return formateValue;
    },
    $_trimValue: function $_trimValue(val) {
      return trimValue(val, '\\s|,');
    },
    $_subValue: function $_subValue(val) {
      var len = this.inputMaxLength;
      if (len !== '') {
        return val.substring(0, len);
      } else {
        return val;
      }
    },
    $_clearInput: function $_clearInput() {
      event.stopImmediatePropagation();
      this.inputValue = '';
    },
    $_focusFakeInput: function $_focusFakeInput() {
      var _this = this;

      this.isInputFocus = true;

      this.$nextTick(function () {
        _this.$_addBlurListener();
      });
    },
    $_blurFakeInput: function $_blurFakeInput() {
      this.isInputFocus = false;
      this.$_removeBlurListener();
    },
    $_addBlurListener: function $_addBlurListener() {
      document.addEventListener('click', this.$_blurFakeInput, false);
    },
    $_removeBlurListener: function $_removeBlurListener() {
      document.removeEventListener('click', this.$_blurFakeInput, false);
    },
    $_initNumberKeyBoard: function $_initNumberKeyBoard() {
      var keyborad = this.$refs['number-keyboard'];
      this.inputNumberKeyboard = keyborad;
      document.body.appendChild(keyborad.$el);
    },


    // MARK: events handler
    $_onInput: function $_onInput(event) {
      var formateValue = this.$_formateValue(event.target.value, getCursorsPosition(event.target));

      this.inputValue = formateValue.value;
      this.inputBindValue = formateValue.value;

      if (this.isFormative) {
        this.$nextTick(function () {
          setCursorsPosition(event.target, formateValue.range);
        });
      }
    },
    $_onKeyup: function $_onKeyup(event) {
      this.$emit('keyup', this.name, event);
      if (+event.keyCode === 13 || +event.keyCode === 108) {
        this.$emit('confirm', this.name, this.inputValue);
      }
    },
    $_onKeydown: function $_onKeydown(event) {
      this.$emit('keydown', this.name, event);
    },
    $_onFocus: function $_onFocus() {
      this.isInputFocus = true;
      this.$emit('focus', this.name);
    },
    $_onBlur: function $_onBlur() {
      this.isInputFocus = false;
      this.$emit('blur', this.name);
    },
    $_onFakeInputClick: function $_onFakeInputClick(event) {
      if (this.disabled || this.readonly) {
        return;
      }

      this.$_blurFakeInput();

      if (!this.isInputFocus) {
        this.$_focusFakeInput(event);
      }
    },
    $_onNumberKeyBoardEnter: function $_onNumberKeyBoardEnter(val) {
      this.inputValue = this.$_formateValue(this.inputValue + val).value;
    },
    $_onNumberKeyBoardDelete: function $_onNumberKeyBoardDelete() {
      var inputValue = this.inputValue;
      if (inputValue === '') {
        return;
      }
      this.inputValue = this.$_formateValue(inputValue.substring(0, inputValue.length - 1)).value;
    },
    $_onNumberKeyBoardConfirm: function $_onNumberKeyBoardConfirm() {
      this.$emit('confirm', this.name, this.inputValue);
    },


    // MARK: public methods
    focus: function focus() {
      if (this.isVirtualKeyboard) {
        this.$_onFakeInputClick();
      } else {
        this.$el.querySelector('.md-input-item-input').focus();
      }
    },
    blur: function blur() {
      if (this.isVirtualKeyboard) {
        this.$_blurFakeInput();
      } else {
        this.$el.querySelector('.md-input-item-input').blur();
      }
    },
    getValue: function getValue() {
      return this.inputValue;
    }
  }
};

var _components$2;

function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Radio = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-radio" }, [_c('md-field', [_vm._l(_vm.options, function (item, index) {
      return [_c('md-field-item', { key: index, staticClass: "md-radio-item", class: { 'selected': _vm.$_isSelectedIndex(index) || _vm.$_isSelectedValue(item.value || item.text || item.label, index), 'icon-left': _vm.iconPosition === 'left' }, attrs: { "title": "", "disabled": _vm.$_isInvalidIndex(item, index), "customized": "" }, on: { "click": function click($event) {
            _vm.$_onItemClick(item, index);
          } } }, [_vm.hasSlot ? [_c('div', { staticClass: "md-radio-content" }, [_vm._t("default", null, { option: item })], 2)] : [_c('div', { staticClass: "md-radio-content", domProps: { "innerHTML": _vm._s(_vm.$_getItemText(item)) } })], _vm._v(" "), _vm.$_isSelectedIndex(index) || _vm.$_isSelectedValue(item.value || item.text || item.label, index) ? [_vm.icon ? _c('md-icon', { attrs: { "name": _vm.icon, "size": _vm.iconSize } }) : _vm._e()] : [_vm.iconInverse ? _c('md-icon', { attrs: { "name": _vm.iconInverse, "size": _vm.iconSize } }) : _vm._e()]], 2)];
    }), _vm._v(" "), _vm.hasInputOption ? _c('md-input-item', { ref: "inputItem", class: { 'selected': _vm.$_isSelectedIndex(_vm.options.length) }, attrs: { "title": _vm.inputOptionLabel, "placeholder": _vm.inputOptionPlaceholder }, on: { "focus": function focus($event) {
          _vm.$_onItemFocus(_vm.options.length);
        } }, model: { value: _vm.inputOptionValue, callback: function callback($$v) {
          _vm.inputOptionValue = $$v;
        }, expression: "inputOptionValue" } }) : _vm._e()], 2)], 1);
  }, staticRenderFns: [],
  name: 'md-radio',

  components: (_components$2 = {}, _defineProperty$6(_components$2, Field.name, Field), _defineProperty$6(_components$2, FieldItem.name, FieldItem), _defineProperty$6(_components$2, InputItem.name, InputItem), _defineProperty$6(_components$2, Icon.name, Icon), _components$2),

  props: {
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultIndex: {
      type: Number,
      default: -1
    },
    defaultValue: {
      type: String,
      default: ''
    },
    invalidIndex: {
      type: [Number, Array],
      default: function _default() {
        return [];
      }
    },
    hasInputOption: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    inputOptionLabel: {
      type: String,
      default: ''
    },
    inputOptionPlaceholder: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'right'
    },
    iconInverse: {
      type: String,
      default: ''
    },
    iconSize: {
      type: String,
      default: 'sm'
    },
    iconPosition: {
      type: String,
      default: 'right'
    },
    optionRender: {
      type: Function,
      default: noop$1
    },
    isSlotScope: {
      type: Boolean,
      default: undefined
    }
  },

  data: function data() {
    return {
      selectedIndex: this.defaultIndex,
      inputOptionValue: ''
    };
  },


  computed: {
    hasSlot: function hasSlot() {
      return this.isSlotScope !== undefined ? this.isSlotScope : !!this.$scopedSlots.default;
    }
  },

  watch: {
    options: {
      handler: function handler(val, oldVal) {
        if (!compareObjects(val, oldVal)) {
          this.$_initSelected();
        }
      },

      deep: true
    },
    inputOptionValue: function inputOptionValue(val) {
      this.$emit('input', val);
    }
  },

  created: function created() {
    this.$_initSelected();
  },


  methods: {
    // MARK: private methods
    $_initSelected: function $_initSelected() {
      var defaultIndex = this.defaultIndex;
      var invalidIndex = this.invalidIndex;
      var item = this.options[defaultIndex];

      /* istanbul ignore next */
      if (defaultIndex === -1) {
        return;
      } else if (this.value !== '') {
        return;
      }

      /* istanbul ignore else */
      if (item && !item.disabled && !inArray(invalidIndex, defaultIndex)) {
        this.selectedIndex = this.defaultIndex;
      } else {
        warn$2('radio option represented by the default-index is invalid');
      }
    },
    $_isInvalidIndex: function $_isInvalidIndex(item, index) {
      return inArray(this.invalidIndex, index) || item.disabled;
    },
    $_isSelectedIndex: function $_isSelectedIndex(index) {
      return index === this.selectedIndex;
    },
    $_isSelectedValue: function $_isSelectedValue(value, index) {
      var invalidIndex = this.invalidIndex;
      if (value === this.value) {
        if (!inArray(invalidIndex, index)) {
          this.selectedIndex = index;
          return true;
        } else {
          this.$emit('input', '');
          warn$2('radio option represented by the initial value is invalid');
          return false;
        }
      } else {
        return false;
      }
    },
    $_getItemText: function $_getItemText(item) {
      return this.optionRender(item) || item.text || item.label;
    },


    // MARK: events handler
    $_onItemClick: function $_onItemClick(item, index) {
      this.selectedIndex = index;
      this.$emit('input', item.value || item.text || item.label);
      this.$emit('change', item, index);
    },
    $_onItemFocus: function $_onItemFocus(index) {
      this.selectedIndex = index;
      this.$emit('input', this.inputOptionValue);
      this.$emit('change', {
        text: this.inputOptionValue
      }, index);
    },


    // MARK: public methods
    getSelectedValue: function getSelectedValue() {
      var item = void 0;
      if (this.hasInputOption && this.selectedIndex === this.options.length) {
        item = this.inputOptionValue;
      } else {
        item = this.options[this.selectedIndex];
      }
      return item;
    },
    getSelectedIndex: function getSelectedIndex() {
      return this.selectedIndex;
    },
    selectByIndex: function selectByIndex(index) {
      if (index > this.options.length || inArray(this.invalidIndex, index)) {
        return;
      }

      if (index === this.options.length && this.hasInputOption) {
        this.selectedIndex = index;
        this.$refs['inputItem'].focus();
      } else {
        this.$_onItemClick(this.options[index], index);
      }
    }
  }
};

var _components$3;

function _defineProperty$7(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DropMenu = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-drop-menu" }, [_c('div', { staticClass: "md-drop-menu-bar" }, [_vm._l(_vm.data, function (item, index) {
      return [_c('div', { key: index, staticClass: "bar-item", class: { active: index === _vm.activeMenuBarIndex, selected: _vm.$_checkBarItemSelect(index), disabled: item.disabled }, on: { "click": function click($event) {
            _vm.$_onBarItemClick(item, index);
          } } }, [_c('span', { domProps: { "textContent": _vm._s(_vm.$_getBarItemText(item, index)) } })])];
    })], 2), _vm._v(" "), _c('md-popup', { attrs: { "position": "top", "prevent-scroll": "", "prevent-scroll-exclude": _vm.scroller }, on: { "show": _vm.$_onListShow, "hide": _vm.$_onListHide }, model: { value: _vm.isPopupShow, callback: function callback($$v) {
          _vm.isPopupShow = $$v;
        }, expression: "isPopupShow" } }, [_c('div', { staticClass: "md-drop-menu-list" }, [_c('md-radio', { attrs: { "options": _vm.activeMenuListData, "optionRender": _vm.optionRender, "is-slot-scope": _vm.hasSlot }, on: { "change": _vm.$_onListItemClick }, scopedSlots: _vm._u([{ key: "default", fn: function fn(_ref) {
          var option = _ref.option;
          return [_vm._t("default", null, { option: option })];
        } }]), model: { value: _vm.selectedMenuListValue[_vm.activeMenuBarIndex], callback: function callback($$v) {
          _vm.$set(_vm.selectedMenuListValue, _vm.activeMenuBarIndex, $$v);
        }, expression: "selectedMenuListValue[activeMenuBarIndex]" } })], 1)])], 1);
  }, staticRenderFns: [],
  name: 'md-drop-menu',

  components: (_components$3 = {}, _defineProperty$7(_components$3, Popup.name, Popup), _defineProperty$7(_components$3, Radio.name, Radio), _components$3),

  props: {
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultValue: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    optionRender: {
      type: Function,
      default: noop$1
    }
  },

  data: function data() {
    return {
      isPopupShow: false,
      selectedMenuListItem: [],
      selectedMenuListValue: [],
      selectedMenuListIndex: [],
      activeMenuBarIndex: -1,
      activeMenuListData: [],
      scroller: ''
    };
  },


  computed: {
    hasSlot: function hasSlot() {
      return !!this.$scopedSlots.default;
    }
  },

  watch: {
    data: function data(val, oldVal) {
      // Avoid  Literals
      /* istanbul ignore if  */
      if (!compareObjects(val, oldVal)) {
        this.$_initSelectedBar();
      }
    },
    defaultValue: function defaultValue(val, oldVal) {
      /* istanbul ignore if  */
      if (!compareObjects(val, oldVal)) {
        this.$_initSelectedBar();
      }
    }
  },

  mounted: function mounted() {
    this.$_initSelectedBar();
  },


  methods: {
    // MARK: private methods
    $_initSelectedBar: function $_initSelectedBar() {
      var _this = this;

      this.selectedMenuListValue = this.defaultValue;
      traverse$1(this.data, ['options'], function (item, level, indexs) {
        var barItemIndex = indexs[0];
        var defaultValue = _this.defaultValue[barItemIndex];
        if (defaultValue !== undefined && (item.value === defaultValue || item.text === defaultValue || item.label === defaultValue)) {
          _this.$set(_this.selectedMenuListItem, barItemIndex, item);
          return 2;
        }
      });
    },
    $_checkBarItemSelect: function $_checkBarItemSelect(index) {
      return !!(this.selectedMenuListItem[index] !== undefined || this.defaultValue[index]);
    },
    $_getBarItemText: function $_getBarItemText(item, index) {
      return this.selectedMenuListItem[index] !== undefined ? this.selectedMenuListItem[index].text : item.text;
    },
    $_setScroller: function $_setScroller() {
      var boxer = this.$el ? this.$el.querySelector('.md-popup-box') : null;
      if (boxer && boxer.clientHeight >= this.$el.clientHeight) {
        this.scroller = '.md-field-content';
      } else {
        return '';
      }
    },


    // MARK: events handler
    $_onBarItemClick: function $_onBarItemClick(barItem, index) {
      /* istanbul ignore if  */
      if (!barItem || barItem.disabled) {
        return;
      }

      if (!this.isPopupShow) {
        this.isPopupShow = true;
        this.activeMenuBarIndex = index;
        this.activeMenuListData = barItem.options;
      } else {
        this.isPopupShow = false;
      }
    },
    $_onListItemClick: function $_onListItemClick(listItem) {
      var activeMenuBarIndex = this.activeMenuBarIndex;
      var barItem = this.data[activeMenuBarIndex];
      this.isPopupShow = false;
      this.$set(this.selectedMenuListItem, activeMenuBarIndex, listItem);
      this.$emit('change', barItem, listItem);
    },
    $_onListShow: function $_onListShow() {
      /* istanbul ignore next  */
      this.$_setScroller();
      this.$emit('show');
    },
    $_onListHide: function $_onListHide() {
      /* istanbul ignore next  */
      this.activeMenuBarIndex = -1;
      /* istanbul ignore next  */
      this.$emit('hide');
    },


    // MARK: public methods
    getSelectedValues: function getSelectedValues() {
      return this.selectedMenuListItem;
    },
    getSelectedValue: function getSelectedValue(index) {
      return this.selectedMenuListItem[index];
    }
  }
};

function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var TabBar = {
  name: 'md-tab-bar',

  props: {
    titles: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    showInkBar: {
      type: Boolean,
      default: true
    },
    inkBarLength: {
      type: Number,
      default: 70,
      validator: function validator(length) {
        return length > 0 && length <= 100;
      }
    },
    inkBarAnimate: {
      type: Boolean,
      default: true
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    forceUseArray: {
      type: Boolean,
      default: undefined
    }
  },

  data: function data() {
    return {
      activeIndex: this.defaultIndex
    };
  },


  watch: {
    defaultIndex: function defaultIndex(val) {
      this.selectTab(val);
    },
    activeIndex: function activeIndex(val, preVal) {
      this.$emit('indexChanged', val, preVal);
    }
  },

  mounted: function mounted() {
    this.selectTab(this.activeIndex);
  },


  methods: {
    // MARK: private methods
    $_onSelectTab: function $_onSelectTab(index) {
      this.selectTab(index);
    },


    // MARK: public methods
    selectTab: function selectTab(i) {
      var index = parseInt(i);
      if (index >= 0 && index < this.titleList().length) {
        this.activeIndex = index;
      }
    },
    titleList: function titleList() {
      if (this.titles && this.titles.length) {
        return this.titles;
      } else if (this.$slots.default && this.$slots.default.length) {
        return this.$slots.default.filter(function (el) {
          return el.tag;
        });
      } else {
        return [];
      }
    }
  },

  render: function render(createElement) {
    var _this = this;

    var self = this;
    var tabTitles = [];
    var mapper = function mapper(item, index) {
      return createElement('div', {
        class: {
          'md-tab-title': true,
          active: _this.activeIndex === index
        },
        on: {
          click: function click() {
            self.$_onSelectTab(index);
          }
        }
      }, [(_this.forceUseArray !== undefined ? _this.forceUseArray : !!_this.$scopedSlots.title) ? _this.$scopedSlots.title(item) : item]);
    };

    tabTitles = this.titleList().map(mapper);

    var innerElements = [].concat(_toConsumableArray$1(tabTitles));
    if (this.showInkBar) {
      var padPercent = (100 - this.inkBarLength) / 2;
      var width = this.inkBarLength / tabTitles.length;
      var pad = padPercent / tabTitles.length;
      var offset = this.activeIndex * 100 / tabTitles.length + pad;

      innerElements.push(createElement('div', {
        class: {
          'ink-bar': true,
          'animate': this.inkBarAnimate
        },
        style: {
          width: width + '%',
          left: offset + '%'
        }
      }));
    }

    return createElement('div', {
      class: {
        'md-tab-bar': true
      }
    }, [createElement('div', {
      class: {
        'md-tab-titles-wrpper': true
      }
    }, innerElements)]);
  }
};

var Animate = function (global) {
  var time = Date.now || function () {
    return +new Date();
  };
  var desiredFrames = 60;
  var millisecondsPerSecond = 1000;

  var running = {};
  var counter = 1;

  return {
    /**
     * A requestAnimationFrame wrapper / polyfill.
     *
     * @param callback {Function} The callback to be invoked before the next repaint.
     * @param root {HTMLElement} The root element for the repaint
     */
    requestAnimationFrame: function () {
      // Check for request animation Frame support
      var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame;
      var isNative = !!requestFrame;

      if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
        isNative = false;
      }

      if (isNative) {
        return function (callback, root) {
          requestFrame(callback, root);
        };
      }

      var TARGET_FPS = 60;
      var requests = {};
      var rafHandle = 1;
      var intervalHandle = null;
      var lastActive = +new Date();

      return function (callback) {
        var callbackHandle = rafHandle++;

        // Store callback
        requests[callbackHandle] = callback;
        if (intervalHandle === null) {
          intervalHandle = setInterval(function () {
            var time = +new Date();
            var currentRequests = requests;

            // Reset data structure before executing callbacks
            requests = {};
            for (var key in currentRequests) {
              if (currentRequests.hasOwnProperty(key)) {
                currentRequests[key](time);
                lastActive = time;
              }
            }

            // Disable the timeout when nothing happens for a certain
            // period of time
            if (time - lastActive > 2500) {
              clearInterval(intervalHandle);
              intervalHandle = null;
            }
          }, 1000 / TARGET_FPS);
        }

        return callbackHandle;
      };
    }(),

    /**
     * Stops the given animation.
     *
     * @param id {Integer} Unique animation ID
     * @return {Boolean} Whether the animation was stopped (aka, was running before)
     */
    stop: function stop(id) {
      var cleared = running[id] != null;
      cleared && (running[id] = null);
      return cleared;
    },


    /**
     * Whether the given animation is still running.
     *
     * @param id {Integer} Unique animation ID
     * @return {Boolean} Whether the animation is still running
     */
    isRunning: function isRunning(id) {
      return running[id] != null;
    },


    /**
     * Start the animation.
     *
     * @param stepCallback {Function} Pointer to function which is executed on every step.
     *   Signature of the method should be `function(percent, now, virtual) { return continueWithAnimation; }`
     * @param verifyCallback {Function} Executed before every animation step.
     *   Signature of the method should be `function() { return continueWithAnimation; }`
     * @param completedCallback {Function}
     *   Signature of the method should be `function(droppedFrames, finishedAnimation) {}`
     * @param duration {Integer} Milliseconds to run the animation
     * @param easingMethod {Function} Pointer to easing function
     *   Signature of the method should be `function(percent) { return modifiedValue; }`
     * @param root {Element ? document.body} Render root, when available. Used for internal
     *   usage of requestAnimationFrame.
     * @return {Integer} Identifier of animation. Can be used to stop it any time.
     */
    start: function start(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
      var _this = this;

      var start = time();
      var lastFrame = start;
      var percent = 0;
      var dropCounter = 0;
      var id = counter++;

      if (!root) {
        root = document.body;
      }

      // Compacting running db automatically every few new animations
      if (id % 20 === 0) {
        var newRunning = {};
        for (var usedId in running) {
          newRunning[usedId] = true;
        }
        running = newRunning;
      }

      // This is the internal step method which is called every few milliseconds
      var step = function step(virtual) {
        // Normalize virtual value
        var render = virtual !== true;

        // Get current time
        var now = time();

        // Verification is executed before next animation step
        if (!running[id] || verifyCallback && !verifyCallback(id)) {
          running[id] = null;
          completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
          return;
        }

        // For the current rendering to apply let's update omitted steps in memory.
        // This is important to bring internal state variables up-to-date with progress in time.
        if (render) {
          var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
          for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
            step(true);
            dropCounter++;
          }
        }

        // Compute percent value
        if (duration) {
          percent = (now - start) / duration;
          if (percent > 1) {
            percent = 1;
          }
        }

        // Execute step callback, then...
        var value = easingMethod ? easingMethod(percent) : percent;
        value = isNaN(value) ? 0 : value;
        if ((stepCallback(value, now, render) === false || percent === 1) && render) {
          running[id] = null;
          completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration == null);
        } else if (render) {
          lastFrame = now;
          _this.requestAnimationFrame(step, root);
        }
      };

      // Mark as running
      running[id] = true;

      // Init first step
      this.requestAnimationFrame(step, root);

      // Return unique animation ID
      return id;
    }
  };
}(window);

var easeOutCubic = function easeOutCubic(pos) {
  return Math.pow(pos - 1, 3) + 1;
};

var easeInOutCubic = function easeInOutCubic(pos) {
  if ((pos /= 0.5) < 1) {
    return 0.5 * Math.pow(pos, 3);
  }

  return 0.5 * (Math.pow(pos - 2, 3) + 2);
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Based on the work of: Scroller
 * http://github.com/zynga/scroller
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 */
var members = {
  _isSingleTouch: false,
  _isTracking: false,
  _didDecelerationComplete: false,
  _isGesturing: false,
  _isDragging: false,
  _isDecelerating: false,
  _isAnimating: false,
  _clientLeft: 0,
  _clientTop: 0,
  _clientWidth: 0,
  _clientHeight: 0,
  _contentWidth: 0,
  _contentHeight: 0,
  _snapWidth: 100,
  _snapHeight: 100,
  _refreshHeight: null,
  _refreshActive: false,
  _refreshActivate: null,
  _refreshDeactivate: null,
  _refreshStart: null,
  _zoomLevel: 1,
  _scrollLeft: 0,
  _scrollTop: 0,
  _maxScrollLeft: 0,
  _maxScrollTop: 0,
  _scheduledLeft: 0,
  _scheduledTop: 0,
  _lastTouchLeft: null,
  _lastTouchTop: null,
  _lastTouchMove: null,
  _positions: null,
  _minDecelerationScrollLeft: null,
  _minDecelerationScrollTop: null,
  _maxDecelerationScrollLeft: null,
  _maxDecelerationScrollTop: null,
  _decelerationVelocityX: null,
  _decelerationVelocityY: null
};

var Scroller = function () {
  function Scroller() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop$1;
    var options = arguments[1];

    _classCallCheck(this, Scroller);

    this.options = {
      scrollingX: true,
      scrollingY: true,
      animating: true,
      animationDuration: 250,
      bouncing: true,
      locking: true,
      paging: false,
      snapping: false,
      zooming: false,
      minZoom: 0.5,
      maxZoom: 3,
      speedMultiplier: 1,
      scrollingComplete: noop$1,
      penetrationDeceleration: 0.03,
      penetrationAcceleration: 0.08
    };
    extend$2(this.options, options);
    this._callback = callback;
  }

  /**
   * Configures the dimensions of the client (outer) and content (inner) elements.
   * Requires the available space for the outer element and the outer size of the inner element.
   * All values which are falsy (null or zero etc.) are ignored and the old value is kept.
   *
   * @param clientWidth {Integer ? null} Inner width of outer element
   * @param clientHeight {Integer ? null} Inner height of outer element
   * @param contentWidth {Integer ? null} Outer width of inner element
   * @param contentHeight {Integer ? null} Outer height of inner element
   */


  _createClass(Scroller, [{
    key: 'setDimensions',
    value: function setDimensions(clientWidth, clientHeight, contentWidth, contentHeight) {
      // Only update values which are defined
      if (clientWidth === +clientWidth) {
        this._clientWidth = clientWidth;
      }

      if (clientHeight === +clientHeight) {
        this._clientHeight = clientHeight;
      }

      if (contentWidth === +contentWidth) {
        this._contentWidth = contentWidth;
      }

      if (contentHeight === +contentHeight) {
        this._contentHeight = contentHeight;
      }

      // Refresh maximums
      this._computeScrollMax();

      // Refresh scroll position
      this.scrollTo(this._scrollLeft, this._scrollTop, true);
    }

    /**
     * Sets the client coordinates in relation to the document.
     *
     * @param left {Integer ? 0} Left position of outer element
     * @param top {Integer ? 0} Top position of outer element
     */

  }, {
    key: 'setPosition',
    value: function setPosition(left, top) {
      this._clientLeft = left || 0;
      this._clientTop = top || 0;
    }

    /**
     * Configures the snapping (when snapping is active)
     *
     * @param width {Integer} Snapping width
     * @param height {Integer} Snapping height
     */

  }, {
    key: 'setSnapSize',
    value: function setSnapSize(width, height) {
      this._snapWidth = width;
      this._snapHeight = height;
    }

    /**
     * Returns the scroll position and zooming values
     *
     * @return {Map} `left` and `top` scroll position and `zoom` level
     */

  }, {
    key: 'getValues',
    value: function getValues() {
      return {
        left: this._scrollLeft,
        top: this._scrollTop,
        zoom: this._zoomLevel
      };
    }

    /**
     * Returns the maximum scroll values
     *
     * @return {Map} `left` and `top` maximum scroll values
     */

  }, {
    key: 'getScrollMax',
    value: function getScrollMax() {
      return {
        left: this._maxScrollLeft,
        top: this._maxScrollTop
      };
    }

    /**
     * Activates pull-to-refresh. A special zone on the top of the list to start a list refresh whenever
     * the user event is released during visibility of this zone. This was introduced by some apps on iOS like
     * the official Twitter client.
     *
     * @param height {Integer} Height of pull-to-refresh zone on top of rendered list
     * @param activateCallback {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release.
     * @param deactivateCallback {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled.
     * @param startCallback {Function} Callback to execute to start the real async refresh action. Call {@link #finishPullToRefresh} after finish of refresh.
     */

  }, {
    key: 'activatePullToRefresh',
    value: function activatePullToRefresh(height, activateCallback, deactivateCallback, startCallback) {
      this._refreshHeight = height;
      this._refreshActivate = activateCallback;
      this._refreshDeactivate = deactivateCallback;
      this._refreshStart = startCallback;
    }

    /**
     * Starts pull-to-refresh manually.
     */

  }, {
    key: 'triggerPullToRefresh',
    value: function triggerPullToRefresh() {
      // Use publish instead of scrollTo to allow scrolling to out of boundary position
      // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
      this._publish(this._scrollLeft, -this._refreshHeight, this._zoomLevel, true);

      if (this._refreshStart) {
        this._refreshStart();
      }
    }

    /**
     * Signalizes that pull-to-refresh is finished.
     */

  }, {
    key: 'finishPullToRefresh',
    value: function finishPullToRefresh() {
      this._refreshActive = false;

      if (this._refreshDeactivate) {
        this._refreshDeactivate();
      }

      this.scrollTo(this._scrollLeft, this._scrollTop, true);
    }

    /**
     * Scrolls to the given position. Respect limitations and snapping automatically.
     *
     * @param left {Number?null} Horizontal scroll position, keeps current if value is <code>null</code>
     * @param top {Number?null} Vertical scroll position, keeps current if value is <code>null</code>
     * @param animate {Boolean?false} Whether the scrolling should happen using an animation
     * @param zoom {Number?null} Zoom level to go to
     */

  }, {
    key: 'scrollTo',
    value: function scrollTo(left, top, animate) {
      var zoom = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      // Stop deceleration
      if (this._isDecelerating) {
        Animate.stop(this._isDecelerating);
        this._isDecelerating = false;
      }

      // Correct coordinates based on new zoom level
      if (zoom != null && zoom !== this._zoomLevel) {
        if (!this.options.zooming) {
          warn$2('Zooming is not enabled!');
        }
        zoom = zoom ? zoom : 1;
        left *= zoom;
        top *= zoom;

        // // Recompute maximum values while temporary tweaking maximum scroll ranges
        this._computeScrollMax(zoom);
      } else {
        // Keep zoom when not defined
        zoom = this._zoomLevel;
      }

      if (!this.options.scrollingX) {
        left = this._scrollLeft;
      } else {
        if (this.options.paging) {
          left = Math.round(left / this._clientWidth) * this._clientWidth;
        } else if (this.options.snapping) {
          left = Math.round(left / this._snapWidth) * this._snapWidth;
        }
      }

      if (!this.options.scrollingY) {
        top = this._scrollTop;
      } else {
        if (this.options.paging) {
          top = Math.round(top / this._clientHeight) * this._clientHeight;
        } else if (this.options.snapping) {
          top = Math.round(top / this._snapHeight) * this._snapHeight;
        }
      }

      // Limit for allowed ranges
      left = Math.max(Math.min(this._maxScrollLeft, left), 0);
      top = Math.max(Math.min(this._maxScrollTop, top), 0);

      // Don't animate when no change detected, still call publish to make sure
      // that rendered position is really in-sync with internal data
      if (left === this._scrollLeft && top === this._scrollTop) {
        animate = false;
      }

      // Publish new values
      if (!this._isTracking) {
        this._publish(left, top, zoom, animate);
      }
    }

    /**
     * Zooms to the given level. Supports optional animation. Zooms
     * the center when no coordinates are given.
     *
     * @param level {Number} Level to zoom to
     * @param animate {Boolean ? false} Whether to use animation
     * @param originLeft {Number ? null} Zoom in at given left coordinate
     * @param originTop {Number ? null} Zoom in at given top coordinate
     * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
     */

  }, {
    key: 'zoomTo',
    value: function zoomTo(level, animate, originLeft, originTop, callback) {
      if (!this.options.zooming) {
        warn$2('Zooming is not enabled!');
      }

      // Add callback if exists
      if (callback) {
        this._zoomComplete = callback;
      }

      // Stop deceleration
      if (this._isDecelerating) {
        Animate.stop(this._isDecelerating);
        this._isDecelerating = false;
      }

      var oldLevel = this._zoomLevel;

      // Normalize input origin to center of viewport if not defined
      if (originLeft == null) {
        originLeft = this._clientWidth / 2;
      }

      if (originTop == null) {
        originTop = this._clientHeight / 2;
      }

      // Limit level according to configuration
      level = Math.max(Math.min(level, this.options.maxZoom), this.options.minZoom);

      // Recompute maximum values while temporary tweaking maximum scroll ranges
      this._computeScrollMax(level);

      // Recompute left and top coordinates based on new zoom level
      var left = (originLeft + this._scrollLeft) * level / oldLevel - originLeft;
      var top = (originTop + this._scrollTop) * level / oldLevel - originTop;

      // Limit x-axis
      if (left > this._maxScrollLeft) {
        left = this._maxScrollLeft;
      } else if (left < 0) {
        left = 0;
      }

      // Limit y-axis
      if (top > this._maxScrollTop) {
        top = this._maxScrollTop;
      } else if (top < 0) {
        top = 0;
      }

      // Push values out
      this._publish(left, top, level, animate);
    }
  }, {
    key: 'doTouchStart',
    value: function doTouchStart(touches, timeStamp) {
      // Array-like check is enough here
      if (touches.length == null) {
        warn$2('Invalid touch list: ' + touches);
      }
      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }
      if (typeof timeStamp !== 'number') {
        warn$2('Invalid timestamp value: ' + timeStamp);
      }

      // Reset interruptedAnimation flag
      this._interruptedAnimation = true;

      // Stop deceleration
      if (this._isDecelerating) {
        Animate.stop(this._isDecelerating);
        this._isDecelerating = false;
        this._interruptedAnimation = true;
      }

      // Stop animation
      if (this._isAnimating) {
        Animate.stop(this._isAnimating);
        this._isAnimating = false;
        this._interruptedAnimation = true;
      }

      // Use center point when dealing with two fingers
      var isSingleTouch = touches.length === 1;
      var currentTouchLeft = void 0,
          currentTouchTop = void 0;

      if (isSingleTouch) {
        currentTouchLeft = touches[0].pageX;
        currentTouchTop = touches[0].pageY;
      } else {
        currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
        currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
      }

      // Store initial positions
      this._initialTouchLeft = currentTouchLeft;
      this._initialTouchTop = currentTouchTop;

      // Store current zoom level
      this._zoomLevelStart = this._zoomLevel;

      // Store initial touch positions
      this._lastTouchLeft = currentTouchLeft;
      this._lastTouchTop = currentTouchTop;

      // Store initial move time stamp
      this._lastTouchMove = timeStamp;

      // Reset initial scale
      this._lastScale = 1;

      // Reset locking flags
      this._enableScrollX = !isSingleTouch && this.options.scrollingX;
      this._enableScrollY = !isSingleTouch && this.options.scrollingY;

      // Reset tracking flag
      this._isTracking = true;

      // Reset deceleration complete flag
      this._didDecelerationComplete = false;

      // Dragging starts directly with two fingers, otherwise lazy with an offset
      this._isDragging = !isSingleTouch;

      // Some features are disabled in multi touch scenarios
      this._isSingleTouch = isSingleTouch;

      // Clearing data structure
      this._positions = [];
    }
  }, {
    key: 'doTouchMove',
    value: function doTouchMove(touches, timeStamp, scale) {
      // Array-like check is enough here
      if (touches.length == null) {
        warn$2('Invalid touch list: ' + touches);
      }

      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }

      if (typeof timeStamp !== 'number') {
        warn$2('Invalid timestamp value: ' + timeStamp);
      }

      // Ignore event when tracking is not enabled (event might be outside of element)
      if (!this._isTracking) {
        return;
      }

      var currentTouchLeft = void 0,
          currentTouchTop = void 0;

      // Compute move based around of center of fingers
      if (touches.length === 2) {
        currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
        currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
      } else {
        currentTouchLeft = touches[0].pageX;
        currentTouchTop = touches[0].pageY;
      }

      var positions = this._positions;

      // Are we already is dragging mode?
      if (this._isDragging) {
        // Compute move distance
        var moveX = currentTouchLeft - this._lastTouchLeft;
        var moveY = currentTouchTop - this._lastTouchTop;

        // Read previous scroll position and zooming
        var scrollLeft = this._scrollLeft;
        var scrollTop = this._scrollTop;
        var level = this._zoomLevel;

        // Work with scaling
        if (scale != null && this.options.zooming) {
          var oldLevel = level;

          // Recompute level based on previous scale and new scale
          level = level / this.__lastScale * scale;

          // Limit level according to configuration
          level = Math.max(Math.min(level, this.options.maxZoom), this.options.minZoom);

          // Only do further compution when change happened
          if (oldLevel !== level) {
            // Compute relative event position to container
            var currentTouchLeftRel = currentTouchLeft - this._clientLeft;
            var currentTouchTopRel = currentTouchTop - this._clientTop;

            // Recompute left and top coordinates based on new zoom level
            scrollLeft = (currentTouchLeftRel + scrollLeft) * level / oldLevel - currentTouchLeftRel;
            scrollTop = (currentTouchTopRel + scrollTop) * level / oldLevel - currentTouchTopRel;

            // Recompute max scroll values
            this.__computeScrollMax(level);
          }
        }

        if (this._enableScrollX) {
          scrollLeft -= moveX * this.options.speedMultiplier;
          var maxScrollLeft = this._maxScrollLeft;

          if (scrollLeft > maxScrollLeft || scrollLeft < 0) {
            // Slow down on the edges
            if (this.options.bouncing) {
              scrollLeft += moveX / 2 * this.options.speedMultiplier;
            } else if (scrollLeft > maxScrollLeft) {
              scrollLeft = maxScrollLeft;
            } else {
              scrollLeft = 0;
            }
          }
        }

        // Compute new vertical scroll position
        if (this._enableScrollY) {
          scrollTop -= moveY * this.options.speedMultiplier;
          var maxScrollTop = this._maxScrollTop;
          if (scrollTop > maxScrollTop || scrollTop < 0) {
            // Slow down on the edges
            if (this.options.bouncing) {
              scrollTop += moveY / 2 * this.options.speedMultiplier;
            } else if (scrollTop > maxScrollTop) {
              scrollTop = maxScrollTop;
            } else {
              scrollTop = 0;
            }
          }
        }

        // Keep list from growing infinitely (holding min 10, max 20 measure points)
        if (positions.length > 60) {
          positions.splice(0, 30);
        }

        // Track scroll movement for decleration
        positions.push(scrollLeft, scrollTop, timeStamp);

        // Sync scroll position
        this._publish(scrollLeft, scrollTop);

        // Otherwise figure out whether we are switching into dragging mode now.
      } else {
        var minimumTrackingForScroll = this.options.locking ? 3 : 0;
        var minimumTrackingForDrag = 5;

        var distanceX = Math.abs(currentTouchLeft - this._initialTouchLeft);
        var distanceY = Math.abs(currentTouchTop - this._initialTouchTop);

        this._enableScrollX = this.options.scrollingX && distanceX >= minimumTrackingForScroll;
        this._enableScrollY = this.options.scrollingY && distanceY >= minimumTrackingForScroll;

        positions.push(this._scrollLeft, this._scrollTop, timeStamp);

        this._isDragging = (this._enableScrollX || this._enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
        if (this._isDragging) {
          this._interruptedAnimation = false;
        }
      }

      // Update last touch positions and time stamp for next event
      this._lastTouchLeft = currentTouchLeft;
      this._lastTouchTop = currentTouchTop;
      this._lastTouchMove = timeStamp;
    }
  }, {
    key: 'doTouchEnd',
    value: function doTouchEnd(timeStamp) {
      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }

      if (typeof timeStamp !== 'number') {
        warn$2('Invalid timestamp value: ' + timeStamp);
      }
      // Ignore event when tracking is not enabled (no touchstart event on element)
      // This is required as this listener ('touchmove') sits on the document and not on the element itthis.
      if (!this._isTracking) {
        return;
      }

      // Not touching anymore (when two finger hit the screen there are two touch end events)
      this._isTracking = false;

      // Be sure to reset the dragging flag now. Here we also detect whether
      // the finger has moved fast enough to switch into a deceleration animation.
      if (this._isDragging) {
        // Reset dragging flag
        this._isDragging = false;

        // Start deceleration
        // Verify that the last move detected was in some relevant time frame
        if (this._isSingleTouch && this.options.animating && timeStamp - this._lastTouchMove <= 100) {
          // Then figure out what the scroll position was about 100ms ago
          var positions = this._positions;
          var endPos = positions.length - 1;
          var startPos = endPos;

          // Move pointer to position measured 100ms ago
          for (var i = endPos; i > 0 && positions[i] > this._lastTouchMove - 100; i -= 3) {
            startPos = i;
          }

          // If start and stop position is identical in a 100ms timeframe,
          // we cannot compute any useful deceleration.
          if (startPos !== endPos) {
            // Compute relative movement between these two points
            var timeOffset = positions[endPos] - positions[startPos];
            var movedLeft = this._scrollLeft - positions[startPos - 2];
            var movedTop = this._scrollTop - positions[startPos - 1];

            // Based on 50ms compute the movement to apply for each render step
            this._decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
            this._decelerationVelocityY = movedTop / timeOffset * (1000 / 60);

            // How much velocity is required to start the deceleration
            var minVelocityToStartDeceleration = this.options.paging || this.options.snapping ? 4 : 1;

            // Verify that we have enough velocity to start deceleration
            if (Math.abs(this._decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(this._decelerationVelocityY) > minVelocityToStartDeceleration) {
              // Deactivate pull-to-refresh when decelerating
              if (!this._refreshActive) {
                this._startDeceleration(timeStamp);
              }
            } else {
              this.options.scrollingComplete();
            }
          } else {
            this.options.scrollingComplete();
          }
        } else if (timeStamp - this._lastTouchMove > 100) {
          !this.options.snapping && this.options.scrollingComplete();
        }
      }

      // If this was a slower move it is per default non decelerated, but this
      // still means that we want snap back to the bounds which is done here.
      // This is placed outside the condition above to improve edge case stability
      // e.g. touchend fired without enabled dragging. This should normally do not
      // have modified the scroll positions or even showed the scrollbars though.
      if (!this._isDecelerating) {
        if (this._refreshActive && this._refreshStart) {
          // Use publish instead of scrollTo to allow scrolling to out of boundary position
          // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
          this._publish(this._scrollLeft, -this._refreshHeight, this._zoomLevel, true);

          if (this._refreshStart) {
            this._refreshStart();
          }
        } else {
          if (this._interruptedAnimation || this._isDragging) {
            this.options.scrollingComplete();
          }

          this.scrollTo(this._scrollLeft, this._scrollTop, true, this._zoomLevel);
          // Directly signalize deactivation (nothing todo on refresh?)
          if (this._refreshActive) {
            this._refreshActive = false;
            if (this._refreshDeactivate) {
              this._refreshDeactivate();
            }
          }
        }
      }

      // Fully cleanup list
      this._positions.length = 0;
    }
  }, {
    key: '_publish',
    value: function _publish(left, top) {
      var _this = this;

      var zoom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var animate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      // Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
      var wasAnimating = this._isAnimating;

      if (wasAnimating) {
        Animate.stop(wasAnimating);
        this._isAnimating = false;
      }

      if (animate && this.options.animating) {
        // Keep scheduled positions for scrollBy/zoomBy functionality
        this._scheduledLeft = left;
        this._scheduledTop = top;
        this._scheduledZoom = zoom;

        var oldLeft = this._scrollLeft;
        var oldTop = this._scrollTop;
        var oldZoom = this._zoomLevel;

        var diffLeft = left - oldLeft;
        var diffTop = top - oldTop;
        var diffZoom = zoom - oldZoom;

        var step = function step(percent, now, render) {
          if (render) {
            _this._scrollLeft = oldLeft + diffLeft * percent;
            _this._scrollTop = oldTop + diffTop * percent;
            _this._zoomLevel = oldZoom + diffZoom * percent;
            // Push values out
            if (_this._callback) {
              _this._callback(_this._scrollLeft, _this._scrollTop, _this._zoomLevel);
            }
          }
        };

        var verify = function verify(id) {
          return _this._isAnimating === id;
        };

        var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
          if (animationId === _this._isAnimating) {
            _this._isAnimating = false;
          }

          if (_this._didDecelerationComplete || wasFinished) {
            _this.options.scrollingComplete();
          }

          if (_this.options.zooming) {
            _this._computeScrollMax();
            if (_this._zoomComplete) {
              _this._zoomComplete();
              _this._zoomComplete = null;
            }
          }
        };

        // When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
        this._isAnimating = Animate.start(step, verify, completed, this.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);
      } else {
        this._scheduledLeft = this._scrollLeft = left;
        this._scheduledTop = this._scrollTop = top;
        this._scheduledZoom = this._zoomLevel = zoom;

        // Push values out
        if (this._callback) {
          this._callback(left, top);
        }

        // Fix max scroll ranges
        if (this.options.zooming) {
          this._computeScrollMax();
          if (this._zoomComplete) {
            this._zoomComplete();
            this._zoomComplete = null;
          }
        }
      }
    }
  }, {
    key: '_computeScrollMax',
    value: function _computeScrollMax(zoomLevel) {
      if (zoomLevel == null) {
        zoomLevel = this._zoomLevel;
      }

      this._maxScrollLeft = Math.max(this._contentWidth * zoomLevel - this._clientWidth, 0);
      this._maxScrollTop = Math.max(this._contentHeight * zoomLevel - this._clientHeight, 0);
    }
  }, {
    key: '_startDeceleration',
    value: function _startDeceleration(timeStamp) {
      var _this2 = this;

      if (this.options.paging) {
        var scrollLeft = Math.max(Math.min(this._scrollLeft, this._maxScrollLeft), 0);
        var scrollTop = Math.max(Math.min(this._scrollTop, this._maxScrollTop), 0);
        var clientWidth = this._clientWidth;
        var clientHeight = this._clientHeight;

        // We limit deceleration not to the min/max values of the allowed range, but to the size of the visible client area.
        // Each page should have exactly the size of the client area.
        this._minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
        this._minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
        this._maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
        this._maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;
      } else {
        this._minDecelerationScrollLeft = 0;
        this._minDecelerationScrollTop = 0;
        this._maxDecelerationScrollLeft = this._maxScrollLeft;
        this._maxDecelerationScrollTop = this._maxScrollTop;
      }

      // Wrap class method
      var step = function step(percent, now, render) {
        _this2._stepThroughDeceleration(render);
      };

      // How much velocity is required to keep the deceleration running
      var minVelocityToKeepDecelerating = this.options.snapping ? 4 : 0.001;

      // Detect whether it's still worth to continue animating steps
      // If we are already slow enough to not being user perceivable anymore, we stop the whole process here.
      var verify = function verify() {
        var shouldContinue = Math.abs(_this2._decelerationVelocityX) >= minVelocityToKeepDecelerating || Math.abs(_this2._decelerationVelocityY) >= minVelocityToKeepDecelerating;
        if (!shouldContinue) {
          _this2._didDecelerationComplete = true;
        }
        return shouldContinue;
      };

      var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
        _this2._isDecelerating = false;
        // if (this._didDecelerationComplete) {
        //   this.options.scrollingComplete()
        // }

        // Animate to grid when snapping is active, otherwise just fix out-of-boundary positions
        _this2.scrollTo(_this2._scrollLeft, _this2._scrollTop, _this2.options.snapping);
      };

      // Start animation and switch on flag
      this._isDecelerating = Animate.start(step, verify, completed);
    }
  }, {
    key: '_stepThroughDeceleration',
    value: function _stepThroughDeceleration(render) {
      //
      // COMPUTE NEXT SCROLL POSITION
      //

      // Add deceleration to scroll position
      var scrollLeft = this._scrollLeft + this._decelerationVelocityX;
      var scrollTop = this._scrollTop + this._decelerationVelocityY;

      //
      // HARD LIMIT SCROLL POSITION FOR NON BOUNCING MODE
      //

      if (!this.options.bouncing) {
        var scrollLeftFixed = Math.max(Math.min(this._maxDecelerationScrollLeft, scrollLeft), this._minDecelerationScrollLeft);
        if (scrollLeftFixed !== scrollLeft) {
          scrollLeft = scrollLeftFixed;
          this._decelerationVelocityX = 0;
        }
        var scrollTopFixed = Math.max(Math.min(this._maxDecelerationScrollTop, scrollTop), this._minDecelerationScrollTop);
        if (scrollTopFixed !== scrollTop) {
          scrollTop = scrollTopFixed;
          this._decelerationVelocityY = 0;
        }
      }

      //
      // UPDATE SCROLL POSITION
      //

      if (render) {
        this._publish(scrollLeft, scrollTop, this._zoomLevel);
      } else {
        this._scrollLeft = scrollLeft;
        this._scrollTop = scrollTop;
      }

      //
      // SLOW DOWN
      //

      // Slow down velocity on every iteration
      if (!this.options.paging) {
        // This is the factor applied to every iteration of the animation
        // to slow down the process. This should emulate natural behavior where
        // objects slow down when the initiator of the movement is removed
        var frictionFactor = 0.95;
        this._decelerationVelocityX *= frictionFactor;
        this._decelerationVelocityY *= frictionFactor;
      }

      //
      // BOUNCING SUPPORT
      //

      if (this.options.bouncing) {
        var scrollOutsideX = 0;
        var scrollOutsideY = 0;

        // This configures the amount of change applied to deceleration/acceleration when reaching boundaries
        var penetrationDeceleration = this.options.penetrationDeceleration;
        var penetrationAcceleration = this.options.penetrationAcceleration;

        // Check limits
        if (scrollLeft < this._minDecelerationScrollLeft) {
          scrollOutsideX = this._minDecelerationScrollLeft - scrollLeft;
        } else if (scrollLeft > this._maxDecelerationScrollLeft) {
          scrollOutsideX = this._maxDecelerationScrollLeft - scrollLeft;
        }

        if (scrollTop < this._minDecelerationScrollTop) {
          scrollOutsideY = this._minDecelerationScrollTop - scrollTop;
        } else if (scrollTop > this._maxDecelerationScrollTop) {
          scrollOutsideY = this._maxDecelerationScrollTop - scrollTop;
        }

        // Slow down until slow enough, then flip back to snap position
        if (scrollOutsideX !== 0) {
          if (scrollOutsideX * this._decelerationVelocityX <= 0) {
            this._decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
          } else {
            this._decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
          }
        }

        if (scrollOutsideY !== 0) {
          if (scrollOutsideY * this._decelerationVelocityY <= 0) {
            this._decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
          } else {
            this._decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
          }
        }
      }
    }
  }]);

  return Scroller;
}();

extend$2(Scroller.prototype, members);

var render = function (global) {
  var docStyle = document.documentElement.style;

  var engine = void 0;

  if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
    engine = 'presto';
  } else if ('MozAppearance' in docStyle) {
    engine = 'gecko';
  } else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit';
  } else if (typeof navigator.cpuClass === 'string') {
    engine = 'trident';
  }

  var vendorPrefix = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
  }[engine];

  var helperElem = document.createElement('div');
  var perspectiveProperty = vendorPrefix + 'Perspective';
  var transformProperty = vendorPrefix + 'Transform';

  if (helperElem.style[perspectiveProperty] !== undefined) {
    return function (content, left, top) {
      // console.log(top)
      content.style[transformProperty] = 'translate3d(' + -left + 'px,' + -top + 'px,0)';
    };
  } else if (helperElem.style[transformProperty] !== undefined) {
    return function (content, left, top) {
      content.style[transformProperty] = 'translate(' + -left + 'px,' + -top + 'px,0)';
    };
  } else {
    return function (content, left, top) {
      content.style.marginLeft = left ? -left + 'px' : '';
      content.style.marginTop = top ? -top + 'px' : '';
    };
  }
}(window);

function _toConsumableArray$2(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var dpr = getDpr();
var API_LIST = ['getColumnValue', 'getColumnValues', 'getColumnIndex', 'getColumnIndexs', 'getColumnIndexByDefault', 'setColumnValues', 'refresh', 'inheritPickerApi'];

var PickerColumn = { render: function render$$1() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-picker-column", style: { height: _vm.style.indicatorHeight + 2 * _vm.style.maskerHeight + 'px' } }, [_c('div', { staticClass: "md-picker-column-container" }, [_c('div', { staticClass: "md-picker-column-masker top", style: { height: _vm.style.maskerHeight + 'px' } }), _vm._v(" "), _c('div', { staticClass: "md-picker-column-masker bottom", style: { height: _vm.style.maskerHeight + 'px' } }), _vm._v(" "), _c('div', { staticClass: "md-picker-column-list" }, [_vm._l(_vm.columnValues, function (colunm, i) {
      return [_c('div', { key: i, staticClass: "md-picker-column-item" }, [_c('ul', { staticClass: "column-list", style: { 'padding-top': _vm.style.maskerHeight + 'px' } }, [_vm._l(colunm, function (item, j) {
        return [_c('li', { key: j, staticClass: "column-item", class: { 'disabled': _vm.$_isColumnIndexInvalid(i, j) }, style: {
            'height': _vm.style.indicatorHeight + 'px',
            'line-height': _vm.style.indicatorHeight + 'px'
          }, domProps: { "textContent": _vm._s(item.text || item.label) } })];
      })], 2)])];
    }), _vm._v(" "), _vm._l(_vm.cols - _vm.columnValues.length, function (n) {
      return [_c('div', { key: n + _vm.columnValues.length - 1, staticClass: "md-picker-column-item" }, [_c('ul', { staticClass: "column-list", style: { 'padding-top': _vm.style.maskerHeight + 'px' } })])];
    })], 2), _vm._v(" "), _c('div', { staticClass: "md-picker-column-hooks" }, [_vm._l(_vm.cols, function (n) {
      return [_c('div', { key: n - 1, staticClass: "md-picker-column-hook", on: { "touchstart": function touchstart($event) {
            _vm.$_onColumnTouchStart($event, n - 1);
          }, "mousedown": function mousedown($event) {
            _vm.$_onColumnTouchStart($event, n - 1, true);
          }, "touchmove": function touchmove($event) {
            _vm.$_onColumnTouchMove($event, n - 1);
          }, "mousemove": function mousemove($event) {
            _vm.$_onColumnTouchMove($event, n - 1, true);
          }, "touchend": function touchend($event) {
            _vm.$_onColumnTouchEnd($event, n - 1);
          }, "mouseup": function mouseup($event) {
            _vm.$_onColumnTouchEnd($event, n - 1, true);
          } } })];
    })], 2)])]);
  }, staticRenderFns: [],
  name: 'md-picker-column',

  props: {
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    cols: {
      type: Number,
      default: 1
    },
    defaultValue: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultIndex: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    invalidIndex: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },

  data: function data() {
    return {
      style: {
        maskerHeight: 81 * dpr,
        indicatorHeight: 36 * dpr
      },
      columnValues: [],
      scrollers: [],
      scrollDirect: 1,
      scrollPosition: 0,
      activedIndexs: [],
      isInitialed: false,
      isScrollInitialed: false,
      isScrolling: false,
      isMouseDown: false
    };
  },


  watch: {
    data: {
      handler: function handler(val) {
        this.columnValues = [].concat(_toConsumableArray$2(val));
      },

      deep: true
    }
  },

  created: function created() {
    this.columnValues = [].concat(_toConsumableArray$2(this.data));
  },


  methods: {
    // MARK: private methods
    // initial scroller for each column
    $_initColumnsScroller: function $_initColumnsScroller() {
      var _this = this;

      var startIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var hooks = this.$el.querySelectorAll('.md-picker-column-hook');

      /* istanbul ignore if */
      if (!hooks) {
        return;
      }

      hooks = Array.isArray(hooks) ? hooks : Array.prototype.slice.call(hooks);

      for (var i = startIndex, len = hooks.length; i < len; i++) {
        var container = hooks[i];
        container && this.$_initSingleColumnScroller(container, i);
      }

      // initial index only refresh all columns
      if (!startIndex) {
        this.$_initColumnIndex();
        if (!this.isInitialed) {
          this.isInitialed = true;
          setTimeout(function () {
            _this.$emit('initialed');
          }, 0);
        }
      }

      this.isScrollInitialed = true;
    },


    // initial scroller for column by index
    $_initSingleColumnScroller: function $_initSingleColumnScroller(container, index) {
      var _this2 = this;

      var columns = this.$el.querySelectorAll('.column-list');
      var content = columns[index];

      /* istanbul ignore if */
      if (index === undefined || !columns || !container || !content) {
        return;
      }

      var rect = container.getBoundingClientRect();
      var scroller = new Scroller(function (left, top) {
        render(content, left, top);
      }, {
        scrollingX: false,
        snapping: true,
        scrollingComplete: function scrollingComplete() {
          _this2.$_onColumnScrollEnd(index);
        }
      });

      // set scroller size
      scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);
      scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight + this.style.maskerHeight);
      scroller.setSnapSize(0, this.style.indicatorHeight);

      // save scroller instance
      this.$set(this.scrollers, index, scroller);
    },


    // each column scroll to active item by defaultIndex
    $_initColumnIndex: function $_initColumnIndex() {
      var _this3 = this;

      var data = this.columnValues;
      var scrollers = this.scrollers;
      var defaultValue = this.defaultValue;
      var defaultIndex = this.defaultIndex;

      this.$_getColumnIndexByDefault(data, defaultIndex, defaultValue, function (columnIndex, itemIndex) {
        var scroller = scrollers[columnIndex];
        var offsetTop = _this3.$_getColumnOffsetByIndex(itemIndex);

        /* istanbul ignore if */
        if (!scroller) {
          warn$2('initialColumnIndex: scroller of column ' + columnIndex + ' is undefined');
          return 1;
        }

        scroller.scrollTo(0, offsetTop);

        // save active index of each column
        _this3.$set(_this3.activedIndexs, columnIndex, itemIndex);
      });
    },
    $_getColumnIndexByDefault: function $_getColumnIndexByDefault(data) {
      var defaultIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var fn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop$1;

      /* istanbul ignore if */
      if (!data) {
        return;
      }

      traverse$1(data, function (item, level, indexs) {
        var columnIndex = indexs[0];
        var itemIndex = indexs[1];
        var itemDefaultIndex = defaultIndex[columnIndex];
        var itemDefaultValue = defaultValue[columnIndex];
        if (itemDefaultIndex !== undefined && itemIndex === itemDefaultIndex || itemDefaultValue !== undefined && (item.text === itemDefaultValue || item.label === itemDefaultValue || item.value === itemDefaultValue)) {
          fn(columnIndex, itemIndex);
          return 2;
        }
      });
    },
    $_getColumnIndexByOffset: function $_getColumnIndexByOffset(top) {
      return Math.round(top / this.style.indicatorHeight);
    },
    $_getColumnOffsetByIndex: function $_getColumnOffsetByIndex(index) {
      return index * this.style.indicatorHeight;
    },
    $_isColumnIndexInvalid: function $_isColumnIndexInvalid(columnIndex, itemIndex) {
      var invalidIndex = this.invalidIndex[columnIndex];
      return inArray(invalidIndex, itemIndex);
    },
    $_scrollToValidIndex: function $_scrollToValidIndex(columnIndex, itemIndex) {
      var scroller = this.scrollers[columnIndex];
      var dirction = this.scrollDirect;
      var count = itemIndex;

      while (this.$_isColumnIndexInvalid(columnIndex, count)) {
        count += dirction;
      }

      var offsetTop = this.$_getColumnOffsetByIndex(count);
      scroller.scrollTo(0, this.$_scrollInZoon(scroller, offsetTop), true);
    },
    $_scrollInZoon: function $_scrollInZoon(scroller, top) {
      var MaxTop = scroller.getScrollMax().top;

      if (top < 0) {
        return 0;
      } else if (top > MaxTop) {
        return MaxTop;
      } else {
        return top;
      }
    },


    // MARK: events handler
    $_onColumnTouchStart: function $_onColumnTouchStart(event, index, isMouse) {
      event.preventDefault();

      var scroller = this.scrollers[index];
      var touches = isMouse ? [{ pageX: event.pageX, pageY: event.pageY }] : event.touches;

      /* istanbul ignore if */
      if (!scroller) {
        warn$2('touchstart: scroller of column ' + index + ' is undefined');
        return;
      }

      this.scrollPosition = isMouse ? event.pageY : event.touches[0].pageY;

      scroller.doTouchStart(touches, event.timeStamp);
      isMouse && (this.isMouseDown = true);
    },
    $_onColumnTouchMove: function $_onColumnTouchMove(event, index, isMouse) {
      var scroller = this.scrollers[index];
      var touches = isMouse ? [{ pageX: event.pageX, pageY: event.pageY }] : event.touches;

      /* istanbul ignore if */
      if (!scroller || isMouse && !this.isMouseDown) {
        return;
      }

      var diff = this.scrollPosition - (isMouse ? event.pageY : event.touches[0].pageY);
      this.scrollDirect = diff ? diff / Math.abs(diff) : 1;

      scroller.doTouchMove(touches, event.timeStamp);
      isMouse && (this.isMouseDown = true);
    },
    $_onColumnTouchEnd: function $_onColumnTouchEnd(event, index, isMouse) {
      var scroller = this.scrollers[index];

      /* istanbul ignore if */
      if (!scroller || isMouse && !this.isMouseDown) {
        return;
      }

      scroller.doTouchEnd(event.timeStamp);
      isMouse && (this.isMouseDown = false);
    },
    $_onColumnScrollEnd: function $_onColumnScrollEnd(index) {
      var scroller = this.scrollers[index];
      var top = scroller.getValues().top;
      var scrollTop = this.$_scrollInZoon(scroller, top);
      var activeItemIndex = this.$_getColumnIndexByOffset(scrollTop);
      var isInvalid = this.$_isColumnIndexInvalid(index, activeItemIndex);

      if (isInvalid || activeItemIndex === this.activedIndexs[index]) {
        isInvalid && this.$_scrollToValidIndex(index, activeItemIndex);
        return false;
      }

      /* istanbul ignore next */
      this.$set(this.activedIndexs, index, activeItemIndex);
      /* istanbul ignore next */
      this.$emit('change', index, activeItemIndex, this.getColumnValue(index));
    },


    // MARK: public methods
    inheritPickerApi: function inheritPickerApi(instance) {
      var _this4 = this;

      var blacklist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      traverse$1(API_LIST, function (api) {
        /* istanbul ignore if */
        if (!instance) {
          return 2;
        } else if (~blacklist.indexOf(api)) {
          return 1;
        }

        var fn = _this4[api];

        /* istanbul ignore else */
        if (fn) {
          instance[api] = fn;
        } else {
          warn$2('inheritPickerApi: Api method [' + api + '] is undefined');
        }
      });
    },
    getColumnValue: function getColumnValue() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var activeValues = this.getColumnValues();
      return activeValues[index];
    },
    getColumnValues: function getColumnValues() {
      var data = this.columnValues;
      var activeIndexs = this.activedIndexs;
      var activeValues = [];

      data.forEach(function (item, index) {
        activeValues[index] = item[activeIndexs[index]];
      });

      return activeValues;
    },
    getColumnIndex: function getColumnIndex() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      return this.activedIndexs[index];
    },
    getColumnIndexs: function getColumnIndexs() {
      return this.activedIndexs;
    },
    getColumnIndexByDefault: function getColumnIndexByDefault(data) {
      var defaultIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var fn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop$1;

      /* istanbul ignore next */
      this.$_getColumnIndexByDefault(data, defaultIndex, defaultValue, fn);
    },
    setColumnValues: function setColumnValues(index, values) {
      var _this5 = this;

      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop$1;

      /* istanbul ignore if */
      if (index === undefined || values === undefined) {
        return;
      }
      this.$set(this.activedIndexs, index, 0); // reset active index
      this.$set(this.columnValues, index, values);
      this.$nextTick(function () {
        _this5.$_initSingleColumnScroller(index);
        callback();
      });
    },
    refresh: function refresh(callback) {
      var _this6 = this;

      var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      // this.activedIndexs = []
      this.$nextTick(function () {
        _this6.$_initColumnsScroller(startIndex);
        callback && callback();
      });
    }
  }
};

var defaultOptions = {
  currentLevel: 0,
  maxLevel: 0,
  values: [],
  defaultIndex: []

  /**
   * cascade column by set value of following columns
   * @param {*} picker instance of picker-column
   * @param {*} options { currentLevel, maxLevel, values } 
   * @param {*} fn 
   */
};function cascadePicker (picker) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fn = arguments[2];

  // options = {...defaultOptions, ...options}
  options = Object.assign({}, defaultOptions, options);

  /* istanbul ignore if */
  if (!picker) {
    warn$2('cascade: picker is undefined');
    return;
  }

  var values = options.values;

  /* istanbul ignore next */
  for (var i = options.currentLevel + 1; i < options.maxLevel; i++) {
    var activeIndex = options.defaultIndex[i] || 0;
    var columnValues = values.children || [];
    picker.setColumnValues(i, columnValues);
    values = columnValues[activeIndex] || [];
  }

  fn && fn();
}

var _components$4;

function _toConsumableArray$3(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty$8(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Picker = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-picker", class: { 'with-popup': !_vm.isView } }, [_vm.isView ? [_c('md-picker-column', { ref: "pickerColumn", attrs: { "data": _vm.data, "default-value": _vm.defaultValue, "default-index": _vm.defaultIndex, "invalid-index": _vm.invalidIndex, "cols": _vm.cols }, on: { "initialed": function initialed($event) {
          _vm.$emit('initialed');
        }, "change": _vm.$_onPickerChange } })] : [_c('md-popup', { attrs: { "position": "bottom", "mask-closable": _vm.maskClosable, "prevent-scroll": "" }, on: { "beforeShow": _vm.$_onPickerBeforeShow, "show": _vm.$_onPickerShow, "hide": _vm.$_onPickerHide, "maskClick": _vm.$_onPickerCancel }, model: { value: _vm.isPickerShow, callback: function callback($$v) {
          _vm.isPickerShow = $$v;
        }, expression: "isPickerShow" } }, [_c('md-popup-title-bar', { attrs: { "title": _vm.title, "ok-text": _vm.okText, "cancel-text": _vm.cancelText }, on: { "confirm": _vm.$_onPickerConfirm, "cancel": _vm.$_onPickerCancel } }), _vm._v(" "), _c('md-picker-column', { ref: "pickerColumn", attrs: { "data": _vm.data, "default-value": _vm.$_getDefaultValue(), "default-index": _vm.$_getDefaultIndex(), "invalid-index": _vm.invalidIndex, "cols": _vm.cols }, on: { "initialed": _vm.$_onPickerInitialed, "change": _vm.$_onPickerChange } })], 1)]], 2);
  }, staticRenderFns: [],
  name: 'md-picker',

  components: (_components$4 = {}, _defineProperty$8(_components$4, Popup.name, Popup), _defineProperty$8(_components$4, PopupTitleBar.name, PopupTitleBar), _defineProperty$8(_components$4, PickerColumn.name, PickerColumn), _components$4),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    cols: {
      type: Number,
      default: 1
    },
    defaultValue: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultIndex: {
      type: Array,
      default: function _default() {
        var arr = new Array(this.cols);
        for (var i = 0, len = arr.length; i < len; i++) {
          arr[i] = 0;
        }
        return arr;
      }
    },
    invalidIndex: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    isCascade: {
      type: Boolean,
      default: false
    },
    isView: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    maskClosable: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      isPickerShow: false,
      isPickerFirstPopup: true,
      oldActivedIndexs: null
    };
  },


  computed: {
    column: function column() {
      return this.$refs['pickerColumn'];
    },
    isScrollInitialed: function isScrollInitialed() {
      return this.column.isScrollInitialed;
    }
  },

  watch: {
    value: function value(val) {
      this.isPickerShow = val;
      val && this.$_initPicker();
    },
    isPickerShow: function isPickerShow(val) {
      if (!val) {
        this.$emit('input', val);
      }
    },

    data: {
      handler: function handler(val, oldVal) {
        if (!compareObjects(val, oldVal)) {
          this.$_initPickerColumn();
        }
      },

      deep: true,
      immediate: true
    },
    defaultIndex: {
      handler: function handler(val, oldVal) {
        if (!compareObjects(val, oldVal)) {
          this.$_initPickerColumn();
        }
      },

      deep: true
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.$_initPicker();

    if (this.isView) {
      this.$nextTick(function () {
        _this.column.refresh();
      });
    }
  },


  methods: {
    // MARK: events handler
    $_initPicker: function $_initPicker() {
      var _this2 = this;

      if (!this.isView && this.value) {
        this.isPickerShow = this.value;
      }

      this.column.inheritPickerApi(this, ['refresh']);

      if (this.isPickerFirstPopup) {
        this.isPickerFirstPopup = false;
      } else {
        // mark initial activedIndexs as snapshoot
        setTimeout(function () {
          _this2.oldActivedIndexs = [].concat(_toConsumableArray$3(_this2.column.activedIndexs));
        }, 100);
      }
    },
    $_initPickerColumn: function $_initPickerColumn() {
      var _this3 = this;

      /* istanbul ignore if */
      if (!this.isCascade) {
        return;
      }

      var defaultIndex = this.$_getDefaultIndex();
      var defaultIndexOfFirstColumn = defaultIndex[0] || 0;
      this.$nextTick(function () {
        cascadePicker(_this3.column, {
          currentLevel: 0,
          maxLevel: _this3.cols,
          values: _this3.data[0] ? _this3.data[0][defaultIndexOfFirstColumn] || [] : [],
          defaultIndex: defaultIndex
        });
      });
    },
    $_resetPickerColumn: function $_resetPickerColumn() {
      this.$_initPickerColumn();
    },
    $_getDefaultIndex: function $_getDefaultIndex() {
      return this.oldActivedIndexs || this.defaultIndex;
    },
    $_getDefaultValue: function $_getDefaultValue() {
      return this.oldActivedIndexs ? [] : this.defaultValue;
    },
    $_onPickerConfirm: function $_onPickerConfirm() {
      var column = this.column;
      var columnValues = column.getColumnValues();
      var isScrolling = false;
      column.scrollers.forEach(function (scroller) {
        /* istanbul ignore next */
        if (scroller._isAnimating !== false || scroller._isDecelerating !== false || scroller._isDragging !== false || scroller._isGesturing !== false) {
          isScrolling = true;
          return false;
        }
      });

      if (!isScrolling) {
        this.isPickerShow = false;
        this.$emit('confirm', columnValues);
      }
    },
    $_onPickerInitialed: function $_onPickerInitialed() {
      this.$emit('initialed');
    },
    $_onPickerCancel: function $_onPickerCancel() {
      var _this4 = this;

      this.isPickerShow = false;
      this.$emit('cancel');

      // reset picker by snapshot
      this.$nextTick(function () {
        _this4.$_resetPickerColumn();
        _this4.refresh();
      });
    },
    $_onPickerChange: function $_onPickerChange(columnIndex, itemIndex, values) {
      var _this5 = this;

      /* istanbul ignore next */
      if (this.isCascade) {
        cascadePicker(this.column, {
          currentLevel: columnIndex,
          maxLevel: this.cols,
          values: values
        }, function () {
          // reinitiate columns after the changing column
          _this5.column.refresh(null, columnIndex + 1);
        });
      }
      /* istanbul ignore next */
      this.$emit('change', columnIndex, itemIndex, values);
    },
    $_onPickerBeforeShow: function $_onPickerBeforeShow() {
      var _this6 = this;

      /* istanbul ignore next */
      if (!this.isScrollInitialed) {
        this.$nextTick(function () {
          _this6.column.refresh();
        });
      }
    },
    $_onPickerHide: function $_onPickerHide() {
      this.$emit('hide');
    },
    $_onPickerShow: function $_onPickerShow() {
      this.$emit('show');
    },
    refresh: function refresh() {
      this.column.isScrollInitialed = false;
      /** 
       * Manual call 'column.refresh' only when picker is in-view or popup is show,
       * otherwise 'column.refresh' will be called at popup's 'onBerforeShow' automatically
      */
      if (this.isView || this.isPickerShow) {
        this.column.refresh.apply(this.column, arguments);
      }
    }
  }
};

var _components$5;

function _defineProperty$9(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Selector = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-selector", class: { 'is-normal': !_vm.isCheck, 'is-check': _vm.isCheck && _vm.isNeedConfirm } }, [_c('md-popup', { attrs: { "position": "bottom", "mask-closable": _vm.maskClosable, "prevent-scroll": "", "prevent-scroll-exclude": _vm.scroller }, on: { "show": _vm.$_onSelectorShow, "hide": _vm.$_onSelectorHide, "maskClick": _vm.$_onSelectorCancel }, model: { value: _vm.isSelectorShow, callback: function callback($$v) {
          _vm.isSelectorShow = $$v;
        }, expression: "isSelectorShow" } }, [_c('md-popup-title-bar', { attrs: { "title": _vm.title, "ok-text": _vm.okText, "cancel-text": _vm.cancelText }, on: { "confirm": _vm.$_onSelectorConfirm, "cancel": _vm.$_onSelectorCancel } }), _vm._v(" "), _c('div', { staticClass: "md-selector-container", style: { maxHeight: _vm.maxHeight + 'px' } }, [_c('div', { staticClass: "md-selector-list" }, [_c('md-radio', { key: _vm.radioKey, ref: "radio", attrs: { "options": _vm.data, "default-index": _vm.defaultIndex, "invalid-index": _vm.invalidIndex, "icon": "circle-right", "icon-inverse": "circle", "icon-size": "md", "optionRender": _vm.optionRender, "is-slot-scope": _vm.hasSlot }, on: { "change": _vm.$_onSelectorChoose }, scopedSlots: _vm._u([{ key: "default", fn: function fn(_ref) {
          var option = _ref.option;
          return [_vm._t("default", null, { option: option })];
        } }]) })], 1)])], 1)], 1);
  }, staticRenderFns: [],
  name: 'md-selector',

  components: (_components$5 = {}, _defineProperty$9(_components$5, Radio.name, Radio), _defineProperty$9(_components$5, Popup.name, Popup), _defineProperty$9(_components$5, PopupTitleBar.name, PopupTitleBar), _components$5),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultIndex: {
      type: Number,
      default: -1
    },
    invalidIndex: {
      type: [Array, Number],
      default: function _default() {
        return -1;
      }
    },
    title: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    optionRender: {
      type: Function,
      default: noop$1
    },
    maxHeight: {
      type: Number,
      default: 400
    }
  },

  data: function data() {
    return {
      isSelectorShow: false,
      radioKey: Date.now(),
      activeIndex: -1,
      tmpActiveIndex: -1,
      scroller: ''
    };
  },


  computed: {
    isNeedConfirm: function isNeedConfirm() {
      return this.okText !== '';
    },
    hasSlot: function hasSlot() {
      return !!this.$scopedSlots.default;
    }
  },

  watch: {
    value: function value(val) {
      this.isSelectorShow = val;
    },
    isSelectorShow: function isSelectorShow(val) {
      this.$emit('input', val);
    }
  },

  created: function created() {
    this.value && (this.isSelectorShow = this.value);
    !this.isNeedConfirm && (this.activeIndex = this.defaultIndex);
    this.activeIndex = this.tmpActiveIndex = this.defaultIndex;
  },


  methods: {
    // MARK: private methods
    $_getItemText: function $_getItemText(item) {
      var renderText = this.itemRender(item);
      return renderText || item.text || item.label;
    },
    $_isActive: function $_isActive(index) {
      var activeIndex = this.tmpActiveIndex;
      if (activeIndex > -1) {
        return activeIndex === index;
      } else {
        return this.defaultIndex === index;
      }
    },
    $_isInvalid: function $_isInvalid(index) {
      var invalidIndex = this.invalidIndex;
      return Array.isArray(invalidIndex) ? !!~invalidIndex.indexOf(index) : index === invalidIndex;
    },
    $_setScroller: function $_setScroller() {
      var boxer = this.$el ? this.$el.querySelector('.md-selector-list') : null;
      if (boxer && boxer.clientHeight >= this.maxHeight) {
        this.scroller = '.md-selector-container';
      } else {
        this.scroller = '';
      }
    },


    // MARK: events handler
    $_onSelectorConfirm: function $_onSelectorConfirm() {
      if (this.tmpActiveIndex > -1) {
        this.activeIndex = this.tmpActiveIndex;
        this.isSelectorShow = false;
        this.$emit('confirm', this.data[this.activeIndex]);
      }
    },
    $_onSelectorCancel: function $_onSelectorCancel() {
      this.isSelectorShow = false;
      this.tmpActiveIndex = this.activeIndex;

      if (this.tmpActiveIndex !== -1) {
        this.$refs['radio'].selectByIndex(this.tmpActiveIndex);
      } else {
        // reset radio
        this.radioKey = Date.now();
      }

      this.$emit('cancel');
    },
    $_onSelectorChoose: function $_onSelectorChoose(item, index) {
      this.tmpActiveIndex = index;
      if (!this.isNeedConfirm) {
        this.activeIndex = index;
        this.isSelectorShow = false;
      }

      this.$emit('choose', item);
    },
    $_onSelectorShow: function $_onSelectorShow() {
      /* istanbul ignore next  */
      this.$_setScroller();
      this.$emit('show');
    },
    $_onSelectorHide: function $_onSelectorHide() {
      /* istanbul ignore next  */
      this.$emit('hide');
    }
  }
};

var Swiper = { render: function render$$1() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-swiper", class: { 'md-swiper-vertical': _vm.isVertical, 'md-swiper-fade': !_vm.isSlide, 'disabled': !_vm.isInitial } }, [_c('div', { staticClass: "md-swiper-box" }, [_c('div', { staticClass: "md-swiper-container" }, [_vm._t("default")], 2)]), _vm._v(" "), _vm.oItemCount > 1 && _vm.hasDots ? _c('div', { staticClass: "md-swiper-indicators", class: { 'disabled': !_vm.hasDots } }, [_vm._l(_vm.oItemCount, function (index) {
      return [_c('div', { key: index, staticClass: "md-swiper-indicator", class: { 'md-swiper-indicator-active': index - 1 === _vm.originalIndex } })];
    })], 2) : _vm._e()]);
  }, staticRenderFns: [],
  name: 'md-swiper',

  // components: {
  // },

  props: {
    autoplay: {
      type: Number,
      default: 3000,
      validator: function validator(value) {
        if (value === 0) {
          return true;
        }
        return value >= 500;
      }
    },
    transition: {
      type: String,
      default: 'slide',
      validator: function validator(value) {
        return ['slide', 'slideY', 'fade'].indexOf(value) > -1;
      }
    },
    defaultIndex: {
      type: Number,
      default: 0,
      validator: function validator(value) {
        return value > -1;
      }
    },
    hasDots: {
      type: Boolean,
      default: true
    },
    isPrevent: {
      type: Boolean,
      default: true
    },
    isLoop: {
      type: Boolean,
      default: true
    },
    dragable: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      ready: false,
      dragging: false,
      userScrolling: false,
      isInitial: false,
      hasTouch: 'ontouchstart' in window,
      index: 0,
      fromIndex: 0,
      toIndex: 0,
      firstIndex: 0,
      lastIndex: 0,
      oItemCount: 0, // original item count
      rItemCount: 0, // real item count
      dimension: 0,
      dragState: {},
      timer: null,
      reInitTimer: null,
      noDrag: false,
      scroller: null,
      $swiper: null
    };
  },


  computed: {
    isLastItem: function isLastItem() {
      return this.index === this.rItemCount - 1;
    },
    isFirstItem: function isFirstItem() {
      return this.index === 0;
    },
    originalIndex: function originalIndex() {
      if (this.isLoop && this.isSlide) {
        return this.index - 1;
      } else {
        return this.index;
      }
    },
    isSlide: function isSlide() {
      return this.transition.toLowerCase().indexOf('slide') > -1;
    },
    isVertical: function isVertical() {
      return this.transition === 'slideY';
    }
  },

  // watch: {
  // },

  // LiftCircle Hook
  /*
  beforeCreate
  created
  beforeMount
  */
  mounted: function mounted() {
    var _this = this;

    this.ready = true;
    this.hasTouch = 'ontouchstart' in window;
    this.$swiper = this.$el.querySelector('.md-swiper-container');
    setTimeout(function () {
      _this.$_reInitItems();
      _this.$_startPlay();
      _this.$_bindEvents();
    }, 100);
  },

  /*
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  */
  destroyed: function destroyed() {
    if (this.timer) {
      this.$_clearTimer();
    }
    if (this.reInitTimer) {
      clearTimeout(this.reInitTimer);
      this.reInitTimer = null;
    }
  },

  /*
  errorCaptured
  */

  methods: {
    // MARK: private methods
    $_getDimension: function $_getDimension() {
      this.dimension = this.isVertical ? this.$el.clientHeight : this.$el.clientWidth;
    },
    $_initScroller: function $_initScroller() {
      var _this2 = this;

      var scroller = new Scroller(function (left, top) {
        render(_this2.$swiper, left, top);
      }, {
        scrollingY: this.isVertical,
        scrollingX: !this.isVertical,
        snapping: false,
        bouncing: false,
        // paging: true,
        scrollingComplete: function scrollingComplete() {
          _this2.$emit('after-change', _this2.fromIndex, _this2.toIndex);

          if (_this2.isLastItem && _this2.isLoop) {
            var x = _this2.isVertical ? 0 : _this2.firstIndex * _this2.dimension;
            var y = _this2.isVertical ? _this2.firstIndex * _this2.dimension : 0;
            _this2.scroller.scrollTo(x, y, false);
            _this2.index = _this2.firstIndex;
          }

          if (_this2.isFirstItem && _this2.isLoop) {
            var _x = _this2.isVertical ? 0 : _this2.lastIndex * _this2.dimension;
            var _y = _this2.isVertical ? _this2.lastIndex * _this2.dimension : 0;
            _this2.scroller.scrollTo(_x, _y, false);
            _this2.index = _this2.lastIndex;
          }
        }
      });

      var container = this.$swiper;
      var contentWidth = this.isVertical ? container.clientWidth : container.clientWidth * this.rItemCount;
      var contentHeight = this.isVertical ? container.clientHeight * this.rItemCount : container.clientHeight;
      scroller.setPosition(container.clientLeft, container.clientTop);
      scroller.setDimensions(container.clientWidth, container.clientHeight, contentWidth, contentHeight);

      this.scroller = scroller;
    },
    $_backupItem: function $_backupItem(children) {
      var firstNode = children[0].$el.cloneNode(true);
      var lastNode = children[children.length - 1].$el.cloneNode(true);

      if (children.length > 1 && this.isLoop) {
        var firstNodeCopy = this.$swiper.querySelector('.md-swiper-item-first-copy');
        var lastNodeCopy = this.$swiper.querySelector('.md-swiper-item-last-copy');
        firstNodeCopy && this.$swiper.removeChild(firstNodeCopy);
        lastNodeCopy && this.$swiper.removeChild(lastNodeCopy);

        firstNode.className += ' md-swiper-item-first-copy';
        lastNode.className += ' md-swiper-item-last-copy';
        if (this.isVertical) {
          firstNode.style.height = this.dimension + 'px';
          lastNode.style.height = this.dimension + 'px';
        } else {
          firstNode.style.width = this.dimension + 'px';
          lastNode.style.width = this.dimension + 'px';
        }
        this.$swiper.appendChild(firstNode);
        this.$swiper.insertBefore(lastNode, this.$swiper.childNodes[0]);

        this.firstIndex++;
        this.lastIndex++;
        this.index++;

        this.rItemCount += 2;
      }
    },
    $_translate: function $_translate(element, offset) {
      var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!element) {
        warn$2('[md-swiper] no element for translate');
        return;
      }
      var x = this.isVertical ? 0 : -offset;
      var y = this.isVertical ? -offset : 0;
      this.scroller.scrollTo(x, y, animate);
    },
    $_opacity: function $_opacity() {
      var _this3 = this;

      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var opacity = arguments[1];

      if (typeof opacity !== 'undefined') {
        var toIndex = 0;
        var fromIndex = this.toIndex;
        var itemCount = this.rItemCount;

        if (opacity > 0) {
          if (fromIndex > 0) {
            toIndex = fromIndex - 1;
          } else if (fromIndex === 0) {
            toIndex = itemCount - 1;
          }
        } else {
          if (fromIndex < itemCount - 1) {
            toIndex = fromIndex + 1;
          } else if (fromIndex === itemCount - 1) {
            toIndex = 0;
          }
        }
        var _from = this.$children[fromIndex].$el;
        var _to = this.$children[toIndex].$el;
        _from.style.opacity = 1 - Math.abs(opacity);
        _from.style.transition = animate ? 'opacity 300ms ease' : '';
        _to.style.opacity = Math.abs(opacity);
        return;
      }

      var from = this.$children[this.fromIndex].$el;
      var to = this.$children[this.toIndex].$el;
      from.style.opacity = 0;
      from.style.transition = animate ? 'opacity 500ms ease' : '';
      to.style.opacity = 1;
      if (animate) {
        setTimeout(function () {
          _this3.$emit('after-change', _this3.fromIndex, _this3.toIndex);
        }, 500);
      }
    },
    $_initState: function $_initState(children) {
      this.oItemCount = children.length;
      this.rItemCount = children.length;
      this.noDrag = children.length === 1 || !this.dragable;
      this.index = this.defaultIndex >= 0 && this.defaultIndex < children.length ? parseInt(this.defaultIndex) : 0;
      this.firstIndex = 0;
      this.lastIndex = children.length - 1;
      this.fromIndex = this.index === this.firstIndex ? this.lastIndex : this.index + 1;
      this.toIndex = this.index;
    },
    $_reInitItems: function $_reInitItems() {
      var children = this.$children;

      if (!children || !children.length) {
        return;
      }

      this.$_getDimension();

      this.$_initState(children);

      if (this.isSlide) {
        this.$_backupItem(children);
        this.$_initScroller();
        this.$_translate(this.$swiper, -this.dimension * this.index, false);
      } else {
        this.$_opacity(false);
      }
      this.isInitial = true;
    },
    $_startPlay: function $_startPlay() {
      var _this4 = this;

      if (this.autoplay > 0 && this.oItemCount > 1 && this.isLoop) {
        this.timer = setInterval(function () {
          if (!_this4.isLoop && _this4.index >= _this4.rItemCount - 1) {
            return _this4.$_clearTimer();
          }
          if (!_this4.dragging) {
            _this4.next();
          }
        }, this.autoplay);
      }
    },
    $_bindEvents: function $_bindEvents() {
      var _this5 = this;

      window.addEventListener('resize', function () {
        // 防止屏幕翻转时，容器的尺寸更改不及时导致异常
        setTimeout(function () {
          _this5.$_reInitItems();
        }, 300);
      });

      // if (!this.isSlide) {
      //   return
      // }

      var element = this.$el;

      var isTouchEvent = void 0;
      var _onTouchStart = function _onTouchStart(event) {
        if (event.originalEvent) {
          event = event.originalEvent;
        }
        isTouchEvent = event.type === 'touchstart';
        if (_this5.isPrevent) {
          event.preventDefault();
        }
        _this5.dragging = true;
        _this5.userScrolling = false;
        _this5.$_doOnTouchStart(event);
      };

      var _onTouchMove = function _onTouchMove(event) {
        if (event.originalEvent) {
          event = event.originalEvent;
        }
        if (isTouchEvent && event.type === 'mousemove') {
          return;
        }
        if (_this5.isPrevent) {
          event.preventDefault();
        }
        if (!_this5.dragging) {
          return;
        }
        _this5.$_doOnTouchMove(event);
      };

      var _onTouchEnd = function _onTouchEnd(event) {
        if (_this5.isPrevent) {
          event.preventDefault();
        }
        if (_this5.userScrolling) {
          _this5.dragging = false;
          _this5.dragState = {};
          return;
        }
        if (!_this5.dragging) {
          return;
        }
        _this5.$_doOnTouchEnd(event);
        _this5.dragging = false;
      };

      if (!this.hasTouch) {
        element.addEventListener('mousedown', _onTouchStart);
        element.addEventListener('mousemove', _onTouchMove);
        element.addEventListener('mouseup', _onTouchEnd);
      } else {
        element.addEventListener('touchstart', _onTouchStart);
        element.addEventListener('touchmove', _onTouchMove);
        element.addEventListener('touchend', _onTouchEnd);
      }
    },
    $_clearTimer: function $_clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    $_isScroll: function $_isScroll(distanceX, distanceY) {
      var vertical = this.isVertical;
      if (!vertical && (distanceX < 5 || distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
        return true;
      } else if (vertical && (distanceY < 5 || distanceY >= 5 && distanceX >= 1.73 * distanceY)) {
        return true;
      } else {
        return false;
      }
    },
    $_calcuRealIndex: function $_calcuRealIndex(index) {
      if (this.isLoop && this.isSlide && this.oItemCount > 0) {
        return index - 1 < 0 ? this.oItemCount - 1 : index - 1 > this.oItemCount - 1 ? 0 : index - 1;
      }
      return index;
    },
    $_doAnimate: function $_doAnimate(towards, options) {
      var _this6 = this;

      if (this.oItemCount === 0) {
        return;
      }
      if (!options && this.oItemCount < 2) {
        return;
      }

      var index = this.index;
      var itemCount = this.rItemCount;

      var oldIndex = this.index;

      if (!towards) {
        return;
      }

      if (options && options.index) {
        this.index = options.index + (this.isLoop && this.isSlide ? 1 : 0);
      } else if (towards === 'prev') {
        if (index > 0) {
          this.index = index - 1;
        } else if (!this.isSlide && index === 0) {
          this.index = itemCount - 1;
        } else if (this.isLoop && index === 0) {
          this.index = itemCount - 1;
        }
      } else if (towards === 'next') {
        if (index < itemCount - 1) {
          this.index = index + 1;
        } else if (!this.isSlide && index === itemCount - 1) {
          this.index = 0;
        } else if (this.isLoop && index === itemCount - 1) {
          this.index = 1;
        }
      }

      if (this.isLoop && this.isSlide) {
        this.fromIndex = this.$_calcuRealIndex(oldIndex);
        this.toIndex = this.$_calcuRealIndex(this.index);
      } else {
        this.fromIndex = this.toIndex;
        this.toIndex = this.index;
      }
      this.$emit('before-change', this.fromIndex, this.toIndex);
      if (!this.isSlide) {
        this.$_opacity();
        return;
      }

      setTimeout(function () {
        _this6.$_translate(_this6.$swiper, -_this6.dimension * _this6.index);
      }, 10);
    },
    $_doOnTouchStart: function $_doOnTouchStart(event) {
      if (this.noDrag) {
        return;
      }
      this.$_clearTimer();

      var element = this.$el;
      var point = this.hasTouch ? event.touches[0] : event;

      var dragState = this.dragState;

      dragState.startTime = new Date();
      dragState.startLeft = point.pageX;
      dragState.startTop = point.pageY;
      dragState.itemWidth = element.offsetWidth;
      dragState.itemHeight = element.offsetHeight;
    },
    $_doOnTouchMove: function $_doOnTouchMove(event) {
      if (this.noDrag) {
        return;
      }
      var point = this.hasTouch ? event.touches[0] : event;
      var dragState = this.dragState;

      dragState.currentLeft = point.pageX;
      dragState.currentTop = point.pageY;

      var offsetLeft = dragState.currentLeft - dragState.startLeft;
      var offsetTop = dragState.currentTop - dragState.startTop;
      var distanceX = Math.abs(offsetLeft);
      var distanceY = Math.abs(offsetTop);

      this.userScrolling = this.$_isScroll(distanceX, distanceY);
      if (this.userScrolling) {
        return;
      } else {
        event.preventDefault();
      }

      var _offsetLeft = Math.min(Math.max(-dragState.itemWidth + 1, offsetLeft), dragState.itemWidth - 1);
      var _offsetTop = Math.min(Math.max(-dragState.itemHeight + 1, offsetTop), dragState.itemHeight - 1);

      var offset = this.isVertical ? _offsetTop - dragState.itemHeight * this.index : _offsetLeft - dragState.itemWidth * this.index;

      if (this.isSlide) {
        this.$_translate(this.$swiper, offset);
      } else {
        this.$_opacity(false, offsetLeft / dragState.itemWidth);
      }
    },
    $_doOnTouchEnd: function $_doOnTouchEnd() {
      if (this.noDrag) {
        return;
      }
      var dragState = this.dragState;
      var towards = null;
      // let offset

      var dragDuration = new Date() - dragState.startTime;
      var offsetLeft = dragState.currentLeft - dragState.startLeft;
      var offsetTop = dragState.currentTop - dragState.startTop;
      var itemWidth = dragState.itemWidth;
      var itemHeight = dragState.itemHeight;
      var index = this.index;
      var itemCount = this.rItemCount;

      if (dragDuration < 300 && dragState.currentLeft === undefined) {
        this.$_startPlay();
        return;
      }

      if (this.isVertical) {
        if (Math.abs(offsetTop) > itemHeight / 6) {
          towards = offsetTop < 0 ? 'next' : 'prev';
        } else {
          this.$_translate(this.$swiper, -this.dimension * index, true);
        }
      } else {
        if (Math.abs(offsetLeft) > itemWidth / 6) {
          towards = offsetLeft < 0 ? 'next' : 'prev';
        } else {
          if (this.isSlide) {
            this.$_translate(this.$swiper, -this.dimension * index, true);
          } else {
            this.$_opacity(true, 0);
          }
        }
      }

      if (!this.isLoop) {
        if (index === 0 && towards === 'prev' || index === itemCount - 1 && towards === 'next') {
          towards = null;
        }
      }

      this.$_doAnimate(towards);

      this.dragState = {};

      this.$_startPlay();
    },


    // MARK: events handler, 如 $_onButtonClick

    // MARK: public methods
    next: function next() {
      this.$_doAnimate('next');
    },
    prev: function prev() {
      this.$_doAnimate('prev');
    },
    goto: function goto(index) {
      if (isNaN(index)) {
        return;
      }
      index = parseInt(index);
      if (index === this.index || index < 0 || index >= this.oItemCount) {
        return;
      }
      var towards = index > this.index ? 'next' : 'pre';
      this.index = index;
      this.$_doAnimate(towards, {
        index: index
      });
    },
    getIndex: function getIndex() {
      return this.$_calcuRealIndex(this.index);
    },
    play: function play(autoplay) {
      if (this.timer) {
        this.$_clearTimer();
      }
      if (autoplay < 500) {
        return;
      }
      this.autoplay = autoplay || this.autoplay || 3000;
      this.$_startPlay();
    },
    stop: function stop() {
      if (this.timer) {
        this.$_clearTimer();
      }
    },
    swiperItemCreated: function swiperItemCreated() {
      var _this7 = this;

      if (!this.ready) {
        return;
      }
      clearTimeout(this.reInitTimer);
      this.reInitTimer = setTimeout(function () {
        _this7.$_reInitItems();
      }, 100);
    },
    swiperItemDestroyed: function swiperItemDestroyed() {
      var _this8 = this;

      if (!this.ready) {
        return;
      }
      clearTimeout(this.reInitTimer);
      this.reInitTimer = setTimeout(function () {
        _this8.$_reInitItems();
      }, 100);
    }
  }
};

var SwiperItem = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-swiper-item", style: { 'width': _vm.swiperWidth, 'height': _vm.swiperHeight } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'md-swiper-item',

  // components: {
  // },

  // props: {
  // },

  // data () {
  //   return {
  //   }
  // },

  computed: {
    swiperWidth: function swiperWidth() {
      return !this.$parent.isVertical ? this.$parent.dimension + 'px' : 'auto';
    },
    swiperHeight: function swiperHeight() {
      return this.$parent.isVertical ? this.$parent.dimension + 'px' : 'auto';
    }
  },

  // watch: {
  // },

  // LiftCircle Hook
  /*
  beforeCreate
  created
  beforeMount
  */
  mounted: function mounted() {
    return this.$parent && this.$parent.swiperItemCreated(this);
  },

  /*
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  */
  destroyed: function destroyed() {
    return this.$parent && this.$parent.swiperItemDestroyed(this);
  }
};

var _components$6;

function _defineProperty$10(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ToastOptions = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-toast", class: [_vm.icon ? 'has-icon' : '', _vm.position] }, [_c('md-popup', { attrs: { "hasMask": _vm.hasMask, "maskClosable": false }, on: { "hide": _vm.$_onHide }, model: { value: _vm.visible, callback: function callback($$v) {
          _vm.visible = $$v;
        }, expression: "visible" } }, [_c('div', { staticClass: "md-toast-content" }, [_vm.icon ? _c('md-icon', { attrs: { "name": _vm.icon, "size": "lg" } }) : _vm._e(), _vm._v(" "), _c('span', { domProps: { "textContent": _vm._s(_vm.content) } })], 1)])], 1);
  }, staticRenderFns: [],
  name: 'md-toast',

  components: (_components$6 = {}, _defineProperty$10(_components$6, Popup.name, Popup), _defineProperty$10(_components$6, Icon.name, Icon), _components$6),

  props: {
    icon: {
      type: String,
      default: ''
    },
    content: {
      type: [String, Number],
      default: ''
    },
    duration: {
      type: Number,
      default: 0
    },
    position: {
      // top, left, bottom
      type: String,
      default: 'center'
    },
    hasMask: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      visible: true
    };
  },
  mounted: function mounted() {
    this.$_update();
  },
  updated: function updated() {
    this.$_update();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.duration) {
      clearTimeout(this.$_timer);
    }
  },


  methods: {
    $_update: function $_update() {
      var _this = this;

      clearTimeout(this.$_timer);
      if (this.visible && this.duration) {
        this.$_timer = setTimeout(function () {
          _this.hide();
        }, this.duration);
      }
    },
    $_onHide: function $_onHide() {
      this.$emit('hide');
    },
    hide: function hide() {
      this.visible = false;
    }
  }
};

var ToastConstructor = Vue.extend(ToastOptions);

function Toast(_ref) {
  var _ref$content = _ref.content,
      content = _ref$content === undefined ? '' : _ref$content,
      _ref$icon = _ref.icon,
      icon = _ref$icon === undefined ? '' : _ref$icon,
      _ref$duration = _ref.duration,
      duration = _ref$duration === undefined ? 3000 : _ref$duration,
      _ref$position = _ref.position,
      position = _ref$position === undefined ? 'center' : _ref$position,
      _ref$hasMask = _ref.hasMask,
      hasMask = _ref$hasMask === undefined ? false : _ref$hasMask,
      _ref$parentNode = _ref.parentNode,
      parentNode = _ref$parentNode === undefined ? document.body : _ref$parentNode;

  var vm = Toast._instance;

  if (!vm) {
    vm = Toast._instance = new ToastConstructor({
      propsData: {
        content: content,
        icon: icon,
        duration: duration,
        position: position,
        hasMask: hasMask
      }
    }).$mount();
    parentNode.appendChild(vm.$el);
  }

  vm.content = content;
  vm.icon = icon;
  vm.duration = duration;
  vm.hasMask = hasMask;
  vm.visible = true;

  return vm;
}

// There is only one toast singleton
Toast._instance = null;

/**
 * Hide toast
 */
Toast.hide = function () {
  if (Toast._instance instanceof ToastConstructor && Toast._instance.visible) {
    Toast._instance.hide();
  }
};

/**
 * Show info toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.info = function () {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
  var hasMask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var parentNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.body;

  return Toast({
    icon: '',
    content: content,
    duration: duration,
    hasMask: hasMask,
    parentNode: parentNode
  });
};

/**
 * Show succeed toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.succeed = function () {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
  var hasMask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var parentNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.body;

  return Toast({
    icon: 'circle-right',
    content: content,
    duration: duration,
    hasMask: hasMask,
    parentNode: parentNode
  });
};

/**
 * Show failed toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=true]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.failed = function () {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
  var hasMask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var parentNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.body;

  return Toast({
    icon: 'circle-cross',
    content: content,
    duration: duration,
    hasMask: hasMask,
    parentNode: parentNode
  });
};

/**
 * Show loading toast
 * @param {string} content
 * @param {number=} [duration=0]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */
Toast.loading = function () {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var hasMask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var parentNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.body;

  return Toast({
    icon: 'spinner',
    content: content,
    duration: duration,
    hasMask: hasMask,
    parentNode: parentNode
  });
};

function _defineProperty$11(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TipOptions = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-tip", class: _vm.wrapperCls }, [[_vm._v(_vm._s(_vm.content))], _vm._v(" "), _c('md-icon', { attrs: { "name": "cross", "size": "md" }, nativeOn: { "click": function click($event) {
          return _vm.$_onClose($event);
        } } })], 2);
  }, staticRenderFns: [],
  name: 'md-tip-content',
  components: _defineProperty$11({}, Icon.name, Icon),

  props: {
    placement: {
      type: String
    },
    content: {
      type: [String, Number]
    }
  },

  computed: {
    wrapperCls: function wrapperCls() {
      var cls = {};

      if (['left', 'bottom', 'right'].indexOf(this.placement) !== -1) {
        cls['is-' + this.placement] = true;
      }

      return cls;
    }
  },

  methods: {
    $_onClose: function $_onClose() {
      this.$emit('close');
    }
  }
};

var Tip = Vue.extend(TipOptions);

var Tip$1 = {
  name: 'md-tip',

  props: {
    placement: {
      type: String,
      default: 'top'
    },
    content: {
      type: [String, Number],
      default: ''
    }
  },

  mounted: function mounted() {
    this.wrapperEl = this.$_getFirstScrollWrapper(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$_tipVM) {
      var el = this.$_tipVM.$el;
      var parent = el.parentNode;
      if (parent) {
        parent.removeChild(el);
      }
      this.$_tipVM.$destroy();
    }
  },


  /**
   * Only render the first node of slots
   * and add tip tirgger handler on it
   */
  render: function render() {
    // eslint-disable-line no-unused-vars
    if (!this.$slots.default || !this.$slots.default.length) {
      return this.$slots.default;
    }

    var firstNode = this.$slots.default[0];

    var on = firstNode.data.on = firstNode.data.on || {};
    var nativeOn = firstNode.data.nativeOn = firstNode.data.nativeOn || {};

    on.click = this.$_addEventHandle(on.click, this.show);
    nativeOn.click = this.$_addEventHandle(nativeOn.click, this.show);

    return firstNode;
  },


  methods: {
    /**
     * Add extra tip trigger handler
     * without overwriting the old ones
     */
    $_addEventHandle: function $_addEventHandle(old, fn) {
      if (!old) {
        return fn;
      } else if (Array.isArray(old)) {
        return old.indexOf(fn) > -1 ? old : old.concat(fn);
      } else {
        return old === fn ? old : [old, fn];
      }
    },


    /**
     * Get the first scrollable parent,
     * so we can append the tip element to
     * the right parent container
     */
    $_getFirstScrollWrapper: function $_getFirstScrollWrapper(node) {
      if (node === null || node === document.body) {
        return node;
      }

      var overflowY = window.getComputedStyle(node).overflowY;
      var isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

      if (isScrollable && node.scrollHeight > node.clientHeight) {
        return node;
      } else {
        return this.$_getFirstScrollWrapper(node.parentNode);
      }
    },


    /**
     * Get the relative position of an element
     * inside a wrapper
     */
    $_getPosition: function $_getPosition(node, wrapper) {
      var x = 0;
      var y = 0;
      var el = node;

      while (el) {
        x += el.offsetLeft;
        y += el.offsetTop;

        if (el === wrapper || el === document.body || el === null) {
          break;
        }

        el = el.offsetParent;
      }

      return { x: x, y: y };
    },


    /**
     * Lazy create tip element
     */
    $_getOrNewTip: function $_getOrNewTip() {
      if (this.$_tipVM) {
        return this.$_tipVM;
      }

      var tipVM = this.$_tipVM = new Tip({
        propsData: {
          placement: this.placement,
          content: this.content
        }
      }).$mount();

      tipVM.$on('close', this.hide);

      return tipVM;
    },


    /**
     * Calculate the position of tip,
     * and relayout it's position
     */
    layout: function layout() {
      if (!this.$_tipVM) {
        return;
      }

      var tipElRect = this.$_tipVM.$el.getBoundingClientRect();
      var referenceElRect = this.$el.getBoundingClientRect();
      var delta = this.$_getPosition(this.$el, this.wrapperEl);

      switch (this.placement) {
        case 'left':
          delta.y += (referenceElRect.height - tipElRect.height) / 2;
          delta.x -= tipElRect.width + 10;
          break;

        case 'right':
          delta.y += (referenceElRect.height - tipElRect.height) / 2;
          delta.x += referenceElRect.width + 10;
          break;

        case 'bottom':
          delta.y += referenceElRect.height + 10;
          delta.x += (referenceElRect.width - tipElRect.width) / 2;
          break;

        default:
          delta.y -= tipElRect.height + 10;
          delta.x += (referenceElRect.width - tipElRect.width) / 2;
          break;
      }

      this.$_tipVM.$el.style.cssText = 'position: absolute; top: ' + delta.y + 'px; left: ' + delta.x + 'px;';
    },


    /**
     * Do the magic, show me your tip
     */
    show: function show() {
      var tipVM = this.$_getOrNewTip();

      if (tipVM.$el.parentNode !== this.wrapperEl) {
        this.wrapperEl.appendChild(tipVM.$el);
      }

      this.layout();
      this.$emit('show');
    },


    /**
     * Hide tip
     */
    hide: function hide() {
      if (this.$_tipVM && this.$_tipVM.$el.parentNode !== null) {
        this.$_tipVM.$el.parentNode.removeChild(this.$_tipVM.$el);
        this.$emit('hide');
      }
    }
  }
};

function _defineProperty$12(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tabs = {
  name: 'md-tabs',

  components: _defineProperty$12({}, TabBar.name, TabBar),

  props: {
    titles: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    showInkBar: {
      type: Boolean,
      default: true
    },
    inkBarLength: {
      type: Number,
      default: 70,
      validator: function validator(length) {
        return length > 0 && length <= 100;
      }
    },
    inkBarAnimate: {
      type: Boolean,
      default: true
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    noslide: {
      type: Boolean,
      default: false
    },
    upsideDown: {
      type: Boolean,
      default: false
    },
    forceUseArray: {
      type: Boolean,
      default: undefined
    }
  },

  data: function data() {
    return {
      activeIndex: this.defaultIndex
    };
  },


  watch: {
    activeIndex: function activeIndex(val, preVal) {
      this.$emit('change', val, preVal);
      this.$emit('indexChanged', val, preVal);
    }
  },

  mounted: function mounted() {
    this.selectTab(this.activeIndex);
  },


  methods: {
    // MARK: public methods
    selectTab: function selectTab(i) {
      var index = parseInt(i);
      if (index >= 0 && index < this.titleList().length) {
        this.activeIndex = index;
      }
    },
    titleList: function titleList() {
      if (this.titles && this.titles.length) {
        return this.titles;
      } else if (this.$slots.title && this.$slots.title.length) {
        return this.$slots.title.filter(function (el) {
          return el.tag;
        });
      } else {
        return [];
      }
    },
    contentList: function contentList() {
      if (this.$slots.default) {
        return this.$slots.default.filter(function (el) {
          return el.tag;
        });
      } else {
        return [];
      }
    }
  },

  render: function render(createElement) {
    var self = this;

    var titleBarRenderer = createElement('md-tab-bar', {
      props: {
        titles: self.titles,
        defaultIndex: self.activeIndex,
        showInkBar: self.showInkBar,
        inkBarLength: self.inkBarLength,
        inkBarAnimate: self.inkBarAnimate,
        forceUseArray: self.forceUseArray
      },
      class: {
        'on-bottom': self.upsideDown
      },
      on: {
        indexChanged: function indexChanged(i) {
          self.selectTab(i);
        }
      },
      scopedSlots: this.$scopedSlots
    }, this.$slots.title || []);

    var contentRenderer = this.contentList().map(function (content, index) {
      return createElement('div', {
        class: {
          'md-tab-content': true
        },
        key: index,
        attrs: {
          key: index
        }
      }, [content]);
    });

    var contentWrapperRenderer = createElement('div', {
      class: {
        'md-tab-content-wrapper': true
      },
      style: {
        transform: self.noslide ? '' : 'translateX(' + -this.activeIndex * 100 + '%)'
      }
    }, [self.noslide ? contentRenderer[this.activeIndex] : contentRenderer]);

    return createElement('div', {
      class: {
        'md-tabs': true
      }
    }, self.upsideDown ? [contentWrapperRenderer, titleBarRenderer] : [titleBarRenderer, contentWrapperRenderer]);
  }
};

var Tag = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-tag" }, [_c('div', { class: _vm.computedClass, style: [_vm.computedStyle, _vm.jsComputedStyle] }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'md-tag',
  props: {
    size: {
      type: String, // tiny, small, large
      default: 'large'
    },
    shape: {
      // square, circle, fillet
      type: String,
      default: 'square'
    },
    type: {
      // fill ghost
      type: String,
      default: 'ghost'
    },
    fillColor: {
      type: String,
      default: ''
    },
    fontWeight: {
      // normal, bold, bolder
      type: String,
      default: 'normal'
    },
    fontColor: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      jsComputedStyle: {}
    };
  },

  computed: {
    computedClass: function computedClass() {
      return ['default', 'size-' + this.size, 'shape-' + this.shape, 'type-' + this.type, 'font-weight-' + this.fontWeight];
    },
    computedStyle: function computedStyle() {
      var style = {};
      if (this.type === 'fill') {
        // eslint-disable-next-line
        this.fillColor && (style.backgroundColor = this.fillColor);
      }
      if (this.fontColor) {
        if (this.type === 'ghost') {
          style.borderColor = this.fontColor;
        }
        style.color = this.fontColor;
      }
      return style;
    }
  },
  mounted: function mounted() {
    var vm = this;
    vm.$set(vm.jsComputedStyle, 'padding', Math.max(vm.$el.offsetHeight * 0.15, 3) + 'px');
    vm.$nextTick(function () {
      if (vm.shape === 'circle') {
        var height = vm.$el.offsetHeight / 2;
        vm.$set(vm.jsComputedStyle, 'paddingLeft', height + 'px');
        vm.$set(vm.jsComputedStyle, 'paddingRight', height + 'px');
        vm.$set(vm.jsComputedStyle, 'borderRadius', height + 'px');
      }
    });
  }
};

function getDecimalNum(num) {
  try {
    return num.toString().split('.')[1].length;
  } catch (e) {
    return 0;
  }
}

function accAdd(num1, num2) {
  var r1 = getDecimalNum(num1);
  var r2 = getDecimalNum(num2);
  var m = Math.pow(10, Math.max(r1, r2));
  return (num1 * m + num2 * m) / m;
}

function subtr(num1, num2) {
  var r1 = getDecimalNum(num1);
  var r2 = getDecimalNum(num2);
  var m = Math.pow(10, Math.max(r1, r2));
  var n = r1 >= r2 ? r1 : r2;
  return ((num1 * m - num2 * m) / m).toFixed(n);
}

var Stepper = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-stepper", class: { 'disabled': _vm.disabled } }, [_c('div', { staticClass: "md-stepper-button md-stepper-button-reduce", class: { 'disabled': _vm.isMin }, on: { "click": _vm.$_reduce } }), _vm._v(" "), _c('div', { staticClass: "md-stepper-number" }, [_c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.currentNum, expression: "currentNum" }], attrs: { "type": "tel", "readOnly": _vm.readOnly }, domProps: { "value": _vm.currentNum }, on: { "blur": _vm.$_reset, "change": _vm.$_onChange, "input": function input($event) {
          if ($event.target.composing) {
            return;
          }_vm.currentNum = $event.target.value;
        } } })]), _vm._v(" "), _c('div', { staticClass: "md-stepper-button md-stepper-button-add", class: { 'disabled': _vm.isMax }, on: { "click": _vm.$_add } })]);
  }, staticRenderFns: [],
  name: 'md-stepper',

  components: {},

  props: {
    defaultValue: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: -Number.MAX_VALUE
    },
    max: {
      type: Number,
      default: Number.MAX_VALUE
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      isMin: false,
      isMax: false,
      currentNum: 0
    };
  },


  watch: {
    defaultValue: function defaultValue() {
      this.currentNum = this._getCurrentNum();
    },
    min: function min(val) {
      if (this.currentNum < val) {
        this.currentNum = val;
      }
      this.$_checkStatus();
    },
    max: function max(val) {
      if (this.currentNum > val) {
        this.currentNum = val;
      }
      this.$_checkStatus();
    }
  },

  mounted: function mounted() {
    // verify that the minimum value is less than the maximum value
    this.$_checkMinMax();
    this.currentNum = this.$_getCurrentNum();
    this.$_checkStatus();
  },


  methods: {
    // MARK: 私有方法
    $_reduce: function $_reduce() {
      if (this.disabled || this.isMin) {
        return;
      }
      this.currentNum = subtr(this.currentNum, this.step);
      this.$_onChange();
    },
    $_add: function $_add() {
      if (this.disabled || this.isMax) {
        return;
      }
      this.currentNum = accAdd(this.currentNum, this.step);
      this.$_onChange();
    },
    $_getCurrentNum: function $_getCurrentNum() {
      var num = this.defaultValue;
      if (num < this.min) {
        return this.min;
      } else if (num > this.max) {
        return this.max;
      } else {
        return this.defaultValue;
      }
    },
    $_checkStatus: function $_checkStatus() {
      this.isMin = subtr(this.currentNum, this.step) < this.min;
      this.isMax = accAdd(this.currentNum, this.step) > this.max;
    },
    $_checkMinMax: function $_checkMinMax() {
      if (this.min > this.max) {
        warn$2('[md-vue-stepper] minNum is larger than maxNum');
      }
      return this.max > this.min;
    },
    $_reset: function $_reset() {
      if (!this.currentNum || isNaN(this.currentNum)) {
        this.currentNum = this.min !== -Number.MAX_VALUE ? this.min : 0;
      }
    },


    // MARK: 监听事件方法, 如 $_onButtonClick
    $_onChange: function $_onChange() {
      var currentNum = this.currentNum ? this.currentNum : this.min;
      if (currentNum < this.min) {
        this.currentNum = this.min;
      } else if (currentNum > this.max) {
        this.currentNum = this.max;
      }
      this.$_checkStatus();
      this.$emit('change', this.currentNum);
    }
  }
};

function _defineProperty$13(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Steps = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-steps" }, [_vm._l(_vm.steps, function (step, index) {
      return [index ? _c('div', { key: 'bar-' + index, staticClass: "bar", class: { reached: index <= _vm.current } }) : _vm._e(), _vm._v(" "), _c('div', { key: 'icon-' + index, staticClass: "icon-wrapper" }, [_c('div', { staticClass: "icon", class: { reached: index <= _vm.current, current: index === _vm.current } }, [index < _vm.current && _vm.$scopedSlots.reached ? _vm._t("reached") : index === _vm.current && _vm.$slots.current ? _vm._t("current") : index < _vm.current ? _c('md-icon', { attrs: { "name": "circle-right" } }) : index === _vm.current ? _c('md-icon', { attrs: { "name": "circle-alert" } }) : _c('div', { staticClass: "md-stain" })], 2), _vm._v(" "), _c('div', { staticClass: "text-wrapper" }, [_c('div', { staticClass: "text" }, [_vm._v(" " + _vm._s(step.name) + " ")])])])];
    })], 2);
  }, staticRenderFns: [],
  name: 'md-steps',

  components: _defineProperty$13({}, Icon.name, Icon),

  props: {
    steps: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    current: {
      type: Number,
      default: 0,
      validator: function validator(currentStep) {
        return currentStep >= 0;
      }
    }
  }
};

function _defineProperty$14(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NoticeBar = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.isShow ? _c('div', { staticClass: "md-notice-bar" }, [[_c('md-icon', { staticClass: "md-notice-icon md-notice-icon-left", attrs: { "name": _vm.icon } })], _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm.closable ? [_c('md-icon', { staticClass: "md-notice-icon md-notice-icon-right", attrs: { "name": "cross" }, nativeOn: { "click": function click($event) {
          return _vm.$_close($event);
        } } })] : _vm._e()], 2) : _vm._e();
  }, staticRenderFns: [],
  name: 'md-notice-bar',

  components: _defineProperty$14({}, Icon.name, Icon),

  props: {
    closable: {
      type: Boolean,
      default: true
    },
    time: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'circle-alert'
    }
  },

  data: function data() {
    return {
      isShow: true
    };
  },
  mounted: function mounted() {
    if (this.time) {
      this.$_hide(this.time);
    }
  },


  methods: {
    // MARK: private methods
    $_hide: function $_hide(time) {
      var _this = this;

      setTimeout(function () {
        _this.isShow = false;
      }, time);
    },
    $_close: function $_close() {
      this.isShow = false;
    }
  }
};

/**
 * Read Image In Web Worker or main thread
 * 
 * STATUS
 * 0: success
 * 100: 'browser does not support',
 * 101: 'picture size is beyond the preset',
 * 102: 'picture read failure',
 * 103: 'the number of pictures exceeds the limit'
 */

function createImageReader (global) {
  /**
   * Constructor
   * @param{*} [Array]files 图片文件
   * @param{*} [Boolean]isWebWorker 是否为webwork模式调用
   * @param{*} [Number]size 单张图片大小限制
   * @param{*} [Function]complete 非webwork模式时 回调 res { errorCode: '0', file, dataUrl }
   */
  function ImageReader(options) {
    /* istanbul ignore if */
    if (!options.files) {
      return;
    }

    this.files = options.files;
    this.index = 0;
    this.size = options.size || 0;

    if (!options.isWebWorker && options.complete) {
      this.callback = options.complete;
    }

    this.readImage(options.files[this.index]);
  }

  ImageReader.prototype.readImage = function (file) {
    var _this = this;

    // iterator
    var next = this.files && this.index < this.files.length - 1 ? function () {
      _this.index += 1;
      _this.readImage(_this.files[_this.index]);
    } : null;

    var onReadImageComplete = function onReadImageComplete() {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      /* istanbul ignore else */
      if (_this.callback) {
        _this.callback(msg);
      } else {
        postMessage(msg);
      }
      next && next();
    };

    if (!this.size || file.size <= this.size) {
      var reader = new FileReader();

      reader.onload = function (readerEvt) {
        var dataUrl = readerEvt.target.result;
        onReadImageComplete({ errorCode: 0, file: file, dataUrl: dataUrl });
      };
      reader.onerror = function () {
        /* istanbul ignore next */
        onReadImageComplete({ errorCode: 102 });
      };

      reader.readAsDataURL(file);
    } else {
      onReadImageComplete({ errorCode: 101 });
    }
  };

  var onmessageCallback = function onmessageCallback(workerEvt) {
    var imageReader = new ImageReader(workerEvt.data);
    return imageReader;
  };

  if (global) {
    return function (data) {
      return onmessageCallback({ data: data });
    };
  } else {
    /* global onmessage */
    /* eslint no-unused-vars: 0 */
    /* eslint no-global-assign: 0 */
    /* istanbul ignore next */
    onmessage = onmessageCallback;
  }
}

/**
 * DataURI to ArrayBuffer
 * @param {*} dataURI 
 */
function dataURIToArrayBuffer(dataURI) {
  // 'data:image/jpeg;dataURI,...' => 'image/jpeg'
  // contentType = contentType || dataURI.match(/^data:([^;]+);base64,/mi)[1] || ''
  dataURI = dataURI.replace(/^data:([^;]+);base64,/gim, '').replace(/\s/g, '');

  var binary = atob(dataURI);
  var len = binary.length;
  var buffer = new ArrayBuffer(len);
  var view = new Uint8Array(buffer);

  for (var i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }

  return buffer;
}

/**
 * Base64 to Blob
 * @param  {String} dataURI
 */
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString = void 0;

  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia.buffer], { type: mimeString });
}

var ERROR = {
  '100': 'browser does not support',
  '101': 'picture size is beyond the preset',
  '102': 'picture read failure',
  '103': 'the number of pictures exceeds the limit'
};

var ImageReader = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-image-reader" }, [_c('input', { key: _vm.inputTmpKey, staticClass: "md-image-reader-file", attrs: { "type": "file", "name": _vm.name, "accept": _vm.mimeType, "capture": _vm.isCameraOnly, "multiple": _vm.isMultiple }, on: { "change": _vm.$_onFileChange } })]);
  }, staticRenderFns: [],
  name: 'md-image-reader',

  props: {
    name: {
      type: String,
      default: function _default() {
        return randomId('image-reader');
      }
    },
    size: {
      type: [String, Number],
      default: 0
    },
    mime: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    isCameraOnly: {
      type: Boolean,
      default: false
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
      default: 0
    }
  },

  data: function data() {
    return {
      inputTmpKey: Date.now() // trigger of refreshing input file
    };
  },


  computed: {
    mimeType: function mimeType() {
      if (this.mime.length) {
        var mimeStr = '';
        this.mime.forEach(function (type) {
          mimeStr += 'image/' + type + ',';
        });
        return mimeStr.substring(0, mimeStr.length - 1);
      } else {
        return 'image/*';
      }
    }
  },

  methods: {
    // MARK: private methods
    $_emitter: function $_emitter(event, data) {
      this.$emit(event, this.name, data);
    },
    $_openWebWorker: function $_openWebWorker(fn) {
      /* istanbul ignore next */
      return new Worker(functionToUrl(fn));
    },
    $_closeWebWorker: function $_closeWebWorker(worker) {
      /* istanbul ignore next */
      worker.terminate();
    },
    $_readFile: function $_readFile(fileElement) {
      var _this = this;

      var size = +this.size * 1000;
      var worker = void 0;
      var count = 0;

      /* istanbul ignore if */
      if (window.Worker) {
        worker = this.$_openWebWorker(createImageReader);
        // worker send
        worker.postMessage({
          files: fileElement.files,
          size: size,
          isWebWorker: true
        });
        // worker response
        worker.onmessage = function (evt) {
          _this.$_onReaderComplete(evt.data);

          count++;

          if (count === fileElement.length) {
            _this.$_closeWebWorker(worker);
          }
        };
      } else {
        // generate imageReader
        var imageReader = createImageReader(window);
        imageReader({
          files: fileElement.files,
          size: size,
          isWebWorker: false,
          complete: this.$_onReaderComplete
        });
      }
    },
    $_cleaeFile: function $_cleaeFile() {
      this.inputTmpKey = Date.now();
    },


    // MARK: events handler
    $_onFileChange: function $_onFileChange(event) {
      var fileElement = event.target;

      /* istanbul ignore next */
      if (fileElement.files && fileElement.files.length) {
        this.$_emitter('select', {
          files: Array.prototype.slice.call(fileElement.files)
        });

        // error 超出每次上传最大张数
        if (this.amount && fileElement.files.length > this.amount) {
          this.$_emitter('error', {
            code: '103',
            msg: ERROR['103']
          });
          this.$_cleaeFile();
          return;
        }

        this.$_readFile(fileElement);
      }
    },
    $_onReaderComplete: function $_onReaderComplete(_ref) {
      var errorCode = _ref.errorCode,
          dataUrl = _ref.dataUrl,
          file = _ref.file;

      if (errorCode) {
        this.$_emitter('error', {
          code: errorCode,
          msg: ERROR[errorCode]
        });
        return;
      }

      this.$_emitter('complete', {
        blob: dataURItoBlob(dataUrl),
        dataUrl: dataUrl,
        file: file
      });
      this.$_cleaeFile();
    }
  }
};

var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ImageViewer = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isViewerShow, expression: "isViewerShow" }], staticClass: "md-image-viewer", on: { "click": _vm.$_viewerClick } }, [_c('div', { staticClass: "viewer-container" }, [_vm.isViewerShow ? _c('swiper', { ref: "swiper", attrs: { "autoplay": 0, "default-index": _vm.currentImgIndex, "has-dots": false, "is-prevent": false }, on: { "after-change": _vm.$_afterChange } }, _vm._l(_vm.imgs, function (item, $index) {
      return _c('swiper-item', { key: $index, staticClass: "viewer-item-wrap", class: item.cls }, [_c('div', { staticClass: "item" }, [!!item.url ? _c('img', { attrs: { "src": item.url, "alt": item.alt } }) : _vm._e()])]);
    })) : _vm._e(), _vm._v(" "), _vm.hasDots ? _c('div', { staticClass: "viewer-index" }, [_vm._v(_vm._s(_vm.currentImgIndex + 1) + "/" + _vm._s(_vm.list.length))]) : _vm._e()], 1)]);
  }, staticRenderFns: [],
  name: 'md-image-viewer',

  components: {
    Swiper: Swiper,
    SwiperItem: SwiperItem
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    // will be deprecated in the future
    show: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    hasDots: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      isViewerShow: false,
      innerList: [],
      imgs: [],
      currentImgIndex: 0
    };
  },


  computed: {},

  watch: {
    // will be deprecated in the future
    show: function show(val) {
      var _this = this;

      this.currentImgIndex = this.initialIndex;
      this.isViewerShow = val;
      this.$nextTick(function () {
        _this.$_imgsInit();
      });
    },
    value: function value(val) {
      var _this2 = this;

      this.currentImgIndex = this.initialIndex;
      this.isViewerShow = val;
      this.$nextTick(function () {
        _this2.$_imgsInit();
      });
    },
    isViewerShow: function isViewerShow(val) {
      this.$emit('input', val);
      // will be deprecated in the future
      !val && this.$emit('update:show', val);
    }
  },

  mounted: function mounted() {
    this.isViewerShow = this.value || this.show;
  },

  // LiftCircle Hook
  /*
  beforeCreate
  created
  beforeMount
  mounted
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  destroyed
  errorCaptured
   */

  methods: {
    // MARK: private methods
    $_imgsInit: function $_imgsInit() {
      var _imgs = this.list;
      var _newImgs = [];
      _imgs.map(function (item) {
        var _item = (typeof item === 'undefined' ? 'undefined' : _typeof$3(item)) === 'object' ? item : { url: item };
        _newImgs.push(_item);
      });
      this.imgs = _newImgs;
    },
    $_afterChange: function $_afterChange(fromIndex, toIndex) {
      this.currentImgIndex = toIndex;
    },


    // MARK: events handler, 如 $_onButtonClick
    $_viewerClick: function $_viewerClick() {
      this.isViewerShow = false;
    },


    // MARK: public methods
    publicMethod: function publicMethod() {}
  }
};

var _components$7;

function _defineProperty$15(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Landscape = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-landscape" }, [_c('md-popup', { attrs: { "mask-closable": _vm.maskClosable, "prevent-scroll": "", "prevent-scroll-exclude": _vm.scroll ? '.content' : null, "has-mask": _vm.hasMask }, on: { "input": function input($event) {
          _vm.$emit('input', false);
        }, "show": function show($event) {
          _vm.$emit('show');
        }, "hide": function hide($event) {
          _vm.$emit('hide');
        } }, model: { value: _vm.isLandscapeShow, callback: function callback($$v) {
          _vm.isLandscapeShow = $$v;
        }, expression: "isLandscapeShow" } }, [_c('div', { staticClass: "content", class: { scroll: _vm.scroll } }, [_vm._t("default")], 2)]), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isLandscapeShow, expression: "isLandscapeShow" }], staticClass: "close", class: { dark: !_vm.hasMask }, on: { "click": _vm.$_close } }, [_c('md-icon', { attrs: { "name": "cross", "size": "lg" } })], 1)], 1);
  }, staticRenderFns: [],
  name: 'md-landscape',

  components: (_components$7 = {}, _defineProperty$15(_components$7, Popup.name, Popup), _defineProperty$15(_components$7, Icon.name, Icon), _components$7),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    scroll: {
      type: Boolean,
      default: false
    },
    hasMask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      isLandscapeShow: this.value
    };
  },


  watch: {
    value: function value(val) {
      this.isLandscapeShow = val;
    }
  },

  methods: {
    // MARK: private methods
    $_close: function $_close() {
      this.isLandscapeShow = false;
    }
  }
};

function _defineProperty$16(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ResultPage = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-result-page" }, [_c('img', { class: !_vm.imgUrl && _vm.type, attrs: { "src": _vm.actualImgUrl } }), _vm._v(" "), _c('div', { staticClass: "text" }, [_vm._v(_vm._s(_vm.actualText))]), _vm._v(" "), _vm.subtext ? _c('div', { staticClass: "subtext" }, [_vm._v(_vm._s(_vm.subtext))]) : _vm._e(), _vm._v(" "), _vm.buttons.length ? _c('div', { staticClass: "buttons" }, _vm._l(_vm.buttons, function (button, index) {
      return _c('md-button', { key: index, attrs: { "type": button.type || 'ghost' }, on: { "click": button.handler } }, [_vm._v(" " + _vm._s(button.text) + " ")]);
    })) : _vm._e()]);
  }, staticRenderFns: [],
  name: 'md-result-page',

  components: _defineProperty$16({}, Button.name, Button),

  props: {
    type: {
      type: String,
      default: 'empty'
    },
    imgUrl: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    subtext: {
      type: String,
      default: ''
    },
    buttons: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },

  data: function data() {
    var pre = '//manhattan.didistatic.com/static/manhattan/mfd/result-page/';
    var data = {
      actualImgUrl: this.imgUrl || '' + pre + this.type,
      actualText: this.text || {
        // 您要访问的页面已丢失
        lost: '\u60A8\u8981\u8BBF\u95EE\u7684\u9875\u9762\u5DF2\u4E22\u5931',
        // 网络连接异常
        network: '\u7F51\u7EDC\u8FDE\u63A5\u5F02\u5E38',
        // 暂无信息
        empty: '\u6682\u65E0\u4FE1\u606F'
      }[this.type]
    };
    return data;
  }
};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _components$8;

function _defineProperty$17(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TabPicker = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-tab-picker" }, [_c('md-popup', { attrs: { "position": "bottom", "mask-closable": _vm.maskClosable }, on: { "show": _vm.$_onShow, "hide": _vm.$_onHide, "maskClick": _vm.$_onMaskClose }, model: { value: _vm.isTabPickerShow, callback: function callback($$v) {
          _vm.isTabPickerShow = $$v;
        }, expression: "isTabPickerShow" } }, [_c('md-popup-title-bar', { attrs: { "title": _vm.title, "ok-text": _vm.okText, "cancel-text": _vm.cancelText }, on: { "confirm": _vm.$_onConfirm, "cancel": _vm.$_onCancel } }), _vm._v(" "), _c('div', { staticClass: "md-tab-picker-content" }, [_c('md-tabs', { key: _vm.refreshTabPicker, ref: "tabs", attrs: { "titles": _vm.subTitles, "default-index": _vm.defaultTabIndex, "force-use-array": _vm.hasTitleSlotScope }, on: { "indexChanged": _vm.$_onIndexChange }, scopedSlots: _vm._u([{ key: "title", fn: function fn(props) {
          return [_vm._t("titles", null, { label: props })];
        } }]) }, _vm._l(_vm.subTitles, function (title, index) {
      return _c('div', { key: index }, [_c('md-radio', { key: _vm.renderData[index].clickedKey, ref: "radio1", refInFor: true, attrs: { "options": _vm.renderData[index].data, "default-index": ~_vm.renderData[index].clickedKey ? _vm.renderData[index].clickedKey : -1, "is-slot-scope": _vm.hasOptionSlotScope }, on: { "change": _vm.$_onRadioChange }, scopedSlots: _vm._u([{ key: "default", fn: function fn(props) {
            return [_vm._t("option", null, { option: props.option, index: index })];
          } }]) })], 1);
    })), _vm._v(" "), _vm.isLoading || _vm.isDataError ? _c('div', { staticClass: "slot-wrapper" }, [_c('div', { staticClass: "slot-inner" }, [_vm.isDataError ? _vm._t("error", [_vm._v("数据异常")]) : _vm._e(), _vm._v(" "), _vm.isLoading ? _vm._t("loading", [_vm._v("loading")]) : _vm._e()], 2)]) : _vm._e()], 1)], 1)], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-0b0bc804',
  name: 'md-tab-picker',

  components: (_components$8 = {}, _defineProperty$17(_components$8, Popup.name, Popup), _defineProperty$17(_components$8, PopupTitleBar.name, PopupTitleBar), _defineProperty$17(_components$8, Tabs.name, Tabs), _defineProperty$17(_components$8, Icon.name, Icon), _defineProperty$17(_components$8, Radio.name, Radio), _components$8),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    dataStruct: {
      type: String,
      default: 'normal'
    },
    defaultIndex: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    optionRender: {
      type: Array,
      default: function _default() {
        return [];
      },
      validator: function validator(value) {
        if (value.length > 0) {
          return value.every(function (item) {
            return typeof item === 'function';
          });
        } else {
          return true;
        }
      }
    },
    asyncFunc: {
      type: Function,
      default: function _default() {
        return noop$1;
      }
    }
  },

  data: function data() {
    return {
      isTabPickerShow: false,
      subTitles: [],
      renderData: [],
      defaultTabIndex: 0,
      currentIndex: 0,
      isLoading: true,
      isDataError: false,
      currentColumnLock: false,
      lastSelectIndex: null,
      refreshTabPicker: 0,
      walkTimes: 0
    };
  },


  watch: {
    value: function value(val) {
      val && (this.isTabPickerShow = val);
    },
    isTabPickerShow: function isTabPickerShow(val) {
      !val && this.$emit('input', val);
    },

    data: {
      handler: function handler(val, oldVal) {
        if (!compareObjects(val, oldVal)) {
          this.$_initTabPicker();
        }
      },

      deep: true
    },
    isDataError: function isDataError(val) {
      var _this = this;

      if (val) {
        setTimeout(function () {
          _this.isDataError = false;
        }, 2000);
      }
    }
  },

  computed: {
    hasTitleSlotScope: function hasTitleSlotScope() {
      return !!this.$scopedSlots.titles;
    },
    hasOptionSlotScope: function hasOptionSlotScope() {
      return !!this.$scopedSlots.option;
    }
  },

  created: function created() {
    this.$_initTabPicker();
  },


  methods: {
    // MARK: private methods
    $_initTabPicker: function $_initTabPicker() {
      switch (this.dataStruct) {
        case 'normal':
          this.$_initNoCascadeData();
          break;
        case 'cascade':
          this.$_initCascadeData();
          break;
        case 'async':
          this.$_initAsyncCascadeData();
          break;
        default:
          break;
      }
    },
    $_initNoCascadeData: function $_initNoCascadeData() {
      var _this2 = this;

      if (this.data.length === 0) {
        return;
      }
      this.isLoading = false;

      var initialIndex = this.lastSelectIndex || this.defaultIndex;
      this.$_initTabContent();

      this.data.forEach(function (item, index) {
        var temp = {
          index: index,
          clickedKey: initialIndex.length > 0 && ~initialIndex[index] ? initialIndex[index] : -1,
          data: item.children
        };
        _this2.renderData.push(temp);
        var currentColumn = _this2.renderData[index];
        if (initialIndex && initialIndex.length > 0) {
          _this2.subTitles.push(currentColumn.data[currentColumn.clickedKey].label);
        } else {
          _this2.subTitles.push(item.label);
        }
      });
    },
    $_initCascadeData: function $_initCascadeData() {
      if (this.data.length === 0) {
        return;
      }
      var initialIndex = this.lastSelectIndex || this.defaultIndex;
      this.$_walk(initialIndex, this.data);
    },
    $_initAsyncCascadeData: function $_initAsyncCascadeData() {
      this.asyncFunc(null, this.$_renderInitalAsync);
    },
    $_renderInitalAsync: function $_renderInitalAsync(err, data) {
      if (err) {
        this.isDataError = err;
        return;
      }
      var initialIndex = this.lastSelectIndex || this.defaultIndex;
      this.$_walk(initialIndex, data, true);
    },
    $_walk: function $_walk(initialIndex, data, isAsync) {
      var _this3 = this;

      // recursion cascade or async data with initialIndex
      var func = function func() {
        if (initialIndex && initialIndex.length > 0) {
          var walk = function walk(err, data) {
            if (err) {
              _this3.isLoading = false;
              _this3.isDataError = err;
              return;
            }
            if (_this3.walkTimes < initialIndex.length) {
              var temp = initialIndex[_this3.walkTimes];
              var rawData = isAsync ? data.options : data;
              rawData.forEach(function (item, eq, array) {
                if (eq === temp) {
                  _this3.currentIndex = _this3.walkTimes;
                  _this3.subTitles.splice(_this3.currentIndex, _this3.subTitles.length - 1, item.label);
                  var renderContent = {
                    index: _this3.walkTimes,
                    clickedKey: temp,
                    data: array
                  };
                  if (isAsync) {
                    renderContent = _extends({}, renderContent, {
                      asyncFunc: data.asyncFunc
                    });
                  }
                  _this3.renderData.splice(_this3.currentIndex, _this3.renderData.length - 1, renderContent);
                  _this3.$refs.tabs && _this3.$refs.tabs.selectTab(_this3.currentIndex);
                  _this3.walkTimes++;
                  if (item && item.children && Array.isArray(item.children)) {
                    walk(null, item.children);
                  } else if (isAsync && data && data.asyncFunc && typeof data.asyncFunc === 'function') {
                    data.asyncFunc({
                      index: _this3.walkTimes,
                      item: item,
                      eq: eq
                    }, walk);
                  } else {
                    walk();
                  }
                }
              });
            } else {
              _this3.isLoading = false;
              _this3.defaultTabIndex = _this3.walkTimes - 1;
              _this3.walkTimes = 0;
              return false;
            }
          };
          walk(null, data);
        } else {
          _this3.$_initTabContent();
          _this3.subTitles.push('请选择');
          if (isAsync) {
            _this3.renderData.push({
              index: 0,
              clickedKey: -1,
              data: data.options,
              asyncFunc: data.asyncFunc
            });
          } else {
            _this3.renderData.push({
              index: 0,
              clickedKey: -1,
              data: data
            });
          }
          _this3.isLoading = false;
        }
      };
      func();
    },
    $_initTabContent: function $_initTabContent() {
      this.subTitles = [];
      this.renderData = [];
      this.currentIndex = 0;
    },
    $_renderNextTabContent: function $_renderNextTabContent(orignData) {
      var _this4 = this;

      return function (err, asyncData) {
        _this4.isLoading = false;
        if (err) {
          _this4.isDataError = err;
          return;
        }
        try {
          var data = void 0,
              asyncFunc = null;
          if (orignData) {
            data = orignData;
          } else if (asyncData && asyncData.options) {
            data = asyncData.options;
            if (asyncData.asyncFunc) {
              asyncFunc = asyncData.asyncFunc;
            }
          } else {
            data = [];
          }
          _this4.subTitles.splice(_this4.currentIndex + 1, _this4.subTitles.length - 1, '请选择');
          _this4.renderData.splice(_this4.currentIndex + 1, _this4.renderData.length - 1, {
            index: _this4.currentIndex,
            clickedKey: -1,
            data: data,
            asyncFunc: asyncFunc
          });
          if (_this4.renderData.length > 1) {
            _this4.$nextTick(function () {
              _this4.$refs.tabs.selectTab(++_this4.currentIndex);
              setTimeout(function () {
                _this4.currentColumnLock = false;
              }, 500);
            });
          }
        } catch (error) {
          _this4.isDataError = true;
        }
      };
    },
    $_refreshTabPicker: function $_refreshTabPicker() {
      var _this5 = this;

      // revoke this opration
      this.isTabPickerShow = false;
      this.isLoading = true;
      this.isDataError = false;
      this.currentColumnLock = false;
      this.refreshTabPicker = Math.random();
      this.$nextTick(function () {
        _this5.$_initTabPicker();
      });
    },


    // MARK: events handler, 如 $_onButtonClick
    $_onShow: function $_onShow() {
      this.$emit('show');
    },
    $_onHide: function $_onHide() {
      this.$emit('hide');
    },
    $_onConfirm: function $_onConfirm() {
      this.isTabPickerShow = false;
      var selectedItem = this.getSelectedItem();
      var isSelectPart = selectedItem.some(function (option) {
        return !option;
      });
      if (!isSelectPart) {
        this.lastSelectIndex = selectedItem.map(function (option) {
          return option.item.eq;
        });
      }
      this.$emit('confirm', selectedItem);
    },
    $_onCancel: function $_onCancel() {
      this.$emit('cancel');
      this.$_refreshTabPicker();
    },
    $_onMaskClose: function $_onMaskClose() {
      this.$_refreshTabPicker();
    },
    $_onRadioChange: function $_onRadioChange(value, index) {
      if (this.dataStruct === 'cascade' && this.currentColumnLock) {
        return;
      }
      this.currentColumnLock = true;
      this.subTitles[this.currentIndex] = value.label;
      var currentColumn = this.renderData[this.currentIndex];
      currentColumn.clickedKey = index;
      this.$emit('change', {
        selectTab: this.currentIndex,
        selectIndex: index,
        selectItem: value
      });
      if (this.dataStruct === 'cascade') {
        if (value && value.children && Array.isArray(value.children) && value.children.length > 0) {
          this.$_renderNextTabContent(value.children)();
          return;
        }
        this.currentColumnLock = false;
      }
      if (this.dataStruct === 'async' && currentColumn.asyncFunc) {
        value = _extends({
          index: index
        }, value);
        // Object.assign(value, {index})
        this.isLoading = true;
        typeof currentColumn.asyncFunc === 'function' && currentColumn.asyncFunc(value, this.$_renderNextTabContent());
      }
    },
    $_onIndexChange: function $_onIndexChange(index) {
      this.currentIndex = index;
    },


    // MARK: public methods
    getSelectedItem: function getSelectedItem() {
      return this.renderData.map(function (item, index) {
        if (~item.clickedKey) {
          var selected = item.data[item.clickedKey];
          return {
            index: index,
            item: {
              label: selected.label,
              value: selected.value,
              eq: item.clickedKey
            }
          };
        } else {
          return null;
        }
      });
    }
  }
};

var _components$9;

function _defineProperty$18(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dialog = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-dialog" }, [_c('md-popup', { attrs: { "value": _vm.value, "hasMask": _vm.hasMask, "maskClosable": _vm.maskClosable, "position": _vm.position, "transition": _vm.transition, "preventScroll": _vm.preventScroll, "preventScrollExclude": _vm.preventScrollExclude }, on: { "input": _vm.$_onInput, "show": _vm.$_onShow, "hide": _vm.$_onHide } }, [_c('div', { staticClass: "md-dialog-content" }, [_c('div', { staticClass: "md-dialog-body" }, [_vm.closable ? _c('a', { staticClass: "md-dialog-close", attrs: { "role": "button" }, on: { "click": _vm.close } }, [_c('md-icon', { attrs: { "name": "cross" } })], 1) : _vm._e(), _vm._v(" "), _vm.icon ? _c('div', { staticClass: "md-dialog-icon" }, [_c('md-icon', { attrs: { "name": _vm.icon } })], 1) : _vm._e(), _vm._v(" "), _vm.title ? _c('h2', { staticClass: "md-dialog-title", domProps: { "textContent": _vm._s(_vm.title) } }) : _vm._e(), _vm._v(" "), _vm.content ? _c('div', { staticClass: "md-dialog-text", domProps: { "innerHTML": _vm._s(_vm.content) } }) : _vm.$slots.default ? _c('div', { staticClass: "md-dialog-text" }, [_vm._t("default")], 2) : _vm._e()]), _vm._v(" "), _c('footer', { staticClass: "md-dialog-actions" }, _vm._l(_vm.btns, function (btn, index) {
      return _c('a', { key: index, attrs: { "role": "button" }, domProps: { "textContent": _vm._s(btn.text) }, on: { "click": function click($event) {
            _vm.$_onClick(btn);
          } } });
    }))])])], 1);
  }, staticRenderFns: [],
  name: 'md-dialog',

  components: (_components$9 = {}, _defineProperty$18(_components$9, Popup.name, Popup), _defineProperty$18(_components$9, Icon.name, Icon), _components$9),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: ''
    },
    btns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    appendTo: {
      default: function _default() {
        return document.body;
      }
    },
    hasMask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'center'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    preventScroll: {
      type: Boolean,
      default: false
    },
    preventScrollExclude: {
      type: String,
      default: ''
    }
  },

  mounted: function mounted() {
    if (this.appendTo) {
      this.appendTo.appendChild(this.$el);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.appendTo) {
      this.appendTo.removeChild(this.$el);
    }
  },


  methods: {
    // MARK: private methods

    // MARK: events handler
    $_onInput: function $_onInput(val) {
      this.$emit('input', val);
    },
    $_onShow: function $_onShow() {
      this.$emit('show');
    },
    $_onHide: function $_onHide() {
      this.$emit('hide');
    },
    $_onClick: function $_onClick(btn) {
      if (typeof btn.handler === 'function') {
        btn.handler.call(null);
      } else {
        this.close();
      }
    },

    // MARK: public methods
    close: function close() {
      this.$emit('input', false);
    }
  }
};

var DialogConstructor = Vue.extend(Dialog);

/* istanbul ignore next */
var noop$3 = function noop() {};

// all active instances
var instances$1 = [];

/**
 * Dialog factory
 *
 * @param {Object} props
 * @return {Dialog}
 */
var generate = function generate(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === undefined ? '' : _ref$title,
      _ref$icon = _ref.icon,
      icon = _ref$icon === undefined ? '' : _ref$icon,
      _ref$content = _ref.content,
      content = _ref$content === undefined ? '' : _ref$content,
      _ref$closable = _ref.closable,
      closable = _ref$closable === undefined ? false : _ref$closable,
      _ref$btns = _ref.btns,
      btns = _ref$btns === undefined ? [] : _ref$btns;

  var vm = new DialogConstructor({
    propsData: {
      value: true,
      title: title,
      icon: icon,
      content: content,
      closable: closable,
      btns: btns
    }
  }).$mount();

  instances$1.push(vm);

  vm.$on('input', function (val) {
    /* istanbul ignore else */
    if (!val) {
      vm.value = false;
    }
  });
  vm.$on('hide', function () {
    var index = instances$1.indexOf(vm);
    /* istanbul ignore else */
    if (index >= 0) {
      instances$1.splice(index, 1);
    }
    vm.$destroy();
  });

  return vm;
};

/**
 * Dynamically create a confirm dialog
 *
 * @param {Object} props
 * @return {Dialog}
 */
Dialog.confirm = function (_ref2) {
  var _ref2$title = _ref2.title,
      title = _ref2$title === undefined ? '' : _ref2$title,
      _ref2$icon = _ref2.icon,
      icon = _ref2$icon === undefined ? '' : _ref2$icon,
      _ref2$content = _ref2.content,
      content = _ref2$content === undefined ? '' : _ref2$content,
      _ref2$cancelText = _ref2.cancelText,
      cancelText = _ref2$cancelText === undefined ? '取消' : _ref2$cancelText,
      _ref2$confirmText = _ref2.confirmText,
      confirmText = _ref2$confirmText === undefined ? '确定' : _ref2$confirmText,
      _ref2$closable = _ref2.closable,
      closable = _ref2$closable === undefined ? false : _ref2$closable,
      _ref2$onConfirm = _ref2.onConfirm,
      onConfirm = _ref2$onConfirm === undefined ? noop$3 : _ref2$onConfirm;

  var vm = generate({
    title: title,
    icon: icon,
    content: content,
    closable: closable,
    btns: [{
      text: cancelText,
      handler: /* istanbul ignore next */function handler() {
        return vm.close();
      }
    }, {
      text: confirmText,
      handler: /* istanbul ignore next */function handler() {
        if (onConfirm() !== false) {
          vm.close();
        }
      }
    }]
  });

  return vm;
};

/**
 * Dynamically create a alert dialog
 *
 * @param {Object} props
 * @return {Dialog}
 */
Dialog.alert = function (_ref3) {
  var _ref3$title = _ref3.title,
      title = _ref3$title === undefined ? '' : _ref3$title,
      _ref3$icon = _ref3.icon,
      icon = _ref3$icon === undefined ? '' : _ref3$icon,
      _ref3$content = _ref3.content,
      content = _ref3$content === undefined ? '' : _ref3$content,
      _ref3$confirmText = _ref3.confirmText,
      confirmText = _ref3$confirmText === undefined ? '确定' : _ref3$confirmText,
      _ref3$closable = _ref3.closable,
      closable = _ref3$closable === undefined ? false : _ref3$closable,
      _ref3$onConfirm = _ref3.onConfirm,
      onConfirm = _ref3$onConfirm === undefined ? noop$3 : _ref3$onConfirm;

  var vm = generate({
    title: title,
    icon: icon,
    content: content,
    closable: closable,
    btns: [{
      text: confirmText,
      handler: /* istanbul ignore next */function handler() {
        if (onConfirm() !== false) {
          vm.close();
        }
      }
    }]
  });

  return vm;
};

/**
 * Dynamically create a succeed dialog
 *
 * @param {Object} props
 * @return {Dialog}
 */
Dialog.succeed = function (props) {
  props.icon = 'circle-right';
  return Dialog.confirm(props);
};

/**
 * Dynamically create a failed dialog
 *
 * @param {Object} props
 * @return {Dialog}
 */
Dialog.failed = function (props) {
  props.icon = 'circle-cross';
  return Dialog.confirm(props);
};

/**
 * Close all actived static dialogs
 *
 * @static
 * @return void
 */
Dialog.closeAll = function () {
  instances$1.forEach(function (instance) {
    instance.close();
  });
};

var Switch = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-switch", class: [_vm.disabled ? 'disabled' : '', _vm.value ? 'active' : ''], on: { "click": function click($event) {
          _vm.$_onChange($event);
        } } });
  }, staticRenderFns: [],
  name: 'md-switch',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {};
  },


  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onChange: function $_onChange(event) {
      if (this.disabled) {
        return;
      }
      this.$emit('input', !this.value);
      this.$emit('change', event);
    }
  }
};

function _defineProperty$19(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Agree = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-agree", class: [_vm.disabled ? 'disabled' : ''] }, [_c('div', { staticClass: "md-agree-icon", class: [_vm.value ? 'checked' : ''], on: { "click": function click($event) {
          _vm.$_onChange($event);
        } } }, [_c('md-icon', { attrs: { "name": _vm.iconName, "size": _vm.size } })], 1), _vm._v(" "), _c('div', { staticClass: "md-agree-content" }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'md-agree',

  components: _defineProperty$19({}, Icon.name, Icon),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md'
    }
  },

  data: function data() {
    return {};
  },


  computed: {
    iconName: function iconName() {
      return this.value ? 'circle-right' : 'circle';
    }
  },

  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onChange: function $_onChange(event) {
      if (this.disabled) {
        return;
      }
      this.$emit('input', !this.value);
      this.$emit('change', event);
    }
  }
};

function _toConsumableArray$4(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty$20(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// yyyy-MM-dd hh:mm:ss => Year-Month-Date Hour:Minute
var TYPE_FORMAT = {
  'yyyy': 'Year',
  'MM': 'Month',
  'dd': 'Date',
  'hh': 'Hour',
  'mm': 'Minute'
};

var TYPE_FORMAT_INVERSE = toObject$1(Object.keys(TYPE_FORMAT).map(function (item) {
  return _defineProperty$20({}, TYPE_FORMAT[item], item);
}));

var TYPE_METHODS = {
  'Year': 'getFullYear',
  'Month': 'getMonth',
  'Date': 'getDate',
  'Hour': 'getHours',
  'Minute': 'getMinutes'
};

var DatePicker = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-date-picker", class: [_vm.type] }, [_c('md-picker', { ref: "picker", attrs: { "data": _vm.columnData, "cols": _vm.columnData.length, "default-value": _vm.columnDataDefault, "title": _vm.title, "ok-text": _vm.okText, "cancel-text": _vm.cancelText, "is-view": _vm.isView, "mask-closable": _vm.maskClosable }, on: { "initialed": function initialed($event) {
          _vm.$emit('initialed');
        }, "change": _vm.$_onPickerChange, "confirm": _vm.$_onPickerConfirm, "cancel": _vm.$_onPickerCancel, "show": _vm.$_onPickerShow, "hide": _vm.$_onPickerHide }, model: { value: _vm.isPickerShow, callback: function callback($$v) {
          _vm.isPickerShow = $$v;
        }, expression: "isPickerShow" } })], 1);
  }, staticRenderFns: [],
  name: 'md-date-picker',

  components: _defineProperty$20({}, Picker.name, Picker),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: { // date, time, datetime， custom
      type: String,
      default: 'date'
    },
    customTypes: { // yyyy, MM, dd, hh, mm
      type: Array,
      default: function _default() {
        return [];
      },
      validator: function validator(val) {
        var res = true;
        val.forEach(function (type) {
          type = TYPE_FORMAT[type] || type;
          /* istanbul ignore if */
          if (!(type in TYPE_METHODS)) {
            return res = false;
          }
        });
        return res;
      }
    },
    minDate: {
      type: Date
    },
    maxDate: {
      type: Date
    },
    defaultDate: {
      type: Date
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    unitText: {
      type: Array,
      default: function _default() {
        return ['年', '月', '日', '时', '分'];
      }
    },
    todayText: {
      type: String,
      default: ''
    },
    halfDayText: {
      type: Array,
      default: function _default() {
        return ['上午', '下午'];
      }
    },
    textRender: {
      type: [Function, String],
      default: ''
    },
    isTwelveHours: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    okText: {
      type: String
    },
    cancelText: {
      type: String
    },
    isView: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      isPickerShow: false,
      currentDateIns: new Date(),
      columnData: [],
      oldColumnData: null,
      columnDataDefault: [],
      columnDataGenerator: [],
      disabledCascadeComlumnIndex: [] // columns do not need cascading 
    };
  },


  computed: {
    picker: function picker() {
      return this.$refs['picker'];
    },
    currentYear: function currentYear() {
      return this.currentDateIns.getFullYear();
    },
    currentMonth: function currentMonth() {
      return this.currentDateIns.getMonth() + 1;
    },
    currentDate: function currentDate() {
      return this.currentDateIns.getDate();
    }
  },

  watch: {
    value: function value(val) {
      this.isPickerShow = val;
    },
    isPickerShow: function isPickerShow(val) {
      if (!val) {
        this.$emit('input', val);
      }
    },
    defaultDate: function defaultDate() {
      this.$_initPickerColumn();
    },
    minDate: function minDate() {
      this.$_initPickerColumn();
    },
    maxDate: function maxDate() {
      this.$_initPickerColumn();
    }
  },

  mounted: function mounted() {
    this.$_initPicker();
  },


  methods: {
    // MARK: private methods
    $_initPicker: function $_initPicker() {
      if (!this.isView && this.value) {
        this.isPickerShow = this.value;
      }

      this.picker.inheritPickerApi(this);
      this.$_initPickerColumn();
    },
    $_initPickerColumn: function $_initPickerColumn() {
      this.$_initColumnDataGenerator();
      this.$_initColumnData(0, this.columnDataDefault, false);
    },
    $_initColumnData: function $_initColumnData(columnIndex) {
      var defaultDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var isSetColumn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var columnData = this.columnData;
      var columnDataGenerator = this.columnDataGenerator;
      for (var i = columnIndex, len = columnDataGenerator.length; i < len; i++) {
        // Collect parameters for columnDataGenerator
        var columnDataGeneratorParams = [];
        var generator = columnDataGenerator[i];

        for (var j = 0; j < i; j++) {
          if (defaultDate[j]) {
            columnDataGeneratorParams.push(defaultDate[j]);
            continue;
          }

          var itemIndex = this.picker.getColumnIndex(j) || 0;
          if (columnData[j]) {
            columnDataGeneratorParams.push(columnData[j][itemIndex]['value']);
          } else {
            columnDataGeneratorParams.push('');
            warn$2('DatePicker columnData of index ' + j + ' is void');
          }
        }
        // Generator colume data with columnDataGeneratorParams
        var curColumnData = generator ? generator.apply(this, columnDataGeneratorParams) : '';

        // set picker column data & refresh picker
        isSetColumn && this.picker.setColumnValues(i, curColumnData);

        // store column date
        this.$set(columnData, i, curColumnData);
      }

      isSetColumn && this.picker.refresh(null, columnIndex);
    },
    $_initColumnDataGenerator: function $_initColumnDataGenerator() {
      var defaultDate = this.$_getDefaultDate();
      switch (this.type) {
        case 'date':
          this.$_initColumnDataGeneratorForDate(defaultDate);
          break;
        case 'time':
          this.$_initColumnDataGeneratorForTime(defaultDate);
          this.disabledCascadeComlumnIndex = [0, 1, 2];
          break;
        case 'datetime':
          this.$_initColumnDataGeneratorForDate(defaultDate);
          this.$_initColumnDataGeneratorForTime(defaultDate);
          this.disabledCascadeComlumnIndex = [2, 3, 4, 5];
          break;
        default:
          this.$_initColumnDataGeneratorForCustom(defaultDate);
          break;
      }
    },
    $_initColumnDataGeneratorForDate: function $_initColumnDataGeneratorForDate(defaultDate) {
      this.columnDataGenerator = this.columnDataGenerator.concat([this.$_generateYearData, this.$_generateMonthData, this.$_generateDateData]);

      this.columnDataDefault = defaultDate ? this.columnDataDefault.concat([defaultDate.getFullYear(), defaultDate.getMonth() + 1, defaultDate.getDate()]) : [];
    },
    $_initColumnDataGeneratorForTime: function $_initColumnDataGeneratorForTime(defaultDate) {
      this.columnDataGenerator = this.columnDataGenerator.concat([this.$_generateHourData, this.$_generateMinuteData]);

      if (this.isTwelveHours) {
        this.columnDataGenerator.push(this.$_generateAPData);
        if (defaultDate) {
          var hourInfo = this.$_transHourTo12(defaultDate.getHours());
          this.columnDataDefault = this.columnDataDefault.concat([hourInfo.hour, defaultDate.getMinutes(), hourInfo.ap]);
        }
      } else {
        this.columnDataDefault = defaultDate ? this.columnDataDefault.concat([defaultDate.getHours(), defaultDate.getMinutes()]) : [];
      }
    },
    $_initColumnDataGeneratorForCustom: function $_initColumnDataGeneratorForCustom(defaultDate) {
      var _this = this;

      var hourInfo = void 0;
      this.customTypes.forEach(function (type, index) {
        type = TYPE_FORMAT[type] || type;
        if (type === 'Date' || type === 'Hour' || type === 'Minute') {
          _this.disabledCascadeComlumnIndex.push(index);
        }
        _this.columnDataGenerator.push(_this['$_generate' + type + 'Data']);

        if (defaultDate) {
          var value = defaultDate[TYPE_METHODS[type]]();

          if (type === 'Month') {
            value += 1;
          }

          if (_this.isTwelveHours && type === 'Hour') {
            hourInfo = _this.$_transHourTo12(value);
            value = hourInfo.hour;
          }
          _this.columnDataDefault.push(value);
        }
      });

      if (this.isTwelveHours && ~this.customTypes.indexOf('Hour')) {
        this.columnDataGenerator.push(this.$_generateAPData);
        this.columnDataDefault.push(hourInfo.ap);
      }
    },
    $_getDefaultDate: function $_getDefaultDate() {
      var defaultDate = this.defaultDate;
      var minDate = this.minDate;
      var maxDate = this.maxDate;

      if (!defaultDate) {
        return defaultDate;
      }

      if (minDate && defaultDate.getTime() < minDate.getTime()) {
        return minDate;
      }

      if (maxDate && defaultDate.getTime() > maxDate.getTime()) {
        return maxDate;
      }

      return defaultDate;
    },
    $_generateYearData: function $_generateYearData() {
      var start = this.minDate ? this.minDate.getFullYear() : this.currentYear - 20;
      var end = this.maxDate ? this.maxDate.getFullYear() : this.currentYear + 20;
      if (start > end) {
        warn$2('MinDate Year should be earlier than MaxDate');
        return;
      }
      return this.$_generateData(start, end, 'Year', this.unitText[0], 1);
    },
    $_generateMonthData: function $_generateMonthData() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentYear;

      var start = void 0,
          end = void 0;

      if (this.minDate && this.minDate.getFullYear() === year) {
        start = this.minDate.getMonth() + 1;
      } else {
        start = 1;
      }

      if (this.maxDate && this.maxDate.getFullYear() === year) {
        end = this.maxDate.getMonth() + 1;
      } else {
        end = 12;
      }

      return this.$_generateData(start, end, 'Month', this.unitText[1] || '');
    },
    $_generateDateData: function $_generateDateData() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentYear;
      var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentMonth;

      var start = void 0,
          end = void 0;

      if (this.minDate && this.minDate.getFullYear() === year && this.minDate.getMonth() + 1 === month) {
        start = this.minDate.getDate();
      } else {
        start = 1;
      }

      if (this.maxDate && this.maxDate.getFullYear() === year && this.maxDate.getMonth() + 1 === month) {
        end = this.maxDate.getDate();
      } else {
        end = new Date(year, month, 0).getDate();
      }

      var dateData = this.$_generateData(start, end, 'Date', this.unitText[2] || '', 1, arguments);

      if (year === this.currentYear && month === this.currentMonth && this.currentDate >= start && this.currentDate <= end && this.todayText) {
        var currentDateIndex = this.currentDate - start;
        var currentDate = dateData[currentDateIndex].text;
        dateData[currentDateIndex].text = this.todayText.replace('&', currentDate);
      }

      return dateData;
    },
    $_generateHourData: function $_generateHourData() {
      var start = this.minDate ? this.minDate.getHours() : 0;
      var end = this.maxDate ? this.maxDate.getHours() : 23;

      if (end < start) {
        end = 23;
      }

      if (this.isTwelveHours) {
        start = this.$_transHourTo12(start).hour;
        end = this.$_transHourTo12(end).hour;
      }

      if (start > end) {
        warn$2('MinDate Hour should be earlier than MaxDate');
        return;
      }

      var hoursData = this.$_generateData(start, end, 'Hour', this.unitText[3] || '', 1, arguments);

      if (this.isTwelveHours && hoursData[0].value === 0) {
        var text = void 0;
        if (this.textRender) {
          text = this.textRender.apply(this, [TYPE_FORMAT_INVERSE['Hour']].concat(Array.prototype.slice.call(arguments), [12]));
        }
        hoursData[0].text = text || '12' + (this.unitText[3] || '');
      }

      return hoursData;
    },
    $_generateMinuteData: function $_generateMinuteData() {
      var start = this.minDate ? this.minDate.getMinutes() : 0;
      var end = this.maxDate ? this.maxDate.getMinutes() : 59;
      return this.$_generateData(start, end, 'Minute', this.unitText[4] || '', this.minuteStep, arguments);
    },
    $_generateAPData: function $_generateAPData() {
      return [{
        text: this.halfDayText[0],
        type: 'HalfDay',
        typeFormat: 'HalfDay',
        value: 0
      }, {
        text: this.halfDayText[1],
        type: 'HalfDay',
        typeFormat: 'HalfDay',
        value: 1
      }];
    },
    $_generateData: function $_generateData(from, to, type, unit) {
      var step = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var args = arguments[5];

      var count = from;
      var text = void 0;
      var data = [];

      args = args || [];

      while (count <= to) {
        this.textRender && (text = this.textRender.apply(this, [TYPE_FORMAT_INVERSE[type]].concat(_toConsumableArray$4(args), [count])));
        data.push({
          text: text || '' + count + unit,
          value: count,
          typeFormat: TYPE_FORMAT_INVERSE[type] || type,
          type: type
        });
        count += step;
      }

      return data;
    },
    $_transHourTo12: function $_transHourTo12(hour) {
      if (hour < 12) {
        return {
          hour: hour,
          ap: 0 // 0 a.m, 1 p.m
        };
      } else {
        return {
          hour: hour - 12,
          ap: 1 // 0 a.m, 1 p.m
        };
      }
    },


    // MARK: events handler
    $_onPickerShow: function $_onPickerShow() {
      this.oldColumnData = [].concat(_toConsumableArray$4(this.columnData));
      this.$emit('show');
    },
    $_onPickerHide: function $_onPickerHide() {
      this.$emit('hide');
    },
    $_onPickerChange: function $_onPickerChange(columnIndex, itemIndex, value) {
      this.$emit('change', columnIndex, itemIndex, value);

      // column of time parts do not need cascading
      if (~this.disabledCascadeComlumnIndex.indexOf(columnIndex)) {
        return;
      }

      if (columnIndex < this.columnData.length - 1) {
        this.$_initColumnData(columnIndex + 1);
      }
    },
    $_onPickerConfirm: function $_onPickerConfirm(columnsValue) {
      this.$emit('confirm', columnsValue);
    },
    $_onPickerCancel: function $_onPickerCancel() {
      this.$emit('cancel');
      this.columnData = [].concat(_toConsumableArray$4(this.oldColumnData));
    },
    getFormatDate: function getFormatDate() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'yyyy-MM-dd hh:mm';

      var columnValues = this.picker.getColumnValues();
      var hourTo24 = false;

      if (this.isTwelveHours) {
        var halfHour = [].concat(_toConsumableArray$4(columnValues)).splice(columnValues.length - 1, 1)[0];
        halfHour.value && (hourTo24 = true);
      }

      columnValues.forEach(function (item) {
        /* istanbul ignore if */
        if (!item) {
          return;
        }

        var value = hourTo24 && item.type === 'Hour' ? item.value + 12 : item.value;

        if (value < 10) {
          value = '0' + value;
        }

        format = format.replace(item.type, value);
        format = format.replace(TYPE_FORMAT_INVERSE[item.type], value);
      });

      return format;
    }
  }
};

function _defineProperty$21(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Codebox = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-codebox-wrapper" }, [_c('div', { staticClass: "md-codebox", on: { "click": _vm.focus } }, [_vm.maxlength > 0 ? _vm._l(_vm.num, function (i) {
      return _c('span', { key: i, class: ['md-codebox-box', i === _vm.code.length + 1 && _vm.focused && 'is-active'] }, [_vm.code.charAt(i - 1) ? [_vm.mask ? [_c('i', { staticClass: "md-codebox-dot" })] : [_vm._v(" " + _vm._s(_vm.code.charAt(i - 1)) + " ")]] : _vm._e(), _vm._v(" "), i === _vm.code.length + 1 && _vm.focused ? [_c('i', { staticClass: "md-codebox-blink" })] : _vm._e()], 2);
    }) : [_vm.mask ? _c('input', { class: ['md-codebox-holder', _vm.focused && 'is-active'], attrs: { "type": "password", "maxlength": _vm.maxlength, "readonly": "readonly", "disabled": "disabled" }, domProps: { "value": _vm.code } }) : _c('input', { class: ['md-codebox-holder', _vm.focused && 'is-active'], attrs: { "type": "text", "maxlength": _vm.maxlength, "readonly": "readonly", "disabled": "disabled" }, domProps: { "value": _vm.code } })]], 2), _vm._v(" "), _c('form', { directives: [{ name: "show", rawName: "v-show", value: _vm.system, expression: "system" }], attrs: { "action": "" }, on: { "submit": _vm.$_onSubmit } }, [_c('input', { ref: "input", staticClass: "md-codebox-input", attrs: { "type": _vm.mask ? 'password' : 'text', "maxlength": _vm.maxlength }, domProps: { "value": _vm.code }, on: { "input": _vm.$_onInputChange } })]), _vm._v(" "), _c('md-number-keyboard', { directives: [{ name: "show", rawName: "v-show", value: !_vm.system, expression: "!system" }], ref: "keyboard", staticClass: "md-codebox-number-keyboard", attrs: { "type": _vm.maxlength > 0 ? 'simple' : 'professional', "okText": _vm.okText, "disorder": _vm.disorder, "is-view": _vm.isView }, on: { "delete": _vm.$_onDelete, "enter": _vm.$_onEnter, "confirm": _vm.$_onConfirm }, model: { value: _vm.focused, callback: function callback($$v) {
          _vm.focused = $$v;
        }, expression: "focused" } })], 1);
  }, staticRenderFns: [],
  name: 'md-codebox',
  components: _defineProperty$21({}, NumberKeyboard.name, NumberKeyboard),
  props: {
    value: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [Number, String],
      default: 4
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    mask: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    system: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String
    },
    disorder: {
      type: Boolean,
      default: false
    },
    isView: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      code: '',
      focused: this.autofocus
    };
  },

  watch: {
    value: {
      imediate: true,
      handler: function handler(val) {
        if (val !== this.code) {
          this.code = val;
        }
      }
    }
  },
  computed: {
    num: function num() {
      return Math.abs(parseInt(this.maxlength, 10)) || 1;
    }
  },
  mounted: function mounted() {
    if (this.closable) {
      document.addEventListener('click', this.$_handleOutClick);
    }
    if (!this.system && !this.isView) {
      document.body.appendChild(this.$refs.keyboard.$el);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.closable) {
      document.removeEventListener('click', this.$_handleOutClick);
    }
    if (this.focused) {
      this.blur();
    }
    if (!this.system && !this.isView) {
      document.body.removeChild(this.$refs.keyboard.$el);
    }
  },

  methods: {
    // MARK: private methods

    // MARK: events handler
    $_handleOutClick: function $_handleOutClick(e) {
      if (!this.$el.contains(e.target)) {
        this.focused = false;
      }
    },
    $_onInputChange: function $_onInputChange(e) {
      if (this.maxlength < 0 || e.target.value.length <= this.maxlength) {
        this.code = e.target.value;
      }

      if (this.code.length === this.maxlength) {
        this.$emit('submit', this.code);
      }

      this.$emit('input', this.code);
    },
    $_onSubmit: function $_onSubmit(e) {
      e.preventDefault();
      this.$emit('submit', this.code);
    },
    $_onEnter: function $_onEnter(val) {
      if ((this.maxlength < 0 || this.code.length < this.maxlength) && val !== '.') {
        this.code += val;
      }

      if (this.code.length === this.maxlength) {
        this.$nextTick(function () {
          this.$emit('submit', this.code);
        });
      }

      this.$emit('input', this.code);
    },
    $_onDelete: function $_onDelete() {
      this.code = this.code.slice(0, this.code.length - 1);
      this.$emit('input', this.code);
    },
    $_onConfirm: function $_onConfirm() {
      this.$emit('submit', this.code);
    },

    // MARK: public methods
    blur: function blur() {
      this.focused = false;
      if (this.system) {
        this.$refs.input.blur();
      }
    },
    focus: function focus() {
      this.focused = true;
      if (this.system) {
        this.$refs.input.focus();
      }
    }
  }
};

var _components$10;

function _defineProperty$22(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Captcha = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isView || _vm.value || _vm.visible, expression: "isView || value || visible" }], staticClass: "md-captcha" }, [_vm.isView ? [_c('div', { staticClass: "md-captcha-content" }, [_vm.title ? _c('h2', { staticClass: "md-captcha-title", domProps: { "textContent": _vm._s(_vm.title) } }) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "md-captcha-error", domProps: { "textContent": _vm._s(_vm.errorMsg) } }), _vm._v(" "), _c('div', { staticClass: "md-captcha-message" }, [_vm._t("default")], 2), _vm._v(" "), _vm.count ? _c('md-button', { staticClass: "md-captcha-countbtn", attrs: { "type": "ghost", "size": "small", "disabled": this.isCounting }, domProps: { "textContent": _vm._s(_vm.countBtnText) }, on: { "click": _vm.$_onResend } }) : _vm._e()], 1), _vm._v(" "), _c('md-codebox', { ref: "codebox", attrs: { "maxlength": _vm.maxlength, "system": _vm.system, "closable": false, "isView": _vm.isView, "mask": _vm.mask, "autofocus": false }, on: { "submit": _vm.$_onSubmit }, model: { value: _vm.code, callback: function callback($$v) {
          _vm.code = $$v;
        }, expression: "code" } })] : [_c('md-dialog', { attrs: { "value": _vm.value, "closable": true, "appendTo": false, "position": "center" }, on: { "input": _vm.$_onInput, "show": _vm.$_onShow, "hide": _vm.$_onHide } }, [_c('div', { staticClass: "md-captcha-content" }, [_vm.title ? _c('h2', { staticClass: "md-captcha-title", domProps: { "textContent": _vm._s(_vm.title) } }) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "md-captcha-error", domProps: { "textContent": _vm._s(_vm.errorMsg) } }), _vm._v(" "), _c('div', { staticClass: "md-captcha-message" }, [_vm._t("default")], 2), _vm._v(" "), _vm.count ? _c('md-button', { staticClass: "md-captcha-countbtn", attrs: { "type": "ghost", "size": "small", "disabled": this.isCounting }, domProps: { "textContent": _vm._s(_vm.countBtnText) }, on: { "click": _vm.$_onResend } }) : _vm._e()], 1), _vm._v(" "), _c('md-codebox', { ref: "codebox", attrs: { "maxlength": _vm.maxlength, "system": _vm.system, "closable": false, "mask": _vm.mask, "autofocus": false }, on: { "submit": _vm.$_onSubmit }, model: { value: _vm.code, callback: function callback($$v) {
          _vm.code = $$v;
        }, expression: "code" } })], 1)]], 2);
  }, staticRenderFns: [],
  name: 'md-captcha',

  components: (_components$10 = {}, _defineProperty$22(_components$10, Dialog.name, Dialog), _defineProperty$22(_components$10, Codebox.name, Codebox), _defineProperty$22(_components$10, Button.name, Button), _components$10),

  props: {
    title: {
      type: String
    },
    value: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 4
    },
    mask: {
      type: Boolean,
      default: false
    },
    system: {
      type: Boolean,
      default: false
    },
    autoCountdown: {
      type: Boolean,
      default: true
    },
    appendTo: {
      default: function _default() {
        return document.body;
      }
    },
    count: {
      type: Number,
      default: 60
    },
    countNormalText: {
      type: String,
      default: '发送验证码'
    },
    countActiveText: {
      type: String,
      default: '{$1}秒后重发'
    },
    isView: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      code: '',
      visible: false,
      errorMsg: '',
      isCounting: false,
      firstShown: false,
      countBtnText: this.countNormalText
    };
  },


  watch: {
    value: function value(val) {
      if (val) {
        this.code = '';
        if (!this.firstShown) {
          this.firstShown = true;
          this.$_onResend();
        }
      }
    },
    code: function code(val) {
      if (val && this.errorMsg) {
        this.errorMsg = '';
      }
    }
  },

  mounted: function mounted() {
    if (this.appendTo && !this.isView) {
      this.appendTo.appendChild(this.$el);
    }
    if (this.value || this.isView) {
      this.firstShown = true;
      this.$_onResend();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.appendTo && !this.isView) {
      this.appendTo.removeChild(this.$el);
    }
  },


  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onInput: function $_onInput(val) {
      this.$emit('input', val);
    },
    $_onShow: function $_onShow() {
      this.visible = true;
      this.$refs.codebox.focus();
      this.$emit('show');
    },
    $_onHide: function $_onHide() {
      this.visible = false;
      this.$refs.codebox.blur();
      this.$emit('hide');
    },
    $_onSubmit: function $_onSubmit(code) {
      this.$emit('submit', code);
    },
    $_onResend: function $_onResend() {
      if (this.autoCountdown) {
        this.countdown();
      }
      this.$emit('send', this.countdown);
    },

    // MARK: public methods
    countdown: function countdown() {
      var _this = this;

      if (!this.count) {
        return;
      }
      clearInterval(this.__counter__);
      var i = this.count - 1;
      this.isCounting = true;
      this.countBtnText = this.countActiveText.replace('{$1}', i);
      /* istanbul ignore next */
      this.__counter__ = setInterval(function () {
        if (i === 1) {
          _this.resetcount();
        } else {
          i--;
          _this.countBtnText = _this.countActiveText.replace('{$1}', i);
        }
      }, 1000);
    },
    resetcount: function resetcount() {
      this.isCounting = false;
      this.countBtnText = this.countNormalText;
      clearInterval(this.__counter__);
    },
    setError: function setError(msg) {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.errorMsg = msg;
        _this2.code = '';
      });
    }
  }
};

var Roller = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-activity-indicator-rolling" }, [_c('svg', { staticClass: "md-activity-indicator-svg rolling", style: { width: _vm.size + 'px', height: _vm.size + 'px' }, attrs: { "viewBox": '0 0 ' + _vm.viewBoxSize + ' ' + _vm.viewBoxSize, "preserveAspectRatio": "xMidYMid" } }, [!_vm.$slots.default ? _c('g', { staticClass: "circle", attrs: { "transform": "matrix(0, 1, 1, 0, 0, 0)" } }, [_c('circle', { staticClass: "stroke", style: _vm.circleStyle, attrs: { "cx": _vm.viewBoxSize / 2, "cy": _vm.viewBoxSize / 2, "fill": _vm.fill, "stroke": _vm.color, "stroke-width": _vm.strokeWidth, "stroke-dashoffset": this.circlePerimeter / 2, "r": _vm.radius } }, [_c('animateTransform', { attrs: { "dur": _vm.duration + 's', "values": '0 ' + _vm.viewBoxSize / 2 + ' ' + _vm.viewBoxSize / 2 + ';360 ' + _vm.viewBoxSize / 2 + ' ' + _vm.viewBoxSize / 2, "attributeName": "transform", "type": "rotate", "calcMode": "linear", "keyTimes": "0;1", "begin": "0s", "repeatCount": "indefinite" } })], 1)]) : _vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'md-activity-indicator-rolling',

  props: {
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: '#fc9153'
    },
    fill: {
      type: String,
      default: 'transparent'
    },
    process: {
      // process control 0-1
      type: Number
    }
  },

  computed: {
    id: function id() {
      return this.$options.name + '-keyframes-' + this.size;
    },
    strokeWidth: function strokeWidth() {
      return this.size / 16;
    },
    radius: function radius() {
      return this.size / 2;
    },
    viewBoxSize: function viewBoxSize() {
      return this.size + 2 * this.strokeWidth;
    },
    circlePerimeter: function circlePerimeter() {
      return this.size * 3.1415;
    },
    circleStyle: function circleStyle() {
      /* istanbul ignore else */
      if (this.process === undefined) {
        return {
          animation: this.id + ' 2s cubic-bezier(1.0, 0.5, 0.8, 1.0) infinite'
        };
      } else {
        return {
          strokeDasharray: this.process * this.circlePerimeter + ' ' + (1 - this.process) * this.circlePerimeter
        };
      }
    },
    duration: function duration() {
      return 2;
    }
  },

  watch: {
    size: {
      handler: function handler() {
        this.$_insertKeyframes();
      },

      immediate: true
    }
  },

  methods: {
    $_insertKeyframes: function $_insertKeyframes() {
      /* istanbul ignore if */
      if (this.process !== undefined) {
        // No need to add animation
        return;
      }
      var id = this.id;
      var keyframes = 'from{stroke-dasharray:0 ' + this.circlePerimeter + ';}to{stroke-dasharray:' + this.circlePerimeter + ' 0;}';
      var css = '@-webkit-keyframes ' + id + '{' + keyframes + '}@keyframes ' + id + '{' + keyframes + '}}';

      var isCssExisting = true;
      var elem = document.getElementById(id);

      if (!elem) {
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.setAttribute('id', id);
        isCssExisting = false;
      }

      /* istanbul ignore else */
      if ('textContent' in elem) {
        elem.textContent = css;
      } else {
        elem.styleSheet.cssText = css;
      }

      if (!isCssExisting) {
        document.getElementsByTagName('head')[0].appendChild(elem);
      }
    }
  }
};

function _defineProperty$23(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RollerSuccess = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-activity-indicator-rolling-success" }, [_c('md-activity-indicator-rolling', { attrs: { "stroke-width": _vm.strokeWidth, "radius": _vm.radius, "fill": "#FFF6F1" } }, [_vm.isSuccess ? _c('g', [_c('circle', { staticClass: "success", attrs: { "cx": _vm.viewBoxSize / 2, "cy": _vm.viewBoxSize / 2, "fill": "#FFF6F1", "stroke": "none", "r": _vm.radius } })]) : _vm._e()]), _vm._v(" "), _vm.isSuccess ? _c('svg', { staticClass: "right", style: { transform: 'translate(-48%, -50%) scale(' + _vm.size / 70 + ')' }, attrs: { "viewBox": "0 0 100 100", "preserveAspectRatio": "xMidYMid" } }, [_c('g', [_c('line', { style: { 'strokeWidth': _vm.strokeWidth, 'stroke': _vm.color }, attrs: { "x1": "32", "y1": "47", "x2": "45", "y2": "62", "stroke-dasharray": "20" } }), _vm._v(" "), _c('line', { style: { 'strokeWidth': _vm.strokeWidth, 'stroke': _vm.color }, attrs: { "x1": "42", "y1": "62", "x2": "68.4", "y2": "40", "stroke-dasharray": "35" } })])]) : _vm._e()], 1);
  }, staticRenderFns: [],
  name: 'md-activity-indicator-rolling-success',

  components: _defineProperty$23({}, Roller.name, Roller),

  props: {
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: '#fc9153'
    },
    isSuccess: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      animating: false,
      startTmp: Date.now(),
      successFlag: false
    };
  },


  computed: {
    strokeWidth: function strokeWidth() {
      return this.size / 16;
    },
    radius: function radius() {
      return this.size / 2;
    },
    viewBoxSize: function viewBoxSize() {
      return this.size + 2 * this.strokeWidth;
    }
  },

  watch: {
    isSuccess: function isSuccess(val) {
      if (val) {
        this.doSuccess();
      } else {
        this.startTmp = Date.now();
        this.successFlag = false;
      }
    }
  },

  mounted: function mounted() {
    this.isSuccess && this.doSuccess();
  },


  methods: {
    doSuccess: function doSuccess() {
      var _this = this;

      var st = this.startTmp;
      var et = Date.now();
      var delay = Math.ceil((et - st) / 1500) * 1500 - (et - st);
      setTimeout(function () {
        /* istanbul ignore next */
        _this.successFlag = true;
      }, delay);
    }
  }
};

var _components$11;

function _defineProperty$24(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BLOCK_MAX_HEIGHT = 1000;

var Cashier = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-cashier" }, [_c('md-popup', { attrs: { "position": "bottom", "mask-closable": false, "prevent-scroll-exclude": ".choose-channel", "prevent-scroll": "" }, on: { "show": _vm.$_onPopupShow, "hide": _vm.$_onPopupHide }, model: { value: _vm.isCashierShow, callback: function callback($$v) {
          _vm.isCashierShow = $$v;
        }, expression: "isCashierShow" } }, [_c('md-popup-title-bar', { attrs: { "title": _vm.title }, on: { "cancel": _vm.$_onPopupCancel } }, [_c('md-icon', { attrs: { "slot": "cancel", "name": "cross", "size": "lg" }, slot: "cancel" })], 1), _vm._v(" "), _c('div', { staticClass: "md-cashier-container", style: { maxHeight: _vm.sceneHeight + 'px' } }, [_vm.scene === 'choose' ? _c('div', { key: _vm.sceneKey, staticClass: "md-cashier-block md-cashier-choose" }, [_c('div', { staticClass: "choose-text" }, [_vm.paymentTitle ? _c('p', { staticClass: "choose-title", domProps: { "innerHTML": _vm._s(_vm.paymentTitle) } }) : _vm._e(), _vm._v(" "), _vm.paymentAmount ? _c('p', { staticClass: "choose-number", domProps: { "innerHTML": _vm._s(_vm.paymentAmount) } }) : _vm._e(), _vm._v(" "), _vm.paymentDescribe ? _c('p', { staticClass: "choose-describe", domProps: { "innerHTML": _vm._s(_vm.paymentDescribe) } }) : _vm._e()]), _vm._v(" "), _c('div', { staticClass: "choose-channel", class: { active: _vm.isChannelActive } }, [_vm.isChannelShow ? _c('ul', { staticClass: "choose-channel-list" }, _vm._l(_vm.channels, function (item, index) {
      return _c('li', { key: index, staticClass: "choose-channel-item", class: { default: index === _vm.defaultIndex }, on: { "click": function click($event) {
            _vm.$_onChannelItemClick(item, index);
          } } }, [_c('i', { staticClass: "item-icon", class: item.icon }, [_c('md-icon', { attrs: { "name": item.icon } })], 1), _vm._v(" "), _c('span', { staticClass: "item-label", domProps: { "innerHTML": _vm._s(item.text || item.label) } }), _vm._v(" "), !_vm.isSingle ? [index === _vm.activeChannelIndex ? _c('md-icon', { staticClass: "item-check", attrs: { "name": "circle-right" } }) : _c('md-icon', { staticClass: "item-check", attrs: { "name": "circle" } })] : _vm._e()], 2);
    })) : _vm.channels[_vm.defaultIndex] ? _c('ul', { staticClass: "choose-channel-list" }, [_c('li', { staticClass: "choose-channel-item default", on: { "click": function click($event) {
          _vm.$_onChannelItemClick(_vm.channels[_vm.defaultIndex], _vm.index);
        } } }, [_c('i', { staticClass: "item-icon", class: _vm.channels[_vm.defaultIndex].icon }, [_c('md-icon', { attrs: { "name": _vm.channels[_vm.defaultIndex].icon } })], 1), _vm._v(" "), _c('span', { staticClass: "item-label", domProps: { "innerHTML": _vm._s(_vm.channels[_vm.defaultIndex].text || _vm.channels[_vm.defaultIndex].label) } }), _vm._v(" "), !_vm.isSingle ? _c('md-icon', { staticClass: "item-check", attrs: { "name": "circle-right" } }) : _vm._e()], 1)]) : _vm._e(), _vm._v(" "), !_vm.isSingle ? _c('div', { staticClass: "choose-channel-more", class: { disabled: _vm.isChannelActive }, domProps: { "innerHTML": _vm._s(_vm.moreButtonText) }, on: { "click": _vm.$_onChannelMore } }) : _vm._e()]), _vm._v(" "), _c('div', { staticClass: "md-cashier-block-btn" }, [_c('md-button', { staticClass: "md-cashier-pay-button", domProps: { "innerHTML": _vm._s(_vm.payButtonText) }, on: { "click": _vm.$_onChannelBtnClick } })], 1)]) : _vm.scene === 'captcha' ? _c('div', { key: _vm.sceneKey, staticClass: "md-cashier-block md-cashier-captcha" }, [_c('md-captcha', { ref: "captcha", attrs: { "maxlength": _vm.sceneOption.captcha.maxlength, "count": _vm.sceneOption.captcha.count, "countNormalText": _vm.sceneOption.captcha.countNormalText, "countActiveText": _vm.sceneOption.captcha.countActiveText, "auto-countdown": _vm.sceneOption.captcha.autoCountdown, "is-view": "" }, on: { "send": _vm.sceneOption.captcha.onSend, "submit": _vm.sceneOption.captcha.onSubmit } }, [_c('div', { domProps: { "textContent": _vm._s(_vm.sceneOption.captcha.text) } })])], 1) : _vm.scene === 'loading' || _vm.scene === 'success' ? _c('div', { key: _vm.sceneKey, staticClass: "md-cashier-block", class: { 'md-cashier-loading': _vm.scene === 'loading', 'md-cashier-success': _vm.scene === 'success' } }, [_c('div', { staticClass: "md-cashier-block-icon" }, [_c('md-activity-indicator-rolling-success', { ref: "rolling", attrs: { "is-success": _vm.scene === 'success' } })], 1), _vm._v(" "), _c('div', { staticClass: "md-cashier-block-text" }, [_vm._v(_vm._s(_vm.scene === 'success' ? _vm.sceneOption.success.text : _vm.sceneOption.loading.text))]), _vm._v(" "), _vm.scene === 'success' ? _c('div', { staticClass: "md-cashier-block-btn" }, [_c('md-button', { domProps: { "innerHTML": _vm._s(_vm.sceneOption.success.buttonText) }, on: { "click": function click() {
          _vm.isCashierShow = false;
          _vm.sceneOption.success.handler && _vm.sceneOption.success.handler();
        } } })], 1) : _vm._e()]) : _vm.scene === 'fail' ? _c('div', { key: _vm.sceneKey, staticClass: "md-cashier-block md-cashier-fail" }, [_c('div', { staticClass: "md-cashier-block-icon" }, [_c('md-icon', { attrs: { "name": "circle-alert" } })], 1), _vm._v(" "), _c('div', { staticClass: "md-cashier-block-text", domProps: { "textContent": _vm._s(_vm.sceneOption.fail.text) } }), _vm._v(" "), _c('div', { staticClass: "md-cashier-block-btn" }, [_c('md-button', { domProps: { "innerHTML": _vm._s(_vm.sceneOption.fail.buttonText) }, on: { "click": function click() {
          _vm.isCashierShow = false;
          _vm.sceneOption.fail.handler && _vm.sceneOption.fail.handler();
        } } })], 1)]) : _vm._e()])], 1)], 1);
  }, staticRenderFns: [],
  name: 'md-cashier',

  components: (_components$11 = {}, _defineProperty$24(_components$11, Popup.name, Popup), _defineProperty$24(_components$11, PopupTitleBar.name, PopupTitleBar), _defineProperty$24(_components$11, Captcha.name, Captcha), _defineProperty$24(_components$11, Button.name, Button), _defineProperty$24(_components$11, Icon.name, Icon), _defineProperty$24(_components$11, RollerSuccess.name, RollerSuccess), _components$11),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    channels: {
      type: Array,
      default: function _default() {
        return [];
      },
      validator: function validator(val) {
        return !!val.length;
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: '\u652F\u4ED8' // 支付
    },
    paymentTitle: {
      type: String,
      default: '\u652F\u4ED8\u91D1\u989D' // 支付金额
    },
    paymentAmount: {
      type: String,
      default: '0.00'
    },
    paymentDescribe: {
      type: String,
      default: ''
    },
    payButtonText: {
      type: String,
      default: '\u786E\u5B9A\u652F\u4ED8' // 确定支付
    },
    moreButtonText: {
      type: String,
      default: '\u66F4\u591A\u652F\u4ED8\u65B9\u5F0F' // 更多支付方式
    }
  },

  data: function data() {
    return {
      isCashierShow: false,
      isChannelShow: false,
      isChannelActive: false,
      activeChannelIndex: -1,
      scene: 'choose', // choose, captcha, loading, success, fail
      sceneKey: Date.now(),
      sceneHeight: BLOCK_MAX_HEIGHT,
      sceneOption: {
        loading: {
          text: '\u652F\u4ED8\u7ED3\u679C\u67E5\u8BE2\u4E2D...' // 支付结果查询中...
        },
        success: {
          text: '\u652F\u4ED8\u6210\u529F', // 支付成功
          buttonText: '\u6211\u77E5\u9053\u4E86', // 我知道了
          handler: null
        },
        fail: {
          text: '\u652F\u4ED8\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5', // 支付失败，请稍后重试
          buttonText: '\u6211\u77E5\u9053\u4E86', // 我知道了
          handler: null
        },
        captcha: {
          text: '',
          maxlength: 4,
          count: 60,
          autoCountdown: true,
          onSend: noop$1,
          onSubmit: noop$1
        }
      }
    };
  },


  computed: {
    isSingle: function isSingle() {
      return !(this.channels.length > 1);
    }
  },

  watch: {
    value: function value(val) {
      this.isCashierShow = val;
    },
    defaultIndex: function defaultIndex(val) {
      this.activeChannelIndex = val;
    },
    isCashierShow: function isCashierShow(val) {
      this.$emit('input', val);
    }
  },

  created: function created() {
    this.$_initialCashier();

    if (this.channels.length < 3) {
      this.isChannelShow = true;
      this.isChannelActive = true;
    }
  },


  methods: {
    // MARK: private methods
    $_initialCashier: function $_initialCashier() {
      this.activeChannelIndex = this.defaultIndex;
      this.isCashierShow = this.value;
    },
    $_resetCashier: function $_resetCashier() {
      this.scene = 'choose';
      this.sceneHeight = BLOCK_MAX_HEIGHT;
      this.isChannelShow = false;
      this.isChannelActive = false;
    },
    $_doAnimate: function $_doAnimate() {
      var _this = this;

      this.$nextTick(function () {
        var block = _this.$el.querySelector('.md-cashier-block');
        _this.sceneHeight = block ? block.clientHeight : BLOCK_MAX_HEIGHT;
      });
    },


    // MARK: events handler, 如 $_onButtonClick
    $_onChannelItemClick: function $_onChannelItemClick(item, index) {
      this.activeChannelIndex = index;
      this.$emit('select', item);
    },
    $_onChannelBtnClick: function $_onChannelBtnClick() {
      var item = this.channels[this.activeChannelIndex];
      this.$emit('pay', item);
    },
    $_onChannelMore: function $_onChannelMore() {
      var _this2 = this;

      if (this.isChannelActive) {
        return;
      }
      this.isChannelShow = true;
      this.$nextTick(function () {
        _this2.isChannelActive = true;
      });
    },
    $_onPopupShow: function $_onPopupShow() {
      this.$emit('show');
    },
    $_onPopupHide: function $_onPopupHide() {
      this.$_resetCashier();
      this.$emit('hide');
    },
    $_onPopupCancel: function $_onPopupCancel() {
      this.isCashierShow = false;
      this.$emit('cancel');
    },


    // MARK: public methods
    next: function next(scene) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.sceneOption[scene]) {
        extend$2(this.sceneOption[scene], option);
      }
      this.scene = scene;
      this.sceneKey = Date.now();
      this.$_doAnimate();
    }
  }
};

var Chart = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('svg', { staticClass: "md-chart", attrs: { "viewBox": "0 0 " + _vm.width + " " + _vm.height } }, [_c('defs', _vm._l(_vm.colors, function (color) {
      return _c('linearGradient', { key: color, attrs: { "id": "path-fill-gradient-" + color, "x1": "0", "x2": "0", "y1": "0", "y2": "1" } }, [_c('stop', { style: "stop-color: " + color, attrs: { "offset": "0%", "stop-opacity": "0.4" } }), _vm._v(" "), _c('stop', { style: "stop-color: " + color, attrs: { "offset": "50%", "stop-opacity": "0.3" } }), _vm._v(" "), _c('stop', { style: "stop-color: " + color, attrs: { "offset": "100%", "stop-opacity": "0.1" } })], 1);
    })), _vm._v(" "), _c('g', { staticClass: "md-chart-graph", attrs: { "transform": "translate(" + _vm.offset.left + ", " + _vm.offset.top + ")" } }, [_c('g', { staticClass: "md-chart-axis-y" }, _vm._l(_vm.yaxis, function (item, index) {
      return _c('g', { key: index, attrs: { "transform": "translate(0, " + item.offset + ")" } }, [_c('line', { attrs: { "x1": "0", "x2": _vm.innerWidth, "y1": "0", "y2": "0" } }), _vm._v(" "), _c('text', { attrs: { "x": "0", "y": "0", "dx": "-0.5em", "dy": "0.32em" }, domProps: { "textContent": _vm._s(item.label) } })]);
    })), _vm._v(" "), _c('g', { staticClass: "md-chart-axis-x", attrs: { "transform": "translate(0, " + _vm.innerHeight + ")" } }, _vm._l(_vm.xaxis, function (item, index) {
      return _c('g', { key: index, attrs: { "transform": "translate(" + item.offset + ", 0)" } }, [_c('line', { attrs: { "x1": "0", "x2": "0", "y1": "0", "y2": "6" } }), _vm._v(" "), _c('text', { attrs: { "x": "0", "y": "0", "dy": "2em" }, domProps: { "textContent": _vm._s(item.label) } })]);
    })), _vm._v(" "), _c('g', { staticClass: "md-chart-paths" }, [_vm._l(_vm.paths, function (path, index) {
      return [_c('path', { key: "line-" + index, staticClass: "md-chart-path", style: path.style, attrs: { "d": path.value } }), _vm._v(" "), path.area ? _c('path', { key: "area-" + index, staticClass: "md-chart-path-area", style: path.area.style, attrs: { "d": path.area.value } }) : _vm._e()];
    })], 2)])]);
  }, staticRenderFns: [],
  name: 'md-chart',

  props: {
    labels: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    datasets: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    size: {
      type: Array,
      default: function _default() {
        return [480, 320];
      }
    },
    max: {
      type: Number,
      default: function _default() {
        var max = Math.max.apply(Math, this.datasets.map(function (data) {
          return Math.max.apply(Math, data.values);
        }));
        var multiple = 1;
        while (max > 10) {
          multiple *= 10;
          max /= 10;
        }
        max = Math.ceil(max) * multiple;

        return max;
      }
    },
    min: {
      type: Number,
      default: function _default() {
        var min = Math.min.apply(Math, this.datasets.map(function (data) {
          return Math.min.apply(Math, data.values);
        }));
        var multiple = 1;
        while (min > 10) {
          multiple *= 10;
          min = min / 10;
        }
        min = Math.floor(min) * multiple;

        return min;
      }
    },
    lines: {
      type: Number,
      default: 5
    },
    step: {
      type: Number,
      default: function _default() {
        return (this.max - this.min) / this.lines;
      }
    },
    shift: {
      type: Number,
      default: 0.6
    },
    format: {
      type: Function,
      default: function _default(val) {
        return val;
      }
    }
  },

  data: function data() {
    return {
      unit: 16
    };
  },


  computed: {
    offset: function offset() {
      return {
        top: 0.2 * this.unit,
        bottom: 0.5 * this.unit,
        left: this.shift * this.unit,
        right: 0.2 * this.unit
      };
    },
    width: function width() {
      if (typeof this.size[0] === 'string' && this.size[0].indexOf('rem') !== -1) {
        return parseFloat(this.size[0]) * this.unit;
      } else {
        return parseFloat(this.size[0]);
      }
    },
    height: function height() {
      if (typeof this.size[1] === 'string' && this.size[1].indexOf('rem') !== -1) {
        return parseFloat(this.size[1]) * this.unit;
      } else {
        return parseFloat(this.size[1]);
      }
    },
    innerWidth: function innerWidth() {
      return this.width - this.offset.left - this.offset.right;
    },
    innerHeight: function innerHeight() {
      return this.height - this.offset.top - this.offset.bottom;
    },
    xaxis: function xaxis() {
      var deltaX = this.innerWidth / (this.labels.length - 1);
      var items = this.labels.map(function (label, index) {
        return {
          offset: index * deltaX,
          label: label
        };
      });

      return items;
    },
    yaxis: function yaxis() {
      var items = [];
      var deltaY = this.innerHeight / this.lines;

      for (var i = 0; i < this.lines; i++) {
        items.push({
          offset: i * deltaY,
          label: this.format(this.max - i * this.step)
        });
      }

      items.push({
        offset: this.innerHeight,
        label: this.format(this.min)
      });

      return items;
    },
    lower: function lower() {
      return this.max - (this.lines - 1) * this.step;
    },
    paths: function paths() {
      var _this = this;

      return this.datasets.map(function (data) {
        var deltaX = _this.innerWidth / (data.values.length - 1);
        var deltaY = _this.innerHeight / _this.lines;
        var points = data.values.map(function (value, index) {
          if (value < _this.lower) {
            return {
              x: index * deltaX,
              y: _this.innerHeight - (1 - (_this.lower - value) / (_this.lower - _this.min)) * deltaY
            };
          } else {
            return {
              x: index * deltaX,
              y: (1 - (value - _this.lower) / (_this.max - _this.lower)) * (_this.innerHeight - deltaY)
            };
          }
        });

        var ret = {
          style: {
            fill: 'none',
            stroke: data.color || '#fa8919',
            strokeWidth: data.width || 1
          }
        };

        if (data.theme === 'heat') {
          ret.style.stroke = "url(#path-fill-gradient-" + data.color + ")";
        } else if (data.theme === 'region') {
          ret.area = {
            value: "M0," + _this.innerHeight + " " + points.map(function (point) {
              return "L" + point.x + "," + point.y;
            }).join(' ') + (" L" + points[points.length - 1].x + "," + _this.innerHeight),
            style: {
              fill: "url(#path-fill-gradient-" + data.color + ")",
              stroke: 'none'
            }
          };
        }

        ret.value = "M0," + points.shift().y + " " + points.map(function (point) {
          return "L" + point.x + "," + point.y;
        }).join(' ');

        return ret;
      });
    },
    colors: function colors() {
      var uniqueColors = [];
      this.datasets.map(function (data) {
        if (data.color && uniqueColors.indexOf(data.color) === -1) {
          uniqueColors.push(data.color);
        }
      });
      return uniqueColors;
    }
  },

  // LiftCircle Hook
  mounted: function mounted() {
    if (document.readyState !== 'loading') {
      this.$_resize();
    }
    document.addEventListener('DOMContentLoaded', this.$_resize);
    window.addEventListener('resize', this.$_resize);
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('DOMContentLoaded', this.$_resize);
    window.removeEventListener('resize', this.$_resize);
  },


  methods: {
    // MARK: private methods
    $_resize: function $_resize() {
      this.unit = parseFloat(window.getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('font-size'));
    }
  }
};

function _defineProperty$25(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Spinner = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-activity-indicator-spinning", class: { dark: _vm.color === 'dark' } }, [_c('md-icon', { staticClass: "md-activity-indicator-svg", style: { width: _vm.size + 'px', height: _vm.size + 'px' }, attrs: { "name": "spinner" } })], 1);
  }, staticRenderFns: [],
  name: 'md-activity-indicator-spinning',

  components: _defineProperty$25({}, Icon.name, Icon),

  props: {
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: 'dark',
      validator: function validator(val) {
        return val === 'dark' || val === 'light';
      }
    }
  }
};

var CarouselCircle = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('circle', { attrs: { "cx": _vm.cx, "cy": _vm.size / 2, "r": _vm.size / 2 } }, [_c('animate', { attrs: { "attributeName": "fill-opacity", "attributeType": "XML", "begin": "0s", "dur": "1s", "values": _vm.opacityValues, "calcMode": "linear", "repeatCount": "indefinite" } }), _vm._v(" "), _c('animate', { attrs: { "attributeName": "r", "attributeType": "XML", "begin": "0s", "dur": "1s", "values": _vm.sizeValues, "calcMode": "linear", "repeatCount": "indefinite" } })]);
  }, staticRenderFns: [],
  name: 'md-activity-indicator-carousel-circle',

  props: {
    size: {
      type: Number,
      default: 30
    },
    index: {
      type: Number,
      default: 0
    },
    animateValues: {
      type: Array,
      default: function _default() {
        /* istanbul ignore next */
        return [];
      }
    }
  },

  computed: {
    cx: function cx() {
      return this.index * this.size * 1.5 + this.size / 2;
    },
    opacityValues: function opacityValues() {
      return this.animateValues.join(';');
    },
    sizeValues: function sizeValues() {
      var _this = this;

      return this.animateValues.map(function (val) {
        return val * _this.size / 2;
      }).join(';');
    }
  }
};

function _defineProperty$26(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Carousel = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-activity-indicator-carousel" }, [_c('svg', { staticClass: "md-activity-indicator-svg carouseling", style: { width: _vm.viewWidth + 'px', height: _vm.size + 'px' }, attrs: { "xmlns": "http://www.w3.org/2000/svg", "viewBox": _vm.viewBox, "fill": _vm.color } }, _vm._l(_vm.circleAnimateValues, function (value, index) {
      return _c('md-activity-indicator-carousel-circle', { key: 'carousel-circle-' + index, attrs: { "size": _vm.size, "index": index, "animate-values": value } });
    }))]);
  }, staticRenderFns: [],
  name: 'md-activity-indicator-carousel',

  components: _defineProperty$26({}, CarouselCircle.name, CarouselCircle),

  props: {
    size: {
      type: Number,
      default: 30
    },
    color: {
      type: String,
      default: '#fc9153'
    }
  },

  data: function data() {
    return {
      circleAnimateValues: [[1, 0.8, 0.6, 0.6, 0.6, 0.8, 1], [0.6, 0.8, 1, 0.8, 0.6, 0.6, 0.6], [0.6, 0.6, 0.6, 0.8, 1, 0.8, 0.6]]
    };
  },


  computed: {
    viewWidth: function viewWidth() {
      var size = this.size;
      var len = this.circleAnimateValues.length;
      return len * size + (len - 1) * size / 2;
    },
    viewBox: function viewBox() {
      return '0 0 ' + this.viewWidth + ' ' + this.size;
    }
  }
};

var _components$12;

function _defineProperty$27(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

{ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-activity-indicator", class: _vm.type }, [_c('div', { staticClass: "indicator-container", class: { vertical: _vm.vertical } }, [_c('div', { staticClass: "indicator-loading" }, [_vm.type === 'roller' ? [_c('md-activity-indicator-rolling', { attrs: { "size": _vm.size, "color": _vm.color } })] : _vm.type === 'roller-success' ? [_c('md-activity-indicator-rolling-success', { attrs: { "size": _vm.size, "color": _vm.color } })] : _vm.type === 'spinner' ? [_c('md-activity-indicator-spinning', { attrs: { "size": _vm.size, "color": _vm.color } })] : _vm.type === 'carousel' ? [_c('md-activity-indicator-carousel', { attrs: { "size": _vm.size, "color": _vm.color } })] : _vm._e()], 2), _vm._v(" "), _vm.$slots.default ? _c('div', { staticClass: "md-activity-indicator-text indicator-text", style: { fontSize: _vm.textSize + 'px', color: _vm.textColor } }, [_vm._t("default")], 2) : _vm._e()])]);
  }, staticRenderFns: [],
  name: 'md-activity-indicator',

  components: (_components$12 = {}, _defineProperty$27(_components$12, Roller.name, Roller), _defineProperty$27(_components$12, RollerSuccess.name, RollerSuccess), _defineProperty$27(_components$12, Spinner.name, Spinner), _defineProperty$27(_components$12, Carousel.name, Carousel), _components$12),

  props: {
    type: {
      type: String,
      default: 'roller' // roller, spinner, carousel
    },
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: function _default() {
        if (this.type === 'spinner') {
          return 'dark';
        } else {
          return '#fc9153';
        }
      }
    },
    textColor: {
      type: String,
      default: '#999'
    },
    textSize: {
      type: Number
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
};

/* eslint comma-dangle: ["error", "always-multiline"] */

// 组件引入
/* @init<%import ${componentNameUpper} from './${componentName}'%> */

// 全量引入提醒
warn$2('You are using a whole package of mand-mobile, ' + 'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.', 'warn');

// 单个组件暴露

function _defineProperty$28(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-button md-example-child-button-0" }, [_c('md-button', [_vm._v("Primary")]), _vm._v(" "), _c('md-button', { attrs: { "disabled": "disabled" } }, [_vm._v("Primary Disabled")])], 1);
  }, staticRenderFns: [],
  name: 'button-demo',
  /* DELETE */
  title: '主按钮',
  titleEnUS: 'Primary buttons',
  codeSandBox: 'https://codesandbox.io/s/kkzq4mylp5',
  /* DELETE */
  components: _defineProperty$28({}, Button.name, Button)
};

function _defineProperty$29(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-button md-example-child-button-1" }, [_c('md-button', { attrs: { "type": "ghost" } }, [_vm._v("Ghost")]), _vm._v(" "), _c('md-button', { staticStyle: { "margin-left": "5px" }, attrs: { "type": "ghost", "disabled": "disabled" } }, [_vm._v("Ghost")]), _vm._v(" "), _c('md-button', { staticStyle: { "margin-left": "5px" }, attrs: { "type": "ghost-primary" } }, [_vm._v("Ghost-P")]), _vm._v(" "), _c('md-button', { staticStyle: { "margin-left": "5px" }, attrs: { "type": "ghost-primary", "disabled": "disabled" } }, [_vm._v("Ghost-P")])], 1);
  }, staticRenderFns: [],
  name: 'button-demo',
  /* DELETE */
  title: '线性按钮',
  titleEnUS: 'Ghost buttons',
  codeSandBox: 'https://codesandbox.io/s/m398mjvx89',
  /* DELETE */
  components: _defineProperty$29({}, Button.name, Button)
};

function _defineProperty$30(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-button md-example-child-button-2" }, [_c('md-button', { attrs: { "type": "ghost", "size": "small" } }, [_vm._v("Ghost-S")]), _vm._v(" "), _c('md-button', { staticStyle: { "margin-left": "5px" }, attrs: { "type": "ghost", "size": "small", "disabled": "disabled" } }, [_vm._v("Ghost-S")]), _vm._v(" "), _c('md-button', { staticStyle: { "margin-left": "5px" }, attrs: { "type": "ghost-primary", "size": "small" } }, [_vm._v("Ghost-P-S")]), _vm._v(" "), _c('md-button', { staticStyle: { "margin-left": "5px" }, attrs: { "type": "ghost-primary", "size": "small", "disabled": "disabled" } }, [_vm._v("Ghost-P-S")])], 1);
  }, staticRenderFns: [],
  name: 'button-demo',
  /* DELETE */
  title: '线性按钮小尺寸',
  titleEnUS: 'Small size ghost buttons',
  codeSandBox: 'https://codesandbox.io/s/jlv69qoq8v',
  /* DELETE */
  components: _defineProperty$30({}, Button.name, Button)
};

function _defineProperty$31(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-button md-example-child-button-3" }, [_c('div', { staticClass: "md-example-box-content" }, [_vm._v("每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。")]), _vm._v(" "), _c('md-button', { attrs: { "type": "link" } }, [_vm._v("阅读全文")]), _vm._v(" "), _c('div', { staticClass: "md-example-box-content", staticStyle: { "margin-top": "10px" } }, [_vm._v("希望你可以记住我，记住我这样活过，这样在你身边待过。")]), _vm._v(" "), _c('md-button', { attrs: { "type": "link", "icon": "hollow-plus" } }, [_vm._v("加入收藏")]), _vm._v(" "), _c('div', { staticClass: "md-example-box-content", staticStyle: { "margin-top": "10px" } }, [_vm._v("少年时我们追求激情，成熟后却迷恋平庸。在我们寻找、伤害、背离之后，还能一如既往地相信爱情，这是一种勇气。")]), _vm._v(" "), _c('md-button', { attrs: { "type": "link", "disabled": "disabled" } }, [_vm._v("评论")])], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-6a72efec',
  name: 'button-demo',
  /* DELETE */
  title: '文字链接按钮',
  titleEnUS: 'Text link buttons',
  codeSandBox: 'https://codesandbox.io/s/7zy8yp8zy6',
  /* DELETE */
  components: _defineProperty$31({}, Button.name, Button)
};

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$2 = _extends$1({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example button" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: []
}, createDemoModule('button', [Demo0, Demo1, Demo2, Demo3]));

// export default {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-example button"},_vm._l((_vm.demos),function(demo,index){return _c('section',{key:index,staticClass:"md-example-section"},[_c('div',{staticClass:"md-example-title",domProps:{"innerHTML":_vm._s(demo.title || '基础')}}),_vm._v(" "),_c('div',{staticClass:"md-example-content"},[_c(demo,{tag:"component"})],1)])}))},staticRenderFns: [],
//   name: `button-demo`,
//   data() {
//     return {
//       demos: [Demo0, Demo1, Demo2, Demo3],
//     }
//   },
// }

function _defineProperty$32(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-icon md-example-child-icon-0" }, [_c('div', { staticClass: "md-example-item" }, [_c('md-icon', { attrs: { "name": "hollow-plus", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("hollow-plus")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item" }, [_c('md-icon', { attrs: { "name": "circle-right", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("circle-right")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item" }, [_c('md-icon', { attrs: { "name": "circle-cross", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("circle-cross")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item" }, [_c('md-icon', { attrs: { "name": "circle-alert", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("circle-alert")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item" }, [_c('md-icon', { attrs: { "name": "arrow-up", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("arrow-up")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item" }, [_c('md-icon', { attrs: { "name": "arrow-right", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("arrow-right")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item" }, [_c('md-icon', { attrs: { "name": "arrow-down", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("arrow-down")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item" }, [_c('md-icon', { attrs: { "name": "arrow-left", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("arrow-left")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item" }, [_c('md-icon', { attrs: { "name": "cross", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("cross")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item" }, [_c('md-icon', { attrs: { "name": "right", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("right")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item" }, [_c('md-icon', { staticStyle: { "-webkit-filter": "invert(1)" }, attrs: { "name": "spinner", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("spinner")])], 1)]);
  }, staticRenderFns: [],
  name: 'icon-demo',
  /* DELETE */
  title: '图标',
  codeSandBox: 'https://codesandbox.io/s/84x92qw2rl',
  /* DELETE */
  components: _defineProperty$32({}, Icon.name, Icon)
};

function _defineProperty$33(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-icon md-example-child-icon-1" }, [_c('div', { staticClass: "md-example-item-s" }, [_c('md-icon', { attrs: { "name": "circle-right", "size": "xs" } }), _vm._v(" "), _c('p', [_vm._v("xs")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item-s" }, [_c('md-icon', { attrs: { "name": "circle-right", "size": "sm" } }), _vm._v(" "), _c('p', [_vm._v("sm")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item-s" }, [_c('md-icon', { attrs: { "name": "circle-right", "size": "md" } }), _vm._v(" "), _c('p', [_vm._v("md")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item-s" }, [_c('md-icon', { attrs: { "name": "circle-right", "size": "lg" } }), _vm._v(" "), _c('p', [_vm._v("lg")])], 1)]);
  }, staticRenderFns: [],
  name: 'icon-demo',
  /* DELETE */
  title: '大小',
  titleEnUS: 'Icon size',
  codeSandBox: 'https://codesandbox.io/s/v6jxn02x90',
  /* DELETE */
  components: _defineProperty$33({}, Icon.name, Icon)
};

function _defineProperty$34(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-icon md-example-child-icon-2" }, [_c('div', { staticClass: "md-example-item-s" }, [_c('md-icon', { attrs: { "name": "circle-right", "color": "#333" } }), _vm._v(" "), _c('p', [_vm._v("xs")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item-s" }, [_c('md-icon', { attrs: { "name": "circle-right", "color": "orange" } }), _vm._v(" "), _c('p', [_vm._v("sm")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item-s" }, [_c('md-icon', { attrs: { "name": "circle-right", "color": "blue" } }), _vm._v(" "), _c('p', [_vm._v("md")])], 1), _vm._v(" "), _c('div', { staticClass: "md-example-item-s" }, [_c('md-icon', { attrs: { "name": "circle-right", "color": "purple" } }), _vm._v(" "), _c('p', [_vm._v("lg")])], 1)]);
  }, staticRenderFns: [],
  name: 'icon-demo',
  /* DELETE */
  title: '颜色',
  titleEnUS: 'Icon color',
  codeSandBox: 'https://codesandbox.io/s/1y5n8k17q3',
  /* DELETE */
  components: _defineProperty$34({}, Icon.name, Icon)
};

var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$3 = _extends$2({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example icon" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-descibe", domProps: { "innerHTML": _vm._s(demo.descibe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('icon', [Demo0$1, Demo1$1, Demo2$1]));

var _components$13;

function _defineProperty$35(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$2 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-popup md-example-child-popup-0" }, [_c('md-button', { on: { "click": function click($event) {
          _vm.showPopUp('center');
        } } }, [_vm._v("屏幕中弹出")]), _vm._v(" "), _c('md-popup', { model: { value: _vm.isPopupShow.center, callback: function callback($$v) {
          _vm.$set(_vm.isPopupShow, "center", $$v);
        }, expression: "isPopupShow.center" } }, [_c('div', { staticClass: "md-example-popup md-example-popup-center" }, [_vm._v(" Popup Center ")])]), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.showPopUp('bottom');
        } } }, [_vm._v("底部弹出")]), _vm._v(" "), _c('md-popup', { attrs: { "position": "bottom" }, model: { value: _vm.isPopupShow.bottom, callback: function callback($$v) {
          _vm.$set(_vm.isPopupShow, "bottom", $$v);
        }, expression: "isPopupShow.bottom" } }, [_c('md-popup-title-bar', { attrs: { "title": "Popup Title", "ok-text": "ok", "cancel-text": "cancel" }, on: { "confirm": function confirm($event) {
          _vm.hidePopUp('bottom');
        }, "cancel": function cancel($event) {
          _vm.hidePopUp('bottom');
        } } }), _vm._v(" "), _c('div', { staticClass: "md-example-popup md-example-popup-bottom" }, [_vm._v(" Popup Bottom ")])], 1), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.showPopUp('top');
        } } }, [_vm._v("顶部弹出")]), _vm._v(" "), _c('md-popup', { attrs: { "hasMask": false, "position": "top" }, model: { value: _vm.isPopupShow.top, callback: function callback($$v) {
          _vm.$set(_vm.isPopupShow, "top", $$v);
        }, expression: "isPopupShow.top" } }, [_c('div', { staticClass: "md-example-popup md-example-popup-top" }, [_vm._v(" Popup Top "), _c('md-icon', { attrs: { "name": "cross" }, nativeOn: { "click": function click($event) {
          _vm.hidePopUp('top');
        } } })], 1)]), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.showPopUp('left');
        } } }, [_vm._v("左侧弹出")]), _vm._v(" "), _c('md-popup', { attrs: { "position": "left" }, model: { value: _vm.isPopupShow.left, callback: function callback($$v) {
          _vm.$set(_vm.isPopupShow, "left", $$v);
        }, expression: "isPopupShow.left" } }, [_c('div', { staticClass: "md-example-popup md-example-popup-left" }, [_vm._v(" Popup Left ")])]), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.showPopUp('right');
        } } }, [_vm._v("右侧弹出")]), _vm._v(" "), _c('md-popup', { attrs: { "position": "right" }, model: { value: _vm.isPopupShow.right, callback: function callback($$v) {
          _vm.$set(_vm.isPopupShow, "right", $$v);
        }, expression: "isPopupShow.right" } }, [_c('div', { staticClass: "md-example-popup md-example-popup-right" }, [_vm._v(" Popup Right ")])])], 1);
  }, staticRenderFns: [],
  name: 'popup-demo',
  /* DELETE */
  title: '不同位置弹出',
  titleEnUS: 'Pop up from different positions',
  height: 500,
  /* DELETE */
  components: (_components$13 = {}, _defineProperty$35(_components$13, Popup.name, Popup), _defineProperty$35(_components$13, PopupTitleBar.name, PopupTitleBar), _defineProperty$35(_components$13, Button.name, Button), _defineProperty$35(_components$13, Icon.name, Icon), _components$13),
  data: function data() {
    return {
      isPopupShow: {}
    };
  },

  methods: {
    showPopUp: function showPopUp(type) {
      this.$set(this.isPopupShow, type, true);
    },
    hidePopUp: function hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    }
  }
};

var _components$14;

function _defineProperty$36(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$2 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-popup md-example-child-popup-1", staticStyle: { "height": "1000px" } }, [_c('md-button', { on: { "click": function click($event) {
          _vm.showPopUp('top');
        } } }, [_vm._v("无遮罩层")]), _vm._v(" "), _c('md-popup', { attrs: { "hasMask": false, "position": "top" }, model: { value: _vm.isPopupShow.top, callback: function callback($$v) {
          _vm.$set(_vm.isPopupShow, "top", $$v);
        }, expression: "isPopupShow.top" } }, [_c('div', { staticClass: "md-example-popup md-example-popup-top" }, [_vm._v(" Popup Top "), _c('md-icon', { attrs: { "name": "cross" }, nativeOn: { "click": function click($event) {
          _vm.hidePopUp('top');
        } } })], 1)]), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.showPopUp('scroll');
        } } }, [_vm._v("防止滚动穿透")]), _vm._v(" "), _c('md-popup', { attrs: { "position": "bottom", "prevent-scroll": "", "prevent-scroll-exclude": ".md-example-popup-bottom" }, model: { value: _vm.isPopupShow.scroll, callback: function callback($$v) {
          _vm.$set(_vm.isPopupShow, "scroll", $$v);
        }, expression: "isPopupShow.scroll" } }, [_c('md-popup-title-bar', { attrs: { "title": "Popup Prevent Scroll", "ok-text": "ok", "cancel-text": "cancel" }, on: { "confirm": function confirm($event) {
          _vm.hidePopUp('scroll');
        }, "cancel": function cancel($event) {
          _vm.hidePopUp('scroll');
        } } }), _vm._v(" "), _c('div', { staticClass: "md-example-popup md-example-popup-bottom", staticStyle: { "height": "200px", "overflow": "auto" } }, _vm._l(50, function (n) {
      return _c('p', { key: n }, [_vm._v("Popup Bottom " + _vm._s(n))]);
    }))], 1), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.showPopUp('mask');
        } } }, [_vm._v("禁用遮罩层点击")]), _vm._v(" "), _c('md-popup', { attrs: { "position": "bottom", "mask-closable": false }, model: { value: _vm.isPopupShow.mask, callback: function callback($$v) {
          _vm.$set(_vm.isPopupShow, "mask", $$v);
        }, expression: "isPopupShow.mask" } }, [_c('md-popup-title-bar', { attrs: { "title": "Popup Prevent Mask Click", "ok-text": "ok", "cancel-text": "cancel" }, on: { "confirm": function confirm($event) {
          _vm.hidePopUp('mask');
        }, "cancel": function cancel($event) {
          _vm.hidePopUp('mask');
        } } }), _vm._v(" "), _c('div', { staticClass: "md-example-popup md-example-popup-bottom" }, [_vm._v(" Popup Bottom ")])], 1)], 1);
  }, staticRenderFns: [],
  name: 'popup-demo',
  /* DELETE */
  title: '其他配置',
  titleEnUS: 'Other configuration',
  message: '防止滚动击穿请在移动设备中扫码预览',
  messageEnUS: 'Preventing rolling breakdown should be previewed on mobile device',
  height: 750,
  /* DELETE */
  components: (_components$14 = {}, _defineProperty$36(_components$14, Popup.name, Popup), _defineProperty$36(_components$14, PopupTitleBar.name, PopupTitleBar), _defineProperty$36(_components$14, Button.name, Button), _defineProperty$36(_components$14, Icon.name, Icon), _components$14),
  data: function data() {
    return {
      isPopupShow: {}
    };
  },

  methods: {
    showPopUp: function showPopUp(type) {
      this.$set(this.isPopupShow, type, true);
    },
    hidePopUp: function hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    }
  }
};

var _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$4 = _extends$3({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example popup" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('popup', [Demo0$2, Demo1$2]));

function _defineProperty$37(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$3 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-action-bar md-example-child-0" }, [_c('md-action-bar', { attrs: { "actions": _vm.data } })], 1);
  }, staticRenderFns: [],
  name: 'action-bar-demo',
  /* DELETE */
  title: '通栏多按钮',
  titleEnUS: 'Multiple buttons',
  height: 150,
  codeSandBox: 'https://codesandbox.io/s/qvk465q29j',
  /* DELETE */
  components: _defineProperty$37({}, ActionBar.name, ActionBar),
  data: function data() {
    return {
      data: [{
        text: '操作一',
        onClick: this.handleClick
      }, {
        text: '操作二',
        onClick: this.handleClick
      }]
    };
  },

  methods: {
    handleClick: function handleClick() {
      Toast.succeed('Click');
    }
  }
};

function _defineProperty$38(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$3 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-action-bar md-example-child-1" }, [_c('md-action-bar', { attrs: { "actions": _vm.data } })], 1);
  }, staticRenderFns: [],
  name: 'action-bar-demo',
  /* DELETE */
  title: '通栏多按钮禁用',
  titleEnUS: 'Multiple buttons and disabled button',
  height: 150,
  codeSandBox: 'https://codesandbox.io/s/zn3yv60633',
  /* DELETE */
  components: _defineProperty$38({}, ActionBar.name, ActionBar),
  data: function data() {
    return {
      data: [{
        text: '操作一',
        disabled: true
      }, {
        text: '操作二',
        onClick: this.handleClick
      }, {
        text: '操作三',
        disabled: true
      }]
    };
  },

  methods: {
    handleClick: function handleClick() {
      Toast.succeed('Click');
    }
  }
};

function _defineProperty$39(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$2 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-action-bar md-example-child-2" }, [_c('md-action-bar', { attrs: { "actions": _vm.data }, on: { "click": _vm.onBtnClick } }, [_vm._v(" ¥128.00 ")])], 1);
  }, staticRenderFns: [],
  name: 'action-bar-demo',
  /* DELETE */
  title: '通栏带文案',
  titleEnUS: 'With text',
  height: 150,
  codeSandBox: 'https://codesandbox.io/s/48kj4x289x',
  /* DELETE */
  components: _defineProperty$39({}, ActionBar.name, ActionBar),
  data: function data() {
    return {
      data: [{
        text: '操作'
      }]
    };
  },

  methods: {
    onBtnClick: function onBtnClick(event, action) {
      Dialog.alert({
        content: action.text + '\u5B8C\u6210'
      });
    }
  }
};

var _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$5 = _extends$4({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example action-bar" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: []
}, createDemoModule('action-bar', [Demo0$3, Demo1$3, Demo2$2]));

function _defineProperty$40(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$4 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-drop-menu md-example-child-drop-menu-0" }, [_c('md-drop-menu', { ref: "dropMenu0", attrs: { "data": _vm.data } }), _vm._v(" "), _c('div', { staticClass: "content" }, [_vm._v("正文区域")])], 1);
  }, staticRenderFns: [],
  name: 'drop-menu-demo',
  /* DELETE */
  title: '基础下拉菜单 <a href="javascript:DropMenuTrigger()">getSelectedValue(0)</a>',
  titleEnUS: 'Basic drop-down menu <a href="javascript:DropMenuTrigger()">getSelectedValue(0)</a>',
  codeSandBox: 'https://codesandbox.io/s/231x45w8mj',
  height: 250,
  /* DELETE */
  components: _defineProperty$40({}, DropMenu.name, DropMenu),
  data: function data() {
    return {
      isContentShow: false,
      data: [{
        text: '一级选项1',
        options: [{
          text: '二级选项1'
        }, {
          text: '二级选项2'
        }]
      }]
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.DropMenuTrigger = function () {
      _this.getSelectedValue('dropMenu0', 0);
    };
  },

  methods: {
    getSelectedValue: function getSelectedValue(selector, index) {
      var value = this.$refs[selector].getSelectedValue(index);
      Dialog.alert({
        content: '<pre>' + JSON.stringify(value) + '</pre>'
      });
    }
  }
};

function _defineProperty$41(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$4 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-drop-menu md-example-child-drop-menu-1" }, [_c('md-drop-menu', { ref: "dropMenu1", attrs: { "data": _vm.data, "default-value": ['1.8L', '自动挡'] } }), _vm._v(" "), _c('div', { staticClass: "content" }, [_vm._v("正文区域")])], 1);
  }, staticRenderFns: [],
  name: 'drop-menu-demo',
  /* DELETE */
  title: '初始下拉菜单',
  titleEnUS: 'Drop-down menu with initial selection',
  codeSandBox: 'https://codesandbox.io/s/m3llp95x7x',
  height: 500,
  /* DELETE */
  components: _defineProperty$41({}, DropMenu.name, DropMenu),
  data: function data() {
    return {
      isContentShow: false,
      data: [{
        text: '排量',
        options: [{
          text: '1.6L'
        }, {
          text: '1.8L'
        }, {
          text: '2.0L'
        }, {
          text: '1.2T'
        }, {
          text: '1.4T'
        }, {
          text: '1.6T'
        }]
      }, {
        text: '变速箱',
        options: [{
          text: '手动挡'
        }, {
          text: '自动挡'
        }, {
          text: '手自一体'
        }]
      }]
    };
  }
};

function _defineProperty$42(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$3 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-drop-menu md-example-child-drop-menu-2" }, [_c('md-drop-menu', { ref: "dropMenu1", attrs: { "data": _vm.data, "default-value": ['1.8L', '自动挡'] } }), _vm._v(" "), _c('div', { staticClass: "content" }, [_vm._v("正文区域")])], 1);
  }, staticRenderFns: [],
  name: 'drop-menu-demo',
  /* DELETE */
  title: '禁用下拉菜单',
  titleEnUS: 'Drop-down menu with disabled item',
  codeSandBox: 'https://codesandbox.io/s/o546n0912q',
  height: 500,
  /* DELETE */
  components: _defineProperty$42({}, DropMenu.name, DropMenu),
  data: function data() {
    return {
      isContentShow: false,
      data: [{
        text: '排量',
        options: [{
          text: '1.6L'
        }, {
          text: '1.8L'
        }, {
          text: '2.0L',
          disabled: true
        }, {
          text: '1.2T'
        }, {
          text: '1.4T'
        }, {
          text: '1.6T'
        }]
      }, {
        text: '变速箱',
        disabled: true
      }]
    };
  }
};

function _defineProperty$43(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-drop-menu md-example-child-drop-menu-3" }, [_c('md-drop-menu', { ref: "dropMenu3", attrs: { "data": _vm.data }, scopedSlots: _vm._u([{ key: "default", fn: function fn(_ref) {
          var option = _ref.option;
          return [_c('div', { staticClass: "md-drop-menu-custom-title", domProps: { "textContent": _vm._s(option.text) } }), _vm._v(" "), _c('div', { staticClass: "md-drop-menu-custom-brief" }, [_vm._v(_vm._s(option.text) + "【可使用slot-scope进行自定义描述】")])];
        } }]) }), _vm._v(" "), _c('div', { staticClass: "content" }, [_vm._v("正文区域")])], 1);
  }, staticRenderFns: [],
  name: 'drop-menu-demo',
  /* DELETE */
  title: '自定义菜单项',
  titleEnUS: 'Custom menu options',
  codeSandBox: 'https://codesandbox.io/s/w72k6o7l48',
  height: 250,
  /* DELETE */
  components: _defineProperty$43({}, DropMenu.name, DropMenu),
  data: function data() {
    return {
      isContentShow: false,
      data: [{
        text: '一级选项1',
        options: [{
          text: '二级选项1'
        }, {
          text: '二级选项2'
        }]
      }]
    };
  },

  methods: {
    getSelectedValue: function getSelectedValue(selector, index) {
      var value = this.$refs[selector].getSelectedValue(index);
      Dialog.alert({
        content: '<pre>' + JSON.stringify(value) + '</pre>'
      });
    }
  }
};

var _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$6 = _extends$5({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example drop-menu" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('drop-menu', [Demo0$4, Demo1$4, Demo2$3, Demo3$1]));

var simple = [[{ text: '2015', value: 1 }, { text: '2016', value: 2 }, { text: '2017', value: 3 }, { text: '2018', value: 4 }, { text: '2019', value: 5 }, { text: '2020', value: 6 }, { text: '2021', value: 2 }, { text: '2022', value: 3 }, { text: '2023', value: 2 }, { text: '2024', value: 3 }, { text: '2025', value: 2 }, { text: '2026', value: 3 }, { text: '2027', value: 2 }, { text: '2028', value: 3 }, { text: '2029', value: 2 }, { text: '2030', value: 3 }]];

function _defineProperty$44(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$5 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-picker md-example-child-picker-0" }, [_c('md-picker', { ref: "picker", attrs: { "data": _vm.pickerData, "invalid-index": [[2, 3, 4]], "is-view": "" }, on: { "initialed": _vm.onPickerInitialed, "change": _vm.onPickerConfirm } })], 1);
  }, staticRenderFns: [],
  name: 'picker-demo',
  /* DELETE */
  title: '单列数据 <a href="javascript:window.PickerTrigger0()">getColumnValues</a><a href="javascript:window.PickerTrigger1()">getColumnIndexs</a>',
  titleEnUS: 'Single column <a href="javascript:window.PickerTrigger0()">getColumnValues</a><a href="javascript:window.PickerTrigger1()">getColumnIndexs</a>',
  describe: '禁用2-4项',
  describeEnUS: 'Disable 2-4 items',
  /* DELETE */
  components: _defineProperty$44({}, Picker.name, Picker),
  data: function data() {
    return {
      pickerData: simple,
      pickerValue: ''
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.PickerTrigger0 = function () {
      _this.getColumnValues('picker');
    };
    window.PickerTrigger1 = function () {
      _this.getColumnIndexs('picker');
    };
  },

  methods: {
    onPickerInitialed: function onPickerInitialed() {
      var value = this.$refs.picker.getColumnValues();
      console.log('[Mand Mobile] Picker Initialed: ' + JSON.stringify(value));
    },
    onPickerConfirm: function onPickerConfirm(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValue = value.text;
      }
    },
    getColumnValues: function getColumnValues(picker) {
      var value = this.$refs[picker].getColumnValues();
      Dialog.alert({
        content: '<pre>' + JSON.stringify(value) + '</pre>'
      });
    },
    getColumnIndexs: function getColumnIndexs(picker) {
      var value = this.$refs[picker].getColumnIndexs();
      Dialog.alert({
        content: '<pre>' + JSON.stringify(value) + '</pre>'
      });
    }
  }
};

var district = [[{
  "value": "340000",
  "label": "安徽省",
  "children": [{
    "value": "341500",
    "label": "六安市",
    "children": [{
      "value": "341522",
      "label": "霍邱县",
      "children": []
    }, {
      "value": "341502",
      "label": "金安区",
      "children": []
    }, {
      "value": "341524",
      "label": "金寨县",
      "children": []
    }, {
      "value": "341526",
      "label": "其它区",
      "children": []
    }, {
      "value": "341521",
      "label": "寿县",
      "children": []
    }, {
      "value": "341523",
      "label": "舒城县",
      "children": []
    }, {
      "value": "341503",
      "label": "裕安区",
      "children": []
    }]
  }, {
    "value": "340500",
    "label": "马鞍山市",
    "children": [{
      "value": "340506",
      "label": "博望区",
      "children": []
    }]
  }, {
    "value": "341800",
    "label": "宣城市",
    "children": [{
      "value": "341822",
      "label": "广德县",
      "children": []
    }, {
      "value": "341824",
      "label": "绩溪县",
      "children": []
    }, {
      "value": "341825",
      "label": "旌德县",
      "children": []
    }]
  }]
}, {
  "value": "820000",
  "label": "澳门特别行政区",
  "children": [{
    "value": "820100",
    "label": "澳门半岛",
    "children": []
  }, {
    "value": "820200",
    "label": "离岛",
    "children": []
  }]
}, {
  "value": "110000",
  "label": "北京",
  "children": [{
    "value": "110100",
    "label": "北京市",
    "children": [{
      "value": "110114",
      "label": "昌平区",
      "children": []
    }, {
      "value": "110105",
      "label": "朝阳区",
      "children": []
    }, {
      "value": "110103",
      "label": "崇文区",
      "children": []
    }, {
      "value": "110115",
      "label": "大兴区",
      "children": []
    }, {
      "value": "110101",
      "label": "东城区",
      "children": []
    }, {
      "value": "110111",
      "label": "房山区",
      "children": []
    }, {
      "value": "110106",
      "label": "丰台区",
      "children": []
    }, {
      "value": "110108",
      "label": "海淀区",
      "children": []
    }, {
      "value": "110116",
      "label": "怀柔区",
      "children": []
    }, {
      "value": "110109",
      "label": "门头沟区",
      "children": []
    }, {
      "value": "110228",
      "label": "密云县",
      "children": []
    }, {
      "value": "110117",
      "label": "平谷区",
      "children": []
    }, {
      "value": "110230",
      "label": "其它区",
      "children": []
    }, {
      "value": "110107",
      "label": "石景山区",
      "children": []
    }, {
      "value": "110113",
      "label": "顺义区",
      "children": []
    }, {
      "value": "110112",
      "label": "通州区",
      "children": []
    }, {
      "value": "110102",
      "label": "西城区",
      "children": []
    }, {
      "value": "110104",
      "label": "宣武区",
      "children": []
    }, {
      "value": "110229",
      "label": "延庆县",
      "children": []
    }]
  }]
}, {
  "value": "450000",
  "label": "广西壮族自治区",
  "children": [{
    "value": "450500",
    "label": "北海市",
    "children": [{
      "value": "450502",
      "label": "海城区",
      "children": []
    }, {
      "value": "450521",
      "label": "合浦县",
      "children": []
    }, {
      "value": "450522",
      "label": "其它区",
      "children": []
    }, {
      "value": "450512",
      "label": "铁山港区",
      "children": []
    }, {
      "value": "450503",
      "label": "银海区",
      "children": []
    }]
  }, {
    "value": "451000",
    "label": "百色市",
    "children": [{
      "value": "451024",
      "label": "德保县",
      "children": []
    }, {
      "value": "451025",
      "label": "靖西县",
      "children": []
    }, {
      "value": "451028",
      "label": "乐业县",
      "children": []
    }, {
      "value": "451027",
      "label": "凌云县",
      "children": []
    }, {
      "value": "451031",
      "label": "隆林各族自治县",
      "children": []
    }, {
      "value": "451026",
      "label": "那坡县",
      "children": []
    }, {
      "value": "451023",
      "label": "平果县",
      "children": []
    }, {
      "value": "451032",
      "label": "其它区",
      "children": []
    }, {
      "value": "451022",
      "label": "田东县",
      "children": []
    }, {
      "value": "451029",
      "label": "田林县",
      "children": []
    }, {
      "value": "451021",
      "label": "田阳县",
      "children": []
    }, {
      "value": "451030",
      "label": "西林县",
      "children": []
    }, {
      "value": "451002",
      "label": "右江区",
      "children": []
    }]
  }, {
    "value": "451400",
    "label": "崇左市",
    "children": [{
      "value": "451424",
      "label": "大新县",
      "children": []
    }, {
      "value": "451421",
      "label": "扶绥县",
      "children": []
    }, {
      "value": "451402",
      "label": "江州区",
      "children": []
    }, {
      "value": "451423",
      "label": "龙州县",
      "children": []
    }, {
      "value": "451422",
      "label": "宁明县",
      "children": []
    }, {
      "value": "451481",
      "label": "凭祥市",
      "children": []
    }, {
      "value": "451482",
      "label": "其它区",
      "children": []
    }, {
      "value": "451425",
      "label": "天等县",
      "children": []
    }]
  }, {
    "value": "450600",
    "label": "防城港市",
    "children": [{
      "value": "450681",
      "label": "东兴市",
      "children": []
    }, {
      "value": "450603",
      "label": "防城区",
      "children": []
    }, {
      "value": "450602",
      "label": "港口区",
      "children": []
    }, {
      "value": "450682",
      "label": "其它区",
      "children": []
    }, {
      "value": "450621",
      "label": "上思县",
      "children": []
    }]
  }, {
    "value": "450800",
    "label": "贵港市",
    "children": [{
      "value": "450802",
      "label": "港北区",
      "children": []
    }, {
      "value": "450803",
      "label": "港南区",
      "children": []
    }, {
      "value": "450881",
      "label": "桂平市",
      "children": []
    }, {
      "value": "450821",
      "label": "平南县",
      "children": []
    }, {
      "value": "450882",
      "label": "其它区",
      "children": []
    }, {
      "value": "450804",
      "label": "覃塘区",
      "children": []
    }]
  }, {
    "value": "450300",
    "label": "桂林市",
    "children": [{
      "value": "450303",
      "label": "叠彩区",
      "children": []
    }, {
      "value": "450332",
      "label": "恭城瑶族自治县",
      "children": []
    }, {
      "value": "450327",
      "label": "灌阳县",
      "children": []
    }, {
      "value": "450331",
      "label": "荔浦县",
      "children": []
    }, {
      "value": "450322",
      "label": "临桂区",
      "children": []
    }, {
      "value": "450323",
      "label": "灵川县",
      "children": []
    }, {
      "value": "450328",
      "label": "龙胜各族自治县",
      "children": []
    }, {
      "value": "450330",
      "label": "平乐县",
      "children": []
    }, {
      "value": "450333",
      "label": "其它区",
      "children": []
    }, {
      "value": "450305",
      "label": "七星区",
      "children": []
    }, {
      "value": "450324",
      "label": "全州县",
      "children": []
    }, {
      "value": "450304",
      "label": "象山区",
      "children": []
    }, {
      "value": "450325",
      "label": "兴安县",
      "children": []
    }, {
      "value": "450302",
      "label": "秀峰区",
      "children": []
    }, {
      "value": "450311",
      "label": "雁山区",
      "children": []
    }, {
      "value": "450321",
      "label": "阳朔县",
      "children": []
    }, {
      "value": "450326",
      "label": "永福县",
      "children": []
    }, {
      "value": "450329",
      "label": "资源县",
      "children": []
    }]
  }, {
    "value": "451200",
    "label": "河池市",
    "children": [{
      "value": "451227",
      "label": "巴马瑶族自治县",
      "children": []
    }, {
      "value": "451229",
      "label": "大化瑶族自治县",
      "children": []
    }, {
      "value": "451224",
      "label": "东兰县",
      "children": []
    }, {
      "value": "451228",
      "label": "都安瑶族自治县",
      "children": []
    }, {
      "value": "451223",
      "label": "凤山县",
      "children": []
    }, {
      "value": "451226",
      "label": "环江毛南族自治县",
      "children": []
    }, {
      "value": "451202",
      "label": "金城江区",
      "children": []
    }, {
      "value": "451225",
      "label": "罗城仫佬族自治县",
      "children": []
    }, {
      "value": "451221",
      "label": "南丹县",
      "children": []
    }, {
      "value": "451282",
      "label": "其它区",
      "children": []
    }, {
      "value": "451222",
      "label": "天峨县",
      "children": []
    }, {
      "value": "451281",
      "label": "宜州市",
      "children": []
    }]
  }, {
    "value": "451100",
    "label": "贺州市",
    "children": [{
      "value": "451102",
      "label": "八步区",
      "children": []
    }, {
      "value": "451123",
      "label": "富川瑶族自治县",
      "children": []
    }, {
      "value": "451119",
      "label": "平桂管理区",
      "children": []
    }, {
      "value": "451124",
      "label": "其它区",
      "children": []
    }, {
      "value": "451121",
      "label": "昭平县",
      "children": []
    }, {
      "value": "451122",
      "label": "钟山县",
      "children": []
    }]
  }, {
    "value": "451300",
    "label": "来宾市",
    "children": [{
      "value": "451381",
      "label": "合山市",
      "children": []
    }, {
      "value": "451324",
      "label": "金秀瑶族自治县",
      "children": []
    }, {
      "value": "451382",
      "label": "其它区",
      "children": []
    }, {
      "value": "451323",
      "label": "武宣县",
      "children": []
    }, {
      "value": "451322",
      "label": "象州县",
      "children": []
    }, {
      "value": "451321",
      "label": "忻城县",
      "children": []
    }, {
      "value": "451302",
      "label": "兴宾区",
      "children": []
    }]
  }, {
    "value": "450200",
    "label": "柳州市",
    "children": [{
      "value": "450202",
      "label": "城中区",
      "children": []
    }, {
      "value": "450205",
      "label": "柳北区",
      "children": []
    }, {
      "value": "450222",
      "label": "柳城县",
      "children": []
    }, {
      "value": "450221",
      "label": "柳江县",
      "children": []
    }, {
      "value": "450204",
      "label": "柳南区",
      "children": []
    }, {
      "value": "450223",
      "label": "鹿寨县",
      "children": []
    }, {
      "value": "450227",
      "label": "其它区",
      "children": []
    }, {
      "value": "450224",
      "label": "融安县",
      "children": []
    }, {
      "value": "450225",
      "label": "融水苗族自治县",
      "children": []
    }, {
      "value": "450226",
      "label": "三江侗族自治县",
      "children": []
    }, {
      "value": "450203",
      "label": "鱼峰区",
      "children": []
    }]
  }, {
    "value": "450100",
    "label": "南宁市",
    "children": [{
      "value": "450126",
      "label": "宾阳县",
      "children": []
    }, {
      "value": "450127",
      "label": "横县",
      "children": []
    }, {
      "value": "450105",
      "label": "江南区",
      "children": []
    }, {
      "value": "450108",
      "label": "良庆区",
      "children": []
    }, {
      "value": "450123",
      "label": "隆安县",
      "children": []
    }, {
      "value": "450124",
      "label": "马山县",
      "children": []
    }, {
      "value": "450128",
      "label": "其它区",
      "children": []
    }, {
      "value": "450103",
      "label": "青秀区",
      "children": []
    }, {
      "value": "450125",
      "label": "上林县",
      "children": []
    }, {
      "value": "450122",
      "label": "武鸣区",
      "children": []
    }, {
      "value": "450107",
      "label": "西乡塘区",
      "children": []
    }, {
      "value": "450102",
      "label": "兴宁区",
      "children": []
    }, {
      "value": "450109",
      "label": "邕宁区",
      "children": []
    }]
  }, {
    "value": "450700",
    "label": "钦州市",
    "children": [{
      "value": "450721",
      "label": "灵山县",
      "children": []
    }, {
      "value": "450722",
      "label": "浦北县",
      "children": []
    }, {
      "value": "450723",
      "label": "其它区",
      "children": []
    }, {
      "value": "450703",
      "label": "钦北区",
      "children": []
    }, {
      "value": "450702",
      "label": "钦南区",
      "children": []
    }]
  }, {
    "value": "450400",
    "label": "梧州市",
    "children": [{
      "value": "450421",
      "label": "苍梧县",
      "children": []
    }, {
      "value": "450481",
      "label": "岑溪市",
      "children": []
    }, {
      "value": "450405",
      "label": "长洲区",
      "children": []
    }, {
      "value": "450404",
      "label": "蝶山区",
      "children": []
    }, {
      "value": "450406",
      "label": "龙圩区",
      "children": []
    }, {
      "value": "450423",
      "label": "蒙山县",
      "children": []
    }, {
      "value": "450482",
      "label": "其它区",
      "children": []
    }, {
      "value": "450422",
      "label": "藤县",
      "children": []
    }, {
      "value": "450403",
      "label": "万秀区",
      "children": []
    }]
  }, {
    "value": "450900",
    "label": "玉林市",
    "children": [{
      "value": "450981",
      "label": "北流市",
      "children": []
    }, {
      "value": "450923",
      "label": "博白县",
      "children": []
    }, {
      "value": "450903",
      "label": "福绵区",
      "children": []
    }, {
      "value": "450922",
      "label": "陆川县",
      "children": []
    }, {
      "value": "450982",
      "label": "其它区",
      "children": []
    }, {
      "value": "450921",
      "label": "容县",
      "children": []
    }, {
      "value": "450924",
      "label": "兴业县",
      "children": []
    }, {
      "value": "450902",
      "label": "玉州区",
      "children": []
    }]
  }]
}, {
  "value": "810000",
  "label": "香港特别行政区",
  "children": [{
    "value": "810200",
    "label": "九龙",
    "children": [{
      "value": "810205",
      "label": "观塘区",
      "children": []
    }, {
      "value": "810204",
      "label": "黄大仙区",
      "children": []
    }, {
      "value": "810201",
      "label": "九龙城区",
      "children": []
    }, {
      "value": "810203",
      "label": "深水埗区",
      "children": []
    }, {
      "value": "810202",
      "label": "油尖旺区",
      "children": []
    }]
  }, {
    "value": "810100",
    "label": "香港岛",
    "children": [{
      "value": "810103",
      "label": "东区",
      "children": []
    }, {
      "value": "810104",
      "label": "南区",
      "children": []
    }, {
      "value": "810102",
      "label": "湾仔",
      "children": []
    }, {
      "value": "810101",
      "label": "中西区",
      "children": []
    }]
  }, {
    "value": "810300",
    "label": "新界",
    "children": [{
      "value": "810301",
      "label": "北区",
      "children": []
    }, {
      "value": "810302",
      "label": "大埔区",
      "children": []
    }, {
      "value": "810308",
      "label": "葵青区",
      "children": []
    }, {
      "value": "810309",
      "label": "离岛区",
      "children": []
    }, {
      "value": "810307",
      "label": "荃湾区",
      "children": []
    }, {
      "value": "810303",
      "label": "沙田区",
      "children": []
    }, {
      "value": "810306",
      "label": "屯门区",
      "children": []
    }, {
      "value": "810304",
      "label": "西贡区",
      "children": []
    }, {
      "value": "810305",
      "label": "元朗区",
      "children": []
    }]
  }]
}, {
  "value": "330000",
  "label": "浙江省",
  "children": [{
    "value": "330100",
    "label": "杭州市",
    "children": [{
      "value": "330108",
      "label": "滨江区",
      "children": []
    }, {
      "value": "330127",
      "label": "淳安县",
      "children": []
    }, {
      "value": "330183",
      "label": "富阳区",
      "children": []
    }, {
      "value": "330105",
      "label": "拱墅区",
      "children": []
    }, {
      "value": "330182",
      "label": "建德市",
      "children": []
    }, {
      "value": "330104",
      "label": "江干区",
      "children": []
    }, {
      "value": "330185",
      "label": "临安市",
      "children": []
    }, {
      "value": "330186",
      "label": "其它区",
      "children": []
    }, {
      "value": "330102",
      "label": "上城区",
      "children": []
    }, {
      "value": "330122",
      "label": "桐庐县",
      "children": []
    }, {
      "value": "330106",
      "label": "西湖区",
      "children": []
    }, {
      "value": "330103",
      "label": "下城区",
      "children": []
    }, {
      "value": "330109",
      "label": "萧山区",
      "children": []
    }, {
      "value": "330110",
      "label": "余杭区",
      "children": []
    }]
  }, {
    "value": "330500",
    "label": "湖州市",
    "children": [{
      "value": "330523",
      "label": "安吉县",
      "children": []
    }, {
      "value": "330522",
      "label": "长兴县",
      "children": []
    }, {
      "value": "330521",
      "label": "德清县",
      "children": []
    }, {
      "value": "330503",
      "label": "南浔区",
      "children": []
    }, {
      "value": "330524",
      "label": "其它区",
      "children": []
    }, {
      "value": "330502",
      "label": "吴兴区",
      "children": []
    }]
  }, {
    "value": "330400",
    "label": "嘉兴市",
    "children": [{
      "value": "330481",
      "label": "海宁市",
      "children": []
    }, {
      "value": "330424",
      "label": "海盐县",
      "children": []
    }, {
      "value": "330421",
      "label": "嘉善县",
      "children": []
    }, {
      "value": "330402",
      "label": "南湖区",
      "children": []
    }, {
      "value": "330482",
      "label": "平湖市",
      "children": []
    }, {
      "value": "330484",
      "label": "其它区",
      "children": []
    }, {
      "value": "330483",
      "label": "桐乡市",
      "children": []
    }, {
      "value": "330411",
      "label": "秀洲区",
      "children": []
    }]
  }, {
    "value": "330700",
    "label": "金华市",
    "children": [{
      "value": "330783",
      "label": "东阳市",
      "children": []
    }, {
      "value": "330703",
      "label": "金东区",
      "children": []
    }, {
      "value": "330781",
      "label": "兰溪市",
      "children": []
    }, {
      "value": "330727",
      "label": "磐安县",
      "children": []
    }, {
      "value": "330726",
      "label": "浦江县",
      "children": []
    }, {
      "value": "330785",
      "label": "其它区",
      "children": []
    }, {
      "value": "330702",
      "label": "婺城区",
      "children": []
    }, {
      "value": "330723",
      "label": "武义县",
      "children": []
    }, {
      "value": "330782",
      "label": "义乌市",
      "children": []
    }, {
      "value": "330784",
      "label": "永康市",
      "children": []
    }]
  }, {
    "value": "331100",
    "label": "丽水市",
    "children": [{
      "value": "331122",
      "label": "缙云县",
      "children": []
    }, {
      "value": "331127",
      "label": "景宁畲族自治县",
      "children": []
    }, {
      "value": "331102",
      "label": "莲都区",
      "children": []
    }, {
      "value": "331181",
      "label": "龙泉市",
      "children": []
    }, {
      "value": "331182",
      "label": "其它区",
      "children": []
    }, {
      "value": "331121",
      "label": "青田县",
      "children": []
    }, {
      "value": "331126",
      "label": "庆元县",
      "children": []
    }, {
      "value": "331124",
      "label": "松阳县",
      "children": []
    }, {
      "value": "331123",
      "label": "遂昌县",
      "children": []
    }, {
      "value": "331125",
      "label": "云和县",
      "children": []
    }]
  }, {
    "value": "330200",
    "label": "宁波市",
    "children": [{
      "value": "330206",
      "label": "北仑区",
      "children": []
    }, {
      "value": "330282",
      "label": "慈溪市",
      "children": []
    }, {
      "value": "330283",
      "label": "奉化市",
      "children": []
    }, {
      "value": "330203",
      "label": "海曙区",
      "children": []
    }, {
      "value": "330205",
      "label": "江北区",
      "children": []
    }, {
      "value": "330204",
      "label": "江东区",
      "children": []
    }, {
      "value": "330226",
      "label": "宁海县",
      "children": []
    }, {
      "value": "330284",
      "label": "其它区",
      "children": []
    }, {
      "value": "330225",
      "label": "象山县",
      "children": []
    }, {
      "value": "330212",
      "label": "鄞州区",
      "children": []
    }, {
      "value": "330281",
      "label": "余姚市",
      "children": []
    }, {
      "value": "330211",
      "label": "镇海区",
      "children": []
    }]
  }, {
    "value": "330800",
    "label": "衢州市",
    "children": [{
      "value": "330822",
      "label": "常山县",
      "children": []
    }, {
      "value": "330881",
      "label": "江山市",
      "children": []
    }, {
      "value": "330824",
      "label": "开化县",
      "children": []
    }, {
      "value": "330802",
      "label": "柯城区",
      "children": []
    }, {
      "value": "330825",
      "label": "龙游县",
      "children": []
    }, {
      "value": "330882",
      "label": "其它区",
      "children": []
    }, {
      "value": "330803",
      "label": "衢江区",
      "children": []
    }]
  }, {
    "value": "330600",
    "label": "绍兴市",
    "children": [{
      "value": "330621",
      "label": "柯桥区",
      "children": []
    }, {
      "value": "330684",
      "label": "其它区",
      "children": []
    }, {
      "value": "330682",
      "label": "上虞区",
      "children": []
    }, {
      "value": "330683",
      "label": "嵊州市",
      "children": []
    }, {
      "value": "330624",
      "label": "新昌县",
      "children": []
    }, {
      "value": "330602",
      "label": "越城区",
      "children": []
    }, {
      "value": "330681",
      "label": "诸暨市",
      "children": []
    }]
  }, {
    "value": "331000",
    "label": "台州市",
    "children": [{
      "value": "331003",
      "label": "黄岩区",
      "children": []
    }, {
      "value": "331002",
      "label": "椒江区",
      "children": []
    }, {
      "value": "331082",
      "label": "临海市",
      "children": []
    }, {
      "value": "331004",
      "label": "路桥区",
      "children": []
    }, {
      "value": "331083",
      "label": "其它区",
      "children": []
    }, {
      "value": "331022",
      "label": "三门县",
      "children": []
    }, {
      "value": "331023",
      "label": "天台县",
      "children": []
    }, {
      "value": "331081",
      "label": "温岭市",
      "children": []
    }, {
      "value": "331024",
      "label": "仙居县",
      "children": []
    }, {
      "value": "331021",
      "label": "玉环县",
      "children": []
    }]
  }, {
    "value": "330300",
    "label": "温州市",
    "children": [{
      "value": "330327",
      "label": "苍南县",
      "children": []
    }, {
      "value": "330322",
      "label": "洞头县",
      "children": []
    }, {
      "value": "330303",
      "label": "龙湾区",
      "children": []
    }, {
      "value": "330302",
      "label": "鹿城区",
      "children": []
    }, {
      "value": "330304",
      "label": "瓯海区",
      "children": []
    }, {
      "value": "330326",
      "label": "平阳县",
      "children": []
    }, {
      "value": "330383",
      "label": "其它区",
      "children": []
    }, {
      "value": "330381",
      "label": "瑞安市",
      "children": []
    }, {
      "value": "330329",
      "label": "泰顺县",
      "children": []
    }, {
      "value": "330328",
      "label": "文成县",
      "children": []
    }, {
      "value": "330324",
      "label": "永嘉县",
      "children": []
    }, {
      "value": "330382",
      "label": "乐清市",
      "children": []
    }]
  }, {
    "value": "330900",
    "label": "舟山市",
    "children": [{
      "value": "330921",
      "label": "岱山县",
      "children": []
    }, {
      "value": "330902",
      "label": "定海区",
      "children": []
    }, {
      "value": "330903",
      "label": "普陀区",
      "children": []
    }, {
      "value": "330923",
      "label": "其它区",
      "children": []
    }, {
      "value": "330922",
      "label": "嵊泗县",
      "children": []
    }]
  }]
}]];

function _defineProperty$45(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$5 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-picker md-example-child-picker-1" }, [_c('md-picker', { ref: "picker", attrs: { "data": _vm.pickerData, "cols": 3, "default-index": _vm.pickerDefaultIndex, "is-view": "", "is-cascade": "" }, on: { "initialed": _vm.onPickerInitialed, "change": _vm.onPickerConfirm } })], 1);
  }, staticRenderFns: [],
  name: 'picker-demo',
  /* DELETE */
  title: '联动数据 <a href="javascript:window.PickerTrigger2()">getColumnValue(0)</a><a href="javascript:window.PickerTrigger3()">getColumnIndex(0)</a>',
  titleEnUS: 'Cascade <a href="javascript:window.PickerTrigger2()">getColumnValue(0)</a><a href="javascript:window.PickerTrigger3()">getColumnIndex(0)</a>',
  describe: '默认选中3, 2, 1项',
  describeEnUS: '"3, 2, 1" item selected by default',
  /* DELETE */
  components: _defineProperty$45({}, Picker.name, Picker),
  data: function data() {
    return {
      pickerData: [],
      pickerDefaultIndex: [],
      pickerValue: ''
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.pickerData = district;
    this.pickerDefaultIndex = [3, 2, 1];

    window.PickerTrigger2 = function () {
      _this.getColumnValue('picker', 0);
    };
    window.PickerTrigger3 = function () {
      _this.getColumnIndex('picker', 0);
    };
  },

  methods: {
    onPickerInitialed: function onPickerInitialed() {
      var columnValues = this.$refs.picker.getColumnValues();
      var value = '';
      columnValues.forEach(function (item) {
        value += item.label + '-';
      });
      console.log('[Mand Mobile] Picker getColumnValues: ' + value.substr(0, value.length - 1));
    },
    onPickerConfirm: function onPickerConfirm(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValue = value.text;
      }
    },
    getColumnValue: function getColumnValue(picker, index) {
      var value = this.$refs.picker.getColumnValue(index);
      delete value.children;
      Dialog.alert({
        content: JSON.stringify(value)
      });
    },
    getColumnIndex: function getColumnIndex(picker, index) {
      var value = this.$refs.picker.getColumnIndex(index);
      Dialog.alert({
        content: '<pre>' + JSON.stringify(value) + '</pre>'
      });
    }
  }
};

var _components$15;

function _defineProperty$46(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$4 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-picker md-example-child-picker-2" }, [_c('md-field', [_c('md-field-item', { attrs: { "title": "起保年份", "arrow": "arrow-right", "align": "right", "value": _vm.pickerValue0 }, nativeOn: { "click": function click($event) {
          _vm.isPickerShow0 = true;
        } } }), _vm._v(" "), _c('md-field-item', { attrs: { "title": "省市区/县", "arrow": "arrow-right", "align": "right", "value": _vm.pickerValue1 }, nativeOn: { "click": function click($event) {
          _vm.isPickerShow1 = true;
        } } })], 1), _vm._v(" "), _c('md-picker', { ref: "picker0", attrs: { "data": _vm.pickerData0, "title": "选择年份" }, on: { "confirm": function confirm($event) {
          _vm.onPickerConfirm(0);
        } }, model: { value: _vm.isPickerShow0, callback: function callback($$v) {
          _vm.isPickerShow0 = $$v;
        }, expression: "isPickerShow0" } }), _vm._v(" "), _c('md-picker', { ref: "picker1", attrs: { "data": _vm.pickerData1, "cols": 3, "is-cascade": "", "title": "选择省市区/县" }, on: { "confirm": function confirm($event) {
          _vm.onPickerConfirm(1);
        } }, model: { value: _vm.isPickerShow1, callback: function callback($$v) {
          _vm.isPickerShow1 = $$v;
        }, expression: "isPickerShow1" } })], 1);
  }, staticRenderFns: [],
  name: 'picker-demo',
  /* DELETE */
  title: '弹出展示',
  titleEnUS: 'Display in Popup',
  height: 350,
  /* DELETE */
  components: (_components$15 = {}, _defineProperty$46(_components$15, Picker.name, Picker), _defineProperty$46(_components$15, Field.name, Field), _defineProperty$46(_components$15, FieldItem.name, FieldItem), _components$15),
  data: function data() {
    return {
      isPickerShow0: false,
      isPickerShow1: false,
      pickerData0: simple,
      pickerData1: district,
      pickerValue0: '',
      pickerValue1: ''
    };
  },

  methods: {
    onPickerConfirm: function onPickerConfirm(index) {
      var values = this.$refs['picker' + index].getColumnValues();

      var res = '';
      values.forEach(function (value) {
        value && (res += (value.text || value.label) + ' ');
      });
      this['pickerValue' + index] = res;
    }
  }
};

var _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$7 = _extends$6({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example picker" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('picker', [Demo0$5, Demo1$5, Demo2$4]));

function _defineProperty$47(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$6 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tab-bar md-example-child-tab-bar-0" }, [_c('md-tab-bar', { attrs: { "titles": _vm.titles } })], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  components: _defineProperty$47({}, TabBar.name, TabBar),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

function _defineProperty$48(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$6 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tab-bar md-example-child-tab-bar-1" }, [_c('md-tab-bar', { attrs: { "titles": _vm.titles, "show-ink-bar": false } })], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '不带下划线',
  titleEnUS: 'Without underline',
  /* DELETE */
  components: _defineProperty$48({}, TabBar.name, TabBar),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

function _defineProperty$49(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$5 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tab-bar md-example-child-tab-bar-2" }, [_c('md-tab-bar', { attrs: { "titles": _vm.titles, "show-ink-bar": true, "default-index": 2 } })], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '指定默认标签',
  titleEnUS: 'Specify the default tab',
  describe: '默认标签2',
  describeEnUS: 'Default tab 2',
  /* DELETE */
  components: _defineProperty$49({}, TabBar.name, TabBar),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

function _defineProperty$50(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$2 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tab-bar md-example-child-tab-bar-3" }, [_c('md-tab-bar', { attrs: { "titles": _vm.titles, "show-ink-bar": true, "ink-bar-length": 40 } })], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '指定下划线长度',
  titleEnUS: 'Underline width',
  /* DELETE */
  components: _defineProperty$50({}, TabBar.name, TabBar),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

function _defineProperty$51(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo4 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tab-bar md-example-child-tab-bar-4" }, [_c('md-tab-bar', { attrs: { "titles": _vm.titles, "show-ink-bar": true, "ink-bar-animate": false } })], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '禁用下划线动画',
  titleEnUS: 'Disable underline animation',
  /* DELETE */
  components: _defineProperty$51({}, TabBar.name, TabBar),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

var _components$16;

function _defineProperty$52(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo5 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tab-bar md-example-child-tab-bar-5" }, [_c('md-tab-bar', { attrs: { "show-ink-bar": true } }, [_c('div', [_c('md-icon', { attrs: { "name": "hollow-plus", "size": "sm" } }), _vm._v(" 我 ")], 1), _vm._v(" "), _c('div', [_c('md-icon', { attrs: { "name": "cross", "size": "sm" } }), _vm._v(" 你 ")], 1), _vm._v(" "), _c('div', [_c('md-icon', { attrs: { "name": "right", "size": "sm" } }), _vm._v(" 他 ")], 1)])], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '自定义内容',
  titleEnUS: 'Custom content',
  /* DELETE */
  components: (_components$16 = {}, _defineProperty$52(_components$16, Icon.name, Icon), _defineProperty$52(_components$16, TabBar.name, TabBar), _components$16)
};

function _defineProperty$53(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo6 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tab-bar md-example-child-tab-bar-6" }, [_c('md-tab-bar', { attrs: { "titles": _vm.titles }, on: { "indexChanged": _vm.alert } })], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '监听点击事件',
  titleEnUS: 'Listen click event',
  /* DELETE */
  components: _defineProperty$53({}, TabBar.name, TabBar),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  },

  methods: {
    alert: function alert(index, preIndex) {
      Toast.succeed('index\u7531' + preIndex + '\u5207\u6362\u4E3A' + index);
    }
  }
};

function _defineProperty$54(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo7 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tab-bar md-example-child-tab-bar-7" }, [_c('md-tab-bar', { ref: "tabBar", attrs: { "titles": _vm.titles, "show-ink-bar": true } })], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '通过公共方法切换 <a href="javascript:window.triggerTabBar()">selectTab(2)</a>',
  titleEnUS: 'Switch by public method <a href="javascript:window.triggerTabBar()">selectTab(2)</a>',
  /* DELETE */
  components: _defineProperty$54({}, TabBar.name, TabBar),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.triggerTabBar = function () {
      _this.$refs.tabBar.selectTab(2);
    };
  },

  methods: {
    alert: function alert(index, preIndex) {
      Toast.succeed('index\u7531' + preIndex + '\u5207\u6362\u4E3A' + index);
    }
  }
};

var _components$17;

function _defineProperty$55(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo8 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tab-bar md-example-child-tab-bar-8" }, [_c('md-tab-bar', { attrs: { "show-ink-bar": true, "titles": _vm.titles }, scopedSlots: _vm._u([{ key: "title", fn: function fn(props) {
          return _c('div', {}, [_c('md-icon', { attrs: { "name": "hollow-plus", "size": "sm" } }), _vm._v(" " + _vm._s(props.prefix) + _vm._s(props.title) + " ")], 1);
        } }]) })], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: 'scope-slot',
  /* DELETE */
  data: function data() {
    return {
      titles: [{
        title: '第1',
        prefix: '我'
      }, {
        title: '第2',
        prefix: '你'
      }, {
        title: '第3',
        prefix: '他'
      }]
    };
  },

  components: (_components$17 = {}, _defineProperty$55(_components$17, Icon.name, Icon), _defineProperty$55(_components$17, TabBar.name, TabBar), _components$17)
};

function _defineProperty$56(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo9 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tab-bar md-example-child-tab-bar-9" }, [_c('md-tab-bar', { attrs: { "titles": _vm.titles } })], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-501409ad',
  name: 'tab-bar-demo',
  /* DELETE */
  title: '设置边距',
  titleEnUS: 'Setting margins',
  /* DELETE */
  components: _defineProperty$56({}, TabBar.name, TabBar),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

var _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$8 = _extends$7({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example tab-bar" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [], _scopeId: 'data-v-5ff4c9d5' }, createDemoModule('tab-bar', [Demo0$6, Demo1$6, Demo2$5, Demo3$2, Demo4, Demo5, Demo6, Demo7, Demo8, Demo9]));

var colors = [{
  color: '#4390EE',
  text: '给时光以生命，给岁月以文明。'
}, {
  color: '#364d79',
  text: '你的无畏来源于无知。'
}, {
  color: '#CA4040',
  text: '一切都将逝去，只有死神永生。'
}];

var _components$18;

function _defineProperty$57(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$7 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-swiper md-example-child-swiper-0" }, [_c('md-swiper', { ref: "swiper", on: { "before-change": _vm.beforeChange, "after-change": _vm.afterChange } }, _vm._l(_vm.simple, function (item, $index) {
      return _c('md-swiper-item', { key: $index }, [_c('a', { staticClass: "banner-item", style: { 'background': '' + item.color }, attrs: { "href": "javascript:void(0)" } }, [_vm._v(_vm._s(item.text))])]);
    }))], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-32be6801',
  name: 'swiper-demo',
  /* DELETE */
  title: '横向轮播 <a href="javascript:window.triggerSwiper0()">Goto 2</a><a href="javascript:window.triggerSwiper1()">Play</a><a href="javascript:window.triggerSwiper2()">Stop</a>',
  titleEnUS: 'Horizontal rotation <a href="javascript:window.triggerSwiper0()">Goto 2</a><a href="javascript:window.triggerSwiper1()">Play</a><a href="javascript:window.triggerSwiper2()">Stop</a>',
  message: '@before-change: from: <span id="valueSwiper0">0</span>, to: <span id="valueSwiper1">0</span><br/>@after-change: from: <span id="valueSwiper2">0</span>, to: <span id="valueSwiper3">0</span>',
  codeSandBox: 'https://codesandbox.io/s/jz7p622ryv',
  /* DELETE */
  components: (_components$18 = {}, _defineProperty$57(_components$18, Swiper.name, Swiper), _defineProperty$57(_components$18, SwiperItem.name, SwiperItem), _components$18),
  data: function data() {
    return {
      simple: colors
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.triggerSwiper0 = function () {
      _this.goto();
    };
    window.triggerSwiper1 = function () {
      _this.play();
    };
    window.triggerSwiper2 = function () {
      _this.stop();
    };
  },

  methods: {
    setValue: function setValue(id, value) {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value);
    },
    beforeChange: function beforeChange(from, to) {
      this.setValue('#valueSwiper0', from);
      this.setValue('#valueSwiper1', to);
    },
    afterChange: function afterChange(from, to) {
      this.setValue('#valueSwiper2', from);
      this.setValue('#valueSwiper3', to);
    },
    fn: function fn(index) {
      this.setValue('#valueSwiper4', index);
    },
    goto: function goto() {
      this.$refs.swiper.goto(2);
    },
    play: function play() {
      this.$refs.swiper.play();
    },
    stop: function stop() {
      this.$refs.swiper.stop();
    }
  }
};

var _components$19;

function _defineProperty$58(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$7 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-swiper md-example-child-swiper-1" }, [_c('md-swiper', { attrs: { "has-dots": false, "default-index": 1, "dragable": false, "autoplay": 5000, "transition": "slideY" }, on: { "before-change": _vm.beforeChange, "after-change": _vm.afterChange } }, _vm._l(_vm.simple, function (item, $index) {
      return _c('md-swiper-item', { key: $index }, [_c('a', { staticClass: "banner-item", style: { 'background': '' + item.color }, attrs: { "href": "javascript:void(0)" } }, [_vm._v(_vm._s(item.text))])]);
    }))], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-32cc7f82',
  name: 'swiper-demo',
  /* DELETE */
  title: '纵向轮播',
  titleEnUS: 'Vertical rotation',
  describe: '纵向，默认显示第2屏（index 1），不显示导航点，不可拖动，滚动间隔为5秒',
  describeEnUS: 'Vertically, the second screen (index 1) is displayed by default, navigation points are not displayed, and dragging is not possible. The scroll interval is 5 seconds',
  message: '@before-change: from: <span id="valueSwiper5">0</span>, to: <span id="valueSwiper6">0</span><br/>@after-change: from: <span id="valueSwiper7">0</span>, to: <span id="valueSwiper8">0</span>',
  codeSandBox: 'https://codesandbox.io/s/ojxkvq2mk6',
  /* DELETE */
  components: (_components$19 = {}, _defineProperty$58(_components$19, Swiper.name, Swiper), _defineProperty$58(_components$19, SwiperItem.name, SwiperItem), _components$19),
  data: function data() {
    return {
      simple: colors
    };
  },

  methods: {
    setValue: function setValue(id, value) {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value);
    },
    beforeChange: function beforeChange(from, to) {
      this.setValue('#valueSwiper5', from);
      this.setValue('#valueSwiper6', to);
    },
    afterChange: function afterChange(from, to) {
      this.setValue('#valueSwiper7', from);
      this.setValue('#valueSwiper8', to);
    }
  }
};

var _components$20;

function _defineProperty$59(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$6 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-swiper md-example-child-swiper-2" }, [_c('md-swiper', { ref: "swiper", attrs: { "autoplay": 5000, "transition": "fade" }, on: { "before-change": _vm.beforeChange, "after-change": _vm.afterChange } }, _vm._l(_vm.simple, function (item, $index) {
      return _c('md-swiper-item', { key: $index }, [_c('a', { staticClass: "banner-item", style: { 'background': '' + item.color }, attrs: { "href": "javascript:void(0)" } }, [_vm._v(_vm._s(item.text))])]);
    }))], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-32da9703',
  name: 'swiper-demo',
  /* DELETE */
  title: '渐隐轮播 <a href="javascript:window.triggerSwiper3()">Goto 2</a>',
  titleEnUS: 'Fade carousel <a href="javascript:window.triggerSwiper3()">Goto 2</a>',
  message: '@before-change: from: <span id="valueSwiper10">0</span>, to: <span id="valueSwiper11">0</span><br/>@after-change: from: <span id="valueSwiper12">0</span>, to: <span id="valueSwiper13">0</span>',
  codeSandBox: 'https://codesandbox.io/s/r0l69wxz3q',
  /* DELETE */
  components: (_components$20 = {}, _defineProperty$59(_components$20, Swiper.name, Swiper), _defineProperty$59(_components$20, SwiperItem.name, SwiperItem), _components$20),
  data: function data() {
    return {
      simple: colors
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.triggerSwiper3 = function () {
      _this.goto();
    };
  },

  methods: {
    setValue: function setValue(id, value) {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value);
    },
    beforeChange: function beforeChange(from, to) {
      this.setValue('#valueSwiper10', from);
      this.setValue('#valueSwiper11', to);
    },
    afterChange: function afterChange(from, to) {
      this.setValue('#valueSwiper12', from);
      this.setValue('#valueSwiper13', to);
    },
    goto: function goto() {
      this.$refs.swiper.goto(2);
    }
  }
};

var colors$1 = [[{
  color: '#4390EE',
  text: '引力波'
}, {
  color: '#CA4040',
  text: '智子'
}, {
  color: '#FF8604',
  text: '水滴'
}, {
  color: '#00CC00',
  text: '二向箔'
}, {
  color: '#0066CC',
  text: '飞刃'
}, {
  color: '#99CCCC',
  text: '碎星'
}], [{
  color: '#990033',
  text: '危机'
}, {
  color: '#CCFF66',
  text: '威摄'
}, {
  color: '#FF9900',
  text: '威摄后'
}, {
  color: '#FF9933',
  text: '广播'
}, {
  color: '#99CC33',
  text: '掩体'
}, {
  color: '#CC6699',
  text: '银河'
}], [{
  color: '#0099CC',
  text: '猜疑链'
}, {
  color: '#CCCCCC',
  text: '技术爆炸'
}, {
  color: '#FF6666',
  text: '黑暗森林'
}, {
  color: '#99CCCC',
  text: '地球'
}, {
  color: '#FFCC99',
  text: '三体'
}, {
  color: '#FFCCCC',
  text: '歌者'
}]];

var _components$21;

function _defineProperty$60(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$3 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-swiper md-example-child-swiper-3" }, [_c('md-swiper', { ref: "swiper", on: { "before-change": _vm.beforeChange, "after-change": _vm.afterChange } }, _vm._l(_vm.mulit, function (item, $index) {
      return _c('md-swiper-item', { key: $index }, [_c('ul', _vm._l(item, function (sub, $index1) {
        return _c('li', { key: $index1 }, [_c('a', { staticClass: "banner-item", style: { 'background': '' + sub.color }, attrs: { "href": "javascript:void(0)" } }, [_vm._v(_vm._s(sub.text))])]);
      }))]);
    }))], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-32e8ae84',
  name: 'swiper-demo',
  /* DELETE */
  title: '每屏多内容 <a href="javascript:window.triggerSwiper4()">Goto 2</a>',
  titleEnUS: 'Multiple content per screen <a href="javascript:window.triggerSwiper3()">Goto 2</a>',
  describe: '复杂结构，每屏显示一组多条内容',
  describeEnUS: 'Complex structure, displaying a group of multiple items per screen',
  message: '@before-change: from: <span id="valueSwiper15">0</span>, to: <span id="valueSwiper16">0</span><br/>@after-change: from: <span id="valueSwiper17">0</span>, to: <span id="valueSwiper18">0</span>',
  codeSandBox: 'https://codesandbox.io/s/rw9kkkjmpo',
  /* DELETE */
  components: (_components$21 = {}, _defineProperty$60(_components$21, Swiper.name, Swiper), _defineProperty$60(_components$21, SwiperItem.name, SwiperItem), _components$21),
  data: function data() {
    return {
      mulit: colors$1
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.triggerSwiper4 = function () {
      _this.goto();
    };
  },

  methods: {
    setValue: function setValue(id, value) {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value);
    },
    beforeChange: function beforeChange(from, to) {
      this.setValue('#valueSwiper15', from);
      this.setValue('#valueSwiper16', to);
    },
    afterChange: function afterChange(from, to) {
      this.setValue('#valueSwiper17', from);
      this.setValue('#valueSwiper18', to);
    },
    goto: function goto() {
      this.$refs.swiper.goto(2);
    }
  }
};

var _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$9 = _extends$8({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example swiper" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('swiper', [Demo0$7, Demo1$7, Demo2$6, Demo3$3]));

function _defineProperty$61(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$8 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-toast md-example-child-toast-0" }, [_c('md-button', { on: { "click": _vm.showTextToast } }, [_vm._v("纯文字")])], 1);
  }, staticRenderFns: [],
  name: 'toast-demo',
  /* DELETE */
  title: '纯文字',
  titleEnUS: 'Plain text',
  /* DELETE */
  components: _defineProperty$61({}, Button.name, Button),
  methods: {
    showTextToast: function showTextToast() {
      Toast.info('一段文字');
    }
  }
};

function _defineProperty$62(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$8 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-toast md-example-child-toast-1" }, [_c('md-button', { on: { "click": _vm.showSucceedToast } }, [_vm._v("成功")])], 1);
  }, staticRenderFns: [],
  name: 'toast-demo',
  /* DELETE */
  title: '成功',
  titleEnUS: 'Success',
  /* DELETE */
  components: _defineProperty$62({}, Button.name, Button),
  methods: {
    showSucceedToast: function showSucceedToast() {
      Toast.succeed('操作成功');
    }
  }
};

function _defineProperty$63(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$7 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-toast md-example-child-toast-2" }, [_c('md-button', { on: { "click": _vm.showSucceedToast } }, [_vm._v("失败")])], 1);
  }, staticRenderFns: [],
  name: 'toast-demo',
  /* DELETE */
  title: '失败',
  titleEnUS: 'Failure',
  /* DELETE */
  components: _defineProperty$63({}, Button.name, Button),
  methods: {
    showSucceedToast: function showSucceedToast() {
      Toast.failed('操作失败');
    }
  }
};

function _defineProperty$64(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$4 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-toast md-example-child-toast-3" }, [_c('md-button', { on: { "click": _vm.showLoadingToast } }, [_vm._v("载入")])], 1);
  }, staticRenderFns: [],
  name: 'toast-demo',
  /* DELETE */
  title: '载入',
  titleEnUS: 'Loading',
  /* DELETE */
  components: _defineProperty$64({}, Button.name, Button),
  methods: {
    showLoadingToast: function showLoadingToast() {
      Toast.loading('载入中');
      setTimeout(function () {
        Toast.hide();
      }, 3000);
    }
  }
};

function _defineProperty$65(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo4$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-toast md-example-child-toast-3" }, [_c('md-button', { on: { "click": _vm.start } }, [_vm._v("连续调用")])], 1);
  }, staticRenderFns: [],
  name: 'toast-demo',
  /* DELETE */
  title: '连续调用',
  titleEnUS: 'Continuous call',
  /* DELETE */
  components: _defineProperty$65({}, Button.name, Button),
  methods: {
    start: function start() {
      Toast.loading('载入中');
      setTimeout(function () {
        Toast.hide();
        setTimeout(function () {
          Toast.failed('载入失败');
        }, 10);
      }, 500);
    }
  }
};

function _defineProperty$66(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo5$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-toast md-example-child-toast-1" }, [_c('md-button', { on: { "click": _vm.showToast } }, [_vm._v("长文字")])], 1);
  }, staticRenderFns: [],
  name: 'toast-demo',
  /* DELETE */
  title: '长文字',
  titleEnUS: 'Long text',
  /* DELETE */
  components: _defineProperty$66({}, Button.name, Button),
  methods: {
    showToast: function showToast() {
      Toast.succeed('文字部分最多展示十二个字最多展示两行');
    }
  }
};

function _defineProperty$67(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo6$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-toast md-example-child-toast-0" }, [_c('md-button', { on: { "click": _vm.showTextToast } }, [_vm._v("自定义位置")])], 1);
  }, staticRenderFns: [],
  name: 'toast-demo',
  /* DELETE */
  title: '自定义位置',
  titleEnUS: 'Customize location',
  /* DELETE */
  components: _defineProperty$67({}, Button.name, Button),
  methods: {
    showTextToast: function showTextToast() {
      Toast({
        content: '自定义位置',
        position: 'bottom'
      });
    }
  }
};

var _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$10 = _extends$9({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example toast" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('toast', [Demo0$8, Demo1$8, Demo2$7, Demo3$4, Demo4$1, Demo5$1, Demo6$1]));

var _components$22;

function _defineProperty$68(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$9 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-dialog md-example-child-dialog-0" }, [_c('md-button', { on: { "click": function click($event) {
          _vm.basicDialog.open = true;
        } } }, [_vm._v("基本")]), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.iconDialog.open = true;
        } } }, [_vm._v("带图标")]), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.actDialog.open = true;
        } } }, [_vm._v("多操作")]), _vm._v(" "), _c('md-dialog', { attrs: { "title": "窗口标题", "closable": true, "btns": _vm.basicDialog.btns }, model: { value: _vm.basicDialog.open, callback: function callback($$v) {
          _vm.$set(_vm.basicDialog, "open", $$v);
        }, expression: "basicDialog.open" } }, [_vm._v(" 人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。 ")]), _vm._v(" "), _c('md-dialog', { attrs: { "icon": "circle-right", "title": "窗口标题", "closable": true, "btns": _vm.iconDialog.btns }, model: { value: _vm.iconDialog.open, callback: function callback($$v) {
          _vm.$set(_vm.iconDialog, "open", $$v);
        }, expression: "iconDialog.open" } }, [_vm._v(" 围在城里的人想逃出来，城外的人想冲进去，对婚姻也罢，职业也罢，人生的愿望大都如此。 ")]), _vm._v(" "), _c('md-dialog', { attrs: { "title": "窗口标题", "closable": false, "btns": _vm.actDialog.btns }, model: { value: _vm.actDialog.open, callback: function callback($$v) {
          _vm.$set(_vm.actDialog, "open", $$v);
        }, expression: "actDialog.open" } }, [_vm._v(" 据说每个人需要一面镜子，可以常常自照，知道自己是个什么东西。不过，能自知的人根本不用照镜子；不自知的东西，照了镜子也没有用。 ")])], 1);
  }, staticRenderFns: [],
  name: 'dialog-demo',
  components: (_components$22 = {}, _defineProperty$68(_components$22, Dialog.name, Dialog), _defineProperty$68(_components$22, Button.name, Button), _components$22),
  data: function data() {
    return {
      basicDialog: {
        open: false,
        btns: [{
          text: '确认操作',
          handler: this.onBasicConfirm
        }]
      },
      iconDialog: {
        open: false,
        btns: [{
          text: '确认操作',
          handler: this.onIconConfirm
        }]
      },
      actDialog: {
        open: false,
        btns: [{
          text: '取消',
          handler: this.onActCancel
        }, {
          text: '确认操作',
          handler: this.onActConfirm
        }]
      }
    };
  },

  methods: {
    onBasicConfirm: function onBasicConfirm() {
      Toast({
        content: '你点击了确认'
      });
      this.basicDialog.open = false;
    },
    onIconConfirm: function onIconConfirm() {
      Toast({
        content: '你点击了确认'
      });
      this.iconDialog.open = false;
    },
    onActCancel: function onActCancel() {
      Toast({
        content: '你点击了取消'
      });
      this.actDialog.open = false;
    },
    onActConfirm: function onActConfirm() {
      Toast({
        content: '你点击了确认'
      });
      this.actDialog.open = false;
    }
  }
};

var _components$23;

function _defineProperty$69(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$9 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-dialog md-example-child-dialog-1" }, [_c('md-button', { on: { "click": _vm.alert } }, [_vm._v("警告弹窗")]), _vm._v(" "), _c('md-button', { on: { "click": _vm.confirm } }, [_vm._v("确认弹窗")]), _vm._v(" "), _c('md-button', { on: { "click": _vm.succeedConfirm } }, [_vm._v("成功弹窗")]), _vm._v(" "), _c('md-button', { on: { "click": _vm.failedConfirm } }, [_vm._v("失败弹窗")])], 1);
  }, staticRenderFns: [],
  name: 'dialog-demo',
  /* DELETE */
  title: '单例模式',
  titleEnUS: 'Singleton mode',
  /* DELETE */
  components: (_components$23 = {}, _defineProperty$69(_components$23, Dialog.name, Dialog), _defineProperty$69(_components$23, Button.name, Button), _components$23),
  methods: {
    alert: function alert() {
      Dialog.alert({
        title: '警告',
        content: '您正在进行非法操作',
        cancelText: '取消',
        confirmText: '确定',
        onConfirm: function onConfirm() {
          return console.log('[Dialog.alert] confirm clicked');
        }
      });
    },
    confirm: function confirm() {
      Dialog.confirm({
        title: '确认',
        content: '请确认是否进行操作',
        confirmText: '确定',
        onConfirm: function onConfirm() {
          return console.log('[Dialog.confirm] confirm clicked');
        }
      });
    },
    succeedConfirm: function succeedConfirm() {
      Dialog.succeed({
        title: '成功',
        content: '恭喜您成功完成操作',
        confirmText: '确定',
        onConfirm: function onConfirm() {
          return console.log('[Dialog.succeed] confirm clicked');
        }
      });
    },
    failedConfirm: function failedConfirm() {
      Dialog.failed({
        title: '失败',
        content: '操作失败，请稍后重试',
        confirmText: '确定',
        onConfirm: function onConfirm() {
          return console.log('[Dialog.failed] confirm clicked');
        }
      });
    }
  }
};

var _extends$10 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$11 = _extends$10({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example dialog" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('dialog', [Demo0$9, Demo1$9]));

var _components$24;

function _defineProperty$70(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$10 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tip md-example-child-tip-0" }, [_c('md-tip', { attrs: { "content": "不错哟", "placement": "top" } }, [_c('md-button', { attrs: { "type": "ghost", "size": "small" } }, [_vm._v("点击我")])], 1)], 1);
  }, staticRenderFns: [],
  name: 'tips-demo',
  /* DELETE */
  title: '上方',
  titleEnUS: 'Top',
  /* DELETE */
  components: (_components$24 = {}, _defineProperty$70(_components$24, Tip$1.name, Tip$1), _defineProperty$70(_components$24, Button.name, Button), _components$24)
};

var _components$25;

function _defineProperty$71(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$10 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tip md-example-child-tip-1" }, [_c('md-tip', { attrs: { "content": "不错哟", "placement": "bottom" } }, [_c('md-button', { attrs: { "type": "ghost", "size": "small" } }, [_vm._v("点击我")])], 1)], 1);
  }, staticRenderFns: [],
  name: 'tips-demo',
  /* DELETE */
  title: '下方',
  titleEnUS: 'Bottom',
  /* DELETE */
  components: (_components$25 = {}, _defineProperty$71(_components$25, Tip$1.name, Tip$1), _defineProperty$71(_components$25, Button.name, Button), _components$25)
};

var _components$26;

function _defineProperty$72(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$8 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tip md-example-child-tip-2" }, [_c('md-tip', { attrs: { "content": "不错哟", "placement": "left" } }, [_c('md-button', { attrs: { "type": "ghost", "size": "small" } }, [_vm._v("点击我")])], 1)], 1);
  }, staticRenderFns: [],
  name: 'tips-demo',
  /* DELETE */
  title: '左侧',
  titleEnUS: 'Left',
  /* DELETE */
  components: (_components$26 = {}, _defineProperty$72(_components$26, Tip$1.name, Tip$1), _defineProperty$72(_components$26, Button.name, Button), _components$26)
};

var _components$27;

function _defineProperty$73(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$5 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tip md-example-child-tip-3" }, [_c('md-tip', { attrs: { "content": "点击拼车更有优惠，拼成还可能获得随机礼包", "placement": "right" } }, [_c('md-button', { attrs: { "type": "ghost", "size": "small" } }, [_vm._v("点击我")])], 1)], 1);
  }, staticRenderFns: [],
  name: 'tips-demo',
  /* DELETE */
  title: '右侧',
  titleEnUS: 'Right',
  /* DELETE */
  components: (_components$27 = {}, _defineProperty$73(_components$27, Tip$1.name, Tip$1), _defineProperty$73(_components$27, Button.name, Button), _components$27)
};

var _components$28;

function _defineProperty$74(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo4$2 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tip md-example-child-tip-4" }, [_c('md-tip', { attrs: { "content": "不错哟" }, on: { "show": _vm.onShow, "hide": _vm.onHide } }, [_c('md-button', { attrs: { "type": "ghost", "size": "small" } }, [_vm._v("点击我")])], 1)], 1);
  }, staticRenderFns: [],
  name: 'tips-demo',
  /* DELETE */
  title: '事件',
  titleEnUS: 'Event',
  /* DELETE */
  components: (_components$28 = {}, _defineProperty$74(_components$28, Tip$1.name, Tip$1), _defineProperty$74(_components$28, Button.name, Button), _components$28),
  methods: {
    onShow: function onShow() {
      Toast({
        content: '显示了'
      });
    },
    onHide: function onHide() {
      Toast({
        content: '隐藏了'
      });
    }
  }
};

var _extends$11 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$12 = _extends$11({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example tip" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('tip', [Demo0$10, Demo1$10, Demo2$8, Demo3$5, Demo4$2]));

function _defineProperty$75(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$11 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-0" }, [_c('md-tabs', { attrs: { "titles": _vm.titles } }, _vm._l(_vm.titles, function (title, index) {
      return _c('div', { key: index }, [_vm._v(" " + _vm._s(title) + "的内容 ")]);
    }))], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  components: _defineProperty$75({}, Tabs.name, Tabs),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

function _defineProperty$76(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$11 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-1" }, [_c('md-tabs', { attrs: { "titles": _vm.titles, "show-ink-bar": false } }, _vm._l(_vm.titles, function (title, index) {
      return _c('div', { key: index }, [_vm._v(" " + _vm._s(title) + "的内容 ")]);
    }))], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '不带下划线',
  titleEnUS: 'Without underline',
  /* DELETE */
  components: _defineProperty$76({}, Tabs.name, Tabs),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

function _defineProperty$77(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$9 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-2" }, [_c('md-tabs', { attrs: { "titles": _vm.titles, "default-index": 2, "show-ink-bar": "" } }, _vm._l(_vm.titles, function (title, index) {
      return _c('div', { key: index }, [_vm._v(" " + _vm._s(title) + "的内容 ")]);
    }))], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '指定默认标签',
  titleEnUS: 'Specify the default tab',
  describe: '默认标签2',
  describeEnUS: 'Default tab 2',
  /* DELETE */
  components: _defineProperty$77({}, Tabs.name, Tabs),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

function _defineProperty$78(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$6 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-3" }, [_c('md-tabs', { attrs: { "titles": _vm.titles, "ink-bar-length": 40, "show-ink-bar": "" } }, _vm._l(_vm.titles, function (title, index) {
      return _c('div', { key: index }, [_vm._v(" " + _vm._s(title) + "的内容 ")]);
    }))], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '指定下划线长度',
  titleEnUS: 'Underline width',
  /* DELETE */
  components: _defineProperty$78({}, Tabs.name, Tabs),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

function _defineProperty$79(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo4$3 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-4" }, [_c('md-tabs', { attrs: { "titles": _vm.titles, "ink-bar-animate": false, "show-ink-bar": "" } }, _vm._l(_vm.titles, function (title, index) {
      return _c('div', { key: index }, [_vm._v(" " + _vm._s(title) + "的内容 ")]);
    }))], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '禁用下划线动画',
  titleEnUS: 'Disable underline animation',
  /* DELETE */
  components: _defineProperty$79({}, Tabs.name, Tabs),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

var _components$29;

function _defineProperty$80(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo5$2 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-5" }, [_c('md-tabs', { attrs: { "show-ink-bar": "" } }, [_c('div', { attrs: { "slot": "title" }, slot: "title" }, [_c('div', [_c('md-icon', { attrs: { "name": "hollow-plus", "size": "sm" } }), _vm._v(" 我 ")], 1)]), _vm._v(" "), _c('div', [_vm._v(" 爱你 ")]), _vm._v(" "), _c('div', { attrs: { "slot": "title" }, slot: "title" }, [_c('div', [_c('md-icon', { attrs: { "name": "cross", "size": "sm" } }), _vm._v(" 你 ")], 1)]), _vm._v(" "), _c('div', [_vm._v(" 爱他 ")]), _vm._v(" "), _c('div', { attrs: { "slot": "title" }, slot: "title" }, [_c('div', [_c('md-icon', { attrs: { "name": "right", "size": "sm" } }), _vm._v(" 他 ")], 1)]), _vm._v(" "), _c('div', [_vm._v(" 爱她 ")])])], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '自定义内容',
  titleEnUS: 'Custom content',
  /* DELETE */
  components: (_components$29 = {}, _defineProperty$80(_components$29, Icon.name, Icon), _defineProperty$80(_components$29, Tabs.name, Tabs), _components$29)
};

function _defineProperty$81(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo6$2 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-6" }, [_c('md-tabs', { attrs: { "titles": _vm.titles, "show-ink-bar": "" }, on: { "indexChanged": _vm.alert } }, _vm._l(_vm.titles, function (title, index) {
      return _c('div', { key: index }, [_vm._v(" " + _vm._s(title) + "的内容 ")]);
    }))], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '监听点击事件',
  titleEnUS: 'Listen click event',
  /* DELETE */
  components: _defineProperty$81({}, Tabs.name, Tabs),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  },

  methods: {
    alert: function alert(index, preIndex) {
      Toast.succeed('index\u7531' + preIndex + '\u5207\u6362\u4E3A' + index);
    }
  }
};

function _defineProperty$82(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo7$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-7" }, [_c('md-tabs', { ref: "tabs", attrs: { "titles": _vm.titles, "show-ink-bar": "" } }, _vm._l(_vm.titles, function (title, index) {
      return _c('div', { key: index }, [_vm._v(" " + _vm._s(title) + "的内容 ")]);
    }))], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '通过公共方法切换 <a href="javascript:window.triggerTabs()">selectTab(2)</a>',
  titleEnUS: 'Switch by public method <a href="javascript:window.triggerTabBar()">selectTab(2)</a>',
  /* DELETE */
  components: _defineProperty$82({}, Tabs.name, Tabs),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.triggerTabs = function () {
      _this.$refs.tabs.selectTab(2);
    };
  }
};

function _defineProperty$83(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo8$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-8" }, [_c('md-tabs', { attrs: { "titles": _vm.titles, "noslide": "" } }, _vm._l(_vm.titles, function (title, index) {
      return _c('div', { key: index }, [_vm._v(" " + _vm._s(title) + "的内容 ")]);
    }))], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '无动画',
  titleEnUS: 'No animation',
  /* DELETE */
  components: _defineProperty$83({}, Tabs.name, Tabs),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

function _defineProperty$84(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo9$1 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-9" }, [_c('md-tabs', { attrs: { "titles": _vm.titles, "upside-down": "" } }, _vm._l(_vm.titles, function (title, index) {
      return _c('div', { key: index }, [_vm._v(" " + _vm._s(title) + "的内容 ")]);
    }))], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '标题栏处于下方',
  titleEnUS: 'Title bar is below',
  /* DELETE */
  components: _defineProperty$84({}, Tabs.name, Tabs),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

var _components$30;

function _defineProperty$85(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo10 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-10" }, [_c('md-tabs', { attrs: { "titles": _vm.titles, "upside-down": "" }, scopedSlots: _vm._u([{ key: "title", fn: function fn(props) {
          return _c('div', {}, [_c('md-icon', { attrs: { "name": "hollow-plus", "size": "sm" } }), _vm._v(" " + _vm._s(props.prefix) + _vm._s(props.title) + " ")], 1);
        } }]) }, _vm._l(_vm.titles, function (title, index) {
      return _c('div', { key: index }, [_vm._v(" " + _vm._s(title.title) + "的内容 ")]);
    }))], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: 'scope-slot',
  /* DELETE */
  components: (_components$30 = {}, _defineProperty$85(_components$30, Tabs.name, Tabs), _defineProperty$85(_components$30, Icon.name, Icon), _components$30),
  data: function data() {
    return {
      titles: [{
        title: '第1',
        prefix: '我'
      }, {
        title: '第2',
        prefix: '你'
      }, {
        title: '第3',
        prefix: '他'
      }]
    };
  }
};

function _defineProperty$86(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo11 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tabs md-example-child-tabs-11" }, [_c('md-tabs', { attrs: { "titles": _vm.titles } }, _vm._l(_vm.titles, function (title, index) {
      return _c('div', { key: index }, [_vm._v(" " + _vm._s(title) + "的内容 ")]);
    }))], 1);
  }, staticRenderFns: [],
  name: 'tab-bar-demo',
  /* DELETE */
  title: '设置标题栏边距',
  titleEnUS: 'Setting margins',
  /* DELETE */
  components: _defineProperty$86({}, Tabs.name, Tabs),
  data: function data() {
    return {
      titles: ['第一', '第二', '第三', '第四']
    };
  }
};

var _extends$12 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$13 = _extends$12({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example tabs" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: []
}, createDemoModule('tabs', [Demo0$11, Demo1$11, Demo2$9, Demo3$6, Demo4$3, Demo5$2, Demo6$2, Demo7$1, Demo8$1, Demo9$1, Demo10, Demo11]));

var Demo0$12 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tag md-example-child-tag-0" }, [_c('tag', { attrs: { "size": "tiny", "shape": "circle", "type": "fill", "fill-color": "#FC7353", "font-color": "#000" } }), _vm._v(" "), _c('tag', { attrs: { "size": "small", "shape": "circle", "type": "fill", "fill-color": "#FC7353", "font-color": "#fff" } }, [_vm._v("特惠")]), _vm._v(" "), _c('tag', { attrs: { "size": "large", "shape": "circle", "type": "fill", "fill-color": "#FC7353", "font-color": "#fff" } }, [_vm._v("返5000")]), _vm._v(" "), _c('tag', { attrs: { "size": "small", "shape": "circle", "type": "ghost", "font-color": "#FC7353" } }, [_vm._v("特惠")])], 1);
  }, staticRenderFns: [],
  name: 'tag-demo',
  /* DELETE */
  title: '半圆',
  titleEnUS: 'Semicircle',
  codeSandBox: 'https://codesandbox.io/s/721xmvrx11',
  /* DELETE */
  components: {
    Tag: Tag
  }
};

var Demo1$12 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tag md-example-child-tag-1" }, [_c('tag', { attrs: { "size": "large", "shape": "fillet", "type": "fill", "fill-color": "#FC9153", "font-weight": "normal", "font-color": "#fff" } }, [_vm._v("字")]), _vm._v(" "), _c('tag', { attrs: { "size": "large", "shape": "fillet", "type": "fill", "fill-color": "#50A050", "font-weight": "bold", "font-color": "#fff" } }, [_vm._v("字")]), _vm._v(" "), _c('tag', { attrs: { "size": "large", "shape": "fillet", "type": "fill", "fill-color": "#91C6EF", "font-weight": "bolder", "font-color": "#fff" } }, [_vm._v("字")])], 1);
  }, staticRenderFns: [],
  name: 'tag-demo',
  /* DELETE */
  title: '圆角',
  titleEnUS: 'Fillet',
  codeSandBox: 'https://codesandbox.io/s/m5vn1rpmny',
  /* DELETE */
  components: {
    Tag: Tag
  }
};

var Demo2$10 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tag md-example-child-tag-2" }, [_c('tag', { attrs: { "size": "large", "shape": "square", "font-color": "#3CA0E6", "type": "ghost" } }, [_vm._v("运营车")]), _vm._v(" "), _c('tag', { attrs: { "size": "small", "shape": "square", "font-color": "#3CA0E6", "type": "ghost" } }, [_vm._v("运营车")])], 1);
  }, staticRenderFns: [],
  name: 'tag-demo',
  /* DELETE */
  title: '线框',
  titleEnUS: 'Square',
  codeSandBox: 'https://codesandbox.io/s/r73ovo5zmp',
  /* DELETE */
  components: {
    Tag: Tag
  }
};

var Demo3$7 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-tag md-example-child-tag-3" }, [_c('tag', { attrs: { "size": "large", "shape": "square", "fill-color": "rgba(0,0,0,0)", "type": "fill", "font-weight": "bolder" } }, [_vm._v("￥3600")]), _vm._v(" "), _c('tag', { attrs: { "size": "small", "shape": "square", "fill-color": "rgba(0,0,0,0)", "type": "fill", "font-weight": "bolder" } }, [_vm._v("￥300")])], 1);
  }, staticRenderFns: [],
  name: 'tag-demo',
  /* DELETE */
  title: '阳文',
  titleEnUS: 'Characters cut in relief',
  codeSandBox: 'https://codesandbox.io/s/n3o1w6vx2m',
  /* DELETE */
  components: {
    Tag: Tag
  }
};

var _extends$13 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$14 = _extends$13({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example tag" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('tag', [Demo0$12, Demo1$12, Demo2$10, Demo3$7]));

var _components$31;

function _defineProperty$87(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$13 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-input-item-0" }, [_c('md-field', [_c('md-input-item', { ref: "input0", attrs: { "title": "普通文本", "placeholder": "普通文本", "maxlength": 5 } }), _vm._v(" "), _c('md-input-item', { ref: "input1", attrs: { "title": "禁用表单", "value": "禁用表单", "disabled": "disabled" } }), _vm._v(" "), _c('md-input-item', { ref: "input12", attrs: { "title": "只读表单", "value": "只读表单", "readonly": "readonly" } }), _vm._v(" "), _c('md-input-item', { ref: "input13", attrs: { "title": "高亮表单", "placeholder": "高亮表单", "is-highlight": "" } }), _vm._v(" "), _c('md-input-item', { ref: "input2", attrs: { "title": "大尺寸表单", "placeholder": "大尺寸表单", "size": "large" } }), _vm._v(" "), _c('md-input-item', { ref: "input3", attrs: { "title": "文本居中", "placeholder": "文本居中", "align": "center" } }), _vm._v(" "), _c('md-input-item', { ref: "input4", attrs: { "title": "文本居右", "placeholder": "文本居右", "align": "right" } })], 1)], 1);
  }, staticRenderFns: [],
  name: 'input-item-demo',
  /* DELETE */
  title: '普通输入框',
  titleEnUS: 'Normal input',
  /* DELETE */
  components: (_components$31 = {}, _defineProperty$87(_components$31, InputItem.name, InputItem), _defineProperty$87(_components$31, Field.name, Field), _components$31)
};

var _components$32;

function _defineProperty$88(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$13 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-input-item-1" }, [_c('md-field', [_c('md-input-item', { ref: "name", attrs: { "title": "真实姓名", "placeholder": "投保人姓名", "is-title-latent": "", "clearable": "" } }), _vm._v(" "), _c('md-input-item', { ref: "id", attrs: { "title": "身份证号", "placeholder": "投保人身份证号", "is-title-latent": "", "clearable": "" } })], 1)], 1);
  }, staticRenderFns: [],
  name: 'input-item-demo',
  /* DELETE */
  title: '标题浮动输入框',
  titleEnUS: 'Floating title input',
  /* DELETE */
  components: (_components$32 = {}, _defineProperty$88(_components$32, InputItem.name, InputItem), _defineProperty$88(_components$32, Field.name, Field), _components$32)
};

var _components$33;

function _defineProperty$89(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$11 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-input-item-2" }, [_c('md-field', [_c('md-input-item', { attrs: { "title": "银行卡", "type": "bankCard", "placeholder": "bankCard xxxx xxxx xxxx xxxx" } }), _vm._v(" "), _c('md-input-item', { attrs: { "title": "手机号", "type": "phone", "placeholder": "phone xxx xxxx xxxx" }, model: { value: _vm.phone, callback: function callback($$v) {
          _vm.phone = $$v;
        }, expression: "phone" } }), _vm._v(" "), _c('md-input-item', { attrs: { "title": "金额", "type": "money", "placeholder": "money xx, xxx.xxxx" }, on: { "keydown": _vm.onInputKeydown, "change": _vm.onInputChange }, model: { value: _vm.money, callback: function callback($$v) {
          _vm.money = $$v;
        }, expression: "money" } }), _vm._v(" "), _c('md-input-item', { attrs: { "title": "数字", "type": "digit", "placeholder": "digit 0123456789" }, model: { value: _vm.digit, callback: function callback($$v) {
          _vm.digit = $$v;
        }, expression: "digit" } }), _vm._v(" "), _c('md-input-item', { attrs: { "title": "密码", "type": "password", "placeholder": "password *********" } }), _vm._v(" "), _c('md-input-item', { attrs: { "title": "邮箱", "type": "email", "placeholder": "其他标准 html input 类型" } })], 1)], 1);
  }, staticRenderFns: [],
  name: 'input-item-demo',
  /* DELETE */
  title: '业务场景输入框',
  titleEnUS: 'Business scenario input',
  /* DELETE */
  components: (_components$33 = {}, _defineProperty$89(_components$33, InputItem.name, InputItem), _defineProperty$89(_components$33, Field.name, Field), _components$33),
  data: function data() {
    return {
      phone: '13321234431',
      money: '',
      digit: ''
    };
  },

  methods: {
    onInputKeydown: function onInputKeydown(event) {
      console.log('[Mand Mobile InputItem keydown] ' + event.keyCode);
    },
    onInputChange: function onInputChange(name, value) {
      console.log('[Mand Mobile InputItem change] ' + value);
    }
  }
};

var element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
element.appendChild(defs);
element.setAttributeNS(null, "style", "position:absolute;width:0;height:0");
var domParser = new DOMParser();
var xmlDocument = domParser.parseFromString('<symbol class="icon" viewBox="0 0 1025 1024" xmlns="http://www.w3.org/2000/svg" width="200.195" height="200"><defs><style/></defs><path d="M469.079 719.457l138.475-350.02 144.607 350.02H469.079zm-290.236 0l138.475-350.02 144.607 350.02H178.843zm828.296-79.712l-5.621 19.928H908.52l-9.709-19.928h108.328m6.131-28.104h-125.7l-9.198-20.95h138.986m2.555-28.615H866.11l-9.198-21.461h165.557m0-27.593h-177.31l-8.175-20.95h185.996m-3.066-28.615H823.698l-8.176-20.95h202.347m-4.599-28.104H804.28l-9.708-20.95h214.1" fill="#E41E26"/><path d="M511.49 2.044h20.95l22.483 2.044 20.95 1.022 19.928 3.577 20.95 3.576 19.929 4.6 19.928 6.131 19.928 5.62 9.198 3.578 9.708 3.576 18.906 8.176 18.396 8.176 17.373 9.197 17.373 9.198 17.884 10.73 16.352 11.753 16.35 11.752 15.33 11.753 15.33 12.774 15.329 14.308 14.307 14.307L892.68 172.2l12.774 15.329 6.132 8.176 5.62 8.175 12.775 16.352 10.73 16.35 10.731 16.352 10.22 17.373 8.175 18.396 9.709 17.884 7.154 18.395 7.153 19.928 7.154 18.906H782.308L646.9 48.032 505.87 404.184 357.686 51.609l-260.6 672.958L215.635 872.75h603.465L929.47 711.792l-10.73-24.527h71.536l-7.153 18.907-8.176 17.373-8.176 17.373-8.175 16.351-10.73 17.374-9.198 16.351-11.753 15.33-10.73 15.329-11.753 15.329-12.774 15.33-12.775 13.285-14.307 14.307-14.308 12.775-14.307 13.285-15.33 11.753-15.329 11.752-15.329 10.73-16.351 10.731-16.352 9.198-17.373 9.708-17.373 8.176-17.373 7.154-18.906 7.153-17.374 7.154-18.906 5.62-19.928 4.6-18.906 4.598-19.928 3.577-9.198 1.022-10.73 1.022-19.929 2.044-19.928 1.022h-47.01l-26.06-2.555-26.06-3.066-26.06-4.599-24.526-6.131-23.505-5.621-23.505-8.176-23.505-9.197-21.972-10.73-22.483-10.731L256 955.018l-10.73-5.62-20.95-13.286-19.929-14.308-19.928-15.329-9.198-8.176-8.175-8.175-9.198-8.176-8.175-8.176-17.374-17.373-16.351-18.395-6.643-9.709-7.153-10.73-15.33-19.928-6.131-9.709-7.154-10.73-5.62-10.73-6.133-11.753-11.752-20.95-10.73-23.506-8.176-22.483-8.176-24.526-7.154-23.505-3.577-13.286-2.043-11.752-2.044-13.286-2.555-12.774-3.577-24.527-1.022-27.082-1.022-12.775v-13.285l1.022-25.549 1.022-26.06 3.577-25.549 4.599-26.06 5.62-24.526 7.154-23.505 8.176-23.505 8.175-23.505 10.73-22.483 11.753-22.484 6.132-10.73 5.62-10.73 13.286-20.95 15.33-19.929 14.307-19.928 8.176-9.198 8.175-8.175 8.176-9.198 9.198-8.175 17.373-17.374 17.373-16.351 10.73-7.154 9.198-7.153 19.928-15.33 10.73-6.131 10.731-7.154 10.731-6.132 10.73-5.62 22.484-11.753 21.972-10.73 23.505-9.71 23.505-7.153 23.505-7.154 12.774-3.577 11.753-2.043 12.774-2.044L433.31 5.62l26.06-3.577 26.06-1.022L498.205 0h13.285z" fill="#E41E26"/></symbol>', "application/xml");
var svgCore = xmlDocument.children[0];
svgCore.setAttributeNS(null, "id", "bank-zs");
defs.appendChild(svgCore);
var body = document.querySelector("body");
body.appendChild(element);

var _components$34;

function _defineProperty$90(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$8 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-input-item-3" }, [_c('md-field', [_c('md-input-item', { ref: "input9", attrs: { "title": "带清空按钮", "placeholder": "normal text", "value": "with clear button", "clearable": "" } }), _vm._v(" "), _c('md-input-item', { ref: "input10", attrs: { "title": "带金融键盘", "placeholder": "financial number keyboard", "is-virtual-keyboard": "", "clearable": "" }, on: { "focus": _vm.onFakeInputFocus, "blur": _vm.onFakeInputBlur } }), _vm._v(" "), _c('md-input-item', { ref: "input11", attrs: { "placeholder": "left/right slots" } }, [_c('md-icon', { attrs: { "slot": "left", "name": "bank-zs" }, slot: "left" }), _vm._v(" "), _c('md-icon', { attrs: { "slot": "right", "name": "circle-alert" }, nativeOn: { "click": function click($event) {
          return _vm.onClick($event);
        } }, slot: "right" })], 1)], 1)], 1);
  }, staticRenderFns: [],
  name: 'input-item-demo',
  /* DELETE */
  title: '表单控件',
  titleEnUS: 'input with controls',
  /* DELETE */
  components: (_components$34 = {}, _defineProperty$90(_components$34, InputItem.name, InputItem), _defineProperty$90(_components$34, Field.name, Field), _defineProperty$90(_components$34, Icon.name, Icon), _components$34),
  methods: {
    onClick: function onClick() {
      Toast({
        content: 'some information',
        icon: 'circle-alert'
      });
    },
    onFakeInputFocus: function onFakeInputFocus() {
      var _this = this;

      function getElementPosition(element) {
        var defaultRect = { top: 0, left: 0 };
        var rect = element ? element.getBoundingClientRect && element.getBoundingClientRect() || defaultRect : defaultRect;
        var ret = {
          top: rect.top,
          left: rect.left
        };
        return ret;
      }

      setTimeout(function () {
        var wrapper = _this.$el;
        var inputer = _this.$refs['input10'];
        var inputEl = inputer.$el;
        var keyboardEl = document.querySelector('#' + inputer.name + '-number-keyboard').querySelector('.md-number-keyboard-container');
        var offset = keyboardEl.clientHeight + inputEl.clientHeight - document.documentElement.clientHeight + getElementPosition(inputEl).top + 30;

        var oldPaddingBottom = +wrapper.style.paddingBottom.replace(/px|rem|em/gi, '');
        var oldScrollTop = document.body.scrollTop;
        var newPaddingBottom = oldPaddingBottom + offset;
        var newScrollTop = oldScrollTop + offset;

        wrapper.style.paddingBottom = newPaddingBottom + 'px';
        document.body.scrollTop = newScrollTop;

        _this.scrollInputBack = function () {
          wrapper.style.paddingBottom = oldPaddingBottom + 'px';
          document.body.scrollTop = oldScrollTop;
          _this.scrollInputBack = null;
        };
      }, 300);
    },
    onFakeInputBlur: function onFakeInputBlur() {
      this.scrollInputBack && this.scrollInputBack();
    }
  }
};

var _components$35;

function _defineProperty$91(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo4$4 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-input-item-4" }, [_c('md-field', [_c('md-input-item', { ref: "input11", attrs: { "title": "手机号码", "value": "1999999999999", "error": "手机号码位数有误", "clearable": "" } }), _vm._v(" "), _c('md-input-item', { ref: "input11", attrs: { "title": "手机号码", "value": "1999999999999", "error": "手机号码位数有误", "clearable": "", "is-title-latent": "" } })], 1)], 1);
  }, staticRenderFns: [],
  name: 'input-item-demo',
  /* DELETE */
  title: '错误提示',
  titleEnUS: 'input with error message',
  /* DELETE */
  components: (_components$35 = {}, _defineProperty$91(_components$35, InputItem.name, InputItem), _defineProperty$91(_components$35, Field.name, Field), _components$35)
};

var _extends$14 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$15 = _extends$14({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example input-item" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('input-item', [Demo0$13, Demo1$13, Demo2$11, Demo3$8, Demo4$4]));

var _components$36;

function _defineProperty$92(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$14 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-number-keyboard md-example-child-number-keyboard-0" }, [_c('md-button', { on: { "click": function click($event) {
          _vm.isKeyBoardShow = !_vm.isKeyBoardShow;
        } } }, [_vm._v(_vm._s(_vm.isKeyBoardShow ? '收起键盘' : '唤起键盘'))]), _vm._v(" "), _c('md-number-keyboard', { on: { "enter": _vm.onNumberEnter, "delete": _vm.onNumberDelete }, model: { value: _vm.isKeyBoardShow, callback: function callback($$v) {
          _vm.isKeyBoardShow = $$v;
        }, expression: "isKeyBoardShow" } }), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isKeyBoardShow, expression: "isKeyBoardShow" }], staticClass: "md-example-display", domProps: { "textContent": _vm._s(_vm.number) } })], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-fe28a5d8',
  name: 'number-keyboard-demo',
  /* DELETE */
  describe: '有确认键和小数点，一般用于价格或金额输入',
  describeEnUS: 'With confirmation key and decimal point, generally used for price or amount input',
  /* DELETE */
  components: (_components$36 = {}, _defineProperty$92(_components$36, Button.name, Button), _defineProperty$92(_components$36, NumberKeyboard.name, NumberKeyboard), _components$36),
  data: function data() {
    return {
      isKeyBoardShow: false,
      number: ''
    };
  },

  methods: {
    onNumberEnter: function onNumberEnter(val) {
      this.number += val;
    },
    onNumberDelete: function onNumberDelete() {
      if (this.number === '') {
        return;
      }
      this.number = this.number.substr(0, this.number.length - 1);
    }
  }
};

var _components$37;

function _defineProperty$93(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$14 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-number-keyboard md-example-child-number-keyboard-1" }, [_c('md-button', { on: { "click": function click($event) {
          _vm.isKeyBoardShow = !_vm.isKeyBoardShow;
        } } }, [_vm._v(_vm._s(_vm.isKeyBoardShow ? '收起键盘' : '唤起键盘'))]), _vm._v(" "), _c('md-number-keyboard', { attrs: { "ok-text": "支付", "type": "simple" }, on: { "enter": _vm.onNumberEnter, "delete": _vm.onNumberDelete }, model: { value: _vm.isKeyBoardShow, callback: function callback($$v) {
          _vm.isKeyBoardShow = $$v;
        }, expression: "isKeyBoardShow" } }), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isKeyBoardShow, expression: "isKeyBoardShow" }], staticClass: "md-example-display", domProps: { "textContent": _vm._s(_vm.number) } })], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-fe0c76d6',
  name: 'number-keyboard-demo',
  /* DELETE */
  title: '简单类型',
  titleEnUS: 'Simple type',
  describe: '无确认键和小数点，一般用于密码或验证码输入',
  describeEnUS: 'No confirmation key and decimal point, generally used for password or verification code input',
  /* DELETE */
  components: (_components$37 = {}, _defineProperty$93(_components$37, Button.name, Button), _defineProperty$93(_components$37, NumberKeyboard.name, NumberKeyboard), _components$37),
  data: function data() {
    return {
      isKeyBoardShow: false,
      number: ''
    };
  },

  methods: {
    onNumberEnter: function onNumberEnter(val) {
      this.number += val;
    },
    onNumberDelete: function onNumberDelete() {
      if (this.number === '') {
        return;
      }
      this.number = this.number.substr(0, this.number.length - 1);
    }
  }
};

var _components$38;

function _defineProperty$94(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$12 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-number-keyboard md-example-child-number-keyboard-1" }, [_c('md-button', { on: { "click": function click($event) {
          _vm.isKeyBoardShow = !_vm.isKeyBoardShow;
        } } }, [_vm._v(_vm._s(_vm.isKeyBoardShow ? '收起键盘' : '唤起键盘'))]), _vm._v(" "), _c('md-number-keyboard', { attrs: { "ok-text": "支付", "disorder": "" }, on: { "enter": _vm.onNumberEnter, "delete": _vm.onNumberDelete }, model: { value: _vm.isKeyBoardShow, callback: function callback($$v) {
          _vm.isKeyBoardShow = $$v;
        }, expression: "isKeyBoardShow" } }), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isKeyBoardShow, expression: "isKeyBoardShow" }], staticClass: "md-example-display", domProps: { "textContent": _vm._s(_vm.number) } })], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-fdf047d4',
  name: 'number-keyboard-demo',
  /* DELETE */
  title: '数字键乱序',
  titleEnUS: 'Number keys out of order',
  /* DELETE */
  components: (_components$38 = {}, _defineProperty$94(_components$38, Button.name, Button), _defineProperty$94(_components$38, NumberKeyboard.name, NumberKeyboard), _components$38),
  data: function data() {
    return {
      isKeyBoardShow: false,
      number: ''
    };
  },

  methods: {
    onNumberEnter: function onNumberEnter(val) {
      this.number += val;
    },
    onNumberDelete: function onNumberDelete() {
      if (this.number === '') {
        return;
      }
      this.number = this.number.substr(0, this.number.length - 1);
    }
  }
};

var _extends$15 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$16 = _extends$15({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example number-keyboard" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('number-keyboard', [Demo0$14, Demo1$14, Demo2$12]));

var _components$39;

function _defineProperty$95(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$15 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-stepper md-example-child-stepper-0" }, [_c('md-field', [_c('md-field-item', { attrs: { "name": "arrow1", "title": "禁用", "customized": "", "align": "right" } }, [_c('div', { staticClass: "normal-tip" }, [_c('md-stepper', { attrs: { "disabled": "disabled" } })], 1)])], 1)], 1);
  }, staticRenderFns: [],
  name: 'stepper-demo',
  /* DELETE */
  title: '禁用',
  titleEnUS: 'Disabled',
  codeSandBox: 'https://codesandbox.io/s/j473o4l30w',
  /* DELETE */
  components: (_components$39 = {}, _defineProperty$95(_components$39, Field.name, Field), _defineProperty$95(_components$39, FieldItem.name, FieldItem), _defineProperty$95(_components$39, Stepper.name, Stepper), _components$39)
};

var _components$40;

function _defineProperty$96(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$15 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-stepper md-example-child-stepper-1" }, [_c('md-field', [_c('md-field-item', { attrs: { "name": "arrow2", "title": "只读", "customized": "", "align": "right" } }, [_c('div', { staticClass: "normal-tip" }, [_c('md-stepper', { attrs: { "read-only": "" } })], 1)])], 1)], 1);
  }, staticRenderFns: [],
  name: 'stepper-demo',
  /* DELETE */
  title: '只读',
  titleEnUS: 'Readonly',
  codeSandBox: 'https://codesandbox.io/s/m3l7nnk6y9',
  /* DELETE */
  components: (_components$40 = {}, _defineProperty$96(_components$40, Field.name, Field), _defineProperty$96(_components$40, FieldItem.name, FieldItem), _defineProperty$96(_components$40, Stepper.name, Stepper), _components$40)
};

var _components$41;

function _defineProperty$97(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$13 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-stepper md-example-child-stepper-2" }, [_c('md-field', [_c('md-field-item', { attrs: { "name": "arrow3", "title": "最小值-12，最大值18", "customized": "", "align": "right" } }, [_c('div', { staticClass: "normal-tip" }, [_c('md-stepper', { attrs: { "min": -12, "max": 18 } })], 1)])], 1)], 1);
  }, staticRenderFns: [],
  name: 'stepper-demo',
  /* DELETE */
  title: '最小值-12，最大值18',
  titleEnUS: 'Minimum is -12 and maximum is 18',
  codeSandBox: 'https://codesandbox.io/s/3q8nvzq90q',
  /* DELETE */
  components: (_components$41 = {}, _defineProperty$97(_components$41, Field.name, Field), _defineProperty$97(_components$41, FieldItem.name, FieldItem), _defineProperty$97(_components$41, Stepper.name, Stepper), _components$41)
};

var _components$42;

function _defineProperty$98(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$9 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-stepper md-example-child-stepper-3" }, [_c('md-field', [_c('md-field-item', { attrs: { "name": "arrow4", "title": "步进2", "customized": "", "align": "right" } }, [_c('div', { staticClass: "normal-tip" }, [_c('md-stepper', { attrs: { "step": 2, "min": 2 } })], 1)])], 1)], 1);
  }, staticRenderFns: [],
  name: 'stepper-demo',
  /* DELETE */
  title: '步进2',
  titleEnUS: 'Step 2',
  codeSandBox: 'https://codesandbox.io/s/vy5xymyvv0',
  /* DELETE */
  components: (_components$42 = {}, _defineProperty$98(_components$42, Field.name, Field), _defineProperty$98(_components$42, FieldItem.name, FieldItem), _defineProperty$98(_components$42, Stepper.name, Stepper), _components$42)
};

var _components$43;

function _defineProperty$99(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo4$5 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-stepper md-example-child-stepper-4" }, [_c('md-field', [_c('md-field-item', { attrs: { "name": "arrow4", "title": "最小值4大于默认值", "customized": "", "align": "right" } }, [_c('div', { staticClass: "normal-tip" }, [_c('md-stepper', { attrs: { "min": 4 } })], 1)])], 1)], 1);
  }, staticRenderFns: [],
  name: 'stepper-demo',
  /* DELETE */
  title: '最小值4大于默认值',
  titleEnUS: 'Minimum is 4 which is greater than default',
  codeSandBox: 'https://codesandbox.io/s/jp85vkvly',
  /* DELETE */
  components: (_components$43 = {}, _defineProperty$99(_components$43, Field.name, Field), _defineProperty$99(_components$43, FieldItem.name, FieldItem), _defineProperty$99(_components$43, Stepper.name, Stepper), _components$43)
};

var _components$44;

function _defineProperty$100(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo5$3 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-stepper md-example-child-stepper-5" }, [_c('md-field', [_c('md-field-item', { attrs: { "name": "arrow5", "title": "step为小数1.3", "customized": "", "align": "right" } }, [_c('div', { staticClass: "normal-tip" }, [_c('md-stepper', { attrs: { "step": 1.3 } })], 1)])], 1)], 1);
  }, staticRenderFns: [],
  name: 'stepper-demo',
  /* DELETE */
  title: 'step为小数1.3',
  titleEnUS: 'Step is a decimal, 1.3',
  codeSandBox: 'https://codesandbox.io/s/6vkpwr842w',
  /* DELETE */
  components: (_components$44 = {}, _defineProperty$100(_components$44, Field.name, Field), _defineProperty$100(_components$44, FieldItem.name, FieldItem), _defineProperty$100(_components$44, Stepper.name, Stepper), _components$44)
};

var _extends$16 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$17 = _extends$16({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example stepper" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [], _scopeId: 'data-v-55e8361f' }, createDemoModule('stepper', [Demo0$15, Demo1$15, Demo2$13, Demo3$9, Demo4$5, Demo5$3]));

function _defineProperty$101(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$16 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-steps md-example-child-steps-0" }, [_c('md-steps', { attrs: { "steps": _vm.steps } })], 1);
  }, staticRenderFns: [],
  name: 'steps-demo',
  /* DELETE */
  title: '三个步骤',
  titleEnUS: 'Three steps',
  codeSandBox: 'https://codesandbox.io/s/38zp7vq22m',
  height: 150,
  /* DELETE */
  components: _defineProperty$101({}, Steps.name, Steps),
  data: function data() {
    return {
      steps: [{
        name: '开通理财账户'
      }, {
        name: '验证手机号'
      }, {
        name: '开通成功'
      }]
    };
  }
};

function _defineProperty$102(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$16 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-steps md-example-child-steps-1" }, [_c('md-steps', { attrs: { "steps": _vm.steps } })], 1);
  }, staticRenderFns: [],
  name: 'steps-demo',
  /* DELETE */
  title: '四个步骤',
  titleEnUS: 'Four steps',
  codeSandBox: 'https://codesandbox.io/s/3vok030m5q',
  height: 150,
  /* DELETE */
  components: _defineProperty$102({}, Steps.name, Steps),
  data: function data() {
    return {
      steps: [{
        name: '登录'
      }, {
        name: '开通'
      }, {
        name: '验证'
      }, {
        name: '成功'
      }]
    };
  }
};

var _components$45;

function _defineProperty$103(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$14 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-steps md-example-child-steps-2" }, [_c('md-steps', { attrs: { "steps": _vm.steps, "current": 2 }, scopedSlots: _vm._u([{ key: "reached", fn: function fn(props) {
          return _c('div', {}, [_c('md-icon', { attrs: { "name": "circle-alert", "size": "lg" } })], 1);
        } }]) }, [_c('div', { attrs: { "slot": "current" }, slot: "current" }, [_c('md-icon', { attrs: { "name": "hollow-plus", "size": "lg" } })], 1)])], 1);
  }, staticRenderFns: [],
  name: 'steps-demo',
  /* DELETE */
  title: '自定义步骤图标',
  titleEnUS: 'Custom step icon',
  codeSandBox: 'https://codesandbox.io/s/9jz3y30wow',
  height: 150,
  /* DELETE */
  components: (_components$45 = {}, _defineProperty$103(_components$45, Steps.name, Steps), _defineProperty$103(_components$45, Icon.name, Icon), _components$45),
  data: function data() {
    return {
      steps: [{
        name: '开通理财账户'
      }, {
        name: '验证手机号'
      }, {
        name: '开通成功'
      }]
    };
  }
};

function _defineProperty$104(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$10 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-steps md-example-child-steps-3" }, [_c('md-steps', { attrs: { "steps": _vm.steps, "current": 2 } })], 1);
  }, staticRenderFns: [],
  name: 'steps-demo',
  /* DELETE */
  title: '指定当前步骤',
  titleEnUS: 'Specify the current step',
  codeSandBox: 'https://codesandbox.io/s/zwvk8l3053',
  height: 150,
  /* DELETE */
  components: _defineProperty$104({}, Steps.name, Steps),
  data: function data() {
    return {
      steps: [{
        name: '登录'
      }, {
        name: '开通'
      }, {
        name: '验证'
      }, {
        name: '成功'
      }]
    };
  }
};

function _defineProperty$105(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo4$6 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-steps md-example-child-steps-4" }, [_c('md-steps', { attrs: { "steps": _vm.steps, "current": _vm.currentStep } })], 1);
  }, staticRenderFns: [],
  name: 'steps-demo',
  /* DELETE */
  title: '动态修改当前所处步骤 <a href="javascript:window.triggerSteps0()">current = 2</a>',
  titleEnUS: 'Dynamically modify the current step <a href="javascript:window.triggerSteps0()">current = 2</a>',
  codeSandBox: 'https://codesandbox.io/s/wmz776wq5',
  height: 150,
  /* DELETE */
  components: _defineProperty$105({}, Steps.name, Steps),
  mounted: function mounted() {
    var _this = this;

    window.triggerSteps0 = function () {
      _this.currentStep = 2;
    };
  },
  data: function data() {
    return {
      steps: [{
        name: '登录'
      }, {
        name: '开通'
      }, {
        name: '验证'
      }, {
        name: '成功'
      }],
      currentStep: 0
    };
  }
};

function _defineProperty$106(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo5$4 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-steps md-example-child-steps-5" }, [_c('md-steps', { attrs: { "steps": _vm.steps, "current": _vm.currentStep } })], 1);
  }, staticRenderFns: [],
  name: 'steps-demo',
  /* DELETE */
  title: '利用current类增加自定义样式',
  titleEnUS: 'Add custom styles through by class named "current"',
  codeSandBox: 'https://codesandbox.io/s/po5847q2j',
  height: 150,
  /* DELETE */
  components: _defineProperty$106({}, Steps.name, Steps),
  data: function data() {
    return {
      steps: [{
        name: '登录'
      }, {
        name: '开通'
      }, {
        name: '验证'
      }, {
        name: '成功'
      }],
      currentStep: 1
    };
  }
};

function _defineProperty$107(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo6$3 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-steps md-example-child-steps-5" }, [_c('md-steps', { attrs: { "steps": _vm.steps, "current": _vm.currentStep } })], 1);
  }, staticRenderFns: [],
  name: 'steps-demo',
  /* DELETE */
  title: '完成全部步骤',
  titleEnUS: 'Complete all steps',
  codeSandBox: 'https://codesandbox.io/s/xl9mykwp3w',
  height: 150,
  /* DELETE */
  components: _defineProperty$107({}, Steps.name, Steps),
  data: function data() {
    return {
      steps: [{
        name: '登录'
      }, {
        name: '开通'
      }, {
        name: '验证'
      }, {
        name: '成功'
      }],
      currentStep: 4
    };
  }
};

var _extends$17 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$18 = _extends$17({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example steps" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [], _scopeId: 'data-v-3837a06e' }, createDemoModule('steps', [Demo0$16, Demo1$16, Demo2$14, Demo3$10, Demo4$6, Demo5$4, Demo6$3]));

function _defineProperty$108(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$17 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-notice-bar md-example-child-notice-bar-0" }, [_c('md-notice-bar', [_vm._v("为了确保您的资金安全，请设置支付密码")])], 1);
  }, staticRenderFns: [],
  name: 'notice-bar-demo',
  /* DELETE */
  codeSandBox: 'https://codesandbox.io/s/xl4wrl0194',
  /* DELETE */
  components: _defineProperty$108({}, NoticeBar.name, NoticeBar)
};

function _defineProperty$109(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$17 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-notice-bar md-example-child-notice-bar-1" }, [_c('md-notice-bar', { attrs: { "closable": false, "icon": "right" } }, [_vm._v(" 为了确保您的资金安全，请设置支付密码 ")])], 1);
  }, staticRenderFns: [],
  name: 'notice-bar-demo',
  /* DELETE */
  title: '设置图标',
  titleEnUS: 'With icon',
  codeSandBox: 'https://codesandbox.io/s/53zlz1nj24',
  /* DELETE */
  components: _defineProperty$109({}, NoticeBar.name, NoticeBar)
};

function _defineProperty$110(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$15 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-notice-bar md-example-child-notice-bar-2" }, [_c('md-notice-bar', { attrs: { "time": 5000 } }, [_vm._v("为了确保您的资金安全，请设置支付密码")])], 1);
  }, staticRenderFns: [],
  name: 'notice-bar-demo',
  /* DELETE */
  title: '设置时间',
  titleEnUS: 'Setting dwell time',
  describe: '5s后隐藏',
  describeEnUS: 'Hidden after 5s',
  codeSandBox: 'https://codesandbox.io/s/w3opvyq97',
  /* DELETE */
  components: _defineProperty$110({}, NoticeBar.name, NoticeBar)
};

var _extends$18 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$19 = _extends$18({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example notice-bar" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('notice-bar', [Demo0$17, Demo1$17, Demo2$15]));

function _defineProperty$111(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$18 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-result-page md-example-child-result-page-0" }, [_c('md-result-page', { attrs: { "type": "lost" } })], 1);
  }, staticRenderFns: [],
  name: 'result-page-demo',
  /* DELETE */
  title: '404',
  /* DELETE */
  components: _defineProperty$111({}, ResultPage.name, ResultPage)
};

function _defineProperty$112(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$18 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-result-page md-example-child-result-page-1" }, [_c('md-result-page', { attrs: { "type": "network", "subtext": "点击屏幕，重新加载" } })], 1);
  }, staticRenderFns: [],
  name: 'result-page-demo',
  /* DELETE */
  title: '网络异常',
  titleEnUS: 'Network anomaly',
  /* DELETE */
  components: _defineProperty$112({}, ResultPage.name, ResultPage)
};

function _defineProperty$113(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$16 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-result-page md-example-child-result-page-2" }, [_c('md-result-page', { attrs: { "buttons": _vm.buttons } })], 1);
  }, staticRenderFns: [],
  name: 'result-page-demo',
  /* DELETE */
  title: '按钮',
  titleEnUS: 'With button',
  /* DELETE */
  components: _defineProperty$113({}, ResultPage.name, ResultPage),
  data: function data() {
    return {
      buttons: [{
        text: '普通按钮',
        handler: function handler() {
          Toast.succeed('普通操作');
        }
      }, {
        text: '高亮按钮',
        type: 'ghost-primary',
        handler: function handler() {
          Toast.succeed('不普通操作');
        }
      }]
    };
  }
};

function _defineProperty$114(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$11 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-result-page md-example-child-result-page-3" }, [_c('md-result-page', { staticClass: "customized", attrs: { "img-url": "//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp", "text": "不太确定自己错在了哪里...", "subtext": "要不然刷新试试？" } })], 1);
  }, staticRenderFns: [],
  name: 'result-page-demo',
  /* DELETE */
  title: '自定义图案',
  titleEnUS: 'Custom pattern',
  /* DELETE */
  components: _defineProperty$114({}, ResultPage.name, ResultPage)
};

var _extends$19 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$20 = _extends$19({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example resulte-page" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [], _scopeId: 'data-v-291a6371' }, createDemoModule('resulte-page', [Demo0$18, Demo1$18, Demo2$16, Demo3$11]));

var _components$46;

function _defineProperty$115(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$19 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-action-sheet" }, [_c('md-button', { on: { "click": _vm.$_showActionSheet } }, [_vm._v("唤起动作面板")]), _vm._v(" "), _c('md-action-sheet', { attrs: { "title": _vm.title, "default-index": _vm.defaultIndex, "invalid-index": _vm.invalidIndex, "cancel-text": _vm.cancelText, "options": _vm.options }, on: { "selected": _vm.$_selected, "cancel": _vm.$_cancel }, model: { value: _vm.value, callback: function callback($$v) {
          _vm.value = $$v;
        }, expression: "value" } })], 1);
  }, staticRenderFns: [],
  name: 'action-sheet-demo',
  height: 500,
  components: (_components$46 = {}, _defineProperty$115(_components$46, ActionSheet.name, ActionSheet), _defineProperty$115(_components$46, Button.name, Button), _components$46),
  data: function data() {
    return {
      value: false,
      title: '操作说明的title',
      options: [{
        label: '选项1',
        value: 0
      }, {
        label: '选项2',
        value: 1
      }, {
        label: '选项3',
        value: 2
      }],
      defaultIndex: 1,
      invalidIndex: 2,
      cancelText: '取消'
    };
  },

  methods: {
    $_showActionSheet: function $_showActionSheet() {
      this.value = true;
    },
    $_selected: function $_selected(item) {
      Dialog.alert({
        content: 'selected: ' + JSON.stringify(item)
      });
      console.log('action-sheet selected:', JSON.stringify(item));
    },
    $_cancel: function $_cancel() {
      Dialog.alert({
        content: 'cancel'
      });
      console.log('action-sheet cancel');
    }
  }
};

var _extends$20 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$21 = _extends$20({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example action-sheet" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: []
}, createDemoModule('action-sheet', [Demo0$19]));

var _components$47;

function _defineProperty$116(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$20 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-selector md-example-child-selector-0" }, [_c('md-field', [_c('md-field-item', { attrs: { "name": "name", "title": "普通模式", "arrow": "arrow-right", "align": "right", "value": _vm.selectorValue }, nativeOn: { "click": function click($event) {
          return _vm.showSelector($event);
        } } })], 1), _vm._v(" "), _c('md-selector', { attrs: { "data": _vm.data[0], "default-index": 1, "invalid-index": 2, "title": "普通模式", "cancelText": "取消" }, on: { "choose": function choose($event) {
          _vm.onSelectorChoose($event);
        } }, model: { value: _vm.isSelectorShow, callback: function callback($$v) {
          _vm.isSelectorShow = $$v;
        }, expression: "isSelectorShow" } })], 1);
  }, staticRenderFns: [],
  name: 'selector-demo',
  /* DELETE */
  title: '无需确认',
  titleEnUS: 'No need to confirm',
  height: 500,
  /* DELETE */
  components: (_components$47 = {}, _defineProperty$116(_components$47, Selector.name, Selector), _defineProperty$116(_components$47, Field.name, Field), _defineProperty$116(_components$47, FieldItem.name, FieldItem), _components$47),
  data: function data() {
    return {
      isSelectorShow: false,
      data: [[{
        text: '选项一'
      }, {
        text: '选项二'
      }, {
        text: '选项三'
      }, {
        text: '选项四'
      }]],
      selectorValue: '选项二'
    };
  },

  methods: {
    showSelector: function showSelector() {
      this.isSelectorShow = true;
    },
    onSelectorChoose: function onSelectorChoose(_ref) {
      var text = _ref.text;

      this.selectorValue = text;
    }
  }
};

var _components$48;

function _defineProperty$117(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$19 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-selector md-example-child-selector-1" }, [_c('md-field', [_c('md-field-item', { attrs: { "name": "name", "title": "自定义选项", "arrow": "arrow-right", "align": "right", "value": _vm.selectorValue }, nativeOn: { "click": function click($event) {
          return _vm.showSelector($event);
        } } })], 1), _vm._v(" "), _c('md-selector', { attrs: { "data": _vm.data[0], "title": "自定义选项", "cancelText": "取消", "optionRender": _vm.optionRender }, on: { "choose": function choose($event) {
          _vm.onSelectorChoose($event);
        } }, model: { value: _vm.isSelectorShow, callback: function callback($$v) {
          _vm.isSelectorShow = $$v;
        }, expression: "isSelectorShow" } })], 1);
  }, staticRenderFns: [],
  name: 'selector-demo',
  /* DELETE */
  title: '自定义选项',
  titleEnUS: 'Custom options',
  height: 500,
  /* DELETE */
  components: (_components$48 = {}, _defineProperty$117(_components$48, Selector.name, Selector), _defineProperty$117(_components$48, Field.name, Field), _defineProperty$117(_components$48, FieldItem.name, FieldItem), _components$48),
  data: function data() {
    return {
      isSelectorShow: false,
      data: [[{
        text: '选项一'
      }, {
        text: '选项二'
      }, {
        text: '选项三'
      }]],
      selectorValue: '选项二'
    };
  },

  methods: {
    showSelector: function showSelector() {
      this.isSelectorShow = true;
    },
    optionRender: function optionRender(_ref) {
      var text = _ref.text;

      return '<div class="md-selector-custom-title">' + text + '</div><div class="md-selector-custom-brief">' + text + '\u4F7F\u7528option-render\u7684\u7684\u81EA\u5B9A\u4E49\u63CF\u8FF0</div>';
    },
    onSelectorChoose: function onSelectorChoose(_ref2) {
      var text = _ref2.text;

      this.selectorValue = text;
    }
  }
};

var _components$49;

function _defineProperty$118(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$17 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-selector md-example-child-selector-2" }, [_c('md-field', [_c('md-field-item', { attrs: { "name": "name", "title": "确认模式", "arrow": "arrow-right", "align": "right", "value": _vm.selectorValue }, nativeOn: { "click": function click($event) {
          return _vm.showSelector($event);
        } } })], 1), _vm._v(" "), _c('md-selector', { attrs: { "data": _vm.data[0], "default-index": 1, "title": "确认模式", "okText": "确认", "cancelText": "取消" }, on: { "confirm": function confirm($event) {
          _vm.onSelectorConfirm($event);
        } }, model: { value: _vm.isSelectorShow, callback: function callback($$v) {
          _vm.isSelectorShow = $$v;
        }, expression: "isSelectorShow" } })], 1);
  }, staticRenderFns: [],
  name: 'selector-demo',
  /* DELETE */
  title: '确认模式',
  titleEnUS: 'Confirmed mode',
  height: 500,
  /* DELETE */
  components: (_components$49 = {}, _defineProperty$118(_components$49, Selector.name, Selector), _defineProperty$118(_components$49, Field.name, Field), _defineProperty$118(_components$49, FieldItem.name, FieldItem), _components$49),
  data: function data() {
    return {
      isSelectorShow: false,
      data: [[{
        text: '选项一'
      }, {
        text: '选项二'
      }, {
        text: '选项三'
      }, {
        text: '选项四'
      }]],
      selectorValue: ''
    };
  },

  methods: {
    showSelector: function showSelector() {
      this.isSelectorShow = true;
    },
    onSelectorConfirm: function onSelectorConfirm(_ref) {
      var text = _ref.text;

      this.selectorValue = text;
    }
  }
};

var _components$50;

function _defineProperty$119(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$12 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-selector md-example-child-selector-3" }, [_c('md-field', [_c('md-field-item', { attrs: { "name": "name", "title": "Check模式", "arrow": "arrow-right", "align": "right", "value": _vm.selectorValue }, nativeOn: { "click": function click($event) {
          return _vm.showSelector($event);
        } } })], 1), _vm._v(" "), _c('md-selector', { attrs: { "data": _vm.data[0], "invalid-index": 2, "title": "Check模式", "okText": "确认", "cancelText": "取消", "is-check": "" }, on: { "confirm": function confirm($event) {
          _vm.onSelectorConfirm($event);
        } }, model: { value: _vm.isSelectorShow, callback: function callback($$v) {
          _vm.isSelectorShow = $$v;
        }, expression: "isSelectorShow" } })], 1);
  }, staticRenderFns: [],
  name: 'selector-demo',
  /* DELETE */
  title: 'Check模式',
  titleEnUS: 'Check mode',
  height: 500,
  /* DELETE */
  components: (_components$50 = {}, _defineProperty$119(_components$50, Selector.name, Selector), _defineProperty$119(_components$50, Field.name, Field), _defineProperty$119(_components$50, FieldItem.name, FieldItem), _components$50),
  data: function data() {
    return {
      isSelectorShow: false,
      data: [[{
        text: '选项一'
      }, {
        text: '选项二'
      }, {
        text: '选项三'
      }, {
        text: '选项四'
      }]],
      selectorValue: ''
    };
  },

  methods: {
    showSelector: function showSelector() {
      this.isSelectorShow = true;
    },
    onSelectorConfirm: function onSelectorConfirm(_ref) {
      var text = _ref.text;

      this.selectorValue = text;
    }
  }
};

var _extends$21 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$22 = _extends$21({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example selecotor" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('selecotor', [Demo0$20, Demo1$19, Demo2$17, Demo3$12]));

var _components$51;

function _defineProperty$120(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$21 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-landscape" }, [_c('md-button', { on: { "click": function click($event) {
          _vm.showPic = true;
        } } }, [_vm._v("图片广告")]), _vm._v(" "), _c('md-landscape', { model: { value: _vm.showPic, callback: function callback($$v) {
          _vm.showPic = $$v;
        }, expression: "showPic" } }, [_c('img', { attrs: { "src": "//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz" } })]), _vm._v(" "), _c('md-button', { nativeOn: { "click": function click($event) {
          _vm.showMaskClosable = true;
        } } }, [_vm._v("点击蒙层关闭")]), _vm._v(" "), _c('md-landscape', { attrs: { "mask-closable": true }, model: { value: _vm.showMaskClosable, callback: function callback($$v) {
          _vm.showMaskClosable = $$v;
        }, expression: "showMaskClosable" } }, [_c('img', { attrs: { "src": "//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz" } })]), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.showNoMask = true;
        } } }, [_vm._v("无蒙层")]), _vm._v(" "), _c('md-landscape', { attrs: { "has-mask": false }, model: { value: _vm.showNoMask, callback: function callback($$v) {
          _vm.showNoMask = $$v;
        }, expression: "showNoMask" } }, [_c('img', { attrs: { "src": "//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz" } })]), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.showScroll = true;
        } } }, [_vm._v("滚动区域")]), _vm._v(" "), _c('md-landscape', { attrs: { "scroll": true }, model: { value: _vm.showScroll, callback: function callback($$v) {
          _vm.showScroll = $$v;
        }, expression: "showScroll" } }, [_c('div', { staticClass: "scroll-area" }, [_c('h1', [_vm._v("滚动区域")]), _vm._v(" "), _vm._l(20, function (i) {
      return _c('p', { key: i }, [_vm._v("第" + _vm._s(i) + "行")]);
    })], 2)]), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.showListen = true;
        } } }, [_vm._v("监听事件")]), _vm._v(" "), _c('md-landscape', { on: { "show": function show($event) {
          _vm.alert('已弹出');
        }, "hide": function hide($event) {
          _vm.alert('已隐藏');
        } }, model: { value: _vm.showListen, callback: function callback($$v) {
          _vm.showListen = $$v;
        }, expression: "showListen" } }, [_c('img', { attrs: { "src": "//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz" } })])], 1);
  }, staticRenderFns: [],
  name: 'landscape-demo',
  /* DELETE */
  title: '示例',
  height: 700,
  /* DELETE */
  components: (_components$51 = {}, _defineProperty$120(_components$51, Landscape.name, Landscape), _defineProperty$120(_components$51, Button.name, Button), _components$51),
  data: function data() {
    return {
      showPic: false,
      showNoMask: false,
      showScroll: false,
      showListen: false,
      showMaskClosable: false
    };
  },

  methods: {
    alert: function alert(msg) {
      Toast.succeed(msg);
    }
  }
};

var _extends$22 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$23 = _extends$22({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example landscape" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('landscape', [Demo0$21]));

function _defineProperty$121(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$22 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-image-reader" }, [_c('div', [_c('ul', [_vm._l(_vm.imgs, function (item, index) {
      return [_c('li', { key: index, on: { "click": function click($event) {
            _vm.showViewer(index, $event);
          } } }, [_c('div', { staticClass: "img", style: 'background: url(' + item + ') center no-repeat;background-size:cover;' })])];
    })], 2)]), _vm._v(" "), _c('md-image-viewer', { attrs: { "list": _vm.imgs, "has-dots": true, "initial-index": _vm.viewerIndex }, model: { value: _vm.isViewerShow, callback: function callback($$v) {
          _vm.isViewerShow = $$v;
        }, expression: "isViewerShow" } })], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-48e2bf75',
  name: 'image-viewer-demo',
  /* DELETE */
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  codeSandBox: 'https://codesandbox.io/s/0v1630294n',
  height: 500,
  /* DELETE */
  components: _defineProperty$121({}, ImageViewer.name, ImageViewer),
  data: function data() {
    return {
      isViewerShow: false,
      viewerIndex: 0,
      imgs: ['http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a', 'http://manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7', 'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/6ee5a0ba9340ca452cbc827902e76be0', 'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/d751dd4487e265de3b8587f504eee2c3']
    };
  },

  methods: {
    showViewer: function showViewer(index) {
      this.viewerIndex = index;
      this.isViewerShow = true;
    }
  }
};

var _extends$23 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$24 = _extends$23({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example image-viewer" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('image-viewer', [Demo0$22]));

var _components$52;

function _defineProperty$122(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$23 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-reader md-example-child-reader-0" }, [_c('ul', { staticClass: "image-reader-list" }, [_vm._l(_vm.imageList['reader0'], function (img, index) {
      return _c('li', { key: index, staticClass: "image-reader-item", style: {
          'backgroundImage': 'url(' + img + ')',
          'backgroundPosition': 'center center',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'cover'
        } }, [_c('md-icon', { staticClass: "image-reader-item-del", attrs: { "name": "circle-cross", "color": "#666" }, nativeOn: { "click": function click($event) {
            _vm.onDeleteImage('reader0', index);
          } } })], 1);
    }), _vm._v(" "), _c('li', { staticClass: "image-reader-item add" }, [_c('md-image-reader', { attrs: { "name": "reader0", "is-multiple": "" }, on: { "select": _vm.onReaderSelect, "complete": _vm.onReaderComplete, "error": _vm.onReaderError } }), _vm._v(" "), _c('md-icon', { attrs: { "name": "hollow-plus", "size": "md", "color": "#CCC" } }), _vm._v(" "), _c('p', [_vm._v("上传照片")])], 1)], 2)]);
  }, staticRenderFns: [], _scopeId: 'data-v-d14b3d38',
  name: 'image-reader-demo',
  /* DELETE */
  title: '图片选择',
  titleEnUS: 'Picture selection',
  codeSandBox: 'https://codesandbox.io/s/nwln4xppk0',
  /* DELETE */
  components: (_components$52 = {}, _defineProperty$122(_components$52, Icon.name, Icon), _defineProperty$122(_components$52, ImageReader.name, ImageReader), _components$52),
  data: function data() {
    return {
      imageList: {
        reader0: ['//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a', '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7'],
        reader1: []
      }
    };
  },

  methods: {
    onReaderSelect: function onReaderSelect(name, _ref) {
      var files = _ref.files;

      files.forEach(function (file) {
        console.log('[Mand Mobile] ImageReader Selected:', 'File Name ' + file.name);
      });
      Toast.loading('图片读取中...');
    },
    onReaderComplete: function onReaderComplete(name, _ref2) {
      var dataUrl = _ref2.dataUrl,
          file = _ref2.file;

      var demoImageList = this.imageList[name] || [];

      console.log('[Mand Mobile] ImageReader Complete:', 'File Name ' + file.name);

      demoImageList.push(dataUrl);
      this.$set(this.imageList, name, demoImageList);

      Toast.hide();
    },
    onReaderError: function onReaderError(name, _ref3) {
      var msg = _ref3.msg;

      Toast.failed(msg);
    },
    onDeleteImage: function onDeleteImage(name, index) {
      var demoImageList = this.imageList[name] || [];
      demoImageList.splice(index, 1);
      this.$set(this.imageList, name, demoImageList);
    }
  }
};

var UA$2 = function (userAgent) {
  var isOldIos = /OS (\d)_.* like Mac OS X/g.exec(userAgent);
  var isOldAndroid = /Android (\d.*?);/g.exec(userAgent) || /Android\/(\d.*?) /g.exec(userAgent);

  // IOS8.3-
  // ndroid4.5-
  // ios
  // android
  // QQ Browser
  return {
    oldIOS: isOldIos ? +isOldIos.pop() < 8.3 : false,
    oldAndroid: isOldAndroid ? +isOldAndroid.pop().substr(0, 3) < 4.5 : false,
    ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(userAgent),
    android: /Android/g.test(userAgent),
    mQQBrowser: /MQQBrowser/g.test(userAgent)
  };
}(navigator.userAgent);

/**
* Get Orientation of EXIF
* @param  {Object}   dataURL
* @souce http://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side
*/
/* istanbul ignore next */
function getOrientation(dataURL) {
  var buffer = dataURIToArrayBuffer(dataURL);
  var view = new DataView(buffer);

  if (view.getUint16(0, false) !== 0xffd8) {
    return -2;
  }

  var length = view.byteLength;
  var offset = 2;

  while (offset < length) {
    var marker = view.getUint16(offset, false);
    offset += 2;

    if (marker === 0xffe1) {
      var tmp = view.getUint32(offset += 2, false);

      if (tmp !== 0x45786966) {
        return -1;
      }

      var little = view.getUint16(offset += 6, false) === 0x4949;
      offset += view.getUint32(offset + 4, little);

      var tags = view.getUint16(offset, little);
      offset += 2;

      for (var i = 0; i < tags; i++) {
        if (view.getUint16(offset + i * 12, little) === 0x0112) {
          return view.getUint16(offset + i * 12 + 8, little);
        }
      }
    } else if ((marker & 0xff00) !== 0xff00) {
      break;
    } else {
      offset += view.getUint16(offset, false);
    }
  }

  return -1;
}
/* istanbul ignore next */
function getImageSize(img, orientation, maxWidth, maxHeight) {
  var ret = {
    width: img.width,
    height: img.height
  };

  if ('5678'.indexOf(orientation) > -1) {
    ret.width = img.height;
    ret.height = img.width;
  }

  // 如果原图小于设定，采用原图
  if (ret.width < maxWidth || ret.height < maxHeight) {
    return ret;
  }

  var scale = ret.width / ret.height;

  if (maxWidth && maxHeight) {
    if (scale >= maxWidth / maxHeight) {
      if (ret.width > maxWidth) {
        ret.width = maxWidth;
        ret.height = Math.ceil(maxWidth / scale);
      }
    } else {
      if (ret.height > maxHeight) {
        ret.height = maxHeight;
        ret.width = Math.ceil(maxHeight * scale);
      }
    }
  } else if (maxWidth) {
    if (maxWidth < ret.width) {
      ret.width = maxWidth;
      ret.height = Math.ceil(maxWidth / scale);
    }
  } else if (maxHeight < ret.height) {
    ret.width = Math.ceil(maxHeight * scale);
    ret.height = maxHeight;
  }

  // 超过这个值base64无法生成，在IOS上
  if (ret.width >= 3264 || ret.height >= 2448) {
    ret.width *= 0.8;
    ret.height *= 0.8;
  }

  return ret;
}
/* istanbul ignore next */
function makeCanvas(img, orientation, maxWidth, maxHeight, quality) {
  var _getImageSize = getImageSize(img, orientation, maxWidth, maxHeight),
      width = _getImageSize.width,
      height = _getImageSize.height;

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  var base64 = null;
  switch (orientation) {
    case 3:
      ctx.rotate(180 * Math.PI / 180);
      ctx.drawImage(img, -width, -height, width, height);
      break;
    case 6:
      ctx.rotate(90 * Math.PI / 180);
      ctx.drawImage(img, 0, -width, height, width);
      break;
    case 8:
      ctx.rotate(270 * Math.PI / 180);
      ctx.drawImage(img, -height, 0, height, width);
      break;
    case 2:
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, width, height);
      break;
    case 4:
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.rotate(180 * Math.PI / 180);
      ctx.drawImage(img, -width, -height, width, height);
      break;
    case 5:
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.rotate(90 * Math.PI / 180);
      ctx.drawImage(img, 0, -width, height, width);
      break;
    case 7:
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.rotate(270 * Math.PI / 180);
      ctx.drawImage(img, -height, 0, height, width);
      break;
    default:
      ctx.drawImage(img, 0, 0, width, height);
  }

  if (UA$2.oldIOS || UA$2.oldAndroid || UA$2.mQQBrowser || !navigator.userAgent) {
    /* global JPEGEncoder */
    var encoder = new JPEGEncoder();
    var newImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
    base64 = encoder.encode(newImg, quality * 100);
  } else {
    base64 = canvas.toDataURL('image/jpeg', quality);
  }

  return base64;
}
/**
 * Image Process
 * @param options Object: { dataUrl, width, height, quality}
 * @param fn dataUrl => void
 */
function imageProcessor (options) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop$1;

  return new Promise(function (resolve, reject) {
    var dataUrl = options.dataUrl,
        width = options.width,
        height = options.height,
        quality = options.quality;

    var orientation = getOrientation(dataUrl);
    var blob = dataURItoBlob(dataUrl);
    /* istanbul ignore next */
    if (orientation > 1 || quality < 1 || width || height) {
      var img = new Image();
      img.src = dataUrl;
      img.onload = function () {
        var newDataUrl = makeCanvas(img, orientation, width, height, quality);
        var newBlob = dataURItoBlob(newDataUrl);
        fn(newDataUrl, newBlob);
        resolve({
          dataUrl: newDataUrl,
          blob: newBlob
        });
      };
      img.onerror = function () {
        fn(null);
        reject(new Error('image load error'));
      };
    } else {
      fn(dataUrl, blob);
      resolve({
        dataUrl: dataUrl,
        blob: blob
      });
    }
  });
}

// Import jpeg_encoder_basic for compatibility if necessary
if (UA$2.oldIOS || UA$2.oldAndroid || UA$2.mQQBrowser || !navigator.userAgent) {
  /* istanbul ignore next */
  requireRemoteScript('//manhattan.didistatic.com/static/manhattan/mfd/image-reader/jpeg_encoder_basic.js');
}

var _components$53;

function _defineProperty$123(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$20 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-reader md-example-child-reader-1" }, [_c('ul', { staticClass: "image-reader-list" }, [_vm._l(_vm.imageList['reader1'], function (img, index) {
      return _c('li', { key: index, staticClass: "image-reader-item", style: {
          'backgroundImage': 'url(' + img + ')',
          'backgroundPosition': 'center center',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'cover'
        } }, [_c('md-icon', { staticClass: "image-reader-item-del", attrs: { "name": "circle-cross", "color": "#666" }, nativeOn: { "click": function click($event) {
            _vm.onDeleteImage('reader1', index);
          } } })], 1);
    }), _vm._v(" "), _c('li', { staticClass: "image-reader-item add" }, [_c('md-image-reader', { attrs: { "name": "reader1", "is-multiple": "" }, on: { "select": _vm.onReaderSelect, "complete": _vm.onReaderComplete, "error": _vm.onReaderError } }), _vm._v(" "), _c('md-icon', { attrs: { "name": "hollow-plus", "size": "md", "color": "#CCC" } }), _vm._v(" "), _c('p', [_vm._v("上传照片")])], 1)], 2)]);
  }, staticRenderFns: [], _scopeId: 'data-v-d12f0e36',
  name: 'image-reader-demo',
  /* DELETE */
  title: '图片选择并轴向修正，压缩处理',
  titleEnUS: 'Picture selection and axial correction, compression processing',
  describe: 'width: 200&nbsp;&nbsp;height: 200&nbsp;&nbsp;quality: 0.1',
  codeSandBox: 'https://codesandbox.io/s/xjq2ylrzyq',
  /* DELETE */
  components: (_components$53 = {}, _defineProperty$123(_components$53, Icon.name, Icon), _defineProperty$123(_components$53, ImageReader.name, ImageReader), _components$53),
  data: function data() {
    return {
      imageList: {
        reader0: ['//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a', '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7'],
        reader1: []
      }
    };
  },

  methods: {
    onReaderSelect: function onReaderSelect() {
      Toast.loading('图片读取中...');
    },
    onReaderComplete: function onReaderComplete(name, _ref) {
      var dataUrl = _ref.dataUrl;

      var demoImageList = this.imageList[name] || [];

      imageProcessor({
        dataUrl: dataUrl,
        width: 200,
        height: 200,
        quality: 0.1
      }).then(function (_ref2) {
        var dataUrl = _ref2.dataUrl;

        dataUrl && demoImageList.push(dataUrl);
      });
      this.$set(this.imageList, name, demoImageList);

      Toast.hide();
    },
    onReaderError: function onReaderError(name, _ref3) {
      var msg = _ref3.msg;

      Toast.failed(msg);
    },
    onDeleteImage: function onDeleteImage(name, index) {
      var demoImageList = this.imageList[name] || [];
      demoImageList.splice(index, 1);
      this.$set(this.imageList, name, demoImageList);
    }
  }
};

var _extends$24 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$25 = _extends$24({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example image-reader" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('image-reader', [Demo0$23, Demo1$20]));

var cascadeData = [{
  label: '张三',
  value: 1,
  children: [{
    label: '学生',
    value: 2,
    children: [{
      label: '男',
      value: 11,
      children: ''
    }, {
      label: '女',
      value: 22,
      children: ''
    }]
  }]
}, {
  label: '李四',
  value: 2,
  children: [{
    label: '学生',
    value: 2,
    children: [{
      label: '男',
      value: 11,
      children: ''
    }, {
      label: '女',
      value: 22,
      children: ''
    }]
  }]
}];

var normalData = [{
  label: '第一选择项',
  value: '0277',
  children: [{
    label: '武汉',
    value: '027'
  }, {
    label: '襄阳',
    value: '027'
  }, {
    label: '十堰',
    value: '027'
  }, {
    label: '武汉',
    value: '027'
  }, {
    label: '襄阳',
    value: '027'
  }, {
    label: '十堰',
    value: '027'
  }, {
    label: '武汉',
    value: '027'
  }, {
    label: '襄阳',
    value: '027'
  }, {
    label: '十堰',
    value: '027'
  }]
}, {
  label: '第二选择项',
  value: '0272',
  children: [{
    label: '成都',
    value: '024'
  }, {
    label: '汶川',
    value: '021'
  }, {
    label: '绵阳市',
    value: '026'
  }]
}, {
  label: '第三选择项',
  value: '0247',
  children: [{
    label: '长沙',
    value: '0297'
  }, {
    label: '株洲',
    value: '0273'
  }, {
    label: '岳阳',
    value: '0207'
  }]
}];

var _components$54;

function _defineProperty$124(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*  import from source code */
var index$26 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example tab-picker" }, [_c('section', { staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title" }, [_vm._v("基本")]), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c('md-button', { on: { "click": function click($event) {
          _vm.$_showTabPicker(1);
        } } }, [_vm._v("普通多频道")]), _vm._v(" "), _c('md-tab-picker', { attrs: { "title": _vm.title, "data": _vm.normalData, "ok-text": "确认", "cancel-text": "取消" }, on: { "confirm": _vm.$_confirm, "cancel": _vm.$_cancel, "change": _vm.$_change, "show": _vm.$_show, "hide": _vm.$_hide }, scopedSlots: _vm._u([{ key: "titles", fn: function fn(props) {
          return _c('div', { staticClass: "title-item" }, [_vm._v(" 标签dom " + _vm._s(props.label) + " ")]);
        } }, { key: "option", fn: function fn(props) {
          return _c('li', { staticClass: "option-item" }, [_vm._v(" 公共dom样式 "), props.index === 0 ? _c('div', [_vm._v(" 第" + _vm._s(props.index) + "列dom样式 " + _vm._s(props.option.label) + " ")]) : props.index === 1 ? _c('div', [_vm._v(" 第" + _vm._s(props.index) + "列dom样式 " + _vm._s(props.option.label) + " ")]) : _c('div', [_vm._v(" 第" + _vm._s(props.index) + "列dom样式 " + _vm._s(props.option.label) + " ")])]);
        } }]), model: { value: _vm.isTabPickerShow[1], callback: function callback($$v) {
          _vm.$set(_vm.isTabPickerShow, 1, $$v);
        }, expression: "isTabPickerShow[1]" } }), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.$_showTabPicker(0);
        } } }, [_vm._v("级联多频道")]), _vm._v(" "), _c('md-tab-picker', { attrs: { "title": _vm.title, "data": _vm.cascadeData, "ok-text": "确认", "cancel-text": "取消", "data-struct": "cascade", "option-render": [function () {}, function () {}, _vm.$_optionRender], "default-index": [0, 0, 0] }, on: { "confirm": _vm.$_confirm, "cancel": _vm.$_cancel, "change": _vm.$_change, "show": _vm.$_show, "hide": _vm.$_hide }, model: { value: _vm.isTabPickerShow[0], callback: function callback($$v) {
          _vm.$set(_vm.isTabPickerShow, 0, $$v);
        }, expression: "isTabPickerShow[0]" } }), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.$_showTabPicker(2);
        } } }, [_vm._v("异步级联多频道")]), _vm._v(" "), _c('md-tab-picker', { attrs: { "title": _vm.title, "async-func": _vm.asyncFunc, "ok-text": "确认", "cancel-text": "取消", "data-struct": "async", "option-render": [function () {}, function () {}, _vm.$_optionRender] }, on: { "confirm": _vm.$_confirm, "cancel": _vm.$_cancel, "change": _vm.$_change, "show": _vm.$_show, "hide": _vm.$_hide }, model: { value: _vm.isTabPickerShow[2], callback: function callback($$v) {
          _vm.$set(_vm.isTabPickerShow, 2, $$v);
        }, expression: "isTabPickerShow[2]" } }, [_c('span', { attrs: { "slot": "error" }, slot: "error" }, [_vm._v("数据异常")]), _vm._v(" "), _c('span', { staticClass: "loading", attrs: { "slot": "loading" }, slot: "loading" }, [_vm._v("loading")])])], 1)])]);
  }, staticRenderFns: [],
  name: 'tab-picker-demo',
  components: (_components$54 = {}, _defineProperty$124(_components$54, TabPicker.name, TabPicker), _defineProperty$124(_components$54, Button.name, Button), _components$54),

  data: function data() {
    return {
      isTabPickerShow: [false, false, false],
      title: '选择title',
      normalData: [],
      cascadeData: [],
      asyncFunc: function asyncFunc(value, callback) {
        console.log('用户自己加loading');
        setTimeout(function () {
          callback(null, {
            options: [{
              label: '一级选项一',
              value: '0271'
            }, {
              label: '一级选项二',
              value: '0272'
            }],
            asyncFunc: function asyncFunc(value, callback) {
              console.log('第一级选择项', value);
              setTimeout(function () {
                callback(null, {
                  options: [{
                    label: '二级选项一',
                    value: '0271'
                  }, {
                    label: '二级选项二',
                    value: '0272'
                  }],
                  asyncFunc: function asyncFunc(value, callback) {
                    console.log('第二级选择项', value);
                    setTimeout(function () {
                      // 数据异常传入error
                      // callback({errorCode: 1}, null)
                      callback(null, {
                        options: [{
                          label: '三级选项一',
                          value: '0271'
                        }, {
                          label: '三级选项二',
                          value: '0272'
                        }]
                      });
                    }, 1000);
                  }
                });
              }, 1000);
            }
          });
        }, 2000);
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    setTimeout(function () {
      _this.cascadeData = cascadeData;
    }, 1000);
    setTimeout(function () {
      _this.normalData = normalData;
    }, 200);
  },


  methods: {
    $_showTabPicker: function $_showTabPicker(index) {
      this.$set(this.isTabPickerShow, index, true);
    },
    $_confirm: function $_confirm(selected) {
      if (selected) {
        console.log('\u786E\u8BA4\u9009\u62E9\u9879: ' + JSON.stringify(selected));
      } else {
        console.warn('点击确认按钮时未选择到任何确定项');
      }
    },
    $_cancel: function $_cancel() {},
    $_change: function $_change(select) {
      console.log('\u7B2C' + select.selectTab + '\u5217, \u7B2C' + select.selectIndex + '\u9879: label: ' + select.selectItem.label + ', value: ' + select.selectItem.value);
    },
    $_show: function $_show() {},
    $_hide: function $_hide() {},
    $_optionRender: function $_optionRender(item) {
      return '<div class="md-field-item-custom-title">' + item.label + '</div><div class="md-field-item-custom-brief">\u5341\u5E74\u524D\u4F60\u8BF4\u751F\u5982\u590F\u82B1\u822C\u707F\u70C2\uFF0C\u5341\u5E74\u540E\u4F60\u8BF4\u5E73\u51E1\u624D\u662F\u552F\u4E00\u7684\u7B54\u6848</div>';
    }
  }
};

var _components$55;

function _defineProperty$125(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$24 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-field md-example-child-field-0" }, [_c('md-field', { attrs: { "title": "单个条目" } }, [_c('md-field-item', { attrs: { "name": "item0", "title": "可点击条目", "arrow": "arrow-right", "solid": "" }, on: { "click": _vm.onClick } })], 1), _vm._v(" "), _c('md-field', { attrs: { "title": "单个条目" } }, [_c('md-field-item', { attrs: { "name": "item1", "title": "禁用条目", "arrow": "arrow-right", "disabled": "disabled" }, on: { "click": _vm.onClick } })], 1), _vm._v(" "), _c('md-field', { attrs: { "title": "单个条目" } }, [_c('md-field-item', { attrs: { "name": "item2", "title": "标题", "brief": "展示摘要描述", "arrow": "arrow-right" }, on: { "click": _vm.onClick } })], 1)], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-545c7925',
  name: 'field-demo',
  components: (_components$55 = {}, _defineProperty$125(_components$55, Field.name, Field), _defineProperty$125(_components$55, FieldItem.name, FieldItem), _components$55),
  methods: {
    onClick: function onClick(name) {
      Dialog.alert({
        content: '\u70B9\u51FB\u4E86 ' + name
      });
    }
  }
};

var _components$56;

function _defineProperty$126(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$21 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-field md-example-child-field-1" }, [_c('md-field', { attrs: { "title": "包含多个条目的列表" } }, [_c('md-field-item', { attrs: { "name": "item0", "title": "普通条目", "arrow": "arrow-right" }, on: { "click": _vm.onClick } }), _vm._v(" "), _c('md-field-item', { attrs: { "name": "item1", "title": "标题", "brief": "展示摘要描述，摘要较长时会自动换行", "arrow": "arrow-right", "solid": "" }, on: { "click": _vm.onClick } }), _vm._v(" "), _c('md-field-item', { attrs: { "name": "item2", "title": "使用switch", "align": "right" } }, [_c('md-switch', { attrs: { "name": "switch0" }, model: { value: _vm.switchActive, callback: function callback($$v) {
          _vm.switchActive = $$v;
        }, expression: "switchActive" } })], 1), _vm._v(" "), _c('md-field-item', { attrs: { "name": "item3", "title": "输入框", "customized": "", "align": "center" } }, [_c('md-input-item', { ref: "input1", attrs: { "placeholder": "请输入..." } })], 1)], 1)], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-546a90a6',
  name: 'field-demo',
  /* DELETE */
  title: '多个条目',
  titleEnUS: 'Multiple items',
  /* DELETE */
  components: (_components$56 = {}, _defineProperty$126(_components$56, Field.name, Field), _defineProperty$126(_components$56, FieldItem.name, FieldItem), _defineProperty$126(_components$56, InputItem.name, InputItem), _defineProperty$126(_components$56, Switch.name, Switch), _components$56),
  data: function data() {
    return {
      switchActive: false
    };
  },

  methods: {
    onClick: function onClick(name) {
      Dialog.alert({
        content: '\u70B9\u51FB\u4E86 ' + name
      });
    }
  }
};

var _components$57;

function _defineProperty$127(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$18 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-field md-example-child-field-2" }, [_c('md-field', { attrs: { "title": "包含内容的条目" } }, [_c('md-field-item', { attrs: { "name": "item0", "title": "短标题", "arrow": "arrow-right", "value": "内容靠左展示", "align": "left" }, on: { "click": _vm.onClick } }), _vm._v(" "), _c('md-field-item', { attrs: { "name": "item1", "title": "一个不换行的长标题", "arrow": "arrow-right", "value": "内容居中展示", "align": "center" }, on: { "click": _vm.onClick } }), _vm._v(" "), _c('md-field-item', { attrs: { "name": "item2", "title": "一个换行的长标题", "arrow": "arrow-right", "value": "内容靠右展示", "solid": "", "align": "right" }, on: { "click": _vm.onClick } }), _vm._v(" "), _c('md-field-item', { attrs: { "name": "item2", "title": "左右插槽", "arrow": "arrow-right", "solid": "", "align": "right" }, on: { "click": _vm.onClick } }, [_c('div', [_vm._v("内容展示")]), _vm._v(" "), _c('md-icon', { attrs: { "slot": "left", "name": "bank-zs" }, slot: "left" }), _vm._v(" "), _c('md-icon', { attrs: { "slot": "right", "name": "circle-alert" }, slot: "right" })], 1)], 1)], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-5478a827',
  name: 'field-demo',
  /* DELETE */
  title: '包含内容',
  titleEnUS: 'With content',
  /* DELETE */
  components: (_components$57 = {}, _defineProperty$127(_components$57, Field.name, Field), _defineProperty$127(_components$57, FieldItem.name, FieldItem), _defineProperty$127(_components$57, InputItem.name, InputItem), _defineProperty$127(_components$57, Icon.name, Icon), _components$57),
  methods: {
    onClick: function onClick(name) {
      Dialog.alert({
        content: '\u70B9\u51FB\u4E86 ' + name
      });
    }
  }
};

var _extends$25 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$27 = _extends$25({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example field" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('field', [Demo0$24, Demo1$21, Demo2$18]));

function _defineProperty$128(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$25 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-switch md-example-child-switch-0" }, [_c('md-switch', { on: { "change": function change($event) {
          _vm.handler('switch0', _vm.isActive, $event);
        } }, model: { value: _vm.isActive, callback: function callback($$v) {
          _vm.isActive = $$v;
        }, expression: "isActive" } })], 1);
  }, staticRenderFns: [],
  name: 'switch-demo',
  /* DELETE */
  title: '开启状态',
  titleEnUS: 'Open',
  /* DELETE */
  components: _defineProperty$128({}, Switch.name, Switch),
  data: function data() {
    return {
      isActive: true
    };
  },

  methods: {
    handler: function handler(name, active) {
      console.log('Status of switch ' + name + ' is ' + (active ? 'active' : 'inactive'));
    }
  }
};

function _defineProperty$129(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$22 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-switch md-example-child-switch-1" }, [_c('md-switch', { on: { "change": function change($event) {
          _vm.handler('switch1', _vm.isActive, $event);
        } }, model: { value: _vm.isActive, callback: function callback($$v) {
          _vm.isActive = $$v;
        }, expression: "isActive" } })], 1);
  }, staticRenderFns: [],
  name: 'switch-demo',
  /* DELETE */
  title: '关闭状态',
  titleEnUS: 'Closed',
  /* DELETE */
  components: _defineProperty$129({}, Switch.name, Switch),
  data: function data() {
    return {
      isActive: false
    };
  },

  methods: {
    handler: function handler(name, active) {
      console.log('Status of switch ' + name + ' is ' + (active ? 'active' : 'inactive'));
    }
  }
};

function _defineProperty$130(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$19 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-switch md-example-child-switch-2" }, [_c('md-switch', { attrs: { "disabled": "disabled" }, on: { "change": function change($event) {
          _vm.handler('switch2', _vm.isActive, $event);
        } }, model: { value: _vm.isActive, callback: function callback($$v) {
          _vm.isActive = $$v;
        }, expression: "isActive" } })], 1);
  }, staticRenderFns: [],
  name: 'switch-demo',
  /* DELETE */
  title: '开启不可用状态',
  titleEnUS: 'Open and disabled',
  /* DELETE */
  components: _defineProperty$130({}, Switch.name, Switch),
  data: function data() {
    return {
      isActive: true
    };
  },

  methods: {
    handler: function handler(name, active) {
      console.log('Status of switch ' + name + ' is ' + (active ? 'active' : 'inactive'));
    }
  }
};

function _defineProperty$131(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$13 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-switch md-example-child-switch-3" }, [_c('md-switch', { attrs: { "disabled": "disabled" }, on: { "change": function change($event) {
          _vm.handler('switch3', _vm.isActive, $event);
        } }, model: { value: _vm.isActive, callback: function callback($$v) {
          _vm.isActive = $$v;
        }, expression: "isActive" } })], 1);
  }, staticRenderFns: [],
  name: 'switch-demo',
  /* DELETE */
  title: '关闭不可用状态',
  titleEnUS: 'Closed and disabled',
  /* DELETE */
  components: _defineProperty$131({}, Switch.name, Switch),
  data: function data() {
    return {
      isActive: false
    };
  },

  methods: {
    handler: function handler(name, active) {
      console.log('Status of switch ' + name + ' is ' + (active ? 'active' : 'inactive'));
    }
  }
};

var _extends$26 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$28 = _extends$26({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example switch" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [], _scopeId: 'data-v-ffa5f194' }, createDemoModule('switch', [Demo0$25, Demo1$22, Demo2$19, Demo3$13]));

function _defineProperty$132(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$26 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-agree md-example-child-0" }, [_c('md-agree', { attrs: { "disabled": _vm.agreeConf.disabled, "size": _vm.agreeConf.size }, on: { "change": function change($event) {
          _vm.onChange(_vm.agreeConf.name, _vm.agreeConf.checked, $event);
        } }, model: { value: _vm.agreeConf.checked, callback: function callback($$v) {
          _vm.$set(_vm.agreeConf, "checked", $$v);
        }, expression: "agreeConf.checked" } }, [_vm._v(" 本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意"), _c('a', [_vm._v("《投保须知》")]), _vm._v(", "), _c('a', [_vm._v("《保险条款》")])])], 1);
  }, staticRenderFns: [],
  name: 'agree-demo',
  /* DELETE */
  title: '选中状态',
  titleEnUS: 'Selected state',
  height: 120,
  /* DELETE */
  components: _defineProperty$132({}, Agree.name, Agree),
  data: function data() {
    return {
      agreeConf: {
        checked: true,
        name: 'agree0',
        size: 'lg',
        disabled: false,
        introduction: '选中状态'
      }
    };
  },

  methods: {
    onChange: function onChange(name, checked) {
      console.log('agree name = ' + name + ' is ' + (checked ? 'checked' : 'unchecked'));
    }
  }
};

function _defineProperty$133(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$23 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-agree md-example-child-1" }, [_c('md-agree', { attrs: { "disabled": _vm.agreeConf.disabled, "size": _vm.agreeConf.size }, on: { "change": function change($event) {
          _vm.onChange(_vm.agreeConf.name, _vm.agreeConf.checked, $event);
        } }, model: { value: _vm.agreeConf.checked, callback: function callback($$v) {
          _vm.$set(_vm.agreeConf, "checked", $$v);
        }, expression: "agreeConf.checked" } }, [_vm._v(" 本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意 ")])], 1);
  }, staticRenderFns: [],
  name: 'agree-demo',
  /* DELETE */
  title: '未选中状态',
  titleEnUS: 'Unselected state',
  height: 120,
  /* DELETE */
  components: _defineProperty$133({}, Agree.name, Agree),
  data: function data() {
    return {
      agreeConf: {
        checked: false,
        name: 'agree1',
        size: 'lg',
        disabled: false,
        introduction: '未选中状态'
      }
    };
  },

  methods: {
    onChange: function onChange(name, checked) {
      console.log('agree name = ' + name + ' is ' + (checked ? 'checked' : 'unchecked'));
    }
  }
};

function _defineProperty$134(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$20 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-agree md-example-child-2" }, [_c('md-agree', { attrs: { "disabled": _vm.agreeConf.disabled, "size": _vm.agreeConf.size }, on: { "change": function change($event) {
          _vm.onChange(_vm.agreeConf.name, _vm.agreeConf.checked, $event);
        } }, model: { value: _vm.agreeConf.checked, callback: function callback($$v) {
          _vm.$set(_vm.agreeConf, "checked", $$v);
        }, expression: "agreeConf.checked" } }, [_vm._v(" 本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意 ")])], 1);
  }, staticRenderFns: [],
  name: 'agree-demo',
  /* DELETE */
  title: '选中不可用状态',
  titleEnUS: 'Selected and unavailable state',
  height: 120,
  /* DELETE */
  components: _defineProperty$134({}, Agree.name, Agree),
  data: function data() {
    return {
      agreeConf: {
        checked: true,
        name: 'agree2',
        size: 'lg',
        disabled: true,
        introduction: '选中不可用状态'
      }
    };
  },

  methods: {
    onChange: function onChange(name, checked) {
      console.log('agree name = ' + name + ' is ' + (checked ? 'checked' : 'unchecked'));
    }
  }
};

function _defineProperty$135(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$14 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-agree md-example-child-3" }, [_c('md-agree', { attrs: { "disabled": _vm.agreeConf.disabled, "size": _vm.agreeConf.size }, on: { "change": function change($event) {
          _vm.onChange(_vm.agreeConf.name, _vm.agreeConf.checked, $event);
        } }, model: { value: _vm.agreeConf.checked, callback: function callback($$v) {
          _vm.$set(_vm.agreeConf, "checked", $$v);
        }, expression: "agreeConf.checked" } }, [_vm._v(" 本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意 ")])], 1);
  }, staticRenderFns: [],
  name: 'agree-demo',
  /* DELETE */
  title: '未选中不可用状态',
  titleEnUS: 'Unselected and unavailable state',
  height: 120,
  /* DELETE */
  components: _defineProperty$135({}, Agree.name, Agree),
  data: function data() {
    return {
      agreeConf: {
        checked: false,
        name: 'agree3',
        size: 'lg',
        disabled: true,
        introduction: '未选中不可用状态'
      }
    };
  },

  methods: {
    onChange: function onChange(name, checked) {
      console.log('agree name = ' + name + ' is ' + (checked ? 'checked' : 'unchecked'));
    }
  }
};

var _extends$27 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$29 = _extends$27({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example agree" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('action-sheet', [Demo0$26, Demo1$23, Demo2$20, Demo3$14]));

function _defineProperty$136(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$27 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-radio md-example-child-radio-0" }, [_c('md-radio', { ref: "radio", attrs: { "options": _vm.data, "default-index": 1 } })], 1);
  }, staticRenderFns: [],
  name: 'radio-demo',
  /* DELETE */
  title: '普通单选框 <a href="javascript:window.RadioTrigger0()">getSelectedValue</a><a href="javascript:window.RadioTrigger1()">getSelectedIndex</a>',
  titleEnUS: 'Normal radio <a href="javascript:window.RadioTrigger0()">getSelectedValue</a><a href="javascript:window.RadioTrigger1()">getSelectedIndex</a>',
  describe: '通过default-index默认选中',
  describeEnUS: 'Default selected by "default-index"',
  /* DELETE */
  components: _defineProperty$136({}, Radio.name, Radio),
  data: function data() {
    return {
      data: [{ text: '选项1', disabled: true }, { text: '选项2' }, { text: '选项3' }]
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.RadioTrigger0 = function () {
      _this.getSelectedValue('radio');
    };
    window.RadioTrigger1 = function () {
      _this.getSelectedIndex('radio');
    };
  },

  methods: {
    getSelectedValue: function getSelectedValue(radio) {
      Dialog.alert({
        content: '<pre>' + JSON.stringify(this.$refs[radio].getSelectedValue()) + '</pre>'
      });
    },
    getSelectedIndex: function getSelectedIndex(radio) {
      Dialog.alert({
        content: '<pre>' + JSON.stringify(this.$refs[radio].getSelectedIndex()) + '</pre>'
      });
    }
  }
};

function _defineProperty$137(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$24 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-radio md-example-child-radio-1" }, [_c('md-radio', { ref: "radio", attrs: { "options": _vm.data, "input-option-label": "其它选项", "input-option-placeholder": "其它选项内容", "has-input-option": "" }, on: { "change": _vm.onRadioChange, "input": _vm.onRadioInput }, model: { value: _vm.optionValue, callback: function callback($$v) {
          _vm.optionValue = $$v;
        }, expression: "optionValue" } })], 1);
  }, staticRenderFns: [],
  name: 'radio-demo',
  /* DELETE */
  title: '可编辑选项单选框 <a href="javascript:window.RadioTrigger2()">selectByIndex(2)</a>',
  titleEnUS: 'With editable option',
  describe: '通过v-model初始值默认选中',
  describeEnUS: 'Default selected by "v-model"',
  /* DELETE */
  components: _defineProperty$137({}, Radio.name, Radio),
  data: function data() {
    return {
      data: [{ text: '选项1' }, { text: '选项2' }],
      optionValue: '选项2'
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.RadioTrigger2 = function () {
      _this.selectByIndex('radio', 2);
    };
  },

  methods: {
    onRadioChange: function onRadioChange(value, index) {
      console.log('[Mand-Mobile]: Radio, options: ' + JSON.stringify(value) + ', index: ' + index);
    },
    onRadioInput: function onRadioInput(value) {
      console.log('[Mand-Mobile]: Radio, options: ' + JSON.stringify(value));
    },
    selectByIndex: function selectByIndex(radio, index) {
      this.$refs[radio].selectByIndex(index);
    }
  }
};

function _defineProperty$138(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$21 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-radio md-example-child-radio-2" }, [_c('md-radio', { ref: "radio", attrs: { "options": _vm.data }, scopedSlots: _vm._u([{ key: "default", fn: function fn(_ref) {
          var option = _ref.option;
          return [_c('div', { staticClass: "md-radio-custom-title", domProps: { "textContent": _vm._s(option.text) } }), _vm._v(" "), _c('div', { staticClass: "md-radio-custom-brief" }, [_vm._v(_vm._s(option.text) + "的自定义描述")])];
        } }]) })], 1);
  }, staticRenderFns: [],
  name: 'radio-demo',
  /* DELETE */
  title: '自定义选项内容1',
  titleEnUS: 'Custom option content 1',
  describe: '使用slot-scope',
  describeEnUS: 'Use "slot-scope"',
  /* DELETE */
  components: _defineProperty$138({}, Radio.name, Radio),
  data: function data() {
    return {
      data: [{ text: '选项1' }, { text: '选项2' }]
    };
  }
};

function _defineProperty$139(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$15 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-radio md-example-child-radio-3" }, [_c('md-radio', { ref: "radio", attrs: { "options": _vm.data, "optionRender": _vm.optionRender } })], 1);
  }, staticRenderFns: [],
  name: 'radio-demo',
  /* DELETE */
  title: '自定义选项内容2',
  titleEnUS: 'Custom option content 2',
  describe: '使用option-render',
  describeEnUS: 'Use "option-render"',
  /* DELETE */
  components: _defineProperty$139({}, Radio.name, Radio),
  data: function data() {
    return {
      data: [{ text: '选项1' }, { text: '选项2' }]
    };
  },

  methods: {
    optionRender: function optionRender(item) {
      return '<div class="md-radio-custom-title">' + item.text + '</div><div class="md-radio-custom-brief">' + item.text + '\u7684\u81EA\u5B9A\u4E49\u63CF\u8FF0</div>';
    }
  }
};

function _defineProperty$140(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo4$7 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-radio md-example-child-radio-4" }, [_c('md-radio', { ref: "radio", attrs: { "options": _vm.data, "default-index": 0, "icon": "circle-right", "icon-inverse": "circle", "icon-position": "left" } })], 1);
  }, staticRenderFns: [],
  name: 'radio-demo',
  /* DELETE */
  title: 'Icon设置',
  titleEnUS: 'Setting icon',
  /* DELETE */
  components: _defineProperty$140({}, Radio.name, Radio),
  data: function data() {
    return {
      data: [{ text: '选项1' }, { text: '选项2' }, { text: '选项3' }]
    };
  }
};

var _extends$28 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$30 = _extends$28({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example radio" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('radio', [Demo0$27, Demo1$24, Demo2$21, Demo3$15, Demo4$7]));

function _defineProperty$141(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$28 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-date-picker md-example-child-date-picker-0" }, [_c('md-date-picker', { ref: "datePicker", attrs: { "today-text": "今天", "minDate": _vm.minDate, "maxDate": _vm.maxDate, "default-date": _vm.currentDate, "is-view": "" }, on: { "initialed": _vm.onDatePickerInitialed } })], 1);
  }, staticRenderFns: [],
  name: 'date-picker-demo',
  /* DELETE */
  title: '日期选择',
  titleEnUS: 'Date selection',
  describe: '2013/9/9 - 2020/9/9',
  /* DELETE */
  components: _defineProperty$141({}, DatePicker.name, DatePicker),
  data: function data() {
    return {
      minDate: new Date('2013/9/9'),
      maxDate: new Date('2020/9/9'),
      currentDate: new Date()
    };
  },

  methods: {
    onDatePickerInitialed: function onDatePickerInitialed() {
      console.log('[Mand Mobile] DatePicker getFormatDate: ' + this.$refs.datePicker.getFormatDate('yyyy/MM/dd'));
    }
  }
};

function _defineProperty$142(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$25 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-date-picker md-example-child-date-picker-1" }, [_c('md-date-picker', { attrs: { "type": "time", "unit-text": ['', '', '', 'h', 'm'], "half-day-text": ['AM', 'PM'], "minute-step": 30, "is-twelve-hours": "", "is-view": "" } })], 1);
  }, staticRenderFns: [],
  name: 'date-picker-demo',
  /* DELETE */
  title: '时间选择',
  titleEnUS: 'Time selection',
  /* DELETE */
  components: _defineProperty$142({}, DatePicker.name, DatePicker)
};

function _defineProperty$143(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$22 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-date-picker md-example-child-date-picker-2" }, [_c('md-date-picker', { ref: "datePicker", attrs: { "type": "datetime", "default-date": _vm.currentDate, "is-twelve-hours": "", "is-view": "" } })], 1);
  }, staticRenderFns: [],
  name: 'date-picker-demo',
  /* DELETE */
  title: '日期时间选择 <a href="javascript:window.triggerDatePicker0()">getFormatDate()</a>',
  titleEnUS: 'Date & Time selection <a href="javascript:window.triggerDatePicker0()">getFormatDate()</a>',
  /* DELETE */
  components: _defineProperty$143({}, DatePicker.name, DatePicker),
  data: function data() {
    return {
      currentDate: new Date()
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.triggerDatePicker0 = function () {
      Dialog.alert({
        content: _this.$refs.datePicker.getFormatDate()
      });
    };
  }
};

var _components$58;

function _defineProperty$144(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$16 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-date-picker md-example-child-date-picker-3" }, [_c('md-field', [_c('md-field-item', { attrs: { "name": "name", "title": "出险时间", "arrow": "arrow-right", "align": "right", "value": _vm.datePickerValue }, nativeOn: { "click": function click($event) {
          _vm.isDatePickerShow = true;
        } } })], 1), _vm._v(" "), _c('md-date-picker', { ref: "datePicker", attrs: { "type": "custom", "today-text": "&(今天)", "title": "选择出险时间", "is-twelve-hours": "", "text-render": _vm.textRender, "custom-types": ['yyyy', 'MM', 'dd', 'hh', 'mm'], "default-date": _vm.currentDate }, on: { "change": _vm.onDatePickerChange, "confirm": _vm.onDatePickerConfirm }, model: { value: _vm.isDatePickerShow, callback: function callback($$v) {
          _vm.isDatePickerShow = $$v;
        }, expression: "isDatePickerShow" } })], 1);
  }, staticRenderFns: [],
  name: 'date-picker-demo',
  /* DELETE */
  title: '自定义类型和选项文案值',
  titleEnUS: 'Custom type and option textual values',
  height: 500,
  /* DELETE */
  components: (_components$58 = {}, _defineProperty$144(_components$58, DatePicker.name, DatePicker), _defineProperty$144(_components$58, Field.name, Field), _defineProperty$144(_components$58, FieldItem.name, FieldItem), _components$58),
  data: function data() {
    return {
      currentDate: new Date(),
      isDatePickerShow: false,
      datePickerValue: ''
    };
  },

  methods: {
    textRender: function textRender() {
      var args = Array.prototype.slice.call(arguments);
      var typeFormat = args[0]; // 类型
      var column0Value = args[1]; // 第1列选中值
      var column1Value = args[2]; // 第2列选中值
      var column2Value = args[3]; // 第3列选中值

      if (typeFormat === 'dd') {
        return column0Value + '/' + column1Value + '/' + column2Value;
      }
    },
    onDatePickerChange: function onDatePickerChange(columnIndex, itemIndex, value) {
      console.log('[Mand Mobile] DatePicker Change\ncolumnIndex: ' + columnIndex + ',\nitemIndex:' + itemIndex + ',\nvalue: ' + JSON.stringify(value));
    },
    onDatePickerConfirm: function onDatePickerConfirm(columnsValue) {
      console.log('[Mand Mobile] DatePicker Confirm\nvalue: ' + JSON.stringify(columnsValue));
      this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy/MM/dd hh:mm');
    }
  }
};

var _extends$29 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$31 = _extends$29({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example date-picker" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('date-picker', [Demo0$28, Demo1$25, Demo2$22, Demo3$16]));

var _components$59;

function _defineProperty$145(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$29 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-captcha" }, [_c('md-field', { attrs: { "title": "文案" } }, [_c('md-input-item', { attrs: { "title": "标题" }, model: { value: _vm.title, callback: function callback($$v) {
          _vm.title = $$v;
        }, expression: "title" } }), _vm._v(" "), _c('md-input-item', { attrs: { "title": "插槽内容" }, model: { value: _vm.content, callback: function callback($$v) {
          _vm.content = $$v;
        }, expression: "content" } }), _vm._v(" "), _c('md-input-item', { attrs: { "title": "短信验证码", "value": "1234", "readonly": "readonly" } })], 1), _vm._v(" "), _c('md-field', { attrs: { "title": "配置" } }, [_c('md-field-item', { attrs: { "title": "限制验证码长度", "customized": "", "align": "right" } }, [_c('md-switch', { model: { value: _vm.limit, callback: function callback($$v) {
          _vm.limit = $$v;
        }, expression: "limit" } })], 1), _vm._v(" "), _c('md-input-item', { attrs: { "title": "验证码长度", "type": "tel" }, model: { value: _vm.maxlength, callback: function callback($$v) {
          _vm.maxlength = $$v;
        }, expression: "maxlength" } }), _vm._v(" "), _c('md-field-item', { attrs: { "title": "采用掩码", "customized": "", "align": "right" } }, [_c('md-switch', { model: { value: _vm.mask, callback: function callback($$v) {
          _vm.mask = $$v;
        }, expression: "mask" } })], 1), _vm._v(" "), _c('md-field-item', { attrs: { "title": "使用系统键盘", "customized": "", "align": "right" } }, [_c('md-switch', { model: { value: _vm.system, callback: function callback($$v) {
          _vm.system = $$v;
        }, expression: "system" } })], 1)], 1), _vm._v(" "), _c('md-button', { on: { "click": _vm.next } }, [_vm._v("确定")]), _vm._v(" "), _c('md-captcha', { ref: "captcha", attrs: { "title": _vm.title, "maxlength": _vm.limit ? parseFloat(_vm.maxlength) : -1, "system": _vm.system, "mask": _vm.mask, "appendTo": _vm.appendTo }, on: { "submit": _vm.submit, "show": _vm.onShow, "hide": _vm.onHide, "send": _vm.onSend }, model: { value: _vm.show, callback: function callback($$v) {
          _vm.show = $$v;
        }, expression: "show" } }, [_vm._v(" " + _vm._s(_vm.content) + " ")])], 1);
  }, staticRenderFns: [],
  name: 'captcha-demo',
  /* DELETE */
  title: '自定义',
  titleEnUS: 'Customize',
  height: 650,
  /* DELETE */
  components: (_components$59 = {}, _defineProperty$145(_components$59, Button.name, Button), _defineProperty$145(_components$59, Captcha.name, Captcha), _defineProperty$145(_components$59, InputItem.name, InputItem), _defineProperty$145(_components$59, Field.name, Field), _defineProperty$145(_components$59, FieldItem.name, FieldItem), _defineProperty$145(_components$59, Switch.name, Switch), _components$59),
  data: function data() {
    return {
      show: false,
      appendTo: document.querySelector('.doc-demo-box-priview') || document.body,
      title: '输入验证码',
      content: '验证码已发送至 186****5407',
      limit: true,
      maxlength: '4',
      mask: false,
      system: false
    };
  },

  methods: {
    next: function next() {
      this.show = true;
    },
    submit: function submit(val) {
      var max = parseFloat(this.maxlength);
      if (!this.limit || max < 0 || val.length === max) {
        if (val !== '1234') {
          this.$refs.captcha.setError('验证码错误，请重新输入');
        } else {
          this.show = false;
          Toast({
            content: '\u4F60\u8F93\u5165\u4E86' + val
          });
        }
      }
    },
    onSend: function onSend() {
      console.log('click resend button.');
    },
    onShow: function onShow() {},
    onHide: function onHide() {}
  }
};

var _extends$30 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// import Demo1 from './cases/demo1'
var index$32 = _extends$30({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example captcha" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('captcha', [Demo0$29]));

function _defineProperty$146(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$30 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-codebox md-example-child-codebox-0" }, [_c('md-codebox', { attrs: { "maxlength": 4, "autofocus": "" }, model: { value: _vm.code, callback: function callback($$v) {
          _vm.code = $$v;
        }, expression: "code" } })], 1);
  }, staticRenderFns: [],
  name: 'codebox-demo',
  components: _defineProperty$146({}, Codebox.name, Codebox),
  data: function data() {
    return {
      code: ''
    };
  }
};

function _defineProperty$147(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$26 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-codebox md-example-child-codebox-1" }, [_c('md-codebox', { attrs: { "mask": true, "maxlength": 6 }, model: { value: _vm.code, callback: function callback($$v) {
          _vm.code = $$v;
        }, expression: "code" } })], 1);
  }, staticRenderFns: [],
  name: 'codebox-demo',
  /* DELETE */
  title: '掩码遮蔽',
  titleEnUS: 'Character mask',
  /* DELETE */
  components: _defineProperty$147({}, Codebox.name, Codebox),
  data: function data() {
    return {
      code: ''
    };
  }
};

function _defineProperty$148(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$23 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-codebox md-example-child-codebox-2" }, [_c('md-codebox', { attrs: { "maxlength": -1 }, model: { value: _vm.code, callback: function callback($$v) {
          _vm.code = $$v;
        }, expression: "code" } })], 1);
  }, staticRenderFns: [],
  name: 'codebox-demo',
  /* DELETE */
  title: '不限长度',
  titleEnUS: 'Unlimited length',
  /* DELETE */
  components: _defineProperty$148({}, Codebox.name, Codebox),
  data: function data() {
    return {
      code: ''
    };
  }
};

function _defineProperty$149(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo3$17 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-codebox md-example-child-codebox-3" }, [_c('md-codebox', { attrs: { "maxlength": -1, "system": "" }, model: { value: _vm.code, callback: function callback($$v) {
          _vm.code = $$v;
        }, expression: "code" } })], 1);
  }, staticRenderFns: [],
  name: 'codebox-demo',
  /* DELETE */
  title: '系统键盘',
  titleEnUS: 'System keyboard',
  /* DELETE */
  components: _defineProperty$149({}, Codebox.name, Codebox),
  data: function data() {
    return {
      code: ''
    };
  }
};

var _extends$31 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$33 = _extends$31({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example codebox" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('codebox', [Demo0$30, Demo1$26, Demo2$23, Demo3$17]));

var _components$60;

function _defineProperty$150(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$31 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-child-cashier" }, [_c('md-field', { attrs: { "title": "支付结果" } }, [_c('md-radio', { attrs: { "options": _vm.cashierResults }, model: { value: _vm.cashierResult, callback: function callback($$v) {
          _vm.cashierResult = $$v;
        }, expression: "cashierResult" } })], 1), _vm._v(" "), _c('md-field', { attrs: { "title": "支付配置" } }, [_c('md-input-item', { attrs: { "title": "支付金额", "align": "right", "type": "money" }, model: { value: _vm.cashierAmount, callback: function callback($$v) {
          _vm.cashierAmount = $$v;
        }, expression: "cashierAmount" } }), _vm._v(" "), _c('md-field-item', { attrs: { "title": "发送验证码", "align": "right" } }, [_c('md-switch', { model: { value: _vm.isCashierCaptcha, callback: function callback($$v) {
          _vm.isCashierCaptcha = $$v;
        }, expression: "isCashierCaptcha" } })], 1)], 1), _vm._v(" "), _c('md-button', { on: { "click": function click($event) {
          _vm.isCashierhow = !_vm.isCashierhow;
        } } }, [_vm._v(_vm._s(_vm.isCashierhow ? '收起收银台' : '唤起收银台'))]), _vm._v(" "), _c('md-cashier', { ref: "cashier", attrs: { "channels": _vm.cashierChannels, "payment-amount": _vm.cashierAmount, "payment-describe": "关于支付金额的特殊说明" }, on: { "select": _vm.onCashierSelect, "pay": _vm.onCashierPay, "cancel": _vm.onCashierCancel }, model: { value: _vm.isCashierhow, callback: function callback($$v) {
          _vm.isCashierhow = $$v;
        }, expression: "isCashierhow" } })], 1);
  }, staticRenderFns: [],
  name: 'cashier-demo',
  /* DELETE */
  height: 700,
  /* DELETE */
  components: (_components$60 = {}, _defineProperty$150(_components$60, Button.name, Button), _defineProperty$150(_components$60, Radio.name, Radio), _defineProperty$150(_components$60, Field.name, Field), _defineProperty$150(_components$60, FieldItem.name, FieldItem), _defineProperty$150(_components$60, InputItem.name, InputItem), _defineProperty$150(_components$60, Switch.name, Switch), _defineProperty$150(_components$60, Cashier.name, Cashier), _components$60),
  data: function data() {
    return {
      isCashierhow: false,
      isCashierCaptcha: false,
      cashierAmount: '100.00',
      cashierResult: 'success',
      cashierResults: [{
        text: '支付成功',
        value: 'success'
      }, {
        text: '支付失败',
        value: 'fail'
      }],
      cashierChannels: [{
        icon: 'cashier-icon-1',
        text: '招商银行储蓄卡(0056)支付',
        value: '001'
      }, {
        icon: 'cashier-icon-2',
        text: '支付宝支付',
        value: '002'
      }, {
        icon: 'cashier-icon-3',
        text: '微信支付',
        value: '003'
      }, {
        icon: 'cashier-icon-4',
        text: 'QQ钱包支付',
        value: '004'
      }, {
        icon: 'cashier-icon-5',
        text: '一网通支付',
        value: '005'
      }]
    };
  },

  computed: {
    cashier: function cashier() {
      return this.$refs.cashier;
    }
  },
  methods: {
    doPay: function doPay() {
      var _this = this;

      if (this.isCashierCaptcha) {
        this.cashier.next('captcha', {
          text: 'Verification code sent to 156 **** 8965',
          autoCountdown: false,
          countNormalText: 'Send Verification code',
          countActiveText: 'Retransmission after {$1}s',
          onSend: function onSend(countdown) {
            console.log('[Mand Mobile] Send Captcha');
            _this.sendCaptcha().then(function () {
              countdown();
            });
          },
          onSubmit: function onSubmit(code) {
            console.log('[Mand Mobile] Send Submit ' + code);
            _this.checkCaptcha(code).then(function (res) {
              if (res) {
                _this.createPay().then(function () {
                  _this.cashier.next(_this.cashierResult);
                });
              }
            });
          }
        });
      } else {
        this.createPay().then(function () {
          _this.cashier.next(_this.cashierResult, {
            buttonText: '好的',
            handler: function handler() {
              Toast.info(_this.cashierResult + '\u70B9\u51FB');
            }
          });
        });
      }
    },

    // Create a pay request & check pay result
    createPay: function createPay() {
      var _this2 = this;

      this.cashier.next('loading');
      return new Promise(function (resolve) {
        _this2.timer = setTimeout(function () {
          resolve();
        }, 3000);
      });
    },

    // Create a captcha sending request
    sendCaptcha: function sendCaptcha() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.timer = setTimeout(function () {
          resolve();
        }, 200);
      });
    },

    // Create a captcha checking request
    checkCaptcha: function checkCaptcha(code) {
      var _this4 = this;

      return new Promise(function (resolve) {
        _this4.timer = setTimeout(function () {
          resolve(!!code);
        }, 200);
      });
    },
    onCashierSelect: function onCashierSelect(item) {
      console.log('[Mand Mobile] Select ' + JSON.stringify(item));
    },
    onCashierPay: function onCashierPay(item) {
      console.log('[Mand Mobile] Pay ' + JSON.stringify(item));
      this.doPay();
    },
    onCashierCancel: function onCashierCancel() {
      // Abort pay request or checking request
      this.timer && clearTimeout(this.timer);
    }
  }
};

var _extends$32 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$34 = _extends$32({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example cashier" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('cashier', [Demo0$31]));

function _defineProperty$151(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo0$32 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-chart-child" }, [_c('md-chart', { attrs: { "size": ['7rem', '4rem'], "max": 60, "min": 0, "step": 10, "lines": 5, "format": _vm.format, "labels": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], "datasets": [{
          color: '#5e64ff',
          width: 1,
          values: [8, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52]
        }, {
          width: 1,
          values: [10, 20, 25, 30, 28, 35, 38, 42, 40, 40, 45, 42, 45]
        }] } })], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-001f38c1',
  name: 'chart-demo',
  /* DELETE */
  title: '多折线',
  titleEnUS: 'Multiple fold lines',
  describe: '',
  /* DELETE */
  components: _defineProperty$151({}, Chart.name, Chart),
  methods: {
    format: function format(val) {
      return val + '%';
    }
  }
};

function _defineProperty$152(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo1$27 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-chart-child" }, [_c('md-chart', { attrs: { "size": ['7rem', '4rem'], "max": 60, "min": 0, "step": 10, "lines": 5, "format": _vm.format, "labels": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], "datasets": [{
          color: '#5e64ff',
          width: 1,
          theme: 'heat',
          values: [8, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52]
        }] } })], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-002d5042',
  name: 'chart-demo',
  /* DELETE */
  title: '渐变折线',
  titleEnUS: 'Gradient fold line',
  describe: '',
  /* DELETE */
  components: _defineProperty$152({}, Chart.name, Chart),
  methods: {
    format: function format(val) {
      return val + '%';
    }
  }
};

function _defineProperty$153(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Demo2$24 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example-child md-example-chart-child" }, [_c('md-chart', { attrs: { "size": ['7rem', '4rem'], "max": 60, "min": 0, "step": 10, "lines": 5, "format": _vm.format, "labels": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], "datasets": [{
          color: '#5e64ff',
          width: 1,
          theme: 'region',
          values: [8, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52]
        }] } })], 1);
  }, staticRenderFns: [], _scopeId: 'data-v-003b67c3',
  name: 'chart-demo',
  /* DELETE */
  title: '区域填充',
  titleEnUS: 'Area fill',
  describe: '',
  /* DELETE */
  components: _defineProperty$153({}, Chart.name, Chart),
  methods: {
    format: function format(val) {
      return val + '%';
    }
  }
};

var _extends$33 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index$35 = _extends$33({ render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "md-example chart" }, _vm._l(_vm.demos, function (demo, index) {
      return _c('section', { key: index, staticClass: "md-example-section" }, [_c('div', { staticClass: "md-example-title", domProps: { "innerHTML": _vm._s(demo.title || '基础') } }), _vm._v(" "), _c('div', { staticClass: "md-example-describe", domProps: { "innerHTML": _vm._s(demo.describe) } }), _vm._v(" "), _c('div', { staticClass: "md-example-content" }, [_c(demo, { tag: "component" })], 1)]);
    }));
  }, staticRenderFns: [] }, createDemoModule('chart', [Demo0$32, Demo1$27, Demo2$24]));

/* @init<%export {default as ${componentNameUpper}} = '../components/${componentName}/demo' */

var demo = Object.freeze({
	Home: home_indemand,
	Category: category,
	Button: index$2,
	Icon: index$3,
	Popup: index$4,
	ActionBar: index$5,
	DropMenu: index$6,
	Picker: index$7,
	TabBar: index$8,
	Swiper: index$9,
	Toast: index$10,
	Dialog: index$11,
	Tip: index$12,
	Tabs: index$13,
	Tag: index$14,
	InputItem: index$15,
	NumberKeyboard: index$16,
	Stepper: index$17,
	Steps: index$18,
	NoticeBar: index$19,
	ResultPage: index$20,
	ActionSheet: index$21,
	Selector: index$22,
	Landscape: index$23,
	ImageViewer: index$24,
	ImageReader: index$25,
	TabPicker: index$26,
	Field: index$27,
	Switch: index$28,
	Agree: index$29,
	Radio: index$30,
	DatePicker: index$31,
	Captcha: index$32,
	Codebox: index$33,
	Cashier: index$34,
	Chart: index$35
});

var traverseComponents = function traverseComponents(data, fn) {
  data.map(function (item) {
    return item.list && item.list.map(function (subItem) {
      return fn(subItem);
    });
  });
};

var registerRoute = function registerRoute(components$$1) {
  var routes = [];
  traverseComponents(components$$1, function (component) {
    routes.push({
      name: component.name,
      path: component.path,
      // require(`../components${component.path}/demo`).default
      component: demo[component.name] || {},
      meta: {
        title: component.name || '',
        description: component.text || ''
      }
    });
  });
  return routes;
};

var routes = registerRoute(components);

routes.push({
  path: '/home',
  component: home_indemand
});
routes.push({
  path: '/category',
  component: category
});
routes.push({
  path: '/',
  redirect: '/home'
});

(function (window, document) {

  function resize() {
    var ww = window.innerWidth;
    if (ww > window.screen.width) {
      window.requestAnimationFrame(resize);
    } else {
      if (ww > 720) {
        ww = 720;
      }
      document.documentElement.style.fontSize = ww * 0.13333333333333333 + 'px';
      document.body.style.opacity = 1;
    }
  }

  if (document.readyState !== 'loading') {
    resize();
  } else {
    document.addEventListener('DOMContentLoaded', resize);
  }

  window.addEventListener('resize', resize);
})(window, document);

var App = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mand" }, [_vm.isHome ? [_c('router-view')] : [_c('div', { staticClass: "md-nav" }, [_c('p', { staticClass: "home", on: { "click": _vm.goToCategory } }, [_c('i'), _c('i'), _c('i')]), _vm._v(" "), _c('p', { staticClass: "name", domProps: { "textContent": _vm._s(_vm.navTitle) } }), _vm._v(" "), _c('p', { staticClass: "name-zh", domProps: { "textContent": _vm._s(_vm.navSubTitle) } })]), _vm._v(" "), _c('div', { staticClass: "md-example-wrapper" }, [_c('router-view')], 1)]], 2);
  }, staticRenderFns: [],
  name: 'app',
  computed: {
    navTitle: function navTitle() {
      return this.$route.name;
    },
    navSubTitle: function navSubTitle() {
      return this.$route.meta.description;
    },
    isHome: function isHome() {
      var path = this.$route.path;
      return path === '/' || path === '/home' || path === '/category';
    }
  },
  methods: {
    goToCategory: function goToCategory() {
      this.$router.push('/category');
    }
  }
};

var css$2 = "";
styleInject(css$2);

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fastclick = createCommonjsModule(function (module) {
	(function () {
		function FastClick(layer, options) {
			var oldOnClick;

			options = options || {};

			/**
    * Whether a click is currently being tracked.
    *
    * @type boolean
    */
			this.trackingClick = false;

			/**
    * Timestamp for when click tracking started.
    *
    * @type number
    */
			this.trackingClickStart = 0;

			/**
    * The element being tracked for a click.
    *
    * @type EventTarget
    */
			this.targetElement = null;

			/**
    * X-coordinate of touch start event.
    *
    * @type number
    */
			this.touchStartX = 0;

			/**
    * Y-coordinate of touch start event.
    *
    * @type number
    */
			this.touchStartY = 0;

			/**
    * ID of the last touch, retrieved from Touch.identifier.
    *
    * @type number
    */
			this.lastTouchIdentifier = 0;

			/**
    * Touchmove boundary, beyond which a click will be cancelled.
    *
    * @type number
    */
			this.touchBoundary = options.touchBoundary || 10;

			/**
    * The FastClick layer.
    *
    * @type Element
    */
			this.layer = layer;

			/**
    * The minimum time between tap(touchstart and touchend) events
    *
    * @type number
    */
			this.tapDelay = options.tapDelay || 200;

			/**
    * The maximum time for a tap
    *
    * @type number
    */
			this.tapTimeout = options.tapTimeout || 700;

			if (FastClick.notNeeded(layer)) {
				return;
			}

			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function () {
					return method.apply(context, arguments);
				};
			}

			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}

			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}

			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);

			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function (type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};

				layer.addEventListener = function (type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}

			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {

				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function (event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}

		/**
  * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
  *
  * @type boolean
  */
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

		/**
   * Android requires exceptions.
   *
   * @type boolean
   */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

		/**
   * iOS requires exceptions.
   *
   * @type boolean
   */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

		/**
   * iOS 4 requires an exception for select elements.
   *
   * @type boolean
   */
		var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

		/**
   * iOS 6.0-7.* requires the target element to be manually derived
   *
   * @type boolean
   */
		var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

		/**
   * BlackBerry requires exceptions.
   *
   * @type boolean
   */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

		/**
   * Determine whether a given element requires a native click.
   *
   * @param {EventTarget|Element} target Target DOM element
   * @returns {boolean} Returns true if the element needs a native click
   */
		FastClick.prototype.needsClick = function (target) {
			switch (target.nodeName.toLowerCase()) {

				// Don't send a synthetic click to disabled inputs (issue #62)
				case 'button':
				case 'select':
				case 'textarea':
					if (target.disabled) {
						return true;
					}

					break;
				case 'input':

					// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
					if (deviceIsIOS && target.type === 'file' || target.disabled) {
						return true;
					}

					break;
				case 'label':
				case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
				case 'video':
					return true;
			}

			return (/\bneedsclick\b/.test(target.className)
			);
		};

		/**
   * Determine whether a given element requires a call to focus to simulate click into element.
   *
   * @param {EventTarget|Element} target Target DOM element
   * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
   */
		FastClick.prototype.needsFocus = function (target) {
			switch (target.nodeName.toLowerCase()) {
				case 'textarea':
					return true;
				case 'select':
					return !deviceIsAndroid;
				case 'input':
					switch (target.type) {
						case 'button':
						case 'checkbox':
						case 'file':
						case 'image':
						case 'radio':
						case 'submit':
							return false;
					}

					// No point in attempting to focus disabled inputs
					return !target.disabled && !target.readOnly;
				default:
					return (/\bneedsfocus\b/.test(target.className)
					);
			}
		};

		/**
   * Send a click event to the specified element.
   *
   * @param {EventTarget|Element} targetElement
   * @param {Event} event
   */
		FastClick.prototype.sendClick = function (targetElement, event) {
			var clickEvent, touch;

			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}

			touch = event.changedTouches[0];

			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};

		FastClick.prototype.determineEventType = function (targetElement) {

			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}

			return 'click';
		};

		/**
   * @param {EventTarget|Element} targetElement
   */
		FastClick.prototype.focus = function (targetElement) {
			var length;

			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};

		/**
   * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
   *
   * @param {EventTarget|Element} targetElement
   */
		FastClick.prototype.updateScrollParent = function (targetElement) {
			var scrollParent, parentElement;

			scrollParent = targetElement.fastClickScrollParent;

			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}

					parentElement = parentElement.parentElement;
				} while (parentElement);
			}

			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};

		/**
   * @param {EventTarget} targetElement
   * @returns {Element|EventTarget}
   */
		FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}

			return eventTarget;
		};

		/**
   * On touch start, record the position and scroll offset.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onTouchStart = function (event) {
			var targetElement, touch, selection;

			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}

			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];

			if (deviceIsIOS) {

				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}

				if (!deviceIsIOS4) {

					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}

					this.lastTouchIdentifier = touch.identifier;

					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}

			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;

			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;

			// Prevent phantom clicks on fast double-tap (issue #36)
			if (event.timeStamp - this.lastClickTime < this.tapDelay) {
				event.preventDefault();
			}

			return true;
		};

		/**
   * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.touchHasMoved = function (event) {
			var touch = event.changedTouches[0],
			    boundary = this.touchBoundary;

			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}

			return false;
		};

		/**
   * Update the last position.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onTouchMove = function (event) {
			if (!this.trackingClick) {
				return true;
			}

			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}

			return true;
		};

		/**
   * Attempt to find the labelled control for the given label element.
   *
   * @param {EventTarget|HTMLLabelElement} labelElement
   * @returns {Element|null}
   */
		FastClick.prototype.findControl = function (labelElement) {

			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}

			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}

			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};

		/**
   * On touch end, determine whether to send a click event at once.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onTouchEnd = function (event) {
			var forElement,
			    trackingClickStart,
			    targetTagName,
			    scrollParent,
			    touch,
			    targetElement = this.targetElement;

			if (!this.trackingClick) {
				return true;
			}

			// Prevent phantom clicks on fast double-tap (issue #36)
			if (event.timeStamp - this.lastClickTime < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}

			if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
				return true;
			}

			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;

			this.lastClickTime = event.timeStamp;

			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;

			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];

				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}

			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}

					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {

				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
					this.targetElement = null;
					return false;
				}

				this.focus(targetElement);
				this.sendClick(targetElement, event);

				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}

				return false;
			}

			if (deviceIsIOS && !deviceIsIOS4) {

				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}

			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}

			return false;
		};

		/**
   * On touch cancel, stop tracking the click.
   *
   * @returns {void}
   */
		FastClick.prototype.onTouchCancel = function () {
			this.trackingClick = false;
			this.targetElement = null;
		};

		/**
   * Determine mouse events which should be permitted.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onMouse = function (event) {

			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}

			if (event.forwardedTouchEvent) {
				return true;
			}

			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}

			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {

					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}

				// Cancel the event
				event.stopPropagation();
				event.preventDefault();

				return false;
			}

			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};

		/**
   * On actual clicks, determine whether this is a touch-generated click, a click action occurring
   * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
   * an actual click which should be permitted.
   *
   * @param {Event} event
   * @returns {boolean}
   */
		FastClick.prototype.onClick = function (event) {
			var permitted;

			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}

			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}

			permitted = this.onMouse(event);

			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}

			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};

		/**
   * Remove all FastClick's event listeners.
   *
   * @returns {void}
   */
		FastClick.prototype.destroy = function () {
			var layer = this.layer;

			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}

			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};

		/**
   * Check whether FastClick is needed.
   *
   * @param {Element} layer The layer to listen on
   */
		FastClick.notNeeded = function (layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;

			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}

			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

			if (chromeVersion) {

				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}

					// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}

			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}

			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}

			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			return false;
		};

		/**
   * Factory method for creating a FastClick object
   *
   * @param {Element} layer The layer to listen on
   * @param {Object} [options={}] The options to override the defaults
   */
		FastClick.attach = function (layer, options) {
			return new FastClick(layer, options);
		};

		if (typeof undefined === 'function' && _typeof$4(undefined.amd) === 'object' && undefined.amd) {

			// AMD. Register as an anonymous module.
			undefined(function () {
				return FastClick;
			});
		} else if ('object' !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	})();
});

var fastclick_1 = fastclick.FastClick;

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
if ('ontouchstart' in window) {
  fastclick_1.attach(document.body);
}

Vue.config.productionTip = false;

Vue.use(VueRouter);

var isProd$1 = "production" === 'production';

var router = new VueRouter({
  mode: 'hash',
  base: isProd$1 ? '/mand-mobile/examples' : '',
  routes: routes
});

router.afterEach(function (route) {
  document.title = route.name ? route.name + '-Mand Mobile' : 'Mand Mobile';
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: function render(h) {
    return h(App);
  },
  router: router
});

})));
