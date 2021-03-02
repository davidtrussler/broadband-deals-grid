import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null
    };
  }

  get deals() {
    return this.filter();
  }

  filter() {
    let productFilters = this.state.productFilters,
        providerFilter = this.state.providerFilter,
        filterable = [],
        filtered = [],
        filteredIds = [],
        filteredDeals = [];

    // Create a new array of deals in filterable state
    filterable = this.state.deals.map((deal) => {
      deal.productTypes = deal.productTypes.map((productType) => {
        // Make all product names lower case
        productType = productType.toLowerCase();
        // Consider 'Broadband' and 'Fibre Broadband' to be the same product
        productType = productType.replace('fibre ', '');

        return productType; 
      });

      // Ignore 'Phone'
      if (deal.productTypes.includes('phone')) {
        let index = deal.productTypes.indexOf('phone'); 
        let productTypes = deal.productTypes.splice(index, 1); 
      }

      return deal; 
    });

    if (this.state.productFilters.length) {
      // Create an array of deal IDs that match the filter criteria 
      filtered = filterable.filter(deal => 
        productFilters.every((productFilter) => {
          if (deal.productTypes.includes(productFilter) && deal.productTypes.length == productFilters.length) {
            return deal;
          }
        })
      );

      filteredIds = filtered.map(filteredDeal => filteredDeal.id);
    } else if (this.state.providerFilter) {
      // Create an array of deal IDs that match the filter criteria 
      filtered = filterable.filter((deal) => {
        if (deal.provider.name == providerFilter) {
          return deal;
        }
      });

      filteredIds = filtered.map(filteredDeal => filteredDeal.id);
    } else {
      filteredIds = this.state.deals.map(deal => deal.id); 
    }

    // Create an array of filtered deals to return
    this.state.deals.forEach((deal) => {
      if (filteredIds.includes(deal.id)) {
        filteredDeals.push(deal);
      }
    });

    return filteredDeals;
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
