import { SortVariants } from '../types/sort';

type ServerConfigType = {
  sorting: SortVariants,
}
export const ServerConfig: ServerConfigType = {
  sorting: SortVariants.Popular
};
