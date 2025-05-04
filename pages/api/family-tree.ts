import { NextApiRequest, NextApiResponse } from "next";
import prisma from "~/lib/prisma";
// Adjust path to your prisma client

interface FamilyMember {
	id: string;
	name: string;
	birthDate: Date | null;
	parentId: string | null;
	children?: FamilyMember[];
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const members: FamilyMember[] = await prisma.familyMember.findMany({
			orderBy: { birthDate: "asc" },
		});

		const memberMap = new Map<string, FamilyMember>();
		members.forEach((member) => {
			memberMap.set(member.id, { ...member, children: [] });
		});

		const treeRoots: FamilyMember[] = [];

		for (const member of members) {
			const node = memberMap.get(member.id);
			if (member.parentId) {
				const parent = memberMap.get(member.parentId);
				if (parent) {
					parent.children?.push(node!);
				}
			} else {
				treeRoots.push(node!);
			}
		}

		return res.status(200).json(treeRoots);
	} catch (error) {
		console.error("Error building family tree:", error);
		res.status(500).json({ error: "Internal Server Error", message: error });
	}
}
