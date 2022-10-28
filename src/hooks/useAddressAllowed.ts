import { getToken } from '@firebase/app-check'
import { useQuery } from '@tanstack/react-query'
import { useFirebase } from 'components/firebase'

const screeningUrl = process.env.REACT_APP_SCREENING_URL

export const useAddressAllowed = (address: string | null | undefined): boolean => {
  const { appCheck } = useFirebase()

  const { data } = useQuery<{ isAllowed: boolean }>(
    ['addressAllowed', address],
    async () => {
      const appCheckToken = await getToken(appCheck)
      return fetch(`${screeningUrl}/${address}`, {
        headers: {
          'X-Firebase-AppCheck': appCheckToken.token,
        },
      }).then((res) => res.json())
    },
    { enabled: !!address, refetchOnWindowFocus: false }
  )

  return data?.isAllowed ?? true
}
