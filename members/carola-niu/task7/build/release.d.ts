/** Exported memory */
export declare const memory: WebAssembly.Memory;
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
