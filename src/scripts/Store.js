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
    if (this.state.productFilters.length) {
      let productFilters = this.state.productFilters,
          filterable,
          filtered, 
          filteredIds, 
          filteredDeals = [];

      filterable = this.state.deals.map((deal) => {
        deal.productTypes = deal.productTypes.map((productType) => {
          productType = productType.toLowerCase();
          productType = productType.replace('fibre ', '');

          return productType; 
        });

        if (deal.productTypes.includes('phone')) {
          let index = deal.productTypes.indexOf('phone'); 
          let productTypes = deal.productTypes.splice(index, 1); 
        }

        return deal; 
      });

      filtered = filterable.filter(deal => 
        productFilters.every((productFilter) => {
          if (deal.productTypes.includes(productFilter) && deal.productTypes.length == productFilters.length) {
            return deal;
          }
        })
      );

      filteredIds = filtered.map(filteredDeal => filteredDeal.id);

      this.state.deals.forEach((deal) => {
        if (filteredIds.includes(deal.id)) {
          filteredDeals.push(deal);
        }
      });

      return filteredDeals;
    } else {
      return this.state.deals; 
    }
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
