import axios from "axios";
import {
	IFamily,
	IFamilyMember,
	IFamilyTree,
} from "~/interfaces/family.interface";

const url = "/api/tree/member";

export const getFamilyTrees = async () => {
	return await axios.get<IFamilyMember[]>(`${url}`).then((res) => res.data);
};

export const createFamilyTree = async (member: Omit<IFamilyMember, "id">) => {
	return await axios.post(`${url}`, member).then((res) => res.data);
};

export const getFamilyMember = async () => {
	return await axios
		.get<IFamilyTree[]>("/api/tree/origin")
		.then((res) => res.data);
};

export const getAllMembers = async () => {
	return await axios.get<IFamily[]>("/api/family-tree").then((res) => res.data);
};
