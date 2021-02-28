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
		let filterTerm = 'broadband', 
				result;
		sut.setProductFilter(filterTerm);
		sut.filter(); 
		result = sut.deals;

		// Assert
		expect(result.map(deal => deal.id)).toEqual([6158, 4359, 4371, 5459]);
	});
});
