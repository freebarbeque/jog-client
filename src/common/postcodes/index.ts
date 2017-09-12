const apiUrlBase = 'https://api.getAddress.io/find'

// example usage: getAddressesForPostcode('e145sq', '14fBYWjLs0u4Z664Kb73uQ10102').then(result => console.log(result))

export const getAddressesForPostcode = async (
  postcode: string,
  apiToken: string,
) => {
  const response = await fetch(
    `${apiUrlBase}/${postcode}?api-key=${apiToken}&format=true`,
  )
  return await response.json()
}
