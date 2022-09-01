export enum SortVariants {
  Popular = 'Popular',
  PriceAscending = 'Price: low to high',
  PriceDescending = 'Price: high to low',
  Rating = 'Top rated first',
}

export enum SortVariantsQs {
  'Popular' = 'popular',
  'Price: low to high' = 'priceAsc',
  'Price: high to low' = 'priceDesc',
  'Top rated first' = 'rating',
}

export enum SortVariantsBuffer {
  'Popular' = <any>SortVariantsQs['Popular'],
  'Price: low to high' = <any>SortVariantsQs['Price: low to high'],
  'Price: high to low' = <any>SortVariantsQs['Price: high to low'],
  'Top rated first' = <any>SortVariantsQs['Top rated first'],
}

