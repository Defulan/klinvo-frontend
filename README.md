# klinvo-frontend

README: [English](README.md) | [Русский](README.RU.md)

Klinvo is a web application for constructing artificial languages (conlangs).

* **Backend repository:** [klinvo-backend ↗](https://github.com/Defulan/klinvo-backend)
* **Klinvo (0.1.1):** https://klinvo-frontend.vercel.app
* **Tech stack:** React, TypeScript | Bootstrap (styles), Vite (build tool), Biome (linter/formatter)
* *Note: in the first 60 seconds after entering the website Klinvo probably would have problems with auth/registration due to the specifics of hosting, where is located API. It should gone after 30-60 seconds after entering*


## How to Start
* **Requirements:** Node.js v18+ or v20+ (project was written and tested on Node.js v24)

1. **Clone the repository**
```bash
git clone https://github.com/Defulan/klinvo-frontend
cd klinvo-frontend
```
2. **Install dependencies**
```bash
npm install
```
3. **Set up environment variables (.env)**
```bash
cp .env.example .env
```
There is only one .env variable:
* `VITE_API_URL` - backend URL (e.g., http://localhost:8000)
4. **Run the project**
```bash
npm run dev
```


### List of useful commands
* `npm run dev` - run the project
* `npm run build` - build the application
* `npm run lint` - check code without editing (Biome)
* `npm run check` - format and fix code (Biome)


## Project structure
Technical files required only for project configuration:
* `package-lock.json`
* `package.json`
* `biome.json`
* `tsconfig.json`
* `vite.config.ts`

More important files:
* `index.html` - HTML template, sets site title & favicon
* `.gitignore`
* `.env.example` - example of the `.env` file

All source code is located inside the `src/` directory:
* `main.tsx`
* `App.tsx`
* `index.css` - global project styles
* `env.d.ts` - required for correct work of CSS imports
* `assets/` - folder for images, icons, etc.
* `components/`
    * `ErrorFallback.tsx` - appears when an error occurs outside of main layout
    * `Navbar.tsx`
    * `RouterErrorFallback.tsx` - appears when an error occurs during page render
* `context/`
    * `AuthContext.tsx` - get isAuth & userId from GET endpoint /auth/me
* `lib/` - utils/configurations of project
    * `api.ts` - settings for Frontend/Backend connection
    * `dayjs.ts` - settings for dayjs library
    * `errorDetails.ts` - designing user-facing error messages
* `pages/`
    * `account/` - Account pages
        * `Account.tsx` - page of user's account
        * `Login.tsx`
        * `Registration.tsx`
    * `Home.tsx` - home page
    * `NotFoundPage.tsx` - redirects here when a route/URL is not found


## Roadmap
Currently, the main goal is to bring the project to the MVP stage.

### Main (MVP)
- [x] Error handling & fallback UI
- [x] Authentification (registration, log in/log out)
- [ ] Account page (username, bio, navigation to settings, conlangs section)
- [x] Account settings page (user data editing)
- [x] UI localization (English/Russian)
- [ ] Language page (description, notes section, navigation to dictionary)
- [ ] Dictionary table (table design, categories, data editing)
- [ ] Notes (creating, reading, formatting, changing)
- [ ] Design home page

### Future Enhancements
- [ ] Dark/light theme toggle
- [ ] Blogs of site (author's information about languages/linguistics)
- [ ] Word formation (language elements which allow to make new words from current)
- [ ] Transcription (tool for conveniently describing a language's transcription)
- [ ] Dialects (multiple columns for words, clarifications of words meaning)
- [ ] Describing changes in daughter languages

