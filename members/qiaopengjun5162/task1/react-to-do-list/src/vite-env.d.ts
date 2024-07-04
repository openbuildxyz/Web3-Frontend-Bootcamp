/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_PREFIX: string;
    readonly ENV_PREFIX: string;

}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
