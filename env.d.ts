namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV: 'development' | 'production';
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_CHROME_EXTENSION_ID: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    GA4_ANALYTICS_ID: string;
    LEMON_SQUEEZY_API_KEY: string;
  }
}
