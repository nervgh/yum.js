/**
 * yum.js
 *
 * It is a small library for vanilla.js
 * Extends global constructors useful methods
 *
 * @author: https://github.com/nervgh
 * @version: 0.1.2, 2013-12-20
 */



/**
 * THE NUMBER
 */

/**
 * Returns "true" if a value is NaN
* @borrows global.isNaN as isNaN
 */
Number.isNaN = Number.isNaN || this.isNaN;

/**
 * Returns "true" if a value is number
 * @param {*} v A value
 * @return {Boolean}
 */
Number.isNumber = function(v) {
    return typeof v === 'number' && !this.isNaN(v);
};

/**
 * Returns "true" if a number is integer
 * @param {Number} n A number
 * @return {Boolean}
 */
Number.isInteger = Number.isInteger || function(n) {
    return (n | 0) === n;
};

/**
 * Returns "true" if a number is float
 * @param {Number} n A number
 * @return {Boolean}
 */
Number.isFloat = function(n) {
    return (n | 0) !== n;
};

/**
 * Returns "true" if a number is odd
 * @param {Number} n A integer number
 * @return {Boolean}
 */
Number.isOdd = function(n) {
    return (n & 1) !== 0;
};

/**
 * Returns "true" if a number is even
 * @param {Number} n A integer number
 * @return {Boolean}
 */
Number.isEven = function(n) {
    return (n & 1) === 0;
};



/**
 * THE MATH
 */

/**
 * Returns Greatest Common Divisor
 * @param {Number} u A positive integer number
 * @param {Number} v A positive integer number
 * @return {Number}
 */
Math.gcd = function(u, v) {
    var shift = 0, diff = 0;

    if (u === 0 || v === 0) {
        return u | v;
    }

    for(; ((u | v) & 1) === 0; u >>= 1, v >>= 1, shift++);

    for(; (u & 1) === 0; u >>= 1);

    do {
        for(; (v & 1) === 0; v >>= 1);

        if (u < v) {
            v -= u;
        } else {
            diff = u - v;
            u = v;
            v = diff;
        }

    } while (v !== 0);

    return u << shift;
};

/**
 * Returns Least Common Multiple
 * @param {Number} u A positive integer number
 * @param {Number} v A positive integer number
 * @return {Number}
 */
Math.lcm = function(u, v) {
    return u * v / Math.gcd(u, v);
};



/**
 * THE OBJECT
 */

/**
 * @borrows toString as toString
 */
Object.toString = Object.prototype.toString;

/**
 * Returns "true" if a value is object
 * @param {*} v A value
 * @return {Boolean}
 */
Object.isObject = function(v) {
    return Object.toString.call(v) === '[object Object]';
};

/**
 * Compares parameters by value
 * https://github.com/angular/angular.js/blob/master/src/Angular.js
 * @param {*} a A value
 * @param {*} b A value
 * @return {Boolean}
 */
Object.isEqual = function(a, b) {
    if (a === b) return true; // Number, String, Boolean, null, undefined, objects by link
    if (a !== a && b !== b) return true; // NaN === NaN
    var t1 = Object.toString.call(a), t2 = Object.toString.call(b), t, i, len, key, hash;
    if (t1 !== t2) return false;
    t = t1.slice(8, -1);
    switch(t) {
        case 'Function': return a.toString() === b.toString();
        case 'Date': return a.getTime() === b.getTime();
        case 'RegExp': return a.toString() === b.toString();
        case 'Array':
            if ((len = a.length) !== b.length) return false;
            for(i = 0; i < len; i++) {
                if (!this.isEqual(a[i], b[i])) return false;
            }
            return true;
        case 'Object':
            hash = {};
            for(key in a) {
                if (!a.hasOwnProperty(key)) continue;
                if (key in b && b.hasOwnProperty(key)) {
                    if (!this.isEqual(a[key],b[key])) return false;
                } else {
                    return false;
                }
                hash[key] = true;
            }
            for(key in b) {
                if (!b.hasOwnProperty(key)) continue;
                if (!(key in hash)) return false;
            }
            return true;
    }
    return false;
};

/**
 * Creates clone of object
 * Not working with DOM elements
 * http://stackoverflow.com/a/728694
 * https://github.com/andrewplummer/Sugar/blob/master/lib/object.js#L328
 * @param {Object} obj
 * @return {Object}
 */
Object.clone = function(obj) {
    // Number, String, Boolean, Function, null, undefined
    if (null === obj || 'object' !== typeof obj) {
        return obj;
    }

    // Date and RegExp
    if (Date.isDate(obj) || RegExp.isRegExp(obj)) {
        return new obj.constructor(obj);
        // Array and Object
    } else {
        var copy = Array.isArray(obj) ? [] : {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = this.clone(obj[key]);
            }
        }
        return copy;
    }
};



/**
 * THE BOOLEAN
 */

/**
 * Returns "true" if a value is boolean
 * @param {*} v A value
 * @return {Boolean}
 */
Boolean.isBoolean = function(v) {
    return typeof v === 'boolean';
};



/**
 * THE STRING
 */

/**
 * Returns "true" if a value is string
 * @param {*} v A value
 * @return {Boolean}
 */
String.isString = function(v) {
    return typeof v === 'string';
};



/**
 * THE FUNCTION
 */

/**
 * Returns "true" if a value is function
 * @param {*} v A value
 * @return {Boolean}
 */
Function.isFunction = function(v) {
    return typeof v === 'function';
};



/**
 * THE DATE
 */

/**
 * Returns "true" if a value is date
 * @param {*} v A value
 * @return {Boolean}
 */
Date.isDate = function(v) {
    return Object.toString.call(v) === '[object Date]';
};



/**
 * THE REGEXP
 */

/**
 * Returns "true" if a value is regular expression
 * @param {*} v A value
 * @return {Boolean}
 */
RegExp.isRegExp = function(v) {
    return Object.toString.call(v) === '[object RegExp]';
};



/**
 * THE ARRAY
 */

/**
 * Returns "true" if a value is array
 * @param {*} v A value
 * @return {Boolean}
 */
Array.isArray = Array.isArray || function(v) {
    return Object.toString.call(v) === '[object Array]';
};



/**
 * FUNCTIONS
 */

/**
 * Returns "true" if a value is primitive
 * @param {*} v A value
 * @returns {Boolean}
 */
function isPrimitive(v) {
    if (null === v) return true;
    var t = typeof v;
    return 'object' !== t && 'function' !== t;
}

/**
 * Returns "true" if a value is null
 * @param {*} v A value
 * @returns {Boolean}
 */
function isNull(v) {
    return v === null;
}

/**
 * Returns "true" if a value is undefined
 * @param {*} v A value
 * @returns {Boolean}
 */
function isUndefined(v) {
    return v === undefined;
}

/**
 * Returns "true" if a value is defined
 * @param {*} v A value
 * @returns {Boolean}
 */
function isDefined(v) {
    return v !== undefined;
}

/**
* Returns "true" if a value is a DOM element
* @param {*} v A value
* @returns {Boolean}
*/
function isElement(v) {
    return Object.toString.call(v).slice(8, 12) === 'HTML';
}
