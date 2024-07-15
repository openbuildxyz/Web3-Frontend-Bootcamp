import * as __import0 from "aspect-property-api";
import * as __import1 from "runtime-api";
import * as __import2 from "aspect-state-api";
import * as __import3 from "util-api";
async function instantiate(module, imports = {}) {
  const __module0 = imports["aspect-property-api"];
  const __module1 = imports["runtime-api"];
  const __module2 = imports["aspect-state-api"];
  const __module3 = imports["util-api"];
  const adaptedImports = {
    env: Object.assign(Object.create(globalThis), imports.env || {}, {
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
    }),
    "aspect-property-api": Object.assign(Object.create(__module0), {
      "__AspectPropertyApi__.get"(key) {
        // ~lib/@artela/aspect-libs/hostapi/aspect-property-api/__AspectPropertyApi__.get(i32) => i32
        return __module0.__AspectPropertyApi__.get(key);
      },
    }),
    "runtime-api": Object.assign(Object.create(__module1), {
      "__RuntimeContextApi__.get"(ctxKey) {
        // ~lib/@artela/aspect-libs/hostapi/runtime-api/__RuntimeContextApi__.get(i32) => i32
        return __module1.__RuntimeContextApi__.get(ctxKey);
      },
    }),
    "aspect-state-api": Object.assign(Object.create(__module2), {
      "__AspectStateApi__.get"(key) {
        // ~lib/@artela/aspect-libs/hostapi/aspect-state-api/__AspectStateApi__.get(i32) => i32
        return __module2.__AspectStateApi__.get(key);
      },
      "__AspectStateApi__.set"(key, value) {
        // ~lib/@artela/aspect-libs/hostapi/aspect-state-api/__AspectStateApi__.set(i32, i32) => void
        __module2.__AspectStateApi__.set(key, value);
      },
    }),
    "util-api": Object.assign(Object.create(__module3), {
      "__UtilApi__.revert"(ptr) {
        // ~lib/@artela/aspect-libs/hostapi/util-api/__UtilApi__.revert(i32) => void
        __module3.__UtilApi__.revert(ptr);
      },
    }),
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  function __liftString(pointer) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  exports.__aspect_start__();
  return exports;
}
export const {
  memory,
  __new,
  __pin,
  __unpin,
  __collect,
  __rtti_base,
  execute,
  allocate,
} = await (async url => instantiate(
  await (async () => {
    try { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
    catch { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
  })(), {
    "aspect-property-api": __maybeDefault(__import0),
    "runtime-api": __maybeDefault(__import1),
    "aspect-state-api": __maybeDefault(__import2),
    "util-api": __maybeDefault(__import3),
  }
))(new URL("release.wasm", import.meta.url));
function __maybeDefault(module) {
  return typeof module.default === "object" && Object.keys(module).length == 1
    ? module.default
    : module;
}
