import { useMemo, useState } from "react";
import {
	Box,
	Button,
	Input,
	VStack,
	Heading,
	Select,
	createListCollection,
	Portal,
} from "@chakra-ui/react";
import { useFamilyTrees } from "~/hooks/useFamilyTrees";

const AdminDashboard = () => {
	const { isLoading, mutate, dataSource } = useFamilyTrees();
	const [name, setName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [parentId, setParentId] = useState("");

	const members = dataSource ?? [];

	const collection = createListCollection({
		items: members.map((m) => ({ label: m.name, value: m.id })) || [],
	});

	const treeId = useMemo(() => {
		const parent = dataSource?.find((member) => member.id === parentId);
		return parent?.treeId;
	}, [parentId, dataSource]);

	const handleCreate = () => {
		mutate(
			{
				name,
				birthDate: birthDate ? new Date(birthDate).toISOString() : undefined,
				parentId: parentId || undefined,
				treeId: treeId,
			},
			{
				onSuccess: () => {
					setName("");
					setBirthDate("");
					setParentId("");
				},
			},
		);
	};

	return (
		<Box p={6}>
			<Heading mb={4}>Admin Dashboard</Heading>
			<VStack align="stretch">
				<Input
					placeholder="Member Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					placeholder="Birth Date (YYYY-MM-DD)"
					value={birthDate}
					onChange={(e) => setBirthDate(e.target.value)}
					type="date"
				/>
				<Select.Root
					collection={collection}
					size="sm"
					width="full"
					value={parentId ? [parentId] : []}
					onValueChange={(e) => setParentId(e.value[0] as string)}
				>
					<Select.HiddenSelect />
					<Select.Label>Select Parent (optional)</Select.Label>
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText placeholder="Select parent" />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Portal>
						<Select.Positioner>
							<Select.Content>
								{collection.items.map((item) => (
									<Select.Item item={item} key={item.value}>
										{item.label}
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>
				<Button onClick={handleCreate} colorScheme="teal">
					Add Family Member
				</Button>
			</VStack>
			<Box mt={8}>
				<Heading size="md" mb={2}>
					Existing Trees
				</Heading>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<ul>
						{members.map((member) => (
							<li key={member.id}>
								{member.name} {member.birthDate && `- ${member.birthDate}`}
							</li>
						))}
					</ul>
				)}
			</Box>
		</Box>
	);
};

export default AdminDashboard;
