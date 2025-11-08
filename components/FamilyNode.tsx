import React, { useState } from "react";
import { Box, Text, VStack, HStack, Avatar, Badge, Flex, Separator } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { IFamily, ISpouse } from "~/interfaces/family.interface";
import { formatDate } from "~/constants/date";
import { Tooltip } from "~/components/ui/tooltip";

const MotionBox = motion(Box);
const generationEmojis = ["👑", "💎", "⭐", "✨", "🌟", "💫", "🌠"];

const getGradient = (generation: number) => {
	const gradients = [
		"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
		"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
		"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
		"linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
		"linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
	];
	return gradients[(generation - 1) % gradients.length];
};

const getStatusEmoji = (status?: string) => {
	switch (status) {
		case "married":
			return "💍";
		case "divorced":
			return "💔";
		case "widowed":
			return "🕊️";
		case "partner":
			return "💕";
		default:
			return "💕";
	}
};

const getStatusColor = (status?: string) => {
	switch (status) {
		case "married":
			return { bg: "pink.50", border: "pink.200", avatar: "pink.400" };
		case "divorced":
			return { bg: "gray.50", border: "gray.300", avatar: "gray.400" };
		case "widowed":
			return { bg: "purple.50", border: "purple.200", avatar: "purple.400" };
		case "partner":
			return { bg: "blue.50", border: "blue.200", avatar: "blue.400" };
		default:
			return { bg: "pink.50", border: "pink.200", avatar: "pink.400" };
	}
};

const SpouseCard = ({ spouse }: { spouse: ISpouse }) => {
	const colors = getStatusColor(spouse.status);
	const statusEmoji = getStatusEmoji(spouse.status);

	return (
		<Box
			bg={colors.bg}
			borderRadius="xl"
			p={3}
			border="2px solid"
			borderColor={colors.border}
			boxShadow="0 4px 12px rgba(0,0,0,0.08)"
		>
			<HStack gap={2} align="center">
				<Avatar.Root size="sm" bg={colors.avatar} color="white">
					<Avatar.Fallback name={spouse.name} fontSize="xs" />
				</Avatar.Root>
				<VStack align="start" gap={0} flex={1}>
					<HStack gap={1}>
						<Text fontSize="sm" fontWeight="semibold" color="gray.800">
							{spouse.name}
						</Text>
						<Text fontSize="xs">{statusEmoji}</Text>
						{spouse.order && spouse.order > 1 && (
							<Badge size="xs" colorScheme="gray">
								{spouse.order === 2 ? "2nd" : spouse.order === 3 ? "3rd" : `${spouse.order}th`}
							</Badge>
						)}
					</HStack>
					{spouse.marriageDate && (
						<Text fontSize="xs" color="gray.600">
							💍 Married: {formatDate(spouse.marriageDate)}
						</Text>
					)}
					{spouse.divorceDate && (
						<Text fontSize="xs" color="gray.600">
							💔 Divorced: {formatDate(spouse.divorceDate)}
						</Text>
					)}
					{spouse.birthDate && !spouse.marriageDate && !spouse.divorceDate && (
						<Text fontSize="xs" color="gray.600">
							🎂 Born: {formatDate(spouse.birthDate)}
						</Text>
					)}
				</VStack>
			</HStack>
		</Box>
	);
};

const MemberCard = ({
	member,
	parentName,
	generation,
}: {
	member: IFamily;
	parentName?: string;
	generation: number;
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const emoji = generationEmojis[(generation - 1) % generationEmojis.length];
	const gradient = getGradient(generation);
	const childCount = member.children?.length || 0;
	const hasSpouses = member.spouses && member.spouses.length > 0;

	return (
		<MotionBox
			borderRadius="2xl"
			bg="white"
			width={{ base: "280px", sm: "300px", md: "340px" }}
			boxShadow="0 10px 30px rgba(0,0,0,0.15)"
			_hover={{
				boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
				transform: "translateY(-4px)",
			}}
			initial={{ opacity: 0, scale: 0.9, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
			position="relative"
			zIndex={1}
			overflow="hidden"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			cursor="pointer"
		>
			{/* Gradient header */}
			<Box
				h="6px"
				w="100%"
				background={gradient}
				position="absolute"
				top={0}
				left={0}
			/>

			{/* Animated background on hover */}
			<AnimatePresence>
				{isHovered && (
					<MotionBox
						position="absolute"
						top={0}
						left={0}
						right={0}
						bottom={0}
						background={gradient}
						opacity={0.05}
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.05 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					/>
				)}
			</AnimatePresence>

			<VStack align="stretch" p={5} gap={3} position="relative">
				{/* Generation badge */}
				<Flex justify="space-between" align="center">
					<Badge
						bg={gradient}
						color="white"
						px={3}
						py={1}
						borderRadius="full"
						fontSize="xs"
						fontWeight="bold"
						boxShadow="0 2px 8px rgba(0,0,0,0.15)"
					>
						{emoji} Gen {generation}
					</Badge>
					{childCount > 0 && (
						<Badge
							colorScheme="green"
							borderRadius="full"
							px={2}
							py={1}
							fontSize="xs"
						>
							{childCount} {childCount === 1 ? "child" : "children"}
						</Badge>
					)}
				</Flex>

				{/* Member info */}
				<HStack gap={3} align="center">
					<MotionBox
						whileHover={{ scale: 1.1, rotate: 5 }}
						transition={{ duration: 0.2 }}
					>
						<Avatar.Root
							size="lg"
							variant="solid"
							bg={gradient}
							color="white"
							boxShadow="0 4px 12px rgba(0,0,0,0.15)"
						>
							<Avatar.Fallback name={member.name} fontSize="lg" />
						</Avatar.Root>
					</MotionBox>
					<VStack align="start" gap={0} flex={1}>
						<Tooltip content={`View ${member.name}'s details`}>
							<Text
								fontWeight="bold"
								fontSize={{ base: "lg", md: "xl" }}
								color="gray.800"
								lineHeight="1.2"
								lineClamp={2}
							>
								{member.name}
							</Text>
						</Tooltip>
						{generation === 1 && (
							<Badge colorScheme="purple" fontSize="xs" mt={1}>
								Family Root
							</Badge>
						)}
					</VStack>
				</HStack>

				{/* Details */}
				<VStack align="stretch" gap={2} pt={2} borderTop="1px solid" borderColor="gray.100">
					{member.birthDate && (
						<HStack fontSize="sm" color="gray.600">
							<Text>🎂</Text>
							<Text fontWeight="medium">Born:</Text>
							<Text>{formatDate(member.birthDate)}</Text>
						</HStack>
					)}
					{parentName && (
						<HStack fontSize="sm" color="gray.600">
							<Text>👪</Text>
							<Text fontWeight="medium">Parent:</Text>
							<Text lineClamp={1}>{parentName}</Text>
						</HStack>
					)}
				</VStack>

				{/* Spouses/Partners Section */}
				{hasSpouses && (
					<VStack align="stretch" gap={2} pt={3} mt={2} borderTop="2px dashed" borderColor="pink.200">
						<HStack gap={1}>
							<Text fontSize="xs" fontWeight="bold" color="pink.600" textTransform="uppercase">
								{member.spouses!.length > 1 ? "Partners" : "Partner"}
							</Text>
							<Badge colorScheme="pink" fontSize="xs" borderRadius="full">
								{member.spouses!.length}
							</Badge>
						</HStack>
						<VStack align="stretch" gap={2}>
							{member.spouses!.map((spouse, index) => (
								<SpouseCard key={spouse.id || index} spouse={spouse} />
							))}
						</VStack>
					</VStack>
				)}
			</VStack>

			{/* Decorative corner */}
			<Box
				position="absolute"
				bottom={0}
				right={0}
				width="60px"
				height="60px"
				background={gradient}
				opacity={0.1}
				borderTopLeftRadius="full"
			/>
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
	const hasChildren = member.children && member.children.length > 0;

	return (
		<VStack align="center" position="relative" gap={0}>
			{/* Current Member */}
			<Box position="relative">
				<MemberCard
					member={member}
					parentName={parentName}
					generation={generation}
				/>

				{/* Vertical line below this node */}
				{hasChildren && (
					<MotionBox
						position="absolute"
						top="100%"
						left="50%"
						transform="translateX(-50%)"
						width="3px"
						height="40px"
						bg="whiteAlpha.600"
						initial={{ scaleY: 0 }}
						animate={{ scaleY: 1 }}
						transition={{ duration: 0.4, delay: 0.2 }}
						transformOrigin="top"
						borderRadius="full"
					/>
				)}
			</Box>

			{/* Children Nodes */}
			{hasChildren && (
				<Box position="relative" pt={10} w="100%">
					{/* Horizontal connecting line */}
					{member.children.length > 1 && (
						<MotionBox
							position="absolute"
							top="0"
							left="50%"
							transform="translateX(-50%)"
							height="3px"
							bg="whiteAlpha.600"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							borderRadius="full"
							width={`${Math.min(member.children.length * 340, 95)}%`}
						/>
					)}

					<Flex
						direction={{ base: "column", md: "row" }}
						align="start"
						justify="center"
						gap={{ base: 8, md: 6, lg: 8 }}
						flexWrap="wrap"
						position="relative"
					>
						{member.children.map((child, index) => (
							<Box position="relative" key={child.id}>
								{/* Vertical line from shared bar to child */}
								<MotionBox
									position="absolute"
									top={{ base: "-32px", md: "-40px" }}
									left="50%"
									transform="translateX(-50%)"
									width="3px"
									height={{ base: "32px", md: "40px" }}
									bg="whiteAlpha.600"
									initial={{ scaleY: 0 }}
									animate={{ scaleY: 1 }}
									transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
									transformOrigin="top"
									borderRadius="full"
								/>
								<FamilyNode
									member={child}
									parentName={member.name}
									generation={generation + 1}
								/>
							</Box>
						))}
					</Flex>
				</Box>
			)}
		</VStack>
	);
};

export default FamilyNode;
