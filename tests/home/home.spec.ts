import { test, expect, request } from "@playwright/test";

const URL_BASE = "https://final-project-mod8.web.app";
const API_BASE_URL = "https://pet-finder-app-muig.onrender.com";
const lat = 10.0731003;
const lng = -84.3122803;
const badLat = 30.0731003;
const badLng = -64.3122803;

test("/home has title, and card has labels @myTests", async ({
    page,
    request,
}) => {
    await page.goto(URL_BASE + "/home/location=lat=" + lat + "&lng=" + lng);

    await expect(
        page.getByRole("heading", {
            name: "Mascotas Perdidas cerca de tu ubicación",
        })
    ).toBeVisible();

    const response = await request
        .get(API_BASE_URL + "/pets-cerca-de?lat=" + lat + "&lng=" + lng)
        .then((res) => {
            expect(res.status()).toBe(302);
            return res.json();
        });

    if (response.length > 0) {
        const elem = await page
            .locator("li")
            .filter({ hasText: /Reportar/ })
            .all();

        await elem[0].getByRole("button").click();

        await expect(
            page.getByLabel("Nombre", {
                exact: true,
            })
        ).toBeVisible();

        await expect(
            page.getByLabel("Teléfono", {
                exact: true,
            })
        ).toBeVisible();

        await expect(
            page.getByLabel("¿Dónde lo viste?", {
                exact: true,
            })
        ).toBeVisible();

        await expect(
            page.getByRole("button", { name: "Enviar información" })
        ).toBeVisible();
    }
});

test("/home has title and no cards @myTests", async ({ page, request }) => {
    await page.goto(
        URL_BASE + "/home/location=lat=" + badLat + "&lng=" + badLng
    );

    const response = await request
        .get(API_BASE_URL + "/pets-cerca-de?lat=" + badLat + "&lng=" + badLng)
        .then((res) => {
            expect(res.status()).toBe(302);
            return res.json();
        });

    if (response.length < 1) {
        await expect(
            page.getByRole("heading", {
                name: "Mascotas Perdidas cerca de tu ubicación",
            })
        ).toBeVisible();

        await expect(
            page.getByRole("heading", {
                name: "No hay mascotas reportadas cerca de tu ubicación",
            })
        ).toBeVisible();
    }
});

test("action: report a missing pet @myTests", async ({ page, request }) => {
    await page.goto(URL_BASE + "/home/location=lat=" + lat + "&lng=" + lng);

    const response = await request
        .get(API_BASE_URL + "/pets-cerca-de?lat=" + lat + "&lng=" + lng)
        .then((res) => {
            expect(res.status()).toBe(302);
            return res.json();
        });

    console.log({ response });

    if (response.length > 0) {
        const elem = await page
            .locator("li")
            .filter({ hasText: /Reportar/ })
            .all();
        console.log({ elem });

        await elem[0].getByRole("button").click();

        await page.getByPlaceholder("Ingresa tu nombre").click();
        await page.getByPlaceholder("Ingresa tu nombre").fill("Jose");
        await page.getByPlaceholder("Ejem: 8888-8888").click();
        await page.getByPlaceholder("Ejem: 8888-8888").fill("8800-1234");
        await page.getByLabel("¿Dónde lo viste?").click();
        await page
            .getByLabel("¿Dónde lo viste?")
            .fill("Lo vi cerca de mi casa, en Grecia centro");

        await page.getByRole("button", { name: "Enviar información" }).click();

        await page.getByRole("button", { name: "Inicio" }).click();

        await page.waitForURL(URL_BASE);

        await expect(page).toHaveURL(URL_BASE);
    }
});
