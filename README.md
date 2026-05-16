
# Antonio Coot — 3D Portfolio 🎛️✨

Welcome to my interactive 3D portfolio. This project showcases a programmer's desk / setup modelled in Blender and published to the web using Three.js. It demonstrates 3D export, GLB integration, scene controls (orbit/zoom) and a small interactive UI.

## Demo

- Open `index.html` in a browser (see run instructions below).

## Highlights

- Modern HTML / CSS / JavaScript
- 3D scene exported from Blender (GLB)
- Three.js integration with `GLTFLoader` and `OrbitControls`
- Simple UI interactions (light toggle / environment switch)
- Project preview GIF and screenshots
- In-progress Oxxo convenience store project preview

## 3D Elements (what's included)

- 🛠️ **Desk** — created by me (main desk geometry and materials)
- 🌀 **Fan** — imported (third-party asset integrated in the scene)
- 🖥️ **Monitor** — created by me (screen, bezel and stand)
- ☎️ **Landline Phone** — imported (decorative prop)
- ⌨️ **Keyboard** — imported (input prop)
- 🪑 **Chair** — imported (seat used in composition)
- 🖱️ **Mouse** — imported (desk prop)
- 🖼️ **Posters** — created by me (I used textures to paint and place posters on walls)
- 💻 **Laptop / PC** — created by me (main computer model in the scene)

> Note: The list above identifies which assets I modelled myself and which were imported. The source `.blend` for the scene is included so instructors can inspect and open the original Blender file.

## Included files

- `index.html` — main page
- `style.css` — styling
- `main.js` — Three.js scene and logic
- `assets/3d/FNAFFINALOPTIMIZACION.glb` — exported GLB used by the site
- `assets/3d/FNAFFINALOPTIMIZACION.blend` — Blender source file (scene and models)
- `assets/Foto.png` — profile avatar
- `assets/oso.gif` — project preview GIF
- `assets/proyecto no terminado.png` — in-progress Oxxo convenience store preview
- screenshots in `assets/` for quick previews

## Run locally (quick)

The easiest way is to run a tiny HTTP server from the project root because some browsers block `file://` GLB requests.

Python 3 built-in server:

```bash
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

Or with Node.js (if you have `serve`):

```bash
npx serve .
# then open the provided URL
```

## Deploy

- GitHub Pages: enable Pages on the repository (branch `main` / folder `/root`).
- Netlify / Vercel: drag & drop or connect the repo and set build to `none` (static site). Both will serve `index.html` automatically.

## Notes for reviewers / instructors

- The Blender source is included so you can inspect topology, materials and texture links.
- If you want the complete high-quality package (textures, baked maps, lighting settings exported as textures), contact me and I will share the full archive and guidance for rendering.

## Contact

- Email: antonio.coot@ejemplo.com
- GitHub: https://github.com/AntonioCoot

---

Thank you for reviewing — I enjoyed building the setup and bringing it to the web. 🚀