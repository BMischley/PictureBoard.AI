import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase.config";

interface ImageResponse {
	url: string;
}

async function regenerateImage(prompt: string): Promise<string | null> {
	const generateImage = httpsCallable(functions, "generate_image");

	try {
		const result = await generateImage({ prompt: prompt });
		const data = result.data as ImageResponse; // Type assertion here
		const url = data.url;
		console.log(url);
		return url;
	} catch (error) {
		console.error("Error calling generate_image:", error);
		return null;
	}

	// const testURL = "https://img.freepik.com/premium-photo/3d-rhombus-button-empty-button-3d-illustration_115990-3696.jpg"
	// return testURL
}

export { regenerateImage };
