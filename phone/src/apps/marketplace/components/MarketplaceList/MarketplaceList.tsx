import React from 'react';
import { List } from '@ui/components/List';
import { Box } from '@mui/material';
import { SearchField } from '@ui/components/SearchField';
import { MarketplaceItem } from './MarketplaceItem';
import {
  useFilteredListingsValue,
  useFilterValueState
} from '../../hooks/state';

export const MarketplaceList: React.FC = () => {
  const filteredListings = useFilteredListingsValue();
  const [searchValue, setSearchValue] = useFilterValueState();

  return (
      <Box>
        <SearchField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Search Marketplace...'
        />

      <List>
          {[...filteredListings]
            .map((listing) => (
              <MarketplaceItem
                key={listing.id} {...listing}
              />
            ))}
        </List>
      
      </Box>
  );
};
