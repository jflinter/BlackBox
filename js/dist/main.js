this["blackBoxHooks"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: addStateCallback, handleAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addStateCallback", function() { return addStateCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleAction", function() { return handleAction; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _proto_blackbox_pb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./proto/blackbox_pb */ "./proto/blackbox_pb.js");
/* harmony import */ var _proto_blackbox_pb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_proto_blackbox_pb__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var google_protobuf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! google-protobuf */ "./node_modules/google-protobuf/google-protobuf.js");
/* harmony import */ var google_protobuf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(google_protobuf__WEBPACK_IMPORTED_MODULE_2__);




let initialState = new _proto_blackbox_pb__WEBPACK_IMPORTED_MODULE_1__["State"]()

function reducer(state = initialState, action) {
  switch (action.type) {
    case _proto_blackbox_pb__WEBPACK_IMPORTED_MODULE_1__["Action"].TypeCase.SEND_MESSAGE:
      console.log('hello');
      state.addMessages(action.sendMessage)
      return state
  }
  return state
}

const protoMiddleware = store => next => action => {
  const isProto = (obj) => { return obj instanceof google_protobuf__WEBPACK_IMPORTED_MODULE_2__["Message"] }
  if (isProto(action)) {
    return next({
      ...action.toObject(),
      type: action.getTypeCase()
    })
  } else {
    return next(action)
  }
}

let store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer, Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(protoMiddleware))

// later: loadInitialState

function addStateCallback(fn) {
  store.subscribe(() => fn(store.getState().serializeBinary()))
}

function handleAction(bytes) {
  store.dispatch(_proto_blackbox_pb__WEBPACK_IMPORTED_MODULE_1__["Action"].deserializeBinary(bytes))
}

store.subscribe(() => console.log(store.getState()))

function tmpSendMessage(text) {
  const make = (obj, fn) => {fn(obj); return obj}
  let action = make(new _proto_blackbox_pb__WEBPACK_IMPORTED_MODULE_1__["Action"](), (a) => {
    a.setSendMessage(text)
  })
  store.dispatch(action)
}

tmpSendMessage("1")
tmpSendMessage("2")
tmpSendMessage("3")

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/buffer/node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/buffer/node_modules/isarray/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/buffer/node_modules/isarray/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/google-protobuf/google-protobuf.js":
/*!*********************************************************!*\
  !*** ./node_modules/google-protobuf/google-protobuf.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, Buffer) {var $jscomp={scope:{},getGlobal:function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global?global:a}};$jscomp.global=$jscomp.getGlobal(this);$jscomp.initSymbol=function(){$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol);$jscomp.initSymbol=function(){}};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return"jscomp_symbol_"+a+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();$jscomp.global.Symbol.iterator||($jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));$jscomp.initSymbolIterator=function(){}};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();$jscomp.initSymbol();$jscomp.initSymbolIterator();var b=a[Symbol.iterator];if(b)return b.call(a);var c=0;return{next:function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}}};
$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};$jscomp.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]};$jscomp.array=$jscomp.array||{};
$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};$jscomp.initSymbol();$jscomp.initSymbolIterator();d[Symbol.iterator]=function(){return d};return d};
$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};
$jscomp.array.from=function(a,b,c){$jscomp.initSymbolIterator();b=null!=b?b:function(a){return a};var d=[];$jscomp.initSymbol();$jscomp.initSymbolIterator();var e=a[Symbol.iterator];"function"==typeof e&&(a=e.call(a));if("function"==typeof a.next)for(;!(e=a.next()).done;)d.push(b.call(c,e.value));else for(var e=a.length,f=0;f<e;f++)d.push(b.call(c,a[f]));return d};$jscomp.array.of=function(a){return $jscomp.array.from(arguments)};
$jscomp.array.entries=function(){return $jscomp.iteratorFromArray(this,function(a,b){return[a,b]})};$jscomp.array.installHelper_=function(a,b){!Array.prototype[a]&&Object.defineProperties&&Object.defineProperty&&Object.defineProperty(Array.prototype,a,{configurable:!0,enumerable:!1,writable:!0,value:b})};$jscomp.array.entries$install=function(){$jscomp.array.installHelper_("entries",$jscomp.array.entries)};$jscomp.array.keys=function(){return $jscomp.iteratorFromArray(this,function(a){return a})};
$jscomp.array.keys$install=function(){$jscomp.array.installHelper_("keys",$jscomp.array.keys)};$jscomp.array.values=function(){return $jscomp.iteratorFromArray(this,function(a,b){return b})};$jscomp.array.values$install=function(){$jscomp.array.installHelper_("values",$jscomp.array.values)};
$jscomp.array.copyWithin=function(a,b,c){var d=this.length;a=Number(a);b=Number(b);c=Number(null!=c?c:d);if(a<b)for(c=Math.min(c,d);b<c;)b in this?this[a++]=this[b++]:(delete this[a++],b++);else for(c=Math.min(c,d+b-a),a+=c-b;c>b;)--c in this?this[--a]=this[c]:delete this[a];return this};$jscomp.array.copyWithin$install=function(){$jscomp.array.installHelper_("copyWithin",$jscomp.array.copyWithin)};
$jscomp.array.fill=function(a,b,c){var d=this.length||0;0>b&&(b=Math.max(0,d+b));if(null==c||c>d)c=d;c=Number(c);0>c&&(c=Math.max(0,d+c));for(b=Number(b||0);b<c;b++)this[b]=a;return this};$jscomp.array.fill$install=function(){$jscomp.array.installHelper_("fill",$jscomp.array.fill)};$jscomp.array.find=function(a,b){return $jscomp.findInternal(this,a,b).v};$jscomp.array.find$install=function(){$jscomp.array.installHelper_("find",$jscomp.array.find)};
$jscomp.array.findIndex=function(a,b){return $jscomp.findInternal(this,a,b).i};$jscomp.array.findIndex$install=function(){$jscomp.array.installHelper_("findIndex",$jscomp.array.findIndex)};$jscomp.ASSUME_NO_NATIVE_MAP=!1;
$jscomp.Map$isConformant=function(){if($jscomp.ASSUME_NO_NATIVE_MAP)return!1;var a=$jscomp.global.Map;if(!a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var b=Object.seal({x:4}),c=new a($jscomp.makeIterator([[b,"s"]]));if("s"!=c.get(b)||1!=c.size||c.get({x:4})||c.set({x:4},"t")!=c||2!=c.size)return!1;var d=c.entries(),e=d.next();if(e.done||e.value[0]!=b||"s"!=e.value[1])return!1;e=d.next();return e.done||4!=e.value[0].x||"t"!=e.value[1]||!d.next().done?!1:!0}catch(f){return!1}};
$jscomp.Map=function(a){this.data_={};this.head_=$jscomp.Map.createHead();this.size=0;if(a){a=$jscomp.makeIterator(a);for(var b;!(b=a.next()).done;)b=b.value,this.set(b[0],b[1])}};
$jscomp.Map.prototype.set=function(a,b){var c=$jscomp.Map.maybeGetEntry(this,a);c.list||(c.list=this.data_[c.id]=[]);c.entry?c.entry.value=b:(c.entry={next:this.head_,previous:this.head_.previous,head:this.head_,key:a,value:b},c.list.push(c.entry),this.head_.previous.next=c.entry,this.head_.previous=c.entry,this.size++);return this};
$jscomp.Map.prototype["delete"]=function(a){a=$jscomp.Map.maybeGetEntry(this,a);return a.entry&&a.list?(a.list.splice(a.index,1),a.list.length||delete this.data_[a.id],a.entry.previous.next=a.entry.next,a.entry.next.previous=a.entry.previous,a.entry.head=null,this.size--,!0):!1};$jscomp.Map.prototype.clear=function(){this.data_={};this.head_=this.head_.previous=$jscomp.Map.createHead();this.size=0};$jscomp.Map.prototype.has=function(a){return!!$jscomp.Map.maybeGetEntry(this,a).entry};
$jscomp.Map.prototype.get=function(a){return(a=$jscomp.Map.maybeGetEntry(this,a).entry)&&a.value};$jscomp.Map.prototype.entries=function(){return $jscomp.Map.makeIterator_(this,function(a){return[a.key,a.value]})};$jscomp.Map.prototype.keys=function(){return $jscomp.Map.makeIterator_(this,function(a){return a.key})};$jscomp.Map.prototype.values=function(){return $jscomp.Map.makeIterator_(this,function(a){return a.value})};
$jscomp.Map.prototype.forEach=function(a,b){for(var c=this.entries(),d;!(d=c.next()).done;)d=d.value,a.call(b,d[1],d[0],this)};$jscomp.Map.maybeGetEntry=function(a,b){var c=$jscomp.Map.getId(b),d=a.data_[c];if(d&&Object.prototype.hasOwnProperty.call(a.data_,c))for(var e=0;e<d.length;e++){var f=d[e];if(b!==b&&f.key!==f.key||b===f.key)return{id:c,list:d,index:e,entry:f}}return{id:c,list:d,index:-1,entry:void 0}};
$jscomp.Map.makeIterator_=function(a,b){var c=a.head_,d={next:function(){if(c){for(;c.head!=a.head_;)c=c.previous;for(;c.next!=c.head;)return c=c.next,{done:!1,value:b(c)};c=null}return{done:!0,value:void 0}}};$jscomp.initSymbol();$jscomp.initSymbolIterator();d[Symbol.iterator]=function(){return d};return d};$jscomp.Map.mapIndex_=0;$jscomp.Map.createHead=function(){var a={};return a.previous=a.next=a.head=a};
$jscomp.Map.getId=function(a){if(!(a instanceof Object))return"p_"+a;if(!($jscomp.Map.idKey in a))try{$jscomp.Map.defineProperty(a,$jscomp.Map.idKey,{value:++$jscomp.Map.mapIndex_})}catch(b){}return $jscomp.Map.idKey in a?a[$jscomp.Map.idKey]:"o_ "+a};$jscomp.Map.defineProperty=Object.defineProperty?function(a,b,c){Object.defineProperty(a,b,{value:String(c)})}:function(a,b,c){a[b]=String(c)};$jscomp.Map.Entry=function(){};
$jscomp.Map$install=function(){$jscomp.initSymbol();$jscomp.initSymbolIterator();$jscomp.Map$isConformant()?$jscomp.Map=$jscomp.global.Map:($jscomp.initSymbol(),$jscomp.initSymbolIterator(),$jscomp.Map.prototype[Symbol.iterator]=$jscomp.Map.prototype.entries,$jscomp.initSymbol(),$jscomp.Map.idKey=Symbol("map-id-key"),$jscomp.Map$install=function(){})};$jscomp.math=$jscomp.math||{};
$jscomp.math.clz32=function(a){a=Number(a)>>>0;if(0===a)return 32;var b=0;0===(a&4294901760)&&(a<<=16,b+=16);0===(a&4278190080)&&(a<<=8,b+=8);0===(a&4026531840)&&(a<<=4,b+=4);0===(a&3221225472)&&(a<<=2,b+=2);0===(a&2147483648)&&b++;return b};$jscomp.math.imul=function(a,b){a=Number(a);b=Number(b);var c=a&65535,d=b&65535;return c*d+((a>>>16&65535)*d+c*(b>>>16&65535)<<16>>>0)|0};$jscomp.math.sign=function(a){a=Number(a);return 0===a||isNaN(a)?a:0<a?1:-1};
$jscomp.math.log10=function(a){return Math.log(a)/Math.LN10};$jscomp.math.log2=function(a){return Math.log(a)/Math.LN2};$jscomp.math.log1p=function(a){a=Number(a);if(.25>a&&-.25<a){for(var b=a,c=1,d=a,e=0,f=1;e!=d;)b*=a,f*=-1,d=(e=d)+f*b/++c;return d}return Math.log(1+a)};$jscomp.math.expm1=function(a){a=Number(a);if(.25>a&&-.25<a){for(var b=a,c=1,d=a,e=0;e!=d;)b*=a/++c,d=(e=d)+b;return d}return Math.exp(a)-1};$jscomp.math.cosh=function(a){a=Number(a);return(Math.exp(a)+Math.exp(-a))/2};
$jscomp.math.sinh=function(a){a=Number(a);return 0===a?a:(Math.exp(a)-Math.exp(-a))/2};$jscomp.math.tanh=function(a){a=Number(a);if(0===a)return a;var b=Math.exp(-2*Math.abs(a)),b=(1-b)/(1+b);return 0>a?-b:b};$jscomp.math.acosh=function(a){a=Number(a);return Math.log(a+Math.sqrt(a*a-1))};$jscomp.math.asinh=function(a){a=Number(a);if(0===a)return a;var b=Math.log(Math.abs(a)+Math.sqrt(a*a+1));return 0>a?-b:b};
$jscomp.math.atanh=function(a){a=Number(a);return($jscomp.math.log1p(a)-$jscomp.math.log1p(-a))/2};$jscomp.math.hypot=function(a,b,c){a=Number(a);b=Number(b);var d,e,f,g=Math.max(Math.abs(a),Math.abs(b));for(d=2;d<arguments.length;d++)g=Math.max(g,Math.abs(arguments[d]));if(1E100<g||1E-100>g){a/=g;b/=g;f=a*a+b*b;for(d=2;d<arguments.length;d++)e=Number(arguments[d])/g,f+=e*e;return Math.sqrt(f)*g}f=a*a+b*b;for(d=2;d<arguments.length;d++)e=Number(arguments[d]),f+=e*e;return Math.sqrt(f)};
$jscomp.math.trunc=function(a){a=Number(a);if(isNaN(a)||Infinity===a||-Infinity===a||0===a)return a;var b=Math.floor(Math.abs(a));return 0>a?-b:b};$jscomp.math.cbrt=function(a){if(0===a)return a;a=Number(a);var b=Math.pow(Math.abs(a),1/3);return 0>a?-b:b};$jscomp.number=$jscomp.number||{};$jscomp.number.isFinite=function(a){return"number"!==typeof a?!1:!isNaN(a)&&Infinity!==a&&-Infinity!==a};$jscomp.number.isInteger=function(a){return $jscomp.number.isFinite(a)?a===Math.floor(a):!1};
$jscomp.number.isNaN=function(a){return"number"===typeof a&&isNaN(a)};$jscomp.number.isSafeInteger=function(a){return $jscomp.number.isInteger(a)&&Math.abs(a)<=$jscomp.number.MAX_SAFE_INTEGER};$jscomp.number.EPSILON=function(){return Math.pow(2,-52)}();$jscomp.number.MAX_SAFE_INTEGER=function(){return 9007199254740991}();$jscomp.number.MIN_SAFE_INTEGER=function(){return-9007199254740991}();$jscomp.object=$jscomp.object||{};
$jscomp.object.assign=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)Object.prototype.hasOwnProperty.call(d,e)&&(a[e]=d[e])}return a};$jscomp.object.is=function(a,b){return a===b?0!==a||1/a===1/b:a!==a&&b!==b};$jscomp.ASSUME_NO_NATIVE_SET=!1;
$jscomp.Set$isConformant=function(){if($jscomp.ASSUME_NO_NATIVE_SET)return!1;var a=$jscomp.global.Set;if(!a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var b=Object.seal({x:4}),c=new a($jscomp.makeIterator([b]));if(!c.has(b)||1!=c.size||c.add(b)!=c||1!=c.size||c.add({x:4})!=c||2!=c.size)return!1;var d=c.entries(),e=d.next();if(e.done||e.value[0]!=b||e.value[1]!=b)return!1;e=d.next();return e.done||e.value[0]==b||4!=e.value[0].x||e.value[1]!=e.value[0]?!1:d.next().done}catch(f){return!1}};
$jscomp.Set=function(a){this.map_=new $jscomp.Map;if(a){a=$jscomp.makeIterator(a);for(var b;!(b=a.next()).done;)this.add(b.value)}this.size=this.map_.size};$jscomp.Set.prototype.add=function(a){this.map_.set(a,a);this.size=this.map_.size;return this};$jscomp.Set.prototype["delete"]=function(a){a=this.map_["delete"](a);this.size=this.map_.size;return a};$jscomp.Set.prototype.clear=function(){this.map_.clear();this.size=0};$jscomp.Set.prototype.has=function(a){return this.map_.has(a)};
$jscomp.Set.prototype.entries=function(){return this.map_.entries()};$jscomp.Set.prototype.values=function(){return this.map_.values()};$jscomp.Set.prototype.forEach=function(a,b){var c=this;this.map_.forEach(function(d){return a.call(b,d,d,c)})};$jscomp.Set$install=function(){$jscomp.Map$install();$jscomp.Set$isConformant()?$jscomp.Set=$jscomp.global.Set:($jscomp.initSymbol(),$jscomp.initSymbolIterator(),$jscomp.Set.prototype[Symbol.iterator]=$jscomp.Set.prototype.values,$jscomp.Set$install=function(){})};
$jscomp.string=$jscomp.string||{};$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};
$jscomp.string.fromCodePoint=function(a){for(var b="",c=0;c<arguments.length;c++){var d=Number(arguments[c]);if(0>d||1114111<d||d!==Math.floor(d))throw new RangeError("invalid_code_point "+d);65535>=d?b+=String.fromCharCode(d):(d-=65536,b+=String.fromCharCode(d>>>10&1023|55296),b+=String.fromCharCode(d&1023|56320))}return b};
$jscomp.string.repeat=function(a){var b=$jscomp.checkStringArgs(this,null,"repeat");if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var c="";a;)if(a&1&&(c+=b),a>>>=1)b+=b;return c};$jscomp.string.repeat$install=function(){String.prototype.repeat||(String.prototype.repeat=$jscomp.string.repeat)};
$jscomp.string.codePointAt=function(a){var b=$jscomp.checkStringArgs(this,null,"codePointAt"),c=b.length;a=Number(a)||0;if(0<=a&&a<c){a|=0;var d=b.charCodeAt(a);if(55296>d||56319<d||a+1===c)return d;a=b.charCodeAt(a+1);return 56320>a||57343<a?d:1024*(d-55296)+a+9216}};$jscomp.string.codePointAt$install=function(){String.prototype.codePointAt||(String.prototype.codePointAt=$jscomp.string.codePointAt)};
$jscomp.string.includes=function(a,b){return-1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,b||0)};$jscomp.string.includes$install=function(){String.prototype.includes||(String.prototype.includes=$jscomp.string.includes)};$jscomp.string.startsWith=function(a,b){var c=$jscomp.checkStringArgs(this,a,"startsWith");a+="";for(var d=c.length,e=a.length,f=Math.max(0,Math.min(b|0,c.length)),g=0;g<e&&f<d;)if(c[f++]!=a[g++])return!1;return g>=e};
$jscomp.string.startsWith$install=function(){String.prototype.startsWith||(String.prototype.startsWith=$jscomp.string.startsWith)};$jscomp.string.endsWith=function(a,b){var c=$jscomp.checkStringArgs(this,a,"endsWith");a+="";void 0===b&&(b=c.length);for(var d=Math.max(0,Math.min(b|0,c.length)),e=a.length;0<e&&0<d;)if(c[--d]!=a[--e])return!1;return 0>=e};$jscomp.string.endsWith$install=function(){String.prototype.endsWith||(String.prototype.endsWith=$jscomp.string.endsWith)};
var COMPILED=!0,goog=goog||{};goog.global=this;goog.isDef=function(a){return void 0!==a};goog.exportPath_=function(a,b,c){a=a.split(".");c=c||goog.global;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&goog.isDef(b)?c[d]=b:c=c[d]?c[d]:c[d]={}};
goog.define=function(a,b){var c=b;COMPILED||(goog.global.CLOSURE_UNCOMPILED_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES,a)?c=goog.global.CLOSURE_UNCOMPILED_DEFINES[a]:goog.global.CLOSURE_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES,a)&&(c=goog.global.CLOSURE_DEFINES[a]));goog.exportPath_(a,c)};goog.DEBUG=!0;goog.LOCALE="en";goog.TRUSTED_SITE=!0;goog.STRICT_MODE_COMPATIBLE=!1;goog.DISALLOW_TEST_ONLY_CODE=COMPILED&&!goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING=!1;goog.provide=function(a){if(!COMPILED&&goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');goog.constructNamespace_(a)};goog.constructNamespace_=function(a,b){if(!COMPILED){delete goog.implicitNamespaces_[a];for(var c=a;(c=c.substring(0,c.lastIndexOf(".")))&&!goog.getObjectByName(c);)goog.implicitNamespaces_[c]=!0}goog.exportPath_(a,b)};goog.VALID_MODULE_RE_=/^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module=function(a){if(!goog.isString(a)||!a||-1==a.search(goog.VALID_MODULE_RE_))throw Error("Invalid module identifier");if(!goog.isInModuleLoader_())throw Error("Module "+a+" has been loaded incorrectly.");if(goog.moduleLoaderState_.moduleName)throw Error("goog.module may only be called once per module.");goog.moduleLoaderState_.moduleName=a;if(!COMPILED){if(goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');delete goog.implicitNamespaces_[a]}};goog.module.get=function(a){return goog.module.getInternal_(a)};
goog.module.getInternal_=function(a){if(!COMPILED)return goog.isProvided_(a)?a in goog.loadedModules_?goog.loadedModules_[a]:goog.getObjectByName(a):null};goog.moduleLoaderState_=null;goog.isInModuleLoader_=function(){return null!=goog.moduleLoaderState_};
goog.module.declareLegacyNamespace=function(){if(!COMPILED&&!goog.isInModuleLoader_())throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");if(!COMPILED&&!goog.moduleLoaderState_.moduleName)throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");goog.moduleLoaderState_.declareLegacyNamespace=!0};
goog.setTestOnly=function(a){if(goog.DISALLOW_TEST_ONLY_CODE)throw a=a||"",Error("Importing test-only code into non-debug environment"+(a?": "+a:"."));};goog.forwardDeclare=function(a){};COMPILED||(goog.isProvided_=function(a){return a in goog.loadedModules_||!goog.implicitNamespaces_[a]&&goog.isDefAndNotNull(goog.getObjectByName(a))},goog.implicitNamespaces_={"goog.module":!0});
goog.getObjectByName=function(a,b){for(var c=a.split("."),d=b||goog.global,e;e=c.shift();)if(goog.isDefAndNotNull(d[e]))d=d[e];else return null;return d};goog.globalize=function(a,b){var c=b||goog.global,d;for(d in a)c[d]=a[d]};goog.addDependency=function(a,b,c,d){if(goog.DEPENDENCIES_ENABLED){var e;a=a.replace(/\\/g,"/");for(var f=goog.dependencies_,g=0;e=b[g];g++)f.nameToPath[e]=a,f.pathIsModule[a]=!!d;for(d=0;b=c[d];d++)a in f.requires||(f.requires[a]={}),f.requires[a][b]=!0}};
goog.ENABLE_DEBUG_LOADER=!0;goog.logToConsole_=function(a){goog.global.console&&goog.global.console.error(a)};goog.require=function(a){if(!COMPILED){goog.ENABLE_DEBUG_LOADER&&goog.IS_OLD_IE_&&goog.maybeProcessDeferredDep_(a);if(goog.isProvided_(a))return goog.isInModuleLoader_()?goog.module.getInternal_(a):null;if(goog.ENABLE_DEBUG_LOADER){var b=goog.getPathFromDeps_(a);if(b)return goog.writeScripts_(b),null}a="goog.require could not find: "+a;goog.logToConsole_(a);throw Error(a);}};
goog.basePath="";goog.nullFunction=function(){};goog.abstractMethod=function(){throw Error("unimplemented abstract method");};goog.addSingletonGetter=function(a){a.getInstance=function(){if(a.instance_)return a.instance_;goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=a);return a.instance_=new a}};goog.instantiatedSingletons_=[];goog.LOAD_MODULE_USING_EVAL=!0;goog.SEAL_MODULE_EXPORTS=goog.DEBUG;goog.loadedModules_={};goog.DEPENDENCIES_ENABLED=!COMPILED&&goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED&&(goog.dependencies_={pathIsModule:{},nameToPath:{},requires:{},visited:{},written:{},deferred:{}},goog.inHtmlDocument_=function(){var a=goog.global.document;return null!=a&&"write"in a},goog.findBasePath_=function(){if(goog.isDef(goog.global.CLOSURE_BASE_PATH))goog.basePath=goog.global.CLOSURE_BASE_PATH;else if(goog.inHtmlDocument_())for(var a=goog.global.document.getElementsByTagName("SCRIPT"),b=a.length-1;0<=b;--b){var c=a[b].src,d=c.lastIndexOf("?"),d=-1==d?c.length:
d;if("base.js"==c.substr(d-7,7)){goog.basePath=c.substr(0,d-7);break}}},goog.importScript_=function(a,b){(goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_)(a,b)&&(goog.dependencies_.written[a]=!0)},goog.IS_OLD_IE_=!(goog.global.atob||!goog.global.document||!goog.global.document.all),goog.importModule_=function(a){goog.importScript_("",'goog.retrieveAndExecModule_("'+a+'");')&&(goog.dependencies_.written[a]=!0)},goog.queuedModules_=[],goog.wrapModule_=function(a,b){return goog.LOAD_MODULE_USING_EVAL&&
goog.isDef(goog.global.JSON)?"goog.loadModule("+goog.global.JSON.stringify(b+"\n//# sourceURL="+a+"\n")+");":'goog.loadModule(function(exports) {"use strict";'+b+"\n;return exports});\n//# sourceURL="+a+"\n"},goog.loadQueuedModules_=function(){var a=goog.queuedModules_.length;if(0<a){var b=goog.queuedModules_;goog.queuedModules_=[];for(var c=0;c<a;c++)goog.maybeProcessDeferredPath_(b[c])}},goog.maybeProcessDeferredDep_=function(a){goog.isDeferredModule_(a)&&goog.allDepsAreAvailable_(a)&&(a=goog.getPathFromDeps_(a),
goog.maybeProcessDeferredPath_(goog.basePath+a))},goog.isDeferredModule_=function(a){return(a=goog.getPathFromDeps_(a))&&goog.dependencies_.pathIsModule[a]?goog.basePath+a in goog.dependencies_.deferred:!1},goog.allDepsAreAvailable_=function(a){if((a=goog.getPathFromDeps_(a))&&a in goog.dependencies_.requires)for(var b in goog.dependencies_.requires[a])if(!goog.isProvided_(b)&&!goog.isDeferredModule_(b))return!1;return!0},goog.maybeProcessDeferredPath_=function(a){if(a in goog.dependencies_.deferred){var b=
goog.dependencies_.deferred[a];delete goog.dependencies_.deferred[a];goog.globalEval(b)}},goog.loadModuleFromUrl=function(a){goog.retrieveAndExecModule_(a)},goog.loadModule=function(a){var b=goog.moduleLoaderState_;try{goog.moduleLoaderState_={moduleName:void 0,declareLegacyNamespace:!1};var c;if(goog.isFunction(a))c=a.call(goog.global,{});else if(goog.isString(a))c=goog.loadModuleFromSource_.call(goog.global,a);else throw Error("Invalid module definition");var d=goog.moduleLoaderState_.moduleName;
if(!goog.isString(d)||!d)throw Error('Invalid module name "'+d+'"');goog.moduleLoaderState_.declareLegacyNamespace?goog.constructNamespace_(d,c):goog.SEAL_MODULE_EXPORTS&&Object.seal&&Object.seal(c);goog.loadedModules_[d]=c}finally{goog.moduleLoaderState_=b}},goog.loadModuleFromSource_=function(a){eval(a);return{}},goog.writeScriptSrcNode_=function(a){goog.global.document.write('<script type="text/javascript" src="'+a+'">\x3c/script>')},goog.appendScriptSrcNode_=function(a){var b=goog.global.document,
c=b.createElement("script");c.type="text/javascript";c.src=a;c.defer=!1;c.async=!1;b.head.appendChild(c)},goog.writeScriptTag_=function(a,b){if(goog.inHtmlDocument_()){var c=goog.global.document;if(!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING&&"complete"==c.readyState){if(/\bdeps.js$/.test(a))return!1;throw Error('Cannot write "'+a+'" after document load');}var d=goog.IS_OLD_IE_;void 0===b?d?(d=" onreadystatechange='goog.onScriptLoad_(this, "+ ++goog.lastNonModuleScriptIndex_+")' ",c.write('<script type="text/javascript" src="'+
a+'"'+d+">\x3c/script>")):goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING?goog.appendScriptSrcNode_(a):goog.writeScriptSrcNode_(a):c.write('<script type="text/javascript">'+b+"\x3c/script>");return!0}return!1},goog.lastNonModuleScriptIndex_=0,goog.onScriptLoad_=function(a,b){"complete"==a.readyState&&goog.lastNonModuleScriptIndex_==b&&goog.loadQueuedModules_();return!0},goog.writeScripts_=function(a){function b(a){if(!(a in e.written||a in e.visited)){e.visited[a]=!0;if(a in e.requires)for(var f in e.requires[a])if(!goog.isProvided_(f))if(f in
e.nameToPath)b(e.nameToPath[f]);else throw Error("Undefined nameToPath for "+f);a in d||(d[a]=!0,c.push(a))}}var c=[],d={},e=goog.dependencies_;b(a);for(a=0;a<c.length;a++){var f=c[a];goog.dependencies_.written[f]=!0}var g=goog.moduleLoaderState_;goog.moduleLoaderState_=null;for(a=0;a<c.length;a++)if(f=c[a])e.pathIsModule[f]?goog.importModule_(goog.basePath+f):goog.importScript_(goog.basePath+f);else throw goog.moduleLoaderState_=g,Error("Undefined script input");goog.moduleLoaderState_=g},goog.getPathFromDeps_=
function(a){return a in goog.dependencies_.nameToPath?goog.dependencies_.nameToPath[a]:null},goog.findBasePath_(),goog.global.CLOSURE_NO_DEPS||goog.importScript_(goog.basePath+"deps.js"));goog.normalizePath_=function(a){a=a.split("/");for(var b=0;b<a.length;)"."==a[b]?a.splice(b,1):b&&".."==a[b]&&a[b-1]&&".."!=a[b-1]?a.splice(--b,2):b++;return a.join("/")};
goog.loadFileSync_=function(a){if(goog.global.CLOSURE_LOAD_FILE_SYNC)return goog.global.CLOSURE_LOAD_FILE_SYNC(a);var b=new goog.global.XMLHttpRequest;b.open("get",a,!1);b.send();return b.responseText};
goog.retrieveAndExecModule_=function(a){if(!COMPILED){var b=a;a=goog.normalizePath_(a);var c=goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_,d=goog.loadFileSync_(a);if(null!=d)d=goog.wrapModule_(a,d),goog.IS_OLD_IE_?(goog.dependencies_.deferred[b]=d,goog.queuedModules_.push(b)):c(a,d);else throw Error("load of "+a+"failed");}};
goog.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};goog.isNull=function(a){return null===a};goog.isDefAndNotNull=function(a){return null!=a};goog.isArray=function(a){return"array"==goog.typeOf(a)};goog.isArrayLike=function(a){var b=goog.typeOf(a);return"array"==b||"object"==b&&"number"==typeof a.length};goog.isDateLike=function(a){return goog.isObject(a)&&"function"==typeof a.getFullYear};goog.isString=function(a){return"string"==typeof a};
goog.isBoolean=function(a){return"boolean"==typeof a};goog.isNumber=function(a){return"number"==typeof a};goog.isFunction=function(a){return"function"==goog.typeOf(a)};goog.isObject=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};goog.getUid=function(a){return a[goog.UID_PROPERTY_]||(a[goog.UID_PROPERTY_]=++goog.uidCounter_)};goog.hasUid=function(a){return!!a[goog.UID_PROPERTY_]};
goog.removeUid=function(a){null!==a&&"removeAttribute"in a&&a.removeAttribute(goog.UID_PROPERTY_);try{delete a[goog.UID_PROPERTY_]}catch(b){}};goog.UID_PROPERTY_="closure_uid_"+(1E9*Math.random()>>>0);goog.uidCounter_=0;goog.getHashCode=goog.getUid;goog.removeHashCode=goog.removeUid;goog.cloneObject=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.cloneObject(a[c]);return b}return a};
goog.bindNative_=function(a,b,c){return a.call.apply(a.bind,arguments)};goog.bindJs_=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};
goog.bind=function(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bind=goog.bindNative_:goog.bind=goog.bindJs_;return goog.bind.apply(null,arguments)};goog.partial=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};goog.mixin=function(a,b){for(var c in b)a[c]=b[c]};goog.now=goog.TRUSTED_SITE&&Date.now||function(){return+new Date};
goog.globalEval=function(a){if(goog.global.execScript)goog.global.execScript(a,"JavaScript");else if(goog.global.eval){if(null==goog.evalWorksForGlobals_)if(goog.global.eval("var _evalTest_ = 1;"),"undefined"!=typeof goog.global._evalTest_){try{delete goog.global._evalTest_}catch(d){}goog.evalWorksForGlobals_=!0}else goog.evalWorksForGlobals_=!1;if(goog.evalWorksForGlobals_)goog.global.eval(a);else{var b=goog.global.document,c=b.createElement("SCRIPT");c.type="text/javascript";c.defer=!1;c.appendChild(b.createTextNode(a));
b.body.appendChild(c);b.body.removeChild(c)}}else throw Error("goog.globalEval not available");};goog.evalWorksForGlobals_=null;goog.getCssName=function(a,b){var c=function(a){return goog.cssNameMapping_[a]||a},d=function(a){a=a.split("-");for(var b=[],d=0;d<a.length;d++)b.push(c(a[d]));return b.join("-")},d=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?c:d:function(a){return a};return b?a+"-"+d(b):d(a)};
goog.setCssNameMapping=function(a,b){goog.cssNameMapping_=a;goog.cssNameMappingStyle_=b};!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING&&(goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING);goog.getMsg=function(a,b){b&&(a=a.replace(/\{\$([^}]+)}/g,function(a,d){return null!=b&&d in b?b[d]:a}));return a};goog.getMsgWithFallback=function(a,b){return a};goog.exportSymbol=function(a,b,c){goog.exportPath_(a,b,c)};goog.exportProperty=function(a,b,c){a[b]=c};
goog.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}};
goog.base=function(a,b,c){var d=arguments.callee.caller;if(goog.STRICT_MODE_COMPATIBLE||goog.DEBUG&&!d)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if(d.superClass_){for(var e=Array(arguments.length-1),f=1;f<arguments.length;f++)e[f-1]=arguments[f];return d.superClass_.constructor.apply(a,e)}e=Array(arguments.length-2);for(f=2;f<arguments.length;f++)e[f-2]=arguments[f];for(var f=!1,g=a.constructor;g;g=
g.superClass_&&g.superClass_.constructor)if(g.prototype[b]===d)f=!0;else if(f)return g.prototype[b].apply(a,e);if(a[b]===d)return a.constructor.prototype[b].apply(a,e);throw Error("goog.base called from a method of one name to a method of a different name");};goog.scope=function(a){a.call(goog.global)};COMPILED||(goog.global.COMPILED=COMPILED);
goog.defineClass=function(a,b){var c=b.constructor,d=b.statics;c&&c!=Object.prototype.constructor||(c=function(){throw Error("cannot instantiate an interface (no constructor defined).");});c=goog.defineClass.createSealingConstructor_(c,a);a&&goog.inherits(c,a);delete b.constructor;delete b.statics;goog.defineClass.applyProperties_(c.prototype,b);null!=d&&(d instanceof Function?d(c):goog.defineClass.applyProperties_(c,d));return c};goog.defineClass.SEAL_CLASS_INSTANCES=goog.DEBUG;
goog.defineClass.createSealingConstructor_=function(a,b){if(goog.defineClass.SEAL_CLASS_INSTANCES&&Object.seal instanceof Function){if(b&&b.prototype&&b.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_])return a;var c=function(){var b=a.apply(this,arguments)||this;b[goog.UID_PROPERTY_]=b[goog.UID_PROPERTY_];this.constructor===c&&Object.seal(b);return b};return c}return a};goog.defineClass.OBJECT_PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_=function(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c]);for(var d=0;d<goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;d++)c=goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d],Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])};goog.tagUnsealableClass=function(a){!COMPILED&&goog.defineClass.SEAL_CLASS_INSTANCES&&(a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]=!0)};goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_="goog_defineClass_legacy_unsealable";goog.dom={};goog.dom.NodeType={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12};goog.debug={};goog.debug.Error=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,goog.debug.Error);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a));this.reportErrorToServer=!0};goog.inherits(goog.debug.Error,Error);goog.debug.Error.prototype.name="CustomError";goog.string={};goog.string.DETECT_DOUBLE_ESCAPING=!1;goog.string.FORCE_NON_DOM_HTML_UNESCAPING=!1;goog.string.Unicode={NBSP:"\u00a0"};goog.string.startsWith=function(a,b){return 0==a.lastIndexOf(b,0)};goog.string.endsWith=function(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c};goog.string.caseInsensitiveStartsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(0,b.length))};
goog.string.caseInsensitiveEndsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(a.length-b.length,b.length))};goog.string.caseInsensitiveEquals=function(a,b){return a.toLowerCase()==b.toLowerCase()};goog.string.subs=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};goog.string.collapseWhitespace=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};
goog.string.isEmptyOrWhitespace=function(a){return/^[\s\xa0]*$/.test(a)};goog.string.isEmptyString=function(a){return 0==a.length};goog.string.isEmpty=goog.string.isEmptyOrWhitespace;goog.string.isEmptyOrWhitespaceSafe=function(a){return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))};goog.string.isEmptySafe=goog.string.isEmptyOrWhitespaceSafe;goog.string.isBreakingWhitespace=function(a){return!/[^\t\n\r ]/.test(a)};goog.string.isAlpha=function(a){return!/[^a-zA-Z]/.test(a)};
goog.string.isNumeric=function(a){return!/[^0-9]/.test(a)};goog.string.isAlphaNumeric=function(a){return!/[^a-zA-Z0-9]/.test(a)};goog.string.isSpace=function(a){return" "==a};goog.string.isUnicodeChar=function(a){return 1==a.length&&" "<=a&&"~">=a||"\u0080"<=a&&"\ufffd">=a};goog.string.stripNewlines=function(a){return a.replace(/(\r\n|\r|\n)+/g," ")};goog.string.canonicalizeNewlines=function(a){return a.replace(/(\r\n|\r|\n)/g,"\n")};
goog.string.normalizeWhitespace=function(a){return a.replace(/\xa0|\s/g," ")};goog.string.normalizeSpaces=function(a){return a.replace(/\xa0|[ \t]+/g," ")};goog.string.collapseBreakingSpaces=function(a){return a.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")};goog.string.trim=goog.TRUSTED_SITE&&String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};goog.string.trimLeft=function(a){return a.replace(/^[\s\xa0]+/,"")};
goog.string.trimRight=function(a){return a.replace(/[\s\xa0]+$/,"")};goog.string.caseInsensitiveCompare=function(a,b){var c=String(a).toLowerCase(),d=String(b).toLowerCase();return c<d?-1:c==d?0:1};
goog.string.numberAwareCompare_=function(a,b,c){if(a==b)return 0;if(!a)return-1;if(!b)return 1;for(var d=a.toLowerCase().match(c),e=b.toLowerCase().match(c),f=Math.min(d.length,e.length),g=0;g<f;g++){c=d[g];var h=e[g];if(c!=h)return a=parseInt(c,10),!isNaN(a)&&(b=parseInt(h,10),!isNaN(b)&&a-b)?a-b:c<h?-1:1}return d.length!=e.length?d.length-e.length:a<b?-1:1};goog.string.intAwareCompare=function(a,b){return goog.string.numberAwareCompare_(a,b,/\d+|\D+/g)};
goog.string.floatAwareCompare=function(a,b){return goog.string.numberAwareCompare_(a,b,/\d+|\.\d+|\D+/g)};goog.string.numerateCompare=goog.string.floatAwareCompare;goog.string.urlEncode=function(a){return encodeURIComponent(String(a))};goog.string.urlDecode=function(a){return decodeURIComponent(a.replace(/\+/g," "))};goog.string.newLineToBr=function(a,b){return a.replace(/(\r\n|\r|\n)/g,b?"<br />":"<br>")};
goog.string.htmlEscape=function(a,b){if(b)a=a.replace(goog.string.AMP_RE_,"&amp;").replace(goog.string.LT_RE_,"&lt;").replace(goog.string.GT_RE_,"&gt;").replace(goog.string.QUOT_RE_,"&quot;").replace(goog.string.SINGLE_QUOTE_RE_,"&#39;").replace(goog.string.NULL_RE_,"&#0;"),goog.string.DETECT_DOUBLE_ESCAPING&&(a=a.replace(goog.string.E_RE_,"&#101;"));else{if(!goog.string.ALL_RE_.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(goog.string.AMP_RE_,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(goog.string.LT_RE_,
"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(goog.string.GT_RE_,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(goog.string.QUOT_RE_,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(goog.string.SINGLE_QUOTE_RE_,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(goog.string.NULL_RE_,"&#0;"));goog.string.DETECT_DOUBLE_ESCAPING&&-1!=a.indexOf("e")&&(a=a.replace(goog.string.E_RE_,"&#101;"))}return a};goog.string.AMP_RE_=/&/g;goog.string.LT_RE_=/</g;goog.string.GT_RE_=/>/g;goog.string.QUOT_RE_=/"/g;
goog.string.SINGLE_QUOTE_RE_=/'/g;goog.string.NULL_RE_=/\x00/g;goog.string.E_RE_=/e/g;goog.string.ALL_RE_=goog.string.DETECT_DOUBLE_ESCAPING?/[\x00&<>"'e]/:/[\x00&<>"']/;goog.string.unescapeEntities=function(a){return goog.string.contains(a,"&")?!goog.string.FORCE_NON_DOM_HTML_UNESCAPING&&"document"in goog.global?goog.string.unescapeEntitiesUsingDom_(a):goog.string.unescapePureXmlEntities_(a):a};
goog.string.unescapeEntitiesWithDocument=function(a,b){return goog.string.contains(a,"&")?goog.string.unescapeEntitiesUsingDom_(a,b):a};
goog.string.unescapeEntitiesUsingDom_=function(a,b){var c={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'},d;d=b?b.createElement("div"):goog.global.document.createElement("div");return a.replace(goog.string.HTML_ENTITY_PATTERN_,function(a,b){var g=c[a];if(g)return g;if("#"==b.charAt(0)){var h=Number("0"+b.substr(1));isNaN(h)||(g=String.fromCharCode(h))}g||(d.innerHTML=a+" ",g=d.firstChild.nodeValue.slice(0,-1));return c[a]=g})};
goog.string.unescapePureXmlEntities_=function(a){return a.replace(/&([^;]+);/g,function(a,c){switch(c){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:if("#"==c.charAt(0)){var d=Number("0"+c.substr(1));if(!isNaN(d))return String.fromCharCode(d)}return a}})};goog.string.HTML_ENTITY_PATTERN_=/&([^;\s<&]+);?/g;goog.string.whitespaceEscape=function(a,b){return goog.string.newLineToBr(a.replace(/  /g," &#160;"),b)};
goog.string.preserveSpaces=function(a){return a.replace(/(^|[\n ]) /g,"$1"+goog.string.Unicode.NBSP)};goog.string.stripQuotes=function(a,b){for(var c=b.length,d=0;d<c;d++){var e=1==c?b:b.charAt(d);if(a.charAt(0)==e&&a.charAt(a.length-1)==e)return a.substring(1,a.length-1)}return a};goog.string.truncate=function(a,b,c){c&&(a=goog.string.unescapeEntities(a));a.length>b&&(a=a.substring(0,b-3)+"...");c&&(a=goog.string.htmlEscape(a));return a};
goog.string.truncateMiddle=function(a,b,c,d){c&&(a=goog.string.unescapeEntities(a));if(d&&a.length>b){d>b&&(d=b);var e=a.length-d;a=a.substring(0,b-d)+"..."+a.substring(e)}else a.length>b&&(d=Math.floor(b/2),e=a.length-d,a=a.substring(0,d+b%2)+"..."+a.substring(e));c&&(a=goog.string.htmlEscape(a));return a};goog.string.specialEscapeChars_={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"<"};goog.string.jsEscapeCache_={"'":"\\'"};
goog.string.quote=function(a){a=String(a);for(var b=['"'],c=0;c<a.length;c++){var d=a.charAt(c),e=d.charCodeAt(0);b[c+1]=goog.string.specialEscapeChars_[d]||(31<e&&127>e?d:goog.string.escapeChar(d))}b.push('"');return b.join("")};goog.string.escapeString=function(a){for(var b=[],c=0;c<a.length;c++)b[c]=goog.string.escapeChar(a.charAt(c));return b.join("")};
goog.string.escapeChar=function(a){if(a in goog.string.jsEscapeCache_)return goog.string.jsEscapeCache_[a];if(a in goog.string.specialEscapeChars_)return goog.string.jsEscapeCache_[a]=goog.string.specialEscapeChars_[a];var b,c=a.charCodeAt(0);if(31<c&&127>c)b=a;else{if(256>c){if(b="\\x",16>c||256<c)b+="0"}else b="\\u",4096>c&&(b+="0");b+=c.toString(16).toUpperCase()}return goog.string.jsEscapeCache_[a]=b};goog.string.contains=function(a,b){return-1!=a.indexOf(b)};
goog.string.caseInsensitiveContains=function(a,b){return goog.string.contains(a.toLowerCase(),b.toLowerCase())};goog.string.countOf=function(a,b){return a&&b?a.split(b).length-1:0};goog.string.removeAt=function(a,b,c){var d=a;0<=b&&b<a.length&&0<c&&(d=a.substr(0,b)+a.substr(b+c,a.length-b-c));return d};goog.string.remove=function(a,b){var c=new RegExp(goog.string.regExpEscape(b),"");return a.replace(c,"")};
goog.string.removeAll=function(a,b){var c=new RegExp(goog.string.regExpEscape(b),"g");return a.replace(c,"")};goog.string.regExpEscape=function(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};goog.string.repeat=String.prototype.repeat?function(a,b){return a.repeat(b)}:function(a,b){return Array(b+1).join(a)};
goog.string.padNumber=function(a,b,c){a=goog.isDef(c)?a.toFixed(c):String(a);c=a.indexOf(".");-1==c&&(c=a.length);return goog.string.repeat("0",Math.max(0,b-c))+a};goog.string.makeSafe=function(a){return null==a?"":String(a)};goog.string.buildString=function(a){return Array.prototype.join.call(arguments,"")};goog.string.getRandomString=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^goog.now()).toString(36)};
goog.string.compareVersions=function(a,b){for(var c=0,d=goog.string.trim(String(a)).split("."),e=goog.string.trim(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var h=d[g]||"",k=e[g]||"",l=RegExp("(\\d*)(\\D*)","g"),p=RegExp("(\\d*)(\\D*)","g");do{var m=l.exec(h)||["","",""],n=p.exec(k)||["","",""];if(0==m[0].length&&0==n[0].length)break;var c=0==m[1].length?0:parseInt(m[1],10),q=0==n[1].length?0:parseInt(n[1],10),c=goog.string.compareElements_(c,q)||goog.string.compareElements_(0==
m[2].length,0==n[2].length)||goog.string.compareElements_(m[2],n[2])}while(0==c)}return c};goog.string.compareElements_=function(a,b){return a<b?-1:a>b?1:0};goog.string.hashCode=function(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b};goog.string.uniqueStringCounter_=2147483648*Math.random()|0;goog.string.createUniqueString=function(){return"goog_"+goog.string.uniqueStringCounter_++};
goog.string.toNumber=function(a){var b=Number(a);return 0==b&&goog.string.isEmptyOrWhitespace(a)?NaN:b};goog.string.isLowerCamelCase=function(a){return/^[a-z]+([A-Z][a-z]*)*$/.test(a)};goog.string.isUpperCamelCase=function(a){return/^([A-Z][a-z]*)+$/.test(a)};goog.string.toCamelCase=function(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})};goog.string.toSelectorCase=function(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()};
goog.string.toTitleCase=function(a,b){var c=goog.isString(b)?goog.string.regExpEscape(b):"\\s";return a.replace(new RegExp("(^"+(c?"|["+c+"]+":"")+")([a-z])","g"),function(a,b,c){return b+c.toUpperCase()})};goog.string.capitalize=function(a){return String(a.charAt(0)).toUpperCase()+String(a.substr(1)).toLowerCase()};goog.string.parseInt=function(a){isFinite(a)&&(a=String(a));return goog.isString(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN};
goog.string.splitLimit=function(a,b,c){a=a.split(b);for(var d=[];0<c&&a.length;)d.push(a.shift()),c--;a.length&&d.push(a.join(b));return d};goog.string.editDistance=function(a,b){var c=[],d=[];if(a==b)return 0;if(!a.length||!b.length)return Math.max(a.length,b.length);for(var e=0;e<b.length+1;e++)c[e]=e;for(e=0;e<a.length;e++){d[0]=e+1;for(var f=0;f<b.length;f++)d[f+1]=Math.min(d[f]+1,c[f+1]+1,c[f]+Number(a[e]!=b[f]));for(f=0;f<c.length;f++)c[f]=d[f]}return d[b.length]};goog.asserts={};goog.asserts.ENABLE_ASSERTS=goog.DEBUG;goog.asserts.AssertionError=function(a,b){b.unshift(a);goog.debug.Error.call(this,goog.string.subs.apply(null,b));b.shift();this.messagePattern=a};goog.inherits(goog.asserts.AssertionError,goog.debug.Error);goog.asserts.AssertionError.prototype.name="AssertionError";goog.asserts.DEFAULT_ERROR_HANDLER=function(a){throw a;};goog.asserts.errorHandler_=goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);a=new goog.asserts.AssertionError(""+e,f||[]);goog.asserts.errorHandler_(a)};goog.asserts.setErrorHandler=function(a){goog.asserts.ENABLE_ASSERTS&&(goog.asserts.errorHandler_=a)};goog.asserts.assert=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!a&&goog.asserts.doAssertFailure_("",null,b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.fail=function(a,b){goog.asserts.ENABLE_ASSERTS&&goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1)))};goog.asserts.assertNumber=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isNumber(a)&&goog.asserts.doAssertFailure_("Expected number but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertString=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isString(a)&&goog.asserts.doAssertFailure_("Expected string but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertFunction=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isFunction(a)&&goog.asserts.doAssertFailure_("Expected function but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertObject=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isObject(a)&&goog.asserts.doAssertFailure_("Expected object but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertArray=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isArray(a)&&goog.asserts.doAssertFailure_("Expected array but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertBoolean=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isBoolean(a)&&goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertElement=function(a,b,c){!goog.asserts.ENABLE_ASSERTS||goog.isObject(a)&&a.nodeType==goog.dom.NodeType.ELEMENT||goog.asserts.doAssertFailure_("Expected Element but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertInstanceof=function(a,b,c,d){!goog.asserts.ENABLE_ASSERTS||a instanceof b||goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.",[goog.asserts.getType_(b),goog.asserts.getType_(a)],c,Array.prototype.slice.call(arguments,3));return a};goog.asserts.assertObjectPrototypeIsIntact=function(){for(var a in Object.prototype)goog.asserts.fail(a+" should not be enumerable in Object.prototype.")};
goog.asserts.getType_=function(a){return a instanceof Function?a.displayName||a.name||"unknown type name":a instanceof Object?a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a):null===a?"null":typeof a};var jspb={Map:function(a,b){this.arr_=a;this.valueCtor_=b;this.map_={};this.arrClean=!0;0<this.arr_.length&&this.loadFromArray_()}};jspb.Map.prototype.loadFromArray_=function(){for(var a=0;a<this.arr_.length;a++){var b=this.arr_[a],c=b[0];this.map_[c.toString()]=new jspb.Map.Entry_(c,b[1])}this.arrClean=!0};
jspb.Map.prototype.toArray=function(){if(this.arrClean){if(this.valueCtor_){var a=this.map_,b;for(b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b].valueWrapper;c&&c.toArray()}}}else{this.arr_.length=0;a=this.stringKeys_();a.sort();for(b=0;b<a.length;b++){var d=this.map_[a[b]];(c=d.valueWrapper)&&c.toArray();this.arr_.push([d.key,d.value])}this.arrClean=!0}return this.arr_};
jspb.Map.prototype.toObject=function(a,b){for(var c=this.toArray(),d=[],e=0;e<c.length;e++){var f=this.map_[c[e][0].toString()];this.wrapEntry_(f);var g=f.valueWrapper;g?(goog.asserts.assert(b),d.push([f.key,b(a,g)])):d.push([f.key,f.value])}return d};jspb.Map.fromObject=function(a,b,c){b=new jspb.Map([],b);for(var d=0;d<a.length;d++){var e=a[d][0],f=c(a[d][1]);b.set(e,f)}return b};jspb.Map.ArrayIteratorIterable_=function(a){this.idx_=0;this.arr_=a};
jspb.Map.ArrayIteratorIterable_.prototype.next=function(){return this.idx_<this.arr_.length?{done:!1,value:this.arr_[this.idx_++]}:{done:!0,value:void 0}};$jscomp.initSymbol();"undefined"!=typeof Symbol&&($jscomp.initSymbol(),$jscomp.initSymbolIterator(),jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator]=function(){return this});jspb.Map.prototype.getLength=function(){return this.stringKeys_().length};jspb.Map.prototype.clear=function(){this.map_={};this.arrClean=!1};
jspb.Map.prototype.del=function(a){a=a.toString();var b=this.map_.hasOwnProperty(a);delete this.map_[a];this.arrClean=!1;return b};jspb.Map.prototype.getEntryList=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++){var d=this.map_[b[c]];a.push([d.key,d.value])}return a};jspb.Map.prototype.entries=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++){var d=this.map_[b[c]];a.push([d.key,this.wrapEntry_(d)])}return new jspb.Map.ArrayIteratorIterable_(a)};
jspb.Map.prototype.keys=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++)a.push(this.map_[b[c]].key);return new jspb.Map.ArrayIteratorIterable_(a)};jspb.Map.prototype.values=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++)a.push(this.wrapEntry_(this.map_[b[c]]));return new jspb.Map.ArrayIteratorIterable_(a)};
jspb.Map.prototype.forEach=function(a,b){var c=this.stringKeys_();c.sort();for(var d=0;d<c.length;d++){var e=this.map_[c[d]];a.call(b,this.wrapEntry_(e),e.key,this)}};jspb.Map.prototype.set=function(a,b){var c=new jspb.Map.Entry_(a);this.valueCtor_?(c.valueWrapper=b,c.value=b.toArray()):c.value=b;this.map_[a.toString()]=c;this.arrClean=!1;return this};jspb.Map.prototype.wrapEntry_=function(a){return this.valueCtor_?(a.valueWrapper||(a.valueWrapper=new this.valueCtor_(a.value)),a.valueWrapper):a.value};
jspb.Map.prototype.get=function(a){if(a=this.map_[a.toString()])return this.wrapEntry_(a)};jspb.Map.prototype.has=function(a){return a.toString()in this.map_};jspb.Map.prototype.serializeBinary=function(a,b,c,d,e){var f=this.stringKeys_();f.sort();for(var g=0;g<f.length;g++){var h=this.map_[f[g]];b.beginSubMessage(a);c.call(b,1,h.key);this.valueCtor_?d.call(b,2,this.wrapEntry_(h),e):d.call(b,2,h.value);b.endSubMessage()}};
jspb.Map.deserializeBinary=function(a,b,c,d,e,f){for(var g=void 0;b.nextField()&&!b.isEndGroup();){var h=b.getFieldNumber();1==h?f=c.call(b):2==h&&(a.valueCtor_?(goog.asserts.assert(e),g=new a.valueCtor_,d.call(b,g,e)):g=d.call(b))}goog.asserts.assert(void 0!=f);goog.asserts.assert(void 0!=g);a.set(f,g)};jspb.Map.prototype.stringKeys_=function(){var a=this.map_,b=[],c;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b};
jspb.Map.Entry_=function(a,b){this.key=a;this.value=b;this.valueWrapper=void 0};goog.array={};goog.NATIVE_ARRAY_PROTOTYPES=goog.TRUSTED_SITE;goog.array.ASSUME_NATIVE_FUNCTIONS=!1;goog.array.peek=function(a){return a[a.length-1]};goog.array.last=goog.array.peek;
goog.array.indexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.indexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(goog.isString(a))return goog.isString(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};
goog.array.lastIndexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.lastIndexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.lastIndexOf.call(a,b,null==c?a.length-1:c)}:function(a,b,c){c=null==c?a.length-1:c;0>c&&(c=Math.max(0,a.length+c));if(goog.isString(a))return goog.isString(b)&&1==b.length?a.lastIndexOf(b,c):-1;for(;0<=c;c--)if(c in a&&a[c]===b)return c;return-1};
goog.array.forEach=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.forEach)?function(a,b,c){goog.asserts.assert(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};goog.array.forEachRight=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,d=d-1;0<=d;--d)d in e&&b.call(c,e[d],d,a)};
goog.array.filter=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.filter)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=goog.isString(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var k=g[h];b.call(c,k,h,a)&&(e[f++]=k)}return e};
goog.array.map=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.map)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=goog.isString(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e};
goog.array.reduce=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.reduce)?function(a,b,c,d){goog.asserts.assert(null!=a.length);d&&(b=goog.bind(b,d));return Array.prototype.reduce.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEach(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.reduceRight=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.reduceRight)?function(a,b,c,d){goog.asserts.assert(null!=a.length);goog.asserts.assert(null!=b);d&&(b=goog.bind(b,d));return Array.prototype.reduceRight.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEachRight(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.some=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.some)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1};
goog.array.every=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.every)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};goog.array.count=function(a,b,c){var d=0;goog.array.forEach(a,function(a,f,g){b.call(c,a,f,g)&&++d},c);return d};
goog.array.find=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};goog.array.findIndex=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1};goog.array.findRight=function(a,b,c){b=goog.array.findIndexRight(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};
goog.array.findIndexRight=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,d=d-1;0<=d;d--)if(d in e&&b.call(c,e[d],d,a))return d;return-1};goog.array.contains=function(a,b){return 0<=goog.array.indexOf(a,b)};goog.array.isEmpty=function(a){return 0==a.length};goog.array.clear=function(a){if(!goog.isArray(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0};goog.array.insert=function(a,b){goog.array.contains(a,b)||a.push(b)};
goog.array.insertAt=function(a,b,c){goog.array.splice(a,c,0,b)};goog.array.insertArrayAt=function(a,b,c){goog.partial(goog.array.splice,a,c,0).apply(null,b)};goog.array.insertBefore=function(a,b,c){var d;2==arguments.length||0>(d=goog.array.indexOf(a,c))?a.push(b):goog.array.insertAt(a,b,d)};goog.array.remove=function(a,b){var c=goog.array.indexOf(a,b),d;(d=0<=c)&&goog.array.removeAt(a,c);return d};
goog.array.removeAt=function(a,b){goog.asserts.assert(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length};goog.array.removeIf=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0<=b?(goog.array.removeAt(a,b),!0):!1};goog.array.removeAllIf=function(a,b,c){var d=0;goog.array.forEachRight(a,function(e,f){b.call(c,e,f,a)&&goog.array.removeAt(a,f)&&d++});return d};goog.array.concat=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)};
goog.array.join=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)};goog.array.toArray=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};goog.array.clone=goog.array.toArray;goog.array.extend=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(goog.isArrayLike(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}};
goog.array.splice=function(a,b,c,d){goog.asserts.assert(null!=a.length);return Array.prototype.splice.apply(a,goog.array.slice(arguments,1))};goog.array.slice=function(a,b,c){goog.asserts.assert(null!=a.length);return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)};
goog.array.removeDuplicates=function(a,b,c){b=b||a;var d=function(a){return goog.isObject(a)?"o"+goog.getUid(a):(typeof a).charAt(0)+a};c=c||d;for(var d={},e=0,f=0;f<a.length;){var g=a[f++],h=c(g);Object.prototype.hasOwnProperty.call(d,h)||(d[h]=!0,b[e++]=g)}b.length=e};goog.array.binarySearch=function(a,b,c){return goog.array.binarySearch_(a,c||goog.array.defaultCompare,!1,b)};goog.array.binarySelect=function(a,b,c){return goog.array.binarySearch_(a,b,!0,void 0,c)};
goog.array.binarySearch_=function(a,b,c,d,e){for(var f=0,g=a.length,h;f<g;){var k=f+g>>1,l;l=c?b.call(e,a[k],k,a):b(d,a[k]);0<l?f=k+1:(g=k,h=!l)}return h?f:~f};goog.array.sort=function(a,b){a.sort(b||goog.array.defaultCompare)};goog.array.stableSort=function(a,b){for(var c=0;c<a.length;c++)a[c]={index:c,value:a[c]};var d=b||goog.array.defaultCompare;goog.array.sort(a,function(a,b){return d(a.value,b.value)||a.index-b.index});for(c=0;c<a.length;c++)a[c]=a[c].value};
goog.array.sortByKey=function(a,b,c){var d=c||goog.array.defaultCompare;goog.array.sort(a,function(a,c){return d(b(a),b(c))})};goog.array.sortObjectsByKey=function(a,b,c){goog.array.sortByKey(a,function(a){return a[b]},c)};goog.array.isSorted=function(a,b,c){b=b||goog.array.defaultCompare;for(var d=1;d<a.length;d++){var e=b(a[d-1],a[d]);if(0<e||0==e&&c)return!1}return!0};
goog.array.equals=function(a,b,c){if(!goog.isArrayLike(a)||!goog.isArrayLike(b)||a.length!=b.length)return!1;var d=a.length;c=c||goog.array.defaultCompareEquality;for(var e=0;e<d;e++)if(!c(a[e],b[e]))return!1;return!0};goog.array.compare3=function(a,b,c){c=c||goog.array.defaultCompare;for(var d=Math.min(a.length,b.length),e=0;e<d;e++){var f=c(a[e],b[e]);if(0!=f)return f}return goog.array.defaultCompare(a.length,b.length)};goog.array.defaultCompare=function(a,b){return a>b?1:a<b?-1:0};
goog.array.inverseDefaultCompare=function(a,b){return-goog.array.defaultCompare(a,b)};goog.array.defaultCompareEquality=function(a,b){return a===b};goog.array.binaryInsert=function(a,b,c){c=goog.array.binarySearch(a,b,c);return 0>c?(goog.array.insertAt(a,b,-(c+1)),!0):!1};goog.array.binaryRemove=function(a,b,c){b=goog.array.binarySearch(a,b,c);return 0<=b?goog.array.removeAt(a,b):!1};
goog.array.bucket=function(a,b,c){for(var d={},e=0;e<a.length;e++){var f=a[e],g=b.call(c,f,e,a);goog.isDef(g)&&(d[g]||(d[g]=[])).push(f)}return d};goog.array.toObject=function(a,b,c){var d={};goog.array.forEach(a,function(e,f){d[b.call(c,e,f,a)]=e});return d};goog.array.range=function(a,b,c){var d=[],e=0,f=a;c=c||1;void 0!==b&&(e=a,f=b);if(0>c*(f-e))return[];if(0<c)for(a=e;a<f;a+=c)d.push(a);else for(a=e;a>f;a+=c)d.push(a);return d};
goog.array.repeat=function(a,b){for(var c=[],d=0;d<b;d++)c[d]=a;return c};goog.array.flatten=function(a){for(var b=[],c=0;c<arguments.length;c++){var d=arguments[c];if(goog.isArray(d))for(var e=0;e<d.length;e+=8192)for(var f=goog.array.slice(d,e,e+8192),f=goog.array.flatten.apply(null,f),g=0;g<f.length;g++)b.push(f[g]);else b.push(d)}return b};
goog.array.rotate=function(a,b){goog.asserts.assert(null!=a.length);a.length&&(b%=a.length,0<b?Array.prototype.unshift.apply(a,a.splice(-b,b)):0>b&&Array.prototype.push.apply(a,a.splice(0,-b)));return a};goog.array.moveItem=function(a,b,c){goog.asserts.assert(0<=b&&b<a.length);goog.asserts.assert(0<=c&&c<a.length);b=Array.prototype.splice.call(a,b,1);Array.prototype.splice.call(a,c,0,b[0])};
goog.array.zip=function(a){if(!arguments.length)return[];for(var b=[],c=arguments[0].length,d=1;d<arguments.length;d++)arguments[d].length<c&&(c=arguments[d].length);for(d=0;d<c;d++){for(var e=[],f=0;f<arguments.length;f++)e.push(arguments[f][d]);b.push(e)}return b};goog.array.shuffle=function(a,b){for(var c=b||Math.random,d=a.length-1;0<d;d--){var e=Math.floor(c()*(d+1)),f=a[d];a[d]=a[e];a[e]=f}};goog.array.copyByIndex=function(a,b){var c=[];goog.array.forEach(b,function(b){c.push(a[b])});return c};jspb.BinaryConstants={};jspb.ConstBinaryMessage=function(){};jspb.BinaryMessage=function(){};jspb.BinaryConstants.FieldType={INVALID:-1,DOUBLE:1,FLOAT:2,INT64:3,UINT64:4,INT32:5,FIXED64:6,FIXED32:7,BOOL:8,STRING:9,GROUP:10,MESSAGE:11,BYTES:12,UINT32:13,ENUM:14,SFIXED32:15,SFIXED64:16,SINT32:17,SINT64:18,FHASH64:30,VHASH64:31};jspb.BinaryConstants.WireType={INVALID:-1,VARINT:0,FIXED64:1,DELIMITED:2,START_GROUP:3,END_GROUP:4,FIXED32:5};
jspb.BinaryConstants.FieldTypeToWireType=function(a){var b=jspb.BinaryConstants.FieldType,c=jspb.BinaryConstants.WireType;switch(a){case b.INT32:case b.INT64:case b.UINT32:case b.UINT64:case b.SINT32:case b.SINT64:case b.BOOL:case b.ENUM:case b.VHASH64:return c.VARINT;case b.DOUBLE:case b.FIXED64:case b.SFIXED64:case b.FHASH64:return c.FIXED64;case b.STRING:case b.MESSAGE:case b.BYTES:return c.DELIMITED;case b.FLOAT:case b.FIXED32:case b.SFIXED32:return c.FIXED32;default:return c.INVALID}};
jspb.BinaryConstants.INVALID_FIELD_NUMBER=-1;jspb.BinaryConstants.FLOAT32_EPS=1.401298464324817E-45;jspb.BinaryConstants.FLOAT32_MIN=1.1754943508222875E-38;jspb.BinaryConstants.FLOAT32_MAX=3.4028234663852886E38;jspb.BinaryConstants.FLOAT64_EPS=4.9E-324;jspb.BinaryConstants.FLOAT64_MIN=2.2250738585072014E-308;jspb.BinaryConstants.FLOAT64_MAX=1.7976931348623157E308;jspb.BinaryConstants.TWO_TO_20=1048576;jspb.BinaryConstants.TWO_TO_23=8388608;jspb.BinaryConstants.TWO_TO_31=2147483648;
jspb.BinaryConstants.TWO_TO_32=4294967296;jspb.BinaryConstants.TWO_TO_52=4503599627370496;jspb.BinaryConstants.TWO_TO_63=0x7fffffffffffffff;jspb.BinaryConstants.TWO_TO_64=1.8446744073709552E19;jspb.BinaryConstants.ZERO_HASH="\x00\x00\x00\x00\x00\x00\x00\x00";goog.crypt={};goog.crypt.stringToByteArray=function(a){for(var b=[],c=0,d=0;d<a.length;d++){for(var e=a.charCodeAt(d);255<e;)b[c++]=e&255,e>>=8;b[c++]=e}return b};goog.crypt.byteArrayToString=function(a){if(8192>=a.length)return String.fromCharCode.apply(null,a);for(var b="",c=0;c<a.length;c+=8192)var d=goog.array.slice(a,c,c+8192),b=b+String.fromCharCode.apply(null,d);return b};goog.crypt.byteArrayToHex=function(a){return goog.array.map(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join("")};
goog.crypt.hexToByteArray=function(a){goog.asserts.assert(0==a.length%2,"Key string length must be multiple of 2");for(var b=[],c=0;c<a.length;c+=2)b.push(parseInt(a.substring(c,c+2),16));return b};
goog.crypt.stringToUtf8ByteArray=function(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(55296==(e&64512)&&d+1<a.length&&56320==(a.charCodeAt(d+1)&64512)?(e=65536+((e&1023)<<10)+(a.charCodeAt(++d)&1023),b[c++]=e>>18|240,b[c++]=e>>12&63|128):b[c++]=e>>12|224,b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b};
goog.crypt.utf8ByteArrayToString=function(a){for(var b=[],c=0,d=0;c<a.length;){var e=a[c++];if(128>e)b[d++]=String.fromCharCode(e);else if(191<e&&224>e){var f=a[c++];b[d++]=String.fromCharCode((e&31)<<6|f&63)}else if(239<e&&365>e){var f=a[c++],g=a[c++],h=a[c++],e=((e&7)<<18|(f&63)<<12|(g&63)<<6|h&63)-65536;b[d++]=String.fromCharCode(55296+(e>>10));b[d++]=String.fromCharCode(56320+(e&1023))}else f=a[c++],g=a[c++],b[d++]=String.fromCharCode((e&15)<<12|(f&63)<<6|g&63)}return b.join("")};
goog.crypt.xorByteArray=function(a,b){goog.asserts.assert(a.length==b.length,"XOR array lengths must match");for(var c=[],d=0;d<a.length;d++)c.push(a[d]^b[d]);return c};goog.labs={};goog.labs.userAgent={};goog.labs.userAgent.util={};goog.labs.userAgent.util.getNativeUserAgentString_=function(){var a=goog.labs.userAgent.util.getNavigator_();return a&&(a=a.userAgent)?a:""};goog.labs.userAgent.util.getNavigator_=function(){return goog.global.navigator};goog.labs.userAgent.util.userAgent_=goog.labs.userAgent.util.getNativeUserAgentString_();goog.labs.userAgent.util.setUserAgent=function(a){goog.labs.userAgent.util.userAgent_=a||goog.labs.userAgent.util.getNativeUserAgentString_()};
goog.labs.userAgent.util.getUserAgent=function(){return goog.labs.userAgent.util.userAgent_};goog.labs.userAgent.util.matchUserAgent=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.contains(b,a)};goog.labs.userAgent.util.matchUserAgentIgnoreCase=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.caseInsensitiveContains(b,a)};
goog.labs.userAgent.util.extractVersionTuples=function(a){for(var b=RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?","g"),c=[],d;d=b.exec(a);)c.push([d[1],d[2],d[3]||void 0]);return c};goog.labs.userAgent.platform={};goog.labs.userAgent.platform.isAndroid=function(){return goog.labs.userAgent.util.matchUserAgent("Android")};goog.labs.userAgent.platform.isIpod=function(){return goog.labs.userAgent.util.matchUserAgent("iPod")};goog.labs.userAgent.platform.isIphone=function(){return goog.labs.userAgent.util.matchUserAgent("iPhone")&&!goog.labs.userAgent.util.matchUserAgent("iPod")&&!goog.labs.userAgent.util.matchUserAgent("iPad")};goog.labs.userAgent.platform.isIpad=function(){return goog.labs.userAgent.util.matchUserAgent("iPad")};
goog.labs.userAgent.platform.isIos=function(){return goog.labs.userAgent.platform.isIphone()||goog.labs.userAgent.platform.isIpad()||goog.labs.userAgent.platform.isIpod()};goog.labs.userAgent.platform.isMacintosh=function(){return goog.labs.userAgent.util.matchUserAgent("Macintosh")};goog.labs.userAgent.platform.isLinux=function(){return goog.labs.userAgent.util.matchUserAgent("Linux")};goog.labs.userAgent.platform.isWindows=function(){return goog.labs.userAgent.util.matchUserAgent("Windows")};
goog.labs.userAgent.platform.isChromeOS=function(){return goog.labs.userAgent.util.matchUserAgent("CrOS")};
goog.labs.userAgent.platform.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent(),b="";goog.labs.userAgent.platform.isWindows()?(b=/Windows (?:NT|Phone) ([0-9.]+)/,b=(a=b.exec(a))?a[1]:"0.0"):goog.labs.userAgent.platform.isIos()?(b=/(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/,b=(a=b.exec(a))&&a[1].replace(/_/g,".")):goog.labs.userAgent.platform.isMacintosh()?(b=/Mac OS X ([0-9_.]+)/,b=(a=b.exec(a))?a[1].replace(/_/g,"."):"10"):goog.labs.userAgent.platform.isAndroid()?(b=/Android\s+([^\);]+)(\)|;)/,
b=(a=b.exec(a))&&a[1]):goog.labs.userAgent.platform.isChromeOS()&&(b=/(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,b=(a=b.exec(a))&&a[1]);return b||""};goog.labs.userAgent.platform.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(),a)};goog.object={};goog.object.forEach=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)};goog.object.filter=function(a,b,c){var d={},e;for(e in a)b.call(c,a[e],e,a)&&(d[e]=a[e]);return d};goog.object.map=function(a,b,c){var d={},e;for(e in a)d[e]=b.call(c,a[e],e,a);return d};goog.object.some=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return!0;return!1};goog.object.every=function(a,b,c){for(var d in a)if(!b.call(c,a[d],d,a))return!1;return!0};
goog.object.getCount=function(a){var b=0,c;for(c in a)b++;return b};goog.object.getAnyKey=function(a){for(var b in a)return b};goog.object.getAnyValue=function(a){for(var b in a)return a[b]};goog.object.contains=function(a,b){return goog.object.containsValue(a,b)};goog.object.getValues=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};goog.object.getKeys=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b};
goog.object.getValueByKeys=function(a,b){for(var c=goog.isArrayLike(b),d=c?b:arguments,c=c?0:1;c<d.length&&(a=a[d[c]],goog.isDef(a));c++);return a};goog.object.containsKey=function(a,b){return null!==a&&b in a};goog.object.containsValue=function(a,b){for(var c in a)if(a[c]==b)return!0;return!1};goog.object.findKey=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d};goog.object.findValue=function(a,b,c){return(b=goog.object.findKey(a,b,c))&&a[b]};
goog.object.isEmpty=function(a){for(var b in a)return!1;return!0};goog.object.clear=function(a){for(var b in a)delete a[b]};goog.object.remove=function(a,b){var c;(c=b in a)&&delete a[b];return c};goog.object.add=function(a,b,c){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');goog.object.set(a,b,c)};goog.object.get=function(a,b,c){return null!==a&&b in a?a[b]:c};goog.object.set=function(a,b,c){a[b]=c};
goog.object.setIfUndefined=function(a,b,c){return b in a?a[b]:a[b]=c};goog.object.setWithReturnValueIfNotSet=function(a,b,c){if(b in a)return a[b];c=c();return a[b]=c};goog.object.equals=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(c in b)if(!(c in a))return!1;return!0};goog.object.clone=function(a){var b={},c;for(c in a)b[c]=a[c];return b};
goog.object.unsafeClone=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(goog.isFunction(a.clone))return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.object.unsafeClone(a[c]);return b}return a};goog.object.transpose=function(a){var b={},c;for(c in a)b[a[c]]=c;return b};goog.object.PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<goog.object.PROTOTYPE_FIELDS_.length;f++)c=goog.object.PROTOTYPE_FIELDS_[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};
goog.object.create=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.create.apply(null,arguments[0]);if(b%2)throw Error("Uneven number of arguments");for(var c={},d=0;d<b;d+=2)c[arguments[d]]=arguments[d+1];return c};goog.object.createSet=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.createSet.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};
goog.object.createImmutableView=function(a){var b=a;Object.isFrozen&&!Object.isFrozen(a)&&(b=Object.create(a),Object.freeze(b));return b};goog.object.isImmutableView=function(a){return!!Object.isFrozen&&Object.isFrozen(a)};goog.labs.userAgent.browser={};goog.labs.userAgent.browser.matchOpera_=function(){return goog.labs.userAgent.util.matchUserAgent("Opera")||goog.labs.userAgent.util.matchUserAgent("OPR")};goog.labs.userAgent.browser.matchIE_=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.browser.matchEdge_=function(){return goog.labs.userAgent.util.matchUserAgent("Edge")};goog.labs.userAgent.browser.matchFirefox_=function(){return goog.labs.userAgent.util.matchUserAgent("Firefox")};
goog.labs.userAgent.browser.matchSafari_=function(){return goog.labs.userAgent.util.matchUserAgent("Safari")&&!(goog.labs.userAgent.browser.matchChrome_()||goog.labs.userAgent.browser.matchCoast_()||goog.labs.userAgent.browser.matchOpera_()||goog.labs.userAgent.browser.matchEdge_()||goog.labs.userAgent.browser.isSilk()||goog.labs.userAgent.util.matchUserAgent("Android"))};goog.labs.userAgent.browser.matchCoast_=function(){return goog.labs.userAgent.util.matchUserAgent("Coast")};
goog.labs.userAgent.browser.matchIosWebview_=function(){return(goog.labs.userAgent.util.matchUserAgent("iPad")||goog.labs.userAgent.util.matchUserAgent("iPhone"))&&!goog.labs.userAgent.browser.matchSafari_()&&!goog.labs.userAgent.browser.matchChrome_()&&!goog.labs.userAgent.browser.matchCoast_()&&goog.labs.userAgent.util.matchUserAgent("AppleWebKit")};
goog.labs.userAgent.browser.matchChrome_=function(){return(goog.labs.userAgent.util.matchUserAgent("Chrome")||goog.labs.userAgent.util.matchUserAgent("CriOS"))&&!goog.labs.userAgent.browser.matchOpera_()&&!goog.labs.userAgent.browser.matchEdge_()};goog.labs.userAgent.browser.matchAndroidBrowser_=function(){return goog.labs.userAgent.util.matchUserAgent("Android")&&!(goog.labs.userAgent.browser.isChrome()||goog.labs.userAgent.browser.isFirefox()||goog.labs.userAgent.browser.isOpera()||goog.labs.userAgent.browser.isSilk())};
goog.labs.userAgent.browser.isOpera=goog.labs.userAgent.browser.matchOpera_;goog.labs.userAgent.browser.isIE=goog.labs.userAgent.browser.matchIE_;goog.labs.userAgent.browser.isEdge=goog.labs.userAgent.browser.matchEdge_;goog.labs.userAgent.browser.isFirefox=goog.labs.userAgent.browser.matchFirefox_;goog.labs.userAgent.browser.isSafari=goog.labs.userAgent.browser.matchSafari_;goog.labs.userAgent.browser.isCoast=goog.labs.userAgent.browser.matchCoast_;goog.labs.userAgent.browser.isIosWebview=goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome=goog.labs.userAgent.browser.matchChrome_;goog.labs.userAgent.browser.isAndroidBrowser=goog.labs.userAgent.browser.matchAndroidBrowser_;goog.labs.userAgent.browser.isSilk=function(){return goog.labs.userAgent.util.matchUserAgent("Silk")};
goog.labs.userAgent.browser.getVersion=function(){function a(a){a=goog.array.find(a,d);return c[a]||""}var b=goog.labs.userAgent.util.getUserAgent();if(goog.labs.userAgent.browser.isIE())return goog.labs.userAgent.browser.getIEVersion_(b);var b=goog.labs.userAgent.util.extractVersionTuples(b),c={};goog.array.forEach(b,function(a){c[a[0]]=a[1]});var d=goog.partial(goog.object.containsKey,c);return goog.labs.userAgent.browser.isOpera()?a(["Version","Opera","OPR"]):goog.labs.userAgent.browser.isEdge()?
a(["Edge"]):goog.labs.userAgent.browser.isChrome()?a(["Chrome","CriOS"]):(b=b[2])&&b[1]||""};goog.labs.userAgent.browser.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(),a)};
goog.labs.userAgent.browser.getIEVersion_=function(a){var b=/rv: *([\d\.]*)/.exec(a);if(b&&b[1])return b[1];var b="",c=/MSIE +([\d\.]+)/.exec(a);if(c&&c[1])if(a=/Trident\/(\d.\d)/.exec(a),"7.0"==c[1])if(a&&a[1])switch(a[1]){case "4.0":b="8.0";break;case "5.0":b="9.0";break;case "6.0":b="10.0";break;case "7.0":b="11.0"}else b="7.0";else b=c[1];return b};goog.labs.userAgent.engine={};goog.labs.userAgent.engine.isPresto=function(){return goog.labs.userAgent.util.matchUserAgent("Presto")};goog.labs.userAgent.engine.isTrident=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.engine.isEdge=function(){return goog.labs.userAgent.util.matchUserAgent("Edge")};
goog.labs.userAgent.engine.isWebKit=function(){return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit")&&!goog.labs.userAgent.engine.isEdge()};goog.labs.userAgent.engine.isGecko=function(){return goog.labs.userAgent.util.matchUserAgent("Gecko")&&!goog.labs.userAgent.engine.isWebKit()&&!goog.labs.userAgent.engine.isTrident()&&!goog.labs.userAgent.engine.isEdge()};
goog.labs.userAgent.engine.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent();if(a){var a=goog.labs.userAgent.util.extractVersionTuples(a),b=goog.labs.userAgent.engine.getEngineTuple_(a);if(b)return"Gecko"==b[0]?goog.labs.userAgent.engine.getVersionForKey_(a,"Firefox"):b[1];var a=a[0],c;if(a&&(c=a[2])&&(c=/Trident\/([^\s;]+)/.exec(c)))return c[1]}return""};
goog.labs.userAgent.engine.getEngineTuple_=function(a){if(!goog.labs.userAgent.engine.isEdge())return a[1];for(var b=0;b<a.length;b++){var c=a[b];if("Edge"==c[0])return c}};goog.labs.userAgent.engine.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(),a)};goog.labs.userAgent.engine.getVersionForKey_=function(a,b){var c=goog.array.find(a,function(a){return b==a[0]});return c&&c[1]||""};goog.userAgent={};goog.userAgent.ASSUME_IE=!1;goog.userAgent.ASSUME_EDGE=!1;goog.userAgent.ASSUME_GECKO=!1;goog.userAgent.ASSUME_WEBKIT=!1;goog.userAgent.ASSUME_MOBILE_WEBKIT=!1;goog.userAgent.ASSUME_OPERA=!1;goog.userAgent.ASSUME_ANY_VERSION=!1;goog.userAgent.BROWSER_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_EDGE||goog.userAgent.ASSUME_GECKO||goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_OPERA;goog.userAgent.getUserAgentString=function(){return goog.labs.userAgent.util.getUserAgent()};
goog.userAgent.getNavigator=function(){return goog.global.navigator||null};goog.userAgent.OPERA=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_OPERA:goog.labs.userAgent.browser.isOpera();goog.userAgent.IE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_IE:goog.labs.userAgent.browser.isIE();goog.userAgent.EDGE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_EDGE:goog.labs.userAgent.engine.isEdge();goog.userAgent.EDGE_OR_IE=goog.userAgent.EDGE||goog.userAgent.IE;
goog.userAgent.GECKO=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_GECKO:goog.labs.userAgent.engine.isGecko();goog.userAgent.WEBKIT=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_MOBILE_WEBKIT:goog.labs.userAgent.engine.isWebKit();goog.userAgent.isMobile_=function(){return goog.userAgent.WEBKIT&&goog.labs.userAgent.util.matchUserAgent("Mobile")};goog.userAgent.MOBILE=goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.isMobile_();goog.userAgent.SAFARI=goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_=function(){var a=goog.userAgent.getNavigator();return a&&a.platform||""};goog.userAgent.PLATFORM=goog.userAgent.determinePlatform_();goog.userAgent.ASSUME_MAC=!1;goog.userAgent.ASSUME_WINDOWS=!1;goog.userAgent.ASSUME_LINUX=!1;goog.userAgent.ASSUME_X11=!1;goog.userAgent.ASSUME_ANDROID=!1;goog.userAgent.ASSUME_IPHONE=!1;goog.userAgent.ASSUME_IPAD=!1;
goog.userAgent.PLATFORM_KNOWN_=goog.userAgent.ASSUME_MAC||goog.userAgent.ASSUME_WINDOWS||goog.userAgent.ASSUME_LINUX||goog.userAgent.ASSUME_X11||goog.userAgent.ASSUME_ANDROID||goog.userAgent.ASSUME_IPHONE||goog.userAgent.ASSUME_IPAD;goog.userAgent.MAC=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_MAC:goog.labs.userAgent.platform.isMacintosh();goog.userAgent.WINDOWS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_WINDOWS:goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_=function(){return goog.labs.userAgent.platform.isLinux()||goog.labs.userAgent.platform.isChromeOS()};goog.userAgent.LINUX=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_LINUX:goog.userAgent.isLegacyLinux_();goog.userAgent.isX11_=function(){var a=goog.userAgent.getNavigator();return!!a&&goog.string.contains(a.appVersion||"","X11")};goog.userAgent.X11=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_X11:goog.userAgent.isX11_();
goog.userAgent.ANDROID=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_ANDROID:goog.labs.userAgent.platform.isAndroid();goog.userAgent.IPHONE=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPHONE:goog.labs.userAgent.platform.isIphone();goog.userAgent.IPAD=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPAD:goog.labs.userAgent.platform.isIpad();goog.userAgent.operaVersion_=function(){var a=goog.global.opera.version;try{return a()}catch(b){return a}};
goog.userAgent.determineVersion_=function(){if(goog.userAgent.OPERA&&goog.global.opera)return goog.userAgent.operaVersion_();var a="",b=goog.userAgent.getVersionRegexResult_();b&&(a=b?b[1]:"");return goog.userAgent.IE&&(b=goog.userAgent.getDocumentMode_(),b>parseFloat(a))?String(b):a};
goog.userAgent.getVersionRegexResult_=function(){var a=goog.userAgent.getUserAgentString();if(goog.userAgent.GECKO)return/rv\:([^\);]+)(\)|;)/.exec(a);if(goog.userAgent.EDGE)return/Edge\/([\d\.]+)/.exec(a);if(goog.userAgent.IE)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(goog.userAgent.WEBKIT)return/WebKit\/(\S+)/.exec(a)};goog.userAgent.getDocumentMode_=function(){var a=goog.global.document;return a?a.documentMode:void 0};goog.userAgent.VERSION=goog.userAgent.determineVersion_();
goog.userAgent.compare=function(a,b){return goog.string.compareVersions(a,b)};goog.userAgent.isVersionOrHigherCache_={};goog.userAgent.isVersionOrHigher=function(a){return goog.userAgent.ASSUME_ANY_VERSION||goog.userAgent.isVersionOrHigherCache_[a]||(goog.userAgent.isVersionOrHigherCache_[a]=0<=goog.string.compareVersions(goog.userAgent.VERSION,a))};goog.userAgent.isVersion=goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher=function(a){return Number(goog.userAgent.DOCUMENT_MODE)>=a};goog.userAgent.isDocumentMode=goog.userAgent.isDocumentModeOrHigher;goog.userAgent.DOCUMENT_MODE=function(){var a=goog.global.document,b=goog.userAgent.getDocumentMode_();return a&&goog.userAgent.IE?b||("CSS1Compat"==a.compatMode?parseInt(goog.userAgent.VERSION,10):5):void 0}();goog.userAgent.product={};goog.userAgent.product.ASSUME_FIREFOX=!1;goog.userAgent.product.ASSUME_IPHONE=!1;goog.userAgent.product.ASSUME_IPAD=!1;goog.userAgent.product.ASSUME_ANDROID=!1;goog.userAgent.product.ASSUME_CHROME=!1;goog.userAgent.product.ASSUME_SAFARI=!1;
goog.userAgent.product.PRODUCT_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_EDGE||goog.userAgent.ASSUME_OPERA||goog.userAgent.product.ASSUME_FIREFOX||goog.userAgent.product.ASSUME_IPHONE||goog.userAgent.product.ASSUME_IPAD||goog.userAgent.product.ASSUME_ANDROID||goog.userAgent.product.ASSUME_CHROME||goog.userAgent.product.ASSUME_SAFARI;goog.userAgent.product.OPERA=goog.userAgent.OPERA;goog.userAgent.product.IE=goog.userAgent.IE;goog.userAgent.product.EDGE=goog.userAgent.EDGE;
goog.userAgent.product.FIREFOX=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_FIREFOX:goog.labs.userAgent.browser.isFirefox();goog.userAgent.product.isIphoneOrIpod_=function(){return goog.labs.userAgent.platform.isIphone()||goog.labs.userAgent.platform.isIpod()};goog.userAgent.product.IPHONE=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPHONE:goog.userAgent.product.isIphoneOrIpod_();
goog.userAgent.product.IPAD=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPAD:goog.labs.userAgent.platform.isIpad();goog.userAgent.product.ANDROID=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_ANDROID:goog.labs.userAgent.browser.isAndroidBrowser();goog.userAgent.product.CHROME=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_CHROME:goog.labs.userAgent.browser.isChrome();
goog.userAgent.product.isSafariDesktop_=function(){return goog.labs.userAgent.browser.isSafari()&&!goog.labs.userAgent.platform.isIos()};goog.userAgent.product.SAFARI=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_SAFARI:goog.userAgent.product.isSafariDesktop_();goog.crypt.base64={};goog.crypt.base64.byteToCharMap_=null;goog.crypt.base64.charToByteMap_=null;goog.crypt.base64.byteToCharMapWebSafe_=null;goog.crypt.base64.ENCODED_VALS_BASE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";goog.crypt.base64.ENCODED_VALS=goog.crypt.base64.ENCODED_VALS_BASE+"+/=";goog.crypt.base64.ENCODED_VALS_WEBSAFE=goog.crypt.base64.ENCODED_VALS_BASE+"-_.";
goog.crypt.base64.ASSUME_NATIVE_SUPPORT_=goog.userAgent.GECKO||goog.userAgent.WEBKIT&&!goog.userAgent.product.SAFARI||goog.userAgent.OPERA;goog.crypt.base64.HAS_NATIVE_ENCODE_=goog.crypt.base64.ASSUME_NATIVE_SUPPORT_||"function"==typeof goog.global.btoa;goog.crypt.base64.HAS_NATIVE_DECODE_=goog.crypt.base64.ASSUME_NATIVE_SUPPORT_||!goog.userAgent.product.SAFARI&&!goog.userAgent.IE&&"function"==typeof goog.global.atob;
goog.crypt.base64.encodeByteArray=function(a,b){goog.asserts.assert(goog.isArrayLike(a),"encodeByteArray takes an array as a parameter");goog.crypt.base64.init_();for(var c=b?goog.crypt.base64.byteToCharMapWebSafe_:goog.crypt.base64.byteToCharMap_,d=[],e=0;e<a.length;e+=3){var f=a[e],g=e+1<a.length,h=g?a[e+1]:0,k=e+2<a.length,l=k?a[e+2]:0,p=f>>2,f=(f&3)<<4|h>>4,h=(h&15)<<2|l>>6,l=l&63;k||(l=64,g||(h=64));d.push(c[p],c[f],c[h],c[l])}return d.join("")};
goog.crypt.base64.encodeString=function(a,b){return goog.crypt.base64.HAS_NATIVE_ENCODE_&&!b?goog.global.btoa(a):goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(a),b)};goog.crypt.base64.decodeString=function(a,b){if(goog.crypt.base64.HAS_NATIVE_DECODE_&&!b)return goog.global.atob(a);var c="";goog.crypt.base64.decodeStringInternal_(a,function(a){c+=String.fromCharCode(a)});return c};
goog.crypt.base64.decodeStringToByteArray=function(a,b){var c=[];goog.crypt.base64.decodeStringInternal_(a,function(a){c.push(a)});return c};goog.crypt.base64.decodeStringToUint8Array=function(a){goog.asserts.assert(!goog.userAgent.IE||goog.userAgent.isVersionOrHigher("10"),"Browser does not support typed arrays");var b=new Uint8Array(Math.ceil(3*a.length/4)),c=0;goog.crypt.base64.decodeStringInternal_(a,function(a){b[c++]=a});return b.subarray(0,c)};
goog.crypt.base64.decodeStringInternal_=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=goog.crypt.base64.charToByteMap_[c];if(null!=e)return e;if(!goog.string.isEmptyOrWhitespace(c))throw Error("Unknown base64 encoding at char: "+c);}return b}goog.crypt.base64.init_();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),h=c(64);if(64===h&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=h&&b(g<<6&192|h))}};
goog.crypt.base64.init_=function(){if(!goog.crypt.base64.byteToCharMap_){goog.crypt.base64.byteToCharMap_={};goog.crypt.base64.charToByteMap_={};goog.crypt.base64.byteToCharMapWebSafe_={};for(var a=0;a<goog.crypt.base64.ENCODED_VALS.length;a++)goog.crypt.base64.byteToCharMap_[a]=goog.crypt.base64.ENCODED_VALS.charAt(a),goog.crypt.base64.charToByteMap_[goog.crypt.base64.byteToCharMap_[a]]=a,goog.crypt.base64.byteToCharMapWebSafe_[a]=goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(a),a>=goog.crypt.base64.ENCODED_VALS_BASE.length&&
(goog.crypt.base64.charToByteMap_[goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(a)]=a)}};jspb.utils={};jspb.utils.split64Low=0;jspb.utils.split64High=0;jspb.utils.splitUint64=function(a){var b=a>>>0;a=Math.floor((a-b)/jspb.BinaryConstants.TWO_TO_32)>>>0;jspb.utils.split64Low=b;jspb.utils.split64High=a};jspb.utils.splitInt64=function(a){var b=0>a;a=Math.abs(a);var c=a>>>0;a=Math.floor((a-c)/jspb.BinaryConstants.TWO_TO_32);a>>>=0;b&&(a=~a>>>0,c=(~c>>>0)+1,4294967295<c&&(c=0,a++,4294967295<a&&(a=0)));jspb.utils.split64Low=c;jspb.utils.split64High=a};
jspb.utils.splitZigzag64=function(a){var b=0>a;a=2*Math.abs(a);jspb.utils.splitUint64(a);a=jspb.utils.split64Low;var c=jspb.utils.split64High;b&&(0==a?0==c?c=a=4294967295:(c--,a=4294967295):a--);jspb.utils.split64Low=a;jspb.utils.split64High=c};
jspb.utils.splitFloat32=function(a){var b=0>a?1:0;a=b?-a:a;var c;0===a?0<1/a?(jspb.utils.split64High=0,jspb.utils.split64Low=0):(jspb.utils.split64High=0,jspb.utils.split64Low=2147483648):isNaN(a)?(jspb.utils.split64High=0,jspb.utils.split64Low=2147483647):a>jspb.BinaryConstants.FLOAT32_MAX?(jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|2139095040)>>>0):a<jspb.BinaryConstants.FLOAT32_MIN?(a=Math.round(a/Math.pow(2,-149)),jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|a)>>>0):(c=Math.floor(Math.log(a)/
Math.LN2),a*=Math.pow(2,-c),a=Math.round(a*jspb.BinaryConstants.TWO_TO_23)&8388607,jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|c+127<<23|a)>>>0)};
jspb.utils.splitFloat64=function(a){var b=0>a?1:0;a=b?-a:a;if(0===a)jspb.utils.split64High=0<1/a?0:2147483648,jspb.utils.split64Low=0;else if(isNaN(a))jspb.utils.split64High=2147483647,jspb.utils.split64Low=4294967295;else if(a>jspb.BinaryConstants.FLOAT64_MAX)jspb.utils.split64High=(b<<31|2146435072)>>>0,jspb.utils.split64Low=0;else if(a<jspb.BinaryConstants.FLOAT64_MIN){var c=a/Math.pow(2,-1074);a=c/jspb.BinaryConstants.TWO_TO_32;jspb.utils.split64High=(b<<31|a)>>>0;jspb.utils.split64Low=c>>>0}else{var d=
Math.floor(Math.log(a)/Math.LN2);1024==d&&(d=1023);c=a*Math.pow(2,-d);a=c*jspb.BinaryConstants.TWO_TO_20&1048575;c=c*jspb.BinaryConstants.TWO_TO_52>>>0;jspb.utils.split64High=(b<<31|d+1023<<20|a)>>>0;jspb.utils.split64Low=c}};
jspb.utils.splitHash64=function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=a.charCodeAt(4),g=a.charCodeAt(5),h=a.charCodeAt(6);a=a.charCodeAt(7);jspb.utils.split64Low=b+(c<<8)+(d<<16)+(e<<24)>>>0;jspb.utils.split64High=f+(g<<8)+(h<<16)+(a<<24)>>>0};jspb.utils.joinUint64=function(a,b){return b*jspb.BinaryConstants.TWO_TO_32+a};
jspb.utils.joinInt64=function(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b>>>0,0==a&&(b=b+1>>>0));var d=jspb.utils.joinUint64(a,b);return c?-d:d};jspb.utils.joinZigzag64=function(a,b){var c=a&1;a=(a>>>1|b<<31)>>>0;b>>>=1;c&&(a=a+1>>>0,0==a&&(b=b+1>>>0));var d=jspb.utils.joinUint64(a,b);return c?-d:d};jspb.utils.joinFloat32=function(a,b){var c=2*(a>>31)+1,d=a>>>23&255,e=a&8388607;return 255==d?e?NaN:Infinity*c:0==d?c*Math.pow(2,-149)*e:c*Math.pow(2,d-150)*(e+Math.pow(2,23))};
jspb.utils.joinFloat64=function(a,b){var c=2*(b>>31)+1,d=b>>>20&2047,e=jspb.BinaryConstants.TWO_TO_32*(b&1048575)+a;return 2047==d?e?NaN:Infinity*c:0==d?c*Math.pow(2,-1074)*e:c*Math.pow(2,d-1075)*(e+jspb.BinaryConstants.TWO_TO_52)};jspb.utils.joinHash64=function(a,b){return String.fromCharCode(a>>>0&255,a>>>8&255,a>>>16&255,a>>>24&255,b>>>0&255,b>>>8&255,b>>>16&255,b>>>24&255)};jspb.utils.DIGITS="0123456789abcdef".split("");
jspb.utils.joinUnsignedDecimalString=function(a,b){function c(a){for(var b=1E7,c=0;7>c;c++){var b=b/10,d=a/b%10>>>0;if(0!=d||h)h=!0,k+=g[d]}}if(2097151>=b)return""+(jspb.BinaryConstants.TWO_TO_32*b+a);var d=(a>>>24|b<<8)>>>0&16777215,e=b>>16&65535,f=(a&16777215)+6777216*d+6710656*e,d=d+8147497*e,e=2*e;1E7<=f&&(d+=Math.floor(f/1E7),f%=1E7);1E7<=d&&(e+=Math.floor(d/1E7),d%=1E7);var g=jspb.utils.DIGITS,h=!1,k="";(e||h)&&c(e);(d||h)&&c(d);(f||h)&&c(f);return k};
jspb.utils.joinSignedDecimalString=function(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b+(0==a?1:0)>>>0);var d=jspb.utils.joinUnsignedDecimalString(a,b);return c?"-"+d:d};jspb.utils.hash64ToDecimalString=function(a,b){jspb.utils.splitHash64(a);var c=jspb.utils.split64Low,d=jspb.utils.split64High;return b?jspb.utils.joinSignedDecimalString(c,d):jspb.utils.joinUnsignedDecimalString(c,d)};
jspb.utils.hash64ArrayToDecimalStrings=function(a,b){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]=jspb.utils.hash64ToDecimalString(a[d],b);return c};
jspb.utils.decimalStringToHash64=function(a){function b(a,b){for(var c=0;8>c&&(1!==a||0<b);c++){var d=a*e[c]+b;e[c]=d&255;b=d>>>8}}function c(){for(var a=0;8>a;a++)e[a]=~e[a]&255}goog.asserts.assert(0<a.length);var d=!1;"-"===a[0]&&(d=!0,a=a.slice(1));for(var e=[0,0,0,0,0,0,0,0],f=0;f<a.length;f++)b(10,jspb.utils.DIGITS.indexOf(a[f]));d&&(c(),b(1,1));return goog.crypt.byteArrayToString(e)};jspb.utils.splitDecimalString=function(a){jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a))};
jspb.utils.hash64ToHexString=function(a){var b=Array(18);b[0]="0";b[1]="x";for(var c=0;8>c;c++){var d=a.charCodeAt(7-c);b[2*c+2]=jspb.utils.DIGITS[d>>4];b[2*c+3]=jspb.utils.DIGITS[d&15]}return b.join("")};jspb.utils.hexStringToHash64=function(a){a=a.toLowerCase();goog.asserts.assert(18==a.length);goog.asserts.assert("0"==a[0]);goog.asserts.assert("x"==a[1]);for(var b="",c=0;8>c;c++)var d=jspb.utils.DIGITS.indexOf(a[2*c+2]),e=jspb.utils.DIGITS.indexOf(a[2*c+3]),b=String.fromCharCode(16*d+e)+b;return b};
jspb.utils.hash64ToNumber=function(a,b){jspb.utils.splitHash64(a);var c=jspb.utils.split64Low,d=jspb.utils.split64High;return b?jspb.utils.joinInt64(c,d):jspb.utils.joinUint64(c,d)};jspb.utils.numberToHash64=function(a){jspb.utils.splitInt64(a);return jspb.utils.joinHash64(jspb.utils.split64Low,jspb.utils.split64High)};jspb.utils.countVarints=function(a,b,c){for(var d=0,e=b;e<c;e++)d+=a[e]>>7;return c-b-d};
jspb.utils.countVarintFields=function(a,b,c,d){var e=0;d=8*d+jspb.BinaryConstants.WireType.VARINT;if(128>d)for(;b<c&&a[b++]==d;)for(e++;;){var f=a[b++];if(0==(f&128))break}else for(;b<c;){for(f=d;128<f;){if(a[b]!=(f&127|128))return e;b++;f>>=7}if(a[b++]!=f)break;for(e++;f=a[b++],0!=(f&128););}return e};jspb.utils.countFixedFields_=function(a,b,c,d,e){var f=0;if(128>d)for(;b<c&&a[b++]==d;)f++,b+=e;else for(;b<c;){for(var g=d;128<g;){if(a[b++]!=(g&127|128))return f;g>>=7}if(a[b++]!=g)break;f++;b+=e}return f};
jspb.utils.countFixed32Fields=function(a,b,c,d){return jspb.utils.countFixedFields_(a,b,c,8*d+jspb.BinaryConstants.WireType.FIXED32,4)};jspb.utils.countFixed64Fields=function(a,b,c,d){return jspb.utils.countFixedFields_(a,b,c,8*d+jspb.BinaryConstants.WireType.FIXED64,8)};
jspb.utils.countDelimitedFields=function(a,b,c,d){var e=0;for(d=8*d+jspb.BinaryConstants.WireType.DELIMITED;b<c;){for(var f=d;128<f;){if(a[b++]!=(f&127|128))return e;f>>=7}if(a[b++]!=f)break;e++;for(var g=0,h=1;f=a[b++],g+=(f&127)*h,h*=128,0!=(f&128););b+=g}return e};jspb.utils.debugBytesToTextFormat=function(a){var b='"';if(a){a=jspb.utils.byteSourceToUint8Array(a);for(var c=0;c<a.length;c++)b+="\\x",16>a[c]&&(b+="0"),b+=a[c].toString(16)}return b+'"'};
jspb.utils.debugScalarToTextFormat=function(a){return goog.isString(a)?goog.string.quote(a):a.toString()};jspb.utils.stringToByteArray=function(a){for(var b=new Uint8Array(a.length),c=0;c<a.length;c++){var d=a.charCodeAt(c);if(255<d)throw Error("Conversion error: string contains codepoint outside of byte range");b[c]=d}return b};
jspb.utils.byteSourceToUint8Array=function(a){if(a.constructor===Uint8Array)return a;if(a.constructor===ArrayBuffer||"undefined"!=typeof Buffer&&a.constructor===Buffer||a.constructor===Array)return new Uint8Array(a);if(a.constructor===String)return goog.crypt.base64.decodeStringToUint8Array(a);goog.asserts.fail("Type not convertible to Uint8Array.");return new Uint8Array(0)};jspb.BinaryIterator=function(a,b,c){this.elements_=this.nextMethod_=this.decoder_=null;this.cursor_=0;this.nextValue_=null;this.atEnd_=!0;this.init_(a,b,c)};jspb.BinaryIterator.prototype.init_=function(a,b,c){a&&b&&(this.decoder_=a,this.nextMethod_=b);this.elements_=c||null;this.cursor_=0;this.nextValue_=null;this.atEnd_=!this.decoder_&&!this.elements_;this.next()};jspb.BinaryIterator.instanceCache_=[];
jspb.BinaryIterator.alloc=function(a,b,c){if(jspb.BinaryIterator.instanceCache_.length){var d=jspb.BinaryIterator.instanceCache_.pop();d.init_(a,b,c);return d}return new jspb.BinaryIterator(a,b,c)};jspb.BinaryIterator.prototype.free=function(){this.clear();100>jspb.BinaryIterator.instanceCache_.length&&jspb.BinaryIterator.instanceCache_.push(this)};
jspb.BinaryIterator.prototype.clear=function(){this.decoder_&&this.decoder_.free();this.elements_=this.nextMethod_=this.decoder_=null;this.cursor_=0;this.nextValue_=null;this.atEnd_=!0};jspb.BinaryIterator.prototype.get=function(){return this.nextValue_};jspb.BinaryIterator.prototype.atEnd=function(){return this.atEnd_};
jspb.BinaryIterator.prototype.next=function(){var a=this.nextValue_;this.decoder_?this.decoder_.atEnd()?(this.nextValue_=null,this.atEnd_=!0):this.nextValue_=this.nextMethod_.call(this.decoder_):this.elements_&&(this.cursor_==this.elements_.length?(this.nextValue_=null,this.atEnd_=!0):this.nextValue_=this.elements_[this.cursor_++]);return a};jspb.BinaryDecoder=function(a,b,c){this.bytes_=null;this.tempHigh_=this.tempLow_=this.cursor_=this.end_=this.start_=0;this.error_=!1;a&&this.setBlock(a,b,c)};
jspb.BinaryDecoder.instanceCache_=[];jspb.BinaryDecoder.alloc=function(a,b,c){if(jspb.BinaryDecoder.instanceCache_.length){var d=jspb.BinaryDecoder.instanceCache_.pop();a&&d.setBlock(a,b,c);return d}return new jspb.BinaryDecoder(a,b,c)};jspb.BinaryDecoder.prototype.free=function(){this.clear();100>jspb.BinaryDecoder.instanceCache_.length&&jspb.BinaryDecoder.instanceCache_.push(this)};jspb.BinaryDecoder.prototype.clone=function(){return jspb.BinaryDecoder.alloc(this.bytes_,this.start_,this.end_-this.start_)};
jspb.BinaryDecoder.prototype.clear=function(){this.bytes_=null;this.cursor_=this.end_=this.start_=0;this.error_=!1};jspb.BinaryDecoder.prototype.getBuffer=function(){return this.bytes_};jspb.BinaryDecoder.prototype.setBlock=function(a,b,c){this.bytes_=jspb.utils.byteSourceToUint8Array(a);this.start_=goog.isDef(b)?b:0;this.end_=goog.isDef(c)?this.start_+c:this.bytes_.length;this.cursor_=this.start_};jspb.BinaryDecoder.prototype.getEnd=function(){return this.end_};
jspb.BinaryDecoder.prototype.setEnd=function(a){this.end_=a};jspb.BinaryDecoder.prototype.reset=function(){this.cursor_=this.start_};jspb.BinaryDecoder.prototype.getCursor=function(){return this.cursor_};jspb.BinaryDecoder.prototype.setCursor=function(a){this.cursor_=a};jspb.BinaryDecoder.prototype.advance=function(a){this.cursor_+=a;goog.asserts.assert(this.cursor_<=this.end_)};jspb.BinaryDecoder.prototype.atEnd=function(){return this.cursor_==this.end_};
jspb.BinaryDecoder.prototype.pastEnd=function(){return this.cursor_>this.end_};jspb.BinaryDecoder.prototype.getError=function(){return this.error_||0>this.cursor_||this.cursor_>this.end_};
jspb.BinaryDecoder.prototype.readSplitVarint64_=function(){for(var a,b=0,c,d=0;4>d;d++)if(a=this.bytes_[this.cursor_++],b|=(a&127)<<7*d,128>a){this.tempLow_=b>>>0;this.tempHigh_=0;return}a=this.bytes_[this.cursor_++];b|=(a&127)<<28;c=0|(a&127)>>4;if(128>a)this.tempLow_=b>>>0,this.tempHigh_=c>>>0;else{for(d=0;5>d;d++)if(a=this.bytes_[this.cursor_++],c|=(a&127)<<7*d+3,128>a){this.tempLow_=b>>>0;this.tempHigh_=c>>>0;return}goog.asserts.fail("Failed to read varint, encoding is invalid.");this.error_=
!0}};jspb.BinaryDecoder.prototype.skipVarint=function(){for(;this.bytes_[this.cursor_]&128;)this.cursor_++;this.cursor_++};jspb.BinaryDecoder.prototype.unskipVarint=function(a){for(;128<a;)this.cursor_--,a>>>=7;this.cursor_--};
jspb.BinaryDecoder.prototype.readUnsignedVarint32=function(){var a,b=this.bytes_;a=b[this.cursor_+0];var c=a&127;if(128>a)return this.cursor_+=1,goog.asserts.assert(this.cursor_<=this.end_),c;a=b[this.cursor_+1];c|=(a&127)<<7;if(128>a)return this.cursor_+=2,goog.asserts.assert(this.cursor_<=this.end_),c;a=b[this.cursor_+2];c|=(a&127)<<14;if(128>a)return this.cursor_+=3,goog.asserts.assert(this.cursor_<=this.end_),c;a=b[this.cursor_+3];c|=(a&127)<<21;if(128>a)return this.cursor_+=4,goog.asserts.assert(this.cursor_<=
this.end_),c;a=b[this.cursor_+4];c|=(a&15)<<28;if(128>a)return this.cursor_+=5,goog.asserts.assert(this.cursor_<=this.end_),c>>>0;this.cursor_+=5;128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&goog.asserts.assert(!1);goog.asserts.assert(this.cursor_<=this.end_);return c};jspb.BinaryDecoder.prototype.readSignedVarint32=jspb.BinaryDecoder.prototype.readUnsignedVarint32;jspb.BinaryDecoder.prototype.readUnsignedVarint32String=function(){return this.readUnsignedVarint32().toString()};
jspb.BinaryDecoder.prototype.readSignedVarint32String=function(){return this.readSignedVarint32().toString()};jspb.BinaryDecoder.prototype.readZigzagVarint32=function(){var a=this.readUnsignedVarint32();return a>>>1^-(a&1)};jspb.BinaryDecoder.prototype.readUnsignedVarint64=function(){this.readSplitVarint64_();return jspb.utils.joinUint64(this.tempLow_,this.tempHigh_)};
jspb.BinaryDecoder.prototype.readUnsignedVarint64String=function(){this.readSplitVarint64_();return jspb.utils.joinUnsignedDecimalString(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readSignedVarint64=function(){this.readSplitVarint64_();return jspb.utils.joinInt64(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readSignedVarint64String=function(){this.readSplitVarint64_();return jspb.utils.joinSignedDecimalString(this.tempLow_,this.tempHigh_)};
jspb.BinaryDecoder.prototype.readZigzagVarint64=function(){this.readSplitVarint64_();return jspb.utils.joinZigzag64(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readZigzagVarint64String=function(){return this.readZigzagVarint64().toString()};jspb.BinaryDecoder.prototype.readUint8=function(){var a=this.bytes_[this.cursor_+0];this.cursor_+=1;goog.asserts.assert(this.cursor_<=this.end_);return a};
jspb.BinaryDecoder.prototype.readUint16=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1];this.cursor_+=2;goog.asserts.assert(this.cursor_<=this.end_);return a<<0|b<<8};jspb.BinaryDecoder.prototype.readUint32=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1],c=this.bytes_[this.cursor_+2],d=this.bytes_[this.cursor_+3];this.cursor_+=4;goog.asserts.assert(this.cursor_<=this.end_);return(a<<0|b<<8|c<<16|d<<24)>>>0};
jspb.BinaryDecoder.prototype.readUint64=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinUint64(a,b)};jspb.BinaryDecoder.prototype.readUint64String=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinUnsignedDecimalString(a,b)};jspb.BinaryDecoder.prototype.readInt8=function(){var a=this.bytes_[this.cursor_+0];this.cursor_+=1;goog.asserts.assert(this.cursor_<=this.end_);return a<<24>>24};
jspb.BinaryDecoder.prototype.readInt16=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1];this.cursor_+=2;goog.asserts.assert(this.cursor_<=this.end_);return(a<<0|b<<8)<<16>>16};jspb.BinaryDecoder.prototype.readInt32=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1],c=this.bytes_[this.cursor_+2],d=this.bytes_[this.cursor_+3];this.cursor_+=4;goog.asserts.assert(this.cursor_<=this.end_);return a<<0|b<<8|c<<16|d<<24};
jspb.BinaryDecoder.prototype.readInt64=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinInt64(a,b)};jspb.BinaryDecoder.prototype.readInt64String=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinSignedDecimalString(a,b)};jspb.BinaryDecoder.prototype.readFloat=function(){var a=this.readUint32();return jspb.utils.joinFloat32(a,0)};
jspb.BinaryDecoder.prototype.readDouble=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinFloat64(a,b)};jspb.BinaryDecoder.prototype.readBool=function(){return!!this.bytes_[this.cursor_++]};jspb.BinaryDecoder.prototype.readEnum=function(){return this.readSignedVarint32()};
jspb.BinaryDecoder.prototype.readString=function(a){var b=this.bytes_,c=this.cursor_;a=c+a;for(var d=[],e="";c<a;){var f=b[c++];if(128>f)d.push(f);else if(192>f)continue;else if(224>f){var g=b[c++];d.push((f&31)<<6|g&63)}else if(240>f){var g=b[c++],h=b[c++];d.push((f&15)<<12|(g&63)<<6|h&63)}else if(248>f){var g=b[c++],h=b[c++],k=b[c++],f=(f&7)<<18|(g&63)<<12|(h&63)<<6|k&63,f=f-65536;d.push((f>>10&1023)+55296,(f&1023)+56320)}8192<=d.length&&(e+=String.fromCharCode.apply(null,d),d.length=0)}e+=goog.crypt.byteArrayToString(d);
this.cursor_=c;return e};jspb.BinaryDecoder.prototype.readStringWithLength=function(){var a=this.readUnsignedVarint32();return this.readString(a)};jspb.BinaryDecoder.prototype.readBytes=function(a){if(0>a||this.cursor_+a>this.bytes_.length)return this.error_=!0,goog.asserts.fail("Invalid byte length!"),new Uint8Array(0);var b=this.bytes_.subarray(this.cursor_,this.cursor_+a);this.cursor_+=a;goog.asserts.assert(this.cursor_<=this.end_);return b};
jspb.BinaryDecoder.prototype.readVarintHash64=function(){this.readSplitVarint64_();return jspb.utils.joinHash64(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readFixedHash64=function(){var a=this.bytes_,b=this.cursor_,c=a[b+0],d=a[b+1],e=a[b+2],f=a[b+3],g=a[b+4],h=a[b+5],k=a[b+6],a=a[b+7];this.cursor_+=8;return String.fromCharCode(c,d,e,f,g,h,k,a)};jspb.BinaryReader=function(a,b,c){this.decoder_=jspb.BinaryDecoder.alloc(a,b,c);this.fieldCursor_=this.decoder_.getCursor();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;this.error_=!1;this.readCallbacks_=null};jspb.BinaryReader.instanceCache_=[];
jspb.BinaryReader.alloc=function(a,b,c){if(jspb.BinaryReader.instanceCache_.length){var d=jspb.BinaryReader.instanceCache_.pop();a&&d.decoder_.setBlock(a,b,c);return d}return new jspb.BinaryReader(a,b,c)};jspb.BinaryReader.prototype.alloc=jspb.BinaryReader.alloc;
jspb.BinaryReader.prototype.free=function(){this.decoder_.clear();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;this.error_=!1;this.readCallbacks_=null;100>jspb.BinaryReader.instanceCache_.length&&jspb.BinaryReader.instanceCache_.push(this)};jspb.BinaryReader.prototype.getFieldCursor=function(){return this.fieldCursor_};jspb.BinaryReader.prototype.getCursor=function(){return this.decoder_.getCursor()};
jspb.BinaryReader.prototype.getBuffer=function(){return this.decoder_.getBuffer()};jspb.BinaryReader.prototype.getFieldNumber=function(){return this.nextField_};jspb.BinaryReader.prototype.getWireType=function(){return this.nextWireType_};jspb.BinaryReader.prototype.isEndGroup=function(){return this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP};jspb.BinaryReader.prototype.getError=function(){return this.error_||this.decoder_.getError()};
jspb.BinaryReader.prototype.setBlock=function(a,b,c){this.decoder_.setBlock(a,b,c);this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID};jspb.BinaryReader.prototype.reset=function(){this.decoder_.reset();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID};jspb.BinaryReader.prototype.advance=function(a){this.decoder_.advance(a)};
jspb.BinaryReader.prototype.nextField=function(){if(this.decoder_.atEnd())return!1;if(this.getError())return goog.asserts.fail("Decoder hit an error"),!1;this.fieldCursor_=this.decoder_.getCursor();var a=this.decoder_.readUnsignedVarint32(),b=a>>>3,a=a&7;if(a!=jspb.BinaryConstants.WireType.VARINT&&a!=jspb.BinaryConstants.WireType.FIXED32&&a!=jspb.BinaryConstants.WireType.FIXED64&&a!=jspb.BinaryConstants.WireType.DELIMITED&&a!=jspb.BinaryConstants.WireType.START_GROUP&&a!=jspb.BinaryConstants.WireType.END_GROUP)return goog.asserts.fail("Invalid wire type: %s (at position %s)",
a,this.fieldCursor_),this.error_=!0,!1;this.nextField_=b;this.nextWireType_=a;return!0};jspb.BinaryReader.prototype.unskipHeader=function(){this.decoder_.unskipVarint(this.nextField_<<3|this.nextWireType_)};jspb.BinaryReader.prototype.skipMatchingFields=function(){var a=this.nextField_;for(this.unskipHeader();this.nextField()&&this.getFieldNumber()==a;)this.skipField();this.decoder_.atEnd()||this.unskipHeader()};
jspb.BinaryReader.prototype.skipVarintField=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.VARINT?(goog.asserts.fail("Invalid wire type for skipVarintField"),this.skipField()):this.decoder_.skipVarint()};jspb.BinaryReader.prototype.skipDelimitedField=function(){if(this.nextWireType_!=jspb.BinaryConstants.WireType.DELIMITED)goog.asserts.fail("Invalid wire type for skipDelimitedField"),this.skipField();else{var a=this.decoder_.readUnsignedVarint32();this.decoder_.advance(a)}};
jspb.BinaryReader.prototype.skipFixed32Field=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.FIXED32?(goog.asserts.fail("Invalid wire type for skipFixed32Field"),this.skipField()):this.decoder_.advance(4)};jspb.BinaryReader.prototype.skipFixed64Field=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.FIXED64?(goog.asserts.fail("Invalid wire type for skipFixed64Field"),this.skipField()):this.decoder_.advance(8)};
jspb.BinaryReader.prototype.skipGroup=function(){var a=this.nextField_;do{if(!this.nextField()){goog.asserts.fail("Unmatched start-group tag: stream EOF");this.error_=!0;break}if(this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP){this.nextField_!=a&&(goog.asserts.fail("Unmatched end-group tag"),this.error_=!0);break}this.skipField()}while(1)};
jspb.BinaryReader.prototype.skipField=function(){switch(this.nextWireType_){case jspb.BinaryConstants.WireType.VARINT:this.skipVarintField();break;case jspb.BinaryConstants.WireType.FIXED64:this.skipFixed64Field();break;case jspb.BinaryConstants.WireType.DELIMITED:this.skipDelimitedField();break;case jspb.BinaryConstants.WireType.FIXED32:this.skipFixed32Field();break;case jspb.BinaryConstants.WireType.START_GROUP:this.skipGroup();break;default:goog.asserts.fail("Invalid wire encoding for field.")}};
jspb.BinaryReader.prototype.registerReadCallback=function(a,b){goog.isNull(this.readCallbacks_)&&(this.readCallbacks_={});goog.asserts.assert(!this.readCallbacks_[a]);this.readCallbacks_[a]=b};jspb.BinaryReader.prototype.runReadCallback=function(a){goog.asserts.assert(!goog.isNull(this.readCallbacks_));a=this.readCallbacks_[a];goog.asserts.assert(a);return a(this)};
jspb.BinaryReader.prototype.readAny=function(a){this.nextWireType_=jspb.BinaryConstants.FieldTypeToWireType(a);var b=jspb.BinaryConstants.FieldType;switch(a){case b.DOUBLE:return this.readDouble();case b.FLOAT:return this.readFloat();case b.INT64:return this.readInt64();case b.UINT64:return this.readUint64();case b.INT32:return this.readInt32();case b.FIXED64:return this.readFixed64();case b.FIXED32:return this.readFixed32();case b.BOOL:return this.readBool();case b.STRING:return this.readString();
case b.GROUP:goog.asserts.fail("Group field type not supported in readAny()");case b.MESSAGE:goog.asserts.fail("Message field type not supported in readAny()");case b.BYTES:return this.readBytes();case b.UINT32:return this.readUint32();case b.ENUM:return this.readEnum();case b.SFIXED32:return this.readSfixed32();case b.SFIXED64:return this.readSfixed64();case b.SINT32:return this.readSint32();case b.SINT64:return this.readSint64();case b.FHASH64:return this.readFixedHash64();case b.VHASH64:return this.readVarintHash64();
default:goog.asserts.fail("Invalid field type in readAny()")}return 0};jspb.BinaryReader.prototype.readMessage=function(a,b){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var c=this.decoder_.getEnd(),d=this.decoder_.readUnsignedVarint32(),d=this.decoder_.getCursor()+d;this.decoder_.setEnd(d);b(a,this);this.decoder_.setCursor(d);this.decoder_.setEnd(c)};
jspb.BinaryReader.prototype.readGroup=function(a,b,c){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.START_GROUP);goog.asserts.assert(this.nextField_==a);c(b,this);this.error_||this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP||(goog.asserts.fail("Group submessage did not end with an END_GROUP tag"),this.error_=!0)};
jspb.BinaryReader.prototype.getFieldDecoder=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32(),b=this.decoder_.getCursor(),c=b+a,a=jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(),b,a);this.decoder_.setCursor(c);return a};jspb.BinaryReader.prototype.readInt32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint32()};
jspb.BinaryReader.prototype.readInt32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint32String()};jspb.BinaryReader.prototype.readInt64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64()};jspb.BinaryReader.prototype.readInt64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64String()};
jspb.BinaryReader.prototype.readUint32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint32()};jspb.BinaryReader.prototype.readUint32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint32String()};jspb.BinaryReader.prototype.readUint64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint64()};
jspb.BinaryReader.prototype.readUint64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint64String()};jspb.BinaryReader.prototype.readSint32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint32()};jspb.BinaryReader.prototype.readSint64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint64()};
jspb.BinaryReader.prototype.readSint64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint64String()};jspb.BinaryReader.prototype.readFixed32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readUint32()};jspb.BinaryReader.prototype.readFixed64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readUint64()};
jspb.BinaryReader.prototype.readFixed64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readUint64String()};jspb.BinaryReader.prototype.readSfixed32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readInt32()};jspb.BinaryReader.prototype.readSfixed32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readInt32().toString()};
jspb.BinaryReader.prototype.readSfixed64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readInt64()};jspb.BinaryReader.prototype.readSfixed64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readInt64String()};jspb.BinaryReader.prototype.readFloat=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readFloat()};
jspb.BinaryReader.prototype.readDouble=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readDouble()};jspb.BinaryReader.prototype.readBool=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return!!this.decoder_.readUnsignedVarint32()};jspb.BinaryReader.prototype.readEnum=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64()};
jspb.BinaryReader.prototype.readString=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32();return this.decoder_.readString(a)};jspb.BinaryReader.prototype.readBytes=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32();return this.decoder_.readBytes(a)};
jspb.BinaryReader.prototype.readVarintHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readVarintHash64()};jspb.BinaryReader.prototype.readFixedHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readFixedHash64()};
jspb.BinaryReader.prototype.readPackedField_=function(a){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);for(var b=this.decoder_.readUnsignedVarint32(),b=this.decoder_.getCursor()+b,c=[];this.decoder_.getCursor()<b;)c.push(a.call(this.decoder_));return c};jspb.BinaryReader.prototype.readPackedInt32=function(){return this.readPackedField_(this.decoder_.readSignedVarint32)};jspb.BinaryReader.prototype.readPackedInt32String=function(){return this.readPackedField_(this.decoder_.readSignedVarint32String)};
jspb.BinaryReader.prototype.readPackedInt64=function(){return this.readPackedField_(this.decoder_.readSignedVarint64)};jspb.BinaryReader.prototype.readPackedInt64String=function(){return this.readPackedField_(this.decoder_.readSignedVarint64String)};jspb.BinaryReader.prototype.readPackedUint32=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint32)};jspb.BinaryReader.prototype.readPackedUint32String=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint32String)};
jspb.BinaryReader.prototype.readPackedUint64=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint64)};jspb.BinaryReader.prototype.readPackedUint64String=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint64String)};jspb.BinaryReader.prototype.readPackedSint32=function(){return this.readPackedField_(this.decoder_.readZigzagVarint32)};jspb.BinaryReader.prototype.readPackedSint64=function(){return this.readPackedField_(this.decoder_.readZigzagVarint64)};
jspb.BinaryReader.prototype.readPackedSint64String=function(){return this.readPackedField_(this.decoder_.readZigzagVarint64String)};jspb.BinaryReader.prototype.readPackedFixed32=function(){return this.readPackedField_(this.decoder_.readUint32)};jspb.BinaryReader.prototype.readPackedFixed64=function(){return this.readPackedField_(this.decoder_.readUint64)};jspb.BinaryReader.prototype.readPackedFixed64String=function(){return this.readPackedField_(this.decoder_.readUint64String)};
jspb.BinaryReader.prototype.readPackedSfixed32=function(){return this.readPackedField_(this.decoder_.readInt32)};jspb.BinaryReader.prototype.readPackedSfixed64=function(){return this.readPackedField_(this.decoder_.readInt64)};jspb.BinaryReader.prototype.readPackedSfixed64String=function(){return this.readPackedField_(this.decoder_.readInt64String)};jspb.BinaryReader.prototype.readPackedFloat=function(){return this.readPackedField_(this.decoder_.readFloat)};
jspb.BinaryReader.prototype.readPackedDouble=function(){return this.readPackedField_(this.decoder_.readDouble)};jspb.BinaryReader.prototype.readPackedBool=function(){return this.readPackedField_(this.decoder_.readBool)};jspb.BinaryReader.prototype.readPackedEnum=function(){return this.readPackedField_(this.decoder_.readEnum)};jspb.BinaryReader.prototype.readPackedVarintHash64=function(){return this.readPackedField_(this.decoder_.readVarintHash64)};
jspb.BinaryReader.prototype.readPackedFixedHash64=function(){return this.readPackedField_(this.decoder_.readFixedHash64)};jspb.ExtensionFieldInfo=function(a,b,c,d,e){this.fieldIndex=a;this.fieldName=b;this.ctor=c;this.toObjectFn=d;this.isRepeated=e};jspb.ExtensionFieldBinaryInfo=function(a,b,c,d,e,f){this.fieldInfo=a;this.binaryReaderFn=b;this.binaryWriterFn=c;this.binaryMessageSerializeFn=d;this.binaryMessageDeserializeFn=e;this.isPacked=f};jspb.ExtensionFieldInfo.prototype.isMessageType=function(){return!!this.ctor};jspb.Message=function(){};jspb.Message.GENERATE_TO_OBJECT=!0;jspb.Message.GENERATE_FROM_OBJECT=!goog.DISALLOW_TEST_ONLY_CODE;
jspb.Message.GENERATE_TO_STRING=!0;jspb.Message.ASSUME_LOCAL_ARRAYS=!1;jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS=!0;jspb.Message.SUPPORTS_UINT8ARRAY_="function"==typeof Uint8Array;jspb.Message.prototype.getJsPbMessageId=function(){return this.messageId_};jspb.Message.getIndex_=function(a,b){return b+a.arrayIndexOffset_};jspb.Message.getFieldNumber_=function(a,b){return b-a.arrayIndexOffset_};
jspb.Message.initialize=function(a,b,c,d,e,f){a.wrappers_=null;b||(b=c?[c]:[]);a.messageId_=c?String(c):void 0;a.arrayIndexOffset_=0===c?-1:0;a.array=b;jspb.Message.initPivotAndExtensionObject_(a,d);a.convertedFloatingPointFields_={};jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS||(a.repeatedFields=e);if(e)for(b=0;b<e.length;b++)c=e[b],c<a.pivot_?(c=jspb.Message.getIndex_(a,c),a.array[c]=a.array[c]||jspb.Message.EMPTY_LIST_SENTINEL_):(jspb.Message.maybeInitEmptyExtensionObject_(a),a.extensionObject_[c]=
a.extensionObject_[c]||jspb.Message.EMPTY_LIST_SENTINEL_);if(f&&f.length)for(b=0;b<f.length;b++)jspb.Message.computeOneofCase(a,f[b])};jspb.Message.EMPTY_LIST_SENTINEL_=goog.DEBUG&&Object.freeze?Object.freeze([]):[];jspb.Message.isArray_=function(a){return jspb.Message.ASSUME_LOCAL_ARRAYS?a instanceof Array:goog.isArray(a)};jspb.Message.isExtensionObject_=function(a){return null!==a&&"object"==typeof a&&!jspb.Message.isArray_(a)&&!(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)};
jspb.Message.initPivotAndExtensionObject_=function(a,b){var c=a.array.length,d=-1;if(c&&(d=c-1,c=a.array[d],jspb.Message.isExtensionObject_(c))){a.pivot_=jspb.Message.getFieldNumber_(a,d);a.extensionObject_=c;return}-1<b?(a.pivot_=Math.max(b,jspb.Message.getFieldNumber_(a,d+1)),a.extensionObject_=null):a.pivot_=Number.MAX_VALUE};jspb.Message.maybeInitEmptyExtensionObject_=function(a){var b=jspb.Message.getIndex_(a,a.pivot_);a.array[b]||(a.extensionObject_=a.array[b]={})};
jspb.Message.toObjectList=function(a,b,c){for(var d=[],e=0;e<a.length;e++)d[e]=b.call(a[e],c,a[e]);return d};jspb.Message.toObjectExtension=function(a,b,c,d,e){for(var f in c){var g=c[f],h=d.call(a,g);if(null!=h){for(var k in g.fieldName)if(g.fieldName.hasOwnProperty(k))break;b[k]=g.toObjectFn?g.isRepeated?jspb.Message.toObjectList(h,g.toObjectFn,e):g.toObjectFn(e,h):h}}};
jspb.Message.serializeBinaryExtensions=function(a,b,c,d){for(var e in c){var f=c[e],g=f.fieldInfo;if(!f.binaryWriterFn)throw Error("Message extension present that was generated without binary serialization support");var h=d.call(a,g);if(null!=h)if(g.isMessageType())if(f.binaryMessageSerializeFn)f.binaryWriterFn.call(b,g.fieldIndex,h,f.binaryMessageSerializeFn);else throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
else f.binaryWriterFn.call(b,g.fieldIndex,h)}};jspb.Message.readBinaryExtension=function(a,b,c,d,e){var f=c[b.getFieldNumber()];if(f){c=f.fieldInfo;if(!f.binaryReaderFn)throw Error("Deserializing extension whose generated code does not support binary format");var g;c.isMessageType()?(g=new c.ctor,f.binaryReaderFn.call(b,g,f.binaryMessageDeserializeFn)):g=f.binaryReaderFn.call(b);c.isRepeated&&!f.isPacked?(b=d.call(a,c))?b.push(g):e.call(a,c,[g]):e.call(a,c,g)}else b.skipField()};
jspb.Message.getField=function(a,b){if(b<a.pivot_){var c=jspb.Message.getIndex_(a,b),d=a.array[c];return d===jspb.Message.EMPTY_LIST_SENTINEL_?a.array[c]=[]:d}if(a.extensionObject_)return d=a.extensionObject_[b],d===jspb.Message.EMPTY_LIST_SENTINEL_?a.extensionObject_[b]=[]:d};
jspb.Message.getRepeatedField=function(a,b){if(b<a.pivot_){var c=jspb.Message.getIndex_(a,b),d=a.array[c];return d===jspb.Message.EMPTY_LIST_SENTINEL_?a.array[c]=[]:d}d=a.extensionObject_[b];return d===jspb.Message.EMPTY_LIST_SENTINEL_?a.extensionObject_[b]=[]:d};jspb.Message.getOptionalFloatingPointField=function(a,b){var c=jspb.Message.getField(a,b);return null==c?c:+c};
jspb.Message.getRepeatedFloatingPointField=function(a,b){var c=jspb.Message.getRepeatedField(a,b);a.convertedFloatingPointFields_||(a.convertedFloatingPointFields_={});if(!a.convertedFloatingPointFields_[b]){for(var d=0;d<c.length;d++)c[d]=+c[d];a.convertedFloatingPointFields_[b]=!0}return c};
jspb.Message.bytesAsB64=function(a){if(null==a||goog.isString(a))return a;if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)return goog.crypt.base64.encodeByteArray(a);goog.asserts.fail("Cannot coerce to b64 string: "+goog.typeOf(a));return null};jspb.Message.bytesAsU8=function(a){if(null==a||a instanceof Uint8Array)return a;if(goog.isString(a))return goog.crypt.base64.decodeStringToUint8Array(a);goog.asserts.fail("Cannot coerce to Uint8Array: "+goog.typeOf(a));return null};
jspb.Message.bytesListAsB64=function(a){jspb.Message.assertConsistentTypes_(a);return!a.length||goog.isString(a[0])?a:goog.array.map(a,jspb.Message.bytesAsB64)};jspb.Message.bytesListAsU8=function(a){jspb.Message.assertConsistentTypes_(a);return!a.length||a[0]instanceof Uint8Array?a:goog.array.map(a,jspb.Message.bytesAsU8)};
jspb.Message.assertConsistentTypes_=function(a){if(goog.DEBUG&&a&&1<a.length){var b=goog.typeOf(a[0]);goog.array.forEach(a,function(a){goog.typeOf(a)!=b&&goog.asserts.fail("Inconsistent type in JSPB repeated field array. Got "+goog.typeOf(a)+" expected "+b)})}};jspb.Message.getFieldWithDefault=function(a,b,c){a=jspb.Message.getField(a,b);return null==a?c:a};jspb.Message.getFieldProto3=jspb.Message.getFieldWithDefault;
jspb.Message.getMapField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});if(b in a.wrappers_)return a.wrappers_[b];if(!c)return c=jspb.Message.getField(a,b),c||(c=[],jspb.Message.setField(a,b,c)),a.wrappers_[b]=new jspb.Map(c,d)};jspb.Message.setField=function(a,b,c){b<a.pivot_?a.array[jspb.Message.getIndex_(a,b)]=c:(jspb.Message.maybeInitEmptyExtensionObject_(a),a.extensionObject_[b]=c)};jspb.Message.setProto3IntField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};
jspb.Message.setProto3FloatField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};jspb.Message.setProto3BooleanField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,!1)};jspb.Message.setProto3StringField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,"")};jspb.Message.setProto3BytesField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,"")};jspb.Message.setProto3EnumField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};
jspb.Message.setProto3StringIntField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,"0")};jspb.Message.setFieldIgnoringDefault_=function(a,b,c,d){c!==d?jspb.Message.setField(a,b,c):a.array[jspb.Message.getIndex_(a,b)]=null};jspb.Message.addToRepeatedField=function(a,b,c,d){a=jspb.Message.getRepeatedField(a,b);void 0!=d?a.splice(d,0,c):a.push(c)};
jspb.Message.setOneofField=function(a,b,c,d){(c=jspb.Message.computeOneofCase(a,c))&&c!==b&&void 0!==d&&(a.wrappers_&&c in a.wrappers_&&(a.wrappers_[c]=void 0),jspb.Message.setField(a,c,void 0));jspb.Message.setField(a,b,d)};jspb.Message.computeOneofCase=function(a,b){for(var c,d,e=0;e<b.length;e++){var f=b[e],g=jspb.Message.getField(a,f);null!=g&&(c=f,d=g,jspb.Message.setField(a,f,void 0))}return c?(jspb.Message.setField(a,c,d),c):0};
jspb.Message.getWrapperField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});if(!a.wrappers_[c]){var e=jspb.Message.getField(a,c);if(d||e)a.wrappers_[c]=new b(e)}return a.wrappers_[c]};jspb.Message.getRepeatedWrapperField=function(a,b,c){jspb.Message.wrapRepeatedField_(a,b,c);b=a.wrappers_[c];b==jspb.Message.EMPTY_LIST_SENTINEL_&&(b=a.wrappers_[c]=[]);return b};
jspb.Message.wrapRepeatedField_=function(a,b,c){a.wrappers_||(a.wrappers_={});if(!a.wrappers_[c]){for(var d=jspb.Message.getRepeatedField(a,c),e=[],f=0;f<d.length;f++)e[f]=new b(d[f]);a.wrappers_[c]=e}};jspb.Message.setWrapperField=function(a,b,c){a.wrappers_||(a.wrappers_={});var d=c?c.toArray():c;a.wrappers_[b]=c;jspb.Message.setField(a,b,d)};
jspb.Message.setOneofWrapperField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});var e=d?d.toArray():d;a.wrappers_[b]=d;jspb.Message.setOneofField(a,b,c,e)};jspb.Message.setRepeatedWrapperField=function(a,b,c){a.wrappers_||(a.wrappers_={});c=c||[];for(var d=[],e=0;e<c.length;e++)d[e]=c[e].toArray();a.wrappers_[b]=c;jspb.Message.setField(a,b,d)};
jspb.Message.addToRepeatedWrapperField=function(a,b,c,d,e){jspb.Message.wrapRepeatedField_(a,d,b);var f=a.wrappers_[b];f||(f=a.wrappers_[b]=[]);c=c?c:new d;a=jspb.Message.getRepeatedField(a,b);void 0!=e?(f.splice(e,0,c),a.splice(e,0,c.toArray())):(f.push(c),a.push(c.toArray()));return c};jspb.Message.toMap=function(a,b,c,d){for(var e={},f=0;f<a.length;f++)e[b.call(a[f])]=c?c.call(a[f],d,a[f]):a[f];return e};
jspb.Message.prototype.syncMapFields_=function(){if(this.wrappers_)for(var a in this.wrappers_){var b=this.wrappers_[a];if(goog.isArray(b))for(var c=0;c<b.length;c++)b[c]&&b[c].toArray();else b&&b.toArray()}};jspb.Message.prototype.toArray=function(){this.syncMapFields_();return this.array};jspb.Message.GENERATE_TO_STRING&&(jspb.Message.prototype.toString=function(){this.syncMapFields_();return this.array.toString()});
jspb.Message.prototype.getExtension=function(a){if(this.extensionObject_){this.wrappers_||(this.wrappers_={});var b=a.fieldIndex;if(a.isRepeated){if(a.isMessageType())return this.wrappers_[b]||(this.wrappers_[b]=goog.array.map(this.extensionObject_[b]||[],function(b){return new a.ctor(b)})),this.wrappers_[b]}else if(a.isMessageType())return!this.wrappers_[b]&&this.extensionObject_[b]&&(this.wrappers_[b]=new a.ctor(this.extensionObject_[b])),this.wrappers_[b];return this.extensionObject_[b]}};
jspb.Message.prototype.setExtension=function(a,b){this.wrappers_||(this.wrappers_={});jspb.Message.maybeInitEmptyExtensionObject_(this);var c=a.fieldIndex;a.isRepeated?(b=b||[],a.isMessageType()?(this.wrappers_[c]=b,this.extensionObject_[c]=goog.array.map(b,function(a){return a.toArray()})):this.extensionObject_[c]=b):a.isMessageType()?(this.wrappers_[c]=b,this.extensionObject_[c]=b?b.toArray():b):this.extensionObject_[c]=b;return this};
jspb.Message.difference=function(a,b){if(!(a instanceof b.constructor))throw Error("Messages have different types.");var c=a.toArray(),d=b.toArray(),e=[],f=0,g=c.length>d.length?c.length:d.length;a.getJsPbMessageId()&&(e[0]=a.getJsPbMessageId(),f=1);for(;f<g;f++)jspb.Message.compareFields(c[f],d[f])||(e[f]=d[f]);return new a.constructor(e)};jspb.Message.equals=function(a,b){return a==b||!(!a||!b)&&a instanceof b.constructor&&jspb.Message.compareFields(a.toArray(),b.toArray())};
jspb.Message.compareExtensions=function(a,b){a=a||{};b=b||{};var c={},d;for(d in a)c[d]=0;for(d in b)c[d]=0;for(d in c)if(!jspb.Message.compareFields(a[d],b[d]))return!1;return!0};
jspb.Message.compareFields=function(a,b){if(a==b)return!0;if(!goog.isObject(a)||!goog.isObject(b))return goog.isNumber(a)&&isNaN(a)||goog.isNumber(b)&&isNaN(b)?String(a)==String(b):!1;if(a.constructor!=b.constructor)return!1;if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a.constructor===Uint8Array){if(a.length!=b.length)return!1;for(var c=0;c<a.length;c++)if(a[c]!=b[c])return!1;return!0}if(a.constructor===Array){for(var d=void 0,e=void 0,f=Math.max(a.length,b.length),c=0;c<f;c++){var g=a[c],h=b[c];g&&g.constructor==
Object&&(goog.asserts.assert(void 0===d),goog.asserts.assert(c===a.length-1),d=g,g=void 0);h&&h.constructor==Object&&(goog.asserts.assert(void 0===e),goog.asserts.assert(c===b.length-1),e=h,h=void 0);if(!jspb.Message.compareFields(g,h))return!1}return d||e?(d=d||{},e=e||{},jspb.Message.compareExtensions(d,e)):!0}if(a.constructor===Object)return jspb.Message.compareExtensions(a,b);throw Error("Invalid type in JSPB array");};jspb.Message.prototype.cloneMessage=function(){return jspb.Message.cloneMessage(this)};
jspb.Message.prototype.clone=function(){return jspb.Message.cloneMessage(this)};jspb.Message.clone=function(a){return jspb.Message.cloneMessage(a)};jspb.Message.cloneMessage=function(a){return new a.constructor(jspb.Message.clone_(a.toArray()))};
jspb.Message.copyInto=function(a,b){goog.asserts.assertInstanceof(a,jspb.Message);goog.asserts.assertInstanceof(b,jspb.Message);goog.asserts.assert(a.constructor==b.constructor,"Copy source and target message should have the same type.");for(var c=jspb.Message.clone(a),d=b.toArray(),e=c.toArray(),f=d.length=0;f<e.length;f++)d[f]=e[f];b.wrappers_=c.wrappers_;b.extensionObject_=c.extensionObject_};
jspb.Message.clone_=function(a){var b;if(goog.isArray(a)){for(var c=Array(a.length),d=0;d<a.length;d++)b=a[d],null!=b&&(c[d]="object"==typeof b?jspb.Message.clone_(goog.asserts.assert(b)):b);return c}if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)return new Uint8Array(a);c={};for(d in a)b=a[d],null!=b&&(c[d]="object"==typeof b?jspb.Message.clone_(goog.asserts.assert(b)):b);return c};jspb.Message.registerMessageType=function(a,b){jspb.Message.registry_[a]=b;b.messageId=a};
jspb.Message.registry_={};jspb.Message.messageSetExtensions={};jspb.Message.messageSetExtensionsBinary={};jspb.arith={};jspb.arith.UInt64=function(a,b){this.lo=a;this.hi=b};jspb.arith.UInt64.prototype.cmp=function(a){return this.hi<a.hi||this.hi==a.hi&&this.lo<a.lo?-1:this.hi==a.hi&&this.lo==a.lo?0:1};jspb.arith.UInt64.prototype.rightShift=function(){return new jspb.arith.UInt64((this.lo>>>1|(this.hi&1)<<31)>>>0,this.hi>>>1>>>0)};jspb.arith.UInt64.prototype.leftShift=function(){return new jspb.arith.UInt64(this.lo<<1>>>0,(this.hi<<1|this.lo>>>31)>>>0)};
jspb.arith.UInt64.prototype.msb=function(){return!!(this.hi&2147483648)};jspb.arith.UInt64.prototype.lsb=function(){return!!(this.lo&1)};jspb.arith.UInt64.prototype.zero=function(){return 0==this.lo&&0==this.hi};jspb.arith.UInt64.prototype.add=function(a){return new jspb.arith.UInt64((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};
jspb.arith.UInt64.prototype.sub=function(a){return new jspb.arith.UInt64((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};jspb.arith.UInt64.mul32x32=function(a,b){for(var c=a&65535,d=a>>>16,e=b&65535,f=b>>>16,g=c*e+65536*(c*f&65535)+65536*(d*e&65535),c=d*f+(c*f>>>16)+(d*e>>>16);4294967296<=g;)g-=4294967296,c+=1;return new jspb.arith.UInt64(g>>>0,c>>>0)};
jspb.arith.UInt64.prototype.mul=function(a){var b=jspb.arith.UInt64.mul32x32(this.lo,a);a=jspb.arith.UInt64.mul32x32(this.hi,a);a.hi=a.lo;a.lo=0;return b.add(a)};
jspb.arith.UInt64.prototype.div=function(a){if(0==a)return[];var b=new jspb.arith.UInt64(0,0),c=new jspb.arith.UInt64(this.lo,this.hi);a=new jspb.arith.UInt64(a,0);for(var d=new jspb.arith.UInt64(1,0);!a.msb();)a=a.leftShift(),d=d.leftShift();for(;!d.zero();)0>=a.cmp(c)&&(b=b.add(d),c=c.sub(a)),a=a.rightShift(),d=d.rightShift();return[b,c]};jspb.arith.UInt64.prototype.toString=function(){for(var a="",b=this;!b.zero();)var b=b.div(10),c=b[0],a=b[1].lo+a,b=c;""==a&&(a="0");return a};
jspb.arith.UInt64.fromString=function(a){for(var b=new jspb.arith.UInt64(0,0),c=new jspb.arith.UInt64(0,0),d=0;d<a.length;d++){if("0">a[d]||"9"<a[d])return null;var e=parseInt(a[d],10);c.lo=e;b=b.mul(10).add(c)}return b};jspb.arith.UInt64.prototype.clone=function(){return new jspb.arith.UInt64(this.lo,this.hi)};jspb.arith.Int64=function(a,b){this.lo=a;this.hi=b};
jspb.arith.Int64.prototype.add=function(a){return new jspb.arith.Int64((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};jspb.arith.Int64.prototype.sub=function(a){return new jspb.arith.Int64((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};jspb.arith.Int64.prototype.clone=function(){return new jspb.arith.Int64(this.lo,this.hi)};
jspb.arith.Int64.prototype.toString=function(){var a=0!=(this.hi&2147483648),b=new jspb.arith.UInt64(this.lo,this.hi);a&&(b=(new jspb.arith.UInt64(0,0)).sub(b));return(a?"-":"")+b.toString()};jspb.arith.Int64.fromString=function(a){var b=0<a.length&&"-"==a[0];b&&(a=a.substring(1));a=jspb.arith.UInt64.fromString(a);if(null===a)return null;b&&(a=(new jspb.arith.UInt64(0,0)).sub(a));return new jspb.arith.Int64(a.lo,a.hi)};jspb.BinaryEncoder=function(){this.buffer_=[]};jspb.BinaryEncoder.prototype.length=function(){return this.buffer_.length};jspb.BinaryEncoder.prototype.end=function(){var a=this.buffer_;this.buffer_=[];return a};
jspb.BinaryEncoder.prototype.writeSplitVarint64=function(a,b){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(b==Math.floor(b));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);for(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32);0<b||127<a;)this.buffer_.push(a&127|128),a=(a>>>7|b<<25)>>>0,b>>>=7;this.buffer_.push(a)};
jspb.BinaryEncoder.prototype.writeSplitFixed64=function(a,b){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(b==Math.floor(b));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32);this.writeUint32(a);this.writeUint32(b)};
jspb.BinaryEncoder.prototype.writeUnsignedVarint32=function(a){goog.asserts.assert(a==Math.floor(a));for(goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);127<a;)this.buffer_.push(a&127|128),a>>>=7;this.buffer_.push(a)};
jspb.BinaryEncoder.prototype.writeSignedVarint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);if(0<=a)this.writeUnsignedVarint32(a);else{for(var b=0;9>b;b++)this.buffer_.push(a&127|128),a>>=7;this.buffer_.push(1)}};
jspb.BinaryEncoder.prototype.writeUnsignedVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_64);jspb.utils.splitInt64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeSignedVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitInt64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeZigzagVarint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.writeUnsignedVarint32((a<<1^a>>31)>>>0)};jspb.BinaryEncoder.prototype.writeZigzagVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitZigzag64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeZigzagVarint64String=function(a){this.writeZigzagVarint64(parseInt(a,10))};jspb.BinaryEncoder.prototype.writeUint8=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&256>a);this.buffer_.push(a>>>0&255)};jspb.BinaryEncoder.prototype.writeUint16=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&65536>a);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255)};
jspb.BinaryEncoder.prototype.writeUint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);this.buffer_.push(a>>>16&255);this.buffer_.push(a>>>24&255)};jspb.BinaryEncoder.prototype.writeUint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_64);jspb.utils.splitUint64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeInt8=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(-128<=a&&128>a);this.buffer_.push(a>>>0&255)};jspb.BinaryEncoder.prototype.writeInt16=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(-32768<=a&&32768>a);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255)};
jspb.BinaryEncoder.prototype.writeInt32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);this.buffer_.push(a>>>16&255);this.buffer_.push(a>>>24&255)};
jspb.BinaryEncoder.prototype.writeInt64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitInt64(a);this.writeSplitFixed64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeInt64String=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(+a>=-jspb.BinaryConstants.TWO_TO_63&&+a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));this.writeSplitFixed64(jspb.utils.split64Low,jspb.utils.split64High)};jspb.BinaryEncoder.prototype.writeFloat=function(a){goog.asserts.assert(a>=-jspb.BinaryConstants.FLOAT32_MAX&&a<=jspb.BinaryConstants.FLOAT32_MAX);jspb.utils.splitFloat32(a);this.writeUint32(jspb.utils.split64Low)};
jspb.BinaryEncoder.prototype.writeDouble=function(a){goog.asserts.assert(a>=-jspb.BinaryConstants.FLOAT64_MAX&&a<=jspb.BinaryConstants.FLOAT64_MAX);jspb.utils.splitFloat64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};jspb.BinaryEncoder.prototype.writeBool=function(a){goog.asserts.assert(goog.isBoolean(a)||goog.isNumber(a));this.buffer_.push(a?1:0)};
jspb.BinaryEncoder.prototype.writeEnum=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.writeSignedVarint32(a)};jspb.BinaryEncoder.prototype.writeBytes=function(a){this.buffer_.push.apply(this.buffer_,a)};jspb.BinaryEncoder.prototype.writeVarintHash64=function(a){jspb.utils.splitHash64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeFixedHash64=function(a){jspb.utils.splitHash64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeString=function(a){for(var b=this.buffer_.length,c=0;c<a.length;c++){var d=a.charCodeAt(c);if(128>d)this.buffer_.push(d);else if(2048>d)this.buffer_.push(d>>6|192),this.buffer_.push(d&63|128);else if(65536>d)if(55296<=d&&56319>=d&&c+1<a.length){var e=a.charCodeAt(c+1);56320<=e&&57343>=e&&(d=1024*(d-55296)+e-56320+65536,this.buffer_.push(d>>18|240),this.buffer_.push(d>>12&63|128),this.buffer_.push(d>>6&63|128),this.buffer_.push(d&63|128),c++)}else this.buffer_.push(d>>
12|224),this.buffer_.push(d>>6&63|128),this.buffer_.push(d&63|128)}return this.buffer_.length-b};jspb.BinaryWriter=function(){this.blocks_=[];this.totalLength_=0;this.encoder_=new jspb.BinaryEncoder;this.bookmarks_=[]};jspb.BinaryWriter.prototype.appendUint8Array_=function(a){var b=this.encoder_.end();this.blocks_.push(b);this.blocks_.push(a);this.totalLength_+=b.length+a.length};
jspb.BinaryWriter.prototype.beginDelimited_=function(a){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);a=this.encoder_.end();this.blocks_.push(a);this.totalLength_+=a.length;a.push(this.totalLength_);return a};jspb.BinaryWriter.prototype.endDelimited_=function(a){var b=a.pop(),b=this.totalLength_+this.encoder_.length()-b;for(goog.asserts.assert(0<=b);127<b;)a.push(b&127|128),b>>>=7,this.totalLength_++;a.push(b);this.totalLength_++};
jspb.BinaryWriter.prototype.writeSerializedMessage=function(a,b,c){this.appendUint8Array_(a.subarray(b,c))};jspb.BinaryWriter.prototype.maybeWriteSerializedMessage=function(a,b,c){null!=a&&null!=b&&null!=c&&this.writeSerializedMessage(a,b,c)};jspb.BinaryWriter.prototype.reset=function(){this.blocks_=[];this.encoder_.end();this.totalLength_=0;this.bookmarks_=[]};
jspb.BinaryWriter.prototype.getResultBuffer=function(){goog.asserts.assert(0==this.bookmarks_.length);for(var a=new Uint8Array(this.totalLength_+this.encoder_.length()),b=this.blocks_,c=b.length,d=0,e=0;e<c;e++){var f=b[e];a.set(f,d);d+=f.length}b=this.encoder_.end();a.set(b,d);d+=b.length;goog.asserts.assert(d==a.length);this.blocks_=[a];return a};jspb.BinaryWriter.prototype.getResultBase64String=function(a){return goog.crypt.base64.encodeByteArray(this.getResultBuffer(),a)};
jspb.BinaryWriter.prototype.beginSubMessage=function(a){this.bookmarks_.push(this.beginDelimited_(a))};jspb.BinaryWriter.prototype.endSubMessage=function(){goog.asserts.assert(0<=this.bookmarks_.length);this.endDelimited_(this.bookmarks_.pop())};jspb.BinaryWriter.prototype.writeFieldHeader_=function(a,b){goog.asserts.assert(1<=a&&a==Math.floor(a));this.encoder_.writeUnsignedVarint32(8*a+b)};
jspb.BinaryWriter.prototype.writeAny=function(a,b,c){var d=jspb.BinaryConstants.FieldType;switch(a){case d.DOUBLE:this.writeDouble(b,c);break;case d.FLOAT:this.writeFloat(b,c);break;case d.INT64:this.writeInt64(b,c);break;case d.UINT64:this.writeUint64(b,c);break;case d.INT32:this.writeInt32(b,c);break;case d.FIXED64:this.writeFixed64(b,c);break;case d.FIXED32:this.writeFixed32(b,c);break;case d.BOOL:this.writeBool(b,c);break;case d.STRING:this.writeString(b,c);break;case d.GROUP:goog.asserts.fail("Group field type not supported in writeAny()");
break;case d.MESSAGE:goog.asserts.fail("Message field type not supported in writeAny()");break;case d.BYTES:this.writeBytes(b,c);break;case d.UINT32:this.writeUint32(b,c);break;case d.ENUM:this.writeEnum(b,c);break;case d.SFIXED32:this.writeSfixed32(b,c);break;case d.SFIXED64:this.writeSfixed64(b,c);break;case d.SINT32:this.writeSint32(b,c);break;case d.SINT64:this.writeSint64(b,c);break;case d.FHASH64:this.writeFixedHash64(b,c);break;case d.VHASH64:this.writeVarintHash64(b,c);break;default:goog.asserts.fail("Invalid field type in writeAny()")}};
jspb.BinaryWriter.prototype.writeUnsignedVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeUnsignedVarint32(b))};jspb.BinaryWriter.prototype.writeSignedVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(b))};jspb.BinaryWriter.prototype.writeUnsignedVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeUnsignedVarint64(b))};
jspb.BinaryWriter.prototype.writeSignedVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint64(b))};jspb.BinaryWriter.prototype.writeZigzagVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint32(b))};jspb.BinaryWriter.prototype.writeZigzagVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint64(b))};
jspb.BinaryWriter.prototype.writeZigzagVarint64String_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint64String(b))};jspb.BinaryWriter.prototype.writeInt32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeSignedVarint32_(a,b))};
jspb.BinaryWriter.prototype.writeInt32String=function(a,b){if(null!=b){var c=parseInt(b,10);goog.asserts.assert(c>=-jspb.BinaryConstants.TWO_TO_31&&c<jspb.BinaryConstants.TWO_TO_31);this.writeSignedVarint32_(a,c)}};jspb.BinaryWriter.prototype.writeInt64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeSignedVarint64_(a,b))};
jspb.BinaryWriter.prototype.writeInt64String=function(a,b){if(null!=b){var c=jspb.arith.Int64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT);this.encoder_.writeSplitVarint64(c.lo,c.hi)}};jspb.BinaryWriter.prototype.writeUint32=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeUnsignedVarint32_(a,b))};
jspb.BinaryWriter.prototype.writeUint32String=function(a,b){if(null!=b){var c=parseInt(b,10);goog.asserts.assert(0<=c&&c<jspb.BinaryConstants.TWO_TO_32);this.writeUnsignedVarint32_(a,c)}};jspb.BinaryWriter.prototype.writeUint64=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_64),this.writeUnsignedVarint64_(a,b))};
jspb.BinaryWriter.prototype.writeUint64String=function(a,b){if(null!=b){var c=jspb.arith.UInt64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT);this.encoder_.writeSplitVarint64(c.lo,c.hi)}};jspb.BinaryWriter.prototype.writeSint32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeZigzagVarint32_(a,b))};
jspb.BinaryWriter.prototype.writeSint64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeZigzagVarint64_(a,b))};jspb.BinaryWriter.prototype.writeSint64String=function(a,b){null!=b&&(goog.asserts.assert(+b>=-jspb.BinaryConstants.TWO_TO_63&&+b<jspb.BinaryConstants.TWO_TO_63),this.writeZigzagVarint64String_(a,b))};
jspb.BinaryWriter.prototype.writeFixed32=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeUint32(b))};jspb.BinaryWriter.prototype.writeFixed64=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_64),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeUint64(b))};
jspb.BinaryWriter.prototype.writeFixed64String=function(a,b){if(null!=b){var c=jspb.arith.UInt64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64);this.encoder_.writeSplitFixed64(c.lo,c.hi)}};jspb.BinaryWriter.prototype.writeSfixed32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeInt32(b))};
jspb.BinaryWriter.prototype.writeSfixed64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeInt64(b))};jspb.BinaryWriter.prototype.writeSfixed64String=function(a,b){if(null!=b){var c=jspb.arith.Int64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64);this.encoder_.writeSplitFixed64(c.lo,c.hi)}};
jspb.BinaryWriter.prototype.writeFloat=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeFloat(b))};jspb.BinaryWriter.prototype.writeDouble=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeDouble(b))};jspb.BinaryWriter.prototype.writeBool=function(a,b){null!=b&&(goog.asserts.assert(goog.isBoolean(b)||goog.isNumber(b)),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeBool(b))};
jspb.BinaryWriter.prototype.writeEnum=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(b))};jspb.BinaryWriter.prototype.writeString=function(a,b){if(null!=b){var c=this.beginDelimited_(a);this.encoder_.writeString(b);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writeBytes=function(a,b){if(null!=b){var c=jspb.utils.byteSourceToUint8Array(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(c.length);this.appendUint8Array_(c)}};jspb.BinaryWriter.prototype.writeMessage=function(a,b,c){null!=b&&(a=this.beginDelimited_(a),c(b,this),this.endDelimited_(a))};
jspb.BinaryWriter.prototype.writeGroup=function(a,b,c){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.START_GROUP),c(b,this),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.END_GROUP))};jspb.BinaryWriter.prototype.writeFixedHash64=function(a,b){null!=b&&(goog.asserts.assert(8==b.length),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeFixedHash64(b))};
jspb.BinaryWriter.prototype.writeVarintHash64=function(a,b){null!=b&&(goog.asserts.assert(8==b.length),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeVarintHash64(b))};jspb.BinaryWriter.prototype.writeRepeatedInt32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSignedVarint32_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedInt32String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeInt32String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedInt64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSignedVarint64_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedInt64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeInt64String(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUnsignedVarint32_(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedUint32String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUint32String(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUnsignedVarint64_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUint64String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedSint32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint32_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSint64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint64_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSint64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint64String_(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedFixed32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed32(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedFixed64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed64(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedFixed64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed64String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedSfixed32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed32(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSfixed64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed64(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSfixed64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed64String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedFloat=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFloat(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedDouble=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeDouble(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedBool=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeBool(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedEnum=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeEnum(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedString=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeString(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedBytes=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeBytes(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedMessage=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++){var e=this.beginDelimited_(a);c(b[d],this);this.endDelimited_(e)}};
jspb.BinaryWriter.prototype.writeRepeatedGroup=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++)this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.START_GROUP),c(b[d],this),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.END_GROUP)};jspb.BinaryWriter.prototype.writeRepeatedFixedHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixedHash64(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedVarintHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeVarintHash64(a,b[c])};jspb.BinaryWriter.prototype.writePackedInt32=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeSignedVarint32(b[d]);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedInt32String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeSignedVarint32(parseInt(b[d],10));this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedInt64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeSignedVarint64(b[d]);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedInt64String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++){var e=jspb.arith.Int64.fromString(b[d]);this.encoder_.writeSplitVarint64(e.lo,e.hi)}this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedUint32=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeUnsignedVarint32(b[d]);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedUint32String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeUnsignedVarint32(parseInt(b[d],10));this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedUint64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeUnsignedVarint64(b[d]);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedUint64String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++){var e=jspb.arith.UInt64.fromString(b[d]);this.encoder_.writeSplitVarint64(e.lo,e.hi)}this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedSint32=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeZigzagVarint32(b[d]);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedSint64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeZigzagVarint64(b[d]);this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedSint64String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeZigzagVarint64(parseInt(b[d],10));this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedFixed32=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(4*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeUint32(b[c])}};jspb.BinaryWriter.prototype.writePackedFixed64=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeUint64(b[c])}};
jspb.BinaryWriter.prototype.writePackedFixed64String=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++){var d=jspb.arith.UInt64.fromString(b[c]);this.encoder_.writeSplitFixed64(d.lo,d.hi)}}};
jspb.BinaryWriter.prototype.writePackedSfixed32=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(4*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeInt32(b[c])}};jspb.BinaryWriter.prototype.writePackedSfixed64=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeInt64(b[c])}};
jspb.BinaryWriter.prototype.writePackedSfixed64String=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeInt64String(b[c])}};jspb.BinaryWriter.prototype.writePackedFloat=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(4*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeFloat(b[c])}};
jspb.BinaryWriter.prototype.writePackedDouble=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeDouble(b[c])}};jspb.BinaryWriter.prototype.writePackedBool=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(b.length);for(var c=0;c<b.length;c++)this.encoder_.writeBool(b[c])}};
jspb.BinaryWriter.prototype.writePackedEnum=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeEnum(b[d]);this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedFixedHash64=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeFixedHash64(b[c])}};
jspb.BinaryWriter.prototype.writePackedVarintHash64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeVarintHash64(b[d]);this.endDelimited_(c)}};jspb.Export={};exports.Map=jspb.Map;exports.Message=jspb.Message;exports.BinaryReader=jspb.BinaryReader;exports.BinaryWriter=jspb.BinaryWriter;exports.ExtensionFieldInfo=jspb.ExtensionFieldInfo;exports.ExtensionFieldBinaryInfo=jspb.ExtensionFieldBinaryInfo;exports.exportSymbol=goog.exportSymbol;exports.inherits=goog.inherits;exports.object={extend:goog.object.extend};exports.typeOf=goog.typeOf;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/redux/es/redux.js":
/*!****************************************!*\
  !*** ./node_modules/redux/es/redux.js ***!
  \****************************************/
/*! exports provided: createStore, combineReducers, bindActionCreators, applyMiddleware, compose, __DO_NOT_USE__ActionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return bindActionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return applyMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE__ActionTypes", function() { return ActionTypes; });
/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js");


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (true) {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;

  if (true) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if ( true && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}




/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/symbol-observable/es/ponyfill.js");
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(root);
/* harmony default export */ __webpack_exports__["default"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
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

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./proto/blackbox_pb.js":
/*!******************************!*\
  !*** ./proto/blackbox_pb.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(/*! google-protobuf */ "./node_modules/google-protobuf/google-protobuf.js");
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Action', null, global);
goog.exportSymbol('proto.State', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.State = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.State.repeatedFields_, null);
};
goog.inherits(proto.State, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.State.displayName = 'proto.State';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.State.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.State.prototype.toObject = function(opt_includeInstance) {
  return proto.State.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.State} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.State.toObject = function(includeInstance, msg) {
  var f, obj = {
    messagesList: jspb.Message.getRepeatedField(msg, 1)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.State}
 */
proto.State.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.State;
  return proto.State.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.State} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.State}
 */
proto.State.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addMessages(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.State.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.State.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.State} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.State.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMessagesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string messages = 1;
 * @return {!Array<string>}
 */
proto.State.prototype.getMessagesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/** @param {!Array<string>} value */
proto.State.prototype.setMessagesList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.State.prototype.addMessages = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


proto.State.prototype.clearMessagesList = function() {
  this.setMessagesList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Action = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.Action.oneofGroups_);
};
goog.inherits(proto.Action, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Action.displayName = 'proto.Action';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.Action.oneofGroups_ = [[1]];

/**
 * @enum {number}
 */
proto.Action.TypeCase = {
  TYPE_NOT_SET: 0,
  SEND_MESSAGE: 1
};

/**
 * @return {proto.Action.TypeCase}
 */
proto.Action.prototype.getTypeCase = function() {
  return /** @type {proto.Action.TypeCase} */(jspb.Message.computeOneofCase(this, proto.Action.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Action.prototype.toObject = function(opt_includeInstance) {
  return proto.Action.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Action} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Action.toObject = function(includeInstance, msg) {
  var f, obj = {
    sendMessage: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Action}
 */
proto.Action.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Action;
  return proto.Action.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Action} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Action}
 */
proto.Action.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSendMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Action.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Action.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Action} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Action.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string send_message = 1;
 * @return {string}
 */
proto.Action.prototype.getSendMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.Action.prototype.setSendMessage = function(value) {
  jspb.Message.setOneofField(this, 1, proto.Action.oneofGroups_[0], value);
};


proto.Action.prototype.clearSendMessage = function() {
  jspb.Message.setOneofField(this, 1, proto.Action.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Action.prototype.hasSendMessage = function() {
  return jspb.Message.getField(this, 1) != null;
};


goog.object.extend(exports, proto);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibGFja0JveEhvb2tzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JsYWNrQm94SG9va3MvLi9pbmRleC5qcyIsIndlYnBhY2s6Ly9ibGFja0JveEhvb2tzLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ibGFja0JveEhvb2tzLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9ibGFja0JveEhvb2tzLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly9ibGFja0JveEhvb2tzLy4vbm9kZV9tb2R1bGVzL2dvb2dsZS1wcm90b2J1Zi9nb29nbGUtcHJvdG9idWYuanMiLCJ3ZWJwYWNrOi8vYmxhY2tCb3hIb29rcy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovL2JsYWNrQm94SG9va3MvLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvcmVkdXguanMiLCJ3ZWJwYWNrOi8vYmxhY2tCb3hIb29rcy8uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ibGFja0JveEhvb2tzLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzIiwid2VicGFjazovL2JsYWNrQm94SG9va3MvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL2JsYWNrQm94SG9va3MvKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vYmxhY2tCb3hIb29rcy8uL3Byb3RvL2JsYWNrYm94X3BiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtREFBbUQ7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFlBQVk7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNXZEQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSkEsbUVBQWEsUUFBUSx1QkFBdUIscUZBQXFGLHVDQUF1Qyw4QkFBOEIsOERBQThELGlDQUFpQyx5QkFBeUIsMkJBQTJCO0FBQ3pWLHNDQUFzQyxxQkFBcUIsbUdBQW1HLHlDQUF5QyxpQ0FBaUMsNkJBQTZCLHFCQUFxQiw2QkFBNkIseUJBQXlCLHNCQUFzQixRQUFRLE9BQU8sZ0JBQWdCLG1CQUFtQixxQkFBcUIsRUFBRTtBQUMvYSxzQ0FBc0MsZUFBZSxtQkFBbUIsaUJBQWlCLFVBQVUsc0NBQXNDLGdGQUFnRiwrQkFBK0IsY0FBYyx3QkFBd0Isa0JBQWtCLDBCQUEwQiwyQ0FBMkMsMkNBQTJDLGdDQUFnQyxnQkFBZ0I7QUFDaGQsd0NBQXdDLDZCQUE2Qiw2QkFBNkIsV0FBVyxnQkFBZ0IsZUFBZSxVQUFVLE9BQU8seUJBQXlCLGtCQUFrQixPQUFPLHVCQUF1QixrQkFBa0IscUJBQXFCLDZCQUE2Qiw4QkFBOEIsVUFBVTtBQUNsVixxQ0FBcUMsbUNBQW1DLHVCQUF1QixJQUFJLEtBQUssV0FBVywwQkFBMEIsU0FBUyxPQUFPO0FBQzdKLG1DQUFtQyw2QkFBNkIsd0JBQXdCLFVBQVUsU0FBUyxxQkFBcUIsNkJBQTZCLHlCQUF5QixvQ0FBb0Msa0NBQWtDLG1CQUFtQiwyQkFBMkIsNEJBQTRCLElBQUksMkJBQTJCLFVBQVUsNkJBQTZCO0FBQzVZLGlDQUFpQyxvREFBb0QsWUFBWSxHQUFHLDJDQUEyQyw4R0FBOEcsa0RBQWtELEdBQUcseUNBQXlDLCtEQUErRCw4QkFBOEIsa0RBQWtELFNBQVM7QUFDbmYsc0NBQXNDLHlEQUF5RCxnQ0FBZ0Msb0RBQW9ELFNBQVMsR0FBRyx3Q0FBd0M7QUFDdk8seUNBQXlDLGtCQUFrQixZQUFZLFlBQVksc0JBQXNCLDJCQUEyQixJQUFJLHNEQUFzRCxvQ0FBb0MsSUFBSSw4Q0FBOEMsYUFBYSw0Q0FBNEM7QUFDN1UsbUNBQW1DLHFCQUFxQix5QkFBeUIsb0JBQW9CLFlBQVkseUJBQXlCLG1CQUFtQixJQUFJLGNBQWMsYUFBYSxzQ0FBc0MseURBQXlELGlDQUFpQyx5Q0FBeUMsc0NBQXNDO0FBQzNZLHNDQUFzQyx5Q0FBeUMsMkNBQTJDLG1FQUFtRTtBQUM3TCxvQ0FBb0MseUNBQXlDLHlCQUF5QixxRUFBcUUsSUFBSSxtQkFBbUIsSUFBSSwyQ0FBMkMsb0NBQW9DLElBQUksVUFBVSxJQUFJLDZCQUE2Qiw2QkFBNkIsbURBQW1ELFdBQVcsc0VBQXNFLFNBQVM7QUFDOWUsd0JBQXdCLGNBQWMsb0NBQW9DLFlBQVksTUFBTSwwQkFBMEIsVUFBVSxtQkFBbUI7QUFDbkosd0NBQXdDLHdDQUF3QyxxQ0FBcUMsa0NBQWtDLDJFQUEyRSxnR0FBZ0c7QUFDbFUsNENBQTRDLG9DQUFvQyx3TUFBd00sdUNBQXVDLGNBQWMsd0RBQXdELGFBQWEsc0NBQXNDO0FBQ3hiLHNDQUFzQyw0REFBNEQseUNBQXlDLGtEQUFrRCxzQkFBc0IsR0FBRyxzQ0FBc0Msa0RBQWtELGFBQWEsR0FBRyx3Q0FBd0Msa0RBQWtELGVBQWU7QUFDdmEsNENBQTRDLDJCQUEyQixtQkFBbUIscUNBQXFDLHdDQUF3Qyx3Q0FBd0Msa0VBQWtFLFdBQVcsS0FBSyxXQUFXLDBDQUEwQyw2QkFBNkIsT0FBTztBQUMxWCx3Q0FBd0MsaUJBQWlCLGdCQUFnQixNQUFNLEtBQUssZ0JBQWdCLGNBQWMsS0FBSyxlQUFlLGtCQUFrQixvQkFBb0IsT0FBTyxPQUFPLHdCQUF3QixxQkFBcUIsNkJBQTZCLDhCQUE4QixVQUFVLFVBQVUsd0JBQXdCLGtDQUFrQyxTQUFTO0FBQ3pYLDhCQUE4Qix1Q0FBdUMsaUNBQWlDLGdEQUFnRCw4QkFBOEIsRUFBRSxVQUFVLDREQUE0RCxpRUFBaUUsMkJBQTJCLGdCQUFnQixFQUFFLGlCQUFpQixnQkFBZ0I7QUFDM1ksK0JBQStCLHFCQUFxQiw2QkFBNkIsOFFBQThRLEdBQUc7QUFDbFcsK0JBQStCLGdCQUFnQixtQkFBbUIsUUFBUSxtQ0FBbUMsaUNBQWlDLGlDQUFpQyxpQ0FBaUMsd0JBQXdCLFVBQVUsZ0NBQWdDLFlBQVksWUFBWSx3QkFBd0IsMERBQTBELDhCQUE4QixZQUFZO0FBQ3RhLCtCQUErQiw4QkFBOEIsOEJBQThCLDZCQUE2QiwrQkFBK0IsWUFBWSxrQkFBa0IsNEJBQTRCLEtBQUssNEJBQTRCLFNBQVMsc0JBQXNCLCtCQUErQixZQUFZLGtCQUFrQix3QkFBd0IsS0FBSyxvQkFBb0IsU0FBUyxzQkFBc0IsOEJBQThCLFlBQVk7QUFDeGMsOEJBQThCLFlBQVksNkNBQTZDLDhCQUE4QixZQUFZLGtCQUFrQiw2Q0FBNkMsaUJBQWlCLCtCQUErQixZQUFZLHFDQUFxQywrQkFBK0IsWUFBWSxrQkFBa0IsNkNBQTZDO0FBQzNZLCtCQUErQixZQUFZLHdEQUF3RCxtQ0FBbUMsWUFBWSxZQUFZLDhDQUE4QyxRQUFRLG1CQUFtQix5Q0FBeUMsc0JBQXNCLEtBQUssS0FBSyxVQUFVLFFBQVEsbUJBQW1CLG9DQUFvQyxzQkFBc0IsVUFBVSxRQUFRLG1CQUFtQixrQ0FBa0M7QUFDdGQsK0JBQStCLFlBQVkseURBQXlELDhCQUE4QixpQkFBaUIsOEJBQThCLGtCQUFrQixZQUFZLGdDQUFnQyxpQkFBaUIsa0NBQWtDLG9DQUFvQyxxRUFBcUUscUNBQXFDO0FBQ2hiLGlDQUFpQyxxQ0FBcUMseUNBQXlDLGtGQUFrRixrQ0FBa0MsdUJBQXVCLEdBQUcsMkNBQTJDLHdCQUF3QixHQUFHLDJDQUEyQyx3QkFBd0IsR0FBRztBQUN6WSxvQ0FBb0MsWUFBWSxtQkFBbUIsS0FBSyxtQkFBbUIsMkVBQTJFLFVBQVUsZ0NBQWdDLDRDQUE0QztBQUM1UCxvQ0FBb0MseUNBQXlDLHlCQUF5QixxRUFBcUUsSUFBSSxtQkFBbUIsSUFBSSxxQ0FBcUMsd0RBQXdELElBQUkseUJBQXlCLDZCQUE2QixpREFBaUQsV0FBVyx1RkFBdUYsU0FBUztBQUN6Zix3QkFBd0IsMEJBQTBCLE1BQU0sMEJBQTBCLFVBQVUsbUJBQW1CLG1CQUFtQiwwQkFBMEIsc0NBQXNDLG1CQUFtQix5QkFBeUIsYUFBYSw0Q0FBNEMseUJBQXlCLHlCQUF5QixVQUFVLHVDQUF1QyxrQkFBa0IsYUFBYSxzQ0FBc0M7QUFDL2MseUNBQXlDLDRCQUE0Qix3Q0FBd0MsMkJBQTJCLDRDQUE0QyxXQUFXLDhCQUE4Qix1QkFBdUIsR0FBRywrQkFBK0Isc0JBQXNCLGlOQUFpTjtBQUM3ZixrQ0FBa0Msd0NBQXdDLDRHQUE0Ryx3SEFBd0g7QUFDOVMseUNBQXlDLGlCQUFpQixtQkFBbUIsS0FBSywyQkFBMkIsbUZBQW1GLDZIQUE2SDtBQUM3VCxrQ0FBa0Msa0RBQWtELGlFQUFpRSxLQUFLLGFBQWEsRUFBRSw0QkFBNEIsVUFBVSx5Q0FBeUM7QUFDeFAsdUNBQXVDLGtFQUFrRSxlQUFlLGNBQWMsS0FBSyxzQkFBc0Isc0NBQXNDLG9CQUFvQixrREFBa0QsOENBQThDO0FBQzNULHNDQUFzQyx1RUFBdUUsMkNBQTJDLGdGQUFnRix3Q0FBd0MsbURBQW1ELE1BQU0sdUVBQXVFLFNBQVMsNEJBQTRCO0FBQ3JiLDZDQUE2QyxzRkFBc0Ysc0NBQXNDLGlEQUFpRCxNQUFNLHlCQUF5Qix3REFBd0QsU0FBUyw0QkFBNEIsYUFBYSwyQ0FBMkM7QUFDOVksOEJBQThCLGlCQUFpQix1QkFBdUIsbUJBQW1CLGlDQUFpQyxlQUFlLGlCQUFpQixtREFBbUQsVUFBVSx3QkFBd0I7QUFDL08sMEJBQTBCLFFBQVEsb1RBQW9ULHVCQUF1QixjQUFjLGlCQUFpQixxQkFBcUIsK0JBQStCO0FBQ2hjLDhDQUE4Qyx5QkFBeUIscUZBQXFGLDZCQUE2Qix1Q0FBdUMsY0FBYyxtQ0FBbUMsWUFBWSxnRUFBZ0UsZ0NBQWdDLHVCQUF1QjtBQUNwWix3QkFBd0IsdUdBQXVHLHNGQUFzRixxR0FBcUcscUNBQXFDLGNBQWMsMEVBQTBFLHFDQUFxQyw0QkFBNEI7QUFDeGYscUNBQXFDLHNIQUFzSCw2QkFBNkIsa0NBQWtDO0FBQzFOLDhDQUE4QyxtSUFBbUkseUlBQXlJO0FBQzFULDZCQUE2Qiw0SEFBNEgsa0NBQWtDLHdDQUF3Qyw2R0FBNkcsMkJBQTJCLGlCQUFpQjtBQUM1WCxtQ0FBbUMsMENBQTBDLFlBQVksc0NBQXNDLGlCQUFpQixVQUFVLDZCQUE2Qix1QkFBdUIsc0JBQXNCLHFDQUFxQyw4QkFBOEIsTUFBTSx1QkFBdUIsaUNBQWlDLE9BQU8sNENBQTRDLFFBQVEsT0FBTyxzQ0FBc0M7QUFDN2MsNEJBQTRCLCtCQUErQixtREFBbUQseUJBQXlCLGNBQWMsNEVBQTRFLHdGQUF3Riw2QkFBNkIsK0JBQStCLHVDQUF1QyxvQ0FBb0Msc0JBQXNCO0FBQ3RkLGlCQUFpQiwrQkFBK0IsK0JBQStCLCtDQUErQyxvQ0FBb0MseUJBQXlCLGtDQUFrQyxrRkFBa0YsMkJBQTJCLGdDQUFnQywrQkFBK0Isb0NBQW9DLHVCQUF1QjtBQUNwYyxnREFBZ0QsZUFBZSxjQUFjLFlBQVksV0FBVyxXQUFXLGFBQWEsaUNBQWlDLDJCQUEyQiw0QkFBNEIsK0JBQStCLHlGQUF5RiwwR0FBMEcsS0FBSyxLQUFLO0FBQ2hjLEVBQUUsK0JBQStCLDhCQUE4QixRQUFRLGtDQUFrQyxtR0FBbUcsc0hBQXNILDREQUE0RCx1Q0FBdUMsdURBQXVEO0FBQzVkLDJHQUEyRyxzQ0FBc0MsYUFBYSxRQUFRLGVBQWUsRUFBRSx5QkFBeUIsb0NBQW9DLGlDQUFpQyxRQUFRLDBCQUEwQix1QkFBdUIsWUFBWSxJQUFJLDBDQUEwQywyQ0FBMkM7QUFDbmIsaURBQWlELG9DQUFvQyx5SEFBeUgsdUNBQXVDLDJLQUEySyxTQUFTLDRDQUE0QyxxQ0FBcUM7QUFDMWYsK0JBQStCLHNDQUFzQyxvQkFBb0Isb0NBQW9DLCtCQUErQiw2QkFBNkIsOEJBQThCLElBQUkseUJBQXlCLDZDQUE2QyxNQUFNLDZDQUE2QyxFQUFFLDBFQUEwRSw4Q0FBOEM7QUFDOWMsb0VBQW9FLG1JQUFtSSx5QkFBeUIsUUFBUSwyQkFBMkIsd0NBQXdDLFFBQVEsU0FBUyxzQ0FBc0Msc0ZBQXNGLHVDQUF1QztBQUMvZCw0QkFBNEIseUJBQXlCLFFBQVEsV0FBVyxXQUFXLHNCQUFzQixvQ0FBb0MsMkJBQTJCLDJCQUEyQiwwRUFBMEUsaUNBQWlDLHlEQUF5RCxzQkFBc0I7QUFDN1gsMExBQTBMLFNBQVMsU0FBUyxtRUFBbUUsdUZBQXVGLFNBQVMsZ0NBQWdDLGNBQWMsc0NBQXNDLGdCQUFnQjtBQUNuZCxnQ0FBZ0MsZ0RBQWdELDZCQUE2QixhQUFhLHNCQUFzQixLQUFLLFFBQVEsV0FBVyxLQUFLLFdBQVcsaUNBQWlDLDhCQUE4Qiw2QkFBNkIsUUFBUSxXQUFXLHdHQUF3RyxxRUFBcUUsMEJBQTBCO0FBQzllLFlBQVksZ0ZBQWdGLGdHQUFnRyxnQ0FBZ0MsZUFBZSxZQUFZLFdBQVcsaUZBQWlGO0FBQ25WLCtCQUErQixtRkFBbUYscUNBQXFDLG1CQUFtQixTQUFTO0FBQ25MLHdDQUF3QyxjQUFjLFFBQVEseUJBQXlCLHNGQUFzRix5SEFBeUg7QUFDdFMsd0JBQXdCLGVBQWUscUJBQXFCLG9DQUFvQyxnQ0FBZ0Msd0NBQXdDLHVDQUF1Qyw2S0FBNkssb0pBQW9KO0FBQ2hoQixpRUFBaUUsVUFBVSx3QkFBd0IsaUJBQWlCLGlDQUFpQyxnQkFBZ0IseUJBQXlCLCtCQUErQiw2QkFBNkIscUJBQXFCLDBEQUEwRCw0QkFBNEIsMkRBQTJELDBCQUEwQjtBQUMxYiwyQkFBMkIsMkJBQTJCLDBCQUEwQiwwQkFBMEIsNEJBQTRCLGtDQUFrQywwQkFBMEIsZUFBZSwyQ0FBMkMsd0JBQXdCLDBFQUEwRSx3QkFBd0I7QUFDdFgsMkJBQTJCLHVFQUF1RSxJQUFJLDZCQUE2QixZQUFZLDBEQUEwRCxtQkFBbUIsNkJBQTZCLG1DQUFtQyw2QkFBNkIscUJBQXFCLDRCQUE0Qiw0QkFBNEIsc0JBQXNCLEdBQUcsdUNBQXVDLFNBQVM7QUFDL2MsaUNBQWlDLHVDQUF1Qyw2QkFBNkIsb0JBQW9CLHVCQUF1Qiw4Q0FBOEMsa0JBQWtCLDRDQUE0QyxtQ0FBbUMscUJBQXFCLGtCQUFrQjtBQUN0VSwwQkFBMEIseUlBQXlJLHdDQUF3QywyQkFBMkIsOENBQThDLGtCQUFrQixnQkFBZ0IsMEJBQTBCLHlCQUF5Qix5QkFBeUIsMEJBQTBCLGlEQUFpRDtBQUM3Yyw0QkFBNEIsaUVBQWlFLDBCQUEwQiwyRUFBMkUsK0NBQStDLElBQUksOEJBQThCLFVBQVUsNkJBQTZCLGtDQUFrQyxpREFBaUQsS0FBSyx1REFBdUQseUJBQXlCLFdBQVc7QUFDN2Usc0JBQXNCLHVCQUF1QixvREFBb0QsK0JBQStCLDhCQUE4QixrQkFBa0Isa0NBQWtDLGVBQWUsZUFBZSxpQkFBaUIsV0FBVyxvQkFBb0IsbUJBQW1CLDhFQUE4RSxVQUFVO0FBQzNZLHFDQUFxQyx1QkFBdUIsNkJBQTZCLDZHQUE2RywwQkFBMEIsbUJBQW1CLE1BQU0sSUFBSSxpQkFBaUIsOEJBQThCLEdBQUcsVUFBVSxzQ0FBc0MsVUFBVSxrQ0FBa0MseUJBQXlCLG9DQUFvQztBQUN4Yyw0QkFBNEIsY0FBYyx3QkFBd0IsMEJBQTBCLGtCQUFrQiwwQkFBMEIsdUJBQXVCLHdDQUF3QyxtQkFBbUIsd0JBQXdCO0FBQ2xQLDBCQUEwQiw4QkFBOEIseU1BQXlNLGtCQUFrQix3Q0FBd0MsbUJBQW1CLHdCQUF3Qiw0Q0FBNEMsNEJBQTRCLFFBQVEsbUJBQW1CLHdCQUF3Qiw2QkFBNkIsRUFBRTtBQUNoZ0Isb0VBQW9FLDJDQUEyQyx5REFBeUQsNEZBQTRGLHVCQUF1QixxQkFBcUI7QUFDaFQsK0JBQStCLGdDQUFnQyxrREFBa0QsMEVBQTBFLEVBQUUsa0RBQWtELHNCQUFzQixxQkFBcUIsaUJBQWlCLGlEQUFpRCw2RUFBNkUsVUFBVTtBQUNuYix5REFBeUQsMkVBQTJFLCtFQUErRSxpQkFBaUIsb0NBQW9DLDRDQUE0QyxxQ0FBcUMsVUFBVSxTQUFTLFVBQVU7QUFDdFgsZ0RBQWdELHNFQUFzRSxZQUFZLG1EQUFtRCwyR0FBMkcsb0NBQW9DLDJHQUEyRywyRUFBMkUsWUFBWSxtQkFBbUIsMEtBQTBLLGNBQWMsNkJBQTZCLDBFQUEwRSxLQUFLLG9CQUFvQixrQkFBa0IsNEJBQTRCLDZCQUE2QixzQ0FBc0MsOENBQThDLGVBQWUsc0NBQXNDLDZDQUE2QyxxQkFBcUIsZUFBZSxxQ0FBcUMsOEJBQThCLG1DQUFtQyx3QkFBd0IsZ0NBQWdDLG9EQUFvRDtBQUN4MEMsa0RBQWtELHNGQUFzRixnREFBZ0QseUNBQXlDLCtCQUErQix1RUFBdUUscUJBQXFCLHdCQUF3Qix1QkFBdUIsMkNBQTJDO0FBQ3RiLDRDQUE0Qyw2QkFBNkIsc0NBQXNDLG9CQUFvQixvREFBb0QsZ0RBQWdELGlFQUFpRSw0REFBNEQsNkNBQTZDLDZCQUE2QixnQ0FBZ0M7QUFDOWMsa0NBQWtDLHlCQUF5Qix1Q0FBdUMsK0JBQStCLGdDQUFnQyxjQUFjLHNDQUFzQyw4REFBOEQsc0NBQXNDLHdDQUF3Qyw2Q0FBNkM7QUFDOVksNENBQTRDLGtDQUFrQyx3Q0FBd0Msc0NBQXNDLCtDQUErQyw0RUFBNEUsc0VBQXNFLGdCQUFnQixhQUFhLCtDQUErQyxpQ0FBaUM7QUFDMWMsa0NBQWtDLG1DQUFtQyxpREFBaUQsd0RBQXdEO0FBQzlLLGdEQUFnRCxpQkFBaUIsZUFBZSxlQUFlLGdHQUFnRyxJQUFJLEtBQUssT0FBTyxXQUFXLDBGQUEwRixzREFBc0QsMENBQTBDO0FBQ3BaLDRDQUE0Qyw4REFBOEQsMERBQTBELGtDQUFrQyxzQ0FBc0Msa0NBQWtDLGlEQUFpRCxzQ0FBc0M7QUFDclcscUNBQXFDLDJDQUEyQyxtQ0FBbUMsbUNBQW1DLHVDQUF1Qyw4Q0FBOEMscUNBQXFDLDZFQUE2RSxJQUFJLEtBQUsseUNBQXlDLDJEQUEyRCxJQUFJO0FBQzljLEtBQUssSUFBSSx5REFBeUQsSUFBSSw2REFBNkQsSUFBSSxvRUFBb0UsSUFBSSw4REFBOEQsSUFBSSw4RkFBOEYsSUFBSSxVQUFVLHlCQUF5Qix3QkFBd0Isd0JBQXdCO0FBQ3RjLGtDQUFrQyw2QkFBNkIsdUJBQXVCLG9GQUFvRix5Q0FBeUM7QUFDbk4sdURBQXVEO0FBQ3ZELG9EQUFvRCxPQUFPLE1BQU0sV0FBVyxXQUFXLGFBQWEsTUFBTSxHQUFHLHFFQUFxRSxnRUFBZ0UsV0FBVyxjQUFjLHFCQUFxQiw4QkFBOEIscUNBQXFDLDREQUE0RCxjQUFjO0FBQzdhLGlEQUFpRCx1QkFBdUIsSUFBSSxpQkFBaUIsVUFBVSxxQkFBcUIsb0JBQW9CLG9CQUFvQixzQkFBc0IsNkJBQTZCLDhCQUE4QiwyQ0FBMkMsVUFBVSxHQUFHLHVDQUF1QyxRQUFRLElBQUksMkNBQTJDLHVEQUF1RDtBQUNsYyx1Q0FBdUMsK0RBQStELHNDQUFzQyx1QkFBdUIsSUFBSSxLQUFLLHlCQUF5Qiw0RUFBNEUsVUFBVSxxQ0FBcUMsdUNBQXVDLHlDQUF5QyxpQ0FBaUM7QUFDamIsNkNBQTZDLHVDQUF1QyxrQkFBa0IsV0FBVyxpQkFBaUIsMENBQTBDLDhGQUE4RixpQ0FBaUMsVUFBVSxpQ0FBaUMsa0hBQWtILDRCQUE0QjtBQUNwZSw4QkFBOEIsWUFBWSxvQkFBb0IsV0FBVyxLQUFLLG9DQUFvQyxxRkFBcUYsWUFBWSxtQkFBbUIscUNBQXFDLGlCQUFpQixXQUFXLDZDQUE2QztBQUNwVixtQ0FBbUMsd0VBQXdFLGdIQUFnSCx3QkFBd0IsbUJBQW1CLEtBQUssVUFBVSw4QkFBOEIsOEJBQThCLGdDQUFnQyx3Q0FBd0MsbUNBQW1DO0FBQzViLGtEQUFrRCw4REFBOEQsa0NBQWtDLG1DQUFtQyxxQ0FBcUMsUUFBUSxvRUFBb0UsVUFBVSxpQ0FBaUMsaURBQWlEO0FBQ2xZLG9DQUFvQyxrREFBa0Qsd0JBQXdCLHFDQUFxQyxxQ0FBcUMsc0RBQXNELHlEQUF5RCxtQkFBbUIsZUFBZTtBQUN6VSxzQ0FBc0MsdUNBQXVDLGlCQUFpQixvQkFBb0Isa0RBQWtELGlDQUFpQyw2QkFBNkIsb0NBQW9DLGdEQUFnRCx1Q0FBdUM7QUFDN1YsMENBQTBDLGdJQUFnSSxVQUFVLEtBQUssb0ZBQW9GLEdBQUcsb0RBQW9ELHdDQUF3QztBQUM1VyxxRUFBcUUsWUFBWSxVQUFVLDJDQUEyQyx1QkFBdUIsaUNBQWlDLGdCQUFnQixXQUFXLCtCQUErQixVQUFVLDREQUE0RCwwQ0FBMEM7QUFDeFcsaUNBQWlDLGdCQUFnQix1REFBdUQseUNBQXlDLHdDQUF3Qyx5Q0FBeUMsa0NBQWtDLG9DQUFvQyxvREFBb0QsdUJBQXVCLEdBQUcsdUNBQXVDO0FBQzdaLHNDQUFzQyx5REFBeUQsb0ZBQW9GLHlCQUF5QixHQUFHLG1DQUFtQyw0RUFBNEUsaUNBQWlDLDJCQUEyQjtBQUMxWCx1Q0FBdUMsYUFBYSxhQUFhLGNBQWMsdUJBQXVCLDRCQUE0QixVQUFVLHVDQUF1QyxjQUFjLGlCQUFpQiwyREFBMkQsWUFBWSxhQUFhLFdBQVcsUUFBUSxXQUFXLEtBQUssU0FBUyxZQUFZLFdBQVcsNkRBQTZELFFBQVEsV0FBVyxjQUFjLG9CQUFvQixnQkFBZ0IsdUNBQXVDLDBDQUEwQyxhQUFhLDJEQUEyRCxVQUFVLHVCQUF1Qiw0REFBNEQsNERBQTRELCtDQUErQyxVQUFVO0FBQ3QxQixnREFBZ0QseUJBQXlCLDBCQUEwQix3QkFBd0IsOENBQThDLCtCQUErQix5Q0FBeUMsNkRBQTZELG9DQUFvQyxrSEFBa0g7QUFDcGMsZ0NBQWdDLDJKQUEySiwwQ0FBMEMsOEtBQThLO0FBQ25aLDBDQUEwQyw4S0FBOEssVUFBVSw0Q0FBNEMsa0xBQWtMO0FBQ2hjLDBDQUEwQyw4S0FBOEssVUFBVSx5Q0FBeUMsNEtBQTRLO0FBQ3ZiLDJDQUEyQyxnTEFBZ0wsVUFBVSwyQ0FBMkMsc05BQXNOO0FBQ3RlLGdEQUFnRCxnTkFBZ04sVUFBVSxzREFBc0Q7QUFDaFUsa0NBQWtDLHVNQUF1TSxVQUFVLGtCQUFrQixZQUFZLGtCQUFrQixhQUFhLGlCQUFpQiw0Q0FBNEMsNkNBQTZDLFlBQVksbUJBQW1CLEtBQUssMEJBQTBCLG9EQUFvRDtBQUM1Z0Isc0NBQXNDLGtCQUFrQixvQkFBb0Isa0JBQWtCLHlEQUF5RCx3QkFBd0IsaUJBQWlCLEtBQUssbUJBQW1CLHFCQUFxQixTQUFTLFFBQVEsV0FBVyxLQUFLLHNCQUFzQixnQ0FBZ0MsZ0NBQWdDLGlCQUFpQjtBQUNyWCwwQ0FBMEMsa0NBQWtDLFdBQVcsS0FBSyxvQ0FBb0MsbUJBQW1CLHFCQUFxQiwwRUFBMEUsVUFBVSxvQ0FBb0MscUJBQXFCLFlBQVksV0FBVyxLQUFLLDJCQUEyQixXQUFXLFVBQVUsNENBQTRDLFlBQVk7QUFDemIsMERBQTBELG1DQUFtQyxxQ0FBcUMsRUFBRSx1QkFBdUIscUJBQXFCLHFKQUFxSixZQUFZLEVBQUUsd0NBQXdDLGtDQUFrQyxvQ0FBb0MsYUFBYTtBQUM5YyxtQ0FBbUMsZUFBZSxrQ0FBa0Msb0JBQW9CLGlCQUFpQixVQUFVLDJDQUEyQyw4QkFBOEIsU0FBUyxZQUFZLFdBQVcsS0FBSyxzQkFBc0Isd0JBQXdCLFVBQVUsc0NBQXNDLDhCQUE4QixTQUFTLFlBQVksV0FBVyxLQUFLLHNCQUFzQixtQ0FBbUM7QUFDM2MsbUNBQW1DLDhCQUE4QixTQUFTLFlBQVksV0FBVyxnQ0FBZ0MsK0NBQStDLHFDQUFxQyw4QkFBOEIsU0FBUyxZQUFZLFdBQVcsNkNBQTZDO0FBQ2hVLHlDQUF5Qyx5QkFBeUIsU0FBUyxZQUFZLFdBQVcsS0FBSyxzQkFBc0IsMENBQTBDLHFDQUFxQyw2QkFBNkIsaUVBQWlFLDBCQUEwQixpQkFBaUIsYUFBYSwwQ0FBMEM7QUFDNVksbUNBQW1DLHdEQUF3RCxtQ0FBbUMsaUNBQWlDLHVEQUF1RCx5QkFBeUIsU0FBUyxZQUFZLFdBQVcsS0FBSyxzQkFBc0IscUJBQXFCLGtCQUFrQixxRUFBcUU7QUFDdFosaURBQWlELGlCQUFpQiwrQkFBK0IsRUFBRSx5QkFBeUIsNEdBQTRHLCtCQUErQiwrQkFBK0IsWUFBWSwwQ0FBMEMsdUJBQXVCLGdFQUFnRTtBQUNuYiw4QkFBOEIsV0FBVyxhQUFhLDBCQUEwQixjQUFjLCtDQUErQyxzQ0FBc0MsNEJBQTRCLHNCQUFzQjtBQUNyTywrSEFBK0gsb0NBQW9DLDJDQUEyQyxpQkFBaUIseUNBQXlDLDJFQUEyRSxLQUFLLFdBQVcsaUNBQWlDO0FBQ3BZLHVJQUF1SSxvQ0FBb0Msa0VBQWtFLGlCQUFpQix1QkFBdUIsZ0NBQWdDLCtFQUErRSxLQUFLLEtBQUssaUNBQWlDO0FBQy9hLCtIQUErSCxvQ0FBb0Msb0NBQW9DLGlCQUFpQix3REFBd0QsSUFBSSxnQ0FBZ0Msd0NBQXdDLDBEQUEwRCxLQUFLO0FBQzNaLDZIQUE2SCxvQ0FBb0MsMENBQTBDLGlCQUFpQixpRUFBaUUsSUFBSSxlQUFlLFdBQVcsNEJBQTRCO0FBQ3ZWLHVIQUF1SCxvQ0FBb0MsdUNBQXVDLGlCQUFpQixtRUFBbUUsSUFBSSxzQ0FBc0M7QUFDaFUsK0hBQStILG9DQUFvQyxzQkFBc0IsMENBQTBDLG1CQUFtQixRQUFRLG1DQUFtQyxvQkFBb0IsRUFBRTtBQUN2VCx5SUFBeUksb0NBQW9DLDZCQUE2QixzQkFBc0IsK0NBQStDLG1CQUFtQixRQUFRLHdDQUF3QyxvQkFBb0IsRUFBRTtBQUN4Vyx5SEFBeUgsb0NBQW9DLHdDQUF3QyxpQkFBaUIsd0RBQXdELElBQUksMkNBQTJDO0FBQzdULDJIQUEySCxvQ0FBb0MseUNBQXlDLGlCQUFpQix3REFBd0QsSUFBSSw0Q0FBNEMsVUFBVSxpQ0FBaUMsUUFBUSxxQ0FBcUMscUJBQXFCLElBQUk7QUFDbGIsZ0NBQWdDLDhCQUE4QixtREFBbUQscUNBQXFDLHdEQUF3RCxJQUFJLDJDQUEyQyxVQUFVLHFDQUFxQyxtQ0FBbUM7QUFDL1UsMENBQTBDLDBEQUEwRCxLQUFLLDJDQUEyQyxVQUFVLGtDQUFrQyxtQ0FBbUMsK0JBQStCLG9CQUFvQiw2QkFBNkIseUNBQXlDLEtBQUssZ0JBQWdCLFlBQVksZ0NBQWdDO0FBQzdaLG9DQUFvQyw0QkFBNEIseUNBQXlDLHFEQUFxRCx3Q0FBd0MsTUFBTSx5RkFBeUYsZ0NBQWdDLGdDQUFnQyxtQ0FBbUM7QUFDeFksa0NBQWtDLG9DQUFvQyxxREFBcUQsb0NBQW9DLDhCQUE4Qiw4Q0FBOEMsdUNBQXVDLFFBQVEsd0NBQXdDLCtDQUErQyxFQUFFLFVBQVUsOEJBQThCO0FBQzNaLDRCQUE0QixnRUFBZ0UsK0JBQStCLGVBQWUsUUFBUSx1QkFBdUIsSUFBSSxjQUFjLFNBQVMsVUFBVSxvQ0FBb0MsZ0NBQWdDLFlBQVksbUJBQW1CLEtBQUssbUJBQW1CLHdCQUF3QixnQ0FBZ0MsYUFBYSxZQUFZLElBQUksZ0JBQWdCO0FBQzlhLG9DQUFvQyxvQ0FBb0Msc0VBQXNFLGlDQUFpQyxvQ0FBb0M7QUFDbk4sNENBQTRDLE9BQU8sa0JBQWtCLG1FQUFtRSxPQUFPLFlBQVksU0FBUyxXQUFXLEVBQUUsb0JBQW9CLDhEQUE4RCxZQUFZLHdDQUF3QyxzRUFBc0Usd0NBQXdDO0FBQ3JhLDZDQUE2Qyx5QkFBeUIsSUFBSSxFQUFFLGVBQWUsaUNBQWlDLHFCQUFxQixlQUFlLDhCQUE4QixzQ0FBc0Msb0NBQW9DLFlBQVksV0FBVyxVQUFVLG9CQUFvQixtQ0FBbUMsZ0NBQWdDLDJDQUEyQyxFQUFFLFFBQVEsV0FBVztBQUNoYyxxQ0FBcUMsbUNBQW1DLGdDQUFnQyxvQkFBb0IsR0FBRyw0Q0FBNEMsbUNBQW1DLFlBQVksS0FBSyxvQ0FBb0MsK0JBQStCLFlBQVksV0FBVyxLQUFLLHFCQUFxQix5QkFBeUI7QUFDNVcsa0NBQWtDLDJFQUEyRSxlQUFlLHVDQUF1QyxZQUFZLElBQUksOEJBQThCLFVBQVUsb0NBQW9DLCtCQUErQiwwQ0FBMEMsSUFBSSxLQUFLLG1CQUFtQixpQkFBaUIscURBQXFELHdDQUF3QztBQUNsZCwrQ0FBK0MsdUNBQXVDLGdEQUFnRCxjQUFjLHdDQUF3QyxpQ0FBaUMsb0RBQW9ELHdDQUF3QyxpQ0FBaUM7QUFDMVYsa0NBQWtDLFlBQVksS0FBSyxXQUFXLEtBQUssNkJBQTZCLHlDQUF5QyxVQUFVLG9DQUFvQyxTQUFTLG1DQUFtQyxxQkFBcUIsRUFBRSxVQUFVLGlDQUFpQyxpQkFBaUIsT0FBTyxzQkFBc0Isc0JBQXNCLGVBQWUsSUFBSSxlQUFlLGFBQWEsSUFBSSxlQUFlO0FBQzNhLGdDQUFnQyxpQkFBaUIsSUFBSSxXQUFXLFVBQVUsK0JBQStCLGlCQUFpQixtQkFBbUIsS0FBSyxtQkFBbUIsK0JBQStCLFdBQVcsc0ZBQXNGLFdBQVcsaUJBQWlCLGVBQWU7QUFDaFYsZ0NBQWdDLG9DQUFvQyw4SEFBOEgsVUFBVSxvQ0FBb0Msc0NBQXNDLHNDQUFzQyxxQ0FBcUM7QUFDalcsMkJBQTJCLDhCQUE4Qix1Q0FBdUMsbUJBQW1CLG1EQUFtRCxRQUFRLElBQUksS0FBSyxpQkFBaUIsbUJBQW1CLDRCQUE0QixVQUFVLFVBQVUsaUNBQWlDLHNDQUFzQyxJQUFJLEtBQUssbUNBQW1DLFVBQVUsU0FBUyxxQ0FBcUMsU0FBUyxpQ0FBaUMsYUFBYSxFQUFFLFVBQVUsd0JBQXdCLHFDQUFxQyxnQ0FBZ0MsZ0NBQWdDLDJNQUEyTSwrQkFBK0I7QUFDaDJCLHFEQUFxRCxxRUFBcUUsVUFBVSx5SUFBeUksNkVBQTZFLDZEQUE2RCw2REFBNkQ7QUFDcGQsNkNBQTZDLHVEQUF1RCx3REFBd0QsdURBQXVELDBDQUEwQyx5REFBeUQsd0RBQXdELHVDQUF1Qyx1Q0FBdUM7QUFDNWIsMENBQTBDLGdEQUFnRCxrREFBa0QscURBQXFELGtFQUFrRSxjQUFjLHlDQUF5QyxxQkFBcUIsV0FBVyxLQUFLLDBCQUEwQixNQUFNLG9CQUFvQixTQUFTLFVBQVUseUNBQXlDLDJEQUEyRCxpQkFBaUIsV0FBVyxpRkFBaUYsVUFBVSxzQ0FBc0Msb0NBQW9DLGlCQUFpQiwwQkFBMEI7QUFDdHZCLHNDQUFzQyw2RUFBNkUsaUJBQWlCLFdBQVcsNkNBQTZDO0FBQzVMLDZDQUE2QyxxQkFBcUIsV0FBVyxLQUFLLHNCQUFzQixzUEFBc1A7QUFDOVYsNkNBQTZDLHFCQUFxQixXQUFXLEVBQUUsYUFBYSx1Q0FBdUMsc0JBQXNCLGFBQWEsMkNBQTJDLHNCQUFzQiw2RUFBNkUsMENBQTBDLDJDQUEyQyw2RUFBNkU7QUFDdGQsc0NBQXNDLHVFQUF1RSxpQkFBaUIsV0FBVyxzQkFBc0IsVUFBVSxhQUFhLHVCQUF1Qiw0QkFBNEIsOERBQThELCtDQUErQyxnQ0FBZ0Msa0RBQWtELDhCQUE4Qix5RkFBeUYsa0RBQWtEO0FBQ2psQixpREFBaUQsNENBQTRDLG9EQUFvRCw4Q0FBOEMsa0NBQWtDLDhEQUE4RCw4Q0FBOEM7QUFDN1UsMERBQTBELDBFQUEwRSxZQUFZLGtDQUFrQyxVQUFVLGdDQUFnQyxrREFBa0QsMkRBQTJELCtDQUErQyx3REFBd0QsaURBQWlELDhKQUE4SiwrQ0FBK0M7QUFDOXFCLDhDQUE4Qyw4SEFBOEgsb0RBQW9ELDZEQUE2RCxnREFBZ0QseURBQXlELGtEQUFrRDtBQUN4YixtREFBbUQ7QUFDbkQsbURBQW1ELG1EQUFtRCxnWkFBZ1osUUFBUTtBQUM5ZixxSUFBcUksY0FBYywyREFBMkQsb0ZBQW9GLGVBQWUsb0NBQW9DLG1DQUFtQyxtQ0FBbUMsUUFBUSxHQUFHLDJDQUEyQyxVQUFVLGdDQUFnQyxRQUFRLEdBQUcsbUNBQW1DLFVBQVUsaUNBQWlDLDhDQUE4QyxVQUFVLGtDQUFrQywrQ0FBK0M7QUFDN3RCLGlDQUFpQyxVQUFVLGVBQWUsVUFBVSxrQ0FBa0MseUJBQXlCLG9DQUFvQyw0QkFBNEIsbUNBQW1DLHVDQUF1QyxrQ0FBa0MsZUFBZSx1QkFBdUIsVUFBVSxnQ0FBZ0MsZUFBZSxvQkFBb0I7QUFDOVoseUNBQXlDLHNEQUFzRCxzQ0FBc0MsS0FBSyxVQUFVLHNDQUFzQyx5QkFBeUIsd0NBQXdDLG1DQUFtQyxVQUFVLG9DQUFvQywrQ0FBK0Msc0NBQXNDO0FBQ2phLGdDQUFnQyx3QkFBd0IsVUFBVSw4QkFBOEIsNEJBQTRCLGlDQUFpQyxNQUFNLHdCQUF3QixVQUFVLGdDQUFnQywrRUFBK0Usd0JBQXdCLGdDQUFnQyxnQ0FBZ0MsZ0NBQWdDO0FBQzVhLDJDQUEyQywyQkFBMkIsdURBQXVELHNCQUFzQixNQUFNLGVBQWUsaUNBQWlDLGtEQUFrRCxpQ0FBaUMsVUFBVSw4QkFBOEIsUUFBUSxHQUFHLHFCQUFxQjtBQUNwVyxvQ0FBb0MscUJBQXFCLDRCQUE0Qiw2Q0FBNkMsc0JBQXNCLEdBQUcsOENBQThDLFNBQVMsVUFBVSxrQ0FBa0MsUUFBUSxHQUFHLHFCQUFxQixVQUFVO0FBQ3hTLGlDQUFpQyxnQkFBZ0IsbUJBQW1CLEtBQUssZUFBZSxxQkFBcUIsWUFBWSx1Q0FBdUM7QUFDaEssK0JBQStCLHVCQUF1Qix1RkFBdUYsaURBQWlELFlBQVksS0FBSyxJQUFJLG9DQUFvQyxVQUFVLGtDQUFrQyx1QkFBdUIsMEZBQTBGLFlBQVksS0FBSyxJQUFJLHVCQUF1QjtBQUNoYyw0Q0FBNEMsUUFBUSw0RUFBNEUsVUFBVSx3Q0FBd0MsNkNBQTZDLCtCQUErQixtREFBbUQseUdBQXlHLGdEQUFnRCw0R0FBNEcsa0RBQWtELHdEQUF3RCxxREFBcUQ7QUFDcnRCLG9EQUFvRCxtVUFBbVUsbURBQW1EO0FBQzFhLHdEQUF3RDtBQUN4RCxvREFBb0Qsb01BQW9NLDREQUE0RDtBQUNwVCw0RUFBNEUsc0VBQXNFLDBFQUEwRSxnRkFBZ0YsOEVBQThFLDRFQUE0RTtBQUN0Yyw4RUFBOEUsOEZBQThGLDhDQUE4QztBQUMxTixrREFBa0QsY0FBYyx1QkFBdUIsZ0JBQWdCLDhDQUE4QywwRkFBMEYsNERBQTRELGlDQUFpQyxhQUFhLEVBQUUsOENBQThDO0FBQ3pZLDZGQUE2RiwwREFBMEQ7QUFDdkosc0RBQXNELCtCQUErQix1QkFBdUIscUNBQXFDLCtFQUErRSxtQkFBbUIsTUFBTSxtQkFBbUIsTUFBTSxvQkFBb0IsTUFBTSxvQkFBb0IsYUFBYSxZQUFZLFVBQVUsOEJBQThCLCtDQUErQywwREFBMEQsZ0RBQWdELDRHQUE0Ryw2Q0FBNkM7QUFDbnJCLCtDQUErQywwR0FBMEcsOENBQThDO0FBQ3ZNLGlEQUFpRCw4Q0FBOEMsTUFBTSx1R0FBdUcsd0ZBQXdGLGFBQWEsbUNBQW1DLDBCQUEwQjtBQUM5Vyx1REFBdUQsb0RBQW9ELFlBQVksV0FBVyxLQUFLLFdBQVcsMkJBQTJCLHlEQUF5RCxrRkFBa0YsMkRBQTJELG9DQUFvQyxlQUFlLEVBQUUsb0JBQW9CLGtCQUFrQiw0QkFBNEIsOEJBQThCLCtCQUErQixnQ0FBZ0MsdUNBQXVDLCtCQUErQixxQ0FBcUMsZ05BQWdOLDZDQUE2QztBQUMvNkIsdUNBQXVDLG9DQUFvQyxxSEFBcUgsNEdBQTRHLGlIQUFpSDtBQUM3WixvSEFBb0gsNEpBQTRKLG9DQUFvQyxpRkFBaUYsc0ZBQXNGO0FBQzNkLDZDQUE2QyxvQ0FBb0MsMEJBQTBCLDREQUE0RCw2QkFBNkIsaUNBQWlDLCtCQUErQiw2QkFBNkIsaUNBQWlDLGdDQUFnQztBQUNsVyx5T0FBeU8sdUhBQXVIO0FBQ2hXLHlDQUF5QywwRkFBMEYsZ0hBQWdILGlDQUFpQyxvQ0FBb0MseURBQXlEO0FBQ2pYLDZIQUE2SCwwSEFBMEgsb0hBQW9ILHdDQUF3QyxnQ0FBZ0MsSUFBSSxXQUFXLFNBQVM7QUFDM2MsNENBQTRDLGlGQUFpRixtREFBbUQsaUJBQWlCO0FBQ2pNLGlEQUFpRCwwQ0FBMEMseUNBQXlDLFFBQVEsV0FBVyx1REFBdUQsbURBQW1ELFFBQVEsV0FBVyx3REFBd0QsMkNBQTJDLDJCQUEyQixnQ0FBZ0M7QUFDbGIscUNBQXFDLHlDQUF5QywwQ0FBMEMsNkNBQTZDLDJMQUEyTDtBQUNoVyxrREFBa0QsZ0RBQWdELG9FQUFvRSx3Q0FBd0MsK0RBQStELHlHQUF5RyxHQUFHLDBCQUEwQix5Q0FBeUMsd0NBQXdDLHNDQUFzQyx5Q0FBeUMsd0NBQXdDO0FBQzNsQiw0VkFBNFYsa0RBQWtELDRDQUE0QztBQUMxYixtSkFBbUosa0RBQWtELHVGQUF1RjtBQUM1UiwySUFBMkksMEpBQTBKO0FBQ3JTLG1EQUFtRCxzRkFBc0YsbUpBQW1KLHFCQUFxQixzQ0FBc0Msc0NBQXNDLDZDQUE2QyxxR0FBcUcseUVBQXlFO0FBQ3hsQiwySUFBMkksbUhBQW1IO0FBQzlQLGdEQUFnRCx5RkFBeUYsMEJBQTBCLDhGQUE4RixXQUFXLE1BQU0sa0hBQWtILG9CQUFvQiw0QkFBNEI7QUFDcGIsNkNBQTZDLDBJQUEwSSw2Q0FBNkMsdUVBQXVFLFNBQVMsc0RBQXNELDBCQUEwQixFQUFFO0FBQ3RZLHdEQUF3RCxTQUFTLHNEQUFzRCxVQUFVLEVBQUUsVUFBVSx1REFBdUQsd0hBQXdILGtEQUFrRCxzREFBc0QsU0FBUyxFQUFFO0FBQy9hLHNEQUFzRCxjQUFjLEtBQUssV0FBVyxFQUFFLDBEQUEwRCxvQkFBb0IsMkZBQTJGLFNBQVMsMEJBQTBCLGFBQWEsRUFBRSxtQ0FBbUMsd0JBQXdCLGFBQWE7QUFDelgsbUNBQW1DLHNDQUFzQyxvQ0FBb0Msb0NBQW9DLDJDQUEyQyxZQUFZLHdDQUF3QztBQUNoUCx5RkFBeUYsY0FBYyx3QkFBd0IseUJBQXlCLG1DQUFtQyxZQUFZLHVEQUF1RCx3QkFBd0IsMEJBQTBCLGtDQUFrQyxVQUFVLGNBQWMsWUFBWSxtREFBbUQsT0FBTyx1RUFBdUUsd0JBQXdCO0FBQy9nQixxQ0FBcUMsVUFBVSxnQkFBZ0IsMEJBQTBCLHdCQUF3Qiw2QkFBNkIscURBQXFELHdCQUF3QjtBQUMzTixvQ0FBb0MsY0FBYyxTQUFTLE1BQU07QUFDakU7QUFDQSxvQ0FBb0MsY0FBYyxTQUFTLDJFQUEyRSxvRkFBb0YsaUhBQWlILDRDQUE0QywwQkFBMEIsbUNBQW1DLHFDQUFxQyw0QkFBNEIsS0FBSztBQUMxZixpQ0FBaUMsa0JBQWtCLG1CQUFtQiwyQ0FBMkMsdUNBQXVDLGdEQUFnRDtBQUN4TSxtQ0FBbUMsa0lBQWtJLGtCQUFrQixtREFBbUQscURBQXFELG9DQUFvQztBQUNuVSxtQ0FBbUMsbUJBQW1CLDJDQUEyQyxpQ0FBaUMsZUFBZSxzQ0FBc0MsVUFBVSxvQkFBb0IsT0FBTyxpQ0FBaUMsaUNBQWlDLGVBQWUscUNBQXFDLDJDQUEyQztBQUM3WCxxQ0FBcUMsK0VBQStFLG9IQUFvSCxvQ0FBb0MsaUhBQWlIO0FBQzdYLG1EQUFtRCxjQUFjLGtCQUFrQixJQUFJLEtBQUssd0JBQXdCLHlCQUF5Qiw0REFBNEQsc0dBQXNHLHNDQUFzQyxzQ0FBc0Msa0NBQWtDLGFBQWEsYUFBYSxhQUFhO0FBQ3BjLGlEQUFpRCxtQkFBbUIsb0NBQW9DLGdEQUFnRCxrQkFBa0IsK0NBQStDLDBCQUEwQixxREFBcUQ7QUFDeFMscURBQXFELDhCQUE4QixXQUFXLGtEQUFrRDtBQUNoSiw2Q0FBNkMsZ0JBQWdCLFlBQVksa0JBQWtCLEtBQUssZUFBZSxXQUFXLFNBQVMsYUFBYSxZQUFZLElBQUksbUJBQW1CLGdDQUFnQyxTQUFTLGdDQUFnQyxnQ0FBZ0MsV0FBVywwQ0FBMEMsZ0JBQWdCLHdDQUF3QywwQ0FBMEM7QUFDbmIseUNBQXlDLGdCQUFnQixTQUFTLFNBQVMsWUFBWSxJQUFJLEtBQUssd0JBQXdCLGlDQUFpQyxpQ0FBaUMsbUJBQW1CLHlDQUF5QyxrQkFBa0Isa0NBQWtDLCtCQUErQiwrQkFBK0IsaUJBQWlCLElBQUksb0hBQW9IO0FBQ2pmLHdDQUF3QywwQkFBMEIscURBQXFELCtEQUErRCxzQ0FBc0MseUJBQXlCLDRFQUE0RSx3Q0FBd0MsZ0JBQWdCLElBQUksZUFBZTtBQUM1WSwrQ0FBK0MsUUFBUSwyQ0FBMkMsY0FBYyxlQUFlLFVBQVUsRUFBRSxhQUFhLG9CQUFvQixVQUFVLElBQUksRUFBRSxRQUFRLE1BQU0sRUFBRSw4QkFBOEIsSUFBSSxNQUFNLG1CQUFtQixRQUFRLG9CQUFvQixHQUFHLFVBQVUsaURBQWlELFFBQVEsY0FBYyxlQUFlLFVBQVUsVUFBVSxJQUFJLEVBQUUsWUFBWSxNQUFNLEVBQUUsZ0NBQWdDLE1BQU0sbUJBQW1CLElBQUksS0FBSztBQUN0ZixnREFBZ0Qsd0ZBQXdGLGdEQUFnRDtBQUN4TCxrREFBa0QsUUFBUSxrREFBa0QsSUFBSSxFQUFFLFlBQVksTUFBTSxFQUFFLGdDQUFnQyxNQUFNLG1CQUFtQixJQUFJLGdCQUFnQix3Q0FBd0MsRUFBRSxLQUFLLFVBQVUsOENBQThDLFVBQVUsTUFBTSx1Q0FBdUMsWUFBWSxXQUFXLG9EQUFvRDtBQUM1YiwrQ0FBK0MsMkRBQTJELHlDQUF5Qyx1Q0FBdUMsV0FBVyxLQUFLLHNCQUFzQiwwRkFBMEYsT0FBTztBQUNqVSw4Q0FBOEMsdUNBQXVDLG1JQUFtSSwrRUFBK0UseURBQXlELDBCQUEwQixvQ0FBb0MsbURBQW1ELGVBQWUscUJBQXFCLGVBQWUsbUJBQW1CLG9EQUFvRCwyQ0FBMkMsdUJBQXVCLGVBQWUscUJBQXFCLDRDQUE0QyxhQUFhO0FBQzF1QiwwQ0FBMEMsOENBQThDLCtDQUErQyxlQUFlLFNBQVMsdUNBQXVDLDhDQUE4QyxhQUFhO0FBQ2pRLCtDQUErQyxvQ0FBb0MsbURBQW1ELGVBQWUscUJBQXFCLGdCQUFnQiw2Q0FBNkMsd0JBQXdCLCtDQUErQztBQUM5Uyw4Q0FBOEMsc0JBQXNCLDBRQUEwUSxVQUFVLG1DQUFtQyxpQkFBaUIsa0VBQWtFLGVBQWU7QUFDN2QscUNBQXFDLHlDQUF5Qyw2Q0FBNkMsOENBQThDLHFCQUFxQixTQUFTLHNDQUFzQyw2Q0FBNkMsYUFBYSw0RkFBNEYsOENBQThDO0FBQ2piLDhDQUE4QyxpQkFBaUIscUNBQXFDLGdCQUFnQixrREFBa0Qsb0JBQW9CLHNEQUFzRCxpREFBaUQsOEJBQThCLHlEQUF5RCwwQkFBMEIsK0NBQStDO0FBQ2pjLGdEQUFnRCxhQUFhLDhDQUE4QywwQkFBMEIsa0RBQWtELHFCQUFxQixtREFBbUQsZ0JBQWdCLGlEQUFpRCxnQkFBZ0IsOENBQThDLDhDQUE4QztBQUM1YSxnREFBZ0QsK0JBQStCLGlEQUFpRDtBQUNoSSwyREFBMkQsb0JBQW9CLElBQUksNERBQTRELG9CQUFvQixpQkFBaUIsT0FBTyw4QkFBOEIsZUFBZSxlQUFlLGtEQUFrRCxLQUFLLFFBQVEsSUFBSSw4REFBOEQsb0JBQW9CLHFCQUFxQixPQUFPLGlFQUFpRTtBQUN6ZSxLQUFLLG1EQUFtRCxLQUFLLDhCQUE4QixnQkFBZ0IsZ0JBQWdCLHNEQUFzRCxLQUFLLE1BQU0sdUJBQXVCO0FBQ25OLDZEQUE2RCxvQkFBb0Isb0JBQW9CLFlBQVksK0VBQStFLG9CQUFvQixjQUFjLCtFQUErRSxvQkFBb0IsZUFBZSwrRUFBK0Usb0JBQW9CLGVBQWU7QUFDdGMsYUFBYSxvQkFBb0IsY0FBYyxtRkFBbUYsZ0JBQWdCLGdKQUFnSiw2Q0FBNkMsVUFBVSxrR0FBa0csbUVBQW1FO0FBQzlmLGlFQUFpRSw2Q0FBNkMsMkRBQTJELGtDQUFrQyxxQkFBcUIsNkRBQTZELDBCQUEwQjtBQUN2VCxtRUFBbUUsMEJBQTBCLDJFQUEyRSwyREFBMkQsMEJBQTBCLDJEQUEyRCxpRUFBaUUsMEJBQTBCO0FBQ25aLDJEQUEyRCwwQkFBMEIsOERBQThELGlFQUFpRSw2Q0FBNkMsa0RBQWtELGtDQUFrQyxnQkFBZ0IsNkNBQTZDO0FBQ2xaLG1EQUFtRCxnRUFBZ0UsZ0JBQWdCLDZDQUE2QyxrQkFBa0IsbURBQW1ELDRIQUE0SCxnQkFBZ0IsNkNBQTZDO0FBQzlhLG1EQUFtRCw0Q0FBNEMsbUNBQW1DLHlEQUF5RCw0Q0FBNEMsa0RBQWtELGlEQUFpRCxrQ0FBa0MsZ0JBQWdCLDZDQUE2QztBQUN6YSxrREFBa0QsZ0VBQWdFLGdCQUFnQiw2Q0FBNkMsMkJBQTJCLGtEQUFrRCw0SEFBNEgsZ0JBQWdCLDZDQUE2QztBQUNyYixrREFBa0QsNENBQTRDLGtDQUFrQyx3REFBd0QsNENBQTRDLGdEQUFnRCxrREFBa0Qsd0JBQXdCO0FBQzlWLG1EQUFtRCw0Q0FBNEMsb0NBQW9DLGlEQUFpRCxxQ0FBcUMsaURBQWlEO0FBQzFRLG9EQUFvRCxpQ0FBaUMsTUFBTSxrQkFBa0IsSUFBSSxFQUFFLGFBQWEsbUJBQW1CLHVCQUF1QixlQUFlLGFBQWEsdUJBQXVCLGVBQWUsc0JBQXNCLGtDQUFrQyxlQUFlLCtFQUErRSwwQ0FBMEMsa0VBQWtFO0FBQzllLGVBQWUsVUFBVSw2REFBNkQsa0NBQWtDLDJCQUEyQixtREFBbUQsNEhBQTRILHdEQUF3RCxnQkFBZ0IsNkNBQTZDO0FBQ3ZiLHlEQUF5RCwwQkFBMEIsNERBQTRELHdEQUF3RCx5R0FBeUcsZ0JBQWdCLDZDQUE2QyxrQ0FBa0MsOENBQThDLDRDQUE0QywwREFBMEQseURBQXlELGVBQWUsMEJBQTBCO0FBQ3JvQix3Q0FBd0MsNENBQTRDLDZDQUE2Qyw4QkFBOEIsU0FBUyxxQ0FBcUM7QUFDN00sNENBQTRDLHNCQUFzQiwwREFBMEQseURBQXlELGVBQWUseUJBQXlCLDBGQUEwRixzREFBc0QsMEJBQTBCLGlEQUFpRDtBQUN4YixpREFBaUQsa0NBQWtDLHNEQUFzRCx3QkFBd0IsbURBQW1ELDJCQUEyQixrREFBa0Qsb0VBQW9FLGdEQUFnRDtBQUNyWixxREFBcUQsOEJBQThCLDBEQUEwRCwwREFBMEQsNkNBQTZDLHNCQUFzQiwwREFBMEQsMERBQTBELGdEQUFnRDtBQUM5YSxpREFBaUQsa0NBQWtDLHVFQUF1RSw0Q0FBNEMseURBQXlEO0FBQy9QLHVDQUF1QyxrQkFBa0IscUJBQXFCLFVBQVUsb0RBQW9ELG1FQUFtRSwwREFBMEQsc0JBQXNCLHdCQUF3QiwyQ0FBMkMsa0JBQWtCO0FBQ3BYLHVEQUF1RCxtS0FBbUssMERBQTBELDhJQUE4SSxLQUFLLDJDQUEyQztBQUNsZCx3REFBd0QsbUtBQW1LLHdEQUF3RDtBQUNuUixpREFBaUQsc0JBQXNCLEdBQUcsc0JBQXNCLDJEQUEyRCxlQUFlLE1BQU0sZ0VBQWdFLGtGQUFrRixNQUFNLGlCQUFpQjtBQUN6VixpREFBaUQsMkJBQTJCLGlFQUFpRSxNQUFNLG1FQUFtRSxNQUFNLHVFQUF1RSxNQUFNLG1FQUFtRSxNQUFNLGdFQUFnRSxNQUFNO0FBQ3hiLCtEQUErRCx5REFBeUQsRUFBRSw2Q0FBNkMsMEJBQTBCLHdEQUF3RCx1REFBdUQseUJBQXlCLHVCQUF1QjtBQUNoVyxnREFBZ0QsK0RBQStELHFDQUFxQyxVQUFVLHVDQUF1QyxxQ0FBcUMscUNBQXFDLHVDQUF1QyxxQ0FBcUMseUNBQXlDLHlDQUF5QyxtQ0FBbUM7QUFDaGQsOEVBQThFLGtGQUFrRixxQ0FBcUMsdUNBQXVDLG1DQUFtQywyQ0FBMkMsMkNBQTJDLHVDQUF1Qyx1Q0FBdUMsNkNBQTZDO0FBQ2hlLDZEQUE2RCxVQUFVLHNEQUFzRCxpRkFBaUYsa0dBQWtHLHdCQUF3QixVQUFVLDJCQUEyQjtBQUM3VyxzREFBc0QsbUZBQW1GLHdDQUF3QyxVQUFVO0FBQzNMLHVEQUF1RCxpRkFBaUYsdUlBQXVJLDJCQUEyQixVQUFVLGlEQUFpRCw4RUFBOEU7QUFDbmIsdURBQXVELDhFQUE4RSxpREFBaUQsaURBQWlELDhFQUE4RSwyQ0FBMkMsdURBQXVELDhFQUE4RTtBQUNyZSxrREFBa0QsOEVBQThFLDZDQUE2Qyx3REFBd0QsOEVBQThFLG1EQUFtRCxrREFBa0QsOEVBQThFO0FBQ3RlLHdEQUF3RCw4RUFBOEUsbURBQW1ELGtEQUFrRCw4RUFBOEUsMkNBQTJDLGtEQUFrRCw4RUFBOEU7QUFDcGUsd0RBQXdELDhFQUE4RSxpREFBaUQsbURBQW1ELCtFQUErRSxtQ0FBbUMsbURBQW1ELCtFQUErRTtBQUM5ZCx5REFBeUQsK0VBQStFLHlDQUF5QyxvREFBb0QsK0VBQStFLGtDQUFrQywwREFBMEQsK0VBQStFO0FBQy9kLG9EQUFvRCwrRUFBK0Usa0NBQWtDLDBEQUEwRCwrRUFBK0Usd0NBQXdDLGlEQUFpRCwrRUFBK0U7QUFDdGQsa0RBQWtELCtFQUErRSxtQ0FBbUMsZ0RBQWdELDhFQUE4RSw4Q0FBOEMsZ0RBQWdELDhFQUE4RTtBQUM5YyxrREFBa0QsaUZBQWlGLDJDQUEyQyxvQ0FBb0MsaURBQWlELGlGQUFpRiwyQ0FBMkM7QUFDL1gsd0RBQXdELDhFQUE4RSx5Q0FBeUMsdURBQXVELCtFQUErRTtBQUNyVCx5REFBeUQsaUZBQWlGLGtGQUFrRiw0QkFBNEIsK0JBQStCLFVBQVUsdURBQXVELGdFQUFnRSw2REFBNkQ7QUFDcmQsdURBQXVELGdFQUFnRSw2REFBNkQsc0VBQXNFLHdEQUF3RCxrRUFBa0UsOERBQThEO0FBQ2xiLHdEQUF3RCxrRUFBa0UsOERBQThELHdFQUF3RSx3REFBd0QsZ0VBQWdFLHdEQUF3RDtBQUNoYiw4REFBOEQsc0VBQXNFLHlEQUF5RCx3REFBd0QseURBQXlELHdEQUF3RCwrREFBK0Q7QUFDcmEsMERBQTBELHVEQUF1RCwwREFBMEQsdURBQXVELGdFQUFnRSw2REFBNkQsdURBQXVEO0FBQ3RaLHdEQUF3RCx3REFBd0Qsc0RBQXNELHNEQUFzRCxzREFBc0Qsc0RBQXNELDhEQUE4RDtBQUN0WSw2REFBNkQsNkRBQTZELDRDQUE0QyxrQkFBa0IsaUJBQWlCLFlBQVksa0JBQWtCLG1CQUFtQixvREFBb0QsaUJBQWlCLHNCQUFzQixzQkFBc0IsZ0NBQWdDLGtDQUFrQyxpQkFBaUIsMkRBQTJELG1CQUFtQiwwQkFBMEIsbUNBQW1DO0FBQ3prQixtQ0FBbUMsb0NBQW9DLGdEQUFnRCxnRUFBZ0UsbURBQW1ELHdCQUF3QixxQ0FBcUMsOEJBQThCLDJDQUEyQztBQUNoWCw4Q0FBOEMsaUJBQWlCLGdCQUFnQixnQ0FBZ0MsK0JBQStCLFVBQVUsK0NBQStDLG1DQUFtQyxtRUFBbUUsYUFBYSxXQUFXO0FBQ3JVLDBEQUEwRCx1QkFBdUIsV0FBVywyQ0FBMkMsaUZBQWlGLGtDQUFrQyw0RUFBNEUsNENBQTRDO0FBQ2xYLHdEQUF3RCwwQkFBMEIsK0RBQStELDJDQUEyQyxxQkFBcUIsT0FBTyxtSEFBbUgsd0RBQXdELHlDQUF5Qyw2Q0FBNkM7QUFDemQsMENBQTBDLGlCQUFpQixXQUFXLDZCQUE2QixVQUFVLG1EQUFtRCxnQkFBZ0IseUJBQXlCLFlBQVksZ0VBQWdFO0FBQ3JSLHlEQUF5RCxnQkFBZ0IseUJBQXlCLHNIQUFzSCxrQkFBa0IsaUlBQWlJO0FBQzNXLCtDQUErQyxxREFBcUQsNEJBQTRCLE1BQU0sY0FBYyxnSEFBZ0gsTUFBTSxvSEFBb0gsa0ZBQWtGO0FBQ2hkLG9DQUFvQyxlQUFlLCtDQUErQyw2REFBNkQ7QUFDL0osNENBQTRDLGVBQWUsK0NBQStDLDZEQUE2RCx3QkFBd0IseUVBQXlFLHlEQUF5RCxpQ0FBaUM7QUFDbFcseURBQXlELHlDQUF5QyxvRUFBb0UsRUFBRSx3Q0FBd0MsWUFBWSxXQUFXLGVBQWUsc0NBQXNDO0FBQzVSLG9DQUFvQyxzQ0FBc0MsMEdBQTBHLGtFQUFrRSxhQUFhLG1DQUFtQyw2Q0FBNkMseUVBQXlFLGtFQUFrRTtBQUM5ZCx3Q0FBd0MsdUNBQXVDLGtGQUFrRix1Q0FBdUMsdUNBQXVDO0FBQy9PLGdEQUFnRCw4QkFBOEIsd0JBQXdCLGlDQUFpQywySEFBMkgsSUFBSSxpREFBaUQsNkJBQTZCLG9CQUFvQjtBQUN4VywyQ0FBMkMsNEJBQTRCLEVBQUUsMENBQTBDLG1IQUFtSCxzQ0FBc0MsNEhBQTRILCtDQUErQztBQUN2YixpREFBaUQsZ0RBQWdELG1EQUFtRCxpREFBaUQsa0RBQWtELGlEQUFpRCxpREFBaUQsaURBQWlELGdEQUFnRDtBQUMxYixxREFBcUQsa0RBQWtELHdEQUF3RCw4RUFBOEUsa0RBQWtELHFDQUFxQztBQUNwVSw2Q0FBNkMsc0pBQXNKLDhCQUE4Qiw0Q0FBNEMsZ0JBQWdCLFdBQVcsS0FBSyx3Q0FBd0MscURBQXFEO0FBQzFZLCtDQUErQyw0QkFBNEIsRUFBRSxvQkFBb0IsaUNBQWlDLGdDQUFnQyx1QkFBdUIscURBQXFELHVDQUF1QyxpQkFBaUIsNERBQTREO0FBQ2xXLGdEQUFnRCw0QkFBNEIsRUFBRSxvQkFBb0Isc0RBQXNELFdBQVcscUJBQXFCLG1CQUFtQiw2Q0FBNkMsNEJBQTRCLEVBQUUsc0JBQXNCLGlCQUFpQjtBQUM3VCxvREFBb0QsNEJBQTRCLEVBQUUsc0JBQXNCLGlCQUFpQixxQ0FBcUMscURBQXFELDRCQUE0QixFQUFFLFFBQVEsaUJBQWlCLFdBQVcsd0JBQXdCLGlCQUFpQjtBQUM5VCwyREFBMkQsdUNBQXVDLHFCQUFxQix5QkFBeUIsWUFBWSxxQ0FBcUMsc0ZBQXNGLFVBQVUscUNBQXFDLFlBQVksS0FBSyxXQUFXLCtDQUErQztBQUNqWixpREFBaUQsK0NBQStDLHdCQUF3QiwrQkFBK0IsV0FBVyx5QkFBeUIsc0JBQXNCLDBDQUEwQyxzQkFBc0IsbUJBQW1CLDZFQUE2RSxzQkFBc0IsNkJBQTZCO0FBQ3BhLGdEQUFnRCwwQkFBMEIsa0NBQWtDLEVBQUUsbUJBQW1CLGlCQUFpQiwwSEFBMEgscUJBQXFCLHFCQUFxQix5SkFBeUo7QUFDL2Msa0RBQWtELGtDQUFrQyxFQUFFLGtEQUFrRCxtQkFBbUIsbUhBQW1ILG1CQUFtQiwySUFBMkk7QUFDNWEsc0NBQXNDLCtFQUErRSwrRUFBK0Usc0RBQXNELEtBQUssSUFBSSx1REFBdUQsNkJBQTZCLGtDQUFrQztBQUN6WCw2Q0FBNkMsUUFBUSxRQUFRLFFBQVEsR0FBRyxrQkFBa0Isa0JBQWtCLDhEQUE4RDtBQUMxSyx5Q0FBeUMsaUJBQWlCLDhIQUE4SCx5Q0FBeUMsa0VBQWtFLCtCQUErQixZQUFZLFdBQVcsMkJBQTJCLFNBQVMsMEJBQTBCLDREQUE0RCxJQUFJLEtBQUssa0JBQWtCO0FBQzllLDJGQUEyRiw2R0FBNkcsNkNBQTZDLG9CQUFvQixRQUFRLHlDQUF5QyxxRUFBcUUsNENBQTRDLCtDQUErQztBQUMxZCx3Q0FBd0Msd0NBQXdDLCtCQUErQixxQ0FBcUMsc0NBQXNDO0FBQzFMLG9DQUFvQyw4Q0FBOEMsOENBQThDLDhHQUE4Ryx5RUFBeUUsV0FBVyxjQUFjLHdCQUF3QjtBQUN4VyxnQ0FBZ0MsTUFBTSxvQkFBb0IsOEJBQThCLFdBQVcsNEZBQTRGLFNBQVMsdUZBQXVGLEtBQUssbUdBQW1HLFVBQVUsK0NBQStDLDRCQUE0QjtBQUM1ZCwwQkFBMEIscUNBQXFDLDJDQUEyQyxjQUFjLGdDQUFnQyxVQUFVLFdBQVcsNENBQTRDLHNGQUFzRixrREFBa0QsaUZBQWlGLGlEQUFpRDtBQUNuZSwyQ0FBMkMsOEJBQThCLDJDQUEyQyxxQkFBcUIsNENBQTRDLCtCQUErQiw0Q0FBNEM7QUFDaFEsNENBQTRDLDBIQUEwSCx5Q0FBeUMsb0hBQW9ILGNBQWMsb0JBQW9CO0FBQ3JXLDRDQUE0Qyw0Q0FBNEMsd0NBQXdDLFVBQVUsT0FBTztBQUNqSiw0Q0FBNEMsaUJBQWlCLDBFQUEwRSw2QkFBNkIscUNBQXFDLFNBQVMsaUNBQWlDLEtBQUssVUFBVSx3RUFBd0UsYUFBYSxnREFBZ0Qsb0JBQW9CLFVBQVUsd0NBQXdDLGVBQWU7QUFDNWQseUNBQXlDLHNFQUFzRSxXQUFXLEtBQUssa0NBQWtDLHdCQUF3QixPQUFPLG1CQUFtQixVQUFVLDZDQUE2QywrQ0FBK0MsK0JBQStCLFVBQVU7QUFDbFcsMkNBQTJDLG1JQUFtSSwyQ0FBMkMseUhBQXlILDRDQUE0QztBQUM5WCwrQ0FBK0MsdUVBQXVFLDJDQUEyQywrQkFBK0Isd0NBQXdDLDRCQUE0QixzQkFBc0Isa0NBQWtDLHdCQUF3QiwyQ0FBMkMsd0NBQXdDLDhCQUE4QixpQkFBaUIsK0NBQStDLDRCQUE0Qiw0Q0FBNEMsbUJBQW1CLGdCQUFnQjtBQUNobkIsOERBQThELHNDQUFzQyxzQ0FBc0MsNERBQTRELGdFQUFnRSxXQUFXLHlEQUF5RDtBQUMxVSw2REFBNkQsc0NBQXNDLHNDQUFzQyw0REFBNEQsNERBQTRELG9CQUFvQjtBQUNyUiwrREFBK0Qsc0NBQXNDLGdFQUFnRSxNQUFNLHFDQUFxQztBQUNoTiw2REFBNkQsc0NBQXNDLDBGQUEwRixzQ0FBc0MsS0FBSyxZQUFZLElBQUksdUNBQXVDO0FBQy9SLCtEQUErRCxzQ0FBc0MsNERBQTRELHlCQUF5QjtBQUMxTCw2REFBNkQsc0NBQXNDLDBGQUEwRix5QkFBeUI7QUFDdE4sNkRBQTZELHNDQUFzQywwRkFBMEYsOENBQThDLDZEQUE2RCxzQ0FBc0MsMEZBQTBGLDRCQUE0QjtBQUNwYyxtRUFBbUUsMENBQTBDLG9EQUFvRCxzQ0FBc0MsaUNBQWlDLDhCQUE4QixxREFBcUQsc0NBQXNDLG1DQUFtQyw2QkFBNkI7QUFDamEscURBQXFELHNDQUFzQyw0REFBNEQsNkJBQTZCLDZCQUE2Qiw4QkFBOEIsK0JBQStCLHFEQUFxRCxzQ0FBc0MsNERBQTRELDBCQUEwQix3Q0FBd0M7QUFDdmUsbURBQW1ELHNDQUFzQyxvQ0FBb0MsOEJBQThCLG9EQUFvRCxzQ0FBc0Msd0NBQXdDLDZCQUE2QjtBQUMxVCxvREFBb0Qsc0NBQXNDLDBGQUEwRiw2QkFBNkIsNkJBQTZCLDhCQUE4QjtBQUM1USxvREFBb0Qsc0NBQXNDLDBGQUEwRix5QkFBeUI7QUFDN00sMERBQTBELHNDQUFzQyw0RkFBNEYsNERBQTRELHNFQUFzRSxvREFBb0QsK0ZBQStGLDJCQUEyQjtBQUM1ZSxxREFBcUQsK0ZBQStGLDJCQUEyQix3Q0FBd0MsMENBQTBDLG1EQUFtRCx5REFBeUQ7QUFDN1csbURBQW1ELHNDQUFzQywwRkFBMEYsNkJBQTZCLG9EQUFvRCx5Q0FBeUMsMkRBQTJELDBCQUEwQjtBQUNsWSwwREFBMEQsMEJBQTBCLHdDQUF3QztBQUM1SCxxREFBcUQsa0NBQWtDLFdBQVcsS0FBSyxzQkFBc0IsOEJBQThCLHVFQUF1RSxxREFBcUQsd0JBQXdCLGlMQUFpTDtBQUNoZSxtRUFBbUUsOEJBQThCLDZCQUE2QixnQkFBZ0Isb0JBQW9CLHFDQUFxQyxvQkFBb0IsMERBQTBELDBCQUEwQixxQkFBcUIscUJBQXFCO0FBQ3pWLHdEQUF3RCxrRUFBa0Usc0JBQXNCLHFCQUFxQiw0QkFBNEIsMEJBQTBCLFVBQVUsc0RBQXNELDJEQUEyRCw4QkFBOEIsTUFBTSw4Q0FBOEMsVUFBVTtBQUNsYixtRUFBbUUseUNBQXlDLHdFQUF3RSwrREFBK0QsNkNBQTZDLGdCQUFnQixvQkFBb0Isb0JBQW9CO0FBQ3hWLHVEQUF1RCwrQ0FBK0MscUdBQXFHLElBQUksS0FBSyxXQUFXLFdBQVcsWUFBWSxzQkFBc0IsV0FBVyxZQUFZLGlDQUFpQyxpQkFBaUIsVUFBVSw4REFBOEQ7QUFDN1osd0RBQXdELCtDQUErQyxxREFBcUQsK0NBQStDLDJDQUEyQyw0REFBNEQsNENBQTRDO0FBQzlWLHFEQUFxRCxxQ0FBcUMsVUFBVSxvQ0FBb0MsTUFBTSxrQ0FBa0MsTUFBTSxrQ0FBa0MsTUFBTSxvQ0FBb0MsTUFBTSxrQ0FBa0MsTUFBTSxzQ0FBc0MsTUFBTSxzQ0FBc0MsTUFBTSxnQ0FBZ0MsTUFBTSxvQ0FBb0MsTUFBTTtBQUN4ZCxNQUFNLG1GQUFtRixNQUFNLGtDQUFrQyxNQUFNLG9DQUFvQyxNQUFNLGdDQUFnQyxNQUFNLHdDQUF3QyxNQUFNLHdDQUF3QyxNQUFNLG9DQUFvQyxNQUFNLG9DQUFvQyxNQUFNLDBDQUEwQyxNQUFNLDJDQUEyQyxNQUFNO0FBQ3hlLGlFQUFpRSxrSEFBa0gsK0RBQStELGdIQUFnSCxpRUFBaUU7QUFDbmEsK0RBQStELGdIQUFnSCwrREFBK0QsZ0hBQWdILCtEQUErRDtBQUM3WixxRUFBcUUsc0hBQXNILHFEQUFxRDtBQUNoUCwyREFBMkQsWUFBWSxxQkFBcUIsMEZBQTBGLGlDQUFpQyxxREFBcUQ7QUFDNVEsMkRBQTJELFlBQVkscUNBQXFDLCtEQUErRCw4Q0FBOEMsc0RBQXNEO0FBQy9RLDREQUE0RCxZQUFZLHFCQUFxQiw0REFBNEQsbUNBQW1DLHNEQUFzRDtBQUNsUCw0REFBNEQsWUFBWSxzQ0FBc0MsK0RBQStELDhDQUE4QyxzREFBc0Q7QUFDalIsc0RBQXNELHFJQUFxSSw0REFBNEQ7QUFDdlAsdURBQXVELHFLQUFxSyx1REFBdUQ7QUFDblIsNkRBQTZELFlBQVksc0NBQXNDLGdFQUFnRSw2Q0FBNkMsd0RBQXdEO0FBQ3BSLHdEQUF3RCxrTUFBa00sOERBQThELFlBQVkscUNBQXFDLGdFQUFnRTtBQUN6YSxxREFBcUQsd0dBQXdHLHNEQUFzRCx5R0FBeUcsb0RBQW9EO0FBQ2hYLG9EQUFvRCwwTUFBME0sc0RBQXNELFlBQVksOEJBQThCLDZCQUE2QjtBQUMzWCxxREFBcUQsWUFBWSwyQ0FBMkMsa0VBQWtFLDhDQUE4Qyw0QkFBNEIseURBQXlEO0FBQ2pULHVEQUF1RCw0SkFBNEosMkRBQTJEO0FBQzlRLDREQUE0RCwrSUFBK0ksNkRBQTZELHVCQUF1QixXQUFXLHVDQUF1QyxtRUFBbUUsdUJBQXVCLFdBQVc7QUFDdGIsNkRBQTZELHVCQUF1QixXQUFXLHVDQUF1QyxtRUFBbUUsdUJBQXVCLFdBQVcsbUNBQW1DLDhEQUE4RCx1QkFBdUIsV0FBVztBQUM5VyxvRUFBb0UsdUJBQXVCLFdBQVcsb0NBQW9DLDhEQUE4RCx1QkFBdUIsV0FBVyx5Q0FBeUMsb0VBQW9FLHVCQUF1QixXQUFXO0FBQ3pYLDhEQUE4RCx1QkFBdUIsV0FBVyx1Q0FBdUMsOERBQThELHVCQUF1QixXQUFXLHVDQUF1QyxvRUFBb0UsdUJBQXVCLFdBQVc7QUFDcFgsK0RBQStELHVCQUF1QixXQUFXLCtCQUErQiwrREFBK0QsdUJBQXVCLFdBQVcsK0JBQStCLHFFQUFxRSx1QkFBdUIsV0FBVztBQUN2VyxnRUFBZ0UsdUJBQXVCLFdBQVcsZ0NBQWdDLGdFQUFnRSx1QkFBdUIsV0FBVyxnQ0FBZ0Msc0VBQXNFLHVCQUF1QixXQUFXO0FBQzVXLDZEQUE2RCx1QkFBdUIsV0FBVyw2QkFBNkIsOERBQThELHVCQUF1QixXQUFXLDhCQUE4Qiw0REFBNEQsdUJBQXVCLFdBQVcsNEJBQTRCLDREQUE0RCx1QkFBdUIsV0FBVztBQUNsZCw4REFBOEQsdUJBQXVCLFdBQVcsOEJBQThCLDZEQUE2RCx1QkFBdUIsV0FBVyw2QkFBNkIsaUVBQWlFLHVCQUF1QixXQUFXLEtBQUssOEJBQThCLGFBQWE7QUFDN1ksK0RBQStELHVCQUF1QixXQUFXLHdKQUF3SixtRUFBbUUsdUJBQXVCLFdBQVc7QUFDOVYsb0VBQW9FLHVCQUF1QixXQUFXLG9DQUFvQywyREFBMkQsc0JBQXNCLHNDQUFzQyxXQUFXLDRDQUE0QztBQUN4VCxpRUFBaUUsc0JBQXNCLHNDQUFzQyxXQUFXLHlEQUF5RCx3QkFBd0IsMkRBQTJELHNCQUFzQixzQ0FBc0MsV0FBVyw0Q0FBNEM7QUFDdlksaUVBQWlFLHNCQUFzQixzQ0FBc0MsV0FBVyxLQUFLLHdDQUF3Qyw0Q0FBNEMsd0JBQXdCLDREQUE0RCxzQkFBc0Isc0NBQXNDLFdBQVcsOENBQThDO0FBQzFhLGtFQUFrRSxzQkFBc0Isc0NBQXNDLFdBQVcsMkRBQTJELHdCQUF3Qiw0REFBNEQsc0JBQXNCLHNDQUFzQyxXQUFXLDhDQUE4QztBQUM3WSxrRUFBa0Usc0JBQXNCLHNDQUFzQyxXQUFXLEtBQUsseUNBQXlDLDRDQUE0Qyx3QkFBd0IsNERBQTRELHNCQUFzQixzQ0FBc0MsV0FBVyw0Q0FBNEM7QUFDMWEsNERBQTRELHNCQUFzQixzQ0FBc0MsV0FBVyw0Q0FBNEMsd0JBQXdCLGtFQUFrRSxzQkFBc0Isc0NBQXNDLFdBQVcseURBQXlEO0FBQ3pZLDZEQUE2RCxzQkFBc0Isa0VBQWtFLGdEQUFnRCxZQUFZLFdBQVcsc0NBQXNDLDZEQUE2RCxzQkFBc0Isa0VBQWtFLGdEQUFnRCxZQUFZLFdBQVc7QUFDOWQsbUVBQW1FLHNCQUFzQixrRUFBa0UsZ0RBQWdELFlBQVksV0FBVyxLQUFLLHlDQUF5QztBQUNoUiw4REFBOEQsc0JBQXNCLGtFQUFrRSxnREFBZ0QsWUFBWSxXQUFXLHFDQUFxQyw4REFBOEQsc0JBQXNCLGtFQUFrRSxnREFBZ0QsWUFBWSxXQUFXO0FBQy9kLG9FQUFvRSxzQkFBc0Isa0VBQWtFLGdEQUFnRCxZQUFZLFdBQVcsMkNBQTJDLDJEQUEyRCxzQkFBc0Isa0VBQWtFLGdEQUFnRCxZQUFZLFdBQVc7QUFDeGUsNERBQTRELHNCQUFzQixrRUFBa0UsZ0RBQWdELFlBQVksV0FBVyxzQ0FBc0MsMERBQTBELHNCQUFzQixrRUFBa0UsOENBQThDLFlBQVksV0FBVztBQUN4ZCwwREFBMEQsc0JBQXNCLHNDQUFzQyxXQUFXLGtDQUFrQyx3QkFBd0IsaUVBQWlFLHNCQUFzQixrRUFBa0UsZ0RBQWdELFlBQVksV0FBVztBQUMzWixrRUFBa0Usc0JBQXNCLHNDQUFzQyxXQUFXLDBDQUEwQyx3QkFBd0IsZUFBZSxxQkFBcUIsNkJBQTZCLHVDQUF1Qyx1Q0FBdUMsbURBQW1ELCtEQUErRCx1Q0FBdUMsK0JBQStCLGdCQUFnQiwyQkFBMkI7Ozs7Ozs7Ozs7Ozs7QUMzVzdqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxRQUFRLFVBQVU7O0FBRWxCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2Qzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxJQUFJO0FBQ2YsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBLFdBQVcsSUFBSTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLElBQUk7QUFDbkI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGVBQWUsU0FBUztBQUN4Qjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGVBQWU7QUFDZjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGVBQWUsV0FBVztBQUMxQjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBLG1CQUFtQixhQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxPQUFPLHlEQUFZO0FBQ3hCO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFFBQVEseURBQVk7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsYUFBYTs7QUFFaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0VBQW9FO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHdCQUF3QjtBQUN6Qzs7QUFFQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsTUFBTSxJQUFxQztBQUMzQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxJQUFxQztBQUM3Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQiw4QkFBOEI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQSxhQUFhLGdCQUFnQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLGlCQUFpQjtBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLGFBQWE7QUFDbkY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QixhQUFhLFNBQVM7QUFDdEI7O0FBRUE7QUFDQSw0RUFBNEUsYUFBYTtBQUN6RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSSxLQUFxQztBQUN6QztBQUNBOztBQUVnSTs7Ozs7Ozs7Ozs7OztBQzNuQmhJO0FBQUE7QUFBQTtBQUNxQzs7QUFFckM7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUMsVUFBVSxJQUE2QjtBQUN4QztBQUNBLENBQUMsTUFBTSxFQUVOOztBQUVELGFBQWEsNERBQVE7QUFDTixxRUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7OztBQ2xCdEI7QUFBQTtBQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDaEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbUJBQW1CO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQywwRUFBaUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSwwQkFBMEIsY0FBYztBQUN4QyxXQUFXLGtCQUFrQjtBQUM3QjtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFlBQVk7QUFDWixjQUFjLHFCQUFxQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLG1CQUFtQjtBQUM5QixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLE9BQU87QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsbUJBQW1CO0FBQzlCLGNBQWMscUJBQXFCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLG9CQUFvQixlQUFlO0FBQ25DOzs7QUFHQSxZQUFZLGVBQWU7QUFDM0I7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQzs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLDBCQUEwQixjQUFjO0FBQ3hDLFdBQVcsa0JBQWtCO0FBQzdCO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsWUFBWTtBQUNaLGNBQWMscUJBQXFCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0IsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsbUJBQW1CO0FBQzlCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsT0FBTztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxtQkFBbUI7QUFDOUIsY0FBYyxxQkFBcUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCOzs7QUFHQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7OztBQUdBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gXCJyZWR1eFwiO1xuaW1wb3J0IHsgU3RhdGUsIEFjdGlvbiB9IGZyb20gXCIuL3Byb3RvL2JsYWNrYm94X3BiXCI7XG5pbXBvcnQgeyBNZXNzYWdlfSBmcm9tIFwiZ29vZ2xlLXByb3RvYnVmXCJcblxubGV0IGluaXRpYWxTdGF0ZSA9IG5ldyBTdGF0ZSgpXG5cbmZ1bmN0aW9uIHJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb24uVHlwZUNhc2UuU0VORF9NRVNTQUdFOlxuICAgICAgY29uc29sZS5sb2coJ2hlbGxvJyk7XG4gICAgICBzdGF0ZS5hZGRNZXNzYWdlcyhhY3Rpb24uc2VuZE1lc3NhZ2UpXG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxuICByZXR1cm4gc3RhdGVcbn1cblxuY29uc3QgcHJvdG9NaWRkbGV3YXJlID0gc3RvcmUgPT4gbmV4dCA9PiBhY3Rpb24gPT4ge1xuICBjb25zdCBpc1Byb3RvID0gKG9iaikgPT4geyByZXR1cm4gb2JqIGluc3RhbmNlb2YgTWVzc2FnZSB9XG4gIGlmIChpc1Byb3RvKGFjdGlvbikpIHtcbiAgICByZXR1cm4gbmV4dCh7XG4gICAgICAuLi5hY3Rpb24udG9PYmplY3QoKSxcbiAgICAgIHR5cGU6IGFjdGlvbi5nZXRUeXBlQ2FzZSgpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV4dChhY3Rpb24pXG4gIH1cbn1cblxubGV0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwgYXBwbHlNaWRkbGV3YXJlKHByb3RvTWlkZGxld2FyZSkpXG5cbi8vIGxhdGVyOiBsb2FkSW5pdGlhbFN0YXRlXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTdGF0ZUNhbGxiYWNrKGZuKSB7XG4gIHN0b3JlLnN1YnNjcmliZSgoKSA9PiBmbihzdG9yZS5nZXRTdGF0ZSgpLnNlcmlhbGl6ZUJpbmFyeSgpKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUFjdGlvbihieXRlcykge1xuICBzdG9yZS5kaXNwYXRjaChBY3Rpb24uZGVzZXJpYWxpemVCaW5hcnkoYnl0ZXMpKVxufVxuXG5zdG9yZS5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coc3RvcmUuZ2V0U3RhdGUoKSkpXG5cbmZ1bmN0aW9uIHRtcFNlbmRNZXNzYWdlKHRleHQpIHtcbiAgY29uc3QgbWFrZSA9IChvYmosIGZuKSA9PiB7Zm4ob2JqKTsgcmV0dXJuIG9ian1cbiAgbGV0IGFjdGlvbiA9IG1ha2UobmV3IEFjdGlvbigpLCAoYSkgPT4ge1xuICAgIGEuc2V0U2VuZE1lc3NhZ2UodGV4dClcbiAgfSlcbiAgc3RvcmUuZGlzcGF0Y2goYWN0aW9uKVxufVxuXG50bXBTZW5kTWVzc2FnZShcIjFcIilcbnRtcFNlbmRNZXNzYWdlKFwiMlwiKVxudG1wU2VuZE1lc3NhZ2UoXCIzXCIpIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxuLy8gU3VwcG9ydCBkZWNvZGluZyBVUkwtc2FmZSBiYXNlNjQgc3RyaW5ncywgYXMgTm9kZS5qcyBkb2VzLlxuLy8gU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQjVVJMX2FwcGxpY2F0aW9uc1xucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gZ2V0TGVucyAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cbiAgaWYgKGxlbiAlIDQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0JylcbiAgfVxuXG4gIC8vIFRyaW0gb2ZmIGV4dHJhIGJ5dGVzIGFmdGVyIHBsYWNlaG9sZGVyIGJ5dGVzIGFyZSBmb3VuZFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZWF0Z2FtbWl0L2Jhc2U2NC1qcy9pc3N1ZXMvNDJcbiAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoJz0nKVxuICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlblxuXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuXG4gICAgPyAwXG4gICAgOiA0IC0gKHZhbGlkTGVuICUgNClcblxuICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dXG59XG5cbi8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIF9ieXRlTGVuZ3RoIChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pIHtcbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG5cbiAgdmFyIGFyciA9IG5ldyBBcnIoX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSlcblxuICB2YXIgY3VyQnl0ZSA9IDBcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIHZhciBsZW4gPSBwbGFjZUhvbGRlcnNMZW4gPiAwXG4gICAgPyB2YWxpZExlbiAtIDRcbiAgICA6IHZhbGlkTGVuXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayhcbiAgICAgIHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aClcbiAgICApKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsInZhciAkanNjb21wPXtzY29wZTp7fSxnZXRHbG9iYWw6ZnVuY3Rpb24oYSl7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93PT09YT9hOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOmF9fTskanNjb21wLmdsb2JhbD0kanNjb21wLmdldEdsb2JhbCh0aGlzKTskanNjb21wLmluaXRTeW1ib2w9ZnVuY3Rpb24oKXskanNjb21wLmdsb2JhbC5TeW1ib2x8fCgkanNjb21wLmdsb2JhbC5TeW1ib2w9JGpzY29tcC5TeW1ib2wpOyRqc2NvbXAuaW5pdFN5bWJvbD1mdW5jdGlvbigpe319OyRqc2NvbXAuc3ltYm9sQ291bnRlcl89MDskanNjb21wLlN5bWJvbD1mdW5jdGlvbihhKXtyZXR1cm5cImpzY29tcF9zeW1ib2xfXCIrYSskanNjb21wLnN5bWJvbENvdW50ZXJfKyt9O1xuJGpzY29tcC5pbml0U3ltYm9sSXRlcmF0b3I9ZnVuY3Rpb24oKXskanNjb21wLmluaXRTeW1ib2woKTskanNjb21wLmdsb2JhbC5TeW1ib2wuaXRlcmF0b3J8fCgkanNjb21wLmdsb2JhbC5TeW1ib2wuaXRlcmF0b3I9JGpzY29tcC5nbG9iYWwuU3ltYm9sKFwiaXRlcmF0b3JcIikpOyRqc2NvbXAuaW5pdFN5bWJvbEl0ZXJhdG9yPWZ1bmN0aW9uKCl7fX07JGpzY29tcC5tYWtlSXRlcmF0b3I9ZnVuY3Rpb24oYSl7JGpzY29tcC5pbml0U3ltYm9sSXRlcmF0b3IoKTskanNjb21wLmluaXRTeW1ib2woKTskanNjb21wLmluaXRTeW1ib2xJdGVyYXRvcigpO3ZhciBiPWFbU3ltYm9sLml0ZXJhdG9yXTtpZihiKXJldHVybiBiLmNhbGwoYSk7dmFyIGM9MDtyZXR1cm57bmV4dDpmdW5jdGlvbigpe3JldHVybiBjPGEubGVuZ3RoP3tkb25lOiExLHZhbHVlOmFbYysrXX06e2RvbmU6ITB9fX19O1xuJGpzY29tcC5hcnJheUZyb21JdGVyYXRvcj1mdW5jdGlvbihhKXtmb3IodmFyIGIsYz1bXTshKGI9YS5uZXh0KCkpLmRvbmU7KWMucHVzaChiLnZhbHVlKTtyZXR1cm4gY307JGpzY29tcC5hcnJheUZyb21JdGVyYWJsZT1mdW5jdGlvbihhKXtyZXR1cm4gYSBpbnN0YW5jZW9mIEFycmF5P2E6JGpzY29tcC5hcnJheUZyb21JdGVyYXRvcigkanNjb21wLm1ha2VJdGVyYXRvcihhKSl9OyRqc2NvbXAuaW5oZXJpdHM9ZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBjKCl7fWMucHJvdG90eXBlPWIucHJvdG90eXBlO2EucHJvdG90eXBlPW5ldyBjO2EucHJvdG90eXBlLmNvbnN0cnVjdG9yPWE7Zm9yKHZhciBkIGluIGIpaWYoT2JqZWN0LmRlZmluZVByb3BlcnRpZXMpe3ZhciBlPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYixkKTtlJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxkLGUpfWVsc2UgYVtkXT1iW2RdfTskanNjb21wLmFycmF5PSRqc2NvbXAuYXJyYXl8fHt9O1xuJGpzY29tcC5pdGVyYXRvckZyb21BcnJheT1mdW5jdGlvbihhLGIpeyRqc2NvbXAuaW5pdFN5bWJvbEl0ZXJhdG9yKCk7YSBpbnN0YW5jZW9mIFN0cmluZyYmKGErPVwiXCIpO3ZhciBjPTAsZD17bmV4dDpmdW5jdGlvbigpe2lmKGM8YS5sZW5ndGgpe3ZhciBlPWMrKztyZXR1cm57dmFsdWU6YihlLGFbZV0pLGRvbmU6ITF9fWQubmV4dD1mdW5jdGlvbigpe3JldHVybntkb25lOiEwLHZhbHVlOnZvaWQgMH19O3JldHVybiBkLm5leHQoKX19OyRqc2NvbXAuaW5pdFN5bWJvbCgpOyRqc2NvbXAuaW5pdFN5bWJvbEl0ZXJhdG9yKCk7ZFtTeW1ib2wuaXRlcmF0b3JdPWZ1bmN0aW9uKCl7cmV0dXJuIGR9O3JldHVybiBkfTtcbiRqc2NvbXAuZmluZEludGVybmFsPWZ1bmN0aW9uKGEsYixjKXthIGluc3RhbmNlb2YgU3RyaW5nJiYoYT1TdHJpbmcoYSkpO2Zvcih2YXIgZD1hLmxlbmd0aCxlPTA7ZTxkO2UrKyl7dmFyIGY9YVtlXTtpZihiLmNhbGwoYyxmLGUsYSkpcmV0dXJue2k6ZSx2OmZ9fXJldHVybntpOi0xLHY6dm9pZCAwfX07XG4kanNjb21wLmFycmF5LmZyb209ZnVuY3Rpb24oYSxiLGMpeyRqc2NvbXAuaW5pdFN5bWJvbEl0ZXJhdG9yKCk7Yj1udWxsIT1iP2I6ZnVuY3Rpb24oYSl7cmV0dXJuIGF9O3ZhciBkPVtdOyRqc2NvbXAuaW5pdFN5bWJvbCgpOyRqc2NvbXAuaW5pdFN5bWJvbEl0ZXJhdG9yKCk7dmFyIGU9YVtTeW1ib2wuaXRlcmF0b3JdO1wiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihhPWUuY2FsbChhKSk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgYS5uZXh0KWZvcig7IShlPWEubmV4dCgpKS5kb25lOylkLnB1c2goYi5jYWxsKGMsZS52YWx1ZSkpO2Vsc2UgZm9yKHZhciBlPWEubGVuZ3RoLGY9MDtmPGU7ZisrKWQucHVzaChiLmNhbGwoYyxhW2ZdKSk7cmV0dXJuIGR9OyRqc2NvbXAuYXJyYXkub2Y9ZnVuY3Rpb24oYSl7cmV0dXJuICRqc2NvbXAuYXJyYXkuZnJvbShhcmd1bWVudHMpfTtcbiRqc2NvbXAuYXJyYXkuZW50cmllcz1mdW5jdGlvbigpe3JldHVybiAkanNjb21wLml0ZXJhdG9yRnJvbUFycmF5KHRoaXMsZnVuY3Rpb24oYSxiKXtyZXR1cm5bYSxiXX0pfTskanNjb21wLmFycmF5Lmluc3RhbGxIZWxwZXJfPWZ1bmN0aW9uKGEsYil7IUFycmF5LnByb3RvdHlwZVthXSYmT2JqZWN0LmRlZmluZVByb3BlcnRpZXMmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSxhLHtjb25maWd1cmFibGU6ITAsZW51bWVyYWJsZTohMSx3cml0YWJsZTohMCx2YWx1ZTpifSl9OyRqc2NvbXAuYXJyYXkuZW50cmllcyRpbnN0YWxsPWZ1bmN0aW9uKCl7JGpzY29tcC5hcnJheS5pbnN0YWxsSGVscGVyXyhcImVudHJpZXNcIiwkanNjb21wLmFycmF5LmVudHJpZXMpfTskanNjb21wLmFycmF5LmtleXM9ZnVuY3Rpb24oKXtyZXR1cm4gJGpzY29tcC5pdGVyYXRvckZyb21BcnJheSh0aGlzLGZ1bmN0aW9uKGEpe3JldHVybiBhfSl9O1xuJGpzY29tcC5hcnJheS5rZXlzJGluc3RhbGw9ZnVuY3Rpb24oKXskanNjb21wLmFycmF5Lmluc3RhbGxIZWxwZXJfKFwia2V5c1wiLCRqc2NvbXAuYXJyYXkua2V5cyl9OyRqc2NvbXAuYXJyYXkudmFsdWVzPWZ1bmN0aW9uKCl7cmV0dXJuICRqc2NvbXAuaXRlcmF0b3JGcm9tQXJyYXkodGhpcyxmdW5jdGlvbihhLGIpe3JldHVybiBifSl9OyRqc2NvbXAuYXJyYXkudmFsdWVzJGluc3RhbGw9ZnVuY3Rpb24oKXskanNjb21wLmFycmF5Lmluc3RhbGxIZWxwZXJfKFwidmFsdWVzXCIsJGpzY29tcC5hcnJheS52YWx1ZXMpfTtcbiRqc2NvbXAuYXJyYXkuY29weVdpdGhpbj1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9dGhpcy5sZW5ndGg7YT1OdW1iZXIoYSk7Yj1OdW1iZXIoYik7Yz1OdW1iZXIobnVsbCE9Yz9jOmQpO2lmKGE8Yilmb3IoYz1NYXRoLm1pbihjLGQpO2I8YzspYiBpbiB0aGlzP3RoaXNbYSsrXT10aGlzW2IrK106KGRlbGV0ZSB0aGlzW2ErK10sYisrKTtlbHNlIGZvcihjPU1hdGgubWluKGMsZCtiLWEpLGErPWMtYjtjPmI7KS0tYyBpbiB0aGlzP3RoaXNbLS1hXT10aGlzW2NdOmRlbGV0ZSB0aGlzW2FdO3JldHVybiB0aGlzfTskanNjb21wLmFycmF5LmNvcHlXaXRoaW4kaW5zdGFsbD1mdW5jdGlvbigpeyRqc2NvbXAuYXJyYXkuaW5zdGFsbEhlbHBlcl8oXCJjb3B5V2l0aGluXCIsJGpzY29tcC5hcnJheS5jb3B5V2l0aGluKX07XG4kanNjb21wLmFycmF5LmZpbGw9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMubGVuZ3RofHwwOzA+YiYmKGI9TWF0aC5tYXgoMCxkK2IpKTtpZihudWxsPT1jfHxjPmQpYz1kO2M9TnVtYmVyKGMpOzA+YyYmKGM9TWF0aC5tYXgoMCxkK2MpKTtmb3IoYj1OdW1iZXIoYnx8MCk7YjxjO2IrKyl0aGlzW2JdPWE7cmV0dXJuIHRoaXN9OyRqc2NvbXAuYXJyYXkuZmlsbCRpbnN0YWxsPWZ1bmN0aW9uKCl7JGpzY29tcC5hcnJheS5pbnN0YWxsSGVscGVyXyhcImZpbGxcIiwkanNjb21wLmFycmF5LmZpbGwpfTskanNjb21wLmFycmF5LmZpbmQ9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gJGpzY29tcC5maW5kSW50ZXJuYWwodGhpcyxhLGIpLnZ9OyRqc2NvbXAuYXJyYXkuZmluZCRpbnN0YWxsPWZ1bmN0aW9uKCl7JGpzY29tcC5hcnJheS5pbnN0YWxsSGVscGVyXyhcImZpbmRcIiwkanNjb21wLmFycmF5LmZpbmQpfTtcbiRqc2NvbXAuYXJyYXkuZmluZEluZGV4PWZ1bmN0aW9uKGEsYil7cmV0dXJuICRqc2NvbXAuZmluZEludGVybmFsKHRoaXMsYSxiKS5pfTskanNjb21wLmFycmF5LmZpbmRJbmRleCRpbnN0YWxsPWZ1bmN0aW9uKCl7JGpzY29tcC5hcnJheS5pbnN0YWxsSGVscGVyXyhcImZpbmRJbmRleFwiLCRqc2NvbXAuYXJyYXkuZmluZEluZGV4KX07JGpzY29tcC5BU1NVTUVfTk9fTkFUSVZFX01BUD0hMTtcbiRqc2NvbXAuTWFwJGlzQ29uZm9ybWFudD1mdW5jdGlvbigpe2lmKCRqc2NvbXAuQVNTVU1FX05PX05BVElWRV9NQVApcmV0dXJuITE7dmFyIGE9JGpzY29tcC5nbG9iYWwuTWFwO2lmKCFhfHwhYS5wcm90b3R5cGUuZW50cmllc3x8XCJmdW5jdGlvblwiIT10eXBlb2YgT2JqZWN0LnNlYWwpcmV0dXJuITE7dHJ5e3ZhciBiPU9iamVjdC5zZWFsKHt4OjR9KSxjPW5ldyBhKCRqc2NvbXAubWFrZUl0ZXJhdG9yKFtbYixcInNcIl1dKSk7aWYoXCJzXCIhPWMuZ2V0KGIpfHwxIT1jLnNpemV8fGMuZ2V0KHt4OjR9KXx8Yy5zZXQoe3g6NH0sXCJ0XCIpIT1jfHwyIT1jLnNpemUpcmV0dXJuITE7dmFyIGQ9Yy5lbnRyaWVzKCksZT1kLm5leHQoKTtpZihlLmRvbmV8fGUudmFsdWVbMF0hPWJ8fFwic1wiIT1lLnZhbHVlWzFdKXJldHVybiExO2U9ZC5uZXh0KCk7cmV0dXJuIGUuZG9uZXx8NCE9ZS52YWx1ZVswXS54fHxcInRcIiE9ZS52YWx1ZVsxXXx8IWQubmV4dCgpLmRvbmU/ITE6ITB9Y2F0Y2goZil7cmV0dXJuITF9fTtcbiRqc2NvbXAuTWFwPWZ1bmN0aW9uKGEpe3RoaXMuZGF0YV89e307dGhpcy5oZWFkXz0kanNjb21wLk1hcC5jcmVhdGVIZWFkKCk7dGhpcy5zaXplPTA7aWYoYSl7YT0kanNjb21wLm1ha2VJdGVyYXRvcihhKTtmb3IodmFyIGI7IShiPWEubmV4dCgpKS5kb25lOyliPWIudmFsdWUsdGhpcy5zZXQoYlswXSxiWzFdKX19O1xuJGpzY29tcC5NYXAucHJvdG90eXBlLnNldD1mdW5jdGlvbihhLGIpe3ZhciBjPSRqc2NvbXAuTWFwLm1heWJlR2V0RW50cnkodGhpcyxhKTtjLmxpc3R8fChjLmxpc3Q9dGhpcy5kYXRhX1tjLmlkXT1bXSk7Yy5lbnRyeT9jLmVudHJ5LnZhbHVlPWI6KGMuZW50cnk9e25leHQ6dGhpcy5oZWFkXyxwcmV2aW91czp0aGlzLmhlYWRfLnByZXZpb3VzLGhlYWQ6dGhpcy5oZWFkXyxrZXk6YSx2YWx1ZTpifSxjLmxpc3QucHVzaChjLmVudHJ5KSx0aGlzLmhlYWRfLnByZXZpb3VzLm5leHQ9Yy5lbnRyeSx0aGlzLmhlYWRfLnByZXZpb3VzPWMuZW50cnksdGhpcy5zaXplKyspO3JldHVybiB0aGlzfTtcbiRqc2NvbXAuTWFwLnByb3RvdHlwZVtcImRlbGV0ZVwiXT1mdW5jdGlvbihhKXthPSRqc2NvbXAuTWFwLm1heWJlR2V0RW50cnkodGhpcyxhKTtyZXR1cm4gYS5lbnRyeSYmYS5saXN0PyhhLmxpc3Quc3BsaWNlKGEuaW5kZXgsMSksYS5saXN0Lmxlbmd0aHx8ZGVsZXRlIHRoaXMuZGF0YV9bYS5pZF0sYS5lbnRyeS5wcmV2aW91cy5uZXh0PWEuZW50cnkubmV4dCxhLmVudHJ5Lm5leHQucHJldmlvdXM9YS5lbnRyeS5wcmV2aW91cyxhLmVudHJ5LmhlYWQ9bnVsbCx0aGlzLnNpemUtLSwhMCk6ITF9OyRqc2NvbXAuTWFwLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuZGF0YV89e307dGhpcy5oZWFkXz10aGlzLmhlYWRfLnByZXZpb3VzPSRqc2NvbXAuTWFwLmNyZWF0ZUhlYWQoKTt0aGlzLnNpemU9MH07JGpzY29tcC5NYXAucHJvdG90eXBlLmhhcz1mdW5jdGlvbihhKXtyZXR1cm4hISRqc2NvbXAuTWFwLm1heWJlR2V0RW50cnkodGhpcyxhKS5lbnRyeX07XG4kanNjb21wLk1hcC5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKGEpe3JldHVybihhPSRqc2NvbXAuTWFwLm1heWJlR2V0RW50cnkodGhpcyxhKS5lbnRyeSkmJmEudmFsdWV9OyRqc2NvbXAuTWFwLnByb3RvdHlwZS5lbnRyaWVzPWZ1bmN0aW9uKCl7cmV0dXJuICRqc2NvbXAuTWFwLm1ha2VJdGVyYXRvcl8odGhpcyxmdW5jdGlvbihhKXtyZXR1cm5bYS5rZXksYS52YWx1ZV19KX07JGpzY29tcC5NYXAucHJvdG90eXBlLmtleXM9ZnVuY3Rpb24oKXtyZXR1cm4gJGpzY29tcC5NYXAubWFrZUl0ZXJhdG9yXyh0aGlzLGZ1bmN0aW9uKGEpe3JldHVybiBhLmtleX0pfTskanNjb21wLk1hcC5wcm90b3R5cGUudmFsdWVzPWZ1bmN0aW9uKCl7cmV0dXJuICRqc2NvbXAuTWFwLm1ha2VJdGVyYXRvcl8odGhpcyxmdW5jdGlvbihhKXtyZXR1cm4gYS52YWx1ZX0pfTtcbiRqc2NvbXAuTWFwLnByb3RvdHlwZS5mb3JFYWNoPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPXRoaXMuZW50cmllcygpLGQ7IShkPWMubmV4dCgpKS5kb25lOylkPWQudmFsdWUsYS5jYWxsKGIsZFsxXSxkWzBdLHRoaXMpfTskanNjb21wLk1hcC5tYXliZUdldEVudHJ5PWZ1bmN0aW9uKGEsYil7dmFyIGM9JGpzY29tcC5NYXAuZ2V0SWQoYiksZD1hLmRhdGFfW2NdO2lmKGQmJk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLmRhdGFfLGMpKWZvcih2YXIgZT0wO2U8ZC5sZW5ndGg7ZSsrKXt2YXIgZj1kW2VdO2lmKGIhPT1iJiZmLmtleSE9PWYua2V5fHxiPT09Zi5rZXkpcmV0dXJue2lkOmMsbGlzdDpkLGluZGV4OmUsZW50cnk6Zn19cmV0dXJue2lkOmMsbGlzdDpkLGluZGV4Oi0xLGVudHJ5OnZvaWQgMH19O1xuJGpzY29tcC5NYXAubWFrZUl0ZXJhdG9yXz1mdW5jdGlvbihhLGIpe3ZhciBjPWEuaGVhZF8sZD17bmV4dDpmdW5jdGlvbigpe2lmKGMpe2Zvcig7Yy5oZWFkIT1hLmhlYWRfOyljPWMucHJldmlvdXM7Zm9yKDtjLm5leHQhPWMuaGVhZDspcmV0dXJuIGM9Yy5uZXh0LHtkb25lOiExLHZhbHVlOmIoYyl9O2M9bnVsbH1yZXR1cm57ZG9uZTohMCx2YWx1ZTp2b2lkIDB9fX07JGpzY29tcC5pbml0U3ltYm9sKCk7JGpzY29tcC5pbml0U3ltYm9sSXRlcmF0b3IoKTtkW1N5bWJvbC5pdGVyYXRvcl09ZnVuY3Rpb24oKXtyZXR1cm4gZH07cmV0dXJuIGR9OyRqc2NvbXAuTWFwLm1hcEluZGV4Xz0wOyRqc2NvbXAuTWFwLmNyZWF0ZUhlYWQ9ZnVuY3Rpb24oKXt2YXIgYT17fTtyZXR1cm4gYS5wcmV2aW91cz1hLm5leHQ9YS5oZWFkPWF9O1xuJGpzY29tcC5NYXAuZ2V0SWQ9ZnVuY3Rpb24oYSl7aWYoIShhIGluc3RhbmNlb2YgT2JqZWN0KSlyZXR1cm5cInBfXCIrYTtpZighKCRqc2NvbXAuTWFwLmlkS2V5IGluIGEpKXRyeXskanNjb21wLk1hcC5kZWZpbmVQcm9wZXJ0eShhLCRqc2NvbXAuTWFwLmlkS2V5LHt2YWx1ZTorKyRqc2NvbXAuTWFwLm1hcEluZGV4X30pfWNhdGNoKGIpe31yZXR1cm4gJGpzY29tcC5NYXAuaWRLZXkgaW4gYT9hWyRqc2NvbXAuTWFwLmlkS2V5XTpcIm9fIFwiK2F9OyRqc2NvbXAuTWFwLmRlZmluZVByb3BlcnR5PU9iamVjdC5kZWZpbmVQcm9wZXJ0eT9mdW5jdGlvbihhLGIsYyl7T2JqZWN0LmRlZmluZVByb3BlcnR5KGEsYix7dmFsdWU6U3RyaW5nKGMpfSl9OmZ1bmN0aW9uKGEsYixjKXthW2JdPVN0cmluZyhjKX07JGpzY29tcC5NYXAuRW50cnk9ZnVuY3Rpb24oKXt9O1xuJGpzY29tcC5NYXAkaW5zdGFsbD1mdW5jdGlvbigpeyRqc2NvbXAuaW5pdFN5bWJvbCgpOyRqc2NvbXAuaW5pdFN5bWJvbEl0ZXJhdG9yKCk7JGpzY29tcC5NYXAkaXNDb25mb3JtYW50KCk/JGpzY29tcC5NYXA9JGpzY29tcC5nbG9iYWwuTWFwOigkanNjb21wLmluaXRTeW1ib2woKSwkanNjb21wLmluaXRTeW1ib2xJdGVyYXRvcigpLCRqc2NvbXAuTWFwLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdPSRqc2NvbXAuTWFwLnByb3RvdHlwZS5lbnRyaWVzLCRqc2NvbXAuaW5pdFN5bWJvbCgpLCRqc2NvbXAuTWFwLmlkS2V5PVN5bWJvbChcIm1hcC1pZC1rZXlcIiksJGpzY29tcC5NYXAkaW5zdGFsbD1mdW5jdGlvbigpe30pfTskanNjb21wLm1hdGg9JGpzY29tcC5tYXRofHx7fTtcbiRqc2NvbXAubWF0aC5jbHozMj1mdW5jdGlvbihhKXthPU51bWJlcihhKT4+PjA7aWYoMD09PWEpcmV0dXJuIDMyO3ZhciBiPTA7MD09PShhJjQyOTQ5MDE3NjApJiYoYTw8PTE2LGIrPTE2KTswPT09KGEmNDI3ODE5MDA4MCkmJihhPDw9OCxiKz04KTswPT09KGEmNDAyNjUzMTg0MCkmJihhPDw9NCxiKz00KTswPT09KGEmMzIyMTIyNTQ3MikmJihhPDw9MixiKz0yKTswPT09KGEmMjE0NzQ4MzY0OCkmJmIrKztyZXR1cm4gYn07JGpzY29tcC5tYXRoLmltdWw9ZnVuY3Rpb24oYSxiKXthPU51bWJlcihhKTtiPU51bWJlcihiKTt2YXIgYz1hJjY1NTM1LGQ9YiY2NTUzNTtyZXR1cm4gYypkKygoYT4+PjE2JjY1NTM1KSpkK2MqKGI+Pj4xNiY2NTUzNSk8PDE2Pj4+MCl8MH07JGpzY29tcC5tYXRoLnNpZ249ZnVuY3Rpb24oYSl7YT1OdW1iZXIoYSk7cmV0dXJuIDA9PT1hfHxpc05hTihhKT9hOjA8YT8xOi0xfTtcbiRqc2NvbXAubWF0aC5sb2cxMD1mdW5jdGlvbihhKXtyZXR1cm4gTWF0aC5sb2coYSkvTWF0aC5MTjEwfTskanNjb21wLm1hdGgubG9nMj1mdW5jdGlvbihhKXtyZXR1cm4gTWF0aC5sb2coYSkvTWF0aC5MTjJ9OyRqc2NvbXAubWF0aC5sb2cxcD1mdW5jdGlvbihhKXthPU51bWJlcihhKTtpZiguMjU+YSYmLS4yNTxhKXtmb3IodmFyIGI9YSxjPTEsZD1hLGU9MCxmPTE7ZSE9ZDspYio9YSxmKj0tMSxkPShlPWQpK2YqYi8rK2M7cmV0dXJuIGR9cmV0dXJuIE1hdGgubG9nKDErYSl9OyRqc2NvbXAubWF0aC5leHBtMT1mdW5jdGlvbihhKXthPU51bWJlcihhKTtpZiguMjU+YSYmLS4yNTxhKXtmb3IodmFyIGI9YSxjPTEsZD1hLGU9MDtlIT1kOyliKj1hLysrYyxkPShlPWQpK2I7cmV0dXJuIGR9cmV0dXJuIE1hdGguZXhwKGEpLTF9OyRqc2NvbXAubWF0aC5jb3NoPWZ1bmN0aW9uKGEpe2E9TnVtYmVyKGEpO3JldHVybihNYXRoLmV4cChhKStNYXRoLmV4cCgtYSkpLzJ9O1xuJGpzY29tcC5tYXRoLnNpbmg9ZnVuY3Rpb24oYSl7YT1OdW1iZXIoYSk7cmV0dXJuIDA9PT1hP2E6KE1hdGguZXhwKGEpLU1hdGguZXhwKC1hKSkvMn07JGpzY29tcC5tYXRoLnRhbmg9ZnVuY3Rpb24oYSl7YT1OdW1iZXIoYSk7aWYoMD09PWEpcmV0dXJuIGE7dmFyIGI9TWF0aC5leHAoLTIqTWF0aC5hYnMoYSkpLGI9KDEtYikvKDErYik7cmV0dXJuIDA+YT8tYjpifTskanNjb21wLm1hdGguYWNvc2g9ZnVuY3Rpb24oYSl7YT1OdW1iZXIoYSk7cmV0dXJuIE1hdGgubG9nKGErTWF0aC5zcXJ0KGEqYS0xKSl9OyRqc2NvbXAubWF0aC5hc2luaD1mdW5jdGlvbihhKXthPU51bWJlcihhKTtpZigwPT09YSlyZXR1cm4gYTt2YXIgYj1NYXRoLmxvZyhNYXRoLmFicyhhKStNYXRoLnNxcnQoYSphKzEpKTtyZXR1cm4gMD5hPy1iOmJ9O1xuJGpzY29tcC5tYXRoLmF0YW5oPWZ1bmN0aW9uKGEpe2E9TnVtYmVyKGEpO3JldHVybigkanNjb21wLm1hdGgubG9nMXAoYSktJGpzY29tcC5tYXRoLmxvZzFwKC1hKSkvMn07JGpzY29tcC5tYXRoLmh5cG90PWZ1bmN0aW9uKGEsYixjKXthPU51bWJlcihhKTtiPU51bWJlcihiKTt2YXIgZCxlLGYsZz1NYXRoLm1heChNYXRoLmFicyhhKSxNYXRoLmFicyhiKSk7Zm9yKGQ9MjtkPGFyZ3VtZW50cy5sZW5ndGg7ZCsrKWc9TWF0aC5tYXgoZyxNYXRoLmFicyhhcmd1bWVudHNbZF0pKTtpZigxRTEwMDxnfHwxRS0xMDA+Zyl7YS89ZztiLz1nO2Y9YSphK2IqYjtmb3IoZD0yO2Q8YXJndW1lbnRzLmxlbmd0aDtkKyspZT1OdW1iZXIoYXJndW1lbnRzW2RdKS9nLGYrPWUqZTtyZXR1cm4gTWF0aC5zcXJ0KGYpKmd9Zj1hKmErYipiO2ZvcihkPTI7ZDxhcmd1bWVudHMubGVuZ3RoO2QrKyllPU51bWJlcihhcmd1bWVudHNbZF0pLGYrPWUqZTtyZXR1cm4gTWF0aC5zcXJ0KGYpfTtcbiRqc2NvbXAubWF0aC50cnVuYz1mdW5jdGlvbihhKXthPU51bWJlcihhKTtpZihpc05hTihhKXx8SW5maW5pdHk9PT1hfHwtSW5maW5pdHk9PT1hfHwwPT09YSlyZXR1cm4gYTt2YXIgYj1NYXRoLmZsb29yKE1hdGguYWJzKGEpKTtyZXR1cm4gMD5hPy1iOmJ9OyRqc2NvbXAubWF0aC5jYnJ0PWZ1bmN0aW9uKGEpe2lmKDA9PT1hKXJldHVybiBhO2E9TnVtYmVyKGEpO3ZhciBiPU1hdGgucG93KE1hdGguYWJzKGEpLDEvMyk7cmV0dXJuIDA+YT8tYjpifTskanNjb21wLm51bWJlcj0kanNjb21wLm51bWJlcnx8e307JGpzY29tcC5udW1iZXIuaXNGaW5pdGU9ZnVuY3Rpb24oYSl7cmV0dXJuXCJudW1iZXJcIiE9PXR5cGVvZiBhPyExOiFpc05hTihhKSYmSW5maW5pdHkhPT1hJiYtSW5maW5pdHkhPT1hfTskanNjb21wLm51bWJlci5pc0ludGVnZXI9ZnVuY3Rpb24oYSl7cmV0dXJuICRqc2NvbXAubnVtYmVyLmlzRmluaXRlKGEpP2E9PT1NYXRoLmZsb29yKGEpOiExfTtcbiRqc2NvbXAubnVtYmVyLmlzTmFOPWZ1bmN0aW9uKGEpe3JldHVyblwibnVtYmVyXCI9PT10eXBlb2YgYSYmaXNOYU4oYSl9OyRqc2NvbXAubnVtYmVyLmlzU2FmZUludGVnZXI9ZnVuY3Rpb24oYSl7cmV0dXJuICRqc2NvbXAubnVtYmVyLmlzSW50ZWdlcihhKSYmTWF0aC5hYnMoYSk8PSRqc2NvbXAubnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJ9OyRqc2NvbXAubnVtYmVyLkVQU0lMT049ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5wb3coMiwtNTIpfSgpOyRqc2NvbXAubnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI9ZnVuY3Rpb24oKXtyZXR1cm4gOTAwNzE5OTI1NDc0MDk5MX0oKTskanNjb21wLm51bWJlci5NSU5fU0FGRV9JTlRFR0VSPWZ1bmN0aW9uKCl7cmV0dXJuLTkwMDcxOTkyNTQ3NDA5OTF9KCk7JGpzY29tcC5vYmplY3Q9JGpzY29tcC5vYmplY3R8fHt9O1xuJGpzY29tcC5vYmplY3QuYXNzaWduPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPTE7Yzxhcmd1bWVudHMubGVuZ3RoO2MrKyl7dmFyIGQ9YXJndW1lbnRzW2NdO2lmKGQpZm9yKHZhciBlIGluIGQpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGQsZSkmJihhW2VdPWRbZV0pfXJldHVybiBhfTskanNjb21wLm9iamVjdC5pcz1mdW5jdGlvbihhLGIpe3JldHVybiBhPT09Yj8wIT09YXx8MS9hPT09MS9iOmEhPT1hJiZiIT09Yn07JGpzY29tcC5BU1NVTUVfTk9fTkFUSVZFX1NFVD0hMTtcbiRqc2NvbXAuU2V0JGlzQ29uZm9ybWFudD1mdW5jdGlvbigpe2lmKCRqc2NvbXAuQVNTVU1FX05PX05BVElWRV9TRVQpcmV0dXJuITE7dmFyIGE9JGpzY29tcC5nbG9iYWwuU2V0O2lmKCFhfHwhYS5wcm90b3R5cGUuZW50cmllc3x8XCJmdW5jdGlvblwiIT10eXBlb2YgT2JqZWN0LnNlYWwpcmV0dXJuITE7dHJ5e3ZhciBiPU9iamVjdC5zZWFsKHt4OjR9KSxjPW5ldyBhKCRqc2NvbXAubWFrZUl0ZXJhdG9yKFtiXSkpO2lmKCFjLmhhcyhiKXx8MSE9Yy5zaXplfHxjLmFkZChiKSE9Y3x8MSE9Yy5zaXplfHxjLmFkZCh7eDo0fSkhPWN8fDIhPWMuc2l6ZSlyZXR1cm4hMTt2YXIgZD1jLmVudHJpZXMoKSxlPWQubmV4dCgpO2lmKGUuZG9uZXx8ZS52YWx1ZVswXSE9Ynx8ZS52YWx1ZVsxXSE9YilyZXR1cm4hMTtlPWQubmV4dCgpO3JldHVybiBlLmRvbmV8fGUudmFsdWVbMF09PWJ8fDQhPWUudmFsdWVbMF0ueHx8ZS52YWx1ZVsxXSE9ZS52YWx1ZVswXT8hMTpkLm5leHQoKS5kb25lfWNhdGNoKGYpe3JldHVybiExfX07XG4kanNjb21wLlNldD1mdW5jdGlvbihhKXt0aGlzLm1hcF89bmV3ICRqc2NvbXAuTWFwO2lmKGEpe2E9JGpzY29tcC5tYWtlSXRlcmF0b3IoYSk7Zm9yKHZhciBiOyEoYj1hLm5leHQoKSkuZG9uZTspdGhpcy5hZGQoYi52YWx1ZSl9dGhpcy5zaXplPXRoaXMubWFwXy5zaXplfTskanNjb21wLlNldC5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKGEpe3RoaXMubWFwXy5zZXQoYSxhKTt0aGlzLnNpemU9dGhpcy5tYXBfLnNpemU7cmV0dXJuIHRoaXN9OyRqc2NvbXAuU2V0LnByb3RvdHlwZVtcImRlbGV0ZVwiXT1mdW5jdGlvbihhKXthPXRoaXMubWFwX1tcImRlbGV0ZVwiXShhKTt0aGlzLnNpemU9dGhpcy5tYXBfLnNpemU7cmV0dXJuIGF9OyRqc2NvbXAuU2V0LnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMubWFwXy5jbGVhcigpO3RoaXMuc2l6ZT0wfTskanNjb21wLlNldC5wcm90b3R5cGUuaGFzPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLm1hcF8uaGFzKGEpfTtcbiRqc2NvbXAuU2V0LnByb3RvdHlwZS5lbnRyaWVzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwXy5lbnRyaWVzKCl9OyRqc2NvbXAuU2V0LnByb3RvdHlwZS52YWx1ZXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXBfLnZhbHVlcygpfTskanNjb21wLlNldC5wcm90b3R5cGUuZm9yRWFjaD1mdW5jdGlvbihhLGIpe3ZhciBjPXRoaXM7dGhpcy5tYXBfLmZvckVhY2goZnVuY3Rpb24oZCl7cmV0dXJuIGEuY2FsbChiLGQsZCxjKX0pfTskanNjb21wLlNldCRpbnN0YWxsPWZ1bmN0aW9uKCl7JGpzY29tcC5NYXAkaW5zdGFsbCgpOyRqc2NvbXAuU2V0JGlzQ29uZm9ybWFudCgpPyRqc2NvbXAuU2V0PSRqc2NvbXAuZ2xvYmFsLlNldDooJGpzY29tcC5pbml0U3ltYm9sKCksJGpzY29tcC5pbml0U3ltYm9sSXRlcmF0b3IoKSwkanNjb21wLlNldC5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXT0kanNjb21wLlNldC5wcm90b3R5cGUudmFsdWVzLCRqc2NvbXAuU2V0JGluc3RhbGw9ZnVuY3Rpb24oKXt9KX07XG4kanNjb21wLnN0cmluZz0kanNjb21wLnN0cmluZ3x8e307JGpzY29tcC5jaGVja1N0cmluZ0FyZ3M9ZnVuY3Rpb24oYSxiLGMpe2lmKG51bGw9PWEpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSAndGhpcycgdmFsdWUgZm9yIFN0cmluZy5wcm90b3R5cGUuXCIrYytcIiBtdXN0IG5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZFwiKTtpZihiIGluc3RhbmNlb2YgUmVnRXhwKXRocm93IG5ldyBUeXBlRXJyb3IoXCJGaXJzdCBhcmd1bWVudCB0byBTdHJpbmcucHJvdG90eXBlLlwiK2MrXCIgbXVzdCBub3QgYmUgYSByZWd1bGFyIGV4cHJlc3Npb25cIik7cmV0dXJuIGErXCJcIn07XG4kanNjb21wLnN0cmluZy5mcm9tQ29kZVBvaW50PWZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1cIlwiLGM9MDtjPGFyZ3VtZW50cy5sZW5ndGg7YysrKXt2YXIgZD1OdW1iZXIoYXJndW1lbnRzW2NdKTtpZigwPmR8fDExMTQxMTE8ZHx8ZCE9PU1hdGguZmxvb3IoZCkpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJpbnZhbGlkX2NvZGVfcG9pbnQgXCIrZCk7NjU1MzU+PWQ/Yis9U3RyaW5nLmZyb21DaGFyQ29kZShkKTooZC09NjU1MzYsYis9U3RyaW5nLmZyb21DaGFyQ29kZShkPj4+MTAmMTAyM3w1NTI5NiksYis9U3RyaW5nLmZyb21DaGFyQ29kZShkJjEwMjN8NTYzMjApKX1yZXR1cm4gYn07XG4kanNjb21wLnN0cmluZy5yZXBlYXQ9ZnVuY3Rpb24oYSl7dmFyIGI9JGpzY29tcC5jaGVja1N0cmluZ0FyZ3ModGhpcyxudWxsLFwicmVwZWF0XCIpO2lmKDA+YXx8MTM0MjE3NzI3OTxhKXRocm93IG5ldyBSYW5nZUVycm9yKFwiSW52YWxpZCBjb3VudCB2YWx1ZVwiKTthfD0wO2Zvcih2YXIgYz1cIlwiO2E7KWlmKGEmMSYmKGMrPWIpLGE+Pj49MSliKz1iO3JldHVybiBjfTskanNjb21wLnN0cmluZy5yZXBlYXQkaW5zdGFsbD1mdW5jdGlvbigpe1N0cmluZy5wcm90b3R5cGUucmVwZWF0fHwoU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQ9JGpzY29tcC5zdHJpbmcucmVwZWF0KX07XG4kanNjb21wLnN0cmluZy5jb2RlUG9pbnRBdD1mdW5jdGlvbihhKXt2YXIgYj0kanNjb21wLmNoZWNrU3RyaW5nQXJncyh0aGlzLG51bGwsXCJjb2RlUG9pbnRBdFwiKSxjPWIubGVuZ3RoO2E9TnVtYmVyKGEpfHwwO2lmKDA8PWEmJmE8Yyl7YXw9MDt2YXIgZD1iLmNoYXJDb2RlQXQoYSk7aWYoNTUyOTY+ZHx8NTYzMTk8ZHx8YSsxPT09YylyZXR1cm4gZDthPWIuY2hhckNvZGVBdChhKzEpO3JldHVybiA1NjMyMD5hfHw1NzM0MzxhP2Q6MTAyNCooZC01NTI5NikrYSs5MjE2fX07JGpzY29tcC5zdHJpbmcuY29kZVBvaW50QXQkaW5zdGFsbD1mdW5jdGlvbigpe1N0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXR8fChTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0PSRqc2NvbXAuc3RyaW5nLmNvZGVQb2ludEF0KX07XG4kanNjb21wLnN0cmluZy5pbmNsdWRlcz1mdW5jdGlvbihhLGIpe3JldHVybi0xIT09JGpzY29tcC5jaGVja1N0cmluZ0FyZ3ModGhpcyxhLFwiaW5jbHVkZXNcIikuaW5kZXhPZihhLGJ8fDApfTskanNjb21wLnN0cmluZy5pbmNsdWRlcyRpbnN0YWxsPWZ1bmN0aW9uKCl7U3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlc3x8KFN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXM9JGpzY29tcC5zdHJpbmcuaW5jbHVkZXMpfTskanNjb21wLnN0cmluZy5zdGFydHNXaXRoPWZ1bmN0aW9uKGEsYil7dmFyIGM9JGpzY29tcC5jaGVja1N0cmluZ0FyZ3ModGhpcyxhLFwic3RhcnRzV2l0aFwiKTthKz1cIlwiO2Zvcih2YXIgZD1jLmxlbmd0aCxlPWEubGVuZ3RoLGY9TWF0aC5tYXgoMCxNYXRoLm1pbihifDAsYy5sZW5ndGgpKSxnPTA7ZzxlJiZmPGQ7KWlmKGNbZisrXSE9YVtnKytdKXJldHVybiExO3JldHVybiBnPj1lfTtcbiRqc2NvbXAuc3RyaW5nLnN0YXJ0c1dpdGgkaW5zdGFsbD1mdW5jdGlvbigpe1N0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aHx8KFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aD0kanNjb21wLnN0cmluZy5zdGFydHNXaXRoKX07JGpzY29tcC5zdHJpbmcuZW5kc1dpdGg9ZnVuY3Rpb24oYSxiKXt2YXIgYz0kanNjb21wLmNoZWNrU3RyaW5nQXJncyh0aGlzLGEsXCJlbmRzV2l0aFwiKTthKz1cIlwiO3ZvaWQgMD09PWImJihiPWMubGVuZ3RoKTtmb3IodmFyIGQ9TWF0aC5tYXgoMCxNYXRoLm1pbihifDAsYy5sZW5ndGgpKSxlPWEubGVuZ3RoOzA8ZSYmMDxkOylpZihjWy0tZF0hPWFbLS1lXSlyZXR1cm4hMTtyZXR1cm4gMD49ZX07JGpzY29tcC5zdHJpbmcuZW5kc1dpdGgkaW5zdGFsbD1mdW5jdGlvbigpe1N0cmluZy5wcm90b3R5cGUuZW5kc1dpdGh8fChTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoPSRqc2NvbXAuc3RyaW5nLmVuZHNXaXRoKX07XG52YXIgQ09NUElMRUQ9ITAsZ29vZz1nb29nfHx7fTtnb29nLmdsb2JhbD10aGlzO2dvb2cuaXNEZWY9ZnVuY3Rpb24oYSl7cmV0dXJuIHZvaWQgMCE9PWF9O2dvb2cuZXhwb3J0UGF0aF89ZnVuY3Rpb24oYSxiLGMpe2E9YS5zcGxpdChcIi5cIik7Yz1jfHxnb29nLmdsb2JhbDthWzBdaW4gY3x8IWMuZXhlY1NjcmlwdHx8Yy5leGVjU2NyaXB0KFwidmFyIFwiK2FbMF0pO2Zvcih2YXIgZDthLmxlbmd0aCYmKGQ9YS5zaGlmdCgpKTspIWEubGVuZ3RoJiZnb29nLmlzRGVmKGIpP2NbZF09YjpjPWNbZF0/Y1tkXTpjW2RdPXt9fTtcbmdvb2cuZGVmaW5lPWZ1bmN0aW9uKGEsYil7dmFyIGM9YjtDT01QSUxFRHx8KGdvb2cuZ2xvYmFsLkNMT1NVUkVfVU5DT01QSUxFRF9ERUZJTkVTJiZPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZ29vZy5nbG9iYWwuQ0xPU1VSRV9VTkNPTVBJTEVEX0RFRklORVMsYSk/Yz1nb29nLmdsb2JhbC5DTE9TVVJFX1VOQ09NUElMRURfREVGSU5FU1thXTpnb29nLmdsb2JhbC5DTE9TVVJFX0RFRklORVMmJk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChnb29nLmdsb2JhbC5DTE9TVVJFX0RFRklORVMsYSkmJihjPWdvb2cuZ2xvYmFsLkNMT1NVUkVfREVGSU5FU1thXSkpO2dvb2cuZXhwb3J0UGF0aF8oYSxjKX07Z29vZy5ERUJVRz0hMDtnb29nLkxPQ0FMRT1cImVuXCI7Z29vZy5UUlVTVEVEX1NJVEU9ITA7Z29vZy5TVFJJQ1RfTU9ERV9DT01QQVRJQkxFPSExO2dvb2cuRElTQUxMT1dfVEVTVF9PTkxZX0NPREU9Q09NUElMRUQmJiFnb29nLkRFQlVHO1xuZ29vZy5FTkFCTEVfQ0hST01FX0FQUF9TQUZFX1NDUklQVF9MT0FESU5HPSExO2dvb2cucHJvdmlkZT1mdW5jdGlvbihhKXtpZighQ09NUElMRUQmJmdvb2cuaXNQcm92aWRlZF8oYSkpdGhyb3cgRXJyb3IoJ05hbWVzcGFjZSBcIicrYSsnXCIgYWxyZWFkeSBkZWNsYXJlZC4nKTtnb29nLmNvbnN0cnVjdE5hbWVzcGFjZV8oYSl9O2dvb2cuY29uc3RydWN0TmFtZXNwYWNlXz1mdW5jdGlvbihhLGIpe2lmKCFDT01QSUxFRCl7ZGVsZXRlIGdvb2cuaW1wbGljaXROYW1lc3BhY2VzX1thXTtmb3IodmFyIGM9YTsoYz1jLnN1YnN0cmluZygwLGMubGFzdEluZGV4T2YoXCIuXCIpKSkmJiFnb29nLmdldE9iamVjdEJ5TmFtZShjKTspZ29vZy5pbXBsaWNpdE5hbWVzcGFjZXNfW2NdPSEwfWdvb2cuZXhwb3J0UGF0aF8oYSxiKX07Z29vZy5WQUxJRF9NT0RVTEVfUkVfPS9eW2EtekEtWl8kXVthLXpBLVowLTkuXyRdKiQvO1xuZ29vZy5tb2R1bGU9ZnVuY3Rpb24oYSl7aWYoIWdvb2cuaXNTdHJpbmcoYSl8fCFhfHwtMT09YS5zZWFyY2goZ29vZy5WQUxJRF9NT0RVTEVfUkVfKSl0aHJvdyBFcnJvcihcIkludmFsaWQgbW9kdWxlIGlkZW50aWZpZXJcIik7aWYoIWdvb2cuaXNJbk1vZHVsZUxvYWRlcl8oKSl0aHJvdyBFcnJvcihcIk1vZHVsZSBcIithK1wiIGhhcyBiZWVuIGxvYWRlZCBpbmNvcnJlY3RseS5cIik7aWYoZ29vZy5tb2R1bGVMb2FkZXJTdGF0ZV8ubW9kdWxlTmFtZSl0aHJvdyBFcnJvcihcImdvb2cubW9kdWxlIG1heSBvbmx5IGJlIGNhbGxlZCBvbmNlIHBlciBtb2R1bGUuXCIpO2dvb2cubW9kdWxlTG9hZGVyU3RhdGVfLm1vZHVsZU5hbWU9YTtpZighQ09NUElMRUQpe2lmKGdvb2cuaXNQcm92aWRlZF8oYSkpdGhyb3cgRXJyb3IoJ05hbWVzcGFjZSBcIicrYSsnXCIgYWxyZWFkeSBkZWNsYXJlZC4nKTtkZWxldGUgZ29vZy5pbXBsaWNpdE5hbWVzcGFjZXNfW2FdfX07Z29vZy5tb2R1bGUuZ2V0PWZ1bmN0aW9uKGEpe3JldHVybiBnb29nLm1vZHVsZS5nZXRJbnRlcm5hbF8oYSl9O1xuZ29vZy5tb2R1bGUuZ2V0SW50ZXJuYWxfPWZ1bmN0aW9uKGEpe2lmKCFDT01QSUxFRClyZXR1cm4gZ29vZy5pc1Byb3ZpZGVkXyhhKT9hIGluIGdvb2cubG9hZGVkTW9kdWxlc18/Z29vZy5sb2FkZWRNb2R1bGVzX1thXTpnb29nLmdldE9iamVjdEJ5TmFtZShhKTpudWxsfTtnb29nLm1vZHVsZUxvYWRlclN0YXRlXz1udWxsO2dvb2cuaXNJbk1vZHVsZUxvYWRlcl89ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbCE9Z29vZy5tb2R1bGVMb2FkZXJTdGF0ZV99O1xuZ29vZy5tb2R1bGUuZGVjbGFyZUxlZ2FjeU5hbWVzcGFjZT1mdW5jdGlvbigpe2lmKCFDT01QSUxFRCYmIWdvb2cuaXNJbk1vZHVsZUxvYWRlcl8oKSl0aHJvdyBFcnJvcihcImdvb2cubW9kdWxlLmRlY2xhcmVMZWdhY3lOYW1lc3BhY2UgbXVzdCBiZSBjYWxsZWQgZnJvbSB3aXRoaW4gYSBnb29nLm1vZHVsZVwiKTtpZighQ09NUElMRUQmJiFnb29nLm1vZHVsZUxvYWRlclN0YXRlXy5tb2R1bGVOYW1lKXRocm93IEVycm9yKFwiZ29vZy5tb2R1bGUgbXVzdCBiZSBjYWxsZWQgcHJpb3IgdG8gZ29vZy5tb2R1bGUuZGVjbGFyZUxlZ2FjeU5hbWVzcGFjZS5cIik7Z29vZy5tb2R1bGVMb2FkZXJTdGF0ZV8uZGVjbGFyZUxlZ2FjeU5hbWVzcGFjZT0hMH07XG5nb29nLnNldFRlc3RPbmx5PWZ1bmN0aW9uKGEpe2lmKGdvb2cuRElTQUxMT1dfVEVTVF9PTkxZX0NPREUpdGhyb3cgYT1hfHxcIlwiLEVycm9yKFwiSW1wb3J0aW5nIHRlc3Qtb25seSBjb2RlIGludG8gbm9uLWRlYnVnIGVudmlyb25tZW50XCIrKGE/XCI6IFwiK2E6XCIuXCIpKTt9O2dvb2cuZm9yd2FyZERlY2xhcmU9ZnVuY3Rpb24oYSl7fTtDT01QSUxFRHx8KGdvb2cuaXNQcm92aWRlZF89ZnVuY3Rpb24oYSl7cmV0dXJuIGEgaW4gZ29vZy5sb2FkZWRNb2R1bGVzX3x8IWdvb2cuaW1wbGljaXROYW1lc3BhY2VzX1thXSYmZ29vZy5pc0RlZkFuZE5vdE51bGwoZ29vZy5nZXRPYmplY3RCeU5hbWUoYSkpfSxnb29nLmltcGxpY2l0TmFtZXNwYWNlc189e1wiZ29vZy5tb2R1bGVcIjohMH0pO1xuZ29vZy5nZXRPYmplY3RCeU5hbWU9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9YS5zcGxpdChcIi5cIiksZD1ifHxnb29nLmdsb2JhbCxlO2U9Yy5zaGlmdCgpOylpZihnb29nLmlzRGVmQW5kTm90TnVsbChkW2VdKSlkPWRbZV07ZWxzZSByZXR1cm4gbnVsbDtyZXR1cm4gZH07Z29vZy5nbG9iYWxpemU9ZnVuY3Rpb24oYSxiKXt2YXIgYz1ifHxnb29nLmdsb2JhbCxkO2ZvcihkIGluIGEpY1tkXT1hW2RdfTtnb29nLmFkZERlcGVuZGVuY3k9ZnVuY3Rpb24oYSxiLGMsZCl7aWYoZ29vZy5ERVBFTkRFTkNJRVNfRU5BQkxFRCl7dmFyIGU7YT1hLnJlcGxhY2UoL1xcXFwvZyxcIi9cIik7Zm9yKHZhciBmPWdvb2cuZGVwZW5kZW5jaWVzXyxnPTA7ZT1iW2ddO2crKylmLm5hbWVUb1BhdGhbZV09YSxmLnBhdGhJc01vZHVsZVthXT0hIWQ7Zm9yKGQ9MDtiPWNbZF07ZCsrKWEgaW4gZi5yZXF1aXJlc3x8KGYucmVxdWlyZXNbYV09e30pLGYucmVxdWlyZXNbYV1bYl09ITB9fTtcbmdvb2cuRU5BQkxFX0RFQlVHX0xPQURFUj0hMDtnb29nLmxvZ1RvQ29uc29sZV89ZnVuY3Rpb24oYSl7Z29vZy5nbG9iYWwuY29uc29sZSYmZ29vZy5nbG9iYWwuY29uc29sZS5lcnJvcihhKX07Z29vZy5yZXF1aXJlPWZ1bmN0aW9uKGEpe2lmKCFDT01QSUxFRCl7Z29vZy5FTkFCTEVfREVCVUdfTE9BREVSJiZnb29nLklTX09MRF9JRV8mJmdvb2cubWF5YmVQcm9jZXNzRGVmZXJyZWREZXBfKGEpO2lmKGdvb2cuaXNQcm92aWRlZF8oYSkpcmV0dXJuIGdvb2cuaXNJbk1vZHVsZUxvYWRlcl8oKT9nb29nLm1vZHVsZS5nZXRJbnRlcm5hbF8oYSk6bnVsbDtpZihnb29nLkVOQUJMRV9ERUJVR19MT0FERVIpe3ZhciBiPWdvb2cuZ2V0UGF0aEZyb21EZXBzXyhhKTtpZihiKXJldHVybiBnb29nLndyaXRlU2NyaXB0c18oYiksbnVsbH1hPVwiZ29vZy5yZXF1aXJlIGNvdWxkIG5vdCBmaW5kOiBcIithO2dvb2cubG9nVG9Db25zb2xlXyhhKTt0aHJvdyBFcnJvcihhKTt9fTtcbmdvb2cuYmFzZVBhdGg9XCJcIjtnb29nLm51bGxGdW5jdGlvbj1mdW5jdGlvbigpe307Z29vZy5hYnN0cmFjdE1ldGhvZD1mdW5jdGlvbigpe3Rocm93IEVycm9yKFwidW5pbXBsZW1lbnRlZCBhYnN0cmFjdCBtZXRob2RcIik7fTtnb29nLmFkZFNpbmdsZXRvbkdldHRlcj1mdW5jdGlvbihhKXthLmdldEluc3RhbmNlPWZ1bmN0aW9uKCl7aWYoYS5pbnN0YW5jZV8pcmV0dXJuIGEuaW5zdGFuY2VfO2dvb2cuREVCVUcmJihnb29nLmluc3RhbnRpYXRlZFNpbmdsZXRvbnNfW2dvb2cuaW5zdGFudGlhdGVkU2luZ2xldG9uc18ubGVuZ3RoXT1hKTtyZXR1cm4gYS5pbnN0YW5jZV89bmV3IGF9fTtnb29nLmluc3RhbnRpYXRlZFNpbmdsZXRvbnNfPVtdO2dvb2cuTE9BRF9NT0RVTEVfVVNJTkdfRVZBTD0hMDtnb29nLlNFQUxfTU9EVUxFX0VYUE9SVFM9Z29vZy5ERUJVRztnb29nLmxvYWRlZE1vZHVsZXNfPXt9O2dvb2cuREVQRU5ERU5DSUVTX0VOQUJMRUQ9IUNPTVBJTEVEJiZnb29nLkVOQUJMRV9ERUJVR19MT0FERVI7XG5nb29nLkRFUEVOREVOQ0lFU19FTkFCTEVEJiYoZ29vZy5kZXBlbmRlbmNpZXNfPXtwYXRoSXNNb2R1bGU6e30sbmFtZVRvUGF0aDp7fSxyZXF1aXJlczp7fSx2aXNpdGVkOnt9LHdyaXR0ZW46e30sZGVmZXJyZWQ6e319LGdvb2cuaW5IdG1sRG9jdW1lbnRfPWZ1bmN0aW9uKCl7dmFyIGE9Z29vZy5nbG9iYWwuZG9jdW1lbnQ7cmV0dXJuIG51bGwhPWEmJlwid3JpdGVcImluIGF9LGdvb2cuZmluZEJhc2VQYXRoXz1mdW5jdGlvbigpe2lmKGdvb2cuaXNEZWYoZ29vZy5nbG9iYWwuQ0xPU1VSRV9CQVNFX1BBVEgpKWdvb2cuYmFzZVBhdGg9Z29vZy5nbG9iYWwuQ0xPU1VSRV9CQVNFX1BBVEg7ZWxzZSBpZihnb29nLmluSHRtbERvY3VtZW50XygpKWZvcih2YXIgYT1nb29nLmdsb2JhbC5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlNDUklQVFwiKSxiPWEubGVuZ3RoLTE7MDw9YjstLWIpe3ZhciBjPWFbYl0uc3JjLGQ9Yy5sYXN0SW5kZXhPZihcIj9cIiksZD0tMT09ZD9jLmxlbmd0aDpcbmQ7aWYoXCJiYXNlLmpzXCI9PWMuc3Vic3RyKGQtNyw3KSl7Z29vZy5iYXNlUGF0aD1jLnN1YnN0cigwLGQtNyk7YnJlYWt9fX0sZ29vZy5pbXBvcnRTY3JpcHRfPWZ1bmN0aW9uKGEsYil7KGdvb2cuZ2xvYmFsLkNMT1NVUkVfSU1QT1JUX1NDUklQVHx8Z29vZy53cml0ZVNjcmlwdFRhZ18pKGEsYikmJihnb29nLmRlcGVuZGVuY2llc18ud3JpdHRlblthXT0hMCl9LGdvb2cuSVNfT0xEX0lFXz0hKGdvb2cuZ2xvYmFsLmF0b2J8fCFnb29nLmdsb2JhbC5kb2N1bWVudHx8IWdvb2cuZ2xvYmFsLmRvY3VtZW50LmFsbCksZ29vZy5pbXBvcnRNb2R1bGVfPWZ1bmN0aW9uKGEpe2dvb2cuaW1wb3J0U2NyaXB0XyhcIlwiLCdnb29nLnJldHJpZXZlQW5kRXhlY01vZHVsZV8oXCInK2ErJ1wiKTsnKSYmKGdvb2cuZGVwZW5kZW5jaWVzXy53cml0dGVuW2FdPSEwKX0sZ29vZy5xdWV1ZWRNb2R1bGVzXz1bXSxnb29nLndyYXBNb2R1bGVfPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGdvb2cuTE9BRF9NT0RVTEVfVVNJTkdfRVZBTCYmXG5nb29nLmlzRGVmKGdvb2cuZ2xvYmFsLkpTT04pP1wiZ29vZy5sb2FkTW9kdWxlKFwiK2dvb2cuZ2xvYmFsLkpTT04uc3RyaW5naWZ5KGIrXCJcXG4vLyMgc291cmNlVVJMPVwiK2ErXCJcXG5cIikrXCIpO1wiOidnb29nLmxvYWRNb2R1bGUoZnVuY3Rpb24oZXhwb3J0cykge1widXNlIHN0cmljdFwiOycrYitcIlxcbjtyZXR1cm4gZXhwb3J0c30pO1xcbi8vIyBzb3VyY2VVUkw9XCIrYStcIlxcblwifSxnb29nLmxvYWRRdWV1ZWRNb2R1bGVzXz1mdW5jdGlvbigpe3ZhciBhPWdvb2cucXVldWVkTW9kdWxlc18ubGVuZ3RoO2lmKDA8YSl7dmFyIGI9Z29vZy5xdWV1ZWRNb2R1bGVzXztnb29nLnF1ZXVlZE1vZHVsZXNfPVtdO2Zvcih2YXIgYz0wO2M8YTtjKyspZ29vZy5tYXliZVByb2Nlc3NEZWZlcnJlZFBhdGhfKGJbY10pfX0sZ29vZy5tYXliZVByb2Nlc3NEZWZlcnJlZERlcF89ZnVuY3Rpb24oYSl7Z29vZy5pc0RlZmVycmVkTW9kdWxlXyhhKSYmZ29vZy5hbGxEZXBzQXJlQXZhaWxhYmxlXyhhKSYmKGE9Z29vZy5nZXRQYXRoRnJvbURlcHNfKGEpLFxuZ29vZy5tYXliZVByb2Nlc3NEZWZlcnJlZFBhdGhfKGdvb2cuYmFzZVBhdGgrYSkpfSxnb29nLmlzRGVmZXJyZWRNb2R1bGVfPWZ1bmN0aW9uKGEpe3JldHVybihhPWdvb2cuZ2V0UGF0aEZyb21EZXBzXyhhKSkmJmdvb2cuZGVwZW5kZW5jaWVzXy5wYXRoSXNNb2R1bGVbYV0/Z29vZy5iYXNlUGF0aCthIGluIGdvb2cuZGVwZW5kZW5jaWVzXy5kZWZlcnJlZDohMX0sZ29vZy5hbGxEZXBzQXJlQXZhaWxhYmxlXz1mdW5jdGlvbihhKXtpZigoYT1nb29nLmdldFBhdGhGcm9tRGVwc18oYSkpJiZhIGluIGdvb2cuZGVwZW5kZW5jaWVzXy5yZXF1aXJlcylmb3IodmFyIGIgaW4gZ29vZy5kZXBlbmRlbmNpZXNfLnJlcXVpcmVzW2FdKWlmKCFnb29nLmlzUHJvdmlkZWRfKGIpJiYhZ29vZy5pc0RlZmVycmVkTW9kdWxlXyhiKSlyZXR1cm4hMTtyZXR1cm4hMH0sZ29vZy5tYXliZVByb2Nlc3NEZWZlcnJlZFBhdGhfPWZ1bmN0aW9uKGEpe2lmKGEgaW4gZ29vZy5kZXBlbmRlbmNpZXNfLmRlZmVycmVkKXt2YXIgYj1cbmdvb2cuZGVwZW5kZW5jaWVzXy5kZWZlcnJlZFthXTtkZWxldGUgZ29vZy5kZXBlbmRlbmNpZXNfLmRlZmVycmVkW2FdO2dvb2cuZ2xvYmFsRXZhbChiKX19LGdvb2cubG9hZE1vZHVsZUZyb21Vcmw9ZnVuY3Rpb24oYSl7Z29vZy5yZXRyaWV2ZUFuZEV4ZWNNb2R1bGVfKGEpfSxnb29nLmxvYWRNb2R1bGU9ZnVuY3Rpb24oYSl7dmFyIGI9Z29vZy5tb2R1bGVMb2FkZXJTdGF0ZV87dHJ5e2dvb2cubW9kdWxlTG9hZGVyU3RhdGVfPXttb2R1bGVOYW1lOnZvaWQgMCxkZWNsYXJlTGVnYWN5TmFtZXNwYWNlOiExfTt2YXIgYztpZihnb29nLmlzRnVuY3Rpb24oYSkpYz1hLmNhbGwoZ29vZy5nbG9iYWwse30pO2Vsc2UgaWYoZ29vZy5pc1N0cmluZyhhKSljPWdvb2cubG9hZE1vZHVsZUZyb21Tb3VyY2VfLmNhbGwoZ29vZy5nbG9iYWwsYSk7ZWxzZSB0aHJvdyBFcnJvcihcIkludmFsaWQgbW9kdWxlIGRlZmluaXRpb25cIik7dmFyIGQ9Z29vZy5tb2R1bGVMb2FkZXJTdGF0ZV8ubW9kdWxlTmFtZTtcbmlmKCFnb29nLmlzU3RyaW5nKGQpfHwhZCl0aHJvdyBFcnJvcignSW52YWxpZCBtb2R1bGUgbmFtZSBcIicrZCsnXCInKTtnb29nLm1vZHVsZUxvYWRlclN0YXRlXy5kZWNsYXJlTGVnYWN5TmFtZXNwYWNlP2dvb2cuY29uc3RydWN0TmFtZXNwYWNlXyhkLGMpOmdvb2cuU0VBTF9NT0RVTEVfRVhQT1JUUyYmT2JqZWN0LnNlYWwmJk9iamVjdC5zZWFsKGMpO2dvb2cubG9hZGVkTW9kdWxlc19bZF09Y31maW5hbGx5e2dvb2cubW9kdWxlTG9hZGVyU3RhdGVfPWJ9fSxnb29nLmxvYWRNb2R1bGVGcm9tU291cmNlXz1mdW5jdGlvbihhKXtldmFsKGEpO3JldHVybnt9fSxnb29nLndyaXRlU2NyaXB0U3JjTm9kZV89ZnVuY3Rpb24oYSl7Z29vZy5nbG9iYWwuZG9jdW1lbnQud3JpdGUoJzxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIHNyYz1cIicrYSsnXCI+XFx4M2Mvc2NyaXB0PicpfSxnb29nLmFwcGVuZFNjcmlwdFNyY05vZGVfPWZ1bmN0aW9uKGEpe3ZhciBiPWdvb2cuZ2xvYmFsLmRvY3VtZW50LFxuYz1iLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7Yy50eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI7Yy5zcmM9YTtjLmRlZmVyPSExO2MuYXN5bmM9ITE7Yi5oZWFkLmFwcGVuZENoaWxkKGMpfSxnb29nLndyaXRlU2NyaXB0VGFnXz1mdW5jdGlvbihhLGIpe2lmKGdvb2cuaW5IdG1sRG9jdW1lbnRfKCkpe3ZhciBjPWdvb2cuZ2xvYmFsLmRvY3VtZW50O2lmKCFnb29nLkVOQUJMRV9DSFJPTUVfQVBQX1NBRkVfU0NSSVBUX0xPQURJTkcmJlwiY29tcGxldGVcIj09Yy5yZWFkeVN0YXRlKXtpZigvXFxiZGVwcy5qcyQvLnRlc3QoYSkpcmV0dXJuITE7dGhyb3cgRXJyb3IoJ0Nhbm5vdCB3cml0ZSBcIicrYSsnXCIgYWZ0ZXIgZG9jdW1lbnQgbG9hZCcpO312YXIgZD1nb29nLklTX09MRF9JRV87dm9pZCAwPT09Yj9kPyhkPVwiIG9ucmVhZHlzdGF0ZWNoYW5nZT0nZ29vZy5vblNjcmlwdExvYWRfKHRoaXMsIFwiKyArK2dvb2cubGFzdE5vbk1vZHVsZVNjcmlwdEluZGV4XytcIiknIFwiLGMud3JpdGUoJzxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIHNyYz1cIicrXG5hKydcIicrZCtcIj5cXHgzYy9zY3JpcHQ+XCIpKTpnb29nLkVOQUJMRV9DSFJPTUVfQVBQX1NBRkVfU0NSSVBUX0xPQURJTkc/Z29vZy5hcHBlbmRTY3JpcHRTcmNOb2RlXyhhKTpnb29nLndyaXRlU2NyaXB0U3JjTm9kZV8oYSk6Yy53cml0ZSgnPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+JytiK1wiXFx4M2Mvc2NyaXB0PlwiKTtyZXR1cm4hMH1yZXR1cm4hMX0sZ29vZy5sYXN0Tm9uTW9kdWxlU2NyaXB0SW5kZXhfPTAsZ29vZy5vblNjcmlwdExvYWRfPWZ1bmN0aW9uKGEsYil7XCJjb21wbGV0ZVwiPT1hLnJlYWR5U3RhdGUmJmdvb2cubGFzdE5vbk1vZHVsZVNjcmlwdEluZGV4Xz09YiYmZ29vZy5sb2FkUXVldWVkTW9kdWxlc18oKTtyZXR1cm4hMH0sZ29vZy53cml0ZVNjcmlwdHNfPWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSl7aWYoIShhIGluIGUud3JpdHRlbnx8YSBpbiBlLnZpc2l0ZWQpKXtlLnZpc2l0ZWRbYV09ITA7aWYoYSBpbiBlLnJlcXVpcmVzKWZvcih2YXIgZiBpbiBlLnJlcXVpcmVzW2FdKWlmKCFnb29nLmlzUHJvdmlkZWRfKGYpKWlmKGYgaW5cbmUubmFtZVRvUGF0aCliKGUubmFtZVRvUGF0aFtmXSk7ZWxzZSB0aHJvdyBFcnJvcihcIlVuZGVmaW5lZCBuYW1lVG9QYXRoIGZvciBcIitmKTthIGluIGR8fChkW2FdPSEwLGMucHVzaChhKSl9fXZhciBjPVtdLGQ9e30sZT1nb29nLmRlcGVuZGVuY2llc187YihhKTtmb3IoYT0wO2E8Yy5sZW5ndGg7YSsrKXt2YXIgZj1jW2FdO2dvb2cuZGVwZW5kZW5jaWVzXy53cml0dGVuW2ZdPSEwfXZhciBnPWdvb2cubW9kdWxlTG9hZGVyU3RhdGVfO2dvb2cubW9kdWxlTG9hZGVyU3RhdGVfPW51bGw7Zm9yKGE9MDthPGMubGVuZ3RoO2ErKylpZihmPWNbYV0pZS5wYXRoSXNNb2R1bGVbZl0/Z29vZy5pbXBvcnRNb2R1bGVfKGdvb2cuYmFzZVBhdGgrZik6Z29vZy5pbXBvcnRTY3JpcHRfKGdvb2cuYmFzZVBhdGgrZik7ZWxzZSB0aHJvdyBnb29nLm1vZHVsZUxvYWRlclN0YXRlXz1nLEVycm9yKFwiVW5kZWZpbmVkIHNjcmlwdCBpbnB1dFwiKTtnb29nLm1vZHVsZUxvYWRlclN0YXRlXz1nfSxnb29nLmdldFBhdGhGcm9tRGVwc189XG5mdW5jdGlvbihhKXtyZXR1cm4gYSBpbiBnb29nLmRlcGVuZGVuY2llc18ubmFtZVRvUGF0aD9nb29nLmRlcGVuZGVuY2llc18ubmFtZVRvUGF0aFthXTpudWxsfSxnb29nLmZpbmRCYXNlUGF0aF8oKSxnb29nLmdsb2JhbC5DTE9TVVJFX05PX0RFUFN8fGdvb2cuaW1wb3J0U2NyaXB0Xyhnb29nLmJhc2VQYXRoK1wiZGVwcy5qc1wiKSk7Z29vZy5ub3JtYWxpemVQYXRoXz1mdW5jdGlvbihhKXthPWEuc3BsaXQoXCIvXCIpO2Zvcih2YXIgYj0wO2I8YS5sZW5ndGg7KVwiLlwiPT1hW2JdP2Euc3BsaWNlKGIsMSk6YiYmXCIuLlwiPT1hW2JdJiZhW2ItMV0mJlwiLi5cIiE9YVtiLTFdP2Euc3BsaWNlKC0tYiwyKTpiKys7cmV0dXJuIGEuam9pbihcIi9cIil9O1xuZ29vZy5sb2FkRmlsZVN5bmNfPWZ1bmN0aW9uKGEpe2lmKGdvb2cuZ2xvYmFsLkNMT1NVUkVfTE9BRF9GSUxFX1NZTkMpcmV0dXJuIGdvb2cuZ2xvYmFsLkNMT1NVUkVfTE9BRF9GSUxFX1NZTkMoYSk7dmFyIGI9bmV3IGdvb2cuZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0O2Iub3BlbihcImdldFwiLGEsITEpO2Iuc2VuZCgpO3JldHVybiBiLnJlc3BvbnNlVGV4dH07XG5nb29nLnJldHJpZXZlQW5kRXhlY01vZHVsZV89ZnVuY3Rpb24oYSl7aWYoIUNPTVBJTEVEKXt2YXIgYj1hO2E9Z29vZy5ub3JtYWxpemVQYXRoXyhhKTt2YXIgYz1nb29nLmdsb2JhbC5DTE9TVVJFX0lNUE9SVF9TQ1JJUFR8fGdvb2cud3JpdGVTY3JpcHRUYWdfLGQ9Z29vZy5sb2FkRmlsZVN5bmNfKGEpO2lmKG51bGwhPWQpZD1nb29nLndyYXBNb2R1bGVfKGEsZCksZ29vZy5JU19PTERfSUVfPyhnb29nLmRlcGVuZGVuY2llc18uZGVmZXJyZWRbYl09ZCxnb29nLnF1ZXVlZE1vZHVsZXNfLnB1c2goYikpOmMoYSxkKTtlbHNlIHRocm93IEVycm9yKFwibG9hZCBvZiBcIithK1wiZmFpbGVkXCIpO319O1xuZ29vZy50eXBlT2Y9ZnVuY3Rpb24oYSl7dmFyIGI9dHlwZW9mIGE7aWYoXCJvYmplY3RcIj09YilpZihhKXtpZihhIGluc3RhbmNlb2YgQXJyYXkpcmV0dXJuXCJhcnJheVwiO2lmKGEgaW5zdGFuY2VvZiBPYmplY3QpcmV0dXJuIGI7dmFyIGM9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpO2lmKFwiW29iamVjdCBXaW5kb3ddXCI9PWMpcmV0dXJuXCJvYmplY3RcIjtpZihcIltvYmplY3QgQXJyYXldXCI9PWN8fFwibnVtYmVyXCI9PXR5cGVvZiBhLmxlbmd0aCYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGEuc3BsaWNlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgYS5wcm9wZXJ0eUlzRW51bWVyYWJsZSYmIWEucHJvcGVydHlJc0VudW1lcmFibGUoXCJzcGxpY2VcIikpcmV0dXJuXCJhcnJheVwiO2lmKFwiW29iamVjdCBGdW5jdGlvbl1cIj09Y3x8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGEuY2FsbCYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGEucHJvcGVydHlJc0VudW1lcmFibGUmJiFhLnByb3BlcnR5SXNFbnVtZXJhYmxlKFwiY2FsbFwiKSlyZXR1cm5cImZ1bmN0aW9uXCJ9ZWxzZSByZXR1cm5cIm51bGxcIjtcbmVsc2UgaWYoXCJmdW5jdGlvblwiPT1iJiZcInVuZGVmaW5lZFwiPT10eXBlb2YgYS5jYWxsKXJldHVyblwib2JqZWN0XCI7cmV0dXJuIGJ9O2dvb2cuaXNOdWxsPWZ1bmN0aW9uKGEpe3JldHVybiBudWxsPT09YX07Z29vZy5pc0RlZkFuZE5vdE51bGw9ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGwhPWF9O2dvb2cuaXNBcnJheT1mdW5jdGlvbihhKXtyZXR1cm5cImFycmF5XCI9PWdvb2cudHlwZU9mKGEpfTtnb29nLmlzQXJyYXlMaWtlPWZ1bmN0aW9uKGEpe3ZhciBiPWdvb2cudHlwZU9mKGEpO3JldHVyblwiYXJyYXlcIj09Ynx8XCJvYmplY3RcIj09YiYmXCJudW1iZXJcIj09dHlwZW9mIGEubGVuZ3RofTtnb29nLmlzRGF0ZUxpa2U9ZnVuY3Rpb24oYSl7cmV0dXJuIGdvb2cuaXNPYmplY3QoYSkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGEuZ2V0RnVsbFllYXJ9O2dvb2cuaXNTdHJpbmc9ZnVuY3Rpb24oYSl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGF9O1xuZ29vZy5pc0Jvb2xlYW49ZnVuY3Rpb24oYSl7cmV0dXJuXCJib29sZWFuXCI9PXR5cGVvZiBhfTtnb29nLmlzTnVtYmVyPWZ1bmN0aW9uKGEpe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiBhfTtnb29nLmlzRnVuY3Rpb249ZnVuY3Rpb24oYSl7cmV0dXJuXCJmdW5jdGlvblwiPT1nb29nLnR5cGVPZihhKX07Z29vZy5pc09iamVjdD1mdW5jdGlvbihhKXt2YXIgYj10eXBlb2YgYTtyZXR1cm5cIm9iamVjdFwiPT1iJiZudWxsIT1hfHxcImZ1bmN0aW9uXCI9PWJ9O2dvb2cuZ2V0VWlkPWZ1bmN0aW9uKGEpe3JldHVybiBhW2dvb2cuVUlEX1BST1BFUlRZX118fChhW2dvb2cuVUlEX1BST1BFUlRZX109Kytnb29nLnVpZENvdW50ZXJfKX07Z29vZy5oYXNVaWQ9ZnVuY3Rpb24oYSl7cmV0dXJuISFhW2dvb2cuVUlEX1BST1BFUlRZX119O1xuZ29vZy5yZW1vdmVVaWQ9ZnVuY3Rpb24oYSl7bnVsbCE9PWEmJlwicmVtb3ZlQXR0cmlidXRlXCJpbiBhJiZhLnJlbW92ZUF0dHJpYnV0ZShnb29nLlVJRF9QUk9QRVJUWV8pO3RyeXtkZWxldGUgYVtnb29nLlVJRF9QUk9QRVJUWV9dfWNhdGNoKGIpe319O2dvb2cuVUlEX1BST1BFUlRZXz1cImNsb3N1cmVfdWlkX1wiKygxRTkqTWF0aC5yYW5kb20oKT4+PjApO2dvb2cudWlkQ291bnRlcl89MDtnb29nLmdldEhhc2hDb2RlPWdvb2cuZ2V0VWlkO2dvb2cucmVtb3ZlSGFzaENvZGU9Z29vZy5yZW1vdmVVaWQ7Z29vZy5jbG9uZU9iamVjdD1mdW5jdGlvbihhKXt2YXIgYj1nb29nLnR5cGVPZihhKTtpZihcIm9iamVjdFwiPT1ifHxcImFycmF5XCI9PWIpe2lmKGEuY2xvbmUpcmV0dXJuIGEuY2xvbmUoKTt2YXIgYj1cImFycmF5XCI9PWI/W106e30sYztmb3IoYyBpbiBhKWJbY109Z29vZy5jbG9uZU9iamVjdChhW2NdKTtyZXR1cm4gYn1yZXR1cm4gYX07XG5nb29nLmJpbmROYXRpdmVfPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gYS5jYWxsLmFwcGx5KGEuYmluZCxhcmd1bWVudHMpfTtnb29nLmJpbmRKc189ZnVuY3Rpb24oYSxiLGMpe2lmKCFhKXRocm93IEVycm9yKCk7aWYoMjxhcmd1bWVudHMubGVuZ3RoKXt2YXIgZD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMik7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtBcnJheS5wcm90b3R5cGUudW5zaGlmdC5hcHBseShjLGQpO3JldHVybiBhLmFwcGx5KGIsYyl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiBhLmFwcGx5KGIsYXJndW1lbnRzKX19O1xuZ29vZy5iaW5kPWZ1bmN0aW9uKGEsYixjKXtGdW5jdGlvbi5wcm90b3R5cGUuYmluZCYmLTEhPUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLnRvU3RyaW5nKCkuaW5kZXhPZihcIm5hdGl2ZSBjb2RlXCIpP2dvb2cuYmluZD1nb29nLmJpbmROYXRpdmVfOmdvb2cuYmluZD1nb29nLmJpbmRKc187cmV0dXJuIGdvb2cuYmluZC5hcHBseShudWxsLGFyZ3VtZW50cyl9O2dvb2cucGFydGlhbD1mdW5jdGlvbihhLGIpe3ZhciBjPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgYj1jLnNsaWNlKCk7Yi5wdXNoLmFwcGx5KGIsYXJndW1lbnRzKTtyZXR1cm4gYS5hcHBseSh0aGlzLGIpfX07Z29vZy5taXhpbj1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYyBpbiBiKWFbY109YltjXX07Z29vZy5ub3c9Z29vZy5UUlVTVEVEX1NJVEUmJkRhdGUubm93fHxmdW5jdGlvbigpe3JldHVybituZXcgRGF0ZX07XG5nb29nLmdsb2JhbEV2YWw9ZnVuY3Rpb24oYSl7aWYoZ29vZy5nbG9iYWwuZXhlY1NjcmlwdClnb29nLmdsb2JhbC5leGVjU2NyaXB0KGEsXCJKYXZhU2NyaXB0XCIpO2Vsc2UgaWYoZ29vZy5nbG9iYWwuZXZhbCl7aWYobnVsbD09Z29vZy5ldmFsV29ya3NGb3JHbG9iYWxzXylpZihnb29nLmdsb2JhbC5ldmFsKFwidmFyIF9ldmFsVGVzdF8gPSAxO1wiKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgZ29vZy5nbG9iYWwuX2V2YWxUZXN0Xyl7dHJ5e2RlbGV0ZSBnb29nLmdsb2JhbC5fZXZhbFRlc3RffWNhdGNoKGQpe31nb29nLmV2YWxXb3Jrc0Zvckdsb2JhbHNfPSEwfWVsc2UgZ29vZy5ldmFsV29ya3NGb3JHbG9iYWxzXz0hMTtpZihnb29nLmV2YWxXb3Jrc0Zvckdsb2JhbHNfKWdvb2cuZ2xvYmFsLmV2YWwoYSk7ZWxzZXt2YXIgYj1nb29nLmdsb2JhbC5kb2N1bWVudCxjPWIuY3JlYXRlRWxlbWVudChcIlNDUklQVFwiKTtjLnR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIjtjLmRlZmVyPSExO2MuYXBwZW5kQ2hpbGQoYi5jcmVhdGVUZXh0Tm9kZShhKSk7XG5iLmJvZHkuYXBwZW5kQ2hpbGQoYyk7Yi5ib2R5LnJlbW92ZUNoaWxkKGMpfX1lbHNlIHRocm93IEVycm9yKFwiZ29vZy5nbG9iYWxFdmFsIG5vdCBhdmFpbGFibGVcIik7fTtnb29nLmV2YWxXb3Jrc0Zvckdsb2JhbHNfPW51bGw7Z29vZy5nZXRDc3NOYW1lPWZ1bmN0aW9uKGEsYil7dmFyIGM9ZnVuY3Rpb24oYSl7cmV0dXJuIGdvb2cuY3NzTmFtZU1hcHBpbmdfW2FdfHxhfSxkPWZ1bmN0aW9uKGEpe2E9YS5zcGxpdChcIi1cIik7Zm9yKHZhciBiPVtdLGQ9MDtkPGEubGVuZ3RoO2QrKyliLnB1c2goYyhhW2RdKSk7cmV0dXJuIGIuam9pbihcIi1cIil9LGQ9Z29vZy5jc3NOYW1lTWFwcGluZ18/XCJCWV9XSE9MRVwiPT1nb29nLmNzc05hbWVNYXBwaW5nU3R5bGVfP2M6ZDpmdW5jdGlvbihhKXtyZXR1cm4gYX07cmV0dXJuIGI/YStcIi1cIitkKGIpOmQoYSl9O1xuZ29vZy5zZXRDc3NOYW1lTWFwcGluZz1mdW5jdGlvbihhLGIpe2dvb2cuY3NzTmFtZU1hcHBpbmdfPWE7Z29vZy5jc3NOYW1lTWFwcGluZ1N0eWxlXz1ifTshQ09NUElMRUQmJmdvb2cuZ2xvYmFsLkNMT1NVUkVfQ1NTX05BTUVfTUFQUElORyYmKGdvb2cuY3NzTmFtZU1hcHBpbmdfPWdvb2cuZ2xvYmFsLkNMT1NVUkVfQ1NTX05BTUVfTUFQUElORyk7Z29vZy5nZXRNc2c9ZnVuY3Rpb24oYSxiKXtiJiYoYT1hLnJlcGxhY2UoL1xce1xcJChbXn1dKyl9L2csZnVuY3Rpb24oYSxkKXtyZXR1cm4gbnVsbCE9YiYmZCBpbiBiP2JbZF06YX0pKTtyZXR1cm4gYX07Z29vZy5nZXRNc2dXaXRoRmFsbGJhY2s9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYX07Z29vZy5leHBvcnRTeW1ib2w9ZnVuY3Rpb24oYSxiLGMpe2dvb2cuZXhwb3J0UGF0aF8oYSxiLGMpfTtnb29nLmV4cG9ydFByb3BlcnR5PWZ1bmN0aW9uKGEsYixjKXthW2JdPWN9O1xuZ29vZy5pbmhlcml0cz1mdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGMoKXt9Yy5wcm90b3R5cGU9Yi5wcm90b3R5cGU7YS5zdXBlckNsYXNzXz1iLnByb3RvdHlwZTthLnByb3RvdHlwZT1uZXcgYzthLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1hO2EuYmFzZT1mdW5jdGlvbihhLGMsZil7Zm9yKHZhciBnPUFycmF5KGFyZ3VtZW50cy5sZW5ndGgtMiksaD0yO2g8YXJndW1lbnRzLmxlbmd0aDtoKyspZ1toLTJdPWFyZ3VtZW50c1toXTtyZXR1cm4gYi5wcm90b3R5cGVbY10uYXBwbHkoYSxnKX19O1xuZ29vZy5iYXNlPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1hcmd1bWVudHMuY2FsbGVlLmNhbGxlcjtpZihnb29nLlNUUklDVF9NT0RFX0NPTVBBVElCTEV8fGdvb2cuREVCVUcmJiFkKXRocm93IEVycm9yKFwiYXJndW1lbnRzLmNhbGxlciBub3QgZGVmaW5lZC4gIGdvb2cuYmFzZSgpIGNhbm5vdCBiZSB1c2VkIHdpdGggc3RyaWN0IG1vZGUgY29kZS4gU2VlIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy1DXCIpO2lmKGQuc3VwZXJDbGFzc18pe2Zvcih2YXIgZT1BcnJheShhcmd1bWVudHMubGVuZ3RoLTEpLGY9MTtmPGFyZ3VtZW50cy5sZW5ndGg7ZisrKWVbZi0xXT1hcmd1bWVudHNbZl07cmV0dXJuIGQuc3VwZXJDbGFzc18uY29uc3RydWN0b3IuYXBwbHkoYSxlKX1lPUFycmF5KGFyZ3VtZW50cy5sZW5ndGgtMik7Zm9yKGY9MjtmPGFyZ3VtZW50cy5sZW5ndGg7ZisrKWVbZi0yXT1hcmd1bWVudHNbZl07Zm9yKHZhciBmPSExLGc9YS5jb25zdHJ1Y3RvcjtnO2c9XG5nLnN1cGVyQ2xhc3NfJiZnLnN1cGVyQ2xhc3NfLmNvbnN0cnVjdG9yKWlmKGcucHJvdG90eXBlW2JdPT09ZClmPSEwO2Vsc2UgaWYoZilyZXR1cm4gZy5wcm90b3R5cGVbYl0uYXBwbHkoYSxlKTtpZihhW2JdPT09ZClyZXR1cm4gYS5jb25zdHJ1Y3Rvci5wcm90b3R5cGVbYl0uYXBwbHkoYSxlKTt0aHJvdyBFcnJvcihcImdvb2cuYmFzZSBjYWxsZWQgZnJvbSBhIG1ldGhvZCBvZiBvbmUgbmFtZSB0byBhIG1ldGhvZCBvZiBhIGRpZmZlcmVudCBuYW1lXCIpO307Z29vZy5zY29wZT1mdW5jdGlvbihhKXthLmNhbGwoZ29vZy5nbG9iYWwpfTtDT01QSUxFRHx8KGdvb2cuZ2xvYmFsLkNPTVBJTEVEPUNPTVBJTEVEKTtcbmdvb2cuZGVmaW5lQ2xhc3M9ZnVuY3Rpb24oYSxiKXt2YXIgYz1iLmNvbnN0cnVjdG9yLGQ9Yi5zdGF0aWNzO2MmJmMhPU9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3J8fChjPWZ1bmN0aW9uKCl7dGhyb3cgRXJyb3IoXCJjYW5ub3QgaW5zdGFudGlhdGUgYW4gaW50ZXJmYWNlIChubyBjb25zdHJ1Y3RvciBkZWZpbmVkKS5cIik7fSk7Yz1nb29nLmRlZmluZUNsYXNzLmNyZWF0ZVNlYWxpbmdDb25zdHJ1Y3Rvcl8oYyxhKTthJiZnb29nLmluaGVyaXRzKGMsYSk7ZGVsZXRlIGIuY29uc3RydWN0b3I7ZGVsZXRlIGIuc3RhdGljcztnb29nLmRlZmluZUNsYXNzLmFwcGx5UHJvcGVydGllc18oYy5wcm90b3R5cGUsYik7bnVsbCE9ZCYmKGQgaW5zdGFuY2VvZiBGdW5jdGlvbj9kKGMpOmdvb2cuZGVmaW5lQ2xhc3MuYXBwbHlQcm9wZXJ0aWVzXyhjLGQpKTtyZXR1cm4gY307Z29vZy5kZWZpbmVDbGFzcy5TRUFMX0NMQVNTX0lOU1RBTkNFUz1nb29nLkRFQlVHO1xuZ29vZy5kZWZpbmVDbGFzcy5jcmVhdGVTZWFsaW5nQ29uc3RydWN0b3JfPWZ1bmN0aW9uKGEsYil7aWYoZ29vZy5kZWZpbmVDbGFzcy5TRUFMX0NMQVNTX0lOU1RBTkNFUyYmT2JqZWN0LnNlYWwgaW5zdGFuY2VvZiBGdW5jdGlvbil7aWYoYiYmYi5wcm90b3R5cGUmJmIucHJvdG90eXBlW2dvb2cuVU5TRUFMQUJMRV9DT05TVFJVQ1RPUl9QUk9QRVJUWV9dKXJldHVybiBhO3ZhciBjPWZ1bmN0aW9uKCl7dmFyIGI9YS5hcHBseSh0aGlzLGFyZ3VtZW50cyl8fHRoaXM7Yltnb29nLlVJRF9QUk9QRVJUWV9dPWJbZ29vZy5VSURfUFJPUEVSVFlfXTt0aGlzLmNvbnN0cnVjdG9yPT09YyYmT2JqZWN0LnNlYWwoYik7cmV0dXJuIGJ9O3JldHVybiBjfXJldHVybiBhfTtnb29nLmRlZmluZUNsYXNzLk9CSkVDVF9QUk9UT1RZUEVfRklFTERTXz1cImNvbnN0cnVjdG9yIGhhc093blByb3BlcnR5IGlzUHJvdG90eXBlT2YgcHJvcGVydHlJc0VudW1lcmFibGUgdG9Mb2NhbGVTdHJpbmcgdG9TdHJpbmcgdmFsdWVPZlwiLnNwbGl0KFwiIFwiKTtcbmdvb2cuZGVmaW5lQ2xhc3MuYXBwbHlQcm9wZXJ0aWVzXz1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYyBpbiBiKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLGMpJiYoYVtjXT1iW2NdKTtmb3IodmFyIGQ9MDtkPGdvb2cuZGVmaW5lQ2xhc3MuT0JKRUNUX1BST1RPVFlQRV9GSUVMRFNfLmxlbmd0aDtkKyspYz1nb29nLmRlZmluZUNsYXNzLk9CSkVDVF9QUk9UT1RZUEVfRklFTERTX1tkXSxPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYixjKSYmKGFbY109YltjXSl9O2dvb2cudGFnVW5zZWFsYWJsZUNsYXNzPWZ1bmN0aW9uKGEpeyFDT01QSUxFRCYmZ29vZy5kZWZpbmVDbGFzcy5TRUFMX0NMQVNTX0lOU1RBTkNFUyYmKGEucHJvdG90eXBlW2dvb2cuVU5TRUFMQUJMRV9DT05TVFJVQ1RPUl9QUk9QRVJUWV9dPSEwKX07Z29vZy5VTlNFQUxBQkxFX0NPTlNUUlVDVE9SX1BST1BFUlRZXz1cImdvb2dfZGVmaW5lQ2xhc3NfbGVnYWN5X3Vuc2VhbGFibGVcIjtnb29nLmRvbT17fTtnb29nLmRvbS5Ob2RlVHlwZT17RUxFTUVOVDoxLEFUVFJJQlVURToyLFRFWFQ6MyxDREFUQV9TRUNUSU9OOjQsRU5USVRZX1JFRkVSRU5DRTo1LEVOVElUWTo2LFBST0NFU1NJTkdfSU5TVFJVQ1RJT046NyxDT01NRU5UOjgsRE9DVU1FTlQ6OSxET0NVTUVOVF9UWVBFOjEwLERPQ1VNRU5UX0ZSQUdNRU5UOjExLE5PVEFUSU9OOjEyfTtnb29nLmRlYnVnPXt9O2dvb2cuZGVidWcuRXJyb3I9ZnVuY3Rpb24oYSl7aWYoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcyxnb29nLmRlYnVnLkVycm9yKTtlbHNle3ZhciBiPUVycm9yKCkuc3RhY2s7YiYmKHRoaXMuc3RhY2s9Yil9YSYmKHRoaXMubWVzc2FnZT1TdHJpbmcoYSkpO3RoaXMucmVwb3J0RXJyb3JUb1NlcnZlcj0hMH07Z29vZy5pbmhlcml0cyhnb29nLmRlYnVnLkVycm9yLEVycm9yKTtnb29nLmRlYnVnLkVycm9yLnByb3RvdHlwZS5uYW1lPVwiQ3VzdG9tRXJyb3JcIjtnb29nLnN0cmluZz17fTtnb29nLnN0cmluZy5ERVRFQ1RfRE9VQkxFX0VTQ0FQSU5HPSExO2dvb2cuc3RyaW5nLkZPUkNFX05PTl9ET01fSFRNTF9VTkVTQ0FQSU5HPSExO2dvb2cuc3RyaW5nLlVuaWNvZGU9e05CU1A6XCJcXHUwMGEwXCJ9O2dvb2cuc3RyaW5nLnN0YXJ0c1dpdGg9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gMD09YS5sYXN0SW5kZXhPZihiLDApfTtnb29nLnN0cmluZy5lbmRzV2l0aD1mdW5jdGlvbihhLGIpe3ZhciBjPWEubGVuZ3RoLWIubGVuZ3RoO3JldHVybiAwPD1jJiZhLmluZGV4T2YoYixjKT09Y307Z29vZy5zdHJpbmcuY2FzZUluc2Vuc2l0aXZlU3RhcnRzV2l0aD1mdW5jdGlvbihhLGIpe3JldHVybiAwPT1nb29nLnN0cmluZy5jYXNlSW5zZW5zaXRpdmVDb21wYXJlKGIsYS5zdWJzdHIoMCxiLmxlbmd0aCkpfTtcbmdvb2cuc3RyaW5nLmNhc2VJbnNlbnNpdGl2ZUVuZHNXaXRoPWZ1bmN0aW9uKGEsYil7cmV0dXJuIDA9PWdvb2cuc3RyaW5nLmNhc2VJbnNlbnNpdGl2ZUNvbXBhcmUoYixhLnN1YnN0cihhLmxlbmd0aC1iLmxlbmd0aCxiLmxlbmd0aCkpfTtnb29nLnN0cmluZy5jYXNlSW5zZW5zaXRpdmVFcXVhbHM9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYS50b0xvd2VyQ2FzZSgpPT1iLnRvTG93ZXJDYXNlKCl9O2dvb2cuc3RyaW5nLnN1YnM9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9YS5zcGxpdChcIiVzXCIpLGQ9XCJcIixlPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtlLmxlbmd0aCYmMTxjLmxlbmd0aDspZCs9Yy5zaGlmdCgpK2Uuc2hpZnQoKTtyZXR1cm4gZCtjLmpvaW4oXCIlc1wiKX07Z29vZy5zdHJpbmcuY29sbGFwc2VXaGl0ZXNwYWNlPWZ1bmN0aW9uKGEpe3JldHVybiBhLnJlcGxhY2UoL1tcXHNcXHhhMF0rL2csXCIgXCIpLnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIil9O1xuZ29vZy5zdHJpbmcuaXNFbXB0eU9yV2hpdGVzcGFjZT1mdW5jdGlvbihhKXtyZXR1cm4vXltcXHNcXHhhMF0qJC8udGVzdChhKX07Z29vZy5zdHJpbmcuaXNFbXB0eVN0cmluZz1mdW5jdGlvbihhKXtyZXR1cm4gMD09YS5sZW5ndGh9O2dvb2cuc3RyaW5nLmlzRW1wdHk9Z29vZy5zdHJpbmcuaXNFbXB0eU9yV2hpdGVzcGFjZTtnb29nLnN0cmluZy5pc0VtcHR5T3JXaGl0ZXNwYWNlU2FmZT1mdW5jdGlvbihhKXtyZXR1cm4gZ29vZy5zdHJpbmcuaXNFbXB0eU9yV2hpdGVzcGFjZShnb29nLnN0cmluZy5tYWtlU2FmZShhKSl9O2dvb2cuc3RyaW5nLmlzRW1wdHlTYWZlPWdvb2cuc3RyaW5nLmlzRW1wdHlPcldoaXRlc3BhY2VTYWZlO2dvb2cuc3RyaW5nLmlzQnJlYWtpbmdXaGl0ZXNwYWNlPWZ1bmN0aW9uKGEpe3JldHVybiEvW15cXHRcXG5cXHIgXS8udGVzdChhKX07Z29vZy5zdHJpbmcuaXNBbHBoYT1mdW5jdGlvbihhKXtyZXR1cm4hL1teYS16QS1aXS8udGVzdChhKX07XG5nb29nLnN0cmluZy5pc051bWVyaWM9ZnVuY3Rpb24oYSl7cmV0dXJuIS9bXjAtOV0vLnRlc3QoYSl9O2dvb2cuc3RyaW5nLmlzQWxwaGFOdW1lcmljPWZ1bmN0aW9uKGEpe3JldHVybiEvW15hLXpBLVowLTldLy50ZXN0KGEpfTtnb29nLnN0cmluZy5pc1NwYWNlPWZ1bmN0aW9uKGEpe3JldHVyblwiIFwiPT1hfTtnb29nLnN0cmluZy5pc1VuaWNvZGVDaGFyPWZ1bmN0aW9uKGEpe3JldHVybiAxPT1hLmxlbmd0aCYmXCIgXCI8PWEmJlwiflwiPj1hfHxcIlxcdTAwODBcIjw9YSYmXCJcXHVmZmZkXCI+PWF9O2dvb2cuc3RyaW5nLnN0cmlwTmV3bGluZXM9ZnVuY3Rpb24oYSl7cmV0dXJuIGEucmVwbGFjZSgvKFxcclxcbnxcXHJ8XFxuKSsvZyxcIiBcIil9O2dvb2cuc3RyaW5nLmNhbm9uaWNhbGl6ZU5ld2xpbmVzPWZ1bmN0aW9uKGEpe3JldHVybiBhLnJlcGxhY2UoLyhcXHJcXG58XFxyfFxcbikvZyxcIlxcblwiKX07XG5nb29nLnN0cmluZy5ub3JtYWxpemVXaGl0ZXNwYWNlPWZ1bmN0aW9uKGEpe3JldHVybiBhLnJlcGxhY2UoL1xceGEwfFxccy9nLFwiIFwiKX07Z29vZy5zdHJpbmcubm9ybWFsaXplU3BhY2VzPWZ1bmN0aW9uKGEpe3JldHVybiBhLnJlcGxhY2UoL1xceGEwfFsgXFx0XSsvZyxcIiBcIil9O2dvb2cuc3RyaW5nLmNvbGxhcHNlQnJlYWtpbmdTcGFjZXM9ZnVuY3Rpb24oYSl7cmV0dXJuIGEucmVwbGFjZSgvW1xcdFxcclxcbiBdKy9nLFwiIFwiKS5yZXBsYWNlKC9eW1xcdFxcclxcbiBdK3xbXFx0XFxyXFxuIF0rJC9nLFwiXCIpfTtnb29nLnN0cmluZy50cmltPWdvb2cuVFJVU1RFRF9TSVRFJiZTdHJpbmcucHJvdG90eXBlLnRyaW0/ZnVuY3Rpb24oYSl7cmV0dXJuIGEudHJpbSgpfTpmdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKC9eW1xcc1xceGEwXSt8W1xcc1xceGEwXSskL2csXCJcIil9O2dvb2cuc3RyaW5nLnRyaW1MZWZ0PWZ1bmN0aW9uKGEpe3JldHVybiBhLnJlcGxhY2UoL15bXFxzXFx4YTBdKy8sXCJcIil9O1xuZ29vZy5zdHJpbmcudHJpbVJpZ2h0PWZ1bmN0aW9uKGEpe3JldHVybiBhLnJlcGxhY2UoL1tcXHNcXHhhMF0rJC8sXCJcIil9O2dvb2cuc3RyaW5nLmNhc2VJbnNlbnNpdGl2ZUNvbXBhcmU9ZnVuY3Rpb24oYSxiKXt2YXIgYz1TdHJpbmcoYSkudG9Mb3dlckNhc2UoKSxkPVN0cmluZyhiKS50b0xvd2VyQ2FzZSgpO3JldHVybiBjPGQ/LTE6Yz09ZD8wOjF9O1xuZ29vZy5zdHJpbmcubnVtYmVyQXdhcmVDb21wYXJlXz1mdW5jdGlvbihhLGIsYyl7aWYoYT09YilyZXR1cm4gMDtpZighYSlyZXR1cm4tMTtpZighYilyZXR1cm4gMTtmb3IodmFyIGQ9YS50b0xvd2VyQ2FzZSgpLm1hdGNoKGMpLGU9Yi50b0xvd2VyQ2FzZSgpLm1hdGNoKGMpLGY9TWF0aC5taW4oZC5sZW5ndGgsZS5sZW5ndGgpLGc9MDtnPGY7ZysrKXtjPWRbZ107dmFyIGg9ZVtnXTtpZihjIT1oKXJldHVybiBhPXBhcnNlSW50KGMsMTApLCFpc05hTihhKSYmKGI9cGFyc2VJbnQoaCwxMCksIWlzTmFOKGIpJiZhLWIpP2EtYjpjPGg/LTE6MX1yZXR1cm4gZC5sZW5ndGghPWUubGVuZ3RoP2QubGVuZ3RoLWUubGVuZ3RoOmE8Yj8tMToxfTtnb29nLnN0cmluZy5pbnRBd2FyZUNvbXBhcmU9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gZ29vZy5zdHJpbmcubnVtYmVyQXdhcmVDb21wYXJlXyhhLGIsL1xcZCt8XFxEKy9nKX07XG5nb29nLnN0cmluZy5mbG9hdEF3YXJlQ29tcGFyZT1mdW5jdGlvbihhLGIpe3JldHVybiBnb29nLnN0cmluZy5udW1iZXJBd2FyZUNvbXBhcmVfKGEsYiwvXFxkK3xcXC5cXGQrfFxcRCsvZyl9O2dvb2cuc3RyaW5nLm51bWVyYXRlQ29tcGFyZT1nb29nLnN0cmluZy5mbG9hdEF3YXJlQ29tcGFyZTtnb29nLnN0cmluZy51cmxFbmNvZGU9ZnVuY3Rpb24oYSl7cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoYSkpfTtnb29nLnN0cmluZy51cmxEZWNvZGU9ZnVuY3Rpb24oYSl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChhLnJlcGxhY2UoL1xcKy9nLFwiIFwiKSl9O2dvb2cuc3RyaW5nLm5ld0xpbmVUb0JyPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGEucmVwbGFjZSgvKFxcclxcbnxcXHJ8XFxuKS9nLGI/XCI8YnIgLz5cIjpcIjxicj5cIil9O1xuZ29vZy5zdHJpbmcuaHRtbEVzY2FwZT1mdW5jdGlvbihhLGIpe2lmKGIpYT1hLnJlcGxhY2UoZ29vZy5zdHJpbmcuQU1QX1JFXyxcIiZhbXA7XCIpLnJlcGxhY2UoZ29vZy5zdHJpbmcuTFRfUkVfLFwiJmx0O1wiKS5yZXBsYWNlKGdvb2cuc3RyaW5nLkdUX1JFXyxcIiZndDtcIikucmVwbGFjZShnb29nLnN0cmluZy5RVU9UX1JFXyxcIiZxdW90O1wiKS5yZXBsYWNlKGdvb2cuc3RyaW5nLlNJTkdMRV9RVU9URV9SRV8sXCImIzM5O1wiKS5yZXBsYWNlKGdvb2cuc3RyaW5nLk5VTExfUkVfLFwiJiMwO1wiKSxnb29nLnN0cmluZy5ERVRFQ1RfRE9VQkxFX0VTQ0FQSU5HJiYoYT1hLnJlcGxhY2UoZ29vZy5zdHJpbmcuRV9SRV8sXCImIzEwMTtcIikpO2Vsc2V7aWYoIWdvb2cuc3RyaW5nLkFMTF9SRV8udGVzdChhKSlyZXR1cm4gYTstMSE9YS5pbmRleE9mKFwiJlwiKSYmKGE9YS5yZXBsYWNlKGdvb2cuc3RyaW5nLkFNUF9SRV8sXCImYW1wO1wiKSk7LTEhPWEuaW5kZXhPZihcIjxcIikmJihhPWEucmVwbGFjZShnb29nLnN0cmluZy5MVF9SRV8sXG5cIiZsdDtcIikpOy0xIT1hLmluZGV4T2YoXCI+XCIpJiYoYT1hLnJlcGxhY2UoZ29vZy5zdHJpbmcuR1RfUkVfLFwiJmd0O1wiKSk7LTEhPWEuaW5kZXhPZignXCInKSYmKGE9YS5yZXBsYWNlKGdvb2cuc3RyaW5nLlFVT1RfUkVfLFwiJnF1b3Q7XCIpKTstMSE9YS5pbmRleE9mKFwiJ1wiKSYmKGE9YS5yZXBsYWNlKGdvb2cuc3RyaW5nLlNJTkdMRV9RVU9URV9SRV8sXCImIzM5O1wiKSk7LTEhPWEuaW5kZXhPZihcIlxceDAwXCIpJiYoYT1hLnJlcGxhY2UoZ29vZy5zdHJpbmcuTlVMTF9SRV8sXCImIzA7XCIpKTtnb29nLnN0cmluZy5ERVRFQ1RfRE9VQkxFX0VTQ0FQSU5HJiYtMSE9YS5pbmRleE9mKFwiZVwiKSYmKGE9YS5yZXBsYWNlKGdvb2cuc3RyaW5nLkVfUkVfLFwiJiMxMDE7XCIpKX1yZXR1cm4gYX07Z29vZy5zdHJpbmcuQU1QX1JFXz0vJi9nO2dvb2cuc3RyaW5nLkxUX1JFXz0vPC9nO2dvb2cuc3RyaW5nLkdUX1JFXz0vPi9nO2dvb2cuc3RyaW5nLlFVT1RfUkVfPS9cIi9nO1xuZ29vZy5zdHJpbmcuU0lOR0xFX1FVT1RFX1JFXz0vJy9nO2dvb2cuc3RyaW5nLk5VTExfUkVfPS9cXHgwMC9nO2dvb2cuc3RyaW5nLkVfUkVfPS9lL2c7Z29vZy5zdHJpbmcuQUxMX1JFXz1nb29nLnN0cmluZy5ERVRFQ1RfRE9VQkxFX0VTQ0FQSU5HPy9bXFx4MDAmPD5cIidlXS86L1tcXHgwMCY8PlwiJ10vO2dvb2cuc3RyaW5nLnVuZXNjYXBlRW50aXRpZXM9ZnVuY3Rpb24oYSl7cmV0dXJuIGdvb2cuc3RyaW5nLmNvbnRhaW5zKGEsXCImXCIpPyFnb29nLnN0cmluZy5GT1JDRV9OT05fRE9NX0hUTUxfVU5FU0NBUElORyYmXCJkb2N1bWVudFwiaW4gZ29vZy5nbG9iYWw/Z29vZy5zdHJpbmcudW5lc2NhcGVFbnRpdGllc1VzaW5nRG9tXyhhKTpnb29nLnN0cmluZy51bmVzY2FwZVB1cmVYbWxFbnRpdGllc18oYSk6YX07XG5nb29nLnN0cmluZy51bmVzY2FwZUVudGl0aWVzV2l0aERvY3VtZW50PWZ1bmN0aW9uKGEsYil7cmV0dXJuIGdvb2cuc3RyaW5nLmNvbnRhaW5zKGEsXCImXCIpP2dvb2cuc3RyaW5nLnVuZXNjYXBlRW50aXRpZXNVc2luZ0RvbV8oYSxiKTphfTtcbmdvb2cuc3RyaW5nLnVuZXNjYXBlRW50aXRpZXNVc2luZ0RvbV89ZnVuY3Rpb24oYSxiKXt2YXIgYz17XCImYW1wO1wiOlwiJlwiLFwiJmx0O1wiOlwiPFwiLFwiJmd0O1wiOlwiPlwiLFwiJnF1b3Q7XCI6J1wiJ30sZDtkPWI/Yi5jcmVhdGVFbGVtZW50KFwiZGl2XCIpOmdvb2cuZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIGEucmVwbGFjZShnb29nLnN0cmluZy5IVE1MX0VOVElUWV9QQVRURVJOXyxmdW5jdGlvbihhLGIpe3ZhciBnPWNbYV07aWYoZylyZXR1cm4gZztpZihcIiNcIj09Yi5jaGFyQXQoMCkpe3ZhciBoPU51bWJlcihcIjBcIitiLnN1YnN0cigxKSk7aXNOYU4oaCl8fChnPVN0cmluZy5mcm9tQ2hhckNvZGUoaCkpfWd8fChkLmlubmVySFRNTD1hK1wiIFwiLGc9ZC5maXJzdENoaWxkLm5vZGVWYWx1ZS5zbGljZSgwLC0xKSk7cmV0dXJuIGNbYV09Z30pfTtcbmdvb2cuc3RyaW5nLnVuZXNjYXBlUHVyZVhtbEVudGl0aWVzXz1mdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKC8mKFteO10rKTsvZyxmdW5jdGlvbihhLGMpe3N3aXRjaChjKXtjYXNlIFwiYW1wXCI6cmV0dXJuXCImXCI7Y2FzZSBcImx0XCI6cmV0dXJuXCI8XCI7Y2FzZSBcImd0XCI6cmV0dXJuXCI+XCI7Y2FzZSBcInF1b3RcIjpyZXR1cm4nXCInO2RlZmF1bHQ6aWYoXCIjXCI9PWMuY2hhckF0KDApKXt2YXIgZD1OdW1iZXIoXCIwXCIrYy5zdWJzdHIoMSkpO2lmKCFpc05hTihkKSlyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShkKX1yZXR1cm4gYX19KX07Z29vZy5zdHJpbmcuSFRNTF9FTlRJVFlfUEFUVEVSTl89LyYoW147XFxzPCZdKyk7Py9nO2dvb2cuc3RyaW5nLndoaXRlc3BhY2VFc2NhcGU9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gZ29vZy5zdHJpbmcubmV3TGluZVRvQnIoYS5yZXBsYWNlKC8gIC9nLFwiICYjMTYwO1wiKSxiKX07XG5nb29nLnN0cmluZy5wcmVzZXJ2ZVNwYWNlcz1mdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKC8oXnxbXFxuIF0pIC9nLFwiJDFcIitnb29nLnN0cmluZy5Vbmljb2RlLk5CU1ApfTtnb29nLnN0cmluZy5zdHJpcFF1b3Rlcz1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz1iLmxlbmd0aCxkPTA7ZDxjO2QrKyl7dmFyIGU9MT09Yz9iOmIuY2hhckF0KGQpO2lmKGEuY2hhckF0KDApPT1lJiZhLmNoYXJBdChhLmxlbmd0aC0xKT09ZSlyZXR1cm4gYS5zdWJzdHJpbmcoMSxhLmxlbmd0aC0xKX1yZXR1cm4gYX07Z29vZy5zdHJpbmcudHJ1bmNhdGU9ZnVuY3Rpb24oYSxiLGMpe2MmJihhPWdvb2cuc3RyaW5nLnVuZXNjYXBlRW50aXRpZXMoYSkpO2EubGVuZ3RoPmImJihhPWEuc3Vic3RyaW5nKDAsYi0zKStcIi4uLlwiKTtjJiYoYT1nb29nLnN0cmluZy5odG1sRXNjYXBlKGEpKTtyZXR1cm4gYX07XG5nb29nLnN0cmluZy50cnVuY2F0ZU1pZGRsZT1mdW5jdGlvbihhLGIsYyxkKXtjJiYoYT1nb29nLnN0cmluZy51bmVzY2FwZUVudGl0aWVzKGEpKTtpZihkJiZhLmxlbmd0aD5iKXtkPmImJihkPWIpO3ZhciBlPWEubGVuZ3RoLWQ7YT1hLnN1YnN0cmluZygwLGItZCkrXCIuLi5cIithLnN1YnN0cmluZyhlKX1lbHNlIGEubGVuZ3RoPmImJihkPU1hdGguZmxvb3IoYi8yKSxlPWEubGVuZ3RoLWQsYT1hLnN1YnN0cmluZygwLGQrYiUyKStcIi4uLlwiK2Euc3Vic3RyaW5nKGUpKTtjJiYoYT1nb29nLnN0cmluZy5odG1sRXNjYXBlKGEpKTtyZXR1cm4gYX07Z29vZy5zdHJpbmcuc3BlY2lhbEVzY2FwZUNoYXJzXz17XCJcXHgwMFwiOlwiXFxcXDBcIixcIlxcYlwiOlwiXFxcXGJcIixcIlxcZlwiOlwiXFxcXGZcIixcIlxcblwiOlwiXFxcXG5cIixcIlxcclwiOlwiXFxcXHJcIixcIlxcdFwiOlwiXFxcXHRcIixcIlxceDBCXCI6XCJcXFxceDBCXCIsJ1wiJzonXFxcXFwiJyxcIlxcXFxcIjpcIlxcXFxcXFxcXCIsXCI8XCI6XCI8XCJ9O2dvb2cuc3RyaW5nLmpzRXNjYXBlQ2FjaGVfPXtcIidcIjpcIlxcXFwnXCJ9O1xuZ29vZy5zdHJpbmcucXVvdGU9ZnVuY3Rpb24oYSl7YT1TdHJpbmcoYSk7Zm9yKHZhciBiPVsnXCInXSxjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPWEuY2hhckF0KGMpLGU9ZC5jaGFyQ29kZUF0KDApO2JbYysxXT1nb29nLnN0cmluZy5zcGVjaWFsRXNjYXBlQ2hhcnNfW2RdfHwoMzE8ZSYmMTI3PmU/ZDpnb29nLnN0cmluZy5lc2NhcGVDaGFyKGQpKX1iLnB1c2goJ1wiJyk7cmV0dXJuIGIuam9pbihcIlwiKX07Z29vZy5zdHJpbmcuZXNjYXBlU3RyaW5nPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1bXSxjPTA7YzxhLmxlbmd0aDtjKyspYltjXT1nb29nLnN0cmluZy5lc2NhcGVDaGFyKGEuY2hhckF0KGMpKTtyZXR1cm4gYi5qb2luKFwiXCIpfTtcbmdvb2cuc3RyaW5nLmVzY2FwZUNoYXI9ZnVuY3Rpb24oYSl7aWYoYSBpbiBnb29nLnN0cmluZy5qc0VzY2FwZUNhY2hlXylyZXR1cm4gZ29vZy5zdHJpbmcuanNFc2NhcGVDYWNoZV9bYV07aWYoYSBpbiBnb29nLnN0cmluZy5zcGVjaWFsRXNjYXBlQ2hhcnNfKXJldHVybiBnb29nLnN0cmluZy5qc0VzY2FwZUNhY2hlX1thXT1nb29nLnN0cmluZy5zcGVjaWFsRXNjYXBlQ2hhcnNfW2FdO3ZhciBiLGM9YS5jaGFyQ29kZUF0KDApO2lmKDMxPGMmJjEyNz5jKWI9YTtlbHNle2lmKDI1Nj5jKXtpZihiPVwiXFxcXHhcIiwxNj5jfHwyNTY8YyliKz1cIjBcIn1lbHNlIGI9XCJcXFxcdVwiLDQwOTY+YyYmKGIrPVwiMFwiKTtiKz1jLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfXJldHVybiBnb29nLnN0cmluZy5qc0VzY2FwZUNhY2hlX1thXT1ifTtnb29nLnN0cmluZy5jb250YWlucz1mdW5jdGlvbihhLGIpe3JldHVybi0xIT1hLmluZGV4T2YoYil9O1xuZ29vZy5zdHJpbmcuY2FzZUluc2Vuc2l0aXZlQ29udGFpbnM9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gZ29vZy5zdHJpbmcuY29udGFpbnMoYS50b0xvd2VyQ2FzZSgpLGIudG9Mb3dlckNhc2UoKSl9O2dvb2cuc3RyaW5nLmNvdW50T2Y9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYSYmYj9hLnNwbGl0KGIpLmxlbmd0aC0xOjB9O2dvb2cuc3RyaW5nLnJlbW92ZUF0PWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1hOzA8PWImJmI8YS5sZW5ndGgmJjA8YyYmKGQ9YS5zdWJzdHIoMCxiKSthLnN1YnN0cihiK2MsYS5sZW5ndGgtYi1jKSk7cmV0dXJuIGR9O2dvb2cuc3RyaW5nLnJlbW92ZT1mdW5jdGlvbihhLGIpe3ZhciBjPW5ldyBSZWdFeHAoZ29vZy5zdHJpbmcucmVnRXhwRXNjYXBlKGIpLFwiXCIpO3JldHVybiBhLnJlcGxhY2UoYyxcIlwiKX07XG5nb29nLnN0cmluZy5yZW1vdmVBbGw9ZnVuY3Rpb24oYSxiKXt2YXIgYz1uZXcgUmVnRXhwKGdvb2cuc3RyaW5nLnJlZ0V4cEVzY2FwZShiKSxcImdcIik7cmV0dXJuIGEucmVwbGFjZShjLFwiXCIpfTtnb29nLnN0cmluZy5yZWdFeHBFc2NhcGU9ZnVuY3Rpb24oYSl7cmV0dXJuIFN0cmluZyhhKS5yZXBsYWNlKC8oWy0oKVxcW1xcXXt9Kz8qLiRcXF58LDojPCFcXFxcXSkvZyxcIlxcXFwkMVwiKS5yZXBsYWNlKC9cXHgwOC9nLFwiXFxcXHgwOFwiKX07Z29vZy5zdHJpbmcucmVwZWF0PVN0cmluZy5wcm90b3R5cGUucmVwZWF0P2Z1bmN0aW9uKGEsYil7cmV0dXJuIGEucmVwZWF0KGIpfTpmdW5jdGlvbihhLGIpe3JldHVybiBBcnJheShiKzEpLmpvaW4oYSl9O1xuZ29vZy5zdHJpbmcucGFkTnVtYmVyPWZ1bmN0aW9uKGEsYixjKXthPWdvb2cuaXNEZWYoYyk/YS50b0ZpeGVkKGMpOlN0cmluZyhhKTtjPWEuaW5kZXhPZihcIi5cIik7LTE9PWMmJihjPWEubGVuZ3RoKTtyZXR1cm4gZ29vZy5zdHJpbmcucmVwZWF0KFwiMFwiLE1hdGgubWF4KDAsYi1jKSkrYX07Z29vZy5zdHJpbmcubWFrZVNhZmU9ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGw9PWE/XCJcIjpTdHJpbmcoYSl9O2dvb2cuc3RyaW5nLmJ1aWxkU3RyaW5nPWZ1bmN0aW9uKGEpe3JldHVybiBBcnJheS5wcm90b3R5cGUuam9pbi5jYWxsKGFyZ3VtZW50cyxcIlwiKX07Z29vZy5zdHJpbmcuZ2V0UmFuZG9tU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIE1hdGguZmxvb3IoMjE0NzQ4MzY0OCpNYXRoLnJhbmRvbSgpKS50b1N0cmluZygzNikrTWF0aC5hYnMoTWF0aC5mbG9vcigyMTQ3NDgzNjQ4Kk1hdGgucmFuZG9tKCkpXmdvb2cubm93KCkpLnRvU3RyaW5nKDM2KX07XG5nb29nLnN0cmluZy5jb21wYXJlVmVyc2lvbnM9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MCxkPWdvb2cuc3RyaW5nLnRyaW0oU3RyaW5nKGEpKS5zcGxpdChcIi5cIiksZT1nb29nLnN0cmluZy50cmltKFN0cmluZyhiKSkuc3BsaXQoXCIuXCIpLGY9TWF0aC5tYXgoZC5sZW5ndGgsZS5sZW5ndGgpLGc9MDswPT1jJiZnPGY7ZysrKXt2YXIgaD1kW2ddfHxcIlwiLGs9ZVtnXXx8XCJcIixsPVJlZ0V4cChcIihcXFxcZCopKFxcXFxEKilcIixcImdcIikscD1SZWdFeHAoXCIoXFxcXGQqKShcXFxcRCopXCIsXCJnXCIpO2Rve3ZhciBtPWwuZXhlYyhoKXx8W1wiXCIsXCJcIixcIlwiXSxuPXAuZXhlYyhrKXx8W1wiXCIsXCJcIixcIlwiXTtpZigwPT1tWzBdLmxlbmd0aCYmMD09blswXS5sZW5ndGgpYnJlYWs7dmFyIGM9MD09bVsxXS5sZW5ndGg/MDpwYXJzZUludChtWzFdLDEwKSxxPTA9PW5bMV0ubGVuZ3RoPzA6cGFyc2VJbnQoblsxXSwxMCksYz1nb29nLnN0cmluZy5jb21wYXJlRWxlbWVudHNfKGMscSl8fGdvb2cuc3RyaW5nLmNvbXBhcmVFbGVtZW50c18oMD09XG5tWzJdLmxlbmd0aCwwPT1uWzJdLmxlbmd0aCl8fGdvb2cuc3RyaW5nLmNvbXBhcmVFbGVtZW50c18obVsyXSxuWzJdKX13aGlsZSgwPT1jKX1yZXR1cm4gY307Z29vZy5zdHJpbmcuY29tcGFyZUVsZW1lbnRzXz1mdW5jdGlvbihhLGIpe3JldHVybiBhPGI/LTE6YT5iPzE6MH07Z29vZy5zdHJpbmcuaGFzaENvZGU9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPTAsYz0wO2M8YS5sZW5ndGg7KytjKWI9MzEqYithLmNoYXJDb2RlQXQoYyk+Pj4wO3JldHVybiBifTtnb29nLnN0cmluZy51bmlxdWVTdHJpbmdDb3VudGVyXz0yMTQ3NDgzNjQ4Kk1hdGgucmFuZG9tKCl8MDtnb29nLnN0cmluZy5jcmVhdGVVbmlxdWVTdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cImdvb2dfXCIrZ29vZy5zdHJpbmcudW5pcXVlU3RyaW5nQ291bnRlcl8rK307XG5nb29nLnN0cmluZy50b051bWJlcj1mdW5jdGlvbihhKXt2YXIgYj1OdW1iZXIoYSk7cmV0dXJuIDA9PWImJmdvb2cuc3RyaW5nLmlzRW1wdHlPcldoaXRlc3BhY2UoYSk/TmFOOmJ9O2dvb2cuc3RyaW5nLmlzTG93ZXJDYW1lbENhc2U9ZnVuY3Rpb24oYSl7cmV0dXJuL15bYS16XSsoW0EtWl1bYS16XSopKiQvLnRlc3QoYSl9O2dvb2cuc3RyaW5nLmlzVXBwZXJDYW1lbENhc2U9ZnVuY3Rpb24oYSl7cmV0dXJuL14oW0EtWl1bYS16XSopKyQvLnRlc3QoYSl9O2dvb2cuc3RyaW5nLnRvQ2FtZWxDYXNlPWZ1bmN0aW9uKGEpe3JldHVybiBTdHJpbmcoYSkucmVwbGFjZSgvXFwtKFthLXpdKS9nLGZ1bmN0aW9uKGEsYyl7cmV0dXJuIGMudG9VcHBlckNhc2UoKX0pfTtnb29nLnN0cmluZy50b1NlbGVjdG9yQ2FzZT1mdW5jdGlvbihhKXtyZXR1cm4gU3RyaW5nKGEpLnJlcGxhY2UoLyhbQS1aXSkvZyxcIi0kMVwiKS50b0xvd2VyQ2FzZSgpfTtcbmdvb2cuc3RyaW5nLnRvVGl0bGVDYXNlPWZ1bmN0aW9uKGEsYil7dmFyIGM9Z29vZy5pc1N0cmluZyhiKT9nb29nLnN0cmluZy5yZWdFeHBFc2NhcGUoYik6XCJcXFxcc1wiO3JldHVybiBhLnJlcGxhY2UobmV3IFJlZ0V4cChcIiheXCIrKGM/XCJ8W1wiK2MrXCJdK1wiOlwiXCIpK1wiKShbYS16XSlcIixcImdcIiksZnVuY3Rpb24oYSxiLGMpe3JldHVybiBiK2MudG9VcHBlckNhc2UoKX0pfTtnb29nLnN0cmluZy5jYXBpdGFsaXplPWZ1bmN0aW9uKGEpe3JldHVybiBTdHJpbmcoYS5jaGFyQXQoMCkpLnRvVXBwZXJDYXNlKCkrU3RyaW5nKGEuc3Vic3RyKDEpKS50b0xvd2VyQ2FzZSgpfTtnb29nLnN0cmluZy5wYXJzZUludD1mdW5jdGlvbihhKXtpc0Zpbml0ZShhKSYmKGE9U3RyaW5nKGEpKTtyZXR1cm4gZ29vZy5pc1N0cmluZyhhKT8vXlxccyotPzB4L2kudGVzdChhKT9wYXJzZUludChhLDE2KTpwYXJzZUludChhLDEwKTpOYU59O1xuZ29vZy5zdHJpbmcuc3BsaXRMaW1pdD1mdW5jdGlvbihhLGIsYyl7YT1hLnNwbGl0KGIpO2Zvcih2YXIgZD1bXTswPGMmJmEubGVuZ3RoOylkLnB1c2goYS5zaGlmdCgpKSxjLS07YS5sZW5ndGgmJmQucHVzaChhLmpvaW4oYikpO3JldHVybiBkfTtnb29nLnN0cmluZy5lZGl0RGlzdGFuY2U9ZnVuY3Rpb24oYSxiKXt2YXIgYz1bXSxkPVtdO2lmKGE9PWIpcmV0dXJuIDA7aWYoIWEubGVuZ3RofHwhYi5sZW5ndGgpcmV0dXJuIE1hdGgubWF4KGEubGVuZ3RoLGIubGVuZ3RoKTtmb3IodmFyIGU9MDtlPGIubGVuZ3RoKzE7ZSsrKWNbZV09ZTtmb3IoZT0wO2U8YS5sZW5ndGg7ZSsrKXtkWzBdPWUrMTtmb3IodmFyIGY9MDtmPGIubGVuZ3RoO2YrKylkW2YrMV09TWF0aC5taW4oZFtmXSsxLGNbZisxXSsxLGNbZl0rTnVtYmVyKGFbZV0hPWJbZl0pKTtmb3IoZj0wO2Y8Yy5sZW5ndGg7ZisrKWNbZl09ZFtmXX1yZXR1cm4gZFtiLmxlbmd0aF19O2dvb2cuYXNzZXJ0cz17fTtnb29nLmFzc2VydHMuRU5BQkxFX0FTU0VSVFM9Z29vZy5ERUJVRztnb29nLmFzc2VydHMuQXNzZXJ0aW9uRXJyb3I9ZnVuY3Rpb24oYSxiKXtiLnVuc2hpZnQoYSk7Z29vZy5kZWJ1Zy5FcnJvci5jYWxsKHRoaXMsZ29vZy5zdHJpbmcuc3Vicy5hcHBseShudWxsLGIpKTtiLnNoaWZ0KCk7dGhpcy5tZXNzYWdlUGF0dGVybj1hfTtnb29nLmluaGVyaXRzKGdvb2cuYXNzZXJ0cy5Bc3NlcnRpb25FcnJvcixnb29nLmRlYnVnLkVycm9yKTtnb29nLmFzc2VydHMuQXNzZXJ0aW9uRXJyb3IucHJvdG90eXBlLm5hbWU9XCJBc3NlcnRpb25FcnJvclwiO2dvb2cuYXNzZXJ0cy5ERUZBVUxUX0VSUk9SX0hBTkRMRVI9ZnVuY3Rpb24oYSl7dGhyb3cgYTt9O2dvb2cuYXNzZXJ0cy5lcnJvckhhbmRsZXJfPWdvb2cuYXNzZXJ0cy5ERUZBVUxUX0VSUk9SX0hBTkRMRVI7XG5nb29nLmFzc2VydHMuZG9Bc3NlcnRGYWlsdXJlXz1mdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1cIkFzc2VydGlvbiBmYWlsZWRcIjtpZihjKXZhciBlPWUrKFwiOiBcIitjKSxmPWQ7ZWxzZSBhJiYoZSs9XCI6IFwiK2EsZj1iKTthPW5ldyBnb29nLmFzc2VydHMuQXNzZXJ0aW9uRXJyb3IoXCJcIitlLGZ8fFtdKTtnb29nLmFzc2VydHMuZXJyb3JIYW5kbGVyXyhhKX07Z29vZy5hc3NlcnRzLnNldEVycm9ySGFuZGxlcj1mdW5jdGlvbihhKXtnb29nLmFzc2VydHMuRU5BQkxFX0FTU0VSVFMmJihnb29nLmFzc2VydHMuZXJyb3JIYW5kbGVyXz1hKX07Z29vZy5hc3NlcnRzLmFzc2VydD1mdW5jdGlvbihhLGIsYyl7Z29vZy5hc3NlcnRzLkVOQUJMRV9BU1NFUlRTJiYhYSYmZ29vZy5hc3NlcnRzLmRvQXNzZXJ0RmFpbHVyZV8oXCJcIixudWxsLGIsQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDIpKTtyZXR1cm4gYX07XG5nb29nLmFzc2VydHMuZmFpbD1mdW5jdGlvbihhLGIpe2dvb2cuYXNzZXJ0cy5FTkFCTEVfQVNTRVJUUyYmZ29vZy5hc3NlcnRzLmVycm9ySGFuZGxlcl8obmV3IGdvb2cuYXNzZXJ0cy5Bc3NlcnRpb25FcnJvcihcIkZhaWx1cmVcIisoYT9cIjogXCIrYTpcIlwiKSxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSkpKX07Z29vZy5hc3NlcnRzLmFzc2VydE51bWJlcj1mdW5jdGlvbihhLGIsYyl7Z29vZy5hc3NlcnRzLkVOQUJMRV9BU1NFUlRTJiYhZ29vZy5pc051bWJlcihhKSYmZ29vZy5hc3NlcnRzLmRvQXNzZXJ0RmFpbHVyZV8oXCJFeHBlY3RlZCBudW1iZXIgYnV0IGdvdCAlczogJXMuXCIsW2dvb2cudHlwZU9mKGEpLGFdLGIsQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDIpKTtyZXR1cm4gYX07XG5nb29nLmFzc2VydHMuYXNzZXJ0U3RyaW5nPWZ1bmN0aW9uKGEsYixjKXtnb29nLmFzc2VydHMuRU5BQkxFX0FTU0VSVFMmJiFnb29nLmlzU3RyaW5nKGEpJiZnb29nLmFzc2VydHMuZG9Bc3NlcnRGYWlsdXJlXyhcIkV4cGVjdGVkIHN0cmluZyBidXQgZ290ICVzOiAlcy5cIixbZ29vZy50eXBlT2YoYSksYV0sYixBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMikpO3JldHVybiBhfTtnb29nLmFzc2VydHMuYXNzZXJ0RnVuY3Rpb249ZnVuY3Rpb24oYSxiLGMpe2dvb2cuYXNzZXJ0cy5FTkFCTEVfQVNTRVJUUyYmIWdvb2cuaXNGdW5jdGlvbihhKSYmZ29vZy5hc3NlcnRzLmRvQXNzZXJ0RmFpbHVyZV8oXCJFeHBlY3RlZCBmdW5jdGlvbiBidXQgZ290ICVzOiAlcy5cIixbZ29vZy50eXBlT2YoYSksYV0sYixBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMikpO3JldHVybiBhfTtcbmdvb2cuYXNzZXJ0cy5hc3NlcnRPYmplY3Q9ZnVuY3Rpb24oYSxiLGMpe2dvb2cuYXNzZXJ0cy5FTkFCTEVfQVNTRVJUUyYmIWdvb2cuaXNPYmplY3QoYSkmJmdvb2cuYXNzZXJ0cy5kb0Fzc2VydEZhaWx1cmVfKFwiRXhwZWN0ZWQgb2JqZWN0IGJ1dCBnb3QgJXM6ICVzLlwiLFtnb29nLnR5cGVPZihhKSxhXSxiLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywyKSk7cmV0dXJuIGF9O2dvb2cuYXNzZXJ0cy5hc3NlcnRBcnJheT1mdW5jdGlvbihhLGIsYyl7Z29vZy5hc3NlcnRzLkVOQUJMRV9BU1NFUlRTJiYhZ29vZy5pc0FycmF5KGEpJiZnb29nLmFzc2VydHMuZG9Bc3NlcnRGYWlsdXJlXyhcIkV4cGVjdGVkIGFycmF5IGJ1dCBnb3QgJXM6ICVzLlwiLFtnb29nLnR5cGVPZihhKSxhXSxiLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywyKSk7cmV0dXJuIGF9O1xuZ29vZy5hc3NlcnRzLmFzc2VydEJvb2xlYW49ZnVuY3Rpb24oYSxiLGMpe2dvb2cuYXNzZXJ0cy5FTkFCTEVfQVNTRVJUUyYmIWdvb2cuaXNCb29sZWFuKGEpJiZnb29nLmFzc2VydHMuZG9Bc3NlcnRGYWlsdXJlXyhcIkV4cGVjdGVkIGJvb2xlYW4gYnV0IGdvdCAlczogJXMuXCIsW2dvb2cudHlwZU9mKGEpLGFdLGIsQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDIpKTtyZXR1cm4gYX07Z29vZy5hc3NlcnRzLmFzc2VydEVsZW1lbnQ9ZnVuY3Rpb24oYSxiLGMpeyFnb29nLmFzc2VydHMuRU5BQkxFX0FTU0VSVFN8fGdvb2cuaXNPYmplY3QoYSkmJmEubm9kZVR5cGU9PWdvb2cuZG9tLk5vZGVUeXBlLkVMRU1FTlR8fGdvb2cuYXNzZXJ0cy5kb0Fzc2VydEZhaWx1cmVfKFwiRXhwZWN0ZWQgRWxlbWVudCBidXQgZ290ICVzOiAlcy5cIixbZ29vZy50eXBlT2YoYSksYV0sYixBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMikpO3JldHVybiBhfTtcbmdvb2cuYXNzZXJ0cy5hc3NlcnRJbnN0YW5jZW9mPWZ1bmN0aW9uKGEsYixjLGQpeyFnb29nLmFzc2VydHMuRU5BQkxFX0FTU0VSVFN8fGEgaW5zdGFuY2VvZiBifHxnb29nLmFzc2VydHMuZG9Bc3NlcnRGYWlsdXJlXyhcIkV4cGVjdGVkIGluc3RhbmNlb2YgJXMgYnV0IGdvdCAlcy5cIixbZ29vZy5hc3NlcnRzLmdldFR5cGVfKGIpLGdvb2cuYXNzZXJ0cy5nZXRUeXBlXyhhKV0sYyxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMykpO3JldHVybiBhfTtnb29nLmFzc2VydHMuYXNzZXJ0T2JqZWN0UHJvdG90eXBlSXNJbnRhY3Q9ZnVuY3Rpb24oKXtmb3IodmFyIGEgaW4gT2JqZWN0LnByb3RvdHlwZSlnb29nLmFzc2VydHMuZmFpbChhK1wiIHNob3VsZCBub3QgYmUgZW51bWVyYWJsZSBpbiBPYmplY3QucHJvdG90eXBlLlwiKX07XG5nb29nLmFzc2VydHMuZ2V0VHlwZV89ZnVuY3Rpb24oYSl7cmV0dXJuIGEgaW5zdGFuY2VvZiBGdW5jdGlvbj9hLmRpc3BsYXlOYW1lfHxhLm5hbWV8fFwidW5rbm93biB0eXBlIG5hbWVcIjphIGluc3RhbmNlb2YgT2JqZWN0P2EuY29uc3RydWN0b3IuZGlzcGxheU5hbWV8fGEuY29uc3RydWN0b3IubmFtZXx8T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpOm51bGw9PT1hP1wibnVsbFwiOnR5cGVvZiBhfTt2YXIganNwYj17TWFwOmZ1bmN0aW9uKGEsYil7dGhpcy5hcnJfPWE7dGhpcy52YWx1ZUN0b3JfPWI7dGhpcy5tYXBfPXt9O3RoaXMuYXJyQ2xlYW49ITA7MDx0aGlzLmFycl8ubGVuZ3RoJiZ0aGlzLmxvYWRGcm9tQXJyYXlfKCl9fTtqc3BiLk1hcC5wcm90b3R5cGUubG9hZEZyb21BcnJheV89ZnVuY3Rpb24oKXtmb3IodmFyIGE9MDthPHRoaXMuYXJyXy5sZW5ndGg7YSsrKXt2YXIgYj10aGlzLmFycl9bYV0sYz1iWzBdO3RoaXMubWFwX1tjLnRvU3RyaW5nKCldPW5ldyBqc3BiLk1hcC5FbnRyeV8oYyxiWzFdKX10aGlzLmFyckNsZWFuPSEwfTtcbmpzcGIuTWFwLnByb3RvdHlwZS50b0FycmF5PWZ1bmN0aW9uKCl7aWYodGhpcy5hcnJDbGVhbil7aWYodGhpcy52YWx1ZUN0b3JfKXt2YXIgYT10aGlzLm1hcF8sYjtmb3IoYiBpbiBhKWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLGIpKXt2YXIgYz1hW2JdLnZhbHVlV3JhcHBlcjtjJiZjLnRvQXJyYXkoKX19fWVsc2V7dGhpcy5hcnJfLmxlbmd0aD0wO2E9dGhpcy5zdHJpbmdLZXlzXygpO2Euc29ydCgpO2ZvcihiPTA7YjxhLmxlbmd0aDtiKyspe3ZhciBkPXRoaXMubWFwX1thW2JdXTsoYz1kLnZhbHVlV3JhcHBlcikmJmMudG9BcnJheSgpO3RoaXMuYXJyXy5wdXNoKFtkLmtleSxkLnZhbHVlXSl9dGhpcy5hcnJDbGVhbj0hMH1yZXR1cm4gdGhpcy5hcnJffTtcbmpzcGIuTWFwLnByb3RvdHlwZS50b09iamVjdD1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz10aGlzLnRvQXJyYXkoKSxkPVtdLGU9MDtlPGMubGVuZ3RoO2UrKyl7dmFyIGY9dGhpcy5tYXBfW2NbZV1bMF0udG9TdHJpbmcoKV07dGhpcy53cmFwRW50cnlfKGYpO3ZhciBnPWYudmFsdWVXcmFwcGVyO2c/KGdvb2cuYXNzZXJ0cy5hc3NlcnQoYiksZC5wdXNoKFtmLmtleSxiKGEsZyldKSk6ZC5wdXNoKFtmLmtleSxmLnZhbHVlXSl9cmV0dXJuIGR9O2pzcGIuTWFwLmZyb21PYmplY3Q9ZnVuY3Rpb24oYSxiLGMpe2I9bmV3IGpzcGIuTWFwKFtdLGIpO2Zvcih2YXIgZD0wO2Q8YS5sZW5ndGg7ZCsrKXt2YXIgZT1hW2RdWzBdLGY9YyhhW2RdWzFdKTtiLnNldChlLGYpfXJldHVybiBifTtqc3BiLk1hcC5BcnJheUl0ZXJhdG9ySXRlcmFibGVfPWZ1bmN0aW9uKGEpe3RoaXMuaWR4Xz0wO3RoaXMuYXJyXz1hfTtcbmpzcGIuTWFwLkFycmF5SXRlcmF0b3JJdGVyYWJsZV8ucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pZHhfPHRoaXMuYXJyXy5sZW5ndGg/e2RvbmU6ITEsdmFsdWU6dGhpcy5hcnJfW3RoaXMuaWR4XysrXX06e2RvbmU6ITAsdmFsdWU6dm9pZCAwfX07JGpzY29tcC5pbml0U3ltYm9sKCk7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmKCRqc2NvbXAuaW5pdFN5bWJvbCgpLCRqc2NvbXAuaW5pdFN5bWJvbEl0ZXJhdG9yKCksanNwYi5NYXAuQXJyYXlJdGVyYXRvckl0ZXJhYmxlXy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXT1mdW5jdGlvbigpe3JldHVybiB0aGlzfSk7anNwYi5NYXAucHJvdG90eXBlLmdldExlbmd0aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLnN0cmluZ0tleXNfKCkubGVuZ3RofTtqc3BiLk1hcC5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt0aGlzLm1hcF89e307dGhpcy5hcnJDbGVhbj0hMX07XG5qc3BiLk1hcC5wcm90b3R5cGUuZGVsPWZ1bmN0aW9uKGEpe2E9YS50b1N0cmluZygpO3ZhciBiPXRoaXMubWFwXy5oYXNPd25Qcm9wZXJ0eShhKTtkZWxldGUgdGhpcy5tYXBfW2FdO3RoaXMuYXJyQ2xlYW49ITE7cmV0dXJuIGJ9O2pzcGIuTWFwLnByb3RvdHlwZS5nZXRFbnRyeUxpc3Q9ZnVuY3Rpb24oKXt2YXIgYT1bXSxiPXRoaXMuc3RyaW5nS2V5c18oKTtiLnNvcnQoKTtmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl7dmFyIGQ9dGhpcy5tYXBfW2JbY11dO2EucHVzaChbZC5rZXksZC52YWx1ZV0pfXJldHVybiBhfTtqc3BiLk1hcC5wcm90b3R5cGUuZW50cmllcz1mdW5jdGlvbigpe3ZhciBhPVtdLGI9dGhpcy5zdHJpbmdLZXlzXygpO2Iuc29ydCgpO2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXt2YXIgZD10aGlzLm1hcF9bYltjXV07YS5wdXNoKFtkLmtleSx0aGlzLndyYXBFbnRyeV8oZCldKX1yZXR1cm4gbmV3IGpzcGIuTWFwLkFycmF5SXRlcmF0b3JJdGVyYWJsZV8oYSl9O1xuanNwYi5NYXAucHJvdG90eXBlLmtleXM9ZnVuY3Rpb24oKXt2YXIgYT1bXSxiPXRoaXMuc3RyaW5nS2V5c18oKTtiLnNvcnQoKTtmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKylhLnB1c2godGhpcy5tYXBfW2JbY11dLmtleSk7cmV0dXJuIG5ldyBqc3BiLk1hcC5BcnJheUl0ZXJhdG9ySXRlcmFibGVfKGEpfTtqc3BiLk1hcC5wcm90b3R5cGUudmFsdWVzPWZ1bmN0aW9uKCl7dmFyIGE9W10sYj10aGlzLnN0cmluZ0tleXNfKCk7Yi5zb3J0KCk7Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspYS5wdXNoKHRoaXMud3JhcEVudHJ5Xyh0aGlzLm1hcF9bYltjXV0pKTtyZXR1cm4gbmV3IGpzcGIuTWFwLkFycmF5SXRlcmF0b3JJdGVyYWJsZV8oYSl9O1xuanNwYi5NYXAucHJvdG90eXBlLmZvckVhY2g9ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLnN0cmluZ0tleXNfKCk7Yy5zb3J0KCk7Zm9yKHZhciBkPTA7ZDxjLmxlbmd0aDtkKyspe3ZhciBlPXRoaXMubWFwX1tjW2RdXTthLmNhbGwoYix0aGlzLndyYXBFbnRyeV8oZSksZS5rZXksdGhpcyl9fTtqc3BiLk1hcC5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKGEsYil7dmFyIGM9bmV3IGpzcGIuTWFwLkVudHJ5XyhhKTt0aGlzLnZhbHVlQ3Rvcl8/KGMudmFsdWVXcmFwcGVyPWIsYy52YWx1ZT1iLnRvQXJyYXkoKSk6Yy52YWx1ZT1iO3RoaXMubWFwX1thLnRvU3RyaW5nKCldPWM7dGhpcy5hcnJDbGVhbj0hMTtyZXR1cm4gdGhpc307anNwYi5NYXAucHJvdG90eXBlLndyYXBFbnRyeV89ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMudmFsdWVDdG9yXz8oYS52YWx1ZVdyYXBwZXJ8fChhLnZhbHVlV3JhcHBlcj1uZXcgdGhpcy52YWx1ZUN0b3JfKGEudmFsdWUpKSxhLnZhbHVlV3JhcHBlcik6YS52YWx1ZX07XG5qc3BiLk1hcC5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKGEpe2lmKGE9dGhpcy5tYXBfW2EudG9TdHJpbmcoKV0pcmV0dXJuIHRoaXMud3JhcEVudHJ5XyhhKX07anNwYi5NYXAucHJvdG90eXBlLmhhcz1mdW5jdGlvbihhKXtyZXR1cm4gYS50b1N0cmluZygpaW4gdGhpcy5tYXBffTtqc3BiLk1hcC5wcm90b3R5cGUuc2VyaWFsaXplQmluYXJ5PWZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9dGhpcy5zdHJpbmdLZXlzXygpO2Yuc29ydCgpO2Zvcih2YXIgZz0wO2c8Zi5sZW5ndGg7ZysrKXt2YXIgaD10aGlzLm1hcF9bZltnXV07Yi5iZWdpblN1Yk1lc3NhZ2UoYSk7Yy5jYWxsKGIsMSxoLmtleSk7dGhpcy52YWx1ZUN0b3JfP2QuY2FsbChiLDIsdGhpcy53cmFwRW50cnlfKGgpLGUpOmQuY2FsbChiLDIsaC52YWx1ZSk7Yi5lbmRTdWJNZXNzYWdlKCl9fTtcbmpzcGIuTWFwLmRlc2VyaWFsaXplQmluYXJ5PWZ1bmN0aW9uKGEsYixjLGQsZSxmKXtmb3IodmFyIGc9dm9pZCAwO2IubmV4dEZpZWxkKCkmJiFiLmlzRW5kR3JvdXAoKTspe3ZhciBoPWIuZ2V0RmllbGROdW1iZXIoKTsxPT1oP2Y9Yy5jYWxsKGIpOjI9PWgmJihhLnZhbHVlQ3Rvcl8/KGdvb2cuYXNzZXJ0cy5hc3NlcnQoZSksZz1uZXcgYS52YWx1ZUN0b3JfLGQuY2FsbChiLGcsZSkpOmc9ZC5jYWxsKGIpKX1nb29nLmFzc2VydHMuYXNzZXJ0KHZvaWQgMCE9Zik7Z29vZy5hc3NlcnRzLmFzc2VydCh2b2lkIDAhPWcpO2Euc2V0KGYsZyl9O2pzcGIuTWFwLnByb3RvdHlwZS5zdHJpbmdLZXlzXz1mdW5jdGlvbigpe3ZhciBhPXRoaXMubWFwXyxiPVtdLGM7Zm9yKGMgaW4gYSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSxjKSYmYi5wdXNoKGMpO3JldHVybiBifTtcbmpzcGIuTWFwLkVudHJ5Xz1mdW5jdGlvbihhLGIpe3RoaXMua2V5PWE7dGhpcy52YWx1ZT1iO3RoaXMudmFsdWVXcmFwcGVyPXZvaWQgMH07Z29vZy5hcnJheT17fTtnb29nLk5BVElWRV9BUlJBWV9QUk9UT1RZUEVTPWdvb2cuVFJVU1RFRF9TSVRFO2dvb2cuYXJyYXkuQVNTVU1FX05BVElWRV9GVU5DVElPTlM9ITE7Z29vZy5hcnJheS5wZWVrPWZ1bmN0aW9uKGEpe3JldHVybiBhW2EubGVuZ3RoLTFdfTtnb29nLmFycmF5Lmxhc3Q9Z29vZy5hcnJheS5wZWVrO1xuZ29vZy5hcnJheS5pbmRleE9mPWdvb2cuTkFUSVZFX0FSUkFZX1BST1RPVFlQRVMmJihnb29nLmFycmF5LkFTU1VNRV9OQVRJVkVfRlVOQ1RJT05TfHxBcnJheS5wcm90b3R5cGUuaW5kZXhPZik/ZnVuY3Rpb24oYSxiLGMpe2dvb2cuYXNzZXJ0cy5hc3NlcnQobnVsbCE9YS5sZW5ndGgpO3JldHVybiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGEsYixjKX06ZnVuY3Rpb24oYSxiLGMpe2M9bnVsbD09Yz8wOjA+Yz9NYXRoLm1heCgwLGEubGVuZ3RoK2MpOmM7aWYoZ29vZy5pc1N0cmluZyhhKSlyZXR1cm4gZ29vZy5pc1N0cmluZyhiKSYmMT09Yi5sZW5ndGg/YS5pbmRleE9mKGIsYyk6LTE7Zm9yKDtjPGEubGVuZ3RoO2MrKylpZihjIGluIGEmJmFbY109PT1iKXJldHVybiBjO3JldHVybi0xfTtcbmdvb2cuYXJyYXkubGFzdEluZGV4T2Y9Z29vZy5OQVRJVkVfQVJSQVlfUFJPVE9UWVBFUyYmKGdvb2cuYXJyYXkuQVNTVU1FX05BVElWRV9GVU5DVElPTlN8fEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZik/ZnVuY3Rpb24oYSxiLGMpe2dvb2cuYXNzZXJ0cy5hc3NlcnQobnVsbCE9YS5sZW5ndGgpO3JldHVybiBBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChhLGIsbnVsbD09Yz9hLmxlbmd0aC0xOmMpfTpmdW5jdGlvbihhLGIsYyl7Yz1udWxsPT1jP2EubGVuZ3RoLTE6YzswPmMmJihjPU1hdGgubWF4KDAsYS5sZW5ndGgrYykpO2lmKGdvb2cuaXNTdHJpbmcoYSkpcmV0dXJuIGdvb2cuaXNTdHJpbmcoYikmJjE9PWIubGVuZ3RoP2EubGFzdEluZGV4T2YoYixjKTotMTtmb3IoOzA8PWM7Yy0tKWlmKGMgaW4gYSYmYVtjXT09PWIpcmV0dXJuIGM7cmV0dXJuLTF9O1xuZ29vZy5hcnJheS5mb3JFYWNoPWdvb2cuTkFUSVZFX0FSUkFZX1BST1RPVFlQRVMmJihnb29nLmFycmF5LkFTU1VNRV9OQVRJVkVfRlVOQ1RJT05TfHxBcnJheS5wcm90b3R5cGUuZm9yRWFjaCk/ZnVuY3Rpb24oYSxiLGMpe2dvb2cuYXNzZXJ0cy5hc3NlcnQobnVsbCE9YS5sZW5ndGgpO0FycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYSxiLGMpfTpmdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPWEubGVuZ3RoLGU9Z29vZy5pc1N0cmluZyhhKT9hLnNwbGl0KFwiXCIpOmEsZj0wO2Y8ZDtmKyspZiBpbiBlJiZiLmNhbGwoYyxlW2ZdLGYsYSl9O2dvb2cuYXJyYXkuZm9yRWFjaFJpZ2h0PWZ1bmN0aW9uKGEsYixjKXtmb3IodmFyIGQ9YS5sZW5ndGgsZT1nb29nLmlzU3RyaW5nKGEpP2Euc3BsaXQoXCJcIik6YSxkPWQtMTswPD1kOy0tZClkIGluIGUmJmIuY2FsbChjLGVbZF0sZCxhKX07XG5nb29nLmFycmF5LmZpbHRlcj1nb29nLk5BVElWRV9BUlJBWV9QUk9UT1RZUEVTJiYoZ29vZy5hcnJheS5BU1NVTUVfTkFUSVZFX0ZVTkNUSU9OU3x8QXJyYXkucHJvdG90eXBlLmZpbHRlcik/ZnVuY3Rpb24oYSxiLGMpe2dvb2cuYXNzZXJ0cy5hc3NlcnQobnVsbCE9YS5sZW5ndGgpO3JldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoYSxiLGMpfTpmdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPWEubGVuZ3RoLGU9W10sZj0wLGc9Z29vZy5pc1N0cmluZyhhKT9hLnNwbGl0KFwiXCIpOmEsaD0wO2g8ZDtoKyspaWYoaCBpbiBnKXt2YXIgaz1nW2hdO2IuY2FsbChjLGssaCxhKSYmKGVbZisrXT1rKX1yZXR1cm4gZX07XG5nb29nLmFycmF5Lm1hcD1nb29nLk5BVElWRV9BUlJBWV9QUk9UT1RZUEVTJiYoZ29vZy5hcnJheS5BU1NVTUVfTkFUSVZFX0ZVTkNUSU9OU3x8QXJyYXkucHJvdG90eXBlLm1hcCk/ZnVuY3Rpb24oYSxiLGMpe2dvb2cuYXNzZXJ0cy5hc3NlcnQobnVsbCE9YS5sZW5ndGgpO3JldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoYSxiLGMpfTpmdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPWEubGVuZ3RoLGU9QXJyYXkoZCksZj1nb29nLmlzU3RyaW5nKGEpP2Euc3BsaXQoXCJcIik6YSxnPTA7ZzxkO2crKylnIGluIGYmJihlW2ddPWIuY2FsbChjLGZbZ10sZyxhKSk7cmV0dXJuIGV9O1xuZ29vZy5hcnJheS5yZWR1Y2U9Z29vZy5OQVRJVkVfQVJSQVlfUFJPVE9UWVBFUyYmKGdvb2cuYXJyYXkuQVNTVU1FX05BVElWRV9GVU5DVElPTlN8fEFycmF5LnByb3RvdHlwZS5yZWR1Y2UpP2Z1bmN0aW9uKGEsYixjLGQpe2dvb2cuYXNzZXJ0cy5hc3NlcnQobnVsbCE9YS5sZW5ndGgpO2QmJihiPWdvb2cuYmluZChiLGQpKTtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnJlZHVjZS5jYWxsKGEsYixjKX06ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9Yztnb29nLmFycmF5LmZvckVhY2goYSxmdW5jdGlvbihjLGcpe2U9Yi5jYWxsKGQsZSxjLGcsYSl9KTtyZXR1cm4gZX07XG5nb29nLmFycmF5LnJlZHVjZVJpZ2h0PWdvb2cuTkFUSVZFX0FSUkFZX1BST1RPVFlQRVMmJihnb29nLmFycmF5LkFTU1VNRV9OQVRJVkVfRlVOQ1RJT05TfHxBcnJheS5wcm90b3R5cGUucmVkdWNlUmlnaHQpP2Z1bmN0aW9uKGEsYixjLGQpe2dvb2cuYXNzZXJ0cy5hc3NlcnQobnVsbCE9YS5sZW5ndGgpO2dvb2cuYXNzZXJ0cy5hc3NlcnQobnVsbCE9Yik7ZCYmKGI9Z29vZy5iaW5kKGIsZCkpO3JldHVybiBBcnJheS5wcm90b3R5cGUucmVkdWNlUmlnaHQuY2FsbChhLGIsYyl9OmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPWM7Z29vZy5hcnJheS5mb3JFYWNoUmlnaHQoYSxmdW5jdGlvbihjLGcpe2U9Yi5jYWxsKGQsZSxjLGcsYSl9KTtyZXR1cm4gZX07XG5nb29nLmFycmF5LnNvbWU9Z29vZy5OQVRJVkVfQVJSQVlfUFJPVE9UWVBFUyYmKGdvb2cuYXJyYXkuQVNTVU1FX05BVElWRV9GVU5DVElPTlN8fEFycmF5LnByb3RvdHlwZS5zb21lKT9mdW5jdGlvbihhLGIsYyl7Z29vZy5hc3NlcnRzLmFzc2VydChudWxsIT1hLmxlbmd0aCk7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zb21lLmNhbGwoYSxiLGMpfTpmdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPWEubGVuZ3RoLGU9Z29vZy5pc1N0cmluZyhhKT9hLnNwbGl0KFwiXCIpOmEsZj0wO2Y8ZDtmKyspaWYoZiBpbiBlJiZiLmNhbGwoYyxlW2ZdLGYsYSkpcmV0dXJuITA7cmV0dXJuITF9O1xuZ29vZy5hcnJheS5ldmVyeT1nb29nLk5BVElWRV9BUlJBWV9QUk9UT1RZUEVTJiYoZ29vZy5hcnJheS5BU1NVTUVfTkFUSVZFX0ZVTkNUSU9OU3x8QXJyYXkucHJvdG90eXBlLmV2ZXJ5KT9mdW5jdGlvbihhLGIsYyl7Z29vZy5hc3NlcnRzLmFzc2VydChudWxsIT1hLmxlbmd0aCk7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5ldmVyeS5jYWxsKGEsYixjKX06ZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZD1hLmxlbmd0aCxlPWdvb2cuaXNTdHJpbmcoYSk/YS5zcGxpdChcIlwiKTphLGY9MDtmPGQ7ZisrKWlmKGYgaW4gZSYmIWIuY2FsbChjLGVbZl0sZixhKSlyZXR1cm4hMTtyZXR1cm4hMH07Z29vZy5hcnJheS5jb3VudD1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9MDtnb29nLmFycmF5LmZvckVhY2goYSxmdW5jdGlvbihhLGYsZyl7Yi5jYWxsKGMsYSxmLGcpJiYrK2R9LGMpO3JldHVybiBkfTtcbmdvb2cuYXJyYXkuZmluZD1mdW5jdGlvbihhLGIsYyl7Yj1nb29nLmFycmF5LmZpbmRJbmRleChhLGIsYyk7cmV0dXJuIDA+Yj9udWxsOmdvb2cuaXNTdHJpbmcoYSk/YS5jaGFyQXQoYik6YVtiXX07Z29vZy5hcnJheS5maW5kSW5kZXg9ZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZD1hLmxlbmd0aCxlPWdvb2cuaXNTdHJpbmcoYSk/YS5zcGxpdChcIlwiKTphLGY9MDtmPGQ7ZisrKWlmKGYgaW4gZSYmYi5jYWxsKGMsZVtmXSxmLGEpKXJldHVybiBmO3JldHVybi0xfTtnb29nLmFycmF5LmZpbmRSaWdodD1mdW5jdGlvbihhLGIsYyl7Yj1nb29nLmFycmF5LmZpbmRJbmRleFJpZ2h0KGEsYixjKTtyZXR1cm4gMD5iP251bGw6Z29vZy5pc1N0cmluZyhhKT9hLmNoYXJBdChiKTphW2JdfTtcbmdvb2cuYXJyYXkuZmluZEluZGV4UmlnaHQ9ZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZD1hLmxlbmd0aCxlPWdvb2cuaXNTdHJpbmcoYSk/YS5zcGxpdChcIlwiKTphLGQ9ZC0xOzA8PWQ7ZC0tKWlmKGQgaW4gZSYmYi5jYWxsKGMsZVtkXSxkLGEpKXJldHVybiBkO3JldHVybi0xfTtnb29nLmFycmF5LmNvbnRhaW5zPWZ1bmN0aW9uKGEsYil7cmV0dXJuIDA8PWdvb2cuYXJyYXkuaW5kZXhPZihhLGIpfTtnb29nLmFycmF5LmlzRW1wdHk9ZnVuY3Rpb24oYSl7cmV0dXJuIDA9PWEubGVuZ3RofTtnb29nLmFycmF5LmNsZWFyPWZ1bmN0aW9uKGEpe2lmKCFnb29nLmlzQXJyYXkoYSkpZm9yKHZhciBiPWEubGVuZ3RoLTE7MDw9YjtiLS0pZGVsZXRlIGFbYl07YS5sZW5ndGg9MH07Z29vZy5hcnJheS5pbnNlcnQ9ZnVuY3Rpb24oYSxiKXtnb29nLmFycmF5LmNvbnRhaW5zKGEsYil8fGEucHVzaChiKX07XG5nb29nLmFycmF5Lmluc2VydEF0PWZ1bmN0aW9uKGEsYixjKXtnb29nLmFycmF5LnNwbGljZShhLGMsMCxiKX07Z29vZy5hcnJheS5pbnNlcnRBcnJheUF0PWZ1bmN0aW9uKGEsYixjKXtnb29nLnBhcnRpYWwoZ29vZy5hcnJheS5zcGxpY2UsYSxjLDApLmFwcGx5KG51bGwsYil9O2dvb2cuYXJyYXkuaW5zZXJ0QmVmb3JlPWZ1bmN0aW9uKGEsYixjKXt2YXIgZDsyPT1hcmd1bWVudHMubGVuZ3RofHwwPihkPWdvb2cuYXJyYXkuaW5kZXhPZihhLGMpKT9hLnB1c2goYik6Z29vZy5hcnJheS5pbnNlcnRBdChhLGIsZCl9O2dvb2cuYXJyYXkucmVtb3ZlPWZ1bmN0aW9uKGEsYil7dmFyIGM9Z29vZy5hcnJheS5pbmRleE9mKGEsYiksZDsoZD0wPD1jKSYmZ29vZy5hcnJheS5yZW1vdmVBdChhLGMpO3JldHVybiBkfTtcbmdvb2cuYXJyYXkucmVtb3ZlQXQ9ZnVuY3Rpb24oYSxiKXtnb29nLmFzc2VydHMuYXNzZXJ0KG51bGwhPWEubGVuZ3RoKTtyZXR1cm4gMT09QXJyYXkucHJvdG90eXBlLnNwbGljZS5jYWxsKGEsYiwxKS5sZW5ndGh9O2dvb2cuYXJyYXkucmVtb3ZlSWY9ZnVuY3Rpb24oYSxiLGMpe2I9Z29vZy5hcnJheS5maW5kSW5kZXgoYSxiLGMpO3JldHVybiAwPD1iPyhnb29nLmFycmF5LnJlbW92ZUF0KGEsYiksITApOiExfTtnb29nLmFycmF5LnJlbW92ZUFsbElmPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD0wO2dvb2cuYXJyYXkuZm9yRWFjaFJpZ2h0KGEsZnVuY3Rpb24oZSxmKXtiLmNhbGwoYyxlLGYsYSkmJmdvb2cuYXJyYXkucmVtb3ZlQXQoYSxmKSYmZCsrfSk7cmV0dXJuIGR9O2dvb2cuYXJyYXkuY29uY2F0PWZ1bmN0aW9uKGEpe3JldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KEFycmF5LnByb3RvdHlwZSxhcmd1bWVudHMpfTtcbmdvb2cuYXJyYXkuam9pbj1mdW5jdGlvbihhKXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShBcnJheS5wcm90b3R5cGUsYXJndW1lbnRzKX07Z29vZy5hcnJheS50b0FycmF5PWZ1bmN0aW9uKGEpe3ZhciBiPWEubGVuZ3RoO2lmKDA8Yil7Zm9yKHZhciBjPUFycmF5KGIpLGQ9MDtkPGI7ZCsrKWNbZF09YVtkXTtyZXR1cm4gY31yZXR1cm5bXX07Z29vZy5hcnJheS5jbG9uZT1nb29nLmFycmF5LnRvQXJyYXk7Z29vZy5hcnJheS5leHRlbmQ9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MTtjPGFyZ3VtZW50cy5sZW5ndGg7YysrKXt2YXIgZD1hcmd1bWVudHNbY107aWYoZ29vZy5pc0FycmF5TGlrZShkKSl7dmFyIGU9YS5sZW5ndGh8fDAsZj1kLmxlbmd0aHx8MDthLmxlbmd0aD1lK2Y7Zm9yKHZhciBnPTA7ZzxmO2crKylhW2UrZ109ZFtnXX1lbHNlIGEucHVzaChkKX19O1xuZ29vZy5hcnJheS5zcGxpY2U9ZnVuY3Rpb24oYSxiLGMsZCl7Z29vZy5hc3NlcnRzLmFzc2VydChudWxsIT1hLmxlbmd0aCk7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoYSxnb29nLmFycmF5LnNsaWNlKGFyZ3VtZW50cywxKSl9O2dvb2cuYXJyYXkuc2xpY2U9ZnVuY3Rpb24oYSxiLGMpe2dvb2cuYXNzZXJ0cy5hc3NlcnQobnVsbCE9YS5sZW5ndGgpO3JldHVybiAyPj1hcmd1bWVudHMubGVuZ3RoP0FycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGEsYik6QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYSxiLGMpfTtcbmdvb2cuYXJyYXkucmVtb3ZlRHVwbGljYXRlcz1mdW5jdGlvbihhLGIsYyl7Yj1ifHxhO3ZhciBkPWZ1bmN0aW9uKGEpe3JldHVybiBnb29nLmlzT2JqZWN0KGEpP1wib1wiK2dvb2cuZ2V0VWlkKGEpOih0eXBlb2YgYSkuY2hhckF0KDApK2F9O2M9Y3x8ZDtmb3IodmFyIGQ9e30sZT0wLGY9MDtmPGEubGVuZ3RoOyl7dmFyIGc9YVtmKytdLGg9YyhnKTtPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZCxoKXx8KGRbaF09ITAsYltlKytdPWcpfWIubGVuZ3RoPWV9O2dvb2cuYXJyYXkuYmluYXJ5U2VhcmNoPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gZ29vZy5hcnJheS5iaW5hcnlTZWFyY2hfKGEsY3x8Z29vZy5hcnJheS5kZWZhdWx0Q29tcGFyZSwhMSxiKX07Z29vZy5hcnJheS5iaW5hcnlTZWxlY3Q9ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBnb29nLmFycmF5LmJpbmFyeVNlYXJjaF8oYSxiLCEwLHZvaWQgMCxjKX07XG5nb29nLmFycmF5LmJpbmFyeVNlYXJjaF89ZnVuY3Rpb24oYSxiLGMsZCxlKXtmb3IodmFyIGY9MCxnPWEubGVuZ3RoLGg7ZjxnOyl7dmFyIGs9ZitnPj4xLGw7bD1jP2IuY2FsbChlLGFba10sayxhKTpiKGQsYVtrXSk7MDxsP2Y9aysxOihnPWssaD0hbCl9cmV0dXJuIGg/Zjp+Zn07Z29vZy5hcnJheS5zb3J0PWZ1bmN0aW9uKGEsYil7YS5zb3J0KGJ8fGdvb2cuYXJyYXkuZGVmYXVsdENvbXBhcmUpfTtnb29nLmFycmF5LnN0YWJsZVNvcnQ9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9MDtjPGEubGVuZ3RoO2MrKylhW2NdPXtpbmRleDpjLHZhbHVlOmFbY119O3ZhciBkPWJ8fGdvb2cuYXJyYXkuZGVmYXVsdENvbXBhcmU7Z29vZy5hcnJheS5zb3J0KGEsZnVuY3Rpb24oYSxiKXtyZXR1cm4gZChhLnZhbHVlLGIudmFsdWUpfHxhLmluZGV4LWIuaW5kZXh9KTtmb3IoYz0wO2M8YS5sZW5ndGg7YysrKWFbY109YVtjXS52YWx1ZX07XG5nb29nLmFycmF5LnNvcnRCeUtleT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9Y3x8Z29vZy5hcnJheS5kZWZhdWx0Q29tcGFyZTtnb29nLmFycmF5LnNvcnQoYSxmdW5jdGlvbihhLGMpe3JldHVybiBkKGIoYSksYihjKSl9KX07Z29vZy5hcnJheS5zb3J0T2JqZWN0c0J5S2V5PWZ1bmN0aW9uKGEsYixjKXtnb29nLmFycmF5LnNvcnRCeUtleShhLGZ1bmN0aW9uKGEpe3JldHVybiBhW2JdfSxjKX07Z29vZy5hcnJheS5pc1NvcnRlZD1mdW5jdGlvbihhLGIsYyl7Yj1ifHxnb29nLmFycmF5LmRlZmF1bHRDb21wYXJlO2Zvcih2YXIgZD0xO2Q8YS5sZW5ndGg7ZCsrKXt2YXIgZT1iKGFbZC0xXSxhW2RdKTtpZigwPGV8fDA9PWUmJmMpcmV0dXJuITF9cmV0dXJuITB9O1xuZ29vZy5hcnJheS5lcXVhbHM9ZnVuY3Rpb24oYSxiLGMpe2lmKCFnb29nLmlzQXJyYXlMaWtlKGEpfHwhZ29vZy5pc0FycmF5TGlrZShiKXx8YS5sZW5ndGghPWIubGVuZ3RoKXJldHVybiExO3ZhciBkPWEubGVuZ3RoO2M9Y3x8Z29vZy5hcnJheS5kZWZhdWx0Q29tcGFyZUVxdWFsaXR5O2Zvcih2YXIgZT0wO2U8ZDtlKyspaWYoIWMoYVtlXSxiW2VdKSlyZXR1cm4hMTtyZXR1cm4hMH07Z29vZy5hcnJheS5jb21wYXJlMz1mdW5jdGlvbihhLGIsYyl7Yz1jfHxnb29nLmFycmF5LmRlZmF1bHRDb21wYXJlO2Zvcih2YXIgZD1NYXRoLm1pbihhLmxlbmd0aCxiLmxlbmd0aCksZT0wO2U8ZDtlKyspe3ZhciBmPWMoYVtlXSxiW2VdKTtpZigwIT1mKXJldHVybiBmfXJldHVybiBnb29nLmFycmF5LmRlZmF1bHRDb21wYXJlKGEubGVuZ3RoLGIubGVuZ3RoKX07Z29vZy5hcnJheS5kZWZhdWx0Q29tcGFyZT1mdW5jdGlvbihhLGIpe3JldHVybiBhPmI/MTphPGI/LTE6MH07XG5nb29nLmFycmF5LmludmVyc2VEZWZhdWx0Q29tcGFyZT1mdW5jdGlvbihhLGIpe3JldHVybi1nb29nLmFycmF5LmRlZmF1bHRDb21wYXJlKGEsYil9O2dvb2cuYXJyYXkuZGVmYXVsdENvbXBhcmVFcXVhbGl0eT1mdW5jdGlvbihhLGIpe3JldHVybiBhPT09Yn07Z29vZy5hcnJheS5iaW5hcnlJbnNlcnQ9ZnVuY3Rpb24oYSxiLGMpe2M9Z29vZy5hcnJheS5iaW5hcnlTZWFyY2goYSxiLGMpO3JldHVybiAwPmM/KGdvb2cuYXJyYXkuaW5zZXJ0QXQoYSxiLC0oYysxKSksITApOiExfTtnb29nLmFycmF5LmJpbmFyeVJlbW92ZT1mdW5jdGlvbihhLGIsYyl7Yj1nb29nLmFycmF5LmJpbmFyeVNlYXJjaChhLGIsYyk7cmV0dXJuIDA8PWI/Z29vZy5hcnJheS5yZW1vdmVBdChhLGIpOiExfTtcbmdvb2cuYXJyYXkuYnVja2V0PWZ1bmN0aW9uKGEsYixjKXtmb3IodmFyIGQ9e30sZT0wO2U8YS5sZW5ndGg7ZSsrKXt2YXIgZj1hW2VdLGc9Yi5jYWxsKGMsZixlLGEpO2dvb2cuaXNEZWYoZykmJihkW2ddfHwoZFtnXT1bXSkpLnB1c2goZil9cmV0dXJuIGR9O2dvb2cuYXJyYXkudG9PYmplY3Q9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXt9O2dvb2cuYXJyYXkuZm9yRWFjaChhLGZ1bmN0aW9uKGUsZil7ZFtiLmNhbGwoYyxlLGYsYSldPWV9KTtyZXR1cm4gZH07Z29vZy5hcnJheS5yYW5nZT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9W10sZT0wLGY9YTtjPWN8fDE7dm9pZCAwIT09YiYmKGU9YSxmPWIpO2lmKDA+YyooZi1lKSlyZXR1cm5bXTtpZigwPGMpZm9yKGE9ZTthPGY7YSs9YylkLnB1c2goYSk7ZWxzZSBmb3IoYT1lO2E+ZjthKz1jKWQucHVzaChhKTtyZXR1cm4gZH07XG5nb29nLmFycmF5LnJlcGVhdD1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz1bXSxkPTA7ZDxiO2QrKyljW2RdPWE7cmV0dXJuIGN9O2dvb2cuYXJyYXkuZmxhdHRlbj1mdW5jdGlvbihhKXtmb3IodmFyIGI9W10sYz0wO2M8YXJndW1lbnRzLmxlbmd0aDtjKyspe3ZhciBkPWFyZ3VtZW50c1tjXTtpZihnb29nLmlzQXJyYXkoZCkpZm9yKHZhciBlPTA7ZTxkLmxlbmd0aDtlKz04MTkyKWZvcih2YXIgZj1nb29nLmFycmF5LnNsaWNlKGQsZSxlKzgxOTIpLGY9Z29vZy5hcnJheS5mbGF0dGVuLmFwcGx5KG51bGwsZiksZz0wO2c8Zi5sZW5ndGg7ZysrKWIucHVzaChmW2ddKTtlbHNlIGIucHVzaChkKX1yZXR1cm4gYn07XG5nb29nLmFycmF5LnJvdGF0ZT1mdW5jdGlvbihhLGIpe2dvb2cuYXNzZXJ0cy5hc3NlcnQobnVsbCE9YS5sZW5ndGgpO2EubGVuZ3RoJiYoYiU9YS5sZW5ndGgsMDxiP0FycmF5LnByb3RvdHlwZS51bnNoaWZ0LmFwcGx5KGEsYS5zcGxpY2UoLWIsYikpOjA+YiYmQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoYSxhLnNwbGljZSgwLC1iKSkpO3JldHVybiBhfTtnb29nLmFycmF5Lm1vdmVJdGVtPWZ1bmN0aW9uKGEsYixjKXtnb29nLmFzc2VydHMuYXNzZXJ0KDA8PWImJmI8YS5sZW5ndGgpO2dvb2cuYXNzZXJ0cy5hc3NlcnQoMDw9YyYmYzxhLmxlbmd0aCk7Yj1BcnJheS5wcm90b3R5cGUuc3BsaWNlLmNhbGwoYSxiLDEpO0FycmF5LnByb3RvdHlwZS5zcGxpY2UuY2FsbChhLGMsMCxiWzBdKX07XG5nb29nLmFycmF5LnppcD1mdW5jdGlvbihhKXtpZighYXJndW1lbnRzLmxlbmd0aClyZXR1cm5bXTtmb3IodmFyIGI9W10sYz1hcmd1bWVudHNbMF0ubGVuZ3RoLGQ9MTtkPGFyZ3VtZW50cy5sZW5ndGg7ZCsrKWFyZ3VtZW50c1tkXS5sZW5ndGg8YyYmKGM9YXJndW1lbnRzW2RdLmxlbmd0aCk7Zm9yKGQ9MDtkPGM7ZCsrKXtmb3IodmFyIGU9W10sZj0wO2Y8YXJndW1lbnRzLmxlbmd0aDtmKyspZS5wdXNoKGFyZ3VtZW50c1tmXVtkXSk7Yi5wdXNoKGUpfXJldHVybiBifTtnb29nLmFycmF5LnNodWZmbGU9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9Ynx8TWF0aC5yYW5kb20sZD1hLmxlbmd0aC0xOzA8ZDtkLS0pe3ZhciBlPU1hdGguZmxvb3IoYygpKihkKzEpKSxmPWFbZF07YVtkXT1hW2VdO2FbZV09Zn19O2dvb2cuYXJyYXkuY29weUJ5SW5kZXg9ZnVuY3Rpb24oYSxiKXt2YXIgYz1bXTtnb29nLmFycmF5LmZvckVhY2goYixmdW5jdGlvbihiKXtjLnB1c2goYVtiXSl9KTtyZXR1cm4gY307anNwYi5CaW5hcnlDb25zdGFudHM9e307anNwYi5Db25zdEJpbmFyeU1lc3NhZ2U9ZnVuY3Rpb24oKXt9O2pzcGIuQmluYXJ5TWVzc2FnZT1mdW5jdGlvbigpe307anNwYi5CaW5hcnlDb25zdGFudHMuRmllbGRUeXBlPXtJTlZBTElEOi0xLERPVUJMRToxLEZMT0FUOjIsSU5UNjQ6MyxVSU5UNjQ6NCxJTlQzMjo1LEZJWEVENjQ6NixGSVhFRDMyOjcsQk9PTDo4LFNUUklORzo5LEdST1VQOjEwLE1FU1NBR0U6MTEsQllURVM6MTIsVUlOVDMyOjEzLEVOVU06MTQsU0ZJWEVEMzI6MTUsU0ZJWEVENjQ6MTYsU0lOVDMyOjE3LFNJTlQ2NDoxOCxGSEFTSDY0OjMwLFZIQVNINjQ6MzF9O2pzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlPXtJTlZBTElEOi0xLFZBUklOVDowLEZJWEVENjQ6MSxERUxJTUlURUQ6MixTVEFSVF9HUk9VUDozLEVORF9HUk9VUDo0LEZJWEVEMzI6NX07XG5qc3BiLkJpbmFyeUNvbnN0YW50cy5GaWVsZFR5cGVUb1dpcmVUeXBlPWZ1bmN0aW9uKGEpe3ZhciBiPWpzcGIuQmluYXJ5Q29uc3RhbnRzLkZpZWxkVHlwZSxjPWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlO3N3aXRjaChhKXtjYXNlIGIuSU5UMzI6Y2FzZSBiLklOVDY0OmNhc2UgYi5VSU5UMzI6Y2FzZSBiLlVJTlQ2NDpjYXNlIGIuU0lOVDMyOmNhc2UgYi5TSU5UNjQ6Y2FzZSBiLkJPT0w6Y2FzZSBiLkVOVU06Y2FzZSBiLlZIQVNINjQ6cmV0dXJuIGMuVkFSSU5UO2Nhc2UgYi5ET1VCTEU6Y2FzZSBiLkZJWEVENjQ6Y2FzZSBiLlNGSVhFRDY0OmNhc2UgYi5GSEFTSDY0OnJldHVybiBjLkZJWEVENjQ7Y2FzZSBiLlNUUklORzpjYXNlIGIuTUVTU0FHRTpjYXNlIGIuQllURVM6cmV0dXJuIGMuREVMSU1JVEVEO2Nhc2UgYi5GTE9BVDpjYXNlIGIuRklYRUQzMjpjYXNlIGIuU0ZJWEVEMzI6cmV0dXJuIGMuRklYRUQzMjtkZWZhdWx0OnJldHVybiBjLklOVkFMSUR9fTtcbmpzcGIuQmluYXJ5Q29uc3RhbnRzLklOVkFMSURfRklFTERfTlVNQkVSPS0xO2pzcGIuQmluYXJ5Q29uc3RhbnRzLkZMT0FUMzJfRVBTPTEuNDAxMjk4NDY0MzI0ODE3RS00NTtqc3BiLkJpbmFyeUNvbnN0YW50cy5GTE9BVDMyX01JTj0xLjE3NTQ5NDM1MDgyMjI4NzVFLTM4O2pzcGIuQmluYXJ5Q29uc3RhbnRzLkZMT0FUMzJfTUFYPTMuNDAyODIzNDY2Mzg1Mjg4NkUzODtqc3BiLkJpbmFyeUNvbnN0YW50cy5GTE9BVDY0X0VQUz00LjlFLTMyNDtqc3BiLkJpbmFyeUNvbnN0YW50cy5GTE9BVDY0X01JTj0yLjIyNTA3Mzg1ODUwNzIwMTRFLTMwODtqc3BiLkJpbmFyeUNvbnN0YW50cy5GTE9BVDY0X01BWD0xLjc5NzY5MzEzNDg2MjMxNTdFMzA4O2pzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18yMD0xMDQ4NTc2O2pzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18yMz04Mzg4NjA4O2pzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMT0yMTQ3NDgzNjQ4O1xuanNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMyPTQyOTQ5NjcyOTY7anNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzUyPTQ1MDM1OTk2MjczNzA0OTY7anNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzYzPTB4N2ZmZmZmZmZmZmZmZmZmZjtqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fNjQ9MS44NDQ2NzQ0MDczNzA5NTUyRTE5O2pzcGIuQmluYXJ5Q29uc3RhbnRzLlpFUk9fSEFTSD1cIlxceDAwXFx4MDBcXHgwMFxceDAwXFx4MDBcXHgwMFxceDAwXFx4MDBcIjtnb29nLmNyeXB0PXt9O2dvb2cuY3J5cHQuc3RyaW5nVG9CeXRlQXJyYXk9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPVtdLGM9MCxkPTA7ZDxhLmxlbmd0aDtkKyspe2Zvcih2YXIgZT1hLmNoYXJDb2RlQXQoZCk7MjU1PGU7KWJbYysrXT1lJjI1NSxlPj49ODtiW2MrK109ZX1yZXR1cm4gYn07Z29vZy5jcnlwdC5ieXRlQXJyYXlUb1N0cmluZz1mdW5jdGlvbihhKXtpZig4MTkyPj1hLmxlbmd0aClyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGEpO2Zvcih2YXIgYj1cIlwiLGM9MDtjPGEubGVuZ3RoO2MrPTgxOTIpdmFyIGQ9Z29vZy5hcnJheS5zbGljZShhLGMsYys4MTkyKSxiPWIrU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGQpO3JldHVybiBifTtnb29nLmNyeXB0LmJ5dGVBcnJheVRvSGV4PWZ1bmN0aW9uKGEpe3JldHVybiBnb29nLmFycmF5Lm1hcChhLGZ1bmN0aW9uKGEpe2E9YS50b1N0cmluZygxNik7cmV0dXJuIDE8YS5sZW5ndGg/YTpcIjBcIithfSkuam9pbihcIlwiKX07XG5nb29nLmNyeXB0LmhleFRvQnl0ZUFycmF5PWZ1bmN0aW9uKGEpe2dvb2cuYXNzZXJ0cy5hc3NlcnQoMD09YS5sZW5ndGglMixcIktleSBzdHJpbmcgbGVuZ3RoIG11c3QgYmUgbXVsdGlwbGUgb2YgMlwiKTtmb3IodmFyIGI9W10sYz0wO2M8YS5sZW5ndGg7Yys9MiliLnB1c2gocGFyc2VJbnQoYS5zdWJzdHJpbmcoYyxjKzIpLDE2KSk7cmV0dXJuIGJ9O1xuZ29vZy5jcnlwdC5zdHJpbmdUb1V0ZjhCeXRlQXJyYXk9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPVtdLGM9MCxkPTA7ZDxhLmxlbmd0aDtkKyspe3ZhciBlPWEuY2hhckNvZGVBdChkKTsxMjg+ZT9iW2MrK109ZTooMjA0OD5lP2JbYysrXT1lPj42fDE5MjooNTUyOTY9PShlJjY0NTEyKSYmZCsxPGEubGVuZ3RoJiY1NjMyMD09KGEuY2hhckNvZGVBdChkKzEpJjY0NTEyKT8oZT02NTUzNisoKGUmMTAyMyk8PDEwKSsoYS5jaGFyQ29kZUF0KCsrZCkmMTAyMyksYltjKytdPWU+PjE4fDI0MCxiW2MrK109ZT4+MTImNjN8MTI4KTpiW2MrK109ZT4+MTJ8MjI0LGJbYysrXT1lPj42JjYzfDEyOCksYltjKytdPWUmNjN8MTI4KX1yZXR1cm4gYn07XG5nb29nLmNyeXB0LnV0ZjhCeXRlQXJyYXlUb1N0cmluZz1mdW5jdGlvbihhKXtmb3IodmFyIGI9W10sYz0wLGQ9MDtjPGEubGVuZ3RoOyl7dmFyIGU9YVtjKytdO2lmKDEyOD5lKWJbZCsrXT1TdHJpbmcuZnJvbUNoYXJDb2RlKGUpO2Vsc2UgaWYoMTkxPGUmJjIyND5lKXt2YXIgZj1hW2MrK107YltkKytdPVN0cmluZy5mcm9tQ2hhckNvZGUoKGUmMzEpPDw2fGYmNjMpfWVsc2UgaWYoMjM5PGUmJjM2NT5lKXt2YXIgZj1hW2MrK10sZz1hW2MrK10saD1hW2MrK10sZT0oKGUmNyk8PDE4fChmJjYzKTw8MTJ8KGcmNjMpPDw2fGgmNjMpLTY1NTM2O2JbZCsrXT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2KyhlPj4xMCkpO2JbZCsrXT1TdHJpbmcuZnJvbUNoYXJDb2RlKDU2MzIwKyhlJjEwMjMpKX1lbHNlIGY9YVtjKytdLGc9YVtjKytdLGJbZCsrXT1TdHJpbmcuZnJvbUNoYXJDb2RlKChlJjE1KTw8MTJ8KGYmNjMpPDw2fGcmNjMpfXJldHVybiBiLmpvaW4oXCJcIil9O1xuZ29vZy5jcnlwdC54b3JCeXRlQXJyYXk9ZnVuY3Rpb24oYSxiKXtnb29nLmFzc2VydHMuYXNzZXJ0KGEubGVuZ3RoPT1iLmxlbmd0aCxcIlhPUiBhcnJheSBsZW5ndGhzIG11c3QgbWF0Y2hcIik7Zm9yKHZhciBjPVtdLGQ9MDtkPGEubGVuZ3RoO2QrKyljLnB1c2goYVtkXV5iW2RdKTtyZXR1cm4gY307Z29vZy5sYWJzPXt9O2dvb2cubGFicy51c2VyQWdlbnQ9e307Z29vZy5sYWJzLnVzZXJBZ2VudC51dGlsPXt9O2dvb2cubGFicy51c2VyQWdlbnQudXRpbC5nZXROYXRpdmVVc2VyQWdlbnRTdHJpbmdfPWZ1bmN0aW9uKCl7dmFyIGE9Z29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLmdldE5hdmlnYXRvcl8oKTtyZXR1cm4gYSYmKGE9YS51c2VyQWdlbnQpP2E6XCJcIn07Z29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLmdldE5hdmlnYXRvcl89ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5nbG9iYWwubmF2aWdhdG9yfTtnb29nLmxhYnMudXNlckFnZW50LnV0aWwudXNlckFnZW50Xz1nb29nLmxhYnMudXNlckFnZW50LnV0aWwuZ2V0TmF0aXZlVXNlckFnZW50U3RyaW5nXygpO2dvb2cubGFicy51c2VyQWdlbnQudXRpbC5zZXRVc2VyQWdlbnQ9ZnVuY3Rpb24oYSl7Z29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLnVzZXJBZ2VudF89YXx8Z29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLmdldE5hdGl2ZVVzZXJBZ2VudFN0cmluZ18oKX07XG5nb29nLmxhYnMudXNlckFnZW50LnV0aWwuZ2V0VXNlckFnZW50PWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQudXRpbC51c2VyQWdlbnRffTtnb29nLmxhYnMudXNlckFnZW50LnV0aWwubWF0Y2hVc2VyQWdlbnQ9ZnVuY3Rpb24oYSl7dmFyIGI9Z29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLmdldFVzZXJBZ2VudCgpO3JldHVybiBnb29nLnN0cmluZy5jb250YWlucyhiLGEpfTtnb29nLmxhYnMudXNlckFnZW50LnV0aWwubWF0Y2hVc2VyQWdlbnRJZ25vcmVDYXNlPWZ1bmN0aW9uKGEpe3ZhciBiPWdvb2cubGFicy51c2VyQWdlbnQudXRpbC5nZXRVc2VyQWdlbnQoKTtyZXR1cm4gZ29vZy5zdHJpbmcuY2FzZUluc2Vuc2l0aXZlQ29udGFpbnMoYixhKX07XG5nb29nLmxhYnMudXNlckFnZW50LnV0aWwuZXh0cmFjdFZlcnNpb25UdXBsZXM9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPVJlZ0V4cChcIihcXFxcd1tcXFxcdyBdKykvKFteXFxcXHNdKylcXFxccyooPzpcXFxcKCguKj8pXFxcXCkpP1wiLFwiZ1wiKSxjPVtdLGQ7ZD1iLmV4ZWMoYSk7KWMucHVzaChbZFsxXSxkWzJdLGRbM118fHZvaWQgMF0pO3JldHVybiBjfTtnb29nLmxhYnMudXNlckFnZW50LnBsYXRmb3JtPXt9O2dvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNBbmRyb2lkPWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcIkFuZHJvaWRcIil9O2dvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNJcG9kPWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcImlQb2RcIil9O2dvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNJcGhvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiaVBob25lXCIpJiYhZ29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiaVBvZFwiKSYmIWdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcImlQYWRcIil9O2dvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNJcGFkPWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcImlQYWRcIil9O1xuZ29vZy5sYWJzLnVzZXJBZ2VudC5wbGF0Zm9ybS5pc0lvcz1mdW5jdGlvbigpe3JldHVybiBnb29nLmxhYnMudXNlckFnZW50LnBsYXRmb3JtLmlzSXBob25lKCl8fGdvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNJcGFkKCl8fGdvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNJcG9kKCl9O2dvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNNYWNpbnRvc2g9ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiTWFjaW50b3NoXCIpfTtnb29nLmxhYnMudXNlckFnZW50LnBsYXRmb3JtLmlzTGludXg9ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiTGludXhcIil9O2dvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNXaW5kb3dzPWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcIldpbmRvd3NcIil9O1xuZ29vZy5sYWJzLnVzZXJBZ2VudC5wbGF0Zm9ybS5pc0Nocm9tZU9TPWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcIkNyT1NcIil9O1xuZ29vZy5sYWJzLnVzZXJBZ2VudC5wbGF0Zm9ybS5nZXRWZXJzaW9uPWZ1bmN0aW9uKCl7dmFyIGE9Z29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLmdldFVzZXJBZ2VudCgpLGI9XCJcIjtnb29nLmxhYnMudXNlckFnZW50LnBsYXRmb3JtLmlzV2luZG93cygpPyhiPS9XaW5kb3dzICg/Ok5UfFBob25lKSAoWzAtOS5dKykvLGI9KGE9Yi5leGVjKGEpKT9hWzFdOlwiMC4wXCIpOmdvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNJb3MoKT8oYj0vKD86aVBob25lfGlQb2R8aVBhZHxDUFUpXFxzK09TXFxzKyhcXFMrKS8sYj0oYT1iLmV4ZWMoYSkpJiZhWzFdLnJlcGxhY2UoL18vZyxcIi5cIikpOmdvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNNYWNpbnRvc2goKT8oYj0vTWFjIE9TIFggKFswLTlfLl0rKS8sYj0oYT1iLmV4ZWMoYSkpP2FbMV0ucmVwbGFjZSgvXy9nLFwiLlwiKTpcIjEwXCIpOmdvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNBbmRyb2lkKCk/KGI9L0FuZHJvaWRcXHMrKFteXFwpO10rKShcXCl8OykvLFxuYj0oYT1iLmV4ZWMoYSkpJiZhWzFdKTpnb29nLmxhYnMudXNlckFnZW50LnBsYXRmb3JtLmlzQ2hyb21lT1MoKSYmKGI9Lyg/OkNyT1NcXHMrKD86aTY4Nnx4ODZfNjQpXFxzKyhbMC05Ll0rKSkvLGI9KGE9Yi5leGVjKGEpKSYmYVsxXSk7cmV0dXJuIGJ8fFwiXCJ9O2dvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNWZXJzaW9uT3JIaWdoZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIDA8PWdvb2cuc3RyaW5nLmNvbXBhcmVWZXJzaW9ucyhnb29nLmxhYnMudXNlckFnZW50LnBsYXRmb3JtLmdldFZlcnNpb24oKSxhKX07Z29vZy5vYmplY3Q9e307Z29vZy5vYmplY3QuZm9yRWFjaD1mdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkIGluIGEpYi5jYWxsKGMsYVtkXSxkLGEpfTtnb29nLm9iamVjdC5maWx0ZXI9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXt9LGU7Zm9yKGUgaW4gYSliLmNhbGwoYyxhW2VdLGUsYSkmJihkW2VdPWFbZV0pO3JldHVybiBkfTtnb29nLm9iamVjdC5tYXA9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXt9LGU7Zm9yKGUgaW4gYSlkW2VdPWIuY2FsbChjLGFbZV0sZSxhKTtyZXR1cm4gZH07Z29vZy5vYmplY3Quc29tZT1mdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkIGluIGEpaWYoYi5jYWxsKGMsYVtkXSxkLGEpKXJldHVybiEwO3JldHVybiExfTtnb29nLm9iamVjdC5ldmVyeT1mdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkIGluIGEpaWYoIWIuY2FsbChjLGFbZF0sZCxhKSlyZXR1cm4hMTtyZXR1cm4hMH07XG5nb29nLm9iamVjdC5nZXRDb3VudD1mdW5jdGlvbihhKXt2YXIgYj0wLGM7Zm9yKGMgaW4gYSliKys7cmV0dXJuIGJ9O2dvb2cub2JqZWN0LmdldEFueUtleT1mdW5jdGlvbihhKXtmb3IodmFyIGIgaW4gYSlyZXR1cm4gYn07Z29vZy5vYmplY3QuZ2V0QW55VmFsdWU9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiIGluIGEpcmV0dXJuIGFbYl19O2dvb2cub2JqZWN0LmNvbnRhaW5zPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGdvb2cub2JqZWN0LmNvbnRhaW5zVmFsdWUoYSxiKX07Z29vZy5vYmplY3QuZ2V0VmFsdWVzPWZ1bmN0aW9uKGEpe3ZhciBiPVtdLGM9MCxkO2ZvcihkIGluIGEpYltjKytdPWFbZF07cmV0dXJuIGJ9O2dvb2cub2JqZWN0LmdldEtleXM9ZnVuY3Rpb24oYSl7dmFyIGI9W10sYz0wLGQ7Zm9yKGQgaW4gYSliW2MrK109ZDtyZXR1cm4gYn07XG5nb29nLm9iamVjdC5nZXRWYWx1ZUJ5S2V5cz1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz1nb29nLmlzQXJyYXlMaWtlKGIpLGQ9Yz9iOmFyZ3VtZW50cyxjPWM/MDoxO2M8ZC5sZW5ndGgmJihhPWFbZFtjXV0sZ29vZy5pc0RlZihhKSk7YysrKTtyZXR1cm4gYX07Z29vZy5vYmplY3QuY29udGFpbnNLZXk9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbnVsbCE9PWEmJmIgaW4gYX07Z29vZy5vYmplY3QuY29udGFpbnNWYWx1ZT1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYyBpbiBhKWlmKGFbY109PWIpcmV0dXJuITA7cmV0dXJuITF9O2dvb2cub2JqZWN0LmZpbmRLZXk9ZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZCBpbiBhKWlmKGIuY2FsbChjLGFbZF0sZCxhKSlyZXR1cm4gZH07Z29vZy5vYmplY3QuZmluZFZhbHVlPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4oYj1nb29nLm9iamVjdC5maW5kS2V5KGEsYixjKSkmJmFbYl19O1xuZ29vZy5vYmplY3QuaXNFbXB0eT1mdW5jdGlvbihhKXtmb3IodmFyIGIgaW4gYSlyZXR1cm4hMTtyZXR1cm4hMH07Z29vZy5vYmplY3QuY2xlYXI9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiIGluIGEpZGVsZXRlIGFbYl19O2dvb2cub2JqZWN0LnJlbW92ZT1mdW5jdGlvbihhLGIpe3ZhciBjOyhjPWIgaW4gYSkmJmRlbGV0ZSBhW2JdO3JldHVybiBjfTtnb29nLm9iamVjdC5hZGQ9ZnVuY3Rpb24oYSxiLGMpe2lmKG51bGwhPT1hJiZiIGluIGEpdGhyb3cgRXJyb3IoJ1RoZSBvYmplY3QgYWxyZWFkeSBjb250YWlucyB0aGUga2V5IFwiJytiKydcIicpO2dvb2cub2JqZWN0LnNldChhLGIsYyl9O2dvb2cub2JqZWN0LmdldD1mdW5jdGlvbihhLGIsYyl7cmV0dXJuIG51bGwhPT1hJiZiIGluIGE/YVtiXTpjfTtnb29nLm9iamVjdC5zZXQ9ZnVuY3Rpb24oYSxiLGMpe2FbYl09Y307XG5nb29nLm9iamVjdC5zZXRJZlVuZGVmaW5lZD1mdW5jdGlvbihhLGIsYyl7cmV0dXJuIGIgaW4gYT9hW2JdOmFbYl09Y307Z29vZy5vYmplY3Quc2V0V2l0aFJldHVyblZhbHVlSWZOb3RTZXQ9ZnVuY3Rpb24oYSxiLGMpe2lmKGIgaW4gYSlyZXR1cm4gYVtiXTtjPWMoKTtyZXR1cm4gYVtiXT1jfTtnb29nLm9iamVjdC5lcXVhbHM9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGMgaW4gYSlpZighKGMgaW4gYil8fGFbY10hPT1iW2NdKXJldHVybiExO2ZvcihjIGluIGIpaWYoIShjIGluIGEpKXJldHVybiExO3JldHVybiEwfTtnb29nLm9iamVjdC5jbG9uZT1mdW5jdGlvbihhKXt2YXIgYj17fSxjO2ZvcihjIGluIGEpYltjXT1hW2NdO3JldHVybiBifTtcbmdvb2cub2JqZWN0LnVuc2FmZUNsb25lPWZ1bmN0aW9uKGEpe3ZhciBiPWdvb2cudHlwZU9mKGEpO2lmKFwib2JqZWN0XCI9PWJ8fFwiYXJyYXlcIj09Yil7aWYoZ29vZy5pc0Z1bmN0aW9uKGEuY2xvbmUpKXJldHVybiBhLmNsb25lKCk7dmFyIGI9XCJhcnJheVwiPT1iP1tdOnt9LGM7Zm9yKGMgaW4gYSliW2NdPWdvb2cub2JqZWN0LnVuc2FmZUNsb25lKGFbY10pO3JldHVybiBifXJldHVybiBhfTtnb29nLm9iamVjdC50cmFuc3Bvc2U9ZnVuY3Rpb24oYSl7dmFyIGI9e30sYztmb3IoYyBpbiBhKWJbYVtjXV09YztyZXR1cm4gYn07Z29vZy5vYmplY3QuUFJPVE9UWVBFX0ZJRUxEU189XCJjb25zdHJ1Y3RvciBoYXNPd25Qcm9wZXJ0eSBpc1Byb3RvdHlwZU9mIHByb3BlcnR5SXNFbnVtZXJhYmxlIHRvTG9jYWxlU3RyaW5nIHRvU3RyaW5nIHZhbHVlT2ZcIi5zcGxpdChcIiBcIik7XG5nb29nLm9iamVjdC5leHRlbmQ9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGMsZCxlPTE7ZTxhcmd1bWVudHMubGVuZ3RoO2UrKyl7ZD1hcmd1bWVudHNbZV07Zm9yKGMgaW4gZClhW2NdPWRbY107Zm9yKHZhciBmPTA7Zjxnb29nLm9iamVjdC5QUk9UT1RZUEVfRklFTERTXy5sZW5ndGg7ZisrKWM9Z29vZy5vYmplY3QuUFJPVE9UWVBFX0ZJRUxEU19bZl0sT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGQsYykmJihhW2NdPWRbY10pfX07XG5nb29nLm9iamVjdC5jcmVhdGU9ZnVuY3Rpb24oYSl7dmFyIGI9YXJndW1lbnRzLmxlbmd0aDtpZigxPT1iJiZnb29nLmlzQXJyYXkoYXJndW1lbnRzWzBdKSlyZXR1cm4gZ29vZy5vYmplY3QuY3JlYXRlLmFwcGx5KG51bGwsYXJndW1lbnRzWzBdKTtpZihiJTIpdGhyb3cgRXJyb3IoXCJVbmV2ZW4gbnVtYmVyIG9mIGFyZ3VtZW50c1wiKTtmb3IodmFyIGM9e30sZD0wO2Q8YjtkKz0yKWNbYXJndW1lbnRzW2RdXT1hcmd1bWVudHNbZCsxXTtyZXR1cm4gY307Z29vZy5vYmplY3QuY3JlYXRlU2V0PWZ1bmN0aW9uKGEpe3ZhciBiPWFyZ3VtZW50cy5sZW5ndGg7aWYoMT09YiYmZ29vZy5pc0FycmF5KGFyZ3VtZW50c1swXSkpcmV0dXJuIGdvb2cub2JqZWN0LmNyZWF0ZVNldC5hcHBseShudWxsLGFyZ3VtZW50c1swXSk7Zm9yKHZhciBjPXt9LGQ9MDtkPGI7ZCsrKWNbYXJndW1lbnRzW2RdXT0hMDtyZXR1cm4gY307XG5nb29nLm9iamVjdC5jcmVhdGVJbW11dGFibGVWaWV3PWZ1bmN0aW9uKGEpe3ZhciBiPWE7T2JqZWN0LmlzRnJvemVuJiYhT2JqZWN0LmlzRnJvemVuKGEpJiYoYj1PYmplY3QuY3JlYXRlKGEpLE9iamVjdC5mcmVlemUoYikpO3JldHVybiBifTtnb29nLm9iamVjdC5pc0ltbXV0YWJsZVZpZXc9ZnVuY3Rpb24oYSl7cmV0dXJuISFPYmplY3QuaXNGcm96ZW4mJk9iamVjdC5pc0Zyb3plbihhKX07Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyPXt9O2dvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5tYXRjaE9wZXJhXz1mdW5jdGlvbigpe3JldHVybiBnb29nLmxhYnMudXNlckFnZW50LnV0aWwubWF0Y2hVc2VyQWdlbnQoXCJPcGVyYVwiKXx8Z29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiT1BSXCIpfTtnb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hJRV89ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiVHJpZGVudFwiKXx8Z29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiTVNJRVwiKX07Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLm1hdGNoRWRnZV89ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiRWRnZVwiKX07Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLm1hdGNoRmlyZWZveF89ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiRmlyZWZveFwiKX07XG5nb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hTYWZhcmlfPWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcIlNhZmFyaVwiKSYmIShnb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hDaHJvbWVfKCl8fGdvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5tYXRjaENvYXN0XygpfHxnb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hPcGVyYV8oKXx8Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLm1hdGNoRWRnZV8oKXx8Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzU2lsaygpfHxnb29nLmxhYnMudXNlckFnZW50LnV0aWwubWF0Y2hVc2VyQWdlbnQoXCJBbmRyb2lkXCIpKX07Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLm1hdGNoQ29hc3RfPWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcIkNvYXN0XCIpfTtcbmdvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5tYXRjaElvc1dlYnZpZXdfPWZ1bmN0aW9uKCl7cmV0dXJuKGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcImlQYWRcIil8fGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcImlQaG9uZVwiKSkmJiFnb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hTYWZhcmlfKCkmJiFnb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hDaHJvbWVfKCkmJiFnb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hDb2FzdF8oKSYmZ29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiQXBwbGVXZWJLaXRcIil9O1xuZ29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLm1hdGNoQ2hyb21lXz1mdW5jdGlvbigpe3JldHVybihnb29nLmxhYnMudXNlckFnZW50LnV0aWwubWF0Y2hVc2VyQWdlbnQoXCJDaHJvbWVcIil8fGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcIkNyaU9TXCIpKSYmIWdvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5tYXRjaE9wZXJhXygpJiYhZ29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLm1hdGNoRWRnZV8oKX07Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLm1hdGNoQW5kcm9pZEJyb3dzZXJfPWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcIkFuZHJvaWRcIikmJiEoZ29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzQ2hyb21lKCl8fGdvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5pc0ZpcmVmb3goKXx8Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzT3BlcmEoKXx8Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzU2lsaygpKX07XG5nb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIuaXNPcGVyYT1nb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hPcGVyYV87Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzSUU9Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLm1hdGNoSUVfO2dvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5pc0VkZ2U9Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLm1hdGNoRWRnZV87Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzRmlyZWZveD1nb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hGaXJlZm94Xztnb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIuaXNTYWZhcmk9Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLm1hdGNoU2FmYXJpXztnb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIuaXNDb2FzdD1nb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hDb2FzdF87Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzSW9zV2Vidmlldz1nb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hJb3NXZWJ2aWV3Xztcbmdvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5pc0Nocm9tZT1nb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIubWF0Y2hDaHJvbWVfO2dvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5pc0FuZHJvaWRCcm93c2VyPWdvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5tYXRjaEFuZHJvaWRCcm93c2VyXztnb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIuaXNTaWxrPWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcIlNpbGtcIil9O1xuZ29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmdldFZlcnNpb249ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEpe2E9Z29vZy5hcnJheS5maW5kKGEsZCk7cmV0dXJuIGNbYV18fFwiXCJ9dmFyIGI9Z29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLmdldFVzZXJBZ2VudCgpO2lmKGdvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5pc0lFKCkpcmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5nZXRJRVZlcnNpb25fKGIpO3ZhciBiPWdvb2cubGFicy51c2VyQWdlbnQudXRpbC5leHRyYWN0VmVyc2lvblR1cGxlcyhiKSxjPXt9O2dvb2cuYXJyYXkuZm9yRWFjaChiLGZ1bmN0aW9uKGEpe2NbYVswXV09YVsxXX0pO3ZhciBkPWdvb2cucGFydGlhbChnb29nLm9iamVjdC5jb250YWluc0tleSxjKTtyZXR1cm4gZ29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzT3BlcmEoKT9hKFtcIlZlcnNpb25cIixcIk9wZXJhXCIsXCJPUFJcIl0pOmdvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5pc0VkZ2UoKT9cbmEoW1wiRWRnZVwiXSk6Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzQ2hyb21lKCk/YShbXCJDaHJvbWVcIixcIkNyaU9TXCJdKTooYj1iWzJdKSYmYlsxXXx8XCJcIn07Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzVmVyc2lvbk9ySGlnaGVyPWZ1bmN0aW9uKGEpe3JldHVybiAwPD1nb29nLnN0cmluZy5jb21wYXJlVmVyc2lvbnMoZ29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmdldFZlcnNpb24oKSxhKX07XG5nb29nLmxhYnMudXNlckFnZW50LmJyb3dzZXIuZ2V0SUVWZXJzaW9uXz1mdW5jdGlvbihhKXt2YXIgYj0vcnY6ICooW1xcZFxcLl0qKS8uZXhlYyhhKTtpZihiJiZiWzFdKXJldHVybiBiWzFdO3ZhciBiPVwiXCIsYz0vTVNJRSArKFtcXGRcXC5dKykvLmV4ZWMoYSk7aWYoYyYmY1sxXSlpZihhPS9UcmlkZW50XFwvKFxcZC5cXGQpLy5leGVjKGEpLFwiNy4wXCI9PWNbMV0paWYoYSYmYVsxXSlzd2l0Y2goYVsxXSl7Y2FzZSBcIjQuMFwiOmI9XCI4LjBcIjticmVhaztjYXNlIFwiNS4wXCI6Yj1cIjkuMFwiO2JyZWFrO2Nhc2UgXCI2LjBcIjpiPVwiMTAuMFwiO2JyZWFrO2Nhc2UgXCI3LjBcIjpiPVwiMTEuMFwifWVsc2UgYj1cIjcuMFwiO2Vsc2UgYj1jWzFdO3JldHVybiBifTtnb29nLmxhYnMudXNlckFnZW50LmVuZ2luZT17fTtnb29nLmxhYnMudXNlckFnZW50LmVuZ2luZS5pc1ByZXN0bz1mdW5jdGlvbigpe3JldHVybiBnb29nLmxhYnMudXNlckFnZW50LnV0aWwubWF0Y2hVc2VyQWdlbnQoXCJQcmVzdG9cIil9O2dvb2cubGFicy51c2VyQWdlbnQuZW5naW5lLmlzVHJpZGVudD1mdW5jdGlvbigpe3JldHVybiBnb29nLmxhYnMudXNlckFnZW50LnV0aWwubWF0Y2hVc2VyQWdlbnQoXCJUcmlkZW50XCIpfHxnb29nLmxhYnMudXNlckFnZW50LnV0aWwubWF0Y2hVc2VyQWdlbnQoXCJNU0lFXCIpfTtnb29nLmxhYnMudXNlckFnZW50LmVuZ2luZS5pc0VkZ2U9ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiRWRnZVwiKX07XG5nb29nLmxhYnMudXNlckFnZW50LmVuZ2luZS5pc1dlYktpdD1mdW5jdGlvbigpe3JldHVybiBnb29nLmxhYnMudXNlckFnZW50LnV0aWwubWF0Y2hVc2VyQWdlbnRJZ25vcmVDYXNlKFwiV2ViS2l0XCIpJiYhZ29vZy5sYWJzLnVzZXJBZ2VudC5lbmdpbmUuaXNFZGdlKCl9O2dvb2cubGFicy51c2VyQWdlbnQuZW5naW5lLmlzR2Vja289ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLm1hdGNoVXNlckFnZW50KFwiR2Vja29cIikmJiFnb29nLmxhYnMudXNlckFnZW50LmVuZ2luZS5pc1dlYktpdCgpJiYhZ29vZy5sYWJzLnVzZXJBZ2VudC5lbmdpbmUuaXNUcmlkZW50KCkmJiFnb29nLmxhYnMudXNlckFnZW50LmVuZ2luZS5pc0VkZ2UoKX07XG5nb29nLmxhYnMudXNlckFnZW50LmVuZ2luZS5nZXRWZXJzaW9uPWZ1bmN0aW9uKCl7dmFyIGE9Z29vZy5sYWJzLnVzZXJBZ2VudC51dGlsLmdldFVzZXJBZ2VudCgpO2lmKGEpe3ZhciBhPWdvb2cubGFicy51c2VyQWdlbnQudXRpbC5leHRyYWN0VmVyc2lvblR1cGxlcyhhKSxiPWdvb2cubGFicy51c2VyQWdlbnQuZW5naW5lLmdldEVuZ2luZVR1cGxlXyhhKTtpZihiKXJldHVyblwiR2Vja29cIj09YlswXT9nb29nLmxhYnMudXNlckFnZW50LmVuZ2luZS5nZXRWZXJzaW9uRm9yS2V5XyhhLFwiRmlyZWZveFwiKTpiWzFdO3ZhciBhPWFbMF0sYztpZihhJiYoYz1hWzJdKSYmKGM9L1RyaWRlbnRcXC8oW15cXHM7XSspLy5leGVjKGMpKSlyZXR1cm4gY1sxXX1yZXR1cm5cIlwifTtcbmdvb2cubGFicy51c2VyQWdlbnQuZW5naW5lLmdldEVuZ2luZVR1cGxlXz1mdW5jdGlvbihhKXtpZighZ29vZy5sYWJzLnVzZXJBZ2VudC5lbmdpbmUuaXNFZGdlKCkpcmV0dXJuIGFbMV07Zm9yKHZhciBiPTA7YjxhLmxlbmd0aDtiKyspe3ZhciBjPWFbYl07aWYoXCJFZGdlXCI9PWNbMF0pcmV0dXJuIGN9fTtnb29nLmxhYnMudXNlckFnZW50LmVuZ2luZS5pc1ZlcnNpb25PckhpZ2hlcj1mdW5jdGlvbihhKXtyZXR1cm4gMDw9Z29vZy5zdHJpbmcuY29tcGFyZVZlcnNpb25zKGdvb2cubGFicy51c2VyQWdlbnQuZW5naW5lLmdldFZlcnNpb24oKSxhKX07Z29vZy5sYWJzLnVzZXJBZ2VudC5lbmdpbmUuZ2V0VmVyc2lvbkZvcktleV89ZnVuY3Rpb24oYSxiKXt2YXIgYz1nb29nLmFycmF5LmZpbmQoYSxmdW5jdGlvbihhKXtyZXR1cm4gYj09YVswXX0pO3JldHVybiBjJiZjWzFdfHxcIlwifTtnb29nLnVzZXJBZ2VudD17fTtnb29nLnVzZXJBZ2VudC5BU1NVTUVfSUU9ITE7Z29vZy51c2VyQWdlbnQuQVNTVU1FX0VER0U9ITE7Z29vZy51c2VyQWdlbnQuQVNTVU1FX0dFQ0tPPSExO2dvb2cudXNlckFnZW50LkFTU1VNRV9XRUJLSVQ9ITE7Z29vZy51c2VyQWdlbnQuQVNTVU1FX01PQklMRV9XRUJLSVQ9ITE7Z29vZy51c2VyQWdlbnQuQVNTVU1FX09QRVJBPSExO2dvb2cudXNlckFnZW50LkFTU1VNRV9BTllfVkVSU0lPTj0hMTtnb29nLnVzZXJBZ2VudC5CUk9XU0VSX0tOT1dOXz1nb29nLnVzZXJBZ2VudC5BU1NVTUVfSUV8fGdvb2cudXNlckFnZW50LkFTU1VNRV9FREdFfHxnb29nLnVzZXJBZ2VudC5BU1NVTUVfR0VDS098fGdvb2cudXNlckFnZW50LkFTU1VNRV9NT0JJTEVfV0VCS0lUfHxnb29nLnVzZXJBZ2VudC5BU1NVTUVfV0VCS0lUfHxnb29nLnVzZXJBZ2VudC5BU1NVTUVfT1BFUkE7Z29vZy51c2VyQWdlbnQuZ2V0VXNlckFnZW50U3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQudXRpbC5nZXRVc2VyQWdlbnQoKX07XG5nb29nLnVzZXJBZ2VudC5nZXROYXZpZ2F0b3I9ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5nbG9iYWwubmF2aWdhdG9yfHxudWxsfTtnb29nLnVzZXJBZ2VudC5PUEVSQT1nb29nLnVzZXJBZ2VudC5CUk9XU0VSX0tOT1dOXz9nb29nLnVzZXJBZ2VudC5BU1NVTUVfT1BFUkE6Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzT3BlcmEoKTtnb29nLnVzZXJBZ2VudC5JRT1nb29nLnVzZXJBZ2VudC5CUk9XU0VSX0tOT1dOXz9nb29nLnVzZXJBZ2VudC5BU1NVTUVfSUU6Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzSUUoKTtnb29nLnVzZXJBZ2VudC5FREdFPWdvb2cudXNlckFnZW50LkJST1dTRVJfS05PV05fP2dvb2cudXNlckFnZW50LkFTU1VNRV9FREdFOmdvb2cubGFicy51c2VyQWdlbnQuZW5naW5lLmlzRWRnZSgpO2dvb2cudXNlckFnZW50LkVER0VfT1JfSUU9Z29vZy51c2VyQWdlbnQuRURHRXx8Z29vZy51c2VyQWdlbnQuSUU7XG5nb29nLnVzZXJBZ2VudC5HRUNLTz1nb29nLnVzZXJBZ2VudC5CUk9XU0VSX0tOT1dOXz9nb29nLnVzZXJBZ2VudC5BU1NVTUVfR0VDS086Z29vZy5sYWJzLnVzZXJBZ2VudC5lbmdpbmUuaXNHZWNrbygpO2dvb2cudXNlckFnZW50LldFQktJVD1nb29nLnVzZXJBZ2VudC5CUk9XU0VSX0tOT1dOXz9nb29nLnVzZXJBZ2VudC5BU1NVTUVfV0VCS0lUfHxnb29nLnVzZXJBZ2VudC5BU1NVTUVfTU9CSUxFX1dFQktJVDpnb29nLmxhYnMudXNlckFnZW50LmVuZ2luZS5pc1dlYktpdCgpO2dvb2cudXNlckFnZW50LmlzTW9iaWxlXz1mdW5jdGlvbigpe3JldHVybiBnb29nLnVzZXJBZ2VudC5XRUJLSVQmJmdvb2cubGFicy51c2VyQWdlbnQudXRpbC5tYXRjaFVzZXJBZ2VudChcIk1vYmlsZVwiKX07Z29vZy51c2VyQWdlbnQuTU9CSUxFPWdvb2cudXNlckFnZW50LkFTU1VNRV9NT0JJTEVfV0VCS0lUfHxnb29nLnVzZXJBZ2VudC5pc01vYmlsZV8oKTtnb29nLnVzZXJBZ2VudC5TQUZBUkk9Z29vZy51c2VyQWdlbnQuV0VCS0lUO1xuZ29vZy51c2VyQWdlbnQuZGV0ZXJtaW5lUGxhdGZvcm1fPWZ1bmN0aW9uKCl7dmFyIGE9Z29vZy51c2VyQWdlbnQuZ2V0TmF2aWdhdG9yKCk7cmV0dXJuIGEmJmEucGxhdGZvcm18fFwiXCJ9O2dvb2cudXNlckFnZW50LlBMQVRGT1JNPWdvb2cudXNlckFnZW50LmRldGVybWluZVBsYXRmb3JtXygpO2dvb2cudXNlckFnZW50LkFTU1VNRV9NQUM9ITE7Z29vZy51c2VyQWdlbnQuQVNTVU1FX1dJTkRPV1M9ITE7Z29vZy51c2VyQWdlbnQuQVNTVU1FX0xJTlVYPSExO2dvb2cudXNlckFnZW50LkFTU1VNRV9YMTE9ITE7Z29vZy51c2VyQWdlbnQuQVNTVU1FX0FORFJPSUQ9ITE7Z29vZy51c2VyQWdlbnQuQVNTVU1FX0lQSE9ORT0hMTtnb29nLnVzZXJBZ2VudC5BU1NVTUVfSVBBRD0hMTtcbmdvb2cudXNlckFnZW50LlBMQVRGT1JNX0tOT1dOXz1nb29nLnVzZXJBZ2VudC5BU1NVTUVfTUFDfHxnb29nLnVzZXJBZ2VudC5BU1NVTUVfV0lORE9XU3x8Z29vZy51c2VyQWdlbnQuQVNTVU1FX0xJTlVYfHxnb29nLnVzZXJBZ2VudC5BU1NVTUVfWDExfHxnb29nLnVzZXJBZ2VudC5BU1NVTUVfQU5EUk9JRHx8Z29vZy51c2VyQWdlbnQuQVNTVU1FX0lQSE9ORXx8Z29vZy51c2VyQWdlbnQuQVNTVU1FX0lQQUQ7Z29vZy51c2VyQWdlbnQuTUFDPWdvb2cudXNlckFnZW50LlBMQVRGT1JNX0tOT1dOXz9nb29nLnVzZXJBZ2VudC5BU1NVTUVfTUFDOmdvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNNYWNpbnRvc2goKTtnb29nLnVzZXJBZ2VudC5XSU5ET1dTPWdvb2cudXNlckFnZW50LlBMQVRGT1JNX0tOT1dOXz9nb29nLnVzZXJBZ2VudC5BU1NVTUVfV0lORE9XUzpnb29nLmxhYnMudXNlckFnZW50LnBsYXRmb3JtLmlzV2luZG93cygpO1xuZ29vZy51c2VyQWdlbnQuaXNMZWdhY3lMaW51eF89ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5sYWJzLnVzZXJBZ2VudC5wbGF0Zm9ybS5pc0xpbnV4KCl8fGdvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNDaHJvbWVPUygpfTtnb29nLnVzZXJBZ2VudC5MSU5VWD1nb29nLnVzZXJBZ2VudC5QTEFURk9STV9LTk9XTl8/Z29vZy51c2VyQWdlbnQuQVNTVU1FX0xJTlVYOmdvb2cudXNlckFnZW50LmlzTGVnYWN5TGludXhfKCk7Z29vZy51c2VyQWdlbnQuaXNYMTFfPWZ1bmN0aW9uKCl7dmFyIGE9Z29vZy51c2VyQWdlbnQuZ2V0TmF2aWdhdG9yKCk7cmV0dXJuISFhJiZnb29nLnN0cmluZy5jb250YWlucyhhLmFwcFZlcnNpb258fFwiXCIsXCJYMTFcIil9O2dvb2cudXNlckFnZW50LlgxMT1nb29nLnVzZXJBZ2VudC5QTEFURk9STV9LTk9XTl8/Z29vZy51c2VyQWdlbnQuQVNTVU1FX1gxMTpnb29nLnVzZXJBZ2VudC5pc1gxMV8oKTtcbmdvb2cudXNlckFnZW50LkFORFJPSUQ9Z29vZy51c2VyQWdlbnQuUExBVEZPUk1fS05PV05fP2dvb2cudXNlckFnZW50LkFTU1VNRV9BTkRST0lEOmdvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNBbmRyb2lkKCk7Z29vZy51c2VyQWdlbnQuSVBIT05FPWdvb2cudXNlckFnZW50LlBMQVRGT1JNX0tOT1dOXz9nb29nLnVzZXJBZ2VudC5BU1NVTUVfSVBIT05FOmdvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNJcGhvbmUoKTtnb29nLnVzZXJBZ2VudC5JUEFEPWdvb2cudXNlckFnZW50LlBMQVRGT1JNX0tOT1dOXz9nb29nLnVzZXJBZ2VudC5BU1NVTUVfSVBBRDpnb29nLmxhYnMudXNlckFnZW50LnBsYXRmb3JtLmlzSXBhZCgpO2dvb2cudXNlckFnZW50Lm9wZXJhVmVyc2lvbl89ZnVuY3Rpb24oKXt2YXIgYT1nb29nLmdsb2JhbC5vcGVyYS52ZXJzaW9uO3RyeXtyZXR1cm4gYSgpfWNhdGNoKGIpe3JldHVybiBhfX07XG5nb29nLnVzZXJBZ2VudC5kZXRlcm1pbmVWZXJzaW9uXz1mdW5jdGlvbigpe2lmKGdvb2cudXNlckFnZW50Lk9QRVJBJiZnb29nLmdsb2JhbC5vcGVyYSlyZXR1cm4gZ29vZy51c2VyQWdlbnQub3BlcmFWZXJzaW9uXygpO3ZhciBhPVwiXCIsYj1nb29nLnVzZXJBZ2VudC5nZXRWZXJzaW9uUmVnZXhSZXN1bHRfKCk7YiYmKGE9Yj9iWzFdOlwiXCIpO3JldHVybiBnb29nLnVzZXJBZ2VudC5JRSYmKGI9Z29vZy51c2VyQWdlbnQuZ2V0RG9jdW1lbnRNb2RlXygpLGI+cGFyc2VGbG9hdChhKSk/U3RyaW5nKGIpOmF9O1xuZ29vZy51c2VyQWdlbnQuZ2V0VmVyc2lvblJlZ2V4UmVzdWx0Xz1mdW5jdGlvbigpe3ZhciBhPWdvb2cudXNlckFnZW50LmdldFVzZXJBZ2VudFN0cmluZygpO2lmKGdvb2cudXNlckFnZW50LkdFQ0tPKXJldHVybi9ydlxcOihbXlxcKTtdKykoXFwpfDspLy5leGVjKGEpO2lmKGdvb2cudXNlckFnZW50LkVER0UpcmV0dXJuL0VkZ2VcXC8oW1xcZFxcLl0rKS8uZXhlYyhhKTtpZihnb29nLnVzZXJBZ2VudC5JRSlyZXR1cm4vXFxiKD86TVNJRXxydilbOiBdKFteXFwpO10rKShcXCl8OykvLmV4ZWMoYSk7aWYoZ29vZy51c2VyQWdlbnQuV0VCS0lUKXJldHVybi9XZWJLaXRcXC8oXFxTKykvLmV4ZWMoYSl9O2dvb2cudXNlckFnZW50LmdldERvY3VtZW50TW9kZV89ZnVuY3Rpb24oKXt2YXIgYT1nb29nLmdsb2JhbC5kb2N1bWVudDtyZXR1cm4gYT9hLmRvY3VtZW50TW9kZTp2b2lkIDB9O2dvb2cudXNlckFnZW50LlZFUlNJT049Z29vZy51c2VyQWdlbnQuZGV0ZXJtaW5lVmVyc2lvbl8oKTtcbmdvb2cudXNlckFnZW50LmNvbXBhcmU9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gZ29vZy5zdHJpbmcuY29tcGFyZVZlcnNpb25zKGEsYil9O2dvb2cudXNlckFnZW50LmlzVmVyc2lvbk9ySGlnaGVyQ2FjaGVfPXt9O2dvb2cudXNlckFnZW50LmlzVmVyc2lvbk9ySGlnaGVyPWZ1bmN0aW9uKGEpe3JldHVybiBnb29nLnVzZXJBZ2VudC5BU1NVTUVfQU5ZX1ZFUlNJT058fGdvb2cudXNlckFnZW50LmlzVmVyc2lvbk9ySGlnaGVyQ2FjaGVfW2FdfHwoZ29vZy51c2VyQWdlbnQuaXNWZXJzaW9uT3JIaWdoZXJDYWNoZV9bYV09MDw9Z29vZy5zdHJpbmcuY29tcGFyZVZlcnNpb25zKGdvb2cudXNlckFnZW50LlZFUlNJT04sYSkpfTtnb29nLnVzZXJBZ2VudC5pc1ZlcnNpb249Z29vZy51c2VyQWdlbnQuaXNWZXJzaW9uT3JIaWdoZXI7XG5nb29nLnVzZXJBZ2VudC5pc0RvY3VtZW50TW9kZU9ySGlnaGVyPWZ1bmN0aW9uKGEpe3JldHVybiBOdW1iZXIoZ29vZy51c2VyQWdlbnQuRE9DVU1FTlRfTU9ERSk+PWF9O2dvb2cudXNlckFnZW50LmlzRG9jdW1lbnRNb2RlPWdvb2cudXNlckFnZW50LmlzRG9jdW1lbnRNb2RlT3JIaWdoZXI7Z29vZy51c2VyQWdlbnQuRE9DVU1FTlRfTU9ERT1mdW5jdGlvbigpe3ZhciBhPWdvb2cuZ2xvYmFsLmRvY3VtZW50LGI9Z29vZy51c2VyQWdlbnQuZ2V0RG9jdW1lbnRNb2RlXygpO3JldHVybiBhJiZnb29nLnVzZXJBZ2VudC5JRT9ifHwoXCJDU1MxQ29tcGF0XCI9PWEuY29tcGF0TW9kZT9wYXJzZUludChnb29nLnVzZXJBZ2VudC5WRVJTSU9OLDEwKTo1KTp2b2lkIDB9KCk7Z29vZy51c2VyQWdlbnQucHJvZHVjdD17fTtnb29nLnVzZXJBZ2VudC5wcm9kdWN0LkFTU1VNRV9GSVJFRk9YPSExO2dvb2cudXNlckFnZW50LnByb2R1Y3QuQVNTVU1FX0lQSE9ORT0hMTtnb29nLnVzZXJBZ2VudC5wcm9kdWN0LkFTU1VNRV9JUEFEPSExO2dvb2cudXNlckFnZW50LnByb2R1Y3QuQVNTVU1FX0FORFJPSUQ9ITE7Z29vZy51c2VyQWdlbnQucHJvZHVjdC5BU1NVTUVfQ0hST01FPSExO2dvb2cudXNlckFnZW50LnByb2R1Y3QuQVNTVU1FX1NBRkFSST0hMTtcbmdvb2cudXNlckFnZW50LnByb2R1Y3QuUFJPRFVDVF9LTk9XTl89Z29vZy51c2VyQWdlbnQuQVNTVU1FX0lFfHxnb29nLnVzZXJBZ2VudC5BU1NVTUVfRURHRXx8Z29vZy51c2VyQWdlbnQuQVNTVU1FX09QRVJBfHxnb29nLnVzZXJBZ2VudC5wcm9kdWN0LkFTU1VNRV9GSVJFRk9YfHxnb29nLnVzZXJBZ2VudC5wcm9kdWN0LkFTU1VNRV9JUEhPTkV8fGdvb2cudXNlckFnZW50LnByb2R1Y3QuQVNTVU1FX0lQQUR8fGdvb2cudXNlckFnZW50LnByb2R1Y3QuQVNTVU1FX0FORFJPSUR8fGdvb2cudXNlckFnZW50LnByb2R1Y3QuQVNTVU1FX0NIUk9NRXx8Z29vZy51c2VyQWdlbnQucHJvZHVjdC5BU1NVTUVfU0FGQVJJO2dvb2cudXNlckFnZW50LnByb2R1Y3QuT1BFUkE9Z29vZy51c2VyQWdlbnQuT1BFUkE7Z29vZy51c2VyQWdlbnQucHJvZHVjdC5JRT1nb29nLnVzZXJBZ2VudC5JRTtnb29nLnVzZXJBZ2VudC5wcm9kdWN0LkVER0U9Z29vZy51c2VyQWdlbnQuRURHRTtcbmdvb2cudXNlckFnZW50LnByb2R1Y3QuRklSRUZPWD1nb29nLnVzZXJBZ2VudC5wcm9kdWN0LlBST0RVQ1RfS05PV05fP2dvb2cudXNlckFnZW50LnByb2R1Y3QuQVNTVU1FX0ZJUkVGT1g6Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzRmlyZWZveCgpO2dvb2cudXNlckFnZW50LnByb2R1Y3QuaXNJcGhvbmVPcklwb2RfPWZ1bmN0aW9uKCl7cmV0dXJuIGdvb2cubGFicy51c2VyQWdlbnQucGxhdGZvcm0uaXNJcGhvbmUoKXx8Z29vZy5sYWJzLnVzZXJBZ2VudC5wbGF0Zm9ybS5pc0lwb2QoKX07Z29vZy51c2VyQWdlbnQucHJvZHVjdC5JUEhPTkU9Z29vZy51c2VyQWdlbnQucHJvZHVjdC5QUk9EVUNUX0tOT1dOXz9nb29nLnVzZXJBZ2VudC5wcm9kdWN0LkFTU1VNRV9JUEhPTkU6Z29vZy51c2VyQWdlbnQucHJvZHVjdC5pc0lwaG9uZU9ySXBvZF8oKTtcbmdvb2cudXNlckFnZW50LnByb2R1Y3QuSVBBRD1nb29nLnVzZXJBZ2VudC5wcm9kdWN0LlBST0RVQ1RfS05PV05fP2dvb2cudXNlckFnZW50LnByb2R1Y3QuQVNTVU1FX0lQQUQ6Z29vZy5sYWJzLnVzZXJBZ2VudC5wbGF0Zm9ybS5pc0lwYWQoKTtnb29nLnVzZXJBZ2VudC5wcm9kdWN0LkFORFJPSUQ9Z29vZy51c2VyQWdlbnQucHJvZHVjdC5QUk9EVUNUX0tOT1dOXz9nb29nLnVzZXJBZ2VudC5wcm9kdWN0LkFTU1VNRV9BTkRST0lEOmdvb2cubGFicy51c2VyQWdlbnQuYnJvd3Nlci5pc0FuZHJvaWRCcm93c2VyKCk7Z29vZy51c2VyQWdlbnQucHJvZHVjdC5DSFJPTUU9Z29vZy51c2VyQWdlbnQucHJvZHVjdC5QUk9EVUNUX0tOT1dOXz9nb29nLnVzZXJBZ2VudC5wcm9kdWN0LkFTU1VNRV9DSFJPTUU6Z29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzQ2hyb21lKCk7XG5nb29nLnVzZXJBZ2VudC5wcm9kdWN0LmlzU2FmYXJpRGVza3RvcF89ZnVuY3Rpb24oKXtyZXR1cm4gZ29vZy5sYWJzLnVzZXJBZ2VudC5icm93c2VyLmlzU2FmYXJpKCkmJiFnb29nLmxhYnMudXNlckFnZW50LnBsYXRmb3JtLmlzSW9zKCl9O2dvb2cudXNlckFnZW50LnByb2R1Y3QuU0FGQVJJPWdvb2cudXNlckFnZW50LnByb2R1Y3QuUFJPRFVDVF9LTk9XTl8/Z29vZy51c2VyQWdlbnQucHJvZHVjdC5BU1NVTUVfU0FGQVJJOmdvb2cudXNlckFnZW50LnByb2R1Y3QuaXNTYWZhcmlEZXNrdG9wXygpO2dvb2cuY3J5cHQuYmFzZTY0PXt9O2dvb2cuY3J5cHQuYmFzZTY0LmJ5dGVUb0NoYXJNYXBfPW51bGw7Z29vZy5jcnlwdC5iYXNlNjQuY2hhclRvQnl0ZU1hcF89bnVsbDtnb29nLmNyeXB0LmJhc2U2NC5ieXRlVG9DaGFyTWFwV2ViU2FmZV89bnVsbDtnb29nLmNyeXB0LmJhc2U2NC5FTkNPREVEX1ZBTFNfQkFTRT1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7Z29vZy5jcnlwdC5iYXNlNjQuRU5DT0RFRF9WQUxTPWdvb2cuY3J5cHQuYmFzZTY0LkVOQ09ERURfVkFMU19CQVNFK1wiKy89XCI7Z29vZy5jcnlwdC5iYXNlNjQuRU5DT0RFRF9WQUxTX1dFQlNBRkU9Z29vZy5jcnlwdC5iYXNlNjQuRU5DT0RFRF9WQUxTX0JBU0UrXCItXy5cIjtcbmdvb2cuY3J5cHQuYmFzZTY0LkFTU1VNRV9OQVRJVkVfU1VQUE9SVF89Z29vZy51c2VyQWdlbnQuR0VDS098fGdvb2cudXNlckFnZW50LldFQktJVCYmIWdvb2cudXNlckFnZW50LnByb2R1Y3QuU0FGQVJJfHxnb29nLnVzZXJBZ2VudC5PUEVSQTtnb29nLmNyeXB0LmJhc2U2NC5IQVNfTkFUSVZFX0VOQ09ERV89Z29vZy5jcnlwdC5iYXNlNjQuQVNTVU1FX05BVElWRV9TVVBQT1JUX3x8XCJmdW5jdGlvblwiPT10eXBlb2YgZ29vZy5nbG9iYWwuYnRvYTtnb29nLmNyeXB0LmJhc2U2NC5IQVNfTkFUSVZFX0RFQ09ERV89Z29vZy5jcnlwdC5iYXNlNjQuQVNTVU1FX05BVElWRV9TVVBQT1JUX3x8IWdvb2cudXNlckFnZW50LnByb2R1Y3QuU0FGQVJJJiYhZ29vZy51c2VyQWdlbnQuSUUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGdvb2cuZ2xvYmFsLmF0b2I7XG5nb29nLmNyeXB0LmJhc2U2NC5lbmNvZGVCeXRlQXJyYXk9ZnVuY3Rpb24oYSxiKXtnb29nLmFzc2VydHMuYXNzZXJ0KGdvb2cuaXNBcnJheUxpa2UoYSksXCJlbmNvZGVCeXRlQXJyYXkgdGFrZXMgYW4gYXJyYXkgYXMgYSBwYXJhbWV0ZXJcIik7Z29vZy5jcnlwdC5iYXNlNjQuaW5pdF8oKTtmb3IodmFyIGM9Yj9nb29nLmNyeXB0LmJhc2U2NC5ieXRlVG9DaGFyTWFwV2ViU2FmZV86Z29vZy5jcnlwdC5iYXNlNjQuYnl0ZVRvQ2hhck1hcF8sZD1bXSxlPTA7ZTxhLmxlbmd0aDtlKz0zKXt2YXIgZj1hW2VdLGc9ZSsxPGEubGVuZ3RoLGg9Zz9hW2UrMV06MCxrPWUrMjxhLmxlbmd0aCxsPWs/YVtlKzJdOjAscD1mPj4yLGY9KGYmMyk8PDR8aD4+NCxoPShoJjE1KTw8MnxsPj42LGw9bCY2MztrfHwobD02NCxnfHwoaD02NCkpO2QucHVzaChjW3BdLGNbZl0sY1toXSxjW2xdKX1yZXR1cm4gZC5qb2luKFwiXCIpfTtcbmdvb2cuY3J5cHQuYmFzZTY0LmVuY29kZVN0cmluZz1mdW5jdGlvbihhLGIpe3JldHVybiBnb29nLmNyeXB0LmJhc2U2NC5IQVNfTkFUSVZFX0VOQ09ERV8mJiFiP2dvb2cuZ2xvYmFsLmJ0b2EoYSk6Z29vZy5jcnlwdC5iYXNlNjQuZW5jb2RlQnl0ZUFycmF5KGdvb2cuY3J5cHQuc3RyaW5nVG9CeXRlQXJyYXkoYSksYil9O2dvb2cuY3J5cHQuYmFzZTY0LmRlY29kZVN0cmluZz1mdW5jdGlvbihhLGIpe2lmKGdvb2cuY3J5cHQuYmFzZTY0LkhBU19OQVRJVkVfREVDT0RFXyYmIWIpcmV0dXJuIGdvb2cuZ2xvYmFsLmF0b2IoYSk7dmFyIGM9XCJcIjtnb29nLmNyeXB0LmJhc2U2NC5kZWNvZGVTdHJpbmdJbnRlcm5hbF8oYSxmdW5jdGlvbihhKXtjKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGEpfSk7cmV0dXJuIGN9O1xuZ29vZy5jcnlwdC5iYXNlNjQuZGVjb2RlU3RyaW5nVG9CeXRlQXJyYXk9ZnVuY3Rpb24oYSxiKXt2YXIgYz1bXTtnb29nLmNyeXB0LmJhc2U2NC5kZWNvZGVTdHJpbmdJbnRlcm5hbF8oYSxmdW5jdGlvbihhKXtjLnB1c2goYSl9KTtyZXR1cm4gY307Z29vZy5jcnlwdC5iYXNlNjQuZGVjb2RlU3RyaW5nVG9VaW50OEFycmF5PWZ1bmN0aW9uKGEpe2dvb2cuYXNzZXJ0cy5hc3NlcnQoIWdvb2cudXNlckFnZW50LklFfHxnb29nLnVzZXJBZ2VudC5pc1ZlcnNpb25PckhpZ2hlcihcIjEwXCIpLFwiQnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHR5cGVkIGFycmF5c1wiKTt2YXIgYj1uZXcgVWludDhBcnJheShNYXRoLmNlaWwoMyphLmxlbmd0aC80KSksYz0wO2dvb2cuY3J5cHQuYmFzZTY0LmRlY29kZVN0cmluZ0ludGVybmFsXyhhLGZ1bmN0aW9uKGEpe2JbYysrXT1hfSk7cmV0dXJuIGIuc3ViYXJyYXkoMCxjKX07XG5nb29nLmNyeXB0LmJhc2U2NC5kZWNvZGVTdHJpbmdJbnRlcm5hbF89ZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBjKGIpe2Zvcig7ZDxhLmxlbmd0aDspe3ZhciBjPWEuY2hhckF0KGQrKyksZT1nb29nLmNyeXB0LmJhc2U2NC5jaGFyVG9CeXRlTWFwX1tjXTtpZihudWxsIT1lKXJldHVybiBlO2lmKCFnb29nLnN0cmluZy5pc0VtcHR5T3JXaGl0ZXNwYWNlKGMpKXRocm93IEVycm9yKFwiVW5rbm93biBiYXNlNjQgZW5jb2RpbmcgYXQgY2hhcjogXCIrYyk7fXJldHVybiBifWdvb2cuY3J5cHQuYmFzZTY0LmluaXRfKCk7Zm9yKHZhciBkPTA7Oyl7dmFyIGU9YygtMSksZj1jKDApLGc9Yyg2NCksaD1jKDY0KTtpZig2ND09PWgmJi0xPT09ZSlicmVhaztiKGU8PDJ8Zj4+NCk7NjQhPWcmJihiKGY8PDQmMjQwfGc+PjIpLDY0IT1oJiZiKGc8PDYmMTkyfGgpKX19O1xuZ29vZy5jcnlwdC5iYXNlNjQuaW5pdF89ZnVuY3Rpb24oKXtpZighZ29vZy5jcnlwdC5iYXNlNjQuYnl0ZVRvQ2hhck1hcF8pe2dvb2cuY3J5cHQuYmFzZTY0LmJ5dGVUb0NoYXJNYXBfPXt9O2dvb2cuY3J5cHQuYmFzZTY0LmNoYXJUb0J5dGVNYXBfPXt9O2dvb2cuY3J5cHQuYmFzZTY0LmJ5dGVUb0NoYXJNYXBXZWJTYWZlXz17fTtmb3IodmFyIGE9MDthPGdvb2cuY3J5cHQuYmFzZTY0LkVOQ09ERURfVkFMUy5sZW5ndGg7YSsrKWdvb2cuY3J5cHQuYmFzZTY0LmJ5dGVUb0NoYXJNYXBfW2FdPWdvb2cuY3J5cHQuYmFzZTY0LkVOQ09ERURfVkFMUy5jaGFyQXQoYSksZ29vZy5jcnlwdC5iYXNlNjQuY2hhclRvQnl0ZU1hcF9bZ29vZy5jcnlwdC5iYXNlNjQuYnl0ZVRvQ2hhck1hcF9bYV1dPWEsZ29vZy5jcnlwdC5iYXNlNjQuYnl0ZVRvQ2hhck1hcFdlYlNhZmVfW2FdPWdvb2cuY3J5cHQuYmFzZTY0LkVOQ09ERURfVkFMU19XRUJTQUZFLmNoYXJBdChhKSxhPj1nb29nLmNyeXB0LmJhc2U2NC5FTkNPREVEX1ZBTFNfQkFTRS5sZW5ndGgmJlxuKGdvb2cuY3J5cHQuYmFzZTY0LmNoYXJUb0J5dGVNYXBfW2dvb2cuY3J5cHQuYmFzZTY0LkVOQ09ERURfVkFMU19XRUJTQUZFLmNoYXJBdChhKV09YSl9fTtqc3BiLnV0aWxzPXt9O2pzcGIudXRpbHMuc3BsaXQ2NExvdz0wO2pzcGIudXRpbHMuc3BsaXQ2NEhpZ2g9MDtqc3BiLnV0aWxzLnNwbGl0VWludDY0PWZ1bmN0aW9uKGEpe3ZhciBiPWE+Pj4wO2E9TWF0aC5mbG9vcigoYS1iKS9qc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fMzIpPj4+MDtqc3BiLnV0aWxzLnNwbGl0NjRMb3c9Yjtqc3BiLnV0aWxzLnNwbGl0NjRIaWdoPWF9O2pzcGIudXRpbHMuc3BsaXRJbnQ2ND1mdW5jdGlvbihhKXt2YXIgYj0wPmE7YT1NYXRoLmFicyhhKTt2YXIgYz1hPj4+MDthPU1hdGguZmxvb3IoKGEtYykvanNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMyKTthPj4+PTA7YiYmKGE9fmE+Pj4wLGM9KH5jPj4+MCkrMSw0Mjk0OTY3Mjk1PGMmJihjPTAsYSsrLDQyOTQ5NjcyOTU8YSYmKGE9MCkpKTtqc3BiLnV0aWxzLnNwbGl0NjRMb3c9Yztqc3BiLnV0aWxzLnNwbGl0NjRIaWdoPWF9O1xuanNwYi51dGlscy5zcGxpdFppZ3phZzY0PWZ1bmN0aW9uKGEpe3ZhciBiPTA+YTthPTIqTWF0aC5hYnMoYSk7anNwYi51dGlscy5zcGxpdFVpbnQ2NChhKTthPWpzcGIudXRpbHMuc3BsaXQ2NExvdzt2YXIgYz1qc3BiLnV0aWxzLnNwbGl0NjRIaWdoO2ImJigwPT1hPzA9PWM/Yz1hPTQyOTQ5NjcyOTU6KGMtLSxhPTQyOTQ5NjcyOTUpOmEtLSk7anNwYi51dGlscy5zcGxpdDY0TG93PWE7anNwYi51dGlscy5zcGxpdDY0SGlnaD1jfTtcbmpzcGIudXRpbHMuc3BsaXRGbG9hdDMyPWZ1bmN0aW9uKGEpe3ZhciBiPTA+YT8xOjA7YT1iPy1hOmE7dmFyIGM7MD09PWE/MDwxL2E/KGpzcGIudXRpbHMuc3BsaXQ2NEhpZ2g9MCxqc3BiLnV0aWxzLnNwbGl0NjRMb3c9MCk6KGpzcGIudXRpbHMuc3BsaXQ2NEhpZ2g9MCxqc3BiLnV0aWxzLnNwbGl0NjRMb3c9MjE0NzQ4MzY0OCk6aXNOYU4oYSk/KGpzcGIudXRpbHMuc3BsaXQ2NEhpZ2g9MCxqc3BiLnV0aWxzLnNwbGl0NjRMb3c9MjE0NzQ4MzY0Nyk6YT5qc3BiLkJpbmFyeUNvbnN0YW50cy5GTE9BVDMyX01BWD8oanNwYi51dGlscy5zcGxpdDY0SGlnaD0wLGpzcGIudXRpbHMuc3BsaXQ2NExvdz0oYjw8MzF8MjEzOTA5NTA0MCk+Pj4wKTphPGpzcGIuQmluYXJ5Q29uc3RhbnRzLkZMT0FUMzJfTUlOPyhhPU1hdGgucm91bmQoYS9NYXRoLnBvdygyLC0xNDkpKSxqc3BiLnV0aWxzLnNwbGl0NjRIaWdoPTAsanNwYi51dGlscy5zcGxpdDY0TG93PShiPDwzMXxhKT4+PjApOihjPU1hdGguZmxvb3IoTWF0aC5sb2coYSkvXG5NYXRoLkxOMiksYSo9TWF0aC5wb3coMiwtYyksYT1NYXRoLnJvdW5kKGEqanNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzIzKSY4Mzg4NjA3LGpzcGIudXRpbHMuc3BsaXQ2NEhpZ2g9MCxqc3BiLnV0aWxzLnNwbGl0NjRMb3c9KGI8PDMxfGMrMTI3PDwyM3xhKT4+PjApfTtcbmpzcGIudXRpbHMuc3BsaXRGbG9hdDY0PWZ1bmN0aW9uKGEpe3ZhciBiPTA+YT8xOjA7YT1iPy1hOmE7aWYoMD09PWEpanNwYi51dGlscy5zcGxpdDY0SGlnaD0wPDEvYT8wOjIxNDc0ODM2NDgsanNwYi51dGlscy5zcGxpdDY0TG93PTA7ZWxzZSBpZihpc05hTihhKSlqc3BiLnV0aWxzLnNwbGl0NjRIaWdoPTIxNDc0ODM2NDcsanNwYi51dGlscy5zcGxpdDY0TG93PTQyOTQ5NjcyOTU7ZWxzZSBpZihhPmpzcGIuQmluYXJ5Q29uc3RhbnRzLkZMT0FUNjRfTUFYKWpzcGIudXRpbHMuc3BsaXQ2NEhpZ2g9KGI8PDMxfDIxNDY0MzUwNzIpPj4+MCxqc3BiLnV0aWxzLnNwbGl0NjRMb3c9MDtlbHNlIGlmKGE8anNwYi5CaW5hcnlDb25zdGFudHMuRkxPQVQ2NF9NSU4pe3ZhciBjPWEvTWF0aC5wb3coMiwtMTA3NCk7YT1jL2pzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMjtqc3BiLnV0aWxzLnNwbGl0NjRIaWdoPShiPDwzMXxhKT4+PjA7anNwYi51dGlscy5zcGxpdDY0TG93PWM+Pj4wfWVsc2V7dmFyIGQ9XG5NYXRoLmZsb29yKE1hdGgubG9nKGEpL01hdGguTE4yKTsxMDI0PT1kJiYoZD0xMDIzKTtjPWEqTWF0aC5wb3coMiwtZCk7YT1jKmpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18yMCYxMDQ4NTc1O2M9Yypqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fNTI+Pj4wO2pzcGIudXRpbHMuc3BsaXQ2NEhpZ2g9KGI8PDMxfGQrMTAyMzw8MjB8YSk+Pj4wO2pzcGIudXRpbHMuc3BsaXQ2NExvdz1jfX07XG5qc3BiLnV0aWxzLnNwbGl0SGFzaDY0PWZ1bmN0aW9uKGEpe3ZhciBiPWEuY2hhckNvZGVBdCgwKSxjPWEuY2hhckNvZGVBdCgxKSxkPWEuY2hhckNvZGVBdCgyKSxlPWEuY2hhckNvZGVBdCgzKSxmPWEuY2hhckNvZGVBdCg0KSxnPWEuY2hhckNvZGVBdCg1KSxoPWEuY2hhckNvZGVBdCg2KTthPWEuY2hhckNvZGVBdCg3KTtqc3BiLnV0aWxzLnNwbGl0NjRMb3c9YisoYzw8OCkrKGQ8PDE2KSsoZTw8MjQpPj4+MDtqc3BiLnV0aWxzLnNwbGl0NjRIaWdoPWYrKGc8PDgpKyhoPDwxNikrKGE8PDI0KT4+PjB9O2pzcGIudXRpbHMuam9pblVpbnQ2ND1mdW5jdGlvbihhLGIpe3JldHVybiBiKmpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMithfTtcbmpzcGIudXRpbHMuam9pbkludDY0PWZ1bmN0aW9uKGEsYil7dmFyIGM9YiYyMTQ3NDgzNjQ4O2MmJihhPX5hKzE+Pj4wLGI9fmI+Pj4wLDA9PWEmJihiPWIrMT4+PjApKTt2YXIgZD1qc3BiLnV0aWxzLmpvaW5VaW50NjQoYSxiKTtyZXR1cm4gYz8tZDpkfTtqc3BiLnV0aWxzLmpvaW5aaWd6YWc2ND1mdW5jdGlvbihhLGIpe3ZhciBjPWEmMTthPShhPj4+MXxiPDwzMSk+Pj4wO2I+Pj49MTtjJiYoYT1hKzE+Pj4wLDA9PWEmJihiPWIrMT4+PjApKTt2YXIgZD1qc3BiLnV0aWxzLmpvaW5VaW50NjQoYSxiKTtyZXR1cm4gYz8tZDpkfTtqc3BiLnV0aWxzLmpvaW5GbG9hdDMyPWZ1bmN0aW9uKGEsYil7dmFyIGM9MiooYT4+MzEpKzEsZD1hPj4+MjMmMjU1LGU9YSY4Mzg4NjA3O3JldHVybiAyNTU9PWQ/ZT9OYU46SW5maW5pdHkqYzowPT1kP2MqTWF0aC5wb3coMiwtMTQ5KSplOmMqTWF0aC5wb3coMixkLTE1MCkqKGUrTWF0aC5wb3coMiwyMykpfTtcbmpzcGIudXRpbHMuam9pbkZsb2F0NjQ9ZnVuY3Rpb24oYSxiKXt2YXIgYz0yKihiPj4zMSkrMSxkPWI+Pj4yMCYyMDQ3LGU9anNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMyKihiJjEwNDg1NzUpK2E7cmV0dXJuIDIwNDc9PWQ/ZT9OYU46SW5maW5pdHkqYzowPT1kP2MqTWF0aC5wb3coMiwtMTA3NCkqZTpjKk1hdGgucG93KDIsZC0xMDc1KSooZStqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fNTIpfTtqc3BiLnV0aWxzLmpvaW5IYXNoNjQ9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShhPj4+MCYyNTUsYT4+PjgmMjU1LGE+Pj4xNiYyNTUsYT4+PjI0JjI1NSxiPj4+MCYyNTUsYj4+PjgmMjU1LGI+Pj4xNiYyNTUsYj4+PjI0JjI1NSl9O2pzcGIudXRpbHMuRElHSVRTPVwiMDEyMzQ1Njc4OWFiY2RlZlwiLnNwbGl0KFwiXCIpO1xuanNwYi51dGlscy5qb2luVW5zaWduZWREZWNpbWFsU3RyaW5nPWZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYyhhKXtmb3IodmFyIGI9MUU3LGM9MDs3PmM7YysrKXt2YXIgYj1iLzEwLGQ9YS9iJTEwPj4+MDtpZigwIT1kfHxoKWg9ITAsays9Z1tkXX19aWYoMjA5NzE1MT49YilyZXR1cm5cIlwiKyhqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fMzIqYithKTt2YXIgZD0oYT4+PjI0fGI8PDgpPj4+MCYxNjc3NzIxNSxlPWI+PjE2JjY1NTM1LGY9KGEmMTY3NzcyMTUpKzY3NzcyMTYqZCs2NzEwNjU2KmUsZD1kKzgxNDc0OTcqZSxlPTIqZTsxRTc8PWYmJihkKz1NYXRoLmZsb29yKGYvMUU3KSxmJT0xRTcpOzFFNzw9ZCYmKGUrPU1hdGguZmxvb3IoZC8xRTcpLGQlPTFFNyk7dmFyIGc9anNwYi51dGlscy5ESUdJVFMsaD0hMSxrPVwiXCI7KGV8fGgpJiZjKGUpOyhkfHxoKSYmYyhkKTsoZnx8aCkmJmMoZik7cmV0dXJuIGt9O1xuanNwYi51dGlscy5qb2luU2lnbmVkRGVjaW1hbFN0cmluZz1mdW5jdGlvbihhLGIpe3ZhciBjPWImMjE0NzQ4MzY0ODtjJiYoYT1+YSsxPj4+MCxiPX5iKygwPT1hPzE6MCk+Pj4wKTt2YXIgZD1qc3BiLnV0aWxzLmpvaW5VbnNpZ25lZERlY2ltYWxTdHJpbmcoYSxiKTtyZXR1cm4gYz9cIi1cIitkOmR9O2pzcGIudXRpbHMuaGFzaDY0VG9EZWNpbWFsU3RyaW5nPWZ1bmN0aW9uKGEsYil7anNwYi51dGlscy5zcGxpdEhhc2g2NChhKTt2YXIgYz1qc3BiLnV0aWxzLnNwbGl0NjRMb3csZD1qc3BiLnV0aWxzLnNwbGl0NjRIaWdoO3JldHVybiBiP2pzcGIudXRpbHMuam9pblNpZ25lZERlY2ltYWxTdHJpbmcoYyxkKTpqc3BiLnV0aWxzLmpvaW5VbnNpZ25lZERlY2ltYWxTdHJpbmcoYyxkKX07XG5qc3BiLnV0aWxzLmhhc2g2NEFycmF5VG9EZWNpbWFsU3RyaW5ncz1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz1BcnJheShhLmxlbmd0aCksZD0wO2Q8YS5sZW5ndGg7ZCsrKWNbZF09anNwYi51dGlscy5oYXNoNjRUb0RlY2ltYWxTdHJpbmcoYVtkXSxiKTtyZXR1cm4gY307XG5qc3BiLnV0aWxzLmRlY2ltYWxTdHJpbmdUb0hhc2g2ND1mdW5jdGlvbihhKXtmdW5jdGlvbiBiKGEsYil7Zm9yKHZhciBjPTA7OD5jJiYoMSE9PWF8fDA8Yik7YysrKXt2YXIgZD1hKmVbY10rYjtlW2NdPWQmMjU1O2I9ZD4+Pjh9fWZ1bmN0aW9uIGMoKXtmb3IodmFyIGE9MDs4PmE7YSsrKWVbYV09fmVbYV0mMjU1fWdvb2cuYXNzZXJ0cy5hc3NlcnQoMDxhLmxlbmd0aCk7dmFyIGQ9ITE7XCItXCI9PT1hWzBdJiYoZD0hMCxhPWEuc2xpY2UoMSkpO2Zvcih2YXIgZT1bMCwwLDAsMCwwLDAsMCwwXSxmPTA7ZjxhLmxlbmd0aDtmKyspYigxMCxqc3BiLnV0aWxzLkRJR0lUUy5pbmRleE9mKGFbZl0pKTtkJiYoYygpLGIoMSwxKSk7cmV0dXJuIGdvb2cuY3J5cHQuYnl0ZUFycmF5VG9TdHJpbmcoZSl9O2pzcGIudXRpbHMuc3BsaXREZWNpbWFsU3RyaW5nPWZ1bmN0aW9uKGEpe2pzcGIudXRpbHMuc3BsaXRIYXNoNjQoanNwYi51dGlscy5kZWNpbWFsU3RyaW5nVG9IYXNoNjQoYSkpfTtcbmpzcGIudXRpbHMuaGFzaDY0VG9IZXhTdHJpbmc9ZnVuY3Rpb24oYSl7dmFyIGI9QXJyYXkoMTgpO2JbMF09XCIwXCI7YlsxXT1cInhcIjtmb3IodmFyIGM9MDs4PmM7YysrKXt2YXIgZD1hLmNoYXJDb2RlQXQoNy1jKTtiWzIqYysyXT1qc3BiLnV0aWxzLkRJR0lUU1tkPj40XTtiWzIqYyszXT1qc3BiLnV0aWxzLkRJR0lUU1tkJjE1XX1yZXR1cm4gYi5qb2luKFwiXCIpfTtqc3BiLnV0aWxzLmhleFN0cmluZ1RvSGFzaDY0PWZ1bmN0aW9uKGEpe2E9YS50b0xvd2VyQ2FzZSgpO2dvb2cuYXNzZXJ0cy5hc3NlcnQoMTg9PWEubGVuZ3RoKTtnb29nLmFzc2VydHMuYXNzZXJ0KFwiMFwiPT1hWzBdKTtnb29nLmFzc2VydHMuYXNzZXJ0KFwieFwiPT1hWzFdKTtmb3IodmFyIGI9XCJcIixjPTA7OD5jO2MrKyl2YXIgZD1qc3BiLnV0aWxzLkRJR0lUUy5pbmRleE9mKGFbMipjKzJdKSxlPWpzcGIudXRpbHMuRElHSVRTLmluZGV4T2YoYVsyKmMrM10pLGI9U3RyaW5nLmZyb21DaGFyQ29kZSgxNipkK2UpK2I7cmV0dXJuIGJ9O1xuanNwYi51dGlscy5oYXNoNjRUb051bWJlcj1mdW5jdGlvbihhLGIpe2pzcGIudXRpbHMuc3BsaXRIYXNoNjQoYSk7dmFyIGM9anNwYi51dGlscy5zcGxpdDY0TG93LGQ9anNwYi51dGlscy5zcGxpdDY0SGlnaDtyZXR1cm4gYj9qc3BiLnV0aWxzLmpvaW5JbnQ2NChjLGQpOmpzcGIudXRpbHMuam9pblVpbnQ2NChjLGQpfTtqc3BiLnV0aWxzLm51bWJlclRvSGFzaDY0PWZ1bmN0aW9uKGEpe2pzcGIudXRpbHMuc3BsaXRJbnQ2NChhKTtyZXR1cm4ganNwYi51dGlscy5qb2luSGFzaDY0KGpzcGIudXRpbHMuc3BsaXQ2NExvdyxqc3BiLnV0aWxzLnNwbGl0NjRIaWdoKX07anNwYi51dGlscy5jb3VudFZhcmludHM9ZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZD0wLGU9YjtlPGM7ZSsrKWQrPWFbZV0+Pjc7cmV0dXJuIGMtYi1kfTtcbmpzcGIudXRpbHMuY291bnRWYXJpbnRGaWVsZHM9ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9MDtkPTgqZCtqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5WQVJJTlQ7aWYoMTI4PmQpZm9yKDtiPGMmJmFbYisrXT09ZDspZm9yKGUrKzs7KXt2YXIgZj1hW2IrK107aWYoMD09KGYmMTI4KSlicmVha31lbHNlIGZvcig7YjxjOyl7Zm9yKGY9ZDsxMjg8Zjspe2lmKGFbYl0hPShmJjEyN3wxMjgpKXJldHVybiBlO2IrKztmPj49N31pZihhW2IrK10hPWYpYnJlYWs7Zm9yKGUrKztmPWFbYisrXSwwIT0oZiYxMjgpOyk7fXJldHVybiBlfTtqc3BiLnV0aWxzLmNvdW50Rml4ZWRGaWVsZHNfPWZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9MDtpZigxMjg+ZClmb3IoO2I8YyYmYVtiKytdPT1kOylmKyssYis9ZTtlbHNlIGZvcig7YjxjOyl7Zm9yKHZhciBnPWQ7MTI4PGc7KXtpZihhW2IrK10hPShnJjEyN3wxMjgpKXJldHVybiBmO2c+Pj03fWlmKGFbYisrXSE9ZylicmVhaztmKys7Yis9ZX1yZXR1cm4gZn07XG5qc3BiLnV0aWxzLmNvdW50Rml4ZWQzMkZpZWxkcz1mdW5jdGlvbihhLGIsYyxkKXtyZXR1cm4ganNwYi51dGlscy5jb3VudEZpeGVkRmllbGRzXyhhLGIsYyw4KmQranNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuRklYRUQzMiw0KX07anNwYi51dGlscy5jb3VudEZpeGVkNjRGaWVsZHM9ZnVuY3Rpb24oYSxiLGMsZCl7cmV0dXJuIGpzcGIudXRpbHMuY291bnRGaXhlZEZpZWxkc18oYSxiLGMsOCpkK2pzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkZJWEVENjQsOCl9O1xuanNwYi51dGlscy5jb3VudERlbGltaXRlZEZpZWxkcz1mdW5jdGlvbihhLGIsYyxkKXt2YXIgZT0wO2ZvcihkPTgqZCtqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5ERUxJTUlURUQ7YjxjOyl7Zm9yKHZhciBmPWQ7MTI4PGY7KXtpZihhW2IrK10hPShmJjEyN3wxMjgpKXJldHVybiBlO2Y+Pj03fWlmKGFbYisrXSE9ZilicmVhaztlKys7Zm9yKHZhciBnPTAsaD0xO2Y9YVtiKytdLGcrPShmJjEyNykqaCxoKj0xMjgsMCE9KGYmMTI4KTspO2IrPWd9cmV0dXJuIGV9O2pzcGIudXRpbHMuZGVidWdCeXRlc1RvVGV4dEZvcm1hdD1mdW5jdGlvbihhKXt2YXIgYj0nXCInO2lmKGEpe2E9anNwYi51dGlscy5ieXRlU291cmNlVG9VaW50OEFycmF5KGEpO2Zvcih2YXIgYz0wO2M8YS5sZW5ndGg7YysrKWIrPVwiXFxcXHhcIiwxNj5hW2NdJiYoYis9XCIwXCIpLGIrPWFbY10udG9TdHJpbmcoMTYpfXJldHVybiBiKydcIid9O1xuanNwYi51dGlscy5kZWJ1Z1NjYWxhclRvVGV4dEZvcm1hdD1mdW5jdGlvbihhKXtyZXR1cm4gZ29vZy5pc1N0cmluZyhhKT9nb29nLnN0cmluZy5xdW90ZShhKTphLnRvU3RyaW5nKCl9O2pzcGIudXRpbHMuc3RyaW5nVG9CeXRlQXJyYXk9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPW5ldyBVaW50OEFycmF5KGEubGVuZ3RoKSxjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPWEuY2hhckNvZGVBdChjKTtpZigyNTU8ZCl0aHJvdyBFcnJvcihcIkNvbnZlcnNpb24gZXJyb3I6IHN0cmluZyBjb250YWlucyBjb2RlcG9pbnQgb3V0c2lkZSBvZiBieXRlIHJhbmdlXCIpO2JbY109ZH1yZXR1cm4gYn07XG5qc3BiLnV0aWxzLmJ5dGVTb3VyY2VUb1VpbnQ4QXJyYXk9ZnVuY3Rpb24oYSl7aWYoYS5jb25zdHJ1Y3Rvcj09PVVpbnQ4QXJyYXkpcmV0dXJuIGE7aWYoYS5jb25zdHJ1Y3Rvcj09PUFycmF5QnVmZmVyfHxcInVuZGVmaW5lZFwiIT10eXBlb2YgQnVmZmVyJiZhLmNvbnN0cnVjdG9yPT09QnVmZmVyfHxhLmNvbnN0cnVjdG9yPT09QXJyYXkpcmV0dXJuIG5ldyBVaW50OEFycmF5KGEpO2lmKGEuY29uc3RydWN0b3I9PT1TdHJpbmcpcmV0dXJuIGdvb2cuY3J5cHQuYmFzZTY0LmRlY29kZVN0cmluZ1RvVWludDhBcnJheShhKTtnb29nLmFzc2VydHMuZmFpbChcIlR5cGUgbm90IGNvbnZlcnRpYmxlIHRvIFVpbnQ4QXJyYXkuXCIpO3JldHVybiBuZXcgVWludDhBcnJheSgwKX07anNwYi5CaW5hcnlJdGVyYXRvcj1mdW5jdGlvbihhLGIsYyl7dGhpcy5lbGVtZW50c189dGhpcy5uZXh0TWV0aG9kXz10aGlzLmRlY29kZXJfPW51bGw7dGhpcy5jdXJzb3JfPTA7dGhpcy5uZXh0VmFsdWVfPW51bGw7dGhpcy5hdEVuZF89ITA7dGhpcy5pbml0XyhhLGIsYyl9O2pzcGIuQmluYXJ5SXRlcmF0b3IucHJvdG90eXBlLmluaXRfPWZ1bmN0aW9uKGEsYixjKXthJiZiJiYodGhpcy5kZWNvZGVyXz1hLHRoaXMubmV4dE1ldGhvZF89Yik7dGhpcy5lbGVtZW50c189Y3x8bnVsbDt0aGlzLmN1cnNvcl89MDt0aGlzLm5leHRWYWx1ZV89bnVsbDt0aGlzLmF0RW5kXz0hdGhpcy5kZWNvZGVyXyYmIXRoaXMuZWxlbWVudHNfO3RoaXMubmV4dCgpfTtqc3BiLkJpbmFyeUl0ZXJhdG9yLmluc3RhbmNlQ2FjaGVfPVtdO1xuanNwYi5CaW5hcnlJdGVyYXRvci5hbGxvYz1mdW5jdGlvbihhLGIsYyl7aWYoanNwYi5CaW5hcnlJdGVyYXRvci5pbnN0YW5jZUNhY2hlXy5sZW5ndGgpe3ZhciBkPWpzcGIuQmluYXJ5SXRlcmF0b3IuaW5zdGFuY2VDYWNoZV8ucG9wKCk7ZC5pbml0XyhhLGIsYyk7cmV0dXJuIGR9cmV0dXJuIG5ldyBqc3BiLkJpbmFyeUl0ZXJhdG9yKGEsYixjKX07anNwYi5CaW5hcnlJdGVyYXRvci5wcm90b3R5cGUuZnJlZT1mdW5jdGlvbigpe3RoaXMuY2xlYXIoKTsxMDA+anNwYi5CaW5hcnlJdGVyYXRvci5pbnN0YW5jZUNhY2hlXy5sZW5ndGgmJmpzcGIuQmluYXJ5SXRlcmF0b3IuaW5zdGFuY2VDYWNoZV8ucHVzaCh0aGlzKX07XG5qc3BiLkJpbmFyeUl0ZXJhdG9yLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuZGVjb2Rlcl8mJnRoaXMuZGVjb2Rlcl8uZnJlZSgpO3RoaXMuZWxlbWVudHNfPXRoaXMubmV4dE1ldGhvZF89dGhpcy5kZWNvZGVyXz1udWxsO3RoaXMuY3Vyc29yXz0wO3RoaXMubmV4dFZhbHVlXz1udWxsO3RoaXMuYXRFbmRfPSEwfTtqc3BiLkJpbmFyeUl0ZXJhdG9yLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5uZXh0VmFsdWVffTtqc3BiLkJpbmFyeUl0ZXJhdG9yLnByb3RvdHlwZS5hdEVuZD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmF0RW5kX307XG5qc3BiLkJpbmFyeUl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5uZXh0VmFsdWVfO3RoaXMuZGVjb2Rlcl8/dGhpcy5kZWNvZGVyXy5hdEVuZCgpPyh0aGlzLm5leHRWYWx1ZV89bnVsbCx0aGlzLmF0RW5kXz0hMCk6dGhpcy5uZXh0VmFsdWVfPXRoaXMubmV4dE1ldGhvZF8uY2FsbCh0aGlzLmRlY29kZXJfKTp0aGlzLmVsZW1lbnRzXyYmKHRoaXMuY3Vyc29yXz09dGhpcy5lbGVtZW50c18ubGVuZ3RoPyh0aGlzLm5leHRWYWx1ZV89bnVsbCx0aGlzLmF0RW5kXz0hMCk6dGhpcy5uZXh0VmFsdWVfPXRoaXMuZWxlbWVudHNfW3RoaXMuY3Vyc29yXysrXSk7cmV0dXJuIGF9O2pzcGIuQmluYXJ5RGVjb2Rlcj1mdW5jdGlvbihhLGIsYyl7dGhpcy5ieXRlc189bnVsbDt0aGlzLnRlbXBIaWdoXz10aGlzLnRlbXBMb3dfPXRoaXMuY3Vyc29yXz10aGlzLmVuZF89dGhpcy5zdGFydF89MDt0aGlzLmVycm9yXz0hMTthJiZ0aGlzLnNldEJsb2NrKGEsYixjKX07XG5qc3BiLkJpbmFyeURlY29kZXIuaW5zdGFuY2VDYWNoZV89W107anNwYi5CaW5hcnlEZWNvZGVyLmFsbG9jPWZ1bmN0aW9uKGEsYixjKXtpZihqc3BiLkJpbmFyeURlY29kZXIuaW5zdGFuY2VDYWNoZV8ubGVuZ3RoKXt2YXIgZD1qc3BiLkJpbmFyeURlY29kZXIuaW5zdGFuY2VDYWNoZV8ucG9wKCk7YSYmZC5zZXRCbG9jayhhLGIsYyk7cmV0dXJuIGR9cmV0dXJuIG5ldyBqc3BiLkJpbmFyeURlY29kZXIoYSxiLGMpfTtqc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLmZyZWU9ZnVuY3Rpb24oKXt0aGlzLmNsZWFyKCk7MTAwPmpzcGIuQmluYXJ5RGVjb2Rlci5pbnN0YW5jZUNhY2hlXy5sZW5ndGgmJmpzcGIuQmluYXJ5RGVjb2Rlci5pbnN0YW5jZUNhY2hlXy5wdXNoKHRoaXMpfTtqc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLmNsb25lPWZ1bmN0aW9uKCl7cmV0dXJuIGpzcGIuQmluYXJ5RGVjb2Rlci5hbGxvYyh0aGlzLmJ5dGVzXyx0aGlzLnN0YXJ0Xyx0aGlzLmVuZF8tdGhpcy5zdGFydF8pfTtcbmpzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt0aGlzLmJ5dGVzXz1udWxsO3RoaXMuY3Vyc29yXz10aGlzLmVuZF89dGhpcy5zdGFydF89MDt0aGlzLmVycm9yXz0hMX07anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5nZXRCdWZmZXI9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5ieXRlc199O2pzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUuc2V0QmxvY2s9ZnVuY3Rpb24oYSxiLGMpe3RoaXMuYnl0ZXNfPWpzcGIudXRpbHMuYnl0ZVNvdXJjZVRvVWludDhBcnJheShhKTt0aGlzLnN0YXJ0Xz1nb29nLmlzRGVmKGIpP2I6MDt0aGlzLmVuZF89Z29vZy5pc0RlZihjKT90aGlzLnN0YXJ0XytjOnRoaXMuYnl0ZXNfLmxlbmd0aDt0aGlzLmN1cnNvcl89dGhpcy5zdGFydF99O2pzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUuZ2V0RW5kPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZW5kX307XG5qc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnNldEVuZD1mdW5jdGlvbihhKXt0aGlzLmVuZF89YX07anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5yZXNldD1mdW5jdGlvbigpe3RoaXMuY3Vyc29yXz10aGlzLnN0YXJ0X307anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5nZXRDdXJzb3I9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jdXJzb3JffTtqc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnNldEN1cnNvcj1mdW5jdGlvbihhKXt0aGlzLmN1cnNvcl89YX07anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5hZHZhbmNlPWZ1bmN0aW9uKGEpe3RoaXMuY3Vyc29yXys9YTtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMuY3Vyc29yXzw9dGhpcy5lbmRfKX07anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5hdEVuZD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmN1cnNvcl89PXRoaXMuZW5kX307XG5qc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnBhc3RFbmQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jdXJzb3JfPnRoaXMuZW5kX307anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5nZXRFcnJvcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVycm9yX3x8MD50aGlzLmN1cnNvcl98fHRoaXMuY3Vyc29yXz50aGlzLmVuZF99O1xuanNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5yZWFkU3BsaXRWYXJpbnQ2NF89ZnVuY3Rpb24oKXtmb3IodmFyIGEsYj0wLGMsZD0wOzQ+ZDtkKyspaWYoYT10aGlzLmJ5dGVzX1t0aGlzLmN1cnNvcl8rK10sYnw9KGEmMTI3KTw8NypkLDEyOD5hKXt0aGlzLnRlbXBMb3dfPWI+Pj4wO3RoaXMudGVtcEhpZ2hfPTA7cmV0dXJufWE9dGhpcy5ieXRlc19bdGhpcy5jdXJzb3JfKytdO2J8PShhJjEyNyk8PDI4O2M9MHwoYSYxMjcpPj40O2lmKDEyOD5hKXRoaXMudGVtcExvd189Yj4+PjAsdGhpcy50ZW1wSGlnaF89Yz4+PjA7ZWxzZXtmb3IoZD0wOzU+ZDtkKyspaWYoYT10aGlzLmJ5dGVzX1t0aGlzLmN1cnNvcl8rK10sY3w9KGEmMTI3KTw8NypkKzMsMTI4PmEpe3RoaXMudGVtcExvd189Yj4+PjA7dGhpcy50ZW1wSGlnaF89Yz4+PjA7cmV0dXJufWdvb2cuYXNzZXJ0cy5mYWlsKFwiRmFpbGVkIHRvIHJlYWQgdmFyaW50LCBlbmNvZGluZyBpcyBpbnZhbGlkLlwiKTt0aGlzLmVycm9yXz1cbiEwfX07anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5za2lwVmFyaW50PWZ1bmN0aW9uKCl7Zm9yKDt0aGlzLmJ5dGVzX1t0aGlzLmN1cnNvcl9dJjEyODspdGhpcy5jdXJzb3JfKys7dGhpcy5jdXJzb3JfKyt9O2pzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUudW5za2lwVmFyaW50PWZ1bmN0aW9uKGEpe2Zvcig7MTI4PGE7KXRoaXMuY3Vyc29yXy0tLGE+Pj49Nzt0aGlzLmN1cnNvcl8tLX07XG5qc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRVbnNpZ25lZFZhcmludDMyPWZ1bmN0aW9uKCl7dmFyIGEsYj10aGlzLmJ5dGVzXzthPWJbdGhpcy5jdXJzb3JfKzBdO3ZhciBjPWEmMTI3O2lmKDEyOD5hKXJldHVybiB0aGlzLmN1cnNvcl8rPTEsZ29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLmN1cnNvcl88PXRoaXMuZW5kXyksYzthPWJbdGhpcy5jdXJzb3JfKzFdO2N8PShhJjEyNyk8PDc7aWYoMTI4PmEpcmV0dXJuIHRoaXMuY3Vyc29yXys9Mixnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMuY3Vyc29yXzw9dGhpcy5lbmRfKSxjO2E9Ylt0aGlzLmN1cnNvcl8rMl07Y3w9KGEmMTI3KTw8MTQ7aWYoMTI4PmEpcmV0dXJuIHRoaXMuY3Vyc29yXys9Myxnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMuY3Vyc29yXzw9dGhpcy5lbmRfKSxjO2E9Ylt0aGlzLmN1cnNvcl8rM107Y3w9KGEmMTI3KTw8MjE7aWYoMTI4PmEpcmV0dXJuIHRoaXMuY3Vyc29yXys9NCxnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMuY3Vyc29yXzw9XG50aGlzLmVuZF8pLGM7YT1iW3RoaXMuY3Vyc29yXys0XTtjfD0oYSYxNSk8PDI4O2lmKDEyOD5hKXJldHVybiB0aGlzLmN1cnNvcl8rPTUsZ29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLmN1cnNvcl88PXRoaXMuZW5kXyksYz4+PjA7dGhpcy5jdXJzb3JfKz01OzEyODw9Ylt0aGlzLmN1cnNvcl8rK10mJjEyODw9Ylt0aGlzLmN1cnNvcl8rK10mJjEyODw9Ylt0aGlzLmN1cnNvcl8rK10mJjEyODw9Ylt0aGlzLmN1cnNvcl8rK10mJjEyODw9Ylt0aGlzLmN1cnNvcl8rK10mJmdvb2cuYXNzZXJ0cy5hc3NlcnQoITEpO2dvb2cuYXNzZXJ0cy5hc3NlcnQodGhpcy5jdXJzb3JfPD10aGlzLmVuZF8pO3JldHVybiBjfTtqc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRTaWduZWRWYXJpbnQzMj1qc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRVbnNpZ25lZFZhcmludDMyO2pzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUucmVhZFVuc2lnbmVkVmFyaW50MzJTdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFkVW5zaWduZWRWYXJpbnQzMigpLnRvU3RyaW5nKCl9O1xuanNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5yZWFkU2lnbmVkVmFyaW50MzJTdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFkU2lnbmVkVmFyaW50MzIoKS50b1N0cmluZygpfTtqc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRaaWd6YWdWYXJpbnQzMj1mdW5jdGlvbigpe3ZhciBhPXRoaXMucmVhZFVuc2lnbmVkVmFyaW50MzIoKTtyZXR1cm4gYT4+PjFeLShhJjEpfTtqc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRVbnNpZ25lZFZhcmludDY0PWZ1bmN0aW9uKCl7dGhpcy5yZWFkU3BsaXRWYXJpbnQ2NF8oKTtyZXR1cm4ganNwYi51dGlscy5qb2luVWludDY0KHRoaXMudGVtcExvd18sdGhpcy50ZW1wSGlnaF8pfTtcbmpzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUucmVhZFVuc2lnbmVkVmFyaW50NjRTdHJpbmc9ZnVuY3Rpb24oKXt0aGlzLnJlYWRTcGxpdFZhcmludDY0XygpO3JldHVybiBqc3BiLnV0aWxzLmpvaW5VbnNpZ25lZERlY2ltYWxTdHJpbmcodGhpcy50ZW1wTG93Xyx0aGlzLnRlbXBIaWdoXyl9O2pzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUucmVhZFNpZ25lZFZhcmludDY0PWZ1bmN0aW9uKCl7dGhpcy5yZWFkU3BsaXRWYXJpbnQ2NF8oKTtyZXR1cm4ganNwYi51dGlscy5qb2luSW50NjQodGhpcy50ZW1wTG93Xyx0aGlzLnRlbXBIaWdoXyl9O2pzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUucmVhZFNpZ25lZFZhcmludDY0U3RyaW5nPWZ1bmN0aW9uKCl7dGhpcy5yZWFkU3BsaXRWYXJpbnQ2NF8oKTtyZXR1cm4ganNwYi51dGlscy5qb2luU2lnbmVkRGVjaW1hbFN0cmluZyh0aGlzLnRlbXBMb3dfLHRoaXMudGVtcEhpZ2hfKX07XG5qc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRaaWd6YWdWYXJpbnQ2ND1mdW5jdGlvbigpe3RoaXMucmVhZFNwbGl0VmFyaW50NjRfKCk7cmV0dXJuIGpzcGIudXRpbHMuam9pblppZ3phZzY0KHRoaXMudGVtcExvd18sdGhpcy50ZW1wSGlnaF8pfTtqc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRaaWd6YWdWYXJpbnQ2NFN0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnJlYWRaaWd6YWdWYXJpbnQ2NCgpLnRvU3RyaW5nKCl9O2pzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUucmVhZFVpbnQ4PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5ieXRlc19bdGhpcy5jdXJzb3JfKzBdO3RoaXMuY3Vyc29yXys9MTtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMuY3Vyc29yXzw9dGhpcy5lbmRfKTtyZXR1cm4gYX07XG5qc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRVaW50MTY9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmJ5dGVzX1t0aGlzLmN1cnNvcl8rMF0sYj10aGlzLmJ5dGVzX1t0aGlzLmN1cnNvcl8rMV07dGhpcy5jdXJzb3JfKz0yO2dvb2cuYXNzZXJ0cy5hc3NlcnQodGhpcy5jdXJzb3JfPD10aGlzLmVuZF8pO3JldHVybiBhPDwwfGI8PDh9O2pzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUucmVhZFVpbnQzMj1mdW5jdGlvbigpe3ZhciBhPXRoaXMuYnl0ZXNfW3RoaXMuY3Vyc29yXyswXSxiPXRoaXMuYnl0ZXNfW3RoaXMuY3Vyc29yXysxXSxjPXRoaXMuYnl0ZXNfW3RoaXMuY3Vyc29yXysyXSxkPXRoaXMuYnl0ZXNfW3RoaXMuY3Vyc29yXyszXTt0aGlzLmN1cnNvcl8rPTQ7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLmN1cnNvcl88PXRoaXMuZW5kXyk7cmV0dXJuKGE8PDB8Yjw8OHxjPDwxNnxkPDwyNCk+Pj4wfTtcbmpzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUucmVhZFVpbnQ2ND1mdW5jdGlvbigpe3ZhciBhPXRoaXMucmVhZFVpbnQzMigpLGI9dGhpcy5yZWFkVWludDMyKCk7cmV0dXJuIGpzcGIudXRpbHMuam9pblVpbnQ2NChhLGIpfTtqc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRVaW50NjRTdHJpbmc9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnJlYWRVaW50MzIoKSxiPXRoaXMucmVhZFVpbnQzMigpO3JldHVybiBqc3BiLnV0aWxzLmpvaW5VbnNpZ25lZERlY2ltYWxTdHJpbmcoYSxiKX07anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5yZWFkSW50OD1mdW5jdGlvbigpe3ZhciBhPXRoaXMuYnl0ZXNfW3RoaXMuY3Vyc29yXyswXTt0aGlzLmN1cnNvcl8rPTE7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLmN1cnNvcl88PXRoaXMuZW5kXyk7cmV0dXJuIGE8PDI0Pj4yNH07XG5qc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRJbnQxNj1mdW5jdGlvbigpe3ZhciBhPXRoaXMuYnl0ZXNfW3RoaXMuY3Vyc29yXyswXSxiPXRoaXMuYnl0ZXNfW3RoaXMuY3Vyc29yXysxXTt0aGlzLmN1cnNvcl8rPTI7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLmN1cnNvcl88PXRoaXMuZW5kXyk7cmV0dXJuKGE8PDB8Yjw8OCk8PDE2Pj4xNn07anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5yZWFkSW50MzI9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmJ5dGVzX1t0aGlzLmN1cnNvcl8rMF0sYj10aGlzLmJ5dGVzX1t0aGlzLmN1cnNvcl8rMV0sYz10aGlzLmJ5dGVzX1t0aGlzLmN1cnNvcl8rMl0sZD10aGlzLmJ5dGVzX1t0aGlzLmN1cnNvcl8rM107dGhpcy5jdXJzb3JfKz00O2dvb2cuYXNzZXJ0cy5hc3NlcnQodGhpcy5jdXJzb3JfPD10aGlzLmVuZF8pO3JldHVybiBhPDwwfGI8PDh8Yzw8MTZ8ZDw8MjR9O1xuanNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5yZWFkSW50NjQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnJlYWRVaW50MzIoKSxiPXRoaXMucmVhZFVpbnQzMigpO3JldHVybiBqc3BiLnV0aWxzLmpvaW5JbnQ2NChhLGIpfTtqc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRJbnQ2NFN0cmluZz1mdW5jdGlvbigpe3ZhciBhPXRoaXMucmVhZFVpbnQzMigpLGI9dGhpcy5yZWFkVWludDMyKCk7cmV0dXJuIGpzcGIudXRpbHMuam9pblNpZ25lZERlY2ltYWxTdHJpbmcoYSxiKX07anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5yZWFkRmxvYXQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnJlYWRVaW50MzIoKTtyZXR1cm4ganNwYi51dGlscy5qb2luRmxvYXQzMihhLDApfTtcbmpzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUucmVhZERvdWJsZT1mdW5jdGlvbigpe3ZhciBhPXRoaXMucmVhZFVpbnQzMigpLGI9dGhpcy5yZWFkVWludDMyKCk7cmV0dXJuIGpzcGIudXRpbHMuam9pbkZsb2F0NjQoYSxiKX07anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5yZWFkQm9vbD1mdW5jdGlvbigpe3JldHVybiEhdGhpcy5ieXRlc19bdGhpcy5jdXJzb3JfKytdfTtqc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRFbnVtPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVhZFNpZ25lZFZhcmludDMyKCl9O1xuanNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5yZWFkU3RyaW5nPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuYnl0ZXNfLGM9dGhpcy5jdXJzb3JfO2E9YythO2Zvcih2YXIgZD1bXSxlPVwiXCI7YzxhOyl7dmFyIGY9YltjKytdO2lmKDEyOD5mKWQucHVzaChmKTtlbHNlIGlmKDE5Mj5mKWNvbnRpbnVlO2Vsc2UgaWYoMjI0PmYpe3ZhciBnPWJbYysrXTtkLnB1c2goKGYmMzEpPDw2fGcmNjMpfWVsc2UgaWYoMjQwPmYpe3ZhciBnPWJbYysrXSxoPWJbYysrXTtkLnB1c2goKGYmMTUpPDwxMnwoZyY2Myk8PDZ8aCY2Myl9ZWxzZSBpZigyNDg+Zil7dmFyIGc9YltjKytdLGg9YltjKytdLGs9YltjKytdLGY9KGYmNyk8PDE4fChnJjYzKTw8MTJ8KGgmNjMpPDw2fGsmNjMsZj1mLTY1NTM2O2QucHVzaCgoZj4+MTAmMTAyMykrNTUyOTYsKGYmMTAyMykrNTYzMjApfTgxOTI8PWQubGVuZ3RoJiYoZSs9U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGQpLGQubGVuZ3RoPTApfWUrPWdvb2cuY3J5cHQuYnl0ZUFycmF5VG9TdHJpbmcoZCk7XG50aGlzLmN1cnNvcl89YztyZXR1cm4gZX07anNwYi5CaW5hcnlEZWNvZGVyLnByb3RvdHlwZS5yZWFkU3RyaW5nV2l0aExlbmd0aD1mdW5jdGlvbigpe3ZhciBhPXRoaXMucmVhZFVuc2lnbmVkVmFyaW50MzIoKTtyZXR1cm4gdGhpcy5yZWFkU3RyaW5nKGEpfTtqc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRCeXRlcz1mdW5jdGlvbihhKXtpZigwPmF8fHRoaXMuY3Vyc29yXythPnRoaXMuYnl0ZXNfLmxlbmd0aClyZXR1cm4gdGhpcy5lcnJvcl89ITAsZ29vZy5hc3NlcnRzLmZhaWwoXCJJbnZhbGlkIGJ5dGUgbGVuZ3RoIVwiKSxuZXcgVWludDhBcnJheSgwKTt2YXIgYj10aGlzLmJ5dGVzXy5zdWJhcnJheSh0aGlzLmN1cnNvcl8sdGhpcy5jdXJzb3JfK2EpO3RoaXMuY3Vyc29yXys9YTtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMuY3Vyc29yXzw9dGhpcy5lbmRfKTtyZXR1cm4gYn07XG5qc3BiLkJpbmFyeURlY29kZXIucHJvdG90eXBlLnJlYWRWYXJpbnRIYXNoNjQ9ZnVuY3Rpb24oKXt0aGlzLnJlYWRTcGxpdFZhcmludDY0XygpO3JldHVybiBqc3BiLnV0aWxzLmpvaW5IYXNoNjQodGhpcy50ZW1wTG93Xyx0aGlzLnRlbXBIaWdoXyl9O2pzcGIuQmluYXJ5RGVjb2Rlci5wcm90b3R5cGUucmVhZEZpeGVkSGFzaDY0PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5ieXRlc18sYj10aGlzLmN1cnNvcl8sYz1hW2IrMF0sZD1hW2IrMV0sZT1hW2IrMl0sZj1hW2IrM10sZz1hW2IrNF0saD1hW2IrNV0saz1hW2IrNl0sYT1hW2IrN107dGhpcy5jdXJzb3JfKz04O3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGMsZCxlLGYsZyxoLGssYSl9O2pzcGIuQmluYXJ5UmVhZGVyPWZ1bmN0aW9uKGEsYixjKXt0aGlzLmRlY29kZXJfPWpzcGIuQmluYXJ5RGVjb2Rlci5hbGxvYyhhLGIsYyk7dGhpcy5maWVsZEN1cnNvcl89dGhpcy5kZWNvZGVyXy5nZXRDdXJzb3IoKTt0aGlzLm5leHRGaWVsZF89anNwYi5CaW5hcnlDb25zdGFudHMuSU5WQUxJRF9GSUVMRF9OVU1CRVI7dGhpcy5uZXh0V2lyZVR5cGVfPWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLklOVkFMSUQ7dGhpcy5lcnJvcl89ITE7dGhpcy5yZWFkQ2FsbGJhY2tzXz1udWxsfTtqc3BiLkJpbmFyeVJlYWRlci5pbnN0YW5jZUNhY2hlXz1bXTtcbmpzcGIuQmluYXJ5UmVhZGVyLmFsbG9jPWZ1bmN0aW9uKGEsYixjKXtpZihqc3BiLkJpbmFyeVJlYWRlci5pbnN0YW5jZUNhY2hlXy5sZW5ndGgpe3ZhciBkPWpzcGIuQmluYXJ5UmVhZGVyLmluc3RhbmNlQ2FjaGVfLnBvcCgpO2EmJmQuZGVjb2Rlcl8uc2V0QmxvY2soYSxiLGMpO3JldHVybiBkfXJldHVybiBuZXcganNwYi5CaW5hcnlSZWFkZXIoYSxiLGMpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUuYWxsb2M9anNwYi5CaW5hcnlSZWFkZXIuYWxsb2M7XG5qc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUuZnJlZT1mdW5jdGlvbigpe3RoaXMuZGVjb2Rlcl8uY2xlYXIoKTt0aGlzLm5leHRGaWVsZF89anNwYi5CaW5hcnlDb25zdGFudHMuSU5WQUxJRF9GSUVMRF9OVU1CRVI7dGhpcy5uZXh0V2lyZVR5cGVfPWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLklOVkFMSUQ7dGhpcy5lcnJvcl89ITE7dGhpcy5yZWFkQ2FsbGJhY2tzXz1udWxsOzEwMD5qc3BiLkJpbmFyeVJlYWRlci5pbnN0YW5jZUNhY2hlXy5sZW5ndGgmJmpzcGIuQmluYXJ5UmVhZGVyLmluc3RhbmNlQ2FjaGVfLnB1c2godGhpcyl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5nZXRGaWVsZEN1cnNvcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmZpZWxkQ3Vyc29yX307anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLmdldEN1cnNvcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmRlY29kZXJfLmdldEN1cnNvcigpfTtcbmpzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5nZXRCdWZmZXI9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kZWNvZGVyXy5nZXRCdWZmZXIoKX07anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLmdldEZpZWxkTnVtYmVyPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubmV4dEZpZWxkX307anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLmdldFdpcmVUeXBlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubmV4dFdpcmVUeXBlX307anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLmlzRW5kR3JvdXA9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5uZXh0V2lyZVR5cGVfPT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5FTkRfR1JPVVB9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5nZXRFcnJvcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVycm9yX3x8dGhpcy5kZWNvZGVyXy5nZXRFcnJvcigpfTtcbmpzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5zZXRCbG9jaz1mdW5jdGlvbihhLGIsYyl7dGhpcy5kZWNvZGVyXy5zZXRCbG9jayhhLGIsYyk7dGhpcy5uZXh0RmllbGRfPWpzcGIuQmluYXJ5Q29uc3RhbnRzLklOVkFMSURfRklFTERfTlVNQkVSO3RoaXMubmV4dFdpcmVUeXBlXz1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5JTlZBTElEfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVzZXQ9ZnVuY3Rpb24oKXt0aGlzLmRlY29kZXJfLnJlc2V0KCk7dGhpcy5uZXh0RmllbGRfPWpzcGIuQmluYXJ5Q29uc3RhbnRzLklOVkFMSURfRklFTERfTlVNQkVSO3RoaXMubmV4dFdpcmVUeXBlXz1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5JTlZBTElEfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUuYWR2YW5jZT1mdW5jdGlvbihhKXt0aGlzLmRlY29kZXJfLmFkdmFuY2UoYSl9O1xuanNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLm5leHRGaWVsZD1mdW5jdGlvbigpe2lmKHRoaXMuZGVjb2Rlcl8uYXRFbmQoKSlyZXR1cm4hMTtpZih0aGlzLmdldEVycm9yKCkpcmV0dXJuIGdvb2cuYXNzZXJ0cy5mYWlsKFwiRGVjb2RlciBoaXQgYW4gZXJyb3JcIiksITE7dGhpcy5maWVsZEN1cnNvcl89dGhpcy5kZWNvZGVyXy5nZXRDdXJzb3IoKTt2YXIgYT10aGlzLmRlY29kZXJfLnJlYWRVbnNpZ25lZFZhcmludDMyKCksYj1hPj4+MyxhPWEmNztpZihhIT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5WQVJJTlQmJmEhPWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkZJWEVEMzImJmEhPWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkZJWEVENjQmJmEhPWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkRFTElNSVRFRCYmYSE9anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuU1RBUlRfR1JPVVAmJmEhPWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkVORF9HUk9VUClyZXR1cm4gZ29vZy5hc3NlcnRzLmZhaWwoXCJJbnZhbGlkIHdpcmUgdHlwZTogJXMgKGF0IHBvc2l0aW9uICVzKVwiLFxuYSx0aGlzLmZpZWxkQ3Vyc29yXyksdGhpcy5lcnJvcl89ITAsITE7dGhpcy5uZXh0RmllbGRfPWI7dGhpcy5uZXh0V2lyZVR5cGVfPWE7cmV0dXJuITB9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS51bnNraXBIZWFkZXI9ZnVuY3Rpb24oKXt0aGlzLmRlY29kZXJfLnVuc2tpcFZhcmludCh0aGlzLm5leHRGaWVsZF88PDN8dGhpcy5uZXh0V2lyZVR5cGVfKX07anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnNraXBNYXRjaGluZ0ZpZWxkcz1mdW5jdGlvbigpe3ZhciBhPXRoaXMubmV4dEZpZWxkXztmb3IodGhpcy51bnNraXBIZWFkZXIoKTt0aGlzLm5leHRGaWVsZCgpJiZ0aGlzLmdldEZpZWxkTnVtYmVyKCk9PWE7KXRoaXMuc2tpcEZpZWxkKCk7dGhpcy5kZWNvZGVyXy5hdEVuZCgpfHx0aGlzLnVuc2tpcEhlYWRlcigpfTtcbmpzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5za2lwVmFyaW50RmllbGQ9ZnVuY3Rpb24oKXt0aGlzLm5leHRXaXJlVHlwZV8hPWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlZBUklOVD8oZ29vZy5hc3NlcnRzLmZhaWwoXCJJbnZhbGlkIHdpcmUgdHlwZSBmb3Igc2tpcFZhcmludEZpZWxkXCIpLHRoaXMuc2tpcEZpZWxkKCkpOnRoaXMuZGVjb2Rlcl8uc2tpcFZhcmludCgpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUuc2tpcERlbGltaXRlZEZpZWxkPWZ1bmN0aW9uKCl7aWYodGhpcy5uZXh0V2lyZVR5cGVfIT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5ERUxJTUlURUQpZ29vZy5hc3NlcnRzLmZhaWwoXCJJbnZhbGlkIHdpcmUgdHlwZSBmb3Igc2tpcERlbGltaXRlZEZpZWxkXCIpLHRoaXMuc2tpcEZpZWxkKCk7ZWxzZXt2YXIgYT10aGlzLmRlY29kZXJfLnJlYWRVbnNpZ25lZFZhcmludDMyKCk7dGhpcy5kZWNvZGVyXy5hZHZhbmNlKGEpfX07XG5qc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUuc2tpcEZpeGVkMzJGaWVsZD1mdW5jdGlvbigpe3RoaXMubmV4dFdpcmVUeXBlXyE9anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuRklYRUQzMj8oZ29vZy5hc3NlcnRzLmZhaWwoXCJJbnZhbGlkIHdpcmUgdHlwZSBmb3Igc2tpcEZpeGVkMzJGaWVsZFwiKSx0aGlzLnNraXBGaWVsZCgpKTp0aGlzLmRlY29kZXJfLmFkdmFuY2UoNCl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5za2lwRml4ZWQ2NEZpZWxkPWZ1bmN0aW9uKCl7dGhpcy5uZXh0V2lyZVR5cGVfIT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5GSVhFRDY0Pyhnb29nLmFzc2VydHMuZmFpbChcIkludmFsaWQgd2lyZSB0eXBlIGZvciBza2lwRml4ZWQ2NEZpZWxkXCIpLHRoaXMuc2tpcEZpZWxkKCkpOnRoaXMuZGVjb2Rlcl8uYWR2YW5jZSg4KX07XG5qc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUuc2tpcEdyb3VwPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5uZXh0RmllbGRfO2Rve2lmKCF0aGlzLm5leHRGaWVsZCgpKXtnb29nLmFzc2VydHMuZmFpbChcIlVubWF0Y2hlZCBzdGFydC1ncm91cCB0YWc6IHN0cmVhbSBFT0ZcIik7dGhpcy5lcnJvcl89ITA7YnJlYWt9aWYodGhpcy5uZXh0V2lyZVR5cGVfPT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5FTkRfR1JPVVApe3RoaXMubmV4dEZpZWxkXyE9YSYmKGdvb2cuYXNzZXJ0cy5mYWlsKFwiVW5tYXRjaGVkIGVuZC1ncm91cCB0YWdcIiksdGhpcy5lcnJvcl89ITApO2JyZWFrfXRoaXMuc2tpcEZpZWxkKCl9d2hpbGUoMSl9O1xuanNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnNraXBGaWVsZD1mdW5jdGlvbigpe3N3aXRjaCh0aGlzLm5leHRXaXJlVHlwZV8pe2Nhc2UganNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuVkFSSU5UOnRoaXMuc2tpcFZhcmludEZpZWxkKCk7YnJlYWs7Y2FzZSBqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5GSVhFRDY0OnRoaXMuc2tpcEZpeGVkNjRGaWVsZCgpO2JyZWFrO2Nhc2UganNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuREVMSU1JVEVEOnRoaXMuc2tpcERlbGltaXRlZEZpZWxkKCk7YnJlYWs7Y2FzZSBqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5GSVhFRDMyOnRoaXMuc2tpcEZpeGVkMzJGaWVsZCgpO2JyZWFrO2Nhc2UganNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuU1RBUlRfR1JPVVA6dGhpcy5za2lwR3JvdXAoKTticmVhaztkZWZhdWx0Omdvb2cuYXNzZXJ0cy5mYWlsKFwiSW52YWxpZCB3aXJlIGVuY29kaW5nIGZvciBmaWVsZC5cIil9fTtcbmpzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWdpc3RlclJlYWRDYWxsYmFjaz1mdW5jdGlvbihhLGIpe2dvb2cuaXNOdWxsKHRoaXMucmVhZENhbGxiYWNrc18pJiYodGhpcy5yZWFkQ2FsbGJhY2tzXz17fSk7Z29vZy5hc3NlcnRzLmFzc2VydCghdGhpcy5yZWFkQ2FsbGJhY2tzX1thXSk7dGhpcy5yZWFkQ2FsbGJhY2tzX1thXT1ifTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucnVuUmVhZENhbGxiYWNrPWZ1bmN0aW9uKGEpe2dvb2cuYXNzZXJ0cy5hc3NlcnQoIWdvb2cuaXNOdWxsKHRoaXMucmVhZENhbGxiYWNrc18pKTthPXRoaXMucmVhZENhbGxiYWNrc19bYV07Z29vZy5hc3NlcnRzLmFzc2VydChhKTtyZXR1cm4gYSh0aGlzKX07XG5qc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEFueT1mdW5jdGlvbihhKXt0aGlzLm5leHRXaXJlVHlwZV89anNwYi5CaW5hcnlDb25zdGFudHMuRmllbGRUeXBlVG9XaXJlVHlwZShhKTt2YXIgYj1qc3BiLkJpbmFyeUNvbnN0YW50cy5GaWVsZFR5cGU7c3dpdGNoKGEpe2Nhc2UgYi5ET1VCTEU6cmV0dXJuIHRoaXMucmVhZERvdWJsZSgpO2Nhc2UgYi5GTE9BVDpyZXR1cm4gdGhpcy5yZWFkRmxvYXQoKTtjYXNlIGIuSU5UNjQ6cmV0dXJuIHRoaXMucmVhZEludDY0KCk7Y2FzZSBiLlVJTlQ2NDpyZXR1cm4gdGhpcy5yZWFkVWludDY0KCk7Y2FzZSBiLklOVDMyOnJldHVybiB0aGlzLnJlYWRJbnQzMigpO2Nhc2UgYi5GSVhFRDY0OnJldHVybiB0aGlzLnJlYWRGaXhlZDY0KCk7Y2FzZSBiLkZJWEVEMzI6cmV0dXJuIHRoaXMucmVhZEZpeGVkMzIoKTtjYXNlIGIuQk9PTDpyZXR1cm4gdGhpcy5yZWFkQm9vbCgpO2Nhc2UgYi5TVFJJTkc6cmV0dXJuIHRoaXMucmVhZFN0cmluZygpO1xuY2FzZSBiLkdST1VQOmdvb2cuYXNzZXJ0cy5mYWlsKFwiR3JvdXAgZmllbGQgdHlwZSBub3Qgc3VwcG9ydGVkIGluIHJlYWRBbnkoKVwiKTtjYXNlIGIuTUVTU0FHRTpnb29nLmFzc2VydHMuZmFpbChcIk1lc3NhZ2UgZmllbGQgdHlwZSBub3Qgc3VwcG9ydGVkIGluIHJlYWRBbnkoKVwiKTtjYXNlIGIuQllURVM6cmV0dXJuIHRoaXMucmVhZEJ5dGVzKCk7Y2FzZSBiLlVJTlQzMjpyZXR1cm4gdGhpcy5yZWFkVWludDMyKCk7Y2FzZSBiLkVOVU06cmV0dXJuIHRoaXMucmVhZEVudW0oKTtjYXNlIGIuU0ZJWEVEMzI6cmV0dXJuIHRoaXMucmVhZFNmaXhlZDMyKCk7Y2FzZSBiLlNGSVhFRDY0OnJldHVybiB0aGlzLnJlYWRTZml4ZWQ2NCgpO2Nhc2UgYi5TSU5UMzI6cmV0dXJuIHRoaXMucmVhZFNpbnQzMigpO2Nhc2UgYi5TSU5UNjQ6cmV0dXJuIHRoaXMucmVhZFNpbnQ2NCgpO2Nhc2UgYi5GSEFTSDY0OnJldHVybiB0aGlzLnJlYWRGaXhlZEhhc2g2NCgpO2Nhc2UgYi5WSEFTSDY0OnJldHVybiB0aGlzLnJlYWRWYXJpbnRIYXNoNjQoKTtcbmRlZmF1bHQ6Z29vZy5hc3NlcnRzLmZhaWwoXCJJbnZhbGlkIGZpZWxkIHR5cGUgaW4gcmVhZEFueSgpXCIpfXJldHVybiAwfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZE1lc3NhZ2U9ZnVuY3Rpb24oYSxiKXtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuREVMSU1JVEVEKTt2YXIgYz10aGlzLmRlY29kZXJfLmdldEVuZCgpLGQ9dGhpcy5kZWNvZGVyXy5yZWFkVW5zaWduZWRWYXJpbnQzMigpLGQ9dGhpcy5kZWNvZGVyXy5nZXRDdXJzb3IoKStkO3RoaXMuZGVjb2Rlcl8uc2V0RW5kKGQpO2IoYSx0aGlzKTt0aGlzLmRlY29kZXJfLnNldEN1cnNvcihkKTt0aGlzLmRlY29kZXJfLnNldEVuZChjKX07XG5qc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEdyb3VwPWZ1bmN0aW9uKGEsYixjKXtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuU1RBUlRfR1JPVVApO2dvb2cuYXNzZXJ0cy5hc3NlcnQodGhpcy5uZXh0RmllbGRfPT1hKTtjKGIsdGhpcyk7dGhpcy5lcnJvcl98fHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuRU5EX0dST1VQfHwoZ29vZy5hc3NlcnRzLmZhaWwoXCJHcm91cCBzdWJtZXNzYWdlIGRpZCBub3QgZW5kIHdpdGggYW4gRU5EX0dST1VQIHRhZ1wiKSx0aGlzLmVycm9yXz0hMCl9O1xuanNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLmdldEZpZWxkRGVjb2Rlcj1mdW5jdGlvbigpe2dvb2cuYXNzZXJ0cy5hc3NlcnQodGhpcy5uZXh0V2lyZVR5cGVfPT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5ERUxJTUlURUQpO3ZhciBhPXRoaXMuZGVjb2Rlcl8ucmVhZFVuc2lnbmVkVmFyaW50MzIoKSxiPXRoaXMuZGVjb2Rlcl8uZ2V0Q3Vyc29yKCksYz1iK2EsYT1qc3BiLkJpbmFyeURlY29kZXIuYWxsb2ModGhpcy5kZWNvZGVyXy5nZXRCdWZmZXIoKSxiLGEpO3RoaXMuZGVjb2Rlcl8uc2V0Q3Vyc29yKGMpO3JldHVybiBhfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEludDMyPWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlZBUklOVCk7cmV0dXJuIHRoaXMuZGVjb2Rlcl8ucmVhZFNpZ25lZFZhcmludDMyKCl9O1xuanNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRJbnQzMlN0cmluZz1mdW5jdGlvbigpe2dvb2cuYXNzZXJ0cy5hc3NlcnQodGhpcy5uZXh0V2lyZVR5cGVfPT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5WQVJJTlQpO3JldHVybiB0aGlzLmRlY29kZXJfLnJlYWRTaWduZWRWYXJpbnQzMlN0cmluZygpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEludDY0PWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlZBUklOVCk7cmV0dXJuIHRoaXMuZGVjb2Rlcl8ucmVhZFNpZ25lZFZhcmludDY0KCl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkSW50NjRTdHJpbmc9ZnVuY3Rpb24oKXtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuVkFSSU5UKTtyZXR1cm4gdGhpcy5kZWNvZGVyXy5yZWFkU2lnbmVkVmFyaW50NjRTdHJpbmcoKX07XG5qc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFVpbnQzMj1mdW5jdGlvbigpe2dvb2cuYXNzZXJ0cy5hc3NlcnQodGhpcy5uZXh0V2lyZVR5cGVfPT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5WQVJJTlQpO3JldHVybiB0aGlzLmRlY29kZXJfLnJlYWRVbnNpZ25lZFZhcmludDMyKCl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkVWludDMyU3RyaW5nPWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlZBUklOVCk7cmV0dXJuIHRoaXMuZGVjb2Rlcl8ucmVhZFVuc2lnbmVkVmFyaW50MzJTdHJpbmcoKX07anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRVaW50NjQ9ZnVuY3Rpb24oKXtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuVkFSSU5UKTtyZXR1cm4gdGhpcy5kZWNvZGVyXy5yZWFkVW5zaWduZWRWYXJpbnQ2NCgpfTtcbmpzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkVWludDY0U3RyaW5nPWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlZBUklOVCk7cmV0dXJuIHRoaXMuZGVjb2Rlcl8ucmVhZFVuc2lnbmVkVmFyaW50NjRTdHJpbmcoKX07anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRTaW50MzI9ZnVuY3Rpb24oKXtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuVkFSSU5UKTtyZXR1cm4gdGhpcy5kZWNvZGVyXy5yZWFkWmlnemFnVmFyaW50MzIoKX07anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRTaW50NjQ9ZnVuY3Rpb24oKXtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuVkFSSU5UKTtyZXR1cm4gdGhpcy5kZWNvZGVyXy5yZWFkWmlnemFnVmFyaW50NjQoKX07XG5qc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFNpbnQ2NFN0cmluZz1mdW5jdGlvbigpe2dvb2cuYXNzZXJ0cy5hc3NlcnQodGhpcy5uZXh0V2lyZVR5cGVfPT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5WQVJJTlQpO3JldHVybiB0aGlzLmRlY29kZXJfLnJlYWRaaWd6YWdWYXJpbnQ2NFN0cmluZygpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEZpeGVkMzI9ZnVuY3Rpb24oKXtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuRklYRUQzMik7cmV0dXJuIHRoaXMuZGVjb2Rlcl8ucmVhZFVpbnQzMigpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEZpeGVkNjQ9ZnVuY3Rpb24oKXtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuRklYRUQ2NCk7cmV0dXJuIHRoaXMuZGVjb2Rlcl8ucmVhZFVpbnQ2NCgpfTtcbmpzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkRml4ZWQ2NFN0cmluZz1mdW5jdGlvbigpe2dvb2cuYXNzZXJ0cy5hc3NlcnQodGhpcy5uZXh0V2lyZVR5cGVfPT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5GSVhFRDY0KTtyZXR1cm4gdGhpcy5kZWNvZGVyXy5yZWFkVWludDY0U3RyaW5nKCl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkU2ZpeGVkMzI9ZnVuY3Rpb24oKXtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuRklYRUQzMik7cmV0dXJuIHRoaXMuZGVjb2Rlcl8ucmVhZEludDMyKCl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkU2ZpeGVkMzJTdHJpbmc9ZnVuY3Rpb24oKXtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuRklYRUQzMik7cmV0dXJuIHRoaXMuZGVjb2Rlcl8ucmVhZEludDMyKCkudG9TdHJpbmcoKX07XG5qc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFNmaXhlZDY0PWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkZJWEVENjQpO3JldHVybiB0aGlzLmRlY29kZXJfLnJlYWRJbnQ2NCgpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFNmaXhlZDY0U3RyaW5nPWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkZJWEVENjQpO3JldHVybiB0aGlzLmRlY29kZXJfLnJlYWRJbnQ2NFN0cmluZygpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEZsb2F0PWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkZJWEVEMzIpO3JldHVybiB0aGlzLmRlY29kZXJfLnJlYWRGbG9hdCgpfTtcbmpzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkRG91YmxlPWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkZJWEVENjQpO3JldHVybiB0aGlzLmRlY29kZXJfLnJlYWREb3VibGUoKX07anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRCb29sPWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlZBUklOVCk7cmV0dXJuISF0aGlzLmRlY29kZXJfLnJlYWRVbnNpZ25lZFZhcmludDMyKCl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkRW51bT1mdW5jdGlvbigpe2dvb2cuYXNzZXJ0cy5hc3NlcnQodGhpcy5uZXh0V2lyZVR5cGVfPT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5WQVJJTlQpO3JldHVybiB0aGlzLmRlY29kZXJfLnJlYWRTaWduZWRWYXJpbnQ2NCgpfTtcbmpzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkU3RyaW5nPWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkRFTElNSVRFRCk7dmFyIGE9dGhpcy5kZWNvZGVyXy5yZWFkVW5zaWduZWRWYXJpbnQzMigpO3JldHVybiB0aGlzLmRlY29kZXJfLnJlYWRTdHJpbmcoYSl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkQnl0ZXM9ZnVuY3Rpb24oKXtnb29nLmFzc2VydHMuYXNzZXJ0KHRoaXMubmV4dFdpcmVUeXBlXz09anNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuREVMSU1JVEVEKTt2YXIgYT10aGlzLmRlY29kZXJfLnJlYWRVbnNpZ25lZFZhcmludDMyKCk7cmV0dXJuIHRoaXMuZGVjb2Rlcl8ucmVhZEJ5dGVzKGEpfTtcbmpzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkVmFyaW50SGFzaDY0PWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlZBUklOVCk7cmV0dXJuIHRoaXMuZGVjb2Rlcl8ucmVhZFZhcmludEhhc2g2NCgpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEZpeGVkSGFzaDY0PWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCh0aGlzLm5leHRXaXJlVHlwZV89PWpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkZJWEVENjQpO3JldHVybiB0aGlzLmRlY29kZXJfLnJlYWRGaXhlZEhhc2g2NCgpfTtcbmpzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkUGFja2VkRmllbGRfPWZ1bmN0aW9uKGEpe2dvb2cuYXNzZXJ0cy5hc3NlcnQodGhpcy5uZXh0V2lyZVR5cGVfPT1qc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5ERUxJTUlURUQpO2Zvcih2YXIgYj10aGlzLmRlY29kZXJfLnJlYWRVbnNpZ25lZFZhcmludDMyKCksYj10aGlzLmRlY29kZXJfLmdldEN1cnNvcigpK2IsYz1bXTt0aGlzLmRlY29kZXJfLmdldEN1cnNvcigpPGI7KWMucHVzaChhLmNhbGwodGhpcy5kZWNvZGVyXykpO3JldHVybiBjfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFBhY2tlZEludDMyPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVhZFBhY2tlZEZpZWxkXyh0aGlzLmRlY29kZXJfLnJlYWRTaWduZWRWYXJpbnQzMil9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkUGFja2VkSW50MzJTdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFkUGFja2VkRmllbGRfKHRoaXMuZGVjb2Rlcl8ucmVhZFNpZ25lZFZhcmludDMyU3RyaW5nKX07XG5qc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFBhY2tlZEludDY0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVhZFBhY2tlZEZpZWxkXyh0aGlzLmRlY29kZXJfLnJlYWRTaWduZWRWYXJpbnQ2NCl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkUGFja2VkSW50NjRTdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFkUGFja2VkRmllbGRfKHRoaXMuZGVjb2Rlcl8ucmVhZFNpZ25lZFZhcmludDY0U3RyaW5nKX07anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRQYWNrZWRVaW50MzI9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFkUGFja2VkRmllbGRfKHRoaXMuZGVjb2Rlcl8ucmVhZFVuc2lnbmVkVmFyaW50MzIpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFBhY2tlZFVpbnQzMlN0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnJlYWRQYWNrZWRGaWVsZF8odGhpcy5kZWNvZGVyXy5yZWFkVW5zaWduZWRWYXJpbnQzMlN0cmluZyl9O1xuanNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRQYWNrZWRVaW50NjQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFkUGFja2VkRmllbGRfKHRoaXMuZGVjb2Rlcl8ucmVhZFVuc2lnbmVkVmFyaW50NjQpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFBhY2tlZFVpbnQ2NFN0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnJlYWRQYWNrZWRGaWVsZF8odGhpcy5kZWNvZGVyXy5yZWFkVW5zaWduZWRWYXJpbnQ2NFN0cmluZyl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkUGFja2VkU2ludDMyPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVhZFBhY2tlZEZpZWxkXyh0aGlzLmRlY29kZXJfLnJlYWRaaWd6YWdWYXJpbnQzMil9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkUGFja2VkU2ludDY0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVhZFBhY2tlZEZpZWxkXyh0aGlzLmRlY29kZXJfLnJlYWRaaWd6YWdWYXJpbnQ2NCl9O1xuanNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRQYWNrZWRTaW50NjRTdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFkUGFja2VkRmllbGRfKHRoaXMuZGVjb2Rlcl8ucmVhZFppZ3phZ1ZhcmludDY0U3RyaW5nKX07anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRQYWNrZWRGaXhlZDMyPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVhZFBhY2tlZEZpZWxkXyh0aGlzLmRlY29kZXJfLnJlYWRVaW50MzIpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFBhY2tlZEZpeGVkNjQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFkUGFja2VkRmllbGRfKHRoaXMuZGVjb2Rlcl8ucmVhZFVpbnQ2NCl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkUGFja2VkRml4ZWQ2NFN0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnJlYWRQYWNrZWRGaWVsZF8odGhpcy5kZWNvZGVyXy5yZWFkVWludDY0U3RyaW5nKX07XG5qc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFBhY2tlZFNmaXhlZDMyPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVhZFBhY2tlZEZpZWxkXyh0aGlzLmRlY29kZXJfLnJlYWRJbnQzMil9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkUGFja2VkU2ZpeGVkNjQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFkUGFja2VkRmllbGRfKHRoaXMuZGVjb2Rlcl8ucmVhZEludDY0KX07anNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRQYWNrZWRTZml4ZWQ2NFN0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnJlYWRQYWNrZWRGaWVsZF8odGhpcy5kZWNvZGVyXy5yZWFkSW50NjRTdHJpbmcpfTtqc3BiLkJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFBhY2tlZEZsb2F0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVhZFBhY2tlZEZpZWxkXyh0aGlzLmRlY29kZXJfLnJlYWRGbG9hdCl9O1xuanNwYi5CaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRQYWNrZWREb3VibGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFkUGFja2VkRmllbGRfKHRoaXMuZGVjb2Rlcl8ucmVhZERvdWJsZSl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkUGFja2VkQm9vbD1mdW5jdGlvbigpe3JldHVybiB0aGlzLnJlYWRQYWNrZWRGaWVsZF8odGhpcy5kZWNvZGVyXy5yZWFkQm9vbCl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkUGFja2VkRW51bT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnJlYWRQYWNrZWRGaWVsZF8odGhpcy5kZWNvZGVyXy5yZWFkRW51bSl9O2pzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkUGFja2VkVmFyaW50SGFzaDY0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVhZFBhY2tlZEZpZWxkXyh0aGlzLmRlY29kZXJfLnJlYWRWYXJpbnRIYXNoNjQpfTtcbmpzcGIuQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkUGFja2VkRml4ZWRIYXNoNjQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFkUGFja2VkRmllbGRfKHRoaXMuZGVjb2Rlcl8ucmVhZEZpeGVkSGFzaDY0KX07anNwYi5FeHRlbnNpb25GaWVsZEluZm89ZnVuY3Rpb24oYSxiLGMsZCxlKXt0aGlzLmZpZWxkSW5kZXg9YTt0aGlzLmZpZWxkTmFtZT1iO3RoaXMuY3Rvcj1jO3RoaXMudG9PYmplY3RGbj1kO3RoaXMuaXNSZXBlYXRlZD1lfTtqc3BiLkV4dGVuc2lvbkZpZWxkQmluYXJ5SW5mbz1mdW5jdGlvbihhLGIsYyxkLGUsZil7dGhpcy5maWVsZEluZm89YTt0aGlzLmJpbmFyeVJlYWRlckZuPWI7dGhpcy5iaW5hcnlXcml0ZXJGbj1jO3RoaXMuYmluYXJ5TWVzc2FnZVNlcmlhbGl6ZUZuPWQ7dGhpcy5iaW5hcnlNZXNzYWdlRGVzZXJpYWxpemVGbj1lO3RoaXMuaXNQYWNrZWQ9Zn07anNwYi5FeHRlbnNpb25GaWVsZEluZm8ucHJvdG90eXBlLmlzTWVzc2FnZVR5cGU9ZnVuY3Rpb24oKXtyZXR1cm4hIXRoaXMuY3Rvcn07anNwYi5NZXNzYWdlPWZ1bmN0aW9uKCl7fTtqc3BiLk1lc3NhZ2UuR0VORVJBVEVfVE9fT0JKRUNUPSEwO2pzcGIuTWVzc2FnZS5HRU5FUkFURV9GUk9NX09CSkVDVD0hZ29vZy5ESVNBTExPV19URVNUX09OTFlfQ09ERTtcbmpzcGIuTWVzc2FnZS5HRU5FUkFURV9UT19TVFJJTkc9ITA7anNwYi5NZXNzYWdlLkFTU1VNRV9MT0NBTF9BUlJBWVM9ITE7anNwYi5NZXNzYWdlLlNFUklBTElaRV9FTVBUWV9UUkFJTElOR19GSUVMRFM9ITA7anNwYi5NZXNzYWdlLlNVUFBPUlRTX1VJTlQ4QVJSQVlfPVwiZnVuY3Rpb25cIj09dHlwZW9mIFVpbnQ4QXJyYXk7anNwYi5NZXNzYWdlLnByb3RvdHlwZS5nZXRKc1BiTWVzc2FnZUlkPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWVzc2FnZUlkX307anNwYi5NZXNzYWdlLmdldEluZGV4Xz1mdW5jdGlvbihhLGIpe3JldHVybiBiK2EuYXJyYXlJbmRleE9mZnNldF99O2pzcGIuTWVzc2FnZS5nZXRGaWVsZE51bWJlcl89ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYi1hLmFycmF5SW5kZXhPZmZzZXRffTtcbmpzcGIuTWVzc2FnZS5pbml0aWFsaXplPWZ1bmN0aW9uKGEsYixjLGQsZSxmKXthLndyYXBwZXJzXz1udWxsO2J8fChiPWM/W2NdOltdKTthLm1lc3NhZ2VJZF89Yz9TdHJpbmcoYyk6dm9pZCAwO2EuYXJyYXlJbmRleE9mZnNldF89MD09PWM/LTE6MDthLmFycmF5PWI7anNwYi5NZXNzYWdlLmluaXRQaXZvdEFuZEV4dGVuc2lvbk9iamVjdF8oYSxkKTthLmNvbnZlcnRlZEZsb2F0aW5nUG9pbnRGaWVsZHNfPXt9O2pzcGIuTWVzc2FnZS5TRVJJQUxJWkVfRU1QVFlfVFJBSUxJTkdfRklFTERTfHwoYS5yZXBlYXRlZEZpZWxkcz1lKTtpZihlKWZvcihiPTA7YjxlLmxlbmd0aDtiKyspYz1lW2JdLGM8YS5waXZvdF8/KGM9anNwYi5NZXNzYWdlLmdldEluZGV4XyhhLGMpLGEuYXJyYXlbY109YS5hcnJheVtjXXx8anNwYi5NZXNzYWdlLkVNUFRZX0xJU1RfU0VOVElORUxfKTooanNwYi5NZXNzYWdlLm1heWJlSW5pdEVtcHR5RXh0ZW5zaW9uT2JqZWN0XyhhKSxhLmV4dGVuc2lvbk9iamVjdF9bY109XG5hLmV4dGVuc2lvbk9iamVjdF9bY118fGpzcGIuTWVzc2FnZS5FTVBUWV9MSVNUX1NFTlRJTkVMXyk7aWYoZiYmZi5sZW5ndGgpZm9yKGI9MDtiPGYubGVuZ3RoO2IrKylqc3BiLk1lc3NhZ2UuY29tcHV0ZU9uZW9mQ2FzZShhLGZbYl0pfTtqc3BiLk1lc3NhZ2UuRU1QVFlfTElTVF9TRU5USU5FTF89Z29vZy5ERUJVRyYmT2JqZWN0LmZyZWV6ZT9PYmplY3QuZnJlZXplKFtdKTpbXTtqc3BiLk1lc3NhZ2UuaXNBcnJheV89ZnVuY3Rpb24oYSl7cmV0dXJuIGpzcGIuTWVzc2FnZS5BU1NVTUVfTE9DQUxfQVJSQVlTP2EgaW5zdGFuY2VvZiBBcnJheTpnb29nLmlzQXJyYXkoYSl9O2pzcGIuTWVzc2FnZS5pc0V4dGVuc2lvbk9iamVjdF89ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGwhPT1hJiZcIm9iamVjdFwiPT10eXBlb2YgYSYmIWpzcGIuTWVzc2FnZS5pc0FycmF5XyhhKSYmIShqc3BiLk1lc3NhZ2UuU1VQUE9SVFNfVUlOVDhBUlJBWV8mJmEgaW5zdGFuY2VvZiBVaW50OEFycmF5KX07XG5qc3BiLk1lc3NhZ2UuaW5pdFBpdm90QW5kRXh0ZW5zaW9uT2JqZWN0Xz1mdW5jdGlvbihhLGIpe3ZhciBjPWEuYXJyYXkubGVuZ3RoLGQ9LTE7aWYoYyYmKGQ9Yy0xLGM9YS5hcnJheVtkXSxqc3BiLk1lc3NhZ2UuaXNFeHRlbnNpb25PYmplY3RfKGMpKSl7YS5waXZvdF89anNwYi5NZXNzYWdlLmdldEZpZWxkTnVtYmVyXyhhLGQpO2EuZXh0ZW5zaW9uT2JqZWN0Xz1jO3JldHVybn0tMTxiPyhhLnBpdm90Xz1NYXRoLm1heChiLGpzcGIuTWVzc2FnZS5nZXRGaWVsZE51bWJlcl8oYSxkKzEpKSxhLmV4dGVuc2lvbk9iamVjdF89bnVsbCk6YS5waXZvdF89TnVtYmVyLk1BWF9WQUxVRX07anNwYi5NZXNzYWdlLm1heWJlSW5pdEVtcHR5RXh0ZW5zaW9uT2JqZWN0Xz1mdW5jdGlvbihhKXt2YXIgYj1qc3BiLk1lc3NhZ2UuZ2V0SW5kZXhfKGEsYS5waXZvdF8pO2EuYXJyYXlbYl18fChhLmV4dGVuc2lvbk9iamVjdF89YS5hcnJheVtiXT17fSl9O1xuanNwYi5NZXNzYWdlLnRvT2JqZWN0TGlzdD1mdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPVtdLGU9MDtlPGEubGVuZ3RoO2UrKylkW2VdPWIuY2FsbChhW2VdLGMsYVtlXSk7cmV0dXJuIGR9O2pzcGIuTWVzc2FnZS50b09iamVjdEV4dGVuc2lvbj1mdW5jdGlvbihhLGIsYyxkLGUpe2Zvcih2YXIgZiBpbiBjKXt2YXIgZz1jW2ZdLGg9ZC5jYWxsKGEsZyk7aWYobnVsbCE9aCl7Zm9yKHZhciBrIGluIGcuZmllbGROYW1lKWlmKGcuZmllbGROYW1lLmhhc093blByb3BlcnR5KGspKWJyZWFrO2Jba109Zy50b09iamVjdEZuP2cuaXNSZXBlYXRlZD9qc3BiLk1lc3NhZ2UudG9PYmplY3RMaXN0KGgsZy50b09iamVjdEZuLGUpOmcudG9PYmplY3RGbihlLGgpOmh9fX07XG5qc3BiLk1lc3NhZ2Uuc2VyaWFsaXplQmluYXJ5RXh0ZW5zaW9ucz1mdW5jdGlvbihhLGIsYyxkKXtmb3IodmFyIGUgaW4gYyl7dmFyIGY9Y1tlXSxnPWYuZmllbGRJbmZvO2lmKCFmLmJpbmFyeVdyaXRlckZuKXRocm93IEVycm9yKFwiTWVzc2FnZSBleHRlbnNpb24gcHJlc2VudCB0aGF0IHdhcyBnZW5lcmF0ZWQgd2l0aG91dCBiaW5hcnkgc2VyaWFsaXphdGlvbiBzdXBwb3J0XCIpO3ZhciBoPWQuY2FsbChhLGcpO2lmKG51bGwhPWgpaWYoZy5pc01lc3NhZ2VUeXBlKCkpaWYoZi5iaW5hcnlNZXNzYWdlU2VyaWFsaXplRm4pZi5iaW5hcnlXcml0ZXJGbi5jYWxsKGIsZy5maWVsZEluZGV4LGgsZi5iaW5hcnlNZXNzYWdlU2VyaWFsaXplRm4pO2Vsc2UgdGhyb3cgRXJyb3IoXCJNZXNzYWdlIGV4dGVuc2lvbiBwcmVzZW50IGhvbGRpbmcgc3VibWVzc2FnZSB3aXRob3V0IGJpbmFyeSBzdXBwb3J0IGVuYWJsZWQsIGFuZCBtZXNzYWdlIGlzIGJlaW5nIHNlcmlhbGl6ZWQgdG8gYmluYXJ5IGZvcm1hdFwiKTtcbmVsc2UgZi5iaW5hcnlXcml0ZXJGbi5jYWxsKGIsZy5maWVsZEluZGV4LGgpfX07anNwYi5NZXNzYWdlLnJlYWRCaW5hcnlFeHRlbnNpb249ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1jW2IuZ2V0RmllbGROdW1iZXIoKV07aWYoZil7Yz1mLmZpZWxkSW5mbztpZighZi5iaW5hcnlSZWFkZXJGbil0aHJvdyBFcnJvcihcIkRlc2VyaWFsaXppbmcgZXh0ZW5zaW9uIHdob3NlIGdlbmVyYXRlZCBjb2RlIGRvZXMgbm90IHN1cHBvcnQgYmluYXJ5IGZvcm1hdFwiKTt2YXIgZztjLmlzTWVzc2FnZVR5cGUoKT8oZz1uZXcgYy5jdG9yLGYuYmluYXJ5UmVhZGVyRm4uY2FsbChiLGcsZi5iaW5hcnlNZXNzYWdlRGVzZXJpYWxpemVGbikpOmc9Zi5iaW5hcnlSZWFkZXJGbi5jYWxsKGIpO2MuaXNSZXBlYXRlZCYmIWYuaXNQYWNrZWQ/KGI9ZC5jYWxsKGEsYykpP2IucHVzaChnKTplLmNhbGwoYSxjLFtnXSk6ZS5jYWxsKGEsYyxnKX1lbHNlIGIuc2tpcEZpZWxkKCl9O1xuanNwYi5NZXNzYWdlLmdldEZpZWxkPWZ1bmN0aW9uKGEsYil7aWYoYjxhLnBpdm90Xyl7dmFyIGM9anNwYi5NZXNzYWdlLmdldEluZGV4XyhhLGIpLGQ9YS5hcnJheVtjXTtyZXR1cm4gZD09PWpzcGIuTWVzc2FnZS5FTVBUWV9MSVNUX1NFTlRJTkVMXz9hLmFycmF5W2NdPVtdOmR9aWYoYS5leHRlbnNpb25PYmplY3RfKXJldHVybiBkPWEuZXh0ZW5zaW9uT2JqZWN0X1tiXSxkPT09anNwYi5NZXNzYWdlLkVNUFRZX0xJU1RfU0VOVElORUxfP2EuZXh0ZW5zaW9uT2JqZWN0X1tiXT1bXTpkfTtcbmpzcGIuTWVzc2FnZS5nZXRSZXBlYXRlZEZpZWxkPWZ1bmN0aW9uKGEsYil7aWYoYjxhLnBpdm90Xyl7dmFyIGM9anNwYi5NZXNzYWdlLmdldEluZGV4XyhhLGIpLGQ9YS5hcnJheVtjXTtyZXR1cm4gZD09PWpzcGIuTWVzc2FnZS5FTVBUWV9MSVNUX1NFTlRJTkVMXz9hLmFycmF5W2NdPVtdOmR9ZD1hLmV4dGVuc2lvbk9iamVjdF9bYl07cmV0dXJuIGQ9PT1qc3BiLk1lc3NhZ2UuRU1QVFlfTElTVF9TRU5USU5FTF8/YS5leHRlbnNpb25PYmplY3RfW2JdPVtdOmR9O2pzcGIuTWVzc2FnZS5nZXRPcHRpb25hbEZsb2F0aW5nUG9pbnRGaWVsZD1mdW5jdGlvbihhLGIpe3ZhciBjPWpzcGIuTWVzc2FnZS5nZXRGaWVsZChhLGIpO3JldHVybiBudWxsPT1jP2M6K2N9O1xuanNwYi5NZXNzYWdlLmdldFJlcGVhdGVkRmxvYXRpbmdQb2ludEZpZWxkPWZ1bmN0aW9uKGEsYil7dmFyIGM9anNwYi5NZXNzYWdlLmdldFJlcGVhdGVkRmllbGQoYSxiKTthLmNvbnZlcnRlZEZsb2F0aW5nUG9pbnRGaWVsZHNffHwoYS5jb252ZXJ0ZWRGbG9hdGluZ1BvaW50RmllbGRzXz17fSk7aWYoIWEuY29udmVydGVkRmxvYXRpbmdQb2ludEZpZWxkc19bYl0pe2Zvcih2YXIgZD0wO2Q8Yy5sZW5ndGg7ZCsrKWNbZF09K2NbZF07YS5jb252ZXJ0ZWRGbG9hdGluZ1BvaW50RmllbGRzX1tiXT0hMH1yZXR1cm4gY307XG5qc3BiLk1lc3NhZ2UuYnl0ZXNBc0I2ND1mdW5jdGlvbihhKXtpZihudWxsPT1hfHxnb29nLmlzU3RyaW5nKGEpKXJldHVybiBhO2lmKGpzcGIuTWVzc2FnZS5TVVBQT1JUU19VSU5UOEFSUkFZXyYmYSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpcmV0dXJuIGdvb2cuY3J5cHQuYmFzZTY0LmVuY29kZUJ5dGVBcnJheShhKTtnb29nLmFzc2VydHMuZmFpbChcIkNhbm5vdCBjb2VyY2UgdG8gYjY0IHN0cmluZzogXCIrZ29vZy50eXBlT2YoYSkpO3JldHVybiBudWxsfTtqc3BiLk1lc3NhZ2UuYnl0ZXNBc1U4PWZ1bmN0aW9uKGEpe2lmKG51bGw9PWF8fGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KXJldHVybiBhO2lmKGdvb2cuaXNTdHJpbmcoYSkpcmV0dXJuIGdvb2cuY3J5cHQuYmFzZTY0LmRlY29kZVN0cmluZ1RvVWludDhBcnJheShhKTtnb29nLmFzc2VydHMuZmFpbChcIkNhbm5vdCBjb2VyY2UgdG8gVWludDhBcnJheTogXCIrZ29vZy50eXBlT2YoYSkpO3JldHVybiBudWxsfTtcbmpzcGIuTWVzc2FnZS5ieXRlc0xpc3RBc0I2ND1mdW5jdGlvbihhKXtqc3BiLk1lc3NhZ2UuYXNzZXJ0Q29uc2lzdGVudFR5cGVzXyhhKTtyZXR1cm4hYS5sZW5ndGh8fGdvb2cuaXNTdHJpbmcoYVswXSk/YTpnb29nLmFycmF5Lm1hcChhLGpzcGIuTWVzc2FnZS5ieXRlc0FzQjY0KX07anNwYi5NZXNzYWdlLmJ5dGVzTGlzdEFzVTg9ZnVuY3Rpb24oYSl7anNwYi5NZXNzYWdlLmFzc2VydENvbnNpc3RlbnRUeXBlc18oYSk7cmV0dXJuIWEubGVuZ3RofHxhWzBdaW5zdGFuY2VvZiBVaW50OEFycmF5P2E6Z29vZy5hcnJheS5tYXAoYSxqc3BiLk1lc3NhZ2UuYnl0ZXNBc1U4KX07XG5qc3BiLk1lc3NhZ2UuYXNzZXJ0Q29uc2lzdGVudFR5cGVzXz1mdW5jdGlvbihhKXtpZihnb29nLkRFQlVHJiZhJiYxPGEubGVuZ3RoKXt2YXIgYj1nb29nLnR5cGVPZihhWzBdKTtnb29nLmFycmF5LmZvckVhY2goYSxmdW5jdGlvbihhKXtnb29nLnR5cGVPZihhKSE9YiYmZ29vZy5hc3NlcnRzLmZhaWwoXCJJbmNvbnNpc3RlbnQgdHlwZSBpbiBKU1BCIHJlcGVhdGVkIGZpZWxkIGFycmF5LiBHb3QgXCIrZ29vZy50eXBlT2YoYSkrXCIgZXhwZWN0ZWQgXCIrYil9KX19O2pzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0PWZ1bmN0aW9uKGEsYixjKXthPWpzcGIuTWVzc2FnZS5nZXRGaWVsZChhLGIpO3JldHVybiBudWxsPT1hP2M6YX07anNwYi5NZXNzYWdlLmdldEZpZWxkUHJvdG8zPWpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0O1xuanNwYi5NZXNzYWdlLmdldE1hcEZpZWxkPWZ1bmN0aW9uKGEsYixjLGQpe2Eud3JhcHBlcnNffHwoYS53cmFwcGVyc189e30pO2lmKGIgaW4gYS53cmFwcGVyc18pcmV0dXJuIGEud3JhcHBlcnNfW2JdO2lmKCFjKXJldHVybiBjPWpzcGIuTWVzc2FnZS5nZXRGaWVsZChhLGIpLGN8fChjPVtdLGpzcGIuTWVzc2FnZS5zZXRGaWVsZChhLGIsYykpLGEud3JhcHBlcnNfW2JdPW5ldyBqc3BiLk1hcChjLGQpfTtqc3BiLk1lc3NhZ2Uuc2V0RmllbGQ9ZnVuY3Rpb24oYSxiLGMpe2I8YS5waXZvdF8/YS5hcnJheVtqc3BiLk1lc3NhZ2UuZ2V0SW5kZXhfKGEsYildPWM6KGpzcGIuTWVzc2FnZS5tYXliZUluaXRFbXB0eUV4dGVuc2lvbk9iamVjdF8oYSksYS5leHRlbnNpb25PYmplY3RfW2JdPWMpfTtqc3BiLk1lc3NhZ2Uuc2V0UHJvdG8zSW50RmllbGQ9ZnVuY3Rpb24oYSxiLGMpe2pzcGIuTWVzc2FnZS5zZXRGaWVsZElnbm9yaW5nRGVmYXVsdF8oYSxiLGMsMCl9O1xuanNwYi5NZXNzYWdlLnNldFByb3RvM0Zsb2F0RmllbGQ9ZnVuY3Rpb24oYSxiLGMpe2pzcGIuTWVzc2FnZS5zZXRGaWVsZElnbm9yaW5nRGVmYXVsdF8oYSxiLGMsMCl9O2pzcGIuTWVzc2FnZS5zZXRQcm90bzNCb29sZWFuRmllbGQ9ZnVuY3Rpb24oYSxiLGMpe2pzcGIuTWVzc2FnZS5zZXRGaWVsZElnbm9yaW5nRGVmYXVsdF8oYSxiLGMsITEpfTtqc3BiLk1lc3NhZ2Uuc2V0UHJvdG8zU3RyaW5nRmllbGQ9ZnVuY3Rpb24oYSxiLGMpe2pzcGIuTWVzc2FnZS5zZXRGaWVsZElnbm9yaW5nRGVmYXVsdF8oYSxiLGMsXCJcIil9O2pzcGIuTWVzc2FnZS5zZXRQcm90bzNCeXRlc0ZpZWxkPWZ1bmN0aW9uKGEsYixjKXtqc3BiLk1lc3NhZ2Uuc2V0RmllbGRJZ25vcmluZ0RlZmF1bHRfKGEsYixjLFwiXCIpfTtqc3BiLk1lc3NhZ2Uuc2V0UHJvdG8zRW51bUZpZWxkPWZ1bmN0aW9uKGEsYixjKXtqc3BiLk1lc3NhZ2Uuc2V0RmllbGRJZ25vcmluZ0RlZmF1bHRfKGEsYixjLDApfTtcbmpzcGIuTWVzc2FnZS5zZXRQcm90bzNTdHJpbmdJbnRGaWVsZD1mdW5jdGlvbihhLGIsYyl7anNwYi5NZXNzYWdlLnNldEZpZWxkSWdub3JpbmdEZWZhdWx0XyhhLGIsYyxcIjBcIil9O2pzcGIuTWVzc2FnZS5zZXRGaWVsZElnbm9yaW5nRGVmYXVsdF89ZnVuY3Rpb24oYSxiLGMsZCl7YyE9PWQ/anNwYi5NZXNzYWdlLnNldEZpZWxkKGEsYixjKTphLmFycmF5W2pzcGIuTWVzc2FnZS5nZXRJbmRleF8oYSxiKV09bnVsbH07anNwYi5NZXNzYWdlLmFkZFRvUmVwZWF0ZWRGaWVsZD1mdW5jdGlvbihhLGIsYyxkKXthPWpzcGIuTWVzc2FnZS5nZXRSZXBlYXRlZEZpZWxkKGEsYik7dm9pZCAwIT1kP2Euc3BsaWNlKGQsMCxjKTphLnB1c2goYyl9O1xuanNwYi5NZXNzYWdlLnNldE9uZW9mRmllbGQ9ZnVuY3Rpb24oYSxiLGMsZCl7KGM9anNwYi5NZXNzYWdlLmNvbXB1dGVPbmVvZkNhc2UoYSxjKSkmJmMhPT1iJiZ2b2lkIDAhPT1kJiYoYS53cmFwcGVyc18mJmMgaW4gYS53cmFwcGVyc18mJihhLndyYXBwZXJzX1tjXT12b2lkIDApLGpzcGIuTWVzc2FnZS5zZXRGaWVsZChhLGMsdm9pZCAwKSk7anNwYi5NZXNzYWdlLnNldEZpZWxkKGEsYixkKX07anNwYi5NZXNzYWdlLmNvbXB1dGVPbmVvZkNhc2U9ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGMsZCxlPTA7ZTxiLmxlbmd0aDtlKyspe3ZhciBmPWJbZV0sZz1qc3BiLk1lc3NhZ2UuZ2V0RmllbGQoYSxmKTtudWxsIT1nJiYoYz1mLGQ9Zyxqc3BiLk1lc3NhZ2Uuc2V0RmllbGQoYSxmLHZvaWQgMCkpfXJldHVybiBjPyhqc3BiLk1lc3NhZ2Uuc2V0RmllbGQoYSxjLGQpLGMpOjB9O1xuanNwYi5NZXNzYWdlLmdldFdyYXBwZXJGaWVsZD1mdW5jdGlvbihhLGIsYyxkKXthLndyYXBwZXJzX3x8KGEud3JhcHBlcnNfPXt9KTtpZighYS53cmFwcGVyc19bY10pe3ZhciBlPWpzcGIuTWVzc2FnZS5nZXRGaWVsZChhLGMpO2lmKGR8fGUpYS53cmFwcGVyc19bY109bmV3IGIoZSl9cmV0dXJuIGEud3JhcHBlcnNfW2NdfTtqc3BiLk1lc3NhZ2UuZ2V0UmVwZWF0ZWRXcmFwcGVyRmllbGQ9ZnVuY3Rpb24oYSxiLGMpe2pzcGIuTWVzc2FnZS53cmFwUmVwZWF0ZWRGaWVsZF8oYSxiLGMpO2I9YS53cmFwcGVyc19bY107Yj09anNwYi5NZXNzYWdlLkVNUFRZX0xJU1RfU0VOVElORUxfJiYoYj1hLndyYXBwZXJzX1tjXT1bXSk7cmV0dXJuIGJ9O1xuanNwYi5NZXNzYWdlLndyYXBSZXBlYXRlZEZpZWxkXz1mdW5jdGlvbihhLGIsYyl7YS53cmFwcGVyc198fChhLndyYXBwZXJzXz17fSk7aWYoIWEud3JhcHBlcnNfW2NdKXtmb3IodmFyIGQ9anNwYi5NZXNzYWdlLmdldFJlcGVhdGVkRmllbGQoYSxjKSxlPVtdLGY9MDtmPGQubGVuZ3RoO2YrKyllW2ZdPW5ldyBiKGRbZl0pO2Eud3JhcHBlcnNfW2NdPWV9fTtqc3BiLk1lc3NhZ2Uuc2V0V3JhcHBlckZpZWxkPWZ1bmN0aW9uKGEsYixjKXthLndyYXBwZXJzX3x8KGEud3JhcHBlcnNfPXt9KTt2YXIgZD1jP2MudG9BcnJheSgpOmM7YS53cmFwcGVyc19bYl09Yztqc3BiLk1lc3NhZ2Uuc2V0RmllbGQoYSxiLGQpfTtcbmpzcGIuTWVzc2FnZS5zZXRPbmVvZldyYXBwZXJGaWVsZD1mdW5jdGlvbihhLGIsYyxkKXthLndyYXBwZXJzX3x8KGEud3JhcHBlcnNfPXt9KTt2YXIgZT1kP2QudG9BcnJheSgpOmQ7YS53cmFwcGVyc19bYl09ZDtqc3BiLk1lc3NhZ2Uuc2V0T25lb2ZGaWVsZChhLGIsYyxlKX07anNwYi5NZXNzYWdlLnNldFJlcGVhdGVkV3JhcHBlckZpZWxkPWZ1bmN0aW9uKGEsYixjKXthLndyYXBwZXJzX3x8KGEud3JhcHBlcnNfPXt9KTtjPWN8fFtdO2Zvcih2YXIgZD1bXSxlPTA7ZTxjLmxlbmd0aDtlKyspZFtlXT1jW2VdLnRvQXJyYXkoKTthLndyYXBwZXJzX1tiXT1jO2pzcGIuTWVzc2FnZS5zZXRGaWVsZChhLGIsZCl9O1xuanNwYi5NZXNzYWdlLmFkZFRvUmVwZWF0ZWRXcmFwcGVyRmllbGQ9ZnVuY3Rpb24oYSxiLGMsZCxlKXtqc3BiLk1lc3NhZ2Uud3JhcFJlcGVhdGVkRmllbGRfKGEsZCxiKTt2YXIgZj1hLndyYXBwZXJzX1tiXTtmfHwoZj1hLndyYXBwZXJzX1tiXT1bXSk7Yz1jP2M6bmV3IGQ7YT1qc3BiLk1lc3NhZ2UuZ2V0UmVwZWF0ZWRGaWVsZChhLGIpO3ZvaWQgMCE9ZT8oZi5zcGxpY2UoZSwwLGMpLGEuc3BsaWNlKGUsMCxjLnRvQXJyYXkoKSkpOihmLnB1c2goYyksYS5wdXNoKGMudG9BcnJheSgpKSk7cmV0dXJuIGN9O2pzcGIuTWVzc2FnZS50b01hcD1mdW5jdGlvbihhLGIsYyxkKXtmb3IodmFyIGU9e30sZj0wO2Y8YS5sZW5ndGg7ZisrKWVbYi5jYWxsKGFbZl0pXT1jP2MuY2FsbChhW2ZdLGQsYVtmXSk6YVtmXTtyZXR1cm4gZX07XG5qc3BiLk1lc3NhZ2UucHJvdG90eXBlLnN5bmNNYXBGaWVsZHNfPWZ1bmN0aW9uKCl7aWYodGhpcy53cmFwcGVyc18pZm9yKHZhciBhIGluIHRoaXMud3JhcHBlcnNfKXt2YXIgYj10aGlzLndyYXBwZXJzX1thXTtpZihnb29nLmlzQXJyYXkoYikpZm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspYltjXSYmYltjXS50b0FycmF5KCk7ZWxzZSBiJiZiLnRvQXJyYXkoKX19O2pzcGIuTWVzc2FnZS5wcm90b3R5cGUudG9BcnJheT1mdW5jdGlvbigpe3RoaXMuc3luY01hcEZpZWxkc18oKTtyZXR1cm4gdGhpcy5hcnJheX07anNwYi5NZXNzYWdlLkdFTkVSQVRFX1RPX1NUUklORyYmKGpzcGIuTWVzc2FnZS5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXt0aGlzLnN5bmNNYXBGaWVsZHNfKCk7cmV0dXJuIHRoaXMuYXJyYXkudG9TdHJpbmcoKX0pO1xuanNwYi5NZXNzYWdlLnByb3RvdHlwZS5nZXRFeHRlbnNpb249ZnVuY3Rpb24oYSl7aWYodGhpcy5leHRlbnNpb25PYmplY3RfKXt0aGlzLndyYXBwZXJzX3x8KHRoaXMud3JhcHBlcnNfPXt9KTt2YXIgYj1hLmZpZWxkSW5kZXg7aWYoYS5pc1JlcGVhdGVkKXtpZihhLmlzTWVzc2FnZVR5cGUoKSlyZXR1cm4gdGhpcy53cmFwcGVyc19bYl18fCh0aGlzLndyYXBwZXJzX1tiXT1nb29nLmFycmF5Lm1hcCh0aGlzLmV4dGVuc2lvbk9iamVjdF9bYl18fFtdLGZ1bmN0aW9uKGIpe3JldHVybiBuZXcgYS5jdG9yKGIpfSkpLHRoaXMud3JhcHBlcnNfW2JdfWVsc2UgaWYoYS5pc01lc3NhZ2VUeXBlKCkpcmV0dXJuIXRoaXMud3JhcHBlcnNfW2JdJiZ0aGlzLmV4dGVuc2lvbk9iamVjdF9bYl0mJih0aGlzLndyYXBwZXJzX1tiXT1uZXcgYS5jdG9yKHRoaXMuZXh0ZW5zaW9uT2JqZWN0X1tiXSkpLHRoaXMud3JhcHBlcnNfW2JdO3JldHVybiB0aGlzLmV4dGVuc2lvbk9iamVjdF9bYl19fTtcbmpzcGIuTWVzc2FnZS5wcm90b3R5cGUuc2V0RXh0ZW5zaW9uPWZ1bmN0aW9uKGEsYil7dGhpcy53cmFwcGVyc198fCh0aGlzLndyYXBwZXJzXz17fSk7anNwYi5NZXNzYWdlLm1heWJlSW5pdEVtcHR5RXh0ZW5zaW9uT2JqZWN0Xyh0aGlzKTt2YXIgYz1hLmZpZWxkSW5kZXg7YS5pc1JlcGVhdGVkPyhiPWJ8fFtdLGEuaXNNZXNzYWdlVHlwZSgpPyh0aGlzLndyYXBwZXJzX1tjXT1iLHRoaXMuZXh0ZW5zaW9uT2JqZWN0X1tjXT1nb29nLmFycmF5Lm1hcChiLGZ1bmN0aW9uKGEpe3JldHVybiBhLnRvQXJyYXkoKX0pKTp0aGlzLmV4dGVuc2lvbk9iamVjdF9bY109Yik6YS5pc01lc3NhZ2VUeXBlKCk/KHRoaXMud3JhcHBlcnNfW2NdPWIsdGhpcy5leHRlbnNpb25PYmplY3RfW2NdPWI/Yi50b0FycmF5KCk6Yik6dGhpcy5leHRlbnNpb25PYmplY3RfW2NdPWI7cmV0dXJuIHRoaXN9O1xuanNwYi5NZXNzYWdlLmRpZmZlcmVuY2U9ZnVuY3Rpb24oYSxiKXtpZighKGEgaW5zdGFuY2VvZiBiLmNvbnN0cnVjdG9yKSl0aHJvdyBFcnJvcihcIk1lc3NhZ2VzIGhhdmUgZGlmZmVyZW50IHR5cGVzLlwiKTt2YXIgYz1hLnRvQXJyYXkoKSxkPWIudG9BcnJheSgpLGU9W10sZj0wLGc9Yy5sZW5ndGg+ZC5sZW5ndGg/Yy5sZW5ndGg6ZC5sZW5ndGg7YS5nZXRKc1BiTWVzc2FnZUlkKCkmJihlWzBdPWEuZ2V0SnNQYk1lc3NhZ2VJZCgpLGY9MSk7Zm9yKDtmPGc7ZisrKWpzcGIuTWVzc2FnZS5jb21wYXJlRmllbGRzKGNbZl0sZFtmXSl8fChlW2ZdPWRbZl0pO3JldHVybiBuZXcgYS5jb25zdHJ1Y3RvcihlKX07anNwYi5NZXNzYWdlLmVxdWFscz1mdW5jdGlvbihhLGIpe3JldHVybiBhPT1ifHwhKCFhfHwhYikmJmEgaW5zdGFuY2VvZiBiLmNvbnN0cnVjdG9yJiZqc3BiLk1lc3NhZ2UuY29tcGFyZUZpZWxkcyhhLnRvQXJyYXkoKSxiLnRvQXJyYXkoKSl9O1xuanNwYi5NZXNzYWdlLmNvbXBhcmVFeHRlbnNpb25zPWZ1bmN0aW9uKGEsYil7YT1hfHx7fTtiPWJ8fHt9O3ZhciBjPXt9LGQ7Zm9yKGQgaW4gYSljW2RdPTA7Zm9yKGQgaW4gYiljW2RdPTA7Zm9yKGQgaW4gYylpZighanNwYi5NZXNzYWdlLmNvbXBhcmVGaWVsZHMoYVtkXSxiW2RdKSlyZXR1cm4hMTtyZXR1cm4hMH07XG5qc3BiLk1lc3NhZ2UuY29tcGFyZUZpZWxkcz1mdW5jdGlvbihhLGIpe2lmKGE9PWIpcmV0dXJuITA7aWYoIWdvb2cuaXNPYmplY3QoYSl8fCFnb29nLmlzT2JqZWN0KGIpKXJldHVybiBnb29nLmlzTnVtYmVyKGEpJiZpc05hTihhKXx8Z29vZy5pc051bWJlcihiKSYmaXNOYU4oYik/U3RyaW5nKGEpPT1TdHJpbmcoYik6ITE7aWYoYS5jb25zdHJ1Y3RvciE9Yi5jb25zdHJ1Y3RvcilyZXR1cm4hMTtpZihqc3BiLk1lc3NhZ2UuU1VQUE9SVFNfVUlOVDhBUlJBWV8mJmEuY29uc3RydWN0b3I9PT1VaW50OEFycmF5KXtpZihhLmxlbmd0aCE9Yi5sZW5ndGgpcmV0dXJuITE7Zm9yKHZhciBjPTA7YzxhLmxlbmd0aDtjKyspaWYoYVtjXSE9YltjXSlyZXR1cm4hMTtyZXR1cm4hMH1pZihhLmNvbnN0cnVjdG9yPT09QXJyYXkpe2Zvcih2YXIgZD12b2lkIDAsZT12b2lkIDAsZj1NYXRoLm1heChhLmxlbmd0aCxiLmxlbmd0aCksYz0wO2M8ZjtjKyspe3ZhciBnPWFbY10saD1iW2NdO2cmJmcuY29uc3RydWN0b3I9PVxuT2JqZWN0JiYoZ29vZy5hc3NlcnRzLmFzc2VydCh2b2lkIDA9PT1kKSxnb29nLmFzc2VydHMuYXNzZXJ0KGM9PT1hLmxlbmd0aC0xKSxkPWcsZz12b2lkIDApO2gmJmguY29uc3RydWN0b3I9PU9iamVjdCYmKGdvb2cuYXNzZXJ0cy5hc3NlcnQodm9pZCAwPT09ZSksZ29vZy5hc3NlcnRzLmFzc2VydChjPT09Yi5sZW5ndGgtMSksZT1oLGg9dm9pZCAwKTtpZighanNwYi5NZXNzYWdlLmNvbXBhcmVGaWVsZHMoZyxoKSlyZXR1cm4hMX1yZXR1cm4gZHx8ZT8oZD1kfHx7fSxlPWV8fHt9LGpzcGIuTWVzc2FnZS5jb21wYXJlRXh0ZW5zaW9ucyhkLGUpKTohMH1pZihhLmNvbnN0cnVjdG9yPT09T2JqZWN0KXJldHVybiBqc3BiLk1lc3NhZ2UuY29tcGFyZUV4dGVuc2lvbnMoYSxiKTt0aHJvdyBFcnJvcihcIkludmFsaWQgdHlwZSBpbiBKU1BCIGFycmF5XCIpO307anNwYi5NZXNzYWdlLnByb3RvdHlwZS5jbG9uZU1lc3NhZ2U9ZnVuY3Rpb24oKXtyZXR1cm4ganNwYi5NZXNzYWdlLmNsb25lTWVzc2FnZSh0aGlzKX07XG5qc3BiLk1lc3NhZ2UucHJvdG90eXBlLmNsb25lPWZ1bmN0aW9uKCl7cmV0dXJuIGpzcGIuTWVzc2FnZS5jbG9uZU1lc3NhZ2UodGhpcyl9O2pzcGIuTWVzc2FnZS5jbG9uZT1mdW5jdGlvbihhKXtyZXR1cm4ganNwYi5NZXNzYWdlLmNsb25lTWVzc2FnZShhKX07anNwYi5NZXNzYWdlLmNsb25lTWVzc2FnZT1mdW5jdGlvbihhKXtyZXR1cm4gbmV3IGEuY29uc3RydWN0b3IoanNwYi5NZXNzYWdlLmNsb25lXyhhLnRvQXJyYXkoKSkpfTtcbmpzcGIuTWVzc2FnZS5jb3B5SW50bz1mdW5jdGlvbihhLGIpe2dvb2cuYXNzZXJ0cy5hc3NlcnRJbnN0YW5jZW9mKGEsanNwYi5NZXNzYWdlKTtnb29nLmFzc2VydHMuYXNzZXJ0SW5zdGFuY2VvZihiLGpzcGIuTWVzc2FnZSk7Z29vZy5hc3NlcnRzLmFzc2VydChhLmNvbnN0cnVjdG9yPT1iLmNvbnN0cnVjdG9yLFwiQ29weSBzb3VyY2UgYW5kIHRhcmdldCBtZXNzYWdlIHNob3VsZCBoYXZlIHRoZSBzYW1lIHR5cGUuXCIpO2Zvcih2YXIgYz1qc3BiLk1lc3NhZ2UuY2xvbmUoYSksZD1iLnRvQXJyYXkoKSxlPWMudG9BcnJheSgpLGY9ZC5sZW5ndGg9MDtmPGUubGVuZ3RoO2YrKylkW2ZdPWVbZl07Yi53cmFwcGVyc189Yy53cmFwcGVyc187Yi5leHRlbnNpb25PYmplY3RfPWMuZXh0ZW5zaW9uT2JqZWN0X307XG5qc3BiLk1lc3NhZ2UuY2xvbmVfPWZ1bmN0aW9uKGEpe3ZhciBiO2lmKGdvb2cuaXNBcnJheShhKSl7Zm9yKHZhciBjPUFycmF5KGEubGVuZ3RoKSxkPTA7ZDxhLmxlbmd0aDtkKyspYj1hW2RdLG51bGwhPWImJihjW2RdPVwib2JqZWN0XCI9PXR5cGVvZiBiP2pzcGIuTWVzc2FnZS5jbG9uZV8oZ29vZy5hc3NlcnRzLmFzc2VydChiKSk6Yik7cmV0dXJuIGN9aWYoanNwYi5NZXNzYWdlLlNVUFBPUlRTX1VJTlQ4QVJSQVlfJiZhIGluc3RhbmNlb2YgVWludDhBcnJheSlyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYSk7Yz17fTtmb3IoZCBpbiBhKWI9YVtkXSxudWxsIT1iJiYoY1tkXT1cIm9iamVjdFwiPT10eXBlb2YgYj9qc3BiLk1lc3NhZ2UuY2xvbmVfKGdvb2cuYXNzZXJ0cy5hc3NlcnQoYikpOmIpO3JldHVybiBjfTtqc3BiLk1lc3NhZ2UucmVnaXN0ZXJNZXNzYWdlVHlwZT1mdW5jdGlvbihhLGIpe2pzcGIuTWVzc2FnZS5yZWdpc3RyeV9bYV09YjtiLm1lc3NhZ2VJZD1hfTtcbmpzcGIuTWVzc2FnZS5yZWdpc3RyeV89e307anNwYi5NZXNzYWdlLm1lc3NhZ2VTZXRFeHRlbnNpb25zPXt9O2pzcGIuTWVzc2FnZS5tZXNzYWdlU2V0RXh0ZW5zaW9uc0JpbmFyeT17fTtqc3BiLmFyaXRoPXt9O2pzcGIuYXJpdGguVUludDY0PWZ1bmN0aW9uKGEsYil7dGhpcy5sbz1hO3RoaXMuaGk9Yn07anNwYi5hcml0aC5VSW50NjQucHJvdG90eXBlLmNtcD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5oaTxhLmhpfHx0aGlzLmhpPT1hLmhpJiZ0aGlzLmxvPGEubG8/LTE6dGhpcy5oaT09YS5oaSYmdGhpcy5sbz09YS5sbz8wOjF9O2pzcGIuYXJpdGguVUludDY0LnByb3RvdHlwZS5yaWdodFNoaWZ0PWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBqc3BiLmFyaXRoLlVJbnQ2NCgodGhpcy5sbz4+PjF8KHRoaXMuaGkmMSk8PDMxKT4+PjAsdGhpcy5oaT4+PjE+Pj4wKX07anNwYi5hcml0aC5VSW50NjQucHJvdG90eXBlLmxlZnRTaGlmdD1mdW5jdGlvbigpe3JldHVybiBuZXcganNwYi5hcml0aC5VSW50NjQodGhpcy5sbzw8MT4+PjAsKHRoaXMuaGk8PDF8dGhpcy5sbz4+PjMxKT4+PjApfTtcbmpzcGIuYXJpdGguVUludDY0LnByb3RvdHlwZS5tc2I9ZnVuY3Rpb24oKXtyZXR1cm4hISh0aGlzLmhpJjIxNDc0ODM2NDgpfTtqc3BiLmFyaXRoLlVJbnQ2NC5wcm90b3R5cGUubHNiPWZ1bmN0aW9uKCl7cmV0dXJuISEodGhpcy5sbyYxKX07anNwYi5hcml0aC5VSW50NjQucHJvdG90eXBlLnplcm89ZnVuY3Rpb24oKXtyZXR1cm4gMD09dGhpcy5sbyYmMD09dGhpcy5oaX07anNwYi5hcml0aC5VSW50NjQucHJvdG90eXBlLmFkZD1mdW5jdGlvbihhKXtyZXR1cm4gbmV3IGpzcGIuYXJpdGguVUludDY0KCh0aGlzLmxvK2EubG8mNDI5NDk2NzI5NSk+Pj4wPj4+MCwoKHRoaXMuaGkrYS5oaSY0Mjk0OTY3Mjk1KT4+PjApKyg0Mjk0OTY3Mjk2PD10aGlzLmxvK2EubG8/MTowKT4+PjApfTtcbmpzcGIuYXJpdGguVUludDY0LnByb3RvdHlwZS5zdWI9ZnVuY3Rpb24oYSl7cmV0dXJuIG5ldyBqc3BiLmFyaXRoLlVJbnQ2NCgodGhpcy5sby1hLmxvJjQyOTQ5NjcyOTUpPj4+MD4+PjAsKCh0aGlzLmhpLWEuaGkmNDI5NDk2NzI5NSk+Pj4wKS0oMD50aGlzLmxvLWEubG8/MTowKT4+PjApfTtqc3BiLmFyaXRoLlVJbnQ2NC5tdWwzMngzMj1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz1hJjY1NTM1LGQ9YT4+PjE2LGU9YiY2NTUzNSxmPWI+Pj4xNixnPWMqZSs2NTUzNiooYypmJjY1NTM1KSs2NTUzNiooZCplJjY1NTM1KSxjPWQqZisoYypmPj4+MTYpKyhkKmU+Pj4xNik7NDI5NDk2NzI5Njw9ZzspZy09NDI5NDk2NzI5NixjKz0xO3JldHVybiBuZXcganNwYi5hcml0aC5VSW50NjQoZz4+PjAsYz4+PjApfTtcbmpzcGIuYXJpdGguVUludDY0LnByb3RvdHlwZS5tdWw9ZnVuY3Rpb24oYSl7dmFyIGI9anNwYi5hcml0aC5VSW50NjQubXVsMzJ4MzIodGhpcy5sbyxhKTthPWpzcGIuYXJpdGguVUludDY0Lm11bDMyeDMyKHRoaXMuaGksYSk7YS5oaT1hLmxvO2EubG89MDtyZXR1cm4gYi5hZGQoYSl9O1xuanNwYi5hcml0aC5VSW50NjQucHJvdG90eXBlLmRpdj1mdW5jdGlvbihhKXtpZigwPT1hKXJldHVybltdO3ZhciBiPW5ldyBqc3BiLmFyaXRoLlVJbnQ2NCgwLDApLGM9bmV3IGpzcGIuYXJpdGguVUludDY0KHRoaXMubG8sdGhpcy5oaSk7YT1uZXcganNwYi5hcml0aC5VSW50NjQoYSwwKTtmb3IodmFyIGQ9bmV3IGpzcGIuYXJpdGguVUludDY0KDEsMCk7IWEubXNiKCk7KWE9YS5sZWZ0U2hpZnQoKSxkPWQubGVmdFNoaWZ0KCk7Zm9yKDshZC56ZXJvKCk7KTA+PWEuY21wKGMpJiYoYj1iLmFkZChkKSxjPWMuc3ViKGEpKSxhPWEucmlnaHRTaGlmdCgpLGQ9ZC5yaWdodFNoaWZ0KCk7cmV0dXJuW2IsY119O2pzcGIuYXJpdGguVUludDY0LnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe2Zvcih2YXIgYT1cIlwiLGI9dGhpczshYi56ZXJvKCk7KXZhciBiPWIuZGl2KDEwKSxjPWJbMF0sYT1iWzFdLmxvK2EsYj1jO1wiXCI9PWEmJihhPVwiMFwiKTtyZXR1cm4gYX07XG5qc3BiLmFyaXRoLlVJbnQ2NC5mcm9tU3RyaW5nPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1uZXcganNwYi5hcml0aC5VSW50NjQoMCwwKSxjPW5ldyBqc3BiLmFyaXRoLlVJbnQ2NCgwLDApLGQ9MDtkPGEubGVuZ3RoO2QrKyl7aWYoXCIwXCI+YVtkXXx8XCI5XCI8YVtkXSlyZXR1cm4gbnVsbDt2YXIgZT1wYXJzZUludChhW2RdLDEwKTtjLmxvPWU7Yj1iLm11bCgxMCkuYWRkKGMpfXJldHVybiBifTtqc3BiLmFyaXRoLlVJbnQ2NC5wcm90b3R5cGUuY2xvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGpzcGIuYXJpdGguVUludDY0KHRoaXMubG8sdGhpcy5oaSl9O2pzcGIuYXJpdGguSW50NjQ9ZnVuY3Rpb24oYSxiKXt0aGlzLmxvPWE7dGhpcy5oaT1ifTtcbmpzcGIuYXJpdGguSW50NjQucHJvdG90eXBlLmFkZD1mdW5jdGlvbihhKXtyZXR1cm4gbmV3IGpzcGIuYXJpdGguSW50NjQoKHRoaXMubG8rYS5sbyY0Mjk0OTY3Mjk1KT4+PjA+Pj4wLCgodGhpcy5oaSthLmhpJjQyOTQ5NjcyOTUpPj4+MCkrKDQyOTQ5NjcyOTY8PXRoaXMubG8rYS5sbz8xOjApPj4+MCl9O2pzcGIuYXJpdGguSW50NjQucHJvdG90eXBlLnN1Yj1mdW5jdGlvbihhKXtyZXR1cm4gbmV3IGpzcGIuYXJpdGguSW50NjQoKHRoaXMubG8tYS5sbyY0Mjk0OTY3Mjk1KT4+PjA+Pj4wLCgodGhpcy5oaS1hLmhpJjQyOTQ5NjcyOTUpPj4+MCktKDA+dGhpcy5sby1hLmxvPzE6MCk+Pj4wKX07anNwYi5hcml0aC5JbnQ2NC5wcm90b3R5cGUuY2xvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGpzcGIuYXJpdGguSW50NjQodGhpcy5sbyx0aGlzLmhpKX07XG5qc3BiLmFyaXRoLkludDY0LnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3ZhciBhPTAhPSh0aGlzLmhpJjIxNDc0ODM2NDgpLGI9bmV3IGpzcGIuYXJpdGguVUludDY0KHRoaXMubG8sdGhpcy5oaSk7YSYmKGI9KG5ldyBqc3BiLmFyaXRoLlVJbnQ2NCgwLDApKS5zdWIoYikpO3JldHVybihhP1wiLVwiOlwiXCIpK2IudG9TdHJpbmcoKX07anNwYi5hcml0aC5JbnQ2NC5mcm9tU3RyaW5nPWZ1bmN0aW9uKGEpe3ZhciBiPTA8YS5sZW5ndGgmJlwiLVwiPT1hWzBdO2ImJihhPWEuc3Vic3RyaW5nKDEpKTthPWpzcGIuYXJpdGguVUludDY0LmZyb21TdHJpbmcoYSk7aWYobnVsbD09PWEpcmV0dXJuIG51bGw7YiYmKGE9KG5ldyBqc3BiLmFyaXRoLlVJbnQ2NCgwLDApKS5zdWIoYSkpO3JldHVybiBuZXcganNwYi5hcml0aC5JbnQ2NChhLmxvLGEuaGkpfTtqc3BiLkJpbmFyeUVuY29kZXI9ZnVuY3Rpb24oKXt0aGlzLmJ1ZmZlcl89W119O2pzcGIuQmluYXJ5RW5jb2Rlci5wcm90b3R5cGUubGVuZ3RoPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYnVmZmVyXy5sZW5ndGh9O2pzcGIuQmluYXJ5RW5jb2Rlci5wcm90b3R5cGUuZW5kPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5idWZmZXJfO3RoaXMuYnVmZmVyXz1bXTtyZXR1cm4gYX07XG5qc3BiLkJpbmFyeUVuY29kZXIucHJvdG90eXBlLndyaXRlU3BsaXRWYXJpbnQ2ND1mdW5jdGlvbihhLGIpe2dvb2cuYXNzZXJ0cy5hc3NlcnQoYT09TWF0aC5mbG9vcihhKSk7Z29vZy5hc3NlcnRzLmFzc2VydChiPT1NYXRoLmZsb29yKGIpKTtnb29nLmFzc2VydHMuYXNzZXJ0KDA8PWEmJmE8anNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMyKTtmb3IoZ29vZy5hc3NlcnRzLmFzc2VydCgwPD1iJiZiPGpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMik7MDxifHwxMjc8YTspdGhpcy5idWZmZXJfLnB1c2goYSYxMjd8MTI4KSxhPShhPj4+N3xiPDwyNSk+Pj4wLGI+Pj49Nzt0aGlzLmJ1ZmZlcl8ucHVzaChhKX07XG5qc3BiLkJpbmFyeUVuY29kZXIucHJvdG90eXBlLndyaXRlU3BsaXRGaXhlZDY0PWZ1bmN0aW9uKGEsYil7Z29vZy5hc3NlcnRzLmFzc2VydChhPT1NYXRoLmZsb29yKGEpKTtnb29nLmFzc2VydHMuYXNzZXJ0KGI9PU1hdGguZmxvb3IoYikpO2dvb2cuYXNzZXJ0cy5hc3NlcnQoMDw9YSYmYTxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fMzIpO2dvb2cuYXNzZXJ0cy5hc3NlcnQoMDw9YiYmYjxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fMzIpO3RoaXMud3JpdGVVaW50MzIoYSk7dGhpcy53cml0ZVVpbnQzMihiKX07XG5qc3BiLkJpbmFyeUVuY29kZXIucHJvdG90eXBlLndyaXRlVW5zaWduZWRWYXJpbnQzMj1mdW5jdGlvbihhKXtnb29nLmFzc2VydHMuYXNzZXJ0KGE9PU1hdGguZmxvb3IoYSkpO2Zvcihnb29nLmFzc2VydHMuYXNzZXJ0KDA8PWEmJmE8anNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMyKTsxMjc8YTspdGhpcy5idWZmZXJfLnB1c2goYSYxMjd8MTI4KSxhPj4+PTc7dGhpcy5idWZmZXJfLnB1c2goYSl9O1xuanNwYi5CaW5hcnlFbmNvZGVyLnByb3RvdHlwZS53cml0ZVNpZ25lZFZhcmludDMyPWZ1bmN0aW9uKGEpe2dvb2cuYXNzZXJ0cy5hc3NlcnQoYT09TWF0aC5mbG9vcihhKSk7Z29vZy5hc3NlcnRzLmFzc2VydChhPj0tanNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMxJiZhPGpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMSk7aWYoMDw9YSl0aGlzLndyaXRlVW5zaWduZWRWYXJpbnQzMihhKTtlbHNle2Zvcih2YXIgYj0wOzk+YjtiKyspdGhpcy5idWZmZXJfLnB1c2goYSYxMjd8MTI4KSxhPj49Nzt0aGlzLmJ1ZmZlcl8ucHVzaCgxKX19O1xuanNwYi5CaW5hcnlFbmNvZGVyLnByb3RvdHlwZS53cml0ZVVuc2lnbmVkVmFyaW50NjQ9ZnVuY3Rpb24oYSl7Z29vZy5hc3NlcnRzLmFzc2VydChhPT1NYXRoLmZsb29yKGEpKTtnb29nLmFzc2VydHMuYXNzZXJ0KDA8PWEmJmE8anNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzY0KTtqc3BiLnV0aWxzLnNwbGl0SW50NjQoYSk7dGhpcy53cml0ZVNwbGl0VmFyaW50NjQoanNwYi51dGlscy5zcGxpdDY0TG93LGpzcGIudXRpbHMuc3BsaXQ2NEhpZ2gpfTtcbmpzcGIuQmluYXJ5RW5jb2Rlci5wcm90b3R5cGUud3JpdGVTaWduZWRWYXJpbnQ2ND1mdW5jdGlvbihhKXtnb29nLmFzc2VydHMuYXNzZXJ0KGE9PU1hdGguZmxvb3IoYSkpO2dvb2cuYXNzZXJ0cy5hc3NlcnQoYT49LWpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT182MyYmYTxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fNjMpO2pzcGIudXRpbHMuc3BsaXRJbnQ2NChhKTt0aGlzLndyaXRlU3BsaXRWYXJpbnQ2NChqc3BiLnV0aWxzLnNwbGl0NjRMb3csanNwYi51dGlscy5zcGxpdDY0SGlnaCl9O1xuanNwYi5CaW5hcnlFbmNvZGVyLnByb3RvdHlwZS53cml0ZVppZ3phZ1ZhcmludDMyPWZ1bmN0aW9uKGEpe2dvb2cuYXNzZXJ0cy5hc3NlcnQoYT09TWF0aC5mbG9vcihhKSk7Z29vZy5hc3NlcnRzLmFzc2VydChhPj0tanNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMxJiZhPGpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMSk7dGhpcy53cml0ZVVuc2lnbmVkVmFyaW50MzIoKGE8PDFeYT4+MzEpPj4+MCl9O2pzcGIuQmluYXJ5RW5jb2Rlci5wcm90b3R5cGUud3JpdGVaaWd6YWdWYXJpbnQ2ND1mdW5jdGlvbihhKXtnb29nLmFzc2VydHMuYXNzZXJ0KGE9PU1hdGguZmxvb3IoYSkpO2dvb2cuYXNzZXJ0cy5hc3NlcnQoYT49LWpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT182MyYmYTxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fNjMpO2pzcGIudXRpbHMuc3BsaXRaaWd6YWc2NChhKTt0aGlzLndyaXRlU3BsaXRWYXJpbnQ2NChqc3BiLnV0aWxzLnNwbGl0NjRMb3csanNwYi51dGlscy5zcGxpdDY0SGlnaCl9O1xuanNwYi5CaW5hcnlFbmNvZGVyLnByb3RvdHlwZS53cml0ZVppZ3phZ1ZhcmludDY0U3RyaW5nPWZ1bmN0aW9uKGEpe3RoaXMud3JpdGVaaWd6YWdWYXJpbnQ2NChwYXJzZUludChhLDEwKSl9O2pzcGIuQmluYXJ5RW5jb2Rlci5wcm90b3R5cGUud3JpdGVVaW50OD1mdW5jdGlvbihhKXtnb29nLmFzc2VydHMuYXNzZXJ0KGE9PU1hdGguZmxvb3IoYSkpO2dvb2cuYXNzZXJ0cy5hc3NlcnQoMDw9YSYmMjU2PmEpO3RoaXMuYnVmZmVyXy5wdXNoKGE+Pj4wJjI1NSl9O2pzcGIuQmluYXJ5RW5jb2Rlci5wcm90b3R5cGUud3JpdGVVaW50MTY9ZnVuY3Rpb24oYSl7Z29vZy5hc3NlcnRzLmFzc2VydChhPT1NYXRoLmZsb29yKGEpKTtnb29nLmFzc2VydHMuYXNzZXJ0KDA8PWEmJjY1NTM2PmEpO3RoaXMuYnVmZmVyXy5wdXNoKGE+Pj4wJjI1NSk7dGhpcy5idWZmZXJfLnB1c2goYT4+PjgmMjU1KX07XG5qc3BiLkJpbmFyeUVuY29kZXIucHJvdG90eXBlLndyaXRlVWludDMyPWZ1bmN0aW9uKGEpe2dvb2cuYXNzZXJ0cy5hc3NlcnQoYT09TWF0aC5mbG9vcihhKSk7Z29vZy5hc3NlcnRzLmFzc2VydCgwPD1hJiZhPGpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMik7dGhpcy5idWZmZXJfLnB1c2goYT4+PjAmMjU1KTt0aGlzLmJ1ZmZlcl8ucHVzaChhPj4+OCYyNTUpO3RoaXMuYnVmZmVyXy5wdXNoKGE+Pj4xNiYyNTUpO3RoaXMuYnVmZmVyXy5wdXNoKGE+Pj4yNCYyNTUpfTtqc3BiLkJpbmFyeUVuY29kZXIucHJvdG90eXBlLndyaXRlVWludDY0PWZ1bmN0aW9uKGEpe2dvb2cuYXNzZXJ0cy5hc3NlcnQoYT09TWF0aC5mbG9vcihhKSk7Z29vZy5hc3NlcnRzLmFzc2VydCgwPD1hJiZhPGpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT182NCk7anNwYi51dGlscy5zcGxpdFVpbnQ2NChhKTt0aGlzLndyaXRlVWludDMyKGpzcGIudXRpbHMuc3BsaXQ2NExvdyk7dGhpcy53cml0ZVVpbnQzMihqc3BiLnV0aWxzLnNwbGl0NjRIaWdoKX07XG5qc3BiLkJpbmFyeUVuY29kZXIucHJvdG90eXBlLndyaXRlSW50OD1mdW5jdGlvbihhKXtnb29nLmFzc2VydHMuYXNzZXJ0KGE9PU1hdGguZmxvb3IoYSkpO2dvb2cuYXNzZXJ0cy5hc3NlcnQoLTEyODw9YSYmMTI4PmEpO3RoaXMuYnVmZmVyXy5wdXNoKGE+Pj4wJjI1NSl9O2pzcGIuQmluYXJ5RW5jb2Rlci5wcm90b3R5cGUud3JpdGVJbnQxNj1mdW5jdGlvbihhKXtnb29nLmFzc2VydHMuYXNzZXJ0KGE9PU1hdGguZmxvb3IoYSkpO2dvb2cuYXNzZXJ0cy5hc3NlcnQoLTMyNzY4PD1hJiYzMjc2OD5hKTt0aGlzLmJ1ZmZlcl8ucHVzaChhPj4+MCYyNTUpO3RoaXMuYnVmZmVyXy5wdXNoKGE+Pj44JjI1NSl9O1xuanNwYi5CaW5hcnlFbmNvZGVyLnByb3RvdHlwZS53cml0ZUludDMyPWZ1bmN0aW9uKGEpe2dvb2cuYXNzZXJ0cy5hc3NlcnQoYT09TWF0aC5mbG9vcihhKSk7Z29vZy5hc3NlcnRzLmFzc2VydChhPj0tanNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMxJiZhPGpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMSk7dGhpcy5idWZmZXJfLnB1c2goYT4+PjAmMjU1KTt0aGlzLmJ1ZmZlcl8ucHVzaChhPj4+OCYyNTUpO3RoaXMuYnVmZmVyXy5wdXNoKGE+Pj4xNiYyNTUpO3RoaXMuYnVmZmVyXy5wdXNoKGE+Pj4yNCYyNTUpfTtcbmpzcGIuQmluYXJ5RW5jb2Rlci5wcm90b3R5cGUud3JpdGVJbnQ2ND1mdW5jdGlvbihhKXtnb29nLmFzc2VydHMuYXNzZXJ0KGE9PU1hdGguZmxvb3IoYSkpO2dvb2cuYXNzZXJ0cy5hc3NlcnQoYT49LWpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT182MyYmYTxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fNjMpO2pzcGIudXRpbHMuc3BsaXRJbnQ2NChhKTt0aGlzLndyaXRlU3BsaXRGaXhlZDY0KGpzcGIudXRpbHMuc3BsaXQ2NExvdyxqc3BiLnV0aWxzLnNwbGl0NjRIaWdoKX07XG5qc3BiLkJpbmFyeUVuY29kZXIucHJvdG90eXBlLndyaXRlSW50NjRTdHJpbmc9ZnVuY3Rpb24oYSl7Z29vZy5hc3NlcnRzLmFzc2VydChhPT1NYXRoLmZsb29yKGEpKTtnb29nLmFzc2VydHMuYXNzZXJ0KCthPj0tanNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzYzJiYrYTxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fNjMpO2pzcGIudXRpbHMuc3BsaXRIYXNoNjQoanNwYi51dGlscy5kZWNpbWFsU3RyaW5nVG9IYXNoNjQoYSkpO3RoaXMud3JpdGVTcGxpdEZpeGVkNjQoanNwYi51dGlscy5zcGxpdDY0TG93LGpzcGIudXRpbHMuc3BsaXQ2NEhpZ2gpfTtqc3BiLkJpbmFyeUVuY29kZXIucHJvdG90eXBlLndyaXRlRmxvYXQ9ZnVuY3Rpb24oYSl7Z29vZy5hc3NlcnRzLmFzc2VydChhPj0tanNwYi5CaW5hcnlDb25zdGFudHMuRkxPQVQzMl9NQVgmJmE8PWpzcGIuQmluYXJ5Q29uc3RhbnRzLkZMT0FUMzJfTUFYKTtqc3BiLnV0aWxzLnNwbGl0RmxvYXQzMihhKTt0aGlzLndyaXRlVWludDMyKGpzcGIudXRpbHMuc3BsaXQ2NExvdyl9O1xuanNwYi5CaW5hcnlFbmNvZGVyLnByb3RvdHlwZS53cml0ZURvdWJsZT1mdW5jdGlvbihhKXtnb29nLmFzc2VydHMuYXNzZXJ0KGE+PS1qc3BiLkJpbmFyeUNvbnN0YW50cy5GTE9BVDY0X01BWCYmYTw9anNwYi5CaW5hcnlDb25zdGFudHMuRkxPQVQ2NF9NQVgpO2pzcGIudXRpbHMuc3BsaXRGbG9hdDY0KGEpO3RoaXMud3JpdGVVaW50MzIoanNwYi51dGlscy5zcGxpdDY0TG93KTt0aGlzLndyaXRlVWludDMyKGpzcGIudXRpbHMuc3BsaXQ2NEhpZ2gpfTtqc3BiLkJpbmFyeUVuY29kZXIucHJvdG90eXBlLndyaXRlQm9vbD1mdW5jdGlvbihhKXtnb29nLmFzc2VydHMuYXNzZXJ0KGdvb2cuaXNCb29sZWFuKGEpfHxnb29nLmlzTnVtYmVyKGEpKTt0aGlzLmJ1ZmZlcl8ucHVzaChhPzE6MCl9O1xuanNwYi5CaW5hcnlFbmNvZGVyLnByb3RvdHlwZS53cml0ZUVudW09ZnVuY3Rpb24oYSl7Z29vZy5hc3NlcnRzLmFzc2VydChhPT1NYXRoLmZsb29yKGEpKTtnb29nLmFzc2VydHMuYXNzZXJ0KGE+PS1qc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fMzEmJmE8anNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMxKTt0aGlzLndyaXRlU2lnbmVkVmFyaW50MzIoYSl9O2pzcGIuQmluYXJ5RW5jb2Rlci5wcm90b3R5cGUud3JpdGVCeXRlcz1mdW5jdGlvbihhKXt0aGlzLmJ1ZmZlcl8ucHVzaC5hcHBseSh0aGlzLmJ1ZmZlcl8sYSl9O2pzcGIuQmluYXJ5RW5jb2Rlci5wcm90b3R5cGUud3JpdGVWYXJpbnRIYXNoNjQ9ZnVuY3Rpb24oYSl7anNwYi51dGlscy5zcGxpdEhhc2g2NChhKTt0aGlzLndyaXRlU3BsaXRWYXJpbnQ2NChqc3BiLnV0aWxzLnNwbGl0NjRMb3csanNwYi51dGlscy5zcGxpdDY0SGlnaCl9O1xuanNwYi5CaW5hcnlFbmNvZGVyLnByb3RvdHlwZS53cml0ZUZpeGVkSGFzaDY0PWZ1bmN0aW9uKGEpe2pzcGIudXRpbHMuc3BsaXRIYXNoNjQoYSk7dGhpcy53cml0ZVVpbnQzMihqc3BiLnV0aWxzLnNwbGl0NjRMb3cpO3RoaXMud3JpdGVVaW50MzIoanNwYi51dGlscy5zcGxpdDY0SGlnaCl9O1xuanNwYi5CaW5hcnlFbmNvZGVyLnByb3RvdHlwZS53cml0ZVN0cmluZz1mdW5jdGlvbihhKXtmb3IodmFyIGI9dGhpcy5idWZmZXJfLmxlbmd0aCxjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPWEuY2hhckNvZGVBdChjKTtpZigxMjg+ZCl0aGlzLmJ1ZmZlcl8ucHVzaChkKTtlbHNlIGlmKDIwNDg+ZCl0aGlzLmJ1ZmZlcl8ucHVzaChkPj42fDE5MiksdGhpcy5idWZmZXJfLnB1c2goZCY2M3wxMjgpO2Vsc2UgaWYoNjU1MzY+ZClpZig1NTI5Njw9ZCYmNTYzMTk+PWQmJmMrMTxhLmxlbmd0aCl7dmFyIGU9YS5jaGFyQ29kZUF0KGMrMSk7NTYzMjA8PWUmJjU3MzQzPj1lJiYoZD0xMDI0KihkLTU1Mjk2KStlLTU2MzIwKzY1NTM2LHRoaXMuYnVmZmVyXy5wdXNoKGQ+PjE4fDI0MCksdGhpcy5idWZmZXJfLnB1c2goZD4+MTImNjN8MTI4KSx0aGlzLmJ1ZmZlcl8ucHVzaChkPj42JjYzfDEyOCksdGhpcy5idWZmZXJfLnB1c2goZCY2M3wxMjgpLGMrKyl9ZWxzZSB0aGlzLmJ1ZmZlcl8ucHVzaChkPj5cbjEyfDIyNCksdGhpcy5idWZmZXJfLnB1c2goZD4+NiY2M3wxMjgpLHRoaXMuYnVmZmVyXy5wdXNoKGQmNjN8MTI4KX1yZXR1cm4gdGhpcy5idWZmZXJfLmxlbmd0aC1ifTtqc3BiLkJpbmFyeVdyaXRlcj1mdW5jdGlvbigpe3RoaXMuYmxvY2tzXz1bXTt0aGlzLnRvdGFsTGVuZ3RoXz0wO3RoaXMuZW5jb2Rlcl89bmV3IGpzcGIuQmluYXJ5RW5jb2Rlcjt0aGlzLmJvb2ttYXJrc189W119O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS5hcHBlbmRVaW50OEFycmF5Xz1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmVuY29kZXJfLmVuZCgpO3RoaXMuYmxvY2tzXy5wdXNoKGIpO3RoaXMuYmxvY2tzXy5wdXNoKGEpO3RoaXMudG90YWxMZW5ndGhfKz1iLmxlbmd0aCthLmxlbmd0aH07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUuYmVnaW5EZWxpbWl0ZWRfPWZ1bmN0aW9uKGEpe3RoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5ERUxJTUlURUQpO2E9dGhpcy5lbmNvZGVyXy5lbmQoKTt0aGlzLmJsb2Nrc18ucHVzaChhKTt0aGlzLnRvdGFsTGVuZ3RoXys9YS5sZW5ndGg7YS5wdXNoKHRoaXMudG90YWxMZW5ndGhfKTtyZXR1cm4gYX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLmVuZERlbGltaXRlZF89ZnVuY3Rpb24oYSl7dmFyIGI9YS5wb3AoKSxiPXRoaXMudG90YWxMZW5ndGhfK3RoaXMuZW5jb2Rlcl8ubGVuZ3RoKCktYjtmb3IoZ29vZy5hc3NlcnRzLmFzc2VydCgwPD1iKTsxMjc8YjspYS5wdXNoKGImMTI3fDEyOCksYj4+Pj03LHRoaXMudG90YWxMZW5ndGhfKys7YS5wdXNoKGIpO3RoaXMudG90YWxMZW5ndGhfKyt9O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlU2VyaWFsaXplZE1lc3NhZ2U9ZnVuY3Rpb24oYSxiLGMpe3RoaXMuYXBwZW5kVWludDhBcnJheV8oYS5zdWJhcnJheShiLGMpKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLm1heWJlV3JpdGVTZXJpYWxpemVkTWVzc2FnZT1mdW5jdGlvbihhLGIsYyl7bnVsbCE9YSYmbnVsbCE9YiYmbnVsbCE9YyYmdGhpcy53cml0ZVNlcmlhbGl6ZWRNZXNzYWdlKGEsYixjKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLnJlc2V0PWZ1bmN0aW9uKCl7dGhpcy5ibG9ja3NfPVtdO3RoaXMuZW5jb2Rlcl8uZW5kKCk7dGhpcy50b3RhbExlbmd0aF89MDt0aGlzLmJvb2ttYXJrc189W119O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLmdldFJlc3VsdEJ1ZmZlcj1mdW5jdGlvbigpe2dvb2cuYXNzZXJ0cy5hc3NlcnQoMD09dGhpcy5ib29rbWFya3NfLmxlbmd0aCk7Zm9yKHZhciBhPW5ldyBVaW50OEFycmF5KHRoaXMudG90YWxMZW5ndGhfK3RoaXMuZW5jb2Rlcl8ubGVuZ3RoKCkpLGI9dGhpcy5ibG9ja3NfLGM9Yi5sZW5ndGgsZD0wLGU9MDtlPGM7ZSsrKXt2YXIgZj1iW2VdO2Euc2V0KGYsZCk7ZCs9Zi5sZW5ndGh9Yj10aGlzLmVuY29kZXJfLmVuZCgpO2Euc2V0KGIsZCk7ZCs9Yi5sZW5ndGg7Z29vZy5hc3NlcnRzLmFzc2VydChkPT1hLmxlbmd0aCk7dGhpcy5ibG9ja3NfPVthXTtyZXR1cm4gYX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLmdldFJlc3VsdEJhc2U2NFN0cmluZz1mdW5jdGlvbihhKXtyZXR1cm4gZ29vZy5jcnlwdC5iYXNlNjQuZW5jb2RlQnl0ZUFycmF5KHRoaXMuZ2V0UmVzdWx0QnVmZmVyKCksYSl9O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLmJlZ2luU3ViTWVzc2FnZT1mdW5jdGlvbihhKXt0aGlzLmJvb2ttYXJrc18ucHVzaCh0aGlzLmJlZ2luRGVsaW1pdGVkXyhhKSl9O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS5lbmRTdWJNZXNzYWdlPWZ1bmN0aW9uKCl7Z29vZy5hc3NlcnRzLmFzc2VydCgwPD10aGlzLmJvb2ttYXJrc18ubGVuZ3RoKTt0aGlzLmVuZERlbGltaXRlZF8odGhpcy5ib29rbWFya3NfLnBvcCgpKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlRmllbGRIZWFkZXJfPWZ1bmN0aW9uKGEsYil7Z29vZy5hc3NlcnRzLmFzc2VydCgxPD1hJiZhPT1NYXRoLmZsb29yKGEpKTt0aGlzLmVuY29kZXJfLndyaXRlVW5zaWduZWRWYXJpbnQzMig4KmErYil9O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlQW55PWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1qc3BiLkJpbmFyeUNvbnN0YW50cy5GaWVsZFR5cGU7c3dpdGNoKGEpe2Nhc2UgZC5ET1VCTEU6dGhpcy53cml0ZURvdWJsZShiLGMpO2JyZWFrO2Nhc2UgZC5GTE9BVDp0aGlzLndyaXRlRmxvYXQoYixjKTticmVhaztjYXNlIGQuSU5UNjQ6dGhpcy53cml0ZUludDY0KGIsYyk7YnJlYWs7Y2FzZSBkLlVJTlQ2NDp0aGlzLndyaXRlVWludDY0KGIsYyk7YnJlYWs7Y2FzZSBkLklOVDMyOnRoaXMud3JpdGVJbnQzMihiLGMpO2JyZWFrO2Nhc2UgZC5GSVhFRDY0OnRoaXMud3JpdGVGaXhlZDY0KGIsYyk7YnJlYWs7Y2FzZSBkLkZJWEVEMzI6dGhpcy53cml0ZUZpeGVkMzIoYixjKTticmVhaztjYXNlIGQuQk9PTDp0aGlzLndyaXRlQm9vbChiLGMpO2JyZWFrO2Nhc2UgZC5TVFJJTkc6dGhpcy53cml0ZVN0cmluZyhiLGMpO2JyZWFrO2Nhc2UgZC5HUk9VUDpnb29nLmFzc2VydHMuZmFpbChcIkdyb3VwIGZpZWxkIHR5cGUgbm90IHN1cHBvcnRlZCBpbiB3cml0ZUFueSgpXCIpO1xuYnJlYWs7Y2FzZSBkLk1FU1NBR0U6Z29vZy5hc3NlcnRzLmZhaWwoXCJNZXNzYWdlIGZpZWxkIHR5cGUgbm90IHN1cHBvcnRlZCBpbiB3cml0ZUFueSgpXCIpO2JyZWFrO2Nhc2UgZC5CWVRFUzp0aGlzLndyaXRlQnl0ZXMoYixjKTticmVhaztjYXNlIGQuVUlOVDMyOnRoaXMud3JpdGVVaW50MzIoYixjKTticmVhaztjYXNlIGQuRU5VTTp0aGlzLndyaXRlRW51bShiLGMpO2JyZWFrO2Nhc2UgZC5TRklYRUQzMjp0aGlzLndyaXRlU2ZpeGVkMzIoYixjKTticmVhaztjYXNlIGQuU0ZJWEVENjQ6dGhpcy53cml0ZVNmaXhlZDY0KGIsYyk7YnJlYWs7Y2FzZSBkLlNJTlQzMjp0aGlzLndyaXRlU2ludDMyKGIsYyk7YnJlYWs7Y2FzZSBkLlNJTlQ2NDp0aGlzLndyaXRlU2ludDY0KGIsYyk7YnJlYWs7Y2FzZSBkLkZIQVNINjQ6dGhpcy53cml0ZUZpeGVkSGFzaDY0KGIsYyk7YnJlYWs7Y2FzZSBkLlZIQVNINjQ6dGhpcy53cml0ZVZhcmludEhhc2g2NChiLGMpO2JyZWFrO2RlZmF1bHQ6Z29vZy5hc3NlcnRzLmZhaWwoXCJJbnZhbGlkIGZpZWxkIHR5cGUgaW4gd3JpdGVBbnkoKVwiKX19O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVW5zaWduZWRWYXJpbnQzMl89ZnVuY3Rpb24oYSxiKXtudWxsIT1iJiYodGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlZBUklOVCksdGhpcy5lbmNvZGVyXy53cml0ZVVuc2lnbmVkVmFyaW50MzIoYikpfTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVTaWduZWRWYXJpbnQzMl89ZnVuY3Rpb24oYSxiKXtudWxsIT1iJiYodGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlZBUklOVCksdGhpcy5lbmNvZGVyXy53cml0ZVNpZ25lZFZhcmludDMyKGIpKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVW5zaWduZWRWYXJpbnQ2NF89ZnVuY3Rpb24oYSxiKXtudWxsIT1iJiYodGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlZBUklOVCksdGhpcy5lbmNvZGVyXy53cml0ZVVuc2lnbmVkVmFyaW50NjQoYikpfTtcbmpzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVNpZ25lZFZhcmludDY0Xz1mdW5jdGlvbihhLGIpe251bGwhPWImJih0aGlzLndyaXRlRmllbGRIZWFkZXJfKGEsanNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuVkFSSU5UKSx0aGlzLmVuY29kZXJfLndyaXRlU2lnbmVkVmFyaW50NjQoYikpfTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVaaWd6YWdWYXJpbnQzMl89ZnVuY3Rpb24oYSxiKXtudWxsIT1iJiYodGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlZBUklOVCksdGhpcy5lbmNvZGVyXy53cml0ZVppZ3phZ1ZhcmludDMyKGIpKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlWmlnemFnVmFyaW50NjRfPWZ1bmN0aW9uKGEsYil7bnVsbCE9YiYmKHRoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5WQVJJTlQpLHRoaXMuZW5jb2Rlcl8ud3JpdGVaaWd6YWdWYXJpbnQ2NChiKSl9O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlWmlnemFnVmFyaW50NjRTdHJpbmdfPWZ1bmN0aW9uKGEsYil7bnVsbCE9YiYmKHRoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5WQVJJTlQpLHRoaXMuZW5jb2Rlcl8ud3JpdGVaaWd6YWdWYXJpbnQ2NFN0cmluZyhiKSl9O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUludDMyPWZ1bmN0aW9uKGEsYil7bnVsbCE9YiYmKGdvb2cuYXNzZXJ0cy5hc3NlcnQoYj49LWpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMSYmYjxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fMzEpLHRoaXMud3JpdGVTaWduZWRWYXJpbnQzMl8oYSxiKSl9O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlSW50MzJTdHJpbmc9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKXt2YXIgYz1wYXJzZUludChiLDEwKTtnb29nLmFzc2VydHMuYXNzZXJ0KGM+PS1qc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fMzEmJmM8anNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMxKTt0aGlzLndyaXRlU2lnbmVkVmFyaW50MzJfKGEsYyl9fTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVJbnQ2ND1mdW5jdGlvbihhLGIpe251bGwhPWImJihnb29nLmFzc2VydHMuYXNzZXJ0KGI+PS1qc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fNjMmJmI8anNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzYzKSx0aGlzLndyaXRlU2lnbmVkVmFyaW50NjRfKGEsYikpfTtcbmpzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUludDY0U3RyaW5nPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9Yil7dmFyIGM9anNwYi5hcml0aC5JbnQ2NC5mcm9tU3RyaW5nKGIpO3RoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5WQVJJTlQpO3RoaXMuZW5jb2Rlcl8ud3JpdGVTcGxpdFZhcmludDY0KGMubG8sYy5oaSl9fTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVVaW50MzI9ZnVuY3Rpb24oYSxiKXtudWxsIT1iJiYoZ29vZy5hc3NlcnRzLmFzc2VydCgwPD1iJiZiPGpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMiksdGhpcy53cml0ZVVuc2lnbmVkVmFyaW50MzJfKGEsYikpfTtcbmpzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVVpbnQzMlN0cmluZz1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWIpe3ZhciBjPXBhcnNlSW50KGIsMTApO2dvb2cuYXNzZXJ0cy5hc3NlcnQoMDw9YyYmYzxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fMzIpO3RoaXMud3JpdGVVbnNpZ25lZFZhcmludDMyXyhhLGMpfX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVWludDY0PWZ1bmN0aW9uKGEsYil7bnVsbCE9YiYmKGdvb2cuYXNzZXJ0cy5hc3NlcnQoMDw9YiYmYjxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fNjQpLHRoaXMud3JpdGVVbnNpZ25lZFZhcmludDY0XyhhLGIpKX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVVaW50NjRTdHJpbmc9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKXt2YXIgYz1qc3BiLmFyaXRoLlVJbnQ2NC5mcm9tU3RyaW5nKGIpO3RoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5WQVJJTlQpO3RoaXMuZW5jb2Rlcl8ud3JpdGVTcGxpdFZhcmludDY0KGMubG8sYy5oaSl9fTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVTaW50MzI9ZnVuY3Rpb24oYSxiKXtudWxsIT1iJiYoZ29vZy5hc3NlcnRzLmFzc2VydChiPj0tanNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMxJiZiPGpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMSksdGhpcy53cml0ZVppZ3phZ1ZhcmludDMyXyhhLGIpKX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVTaW50NjQ9ZnVuY3Rpb24oYSxiKXtudWxsIT1iJiYoZ29vZy5hc3NlcnRzLmFzc2VydChiPj0tanNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzYzJiZiPGpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT182MyksdGhpcy53cml0ZVppZ3phZ1ZhcmludDY0XyhhLGIpKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlU2ludDY0U3RyaW5nPWZ1bmN0aW9uKGEsYil7bnVsbCE9YiYmKGdvb2cuYXNzZXJ0cy5hc3NlcnQoK2I+PS1qc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fNjMmJitiPGpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT182MyksdGhpcy53cml0ZVppZ3phZ1ZhcmludDY0U3RyaW5nXyhhLGIpKX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVGaXhlZDMyPWZ1bmN0aW9uKGEsYil7bnVsbCE9YiYmKGdvb2cuYXNzZXJ0cy5hc3NlcnQoMDw9YiYmYjxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fMzIpLHRoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5GSVhFRDMyKSx0aGlzLmVuY29kZXJfLndyaXRlVWludDMyKGIpKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlRml4ZWQ2ND1mdW5jdGlvbihhLGIpe251bGwhPWImJihnb29nLmFzc2VydHMuYXNzZXJ0KDA8PWImJmI8anNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzY0KSx0aGlzLndyaXRlRmllbGRIZWFkZXJfKGEsanNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuRklYRUQ2NCksdGhpcy5lbmNvZGVyXy53cml0ZVVpbnQ2NChiKSl9O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlRml4ZWQ2NFN0cmluZz1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWIpe3ZhciBjPWpzcGIuYXJpdGguVUludDY0LmZyb21TdHJpbmcoYik7dGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkZJWEVENjQpO3RoaXMuZW5jb2Rlcl8ud3JpdGVTcGxpdEZpeGVkNjQoYy5sbyxjLmhpKX19O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVNmaXhlZDMyPWZ1bmN0aW9uKGEsYil7bnVsbCE9YiYmKGdvb2cuYXNzZXJ0cy5hc3NlcnQoYj49LWpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT18zMSYmYjxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fMzEpLHRoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5GSVhFRDMyKSx0aGlzLmVuY29kZXJfLndyaXRlSW50MzIoYikpfTtcbmpzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVNmaXhlZDY0PWZ1bmN0aW9uKGEsYil7bnVsbCE9YiYmKGdvb2cuYXNzZXJ0cy5hc3NlcnQoYj49LWpzcGIuQmluYXJ5Q29uc3RhbnRzLlRXT19UT182MyYmYjxqc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fNjMpLHRoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5GSVhFRDY0KSx0aGlzLmVuY29kZXJfLndyaXRlSW50NjQoYikpfTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVTZml4ZWQ2NFN0cmluZz1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWIpe3ZhciBjPWpzcGIuYXJpdGguSW50NjQuZnJvbVN0cmluZyhiKTt0aGlzLndyaXRlRmllbGRIZWFkZXJfKGEsanNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuRklYRUQ2NCk7dGhpcy5lbmNvZGVyXy53cml0ZVNwbGl0Rml4ZWQ2NChjLmxvLGMuaGkpfX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVGbG9hdD1mdW5jdGlvbihhLGIpe251bGwhPWImJih0aGlzLndyaXRlRmllbGRIZWFkZXJfKGEsanNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuRklYRUQzMiksdGhpcy5lbmNvZGVyXy53cml0ZUZsb2F0KGIpKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlRG91YmxlPWZ1bmN0aW9uKGEsYil7bnVsbCE9YiYmKHRoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5GSVhFRDY0KSx0aGlzLmVuY29kZXJfLndyaXRlRG91YmxlKGIpKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlQm9vbD1mdW5jdGlvbihhLGIpe251bGwhPWImJihnb29nLmFzc2VydHMuYXNzZXJ0KGdvb2cuaXNCb29sZWFuKGIpfHxnb29nLmlzTnVtYmVyKGIpKSx0aGlzLndyaXRlRmllbGRIZWFkZXJfKGEsanNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuVkFSSU5UKSx0aGlzLmVuY29kZXJfLndyaXRlQm9vbChiKSl9O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlRW51bT1mdW5jdGlvbihhLGIpe251bGwhPWImJihnb29nLmFzc2VydHMuYXNzZXJ0KGI+PS1qc3BiLkJpbmFyeUNvbnN0YW50cy5UV09fVE9fMzEmJmI8anNwYi5CaW5hcnlDb25zdGFudHMuVFdPX1RPXzMxKSx0aGlzLndyaXRlRmllbGRIZWFkZXJfKGEsanNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuVkFSSU5UKSx0aGlzLmVuY29kZXJfLndyaXRlU2lnbmVkVmFyaW50MzIoYikpfTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVTdHJpbmc9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKXt2YXIgYz10aGlzLmJlZ2luRGVsaW1pdGVkXyhhKTt0aGlzLmVuY29kZXJfLndyaXRlU3RyaW5nKGIpO3RoaXMuZW5kRGVsaW1pdGVkXyhjKX19O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlQnl0ZXM9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKXt2YXIgYz1qc3BiLnV0aWxzLmJ5dGVTb3VyY2VUb1VpbnQ4QXJyYXkoYik7dGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkRFTElNSVRFRCk7dGhpcy5lbmNvZGVyXy53cml0ZVVuc2lnbmVkVmFyaW50MzIoYy5sZW5ndGgpO3RoaXMuYXBwZW5kVWludDhBcnJheV8oYyl9fTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVNZXNzYWdlPWZ1bmN0aW9uKGEsYixjKXtudWxsIT1iJiYoYT10aGlzLmJlZ2luRGVsaW1pdGVkXyhhKSxjKGIsdGhpcyksdGhpcy5lbmREZWxpbWl0ZWRfKGEpKX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVHcm91cD1mdW5jdGlvbihhLGIsYyl7bnVsbCE9YiYmKHRoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5TVEFSVF9HUk9VUCksYyhiLHRoaXMpLHRoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5FTkRfR1JPVVApKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlRml4ZWRIYXNoNjQ9ZnVuY3Rpb24oYSxiKXtudWxsIT1iJiYoZ29vZy5hc3NlcnRzLmFzc2VydCg4PT1iLmxlbmd0aCksdGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkZJWEVENjQpLHRoaXMuZW5jb2Rlcl8ud3JpdGVGaXhlZEhhc2g2NChiKSl9O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVmFyaW50SGFzaDY0PWZ1bmN0aW9uKGEsYil7bnVsbCE9YiYmKGdvb2cuYXNzZXJ0cy5hc3NlcnQoOD09Yi5sZW5ndGgpLHRoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5WQVJJTlQpLHRoaXMuZW5jb2Rlcl8ud3JpdGVWYXJpbnRIYXNoNjQoYikpfTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVSZXBlYXRlZEludDMyPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9Yilmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl0aGlzLndyaXRlU2lnbmVkVmFyaW50MzJfKGEsYltjXSl9O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkSW50MzJTdHJpbmc9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKWZvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMud3JpdGVJbnQzMlN0cmluZyhhLGJbY10pfTtcbmpzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkSW50NjQ9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKWZvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMud3JpdGVTaWduZWRWYXJpbnQ2NF8oYSxiW2NdKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUmVwZWF0ZWRJbnQ2NFN0cmluZz1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWIpZm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspdGhpcy53cml0ZUludDY0U3RyaW5nKGEsYltjXSl9O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkVWludDMyPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9Yilmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl0aGlzLndyaXRlVW5zaWduZWRWYXJpbnQzMl8oYSxiW2NdKX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVSZXBlYXRlZFVpbnQzMlN0cmluZz1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWIpZm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspdGhpcy53cml0ZVVpbnQzMlN0cmluZyhhLGJbY10pfTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVSZXBlYXRlZFVpbnQ2ND1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWIpZm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspdGhpcy53cml0ZVVuc2lnbmVkVmFyaW50NjRfKGEsYltjXSl9O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkVWludDY0U3RyaW5nPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9Yilmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl0aGlzLndyaXRlVWludDY0U3RyaW5nKGEsYltjXSl9O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUmVwZWF0ZWRTaW50MzI9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKWZvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMud3JpdGVaaWd6YWdWYXJpbnQzMl8oYSxiW2NdKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUmVwZWF0ZWRTaW50NjQ9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKWZvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMud3JpdGVaaWd6YWdWYXJpbnQ2NF8oYSxiW2NdKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUmVwZWF0ZWRTaW50NjRTdHJpbmc9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKWZvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMud3JpdGVaaWd6YWdWYXJpbnQ2NFN0cmluZ18oYSxiW2NdKX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVSZXBlYXRlZEZpeGVkMzI9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKWZvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMud3JpdGVGaXhlZDMyKGEsYltjXSl9O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkRml4ZWQ2ND1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWIpZm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspdGhpcy53cml0ZUZpeGVkNjQoYSxiW2NdKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUmVwZWF0ZWRGaXhlZDY0U3RyaW5nPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9Yilmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl0aGlzLndyaXRlRml4ZWQ2NFN0cmluZyhhLGJbY10pfTtcbmpzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkU2ZpeGVkMzI9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKWZvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMud3JpdGVTZml4ZWQzMihhLGJbY10pfTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVSZXBlYXRlZFNmaXhlZDY0PWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9Yilmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl0aGlzLndyaXRlU2ZpeGVkNjQoYSxiW2NdKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUmVwZWF0ZWRTZml4ZWQ2NFN0cmluZz1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWIpZm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspdGhpcy53cml0ZVNmaXhlZDY0U3RyaW5nKGEsYltjXSl9O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUmVwZWF0ZWRGbG9hdD1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWIpZm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspdGhpcy53cml0ZUZsb2F0KGEsYltjXSl9O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkRG91YmxlPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9Yilmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl0aGlzLndyaXRlRG91YmxlKGEsYltjXSl9O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkQm9vbD1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWIpZm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspdGhpcy53cml0ZUJvb2woYSxiW2NdKX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUmVwZWF0ZWRFbnVtPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9Yilmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl0aGlzLndyaXRlRW51bShhLGJbY10pfTtcbmpzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkU3RyaW5nPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9Yilmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl0aGlzLndyaXRlU3RyaW5nKGEsYltjXSl9O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkQnl0ZXM9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKWZvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMud3JpdGVCeXRlcyhhLGJbY10pfTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVSZXBlYXRlZE1lc3NhZ2U9ZnVuY3Rpb24oYSxiLGMpe2lmKG51bGwhPWIpZm9yKHZhciBkPTA7ZDxiLmxlbmd0aDtkKyspe3ZhciBlPXRoaXMuYmVnaW5EZWxpbWl0ZWRfKGEpO2MoYltkXSx0aGlzKTt0aGlzLmVuZERlbGltaXRlZF8oZSl9fTtcbmpzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkR3JvdXA9ZnVuY3Rpb24oYSxiLGMpe2lmKG51bGwhPWIpZm9yKHZhciBkPTA7ZDxiLmxlbmd0aDtkKyspdGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLlNUQVJUX0dST1VQKSxjKGJbZF0sdGhpcyksdGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkVORF9HUk9VUCl9O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkRml4ZWRIYXNoNjQ9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iKWZvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMud3JpdGVGaXhlZEhhc2g2NChhLGJbY10pfTtcbmpzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVJlcGVhdGVkVmFyaW50SGFzaDY0PWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9Yilmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl0aGlzLndyaXRlVmFyaW50SGFzaDY0KGEsYltjXSl9O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVBhY2tlZEludDMyPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9YiYmYi5sZW5ndGgpe2Zvcih2YXIgYz10aGlzLmJlZ2luRGVsaW1pdGVkXyhhKSxkPTA7ZDxiLmxlbmd0aDtkKyspdGhpcy5lbmNvZGVyXy53cml0ZVNpZ25lZFZhcmludDMyKGJbZF0pO3RoaXMuZW5kRGVsaW1pdGVkXyhjKX19O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUGFja2VkSW50MzJTdHJpbmc9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iJiZiLmxlbmd0aCl7Zm9yKHZhciBjPXRoaXMuYmVnaW5EZWxpbWl0ZWRfKGEpLGQ9MDtkPGIubGVuZ3RoO2QrKyl0aGlzLmVuY29kZXJfLndyaXRlU2lnbmVkVmFyaW50MzIocGFyc2VJbnQoYltkXSwxMCkpO3RoaXMuZW5kRGVsaW1pdGVkXyhjKX19O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVBhY2tlZEludDY0PWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9YiYmYi5sZW5ndGgpe2Zvcih2YXIgYz10aGlzLmJlZ2luRGVsaW1pdGVkXyhhKSxkPTA7ZDxiLmxlbmd0aDtkKyspdGhpcy5lbmNvZGVyXy53cml0ZVNpZ25lZFZhcmludDY0KGJbZF0pO3RoaXMuZW5kRGVsaW1pdGVkXyhjKX19O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUGFja2VkSW50NjRTdHJpbmc9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iJiZiLmxlbmd0aCl7Zm9yKHZhciBjPXRoaXMuYmVnaW5EZWxpbWl0ZWRfKGEpLGQ9MDtkPGIubGVuZ3RoO2QrKyl7dmFyIGU9anNwYi5hcml0aC5JbnQ2NC5mcm9tU3RyaW5nKGJbZF0pO3RoaXMuZW5jb2Rlcl8ud3JpdGVTcGxpdFZhcmludDY0KGUubG8sZS5oaSl9dGhpcy5lbmREZWxpbWl0ZWRfKGMpfX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUGFja2VkVWludDMyPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9YiYmYi5sZW5ndGgpe2Zvcih2YXIgYz10aGlzLmJlZ2luRGVsaW1pdGVkXyhhKSxkPTA7ZDxiLmxlbmd0aDtkKyspdGhpcy5lbmNvZGVyXy53cml0ZVVuc2lnbmVkVmFyaW50MzIoYltkXSk7dGhpcy5lbmREZWxpbWl0ZWRfKGMpfX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVQYWNrZWRVaW50MzJTdHJpbmc9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iJiZiLmxlbmd0aCl7Zm9yKHZhciBjPXRoaXMuYmVnaW5EZWxpbWl0ZWRfKGEpLGQ9MDtkPGIubGVuZ3RoO2QrKyl0aGlzLmVuY29kZXJfLndyaXRlVW5zaWduZWRWYXJpbnQzMihwYXJzZUludChiW2RdLDEwKSk7dGhpcy5lbmREZWxpbWl0ZWRfKGMpfX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUGFja2VkVWludDY0PWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9YiYmYi5sZW5ndGgpe2Zvcih2YXIgYz10aGlzLmJlZ2luRGVsaW1pdGVkXyhhKSxkPTA7ZDxiLmxlbmd0aDtkKyspdGhpcy5lbmNvZGVyXy53cml0ZVVuc2lnbmVkVmFyaW50NjQoYltkXSk7dGhpcy5lbmREZWxpbWl0ZWRfKGMpfX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVQYWNrZWRVaW50NjRTdHJpbmc9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iJiZiLmxlbmd0aCl7Zm9yKHZhciBjPXRoaXMuYmVnaW5EZWxpbWl0ZWRfKGEpLGQ9MDtkPGIubGVuZ3RoO2QrKyl7dmFyIGU9anNwYi5hcml0aC5VSW50NjQuZnJvbVN0cmluZyhiW2RdKTt0aGlzLmVuY29kZXJfLndyaXRlU3BsaXRWYXJpbnQ2NChlLmxvLGUuaGkpfXRoaXMuZW5kRGVsaW1pdGVkXyhjKX19O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVBhY2tlZFNpbnQzMj1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWImJmIubGVuZ3RoKXtmb3IodmFyIGM9dGhpcy5iZWdpbkRlbGltaXRlZF8oYSksZD0wO2Q8Yi5sZW5ndGg7ZCsrKXRoaXMuZW5jb2Rlcl8ud3JpdGVaaWd6YWdWYXJpbnQzMihiW2RdKTt0aGlzLmVuZERlbGltaXRlZF8oYyl9fTtcbmpzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVBhY2tlZFNpbnQ2ND1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWImJmIubGVuZ3RoKXtmb3IodmFyIGM9dGhpcy5iZWdpbkRlbGltaXRlZF8oYSksZD0wO2Q8Yi5sZW5ndGg7ZCsrKXRoaXMuZW5jb2Rlcl8ud3JpdGVaaWd6YWdWYXJpbnQ2NChiW2RdKTt0aGlzLmVuZERlbGltaXRlZF8oYyl9fTtqc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVQYWNrZWRTaW50NjRTdHJpbmc9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iJiZiLmxlbmd0aCl7Zm9yKHZhciBjPXRoaXMuYmVnaW5EZWxpbWl0ZWRfKGEpLGQ9MDtkPGIubGVuZ3RoO2QrKyl0aGlzLmVuY29kZXJfLndyaXRlWmlnemFnVmFyaW50NjQocGFyc2VJbnQoYltkXSwxMCkpO3RoaXMuZW5kRGVsaW1pdGVkXyhjKX19O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUGFja2VkRml4ZWQzMj1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWImJmIubGVuZ3RoKXt0aGlzLndyaXRlRmllbGRIZWFkZXJfKGEsanNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuREVMSU1JVEVEKTt0aGlzLmVuY29kZXJfLndyaXRlVW5zaWduZWRWYXJpbnQzMig0KmIubGVuZ3RoKTtmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl0aGlzLmVuY29kZXJfLndyaXRlVWludDMyKGJbY10pfX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUGFja2VkRml4ZWQ2ND1mdW5jdGlvbihhLGIpe2lmKG51bGwhPWImJmIubGVuZ3RoKXt0aGlzLndyaXRlRmllbGRIZWFkZXJfKGEsanNwYi5CaW5hcnlDb25zdGFudHMuV2lyZVR5cGUuREVMSU1JVEVEKTt0aGlzLmVuY29kZXJfLndyaXRlVW5zaWduZWRWYXJpbnQzMig4KmIubGVuZ3RoKTtmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl0aGlzLmVuY29kZXJfLndyaXRlVWludDY0KGJbY10pfX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVQYWNrZWRGaXhlZDY0U3RyaW5nPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9YiYmYi5sZW5ndGgpe3RoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5ERUxJTUlURUQpO3RoaXMuZW5jb2Rlcl8ud3JpdGVVbnNpZ25lZFZhcmludDMyKDgqYi5sZW5ndGgpO2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXt2YXIgZD1qc3BiLmFyaXRoLlVJbnQ2NC5mcm9tU3RyaW5nKGJbY10pO3RoaXMuZW5jb2Rlcl8ud3JpdGVTcGxpdEZpeGVkNjQoZC5sbyxkLmhpKX19fTtcbmpzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVBhY2tlZFNmaXhlZDMyPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9YiYmYi5sZW5ndGgpe3RoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5ERUxJTUlURUQpO3RoaXMuZW5jb2Rlcl8ud3JpdGVVbnNpZ25lZFZhcmludDMyKDQqYi5sZW5ndGgpO2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMuZW5jb2Rlcl8ud3JpdGVJbnQzMihiW2NdKX19O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVBhY2tlZFNmaXhlZDY0PWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9YiYmYi5sZW5ndGgpe3RoaXMud3JpdGVGaWVsZEhlYWRlcl8oYSxqc3BiLkJpbmFyeUNvbnN0YW50cy5XaXJlVHlwZS5ERUxJTUlURUQpO3RoaXMuZW5jb2Rlcl8ud3JpdGVVbnNpZ25lZFZhcmludDMyKDgqYi5sZW5ndGgpO2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMuZW5jb2Rlcl8ud3JpdGVJbnQ2NChiW2NdKX19O1xuanNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUGFja2VkU2ZpeGVkNjRTdHJpbmc9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iJiZiLmxlbmd0aCl7dGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkRFTElNSVRFRCk7dGhpcy5lbmNvZGVyXy53cml0ZVVuc2lnbmVkVmFyaW50MzIoOCpiLmxlbmd0aCk7Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspdGhpcy5lbmNvZGVyXy53cml0ZUludDY0U3RyaW5nKGJbY10pfX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUGFja2VkRmxvYXQ9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iJiZiLmxlbmd0aCl7dGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkRFTElNSVRFRCk7dGhpcy5lbmNvZGVyXy53cml0ZVVuc2lnbmVkVmFyaW50MzIoNCpiLmxlbmd0aCk7Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspdGhpcy5lbmNvZGVyXy53cml0ZUZsb2F0KGJbY10pfX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVQYWNrZWREb3VibGU9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iJiZiLmxlbmd0aCl7dGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkRFTElNSVRFRCk7dGhpcy5lbmNvZGVyXy53cml0ZVVuc2lnbmVkVmFyaW50MzIoOCpiLmxlbmd0aCk7Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspdGhpcy5lbmNvZGVyXy53cml0ZURvdWJsZShiW2NdKX19O2pzcGIuQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVBhY2tlZEJvb2w9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iJiZiLmxlbmd0aCl7dGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkRFTElNSVRFRCk7dGhpcy5lbmNvZGVyXy53cml0ZVVuc2lnbmVkVmFyaW50MzIoYi5sZW5ndGgpO2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXRoaXMuZW5jb2Rlcl8ud3JpdGVCb29sKGJbY10pfX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVQYWNrZWRFbnVtPWZ1bmN0aW9uKGEsYil7aWYobnVsbCE9YiYmYi5sZW5ndGgpe2Zvcih2YXIgYz10aGlzLmJlZ2luRGVsaW1pdGVkXyhhKSxkPTA7ZDxiLmxlbmd0aDtkKyspdGhpcy5lbmNvZGVyXy53cml0ZUVudW0oYltkXSk7dGhpcy5lbmREZWxpbWl0ZWRfKGMpfX07anNwYi5CaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlUGFja2VkRml4ZWRIYXNoNjQ9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iJiZiLmxlbmd0aCl7dGhpcy53cml0ZUZpZWxkSGVhZGVyXyhhLGpzcGIuQmluYXJ5Q29uc3RhbnRzLldpcmVUeXBlLkRFTElNSVRFRCk7dGhpcy5lbmNvZGVyXy53cml0ZVVuc2lnbmVkVmFyaW50MzIoOCpiLmxlbmd0aCk7Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspdGhpcy5lbmNvZGVyXy53cml0ZUZpeGVkSGFzaDY0KGJbY10pfX07XG5qc3BiLkJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVQYWNrZWRWYXJpbnRIYXNoNjQ9ZnVuY3Rpb24oYSxiKXtpZihudWxsIT1iJiZiLmxlbmd0aCl7Zm9yKHZhciBjPXRoaXMuYmVnaW5EZWxpbWl0ZWRfKGEpLGQ9MDtkPGIubGVuZ3RoO2QrKyl0aGlzLmVuY29kZXJfLndyaXRlVmFyaW50SGFzaDY0KGJbZF0pO3RoaXMuZW5kRGVsaW1pdGVkXyhjKX19O2pzcGIuRXhwb3J0PXt9O2V4cG9ydHMuTWFwPWpzcGIuTWFwO2V4cG9ydHMuTWVzc2FnZT1qc3BiLk1lc3NhZ2U7ZXhwb3J0cy5CaW5hcnlSZWFkZXI9anNwYi5CaW5hcnlSZWFkZXI7ZXhwb3J0cy5CaW5hcnlXcml0ZXI9anNwYi5CaW5hcnlXcml0ZXI7ZXhwb3J0cy5FeHRlbnNpb25GaWVsZEluZm89anNwYi5FeHRlbnNpb25GaWVsZEluZm87ZXhwb3J0cy5FeHRlbnNpb25GaWVsZEJpbmFyeUluZm89anNwYi5FeHRlbnNpb25GaWVsZEJpbmFyeUluZm87ZXhwb3J0cy5leHBvcnRTeW1ib2w9Z29vZy5leHBvcnRTeW1ib2w7ZXhwb3J0cy5pbmhlcml0cz1nb29nLmluaGVyaXRzO2V4cG9ydHMub2JqZWN0PXtleHRlbmQ6Z29vZy5vYmplY3QuZXh0ZW5kfTtleHBvcnRzLnR5cGVPZj1nb29nLnR5cGVPZjtcbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gKGUgKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gKG0gKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAoKHZhbHVlICogYykgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsImltcG9ydCAkJG9ic2VydmFibGUgZnJvbSAnc3ltYm9sLW9ic2VydmFibGUnO1xuXG4vKipcbiAqIFRoZXNlIGFyZSBwcml2YXRlIGFjdGlvbiB0eXBlcyByZXNlcnZlZCBieSBSZWR1eC5cbiAqIEZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB5b3UgbXVzdCByZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBJZiB0aGUgY3VycmVudCBzdGF0ZSBpcyB1bmRlZmluZWQsIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAqIERvIG5vdCByZWZlcmVuY2UgdGhlc2UgYWN0aW9uIHR5cGVzIGRpcmVjdGx5IGluIHlvdXIgY29kZS5cbiAqL1xudmFyIHJhbmRvbVN0cmluZyA9IGZ1bmN0aW9uIHJhbmRvbVN0cmluZygpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KS5zcGxpdCgnJykuam9pbignLicpO1xufTtcblxudmFyIEFjdGlvblR5cGVzID0ge1xuICBJTklUOiBcIkBAcmVkdXgvSU5JVFwiICsgcmFuZG9tU3RyaW5nKCksXG4gIFJFUExBQ0U6IFwiQEByZWR1eC9SRVBMQUNFXCIgKyByYW5kb21TdHJpbmcoKSxcbiAgUFJPQkVfVU5LTk9XTl9BQ1RJT046IGZ1bmN0aW9uIFBST0JFX1VOS05PV05fQUNUSU9OKCkge1xuICAgIHJldHVybiBcIkBAcmVkdXgvUFJPQkVfVU5LTk9XTl9BQ1RJT05cIiArIHJhbmRvbVN0cmluZygpO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7YW55fSBvYmogVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGFyZ3VtZW50IGFwcGVhcnMgdG8gYmUgYSBwbGFpbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgdmFyIHByb3RvID0gb2JqO1xuXG4gIHdoaWxlIChPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pICE9PSBudWxsKSB7XG4gICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAqIFRoZSBvbmx5IHdheSB0byBjaGFuZ2UgdGhlIGRhdGEgaW4gdGhlIHN0b3JlIGlzIHRvIGNhbGwgYGRpc3BhdGNoKClgIG9uIGl0LlxuICpcbiAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAqIHBhcnRzIG9mIHRoZSBzdGF0ZSB0cmVlIHJlc3BvbmQgdG8gYWN0aW9ucywgeW91IG1heSBjb21iaW5lIHNldmVyYWwgcmVkdWNlcnNcbiAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWR1Y2VyIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuZXh0IHN0YXRlIHRyZWUsIGdpdmVuXG4gKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAqXG4gKiBAcGFyYW0ge2FueX0gW3ByZWxvYWRlZFN0YXRlXSBUaGUgaW5pdGlhbCBzdGF0ZS4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICogSWYgeW91IHVzZSBgY29tYmluZVJlZHVjZXJzYCB0byBwcm9kdWNlIHRoZSByb290IHJlZHVjZXIgZnVuY3Rpb24sIHRoaXMgbXVzdCBiZVxuICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZW5oYW5jZXJdIFRoZSBzdG9yZSBlbmhhbmNlci4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAqIGlzIGBhcHBseU1pZGRsZXdhcmUoKWAuXG4gKlxuICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAqIGFuZCBzdWJzY3JpYmUgdG8gY2hhbmdlcy5cbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbmhhbmNlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgYXJndW1lbnRzWzNdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJdCBsb29rcyBsaWtlIHlvdSBhcmUgcGFzc2luZyBzZXZlcmFsIHN0b3JlIGVuaGFuY2VycyB0byAnICsgJ2NyZWF0ZVN0b3JlKCkuIFRoaXMgaXMgbm90IHN1cHBvcnRlZC4gSW5zdGVhZCwgY29tcG9zZSB0aGVtICcgKyAndG9nZXRoZXIgdG8gYSBzaW5nbGUgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogUmVhZHMgdGhlIHN0YXRlIHRyZWUgbWFuYWdlZCBieSB0aGUgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICovXG5cblxuICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbWF5IG5vdCBjYWxsIHN0b3JlLmdldFN0YXRlKCkgd2hpbGUgdGhlIHJlZHVjZXIgaXMgZXhlY3V0aW5nLiAnICsgJ1RoZSByZWR1Y2VyIGhhcyBhbHJlYWR5IHJlY2VpdmVkIHRoZSBzdGF0ZSBhcyBhbiBhcmd1bWVudC4gJyArICdQYXNzIGl0IGRvd24gZnJvbSB0aGUgdG9wIHJlZHVjZXIgaW5zdGVhZCBvZiByZWFkaW5nIGl0IGZyb20gdGhlIHN0b3JlLicpO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGFuZ2UgbGlzdGVuZXIuIEl0IHdpbGwgYmUgY2FsbGVkIGFueSB0aW1lIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLFxuICAgKiBhbmQgc29tZSBwYXJ0IG9mIHRoZSBzdGF0ZSB0cmVlIG1heSBwb3RlbnRpYWxseSBoYXZlIGNoYW5nZWQuIFlvdSBtYXkgdGhlblxuICAgKiBjYWxsIGBnZXRTdGF0ZSgpYCB0byByZWFkIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgaW5zaWRlIHRoZSBjYWxsYmFjay5cbiAgICpcbiAgICogWW91IG1heSBjYWxsIGBkaXNwYXRjaCgpYCBmcm9tIGEgY2hhbmdlIGxpc3RlbmVyLCB3aXRoIHRoZSBmb2xsb3dpbmdcbiAgICogY2F2ZWF0czpcbiAgICpcbiAgICogMS4gVGhlIHN1YnNjcmlwdGlvbnMgYXJlIHNuYXBzaG90dGVkIGp1c3QgYmVmb3JlIGV2ZXJ5IGBkaXNwYXRjaCgpYCBjYWxsLlxuICAgKiBJZiB5b3Ugc3Vic2NyaWJlIG9yIHVuc3Vic2NyaWJlIHdoaWxlIHRoZSBsaXN0ZW5lcnMgYXJlIGJlaW5nIGludm9rZWQsIHRoaXNcbiAgICogd2lsbCBub3QgaGF2ZSBhbnkgZWZmZWN0IG9uIHRoZSBgZGlzcGF0Y2goKWAgdGhhdCBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MuXG4gICAqIEhvd2V2ZXIsIHRoZSBuZXh0IGBkaXNwYXRjaCgpYCBjYWxsLCB3aGV0aGVyIG5lc3RlZCBvciBub3QsIHdpbGwgdXNlIGEgbW9yZVxuICAgKiByZWNlbnQgc25hcHNob3Qgb2YgdGhlIHN1YnNjcmlwdGlvbiBsaXN0LlxuICAgKlxuICAgKiAyLiBUaGUgbGlzdGVuZXIgc2hvdWxkIG5vdCBleHBlY3QgdG8gc2VlIGFsbCBzdGF0ZSBjaGFuZ2VzLCBhcyB0aGUgc3RhdGVcbiAgICogbWlnaHQgaGF2ZSBiZWVuIHVwZGF0ZWQgbXVsdGlwbGUgdGltZXMgZHVyaW5nIGEgbmVzdGVkIGBkaXNwYXRjaCgpYCBiZWZvcmVcbiAgICogdGhlIGxpc3RlbmVyIGlzIGNhbGxlZC4gSXQgaXMsIGhvd2V2ZXIsIGd1YXJhbnRlZWQgdGhhdCBhbGwgc3Vic2NyaWJlcnNcbiAgICogcmVnaXN0ZXJlZCBiZWZvcmUgdGhlIGBkaXNwYXRjaCgpYCBzdGFydGVkIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGxhdGVzdFxuICAgKiBzdGF0ZSBieSB0aGUgdGltZSBpdCBleGl0cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgQSBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGV2ZXJ5IGRpc3BhdGNoLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoaXMgY2hhbmdlIGxpc3RlbmVyLlxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBub3QgY2FsbCBzdG9yZS5zdWJzY3JpYmUoKSB3aGlsZSB0aGUgcmVkdWNlciBpcyBleGVjdXRpbmcuICcgKyAnSWYgeW91IHdvdWxkIGxpa2UgdG8gYmUgbm90aWZpZWQgYWZ0ZXIgdGhlIHN0b3JlIGhhcyBiZWVuIHVwZGF0ZWQsIHN1YnNjcmliZSBmcm9tIGEgJyArICdjb21wb25lbnQgYW5kIGludm9rZSBzdG9yZS5nZXRTdGF0ZSgpIGluIHRoZSBjYWxsYmFjayB0byBhY2Nlc3MgdGhlIGxhdGVzdCBzdGF0ZS4gJyArICdTZWUgaHR0cHM6Ly9yZWR1eC5qcy5vcmcvYXBpLXJlZmVyZW5jZS9zdG9yZSNzdWJzY3JpYmUobGlzdGVuZXIpIGZvciBtb3JlIGRldGFpbHMuJyk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG4gICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgIG5leHRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgbm90IHVuc3Vic2NyaWJlIGZyb20gYSBzdG9yZSBsaXN0ZW5lciB3aGlsZSB0aGUgcmVkdWNlciBpcyBleGVjdXRpbmcuICcgKyAnU2VlIGh0dHBzOi8vcmVkdXguanMub3JnL2FwaS1yZWZlcmVuY2Uvc3RvcmUjc3Vic2NyaWJlKGxpc3RlbmVyKSBmb3IgbW9yZSBkZXRhaWxzLicpO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcbiAgICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfVxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24uIEl0IGlzIHRoZSBvbmx5IHdheSB0byB0cmlnZ2VyIGEgc3RhdGUgY2hhbmdlLlxuICAgKlxuICAgKiBUaGUgYHJlZHVjZXJgIGZ1bmN0aW9uLCB1c2VkIHRvIGNyZWF0ZSB0aGUgc3RvcmUsIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlXG4gICAqIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGdpdmVuIGBhY3Rpb25gLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGxcbiAgICogYmUgY29uc2lkZXJlZCB0aGUgKipuZXh0Kiogc3RhdGUgb2YgdGhlIHRyZWUsIGFuZCB0aGUgY2hhbmdlIGxpc3RlbmVyc1xuICAgKiB3aWxsIGJlIG5vdGlmaWVkLlxuICAgKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvbmx5IHN1cHBvcnRzIHBsYWluIG9iamVjdCBhY3Rpb25zLiBJZiB5b3Ugd2FudCB0b1xuICAgKiBkaXNwYXRjaCBhIFByb21pc2UsIGFuIE9ic2VydmFibGUsIGEgdGh1bmssIG9yIHNvbWV0aGluZyBlbHNlLCB5b3UgbmVlZCB0b1xuICAgKiB3cmFwIHlvdXIgc3RvcmUgY3JlYXRpbmcgZnVuY3Rpb24gaW50byB0aGUgY29ycmVzcG9uZGluZyBtaWRkbGV3YXJlLiBGb3JcbiAgICogZXhhbXBsZSwgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgYHJlZHV4LXRodW5rYCBwYWNrYWdlLiBFdmVuIHRoZVxuICAgKiBtaWRkbGV3YXJlIHdpbGwgZXZlbnR1YWxseSBkaXNwYXRjaCBwbGFpbiBvYmplY3QgYWN0aW9ucyB1c2luZyB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBBIHBsYWluIG9iamVjdCByZXByZXNlbnRpbmcg4oCcd2hhdCBjaGFuZ2Vk4oCdLiBJdCBpc1xuICAgKiBhIGdvb2QgaWRlYSB0byBrZWVwIGFjdGlvbnMgc2VyaWFsaXphYmxlIHNvIHlvdSBjYW4gcmVjb3JkIGFuZCByZXBsYXkgdXNlclxuICAgKiBzZXNzaW9ucywgb3IgdXNlIHRoZSB0aW1lIHRyYXZlbGxpbmcgYHJlZHV4LWRldnRvb2xzYC4gQW4gYWN0aW9uIG11c3QgaGF2ZVxuICAgKiBhIGB0eXBlYCBwcm9wZXJ0eSB3aGljaCBtYXkgbm90IGJlIGB1bmRlZmluZWRgLiBJdCBpcyBhIGdvb2QgaWRlYSB0byB1c2VcbiAgICogc3RyaW5nIGNvbnN0YW50cyBmb3IgYWN0aW9uIHR5cGVzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBGb3IgY29udmVuaWVuY2UsIHRoZSBzYW1lIGFjdGlvbiBvYmplY3QgeW91IGRpc3BhdGNoZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCwgaWYgeW91IHVzZSBhIGN1c3RvbSBtaWRkbGV3YXJlLCBpdCBtYXkgd3JhcCBgZGlzcGF0Y2goKWAgdG9cbiAgICogcmV0dXJuIHNvbWV0aGluZyBlbHNlIChmb3IgZXhhbXBsZSwgYSBQcm9taXNlIHlvdSBjYW4gYXdhaXQpLlxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghaXNQbGFpbk9iamVjdChhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgbGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWN0aW9uO1xuICB9XG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogQWN0aW9uVHlwZXMuUkVQTEFDRVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBJbnRlcm9wZXJhYmlsaXR5IHBvaW50IGZvciBvYnNlcnZhYmxlL3JlYWN0aXZlIGxpYnJhcmllcy5cbiAgICogQHJldHVybnMge29ic2VydmFibGV9IEEgbWluaW1hbCBvYnNlcnZhYmxlIG9mIHN0YXRlIGNoYW5nZXMuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIG9ic2VydmFibGUgcHJvcG9zYWw6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9ic2VydmFibGVcbiAgICovXG5cblxuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnIHx8IG9ic2VydmVyID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB1bnN1YnNjcmliZTogdW5zdWJzY3JpYmVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LCBfcmVmWyQkb2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBfcmVmO1xuICB9IC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuXG5cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLklOSVRcbiAgfSk7XG4gIHJldHVybiBfcmVmMiA9IHtcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuICB9LCBfcmVmMlskJG9ic2VydmFibGVdID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59XG5cbi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cblxuXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH0gY2F0Y2ggKGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHlcblxufVxuXG5mdW5jdGlvbiBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbikge1xuICB2YXIgYWN0aW9uVHlwZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZTtcbiAgdmFyIGFjdGlvbkRlc2NyaXB0aW9uID0gYWN0aW9uVHlwZSAmJiBcImFjdGlvbiBcXFwiXCIgKyBTdHJpbmcoYWN0aW9uVHlwZSkgKyBcIlxcXCJcIiB8fCAnYW4gYWN0aW9uJztcbiAgcmV0dXJuIFwiR2l2ZW4gXCIgKyBhY3Rpb25EZXNjcmlwdGlvbiArIFwiLCByZWR1Y2VyIFxcXCJcIiArIGtleSArIFwiXFxcIiByZXR1cm5lZCB1bmRlZmluZWQuIFwiICsgXCJUbyBpZ25vcmUgYW4gYWN0aW9uLCB5b3UgbXVzdCBleHBsaWNpdGx5IHJldHVybiB0aGUgcHJldmlvdXMgc3RhdGUuIFwiICsgXCJJZiB5b3Ugd2FudCB0aGlzIHJlZHVjZXIgdG8gaG9sZCBubyB2YWx1ZSwgeW91IGNhbiByZXR1cm4gbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC5cIjtcbn1cblxuZnVuY3Rpb24gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShpbnB1dFN0YXRlLCByZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgYXJndW1lbnROYW1lID0gYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBBY3Rpb25UeXBlcy5JTklUID8gJ3ByZWxvYWRlZFN0YXRlIGFyZ3VtZW50IHBhc3NlZCB0byBjcmVhdGVTdG9yZScgOiAncHJldmlvdXMgc3RhdGUgcmVjZWl2ZWQgYnkgdGhlIHJlZHVjZXInO1xuXG4gIGlmIChyZWR1Y2VyS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJ1N0b3JlIGRvZXMgbm90IGhhdmUgYSB2YWxpZCByZWR1Y2VyLiBNYWtlIHN1cmUgdGhlIGFyZ3VtZW50IHBhc3NlZCAnICsgJ3RvIGNvbWJpbmVSZWR1Y2VycyBpcyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSByZWR1Y2Vycy4nO1xuICB9XG5cbiAgaWYgKCFpc1BsYWluT2JqZWN0KGlucHV0U3RhdGUpKSB7XG4gICAgcmV0dXJuIFwiVGhlIFwiICsgYXJndW1lbnROYW1lICsgXCIgaGFzIHVuZXhwZWN0ZWQgdHlwZSBvZiBcXFwiXCIgKyB7fS50b1N0cmluZy5jYWxsKGlucHV0U3RhdGUpLm1hdGNoKC9cXHMoW2EtenxBLVpdKykvKVsxXSArIFwiXFxcIi4gRXhwZWN0ZWQgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBcIiArIChcImtleXM6IFxcXCJcIiArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgXCJcXFwiXCIpO1xuICB9XG5cbiAgdmFyIHVuZXhwZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMoaW5wdXRTdGF0ZSkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gIXJlZHVjZXJzLmhhc093blByb3BlcnR5KGtleSkgJiYgIXVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldO1xuICB9KTtcbiAgdW5leHBlY3RlZEtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdW5leHBlY3RlZEtleUNhY2hlW2tleV0gPSB0cnVlO1xuICB9KTtcbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gQWN0aW9uVHlwZXMuUkVQTEFDRSkgcmV0dXJuO1xuXG4gIGlmICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIFwiVW5leHBlY3RlZCBcIiArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgXCIgXCIgKyAoXCJcXFwiXCIgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArIFwiXFxcIiBmb3VuZCBpbiBcIiArIGFyZ3VtZW50TmFtZSArIFwiLiBcIikgKyBcIkV4cGVjdGVkIHRvIGZpbmQgb25lIG9mIHRoZSBrbm93biByZWR1Y2VyIGtleXMgaW5zdGVhZDogXCIgKyAoXCJcXFwiXCIgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArIFwiXFxcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC5cIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0UmVkdWNlclNoYXBlKHJlZHVjZXJzKSB7XG4gIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcmVkdWNlciA9IHJlZHVjZXJzW2tleV07XG4gICAgdmFyIGluaXRpYWxTdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7XG4gICAgICB0eXBlOiBBY3Rpb25UeXBlcy5JTklUXG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlZHVjZXIgXFxcIlwiICsga2V5ICsgXCJcXFwiIHJldHVybmVkIHVuZGVmaW5lZCBkdXJpbmcgaW5pdGlhbGl6YXRpb24uIFwiICsgXCJJZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZSByZWR1Y2VyIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgXCIgKyBcImV4cGxpY2l0bHkgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgXCIgKyBcIm5vdCBiZSB1bmRlZmluZWQuIElmIHlvdSBkb24ndCB3YW50IHRvIHNldCBhIHZhbHVlIGZvciB0aGlzIHJlZHVjZXIsIFwiICsgXCJ5b3UgY2FuIHVzZSBudWxsIGluc3RlYWQgb2YgdW5kZWZpbmVkLlwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlZHVjZXIodW5kZWZpbmVkLCB7XG4gICAgICB0eXBlOiBBY3Rpb25UeXBlcy5QUk9CRV9VTktOT1dOX0FDVElPTigpXG4gICAgfSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWR1Y2VyIFxcXCJcIiArIGtleSArIFwiXFxcIiByZXR1cm5lZCB1bmRlZmluZWQgd2hlbiBwcm9iZWQgd2l0aCBhIHJhbmRvbSB0eXBlLiBcIiArIChcIkRvbid0IHRyeSB0byBoYW5kbGUgXCIgKyBBY3Rpb25UeXBlcy5JTklUICsgXCIgb3Igb3RoZXIgYWN0aW9ucyBpbiBcXFwicmVkdXgvKlxcXCIgXCIpICsgXCJuYW1lc3BhY2UuIFRoZXkgYXJlIGNvbnNpZGVyZWQgcHJpdmF0ZS4gSW5zdGVhZCwgeW91IG11c3QgcmV0dXJuIHRoZSBcIiArIFwiY3VycmVudCBzdGF0ZSBmb3IgYW55IHVua25vd24gYWN0aW9ucywgdW5sZXNzIGl0IGlzIHVuZGVmaW5lZCwgXCIgKyBcImluIHdoaWNoIGNhc2UgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLCByZWdhcmRsZXNzIG9mIHRoZSBcIiArIFwiYWN0aW9uIHR5cGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSBub3QgYmUgdW5kZWZpbmVkLCBidXQgY2FuIGJlIG51bGwuXCIpO1xuICAgIH1cbiAgfSk7XG59XG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGRpZmZlcmVudCByZWR1Y2VyIGZ1bmN0aW9ucywgaW50byBhIHNpbmdsZVxuICogcmVkdWNlciBmdW5jdGlvbi4gSXQgd2lsbCBjYWxsIGV2ZXJ5IGNoaWxkIHJlZHVjZXIsIGFuZCBnYXRoZXIgdGhlaXIgcmVzdWx0c1xuICogaW50byBhIHNpbmdsZSBzdGF0ZSBvYmplY3QsIHdob3NlIGtleXMgY29ycmVzcG9uZCB0byB0aGUga2V5cyBvZiB0aGUgcGFzc2VkXG4gKiByZWR1Y2VyIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVkdWNlcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBjb3JyZXNwb25kIHRvIGRpZmZlcmVudFxuICogcmVkdWNlciBmdW5jdGlvbnMgdGhhdCBuZWVkIHRvIGJlIGNvbWJpbmVkIGludG8gb25lLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpblxuICogaXQgaXMgdG8gdXNlIEVTNiBgaW1wb3J0ICogYXMgcmVkdWNlcnNgIHN5bnRheC4gVGhlIHJlZHVjZXJzIG1heSBuZXZlciByZXR1cm5cbiAqIHVuZGVmaW5lZCBmb3IgYW55IGFjdGlvbi4gSW5zdGVhZCwgdGhleSBzaG91bGQgcmV0dXJuIHRoZWlyIGluaXRpYWwgc3RhdGVcbiAqIGlmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlbSB3YXMgdW5kZWZpbmVkLCBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgZm9yIGFueVxuICogdW5yZWNvZ25pemVkIGFjdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgcmVkdWNlciBmdW5jdGlvbiB0aGF0IGludm9rZXMgZXZlcnkgcmVkdWNlciBpbnNpZGUgdGhlXG4gKiBwYXNzZWQgb2JqZWN0LCBhbmQgYnVpbGRzIGEgc3RhdGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUuXG4gKi9cblxuXG5mdW5jdGlvbiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gcmVkdWNlcktleXNbaV07XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3YXJuaW5nKFwiTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFxcXCJcIiArIGtleSArIFwiXFxcIlwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZpbmFsUmVkdWNlcnNba2V5XSA9IHJlZHVjZXJzW2tleV07XG4gICAgfVxuICB9XG5cbiAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcbiAgdmFyIHVuZXhwZWN0ZWRLZXlDYWNoZTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHt9O1xuICB9XG5cbiAgdmFyIHNoYXBlQXNzZXJ0aW9uRXJyb3I7XG5cbiAgdHJ5IHtcbiAgICBhc3NlcnRSZWR1Y2VyU2hhcGUoZmluYWxSZWR1Y2Vycyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzaGFwZUFzc2VydGlvbkVycm9yID0gZTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBjb21iaW5hdGlvbihzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHtcbiAgICAgIHN0YXRlID0ge307XG4gICAgfVxuXG4gICAgaWYgKHNoYXBlQXNzZXJ0aW9uRXJyb3IpIHtcbiAgICAgIHRocm93IHNoYXBlQXNzZXJ0aW9uRXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB3YXJuaW5nTWVzc2FnZSA9IGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2Uoc3RhdGUsIGZpbmFsUmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKTtcblxuICAgICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICAgIHdhcm5pbmcod2FybmluZ01lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBoYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgdmFyIG5leHRTdGF0ZSA9IHt9O1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGZpbmFsUmVkdWNlcktleXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2tleSA9IGZpbmFsUmVkdWNlcktleXNbX2ldO1xuICAgICAgdmFyIHJlZHVjZXIgPSBmaW5hbFJlZHVjZXJzW19rZXldO1xuICAgICAgdmFyIHByZXZpb3VzU3RhdGVGb3JLZXkgPSBzdGF0ZVtfa2V5XTtcbiAgICAgIHZhciBuZXh0U3RhdGVGb3JLZXkgPSByZWR1Y2VyKHByZXZpb3VzU3RhdGVGb3JLZXksIGFjdGlvbik7XG5cbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2UoX2tleSwgYWN0aW9uKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG5cbiAgICAgIG5leHRTdGF0ZVtfa2V5XSA9IG5leHRTdGF0ZUZvcktleTtcbiAgICAgIGhhc0NoYW5nZWQgPSBoYXNDaGFuZ2VkIHx8IG5leHRTdGF0ZUZvcktleSAhPT0gcHJldmlvdXNTdGF0ZUZvcktleTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFzQ2hhbmdlZCA/IG5leHRTdGF0ZSA6IHN0YXRlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkaXNwYXRjaChhY3Rpb25DcmVhdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb24gY3JlYXRvcnMsIGludG8gYW4gb2JqZWN0IHdpdGggdGhlXG4gKiBzYW1lIGtleXMsIGJ1dCB3aXRoIGV2ZXJ5IGZ1bmN0aW9uIHdyYXBwZWQgaW50byBhIGBkaXNwYXRjaGAgY2FsbCBzbyB0aGV5XG4gKiBtYXkgYmUgaW52b2tlZCBkaXJlY3RseS4gVGhpcyBpcyBqdXN0IGEgY29udmVuaWVuY2UgbWV0aG9kLCBhcyB5b3UgY2FuIGNhbGxcbiAqIGBzdG9yZS5kaXNwYXRjaChNeUFjdGlvbkNyZWF0b3JzLmRvU29tZXRoaW5nKCkpYCB5b3Vyc2VsZiBqdXN0IGZpbmUuXG4gKlxuICogRm9yIGNvbnZlbmllbmNlLCB5b3UgY2FuIGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQsXG4gKiBhbmQgZ2V0IGEgZnVuY3Rpb24gaW4gcmV0dXJuLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBhY3Rpb25DcmVhdG9ycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb25cbiAqIGNyZWF0b3IgZnVuY3Rpb25zLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpbiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhc2BcbiAqIHN5bnRheC4gWW91IG1heSBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2ggVGhlIGBkaXNwYXRjaGAgZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHlvdXIgUmVkdXhcbiAqIHN0b3JlLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFRoZSBvYmplY3QgbWltaWNraW5nIHRoZSBvcmlnaW5hbCBvYmplY3QsIGJ1dCB3aXRoXG4gKiBldmVyeSBhY3Rpb24gY3JlYXRvciB3cmFwcGVkIGludG8gdGhlIGBkaXNwYXRjaGAgY2FsbC4gSWYgeW91IHBhc3NlZCBhXG4gKiBmdW5jdGlvbiBhcyBgYWN0aW9uQ3JlYXRvcnNgLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYWxzbyBiZSBhIHNpbmdsZVxuICogZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKSB7XG4gIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgIT09ICdvYmplY3QnIHx8IGFjdGlvbkNyZWF0b3JzID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiYmluZEFjdGlvbkNyZWF0b3JzIGV4cGVjdGVkIGFuIG9iamVjdCBvciBhIGZ1bmN0aW9uLCBpbnN0ZWFkIHJlY2VpdmVkIFwiICsgKGFjdGlvbkNyZWF0b3JzID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGFjdGlvbkNyZWF0b3JzKSArIFwiLiBcIiArIFwiRGlkIHlvdSB3cml0ZSBcXFwiaW1wb3J0IEFjdGlvbkNyZWF0b3JzIGZyb21cXFwiIGluc3RlYWQgb2YgXFxcImltcG9ydCAqIGFzIEFjdGlvbkNyZWF0b3JzIGZyb21cXFwiP1wiKTtcbiAgfVxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWN0aW9uQ3JlYXRvcnMpO1xuICB2YXIgYm91bmRBY3Rpb25DcmVhdG9ycyA9IHt9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIHZhciBhY3Rpb25DcmVhdG9yID0gYWN0aW9uQ3JlYXRvcnNba2V5XTtcblxuICAgIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYm91bmRBY3Rpb25DcmVhdG9yc1trZXldID0gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBib3VuZEFjdGlvbkNyZWF0b3JzO1xufVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBDb21wb3NlcyBzaW5nbGUtYXJndW1lbnQgZnVuY3Rpb25zIGZyb20gcmlnaHQgdG8gbGVmdC4gVGhlIHJpZ2h0bW9zdFxuICogZnVuY3Rpb24gY2FuIHRha2UgbXVsdGlwbGUgYXJndW1lbnRzIGFzIGl0IHByb3ZpZGVzIHRoZSBzaWduYXR1cmUgZm9yXG4gKiB0aGUgcmVzdWx0aW5nIGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jcyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gb2J0YWluZWQgYnkgY29tcG9zaW5nIHRoZSBhcmd1bWVudCBmdW5jdGlvbnNcbiAqIGZyb20gcmlnaHQgdG8gbGVmdC4gRm9yIGV4YW1wbGUsIGNvbXBvc2UoZiwgZywgaCkgaXMgaWRlbnRpY2FsIHRvIGRvaW5nXG4gKiAoLi4uYXJncykgPT4gZihnKGgoLi4uYXJncykpKS5cbiAqL1xuZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYShiLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0b3JlIGVuaGFuY2VyIHRoYXQgYXBwbGllcyBtaWRkbGV3YXJlIHRvIHRoZSBkaXNwYXRjaCBtZXRob2RcbiAqIG9mIHRoZSBSZWR1eCBzdG9yZS4gVGhpcyBpcyBoYW5keSBmb3IgYSB2YXJpZXR5IG9mIHRhc2tzLCBzdWNoIGFzIGV4cHJlc3NpbmdcbiAqIGFzeW5jaHJvbm91cyBhY3Rpb25zIGluIGEgY29uY2lzZSBtYW5uZXIsIG9yIGxvZ2dpbmcgZXZlcnkgYWN0aW9uIHBheWxvYWQuXG4gKlxuICogU2VlIGByZWR1eC10aHVua2AgcGFja2FnZSBhcyBhbiBleGFtcGxlIG9mIHRoZSBSZWR1eCBtaWRkbGV3YXJlLlxuICpcbiAqIEJlY2F1c2UgbWlkZGxld2FyZSBpcyBwb3RlbnRpYWxseSBhc3luY2hyb25vdXMsIHRoaXMgc2hvdWxkIGJlIHRoZSBmaXJzdFxuICogc3RvcmUgZW5oYW5jZXIgaW4gdGhlIGNvbXBvc2l0aW9uIGNoYWluLlxuICpcbiAqIE5vdGUgdGhhdCBlYWNoIG1pZGRsZXdhcmUgd2lsbCBiZSBnaXZlbiB0aGUgYGRpc3BhdGNoYCBhbmQgYGdldFN0YXRlYCBmdW5jdGlvbnNcbiAqIGFzIG5hbWVkIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBtaWRkbGV3YXJlcyBUaGUgbWlkZGxld2FyZSBjaGFpbiB0byBiZSBhcHBsaWVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHN0b3JlIGVuaGFuY2VyIGFwcGx5aW5nIHRoZSBtaWRkbGV3YXJlLlxuICovXG5cbmZ1bmN0aW9uIGFwcGx5TWlkZGxld2FyZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1pZGRsZXdhcmVzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIG1pZGRsZXdhcmVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChjcmVhdGVTdG9yZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RvcmUgPSBjcmVhdGVTdG9yZS5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyk7XG5cbiAgICAgIHZhciBfZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRGlzcGF0Y2hpbmcgd2hpbGUgY29uc3RydWN0aW5nIHlvdXIgbWlkZGxld2FyZSBpcyBub3QgYWxsb3dlZC4gXCIgKyBcIk90aGVyIG1pZGRsZXdhcmUgd291bGQgbm90IGJlIGFwcGxpZWQgdG8gdGhpcyBkaXNwYXRjaC5cIik7XG4gICAgICB9O1xuXG4gICAgICB2YXIgbWlkZGxld2FyZUFQSSA9IHtcbiAgICAgICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLFxuICAgICAgICBkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goKSB7XG4gICAgICAgICAgcmV0dXJuIF9kaXNwYXRjaC5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgY2hhaW4gPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmUobWlkZGxld2FyZUFQSSk7XG4gICAgICB9KTtcbiAgICAgIF9kaXNwYXRjaCA9IGNvbXBvc2UuYXBwbHkodm9pZCAwLCBjaGFpbikoc3RvcmUuZGlzcGF0Y2gpO1xuICAgICAgcmV0dXJuIF9vYmplY3RTcHJlYWQoe30sIHN0b3JlLCB7XG4gICAgICAgIGRpc3BhdGNoOiBfZGlzcGF0Y2hcbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG59XG5cbi8qXG4gKiBUaGlzIGlzIGEgZHVtbXkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGJlZW4gYWx0ZXJlZCBieSBtaW5pZmljYXRpb24uXG4gKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4gKi9cblxuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgd2FybmluZygnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIi4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIHNldHRpbmcgbW9kZSB0byBwcm9kdWN0aW9uIGluIHdlYnBhY2sgKGh0dHBzOi8vd2VicGFjay5qcy5vcmcvY29uY2VwdHMvbW9kZS8pICcgKyAndG8gZW5zdXJlIHlvdSBoYXZlIHRoZSBjb3JyZWN0IGNvZGUgZm9yIHlvdXIgcHJvZHVjdGlvbiBidWlsZC4nKTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlU3RvcmUsIGNvbWJpbmVSZWR1Y2VycywgYmluZEFjdGlvbkNyZWF0b3JzLCBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UsIEFjdGlvblR5cGVzIGFzIF9fRE9fTk9UX1VTRV9fQWN0aW9uVHlwZXMgfTtcbiIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmltcG9ydCBwb255ZmlsbCBmcm9tICcuL3BvbnlmaWxsLmpzJztcblxudmFyIHJvb3Q7XG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9IHBvbnlmaWxsKHJvb3QpO1xuZXhwb3J0IGRlZmF1bHQgcmVzdWx0O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRTeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcblx0aWYgKCFvcmlnaW5hbE1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEBlbmhhbmNlYWJsZVxuICogQHN1cHByZXNzIHttZXNzYWdlQ29udmVudGlvbnN9IEpTIENvbXBpbGVyIHJlcG9ydHMgYW4gZXJyb3IgaWYgYSB2YXJpYWJsZSBvclxuICogICAgIGZpZWxkIHN0YXJ0cyB3aXRoICdNU0dfJyBhbmQgaXNuJ3QgYSB0cmFuc2xhdGFibGUgbWVzc2FnZS5cbiAqIEBwdWJsaWNcbiAqL1xuLy8gR0VORVJBVEVEIENPREUgLS0gRE8gTk9UIEVESVQhXG5cbnZhciBqc3BiID0gcmVxdWlyZSgnZ29vZ2xlLXByb3RvYnVmJyk7XG52YXIgZ29vZyA9IGpzcGI7XG52YXIgZ2xvYmFsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZ29vZy5leHBvcnRTeW1ib2woJ3Byb3RvLkFjdGlvbicsIG51bGwsIGdsb2JhbCk7XG5nb29nLmV4cG9ydFN5bWJvbCgncHJvdG8uU3RhdGUnLCBudWxsLCBnbG9iYWwpO1xuXG4vKipcbiAqIEdlbmVyYXRlZCBieSBKc1BiQ29kZUdlbmVyYXRvci5cbiAqIEBwYXJhbSB7QXJyYXk9fSBvcHRfZGF0YSBPcHRpb25hbCBpbml0aWFsIGRhdGEgYXJyYXksIHR5cGljYWxseSBmcm9tIGFcbiAqIHNlcnZlciByZXNwb25zZSwgb3IgY29uc3RydWN0ZWQgZGlyZWN0bHkgaW4gSmF2YXNjcmlwdC4gVGhlIGFycmF5IGlzIHVzZWRcbiAqIGluIHBsYWNlIGFuZCBiZWNvbWVzIHBhcnQgb2YgdGhlIGNvbnN0cnVjdGVkIG9iamVjdC4gSXQgaXMgbm90IGNsb25lZC5cbiAqIElmIG5vIGRhdGEgaXMgcHJvdmlkZWQsIHRoZSBjb25zdHJ1Y3RlZCBvYmplY3Qgd2lsbCBiZSBlbXB0eSwgYnV0IHN0aWxsXG4gKiB2YWxpZC5cbiAqIEBleHRlbmRzIHtqc3BiLk1lc3NhZ2V9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xucHJvdG8uU3RhdGUgPSBmdW5jdGlvbihvcHRfZGF0YSkge1xuICBqc3BiLk1lc3NhZ2UuaW5pdGlhbGl6ZSh0aGlzLCBvcHRfZGF0YSwgMCwgLTEsIHByb3RvLlN0YXRlLnJlcGVhdGVkRmllbGRzXywgbnVsbCk7XG59O1xuZ29vZy5pbmhlcml0cyhwcm90by5TdGF0ZSwganNwYi5NZXNzYWdlKTtcbmlmIChnb29nLkRFQlVHICYmICFDT01QSUxFRCkge1xuICBwcm90by5TdGF0ZS5kaXNwbGF5TmFtZSA9ICdwcm90by5TdGF0ZSc7XG59XG4vKipcbiAqIExpc3Qgb2YgcmVwZWF0ZWQgZmllbGRzIHdpdGhpbiB0aGlzIG1lc3NhZ2UgdHlwZS5cbiAqIEBwcml2YXRlIHshQXJyYXk8bnVtYmVyPn1cbiAqIEBjb25zdFxuICovXG5wcm90by5TdGF0ZS5yZXBlYXRlZEZpZWxkc18gPSBbMV07XG5cblxuXG5pZiAoanNwYi5NZXNzYWdlLkdFTkVSQVRFX1RPX09CSkVDVCkge1xuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHByb3RvIHN1aXRhYmxlIGZvciB1c2UgaW4gU295IHRlbXBsYXRlcy5cbiAqIEZpZWxkIG5hbWVzIHRoYXQgYXJlIHJlc2VydmVkIGluIEphdmFTY3JpcHQgYW5kIHdpbGwgYmUgcmVuYW1lZCB0byBwYl9uYW1lLlxuICogVG8gYWNjZXNzIGEgcmVzZXJ2ZWQgZmllbGQgdXNlLCBmb28ucGJfPG5hbWU+LCBlZywgZm9vLnBiX2RlZmF1bHQuXG4gKiBGb3IgdGhlIGxpc3Qgb2YgcmVzZXJ2ZWQgbmFtZXMgcGxlYXNlIHNlZTpcbiAqICAgICBjb20uZ29vZ2xlLmFwcHMuanNwYi5Kc0NsYXNzVGVtcGxhdGUuSlNfUkVTRVJWRURfV09SRFMuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfaW5jbHVkZUluc3RhbmNlIFdoZXRoZXIgdG8gaW5jbHVkZSB0aGUgSlNQQiBpbnN0YW5jZVxuICogICAgIGZvciB0cmFuc2l0aW9uYWwgc295IHByb3RvIHN1cHBvcnQ6IGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKi9cbnByb3RvLlN0YXRlLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uKG9wdF9pbmNsdWRlSW5zdGFuY2UpIHtcbiAgcmV0dXJuIHByb3RvLlN0YXRlLnRvT2JqZWN0KG9wdF9pbmNsdWRlSW5zdGFuY2UsIHRoaXMpO1xufTtcblxuXG4vKipcbiAqIFN0YXRpYyB2ZXJzaW9uIG9mIHRoZSB7QHNlZSB0b09iamVjdH0gbWV0aG9kLlxuICogQHBhcmFtIHtib29sZWFufHVuZGVmaW5lZH0gaW5jbHVkZUluc3RhbmNlIFdoZXRoZXIgdG8gaW5jbHVkZSB0aGUgSlNQQlxuICogICAgIGluc3RhbmNlIGZvciB0cmFuc2l0aW9uYWwgc295IHByb3RvIHN1cHBvcnQ6XG4gKiAgICAgaHR0cDovL2dvdG8vc295LXBhcmFtLW1pZ3JhdGlvblxuICogQHBhcmFtIHshcHJvdG8uU3RhdGV9IG1zZyBUaGUgbXNnIGluc3RhbmNlIHRvIHRyYW5zZm9ybS5cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKiBAc3VwcHJlc3Mge3VudXNlZExvY2FsVmFyaWFibGVzfSBmIGlzIG9ubHkgdXNlZCBmb3IgbmVzdGVkIG1lc3NhZ2VzXG4gKi9cbnByb3RvLlN0YXRlLnRvT2JqZWN0ID0gZnVuY3Rpb24oaW5jbHVkZUluc3RhbmNlLCBtc2cpIHtcbiAgdmFyIGYsIG9iaiA9IHtcbiAgICBtZXNzYWdlc0xpc3Q6IGpzcGIuTWVzc2FnZS5nZXRSZXBlYXRlZEZpZWxkKG1zZywgMSlcbiAgfTtcblxuICBpZiAoaW5jbHVkZUluc3RhbmNlKSB7XG4gICAgb2JqLiRqc3BiTWVzc2FnZUluc3RhbmNlID0gbXNnO1xuICB9XG4gIHJldHVybiBvYmo7XG59O1xufVxuXG5cbi8qKlxuICogRGVzZXJpYWxpemVzIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlIGZvcm1hdCkuXG4gKiBAcGFyYW0ge2pzcGIuQnl0ZVNvdXJjZX0gYnl0ZXMgVGhlIGJ5dGVzIHRvIGRlc2VyaWFsaXplLlxuICogQHJldHVybiB7IXByb3RvLlN0YXRlfVxuICovXG5wcm90by5TdGF0ZS5kZXNlcmlhbGl6ZUJpbmFyeSA9IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gIHZhciByZWFkZXIgPSBuZXcganNwYi5CaW5hcnlSZWFkZXIoYnl0ZXMpO1xuICB2YXIgbXNnID0gbmV3IHByb3RvLlN0YXRlO1xuICByZXR1cm4gcHJvdG8uU3RhdGUuZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyKG1zZywgcmVhZGVyKTtcbn07XG5cblxuLyoqXG4gKiBEZXNlcmlhbGl6ZXMgYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KSBmcm9tIHRoZVxuICogZ2l2ZW4gcmVhZGVyIGludG8gdGhlIGdpdmVuIG1lc3NhZ2Ugb2JqZWN0LlxuICogQHBhcmFtIHshcHJvdG8uU3RhdGV9IG1zZyBUaGUgbWVzc2FnZSBvYmplY3QgdG8gZGVzZXJpYWxpemUgaW50by5cbiAqIEBwYXJhbSB7IWpzcGIuQmluYXJ5UmVhZGVyfSByZWFkZXIgVGhlIEJpbmFyeVJlYWRlciB0byB1c2UuXG4gKiBAcmV0dXJuIHshcHJvdG8uU3RhdGV9XG4gKi9cbnByb3RvLlN0YXRlLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlciA9IGZ1bmN0aW9uKG1zZywgcmVhZGVyKSB7XG4gIHdoaWxlIChyZWFkZXIubmV4dEZpZWxkKCkpIHtcbiAgICBpZiAocmVhZGVyLmlzRW5kR3JvdXAoKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBmaWVsZCA9IHJlYWRlci5nZXRGaWVsZE51bWJlcigpO1xuICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICBjYXNlIDE6XG4gICAgICB2YXIgdmFsdWUgPSAvKiogQHR5cGUge3N0cmluZ30gKi8gKHJlYWRlci5yZWFkU3RyaW5nKCkpO1xuICAgICAgbXNnLmFkZE1lc3NhZ2VzKHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZWFkZXIuc2tpcEZpZWxkKCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1zZztcbn07XG5cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlIGZvcm1hdCkuXG4gKiBAcmV0dXJuIHshVWludDhBcnJheX1cbiAqL1xucHJvdG8uU3RhdGUucHJvdG90eXBlLnNlcmlhbGl6ZUJpbmFyeSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgd3JpdGVyID0gbmV3IGpzcGIuQmluYXJ5V3JpdGVyKCk7XG4gIHByb3RvLlN0YXRlLnNlcmlhbGl6ZUJpbmFyeVRvV3JpdGVyKHRoaXMsIHdyaXRlcik7XG4gIHJldHVybiB3cml0ZXIuZ2V0UmVzdWx0QnVmZmVyKCk7XG59O1xuXG5cbi8qKlxuICogU2VyaWFsaXplcyB0aGUgZ2l2ZW4gbWVzc2FnZSB0byBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZVxuICogZm9ybWF0KSwgd3JpdGluZyB0byB0aGUgZ2l2ZW4gQmluYXJ5V3JpdGVyLlxuICogQHBhcmFtIHshcHJvdG8uU3RhdGV9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7IWpzcGIuQmluYXJ5V3JpdGVyfSB3cml0ZXJcbiAqIEBzdXBwcmVzcyB7dW51c2VkTG9jYWxWYXJpYWJsZXN9IGYgaXMgb25seSB1c2VkIGZvciBuZXN0ZWQgbWVzc2FnZXNcbiAqL1xucHJvdG8uU3RhdGUuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIgPSBmdW5jdGlvbihtZXNzYWdlLCB3cml0ZXIpIHtcbiAgdmFyIGYgPSB1bmRlZmluZWQ7XG4gIGYgPSBtZXNzYWdlLmdldE1lc3NhZ2VzTGlzdCgpO1xuICBpZiAoZi5sZW5ndGggPiAwKSB7XG4gICAgd3JpdGVyLndyaXRlUmVwZWF0ZWRTdHJpbmcoXG4gICAgICAxLFxuICAgICAgZlxuICAgICk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiByZXBlYXRlZCBzdHJpbmcgbWVzc2FnZXMgPSAxO1xuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbnByb3RvLlN0YXRlLnByb3RvdHlwZS5nZXRNZXNzYWdlc0xpc3QgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIC8qKiBAdHlwZSB7IUFycmF5PHN0cmluZz59ICovIChqc3BiLk1lc3NhZ2UuZ2V0UmVwZWF0ZWRGaWVsZCh0aGlzLCAxKSk7XG59O1xuXG5cbi8qKiBAcGFyYW0geyFBcnJheTxzdHJpbmc+fSB2YWx1ZSAqL1xucHJvdG8uU3RhdGUucHJvdG90eXBlLnNldE1lc3NhZ2VzTGlzdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGpzcGIuTWVzc2FnZS5zZXRGaWVsZCh0aGlzLCAxLCB2YWx1ZSB8fCBbXSk7XG59O1xuXG5cbi8qKlxuICogQHBhcmFtIHshc3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXI9fSBvcHRfaW5kZXhcbiAqL1xucHJvdG8uU3RhdGUucHJvdG90eXBlLmFkZE1lc3NhZ2VzID0gZnVuY3Rpb24odmFsdWUsIG9wdF9pbmRleCkge1xuICBqc3BiLk1lc3NhZ2UuYWRkVG9SZXBlYXRlZEZpZWxkKHRoaXMsIDEsIHZhbHVlLCBvcHRfaW5kZXgpO1xufTtcblxuXG5wcm90by5TdGF0ZS5wcm90b3R5cGUuY2xlYXJNZXNzYWdlc0xpc3QgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRNZXNzYWdlc0xpc3QoW10pO1xufTtcblxuXG5cbi8qKlxuICogR2VuZXJhdGVkIGJ5IEpzUGJDb2RlR2VuZXJhdG9yLlxuICogQHBhcmFtIHtBcnJheT19IG9wdF9kYXRhIE9wdGlvbmFsIGluaXRpYWwgZGF0YSBhcnJheSwgdHlwaWNhbGx5IGZyb20gYVxuICogc2VydmVyIHJlc3BvbnNlLCBvciBjb25zdHJ1Y3RlZCBkaXJlY3RseSBpbiBKYXZhc2NyaXB0LiBUaGUgYXJyYXkgaXMgdXNlZFxuICogaW4gcGxhY2UgYW5kIGJlY29tZXMgcGFydCBvZiB0aGUgY29uc3RydWN0ZWQgb2JqZWN0LiBJdCBpcyBub3QgY2xvbmVkLlxuICogSWYgbm8gZGF0YSBpcyBwcm92aWRlZCwgdGhlIGNvbnN0cnVjdGVkIG9iamVjdCB3aWxsIGJlIGVtcHR5LCBidXQgc3RpbGxcbiAqIHZhbGlkLlxuICogQGV4dGVuZHMge2pzcGIuTWVzc2FnZX1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5wcm90by5BY3Rpb24gPSBmdW5jdGlvbihvcHRfZGF0YSkge1xuICBqc3BiLk1lc3NhZ2UuaW5pdGlhbGl6ZSh0aGlzLCBvcHRfZGF0YSwgMCwgLTEsIG51bGwsIHByb3RvLkFjdGlvbi5vbmVvZkdyb3Vwc18pO1xufTtcbmdvb2cuaW5oZXJpdHMocHJvdG8uQWN0aW9uLCBqc3BiLk1lc3NhZ2UpO1xuaWYgKGdvb2cuREVCVUcgJiYgIUNPTVBJTEVEKSB7XG4gIHByb3RvLkFjdGlvbi5kaXNwbGF5TmFtZSA9ICdwcm90by5BY3Rpb24nO1xufVxuLyoqXG4gKiBPbmVvZiBncm91cCBkZWZpbml0aW9ucyBmb3IgdGhpcyBtZXNzYWdlLiBFYWNoIGdyb3VwIGRlZmluZXMgdGhlIGZpZWxkXG4gKiBudW1iZXJzIGJlbG9uZ2luZyB0byB0aGF0IGdyb3VwLiBXaGVuIG9mIHRoZXNlIGZpZWxkcycgdmFsdWUgaXMgc2V0LCBhbGxcbiAqIG90aGVyIGZpZWxkcyBpbiB0aGUgZ3JvdXAgYXJlIGNsZWFyZWQuIER1cmluZyBkZXNlcmlhbGl6YXRpb24sIGlmIG11bHRpcGxlXG4gKiBmaWVsZHMgYXJlIGVuY291bnRlcmVkIGZvciBhIGdyb3VwLCBvbmx5IHRoZSBsYXN0IHZhbHVlIHNlZW4gd2lsbCBiZSBrZXB0LlxuICogQHByaXZhdGUgeyFBcnJheTwhQXJyYXk8bnVtYmVyPj59XG4gKiBAY29uc3RcbiAqL1xucHJvdG8uQWN0aW9uLm9uZW9mR3JvdXBzXyA9IFtbMV1dO1xuXG4vKipcbiAqIEBlbnVtIHtudW1iZXJ9XG4gKi9cbnByb3RvLkFjdGlvbi5UeXBlQ2FzZSA9IHtcbiAgVFlQRV9OT1RfU0VUOiAwLFxuICBTRU5EX01FU1NBR0U6IDFcbn07XG5cbi8qKlxuICogQHJldHVybiB7cHJvdG8uQWN0aW9uLlR5cGVDYXNlfVxuICovXG5wcm90by5BY3Rpb24ucHJvdG90eXBlLmdldFR5cGVDYXNlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAvKiogQHR5cGUge3Byb3RvLkFjdGlvbi5UeXBlQ2FzZX0gKi8oanNwYi5NZXNzYWdlLmNvbXB1dGVPbmVvZkNhc2UodGhpcywgcHJvdG8uQWN0aW9uLm9uZW9mR3JvdXBzX1swXSkpO1xufTtcblxuXG5cbmlmIChqc3BiLk1lc3NhZ2UuR0VORVJBVEVfVE9fT0JKRUNUKSB7XG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgcHJvdG8gc3VpdGFibGUgZm9yIHVzZSBpbiBTb3kgdGVtcGxhdGVzLlxuICogRmllbGQgbmFtZXMgdGhhdCBhcmUgcmVzZXJ2ZWQgaW4gSmF2YVNjcmlwdCBhbmQgd2lsbCBiZSByZW5hbWVkIHRvIHBiX25hbWUuXG4gKiBUbyBhY2Nlc3MgYSByZXNlcnZlZCBmaWVsZCB1c2UsIGZvby5wYl88bmFtZT4sIGVnLCBmb28ucGJfZGVmYXVsdC5cbiAqIEZvciB0aGUgbGlzdCBvZiByZXNlcnZlZCBuYW1lcyBwbGVhc2Ugc2VlOlxuICogICAgIGNvbS5nb29nbGUuYXBwcy5qc3BiLkpzQ2xhc3NUZW1wbGF0ZS5KU19SRVNFUlZFRF9XT1JEUy5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9pbmNsdWRlSW5zdGFuY2UgV2hldGhlciB0byBpbmNsdWRlIHRoZSBKU1BCIGluc3RhbmNlXG4gKiAgICAgZm9yIHRyYW5zaXRpb25hbCBzb3kgcHJvdG8gc3VwcG9ydDogaHR0cDovL2dvdG8vc295LXBhcmFtLW1pZ3JhdGlvblxuICogQHJldHVybiB7IU9iamVjdH1cbiAqL1xucHJvdG8uQWN0aW9uLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uKG9wdF9pbmNsdWRlSW5zdGFuY2UpIHtcbiAgcmV0dXJuIHByb3RvLkFjdGlvbi50b09iamVjdChvcHRfaW5jbHVkZUluc3RhbmNlLCB0aGlzKTtcbn07XG5cblxuLyoqXG4gKiBTdGF0aWMgdmVyc2lvbiBvZiB0aGUge0BzZWUgdG9PYmplY3R9IG1ldGhvZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IGluY2x1ZGVJbnN0YW5jZSBXaGV0aGVyIHRvIGluY2x1ZGUgdGhlIEpTUEJcbiAqICAgICBpbnN0YW5jZSBmb3IgdHJhbnNpdGlvbmFsIHNveSBwcm90byBzdXBwb3J0OlxuICogICAgIGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEBwYXJhbSB7IXByb3RvLkFjdGlvbn0gbXNnIFRoZSBtc2cgaW5zdGFuY2UgdG8gdHJhbnNmb3JtLlxuICogQHJldHVybiB7IU9iamVjdH1cbiAqIEBzdXBwcmVzcyB7dW51c2VkTG9jYWxWYXJpYWJsZXN9IGYgaXMgb25seSB1c2VkIGZvciBuZXN0ZWQgbWVzc2FnZXNcbiAqL1xucHJvdG8uQWN0aW9uLnRvT2JqZWN0ID0gZnVuY3Rpb24oaW5jbHVkZUluc3RhbmNlLCBtc2cpIHtcbiAgdmFyIGYsIG9iaiA9IHtcbiAgICBzZW5kTWVzc2FnZToganNwYi5NZXNzYWdlLmdldEZpZWxkV2l0aERlZmF1bHQobXNnLCAxLCBcIlwiKVxuICB9O1xuXG4gIGlmIChpbmNsdWRlSW5zdGFuY2UpIHtcbiAgICBvYmouJGpzcGJNZXNzYWdlSW5zdGFuY2UgPSBtc2c7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG59XG5cblxuLyoqXG4gKiBEZXNlcmlhbGl6ZXMgYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KS5cbiAqIEBwYXJhbSB7anNwYi5CeXRlU291cmNlfSBieXRlcyBUaGUgYnl0ZXMgdG8gZGVzZXJpYWxpemUuXG4gKiBAcmV0dXJuIHshcHJvdG8uQWN0aW9ufVxuICovXG5wcm90by5BY3Rpb24uZGVzZXJpYWxpemVCaW5hcnkgPSBmdW5jdGlvbihieXRlcykge1xuICB2YXIgcmVhZGVyID0gbmV3IGpzcGIuQmluYXJ5UmVhZGVyKGJ5dGVzKTtcbiAgdmFyIG1zZyA9IG5ldyBwcm90by5BY3Rpb247XG4gIHJldHVybiBwcm90by5BY3Rpb24uZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyKG1zZywgcmVhZGVyKTtcbn07XG5cblxuLyoqXG4gKiBEZXNlcmlhbGl6ZXMgYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KSBmcm9tIHRoZVxuICogZ2l2ZW4gcmVhZGVyIGludG8gdGhlIGdpdmVuIG1lc3NhZ2Ugb2JqZWN0LlxuICogQHBhcmFtIHshcHJvdG8uQWN0aW9ufSBtc2cgVGhlIG1lc3NhZ2Ugb2JqZWN0IHRvIGRlc2VyaWFsaXplIGludG8uXG4gKiBAcGFyYW0geyFqc3BiLkJpbmFyeVJlYWRlcn0gcmVhZGVyIFRoZSBCaW5hcnlSZWFkZXIgdG8gdXNlLlxuICogQHJldHVybiB7IXByb3RvLkFjdGlvbn1cbiAqL1xucHJvdG8uQWN0aW9uLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlciA9IGZ1bmN0aW9uKG1zZywgcmVhZGVyKSB7XG4gIHdoaWxlIChyZWFkZXIubmV4dEZpZWxkKCkpIHtcbiAgICBpZiAocmVhZGVyLmlzRW5kR3JvdXAoKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBmaWVsZCA9IHJlYWRlci5nZXRGaWVsZE51bWJlcigpO1xuICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICBjYXNlIDE6XG4gICAgICB2YXIgdmFsdWUgPSAvKiogQHR5cGUge3N0cmluZ30gKi8gKHJlYWRlci5yZWFkU3RyaW5nKCkpO1xuICAgICAgbXNnLnNldFNlbmRNZXNzYWdlKHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZWFkZXIuc2tpcEZpZWxkKCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1zZztcbn07XG5cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlIGZvcm1hdCkuXG4gKiBAcmV0dXJuIHshVWludDhBcnJheX1cbiAqL1xucHJvdG8uQWN0aW9uLnByb3RvdHlwZS5zZXJpYWxpemVCaW5hcnkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHdyaXRlciA9IG5ldyBqc3BiLkJpbmFyeVdyaXRlcigpO1xuICBwcm90by5BY3Rpb24uc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIodGhpcywgd3JpdGVyKTtcbiAgcmV0dXJuIHdyaXRlci5nZXRSZXN1bHRCdWZmZXIoKTtcbn07XG5cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBnaXZlbiBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlXG4gKiBmb3JtYXQpLCB3cml0aW5nIHRvIHRoZSBnaXZlbiBCaW5hcnlXcml0ZXIuXG4gKiBAcGFyYW0geyFwcm90by5BY3Rpb259IG1lc3NhZ2VcbiAqIEBwYXJhbSB7IWpzcGIuQmluYXJ5V3JpdGVyfSB3cml0ZXJcbiAqIEBzdXBwcmVzcyB7dW51c2VkTG9jYWxWYXJpYWJsZXN9IGYgaXMgb25seSB1c2VkIGZvciBuZXN0ZWQgbWVzc2FnZXNcbiAqL1xucHJvdG8uQWN0aW9uLnNlcmlhbGl6ZUJpbmFyeVRvV3JpdGVyID0gZnVuY3Rpb24obWVzc2FnZSwgd3JpdGVyKSB7XG4gIHZhciBmID0gdW5kZWZpbmVkO1xuICBmID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChqc3BiLk1lc3NhZ2UuZ2V0RmllbGQobWVzc2FnZSwgMSkpO1xuICBpZiAoZiAhPSBudWxsKSB7XG4gICAgd3JpdGVyLndyaXRlU3RyaW5nKFxuICAgICAgMSxcbiAgICAgIGZcbiAgICApO1xuICB9XG59O1xuXG5cbi8qKlxuICogb3B0aW9uYWwgc3RyaW5nIHNlbmRfbWVzc2FnZSA9IDE7XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnByb3RvLkFjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZE1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAoanNwYi5NZXNzYWdlLmdldEZpZWxkV2l0aERlZmF1bHQodGhpcywgMSwgXCJcIikpO1xufTtcblxuXG4vKiogQHBhcmFtIHtzdHJpbmd9IHZhbHVlICovXG5wcm90by5BY3Rpb24ucHJvdG90eXBlLnNldFNlbmRNZXNzYWdlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAganNwYi5NZXNzYWdlLnNldE9uZW9mRmllbGQodGhpcywgMSwgcHJvdG8uQWN0aW9uLm9uZW9mR3JvdXBzX1swXSwgdmFsdWUpO1xufTtcblxuXG5wcm90by5BY3Rpb24ucHJvdG90eXBlLmNsZWFyU2VuZE1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAganNwYi5NZXNzYWdlLnNldE9uZW9mRmllbGQodGhpcywgMSwgcHJvdG8uQWN0aW9uLm9uZW9mR3JvdXBzX1swXSwgdW5kZWZpbmVkKTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhpcyBmaWVsZCBpcyBzZXQuXG4gKiBAcmV0dXJuIHshYm9vbGVhbn1cbiAqL1xucHJvdG8uQWN0aW9uLnByb3RvdHlwZS5oYXNTZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ganNwYi5NZXNzYWdlLmdldEZpZWxkKHRoaXMsIDEpICE9IG51bGw7XG59O1xuXG5cbmdvb2cub2JqZWN0LmV4dGVuZChleHBvcnRzLCBwcm90byk7XG4iXSwic291cmNlUm9vdCI6IiJ9