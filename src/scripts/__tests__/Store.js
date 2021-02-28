import Store from "../Store";
import ViewFilters from "../ViewFilters"; 
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

	// Scenario 2: WHEN filtering by broadband THEN show the 4 broadband only deals
	it("should return the 4 broadband only deals when filtering by broadband", () => {
		// Arrange
		const sut = new Store();
		sut.setDeals(mockData.deals);

		// const viewFilters = new ViewFilters(sut);

		// viewFilters.update(sut.state);

		// const filter_broadband = sut.setProductFilter('broadband');

		// console.log('viewFilters: ', viewFilters);
		// console.log('productFilters: ', productFilters);
		// console.log('filter_broadband: ', filter_broadband);

		// Act
		const result = sut.deals;
		sut.setProductFilter('broadband');

		console.log('sut: ', sut); 

		// Assert
		expect(result).toEqual(mockData.deals);
	});
});
