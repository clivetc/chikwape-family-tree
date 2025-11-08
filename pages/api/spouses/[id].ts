import type { NextApiRequest, NextApiResponse } from "next";
import SpouseService from "~/service/spouse.service";

/**
 * API endpoint for individual spouse operations
 * GET: Get spouse by ID
 * PUT: Update spouse
 * DELETE: Delete spouse
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query;

	if (!id || typeof id !== "string") {
		return res.status(400).json({ error: "Invalid spouse ID" });
	}

	try {
		if (req.method === "GET") {
			const spouse = await SpouseService.getSpouseById(id);

			if (!spouse) {
				return res.status(404).json({ error: "Spouse not found" });
			}

			return res.status(200).json(spouse);
		}

		if (req.method === "PUT") {
			const { name, birthDate, marriageDate } = req.body;

			const spouse = await SpouseService.updateSpouse(id, {
				name,
				birthDate,
				marriageDate,
			});

			return res.status(200).json(spouse);
		}

		if (req.method === "DELETE") {
			await SpouseService.deleteSpouse(id);
			return res.status(200).json({ message: "Spouse deleted successfully" });
		}

		return res.status(405).json({ error: "Method not allowed" });
	} catch (error) {
		console.error("Spouse API error:", error);
		return res.status(500).json({
			error: "Internal server error",
			message: error instanceof Error ? error.message : "Unknown error",
		});
	}
}
