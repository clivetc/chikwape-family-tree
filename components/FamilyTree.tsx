import React from "react";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { IFamily } from "~/interfaces/family.interface";
import FamilyNode from "./FamilyNode";
import { useRouter } from "next/router";

const FamilyTree = ({ data }: { data: IFamily[] }) => {
	const router = useRouter();

	const handleClick = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		router.push("/admin");
	};

	return (
		<Box maxW="1200px" mx="auto" mt={10} p={4}>
			<Flex justifyContent="space-between" align="center">
				<Text fontSize="2xl" fontWeight="bold" mb={4}>
					Chikwape Family Tree
				</Text>
				<Button onClick={handleClick} colorScheme="teal">
					Add Family Member
				</Button>
			</Flex>

			<Box mt={8} textAlign="center">
				<VStack>
					{data.map((member) => (
						<FamilyNode key={member.id} member={member} level={0} />
					))}
				</VStack>
			</Box>
		</Box>
	);
};

export default FamilyTree;
