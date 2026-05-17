
# Antonio Coot — 3D Programmer Setup Portfolio

Welcome to my interactive portfolio. This web project showcases a programmer desk setup modelled in Blender and published on the web using Three.js.

## What this project includes

- Responsive personal portfolio page with semantic HTML sections
- Interactive 3D Blender scene loaded as GLB using `GLTFLoader`
- OrbitControls: rotate, zoom, and move the camera
- Interactive UI buttons: change lighting environment and toggle automatic rotation
- Modern dark theme using CSS Flexbox and responsive design
- English documentation with a clear project structure

## 3D Setup elements

The scene includes the following desktop setup components:

1. **Desk**
2. **PC / Monitor**
3. **Keyboard**
4. **Mouse**
5. **Desk fan**
6. **Chair / computer base**
7. **Creative desk accessory**

> The model is exported from Blender as a `.glb` file and the original `.blend` file is included for review.

## Repo files

- `index.html` — portfolio page structure
- `style.css` — styling and responsive layout
- `script.js` — Three.js integration and interactive behavior
- `assets/3d/FNAFFINALOPTIMIZACION.glb` — exported 3D model
- `assets/3d/FNAFFINALOPTIMIZACION.blend` — original Blender source
- `assets/Foto.png` — profile avatar
- `assets/oso.gif` — Rive-inspired animated project preview
- `assets/proyecto no terminado.png` — in-progress Oxxo store preview
- screenshot images and assets for portfolio presentation

## How to run locally

Some browsers block local `file://` WebGL asset loads, so use a local HTTP server:

```bash
py -m http.server 8000
# Open http://localhost:8000 in your browser
```

Or with Node.js:

```bash
npx serve .
```

## Deployment

The repository is prepared for GitHub Pages deployment. The site is now live and available at:

**https://antoniocoot.github.io/Portafolio-Web-con-Escena-3D/**

If you are viewing this from GitHub, you can access the live portfolio directly using the link above.

## Notes

- The 3D scene uses Three.js with `OrbitControls` for interaction.
- The page includes required portfolio sections: name, avatar, about, skills, projects, and contact.
- The GLB and Blender files are included in `/assets/3d/`.

## Contact

- GitHub: https://github.com/AntonioCoot
- Email: antonio.coot@ejemplo.com

Thank you for viewing this build — I enjoyed combining Blender modeling with web interaction.