import styled from 'styled-components'
import OPERATORS from '../../public/operator.json'
import { IOperator } from './../models/models'
import Header from '../components/Header'
import OperatorCard from '../components/OperatorCard'
import '../app/globals.css'

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

const LayoutCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  row-gap: 3rem;
  margin-bottom: 5rem;
`

export default function Index() {
  return (
    <>
      <Header />
      <Wrapper>
        {!OPERATORS && (
          <p>Усп. Кажется что-то пошло не так. Только без паники!</p>
        )}
        {OPERATORS && (
          <LayoutCards>
            {OPERATORS.map((operator: IOperator) => (
              <OperatorCard key={operator.title} operator={operator} />
            ))}
          </LayoutCards>
        )}
      </Wrapper>
    </>
  )
}
