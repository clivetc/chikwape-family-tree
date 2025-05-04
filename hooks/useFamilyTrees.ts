import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createFamilyTree,
	getAllMembers,
	getFamilyTrees,
} from "~/service/familyTreeService";

export const useFamilyTrees = () => {
	const queryClient = useQueryClient();

	const { isLoading, data: dataSource } = useQuery({
		queryKey: ["familyTrees"],
		queryFn: getFamilyTrees,
	});

	const mutate = useMutation({
		mutationFn: createFamilyTree,
	});

	const { data, isLoading: isFamilyLoading } = useQuery({
		queryKey: ["familyMembers"],
		queryFn: getAllMembers,
	});

	return { isLoading, dataSource, mutate, data, isFamilyLoading };
};
