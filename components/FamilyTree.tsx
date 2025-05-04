import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { IFamily } from "~/interfaces/family.interface";
import FamilyNode from "./FamilyNode";
import { useRouter } from "next/router";

const FamilyTree = ({ data }: { data: IFamily[] }) => {
	const router = useRouter();

	const handleClick = (e) => {
		e.preventDefault();
		router.push("/admin");
	};

	return (
		<Box maxW="800px" mx="auto" mt={10}>
			<Flex justifyContent={"space-between"}>
				<Text fontSize="2xl" fontWeight="bold" mb={4}>
					Chikwape Family Tree
				</Text>
				<Button onClick={handleClick} colorScheme="teal">
					Add Family Member
				</Button>
			</Flex>
			{/* <Divider mb={4} /> */}
			{data.map((member) => (
				<FamilyNode key={member.id} member={member} />
			))}
		</Box>
	);
};

export default FamilyTree;
