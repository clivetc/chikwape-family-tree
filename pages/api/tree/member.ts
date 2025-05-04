import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { name, birthDate, parentId, treeId } = req.body;

		if (treeId) {
			const tree = await prisma.familyTree.findUnique({
				where: { id: treeId },
			});

			if (!tree) {
				return res.status(400).json({ message: "Tree ID does not exist" });
			}
		}

		try {
			const newMember = await prisma.familyMember.create({
				data: {
					name,
					birthDate: birthDate ? new Date(birthDate) : undefined,
					parentId: parentId || undefined,
					treeId: treeId || undefined,
				},
			});

			return res.status(201).json(newMember);
		} catch (error) {
			console.error("Failed to add member", error);
			return res.status(500).json({ message: "Failed to add member" });
		}
	}

	if (req.method === "PUT") {
		const { id, name, birthDate, parentId } = req.body;

		try {
			const updated = await prisma.familyMember.update({
				where: { id },
				data: {
					name,
					birthDate: birthDate ? new Date(birthDate) : undefined,
					parentId,
				},
			});

			return res.status(200).json(updated);
		} catch (error) {
			console.error("Failed to update member", error);
			return res.status(500).json({ message: "Failed to update member" });
		}
	}

	if (req.method === "GET") {
		const members = await prisma.familyMember.findMany();
		return res.status(200).json(members);
	}

	res.status(405).end(); // Method Not Allowed
}
