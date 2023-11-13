import axios from "axios";
import { NextResponse } from "next/server";

// Takes input 2D array of image URLs and returns a 2D array of images in base64 format
export async function POST(request: Request) {
	const reqData = await request.json();
	const img2DArray = reqData.data;
	console.log("img2Darray", img2DArray.data)

	try {
		const fetchImagePromises = img2DArray.flat().map(async (image: string) => {
			const response = await axios.get(image, {
				responseType: "arraybuffer",
			});
			const imageBuffer = Buffer.from(response.data, "binary");
			const base64Image = imageBuffer.toString("base64");
			const imageData = `data:${response.headers["content-type"]};base64,${base64Image}`;
			return imageData;
		});

		const flatImages = await Promise.all(fetchImagePromises);

		// Reshape the flat array back into a 2D array
		let result = [];
		let index = 0;
		for (let i = 0; i < img2DArray.length; i++) {
			const row = [];
			for (let j = 0; j < img2DArray[i].length; j++) {
				row.push(flatImages[index++]);
			}
			result.push(row);
		}

		return NextResponse.json({ result });
	} catch (error) {
		console.log(error);
		return Response.json({
			success: false,
			message: "Error fetching images",
		});
	}
}
