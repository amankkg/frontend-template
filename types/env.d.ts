declare interface ImportMeta {
  env: {
    MODE: 'development' | 'production'
    SNOWPACK_PUBLIC_API: string
  }
}

declare interface ProcessEnv {
  NODE_ENV: 'development' | 'production'
  PORT: string
  BROWSER: string
}