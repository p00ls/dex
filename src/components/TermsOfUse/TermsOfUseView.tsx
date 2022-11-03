import { useState } from 'react'
import { Box, Button, Flex, Text } from 'rebass/styled-components'
import styled from 'styled-components/macro'

interface Props {
  accept: () => void
}

const Viewport = styled(Box)`
  font-family: Helvetica Neue, sans-serif;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  max-width: 460px;
`

const Title = styled(Text)`
  font-size: 18px;
  line-height: 24px;
`

const Subtitle = styled(Text)`
  font-size: 14px;
  line-height: 18px;
  color: #666666;
`

const Info = styled(Text)`
  font-size: 10px;
  line-height: 14px;
  text-transform: uppercase;
`

const Validation = styled(Info)`
  color: #666666;
`

const Accept = styled(Button)`
  display: block;
  width: 100%;
  background: #333333;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;

  :disabled {
    color: #c3c5cb;
  }
`

export const Checkbox = styled.input`
  margin: 0;
  flex: 0 0 16px;
`

export const TermsOfUseView: React.FC<Props> = ({ accept }: Props) => {
  const [termsOfUseChecked, setTermsOfUseChecked] = useState(false)
  return (
    <Viewport m="140px auto 0 auto;" px={10}>
      <Title>Welcome to the 00 DEX</Title>

      <Subtitle my={30} mx={80}>
        Your access to and use of this site is subject to the Terms of Use.
      </Subtitle>

      <Info my={30}>
        Due to legal and regulatory restrictions, this Interface is not available to residents of Iran, Syria, Cuba,
        North Korea, the following regions of Ukraine: Crimea, Donetsk and Luhansk and the United States.{' '}
      </Info>

      <Validation my={30} mx={50}>
        <Flex sx={{ gap: 3 }}>
          <Checkbox
            name="confirmed"
            type="checkbox"
            checked={termsOfUseChecked}
            onChange={() => setTermsOfUseChecked(!termsOfUseChecked)}
            id="confirmTermsOfUse"
          />
          <label htmlFor="confirmTermsOfUse" style={{ textAlign: 'left' }}>
            In using this Interface, you confirm that you are not located in, incorporated or otherwise established in,
            or a citizen or resident of, a Prohibited Territory.
          </label>
        </Flex>
      </Validation>

      <Accept
        mt={45}
        py={16}
        disabled={!termsOfUseChecked}
        onClick={() => {
          termsOfUseChecked && accept()
        }}
      >
        Accept Terms of Use
      </Accept>
    </Viewport>
  )
}
