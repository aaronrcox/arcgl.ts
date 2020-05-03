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
    this.y *= rhs;
    return this;
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

var vec2_1 = require("./vec2");

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
  Object.defineProperty(Vec3.prototype, "xy", {
    get: function get() {
      return new vec2_1.Vec2(this[0], this[1]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vec3.prototype, "xyz", {
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
},{"./vec2":"engine/math/vec2.ts"}],"engine/math/vec4.ts":[function(require,module,exports) {
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
  Object.defineProperty(Mat3.prototype, "scale", {
    get: function get() {
      return new vec2_1.Vec2(this.right.length(), this.up.length());
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

  Mat3.identity = function () {
    return new Mat3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
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
  }; // mul(rhs: Mat3): Mat3 {
  //     const result = Mat3.mul(this, rhs);
  //     return result;
  // }


  Mat3.prototype.copy = function () {
    return new Mat3([this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]]);
  };

  Mat3.prototype.equal = function (rhs) {
    var e = Number.EPSILON;

    for (var i = 0; i < 9; i++) {
      if (Math.abs(this[i] - rhs[i]) > e) {
        return false;
      }
    }

    return true;
  };

  Mat3.prototype.move = function (tx, ty) {
    this[6] += tx;
    this[7] += ty;
  };

  Mat3.prototype.setPos = function (tx, ty) {
    this[6] = tx;
    this[7] = ty;
  };

  Mat3.prototype.setPosX = function (tx) {
    this[6] = tx;
  };

  Mat3.prototype.setPosY = function (ty) {
    this[7] = ty;
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

  Ray.prototype.castToShapes = function (shapes, numReflections, shouldRefletCallback) {
    var e_1, _a;

    if (numReflections === void 0) {
      numReflections = 0;
    }

    if (shouldRefletCallback === void 0) {
      shouldRefletCallback = null;
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

    if (numReflections > 0 && this.hit) {
      var shouldReflect = bestHit == null || shouldRefletCallback === null || shouldRefletCallback(bestHit);
      if (shouldReflect) this.hit.reflectedRay.castToShapes(shapes, numReflections - 1); // else
      //     this.hit.reflectedRay = null;
    }

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

var mat3_1 = require("./mat3");

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

  Shape.makeBox = function (x, y, width, height, rot, open) {
    if (open === void 0) {
      open = false;
    }

    var points = [{
      x: width / 2,
      y: height / 2,
      z: 1
    }, {
      x: -width / 2,
      y: height / 2,
      z: 1
    }, {
      x: -width / 2,
      y: -height / 2,
      z: 1
    }, {
      x: width / 2,
      y: -height / 2,
      z: 1
    }];

    if (!open) {
      points.push({
        x: width / 2,
        y: height / 2,
        z: 1
      });
    }

    points = points.map(function (p) {
      return mat3_1.Mat3.transformPoint(mat3_1.Mat3.mul(mat3_1.Mat3.rotation(rot), mat3_1.Mat3.translation(x, y)), p);
    });
    return new Shape(points);
  };

  Shape.makeAngleTriangle = function (x, y, width, height, rot) {
    var hw = Math.ceil(width * 0.5);
    var hh = Math.ceil(height * 0.5);
    var points = [{
      x: 0 - hw,
      y: 0 - hh,
      z: 1
    }, {
      x: 0 + hw,
      y: 0 - hh,
      z: 1
    }, {
      x: 0 - hw,
      y: 0 + hh,
      z: 1
    }, {
      x: 0 - hw,
      y: 0 - hh,
      z: 1
    }];
    points = points.map(function (p) {
      return mat3_1.Mat3.transformPoint(mat3_1.Mat3.mul(mat3_1.Mat3.rotation(rot), mat3_1.Mat3.translation(x, y)), p);
    });
    return new Shape(points);
  };

  return Shape;
}();

exports.Shape = Shape;
},{"./mat3":"engine/math/mat3.ts"}],"engine/math/index.ts":[function(require,module,exports) {
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

var math_1 = require("../math");

var MOUSE;

(function (MOUSE) {
  MOUSE[MOUSE["LEFT"] = 0] = "LEFT";
  MOUSE[MOUSE["MIDDLE"] = 1] = "MIDDLE";
  MOUSE[MOUSE["RIGHT"] = 2] = "RIGHT";
})(MOUSE = exports.MOUSE || (exports.MOUSE = {}));

var MouseInput =
/** @class */
function () {
  function MouseInput(canvas) {
    var _this = this;

    this.canvas = canvas;
    this.pos = new math_1.Vec2();
    this.dt = new math_1.Vec2();
    this.buttons = [];
    this.lastButtons = [];
    this.leftButtonDown = false;

    this.mouseDownEventHandler = function (e) {
      _this.leftButtonDown = true;
      _this.buttons[e.button] = true;
    };

    this.mouseUpEventHandler = function (e) {
      _this.leftButtonDown = false;
      _this.buttons[e.button] = false;
    };

    this.mouseMoveEventHandler = function (e) {
      var area = _this.canvas.getBoundingClientRect();

      var lastPos = _this.pos;
      _this.pos = new math_1.Vec2(e.pageX - area.x, e.pageY - area.y);
      _this.dt = math_1.Vec2.sub(_this.pos, lastPos);
    };

    document.addEventListener("mousedown", this.mouseDownEventHandler);
    document.addEventListener("mousemove", this.mouseMoveEventHandler);
    document.addEventListener("mouseup", this.mouseUpEventHandler);
  }

  MouseInput.prototype.destroy = function () {
    document.removeEventListener("mousedown", this.mouseDownEventHandler);
    document.removeEventListener("mousemove", this.mouseMoveEventHandler);
    document.removeEventListener("mouseup", this.mouseUpEventHandler);
  };

  MouseInput.prototype.update = function () {
    this.dt = new math_1.Vec2();
    this.lastButtons = __spread(this.buttons);
  };

  MouseInput.prototype.isButtonDown = function (btn) {
    return this.buttons[btn];
  };

  MouseInput.prototype.wasButtonPressed = function (btn) {
    return this.buttons[btn] && !this.lastButtons[btn];
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
      _this.keyState[e.keyCode] = true;
    };

    this.keyUpEventHandler = function (e) {
      _this.keyState[e.keyCode] = false;
    };

    console.log('creating keyboard input');
    document.addEventListener("keydown", this.keyDownEventHandler);
    document.addEventListener("keyup", this.keyUpEventHandler);
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
},{}],"engine/graphics/renderTexture.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var RenderTexture =
/** @class */
function () {
  function RenderTexture(gl) {
    this.gl = gl;
    this.width = 0;
    this.height = 0;
    this.handle = null;
    this.glFrameBuffer = null;
    this.glDepthBuffer = null;
  }

  RenderTexture.prototype.load = function (width, height) {
    this.width = width;
    this.height = height; // Create an opengl texture

    this.handle = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.handle);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null); // create the framebuffer

    this.glFrameBuffer = this.gl.createFramebuffer();
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.glFrameBuffer);
    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.handle, 0);
    this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0]); // checck if everything was successfull

    var frameBufferStatus = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
    if (frameBufferStatus != this.gl.FRAMEBUFFER_COMPLETE) return false; // restore things back to normal

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    return true;
  };

  RenderTexture.prototype.destroy = function () {
    this.gl.deleteFramebuffer(this.glFrameBuffer);
    this.gl.deleteTexture(this.handle);
  };

  RenderTexture.prototype.enable = function () {
    RenderTexture.enableRenderTarget(this.gl, this);
  };

  RenderTexture.prototype.disable = function () {
    RenderTexture.disableRenderTarget(this.gl);
  };

  RenderTexture.enableRenderTarget = function (gl, target) {
    RenderTexture.rendetTargetStack.push(target);
    var currentRenderTarget = RenderTexture.currentRenderTarget();
    gl.bindFramebuffer(gl.FRAMEBUFFER, currentRenderTarget.glFrameBuffer);
    gl.viewport(0, 0, currentRenderTarget.width, currentRenderTarget.height);
  };

  RenderTexture.disableRenderTarget = function (gl) {
    if (RenderTexture.rendetTargetStack.length > 1) RenderTexture.rendetTargetStack.pop();
    var currentRenderTarget = RenderTexture.currentRenderTarget();
    gl.bindFramebuffer(gl.FRAMEBUFFER, currentRenderTarget.glFrameBuffer);
    gl.viewport(0, 0, currentRenderTarget.width, currentRenderTarget.height);
  };

  RenderTexture.currentRenderTarget = function () {
    var _a;

    return (_a = RenderTexture.rendetTargetStack[RenderTexture.rendetTargetStack.length - 1]) !== null && _a !== void 0 ? _a : null;
  };

  RenderTexture.rendetTargetStack = [];
  return RenderTexture;
}();

exports.RenderTexture = RenderTexture;
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

var renderTexture_1 = require("./renderTexture");

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
    this.saveState(true); // load shader

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
    var renderTarget = renderTexture_1.RenderTexture.currentRenderTarget(); // setup 2d projection matrix

    if (renderTarget == null) this.projection = math_1.Mat4.orthographicProjection(0, this.canvas.width, this.canvas.height, 0, 0, 100);else this.projection = math_1.Mat4.orthographicProjection(0, renderTarget.width, renderTarget.height, 0, 0, 100);
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
    this.saveState(true); //console.log(`Flushes: ${this.numFlushes}`);

    this.numFlushes = 0;
  };

  Renderer2d.prototype.darwRect = function (xPos, yPos, width, height, rot, xOrigin, yOrigin) {
    var _a, _b, _c;

    if (this.shouldFlush()) this.flushBatch();
    var state = this.renderState[this.renderState.length - 1];
    var textureId = this.useTexture((_a = state.texture) !== null && _a !== void 0 ? _a : this.blankTexture);
    var color = (_b = state.color) !== null && _b !== void 0 ? _b : [math_1.Vec4.ONE, math_1.Vec4.ONE, math_1.Vec4.ONE, math_1.Vec4.ONE];
    var uvRect = (_c = state.uvRect) !== null && _c !== void 0 ? _c : new math_1.Rect(0, 0, 1, 1);
    var transform = mat3_1.Mat3.mul(mat3_1.Mat3.mul(mat3_1.Mat3.scale(width, height), mat3_1.Mat3.rotation(rot)), mat3_1.Mat3.translation(xPos, yPos)); // calculate the position for each of the quads

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

  Renderer2d.prototype.clear = function (r, b, g, a) {
    if (r === void 0) {
      r = 1;
    }

    if (b === void 0) {
      b = 1;
    }

    if (g === void 0) {
      g = 1;
    }

    if (a === void 0) {
      a = 1;
    }

    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
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
},{"../math":"engine/math/index.ts","./texture":"engine/graphics/texture.ts","./shader":"engine/graphics/shader.ts","../math/mat3":"engine/math/mat3.ts","./renderTexture":"engine/graphics/renderTexture.ts"}],"engine/utils/timer.ts":[function(require,module,exports) {
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

var renderTexture_1 = require("./graphics/renderTexture");

var App =
/** @class */
function () {
  function App(htmlCanvasId) {
    this.animationFrameToken = null;
    this.canvas = document.getElementById(htmlCanvasId);
    this.resize();
    this.time = new frameTimer_1.FrameTimer();
    this.gl = this.canvas.getContext("webgl2", {
      antialias: true
    });
    App.input = new inputManager_1.InputManager(this.canvas);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height); // create a fake render target reresenting the canvas

    var canvasRenderTarget = new renderTexture_1.RenderTexture(this.gl);
    canvasRenderTarget.width = this.canvas.width;
    canvasRenderTarget.height = this.canvas.height;
    canvasRenderTarget.enable();
    this.renderer2d = new renderer2d_1.Renderer2d(this.canvas, this.gl);
  }

  Object.defineProperty(App.prototype, "input", {
    get: function get() {
      return App.input;
    },
    enumerable: true,
    configurable: true
  });

  App.prototype.destroy = function () {
    cancelAnimationFrame(this.animationFrameToken);
    App.input.destroy();
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
    this.animationFrameToken = requestAnimationFrame(function () {
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
},{"./input/inputManager":"engine/input/inputManager.ts","./graphics/renderer2d":"engine/graphics/renderer2d.ts","./utils/frameTimer":"engine/utils/frameTimer.ts","./graphics/renderTexture":"engine/graphics/renderTexture.ts"}],"demos/lightBender/levels.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var math_1 = require("../../engine/math");

exports.levels = [// ========================================================================
// LEVEL 1
// ========================================================================
{
  tileSize: 55,
  rows: 8,
  cols: 8,
  startTile: [6, 4],
  map: [["0000", "0000", "0000", "1424", "0000", "0000", "0000", "0000"], ["0000", "0000", "0000", "0000", "0000", "0000", "0000", "0000"], ["0000", "0000", "0001", "0001", "0001", "0001", "0000", "0000"], ["1325", "0000", "0001", "0001", "0001", "0001", "0000", "0000"], ["0000", "0000", "0001", "0001", "0001", "0001", "0001", "0000"], ["0000", "0000", "0001", "0001", "0001", "0103", "0000", "0000"], ["0000", "0000", "0000", "0000", "0000", "0000", "0000", "0000"], ["0000", "0000", "0000", "0000", "0000", "0000", "0000", "0000"]],
  zones: [new math_1.Rect(2, 2, 4, 4)]
}, // ========================================================================
// LEVEL 2
// ========================================================================
{
  tileSize: 55,
  rows: 8,
  cols: 8,
  startTile: [6, 4],
  map: [["0000", "2324", "0000", "0000", "1424", "0000", "0000", "0000"], ["0000", "0000", "0000", "0000", "0000", "0000", "0000", "0000"], ["0000", "0000", "0001", "0001", "0001", "0001", "0000", "0000"], ["1325", "0000", "0001", "0001", "0001", "0001", "0000", "0000"], ["0000", "0000", "0001", "0001", "0001", "0001", "0001", "0000"], ["0000", "0000", "0001", "0001", "0001", "0103", "0000", "0000"], ["0000", "0000", "0000", "0000", "0000", "0000", "0000", "0000"], ["0000", "2000", "0000", "0000", "0000", "0000", "0000", "0000"]],
  zones: [new math_1.Rect(2, 2, 4, 4)]
}];
},{"../../engine/math":"engine/math/index.ts"}],"demos/lightBender/assets/tile-base.png":[function(require,module,exports) {
module.exports = "/tile-base.ebd03cfc.png";
},{}],"demos/lightBender/assets/NextLevelBtn.png":[function(require,module,exports) {
module.exports = "/NextLevelBtn.abedde18.png";
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


var tile_base_png_1 = __importDefault(require("./assets/tile-base.png"));

var NextLevelBtn_png_1 = __importDefault(require("./assets/NextLevelBtn.png"));

var texture_1 = require("../../engine/graphics/texture");

var lightColors = {
  1: new math_1.Vec4(255 / 255, 255 / 255, 255 / 255, 1),
  2: new math_1.Vec4(255 / 255, 138 / 255, 128 / 255, 1),
  3: new math_1.Vec4(43 / 255, 187 / 255, 173 / 255, 1),
  4: new math_1.Vec4(179 / 255, 136 / 255, 255 / 255, 1),
  5: new math_1.Vec4(149 / 255, 158 / 255, 255 / 255, 1),
  6: new math_1.Vec4(63 / 255, 114 / 255, 155 / 255, 1)
};
var TILE_DIR;

(function (TILE_DIR) {
  TILE_DIR[TILE_DIR["NONE"] = 0] = "NONE";
  TILE_DIR[TILE_DIR["LEFT"] = 1] = "LEFT";
  TILE_DIR[TILE_DIR["UP"] = 2] = "UP";
  TILE_DIR[TILE_DIR["RIGHT"] = 3] = "RIGHT";
  TILE_DIR[TILE_DIR["DOWN"] = 4] = "DOWN";
})(TILE_DIR || (TILE_DIR = {}));

var TILE_SHAPE;

(function (TILE_SHAPE) {
  TILE_SHAPE[TILE_SHAPE["NONE"] = 0] = "NONE";
  TILE_SHAPE[TILE_SHAPE["EMPTY"] = 1] = "EMPTY";
  TILE_SHAPE[TILE_SHAPE["SOLID"] = 2] = "SOLID";
  TILE_SHAPE[TILE_SHAPE["CORNER"] = 3] = "CORNER";
  TILE_SHAPE[TILE_SHAPE["EMITTER"] = 4] = "EMITTER";
  TILE_SHAPE[TILE_SHAPE["RECEIVER"] = 5] = "RECEIVER";
})(TILE_SHAPE || (TILE_SHAPE = {}));

var GameObject =
/** @class */
function () {
  function GameObject(parent) {
    if (parent === void 0) {
      parent = null;
    }

    this.parent = null;
    this.children = [];
    this.transform = math_1.Mat3.identity();
    this.lastTrasform = null;
    this._isDirty = false;
    this._dirtyCheck = false;
    this.setParent(parent);
  }

  Object.defineProperty(GameObject.prototype, "globalTransform", {
    get: function get() {
      var transform = this.parent ? math_1.Mat3.mul(this.transform, this.parent.globalTransform) : this.transform;
      return transform;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GameObject.prototype, "isDirty", {
    get: function get() {
      return this._isDirty;
    },
    enumerable: true,
    configurable: true
  });

  GameObject.prototype.update = function (dt) {
    var _a;

    if (this._dirtyCheck) {
      this._isDirty = ((_a = this.lastTrasform) === null || _a === void 0 ? void 0 : _a.equal(this.transform)) == false;
      this.lastTrasform = this.transform.copy();
    }
  };

  GameObject.prototype.draw = function (renderer2d) {};

  GameObject.prototype.setParent = function (newParent) {
    var _a, _b;

    (_a = this.parent) === null || _a === void 0 ? void 0 : _a.removeChild(this);
    this.parent = newParent;
    (_b = this.parent) === null || _b === void 0 ? void 0 : _b.addChild(this);
  };

  GameObject.prototype.checkForChangesPerFrame = function (doCheck) {
    this._dirtyCheck = doCheck;
    this._isDirty = true;
  };

  GameObject.prototype.removeChild = function (child) {
    var index = this.children.indexOf(child);
    if (index >= 0) this.children.splice(index, 1);
  };

  GameObject.prototype.addChild = function (child) {
    var index = this.children.indexOf(child);
    if (index < 0) this.children.push(child);
  };

  return GameObject;
}();

var Level =
/** @class */
function (_super) {
  __extends(Level, _super);

  function Level(data) {
    var _this = _super.call(this) || this;

    _this.tileTextures = {};
    _this.tiles = [];
    _this.movingTiles = new Set();
    _this.data = data;
    return _this;
  }

  Level.prototype.posToIndex = function (pos) {
    var x = Math.floor(pos.x / this.data.tileSize);
    var y = Math.floor(pos.y / this.data.tileSize);
    return new math_1.Vec2(x, y);
  };

  Level.prototype.indexToPos = function (index) {
    var hs = this.data.tileSize * 0.5;
    var x = Math.floor(index.x * this.data.tileSize + hs);
    var y = Math.floor(index.y * this.data.tileSize + hs);
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

  Level.prototype.findTileAtIndex = function (index) {
    var e_2, _a;

    try {
      for (var _b = __values(this.tiles), _c = _b.next(); !_c.done; _c = _b.next()) {
        var t = _c.value;
        var ti = this.posToIndex(t.transform.pos);
        if (ti.x === index.x && ti.y == index.y) return t;
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

  Level.prototype.update = function (dt) {
    _super.prototype.update.call(this, dt);
  };

  Level.prototype.draw = function () {};

  return Level;
}(GameObject);

var Tile =
/** @class */
function (_super) {
  __extends(Tile, _super);

  function Tile(level, lightId, shapeId, dirId, colorId) {
    var _this = _super.call(this, level) || this;

    _this.shapeGeometry = null;
    _this.isMovingToTarget = false;
    _this.level = level;
    _this.lightId = lightId;
    _this.shapeId = shapeId;
    _this.dirId = dirId;
    _this.colorId = colorId;
    return _this;
  }

  Tile.prototype.update = function (dt) {
    _super.prototype.update.call(this, dt);

    this.moveToTargetPos(dt);
    this.updateShapeGeometry();
  };

  Tile.prototype.draw = function (renderer) {};

  Tile.prototype.drawShapeGeometry = function (renderer) {
    if (this.shapeGeometry) {
      renderer.setColor(new math_1.Vec4(1, 1, 1, 1));
      renderer.drawLines(this.shapeGeometry.points, 2);
    }
  };

  Tile.prototype.updateShapeGeometry = function () {
    if (this.shapeGeometry) {
      var gt = this.globalTransform;
      var updatedShape = Tile.createTileShape(this.shapeId, gt.pos.x, gt.pos.y, this.level.data.tileSize * 0.6, this.level.data.tileSize * 0.6, Tile.tileRotation(this.dirId));
      this.shapeGeometry.points = updatedShape.points;
    }
  };

  Tile.prototype.moveToTargetPos = function (dt) {
    if (this.isMovingToTarget === false) return;
    var size = this.level.data.tileSize;
    var speed = 6;
    var moveDir = math_1.Vec2.sub(this.targetPos, this.transform.pos).normalise();
    this.transform.move(moveDir.x * dt * size * speed, moveDir.y * dt * size * speed); // snap the position to target when its close enough.

    if (Math.abs(this.transform.pos.x - this.targetPos.x) < 4) this.transform.setPosX(this.targetPos.x);
    if (Math.abs(this.transform.pos.y - this.targetPos.y) < 4) this.transform.setPosY(this.targetPos.y); // check if we are at the target position

    if (this.transform.pos.x == this.targetPos.x && this.transform.pos.y == this.targetPos.y) {
      this.isMovingToTarget = false;
      if (this.onMoveFinished) this.onMoveFinished(this);
    }
  };

  Tile.prototype.move = function (dir) {
    var index = this.level.posToIndex(this.transform.pos).add(dir);
    this.targetPos = this.level.indexToPos(index);
    this, this.isMovingToTarget = true;
  };

  Tile.prototype.moveWith = function (dir, withIndex) {
    var index = this.level.posToIndex(this.transform.pos);

    if (index.y == withIndex.y && dir.x !== 0 || index.x == withIndex.x && dir.y !== 0) {
      this.move(dir);
      return true;
    }

    return false;
  };

  Tile.tileRotation = function (shape) {
    switch (shape) {
      case TILE_DIR.RIGHT:
        return 0;

      case TILE_DIR.DOWN:
        return Math.PI / 2;
      // 90 deg cw

      case TILE_DIR.LEFT:
        return Math.PI;
      // 180 deg cw

      case TILE_DIR.UP:
        return Math.PI + Math.PI / 2;
      // 270 deg cw

      default:
        return 0;
    }
  };

  Tile.createTileShape = function (shape, xPos, yPos, width, height, rot) {
    switch (shape) {
      case TILE_SHAPE.SOLID:
        return math_1.Shape.makeBox(xPos, yPos, width, height, rot, false);

      case TILE_SHAPE.EMITTER:
      case TILE_SHAPE.RECEIVER:
        return math_1.Shape.makeBox(xPos, yPos, width, height, rot, true);

      case TILE_SHAPE.CORNER:
        return math_1.Shape.makeAngleTriangle(xPos, yPos, width, height, rot);

      default:
        return null;
    }
  };

  Tile.tileGeometries = [];
  return Tile;
}(GameObject);

var BlockTile =
/** @class */
function (_super) {
  __extends(BlockTile, _super);

  function BlockTile(level, lightId, shapeId, dirId, colorId) {
    var _a;

    var _this = _super.call(this, level, lightId, shapeId, dirId, colorId) || this;

    var rot = Tile.tileRotation(dirId);
    _this.shapeGeometry = Tile.createTileShape(_this.shapeId, _this.transform.pos.x, _this.transform.pos.y, _this.level.data.tileSize, _this.level.data.tileSize, rot);

    if (((_a = _this.shapeGeometry) === null || _a === void 0 ? void 0 : _a.points.length) > 0) {
      _this.checkForChangesPerFrame(true);

      Tile.tileGeometries.push(_this.shapeGeometry);
    }

    return _this;
  }

  BlockTile.prototype.draw = function (renderer) {
    var gt = this.globalTransform;
    var pos = gt.pos;
    var scale = gt.scale;
    var tsx = this.level.data.tileSize * scale.x;
    var tsy = this.level.data.tileSize * scale.y; // what about if the global transform has rotated... add rotation?

    var rot = Tile.tileRotation(this.dirId);
    renderer.setColor(new math_1.Vec4(1, 1, 1, 0.5));
    renderer.setTexture(this.level.tileTextures[1]);
    renderer.darwRect(pos.x, pos.y, tsx, tsy, rot, 0.5, 0.5);
    this.drawShapeGeometry(renderer);
  };

  return BlockTile;
}(Tile);

var EmitterTile =
/** @class */
function (_super) {
  __extends(EmitterTile, _super);

  function EmitterTile(level, lightId, shapeId, dirId, colorId) {
    var _a;

    var _this = _super.call(this, level, lightId, shapeId, dirId, colorId) || this;

    _this.lightRays = [];
    _this.allLightRays = [];
    var rot = Tile.tileRotation(_this.dirId);
    _this.shapeGeometry = Tile.createTileShape(_this.shapeId, _this.transform.pos.x, _this.transform.pos.y, _this.level.data.tileSize, _this.level.data.tileSize, rot);

    if (((_a = _this.shapeGeometry) === null || _a === void 0 ? void 0 : _a.points.length) > 0) {
      _this.checkForChangesPerFrame(true);

      Tile.tileGeometries.push(_this.shapeGeometry);
    }

    return _this;
  }

  Object.defineProperty(EmitterTile.prototype, "color", {
    get: function get() {
      var _a;

      return (_a = lightColors[this.colorId]) !== null && _a !== void 0 ? _a : new math_1.Vec4(1, 1, 1, 1);
    },
    enumerable: true,
    configurable: true
  });

  EmitterTile.prototype.update = function (dt) {
    _super.prototype.update.call(this, dt);
  };

  EmitterTile.prototype.updateLights = function (dt) {
    var _a;

    var gt = this.globalTransform;
    var rayDir = this.dirToVec(this.dirId);
    var rayOffset = math_1.Vec2.negate(rayDir).scale(6);
    gt.move(rayOffset.x, rayOffset.y);

    if (this.shapeId == TILE_SHAPE.EMITTER) {
      this.lightRays = this.makeRayLine(gt.pos, rayDir, 4, 3);
      this.allLightRays = [];

      for (var i = 0; i < this.lightRays.length; i++) {
        var r = this.lightRays[i];
        r.castToShapes(Tile.tileGeometries, 10);

        (_a = this.allLightRays).push.apply(_a, __spread(r.rays()));
      }
    }
  };

  EmitterTile.prototype.draw = function (renderer) {
    _super.prototype.draw.call(this, renderer);

    var gt = this.globalTransform;
    var pos = gt.pos;
    var scale = gt.scale;
    var tsx = this.level.data.tileSize * scale.x;
    var tsy = this.level.data.tileSize * scale.y;
    renderer.saveState(true);
    var color = new math_1.Vec4(this.color.x, this.color.y, this.color.z, 1);
    renderer.setColor(color);
    renderer.darwRect(pos.x, pos.y, tsx / 2, tsy / 2, 0, 0.5, 0.5);
    this.drawLight(renderer);
    renderer.setColor(new math_1.Vec4(0, 0, 0, 1));
    this.drawShapeGeometry(renderer);
    renderer.popState();
  };

  EmitterTile.prototype.drawLight = function (renderer) {
    var e_3, _a;

    var _b, _c;

    var color = new math_1.Vec4(this.color.x, this.color.y, this.color.z, 0.5);
    renderer.saveState();
    renderer.setColor(color);

    try {
      for (var _d = __values(this.allLightRays), _e = _d.next(); !_e.done; _e = _d.next()) {
        var r = _e.value;
        var d = Math.min((_c = (_b = r.hit) === null || _b === void 0 ? void 0 : _b.distance) !== null && _c !== void 0 ? _c : 2000);
        var p0 = r.pos;
        var p1 = math_1.Vec2.mul(r.dir, {
          x: d,
          y: d
        }).add(r.pos);
        renderer.drawLine(p0.x, p0.y, p1.x, p1.y, 3); // renderer.darwRect(tp0.x, tp0.y, 10, 10, 0, 0.5, 0.5);
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
      } finally {
        if (e_3) throw e_3.error;
      }
    }

    renderer.popState();
  };

  EmitterTile.prototype.dirToVec = function (dir) {
    switch (dir) {
      case TILE_DIR.LEFT:
        return new math_1.Vec2(-1, 0);

      case TILE_DIR.UP:
        return new math_1.Vec2(0, -1);

      case TILE_DIR.RIGHT:
        return new math_1.Vec2(1, 0);

      case TILE_DIR.DOWN:
        return new math_1.Vec2(0, 1);

      default:
        return new math_1.Vec2(0, 0);
    }
  };

  EmitterTile.prototype.makeRayLine = function (pos, dir, count, spacing) {
    var rays = [];
    var pDir = math_1.Vec2.perpendicular(dir);
    var min = Math.ceil(count / 2);
    var max = Math.ceil(count / 2);

    for (var i = -min; i <= max; i++) {
      rays.push(new math_1.Ray(math_1.Vec2.add(pos, math_1.Vec2.scale(pDir, i * spacing)), dir));
    }

    return rays;
  };

  return EmitterTile;
}(Tile);

var LightBender =
/** @class */
function (_super) {
  __extends(LightBender, _super);

  function LightBender(htmlCanvasId) {
    var _this = _super.call(this, htmlCanvasId) || this;

    _this.currentLevelIndex = 0;
    _this.tileTextures = {};
    _this.elapsedTime = 0;
    _this.world = new GameObject(null);

    _this.world.transform.setPos(_this.canvas.width / 2, _this.canvas.height / 2);

    _this.currentLevelIndex = 0;

    _this.loadLevelbyIndex(0);

    return _this;
  }

  LightBender.prototype.loadAssets = function () {
    return __awaiter(this, void 0, Promise, function () {
      var nextLevelBtnTexture;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , _super.prototype.loadAssets.call(this)];

          case 1:
            _a.sent();

            this.tileTextures[0] = null;
            this.tileTextures[TILE_SHAPE.EMPTY] = new texture_1.Texture2D(this.gl);
            this.tileTextures[TILE_SHAPE.EMPTY].load(tile_base_png_1.default);
            nextLevelBtnTexture = new texture_1.Texture2D(this.gl);
            return [4
            /*yield*/
            , nextLevelBtnTexture.load(NextLevelBtn_png_1.default)];

          case 2:
            _a.sent();

            this.nextLevelBtn = new Button(this.gl, nextLevelBtnTexture);
            this.nextLevelBtn.xPos = this.canvas.width - nextLevelBtnTexture.width - 10;
            this.nextLevelBtn.yPos = 100;

            this.nextLevelBtn.onClick = function () {
              _this.currentLevelIndex += 1;

              _this.loadLevelbyIndex(_this.currentLevelIndex);
            };

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  LightBender.prototype.loadLevelbyIndex = function (index) {
    this.currentLevel = new Level(levels_1.levels[index]);
    this.currentLevel.tileTextures = this.tileTextures;
    this.currentLevel.setParent(this.world);
    Tile.tileGeometries = [];
    this.loadLevel();
  };

  LightBender.prototype.update = function () {
    var e_4, _a, e_5, _b;

    _super.prototype.update.call(this);

    var kb = this.input.keyboard;
    var inputDir = new math_1.Vec2(0, 0);
    this.elapsedTime += this.time.deltaTime;
    if (kb.wasKeyPressed(38)) inputDir.y = -1; // up arrow
    else if (kb.wasKeyPressed(40)) inputDir.y = 1; // down arrow
      else if (kb.wasKeyPressed(37)) inputDir.x = -1; // left arrow
        else if (kb.wasKeyPressed(39)) inputDir.x = 1; // right arrow

    if (inputDir.x !== 0 || inputDir.y !== 0) {
      this.moveActiveTile(inputDir);
    }

    try {
      // update movement of all tiles
      for (var _c = __values(this.currentLevel.tiles), _d = _c.next(); !_d.done; _d = _c.next()) {
        var t = _d.value;
        t.update(this.time.deltaTime);
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
      } finally {
        if (e_4) throw e_4.error;
      }
    }

    try {
      // update the lights
      for (var _e = __values(this.currentLevel.tiles), _f = _e.next(); !_f.done; _f = _e.next()) {
        var t = _f.value;
        if (t instanceof EmitterTile) t.updateLights(this.time.deltaTime);
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
      } finally {
        if (e_5) throw e_5.error;
      }
    } // update the next level btn


    this.nextLevelBtn.update(this.time.deltaTime, this.input.mouse);
  };

  LightBender.prototype.draw = function () {
    _super.prototype.draw.call(this);

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.renderer2d.begin();
    this.drawBackgroundGrid();
    this.drawTiles();
    this.nextLevelBtn.draw(this.renderer2d);
    this.renderer2d.end();
  };

  LightBender.prototype.drawBackgroundGrid = function () {
    var gt = this.currentLevel.globalTransform;
    var pos = gt.pos;
    var scale = gt.scale;
    var tsx = this.currentLevel.data.tileSize * scale.x;
    var tsy = this.currentLevel.data.tileSize * scale.y;
    var minX = 0;
    var minY = 0;
    var maxX = this.currentLevel.data.cols;
    var maxY = this.currentLevel.data.rows;
    this.renderer2d.saveState(true); // draw background:

    var oc = new math_1.Vec4(255 / 255, 255 / 255, 255 / 255, 0.2);
    var colors = [new math_1.Vec4(oc.x, oc.y, oc.z, 0), new math_1.Vec4(oc.x, oc.y, oc.z, oc.w), new math_1.Vec4(oc.x, oc.y, oc.z, oc.w), new math_1.Vec4(oc.x, oc.y, oc.z, 0)]; // vertical lines

    for (var i = minX + 2; i <= maxX - 2; i++) {
      var points = [new math_1.Vec2(pos.x + i * tsx, pos.y + (minY + 0) * tsy), new math_1.Vec2(pos.x + i * tsx, pos.y + (minY + 2) * tsy), new math_1.Vec2(pos.x + i * tsx, pos.y + (maxY - 2) * tsy), new math_1.Vec2(pos.x + i * tsx, pos.y + (maxY - 0) * tsy)];
      this.renderer2d.drawLines(points, 1, colors);
    } // horizontal


    for (var i = minY + 2; i <= maxY - 2; i++) {
      var points = [new math_1.Vec2(pos.x + (minX + 0) * tsx, pos.y + i * tsy), new math_1.Vec2(pos.x + (minX + 2) * tsx, pos.y + i * tsy), new math_1.Vec2(pos.x + (maxX - 2) * tsx, pos.y + i * tsy), new math_1.Vec2(pos.x + (maxX - 0) * tsx, pos.y + i * tsy)];
      this.renderer2d.drawLines(points, 1, colors);
    }

    this.renderer2d.popState();
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
    var e_6, _a;

    var _this = this;

    if (this.currentLevel.movingTiles.size > 0 || this.currentLevel.activeTile === null) return;
    var activeTileIndex = this.currentLevel.posToIndex(this.currentLevel.activeTile.transform.pos);
    var targetTileIndex = math_1.Vec2.add(activeTileIndex, dir);
    var zone = this.currentLevel.inZone(targetTileIndex);

    var moveTileFinishedFunc = function moveTileFinishedFunc(tile) {
      _this.currentLevel.movingTiles.delete(tile);

      tile.onMoveFinished = null;

      var index = _this.currentLevel.posToIndex(tile.transform.pos);

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
        var ti = this.currentLevel.posToIndex(t.transform.pos);

        if (zone.contains(ti) && t.moveWith(dir, activeTileIndex)) {
          this.currentLevel.movingTiles.add(t);
          t.onMoveFinished = moveTileFinishedFunc;
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

  LightBender.prototype.loadLevel = function () {
    var level = this.currentLevel; // const layout = level.data.layout;
    // const lights = level.data.lights;

    var map = level.data.map;
    var shapeIndex = 3;
    var colorIndex = 2;
    var dirIndex = 1;
    var lightIndex = 0;
    var tileSize = level.data.tileSize;
    var levelWidth = tileSize * level.data.rows;
    var levelHeight = tileSize * level.data.cols; // move the level position back
    // so that it is positioned in the scenter of the..
    // might need need to adjust this if we plan on preforming level rotations.

    level.transform.move(-levelWidth / 2, -levelHeight / 2);
    var cols = level.data.cols;
    var rows = level.data.rows;

    for (var yi = 0; yi < rows; yi++) {
      for (var xi = 0; xi < cols; xi++) {
        var lightId = parseInt(map[yi][xi][lightIndex]);
        var dirId = parseInt(map[yi][xi][dirIndex]);
        var colorId = parseInt(map[yi][xi][colorIndex]);
        var shapeId = parseInt(map[yi][xi][shapeIndex]);
        var tile = this.createTile(level, xi, yi, lightId, shapeId, dirId, colorId);

        if (tile) {
          level.tiles.push(tile);
        }

        if (level.data.startTile[0] == xi && level.data.startTile[1] == yi) level.activeTile = tile;
      }
    }
  };

  LightBender.prototype.createTile = function (level, xIndex, yIndex, lightId, shapeId, dirId, colorId) {
    var tileSize = level.data.tileSize;
    var hTileSize = tileSize / 2;
    var tile = null;

    switch (shapeId) {
      case TILE_SHAPE.NONE:
        return;

      case TILE_SHAPE.EMPTY:
      case TILE_SHAPE.CORNER:
      case TILE_SHAPE.SOLID:
        tile = new BlockTile(level, lightId, shapeId, dirId, colorId);
        break;

      case TILE_SHAPE.RECEIVER:
      case TILE_SHAPE.EMITTER:
        tile = new EmitterTile(level, lightId, shapeId, dirId, colorId);
        break;

      default:
        return;
    }

    var tilePos = new math_1.Vec2(xIndex * tileSize + hTileSize, yIndex * tileSize + hTileSize);
    tile.transform.setPos(tilePos.x, tilePos.y);
    return tile;
  };

  return LightBender;
}(app_1.App);

exports.LightBender = LightBender;

var Button =
/** @class */
function () {
  function Button(gl, texture) {
    this.gl = gl;
    this.texture = texture;
    this.mouseOver = false;
  }

  Button.prototype.update = function (dt, mouseInput) {
    var mx = mouseInput.pos.x;
    var my = mouseInput.pos.y;
    this.mouseOver = mx > this.xPos && mx < this.xPos + this.texture.width && my > this.yPos && my < this.yPos + this.texture.height;
    if (this.mouseOver && mouseInput.leftButtonDown && this.onClick) this.onClick();
  };

  Button.prototype.draw = function (renderer) {
    renderer.saveState(true);
    renderer.setTexture(this.texture);
    renderer.setColor(this.mouseOver ? new math_1.Vec4(1, 1, 1, 0.8) : new math_1.Vec4(1, 1, 1, 0.6));
    renderer.darwRect(this.xPos, this.yPos, this.texture.width, this.texture.height, 0, 0, 0);
    renderer.popState();
  };

  return Button;
}();
},{"../../engine/app":"engine/app.ts","../../engine/math":"engine/math/index.ts","./levels":"demos/lightBender/levels.ts","./assets/tile-base.png":"demos/lightBender/assets/tile-base.png","./assets/NextLevelBtn.png":"demos/lightBender/assets/NextLevelBtn.png","../../engine/graphics/texture":"engine/graphics/texture.ts"}],"demos/rayCasting/index.ts":[function(require,module,exports) {
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

            this.polygons.push(math_1.Shape.makeBox(this.canvas.width / 2, this.canvas.height / 2, right - left, bottom - top, 0));
            this.polygons.push(math_1.Shape.makeBox(this.canvas.width / 2, this.canvas.height / 2, ww, wh, 0)); // this.polygons.push( Shape.makeLine(200, 100, 200, 400));
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

    var s = this.elapsedTime * 0.25;
    this.rays = this.makeRayLine(this.input.mouse.pos, new math_1.Vec2(Math.cos(s), Math.sin(s)), 10, 3); // this.rays = this.makeRaysToShapes(this.input.mouse.pos.x, this.input.mouse.pos.y, this.polygons);
    // this.rays = this.makeRayFan(this.input.mouse.pos.x, this.input.mouse.pos.y, 64);

    this.rayHits = [];
    this.allRays = [];

    for (var i = 0; i < this.rays.length; i++) {
      var r = this.rays[i];
      r.castToShapes(this.polygons, 5);

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

    this.drawRays(this.allRays);
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
    var min = -Math.floor(count / 2);
    var max = Math.ceil(count / 2);

    for (var i = min; i < max; i++) {
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
},{"../../engine/app":"engine/app.ts","../../engine/math":"engine/math/index.ts"}],"assets/prop-crate-plain.png":[function(require,module,exports) {
module.exports = "/prop-crate-plain.a7165fa2.png";
},{}],"demos/renderTextureDemo/index.ts":[function(require,module,exports) {
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

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var prop_crate_plain_png_1 = __importDefault(require("../../assets/prop-crate-plain.png"));

var texture_1 = require("../../engine/graphics/texture");

var app_1 = require("../../engine/app");

var math_1 = require("../../engine/math");

var renderTexture_1 = require("../../engine/graphics/renderTexture");

var RenderTextureDemo =
/** @class */
function (_super) {
  __extends(RenderTextureDemo, _super);

  function RenderTextureDemo(htmlCanvasId) {
    var _this = _super.call(this, htmlCanvasId) || this;

    _this.rot = 0;
    return _this;
  }

  RenderTextureDemo.prototype.loadAssets = function () {
    return __awaiter(this, void 0, Promise, function () {
      var renderTextureSize;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , _super.prototype.loadAssets.call(this)];

          case 1:
            _a.sent();

            this.image = new texture_1.Texture2D(this.gl);
            this.image.load(prop_crate_plain_png_1.default);
            this.renderTexture = new renderTexture_1.RenderTexture(this.gl);
            renderTextureSize = Math.min(this.canvas.width / 4, 256);
            this.renderTexture.load(renderTextureSize, renderTextureSize);
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  RenderTextureDemo.prototype.update = function () {
    _super.prototype.update.call(this);

    this.rot += this.time.deltaTime;
  };

  RenderTextureDemo.prototype.draw = function () {
    _super.prototype.draw.call(this);

    var size = this.renderTexture.width; // Draw an image onto the render target
    // ================================================

    this.renderTexture.enable();
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.renderer2d.begin();
    this.renderer2d.saveState(true);
    this.renderer2d.setTexture(this.image);
    this.renderer2d.setColor(new math_1.Vec4(1, 1, 1, 1));
    this.renderer2d.darwRect(size / 2, size / 2, size * 0.75, size * 0.75, this.rot, 0.5, 0.5);
    this.renderer2d.drawLines(math_1.Shape.makeBox(size / 2, size / 2, size - 2, size - 2, 0).points, 2);
    this.renderer2d.popState();
    this.renderer2d.end();
    this.renderTexture.disable(); // ================================================
    // draw the render target image back to the canvas
    //================================================

    this.renderer2d.begin();
    this.renderer2d.saveState(true);
    this.renderer2d.setTexture(this.renderTexture);
    this.renderer2d.setColor(new math_1.Vec4(1, 1, 1, 1));
    this.renderer2d.darwRect(this.canvas.width / 2 - size - 10, this.canvas.height / 2, size, size, 0, 0.5, 0.5);
    this.renderer2d.setColor(new math_1.Vec4(0, 0, 0, 1));
    this.renderer2d.darwRect(this.canvas.width / 2, this.canvas.height / 2, size, size, 0, 0.5, 0.5);
    this.renderer2d.setColor(new math_1.Vec4(1, 0, 0, 1));
    this.renderer2d.darwRect(this.canvas.width / 2 + size + 10, this.canvas.height / 2, size, size, 0, 0.5, 0.5);
    this.renderer2d.popState();
    this.renderer2d.end();
  };

  return RenderTextureDemo;
}(app_1.App);

exports.RenderTextureDemo = RenderTextureDemo;
},{"../../assets/prop-crate-plain.png":"assets/prop-crate-plain.png","../../engine/graphics/texture":"engine/graphics/texture.ts","../../engine/app":"engine/app.ts","../../engine/math":"engine/math/index.ts","../../engine/graphics/renderTexture":"engine/graphics/renderTexture.ts"}],"demos/rectRotation/index.ts":[function(require,module,exports) {
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

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var prop_crate_plain_png_1 = __importDefault(require("../../assets/prop-crate-plain.png"));

var texture_1 = require("../../engine/graphics/texture");

var app_1 = require("../../engine/app");

var math_1 = require("../../engine/math");

var RectRotationDemo =
/** @class */
function (_super) {
  __extends(RectRotationDemo, _super);

  function RectRotationDemo(htmlCanvasId) {
    var _this = _super.call(this, htmlCanvasId) || this;

    _this.rot = 0;
    return _this;
  }

  RectRotationDemo.prototype.loadAssets = function () {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , _super.prototype.loadAssets.call(this)];

          case 1:
            _a.sent();

            this.image = new texture_1.Texture2D(this.gl);
            this.image.load(prop_crate_plain_png_1.default);
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  RectRotationDemo.prototype.update = function () {
    _super.prototype.update.call(this);

    this.rot += this.time.deltaTime;
  };

  RectRotationDemo.prototype.draw = function () {
    _super.prototype.draw.call(this);

    var ww = this.canvas.width;
    var wh = this.canvas.height;
    var aw = ww / 1.5;
    var ah = wh / 1.5;
    var as = Math.min(aw, ah) - 75;
    var left = ww / 2 - as / 2;
    var right = ww / 2 + as / 2;
    var top = wh / 2 - as / 2;
    var bottom = wh / 2 + as / 2;
    this.renderer2d.begin();
    var w = 75;
    var h = 75;
    this.renderer2d.saveState(true);
    this.renderer2d.setTexture(this.image);
    this.renderer2d.setColor(new math_1.Vec4(1, 1, 1, 1)); // this.renderer2d.darwRect(100, 100, this.canvas.width - 200, this.canvas.height - 200, 0, 0, 0);
    // draw boxes rotating various pivot poitns

    this.renderer2d.darwRect(left, top, w, h, this.rot, 0, 0);
    this.renderer2d.darwRect((left + right) / 2, top, w, h, this.rot, 0.5, 0);
    this.renderer2d.darwRect(right, top, w, h, this.rot, 1, 0);
    this.renderer2d.darwRect(left, (top + bottom) / 2, w, h, this.rot, 0, 0.5);
    this.renderer2d.darwRect((left + right) / 2, (top + bottom) / 2, w, h, this.rot, 0.5, 0.5);
    this.renderer2d.darwRect(right, (top + bottom) / 2, w, h, this.rot, 1, 0.5);
    this.renderer2d.darwRect(left, bottom, w, h, this.rot, 0, 1);
    this.renderer2d.darwRect((left + right) / 2, bottom, w, h, this.rot, 0.5, 1);
    this.renderer2d.darwRect(right, bottom, w, h, this.rot, 1, 1);
    this.renderer2d.popState();
    this.renderer2d.saveState();
    this.renderer2d.setColor(new math_1.Vec4(1, 1, 1, 0.5)); // draw lines to show pivot points

    var lineThickness = 3;
    this.renderer2d.drawLine(left, top, right, top, lineThickness);
    this.renderer2d.drawLine(left, (bottom + top) / 2, right, (bottom + top) / 2, lineThickness);
    this.renderer2d.drawLine(left, bottom, right, bottom, lineThickness);
    this.renderer2d.drawLine(left, top, left, bottom, lineThickness);
    this.renderer2d.drawLine((left + right) / 2, top, (left + right) / 2, bottom, lineThickness);
    this.renderer2d.drawLine(right, top, right, bottom, lineThickness);
    this.renderer2d.end();
  };

  return RectRotationDemo;
}(app_1.App);

exports.RectRotationDemo = RectRotationDemo;
},{"../../assets/prop-crate-plain.png":"assets/prop-crate-plain.png","../../engine/graphics/texture":"engine/graphics/texture.ts","../../engine/app":"engine/app.ts","../../engine/math":"engine/math/index.ts"}],"engine/graphics/renderTarget.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var renderTexture_1 = require("./renderTexture");

var RenderTarget =
/** @class */
function () {
  function RenderTarget() {}

  Object.defineProperty(RenderTarget, "current", {
    get: function get() {
      var len = renderTexture_1.RenderTexture.rendetTargetStack.length;
      return renderTexture_1.RenderTexture.rendetTargetStack[len - 1];
    },
    enumerable: true,
    configurable: true
  });
  return RenderTarget;
}();

exports.RenderTarget = RenderTarget;
},{"./renderTexture":"engine/graphics/renderTexture.ts"}],"demos/lightBender/editor.ts":[function(require,module,exports) {
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

var prop_crate_plain_png_1 = __importDefault(require("../../assets/prop-crate-plain.png"));

var texture_1 = require("../../engine/graphics/texture");

var app_1 = require("../../engine/app");

var math_1 = require("../../engine/math");

var renderTarget_1 = require("../../engine/graphics/renderTarget");

var mouseInput_1 = require("../../engine/input/mouseInput"); // texture imports


var tile_base_png_1 = __importDefault(require("./assets/tile-base.png"));

var TILE_DIR;

(function (TILE_DIR) {
  TILE_DIR["NONE"] = "0";
  TILE_DIR["LEFT"] = "1";
  TILE_DIR["UP"] = "2";
  TILE_DIR["RIGHT"] = "3";
  TILE_DIR["DOWN"] = "4";
})(TILE_DIR || (TILE_DIR = {}));

var TILE_TYPE;

(function (TILE_TYPE) {
  TILE_TYPE["EMPTY"] = "0";
  TILE_TYPE["SOLID"] = "1";
  TILE_TYPE["CORNER"] = "2";
  TILE_TYPE["EMITTER"] = "3";
  TILE_TYPE["RECEIVER"] = "4";
})(TILE_TYPE || (TILE_TYPE = {}));

var LIGHT_COLORS = {
  '0': new math_1.Vec4(255 / 255, 255 / 255, 255 / 255, 1),
  '1': new math_1.Vec4(255 / 255, 138 / 255, 128 / 255, 1),
  '2': new math_1.Vec4(43 / 255, 187 / 255, 173 / 255, 1),
  '3': new math_1.Vec4(179 / 255, 136 / 255, 255 / 255, 1),
  '4': new math_1.Vec4(149 / 255, 158 / 255, 255 / 255, 1),
  '5': new math_1.Vec4(63 / 255, 114 / 255, 155 / 255, 1)
};

var Tile =
/** @class */
function () {
  function Tile(level, data, pos) {
    this.level = null;
    this.data = null;
    this.pos = new math_1.Vec2();
    this.rot = Math.PI;
    this.collider = null;
    this.level = level;
    this.data = data;
    this.pos = pos;
    this.rot = Tile.tileRotation(this.data.dirId);
    this.level.tiles.push(this);
  }

  Object.defineProperty(Tile.prototype, "index", {
    get: function get() {
      return this.level.posToIndex(this.pos);
    },
    enumerable: true,
    configurable: true
  });

  Tile.prototype.update = function () {
    this.level.moveTile(this, this.index, this.index);
    this.updateCollider();
  };

  Tile.prototype.updateCollider = function () {
    this.collider = Tile.createTileShape(this.data.shapeId, this.pos.x, this.pos.y, this.level.tWidth, this.level.tHeight, this.rot);
  };

  Tile.prototype.draw = function (renderer) {
    renderer.saveState(true);
    renderer.setTexture(Tile.textures[0]);
    renderer.darwRect(this.pos.x, this.pos.y, this.level.tWidth, this.level.tHeight, 0, 0.5, 0.5);
    this.drawCollider(renderer);
    renderer.popState();
  };

  Tile.prototype.drawCollider = function (renderer) {
    var _a;

    if (this.collider) {
      renderer.setColor((_a = LIGHT_COLORS[this.data.colorId]) !== null && _a !== void 0 ? _a : new math_1.Vec4(1, 0, 1, 1)); // renderer.drawLines(this.collider.points, 2);

      for (var i = 0; i < this.collider.points.length - 1; i++) {
        var p0 = this.collider.points[i];
        var p1 = this.collider.points[(i + 1) % this.collider.points.length];
        renderer.drawLine(p0.x, p0.y, p1.x, p1.y, 2);
      }
    }
  };

  Tile.prototype.move = function (amount) {
    var index = this.index;
    this.pos.add(amount);
    var newIndex = this.index;
    if (index.x != newIndex.x || index.y != newIndex.y) this.level.moveTile(this, index, newIndex);
  };

  Tile.createTileShape = function (shape, xPos, yPos, width, height, rot) {
    switch (shape) {
      case TILE_TYPE.SOLID:
        return math_1.Shape.makeBox(xPos, yPos, width, height, rot, false);

      case TILE_TYPE.EMITTER:
      case TILE_TYPE.RECEIVER:
        return math_1.Shape.makeBox(xPos, yPos, width, height, rot, true);

      case TILE_TYPE.CORNER:
        return math_1.Shape.makeAngleTriangle(xPos, yPos, width, height, rot);

      default:
        return null;
    }
  };

  Tile.tileRotation = function (dir) {
    switch (dir) {
      case TILE_DIR.RIGHT:
        return 0;

      case TILE_DIR.DOWN:
        return Math.PI / 2;
      // 90 deg cw

      case TILE_DIR.LEFT:
        return Math.PI;
      // 180 deg cw

      case TILE_DIR.UP:
        return Math.PI + Math.PI / 2;
      // 270 deg cw

      default:
        return 0;
    }
  };

  Tile.textures = [];
  return Tile;
}();

var Level =
/** @class */
function () {
  function Level() {
    this.grid = {};
    this.tiles = [];
    this.rows = 8;
    this.cols = 8;
    this.tWidth = 8;
    this.tHeight = 8;
    this.pos = new math_1.Vec2();
    this.mouseHoverIndex = new math_1.Vec2();
    this.tWidth = 55;
    this.tHeight = 55;
    this.pos = new math_1.Vec2(renderTarget_1.RenderTarget.current.width / 2 - this.tWidth * this.cols * 0.5, renderTarget_1.RenderTarget.current.height / 2 - this.tHeight * this.rows * 0.5); // Initialise the grid lookup

    for (var y = 0; y < this.rows; y++) {
      this.grid[y] = {};

      for (var x = 0; x < this.cols; x++) {
        this.grid[y][x] = new Set();
      }
    }
  }

  Level.prototype.update = function () {
    this.mouseHoverIndex = this.posToIndex(app_1.App.input.mouse.pos);

    if (app_1.App.input.mouse.wasButtonPressed(mouseInput_1.MOUSE.LEFT)) {
      this.createTile('2530', this.mouseHoverIndex);
    }

    if (app_1.App.input.mouse.wasButtonPressed(mouseInput_1.MOUSE.RIGHT)) {
      this.destroyTileAt(this.mouseHoverIndex);
    }

    this.updateTiles();
  };

  Level.prototype.updateTiles = function () {
    var e_1, _a;

    try {
      for (var _b = __values(this.tiles), _c = _b.next(); !_c.done; _c = _b.next()) {
        var tile = _c.value;
        tile.update();
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
  };

  Level.prototype.draw = function (renderer) {
    var e_2, _a;

    renderer.saveState(true); // draw a box around the tile the mouse is on

    if (this.mouseHoverIndex !== null) {
      var tilePos = this.indexToPos(this.mouseHoverIndex);
      renderer.setColor(new math_1.Vec4(1, 1, 1, 0.1));
      renderer.darwRect(tilePos.x, tilePos.y, this.tWidth, this.tHeight, 0, 0.5, 0.5);
    } // draw the background grid


    var color = new math_1.Vec4(255 / 255, 255 / 255, 255 / 255, 0.2);
    this.drawBackgroundGrid(renderer, color);

    try {
      // darw the tiles
      for (var _b = __values(this.tiles), _c = _b.next(); !_c.done; _c = _b.next()) {
        var tile = _c.value;
        tile.draw(renderer);
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

    renderer.popState();
  };

  Level.prototype.createTile = function (data, index) {
    if (!this.indexInBounds(index)) return;
    var tData = {
      shapeId: data[0],
      colorId: data[1],
      dirId: data[2],
      LightId: data[3]
    };
    var tile = new Tile(this, tData, this.indexToPos(index));
    console.log(tile.data);
    return tile;
  };

  Level.prototype.destroyTileAt = function (index) {
    var e_3, _a;

    if (!this.indexInBounds(index)) return;

    try {
      for (var _b = __values(this.grid[index.y][index.x]), _c = _b.next(); !_c.done; _c = _b.next()) {
        var tile = _c.value;
        this.grid[index.y][index.x].delete(tile);
        this.tiles.splice(this.tiles.indexOf(tile), 1);
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

  Level.prototype.moveTile = function (tile, oldIndex, newIndex) {
    if (oldIndex && this.indexInBounds(oldIndex)) this.grid[oldIndex.y][oldIndex.x].delete(tile);
    if (newIndex && this.indexInBounds(newIndex)) this.grid[newIndex.y][newIndex.x].add(tile);
  };

  Level.prototype.drawBackgroundGrid = function (renderer, color) {
    renderer.saveState(true); // draw background:

    var c = new math_1.Vec4(color.x, color.y, color.z, color.w);
    var colors = [new math_1.Vec4(c.x, c.y, c.z, 0), new math_1.Vec4(c.x, c.y, c.z, c.w), new math_1.Vec4(c.x, c.y, c.z, c.w), new math_1.Vec4(c.x, c.y, c.z, 0)];
    var pos = this.pos;
    var tw = this.tWidth;
    var th = this.tHeight;
    var minX = 0;
    var minY = 0;
    var maxX = this.cols;
    var maxY = this.rows; // vertical lines

    for (var i = minX; i <= maxX; i++) {
      var points = [new math_1.Vec2(pos.x + i * tw, pos.y + (minY + 0) * th), new math_1.Vec2(pos.x + i * tw, pos.y + (minY + 2) * th), new math_1.Vec2(pos.x + i * tw, pos.y + (maxY - 2) * th), new math_1.Vec2(pos.x + i * tw, pos.y + (maxY - 0) * th)];
      renderer.drawLines(points, 1, colors);
    } // horizontal


    for (var i = minY; i <= maxY; i++) {
      var points = [new math_1.Vec2(pos.x + (minX + 0) * tw, pos.y + i * th), new math_1.Vec2(pos.x + (minX + 2) * tw, pos.y + i * th), new math_1.Vec2(pos.x + (maxX - 2) * tw, pos.y + i * th), new math_1.Vec2(pos.x + (maxX - 0) * tw, pos.y + i * th)];
      renderer.drawLines(points, 1, colors);
    }

    renderer.popState();
  };

  Level.prototype.posToIndex = function (pos) {
    var index = new math_1.Vec2(Math.floor((pos.x - this.pos.x) / this.tWidth), Math.floor((pos.y - this.pos.y) / this.tHeight));
    return this.indexInBounds(index) ? index : null;
  };

  Level.prototype.indexToPos = function (index) {
    return new math_1.Vec2(index.x * this.tWidth + this.pos.x + this.tWidth * 0.5, index.y * this.tHeight + this.pos.y + this.tHeight * 0.5);
  };

  Level.prototype.indexInBounds = function (index) {
    return index && index.x >= 0 && index.x < this.cols && index.y >= 0 && index.y < this.rows;
  };

  return Level;
}();

var LightBenderEditor =
/** @class */
function (_super) {
  __extends(LightBenderEditor, _super);

  function LightBenderEditor(htmlCanvasId) {
    var _this = _super.call(this, htmlCanvasId) || this;

    _this.levelIndex = 0;
    return _this;
  }

  LightBenderEditor.prototype.loadAssets = function () {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , _super.prototype.loadAssets.call(this)];

          case 1:
            _a.sent();

            this.image = new texture_1.Texture2D(this.gl);
            this.image.load(prop_crate_plain_png_1.default);
            Tile.textures[0] = new texture_1.Texture2D(this.gl);
            Tile.textures[0].load(tile_base_png_1.default);
            this.level = new Level();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  LightBenderEditor.prototype.update = function () {
    _super.prototype.update.call(this);

    this.level.update();
  };

  LightBenderEditor.prototype.draw = function () {
    _super.prototype.draw.call(this);

    this.renderer2d.begin();
    this.level.draw(this.renderer2d);
    this.renderer2d.end();
  };

  return LightBenderEditor;
}(app_1.App);

exports.LightBenderEditor = LightBenderEditor;
},{"../../assets/prop-crate-plain.png":"assets/prop-crate-plain.png","../../engine/graphics/texture":"engine/graphics/texture.ts","../../engine/app":"engine/app.ts","../../engine/math":"engine/math/index.ts","../../engine/graphics/renderTarget":"engine/graphics/renderTarget.ts","../../engine/input/mouseInput":"engine/input/mouseInput.ts","./assets/tile-base.png":"demos/lightBender/assets/tile-base.png"}],"demos/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var lightBender_1 = require("./lightBender");

var rayCasting_1 = require("./rayCasting");

var lineRendering_1 = require("./lineRendering");

var renderTextureDemo_1 = require("./renderTextureDemo");

var rectRotation_1 = require("./rectRotation");

var app_1 = require("../engine/app");

var editor_1 = require("./lightBender/editor");

function RunDemo(canvasId, name) {
  switch (name) {
    case 'LightBender':
      return new lightBender_1.LightBender(canvasId);

    case 'LightBenderEditor':
      return new editor_1.LightBenderEditor(canvasId);

    case 'RayCastingDemo':
      return new rayCasting_1.RayCastingDemo(canvasId);

    case 'LineRenderingDemo':
      return new lineRendering_1.LineRenderingDemo(canvasId);

    case 'RectRotationDemo':
      return new rectRotation_1.RectRotationDemo(canvasId);

    case 'RenderTextureDemo':
      return new renderTextureDemo_1.RenderTextureDemo(canvasId);

    default:
      return new app_1.App(canvasId);
  }
}

exports.default = RunDemo;
},{"./lightBender":"demos/lightBender/index.ts","./rayCasting":"demos/rayCasting/index.ts","./lineRendering":"demos/lineRendering/index.ts","./renderTextureDemo":"demos/renderTextureDemo/index.ts","./rectRotation":"demos/rectRotation/index.ts","../engine/app":"engine/app.ts","./lightBender/editor":"demos/lightBender/editor.ts"}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/reflect-metadata/Reflect.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;

(function (Reflect) {
  // Metadata Proposal
  // https://rbuckton.github.io/reflect-metadata/
  (function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
    var exporter = makeExporter(Reflect);

    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect;
    } else {
      exporter = makeExporter(root.Reflect, exporter);
    }

    factory(exporter);

    function makeExporter(target, previous) {
      return function (key, value) {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, {
            configurable: true,
            writable: true,
            value: value
          });
        }

        if (previous) previous(key, value);
      };
    }
  })(function (exporter) {
    var hasOwn = Object.prototype.hasOwnProperty; // feature test for Symbol support

    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support

    var supportsProto = {
      __proto__: []
    } instanceof Array; // feature test for __proto__ support

    var downLevel = !supportsCreate && !supportsProto;
    var HashMap = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: supportsCreate ? function () {
        return MakeDictionary(Object.create(null));
      } : supportsProto ? function () {
        return MakeDictionary({
          __proto__: null
        });
      } : function () {
        return MakeDictionary({});
      },
      has: downLevel ? function (map, key) {
        return hasOwn.call(map, key);
      } : function (map, key) {
        return key in map;
      },
      get: downLevel ? function (map, key) {
        return hasOwn.call(map, key) ? map[key] : undefined;
      } : function (map, key) {
        return map[key];
      }
    }; // Load global or shim versions of Map, Set, and WeakMap

    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process.env && undefined === "true";

    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();

    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();

    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill(); // [[Metadata]] internal slot
    // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots


    var Metadata = new _WeakMap();
    /**
     * Applies a set of decorators to a property of a target object.
     * @param decorators An array of decorators.
     * @param target The target object.
     * @param propertyKey (Optional) The property key to decorate.
     * @param attributes (Optional) The property descriptor for the target key.
     * @remarks Decorators are applied in reverse order.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     Example = Reflect.decorate(decoratorsArray, Example);
     *
     *     // property (on constructor)
     *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
     *
     *     // property (on prototype)
     *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
     *
     *     // method (on constructor)
     *     Object.defineProperty(Example, "staticMethod",
     *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
     *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
     *
     *     // method (on prototype)
     *     Object.defineProperty(Example.prototype, "method",
     *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
     *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
     *
     */

    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators)) throw new TypeError();
        if (!IsObject(target)) throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes)) throw new TypeError();
        if (IsNull(attributes)) attributes = undefined;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
      } else {
        if (!IsArray(decorators)) throw new TypeError();
        if (!IsConstructor(target)) throw new TypeError();
        return DecorateConstructor(decorators, target);
      }
    }

    exporter("decorate", decorate); // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
    // https://rbuckton.github.io/reflect-metadata/#reflect.metadata

    /**
     * A default metadata decorator factory that can be used on a class, class member, or parameter.
     * @param metadataKey The key for the metadata entry.
     * @param metadataValue The value for the metadata entry.
     * @returns A decorator function.
     * @remarks
     * If `metadataKey` is already defined for the target and target key, the
     * metadataValue for that key will be overwritten.
     * @example
     *
     *     // constructor
     *     @Reflect.metadata(key, value)
     *     class Example {
     *     }
     *
     *     // property (on constructor, TypeScript only)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         static staticProperty;
     *     }
     *
     *     // property (on prototype, TypeScript only)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         property;
     *     }
     *
     *     // method (on constructor)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         static staticMethod() { }
     *     }
     *
     *     // method (on prototype)
     *     class Example {
     *         @Reflect.metadata(key, value)
     *         method() { }
     *     }
     *
     */

    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) throw new TypeError();
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }

      return decorator;
    }

    exporter("metadata", metadata);
    /**
     * Define a unique metadata entry on the target.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param metadataValue A value that contains attached metadata.
     * @param target The target object on which to define metadata.
     * @param propertyKey (Optional) The property key for the target.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     Reflect.defineMetadata("custom:annotation", options, Example);
     *
     *     // property (on constructor)
     *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
     *
     *     // property (on prototype)
     *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
     *
     *     // method (on constructor)
     *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
     *
     *     // method (on prototype)
     *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
     *
     *     // decorator factory as metadata-producing annotation.
     *     function MyAnnotation(options): Decorator {
     *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
     *     }
     *
     */

    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }

    exporter("defineMetadata", defineMetadata);
    /**
     * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.hasMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }

    exporter("hasMetadata", hasMetadata);
    /**
     * Gets a value indicating whether the target object has the provided metadata key defined.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }

    exporter("hasOwnMetadata", hasOwnMetadata);
    /**
     * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }

    exporter("getMetadata", getMetadata);
    /**
     * Gets the metadata value for the provided metadata key on the target object.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getOwnMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }

    exporter("getOwnMetadata", getOwnMetadata);
    /**
     * Gets the metadata keys defined on the target object or its prototype chain.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns An array of unique metadata keys.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getMetadataKeys(Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getMetadataKeys(Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getMetadataKeys(Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getMetadataKeys(Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getMetadataKeys(Example.prototype, "method");
     *
     */

    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryMetadataKeys(target, propertyKey);
    }

    exporter("getMetadataKeys", getMetadataKeys);
    /**
     * Gets the unique metadata keys defined on the target object.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns An array of unique metadata keys.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.getOwnMetadataKeys(Example);
     *
     *     // property (on constructor)
     *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
     *
     */

    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryOwnMetadataKeys(target, propertyKey);
    }

    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    /**
     * Deletes the metadata entry from the target object with the provided key.
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target The target object on which the metadata is defined.
     * @param propertyKey (Optional) The property key for the target.
     * @returns `true` if the metadata entry was found and deleted; otherwise, false.
     * @example
     *
     *     class Example {
     *         // property declarations are not part of ES6, though they are valid in TypeScript:
     *         // static staticProperty;
     *         // property;
     *
     *         constructor(p) { }
     *         static staticMethod(p) { }
     *         method(p) { }
     *     }
     *
     *     // constructor
     *     result = Reflect.deleteMetadata("custom:annotation", Example);
     *
     *     // property (on constructor)
     *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
     *
     *     // property (on prototype)
     *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
     *
     *     // method (on constructor)
     *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
     *
     *     // method (on prototype)
     *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
     *
     */

    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      var metadataMap = GetOrCreateMetadataMap(target, propertyKey,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return false;
      if (!metadataMap.delete(metadataKey)) return false;
      if (metadataMap.size > 0) return true;
      var targetMetadata = Metadata.get(target);
      targetMetadata.delete(propertyKey);
      if (targetMetadata.size > 0) return true;
      Metadata.delete(target);
      return true;
    }

    exporter("deleteMetadata", deleteMetadata);

    function DecorateConstructor(decorators, target) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target);

        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated)) throw new TypeError();
          target = decorated;
        }
      }

      return target;
    }

    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target, propertyKey, descriptor);

        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated)) throw new TypeError();
          descriptor = decorated;
        }
      }

      return descriptor;
    }

    function GetOrCreateMetadataMap(O, P, Create) {
      var targetMetadata = Metadata.get(O);

      if (IsUndefined(targetMetadata)) {
        if (!Create) return undefined;
        targetMetadata = new _Map();
        Metadata.set(O, targetMetadata);
      }

      var metadataMap = targetMetadata.get(P);

      if (IsUndefined(metadataMap)) {
        if (!Create) return undefined;
        metadataMap = new _Map();
        targetMetadata.set(P, metadataMap);
      }

      return metadataMap;
    } // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata


    function OrdinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return true;
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent)) return OrdinaryHasMetadata(MetadataKey, parent, P);
      return false;
    } // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata


    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return false;
      return ToBoolean(metadataMap.has(MetadataKey));
    } // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata


    function OrdinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent)) return OrdinaryGetMetadata(MetadataKey, parent, P);
      return undefined;
    } // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata


    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return undefined;
      return metadataMap.get(MetadataKey);
    } // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata


    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      true);
      metadataMap.set(MetadataKey, MetadataValue);
    } // 3.1.6.1 OrdinaryMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys


    function OrdinaryMetadataKeys(O, P) {
      var ownKeys = OrdinaryOwnMetadataKeys(O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (parent === null) return ownKeys;
      var parentKeys = OrdinaryMetadataKeys(parent, P);
      if (parentKeys.length <= 0) return ownKeys;
      if (ownKeys.length <= 0) return parentKeys;
      var set = new _Set();
      var keys = [];

      for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
        var key = ownKeys_1[_i];
        var hasKey = set.has(key);

        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }

      for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
        var key = parentKeys_1[_a];
        var hasKey = set.has(key);

        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }

      return keys;
    } // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys


    function OrdinaryOwnMetadataKeys(O, P) {
      var keys = [];
      var metadataMap = GetOrCreateMetadataMap(O, P,
      /*Create*/
      false);
      if (IsUndefined(metadataMap)) return keys;
      var keysObj = metadataMap.keys();
      var iterator = GetIterator(keysObj);
      var k = 0;

      while (true) {
        var next = IteratorStep(iterator);

        if (!next) {
          keys.length = k;
          return keys;
        }

        var nextValue = IteratorValue(next);

        try {
          keys[k] = nextValue;
        } catch (e) {
          try {
            IteratorClose(iterator);
          } finally {
            throw e;
          }
        }

        k++;
      }
    } // 6 ECMAScript Data Typ0es and Values
    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values


    function Type(x) {
      if (x === null) return 1
      /* Null */
      ;

      switch (typeof x) {
        case "undefined":
          return 0
          /* Undefined */
          ;

        case "boolean":
          return 2
          /* Boolean */
          ;

        case "string":
          return 3
          /* String */
          ;

        case "symbol":
          return 4
          /* Symbol */
          ;

        case "number":
          return 5
          /* Number */
          ;

        case "object":
          return x === null ? 1
          /* Null */
          : 6
          /* Object */
          ;

        default:
          return 6
          /* Object */
          ;
      }
    } // 6.1.1 The Undefined Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type


    function IsUndefined(x) {
      return x === undefined;
    } // 6.1.2 The Null Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type


    function IsNull(x) {
      return x === null;
    } // 6.1.5 The Symbol Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type


    function IsSymbol(x) {
      return typeof x === "symbol";
    } // 6.1.7 The Object Type
    // https://tc39.github.io/ecma262/#sec-object-type


    function IsObject(x) {
      return typeof x === "object" ? x !== null : typeof x === "function";
    } // 7.1 Type Conversion
    // https://tc39.github.io/ecma262/#sec-type-conversion
    // 7.1.1 ToPrimitive(input [, PreferredType])
    // https://tc39.github.io/ecma262/#sec-toprimitive


    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0
        /* Undefined */
        :
          return input;

        case 1
        /* Null */
        :
          return input;

        case 2
        /* Boolean */
        :
          return input;

        case 3
        /* String */
        :
          return input;

        case 4
        /* Symbol */
        :
          return input;

        case 5
        /* Number */
        :
          return input;
      }

      var hint = PreferredType === 3
      /* String */
      ? "string" : PreferredType === 5
      /* Number */
      ? "number" : "default";
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol);

      if (exoticToPrim !== undefined) {
        var result = exoticToPrim.call(input, hint);
        if (IsObject(result)) throw new TypeError();
        return result;
      }

      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    } // 7.1.1.1 OrdinaryToPrimitive(O, hint)
    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive


    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        var toString_1 = O.toString;

        if (IsCallable(toString_1)) {
          var result = toString_1.call(O);
          if (!IsObject(result)) return result;
        }

        var valueOf = O.valueOf;

        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result)) return result;
        }
      } else {
        var valueOf = O.valueOf;

        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result)) return result;
        }

        var toString_2 = O.toString;

        if (IsCallable(toString_2)) {
          var result = toString_2.call(O);
          if (!IsObject(result)) return result;
        }
      }

      throw new TypeError();
    } // 7.1.2 ToBoolean(argument)
    // https://tc39.github.io/ecma262/2016/#sec-toboolean


    function ToBoolean(argument) {
      return !!argument;
    } // 7.1.12 ToString(argument)
    // https://tc39.github.io/ecma262/#sec-tostring


    function ToString(argument) {
      return "" + argument;
    } // 7.1.14 ToPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-topropertykey


    function ToPropertyKey(argument) {
      var key = ToPrimitive(argument, 3
      /* String */
      );
      if (IsSymbol(key)) return key;
      return ToString(key);
    } // 7.2 Testing and Comparison Operations
    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
    // 7.2.2 IsArray(argument)
    // https://tc39.github.io/ecma262/#sec-isarray


    function IsArray(argument) {
      return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
    } // 7.2.3 IsCallable(argument)
    // https://tc39.github.io/ecma262/#sec-iscallable


    function IsCallable(argument) {
      // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
      return typeof argument === "function";
    } // 7.2.4 IsConstructor(argument)
    // https://tc39.github.io/ecma262/#sec-isconstructor


    function IsConstructor(argument) {
      // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
      return typeof argument === "function";
    } // 7.2.7 IsPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-ispropertykey


    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3
        /* String */
        :
          return true;

        case 4
        /* Symbol */
        :
          return true;

        default:
          return false;
      }
    } // 7.3 Operations on Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-objects
    // 7.3.9 GetMethod(V, P)
    // https://tc39.github.io/ecma262/#sec-getmethod


    function GetMethod(V, P) {
      var func = V[P];
      if (func === undefined || func === null) return undefined;
      if (!IsCallable(func)) throw new TypeError();
      return func;
    } // 7.4 Operations on Iterator Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects


    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method)) throw new TypeError(); // from Call

      var iterator = method.call(obj);
      if (!IsObject(iterator)) throw new TypeError();
      return iterator;
    } // 7.4.4 IteratorValue(iterResult)
    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue


    function IteratorValue(iterResult) {
      return iterResult.value;
    } // 7.4.5 IteratorStep(iterator)
    // https://tc39.github.io/ecma262/#sec-iteratorstep


    function IteratorStep(iterator) {
      var result = iterator.next();
      return result.done ? false : result;
    } // 7.4.6 IteratorClose(iterator, completion)
    // https://tc39.github.io/ecma262/#sec-iteratorclose


    function IteratorClose(iterator) {
      var f = iterator["return"];
      if (f) f.call(iterator);
    } // 9.1 Ordinary Object Internal Methods and Internal Slots
    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof


    function OrdinaryGetPrototypeOf(O) {
      var proto = Object.getPrototypeOf(O);
      if (typeof O !== "function" || O === functionPrototype) return proto; // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
      // Try to determine the superclass constructor. Compatible implementations
      // must either set __proto__ on a subclass constructor to the superclass constructor,
      // or ensure each class has a valid `constructor` property on its prototype that
      // points back to the constructor.
      // If this is not the same as Function.[[Prototype]], then this is definately inherited.
      // This is the case when in ES6 or when using __proto__ in a compatible browser.

      if (proto !== functionPrototype) return proto; // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.

      var prototype = O.prototype;
      var prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype) return proto; // If the constructor was not a function, then we cannot determine the heritage.

      var constructor = prototypeProto.constructor;
      if (typeof constructor !== "function") return proto; // If we have some kind of self-reference, then we cannot determine the heritage.

      if (constructor === O) return proto; // we have a pretty good guess at the heritage.

      return constructor;
    } // naive Map shim


    function CreateMapPolyfill() {
      var cacheSentinel = {};
      var arraySentinel = [];

      var MapIterator =
      /** @class */
      function () {
        function MapIterator(keys, values, selector) {
          this._index = 0;
          this._keys = keys;
          this._values = values;
          this._selector = selector;
        }

        MapIterator.prototype["@@iterator"] = function () {
          return this;
        };

        MapIterator.prototype[iteratorSymbol] = function () {
          return this;
        };

        MapIterator.prototype.next = function () {
          var index = this._index;

          if (index >= 0 && index < this._keys.length) {
            var result = this._selector(this._keys[index], this._values[index]);

            if (index + 1 >= this._keys.length) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            } else {
              this._index++;
            }

            return {
              value: result,
              done: false
            };
          }

          return {
            value: undefined,
            done: true
          };
        };

        MapIterator.prototype.throw = function (error) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }

          throw error;
        };

        MapIterator.prototype.return = function (value) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }

          return {
            value: value,
            done: true
          };
        };

        return MapIterator;
      }();

      return (
        /** @class */
        function () {
          function Map() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }

          Object.defineProperty(Map.prototype, "size", {
            get: function () {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });

          Map.prototype.has = function (key) {
            return this._find(key,
            /*insert*/
            false) >= 0;
          };

          Map.prototype.get = function (key) {
            var index = this._find(key,
            /*insert*/
            false);

            return index >= 0 ? this._values[index] : undefined;
          };

          Map.prototype.set = function (key, value) {
            var index = this._find(key,
            /*insert*/
            true);

            this._values[index] = value;
            return this;
          };

          Map.prototype.delete = function (key) {
            var index = this._find(key,
            /*insert*/
            false);

            if (index >= 0) {
              var size = this._keys.length;

              for (var i = index + 1; i < size; i++) {
                this._keys[i - 1] = this._keys[i];
                this._values[i - 1] = this._values[i];
              }

              this._keys.length--;
              this._values.length--;

              if (key === this._cacheKey) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }

              return true;
            }

            return false;
          };

          Map.prototype.clear = function () {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };

          Map.prototype.keys = function () {
            return new MapIterator(this._keys, this._values, getKey);
          };

          Map.prototype.values = function () {
            return new MapIterator(this._keys, this._values, getValue);
          };

          Map.prototype.entries = function () {
            return new MapIterator(this._keys, this._values, getEntry);
          };

          Map.prototype["@@iterator"] = function () {
            return this.entries();
          };

          Map.prototype[iteratorSymbol] = function () {
            return this.entries();
          };

          Map.prototype._find = function (key, insert) {
            if (this._cacheKey !== key) {
              this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
            }

            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;

              this._keys.push(key);

              this._values.push(undefined);
            }

            return this._cacheIndex;
          };

          return Map;
        }()
      );

      function getKey(key, _) {
        return key;
      }

      function getValue(_, value) {
        return value;
      }

      function getEntry(key, value) {
        return [key, value];
      }
    } // naive Set shim


    function CreateSetPolyfill() {
      return (
        /** @class */
        function () {
          function Set() {
            this._map = new _Map();
          }

          Object.defineProperty(Set.prototype, "size", {
            get: function () {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });

          Set.prototype.has = function (value) {
            return this._map.has(value);
          };

          Set.prototype.add = function (value) {
            return this._map.set(value, value), this;
          };

          Set.prototype.delete = function (value) {
            return this._map.delete(value);
          };

          Set.prototype.clear = function () {
            this._map.clear();
          };

          Set.prototype.keys = function () {
            return this._map.keys();
          };

          Set.prototype.values = function () {
            return this._map.values();
          };

          Set.prototype.entries = function () {
            return this._map.entries();
          };

          Set.prototype["@@iterator"] = function () {
            return this.keys();
          };

          Set.prototype[iteratorSymbol] = function () {
            return this.keys();
          };

          return Set;
        }()
      );
    } // naive WeakMap shim


    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16;
      var keys = HashMap.create();
      var rootKey = CreateUniqueKey();
      return (
        /** @class */
        function () {
          function WeakMap() {
            this._key = CreateUniqueKey();
          }

          WeakMap.prototype.has = function (target) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            false);
            return table !== undefined ? HashMap.has(table, this._key) : false;
          };

          WeakMap.prototype.get = function (target) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            false);
            return table !== undefined ? HashMap.get(table, this._key) : undefined;
          };

          WeakMap.prototype.set = function (target, value) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            true);
            table[this._key] = value;
            return this;
          };

          WeakMap.prototype.delete = function (target) {
            var table = GetOrCreateWeakMapTable(target,
            /*create*/
            false);
            return table !== undefined ? delete table[this._key] : false;
          };

          WeakMap.prototype.clear = function () {
            // NOTE: not a real clear, just makes the previous data unreachable
            this._key = CreateUniqueKey();
          };

          return WeakMap;
        }()
      );

      function CreateUniqueKey() {
        var key;

        do key = "@@WeakMap@@" + CreateUUID(); while (HashMap.has(keys, key));

        keys[key] = true;
        return key;
      }

      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn.call(target, rootKey)) {
          if (!create) return undefined;
          Object.defineProperty(target, rootKey, {
            value: HashMap.create()
          });
        }

        return target[rootKey];
      }

      function FillRandomBytes(buffer, size) {
        for (var i = 0; i < size; ++i) buffer[i] = Math.random() * 0xff | 0;

        return buffer;
      }

      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined") return crypto.getRandomValues(new Uint8Array(size));
          if (typeof msCrypto !== "undefined") return msCrypto.getRandomValues(new Uint8Array(size));
          return FillRandomBytes(new Uint8Array(size), size);
        }

        return FillRandomBytes(new Array(size), size);
      }

      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE); // mark as random - RFC 4122 § 4.4

        data[6] = data[6] & 0x4f | 0x40;
        data[8] = data[8] & 0xbf | 0x80;
        var result = "";

        for (var offset = 0; offset < UUID_SIZE; ++offset) {
          var byte = data[offset];
          if (offset === 4 || offset === 6 || offset === 8) result += "-";
          if (byte < 16) result += "0";
          result += byte.toString(16).toLowerCase();
        }

        return result;
      }
    } // uses a heuristic used by v8 and chakra to force an object into dictionary mode.


    function MakeDictionary(obj) {
      obj.__ = undefined;
      delete obj.__;
      return obj;
    }
  });
})(Reflect || (Reflect = {}));
},{"process":"../node_modules/process/browser.js"}],"../node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel/src/builtins/bundle-url.js"}],"engine/forms/dark.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel/src/builtins/css-loader.js"}],"../node_modules/marked/src/defaults.js":[function(require,module,exports) {
function getDefaults() {
  return {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tokenizer: null,
    xhtml: false
  };
}

function changeDefaults(newDefaults) {
  module.exports.defaults = newDefaults;
}

module.exports = {
  defaults: getDefaults(),
  getDefaults: getDefaults,
  changeDefaults: changeDefaults
};
},{}],"../node_modules/marked/src/helpers.js":[function(require,module,exports) {
/**
 * Helpers
 */
var escapeTest = /[&<>"']/;
var escapeReplace = /[&<>"']/g;
var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
var escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

var getEscapeReplacement = function getEscapeReplacement(ch) {
  return escapeReplacements[ch];
};

function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
}

var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(unescapeTest, function (_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';

    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }

    return '';
  });
}

var caret = /(^|[^\[])\^/g;

function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  var obj = {
    replace: function replace(name, val) {
      val = val.source || val;
      val = val.replace(caret, '$1');
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: function getRegex() {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}

var nonWordAndColonTest = /[^\w:]/g;
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    var prot;

    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, '').toLowerCase();
    } catch (e) {
      return null;
    }

    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }

  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }

  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }

  return href;
}

var baseUrls = {};
var justDomain = /^[^:]+:\/*[^/]*$/;
var protocol = /^([^:]+:)[\s\S]*$/;
var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (justDomain.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim(base, '/', true);
    }
  }

  base = baseUrls[' ' + base];
  var relativeBase = base.indexOf(':') === -1;

  if (href.substring(0, 2) === '//') {
    if (relativeBase) {
      return href;
    }

    return base.replace(protocol, '$1') + href;
  } else if (href.charAt(0) === '/') {
    if (relativeBase) {
      return href;
    }

    return base.replace(domain, '$1') + href;
  } else {
    return base + href;
  }
}

var noopTest = {
  exec: function noopTest() {}
};

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];

    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function splitCells(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  var row = tableRow.replace(/\|/g, function (match, offset, str) {
    var escaped = false,
        curr = offset;

    while (--curr >= 0 && str[curr] === '\\') {
      escaped = !escaped;
    }

    if (escaped) {
      // odd number of slashes means | is escaped
      // so we leave it alone
      return '|';
    } else {
      // add space before unescaped |
      return ' |';
    }
  }),
      cells = row.split(/ \|/);
  var i = 0;

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) {
      cells.push('');
    }
  }

  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }

  return cells;
} // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
// /c*$/ is vulnerable to REDOS.
// invert: Remove suffix of non-c chars instead. Default falsey.


function rtrim(str, c, invert) {
  var l = str.length;

  if (l === 0) {
    return '';
  } // Length of suffix matching the invert condition.


  var suffLen = 0; // Step left until we fail to match the invert condition.

  while (suffLen < l) {
    var currChar = str.charAt(l - suffLen - 1);

    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.substr(0, l - suffLen);
}

function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }

  var l = str.length;
  var level = 0,
      i = 0;

  for (; i < l; i++) {
    if (str[i] === '\\') {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;

      if (level < 0) {
        return i;
      }
    }
  }

  return -1;
}

function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
  }
}

module.exports = {
  escape: escape,
  unescape: unescape,
  edit: edit,
  cleanUrl: cleanUrl,
  resolveUrl: resolveUrl,
  noopTest: noopTest,
  merge: merge,
  splitCells: splitCells,
  rtrim: rtrim,
  findClosingBracket: findClosingBracket,
  checkSanitizeDeprecation: checkSanitizeDeprecation
};
},{}],"../node_modules/marked/src/Tokenizer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./defaults.js'),
    defaults = _require.defaults;

var _require2 = require('./helpers.js'),
    rtrim = _require2.rtrim,
    splitCells = _require2.splitCells,
    _escape = _require2.escape,
    findClosingBracket = _require2.findClosingBracket;

function outputLink(cap, link, raw) {
  var href = link.href;
  var title = link.title ? _escape(link.title) : null;

  if (cap[0].charAt(0) !== '!') {
    return {
      type: 'link',
      raw: raw,
      href: href,
      title: title,
      text: cap[1]
    };
  } else {
    return {
      type: 'image',
      raw: raw,
      text: _escape(cap[1]),
      href: href,
      title: title
    };
  }
}
/**
 * Tokenizer
 */


module.exports = /*#__PURE__*/function () {
  function Tokenizer(options) {
    _classCallCheck(this, Tokenizer);

    this.options = options || defaults;
  }

  _createClass(Tokenizer, [{
    key: "space",
    value: function space(src) {
      var cap = this.rules.block.newline.exec(src);

      if (cap) {
        if (cap[0].length > 1) {
          return {
            type: 'space',
            raw: cap[0]
          };
        }

        return {
          raw: '\n'
        };
      }
    }
  }, {
    key: "code",
    value: function code(src, tokens) {
      var cap = this.rules.block.code.exec(src);

      if (cap) {
        var lastToken = tokens[tokens.length - 1]; // An indented code block cannot interrupt a paragraph.

        if (lastToken && lastToken.type === 'paragraph') {
          tokens.pop();
          lastToken.text += '\n' + cap[0].trimRight();
          lastToken.raw += '\n' + cap[0];
          return lastToken;
        } else {
          var text = cap[0].replace(/^ {4}/gm, '');
          return {
            type: 'code',
            raw: cap[0],
            codeBlockStyle: 'indented',
            text: !this.options.pedantic ? rtrim(text, '\n') : text
          };
        }
      }
    }
  }, {
    key: "fences",
    value: function fences(src) {
      var cap = this.rules.block.fences.exec(src);

      if (cap) {
        return {
          type: 'code',
          raw: cap[0],
          lang: cap[2] ? cap[2].trim() : cap[2],
          text: cap[3] || ''
        };
      }
    }
  }, {
    key: "heading",
    value: function heading(src) {
      var cap = this.rules.block.heading.exec(src);

      if (cap) {
        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[1].length,
          text: cap[2]
        };
      }
    }
  }, {
    key: "nptable",
    value: function nptable(src) {
      var cap = this.rules.block.nptable.exec(src);

      if (cap) {
        var item = {
          type: 'table',
          header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : [],
          raw: cap[0]
        };

        if (item.header.length === item.align.length) {
          var l = item.align.length;
          var i;

          for (i = 0; i < l; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          l = item.cells.length;

          for (i = 0; i < l; i++) {
            item.cells[i] = splitCells(item.cells[i], item.header.length);
          }

          return item;
        }
      }
    }
  }, {
    key: "hr",
    value: function hr(src) {
      var cap = this.rules.block.hr.exec(src);

      if (cap) {
        return {
          type: 'hr',
          raw: cap[0]
        };
      }
    }
  }, {
    key: "blockquote",
    value: function blockquote(src) {
      var cap = this.rules.block.blockquote.exec(src);

      if (cap) {
        var text = cap[0].replace(/^ *> ?/gm, '');
        return {
          type: 'blockquote',
          raw: cap[0],
          text: text
        };
      }
    }
  }, {
    key: "list",
    value: function list(src) {
      var cap = this.rules.block.list.exec(src);

      if (cap) {
        var raw = cap[0];
        var bull = cap[2];
        var isordered = bull.length > 1;
        var list = {
          type: 'list',
          raw: raw,
          ordered: isordered,
          start: isordered ? +bull : '',
          loose: false,
          items: []
        }; // Get each top-level item.

        var itemMatch = cap[0].match(this.rules.block.item);
        var next = false,
            item,
            space,
            b,
            addBack,
            loose,
            istask,
            ischecked;
        var l = itemMatch.length;

        for (var i = 0; i < l; i++) {
          item = itemMatch[i];
          raw = item; // Remove the list item's bullet
          // so it is seen as the next token.

          space = item.length;
          item = item.replace(/^ *([*+-]|\d+\.) */, ''); // Outdent whatever the
          // list item contains. Hacky.

          if (~item.indexOf('\n ')) {
            space -= item.length;
            item = !this.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') : item.replace(/^ {1,4}/gm, '');
          } // Determine whether the next list item belongs here.
          // Backpedal if it does not belong in this list.


          if (i !== l - 1) {
            b = this.rules.block.bullet.exec(itemMatch[i + 1])[0];

            if (bull.length > 1 ? b.length === 1 : b.length > 1 || this.options.smartLists && b !== bull) {
              addBack = itemMatch.slice(i + 1).join('\n');
              list.raw = list.raw.substring(0, list.raw.length - addBack.length);
              i = l - 1;
            }
          } // Determine whether item is loose or not.
          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
          // for discount behavior.


          loose = next || /\n\n(?!\s*$)/.test(item);

          if (i !== l - 1) {
            next = item.charAt(item.length - 1) === '\n';
            if (!loose) loose = next;
          }

          if (loose) {
            list.loose = true;
          } // Check for task list items


          istask = /^\[[ xX]\] /.test(item);
          ischecked = undefined;

          if (istask) {
            ischecked = item[1] !== ' ';
            item = item.replace(/^\[[ xX]\] +/, '');
          }

          list.items.push({
            raw: raw,
            task: istask,
            checked: ischecked,
            loose: loose,
            text: item
          });
        }

        return list;
      }
    }
  }, {
    key: "html",
    value: function html(src) {
      var cap = this.rules.block.html.exec(src);

      if (cap) {
        return {
          type: this.options.sanitize ? 'paragraph' : 'html',
          raw: cap[0],
          pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
          text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
        };
      }
    }
  }, {
    key: "def",
    value: function def(src) {
      var cap = this.rules.block.def.exec(src);

      if (cap) {
        if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
        var tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
        return {
          tag: tag,
          raw: cap[0],
          href: cap[2],
          title: cap[3]
        };
      }
    }
  }, {
    key: "table",
    value: function table(src) {
      var cap = this.rules.block.table.exec(src);

      if (cap) {
        var item = {
          type: 'table',
          header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
        };

        if (item.header.length === item.align.length) {
          item.raw = cap[0];
          var l = item.align.length;
          var i;

          for (i = 0; i < l; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          l = item.cells.length;

          for (i = 0; i < l; i++) {
            item.cells[i] = splitCells(item.cells[i].replace(/^ *\| *| *\| *$/g, ''), item.header.length);
          }

          return item;
        }
      }
    }
  }, {
    key: "lheading",
    value: function lheading(src) {
      var cap = this.rules.block.lheading.exec(src);

      if (cap) {
        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[2].charAt(0) === '=' ? 1 : 2,
          text: cap[1]
        };
      }
    }
  }, {
    key: "paragraph",
    value: function paragraph(src) {
      var cap = this.rules.block.paragraph.exec(src);

      if (cap) {
        return {
          type: 'paragraph',
          raw: cap[0],
          text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1]
        };
      }
    }
  }, {
    key: "text",
    value: function text(src) {
      var cap = this.rules.block.text.exec(src);

      if (cap) {
        return {
          type: 'text',
          raw: cap[0],
          text: cap[0]
        };
      }
    }
  }, {
    key: "escape",
    value: function escape(src) {
      var cap = this.rules.inline.escape.exec(src);

      if (cap) {
        return {
          type: 'escape',
          raw: cap[0],
          text: _escape(cap[1])
        };
      }
    }
  }, {
    key: "tag",
    value: function tag(src, inLink, inRawBlock) {
      var cap = this.rules.inline.tag.exec(src);

      if (cap) {
        if (!inLink && /^<a /i.test(cap[0])) {
          inLink = true;
        } else if (inLink && /^<\/a>/i.test(cap[0])) {
          inLink = false;
        }

        if (!inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          inRawBlock = true;
        } else if (inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          inRawBlock = false;
        }

        return {
          type: this.options.sanitize ? 'text' : 'html',
          raw: cap[0],
          inLink: inLink,
          inRawBlock: inRawBlock,
          text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
        };
      }
    }
  }, {
    key: "link",
    value: function link(src) {
      var cap = this.rules.inline.link.exec(src);

      if (cap) {
        var lastParenIndex = findClosingBracket(cap[2], '()');

        if (lastParenIndex > -1) {
          var start = cap[0].indexOf('!') === 0 ? 5 : 4;
          var linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = '';
        }

        var href = cap[2];
        var title = '';

        if (this.options.pedantic) {
          var link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

          if (link) {
            href = link[1];
            title = link[3];
          } else {
            title = '';
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : '';
        }

        href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
        var token = outputLink(cap, {
          href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
          title: title ? title.replace(this.rules.inline._escapes, '$1') : title
        }, cap[0]);
        return token;
      }
    }
  }, {
    key: "reflink",
    value: function reflink(src, links) {
      var cap;

      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        var link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = links[link.toLowerCase()];

        if (!link || !link.href) {
          var text = cap[0].charAt(0);
          return {
            type: 'text',
            raw: text,
            text: text
          };
        }

        var token = outputLink(cap, link, cap[0]);
        return token;
      }
    }
  }, {
    key: "strong",
    value: function strong(src) {
      var cap = this.rules.inline.strong.exec(src);

      if (cap) {
        return {
          type: 'strong',
          raw: cap[0],
          text: cap[4] || cap[3] || cap[2] || cap[1]
        };
      }
    }
  }, {
    key: "em",
    value: function em(src) {
      var cap = this.rules.inline.em.exec(src);

      if (cap) {
        return {
          type: 'em',
          raw: cap[0],
          text: cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]
        };
      }
    }
  }, {
    key: "codespan",
    value: function codespan(src) {
      var cap = this.rules.inline.code.exec(src);

      if (cap) {
        return {
          type: 'codespan',
          raw: cap[0],
          text: _escape(cap[2].trim(), true)
        };
      }
    }
  }, {
    key: "br",
    value: function br(src) {
      var cap = this.rules.inline.br.exec(src);

      if (cap) {
        return {
          type: 'br',
          raw: cap[0]
        };
      }
    }
  }, {
    key: "del",
    value: function del(src) {
      var cap = this.rules.inline.del.exec(src);

      if (cap) {
        return {
          type: 'del',
          raw: cap[0],
          text: cap[1]
        };
      }
    }
  }, {
    key: "autolink",
    value: function autolink(src, mangle) {
      var cap = this.rules.inline.autolink.exec(src);

      if (cap) {
        var text, href;

        if (cap[2] === '@') {
          text = _escape(this.options.mangle ? mangle(cap[1]) : cap[1]);
          href = 'mailto:' + text;
        } else {
          text = _escape(cap[1]);
          href = text;
        }

        return {
          type: 'link',
          raw: cap[0],
          text: text,
          href: href,
          tokens: [{
            type: 'text',
            raw: text,
            text: text
          }]
        };
      }
    }
  }, {
    key: "url",
    value: function url(src, mangle) {
      var cap;

      if (cap = this.rules.inline.url.exec(src)) {
        var text, href;

        if (cap[2] === '@') {
          text = _escape(this.options.mangle ? mangle(cap[0]) : cap[0]);
          href = 'mailto:' + text;
        } else {
          // do extended autolink path validation
          var prevCapZero;

          do {
            prevCapZero = cap[0];
            cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);

          text = _escape(cap[0]);

          if (cap[1] === 'www.') {
            href = 'http://' + text;
          } else {
            href = text;
          }
        }

        return {
          type: 'link',
          raw: cap[0],
          text: text,
          href: href,
          tokens: [{
            type: 'text',
            raw: text,
            text: text
          }]
        };
      }
    }
  }, {
    key: "inlineText",
    value: function inlineText(src, inRawBlock, smartypants) {
      var cap = this.rules.inline.text.exec(src);

      if (cap) {
        var text;

        if (inRawBlock) {
          text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0];
        } else {
          text = _escape(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
        }

        return {
          type: 'text',
          raw: cap[0],
          text: text
        };
      }
    }
  }]);

  return Tokenizer;
}();
},{"./defaults.js":"../node_modules/marked/src/defaults.js","./helpers.js":"../node_modules/marked/src/helpers.js"}],"../node_modules/marked/src/rules.js":[function(require,module,exports) {
var _require = require('./helpers.js'),
    noopTest = _require.noopTest,
    edit = _require.edit,
    merge = _require.merge;
/**
 * Block-Level Grammar
 */


var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: '^ {0,3}(?:' // optional indentation
  + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
  + '|comment[^\\n]*(\\n+|$)' // (2)
  + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
  + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
  + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
  + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
  + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
  + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
  + ')',
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  nptable: noopTest,
  table: noopTest,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace('label', block._label).replace('title', block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}\.)/;
block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
block.item = edit(block.item, 'gm').replace(/bull/g, block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').replace('def', '\\n+(?=' + block.def.source + ')').getRegex();
block._tag = 'address|article|aside|base|basefont|blockquote|body|caption' + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?-->/;
block.html = edit(block.html, 'i').replace('comment', block._comment).replace('tag', block._tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.paragraph = edit(block._paragraph).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
.replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
.getRegex();
block.blockquote = edit(block.blockquote).replace('paragraph', block.paragraph).getRegex();
/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);
/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  nptable: '^ *([^|\\n ].*\\|.*)\\n' // Header
  + ' *([-:]+ *\\|[-| :]*)' // Align
  + '(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
  // Cells
  table: '^ *\\|(.+)\\n' // Header
  + ' *\\|?( *[-:]+[-| :]*)' // Align
  + '(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells

});
block.gfm.nptable = edit(block.gfm.nptable).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
.getRegex();
block.gfm.table = edit(block.gfm.table).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
.getRegex();
/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */

block.pedantic = merge({}, block.normal, {
  html: edit('^ *(?:comment *(?:\\n|\\s*$)' + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
  + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').replace('comment', block._comment).replace(/tag/g, '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  paragraph: edit(block.normal._paragraph).replace('hr', block.hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', block.lheading).replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').getRegex()
});
/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: '^comment' + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
  + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
  + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
  + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
  + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
  // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
  em: /^_([^\s_])_(?!_)|^_([^\s_<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s*<\[])\*(?!\*)|^\*([^\s<"][\s\S]*?[^\s\[\*])\*(?![\]`punctuation])|^\*([^\s*"<\[][\s\S]*[^\s])\*(?!\*)/,
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
}; // list of punctuation marks from common mark spec
// without ` and ] to workaround Rule 17 (inline code blocks/links)

inline._punctuation = '!"#$%&\'()*+\\-./:;<=>?@\\[^_{|}~';
inline.em = edit(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();
inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace('scheme', inline._scheme).replace('email', inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace('comment', block._comment).replace('attribute', inline._attribute).getRegex();
inline._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace('label', inline._label).replace('href', inline._href).replace('title', inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace('label', inline._label).getRegex();
/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);
/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace('label', inline._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', inline._label).getRegex()
});
/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~+(?=\S)([\s\S]*?\S)~+/,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
});
inline.gfm.url = edit(inline.gfm.url, 'i').replace('email', inline.gfm._extended_email).getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
});
module.exports = {
  block: block,
  inline: inline
};
},{"./helpers.js":"../node_modules/marked/src/helpers.js"}],"../node_modules/marked/src/Lexer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tokenizer = require('./Tokenizer.js');

var _require = require('./defaults.js'),
    defaults = _require.defaults;

var _require2 = require('./rules.js'),
    block = _require2.block,
    inline = _require2.inline;
/**
 * smartypants text replacement
 */


function smartypants(text) {
  return text // em-dashes
  .replace(/---/g, "\u2014") // en-dashes
  .replace(/--/g, "\u2013") // opening singles
  .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018") // closing singles & apostrophes
  .replace(/'/g, "\u2019") // opening doubles
  .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C") // closing doubles
  .replace(/"/g, "\u201D") // ellipses
  .replace(/\.{3}/g, "\u2026");
}
/**
 * mangle email addresses
 */


function mangle(text) {
  var out = '',
      i,
      ch;
  var l = text.length;

  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);

    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }

    out += '&#' + ch + ';';
  }

  return out;
}
/**
 * Block Lexer
 */


module.exports = /*#__PURE__*/function () {
  function Lexer(options) {
    _classCallCheck(this, Lexer);

    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options || defaults;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    var rules = {
      block: block.normal,
      inline: inline.normal
    };

    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;

      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }

    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */


  _createClass(Lexer, [{
    key: "lex",

    /**
     * Preprocessing
     */
    value: function lex(src) {
      src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ');
      this.blockTokens(src, this.tokens, true);
      this.inline(this.tokens);
      return this.tokens;
    }
    /**
     * Lexing
     */

  }, {
    key: "blockTokens",
    value: function blockTokens(src) {
      var tokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var top = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      src = src.replace(/^ +$/gm, '');
      var token, i, l;

      while (src) {
        // newline
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);

          if (token.type) {
            tokens.push(token);
          }

          continue;
        } // code


        if (token = this.tokenizer.code(src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // fences


        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // heading


        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // table no leading pipe (gfm)


        if (token = this.tokenizer.nptable(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // hr


        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // blockquote


        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.blockTokens(token.text, [], top);
          tokens.push(token);
          continue;
        } // list


        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          l = token.items.length;

          for (i = 0; i < l; i++) {
            token.items[i].tokens = this.blockTokens(token.items[i].text, [], false);
          }

          tokens.push(token);
          continue;
        } // html


        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // def


        if (top && (token = this.tokenizer.def(src))) {
          src = src.substring(token.raw.length);

          if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }

          continue;
        } // table (gfm)


        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // lheading


        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // top-level paragraph


        if (top && (token = this.tokenizer.paragraph(src))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // text


        if (token = this.tokenizer.text(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        if (src) {
          var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);

          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }

      return tokens;
    }
  }, {
    key: "inline",
    value: function inline(tokens) {
      var i, j, k, l2, row, token;
      var l = tokens.length;

      for (i = 0; i < l; i++) {
        token = tokens[i];

        switch (token.type) {
          case 'paragraph':
          case 'text':
          case 'heading':
            {
              token.tokens = [];
              this.inlineTokens(token.text, token.tokens);
              break;
            }

          case 'table':
            {
              token.tokens = {
                header: [],
                cells: []
              }; // header

              l2 = token.header.length;

              for (j = 0; j < l2; j++) {
                token.tokens.header[j] = [];
                this.inlineTokens(token.header[j], token.tokens.header[j]);
              } // cells


              l2 = token.cells.length;

              for (j = 0; j < l2; j++) {
                row = token.cells[j];
                token.tokens.cells[j] = [];

                for (k = 0; k < row.length; k++) {
                  token.tokens.cells[j][k] = [];
                  this.inlineTokens(row[k], token.tokens.cells[j][k]);
                }
              }

              break;
            }

          case 'blockquote':
            {
              this.inline(token.tokens);
              break;
            }

          case 'list':
            {
              l2 = token.items.length;

              for (j = 0; j < l2; j++) {
                this.inline(token.items[j].tokens);
              }

              break;
            }

          default:
            {// do nothing
            }
        }
      }

      return tokens;
    }
    /**
     * Lexing/Compiling
     */

  }, {
    key: "inlineTokens",
    value: function inlineTokens(src) {
      var tokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var inLink = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var inRawBlock = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var token;

      while (src) {
        // escape
        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // tag


        if (token = this.tokenizer.tag(src, inLink, inRawBlock)) {
          src = src.substring(token.raw.length);
          inLink = token.inLink;
          inRawBlock = token.inRawBlock;
          tokens.push(token);
          continue;
        } // link


        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);

          if (token.type === 'link') {
            token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
          }

          tokens.push(token);
          continue;
        } // reflink, nolink


        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);

          if (token.type === 'link') {
            token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
          }

          tokens.push(token);
          continue;
        } // strong


        if (token = this.tokenizer.strong(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        } // em


        if (token = this.tokenizer.em(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        } // code


        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // br


        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // del (gfm)


        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        } // autolink


        if (token = this.tokenizer.autolink(src, mangle)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // url (gfm)


        if (!inLink && (token = this.tokenizer.url(src, mangle))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        } // text


        if (token = this.tokenizer.inlineText(src, inRawBlock, smartypants)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        if (src) {
          var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);

          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }

      return tokens;
    }
  }], [{
    key: "lex",

    /**
     * Static Lex Method
     */
    value: function lex(src, options) {
      var lexer = new Lexer(options);
      return lexer.lex(src);
    }
  }, {
    key: "rules",
    get: function get() {
      return {
        block: block,
        inline: inline
      };
    }
  }]);

  return Lexer;
}();
},{"./Tokenizer.js":"../node_modules/marked/src/Tokenizer.js","./defaults.js":"../node_modules/marked/src/defaults.js","./rules.js":"../node_modules/marked/src/rules.js"}],"../node_modules/marked/src/Renderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./defaults.js'),
    defaults = _require.defaults;

var _require2 = require('./helpers.js'),
    cleanUrl = _require2.cleanUrl,
    escape = _require2.escape;
/**
 * Renderer
 */


module.exports = /*#__PURE__*/function () {
  function Renderer(options) {
    _classCallCheck(this, Renderer);

    this.options = options || defaults;
  }

  _createClass(Renderer, [{
    key: "code",
    value: function code(_code, infostring, escaped) {
      var lang = (infostring || '').match(/\S*/)[0];

      if (this.options.highlight) {
        var out = this.options.highlight(_code, lang);

        if (out != null && out !== _code) {
          escaped = true;
          _code = out;
        }
      }

      if (!lang) {
        return '<pre><code>' + (escaped ? _code : escape(_code, true)) + '</code></pre>';
      }

      return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? _code : escape(_code, true)) + '</code></pre>\n';
    }
  }, {
    key: "blockquote",
    value: function blockquote(quote) {
      return '<blockquote>\n' + quote + '</blockquote>\n';
    }
  }, {
    key: "html",
    value: function html(_html) {
      return _html;
    }
  }, {
    key: "heading",
    value: function heading(text, level, raw, slugger) {
      if (this.options.headerIds) {
        return '<h' + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + '</h' + level + '>\n';
      } // ignore IDs


      return '<h' + level + '>' + text + '</h' + level + '>\n';
    }
  }, {
    key: "hr",
    value: function hr() {
      return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
    }
  }, {
    key: "list",
    value: function list(body, ordered, start) {
      var type = ordered ? 'ol' : 'ul',
          startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
      return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
    }
  }, {
    key: "listitem",
    value: function listitem(text) {
      return '<li>' + text + '</li>\n';
    }
  }, {
    key: "checkbox",
    value: function checkbox(checked) {
      return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox"' + (this.options.xhtml ? ' /' : '') + '> ';
    }
  }, {
    key: "paragraph",
    value: function paragraph(text) {
      return '<p>' + text + '</p>\n';
    }
  }, {
    key: "table",
    value: function table(header, body) {
      if (body) body = '<tbody>' + body + '</tbody>';
      return '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
    }
  }, {
    key: "tablerow",
    value: function tablerow(content) {
      return '<tr>\n' + content + '</tr>\n';
    }
  }, {
    key: "tablecell",
    value: function tablecell(content, flags) {
      var type = flags.header ? 'th' : 'td';
      var tag = flags.align ? '<' + type + ' align="' + flags.align + '">' : '<' + type + '>';
      return tag + content + '</' + type + '>\n';
    } // span level renderer

  }, {
    key: "strong",
    value: function strong(text) {
      return '<strong>' + text + '</strong>';
    }
  }, {
    key: "em",
    value: function em(text) {
      return '<em>' + text + '</em>';
    }
  }, {
    key: "codespan",
    value: function codespan(text) {
      return '<code>' + text + '</code>';
    }
  }, {
    key: "br",
    value: function br() {
      return this.options.xhtml ? '<br/>' : '<br>';
    }
  }, {
    key: "del",
    value: function del(text) {
      return '<del>' + text + '</del>';
    }
  }, {
    key: "link",
    value: function link(href, title, text) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);

      if (href === null) {
        return text;
      }

      var out = '<a href="' + escape(href) + '"';

      if (title) {
        out += ' title="' + title + '"';
      }

      out += '>' + text + '</a>';
      return out;
    }
  }, {
    key: "image",
    value: function image(href, title, text) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);

      if (href === null) {
        return text;
      }

      var out = '<img src="' + href + '" alt="' + text + '"';

      if (title) {
        out += ' title="' + title + '"';
      }

      out += this.options.xhtml ? '/>' : '>';
      return out;
    }
  }, {
    key: "text",
    value: function text(_text) {
      return _text;
    }
  }]);

  return Renderer;
}();
},{"./defaults.js":"../node_modules/marked/src/defaults.js","./helpers.js":"../node_modules/marked/src/helpers.js"}],"../node_modules/marked/src/TextRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * TextRenderer
 * returns only the textual part of the token
 */
module.exports = /*#__PURE__*/function () {
  function TextRenderer() {
    _classCallCheck(this, TextRenderer);
  }

  _createClass(TextRenderer, [{
    key: "strong",
    // no need for block level renderers
    value: function strong(text) {
      return text;
    }
  }, {
    key: "em",
    value: function em(text) {
      return text;
    }
  }, {
    key: "codespan",
    value: function codespan(text) {
      return text;
    }
  }, {
    key: "del",
    value: function del(text) {
      return text;
    }
  }, {
    key: "html",
    value: function html(text) {
      return text;
    }
  }, {
    key: "text",
    value: function text(_text) {
      return _text;
    }
  }, {
    key: "link",
    value: function link(href, title, text) {
      return '' + text;
    }
  }, {
    key: "image",
    value: function image(href, title, text) {
      return '' + text;
    }
  }, {
    key: "br",
    value: function br() {
      return '';
    }
  }]);

  return TextRenderer;
}();
},{}],"../node_modules/marked/src/Slugger.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Slugger generates header id
 */
module.exports = /*#__PURE__*/function () {
  function Slugger() {
    _classCallCheck(this, Slugger);

    this.seen = {};
  }
  /**
   * Convert string to unique id
   */


  _createClass(Slugger, [{
    key: "slug",
    value: function slug(value) {
      var slug = value.toLowerCase().trim() // remove html tags
      .replace(/<[!\/a-z].*?>/ig, '') // remove unwanted chars
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '').replace(/\s/g, '-');

      if (this.seen.hasOwnProperty(slug)) {
        var originalSlug = slug;

        do {
          this.seen[originalSlug]++;
          slug = originalSlug + '-' + this.seen[originalSlug];
        } while (this.seen.hasOwnProperty(slug));
      }

      this.seen[slug] = 0;
      return slug;
    }
  }]);

  return Slugger;
}();
},{}],"../node_modules/marked/src/Parser.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Renderer = require('./Renderer.js');

var TextRenderer = require('./TextRenderer.js');

var Slugger = require('./Slugger.js');

var _require = require('./defaults.js'),
    defaults = _require.defaults;

var _require2 = require('./helpers.js'),
    unescape = _require2.unescape;
/**
 * Parsing & Compiling
 */


module.exports = /*#__PURE__*/function () {
  function Parser(options) {
    _classCallCheck(this, Parser);

    this.options = options || defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }
  /**
   * Static Parse Method
   */


  _createClass(Parser, [{
    key: "parse",

    /**
     * Parse Loop
     */
    value: function parse(tokens) {
      var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var out = '',
          i,
          j,
          k,
          l2,
          l3,
          row,
          cell,
          header,
          body,
          token,
          ordered,
          start,
          loose,
          itemBody,
          item,
          checked,
          task,
          checkbox;
      var l = tokens.length;

      for (i = 0; i < l; i++) {
        token = tokens[i];

        switch (token.type) {
          case 'space':
            {
              continue;
            }

          case 'hr':
            {
              out += this.renderer.hr();
              continue;
            }

          case 'heading':
            {
              out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
              continue;
            }

          case 'code':
            {
              out += this.renderer.code(token.text, token.lang, token.escaped);
              continue;
            }

          case 'table':
            {
              header = ''; // header

              cell = '';
              l2 = token.header.length;

              for (j = 0; j < l2; j++) {
                cell += this.renderer.tablecell(this.parseInline(token.tokens.header[j]), {
                  header: true,
                  align: token.align[j]
                });
              }

              header += this.renderer.tablerow(cell);
              body = '';
              l2 = token.cells.length;

              for (j = 0; j < l2; j++) {
                row = token.tokens.cells[j];
                cell = '';
                l3 = row.length;

                for (k = 0; k < l3; k++) {
                  cell += this.renderer.tablecell(this.parseInline(row[k]), {
                    header: false,
                    align: token.align[k]
                  });
                }

                body += this.renderer.tablerow(cell);
              }

              out += this.renderer.table(header, body);
              continue;
            }

          case 'blockquote':
            {
              body = this.parse(token.tokens);
              out += this.renderer.blockquote(body);
              continue;
            }

          case 'list':
            {
              ordered = token.ordered;
              start = token.start;
              loose = token.loose;
              l2 = token.items.length;
              body = '';

              for (j = 0; j < l2; j++) {
                item = token.items[j];
                checked = item.checked;
                task = item.task;
                itemBody = '';

                if (item.task) {
                  checkbox = this.renderer.checkbox(checked);

                  if (loose) {
                    if (item.tokens[0].type === 'text') {
                      item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;

                      if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                        item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                      }
                    } else {
                      item.tokens.unshift({
                        type: 'text',
                        text: checkbox
                      });
                    }
                  } else {
                    itemBody += checkbox;
                  }
                }

                itemBody += this.parse(item.tokens, loose);
                body += this.renderer.listitem(itemBody, task, checked);
              }

              out += this.renderer.list(body, ordered, start);
              continue;
            }

          case 'html':
            {
              // TODO parse inline content if parameter markdown=1
              out += this.renderer.html(token.text);
              continue;
            }

          case 'paragraph':
            {
              out += this.renderer.paragraph(this.parseInline(token.tokens));
              continue;
            }

          case 'text':
            {
              body = token.tokens ? this.parseInline(token.tokens) : token.text;

              while (i + 1 < l && tokens[i + 1].type === 'text') {
                token = tokens[++i];
                body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
              }

              out += top ? this.renderer.paragraph(body) : body;
              continue;
            }

          default:
            {
              var errMsg = 'Token with "' + token.type + '" type was not found.';

              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
        }
      }

      return out;
    }
    /**
     * Parse Inline Tokens
     */

  }, {
    key: "parseInline",
    value: function parseInline(tokens, renderer) {
      renderer = renderer || this.renderer;
      var out = '',
          i,
          token;
      var l = tokens.length;

      for (i = 0; i < l; i++) {
        token = tokens[i];

        switch (token.type) {
          case 'escape':
            {
              out += renderer.text(token.text);
              break;
            }

          case 'html':
            {
              out += renderer.html(token.text);
              break;
            }

          case 'link':
            {
              out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
              break;
            }

          case 'image':
            {
              out += renderer.image(token.href, token.title, token.text);
              break;
            }

          case 'strong':
            {
              out += renderer.strong(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'em':
            {
              out += renderer.em(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'codespan':
            {
              out += renderer.codespan(token.text);
              break;
            }

          case 'br':
            {
              out += renderer.br();
              break;
            }

          case 'del':
            {
              out += renderer.del(this.parseInline(token.tokens, renderer));
              break;
            }

          case 'text':
            {
              out += renderer.text(token.text);
              break;
            }

          default:
            {
              var errMsg = 'Token with "' + token.type + '" type was not found.';

              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
        }
      }

      return out;
    }
  }], [{
    key: "parse",
    value: function parse(tokens, options) {
      var parser = new Parser(options);
      return parser.parse(tokens);
    }
  }]);

  return Parser;
}();
},{"./Renderer.js":"../node_modules/marked/src/Renderer.js","./TextRenderer.js":"../node_modules/marked/src/TextRenderer.js","./Slugger.js":"../node_modules/marked/src/Slugger.js","./defaults.js":"../node_modules/marked/src/defaults.js","./helpers.js":"../node_modules/marked/src/helpers.js"}],"../node_modules/marked/src/marked.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Lexer = require('./Lexer.js');

var Parser = require('./Parser.js');

var Tokenizer = require('./Tokenizer.js');

var Renderer = require('./Renderer.js');

var TextRenderer = require('./TextRenderer.js');

var Slugger = require('./Slugger.js');

var _require = require('./helpers.js'),
    merge = _require.merge,
    checkSanitizeDeprecation = _require.checkSanitizeDeprecation,
    escape = _require.escape;

var _require2 = require('./defaults.js'),
    getDefaults = _require2.getDefaults,
    changeDefaults = _require2.changeDefaults,
    defaults = _require2.defaults;
/**
 * Marked
 */


function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }

  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    var _ret = function () {
      if (!callback) {
        callback = opt;
        opt = null;
      }

      opt = merge({}, marked.defaults, opt || {});
      checkSanitizeDeprecation(opt);
      var highlight = opt.highlight;
      var tokens,
          pending,
          i = 0;

      try {
        tokens = Lexer.lex(src, opt);
      } catch (e) {
        return {
          v: callback(e)
        };
      }

      pending = tokens.length;

      var done = function done(err) {
        if (err) {
          opt.highlight = highlight;
          return callback(err);
        }

        var out;

        try {
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err = e;
        }

        opt.highlight = highlight;
        return err ? callback(err) : callback(null, out);
      };

      if (!highlight || highlight.length < 3) {
        return {
          v: done()
        };
      }

      delete opt.highlight;
      if (!pending) return {
        v: done()
      };

      for (; i < tokens.length; i++) {
        (function (token) {
          if (token.type !== 'code') {
            return --pending || done();
          }

          return highlight(token.text, token.lang, function (err, code) {
            if (err) return done(err);

            if (code == null || code === token.text) {
              return --pending || done();
            }

            token.text = code;
            token.escaped = true;
            --pending || done();
          });
        })(tokens[i]);
      }

      return {
        v: void 0
      };
    }();

    if (_typeof(_ret) === "object") return _ret.v;
  }

  try {
    opt = merge({}, marked.defaults, opt || {});
    checkSanitizeDeprecation(opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';

    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>' + escape(e.message + '', true) + '</pre>';
    }

    throw e;
  }
}
/**
 * Options
 */


marked.options = marked.setOptions = function (opt) {
  merge(marked.defaults, opt);
  changeDefaults(marked.defaults);
  return marked;
};

marked.getDefaults = getDefaults;
marked.defaults = defaults;
/**
 * Use Extension
 */

marked.use = function (extension) {
  var opts = merge({}, extension);

  if (extension.renderer) {
    (function () {
      var renderer = marked.defaults.renderer || new Renderer();

      var _loop = function _loop(prop) {
        var prevRenderer = renderer[prop];

        renderer[prop] = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var ret = extension.renderer[prop].apply(renderer, args);

          if (ret === false) {
            ret = prevRenderer.apply(renderer, args);
          }

          return ret;
        };
      };

      for (var prop in extension.renderer) {
        _loop(prop);
      }

      opts.renderer = renderer;
    })();
  }

  if (extension.tokenizer) {
    (function () {
      var tokenizer = marked.defaults.tokenizer || new Tokenizer();

      var _loop2 = function _loop2(prop) {
        var prevTokenizer = tokenizer[prop];

        tokenizer[prop] = function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var ret = extension.tokenizer[prop].apply(tokenizer, args);

          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args);
          }

          return ret;
        };
      };

      for (var prop in extension.tokenizer) {
        _loop2(prop);
      }

      opts.tokenizer = tokenizer;
    })();
  }

  marked.setOptions(opts);
};
/**
 * Expose
 */


marked.Parser = Parser;
marked.parser = Parser.parse;
marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;
marked.Lexer = Lexer;
marked.lexer = Lexer.lex;
marked.Tokenizer = Tokenizer;
marked.Slugger = Slugger;
marked.parse = marked;
module.exports = marked;
},{"./Lexer.js":"../node_modules/marked/src/Lexer.js","./Parser.js":"../node_modules/marked/src/Parser.js","./Tokenizer.js":"../node_modules/marked/src/Tokenizer.js","./Renderer.js":"../node_modules/marked/src/Renderer.js","./TextRenderer.js":"../node_modules/marked/src/TextRenderer.js","./Slugger.js":"../node_modules/marked/src/Slugger.js","./helpers.js":"../node_modules/marked/src/helpers.js","./defaults.js":"../node_modules/marked/src/defaults.js"}],"engine/forms/index.ts":[function(require,module,exports) {
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

require("reflect-metadata");

require("./dark.scss");

var marked = require("marked");

var PropElementType;

(function (PropElementType) {
  PropElementType[PropElementType["INPUT"] = 0] = "INPUT";
  PropElementType[PropElementType["DROPDOWN"] = 1] = "DROPDOWN";
  PropElementType[PropElementType["BUTTON"] = 2] = "BUTTON";
  PropElementType[PropElementType["OBJECT"] = 3] = "OBJECT";
  PropElementType[PropElementType["ARRAY"] = 4] = "ARRAY";
  PropElementType[PropElementType["MARKDOWN"] = 5] = "MARKDOWN";
})(PropElementType = exports.PropElementType || (exports.PropElementType = {})); // for an <input type='xxxx' />
// based on the type, this lookup returns the method that
// should be used for retriving the value


var inputTypeValueLookup = {
  text: 'value',
  date: 'valueAsDate',
  number: 'valueAsNumber',
  checkbox: 'checked'
}; // for a given data type, we want to know which type to use
// for an <input type="xxxx" />

var dataTypeInputTypeLookup = {
  String: 'text',
  Date: 'date',
  Number: 'number',
  Boolean: 'checkbox'
}; // for a given data type, we want to know what our default builder function should be.

var dataTypeElementTypeLookup = {
  Function: PropElementType.BUTTON,
  String: PropElementType.INPUT,
  Date: PropElementType.INPUT,
  Number: PropElementType.INPUT,
  Boolean: PropElementType.INPUT,
  Array: PropElementType.ARRAY,
  Object: PropElementType.OBJECT
};

function editable(options) {
  if (options === void 0) {
    options = {};
  } // If we specify dropdown_enum_options
  // than we are automaticly assuming this is a dropdown menu


  if (options.dropdown_enum_options) {
    options.dropdown_options = Object.keys(options.dropdown_enum_options).filter(function (key) {
      return isNaN(Number(key));
    }).map(function (z) {
      return {
        name: z,
        value: options.dropdown_enum_options[z]
      };
    });
  } // if we have specified dropdown options
  // than change the PropElementType to dropdown


  if (!options.type && options.dropdown_options) {
    options.type = PropElementType.DROPDOWN;
  }

  return function (parent, propertyKey) {
    var dataType = Reflect.getMetadata("design:type", parent, propertyKey).name; // set default values on the passed in options

    options.type = options.type || dataTypeElementTypeLookup[dataType];
    options.inputType = dataTypeInputTypeLookup[dataType];
    options.label = options.label !== undefined ? options.label : splitToWords(propertyKey);
    options.description = options.description || '';
    options.items_per_row = options.items_per_row || 1;
    var properties = Reflect.getMetadata("editableProperties", parent) || [];

    if (properties.indexOf(propertyKey) < 0) {
      createChangeProps(parent, propertyKey);
      properties.push({
        parent: parent,
        key: propertyKey,
        dataType: dataType,
        options: options
      });
    }

    Reflect.defineMetadata("editableProperties", properties, parent);
  };
}

exports.editable = editable; // This method creates a getter/setter
// for the provided property, allowing us to listen for changes to the value

function createChangeProps(parent, propertyKey) {
  var key = "__" + propertyKey + "__";

  var getter = function getter() {
    return this[key];
  };

  var setter = function setter(value) {
    var e_1, _a;

    var oldValue = this[key];
    this[key] = value;

    try {
      for (var _b = __values(this["__on_change_" + propertyKey] || []), _c = _b.next(); !_c.done; _c = _b.next()) {
        var fn = _c.value;
        fn(oldValue, value);
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
  };

  Object.defineProperty(parent, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

function addPropChangeEvent(obj, property, callback) {
  obj["__on_change_" + property] = obj["__on_change_" + property] || [];
  obj["__on_change_" + property].push(callback);
}

var createInputField = function createInputField(property, obj, onFormChange) {
  // create the label
  var labelElem = document.createElement("label");
  labelElem.textContent = property.options.label;
  labelElem.htmlFor = property.key; // create the description element

  var descriptionElem = document.createElement('span');
  descriptionElem.innerHTML = property.options.description; // create the input element

  var inputElem = document.createElement("input");
  var inputType = property.options.inputType;
  inputElem.id = property;
  inputElem.type = inputType;
  inputElem.autocomplete = "off"; // assign the input element value, using the correct value method
  // from the inputTypeValueLookup table.

  inputElem[inputTypeValueLookup[inputType]] = obj[property.key]; // listen for change event on the input element, and update the property

  inputElem.addEventListener('input', function () {
    obj[property.key] = inputElem[inputTypeValueLookup[inputType]];
    onFormChange();
  }); // listen for change events to the value, and update the inputElement

  addPropChangeEvent(obj, property.key, function (oldValue, newValue) {
    inputElem[inputTypeValueLookup[inputType]] = newValue;
  }); // create the list item

  var listItemElem = document.createElement('li');
  listItemElem.classList.add("fb-element-" + inputType);
  listItemElem.appendChild(labelElem);
  listItemElem.appendChild(inputElem);
  listItemElem.appendChild(descriptionElem);
  return listItemElem;
};

var createSelectField = function createSelectField(property, obj, onFormChange) {
  var e_2, _a; // create the label


  var labelElem = document.createElement("label");
  labelElem.textContent = property.options.label;
  labelElem.htmlFor = property.key; // create the description element

  var descriptionElem = document.createElement('span');
  descriptionElem.innerHTML = property.options.description; // create the select element

  var inputElem = document.createElement("select");
  inputElem.id = property.key;
  inputElem.autocomplete = "off";
  inputElem.value = obj[property.key];

  try {
    // add the child options elements to the select
    for (var _b = __values(property.options.dropdown_options), _c = _b.next(); !_c.done; _c = _b.next()) {
      var opt = _c.value;
      var optionElem = document.createElement('option');
      optionElem.value = opt.value;
      optionElem.innerHTML = opt.name;
      inputElem.appendChild(optionElem);
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
  } // listen for value changes on the select input to update the property


  inputElem.addEventListener('input', function () {
    obj[property.key] = inputElem.value;
    onFormChange();
  }); // listen for changes on the property to update the select element

  addPropChangeEvent(obj, property.key, function (oldValue, newValue) {
    inputElem.value = newValue;
  }); // create the list item

  var listItemElem = document.createElement('li');
  listItemElem.classList.add("fb-element-select");
  listItemElem.appendChild(labelElem);
  listItemElem.appendChild(inputElem);
  listItemElem.appendChild(descriptionElem);
  return listItemElem;
};

var createMarkdownField = function createMarkdownField(property, obj, onFormChange) {
  // create the markdown element
  var markdownElement = document.createElement('div');
  markdownElement.classList.add('markdown');
  markdownElement.innerHTML = marked(escape(obj[property.key])); // listen for changes to the property, and update the inner html

  addPropChangeEvent(obj, property.key, function (oldValue, newValue) {
    markdownElement.innerHTML = marked(escape(newValue));
  }); // create the list item

  var listItemElem = document.createElement('li');
  listItemElem.classList.add("fb-element-markdown");
  listItemElem.appendChild(markdownElement);
  return listItemElem;
};

var createButtonField = function createButtonField(property, obj, onFormChange) {
  // create a button element
  var btn = document.createElement('button');
  btn.innerHTML = property.options.label; // listen for button click, and invoke function.

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    obj[property.key]();
  }); // create the list item

  var listItemElem = document.createElement('li');
  listItemElem.classList.add("fb-element-button");
  listItemElem.appendChild(btn);
  return listItemElem;
};

var createArrayField = function createArrayField(property, obj, onFormChange) {
  // create the label
  var labelElem = document.createElement("label");
  labelElem.textContent = property.options.label;
  labelElem.htmlFor = property.key; // create the description element

  var descriptionElem = document.createElement('span');
  descriptionElem.innerHTML = property.options.description; // create list of dom elements for each item in the array

  var ulElem = document.createElement('ul');

  var buildItemList = function buildItemList(element, index) {
    if (index % property.options.items_per_row === 0) {
      var breakLi = document.createElement('li');
      breakLi.classList.add('break');
      ulElem.appendChild(breakLi);
    }

    var li = document.createElement('li');
    var input = document.createElement('input');
    input.type = dataTypeInputTypeLookup[obj[property.key][index].constructor.name];
    input.autocomplete = 'off';
    input.id = "fb-input-" + property + "-" + index;
    input.addEventListener('input', function (e) {
      obj[property.key][index] = input[inputTypeValueLookup[input.type]];
      onFormChange();
    });
    input[inputTypeValueLookup[input.type]] = obj[property.key][index];
    ;
    li.appendChild(input);
    ulElem.appendChild(li);
  }; // build the html for each item in the array


  obj[property.key].forEach(buildItemList); // listen for value changes on the array, and rebuild the dom

  addPropChangeEvent(obj, property.key, function (oldVal, newVal) {
    ulElem.innerHTML = '';
    obj[property.key].forEach(buildItemList);
  }); // create the list item

  var listItemElem = document.createElement('li');
  listItemElem.classList.add("fb-element-array");
  listItemElem.appendChild(labelElem);
  listItemElem.appendChild(ulElem);
  listItemElem.appendChild(descriptionElem);
  return listItemElem;
};

var createObjectField = function createObjectField(property, obj, onFormChange) {
  // create the label
  var labelElem = document.createElement("label");
  labelElem.textContent = property.options.label;
  labelElem.htmlFor = property.key; // create the description element

  var descriptionElem = document.createElement('span');
  descriptionElem.innerHTML = property.options.description; // create a list of dom elements for each value in the object.

  var ulElem = document.createElement('ul');

  var buidElementFn = function buidElementFn(key, index) {
    if (index % property.options.items_per_row === 0) {
      var breakLi = document.createElement('li');
      breakLi.classList.add('break');
      ulElem.appendChild(breakLi);
    }

    var li = document.createElement('li');
    var elementType = obj[property.key][key].constructor.name;
    var inputType = dataTypeInputTypeLookup[elementType];

    if (inputType) {
      var name = document.createElement('label');
      name.innerHTML = key;
      var input_1 = document.createElement('input');
      input_1.type = inputType;
      input_1.autocomplete = 'off';
      input_1.id = "fb-input-" + property + "-" + index;
      input_1.addEventListener('input', function (e) {
        obj[property.key][key] = input_1.value;
        onFormChange();
      });
      input_1.value = obj[property.key][key];
      li.appendChild(name);
      li.appendChild(input_1);
    } else if (elementType === 'Function') {
      var btn = document.createElement('button');
      btn.innerHTML = splitToWords(key);
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        obj[property.key][key]();
      });
      li.appendChild(btn);
    }

    ulElem.appendChild(li);
    index += 1;
  };

  Object.keys(obj[property.key]).forEach(buidElementFn);
  addPropChangeEvent(obj, property.key, function (oldValue, newVale) {
    ulElem.innerHTML = '';
    Object.keys(obj[property.key]).forEach(buidElementFn);
    console.log('change');
  }); // create the list item

  var listItemElem = document.createElement('li');
  listItemElem.classList.add("fb-element-object");
  listItemElem.appendChild(labelElem);
  listItemElem.appendChild(ulElem);
  listItemElem.appendChild(descriptionElem);
  return listItemElem;
};

var fieldRenderFunc = {
  INPUT: createInputField,
  DROPDOWN: createSelectField,
  MARKDOWN: createMarkdownField,
  BUTTON: createButtonField,
  ARRAY: createArrayField,
  OBJECT: createObjectField
};

function generateForm(parentElement, obj, onFormChange) {
  var e_3, _a;

  if (onFormChange === void 0) {
    onFormChange = function onFormChange() {};
  }

  var form = document.createElement("form");
  parentElement.innerHTML = '';
  parentElement.appendChild(form);
  var formList = document.createElement('ul');
  form.appendChild(formList);
  var properties = Reflect.getMetadata("editableProperties", obj) || [];

  try {
    // create the input elements
    for (var properties_1 = __values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
      var property = properties_1_1.value; // get the render function from our lookup

      var createFieldFn = fieldRenderFunc[PropElementType[property.options.type]] || fieldRenderFunc['OBJECT'];

      if (createFieldFn) {
        // create the markup and append
        var elem = createFieldFn(property, obj, onFormChange);
        formList.appendChild(elem);
      }
    }
  } catch (e_3_1) {
    e_3 = {
      error: e_3_1
    };
  } finally {
    try {
      if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return)) _a.call(properties_1);
    } finally {
      if (e_3) throw e_3.error;
    }
  }
}

exports.generateForm = generateForm; // looks at the number of spaces on the first line
// and strips them from every other line
// this allows us to have multiline strings that are nicelly indented
// in our code.

function escape(str) {
  var lines = str.split('\n');
  if (lines.length === 1) return lines[0];
  var initialSpaceLength = lines[1].length - lines[1].trimStart().length;

  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i].substr(initialSpaceLength);
  }

  return lines.join('\n');
} // Converts a str from 'pascalCase' to seperate words
// eg: 'firstName' to 'First name'


function splitToWords(str) {
  var newStr = str[0].toUpperCase();

  for (var i = 1; i < str.length; i++) {
    var last_char = str[i - 1] || '';
    var prevUpper = last_char === last_char.toUpperCase();
    var isUpper = str[i] === str[i].toUpperCase();
    if (isUpper && !prevUpper) newStr += ' ';
    newStr += str[i].toLowerCase();
  }

  return newStr;
}
},{"reflect-metadata":"../node_modules/reflect-metadata/Reflect.js","./dark.scss":"engine/forms/dark.scss","marked":"../node_modules/marked/src/marked.js"}],"index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var demos_1 = __importDefault(require("./demos"));

var forms_1 = require("./engine/forms"); // ============================================================================
// Launch the canvas demo
// ============================================================================


var app = null;

function getDemoNameFromHash() {
  var _a;

  var pathnames = window.location.hash.substr(1).split('/').filter(function (z) {
    return z !== "";
  });
  var demoName = (_a = pathnames[0]) !== null && _a !== void 0 ? _a : 'LightBender';
  return demoName;
}

function runApp() {
  if (app) {
    app.destroy();
    app = null;
  }

  app = demos_1.default("canvas", getDemoNameFromHash());
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
  var menuBtn_1 = document.querySelector('#main-menu-button');
  var mainMenuContainerElem_1 = document.querySelector('.main-menu-container');
  var menuMenuElem = document.querySelector('.main-menu');
  var docsBtn_1 = document.querySelector('#docs-menu-button');
  var docsMenuContainerElem_1 = document.querySelector('.docs-menu-container');
  var pageNav_1 = document.querySelector('.page-nav');
  var menuBackdrop_1 = document.querySelector('.backdrop');
  var canvasElem_1 = document.querySelector('#canvas');
  var menuOpen_1 = false;
  var docsOpen_1 = false;
  menuBtn_1.addEventListener('click', function () {
    mainMenuOpen_1(!menuOpen_1);
  });
  docsBtn_1.addEventListener('click', function () {
    console.log('clicky');
    docsMenuOpen_1(!docsOpen_1);
  });
  menuBackdrop_1.addEventListener('click', function () {
    mainMenuOpen_1(!menuOpen_1);
  });

  var mainMenuOpen_1 = function mainMenuOpen_1(visible) {
    menuOpen_1 = visible;

    if (menuOpen_1) {
      mainMenuContainerElem_1.classList.add('open');
      canvasElem_1.classList.add('push-right-200');
      pageNav_1.classList.add('push-right-400');
      menuBtn_1.classList.add('open');
      menuBackdrop_1.classList.add('active');
    } else {
      mainMenuContainerElem_1.classList.remove('open');
      canvasElem_1.classList.remove('push-right-200');
      pageNav_1.classList.remove('push-right-400');
      menuBtn_1.classList.remove('open');
      menuBackdrop_1.classList.remove('active');
    }
  };

  var docsMenuOpen_1 = function docsMenuOpen_1(visible) {
    docsOpen_1 = visible;

    if (docsOpen_1) {
      docsMenuContainerElem_1.classList.add('open');
      docsBtn_1.classList.add('open');
      canvasElem_1.classList.add('push-left-200');
      pageNav_1.classList.add('push-left-400');
    } else {
      docsMenuContainerElem_1.classList.remove('open');
      docsBtn_1.classList.remove('open');
      canvasElem_1.classList.remove('push-left-200');
      pageNav_1.classList.remove('push-left-400');
    }
  }; // ============================================================================
  // TEST FORMS GENERATION
  // ============================================================================


  var TestForm =
  /** @class */
  function () {
    function TestForm() {
      this.info = "\n        # ARCGL\n\n        A simple typescript / webgl framework\n        for creating interesting interactive demos\n        ";
      this.buttons = {
        RayCast: function RayCast() {
          window.location.hash = 'RayCastingDemo';
        },
        SpriteRotationAroundOrigin: function SpriteRotationAroundOrigin() {
          window.location.hash = 'RectRotationDemo';
        },
        RenderToTexture: function RenderToTexture() {
          window.location.hash = 'RenderTextureDemo';
        },
        LightBender: function LightBender() {
          window.location.hash = 'LightBender';
        }
      };
    }

    __decorate([forms_1.editable({
      type: forms_1.PropElementType.MARKDOWN
    }), __metadata("design:type", String)], TestForm.prototype, "info", void 0);

    __decorate([forms_1.editable({
      label: '',
      description: 'Demos'
    }), __metadata("design:type", Object)], TestForm.prototype, "buttons", void 0);

    return TestForm;
  }();

  var testFormInstance_1 = new TestForm();
  console.log(JSON.stringify(testFormInstance_1));
  forms_1.generateForm(menuMenuElem, testFormInstance_1, function () {
    console.log(testFormInstance_1);
  });
}
},{"./demos":"demos/index.ts","./engine/forms":"engine/forms/index.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50710" + '/');

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