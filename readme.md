# Alkinoos

# Overview
Alkinoos is an interface for generating browser-based interactive fiction stories, in the style of Inkle and Twine. It is in its very early stages of development and will be accompanied by an interactive fiction engine, Arete.

## Usage
Given the current state of Alkinoos and its sister application Arete, neither are production ready and serve more as proof-of-concept. 

That said, Alkinoos offers a recursive structure where one can create `scenes`. Each `scene` has a title and at least one, default, `consequence`. `Consequences` have a corresponding text, as well as conditions (e.g. only show this text if HP < 5) and effects (e.g. by entering a scene one falls and loses 1 HP). Finally, each `consequence` usually allows for several `actions` to be undertaken. Each `action` has `consequences` of its own, which might offer different `actions` and so on, recursively, until the story either ends or the scene changes.

Besides the story itself, Alkinoos also allows for general game settings (limited to `stats` and `title` at the moment).

Alkinoos saves user input on local storage automatically. It is possible to download the resulting .json file for use with Arete and to upload it back to Alkinoos for further editing.

## Development
Alkinoos's main dependency is React, plus a couple of utilities from lodash. During development, it also uses Node, SASS, Babel, Webpack and ESLint. 

To start developing, simply clone the repository, run `npm install` and then `make dev`.
