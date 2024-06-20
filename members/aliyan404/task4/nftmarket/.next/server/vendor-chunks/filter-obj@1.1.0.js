"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/filter-obj@1.1.0";
exports.ids = ["vendor-chunks/filter-obj@1.1.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/filter-obj@1.1.0/node_modules/filter-obj/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/filter-obj@1.1.0/node_modules/filter-obj/index.js ***!
  \******************************************************************************/
/***/ ((module) => {

eval("\nmodule.exports = function (obj, predicate) {\n\tvar ret = {};\n\tvar keys = Object.keys(obj);\n\tvar isArr = Array.isArray(predicate);\n\n\tfor (var i = 0; i < keys.length; i++) {\n\t\tvar key = keys[i];\n\t\tvar val = obj[key];\n\n\t\tif (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {\n\t\t\tret[key] = val;\n\t\t}\n\t}\n\n\treturn ret;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vZmlsdGVyLW9iakAxLjEuMC9ub2RlX21vZHVsZXMvZmlsdGVyLW9iai9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmZ0bWFya2V0Ly4vbm9kZV9tb2R1bGVzLy5wbnBtL2ZpbHRlci1vYmpAMS4xLjAvbm9kZV9tb2R1bGVzL2ZpbHRlci1vYmovaW5kZXguanM/MDMxZCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIHByZWRpY2F0ZSkge1xuXHR2YXIgcmV0ID0ge307XG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblx0dmFyIGlzQXJyID0gQXJyYXkuaXNBcnJheShwcmVkaWNhdGUpO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBrZXkgPSBrZXlzW2ldO1xuXHRcdHZhciB2YWwgPSBvYmpba2V5XTtcblxuXHRcdGlmIChpc0FyciA/IHByZWRpY2F0ZS5pbmRleE9mKGtleSkgIT09IC0xIDogcHJlZGljYXRlKGtleSwgdmFsLCBvYmopKSB7XG5cdFx0XHRyZXRba2V5XSA9IHZhbDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/filter-obj@1.1.0/node_modules/filter-obj/index.js\n");

/***/ })

};
;