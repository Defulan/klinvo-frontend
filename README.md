# klinvo-frontend

README: [English](README.md) | [Русский](README.RU.md)

Klinvo is a minimalist web tool for constructing artificial languages (conlangs).

* **Klinvo live demo:** https://klinvo-frontend.vercel.app
* **Tech stack:** React, TypeScript | Bootstrap (styles), Vite (build tool), Biome (linter/formatter)
* **Backend repository:** [klinvo-backend ↗](https://github.com/Defulan/klinvo-backend)
* **[Changelog](CHANGELOG.md)**


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
All source code located in `src/`. Most of files in the root directory are just project configuration. 
```
klinvo-frontend
├─ .github/ - directory for CI jobs (GitHub Actions)
│
├─ src/ - all source code
│  ├─ assets/ - icons and images
│  ├─ components/
│  ├─ context/
│  │   └─ AuthContext.tsx - cookie-based getting of user data
│  ├─ hooks/
│  │   ├─ useLanguage.ts - PATCH & single GET for language
│  │   ├─ useNote.ts - PATCH & single GET for note
│  │   ├─ useTitle.ts - set title to a page
│  │   └─ useUser.ts - PATCH & single GET for user
│  ├─ i18n/ - Localization (en, ru)
│  ├─ lib/ - utils and configurations of the project
│  │   ├─ types/ - TypeScript types
│  │   ├─ api.ts - REST API configuration
│  │   ├─ dayjs.ts - set up dayjs library
│  │   ├─ errorDetails.ts - formatting error messages
│  │   └─ textWrapping.ts - text selection and wrapping
│  ├─ pages/ - React pages of the project and related to them components
│  │   ├─ account/
│  │   ├─ language/
│  │   ├─ notes/
│  │   │
│  │   ├─ Credits.tsx - attribution of authorship
│  │   ├─ Home.tsx
│  │   └─ NotFoundPage.tsx - undefined URL
│  │
│  ├─ App.tsx - layout of pages
│  ├─ env.d.ts - TypeScript configuration for correct work of imported CSS
│  ├─ index.css - global project styles
│  └─ main.tsx - entry point of application; router and global imports
│
├─ .env.example - example of the .env file
├─ .gitignore
├─ biome.json - Biome configuration
├─ CHANGELOG.md - only in English
├─ index.html - HTML template
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ README.md - in English
├─ README.RU.md - in Russian
├─ tsconfig.json - TypeScript configuration
├─ vercel.json - Vercel configuration
└─ vite.config.ts
```

## Roadmap
Currently, the main goal is to bring the project to the MVP stage.

### Main (MVP)
- [x] Error handling & fallback UI
- [x] Authentification (registration, log in/log out)
- [x] Account page (username, bio, navigation to settings, conlangs section)
- [x] Account settings page (user data editing)
- [x] UI localization (English/Russian)
- [x] Language page (description, notes section, navigation to dictionary)
- [x] Design home page
- [x] Notes ([More info...](https://github.com/Defulan/klinvo-frontend/issues/34))
- [ ] Interactive dictionary table ([More info...](https://github.com/Defulan/klinvo-frontend/issues/35))

### Future Enhancements
- [ ] Dark/light theme toggle
- [ ] Blogs of site (author's information about languages/linguistics)
- [ ] Word formation (language elements which allow to make new words from current)
- [ ] Transcription (tool for conveniently describing a language's transcription)
- [ ] Dialects (multiple columns for words, clarifications of words meaning)
- [ ] Describing changes in daughter languages

