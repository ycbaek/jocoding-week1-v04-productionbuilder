# 오늘 점심 뭐 먹지? (Lunch Menu Recommender)

A small vanilla-JavaScript web app that picks a lunch menu for you, spinning through candidates slot-machine style before landing on one. Built for the Jocoding Vibe Coding Bootcamp (Week 1).

## Features

- **Random pick** — one menu drawn from a built-in list of 30 dishes.
- **Category filter** — narrow the pool to 한식 / 중식 / 일식 / 양식 / 분식 / 아시안, or leave it on 전체.
- **Slot animation** — the card cycles through random candidates for about a second before locking in the pick.
- **Color coding** — the card and history chips are colored by cuisine category.
- **Recent picks** — the last five recommendations are listed below the current one.
- **No dependencies** — plain HTML, CSS, and JavaScript. No build step, no npm install.

## Running it

Open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

A recommendation runs automatically on page load. Press **메뉴 추천** ("Recommend") for another. The button and the category chips are locked while the animation is in progress, so picks can't overlap.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Page markup and layout |
| `style.css` | Styling, category colors, animations |
| `script.js` | Menu list, pick logic, animation, history |

## How the pick works

The menu list lives in `MENUS` at the top of `script.js` — each entry is a name, an emoji, and a category. `recommend()` filters that list by the selected category, picks one entry at random, then re-renders the card with random candidates every 80ms for ~1.2 seconds before revealing the real pick. History keeps the six most recent entries: the newest is the card, the rest are the chips underneath.

To add a dish, append one object to `MENUS`. If you add a new category, also add it to `CATEGORIES`, give it a class in `getCategoryClass()`, and define that class's gradient in `style.css`.
