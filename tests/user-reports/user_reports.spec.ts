import { test, expect } from "@playwright/test";

const URL_BASE = "https://final-project-mod8.web.app";

test("/user-reports has title and reports @myTests", async ({ page }) => {
    await page.goto(URL_BASE);

    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await page.getByPlaceholder("ejemplo@mail.com").click();

    await page.getByPlaceholder("ejemplo@mail.com").fill("jotaj19@hotmail.com");

    await page.getByLabel("Contraseña *").click();

    await page.getByLabel("Contraseña *").fill("jota");

    await page.getByRole("button", { name: "Acceder" }).click();

    await page.getByRole("button", { name: "Mascotas reportadas" }).click();

    await expect(
        page.getByRole("heading", {
            name: "Mis mascotas reportadas",
        })
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Dona",
        })
    ).toBeVisible();
});

test("action: empty reports in user-reports, go to /create-report @myTests", async ({
    page,
}) => {
    await page.goto(URL_BASE);

    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await page.getByPlaceholder("ejemplo@mail.com").click();

    await page.getByPlaceholder("ejemplo@mail.com").fill("randall33@mail.com");

    await page.getByLabel("Contraseña *").click();

    await page.getByLabel("Contraseña *").fill("randall");

    await page.getByRole("button", { name: "Acceder" }).click();

    await page.getByRole("button", { name: "Mascotas reportadas" }).click();

    await expect(
        page.getByRole("heading", {
            name: "Aún no has hecho reportes de mascotas perdidas",
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", { name: "Publicar reporte" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Publicar reporte" }).click();

    await page.waitForURL(URL_BASE + "/create-report");

    await expect(page).toHaveURL(URL_BASE + "/create-report");
});
