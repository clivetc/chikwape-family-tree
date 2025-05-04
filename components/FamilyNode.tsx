import React from "react";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { IFamily } from "~/interfaces/family.interface";
import { formatDate } from "~/constants/date";

const FamilyNode = ({ member }: { member: IFamily }) => {
	return (
		<VStack align="center" position="relative">
			<Box
				p={4}
				borderRadius="lg"
				boxShadow="md"
				borderWidth={2}
				borderColor="gray.300"
				bg="white"
				minW="150px"
				textAlign="center"
			>
				<Text fontWeight="bold" fontSize="md">
					{member.name}
				</Text>
				{member.birthDate && (
					<Text fontSize="sm" color="gray.500">
						Born: {formatDate(member.birthDate)}
					</Text>
				)}
			</Box>

			{/* Render children horizontally */}
			{member.children && member.children.length > 0 && (
				<HStack align="flex-start" justify="center" wrap="wrap">
					{member.children.map((child) => (
						<FamilyNode key={child.id} member={child} />
					))}
				</HStack>
			)}
		</VStack>
	);
};

export default FamilyNode;
