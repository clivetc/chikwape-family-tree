import React, { useRef, useLayoutEffect, useState } from "react";
import {
	Box,
	Text,
	VStack,
	HStack,
	Avatar,
	useBreakpointValue,
} from "@chakra-ui/react";
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

const FamilyNode = ({
	member,
	parentName,
	generation = 1,
}: {
	member: IFamily;
	parentName?: string;
	generation?: number;
}) => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const childRefs = useRef<HTMLDivElement[]>([]);
	const [lines, setLines] = useState<
		{ x1: number; y1: number; x2: number; y2: number }[]
	>([]);

	const emoji = generationEmojis[generation - 1] || "🌿";
	const borderColor = getBorderColor(generation);

	useLayoutEffect(() => {
		if (!nodeRef.current || !member.children?.length) return;

		const parentRect = nodeRef.current.getBoundingClientRect();
		const parentX = parentRect.left + parentRect.width / 2;
		const parentY = parentRect.bottom;

		const newLines = childRefs.current.map((child) => {
			if (!child) return null;
			const childRect = child.getBoundingClientRect();
			const childX = childRect.left + childRect.width / 2;
			const childY = childRect.top;
			return { x1: parentX, y1: parentY, x2: childX, y2: childY };
		});

		setLines(newLines.filter(Boolean) as any);
	}, [member.children]);

	return (
		<Box position="relative" ref={nodeRef} w="fit-content" mx="auto" mb={12}>
			<MotionBox
				borderRadius="2xl"
				p={4}
				bg="white"
				border="1px solid"
				borderColor="gray.200"
				boxShadow="lg"
				_hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
			>
				<VStack
					align="start"
					borderLeft="3px solid"
					borderColor={borderColor}
					width={{ base: "100%", md: "320px", lg: "360px" }} // 👈 reduce width
					maxW={{ base: "100%", md: "320px", lg: "360px" }} // 👈 reduce max width
					p={3} // 👈 reduce padding
					borderRadius="xl"
					textAlign="center"
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
								fontSize={{ base: "md", md: "lg" }}
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

			{member.children?.length > 0 && (
				<Box mt={10} position="relative">
					<svg
						width="100%"
						height="100%"
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							pointerEvents: "none",
							zIndex: 0,
						}}
					>
						{lines.map((line, index) => (
							<line
								key={index}
								x1={line.x1}
								y1={line.y1}
								x2={line.x2}
								y2={line.y2}
								stroke="gray"
								strokeWidth="2"
								strokeDasharray="4"
							/>
						))}
					</svg>

					<HStack
						justify="center"
						flexWrap="wrap"
						align="start"
						position="relative"
						zIndex={1}
					>
						{member.children.map((child, index) => (
							<Box
								key={child.id}
								ref={(el: any) => (childRefs.current[index] = el!)}
							>
								<FamilyNode
									member={child}
									parentName={member.name}
									generation={generation + 1}
								/>
							</Box>
						))}
					</HStack>
				</Box>
			)}
		</Box>
	);
};

export default FamilyNode;
