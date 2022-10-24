import { useQuery } from '@tanstack/react-query'

const TWO_MINUTES = 2 * 60 * 1000
const screeningUrl = process.env.REACT_APP_SCREENING_URL

export const useAddressAllowed = (address: string | null | undefined): boolean => {
  const { data } = useQuery<{ isAllowed: boolean }>(
    ['addressAllowed', address],
    async () => fetch(`${screeningUrl}/${address}`).then((res) => res.json()),
    { enabled: !!address, refetchInterval: TWO_MINUTES, refetchOnWindowFocus: false }
  )

  return data?.isAllowed ?? true
}
