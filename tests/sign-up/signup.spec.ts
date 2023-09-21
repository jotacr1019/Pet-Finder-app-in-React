import { test, expect } from "@playwright/test";

const URL_BASE = "https://final-project-mod8.web.app";

test("/sign-up has title and labels @myTests", async ({ page }) => {
    await page.goto(URL_BASE);

    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await page.getByRole("link", { name: "Regístrate" }).click();

    await expect(
        page.getByRole("heading", {
            name: "Registrarse",
        })
    ).toBeVisible();

    await expect(
        page.getByText(
            "Ingresa los siguientes datos para completar el registro",
            { exact: true }
        )
    ).toBeVisible();

    await expect(page.getByLabel("Nombre", { exact: true })).toBeVisible();

    await expect(page.getByLabel("Email", { exact: true })).toBeVisible();

    await expect(page.getByLabel("Contraseña", { exact: true })).toBeVisible();

    await expect(
        page.getByLabel("Confirmar contraseña", { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText("¿Ya tienes una cuenta?Inicia sesión", { exact: true })
    ).toBeVisible();

    await expect(
        page.getByRole("button", { name: "Registrarse" })
    ).toBeVisible();
});

test("action: register with a new user @myTests", async ({ page }) => {
    await page.goto(URL_BASE);

    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await page.getByRole("link", { name: "Regístrate" }).click();

    await page.getByPlaceholder("Ingresa tu nombre").click();

    await page.getByPlaceholder("Ingresa tu nombre").fill("fran02");

    await page.getByPlaceholder("ejemplo@mail.com").click();

    await page.getByPlaceholder("ejemplo@mail.com").fill("fran02@mail.com");

    await page.getByLabel("Contraseña *").click();

    await page.getByLabel("Contraseña *").fill("fran");

    await page.locator("#outlined-adornment-confirm-password").click();

    await page.locator("#outlined-adornment-confirm-password").fill("fran");

    await page.getByRole("button", { name: "Registrarse" }).click();

    await page.waitForURL(URL_BASE + "/user-reports");

    await expect(
        page.getByRole("heading", {
            name: "Aún no has hecho reportes de mascotas perdidas",
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", { name: "Publicar reporte" })
    ).toBeVisible();

    await expect(page).toHaveURL(URL_BASE + "/user-reports");
});
