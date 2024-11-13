"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@stablelib+wipe@1.0.1";
exports.ids = ["vendor-chunks/@stablelib+wipe@1.0.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@stablelib+wipe@1.0.1/node_modules/@stablelib/wipe/lib/wipe.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/.pnpm/@stablelib+wipe@1.0.1/node_modules/@stablelib/wipe/lib/wipe.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n// Copyright (C) 2016 Dmitry Chestnykh\n// MIT License. See LICENSE file for details.\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n/**\n * Sets all values in the given array to zero and returns it.\n *\n * The fact that it sets bytes to zero can be relied on.\n *\n * There is no guarantee that this function makes data disappear from memory,\n * as runtime implementation can, for example, have copying garbage collector\n * that will make copies of sensitive data before we wipe it. Or that an\n * operating system will write our data to swap or sleep image. Another thing\n * is that an optimizing compiler can remove calls to this function or make it\n * no-op. There's nothing we can do with it, so we just do our best and hope\n * that everything will be okay and good will triumph over evil.\n */\nfunction wipe(array) {\n    // Right now it's similar to array.fill(0). If it turns\n    // out that runtimes optimize this call away, maybe\n    // we can try something else.\n    for (var i = 0; i < array.length; i++) {\n        array[i] = 0;\n    }\n    return array;\n}\nexports.wipe = wipe;\n//# sourceMappingURL=wipe.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHN0YWJsZWxpYit3aXBlQDEuMC4xL25vZGVfbW9kdWxlcy9Ac3RhYmxlbGliL3dpcGUvbGliL3dpcGUuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYjtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmZ0bWFya2V0Ly4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzdGFibGVsaWIrd2lwZUAxLjAuMS9ub2RlX21vZHVsZXMvQHN0YWJsZWxpYi93aXBlL2xpYi93aXBlLmpzP2M5OTkiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKEMpIDIwMTYgRG1pdHJ5IENoZXN0bnlraFxuLy8gTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFNldHMgYWxsIHZhbHVlcyBpbiB0aGUgZ2l2ZW4gYXJyYXkgdG8gemVybyBhbmQgcmV0dXJucyBpdC5cbiAqXG4gKiBUaGUgZmFjdCB0aGF0IGl0IHNldHMgYnl0ZXMgdG8gemVybyBjYW4gYmUgcmVsaWVkIG9uLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IHRoaXMgZnVuY3Rpb24gbWFrZXMgZGF0YSBkaXNhcHBlYXIgZnJvbSBtZW1vcnksXG4gKiBhcyBydW50aW1lIGltcGxlbWVudGF0aW9uIGNhbiwgZm9yIGV4YW1wbGUsIGhhdmUgY29weWluZyBnYXJiYWdlIGNvbGxlY3RvclxuICogdGhhdCB3aWxsIG1ha2UgY29waWVzIG9mIHNlbnNpdGl2ZSBkYXRhIGJlZm9yZSB3ZSB3aXBlIGl0LiBPciB0aGF0IGFuXG4gKiBvcGVyYXRpbmcgc3lzdGVtIHdpbGwgd3JpdGUgb3VyIGRhdGEgdG8gc3dhcCBvciBzbGVlcCBpbWFnZS4gQW5vdGhlciB0aGluZ1xuICogaXMgdGhhdCBhbiBvcHRpbWl6aW5nIGNvbXBpbGVyIGNhbiByZW1vdmUgY2FsbHMgdG8gdGhpcyBmdW5jdGlvbiBvciBtYWtlIGl0XG4gKiBuby1vcC4gVGhlcmUncyBub3RoaW5nIHdlIGNhbiBkbyB3aXRoIGl0LCBzbyB3ZSBqdXN0IGRvIG91ciBiZXN0IGFuZCBob3BlXG4gKiB0aGF0IGV2ZXJ5dGhpbmcgd2lsbCBiZSBva2F5IGFuZCBnb29kIHdpbGwgdHJpdW1waCBvdmVyIGV2aWwuXG4gKi9cbmZ1bmN0aW9uIHdpcGUoYXJyYXkpIHtcbiAgICAvLyBSaWdodCBub3cgaXQncyBzaW1pbGFyIHRvIGFycmF5LmZpbGwoMCkuIElmIGl0IHR1cm5zXG4gICAgLy8gb3V0IHRoYXQgcnVudGltZXMgb3B0aW1pemUgdGhpcyBjYWxsIGF3YXksIG1heWJlXG4gICAgLy8gd2UgY2FuIHRyeSBzb21ldGhpbmcgZWxzZS5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFycmF5W2ldID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xufVxuZXhwb3J0cy53aXBlID0gd2lwZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpcGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@stablelib+wipe@1.0.1/node_modules/@stablelib/wipe/lib/wipe.js\n");

/***/ })

};
;