import { test, expect } from "@playwright/test";

const URL_BASE = "https://final-project-mod8.web.app";

test("/menu has title, and buttons @myTests", async ({ page }) => {
    await page.goto(URL_BASE);

    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await page.getByPlaceholder("ejemplo@mail.com").click();

    await page.getByPlaceholder("ejemplo@mail.com").fill("randall33@mail.com");

    await page.getByLabel("Contraseña *").click();

    await page.getByLabel("Contraseña *").fill("randall");

    await page.getByRole("button", { name: "Acceder" }).click();

    await expect(
        page.getByRole("heading", {
            name: "Datos Personales",
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Modificar contraseña",
        })
    ).toBeVisible();

    await page.getByRole("button", { name: "Modificar contraseña" }).click();

    await expect(page.locator("#outlined-password")).toBeVisible();

    await expect(page.locator("#outlined-confirm-password")).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Cancelar",
        })
    ).toBeVisible();

    await page.getByRole("button", { name: "Cancelar" }).click();

    await expect(
        page.getByRole("button", {
            name: "Modificar datos personales",
        })
    ).toBeVisible();

    await page
        .getByRole("button", { name: "Modificar datos personales" })
        .click();

    await expect(page.locator("#outlined-name-label")).toBeVisible();

    await expect(page.locator("#outlined-email-label")).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Guardar",
        })
    ).toBeVisible();

    await page.getByRole("button", { name: "Guardar" }).click();
});
