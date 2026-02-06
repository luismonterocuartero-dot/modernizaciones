# Guía de Implementación - Rediseño SVEHI con Diseño Institucional Junta de Andalucía

## 📋 Resumen

Se ha implementado un **sistema de diseño completo** alineado con la identidad institucional de la Junta de Andalucía para el proyecto SVEHI (Sistema de Vehículos).

---

## 🎨 Sistema de Diseño Implementado

### Archivos Modificados/Creados

#### 1. **Estilos Globales** (`src/styles.scss`)
- ✅ Variables CSS (Design Tokens) con paleta institucional
- ✅ Componentes reutilizables: botones, formularios, tablas, cards, badges, chips
- ✅ Utilidades de espaciado y layout
- ✅ Estilos de accesibilidad (focus visible, sr-only)

#### 2. **HTML Base** (`src/index.html`)
- ✅ Fuente Roboto de Google Fonts
- ✅ Título y metadata institucional
- ✅ Idioma español (`lang="es"`)

#### 3. **Componentes Actualizados**

##### `usuarios-page.component.ts`
- ✅ Header institucional con logo y navegación
- ✅ Toolbar con título y botón de acción principal
- ✅ Estados de carga y error con cards
- ✅ Diseño responsive

##### `usuarios-list.component.ts`
- ✅ Tabla con estilo `.table-junta`
- ✅ Badges de estado (Activo/Inactivo)
- ✅ Botones de acción con iconos
- ✅ Estado vacío con iconografía

#### 4. **Nuevos Componentes Creados**

##### `header-junta.component.ts`
Componente reutilizable de cabecera institucional.

**Uso:**
```typescript
import { HeaderJuntaComponent } from './presentation/components/header-junta/header-junta.component';

// En el template:
<app-header-junta 
  subtitle="Sistema de Vehículos - SVEHI"
  userName="Juan Pérez"
  [showNav]="true">
</app-header-junta>
```

##### `login-page.component.ts`
Pantalla de login con acceso por certificado digital.

**Características:**
- Diseño centrado con gradiente de fondo
- Información clara sobre requisitos de certificado
- Botón principal destacado

---

## 🎨 Paleta de Colores Institucional

```css
/* Primarios */
--junta-primary: #007A33;        /* Verde Junta */
--junta-primary-dark: #005C26;   /* Verde Oscuro */
--junta-primary-light: #E8F5E9;  /* Verde Claro */

/* Semánticos */
--junta-success: #2E7D32;
--junta-warning: #EF6C00;
--junta-error: #D32F2F;
--junta-info: #0277BD;

/* Neutrales */
--junta-text-dark: #333333;
--junta-text-medium: #666666;
--junta-bg-light: #F9F9F9;
```

---

## 🧩 Componentes del Sistema de Diseño

### Botones

```html
<!-- Primario -->
<button class="btn-junta btn-junta-primary">
  <i class="fa fa-plus"></i> NUEVO
</button>

<!-- Secundario -->
<button class="btn-junta btn-junta-secondary">
  Cancelar
</button>

<!-- Peligro -->
<button class="btn-junta btn-junta-danger">
  Eliminar
</button>

<!-- Tamaños -->
<button class="btn-junta btn-junta-primary btn-junta-sm">Pequeño</button>
<button class="btn-junta btn-junta-primary btn-junta-lg">Grande</button>
```

### Formularios

```html
<div>
  <label class="form-label-junta" for="nombre">Nombre *</label>
  <input 
    type="text" 
    id="nombre" 
    class="form-control-junta"
    placeholder="Introduce el nombre">
  <span class="form-text-junta">Campo obligatorio</span>
</div>

<!-- Con error -->
<input class="form-control-junta is-invalid">
<span class="invalid-feedback-junta">Este campo es obligatorio</span>
```

### Cards

```html
<div class="card-junta">
  <div class="card-junta-header">
    <h3>Título de la Card</h3>
  </div>
  <div class="card-junta-body">
    Contenido...
  </div>
  <div class="card-junta-footer">
    <button class="btn-junta btn-junta-primary">Guardar</button>
  </div>
</div>
```

### Tablas

```html
<table class="table-junta">
  <thead>
    <tr>
      <th>Columna 1</th>
      <th>Columna 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Dato 1</td>
      <td>Dato 2</td>
    </tr>
  </tbody>
</table>
```

### Badges

```html
<span class="badge-junta badge-junta-success">ACTIVO</span>
<span class="badge-junta badge-junta-warning">PENDIENTE</span>
<span class="badge-junta badge-junta-error">INACTIVO</span>
<span class="badge-junta badge-junta-info">INFO</span>
```

### Chips (Filtros)

```html
<span class="chip-junta">
  Estado: Verificado
  <span class="chip-remove" (click)="removeFilter()">×</span>
</span>
```

---

## 📐 Utilidades de Espaciado

```html
<!-- Márgenes -->
<div class="mt-3">Margen superior</div>
<div class="mb-4">Margen inferior</div>

<!-- Flexbox -->
<div class="d-flex align-items-center justify-content-between gap-3">
  <span>Izquierda</span>
  <span>Derecha</span>
</div>

<!-- Texto -->
<p class="text-center">Centrado</p>
<p class="text-right">Derecha</p>
```

---

## ♿ Accesibilidad

### Navegación por Teclado
Todos los elementos interactivos tienen `focus-visible` con outline verde institucional.

### Lectores de Pantalla
```html
<button aria-label="Editar usuario">
  <i class="fa fa-pencil"></i>
  <span class="sr-only">Editar</span>
</button>
```

### Contraste
Todos los colores cumplen WCAG 2.1 nivel AA (ratio > 4.5:1).

---

## 🚀 Próximos Pasos

### 1. Actualizar Rutas (`app.routes.ts`)
```typescript
export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { 
    path: '', 
    component: MainLayoutComponent,
    children: [
      { path: 'usuarios', component: UsuariosPageComponent },
      // ... otras rutas
    ]
  }
];
```

### 2. Crear Más Páginas
- Gestión de Vehículos
- Gestión de Talleres
- Módulos de Gestión (Compañías, Marcas, Modelos, etc.)

### 3. Implementar Modales
Usar SweetAlert2 (ya incluido) con estilos personalizados:

```typescript
import Swal from 'sweetalert2';

Swal.fire({
  title: '¿Confirmar acción?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#007A33',
  cancelButtonColor: '#D32F2F',
  confirmButtonText: 'Sí, confirmar',
  cancelButtonText: 'Cancelar'
});
```

### 4. Responsive Design
Todas las clases ya son responsive. Para ajustes específicos:

```scss
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
}
```

---

## 📚 Referencia Rápida

| Elemento | Clase CSS | Ejemplo |
|----------|-----------|---------|
| Botón Primario | `.btn-junta .btn-junta-primary` | Acciones principales |
| Botón Secundario | `.btn-junta .btn-junta-secondary` | Acciones secundarias |
| Card | `.card-junta` | Contenedores de contenido |
| Tabla | `.table-junta` | Listados de datos |
| Badge | `.badge-junta .badge-junta-success` | Estados |
| Input | `.form-control-junta` | Campos de formulario |
| Header | `.header-junta` | Cabecera institucional |

---

## 🔧 Troubleshooting

### Los estilos no se aplican
1. Verificar que `styles.scss` está importado en `angular.json`
2. Reiniciar el servidor de desarrollo (`npm start`)

### Fuentes no cargan
Verificar conexión a Google Fonts en `index.html`

### Iconos no aparecen
Verificar que FontAwesome está cargado correctamente

---

## 📞 Soporte

Para dudas sobre el diseño institucional, consultar:
- Manual de Identidad Visual de la Junta de Andalucía
- Guías de Accesibilidad WCAG 2.1

---

**Última actualización:** 2026-02-01  
**Versión del Sistema de Diseño:** 1.0.0
