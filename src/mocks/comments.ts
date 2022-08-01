import { ReviewType, ReviewsType } from '../types/reviews';
import { keysToCamel } from '../utils/work-with-strings/convertCases';

const jsonComments = '[{"id":1,"user":{"id":12,"is_pro":true,"name":"Isaac","avatar_url":"https://8.react.pages.academy/static/avatar/3.jpg"},"rating":4,"comment":"This villa is perfect in every way: the view on mountains and waterfalls, the hot tub and the villa itself. The evening here became a great continuation of our journeys over country.","date":"2022-06-10T10:21:00.051Z"},{"id":2,"user":{"id":14,"is_pro":true,"name":"Corey","avatar_url":"https://8.react.pages.academy/static/avatar/5.jpg"},"rating":3,"comment":"What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!","date":"2022-06-10T10:21:00.051Z"}]';

export const reviews: ReviewsType = JSON.parse(jsonComments).map((review: ReviewType) => keysToCamel(review));
