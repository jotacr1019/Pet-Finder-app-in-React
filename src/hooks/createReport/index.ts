import { createReportInDB } from "../../lib/api";

type reportData = {
    reporter_name: string;
    phone_number: string;
    message: string;
    petId: number;
    pet_name: string;
    userId: number;
};

export function useCreateReport() {
    async function createReport(data: reportData) {
        try {
            const response = await createReportInDB(data);
            if (response) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
        }
    }
    return {
        createReport,
    };
}
