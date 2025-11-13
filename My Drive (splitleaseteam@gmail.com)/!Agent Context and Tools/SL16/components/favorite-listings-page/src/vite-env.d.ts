/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUBBLE_API_BASE_URL: string
  readonly VITE_BUBBLE_API_TOKEN: string
  readonly VITE_BUBBLE_WF_API_URL: string
  readonly VITE_BUBBLE_DATA_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
