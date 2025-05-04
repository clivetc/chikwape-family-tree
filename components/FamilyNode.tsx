import React from "react";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import { IFamily } from "~/interfaces/family.interface";
import { formatDate } from "~/constants/date";

const FamilyNode = ({
	member,
	parentName,
}: {
	member: IFamily;
	parentName?: string;
}) => {
	return (
		<VStack
			p={4}
			borderRadius="lg"
			boxShadow="sm" // Softer shadow for the base
			bg="blue.50"
			textAlign="center"
			border="1px solid #E2E8F0"
			_hover={{
				boxShadow: "md", // Lighter shadow on hover
				transform: "scale(1.02)", // Subtle scaling on hover
				cursor: "pointer",
			}}
			transition="all 0.3s ease"
		>
			<Text fontWeight="bold" color="blue.800" fontSize="xl">
				{member.name}
			</Text>
			{member.birthDate && (
				<Text fontSize="sm" color="gray.600">
					Born: {formatDate(member.birthDate)}
				</Text>
			)}
			{parentName && (
				<Text fontSize="sm" color="gray.500">
					Parent: {parentName}
				</Text>
			)}

			{member.children && (
				<Flex mt={4} justify="center" wrap="wrap" direction="row" gap={8}>
					{member.children.map((child) => (
						<FamilyNode
							key={child.id}
							member={child}
							parentName={member.name}
						/>
					))}
				</Flex>
			)}
		</VStack>
	);
};

export default FamilyNode;
