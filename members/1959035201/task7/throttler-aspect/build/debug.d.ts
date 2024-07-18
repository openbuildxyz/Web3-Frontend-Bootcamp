/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * ~lib/@artela/aspect-libs/types/entrance/execute
 * @param methodPtr `i32`
 * @param argPtr `i32`
 * @returns `i32`
 */
export declare function execute(methodPtr: number, argPtr: number): number;
/**
 * ~lib/@artela/aspect-libs/types/entrance/allocate
 * @param size `i32`
 * @returns `i32`
 */
export declare function allocate(size: number): number;
