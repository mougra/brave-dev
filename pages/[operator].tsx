import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Normalize } from 'styled-normalize'

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

const Layout = styled.div`
  background-image: linear-gradient(#00ff62, #e339139f);
  height: 100vh;
  margin: 0;
  padding: 0;
`

const OperatorText = styled.div`
  font-size: 2rem;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(#00ff62, #e339139f);
`

export default function Operator() {
  const { query } = useRouter()

  return (
    <>
      <Normalize />
      <Layout>
        <Wrapper>
          <h2>
            Hello, Operator Page!
            <OperatorText>{query.operator}</OperatorText>
            {/* {query.operator} */}
          </h2>
        </Wrapper>
      </Layout>
    </>
  )
}
