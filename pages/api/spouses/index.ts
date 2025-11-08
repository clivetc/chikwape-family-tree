import type { NextApiRequest, NextApiResponse } from "next";
import SpouseService from "~/service/spouse.service";

/**
 * API endpoint for spouse operations
 * GET: Get spouses by memberId (query param)
 * POST: Create a new spouse
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method === "GET") {
			const { memberId, treeId, search } = req.query;

			// Search by name
			if (search && typeof search === "string") {
				const spouses = await SpouseService.searchSpousesByName(search);
				return res.status(200).json(spouses);
			}

			// Get by tree ID
			if (treeId && typeof treeId === "string") {
				const spouses = await SpouseService.getSpousesByTreeId(treeId);
				return res.status(200).json(spouses);
			}

			// Get by member ID
			if (memberId && typeof memberId === "string") {
				const spouses = await SpouseService.getSpousesByMemberId(memberId);
				return res.status(200).json(spouses);
			}

			return res.status(400).json({
				error: "Please provide memberId, treeId, or search parameter",
			});
		}

		if (req.method === "POST") {
			const { name, birthDate, marriageDate, memberId } = req.body;

			if (!name || !memberId) {
				return res.status(400).json({
					error: "Name and memberId are required",
				});
			}

			const spouse = await SpouseService.createSpouse({
				name,
				birthDate,
				marriageDate,
				memberId,
			});

			return res.status(201).json(spouse);
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
