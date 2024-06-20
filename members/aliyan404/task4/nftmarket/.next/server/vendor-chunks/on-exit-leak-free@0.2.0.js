"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/on-exit-leak-free@0.2.0";
exports.ids = ["vendor-chunks/on-exit-leak-free@0.2.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/on-exit-leak-free@0.2.0/node_modules/on-exit-leak-free/index.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/.pnpm/on-exit-leak-free@0.2.0/node_modules/on-exit-leak-free/index.js ***!
  \********************************************************************************************/
/***/ ((module) => {

eval("\n\nfunction genWrap (wraps, ref, fn, event) {\n  function wrap () {\n    const obj = ref.deref()\n    // This should alway happen, however GC is\n    // undeterministic so it might happen.\n    /* istanbul ignore else */\n    if (obj !== undefined) {\n      fn(obj, event)\n    }\n  }\n\n  wraps[event] = wrap\n  process.once(event, wrap)\n}\n\nconst registry = new FinalizationRegistry(clear)\nconst map = new WeakMap()\n\nfunction clear (wraps) {\n  process.removeListener('exit', wraps.exit)\n  process.removeListener('beforeExit', wraps.beforeExit)\n}\n\nfunction register (obj, fn) {\n  if (obj === undefined) {\n    throw new Error('the object can\\'t be undefined')\n  }\n  const ref = new WeakRef(obj)\n\n  const wraps = {}\n  map.set(obj, wraps)\n  registry.register(obj, wraps)\n\n  genWrap(wraps, ref, fn, 'exit')\n  genWrap(wraps, ref, fn, 'beforeExit')\n}\n\nfunction unregister (obj) {\n  const wraps = map.get(obj)\n  map.delete(obj)\n  if (wraps) {\n    clear(wraps)\n  }\n  registry.unregister(obj)\n}\n\nmodule.exports = {\n  register,\n  unregister\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vb24tZXhpdC1sZWFrLWZyZWVAMC4yLjAvbm9kZV9tb2R1bGVzL29uLWV4aXQtbGVhay1mcmVlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmZ0bWFya2V0Ly4vbm9kZV9tb2R1bGVzLy5wbnBtL29uLWV4aXQtbGVhay1mcmVlQDAuMi4wL25vZGVfbW9kdWxlcy9vbi1leGl0LWxlYWstZnJlZS9pbmRleC5qcz85ZmIwIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5mdW5jdGlvbiBnZW5XcmFwICh3cmFwcywgcmVmLCBmbiwgZXZlbnQpIHtcbiAgZnVuY3Rpb24gd3JhcCAoKSB7XG4gICAgY29uc3Qgb2JqID0gcmVmLmRlcmVmKClcbiAgICAvLyBUaGlzIHNob3VsZCBhbHdheSBoYXBwZW4sIGhvd2V2ZXIgR0MgaXNcbiAgICAvLyB1bmRldGVybWluaXN0aWMgc28gaXQgbWlnaHQgaGFwcGVuLlxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKG9iaiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmbihvYmosIGV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIHdyYXBzW2V2ZW50XSA9IHdyYXBcbiAgcHJvY2Vzcy5vbmNlKGV2ZW50LCB3cmFwKVxufVxuXG5jb25zdCByZWdpc3RyeSA9IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeShjbGVhcilcbmNvbnN0IG1hcCA9IG5ldyBXZWFrTWFwKClcblxuZnVuY3Rpb24gY2xlYXIgKHdyYXBzKSB7XG4gIHByb2Nlc3MucmVtb3ZlTGlzdGVuZXIoJ2V4aXQnLCB3cmFwcy5leGl0KVxuICBwcm9jZXNzLnJlbW92ZUxpc3RlbmVyKCdiZWZvcmVFeGl0Jywgd3JhcHMuYmVmb3JlRXhpdClcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXIgKG9iaiwgZm4pIHtcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgb2JqZWN0IGNhblxcJ3QgYmUgdW5kZWZpbmVkJylcbiAgfVxuICBjb25zdCByZWYgPSBuZXcgV2Vha1JlZihvYmopXG5cbiAgY29uc3Qgd3JhcHMgPSB7fVxuICBtYXAuc2V0KG9iaiwgd3JhcHMpXG4gIHJlZ2lzdHJ5LnJlZ2lzdGVyKG9iaiwgd3JhcHMpXG5cbiAgZ2VuV3JhcCh3cmFwcywgcmVmLCBmbiwgJ2V4aXQnKVxuICBnZW5XcmFwKHdyYXBzLCByZWYsIGZuLCAnYmVmb3JlRXhpdCcpXG59XG5cbmZ1bmN0aW9uIHVucmVnaXN0ZXIgKG9iaikge1xuICBjb25zdCB3cmFwcyA9IG1hcC5nZXQob2JqKVxuICBtYXAuZGVsZXRlKG9iailcbiAgaWYgKHdyYXBzKSB7XG4gICAgY2xlYXIod3JhcHMpXG4gIH1cbiAgcmVnaXN0cnkudW5yZWdpc3RlcihvYmopXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZWdpc3RlcixcbiAgdW5yZWdpc3RlclxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/on-exit-leak-free@0.2.0/node_modules/on-exit-leak-free/index.js\n");

/***/ })

};
;