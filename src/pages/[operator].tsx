import styled from 'styled-components'
import { useRouter } from 'next/router'
import FormPay from '../components/FormPay'
import OPERATORS from '../../public/operator.json'
import Background from '@/components/Background'
import { GlobalStyle } from '@/app/layout'

const Layout = styled.div`
  margin: 0;
  height: 100%;
  padding: 3rem 0;
  display: flex;
  align-items: center;
`

const Wrapper = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 0.625rem;

  @media (max-width: 992px) {
    padding: 0 1.25rem;
  }
  @media (max-width: 576px) {
    padding: 0 0.75rem;
  }
`

const OperatorText = styled.span`
  font-size: 2rem;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(#95bff8, #d77ea6);
  font-weight: 700;
`

const CardContainer = styled.div`
  max-width: 435px;
  width: fit-content;
  margin: 0 auto;
  padding: 26px 38px;
  background-color: white;
  text-align: center;
  border: 1px dashed hsla(0, 0%, 64%, 0.6);

  border-radius: 20px;
  > h2 {
    text-align: center;
  }

  &:hover {
    box-shadow: 0 125px 80px rgba(23, 58, 105, 0.07),
      0 81.0185px 46.8519px rgba(23, 58, 105, 0.053),
      0 48.1481px 25.4815px rgba(23, 58, 105, 0.043),
      0 25px 13px rgba(23, 58, 105, 0.035),
      0 10.1852px 6.51852px rgba(23, 58, 105, 0.027),
      0 2.31481px 3.14815px rgba(23, 58, 105, 0.017);
  }

  @media (max-width: 576px) {
    padding: 36px 20px;
  }
`

export const getStaticPaths = async () => {
  const paths = OPERATORS.map(({ title }) => ({
    params: { operator: title },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async () => {
  if (!OPERATORS) {
    return {
      notFound: true,
    }
  }

  return {
    props: { operator: OPERATORS },
  }
}

export default function Operator() {
  const { query } = useRouter()

  return (
    <Layout>
      <GlobalStyle />
      <Background />
      <Wrapper>
        <CardContainer>
          <OperatorText>{query.operator}</OperatorText>
          <FormPay />
        </CardContainer>
      </Wrapper>
    </Layout>
  )
}
