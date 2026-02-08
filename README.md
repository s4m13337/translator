# Translator

This is a simple translator application that uses the DeepL API.

# Motivation

I have been using DeepL for many years for their simple web interface. However recently they have started cluttering their website with promotions and further, it requires couple more clicks to enter the translation section. Although it is not much, it adds a lot of friction when doing serious work. Therefore, with the help of AI (Antigravity + Gemini Pro) I've quickly built this simple clutter free frontend. Now I can simply self-host my application and don't have to rely anymore on DeepL website.

# Deployment

The project just has 4 files
- `index.html`
- `style.css`
- `app.js`
- `config.example.js`

Copy the files to your server and configure your webserver to serve the `index.html` file. Rename the `config.example.js` file to `config.js`. Obtain an API key from DeepL and add it to `config.js`


