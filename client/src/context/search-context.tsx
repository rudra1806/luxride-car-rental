import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  location: string;
  pickupDate: Date | undefined;
  returnDate: Date | undefined;
  setSearchParams: (location: string, pickupDate?: Date, returnDate?: Date) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<string>('');
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);

  const setSearchParams = (
    location: string,
    pickupDate?: Date,
    returnDate?: Date
  ) => {
    setLocation(location);
    if (pickupDate) setPickupDate(pickupDate);
    if (returnDate) setReturnDate(returnDate);
  };

  return (
    <SearchContext.Provider
      value={{
        location,
        pickupDate,
        returnDate,
        setSearchParams,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  
  return context;
}