import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { IFamily } from "~/interfaces/family.interface";
import { formatDate } from "~/constants/date";

const FamilyNode = ({ member, level }: { member: IFamily; level: number }) => {
	return (
		<VStack
			align="center"
			p={4}
			borderRadius="lg"
			boxShadow="md"
			borderWidth={2}
			borderColor="gray.200"
			width={["90%", "80%", "70%"]}
			marginBottom={8}
			style={{ position: "relative" }}
		>
			<Text fontWeight="bold" textAlign="center" fontSize="sm">
				{member.name}
			</Text>
			{member.birthDate && (
				<Text fontSize="sm" color="gray.500">
					Born: {formatDate(member.birthDate)}
				</Text>
			)}
			{member.children && member.children.length > 0 && (
				<>
					<VStack align="center">
						{member.children.map((child) => (
							<Box key={child.id} style={{ marginLeft: level * 20 }}>
								<FamilyNode member={child} level={level + 1} />
							</Box>
						))}
					</VStack>
				</>
			)}
		</VStack>
	);
};

export default FamilyNode;
