class ViewFilters {
  constructor(store) {
    this.store = store;
    this.productFilters = Array.from(
      document.getElementsByClassName("js-filter-product")
    );
    this.providerFilters = Array.from(
      document.getElementsByClassName("js-filter-provider")
    );
    this.sortSelector = document.querySelector(".js-sort"); 
    this.onProductFilterChange = this.onProductFilterChange.bind(this);
    this.onProviderFilterChange = this.onProviderFilterChange.bind(this);
    this.onSort = this.onSort.bind(this);
    this.addFilterEventHandlers();
    this.addSortEventHandler(); 
  }

  addSortEventHandler() {
    this.sortSelector.addEventListener('change', this.onSort); 
  }

  addFilterEventHandlers() {
    if (this.productFilters.length) {
      this.productFilters.forEach(element => {
        element.addEventListener("change", this.onProductFilterChange);
      });
    }
    if (this.providerFilters.length) {
      this.providerFilters.forEach(element => {
        element.addEventListener("change", this.onProviderFilterChange);
      });
    }
  }

  removeFilterEventHandlers() {
    if (this.productFilters.length) {
      this.productFilters.forEach(element => {
        element.removeEventListener("change", this.onProductFilterChange);
      });
    }
    if (this.providerFilters.length) {
      this.providerFilters.forEach(element => {
        element.removeEventListener("change", this.onProviderFilterChange);
      });
    }
  }

  onSort(e) {
    this.store.setSortValue(e.target.value); 
  }

  onProductFilterChange(event) {
    this.store.setProductFilter(event.target.value);
  }

  onProviderFilterChange(event) {
    const value = parseInt(event.target.value, 10)
    this.providerFilters.forEach(element => (element.checked = false));
    if (this.store.state.providerFilter === value) {
      this.store.setProviderFilter();
    } else {
      this.store.setProviderFilter(value);
      event.target.checked = true;
    }
  }

  update(state) {
    if (state.deals.length) {
      this.providerFilters.forEach(element => {
        element.hasAttribute("disabled") && element.removeAttribute("disabled");
      });
      this.productFilters.forEach(
        element =>
          element.hasAttribute("disabled") &&
          element.removeAttribute("disabled")
      );
    } else {
      this.providerFilters.forEach(
        element =>
          !element.hasAttribute("disabled") &&
          element.setAttribute("disabled", "disabled")
      );
      this.productFilters.forEach(
        element =>
          !element.hasAttribute("disabled") &&
          element.setAttribute("disabled", "disabled")
      );
    }
  }
}

export default ViewFilters;
