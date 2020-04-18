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
})({"engine/math/vec2.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Vec2 =
/** @class */
function () {
  function Vec2(x, y) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    this.x = x;
    this.y = y;
  }

  Vec2.prototype[Symbol.iterator] = function () {
    var _this = this;

    var step = 0;
    return {
      next: function next() {
        return {
          value: _this[step++],
          done: step > 2
        };
      }
    };
  };

  Object.defineProperty(Vec2.prototype, "x", {
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vec2.prototype, "y", {
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vec2.prototype, "xy", {
    get: function get() {
      return [this.x, this.y];
    },
    set: function set(value) {
      this.x = value[0];
      this.y = value[1];
    },
    enumerable: true,
    configurable: true
  });

  Vec2.add = function (lhs, rhs) {
    return new Vec2(lhs.x + rhs.x, lhs.y + rhs.y);
  };

  Vec2.sub = function (lhs, rhs) {
    return new Vec2(lhs.x - rhs.x, lhs.y - rhs.y);
  };

  Vec2.mul = function (lhs, rhs) {
    return new Vec2(lhs.x * rhs.x, lhs.y * rhs.y);
  };

  Vec2.scale = function (lhs, rhs) {
    return new Vec2(lhs.x * rhs, lhs.y * rhs);
  };

  Vec2.div = function (lhs, rhs) {
    return new Vec2(lhs.x / rhs.x, lhs.y / rhs.y);
  };

  Vec2.negate = function (vec) {
    return new Vec2(-vec.x, -vec.y);
  };

  Vec2.normalise = function (vec) {
    var len = Vec2.len(vec);
    return new Vec2(vec.x / len, vec.y / len);
  };

  Vec2.len = function (vec) {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  };

  Vec2.distance = function (vec1, vec2) {
    return Vec2.sub(vec2, vec1).length();
  };

  Vec2.dot = function (lhs, rhs) {
    return lhs.x * rhs.x + lhs.y * rhs.y;
  };

  Vec2.pivot = function (vec, rot, point) {
    if (point === void 0) {
      point = {
        x: 0,
        y: 0
      };
    }

    var x = vec.x - point.x;
    var y = vec.y - point.y;
    return new Vec2(x * Math.cos(rot) - y * Math.sin(rot) + point.x, y * Math.cos(rot) + x * Math.sin(rot) + point.y);
  };

  Vec2.reflect = function (vec, normal) {
    var d = Vec2.dot(vec, normal);
    return new Vec2(vec.x - 2 * d * normal.x, vec.y - 2 * d * normal.y);
  };

  Vec2.prototype.add = function (rhs) {
    this.x += rhs.x;
    this.y += rhs.y;
    return this;
  };

  Vec2.prototype.sub = function (rhs) {
    this.x -= rhs.x;
    this.y -= rhs.y;
    return this;
  };

  Vec2.prototype.mul = function (rhs) {
    this.x *= rhs.x;
    this.y *= rhs.y;
    return this;
  };

  Vec2.prototype.div = function (rhs) {
    this.x /= rhs.x;
    this.y /= rhs.y;
    return this;
  };

  Vec2.prototype.scale = function (rhs) {
    this.x *= rhs;
    this.y * -rhs;
  };

  Vec2.prototype.negate = function () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  };

  Vec2.prototype.normalise = function () {
    var len = this.length();
    if (len === 0) return this;
    this.x /= len;
    this.y /= len;
    return this;
  };

  Vec2.prototype.length = function () {
    return Vec2.len(this);
  };

  Vec2.prototype.dot = function (rhs) {
    return Vec2.dot(this, rhs);
  };

  Vec2.prototype.pivot = function (rot, point) {
    if (point === void 0) {
      point = {
        x: 0,
        y: 0
      };
    }

    var x = this.x - point.x;
    var y = this.y - point.y;
    this.x = x * Math.cos(rot) - y * Math.sin(rot) + point.x;
    this.y = y * Math.cos(rot) + x * Math.sin(rot) + point.y;
    return this;
  }; // 90 degree rotation cw


  Vec2.perpendicular = function (vec) {
    return new Vec2(vec.y, -vec.x);
  };

  Vec2.ZERO = new Vec2(0, 0);
  return Vec2;
}();

exports.Vec2 = Vec2;
},{}],"engine/math/vec3.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Vec3 =
/** @class */
function () {
  function Vec3(x, y, z) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (z === void 0) {
      z = 0;
    }

    this.x = x;
    this.y = y;
    this.z = z;
  }

  Vec3.prototype[Symbol.iterator] = function () {
    var _this = this;

    var step = 0;
    return {
      next: function next() {
        return {
          value: _this[step++],
          done: step > 3
        };
      }
    };
  };

  Object.defineProperty(Vec3.prototype, "x", {
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vec3.prototype, "y", {
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vec3.prototype, "z", {
    get: function get() {
      return this[2];
    },
    set: function set(value) {
      this[2] = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vec3.prototype, "xyz", {
    get: function get() {
      return [this.x, this.y, this.z];
    },
    set: function set(value) {
      this.x = value[0];
      this.y = value[1];
      this.z = value[2];
    },
    enumerable: true,
    configurable: true
  });

  Vec3.add = function (lhs, rhs) {
    return new Vec3(lhs.x + rhs.x, lhs.y + rhs.y, lhs.z + rhs.z);
  };

  Vec3.sub = function (lhs, rhs) {
    return new Vec3(lhs.x - rhs.x, lhs.y - rhs.y, lhs.z - rhs.z);
  };

  Vec3.mul = function (lhs, rhs) {
    return new Vec3(lhs.x * rhs.x, lhs.y * rhs.y, lhs.z * rhs.z);
  };

  Vec3.div = function (lhs, rhs) {
    return new Vec3(lhs.x / rhs.x, lhs.y / rhs.y, lhs.z / rhs.z);
  };

  Vec3.normalise = function (vec) {
    var len = Vec3.len(vec);
    return new Vec3(vec.x / len, vec.y / len, vec.z / len);
  };

  Vec3.len = function (vec) {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
  };

  Vec3.dot = function (lhs, rhs) {
    return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
  };

  Vec3.prototype.add = function (rhs) {
    this.x += rhs.x;
    this.y += rhs.y;
    this.z += rhs.z;
    return this;
  };

  Vec3.prototype.sub = function (rhs) {
    this.x -= rhs.x;
    this.y -= rhs.y;
    this.z -= rhs.z;
    return this;
  };

  Vec3.prototype.mul = function (rhs) {
    this.x *= rhs.x;
    this.y *= rhs.y;
    this.z *= rhs.z;
    return this;
  };

  Vec3.prototype.div = function (rhs) {
    this.x /= rhs.x;
    this.y /= rhs.y;
    this.z /= rhs.z;
    return this;
  };

  Vec3.prototype.normalise = function () {
    var len = this.length();
    this.x /= len;
    this.y /= len;
    this.z /= len;
    return this;
  };

  Vec3.prototype.length = function () {
    return Vec3.len(this);
  };

  Vec3.prototype.dot = function (rhs) {
    return Vec3.dot(this, rhs);
  };

  return Vec3;
}();

exports.Vec3 = Vec3;
},{}],"engine/math/vec4.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Vec4 =
/** @class */
function () {
  function Vec4(x, y, z, w) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (z === void 0) {
      z = 0;
    }

    if (w === void 0) {
      w = 0;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  Vec4.prototype[Symbol.iterator] = function () {
    var _this = this;

    var step = 0;
    return {
      next: function next() {
        return {
          value: _this[step++],
          done: step > 4
        };
      }
    };
  };

  Object.defineProperty(Vec4.prototype, "x", {
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vec4.prototype, "y", {
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vec4.prototype, "z", {
    get: function get() {
      return this[2];
    },
    set: function set(value) {
      this[2] = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vec4.prototype, "w", {
    get: function get() {
      return this[3];
    },
    set: function set(value) {
      this[3] = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vec4.prototype, "xyzw", {
    get: function get() {
      return [this.x, this.y, this.z, this.w];
    },
    set: function set(value) {
      this.x = value[0];
      this.y = value[1];
      this.z = value[2];
      this.w = value[3];
    },
    enumerable: true,
    configurable: true
  });

  Vec4.add = function (lhs, rhs) {
    return new Vec4(lhs.x + rhs.x, lhs.y + rhs.y, lhs.z + rhs.z, lhs.w + rhs.w);
  };

  Vec4.sub = function (lhs, rhs) {
    return new Vec4(lhs.x - rhs.x, lhs.y - rhs.y, lhs.z - rhs.z, lhs.w - rhs.w);
  };

  Vec4.mul = function (lhs, rhs) {
    return new Vec4(lhs.x * rhs.x, lhs.y * rhs.y, lhs.z * rhs.z, lhs.w * rhs.w);
  };

  Vec4.div = function (lhs, rhs) {
    return new Vec4(lhs.x / rhs.x, lhs.y / rhs.y, lhs.z / rhs.z, lhs.w / rhs.w);
  };

  Vec4.normalise = function (vec) {
    var len = Vec4.len(vec);
    return new Vec4(vec.x / len, vec.y / len, vec.z / len, vec.w / len);
  };

  Vec4.len = function (vec) {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z + vec.w * vec.w);
  };

  Vec4.dot = function (lhs, rhs) {
    return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z + lhs.w * rhs.w;
  };

  Vec4.prototype.add = function (rhs) {
    this.x += rhs.x;
    this.y += rhs.y;
    this.z += rhs.z;
    this.w += rhs.w;
    return this;
  };

  Vec4.prototype.sub = function (rhs) {
    this.x -= rhs.x;
    this.y -= rhs.y;
    this.z -= rhs.z;
    this.w -= rhs.w;
    return this;
  };

  Vec4.prototype.mul = function (rhs) {
    this.x *= rhs.x;
    this.y *= rhs.y;
    this.z *= rhs.z;
    this.w *= rhs.w;
    return this;
  };

  Vec4.prototype.div = function (rhs) {
    this.x /= rhs.x;
    this.y /= rhs.y;
    this.z /= rhs.z;
    this.w /= rhs.w;
    return this;
  };

  Vec4.prototype.normalise = function () {
    var len = this.length();
    this.x /= len;
    this.y /= len;
    this.z /= len;
    this.w /= len;
    return this;
  };

  Vec4.prototype.length = function () {
    return Vec4.len(this);
  };

  Vec4.prototype.dot = function (rhs) {
    return Vec4.dot(this, rhs);
  };

  Vec4.ONE = new Vec4(1, 1, 1, 1);
  return Vec4;
}();

exports.Vec4 = Vec4;
},{}],"engine/math/mat3.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var vec2_1 = require("./vec2");

var vec3_1 = require("./vec3");

var Mat3 =
/** @class */
function () {
  function Mat3(mat3) {
    for (var i = 0; i < 9; i++) {
      this[i] = mat3[i];
    }

    this.mul = this.mul.bind(this);
  }

  Mat3.prototype[Symbol.iterator] = function () {
    var _this = this;

    var step = 0;
    return {
      next: function next() {
        return {
          value: _this[step++],
          done: step > 9
        };
      }
    };
  };

  Object.defineProperty(Mat3.prototype, "right", {
    get: function get() {
      return new vec2_1.Vec2(this[0], this[1]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Mat3.prototype, "up", {
    get: function get() {
      return new vec2_1.Vec2(this[4], this[5]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Mat3.prototype, "pos", {
    get: function get() {
      return new vec2_1.Vec2(this[6], this[7]);
    },
    enumerable: true,
    configurable: true
  });

  Mat3.row = function (mat, i) {
    var ri = i * 3;
    return new vec3_1.Vec3(mat[ri + 0], mat[ri + 1], mat[ri + 2]);
  };

  Mat3.col = function (mat, i) {
    return new vec3_1.Vec3(mat[i + 0], mat[i + 3], mat[i + 6]);
  };

  Mat3.translation = function (x, y) {
    return new Mat3([1, 0, 0, 0, 1, 0, x, y, 1]);
  };

  Mat3.rotation = function (rot) {
    var s = Math.sin(rot);
    var c = Math.cos(rot);
    return new Mat3([c, s, 0, -s, c, 0, 0, 0, 1]);
  };

  Mat3.scale = function (xs, ys) {
    var result = new Mat3([xs, 0, 0, 0, ys, 0, 0, 0, 1]);
    return result;
  };

  Mat3.mul = function (lhs, rhs) {
    return new Mat3([lhs[0] * rhs[0] + lhs[1] * rhs[3] + lhs[2] * rhs[6], lhs[0] * rhs[1] + lhs[1] * rhs[4] + lhs[2] * rhs[7], lhs[0] * rhs[2] + lhs[1] * rhs[5] + lhs[2] * rhs[8], lhs[3] * rhs[0] + lhs[4] * rhs[3] + lhs[5] * rhs[6], lhs[3] * rhs[1] + lhs[4] * rhs[4] + lhs[5] * rhs[7], lhs[3] * rhs[2] + lhs[4] * rhs[5] + lhs[5] * rhs[8], lhs[6] * rhs[0] + lhs[7] * rhs[3] + lhs[8] * rhs[6], lhs[6] * rhs[1] + lhs[7] * rhs[4] + lhs[8] * rhs[7], lhs[6] * rhs[2] + lhs[7] * rhs[5] + lhs[8] * rhs[8] // Vec3.dot(r3, c3)
    ]); // const r1 = Mat3.row(lhs, 0);
    // const r2 = Mat3.row(lhs, 1);
    // const r3 = Mat3.row(lhs, 2);
    // const c1 = Mat3.col(rhs, 0);
    // const c2 = Mat3.col(rhs, 1);
    // const c3 = Mat3.col(rhs, 2);
    // return new Mat3([
    //     Vec3.dot(r1, c1), Vec3.dot(r1,c2),  Vec3.dot(r1, c3),
    //     Vec3.dot(r2, c1), Vec3.dot(r2,c2),  Vec3.dot(r2, c3),
    //     Vec3.dot(r3, c1), Vec3.dot(r3,c2),  Vec3.dot(r3, c3)
    // ]);
  };

  Mat3.transformPoint = function (mat, point) {
    return {
      x: point.x * mat[0] + point.y * mat[3] + point.z * mat[6],
      y: point.x * mat[1] + point.y * mat[4] + point.z * mat[7],
      z: point.x * mat[2] + point.y * mat[5] + point.z * mat[8]
    }; // const c1 = Mat3.col(mat, 0);
    // const c2 = Mat3.col(mat, 1);
    // const c3 = Mat3.col(mat, 2);
    // return {
    //     x: Vec3.dot(point, c1 ),
    //     y: Vec3.dot(point, c2 ),
    //     z: Vec3.dot(point, c3 )
    // }
  };

  Mat3.prototype.mul = function (rhs) {
    var result = Mat3.mul(this, rhs);
    return result;
  };

  return Mat3;
}();

exports.Mat3 = Mat3;
},{"./vec2":"engine/math/vec2.ts","./vec3":"engine/math/vec3.ts"}],"engine/math/mat4.ts":[function(require,module,exports) {
"use strict";

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spread = this && this.__spread || function () {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var vec3_1 = require("./vec3");

var vec4_1 = require("./vec4");

var Mat4 =
/** @class */
function () {
  function Mat4(mat) {
    if (mat === void 0) {
      mat = Mat4.Identity;
    }

    for (var i = 0; i < 16; i++) {
      this[i] = mat[i];
    }
  }

  Mat4.prototype[Symbol.iterator] = function () {
    var _this = this;

    var step = 0;
    return {
      next: function next() {
        return {
          value: _this[step++],
          done: step > 16
        };
      }
    };
  };

  Object.defineProperty(Mat4.prototype, "right", {
    get: function get() {
      return new vec3_1.Vec3(this[0], this[1], this[2]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Mat4.prototype, "up", {
    get: function get() {
      return new vec3_1.Vec3(this[4], this[5], this[6]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Mat4.prototype, "forward", {
    get: function get() {
      return new vec3_1.Vec3(this[8], this[9], this[10]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Mat4.prototype, "pos", {
    get: function get() {
      return new vec3_1.Vec3(this[12], this[13], this[14]);
    },
    enumerable: true,
    configurable: true
  });

  Mat4.prototype.toArray = function () {
    return __spread(this);
  };

  Mat4.row = function (mat, i) {
    var ri = i * 4;
    return new vec4_1.Vec4(mat[ri + 0], mat[ri + 1], mat[ri + 2], mat[ri + 3]);
  };

  Mat4.col = function (mat, i) {
    return new vec4_1.Vec4(mat[i + 0], mat[i + 4], mat[i + 8], mat[i + 12]);
  };

  Mat4.translation = function (x, y, z) {
    return new Mat4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
  };

  Mat4.scale = function (xs, ys, zs) {
    return new Mat4([xs, 0, 0, 0, 0, ys, 0, 0, 0, 0, zs, 0, 0, 0, 0, 1]);
  };

  Mat4.orthographicProjection = function (left, right, bottom, top, near, far) {
    return new Mat4([2.0 / (right - left), 0.0, 0.0, 0.0, 0.0, 2.0 / (top - bottom), 0.0, 0.0, 0.0, 0.0, -2.0 / (far - near), 0.0, -((right + left) / (right - left)), -((top + bottom) / (top - bottom)), -((far + near) / (far - near)), 1.0]);
  };

  Mat4.mul = function (lhs, rhs) {
    var r1 = Mat4.row(lhs, 0);
    var r2 = Mat4.row(lhs, 1);
    var r3 = Mat4.row(lhs, 2);
    var r4 = Mat4.row(lhs, 3);
    var c1 = Mat4.col(rhs, 0);
    var c2 = Mat4.col(rhs, 1);
    var c3 = Mat4.col(rhs, 2);
    var c4 = Mat4.col(rhs, 3);
    return new Mat4([vec4_1.Vec4.dot(r1, c1), vec4_1.Vec4.dot(r1, c2), vec4_1.Vec4.dot(r1, c3), vec4_1.Vec4.dot(r1, c4), vec4_1.Vec4.dot(r2, c1), vec4_1.Vec4.dot(r2, c2), vec4_1.Vec4.dot(r2, c3), vec4_1.Vec4.dot(r2, c4), vec4_1.Vec4.dot(r3, c1), vec4_1.Vec4.dot(r3, c2), vec4_1.Vec4.dot(r3, c3), vec4_1.Vec4.dot(r3, c4), vec4_1.Vec4.dot(r4, c1), vec4_1.Vec4.dot(r4, c2), vec4_1.Vec4.dot(r4, c3), vec4_1.Vec4.dot(r4, c4)]);
  };

  Mat4.Identity = new Mat4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  return Mat4;
}();

exports.Mat4 = Mat4;
},{"./vec3":"engine/math/vec3.ts","./vec4":"engine/math/vec4.ts"}],"engine/math/rect.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var vec2_1 = require("./vec2");

var Rect =
/** @class */
function () {
  function Rect(x, y, w, h) {
    this.pos = new vec2_1.Vec2(x, y);
    this.size = new vec2_1.Vec2(w, h);
  }

  Object.defineProperty(Rect.prototype, "left", {
    get: function get() {
      return this.pos.x;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Rect.prototype, "right", {
    get: function get() {
      return this.pos.x + this.size.x;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Rect.prototype, "top", {
    get: function get() {
      return this.pos.y;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Rect.prototype, "bottom", {
    get: function get() {
      return this.pos.y + this.size.y;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Rect.prototype, "min", {
    get: function get() {
      return new vec2_1.Vec2(this.pos.x, this.pos.y);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Rect.prototype, "max", {
    get: function get() {
      return vec2_1.Vec2.add(this.pos, this.size);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Rect.prototype, "topLeft", {
    get: function get() {
      return {
        x: this.pos.x,
        y: this.pos.y
      };
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Rect.prototype, "topRight", {
    get: function get() {
      return {
        x: this.pos.x + this.size.x,
        y: this.pos.y
      };
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Rect.prototype, "bottomRight", {
    get: function get() {
      return {
        x: this.pos.x + this.size.x,
        y: this.pos.y + this.size.y
      };
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Rect.prototype, "bottomLeft", {
    get: function get() {
      return {
        x: this.pos.x,
        y: this.pos.y + this.size.y
      };
    },
    enumerable: true,
    configurable: true
  });

  Rect.prototype.contains = function (point) {
    return point.x >= this.left && point.x < this.right && point.y >= this.top && point.y < this.bottom;
  };

  return Rect;
}();

exports.Rect = Rect;
},{"./vec2":"engine/math/vec2.ts"}],"engine/math/ray.ts":[function(require,module,exports) {
"use strict";

var __values = this && this.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _1 = require(".");

var Ray =
/** @class */
function () {
  function Ray(pos, dir) {
    this.pos = new _1.Vec2();
    this.dir = new _1.Vec2();
    this.hit = null;
    this.pos.x = pos.x;
    this.pos.y = pos.y;
    this.dir.x = dir.x;
    this.dir.y = dir.y;
  }

  Ray.prototype.castToLine = function (x1, y1, x2, y2, createReflected) {
    // Line Intersection formula
    // https://en.wikipedia.org/wiki/Line-line_intersection
    if (createReflected === void 0) {
      createReflected = false;
    }

    this.hit = null;
    var x3 = this.pos.x;
    var y3 = this.pos.y;
    var x4 = this.pos.x + this.dir.x;
    var y4 = this.pos.y + this.dir.y;
    var den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) return false;
    var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den; // this means the lines are not intersecting, so return

    if (!(t >= 0 && t <= 1 && u >= 0)) {
      return false;
    }

    var point = new _1.Vec2(x1 + t * (x2 - x1), y1 + t * (y2 - y1));

    var normal = _1.Vec2.perpendicular(_1.Vec2.normalise(_1.Vec2.sub(new _1.Vec2(x1, y1), new _1.Vec2(x2, y2))));

    if (normal.dot(this.dir) < 0) {
      normal.x = -normal.x;
      normal.y = -normal.y;
    } // calculate a new ray, that contains the point of intersection
    // and a reflected direction


    var reflectRay = null;

    if (createReflected) {
      reflectRay = new Ray(_1.Vec2.sub(point, this.dir), _1.Vec2.reflect(this.dir, normal));
    }

    var hit = {
      point: point,
      normal: normal,
      distance: _1.Vec2.distance(this.pos, point),
      incomingRay: this,
      reflectedRay: reflectRay,
      target: null
    };
    this.hit = hit;
    return true;
  };

  Ray.prototype.castToShapes = function (shapes, numReflections) {
    var e_1, _a;

    if (numReflections === void 0) {
      numReflections = 0;
    }

    var bestHit = null;
    this.hit = null;

    try {
      for (var shapes_1 = __values(shapes), shapes_1_1 = shapes_1.next(); !shapes_1_1.done; shapes_1_1 = shapes_1.next()) {
        var shape = shapes_1_1.value;

        for (var i = 0; i < shape.points.length - 1; i++) {
          var p1 = shape.points[i];
          var p2 = shape.points[i + 1];

          if (this.castToLine(p1.x, p1.y, p2.x, p2.y, numReflections >= 1)) {
            if (this.hit.distance < (bestHit === null || bestHit === void 0 ? void 0 : bestHit.distance) || bestHit == null) {
              bestHit = this.hit;
              bestHit.target = shape;
            }
          }
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (shapes_1_1 && !shapes_1_1.done && (_a = shapes_1.return)) _a.call(shapes_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    this.hit = bestHit;
    if (numReflections > 0 && this.hit) this.hit.reflectedRay.castToShapes(shapes, numReflections - 1);
    return this.hit !== null;
  };

  Ray.prototype.rays = function () {
    var rays = [];
    this.recursiveGetRays(rays);
    return rays;
  };

  Ray.prototype.hits = function () {
    var hits = [];
    this.recursiveGetHits(hits);
    return hits;
  };

  Ray.prototype.recursiveGetHits = function (outHits) {
    var _a;

    if (this.hit == null) return;
    outHits.push(this.hit);
    (_a = this.hit.reflectedRay) === null || _a === void 0 ? void 0 : _a.recursiveGetHits(outHits);
  };

  Ray.prototype.recursiveGetRays = function (outRays) {
    var _a, _b;

    outRays.push(this);
    (_b = (_a = this.hit) === null || _a === void 0 ? void 0 : _a.reflectedRay) === null || _b === void 0 ? void 0 : _b.recursiveGetRays(outRays);
  };

  return Ray;
}();

exports.Ray = Ray;
},{".":"engine/math/index.ts"}],"engine/math/shape.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Shape =
/** @class */
function () {
  function Shape(points) {
    if (points === void 0) {
      points = [];
    }

    this.points = points;
  }

  Shape.makeCircle = function (xPos, yPos, radius, segments) {
    var points = [];

    for (var i = 0; i <= segments; i++) {
      var r = 2.0 * Math.PI / segments * i;
      var x = Math.sin(r) * radius;
      var y = -Math.cos(r) * radius;
      points.push({
        x: xPos + x,
        y: yPos + y
      });
    }

    return new Shape(points);
  };

  Shape.makeLine = function (x1, y1, x2, y2) {
    var points = [{
      x: x1,
      y: y1
    }, {
      x: x2,
      y: y2
    }];
    return new Shape(points);
  };

  Shape.makeBox = function (x, y, width, height) {
    var points = [{
      x: x,
      y: y
    }, {
      x: x + width,
      y: y
    }, {
      x: x + width,
      y: y + height
    }, {
      x: x,
      y: y + height
    }, {
      x: x,
      y: y
    }];
    return new Shape(points);
  };

  return Shape;
}();

exports.Shape = Shape;
},{}],"engine/math/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./vec2"));

__export(require("./vec3"));

__export(require("./vec4"));

__export(require("./mat3"));

__export(require("./mat4"));

__export(require("./rect"));

__export(require("./ray"));

__export(require("./shape"));
},{"./vec2":"engine/math/vec2.ts","./vec3":"engine/math/vec3.ts","./vec4":"engine/math/vec4.ts","./mat3":"engine/math/mat3.ts","./mat4":"engine/math/mat4.ts","./rect":"engine/math/rect.ts","./ray":"engine/math/ray.ts","./shape":"engine/math/shape.ts"}],"engine/input/mouseInput.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var math_1 = require("../math");

var MouseInput =
/** @class */
function () {
  function MouseInput(canvas) {
    var _this = this;

    this.canvas = canvas;
    this.pos = new math_1.Vec2();
    this.dt = new math_1.Vec2();
    this.leftButtonDown = false;

    this.mouseDownEventHandler = function (e) {
      _this.leftButtonDown = true;
    };

    this.mouseMoveEventHandler = function (e) {
      var area = _this.canvas.getBoundingClientRect();

      var lastPos = _this.pos;
      _this.pos = new math_1.Vec2(e.pageX - area.x, e.pageY - area.y);
      _this.dt = math_1.Vec2.sub(_this.pos, lastPos);
    };

    this.mouseUpEventHandler = function () {
      _this.leftButtonDown = false;
    };

    this.canvas.addEventListener("mousedown", this.mouseDownEventHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveEventHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpEventHandler);
  }

  MouseInput.prototype.destroy = function () {
    this.canvas.removeEventListener("mousedown", this.mouseDownEventHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveEventHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpEventHandler);
  };

  MouseInput.prototype.update = function () {
    this.dt = new math_1.Vec2();
  };

  return MouseInput;
}();

exports.MouseInput = MouseInput;
},{"../math":"engine/math/index.ts"}],"engine/input/keyboardInput.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var KeyboardInput =
/** @class */
function () {
  function KeyboardInput(canvas) {
    var _this = this;

    this.canvas = canvas;
    this.lastKeyState = {};
    this.keyState = {};

    this.keyDownEventHandler = function (e) {
      console.log(e.key + ' : ' + e.keyCode);
      _this.keyState[e.keyCode] = true;
    };

    this.keyUpEventHandler = function (e) {
      _this.keyState[e.keyCode] = false;
    };

    console.log('creating keyboard input');
    document.addEventListener("keydown", this.keyDownEventHandler);
    document.addEventListener("keyup", this.keyUpEventHandler); // this.canvas.onkeydown = this.keyDownEventHandler;
    // this.canvas.onkeydown = this.keyUpEventHandler;
    //this.canvas.addEventListener("keydown", this.keyDownEventHandler);
    //this.canvas.addEventListener("keyup", this.keyUpEventHandler);
  }

  KeyboardInput.prototype.destroy = function () {
    document.removeEventListener("keydown", this.keyDownEventHandler);
    document.removeEventListener("keyup", this.keyUpEventHandler);
  };

  KeyboardInput.prototype.isKeyDown = function (key) {
    return this.keyState[key] || false;
  };

  KeyboardInput.prototype.wasKeyPressed = function (key) {
    return this.keyState[key] && !this.lastKeyState[key] || false;
  };

  KeyboardInput.prototype.wasKeyReleased = function (key) {
    return this.keyState[key] && !this.lastKeyState[key] || false;
  };

  KeyboardInput.prototype.update = function () {
    this.lastKeyState = __assign({}, this.keyState);
  };

  return KeyboardInput;
}();

exports.KeyboardInput = KeyboardInput;
},{}],"engine/input/inputManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var mouseInput_1 = require("./mouseInput");

var keyboardInput_1 = require("./keyboardInput");

var InputManager =
/** @class */
function () {
  function InputManager(canvas) {
    this.mouse = new mouseInput_1.MouseInput(canvas);
    this.keyboard = new keyboardInput_1.KeyboardInput(canvas);
  }

  InputManager.prototype.destroy = function () {
    this.mouse.destroy();
    this.keyboard.destroy();
    this.keyboard = null;
    this.mouse = null;
  };

  return InputManager;
}();

exports.InputManager = InputManager;
},{"./mouseInput":"engine/input/mouseInput.ts","./keyboardInput":"engine/input/keyboardInput.ts"}],"engine/graphics/texture.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Texture2D =
/** @class */
function () {
  function Texture2D(gl) {
    this.gl = gl;
    this.image = new Image();
  }

  Object.defineProperty(Texture2D.prototype, "width", {
    get: function get() {
      return this.image.width;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Texture2D.prototype, "height", {
    get: function get() {
      return this.image.height;
    },
    enumerable: true,
    configurable: true
  });

  Texture2D.prototype.destroy = function () {
    this.gl.deleteTexture(this.handle);
    this.handle = null;
  };

  Texture2D.prototype.load = function (location) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.image.crossOrigin = 'anonymous';
      _this.image.src = location;

      _this.image.addEventListener('load', function () {
        _this.handle = _this.gl.createTexture();

        _this.gl.bindTexture(_this.gl.TEXTURE_2D, _this.handle);

        _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MIN_FILTER, _this.gl.NEAREST);

        _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MAG_FILTER, _this.gl.NEAREST);

        _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_WRAP_S, _this.gl.REPEAT);

        _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_WRAP_T, _this.gl.REPEAT);

        _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, _this.width, _this.height, 0, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, _this.image);

        _this.gl.bindTexture(_this.gl.TEXTURE_2D, _this.handle);

        resolve(_this);
      });
    });
  };

  return Texture2D;
}();

exports.Texture2D = Texture2D;
},{}],"engine/graphics/shader.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Shader =
/** @class */
function () {
  function Shader(gl) {
    this.gl = gl;
    this.infoLog = [];
    this.program = null;
    this.attributes = {};
  }

  Shader.prototype.destroy = function () {
    this.gl.deleteProgram(this.program);
  };

  Shader.prototype.enable = function () {
    this.gl.useProgram(this.program);
  };

  Shader.prototype.disable = function () {
    this.gl.useProgram(this.program);
  };

  Shader.prototype.bindTexture2d = function (textureHandle, uniformLoc, textureChanelIndex) {
    this.gl.uniform1i(uniformLoc, textureChanelIndex);
    this.gl.activeTexture(this.gl.TEXTURE0 + textureChanelIndex);
    this.gl.bindTexture(this.gl.TEXTURE_2D, textureHandle);
    this.gl.activeTexture(this.gl.TEXTURE0);
  };

  Shader.prototype.createShader = function (source, type) {
    var shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    var log = this.gl.getShaderInfoLog(shader);
    this.infoLog.push('[ VERT ] ' + log);
    return shader;
  };

  Shader.prototype.createProgram = function (vertexShader, fragmentShader, inputs, deleteShaders) {
    if (deleteShaders === void 0) {
      deleteShaders = true;
    }

    var program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);

    for (var i = 0; i < inputs.length; i++) {
      this.attributes[inputs[i]] = i;
      this.gl.bindAttribLocation(program, i, inputs[i]);
    }

    this.gl.linkProgram(program);
    this.gl.validateProgram(program);
    var log = this.gl.getProgramInfoLog(program);
    this.infoLog.push('[ FRAG ] ' + log);

    if (deleteShaders) {
      this.gl.deleteShader(vertexShader);
      this.gl.deleteShader(fragmentShader);
    }

    return program;
  };

  return Shader;
}();

exports.Shader = Shader;
},{}],"engine/graphics/renderer2d.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var math_1 = require("../math");

var texture_1 = require("./texture");

var shader_1 = require("./shader");

var mat3_1 = require("../math/mat3");

var RenderMode;

(function (RenderMode) {
  RenderMode[RenderMode["FILL"] = 0] = "FILL";
  RenderMode[RenderMode["WIREFRAME"] = 1] = "WIREFRAME";
})(RenderMode = exports.RenderMode || (exports.RenderMode = {}));

var vertex_shader = "\n    precision mediump float;\n\n    attribute vec3 a_position;\n    attribute vec4 a_color;\n    attribute vec2 a_uv;\n\n    uniform mat4 u_projection;\n\n    varying vec2 v_uv;\n    varying vec4 v_color;\n    varying float v_uvId;\n\n    void main() \n    {\n        v_uvId = a_position.z;\n        v_color = a_color;\n        v_uv = a_uv;\n        gl_Position = vec4(a_position.x, a_position.y, 0.0, 1.0) * u_projection;\n    }\n";
var fragment_shader = "\n    precision mediump float;\n\n    varying vec2 v_uv;\n    varying vec4 v_color;\n    varying float v_uvId;\n\n    uniform sampler2D u_texture0;\n    uniform sampler2D u_texture1;\n    uniform sampler2D u_texture2;\n    uniform sampler2D u_texture3;\n    uniform sampler2D u_texture4;\n\n    void main() \n    {\n        if      ( v_uvId == 0.0 ) gl_FragColor = texture2D(u_texture0, v_uv.st) * v_color;\n        else if ( v_uvId == 1.0 ) gl_FragColor = texture2D(u_texture1, v_uv.st) * v_color;\n        else if ( v_uvId == 2.0 ) gl_FragColor = texture2D(u_texture2, v_uv.st) * v_color;\n        else if ( v_uvId == 3.0 ) gl_FragColor = texture2D(u_texture3, v_uv.st) * v_color;\n        else if ( v_uvId == 4.0 ) gl_FragColor = texture2D(u_texture4, v_uv.st) * v_color;\n        else gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n    }\n";

var Renderer2DSpriteShader =
/** @class */
function (_super) {
  __extends(Renderer2DSpriteShader, _super);

  function Renderer2DSpriteShader(gl) {
    var _this = _super.call(this, gl) || this;

    _this.program = _this.createProgram(_this.createShader(vertex_shader, _this.gl.VERTEX_SHADER), _this.createShader(fragment_shader, _this.gl.FRAGMENT_SHADER), ['a_position', 'a_color', 'a_uv'], true);
    return _this;
  }

  Renderer2DSpriteShader.prototype.setTexture = function (textureHandle, index) {
    var textureLoc = this.gl.getUniformLocation(this.program, "u_texture" + index);
    this.bindTexture2d(textureHandle, textureLoc, index);
  };

  Renderer2DSpriteShader.prototype.setProjection = function (projection) {
    var uniformProjectionLoc = this.gl.getUniformLocation(this.program, "u_projection");
    var arr = projection.toArray();
    this.gl.uniformMatrix4fv(uniformProjectionLoc, true, arr);
  };

  return Renderer2DSpriteShader;
}(shader_1.Shader);

var GlMeshBuffer =
/** @class */
function () {
  function GlMeshBuffer(gl, vSizeBytes, iSizeBytes) {
    this.gl = gl;
    this.vSizeBytes = vSizeBytes;
    this.iSizeBytes = iSizeBytes;
    this.vao = this.gl.createVertexArray();
    this.vbo = this.gl.createBuffer();
    this.ibo = this.gl.createBuffer();
  }

  GlMeshBuffer.prototype.destroy = function () {
    this.gl.deleteBuffer(this.ibo);
    this.gl.deleteBuffer(this.vbo);
    this.gl.deleteVertexArray(this.vao);
  };

  GlMeshBuffer.prototype.bind = function () {
    this.gl.bindVertexArray(this.vao);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ibo);
  };

  GlMeshBuffer.prototype.unbind = function () {
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    this.gl.bindVertexArray(null);
  };

  GlMeshBuffer.prototype.setVertexBufferSize = function (vertexBufferLength) {
    var vertexBufferSize = vertexBufferLength * this.vSizeBytes;
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexBufferSize, this.gl.DYNAMIC_DRAW);
  };

  GlMeshBuffer.prototype.setIndexBufferSize = function (indexBufferLength) {
    var indexBufferSize = indexBufferLength * this.iSizeBytes;
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexBufferSize, this.gl.DYNAMIC_DRAW);
  };

  GlMeshBuffer.prototype.setVertexBufferData = function (verts, numVerts, floatsPerVert) {
    //this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, verts, 0, numVerts * floatsPerVert);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, verts, 0);
  };

  GlMeshBuffer.prototype.setIndexBufferData = function (indices, num) {
    // this.gl.bufferSubData(this.gl.ELEMENT_ARRAY_BUFFER, 0, indices, 0, num); //,  num * this.iSizeBytes);
    this.gl.bufferSubData(this.gl.ELEMENT_ARRAY_BUFFER, 0, indices, 0);
  };

  GlMeshBuffer.prototype.draw = function (numIndices, renderMode) {
    if (renderMode === void 0) {
      renderMode = this.gl.TRIANGLES;
    }

    this.gl.drawElements(renderMode, numIndices, this.gl.UNSIGNED_SHORT, 0);
  };

  return GlMeshBuffer;
}();

var SpriteBuffer =
/** @class */
function () {
  function SpriteBuffer(gl) {
    this.gl = gl; // 512 sprites, 4 verts per quad, 9 floats per vert

    this.verts = new Float32Array(128 * 4 * 9); // 512 sprites, 6 indices per quad (3 per triangle)

    this.indices = new Uint16Array(128 * 6);
    this.size = Float32Array.BYTES_PER_ELEMENT * 9;
    this.currentVert = 0;
    this.currentFace = 0;
    this.buffer = new GlMeshBuffer(this.gl, Float32Array.BYTES_PER_ELEMENT * 9, Uint16Array.BYTES_PER_ELEMENT);
    this.buffer.bind();
    this.buffer.setIndexBufferSize(this.indices.length);
    this.buffer.setVertexBufferSize(this.verts.length); // tell opengl the structure of our vertex

    this.gl.enableVertexAttribArray(0);
    this.gl.enableVertexAttribArray(1);
    this.gl.enableVertexAttribArray(2);
    var vSize = this.size;
    var fSize = Float32Array.BYTES_PER_ELEMENT;
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, vSize, fSize * 0); // position

    this.gl.vertexAttribPointer(1, 4, this.gl.FLOAT, false, vSize, fSize * 3); // color

    this.gl.vertexAttribPointer(2, 2, this.gl.FLOAT, false, vSize, fSize * 7); // uv

    this.buffer.unbind();
  }

  Object.defineProperty(SpriteBuffer.prototype, "currentVertIndex", {
    get: function get() {
      return this.currentVert * 9;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SpriteBuffer.prototype, "currentIndicyIndex", {
    get: function get() {
      return this.currentFace * 3;
    },
    enumerable: true,
    configurable: true
  });

  SpriteBuffer.prototype.destroy = function () {
    this.buffer.destroy();
    this.buffer = null;
  };

  SpriteBuffer.prototype.draw = function (renderMode) {
    if (renderMode === void 0) {
      renderMode = this.gl.TRIANGLES;
    }

    this.buffer.bind();
    this.buffer.setVertexBufferData(this.verts, this.currentVert, 9);
    this.buffer.setIndexBufferData(this.indices, this.currentIndicyIndex);
    this.buffer.draw(this.currentIndicyIndex, renderMode);
    this.buffer.unbind();
  };

  SpriteBuffer.prototype.getPos = function (index) {
    var i = index * this.size;
    var data = this.verts;
    return {
      x: data[i + 0],
      y: data[i + 1],
      z: data[i + 2]
    };
  };

  SpriteBuffer.prototype.getColor = function (index) {
    var i = index * this.size;
    var data = this.verts;
    return {
      x: data[i + 3],
      y: data[i + 4],
      z: data[i + 5],
      w: data[i + 6]
    };
  };

  SpriteBuffer.prototype.getUV = function (index) {
    var i = index * this.size;
    var data = this.verts;
    return {
      x: data[i + 7],
      y: data[i + 8]
    };
  };

  SpriteBuffer.prototype.setPos = function (value) {
    var i = this.currentVertIndex;
    var data = this.verts;
    data[i + 0] = value.x;
    data[i + 1] = value.y;
    data[i + 2] = value.z;
    return this;
  };

  SpriteBuffer.prototype.setColor = function (value) {
    var i = this.currentVertIndex;
    var data = this.verts;
    data[i + 3] = value.x;
    data[i + 4] = value.y;
    data[i + 5] = value.z;
    data[i + 6] = value.w;
    return this;
  };

  SpriteBuffer.prototype.setUV = function (value) {
    var i = this.currentVertIndex;
    var data = this.verts;
    data[i + 7] = value.x;
    data[i + 8] = value.y;
    return this;
  };

  SpriteBuffer.prototype.clear = function () {
    this.currentVert = 0;
    this.currentFace = 0;
  };

  SpriteBuffer.prototype.saveVert = function () {
    return this.currentVert++;
  };

  SpriteBuffer.prototype.saveFace = function (i0, i1, i2) {
    this.indices[this.currentIndicyIndex + 0] = i0;
    this.indices[this.currentIndicyIndex + 1] = i1;
    this.indices[this.currentIndicyIndex + 2] = i2;
    this.currentFace += 1;
    return this;
  };

  return SpriteBuffer;
}();

var Renderer2d =
/** @class */
function () {
  function Renderer2d(canvas, gl) {
    this.canvas = canvas;
    this.gl = gl;
    this.projection = new math_1.Mat4();
    this.maxTextures = 5;
    this.activeTextures = [null, null, null, null, null];
    this.currentTextureId = 0;
    this.processingRender = false;
    this.renderState = [];
    this.numFlushes = 0; // so that we can use a single shader for our 2d rendering
    // things that do not have a texture, will be textured with this blank
    // 1x1 white pixel image

    this.blankTexture = new texture_1.Texture2D(this.gl);
    this.blankTexture.load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=");
    this.saveState(true); // setup 2d projection matrix

    this.projection = math_1.Mat4.orthographicProjection(0, this.canvas.width, this.canvas.height, 0, 0, 100); // load shader

    this.shader = new Renderer2DSpriteShader(this.gl); // setup sprite graphics buffers

    this.spriteBuffer = new SpriteBuffer(this.gl);
  }

  Renderer2d.prototype.destroy = function () {
    this.spriteBuffer.destroy();
    this.shader.destroy();
  };

  Renderer2d.prototype.begin = function () {
    this.processingRender = true;
    this.spriteBuffer.clear();
    this.currentTextureId = 0;
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE);
    this.shader.enable();
    this.shader.setProjection(this.projection);
  };

  Renderer2d.prototype.end = function () {
    this.flushBatch();
    this.processingRender = false; // reset the renderstate so its fresh

    this.renderState = [];
    this.saveState(true);
    console.log("Flushes: " + this.numFlushes);
    this.numFlushes = 0;
  };

  Renderer2d.prototype.darwRect = function (xPos, yPos, width, height, rot, xOrigin, yOrigin) {
    var _a, _b, _c;

    if (this.shouldFlush()) this.flushBatch();
    var state = this.renderState[this.renderState.length - 1];
    var textureId = this.useTexture((_a = state.texture) !== null && _a !== void 0 ? _a : this.blankTexture);
    var color = (_b = state.color) !== null && _b !== void 0 ? _b : [math_1.Vec4.ONE, math_1.Vec4.ONE, math_1.Vec4.ONE, math_1.Vec4.ONE];
    var uvRect = (_c = state.uvRect) !== null && _c !== void 0 ? _c : new math_1.Rect(0, 0, 1, 1);
    var transform = mat3_1.Mat3.scale(width, height).mul(mat3_1.Mat3.rotation(rot)).mul(mat3_1.Mat3.translation(xPos, yPos)); // calculate the position for each of the quads

    var tl = mat3_1.Mat3.transformPoint(transform, {
      x: 0 - xOrigin,
      y: 0 - yOrigin,
      z: 1
    });
    var tr = mat3_1.Mat3.transformPoint(transform, {
      x: 1 - xOrigin,
      y: 0 - yOrigin,
      z: 1
    });
    var br = mat3_1.Mat3.transformPoint(transform, {
      x: 1 - xOrigin,
      y: 1 - yOrigin,
      z: 1
    });
    var bl = mat3_1.Mat3.transformPoint(transform, {
      x: 0 - xOrigin,
      y: 1 - yOrigin,
      z: 1
    }); // kinda hacky, for our shader, we are storing which texture we should use in the 'z' coordinate
    // as 'z' is not used for 2d rendering

    tl.z = textureId;
    tr.z = textureId;
    br.z = textureId;
    bl.z = textureId; // build our verts

    var i0 = this.spriteBuffer.setPos(tl).setColor(color[0]).setUV(uvRect.topLeft).saveVert();
    var i1 = this.spriteBuffer.setPos(tr).setColor(color[1]).setUV(uvRect.topRight).saveVert();
    var i2 = this.spriteBuffer.setPos(br).setColor(color[2]).setUV(uvRect.bottomRight).saveVert();
    var i3 = this.spriteBuffer.setPos(bl).setColor(color[3]).setUV(uvRect.bottomLeft).saveVert(); // save the face

    this.spriteBuffer.saveFace(i0, i1, i2).saveFace(i0, i2, i3);
  };

  Renderer2d.prototype.drawLine = function (x1, y1, x2, y2, thickness, vertColors) {
    this.drawLines([new math_1.Vec2(x1, y1), new math_1.Vec2(x2, y2)], thickness, vertColors);
  };

  Renderer2d.prototype.drawLines = function (points, width, vertColors) {
    var _a, _b, _c;

    if (this.shouldFlush()) this.flushBatch();
    vertColors = vertColors !== null && vertColors !== void 0 ? vertColors : [];
    this.saveState();
    var state = this.renderState[this.renderState.length - 1];
    var textureId = this.useTexture(this.blankTexture);
    var color = (_a = state.color[0]) !== null && _a !== void 0 ? _a : math_1.Vec4.ONE;
    var indices = [];
    var iDir = math_1.Vec2.ZERO;

    for (var i = 0; i < points.length; i++) {
      var p0 = points[i];
      var p1 = (_b = points[i + 1]) !== null && _b !== void 0 ? _b : math_1.Vec2.add(p0, iDir);
      var oDir = math_1.Vec2.sub(p1 !== null && p1 !== void 0 ? p1 : p0, p0).normalise();
      var tangent = math_1.Vec2.add(iDir, oDir).normalise();
      var mighter = math_1.Vec2.perpendicular(tangent);
      var distance = width / mighter.dot(math_1.Vec2.perpendicular(oDir)) * 0.5;
      var p = math_1.Vec2.mul(mighter, {
        x: distance,
        y: distance
      });
      var col = (_c = vertColors[i]) !== null && _c !== void 0 ? _c : color;
      var i0 = this.spriteBuffer.setPos({
        x: p0.x + p.x,
        y: p0.y + p.y,
        z: textureId
      }).setColor(col).setUV({
        x: 0,
        y: 0
      }).saveVert();
      var i1 = this.spriteBuffer.setPos({
        x: p0.x - p.x,
        y: p0.y - p.y,
        z: textureId
      }).setColor(col).setUV({
        x: 0,
        y: 0
      }).saveVert();
      indices.push(i0);
      indices.push(i1);
      iDir = oDir;
    }

    for (var i = 0; i < indices.length - 2; i += 2) {
      var index = indices[i];
      this.spriteBuffer.saveFace(index, index + 1, index + 2);
      this.spriteBuffer.saveFace(index + 1, index + 2, index + 3);
    }

    this.popState();
  };

  Renderer2d.prototype.drawCircle = function (xPos, yPos, radius, segments) {
    var _a, _b, _c;

    if (this.shouldFlush()) this.flushBatch();
    var state = this.renderState[this.renderState.length - 1];
    var textureId = this.useTexture((_a = state.texture) !== null && _a !== void 0 ? _a : this.blankTexture);
    var color = (_b = state.color[0]) !== null && _b !== void 0 ? _b : math_1.Vec4.ONE;
    var uvRect = (_c = state.uvRect) !== null && _c !== void 0 ? _c : new math_1.Rect(0, 0, 1, 1);
    var i0 = this.spriteBuffer.setPos({
      x: xPos,
      y: yPos,
      z: textureId
    }).setColor(color).setUV({
      x: (uvRect.right - uvRect.left) * 0.5,
      y: (uvRect.bottom - uvRect.top) * 0.5
    }).saveVert();

    for (var i = 0; i <= segments; i++) {
      var r = 2.0 * Math.PI / segments * i;
      var x = Math.sin(r);
      var y = -Math.cos(r); //this.darwRect(x, y, 5, 5, r, 0.5, 0.5);

      this.spriteBuffer.setPos({
        x: x * radius + xPos,
        y: y * radius + yPos,
        z: textureId
      }).setColor(color).setUV({
        x: x * 0.5 + 0.5,
        y: y * 0.5 + 0.5
      }).saveVert();
    }

    for (var i = 0; i <= segments; i++) {
      this.spriteBuffer.saveFace(i0, i0 + i, i0 + i + 1);
    }
  };

  Renderer2d.prototype.setTexture = function (texture) {
    var state = this.renderState[this.renderState.length - 1];
    state.texture = texture;
  };

  Renderer2d.prototype.setColor = function (color) {
    var state = this.renderState[this.renderState.length - 1];
    state.color[0] = color;
    state.color[1] = color;
    state.color[2] = color;
    state.color[3] = color;
  };

  Renderer2d.prototype.setColorPoints = function (tlc, trc, brc, blc) {
    var state = this.renderState[this.renderState.length - 1];
    state.color[0] = tlc;
    state.color[1] = trc;
    state.color[2] = brc;
    state.color[3] = blc;
  };

  Renderer2d.prototype.setUvRect = function (uvRect) {
    var state = this.renderState[this.renderState.length - 1];
    state.uvRect = uvRect;
  };

  Renderer2d.prototype.setRenderMode = function (renderMode) {
    var state = this.renderState[this.renderState.length - 1];

    if (state.renderMode != renderMode) {
      this.flushBatch();
      state.renderMode = renderMode;
    }
  };

  Renderer2d.prototype.saveState = function (setDefaults) {
    if (setDefaults === void 0) {
      setDefaults = false;
    }

    var state = this.renderState[this.renderState.length - 1];
    var defaults = !setDefaults ? state : {
      color: [math_1.Vec4.ONE, math_1.Vec4.ONE, math_1.Vec4.ONE, math_1.Vec4.ONE],
      uvRect: new math_1.Rect(0, 0, 1, 1),
      texture: this.blankTexture,
      renderMode: RenderMode.FILL
    };
    this.renderState.push(__assign(__assign({}, this.renderState[this.renderState.length - 1]), defaults));
  };

  Renderer2d.prototype.popState = function () {
    if (this.renderState.length <= 1) return; // do we need to re-render based on state change?

    var state = this.renderState[this.renderState.length - 1];
    var newState = this.renderState[this.renderState.length - 2];
    var flush = false;
    flush = flush || state.renderMode != newState.renderMode;
    if (flush) this.flushBatch();
    this.renderState.pop();
  };

  Renderer2d.prototype.useTexture = function (texture) {
    // check if the texture is already in use
    // if so, return... we dont need to add it to our list of textures again.
    for (var i = 0; i <= this.currentTextureId; i++) {
      if (this.activeTextures[i] == texture) return i;
    } // if we've used all the textures we can, then we need to flush to make room for another texture change


    if (this.currentTextureId >= this.maxTextures) this.flushBatch(); // store the texture in our active textuers array

    this.activeTextures[this.currentTextureId] = texture; // send the texture to opengl

    this.shader.setTexture(texture.handle, this.currentTextureId); // increment our currentTextureId for next use.

    this.currentTextureId += 1; // return what the current texture was.

    return this.currentTextureId - 1;
  };

  Renderer2d.prototype.flushBatch = function () {
    if (this.spriteBuffer.currentIndicyIndex === 0 || this.spriteBuffer.currentVertIndex === 0 || this.processingRender === false) return;
    var renderMode = this.gl.TRIANGLES;

    switch (this.renderState[this.renderState.length - 1].renderMode) {
      case RenderMode.FILL:
        renderMode = this.gl.TRIANGLES;
        break;

      case RenderMode.WIREFRAME:
        renderMode = this.gl.LINE_STRIP;
        break;
    } // render the sprite buffer and reset for next flush


    this.spriteBuffer.draw(renderMode);
    this.spriteBuffer.clear(); // clear our active textures as well

    for (var i = 0; i < this.maxTextures; i++) {
      this.activeTextures[i] = null;
    }

    this.currentTextureId = 0;
    this.numFlushes += 1;
  };

  Renderer2d.prototype.shouldFlush = function () {
    var result = this.spriteBuffer.currentVertIndex >= this.spriteBuffer.verts.length - 1 || this.spriteBuffer.currentVertIndex >= this.spriteBuffer.indices.length - 1;
    return result;
  };

  return Renderer2d;
}();

exports.Renderer2d = Renderer2d;
},{"../math":"engine/math/index.ts","./texture":"engine/graphics/texture.ts","./shader":"engine/graphics/shader.ts","../math/mat3":"engine/math/mat3.ts"}],"engine/utils/timer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Timer =
/** @class */
function () {
  function Timer() {
    this.deltaTime = 0;
    this.startTime = 0;
    this.stopTime = 0;
  }

  Timer.prototype.start = function () {
    this.stopTime = 0;
    this.startTime = performance.now() / 1000;
  };

  Timer.prototype.stop = function () {
    this.stopTime = performance.now() / 1000;
    this.deltaTime = this.stopTime - this.startTime;
  };

  return Timer;
}();

exports.Timer = Timer;
},{}],"engine/utils/frameTimer.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var timer_1 = require("./timer");

var FrameTimer =
/** @class */
function (_super) {
  __extends(FrameTimer, _super);

  function FrameTimer() {
    var _this = _super.call(this) || this;

    _this.framesPerSecond = 0;
    _this.frameCounter = 0;
    _this.runningTime = 0;
    return _this;
  }

  FrameTimer.prototype.update = function () {
    this.stop();
    this.runningTime += this.deltaTime;
    this.frameCounter += 1;

    if (this.runningTime >= 1) {
      this.framesPerSecond = this.frameCounter;
      this.runningTime = 0;
      this.frameCounter = 0;
    }

    this.start();
  };

  return FrameTimer;
}(timer_1.Timer);

exports.FrameTimer = FrameTimer;
},{"./timer":"engine/utils/timer.ts"}],"engine/app.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var inputManager_1 = require("./input/inputManager");

var renderer2d_1 = require("./graphics/renderer2d");

var frameTimer_1 = require("./utils/frameTimer");

var App =
/** @class */
function () {
  function App(htmlCanvasId) {
    this.canvas = document.getElementById(htmlCanvasId);
    this.resize();
    this.input = new inputManager_1.InputManager(this.canvas);
    this.time = new frameTimer_1.FrameTimer();
    this.gl = this.canvas.getContext("webgl2", {
      antialias: true
    });
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.renderer2d = new renderer2d_1.Renderer2d(this.canvas, this.gl);
  }

  App.prototype.destroy = function () {
    this.input.destroy();
    this.input = null;
  };

  App.prototype.loadAssets = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        ];
      });
    });
  };

  App.prototype.launch = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.loadAssets()];

          case 1:
            _a.sent();

            this.run();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  App.prototype.update = function () {};

  App.prototype.draw = function () {
    this.gl.clearColor(0.0, 0.0, 0.0, 0.0); // black

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  };

  App.prototype.run = function () {
    var _this = this;

    this.time.update();
    this.update();
    this.draw();
    this.input.keyboard.update();
    this.input.mouse.update();
    requestAnimationFrame(function () {
      _this.run();
    });
  };

  App.prototype.resize = function () {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth = this.canvas.clientWidth;
    var displayHeight = this.canvas.clientHeight; // Check if the canvas is not the same size.

    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      // Make the canvas the same size
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }
  };

  return App;
}();

exports.App = App;
},{"./input/inputManager":"engine/input/inputManager.ts","./graphics/renderer2d":"engine/graphics/renderer2d.ts","./utils/frameTimer":"engine/utils/frameTimer.ts"}],"demos/lightBender/levels.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var math_1 = require("../../engine/math");

exports.levels = [{
  tileSize: 55,
  rows: 8,
  cols: 8,
  startTile: [4, 1],
  layout: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0], [0, 0, 1, 1, 2, 4, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
  lights: [[0, 0, 0, 0, 0, 41, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]],
  fixed: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
  zones: [new math_1.Rect(2, 2, 4, 4)]
}];
},{"../../engine/math":"engine/math/index.ts"}],"demos/lightBender/assets/tile-type-solid.png":[function(require,module,exports) {
module.exports = "/tile-type-solid.d14769bd.png";
},{}],"demos/lightBender/assets/tile-type-1.png":[function(require,module,exports) {
module.exports = "/tile-type-1.fd042495.png";
},{}],"demos/lightBender/assets/tile-type-2.png":[function(require,module,exports) {
module.exports = "/tile-type-2.0321ce29.png";
},{}],"demos/lightBender/assets/tile-type-3.png":[function(require,module,exports) {
module.exports = "/tile-type-3.880dcbe2.png";
},{}],"demos/lightBender/assets/tile-type-4.png":[function(require,module,exports) {
module.exports = "/tile-type-4.65fd9987.png";
},{}],"demos/lightBender/assets/tile-type-5.png":[function(require,module,exports) {
module.exports = "/tile-type-5.bf073976.png";
},{}],"demos/lightBender/index.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __values = this && this.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var app_1 = require("../../engine/app");

var math_1 = require("../../engine/math");

var levels_1 = require("./levels"); // import assets


var tile_type_solid_png_1 = __importDefault(require("./assets/tile-type-solid.png"));

var tile_type_1_png_1 = __importDefault(require("./assets/tile-type-1.png"));

var tile_type_2_png_1 = __importDefault(require("./assets/tile-type-2.png"));

var tile_type_3_png_1 = __importDefault(require("./assets/tile-type-3.png"));

var tile_type_4_png_1 = __importDefault(require("./assets/tile-type-4.png"));

var tile_type_5_png_1 = __importDefault(require("./assets/tile-type-5.png"));

var texture_1 = require("../../engine/graphics/texture");

var backgroundColor = new math_1.Vec4(236 / 255, 239 / 255, 241 / 255, 1.0);
var backgroundLineColor = new math_1.Vec4(1, 1, 1, 1);
var lightColors = {
  1: new math_1.Vec4(255 / 255, 138 / 255, 128 / 255, 1),
  2: new math_1.Vec4(43 / 255, 187 / 255, 173 / 255, 1),
  3: new math_1.Vec4(179 / 255, 136 / 255, 255 / 255, 1),
  4: new math_1.Vec4(149 / 255, 158 / 255, 255 / 255, 1),
  5: new math_1.Vec4(63 / 255, 114 / 255, 155 / 255, 1)
};
var LightDir;

(function (LightDir) {
  LightDir[LightDir["NONE"] = 0] = "NONE";
  LightDir[LightDir["LEFT"] = 1] = "LEFT";
  LightDir[LightDir["UP"] = 2] = "UP";
  LightDir[LightDir["RIGHT"] = 3] = "RIGHT";
  LightDir[LightDir["DOWN"] = 4] = "DOWN";
})(LightDir || (LightDir = {}));

var TILE_SHAPE;

(function (TILE_SHAPE) {
  TILE_SHAPE[TILE_SHAPE["NONE"] = 0] = "NONE";
  TILE_SHAPE[TILE_SHAPE["EMPTY"] = 1] = "EMPTY";
  TILE_SHAPE[TILE_SHAPE["CORNER_TL"] = 2] = "CORNER_TL";
  TILE_SHAPE[TILE_SHAPE["CORNER_TR"] = 3] = "CORNER_TR";
  TILE_SHAPE[TILE_SHAPE["CORNER_BR"] = 4] = "CORNER_BR";
  TILE_SHAPE[TILE_SHAPE["CORNER_BL"] = 5] = "CORNER_BL";
  TILE_SHAPE[TILE_SHAPE["SOLID"] = 6] = "SOLID";
})(TILE_SHAPE || (TILE_SHAPE = {}));

var Level =
/** @class */
function () {
  function Level(data) {
    this.tileTextures = {};
    this.tiles = [];
    this.movingTiles = new Set();
    this.data = data;
  }

  Level.prototype.posToIndex = function (pos) {
    var x = Math.floor((pos.x - this.pos.x) / this.data.tileSize);
    var y = Math.floor((pos.y - this.pos.y) / this.data.tileSize);
    return new math_1.Vec2(x, y);
  };

  Level.prototype.indexToPos = function (index) {
    var hs = this.data.tileSize * 0.5;
    var x = Math.floor(index.x * this.data.tileSize + this.pos.x + hs);
    var y = Math.floor(index.y * this.data.tileSize + this.pos.y + hs);
    return new math_1.Vec2(x, y);
  };

  Level.prototype.inZone = function (index) {
    var e_1, _a;

    try {
      for (var _b = __values(this.data.zones), _c = _b.next(); !_c.done; _c = _b.next()) {
        var zone = _c.value;
        if (zone.contains(index)) return zone;
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return null;
  };

  Level.prototype.calculateLightPoints = function () {
    var e_2, _a;

    try {
      for (var _b = __values(this.tiles), _c = _b.next(); !_c.done; _c = _b.next()) {
        var light = _c.value;
        if (!(light instanceof LightTile)) continue;
        light.calculateLightPoints();
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  };

  Level.prototype.findTileAtIndex = function (index) {
    var e_3, _a;

    try {
      for (var _b = __values(this.tiles), _c = _b.next(); !_c.done; _c = _b.next()) {
        var t = _c.value;
        var ti = this.posToIndex(t.pos);
        if (ti.x === index.x && ti.y == index.y) return t;
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_3) throw e_3.error;
      }
    }
  };

  return Level;
}();

var Tile =
/** @class */
function () {
  function Tile(level, pos, size, type) {
    this.isMovingToTarget = false;
    this.level = level;
    this.pos = pos;
    this.size = size;
    this.targetPos = new math_1.Vec2(pos.x, pos.y);
    this.type = type;
  }

  Tile.prototype.update = function (dt) {
    this.moveToTargetPos(dt);
  };

  Tile.prototype.draw = function (renderer) {
    var ts = this.level.data.tileSize;
    renderer.setTexture(this.level.tileTextures[1]);
    renderer.darwRect(this.pos.x, this.pos.y, ts, ts, 0, 0.5, 0.5);

    if (this.type >= 1) {
      renderer.setTexture(this.level.tileTextures[this.type]);
      renderer.darwRect(this.pos.x, this.pos.y, ts, ts, 0, 0.5, 0.5);
    }
  };

  Tile.prototype.moveToTargetPos = function (dt) {
    if (this.isMovingToTarget === false) return;
    var speed = 8;
    var moveDir = math_1.Vec2.sub(this.targetPos, this.pos).normalise();
    this.pos.add({
      x: moveDir.x * dt * this.size.x * speed,
      y: moveDir.y * dt * this.size.y * speed
    }); // snap the position to target when its close enough.

    if (Math.abs(this.pos.x - this.targetPos.x) < 4) this.pos.x = this.targetPos.x;
    if (Math.abs(this.pos.y - this.targetPos.y) < 4) this.pos.y = this.targetPos.y;

    if (this.pos.x == this.targetPos.x && this.pos.y == this.targetPos.y) {
      this.isMovingToTarget = false;
      if (this.onMoveFinished) this.onMoveFinished(this);
    }
  };

  Tile.prototype.move = function (dir) {
    var index = this.level.posToIndex(this.pos).add(dir);
    this.targetPos = this.level.indexToPos(index);
    this, this.isMovingToTarget = true;
  };

  Tile.prototype.moveWith = function (dir, withIndex) {
    var index = this.level.posToIndex(this.pos);

    if (index.y == withIndex.y && dir.x !== 0 || index.x == withIndex.x && dir.y !== 0) {
      this.move(dir);
      return true;
    }

    return false;
  };

  return Tile;
}();

var LightTile =
/** @class */
function (_super) {
  __extends(LightTile, _super);

  function LightTile(level, pos, size, type) {
    var _this = _super.call(this, level, pos, size, type) || this;

    _this.lightDir = LightDir.NONE;
    _this.lightPoints = [];
    return _this;
  }

  Object.defineProperty(LightTile.prototype, "color", {
    get: function get() {
      var _a;

      return (_a = lightColors[this.colorId]) !== null && _a !== void 0 ? _a : new math_1.Vec4(1, 1, 1, 1);
    },
    enumerable: true,
    configurable: true
  });

  LightTile.prototype.draw = function (renderer) {
    _super.prototype.draw.call(this, renderer);

    renderer.saveState(true);
    var color = new math_1.Vec4(this.color.x, this.color.y, this.color.z, 0.5);
    color.w = 0.5;
    renderer.setColor(color);
    renderer.darwRect(this.pos.x, this.pos.y, this.level.data.tileSize / 2, this.level.data.tileSize / 2, 0, 0.5, 0.5);
    renderer.popState();
  };

  LightTile.prototype.drawLight = function (renderer) {
    var e_4, _a;

    if (this.lightPoints.length == 0) return;

    try {
      for (var _b = __values(this.lightPoints), _c = _b.next(); !_c.done; _c = _b.next()) {
        var lps = _c.value;
        var points = lps.map(function (z) {
          return z.pos;
        });
        var colors = lps.map(function (z) {
          return new math_1.Vec4(z.color.x, z.color.y, z.color.z, z.color.w);
        });
        colors[colors.length - 1].w = 0;
        renderer.saveState(true);
        renderer.setColor(new math_1.Vec4(this.color.x, this.color.y, this.color.z, 0.5));
        var lineThickness = this.level.data.tileSize / 3;
        renderer.drawLines(points, lineThickness, colors);
        renderer.popState();
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_4) throw e_4.error;
      }
    }
  };

  LightTile.prototype.calculateLightPoints = function () {
    this.lightPoints = [];
    if (this.lightDir == LightDir.NONE) return;
    var dirVec = this.dirToVec(this.lightDir);
    var ligtBeam = [];
    this.lightPoints.push(ligtBeam);
    ligtBeam.push({
      dir: dirVec,
      index: this.level.posToIndex(this.pos),
      pos: new math_1.Vec2(this.pos.x, this.pos.y).sub({
        x: dirVec.x * 9,
        y: dirVec.y * 9
      }),
      color: this.color,
      tile: null
    });
    this.traceLightPoints(ligtBeam, this.dirToVec(this.lightDir), this.pos);
  };

  LightTile.prototype.traceLightPoints = function (results, currentDir, pos) {
    pos = new math_1.Vec2(pos.x, pos.y);
    var ts = this.level.data.tileSize;
    var hts = ts * 0.5;
    var index = this.level.posToIndex(pos); // check if we are out of bounds
    // if so, this will be the final point for the line to be added

    if (index.x < 0 || index.x > this.level.data.cols || index.y < 0 || index.y > this.level.data.rows) {
      results.push({
        dir: new math_1.Vec2(0, 0),
        index: index,
        pos: pos,
        color: this.color,
        tile: null
      });
      return;
    } // does a tile exist at this position?


    var t = this.level.findTileAtIndex(index);
    var isBlocker = false;
    var nextDir = currentDir;
    var offset = new math_1.Vec2();

    if (t && t.type != TILE_SHAPE.NONE) {
      var cPos = this.level.indexToPos(index);
      var dirFromCenter = math_1.Vec2.sub(cPos, t.pos);
      var distanceFromCenter = dirFromCenter.length();
      if (Math.abs(currentDir.x) > 0) pos.x = t.pos.x;
      if (Math.abs(currentDir.y) > 0) pos.y = t.pos.y; // TILE_SHAPE.CORNER_TL
      //=====================================================

      if (t.type == TILE_SHAPE.CORNER_TL) {
        if (currentDir.x == 1) {
          isBlocker = true;
          offset.x -= hts - 6;
        }

        if (currentDir.y == 1) {
          isBlocker = true;
          offset.y -= hts - 6;
        }

        if (currentDir.x == -1) {
          var bent = false;

          if (distanceFromCenter >= 0 && distanceFromCenter <= hts - 7 - ts / 3 / 2) {
            nextDir = new math_1.Vec2(currentDir.y, -currentDir.x);
            offset.x += distanceFromCenter * currentDir.x;
            bent = true;
          } // console.log(`Distance: ${distanceFromCenter} \t ${bent}`);

        }

        if (currentDir.y == -1) {
          nextDir = new math_1.Vec2(currentDir.y, -currentDir.x); // offset.y += distanceFromCenter * currentDir.x;
        }
      } // TILE_SHAPE.CORNER_TR
      //=====================================================


      if (t.type == TILE_SHAPE.CORNER_TR && currentDir.x == -1) {
        isBlocker = true;
        offset.x += hts - 6;
      }

      if (t.type == TILE_SHAPE.CORNER_TR && currentDir.y == 1) {
        isBlocker = true;
        offset.y -= hts - 6;
      }

      if (t.type == TILE_SHAPE.CORNER_TR && currentDir.x == 1) {
        nextDir = new math_1.Vec2(currentDir.y, currentDir.x);
      }

      if (t.type == TILE_SHAPE.CORNER_TR && currentDir.y == -1) {
        nextDir = new math_1.Vec2(currentDir.y, -currentDir.x);
      } // TILE_SHAPE.CORNER_BR
      //=====================================================


      if (t.type == TILE_SHAPE.CORNER_BR && currentDir.x == 1) {
        nextDir = new math_1.Vec2(currentDir.y, -currentDir.x);
      }

      if (t.type == TILE_SHAPE.CORNER_BR && currentDir.y == 1) {
        nextDir = new math_1.Vec2(-currentDir.y, currentDir.x);
      }

      if (t.type == TILE_SHAPE.CORNER_BR && currentDir.x == -1) {
        isBlocker = true;
        offset.x += hts - 6;
      }

      if (t.type == TILE_SHAPE.CORNER_BR && currentDir.y == -1) {
        isBlocker = true;
        offset.y += hts - 6;
      } // TILE_SHAPE.CORNER_BL
      //=====================================================


      if (t.type == TILE_SHAPE.CORNER_BL && currentDir.x == 1) {
        isBlocker = true;
        offset.x -= hts - 6;
      }

      if (t.type == TILE_SHAPE.CORNER_BL && currentDir.y == 1) {
        nextDir = new math_1.Vec2(currentDir.y, -currentDir.x);
      }

      if (t.type == TILE_SHAPE.CORNER_BL && currentDir.x == -1) {
        nextDir = new math_1.Vec2(-currentDir.y, currentDir.x);
      }

      if (t.type == TILE_SHAPE.CORNER_BL && currentDir.y == -1) {
        isBlocker = true;
        offset.y += hts - 6;
      } // TILE_SHAPE.SOLID
      //=====================================================


      if (t.type == TILE_SHAPE.SOLID && currentDir.x == 1) {
        isBlocker = true;
      }

      if (t.type == TILE_SHAPE.SOLID && currentDir.y == 1) {
        isBlocker = true;
      }

      if (t.type == TILE_SHAPE.SOLID && currentDir.x == -1) {
        isBlocker = true;
      }

      if (t.type == TILE_SHAPE.SOLID && currentDir.y == -1) {
        isBlocker = true;
      }
    }

    if (currentDir != nextDir || isBlocker) {
      pos.x += offset.x;
      pos.y += offset.y;
      results.push({
        dir: nextDir,
        index: index,
        pos: pos,
        color: this.color,
        tile: t
      });
    }

    if (!isBlocker) {
      var nextPos = math_1.Vec2.mul(nextDir, {
        x: ts,
        y: ts
      }).add(pos);
      this.traceLightPoints(results, nextDir, nextPos);
    }
  };

  LightTile.prototype.dirToVec = function (dir) {
    switch (dir) {
      case LightDir.LEFT:
        return new math_1.Vec2(-1, 0);

      case LightDir.UP:
        return new math_1.Vec2(0, -1);

      case LightDir.RIGHT:
        return new math_1.Vec2(1, 0);

      case LightDir.DOWN:
        return new math_1.Vec2(0, 1);

      default:
        return new math_1.Vec2(0, 0);
    }
  };

  return LightTile;
}(Tile);

var LightBender =
/** @class */
function (_super) {
  __extends(LightBender, _super);

  function LightBender(htmlCanvasId) {
    var _this = _super.call(this, htmlCanvasId) || this;

    _this.currentLevelIndex = 0;
    _this.tileTextures = {};
    _this.currentLevel = new Level(levels_1.levels[_this.currentLevelIndex]);
    _this.currentLevel.tileTextures = _this.tileTextures;

    _this.loadLevel();

    return _this;
  }

  LightBender.prototype.loadAssets = function () {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , _super.prototype.loadAssets.call(this)];

          case 1:
            _a.sent();

            this.tileTextures[0] = null;
            this.tileTextures[1] = new texture_1.Texture2D(this.gl);
            this.tileTextures[1].load(tile_type_1_png_1.default);
            this.tileTextures[2] = new texture_1.Texture2D(this.gl);
            this.tileTextures[2].load(tile_type_2_png_1.default);
            this.tileTextures[3] = new texture_1.Texture2D(this.gl);
            this.tileTextures[3].load(tile_type_3_png_1.default);
            this.tileTextures[4] = new texture_1.Texture2D(this.gl);
            this.tileTextures[4].load(tile_type_4_png_1.default);
            this.tileTextures[5] = new texture_1.Texture2D(this.gl);
            this.tileTextures[5].load(tile_type_5_png_1.default);
            this.tileTextures[6] = new texture_1.Texture2D(this.gl);
            this.tileTextures[6].load(tile_type_solid_png_1.default);
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  LightBender.prototype.update = function () {
    var e_5, _a;

    _super.prototype.update.call(this);

    var kb = this.input.keyboard;
    var inputDir = new math_1.Vec2(0, 0);
    if (kb.wasKeyPressed(38)) inputDir.y = -1; // up arrow
    else if (kb.wasKeyPressed(40)) inputDir.y = 1; // down arrow
      else if (kb.wasKeyPressed(37)) inputDir.x = -1; // left arrow
        else if (kb.wasKeyPressed(39)) inputDir.x = 1; // right arrow

    if (inputDir.x !== 0 || inputDir.y !== 0) {
      this.moveActiveTile(inputDir);
    }

    try {
      for (var _b = __values(this.currentLevel.tiles), _c = _b.next(); !_c.done; _c = _b.next()) {
        var t = _c.value;
        t.update(this.time.deltaTime);
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_5) throw e_5.error;
      }
    }

    this.currentLevel.calculateLightPoints();
  };

  LightBender.prototype.draw = function () {
    _super.prototype.draw.call(this);

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.renderer2d.begin();
    this.drawBackgroundGrid();
    this.drawLightBeams();
    this.drawTiles();
    this.renderer2d.end();
  };

  LightBender.prototype.drawBackgroundGrid = function () {
    var ts = this.currentLevel.data.tileSize;
    var nx = this.currentLevel.data.cols - 2; // Math.floor(this.canvas.width / ts);

    var ny = this.currentLevel.data.rows - 2; // Math.floor(this.canvas.height/ ts);

    var xo = (this.canvas.width - nx * ts) * 0.5;
    var yo = (this.canvas.height - ny * ts) * 0.5;
    this.renderer2d.saveState(true); // draw background:
    // const mc = new Vec4(255/255, 232/255, 206/255, 1);

    var oc = new math_1.Vec4(255 / 255, 255 / 255, 255 / 255, 0.2);
    this.renderer2d.setColor(oc);
    var colors = [new math_1.Vec4(oc.x, oc.y, oc.z, 0), new math_1.Vec4(oc.x, oc.y, oc.z, oc.w), new math_1.Vec4(oc.x, oc.y, oc.z, oc.w), new math_1.Vec4(oc.x, oc.y, oc.z, 0)];

    for (var i = 0; i <= nx; i++) {
      var points = [new math_1.Vec2(xo + i * ts, yo - 2 * ts), new math_1.Vec2(xo + i * ts, yo - 0), new math_1.Vec2(xo + i * ts, yo + ny * ts), new math_1.Vec2(xo + i * ts, yo + (ny + 2) * ts)];
      this.renderer2d.drawLines(points, 1, colors);
    }

    for (var i = 0; i <= ny; i++) {
      var points = [new math_1.Vec2(xo - 2 * ts, yo + i * ts), new math_1.Vec2(xo - 0, yo + i * ts), new math_1.Vec2(xo + nx * ts, yo + i * ts), new math_1.Vec2(xo + (nx + 2) * ts, yo + i * ts)];
      this.renderer2d.drawLines(points, 1, colors);
    }

    this.renderer2d.popState();
  };

  LightBender.prototype.drawLightBeams = function () {
    var e_6, _a;

    try {
      for (var _b = __values(this.currentLevel.tiles), _c = _b.next(); !_c.done; _c = _b.next()) {
        var tile = _c.value;

        if (tile instanceof LightTile) {
          tile.drawLight(this.renderer2d);
        }
      }
    } catch (e_6_1) {
      e_6 = {
        error: e_6_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_6) throw e_6.error;
      }
    }
  };

  LightBender.prototype.drawTiles = function () {
    this.renderer2d.saveState(true);

    for (var i = 0; i < this.currentLevel.tiles.length; i++) {
      var tile = this.currentLevel.tiles[i];
      tile.draw(this.renderer2d);
    }

    this.renderer2d.popState();
  };

  LightBender.prototype.moveActiveTile = function (dir) {
    var e_7, _a;

    var _this = this;

    if (this.currentLevel.movingTiles.size > 0 || this.currentLevel.activeTile === null) return;
    var activeTileIndex = this.currentLevel.posToIndex(this.currentLevel.activeTile.pos);
    var targetTileIndex = math_1.Vec2.add(activeTileIndex, dir);
    var zone = this.currentLevel.inZone(targetTileIndex);

    var moveTileFinishedFunc = function moveTileFinishedFunc(tile) {
      _this.currentLevel.movingTiles.delete(tile);

      tile.onMoveFinished = null;

      var index = _this.currentLevel.posToIndex(tile.pos);

      if (!(zone === null || zone === void 0 ? void 0 : zone.contains(index))) {
        _this.currentLevel.activeTile = tile;
      }
    };

    this.currentLevel.activeTile.move(dir);
    this.currentLevel.activeTile.onMoveFinished = moveTileFinishedFunc;
    this.currentLevel.activeTile = null;
    if (zone === null) return;

    try {
      for (var _b = __values(this.currentLevel.tiles), _c = _b.next(); !_c.done; _c = _b.next()) {
        var t = _c.value;
        var ti = this.currentLevel.posToIndex(t.pos);

        if (zone.contains(ti) && t.moveWith(dir, activeTileIndex)) {
          this.currentLevel.movingTiles.add(t);
          t.onMoveFinished = moveTileFinishedFunc;
        }
      }
    } catch (e_7_1) {
      e_7 = {
        error: e_7_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_7) throw e_7.error;
      }
    }
  };

  LightBender.prototype.loadLevel = function () {
    var level = this.currentLevel;
    var layout = level.data.layout;
    var lights = level.data.lights; // if the start tile is blank, set it to the default type.

    if (layout[level.data.startTile[1]][level.data.startTile[0]] === 0) layout[level.data.startTile[1]][level.data.startTile[0]] = 1;
    var tileSize = level.data.tileSize;
    var nx = level.data.cols - 2; // Math.floor(this.canvas.width / ts);

    var ny = level.data.rows - 2; // Math.floor(this.canvas.height/ ts);

    var xo = (this.canvas.width - (nx + 2) * tileSize) * 0.5;
    var yo = (this.canvas.height - (ny + 2) * tileSize) * 0.5; // set the position of the level, so that we can calculate index's from positions.

    level.pos = new math_1.Vec2(xo, yo);
    this.currentLevel.tiles = [];
    var rows = level.data.rows;
    var cols = level.data.cols;

    for (var yi = 0; yi < rows; yi++) {
      for (var xi = 0; xi < cols; xi++) {
        var lightId = lights[yi][xi];
        var tileType = layout[yi][xi];
        if (lightId != 0) tileType = 1;
        if (tileType === 0) continue;
        var x = xo + xi * tileSize + tileSize * 0.5;
        var y = yo + yi * tileSize + tileSize * 0.5;
        var tile = null;

        if (lightId > 0) {
          tile = new LightTile(this.currentLevel, new math_1.Vec2(x, y), new math_1.Vec2(tileSize, tileSize), tileType);
          tile.lightDir = Math.floor(lightId / 10);
          tile.colorId = lightId - tile.lightDir * 10;
        } else {
          tile = new Tile(this.currentLevel, new math_1.Vec2(x, y), new math_1.Vec2(tileSize, tileSize), tileType);
        }

        if (xi === level.data.startTile[0] && yi === level.data.startTile[1]) this.currentLevel.activeTile = tile;
        this.currentLevel.tiles.push(tile);
      }
    }
  };

  return LightBender;
}(app_1.App);

exports.LightBender = LightBender;
},{"../../engine/app":"engine/app.ts","../../engine/math":"engine/math/index.ts","./levels":"demos/lightBender/levels.ts","./assets/tile-type-solid.png":"demos/lightBender/assets/tile-type-solid.png","./assets/tile-type-1.png":"demos/lightBender/assets/tile-type-1.png","./assets/tile-type-2.png":"demos/lightBender/assets/tile-type-2.png","./assets/tile-type-3.png":"demos/lightBender/assets/tile-type-3.png","./assets/tile-type-4.png":"demos/lightBender/assets/tile-type-4.png","./assets/tile-type-5.png":"demos/lightBender/assets/tile-type-5.png","../../engine/graphics/texture":"engine/graphics/texture.ts"}],"demos/rayCasting/index.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spread = this && this.__spread || function () {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
};

var __values = this && this.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var app_1 = require("../../engine/app");

var math_1 = require("../../engine/math");

var RayCastingDemo =
/** @class */
function (_super) {
  __extends(RayCastingDemo, _super);

  function RayCastingDemo(htmlCanvasId) {
    var _this = _super.call(this, htmlCanvasId) || this;

    _this.polygons = [];
    _this.rays = [];
    _this.rayHits = [];
    _this.allRays = [];
    _this.elapsedTime = 0;
    return _this;
  }

  RayCastingDemo.prototype.loadAssets = function () {
    return __awaiter(this, void 0, Promise, function () {
      var ww, wh, aw, ah, as, left, right, top, bottom;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , _super.prototype.loadAssets.call(this)];

          case 1:
            _a.sent();

            ww = this.canvas.width;
            wh = this.canvas.height;
            aw = ww / 1.5;
            ah = wh / 1.5;
            as = Math.min(aw, ah);
            left = ww / 2 - as / 2;
            right = ww / 2 + as / 2;
            top = wh / 2 - as / 2;
            bottom = wh / 2 + as / 2;
            this.polygons.push(math_1.Shape.makeCircle(ww / 2 - as / 4, wh / 2, as / 10, 4));
            this.polygons.push(math_1.Shape.makeCircle(ww / 2 + as / 4, wh / 2, as / 10, 4));
            this.polygons.push(math_1.Shape.makeCircle(ww / 2, wh / 2 - as / 4, as / 10, 4));
            this.polygons.push(math_1.Shape.makeCircle(ww / 2, wh / 2 + as / 4, as / 10, 4)); // this.polygons.push( Shape.makeCircle(right, 300, 50,4));
            // this.polygons.push( Shape.makeCircle(300, 500, 50,4));
            // this.polygons.push( Shape.makeCircle(400, 400, 50,4));

            this.polygons.push(math_1.Shape.makeBox(left, top, right - left, bottom - top));
            this.polygons.push(math_1.Shape.makeBox(0, 0, ww, wh)); // this.polygons.push( Shape.makeLine(200, 100, 200, 400));
            // this.polygons.push( Shape.makeLine(500, 400, 500, 100));
            //this.polygons.push( Shape.makeLine(100, 300, 400, 300));
            //this.polygons.push( Shape.makeLine(400, 300, 100, 300));

            this.rays = []; // this.makeRayFan(100, 100, 64);

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  RayCastingDemo.prototype.update = function () {
    var _a, _b;

    _super.prototype.update.call(this);

    this.elapsedTime += this.time.deltaTime; // this.updateRayPositions(this.input.mouse.pos.x, this.input.mouse.pos.y);
    // this.rays = this.makeRayFan(this.input.mouse.pos.x, this.input.mouse.pos.y, 64);
    // this.rays = this.makeRaysToShapes(this.input.mouse.pos.x, this.input.mouse.pos.y, this.polygons);

    this.elapsedTime = Math.PI / 3; //this.rays = this.makeRayLine(this.input.mouse.pos, new Vec2(Math.cos(this.elapsedTime), Math.sin(this.elapsedTime)), 10, 1);
    //this.rays = this.makeRaysToShapes(this.input.mouse.pos.x, this.input.mouse.pos.y, this.polygons);

    this.rays = this.makeRayFan(this.input.mouse.pos.x, this.input.mouse.pos.y, 64);
    this.rayHits = [];
    this.allRays = [];

    for (var i = 0; i < this.rays.length; i++) {
      var r = this.rays[i];
      r.castToShapes(this.polygons, 0);

      (_a = this.rayHits).push.apply(_a, __spread(r.hits()));

      (_b = this.allRays).push.apply(_b, __spread(r.rays()));
    }
  };

  RayCastingDemo.prototype.draw = function () {
    var e_1, _a;

    _super.prototype.draw.call(this);

    this.renderer2d.begin();

    try {
      for (var _b = __values(this.polygons), _c = _b.next(); !_c.done; _c = _b.next()) {
        var p = _c.value;
        this.drawShape(p);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    this.drawRays(this.allRays); // this.drawRayHits(this.rayHits);

    this.renderer2d.end();
  };

  RayCastingDemo.prototype.drawShape = function (polygon) {
    this.renderer2d.saveState();
    this.renderer2d.drawLines(polygon.points, 1);
    this.renderer2d.popState();
  };

  RayCastingDemo.prototype.updateRayPositions = function (xPos, yPos) {
    for (var i = 0; i < this.rays.length; i++) {
      var r = this.rays[i];
      r.pos.x = xPos;
      r.pos.y = yPos;
    }
  };

  RayCastingDemo.prototype.drawRays = function (rays) {
    var e_2, _a;

    var _b, _c;

    try {
      for (var rays_1 = __values(rays), rays_1_1 = rays_1.next(); !rays_1_1.done; rays_1_1 = rays_1.next()) {
        var r = rays_1_1.value;
        var p0 = r.pos; //this.renderer2d.drawCircle(p0.x, p0.y, 3, 4);

        var d = Math.min((_c = (_b = r.hit) === null || _b === void 0 ? void 0 : _b.distance) !== null && _c !== void 0 ? _c : 2000);
        var p1 = math_1.Vec2.mul(r.dir, {
          x: d,
          y: d
        }).add(r.pos);
        this.renderer2d.drawLine(p0.x, p0.y, p1.x, p1.y, 1);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (rays_1_1 && !rays_1_1.done && (_a = rays_1.return)) _a.call(rays_1);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  };

  RayCastingDemo.prototype.drawRayHits = function (rayHits) {
    var e_3, _a;

    try {
      for (var rayHits_1 = __values(rayHits), rayHits_1_1 = rayHits_1.next(); !rayHits_1_1.done; rayHits_1_1 = rayHits_1.next()) {
        var h = rayHits_1_1.value;
        this.renderer2d.drawLine(h.incomingRay.pos.x, h.incomingRay.pos.y, h.point.x, h.point.y, 1);
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (rayHits_1_1 && !rayHits_1_1.done && (_a = rayHits_1.return)) _a.call(rayHits_1);
      } finally {
        if (e_3) throw e_3.error;
      }
    }
  };

  RayCastingDemo.prototype.makeRayFan = function (xPos, yPos, numRays) {
    var rays = [];

    for (var i = 0; i < numRays; i++) {
      var r = 2.0 * Math.PI / numRays * i;
      rays.push(new math_1.Ray(new math_1.Vec2(xPos, yPos), new math_1.Vec2(Math.sin(r), -Math.cos(r))));
    }

    return rays;
  };

  RayCastingDemo.prototype.makeRaysToShapes = function (xPos, yPos, shapes) {
    var e_4, _a, e_5, _b;

    var pos = new math_1.Vec2(xPos, yPos);
    var rays = [];

    try {
      for (var shapes_1 = __values(shapes), shapes_1_1 = shapes_1.next(); !shapes_1_1.done; shapes_1_1 = shapes_1.next()) {
        var shape = shapes_1_1.value;

        try {
          for (var _c = (e_5 = void 0, __values(shape.points)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var p = _d.value;
            rays.push(new math_1.Ray(pos, math_1.Vec2.sub(p, pos).normalise()));
          }
        } catch (e_5_1) {
          e_5 = {
            error: e_5_1
          };
        } finally {
          try {
            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
          } finally {
            if (e_5) throw e_5.error;
          }
        }
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (shapes_1_1 && !shapes_1_1.done && (_a = shapes_1.return)) _a.call(shapes_1);
      } finally {
        if (e_4) throw e_4.error;
      }
    }

    return rays;
  };

  RayCastingDemo.prototype.makeRayLine = function (pos, dir, count, spacing) {
    var rays = [];
    var pDir = math_1.Vec2.perpendicular(dir);

    for (var i = 0; i < count; i++) {
      rays.push(new math_1.Ray(math_1.Vec2.add(pos, math_1.Vec2.scale(pDir, i * spacing)), dir));
    }

    return rays;
  };

  return RayCastingDemo;
}(app_1.App);

exports.RayCastingDemo = RayCastingDemo;
},{"../../engine/app":"engine/app.ts","../../engine/math":"engine/math/index.ts"}],"demos/lineRendering/index.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var app_1 = require("../../engine/app");

var math_1 = require("../../engine/math");

var LineRenderingDemo =
/** @class */
function (_super) {
  __extends(LineRenderingDemo, _super);

  function LineRenderingDemo(htmlCanvasId) {
    return _super.call(this, htmlCanvasId) || this;
  }

  LineRenderingDemo.prototype.loadAssets = function () {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , _super.prototype.loadAssets.call(this)];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  LineRenderingDemo.prototype.update = function () {
    _super.prototype.update.call(this);
  };

  LineRenderingDemo.prototype.draw = function () {
    _super.prototype.draw.call(this);

    this.renderer2d.begin();
    var points = [new math_1.Vec2(100, 100), new math_1.Vec2(200, 100), this.input.mouse.pos];
    this.renderer2d.drawLines(points, 20);
    this.renderer2d.drawLine(300, 300, 400, 400, 6);
    this.renderer2d.end();
  };

  return LineRenderingDemo;
}(app_1.App);

exports.LineRenderingDemo = LineRenderingDemo;
},{"../../engine/app":"engine/app.ts","../../engine/math":"engine/math/index.ts"}],"demos/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var lightBender_1 = require("./lightBender");

var rayCasting_1 = require("./rayCasting");

var lineRendering_1 = require("./lineRendering");

var app_1 = require("../engine/app");

function RunDemo(canvasId, name) {
  switch (name) {
    case 'LightBender':
      return new lightBender_1.LightBender(canvasId);

    case 'RayCastingDemo':
      return new rayCasting_1.RayCastingDemo(canvasId);

    case 'LineRenderingDemo':
      return new lineRendering_1.LineRenderingDemo(canvasId);

    default:
      return new app_1.App(canvasId);
  }
}

exports.default = RunDemo;
},{"./lightBender":"demos/lightBender/index.ts","./rayCasting":"demos/rayCasting/index.ts","./lineRendering":"demos/lineRendering/index.ts","../engine/app":"engine/app.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var demos_1 = __importDefault(require("./demos")); // ============================================================================
// Launch the canvas demo
// ============================================================================


function getDemoNameFromHash() {
  var _a;

  var pathnames = window.location.hash.substr(1).split('/').filter(function (z) {
    return z !== "";
  });
  var demoName = (_a = pathnames[0]) !== null && _a !== void 0 ? _a : 'LightBender';
  return demoName;
}

function runApp() {
  var app = demos_1.default("canvas", getDemoNameFromHash());
  app.launch();
} // listen for hach value change events


window.addEventListener('hashchange', function () {
  runApp();
});

window.onload = function () {
  runApp();
}; // ============================================================================
// APP MENU
// ============================================================================


{
  var menuBtn_1 = document.querySelector('.menu-btn');
  var menuList_1 = document.querySelector('.page-nav ul');
  var menuOpen_1 = false;
  menuBtn_1.addEventListener('click', function () {
    menuOpen_1 = !menuOpen_1;

    if (menuOpen_1) {
      menuBtn_1.classList.add('open');
      menuList_1.classList.add('open');
    } else {
      menuBtn_1.classList.remove('open');
      menuList_1.classList.remove('open');
    }

    console.log('clicky');
  });
}
},{"./demos":"demos/index.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56437" + '/');

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
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map