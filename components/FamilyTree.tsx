import React from "react";
import { Box, Button, Flex, Text, Center } from "@chakra-ui/react";
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
			<Flex justifyContent="space-between" align="center" mb={4}>
				<Text fontSize="2xl" fontWeight="bold">
					Chikwape Family Tree
				</Text>
				<Button onClick={handleClick} colorScheme="teal">
					Add Family Member
				</Button>
			</Flex>

			<Flex
				direction="column"
				justify="center"
				align="center"
				minHeight="100vh"
				width="100%"
				px={2}
				gap={8}
			>
				<Box mt={8} textAlign="center" w="100%" maxW="1200px" mx="auto">
					{data.map((rootMember) => (
						<FamilyNode key={rootMember.id} member={rootMember} />
					))}
				</Box>
			</Flex>
		</Box>
	);
};

export default FamilyTree;
