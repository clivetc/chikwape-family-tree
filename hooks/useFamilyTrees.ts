import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	createFamilyTree,
	getAllMembers,
	getFamilyTrees,
} from "~/service/familyTreeService";

export const useFamilyTrees = () => {
	const queryClient = useQueryClient();
	const { isLoading, data: dataSource } = useQuery(
		"family-member",
		getFamilyTrees,
	);

	const { mutate } = useMutation(createFamilyTree, {
		onSuccess: () => {
			queryClient.invalidateQueries("family-");
		},
	});

	const { data, isLoading: isFamilyLoading } = useQuery(
		"family-tree",
		getAllMembers,
	);

	return { isLoading, dataSource, mutate, data, isFamilyLoading };
};
