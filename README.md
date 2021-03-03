# Broadband Deals Grid

An exercise to implement the filter logic for a 'broadband deals' grid.

## Filter criteria

- [x] WHEN no filters applied THEN show all 11 deals
- [x] WHEN filtering by broadband THEN show the 4 broadband only deals
- [x] WHEN filtering by broadband AND tv THEN show the 4 deals for broadband and tv only
- [x] WHEN filtering by broadband AND mobile THEN show the 1 deal for broadband and mobile only
- [x] WHEN filtering by Sky THEN show the 1 deal for Sky only
- [x] WHEN filtering by BT, broadband AND tv THEN show the 2 deals for BT with broadband and tv only

Notes: 
- 'Broadband' and 'Fibre Broadband' should be considered the same product
- 'Phone' should be ignored

## Set up

```bash
# Install dependencies
npm install

# Run dev srerver and automatically open default browser
npm run serve

# Run tests
npm run test
```
