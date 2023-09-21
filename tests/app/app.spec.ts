import { test, expect, request } from "@playwright/test";

const URL_BASE = "https://final-project-mod8.web.app";
const lat = 10.071906;
const lng = -84.311513;
const DYNAMIC_ROUTE = `location=lat=${lat}&lng=${lng}`;

test("/ has title, subtitle and img @myTests", async ({ page }) => {
    await page.goto(URL_BASE);

    await expect(page).toHaveTitle(/Pet Finder App/);

    await expect(
        page.getByRole("heading", {
            name: "Encontrá y reportá mascotas perdidas cerca de tu ubicación",
        })
    ).toBeVisible();

    await expect(
        page.getByRole("img", {
            name: "dogsPicture",
        })
    ).toBeVisible();
});

test("action: click on '¿Cómo funciona Pet Finder?' and get info about the page @myTests", async ({
    page,
}) => {
    await page.goto(URL_BASE);

    await page
        .getByRole("button", { name: "¿Cómo funciona Pet Finder?" })
        .click();

    await expect(
        page.getByRole("heading", {
            name: "Pet Finder App",
        })
    ).toBeVisible();

    const locator = page.locator("p");
    await expect(locator).toContainText(
        `Una vez aceptes dar tu ubicación, "Pet Finder" iniciará una busqueda de mascotas reportadas como perdidas dentro de tu zona. O bien puedes iniciar sesión o registrarte para reportar una mascota como perdida.`
    );
});

test("action: open map, and use it to get a location @myTests", async ({
    page,
}) => {
    await page.goto(URL_BASE);

    await page.getByRole("button", { name: "Dar mi ubicación actual" }).click();

    await expect(
        page.getByLabel("Map", {
            exact: true,
        })
    ).toBeVisible();

    await expect(
        page.getByLabel("Zoom in", {
            exact: true,
        })
    ).toBeVisible();

    await expect(
        page.getByRole("img", {
            name: "marker",
        })
    ).toBeVisible();

    await page.getByPlaceholder("Busqueda").click();

    await page.getByPlaceholder("Busqueda").fill("grecia");

    await page
        .locator(".MuiInputAdornment-root > .MuiButtonBase-root")
        .first()
        .click();

    await page.getByRole("button", { name: "Grecia Canton" }).click();

    await page.getByRole("button", { name: "Buscar" }).click();

    await page.waitForURL(URL_BASE + "/home/" + DYNAMIC_ROUTE);

    await expect(page).toHaveURL(URL_BASE + "/home/" + DYNAMIC_ROUTE);
});
