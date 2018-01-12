export const getAddressById = (state: any, addressId: number) => state.quoteAddresses.addresses.find(a => a.id === addressId) || null;
export const getQuoteAddresses = (state: any) => state.quoteAddresses.addresses || [];
export const getPossibleAddresses = (state: any) => state.quoteAddresses.possibleAddresses || [];
export const getLoadingState = (state: any) => state.quoteAddresses.isLoading || false;
