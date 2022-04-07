import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ServerPromiseResp } from '@typings/common';
import {
  MarketplaceEvents,
  MarketplaceListing,
  MarketplaceListingBase,
} from '@typings/marketplace';
import fetchNui from '@utils/fetchNui';
import { isEnvBrowser } from '@utils/misc';

const defaultData: MarketplaceListing[] = [
  {
    id: 1,
    name: 'Some guy',
    number: '111-1134',
    username: 'Taso',
    title: 'eeeeeeeeeeeeeeeeeeeeeeeee',
    description:
      'skldfsdEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
    url: 'https://i.file.glass/706Y3.jpeg',
  },
  {
    id: 2,
    name: 'Some other dude',
    number: '666-6666',
    username: 'Taso',
    title: 'Material',
    description: 'Selling my wife',
    url: '',
  },
];

export const listingState = {
  marketplaceListings: atom<MarketplaceListing[]>({
    key: 'listings',
    default: selector({
      key: 'defaultListings',
      get: async () => {
        try {
          const resp = await fetchNui<ServerPromiseResp<MarketplaceListing[]>>(
            MarketplaceEvents.FETCH_LISTING,
          );
          return resp.data;
        } catch (e) {
          if (isEnvBrowser()) return defaultData;
          console.error(e);
          return [];
        }
      },
    }),
  }),
  filterValue: atom<string>({
    key: 'defaultFilterValueMarketplace',
    default: '',
  }),
  filteredMarketplaceListings: selector<MarketplaceListing[]>({
    key: 'defaultFilteredListings',
    get: ({ get }) => {
      const searchValue: string = get(listingState.filterValue);
      const marketplaceListings: MarketplaceListing[] = get(listingState.marketplaceListings);

      if (!searchValue) return marketplaceListings; // added this

      const regExp = new RegExp(searchValue, 'gi');

      return marketplaceListings.filter(
        (listing) =>
          listing?.title?.match(regExp) || listing?.description?.match(regExp) || listing?.name?.match(regExp),
      );
    },
  }),
};

export const formState = atom<MarketplaceListingBase>({
  key: 'form',
  default: {
    title: '',
    description: '',
    url: '',
  },
});

export const useListingValue = () => useRecoilValue(listingState.marketplaceListings);
export const useSetListings = () => useSetRecoilState(listingState.marketplaceListings);
export const useListings = () => useRecoilState(listingState.marketplaceListings);
export const useFilterValueState = () => useRecoilState(listingState.filterValue);
export const useFilteredListingsValue = () => useRecoilValue(listingState.filteredMarketplaceListings);

export const useFormValue = () => useRecoilValue(formState);
export const useSetForm = () => useSetRecoilState(formState);
export const useForm = () => useRecoilState(formState);

