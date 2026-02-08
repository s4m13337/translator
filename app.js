const LANGUAGES = [
    { code: 'BG', name: 'Bulgarian' },
    { code: 'CS', name: 'Czech' },
    { code: 'DA', name: 'Danish' },
    { code: 'DE', name: 'German' },
    { code: 'EL', name: 'Greek' },
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Spanish' },
    { code: 'ET', name: 'Estonian' },
    { code: 'FI', name: 'Finnish' },
    { code: 'FR', name: 'French' },
    { code: 'HU', name: 'Hungarian' },
    { code: 'ID', name: 'Indonesian' },
    { code: 'IT', name: 'Italian' },
    { code: 'JA', name: 'Japanese' },
    { code: 'KO', name: 'Korean' },
    { code: 'LT', name: 'Lithuanian' },
    { code: 'LV', name: 'Latvian' },
    { code: 'NB', name: 'Norwegian (Bokmål)' },
    { code: 'NL', name: 'Dutch' },
    { code: 'PL', name: 'Polish' },
    { code: 'PT', name: 'Portuguese' },
    { code: 'RO', name: 'Romanian' },
    { code: 'RU', name: 'Russian' },
    { code: 'SK', name: 'Slovak' },
    { code: 'SL', name: 'Slovenian' },
    { code: 'SV', name: 'Swedish' },
    { code: 'TR', name: 'Turkish' },
    { code: 'UK', name: 'Ukrainian' },
    { code: 'ZH', name: 'Chinese' }
];

document.addEventListener('alpine:init', () => {
    Alpine.data('translator', () => ({
        inputText: '',
        outputText: '',
        sourceLang: (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_SOURCE_LANG) ? CONFIG.DEFAULT_SOURCE_LANG : 'EN',
        targetLang: (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_TARGET_LANG) ? CONFIG.DEFAULT_TARGET_LANG : 'DE',
        theme: (typeof CONFIG !== 'undefined' && CONFIG.THEME_MODE) ? CONFIG.THEME_MODE : 'dark',
        isLoading: false,
        languages: LANGUAGES,

        init() {
            // Set Page Title
            if (typeof CONFIG !== 'undefined' && CONFIG.TITLE) {
                document.title = CONFIG.TITLE;
                document.getElementById('app-title').textContent = CONFIG.TITLE;
            }

            // Initialize Theme
            this.applyTheme();

            // Force update on next tick to sync UI if needed
            this.$nextTick(() => {
                // Ensure the DOM reflects the state
            });

            // Watch for system theme changes if in system mode
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (this.theme === 'system') {
                    this.applyTheme();
                }
            });
        },

        toggleTheme() {
            if (this.theme === 'dark') {
                this.theme = 'light';
            } else if (this.theme === 'light') {
                this.theme = 'system';
            } else {
                this.theme = 'dark';
            }
            this.applyTheme();
        },

        applyTheme() {
            let effectiveTheme = this.theme;
            if (this.theme === 'system') {
                effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            document.documentElement.setAttribute('data-theme', effectiveTheme);
        },



        swapLanguages() {
            const temp = this.sourceLang;
            this.sourceLang = this.targetLang;
            this.targetLang = temp;

            // Optional: Swap text acts as a nice UX touch, but technically not required. 
            // Often users want to reverse-translate what they just got.
            const tempText = this.inputText;
            this.inputText = this.outputText;
            this.outputText = tempText;
        },

        async translate() {
            if (!this.inputText.trim()) return;

            if (!CONFIG.API_KEY) {
                this.outputText = "Error: API key is missing in config.js.";
                return;
            }

            this.isLoading = true;
            this.outputText = 'Translating...';

            try {
                const params = new URLSearchParams({
                    text: this.inputText,
                    target_lang: this.targetLang,
                    source_lang: this.sourceLang
                });

                const response = await fetch(CONFIG.API_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `DeepL-Auth-Key ${CONFIG.API_KEY}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: params
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.translations && data.translations.length > 0) {
                    this.outputText = data.translations[0].text;
                } else {
                    this.outputText = "Translation failed: No data returned.";
                }

            } catch (error) {
                console.error('Translation Error:', error);
                this.outputText = `Error: ${error.message}`;
            } finally {
                this.isLoading = false;
            }
        }
    }));
});
