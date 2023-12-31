const cloudName = "dpnltzaxy";
const uploadPreset = "vvtvx8pc";

export async function imgToURLCloudinary(images: string[]): Promise<string[]> {
    try {
        const uploadResults: string[] = [];

        for (const image of images) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", uploadPreset);
            const resp = await fetch(
                "https://api.cloudinary.com/v1_1/" +
                    cloudName +
                    "/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await resp.json();
            console.log("Upload successful:", data);
            uploadResults.push(data.url);
        }

        return uploadResults;
    } catch (error) {
        console.error("Upload error:", error);
        return [];
    }
}
