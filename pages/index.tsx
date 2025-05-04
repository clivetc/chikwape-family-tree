import Head from "next/head";
import { useFamilyTrees } from "~/hooks/useFamilyTrees";
import { Box, Skeleton, VStack, SkeletonText } from "@chakra-ui/react";
import FamilyTree from "~/components/FamilyTree";

export default function Home() {
	const { isFamilyLoading, data } = useFamilyTrees();
	return (
		<>
			<Head>
				<title>Chikwape Family Tree</title>
				<meta name="description" content="Chikwape Family Tree" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{isFamilyLoading ? (
				<Box maxW="800px" mx="auto" mt={10} p={4}>
					<Skeleton height="40px" mb={4} />
					<VStack align="start">
						{[...Array(3)].map((_, i) => (
							<Box key={i} w="100%">
								<Skeleton height="24px" mb={2} />
								<SkeletonText noOfLines={2} />
							</Box>
						))}
					</VStack>
				</Box>
			) : (
				data && <FamilyTree data={data} />
			)}
		</>
	);
}
