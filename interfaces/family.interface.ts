export interface ISpouse {
	id?: string;
	name: string;
	birthDate?: string;
	marriageDate?: string;
	divorceDate?: string;
	status?: "married" | "divorced" | "widowed" | "partner";
	order?: number; // 1st spouse, 2nd spouse, etc.
}

export interface IFamilyMember {
	id: string;
	name: string;
	birthDate?: string;
	parentId?: string;
	treeId?: string;
	spouses?: ISpouse[];
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
	spouses?: ISpouse[];
	children: IFamily[];
}
