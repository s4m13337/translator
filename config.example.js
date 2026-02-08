/**
 * DeepL Translator Configuration
 * 
 * IMPORTANT: This is a client-side application. The API key is stored here.
 * For personal use, this is acceptable. For public deployment, use a proxy.
 */
const CONFIG = {
    // DeepL API Key (Get one from https://www.deepl.com/pro-api)
    API_KEY: '',

    // API URL - Using corsproxy.io to bypass browser CORS restrictions for client-side use
    API_URL: '/api/deepl/v2/translate',

    // App Title
    TITLE: 'Translator',

    // Default Languages (ISO 639-1 codes)
    DEFAULT_SOURCE_LANG: 'EN',
    DEFAULT_TARGET_LANG: 'DE',

    // Theme: 'dark', 'light', or 'system'
    THEME_MODE: 'dark' // Defaulting to dark as requested
};
