export type ReviewType = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string,
  }
}

export type ReviewsType = Array<ReviewType>;

export type ReviewPostType = {
  comment: string,
  rating: number
}
