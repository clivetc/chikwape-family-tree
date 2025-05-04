import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { IFamily } from "~/interfaces/family.interface";
import FamilyNode from "./FamilyNode";
import { useRouter } from "next/router";

const FamilyTree = ({ data }: { data: IFamily[] }) => {
	const router = useRouter();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push("/admin");
	};

	return (
		<Box maxW="100%" overflowX="auto" mt={10} p={4}>
			<Flex justifyContent="space-between" align="center">
				<Text fontSize="2xl" fontWeight="bold" mb={4}>
					Chikwape Family Tree
				</Text>
				<Button onClick={handleClick} colorScheme="teal">
					Add Family Member
				</Button>
			</Flex>

			{/* Main Tree */}
			<Box mt={8} textAlign="center">
				{data.map((rootMember) => (
					<FamilyNode key={rootMember.id} member={rootMember} />
				))}
			</Box>
		</Box>
	);
};

export default FamilyTree;
