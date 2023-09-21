import { test, expect } from "@playwright/test";

const URL_BASE = "https://final-project-mod8.web.app";

test.beforeEach(async ({ page }) => {
    await page.goto(URL_BASE);

    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await page.getByPlaceholder("ejemplo@mail.com").click();

    await page.getByPlaceholder("ejemplo@mail.com").fill("randall33@mail.com");

    await page.getByLabel("Contraseña *").click();

    await page.getByLabel("Contraseña *").fill("randall");

    await page.getByRole("button", { name: "Acceder" }).click();
});

test("actions: auth-create-edit-delete a report @myTest", async ({ page }) => {
    await page.getByRole("button", { name: "Mascotas reportadas" }).click();

    await expect(
        page.getByRole("heading", {
            name: "lulu",
        })
    ).not.toBeVisible();

    await page.getByRole("button", { name: "Reportar mascota" }).click();

    await page.getByPlaceholder("Ingresa el nombre de la mascota").click();

    await page.getByPlaceholder("Ingresa el nombre de la mascota").fill("lulu");

    await page.setInputFiles('input[type="file"]', "./src/assets/dog2.png");

    await page.getByPlaceholder("Busqueda").click();

    await page.getByPlaceholder("Busqueda").fill("san ramon");

    await page.locator(".MuiInputAdornment-root > .MuiButtonBase-root").click();

    await page.getByRole("button", { name: "San Ramón Canton" }).click();

    await page.getByRole("button", { name: "Crear reporte" }).click();

    await page.waitForURL(URL_BASE + "/user-reports");

    await expect(
        page.getByRole("heading", {
            name: "lulu",
        })
    ).toBeVisible();

    const elem = await page
        .locator("li")
        .filter({ hasText: /lulu/ })
        .filter({ hasText: /Editar/ })
        .all();

    await elem[0].getByRole("button").click();

    await page.getByPlaceholder("Ingresa el nombre de la mascota").click();

    await page
        .getByPlaceholder("Ingresa el nombre de la mascota")
        .fill("lulu nuevo");

    await page.getByRole("button", { name: "Guardar" }).click();

    await page.waitForURL(URL_BASE + "/user-reports");

    await expect(
        page.getByRole("heading", {
            name: "lulu nuevo",
        })
    ).toBeVisible();

    await elem[0].getByRole("button").click();

    await page
        .getByRole("button", { name: "Reportar como encontrado" })
        .click();

    await page.waitForURL(URL_BASE + "/user-reports");

    await expect(
        page.getByRole("heading", {
            name: "lulu nuevo",
        })
    ).not.toBeVisible();

    await page.getByRole("button", { name: "Cerrar sesión" }).click();
});

test("actions: login/logout @myTest", async ({ page }) => {
    await page.waitForURL(URL_BASE + "/menu");

    const firstLocalStorageValue = await page.evaluate(() => {
        return localStorage.getItem("user_token");
    });

    expect(firstLocalStorageValue).not.toBeNull();

    await page.getByRole("button", { name: "Cerrar sesión" }).click();

    await page.waitForURL(URL_BASE);

    const secondLocalStorageValue = await page.evaluate(() => {
        return localStorage.getItem("user_token");
    });

    expect(secondLocalStorageValue).toBeNull();
});
