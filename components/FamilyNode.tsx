import React from "react";
import { Box, Text, VStack, HStack, Avatar, useToken } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IFamily } from "~/interfaces/family.interface";
import { formatDate } from "~/constants/date";
import { Tooltip } from "~/components/ui/tooltip";

const MotionBox = motion(Box);
const generationEmojis = ["🌱", "🌿", "🌳", "🪴", "🌾", "🌲"];

const getBorderColor = (generation: number) =>
	[
		"#68D391", // green.300
		"#48BB78", // green.400
		"#38A169", // green.500
		"#2F855A", // green.600
		"#276749", // green.700
	][generation] || "#38A169";

const MemberCard = ({
	member,
	parentName,
	generation,
}: {
	member: IFamily;
	parentName?: string;
	generation: number;
}) => {
	const emoji = generationEmojis[generation - 1] || "🌿";
	const borderColor = getBorderColor(generation);

	return (
		<MotionBox
			borderRadius="2xl"
			p={4}
			bg="white"
			border="1px solid"
			borderColor="gray.200"
			width="280px"
			boxShadow="lg"
			_hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			position="relative"
			zIndex={1}
		>
			<VStack
				align="start"
				borderLeft="3px solid"
				borderColor={borderColor}
				p={3}
				borderRadius="xl"
			>
				<Text fontSize="xs" fontWeight="bold" color="green.700">
					{emoji} Generation {generation}
				</Text>
				<HStack>
					<Avatar.Root variant="solid" size="sm">
						<Avatar.Fallback name={member.name} />
					</Avatar.Root>
					<Tooltip content={`More about ${member.name}`}>
						<Text
							fontWeight={generation === 1 ? "bold" : "semibold"}
							fontSize="md"
							color="blue.700"
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
					<Text fontSize="xs" color="gray.500">
						👪 Parent: {parentName}
					</Text>
				)}
			</VStack>
		</MotionBox>
	);
};

const FamilyNode = ({
	member,
	parentName,
	generation = 1,
}: {
	member: IFamily;
	parentName?: string;
	generation?: number;
}) => {
	return (
		<VStack align="center" position="relative">
			{/* Current Member */}
			<Box position="relative">
				<MemberCard
					member={member}
					parentName={parentName}
					generation={generation}
				/>

				{/* Vertical line below this node */}
				{member.children?.length > 0 && (
					<Box
						position="absolute"
						top="100%"
						left="50%"
						transform="translateX(-50%)"
						width="2px"
						height="30px"
						bg="gray.300"
						zIndex={0}
					/>
				)}
			</Box>

			{/* Children Nodes */}
			{member.children?.length > 0 && (
				<HStack
					align="start"
					pt={6}
					position="relative"
					wrap="wrap"
					justify="center"
					minW="fit-content"
					_before={{
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						height: "2px",
						bg: "gray.300",
						zIndex: 0,
					}}
				>
					{member.children.map((child) => (
						<Box position="relative" key={child.id}>
							{/* Vertical line from shared bar to child */}
							<Box
								position="absolute"
								top="-30px"
								left="50%"
								transform="translateX(-50%)"
								width="2px"
								height="30px"
								bg="gray.300"
								zIndex={0}
							/>
							<FamilyNode
								member={child}
								parentName={member.name}
								generation={generation + 1}
							/>
						</Box>
					))}
				</HStack>
			)}
		</VStack>
	);
};

export default FamilyNode;
