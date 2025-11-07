import React, { useState } from "react";
import { Box, Text, VStack, HStack, Avatar, Badge, Flex } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { IFamily } from "~/interfaces/family.interface";
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

	return (
		<MotionBox
			borderRadius="2xl"
			bg="white"
			width={{ base: "280px", sm: "300px", md: "320px" }}
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
