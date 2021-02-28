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
	xit("should return all deals when no filters applied", () => {
		// Act
		let result = sut.deals;

		// Assert
		expect(result).toEqual(mockData.deals);
	});

	// Scenario 2: WHEN filtering by broadband THEN show the 4 broadband only deals
	xit("should return the 4 broadband only deals when filtering by broadband", () => {
		// Act
		sut.setProductFilter('Broadband');
		sut.filter(); 

		let result = sut.deals;

		// Assert
		expect(result.map(deal => deal.id)).toEqual([6158, 4359, 4371, 5459]);
	});

	// Scenario 3: WHEN filtering by broadband AND tv THEN show the 4 deals for broadband and tv only
	it("should return the 4 deals for broadband and tv only when filtering by broadband and tv", () => {
		// Act
		sut.setProductFilter('Broadband');
		sut.setProductFilter('TV');
		sut.filter();

		let result = sut.deals;

		// Assert
		// expect(result.map(deal => deal.id)).toEqual([6074, 5738, 6165, 6468]);
	});
});
