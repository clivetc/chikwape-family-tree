import React from "react";
import { Box, Button, Flex, Text, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IFamily } from "~/interfaces/family.interface";
import FamilyNode from "./FamilyNode";
import { useRouter } from "next/router";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const FamilyTree = ({ data }: { data: IFamily[] }) => {
	const router = useRouter();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push("/admin");
	};

	return (
		<Box
			minH="100vh"
			position="relative"
			overflow="hidden"
			bg="linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)"
		>
			{/* Zebra stripe pattern overlay */}
			<Box
				position="absolute"
				top={0}
				left={0}
				right={0}
				bottom={0}
				opacity={0.08}
				backgroundImage="repeating-linear-gradient(
					45deg,
					#000 0px,
					#000 20px,
					transparent 20px,
					transparent 40px,
					#000 40px,
					#000 60px,
					transparent 60px,
					transparent 100px
				)"
				zIndex={0}
			/>
			
			{/* Subtle zebra silhouette watermark */}
			<Box
				position="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				fontSize="600px"
				opacity={0.02}
				zIndex={0}
				pointerEvents="none"
			>
				🦓
			</Box>

			{/* Animated accent elements */}
			<Box
				position="absolute"
				top="10%"
				left="5%"
				width="300px"
				height="300px"
				borderRadius="full"
				bg="blackAlpha.50"
				filter="blur(80px)"
				animation="float 20s ease-in-out infinite"
				zIndex={0}
			/>
			<Box
				position="absolute"
				bottom="10%"
				right="5%"
				width="400px"
				height="400px"
				borderRadius="full"
				bg="blackAlpha.50"
				filter="blur(80px)"
				animation="float 25s ease-in-out infinite reverse"
				zIndex={0}
			/>

			<Container maxW="100%" px={{ base: 4, md: 8 }} py={8} position="relative" zIndex={1}>
				{/* Header */}
				<MotionFlex
					justifyContent="space-between"
					alignItems="center"
					mb={8}
					flexDirection={{ base: "column", md: "row" }}
					gap={4}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<Box textAlign={{ base: "center", md: "left" }}>
						<Text
							fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
							fontWeight="extrabold"
							color="gray.800"
							textShadow="0 2px 4px rgba(0,0,0,0.1)"
							letterSpacing="tight"
						>
							🦓 Chikwape Family Tree
						</Text>
						<Text
							fontSize={{ base: "sm", md: "md" }}
							color="gray.700"
							mt={2}
							fontWeight="medium"
						>
							Celebrating our heritage, one generation at a time
						</Text>
					</Box>
					<Button
						onClick={handleClick}
						size={{ base: "md", md: "lg" }}
						bg="gray.800"
						color="white"
						_hover={{
							transform: "translateY(-2px)",
							boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
							bg: "gray.900",
						}}
						_active={{ transform: "translateY(0)" }}
						transition="all 0.2s"
						fontWeight="bold"
						px={8}
						borderRadius="full"
						boxShadow="0 4px 14px rgba(0,0,0,0.2)"
					>
						✨ Add Family Member
					</Button>
				</MotionFlex>

				{/* Tree Container */}
				<MotionBox
					bg="white"
					backdropFilter="blur(20px)"
					borderRadius="3xl"
					p={{ base: 4, md: 8, lg: 12 }}
					boxShadow="0 20px 60px rgba(0,0,0,0.15)"
					border="2px solid"
					borderColor="gray.200"
					overflowX="auto"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					css={{
						"&::-webkit-scrollbar": {
							height: "8px",
						},
						"&::-webkit-scrollbar-track": {
							background: "rgba(255,255,255,0.1)",
							borderRadius: "10px",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "rgba(255,255,255,0.3)",
							borderRadius: "10px",
						},
						"&::-webkit-scrollbar-thumb:hover": {
							background: "rgba(255,255,255,0.5)",
						},
					}}
				>
					<Flex
						direction="column"
						align="center"
						justify="center"
						minH="60vh"
						gap={12}
						py={8}
					>
						{data.length > 0 ? (
							data.map((rootMember, index) => (
								<MotionBox
									key={rootMember.id}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									w="100%"
								>
									<FamilyNode member={rootMember} />
								</MotionBox>
							))
						) : (
							<Box textAlign="center" py={20}>
								<Text fontSize="6xl" mb={4}>
									🦓
								</Text>
								<Text fontSize="2xl" color="gray.800" fontWeight="bold" mb={2}>
									No family members yet
								</Text>
								<Text fontSize="md" color="gray.600">
									Start building your family tree by adding the first member
								</Text>
							</Box>
						)}
					</Flex>
				</MotionBox>

				{/* Footer info */}
				<MotionBox
					textAlign="center"
					mt={8}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<Text fontSize="sm" color="gray.600">
						🦓 Built with love for the Chikwape family
					</Text>
				</MotionBox>
			</Container>

			<style jsx global>{`
				@keyframes float {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-30px);
					}
				}
			`}</style>
		</Box>
	);
};

export default FamilyTree;
