# Resume Website

A responsive online resume for **Yehor Filistieiev**, built as a lightweight static website with dedicated versions for Software Engineering and IT Support roles.

## Resume versions

- [`index.html`](./index.html) — C# / .NET Software Engineer resume
- [`it-support.html`](./it-support.html) — IT Support / Technical Support resume

Both pages share the same design system, components, assets, JavaScript, responsive behavior, dark mode, and print layout. Only the professional content differs.

## Features

- Responsive, accessible HTML5 structure
- Light and dark themes with saved user preference
- Reusable CSS components and custom properties
- Print-optimized A4 resume layout
- PDF export through the browser print dialog
- Copy-email action
- Scroll progress and back-to-top controls
- Reduced-motion support
- SEO and Schema.org structured data
- No frameworks or build step required

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages

## Project structure

```text
resume/
├── index.html
├── it-support.html
├── css/
│   ├── style.css
│   └── print.css
├── js/
│   └── main.js
├── assets/
│   └── avatar.webp
└── README.md
```

## Run locally

No dependencies are required. Open `index.html` directly in a browser or serve the directory with any static web server.

For example, using Python:

```bash
python -m http.server 8000
```

Then open:

- `http://localhost:8000/`
- `http://localhost:8000/it-support.html`

## Export to PDF

Open the required resume version, select **Print / PDF**, and choose **Save as PDF** in Chrome or Edge. The dedicated print stylesheet formats the resume for A4 output.

## Deploy with GitHub Pages

1. Open the repository **Settings**.
2. Select **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing the website and the `/ (root)` folder.
5. Save the configuration.

GitHub Pages will publish `index.html` as the main page. The IT Support version will be available at `/it-support.html`.

## Contact

- [Portfolio](https://yehor-filistieiev.framer.website/)
- [GitHub](https://github.com/evilgoku)
- [LinkedIn](https://www.linkedin.com/in/yehor-filistieiev/)

## License

The source code may be used as a reference. Personal information, resume content, and images remain the property of Yehor Filistieiev and should not be reused without permission.
