---
name: junta-design-system
description: Official Design System for Junta de Andalucía web applications. Use this skill when building or styling UIs for Junta de Andalucía to ensure brand consistency.
---

# Junta de Andalucía Design System

This skill provides the design tokens, component classes, and guidelines for building web applications aligned with the **Junta de Andalucía** institutional identity.

## 🎨 Design Tokens (Colors)

Use these CSS variables for all styling to ensure consistency.

```css
/* Primary Colors - Corporate Identity */
--junta-primary: #007A33;        /* The iconic "Verde Junta" */
--junta-primary-dark: #005C26;   /* Darker shade for hover/active */
--junta-primary-light: #E8F5E9;  /* Light tint for backgrounds */

/* Semantic Colors */
--junta-success: #2E7D32;        /* Success messages, badges */
--junta-warning: #EF6C00;        /* Warnings, alerts */
--junta-error: #D32F2F;          /* Errors, destructive actions */
--junta-info: #0277BD;           /* Information, help components */

/* Neutral Colors */
--junta-text-dark: #333333;      /* Main text */
--junta-text-medium: #666666;    /* Secondary text */
--junta-bg-light: #F9F9F9;       /* Page backgrounds */
--junta-border: #DDDDDD;         /* Borders */
```

## 🧩 Core Components

Always use these classes instead of creating custom styles or using raw Bootstrap classes where possible.

### Buttons (`.btn-junta`)
Institutional buttons with specific padding, border-radius, and font-weight.

```html
<!-- Primary Action -->
<button class="btn-junta btn-junta-primary">Aceptar</button>

<!-- Secondary Action -->
<button class="btn-junta btn-junta-secondary">Cancelar</button>

<!-- Destructive Action -->
<button class="btn-junta btn-junta-danger">Eliminar</button>
```

### Cards (`.card-junta`)
Containers for content with specific shadow and border styles.

```html
<div class="card-junta">
    <div class="card-junta-header">
        <h3>Card Title</h3>
    </div>
    <div class="card-junta-body">
        Content goes here...
    </div>
</div>
```

### Forms (`.form-control-junta`)
Inputs with institutional focus states (green outline).

```html
<label class="form-label-junta">Label</label>
<input type="text" class="form-control-junta" placeholder="...">
<span class="form-text-junta">Hint text</span>
```

### Tables (`.table-junta`)
Clean data tables with branded headers and row hover effects.

```html
<table class="table-junta">
    <thead>
        <tr><th>Column 1</th><th>Column 2</th></tr>
    </thead>
    <tbody>
        <tr><td>Data 1</td><td>Data 2</td></tr>
    </tbody>
</table>
```

### Badges (`.badge-junta`)
Status indicators using semantic colors.

```html
<span class="badge-junta badge-junta-success">ACTIVO</span>
<span class="badge-junta badge-junta-error">INACTIVO</span>
```

## 📐 Layout & Typography

- **Font Family**: Use `Roboto` or system sans-serif.
- **Spacing**: Use standard utility classes (`mt-3`, `mb-4`, `p-3`, `gap-2`).
- **Icons**: FontAwesome is the standard icon set (`fa fa-user`, etc.).

## 📝 Implementation Guidelines

1.  **Accessibility First**: Ensure high contrast (WCAG AA) and focus visibility. The CSS variables are designed to specific contrast ratios.
2.  **Responsive**: Components should be mobile-first and fluid.
3.  **Validation**: Use `.is-invalid` on inputs and provide `.invalid-feedback-junta` for error messages.
4.  **Confirmations**: Use SweetAlert2 with brand colors:
    *   Confirm Button: `#007A33`
    *   Cancel Button: `#D32F2F`

## Usage Prompt
(Use this when instructing the agent)

> "Apply the Junta de Andalucía Design System to the [Component Name]. Use the official colors (--junta-primary) and component classes (.btn-junta, .card-junta) as defined in the skill."
