import { test, expect } from "@playwright/test";

const URL_BASE = "https://final-project-mod8.web.app";

test("/create-report has title, and labels correctly @myTests", async ({
    page,
}) => {
    await page.goto(URL_BASE + "/create-report");

    await expect(
        page.getByRole("heading", {
            name: "Reportar Mascota",
        })
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Ingresa la siguiente información para realizar el reporte de la mascota",
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Agregar fotos",
        })
    ).toBeVisible();

    await expect(
        page.getByLabel("Map", {
            exact: true,
        })
    ).toBeVisible();

    await expect(
        page.getByText(
            "Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.",
            {
                exact: true,
            }
        )
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Crear reporte",
        })
    ).toBeVisible();

    await expect(
        page.getByRole("button", {
            name: "Cancelar",
        })
    ).toBeVisible();
});
