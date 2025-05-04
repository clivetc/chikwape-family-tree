import React from "react";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { IFamily } from "~/interfaces/family.interface";

const FamilyNode = ({ member, level }: { member: IFamily; level: number }) => {
	return (
		<Box position="relative" mb={6} ml={level === 0 ? 0 : "30px"}>
			{/* Horizontal connecting line */}
			{level > 0 && (
				<Box
					position="absolute"
					top="0"
					left={level === 0 ? "50%" : 0}
					transform="translateX(-50%)"
					width="2px"
					height="100%"
					bg="#ccc"
				/>
			)}

			<VStack align="center">
				<Box
					borderWidth="2px"
					borderRadius="lg"
					p={4}
					shadow="md"
					width="200px"
					textAlign="center"
					bg="#fff"
				>
					<Text fontWeight="bold" fontSize="lg">
						{member.name}
					</Text>
					{member.birthDate && (
						<Text fontSize="sm" color="gray.500">
							{new Date(member.birthDate).toLocaleDateString()}
						</Text>
					)}
				</Box>
				{/* Display children */}
				{member.children && member.children.length > 0 && (
					<HStack mt={4}>
						{member.children.map((child) => (
							<FamilyNode key={child.id} member={child} level={level + 1} />
						))}
					</HStack>
				)}
			</VStack>
		</Box>
	);
};

export default FamilyNode;
