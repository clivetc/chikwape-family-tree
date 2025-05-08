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

const generationEmojis = ["🌱", "🌿", "🌳", "🪴", "🌾", "🌲"];

const getBgColor = (generation: number) =>
	["white", "gray.50", "gray.100", "gray.200", "gray.300", "gray.400"][
		generation
	] || "gray.100";

const getBorderColor = (generation: number) =>
	[
		"#68D391", // green.300
		"#48BB78", // green.400
		"#38A169", // green.500
		"#2F855A", // green.600
		"#276749", // green.700
	][generation] || "#38A169";

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
	const borderColor = getBorderColor(generation);
	const emoji = generationEmojis[generation - 1] || "🌿";

	return (
		<MotionBox
			w="full"
			px={{ base: 2, md: 0 }}
			ml={isMobile ? generation * 2 : generation * 4}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			position="relative"
		>
			{!isMobile && (
				<Box
					position="absolute"
					left="-2px"
					top="0"
					bottom="0"
					width="2px"
					bgGradient={`linear(to-b, ${borderColor}, transparent)`}
					borderRadius="full"
				/>
			)}

			<VStack
				align="start"
				gap={4}
				width="100%"
				maxW={{ base: "100%", md: "420px", lg: "480px" }}
				p={5}
				borderRadius="xl"
				bg={bg}
				border="1px solid"
				borderColor="gray.200"
				boxShadow="xl"
				position="relative"
				_hover={{
					boxShadow: "0 0 15px rgba(56, 161, 105, 0.6)",
					transform: "translateY(-5px)",
					transition: "all 0.3s ease",
				}}
			>
				<Text fontSize="sm" fontWeight="bold" color="green.700">
					{emoji} Generation {generation}
				</Text>

				<HStack gap={4}>
					<Avatar.Root variant="solid" size="lg" borderRadius="full">
						<Avatar.Fallback name={member.name} />
					</Avatar.Root>

					<Tooltip content={`More about ${member.name}`}>
						<Text
							fontWeight={generation === 1 ? "bold" : "semibold"}
							fontSize={{ base: "md", md: "xl" }}
							color="blue.700"
							_hover={{ color: "blue.500" }}
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
						👪 Parent: {parentName}
					</Text>
				)}

				<Box borderColor="gray.300" divideX="2px" />
			</VStack>

			{/* Children Generation Nodes */}
			{member.children && member.children.length > 0 && (
				<Flex
					direction={{ base: "column", md: "row" }}
					gap={6}
					mt={6}
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
