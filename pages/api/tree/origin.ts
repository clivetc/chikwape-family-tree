import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		const data = await prisma.familyTree.findMany();

		return res.status(200).json(data);
	}

	res.status(405).end();
}
