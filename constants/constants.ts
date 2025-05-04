import { IFamily } from "~/interfaces/family.interface";

export const groupByLevel = (
	root: IFamily,
	level = 0,
	acc: Record<number, IFamily[]> = {},
) => {
	if (!acc[level]) acc[level] = [];
	acc[level].push(root);
	if (root.children) {
		for (const child of root.children) {
			groupByLevel(child, level + 1, acc);
		}
	}
	return acc;
};
