import { NextApiRequest, NextApiResponse } from "next";
import prisma from "~/lib/prisma";
// Adjust path to your prisma client

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const members = await prisma.familyMember.findMany({
			orderBy: { birthDate: "asc" },
		});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const memberMap = new Map<string, any>();
		members.forEach((member) => {
			memberMap.set(member.id, { ...member, children: [] });
		});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const treeRoots: any[] = [];

		for (const member of members) {
			const node = memberMap.get(member.id);
			if (member.parentId) {
				const parent = memberMap.get(member.parentId);
				if (parent) {
					parent.children.push(node);
				}
			} else {
				treeRoots.push(node);
			}
		}

		return res.status(200).json(treeRoots);
	} catch (error) {
		console.error("Error building family tree:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
