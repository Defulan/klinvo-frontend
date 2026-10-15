Versions of Frontend and Backend releases at the same time — that is, 
Frontend version implies compatible with the corresponding Backend version


## unreleased
> The next planned version is v0.4.0


#### Added
- Notes section in a language page
  - Creating and deleting notes in a notes section (for language's author)
  - Note popover
- Note page (`/notes/<note_id>`)
  - Info: title, content, created at, note's language
  - Markdown formatter on a note content
- Note edit page (`/notes/<note_id>/edit`)
  - Auto-resizing based on content size
  - Editor bar with **Bold**, _cursive_ and ~~striked~~ styles and cancel/submit buttons
  - Adding styles/brackets by selecting text and pressing any of wrap keys
- Editing on a same field for username, language name and note title

#### Changed
- All language pages files names now have "Language" at the end (`CreateLanguage`, `PublicLanguages`, `ViewLanguage`)
- All language components moved to the new `language/components` directory
- Language privacy on/off now a button
- Editing username now available only on an user page

#### Removed
- Language edit section & component — was splitted on same-field editing language name and privacy button



## v0.3.1

#### Added
- Title in every page with new hook `useTitle`

#### Changed
- Canceling account editing after submitting changes
- Fixed buttons in an account page (moved non-editing buttons outside of `<form>`)
- (CI) Reminder to update Changelog after changes in a branch
- (CI) Job `readme-reminder` renamed to `to-change-reminder`
- Fixed design of inputs on the Registration page


## v0.3.0
#### Added
- Language create page (`/language`)
- Language view page (`/language/<languageId>`)
- Public languages page (all not-private languages on platform)
- Category of conlangs on Account page
- Viewing of other account pages (`/account/<userId>`)

#### Changed
- Design of platform (Home page, Navbar, Login, Registration)

#### Roadmap of this version
- [x] Error handling & fallback UI
- [x] Authentification (registration, log in/log out)
- [x] Account page (username, bio, navigation to settings, conlangs section)
- [x] Account settings page (user data editing)
- [x] UI localization (English/Russian)
- [x] Language page (description, notes section, navigation to dictionary)
- [ ] Dictionary table (table design, categories, data editing)
- [ ] Notes (creating, reading, formatting, changing)
- [x] Design home page


## v0.2.0
#### Added
- CI jobs for linter check and reminding about README updating
- Full Vercel deployment

#### Changed
- **❗ AuthContext now returns only `user` and no more `isAuth` & `userId`**
- Validation errors is more specific
- Style of README

#### Roadmap of this version
- [x] Error handling & fallback UI
- [x] Authentification (registration, log in/log out)
- [ ] Account page (username, bio, navigation to settings, conlangs section)
- [x] Account settings page (user data editing)
- [x] UI localization (English/Russian)
- [ ] Language page (description, notes section, navigation to dictionary)
- [ ] Dictionary table (table design, categories, data editing)
- [ ] Notes (creating, reading, formatting, changing)
- [ ] Design home page


## v0.1.0
About this first version of the project:
* Signing in/out/up
* Viewing only self account page.
* Navbar (Home, account/sign in, changing language)
* Footer (credits)

