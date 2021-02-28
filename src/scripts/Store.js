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
      let filterTerms_products = this.state.productFilters[0];
      let filteredDeals = this.state.deals.filter((deal, filterTerms_products) => {
        if (deal.productTypes.length === 2 || deal.productTypes.indexOf(filterTerms_products) > -1) {
          return deal;
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
