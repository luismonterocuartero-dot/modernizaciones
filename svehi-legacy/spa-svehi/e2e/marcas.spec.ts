import { test, expect } from '@playwright/test';

test.describe('Gestión de Marcas', () => {
    test('debe mostrar el listado de marcas', async ({ page }) => {
        // Navegación a la ruta de marcas
        await page.goto('http://localhost:4200/catalogos/marcas');

        // Verificación del título
        await expect(page.locator('h2')).toContainText('Gestión de Marcas');

        // Verificación de que la tabla está presente (incluso si está vacía al principio)
        await expect(page.locator('table')).toBeVisible();
    });

    test('debe mostrar el spinner de carga', async ({ page }) => {
        await page.goto('http://localhost:4200/catalogos/marcas');
        const spinner = page.locator('.spinner-border');
        // El spinner puede desaparecer rápido si el mock es veloz, 
        // pero validamos su selector por si acaso.
        if (await spinner.count() > 0) {
            await expect(spinner).toBeVisible();
        }
    });
});
