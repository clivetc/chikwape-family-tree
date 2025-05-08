import React from "react";
import {
	Box,
	Text,
	VStack,
	Flex,
	useBreakpointValue,
	HStack,
	Avatar,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IFamily } from "~/interfaces/family.interface";
import { formatDate } from "~/constants/date";
import { Tooltip } from "~/components/ui/tooltip";
import { useColorModeValue } from "~/components/ui/color-mode";

const MotionBox = motion(Box);

// Generate subtle tints per generation
const getBgColor = (generation: number) =>
	["white", "gray.50", "gray.100", "gray.200", "gray.300", "gray.400"][
		generation
	] || "gray.100";

const getBorderColor = (generation: number) =>
	[
		"#CBD5E0", // gray.300
		"#A0AEC0", // gray.400
		"#718096", // gray.500
		"#4A5568", // gray.600
		"#2D3748", // gray.700
	][generation] || "#718096";

const FamilyNode = ({
	member,
	parentName,
	generation = 1,
}: {
	member: IFamily;
	parentName?: string;
	generation?: number;
}) => {
	const isMobile = useBreakpointValue({ base: true, md: false });
	const bg = useColorModeValue(getBgColor(generation), "gray.700");

	return (
		<MotionBox
			w="full"
			px={{ base: 2, md: 0 }}
			borderLeft={isMobile ? `3px solid ${getBorderColor(generation)}` : "none"}
			ml={isMobile ? generation * 2 : generation * 4} // Adjusted margin for larger screens
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			<VStack
				align="start"
				gap={3}
				w={{ base: "full", sm: "auto" }}
				maxW={{ base: "full", sm: "620px" }} // Adjusted to avoid overflowing
				p={4}
				borderRadius="2xl"
				boxShadow="md"
				bg={bg}
				border="1px solid"
				borderColor="gray.200"
				_hover={{
					boxShadow: "lg",
					transform: "scale(1.05)", // Slightly larger scale for desktop
					transition: "all 0.3s ease",
				}}
			>
				<Text fontSize="xs" fontWeight="medium" color="purple.600">
					Generation {generation}
				</Text>

				<HStack gap={3}>
					<Avatar.Root variant="solid">
						<Avatar.Fallback name={member.name} />
					</Avatar.Root>

					<Tooltip content={`More about ${member.name}`}>
						<Text
							fontWeight={generation === 1 ? "bold" : "semibold"}
							fontSize={{ base: "md", md: "lg" }}
							color="blue.800"
						>
							{member.name}
						</Text>
					</Tooltip>
				</HStack>

				{member.birthDate && (
					<Text fontSize="sm" color="gray.600">
						🎂 Born: {formatDate(member.birthDate)}
					</Text>
				)}

				{parentName && (
					<Text fontSize="sm" color="gray.500">
						👨‍👩‍👧 Parent: {parentName}
					</Text>
				)}
			</VStack>

			{/* Children Generation Nodes */}
			{member.children && member.children.length > 0 && (
				<Flex
					direction={{ base: "column", md: "row" }}
					gap={6}
					mt={4}
					flexWrap="wrap"
					align={isMobile ? "start" : "center"}
				>
					{member.children.map((child) => (
						<FamilyNode
							key={child.id}
							member={child}
							parentName={member.name}
							generation={generation + 1}
						/>
					))}
				</Flex>
			)}
		</MotionBox>
	);
};

export default FamilyNode;
