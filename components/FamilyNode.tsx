import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { IFamily } from "~/interfaces/family.interface";

const FamilyNode = ({ member }: { member: IFamily }) => {
	console.log({ member });
	return (
		<Box borderWidth="1px" borderRadius="lg" p={4} shadow="md" width="100%">
			<Text fontWeight="bold">{member.name}</Text>
			{member.birthDate && (
				<Text fontSize="sm" color="gray.500">
					{new Date(member.birthDate).toLocaleDateString()}
				</Text>
			)}

			{member.children && member.children.length > 0 && (
				<VStack align="start" pl={4} mt={2} borderLeft="2px solid #ccc">
					{member.children.map((child) => (
						<FamilyNode key={child.id} member={child} />
					))}
				</VStack>
			)}
		</Box>
	);
};

export default FamilyNode;
