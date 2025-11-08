import { IFamily } from "~/interfaces/family.interface";

/**
 * Example family tree data showing how to include spouses/partners
 * 
 * This demonstrates:
 * - Single spouse/partner
 * - Multiple spouses/partners (remarriage)
 * - Marriage dates
 * - Partners without marriage dates
 */

export const exampleFamilyData: IFamily[] = [
	{
		id: "1",
		name: "John Chikwape",
		birthDate: "1950-01-15",
		parentId: null,
		treeId: "tree1",
		// Single spouse with marriage date
		spouses: [
			{
				id: "spouse1",
				name: "Mary Smith",
				birthDate: "1952-03-20",
				marriageDate: "1975-06-10",
			},
		],
		children: [
			{
				id: "2",
				name: "David Chikwape",
				birthDate: "1976-08-12",
				parentId: "1",
				treeId: "tree1",
				// Multiple spouses (remarriage example)
				spouses: [
					{
						id: "spouse2",
						name: "Sarah Johnson",
						birthDate: "1978-05-15",
						marriageDate: "2000-04-20",
					},
					{
						id: "spouse3",
						name: "Lisa Brown",
						birthDate: "1980-11-30",
						marriageDate: "2015-09-12",
					},
				],
				children: [
					{
						id: "3",
						name: "Emma Chikwape",
						birthDate: "2001-02-14",
						parentId: "2",
						treeId: "tree1",
						// Partner without marriage date
						spouses: [
							{
								name: "Michael Davis",
								birthDate: "2000-07-22",
							},
						],
						children: [],
					},
					{
						id: "4",
						name: "James Chikwape",
						birthDate: "2016-12-05",
						parentId: "2",
						treeId: "tree1",
						// No spouse yet
						children: [],
					},
				],
			},
			{
				id: "5",
				name: "Grace Chikwape",
				birthDate: "1980-04-25",
				parentId: "1",
				treeId: "tree1",
				spouses: [
					{
						id: "spouse4",
						name: "Peter Wilson",
						birthDate: "1979-09-10",
						marriageDate: "2005-07-15",
					},
				],
				children: [
					{
						id: "6",
						name: "Sophia Wilson",
						birthDate: "2008-03-18",
						parentId: "5",
						treeId: "tree1",
						children: [],
					},
				],
			},
		],
	},
];

/**
 * How to add spouses to your existing family data:
 * 
 * 1. For a single spouse/partner:
 *    spouses: [
 *      {
 *        name: "Partner Name",
 *        birthDate: "1980-01-01",        // Optional
 *        marriageDate: "2005-06-15",     // Optional
 *      }
 *    ]
 * 
 * 2. For multiple spouses (remarriage):
 *    spouses: [
 *      { name: "First Spouse", marriageDate: "2000-01-01" },
 *      { name: "Second Spouse", marriageDate: "2010-01-01" },
 *    ]
 * 
 * 3. For partners without marriage:
 *    spouses: [
 *      { name: "Partner Name", birthDate: "1985-05-20" }
 *    ]
 * 
 * 4. If no spouse/partner, simply omit the spouses field or set it to []
 */
