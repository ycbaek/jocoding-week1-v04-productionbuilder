# 로또 6/45 번호 생성기 (Lotto 6/45 Number Generator)

A small vanilla-JavaScript web app that draws six unique numbers from 1–45, revealing them one at a time with a rolling-ball animation. Built for the Jocoding Vibe Coding Bootcamp (Week 1).

## Features

- **Random draw** — six unique numbers between 1 and 45, sorted ascending.
- **Rolling animation** — each ball spins through random values for about half a second before locking in, then the next ball starts.
- **Official color coding** — balls are colored by range (1–10, 11–20, 21–30, 31–40, 41–45), matching the real lottery's scheme.
- **Draw history** — the last five previous draws are shown below the current one.
- **No dependencies** — plain HTML, CSS, and JavaScript. No build step, no npm install.

## Running it

Open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

A draw runs automatically on page load. Press **번호 생성** ("Generate") for another. The button is disabled while an animation is in progress, so draws can't overlap.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Page markup and layout |
| `style.css` | Styling, ball colors, animations |
| `script.js` | Draw logic, animation sequencing, history |

## How the draw works

`generate()` in `script.js` picks numbers by rejection sampling — pulling a random value from 1–45 and discarding duplicates until it has six — then sorts them. Rendering is deliberately sequential: the function `await`s a short delay between each ball so the reveal feels like a real draw rather than appearing all at once. History is capped at six entries, with the most recent draw displayed as the main result and the rest listed underneath.
