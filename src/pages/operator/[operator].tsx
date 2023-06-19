import styled from 'styled-components'
import { useRouter } from 'next/router'
import '../../app/globals.css'
import FormPay from '../../components/FormPay'
import data from '../../../public/operator.json'

const Layout = styled.div`
  background-image: linear-gradient(90.6deg, #e66374 -25.85%, #f2e265 118.6%);
  margin: 0;
  min-height: 100vh;
  padding: 1rem 0;
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

const OperatorText = styled.div`
  text-align: center;
  font-size: 2rem;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(#f3fb00, #ff08089f);
`

const CardContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: 56px 68px;
  background-color: white;

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
  const paths = data.map(({ title }) => ({
    params: { operator: title },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async () => {
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { operator: data },
  }
}

export default function Operator() {
  const { query } = useRouter()

  return (
    <Layout>
      <Wrapper>
        <CardContainer>
          <h2>ПОПОЛНЕНИЕ БАЛАНСА</h2>
          <OperatorText>{query.operator}</OperatorText>
          <FormPay />
        </CardContainer>
      </Wrapper>
    </Layout>
  )
}
