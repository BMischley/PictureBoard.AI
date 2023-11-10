"use client";
import React, { useState, useEffect } from "react";
import RedoIcon from "@/components/misc/RedoIcon";
import { regenerateImage } from "../misc/helpers";

function GeneratedImage({
	image,
	caption,
}: {
	image: string;
	caption: string;
}) {
	const [imageData, setImageData] = useState(image);
	const [loading, setLoading] = useState(false);

	const handleRegenerate = async () => {
		setLoading(true);
		const newImageData = await regenerateImage(caption);
		if (newImageData) {
			setImageData(newImageData);
		}
		setLoading(false);
	};

	return (
		<>
			<div
				className="relative m-2 w-44 bg-white p-3 rounded-xl"
				style={{ resize: "both", overflow: "auto" }}
			>
				{loading ? (
					<span className="loading loading-dots mx-auto bg-tertiary-navy "></span>
				) : (
					<>
						<button
							onClick={handleRegenerate}
							title="Regenerate Image"
						>
							<RedoIcon />
						</button>
						<img
							src={imageData}
							className="w-full h-auto m-2 rounded-lg mx-auto"
							alt={`Image`}
						/>
						<p className="text-center text-lg font-bold break-words">
							{caption}
						</p>
					</>
				)}
			</div>
		</>
	);
}

export default GeneratedImage;
