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
    console.log('filter!');
    // console.log('productFilters: ', this.state.productFilters);

    if (this.state.productFilters.length) {
      let productFilters = this.state.productFilters;
      let filteredDeals = this.state.deals.filter((deal) => {
        let match = false; 

        deal.productTypes.forEach((productType) => {
          if (productFilters.indexOf(productType.toLowerCase()) > -1) {
            match = true; 
          }
        });
        
        return match; 
      });

      console.log('filteredDeals: ', filteredDeals); 

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
