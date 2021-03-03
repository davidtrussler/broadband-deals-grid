import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
	let sut;

	beforeAll(() => {
		// Arrange
		sut = new Store();
		sut.setDeals(mockData.deals);
	});

	// Scenario 1: WHEN filtering by broadband THEN show the 4 broadband only deals
	it("should return all deals when no filters applied", () => {
		// Act
		let result = sut.deals;

		// Assert
		expect(result).toEqual(mockData.deals);
	});

	// Scenario 2: WHEN filtering by broadband THEN show the 4 broadband only deals
	it("should return the 4 broadband only deals when filtering by broadband", () => {
		// Act
		sut.setProductFilter('Broadband');
		sut.filter();

		let result = sut.deals;

		// Assert
		let expected = [];

		mockData.deals.map(deal => {
			if ([6158, 4359, 4371, 5459].includes(deal.id)) {
				expected.push(deal);
			}
		});

		expect(result).toEqual(expected);
	});

	// Scenario 3: WHEN filtering by broadband AND tv THEN show the 4 deals for broadband and tv only
	it("should return the 4 deals for broadband and tv only when filtering by broadband and tv", () => {
		// Act
		sut.setProductFilter('TV');
		sut.filter();

		let result = sut.deals;

		// Assert
		let expected = [];

		mockData.deals.map(deal => {
			if ([6074, 5738, 6165, 6468].includes(deal.id)) {
				expected.push(deal);
			}
		});

		expect(result).toEqual(expected);
	});

	// Scenario 4: WHEN filtering by broadband AND mobile THEN show the 1 deal for broadband and mobile only
	it("should return the 1 deal for broadband and mobile only when filtering by broadband and mobile", () => {
		// Act
		sut.setProductFilter('TV');
		sut.setProductFilter('Mobile');
		sut.filter();

		let result = sut.deals;

		// Assert
		let expected = [];

		mockData.deals.map(deal => {
			if ([4276].includes(deal.id)) {
				expected.push(deal);
			}
		});

		expect(result).toEqual(expected);
	});

	// Scenario 5: WHEN filtering by Sky THEN show the 1 deal for Sky only
	it("should return the 1 deal for Sky only when filtering by Sky", () => {
		// Act
		sut.setProductFilter('Broadband');
		sut.setProductFilter('Mobile');
		sut.setProviderFilter('Sky'); 
		sut.filter();

		let result = sut.deals;

		// Assert
		let expected = [];

		mockData.deals.map(deal => {
			if ([6468].includes(deal.id)) {
				expected.push(deal);
			}
		});

		expect(result).toEqual(expected);
	});

	// WHEN filtering by BT, broadband AND tv THEN show the 2 deals for BT with broadband and tv only
	it("should return the 2 deals for BT with broadband and tv only when filtering by BT, broadband AND tv", () => {
		// Act
		sut.setProductFilter('TV');
		sut.setProductFilter('Broadband');
		sut.setProviderFilter('BT');
		sut.filter();

		let result = sut.deals;

		// Assert
		let expected = [];

		mockData.deals.map(deal => {
			if ([6074, 5738].includes(deal.id)) {
				expected.push(deal);
			}
		});

		expect(result).toEqual(expected);
	});
});
