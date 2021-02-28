import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
	// Scenario 1: WHEN filtering by broadband THEN show the 4 broadband only deals
	it("should return all deals when no filters applied", () => {
		// Arrange
		const sut = new Store();
		sut.setDeals(mockData.deals);

		// Act
		const result = sut.deals;

		// Assert
		expect(result).toEqual(mockData.deals);
	});
});
