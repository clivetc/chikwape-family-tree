export interface IFamilyMember {
	id: string;
	name: string;
	birthDate?: string;
	parentId?: string;
	treeId?: string;
}

export interface IFamilyTree {
	id: string;
	name: string;
	origin?: string;
	createdBy: string;
	members: IFamilyMember[];
	createdAt: string;
}

export interface IFamily {
	id: string;
	name: string;
	birthDate: string | null;
	parentId: string | null;
	treeId: string | null;
	children: IFamily[];
}
