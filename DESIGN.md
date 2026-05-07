# NaraLeaf Design Standards

This document outlines the technical and style design guidelines for the NaraLeaf project. All new code should follow these established conventions.

---

## 1. Tech Stack

- **Language**: Plain HTML5, CSS3, JavaScript (ES6+)
- **No Frameworks**: Vanilla JS only
- **External Dependencies**:
  - Font Awesome 6.0.0-beta3 (icons)
  - Google Fonts - Open Sans (typography)

---

## 2. File Structure

```
naraleaf/
├── index.html      # Main HTML file
├── style.css      # Main stylesheet
├── script.js      # JavaScript functionality
├── images/        # Image assets
└── icons/         # Icon assets
```

All files live in the root directory. No component folders or build artifacts.

---

## 3. HTML Conventions

### Class Naming (BEM-inspired)

- Use single-purpose, descriptive classes: `.nav-links`, `.hero-content`, `.product-card`
- Element nesting uses compound names: `.carousel-slide`, `.carousel-btn`, `.carousel-dots`
- State classes: `.active`, `.scrolled`

### Semantic Elements

- Use proper semantic HTML: `<nav>`, `<section>`, `<header>`, `<footer>`, `<main>`
- Section elements should have ID attributes for navigation: `id="home"`, `id="about"`
- Links use fragment identifiers: `<a href="#products">`

### Structure Pattern

```html
<nav class="navbar">
    <div class="container">
        <a href="#" class="logo">...</a>
        <ul class="nav-links" id="navLinks">...</ul>
        <div class="hamburger">...</div>
    </div>
</nav>

<section class="section" id="sectionName">
    <div class="section-content">
        <!-- Section content -->
    </div>
</section>
```

---

## 4. CSS Conventions

### CSS Custom Properties

Define all design tokens in `:root`:

```css
:root {
    --primary-green: rgb(6, 47, 9);
    --light-green: #8bc34a;
    --natural-brown: #5d4037;
    --cream: #f5f5f0;
    --text-dark: #333;
    --dark: #001107;
}
```

### Variable Naming

- Format: `--kebab-case`
- Prefix with color/type: `--primary-green`, `--light-green`

### Base Styles

```css
html {
    overflow-x: hidden;
}

body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    color: var(--text-dark);
    background-color: var(--cream);
    line-height: 1.6;
    scroll-behavior: smooth;
    overflow-x: hidden;
}
```

### Navigation Pattern

```css
nav {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6rem;
    top: 0;
    z-index: 1000;
    transition: all 0.5s ease;
}

nav.scrolled {
    background: var(--primary-green);
    box-shadow: 0 7px 10px rgba(0,0,0,0.3);
    height: 4rem;
}
```

### Spacing System

- Base unit: `1rem`
- Container padding: `1rem 5%`
- Section gaps: Use padding within sections

### Class Selectors

- Avoid using element selectors without classes
- Use descendant selectors: `nav ul li a`
- State changes on classes, not elements

---

## 5. JavaScript Conventions

### Initialization Pattern

Wrap code in DOMContentLoaded event:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initNavbar();
    // Other initializations
});
```

### Function Naming

- Use descriptive names: `initCarousel()`, `showSlide()`, `nextSlide()`
- Use `init` prefix for initialization functions
- Use action verbs: `show`, `next`, `prev`, `pause`, `resume`

### Event Handling

```javascript
element.addEventListener('click', () => {
    // Handle click
});

element.addEventListener('click', handlerFunction);
```

### State Management

- Use class toggling for state: `element.classList.add('active')`, `element.classList.remove('active')`
- Store state in variables: `let currentSlide = 0`
- Use data attributes: `data-target`, `data-index`

### Carousel Pattern

```javascript
function initCarousel() {
    const carousel = document.querySelector('.selector');
    if (!carousel) return;

    // Elements
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
}
```

---

## 6. Color Palette

| Name | Value | Usage |
|------|-------|-------|
| `--primary-green` | `rgb(6, 47, 9)` | Headers, navigation background |
| `--light-green` | `#8bc34a` | Accents, hover states |
| `--natural-brown` | `#5d4037` | Secondary elements |
| `--cream` | `#f5f5f0` | Page background |
| `--text-dark` | `#333` | Body text |
| `--dark` | `#001107` | Dark backgrounds |

---

## 7. Typography

- **Font Family**: `'Open Sans', sans-serif`
- **Font Weights**: 400 (regular), 600 (semibold), 700 (bold)
- **Line Height**: 1.6
- **Section Titles**: Use `.section-title` class

---

## 8. Section Patterns

### Standard Section

```html
<section class="section" id="sectionId">
    <div class="section-content">
        <h2 class="section-title">Section Title</h2>
        <!-- Content -->
    </div>
</section>
```

### Hero Section

```html
<section class="section hero" id="home">
    <div class="hero-content">
        <h1>HEADLINE</h1>
        <p>Description</p>
        <a href="#contact" class="btn">CTA</a>
    </div>
</section>
```

### Card Grid

```html
<div class="grid-container">
    <div class="card">
        <div class="card-icon">...</div>
        <h3>Title</h3>
        <p>Description</p>
    </div>
</div>
```

---

## 9. Responsive Behavior

- Mobile navigation uses hamburger menu
- Flexbox for layout: `display: flex`, `justify-content`, `align-items`
- Use `gap` for spacing between flex items
- Hide/show elements based on viewport

---

## 10. Image Guidelines

- Place all images in `./images/` directory
- Use descriptive filenames: `about-1.jpg`, `hero-bg.jpg`, `product-*.jpg`
- Use semantic alt text: `alt="NaraLeaf Logo"`
- Set appropriate object-fit for logos: `object-fit: cover`

---

## 11. Accessibility

- Always provide alt text for images
- Use semantic HTML elements
- Ensure adequate color contrast
- Make interactive elements keyboard accessible

---

## 12. Code Quality

- Keep code clean and readable
- Use consistent indentation (4 spaces)
- Avoid unnecessary comments (unless explaining complex logic)
- Test functionality across browsers
- Ensure all external resources load properly