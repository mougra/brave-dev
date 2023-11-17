import { IOperator } from '../models/models'
import styled from 'styled-components'
import Link from 'next/link'
import ButtonPay from './ButtonPay'

const PostData = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 0.75rem;
  color: #9b9b9b;
  margin: 0 0 1rem 0;
`

const CardTheme = styled.h4`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  color: #d77ea6;
  margin: 1rem 0;
`
const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const CardCaption = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 30px;
  color: #598ed7;
  margin: 0 0 1rem 0;
  margin: inherit;
`

const PostDataAuthor = styled.span`
  color: #000000;
  font-weight: 500;
`

const Dotted = styled.div`
  width: 3px;
  height: 3px;
  background: #d7d7d7;
  border-radius: 50%;
`

const CardText = styled.span`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #929292;
`

const CardImg = styled.img`
  width: 100%;
  object-fit: fill;
  height: 231px;
  border-radius: 8px;

  transition: transform 0.4s ease-in-out;

  @media (max-width: 992px) {
    max-width: 500px;
  }
  @media (max-width: 576px) {
    max-width: 576px;
  }
`
const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 360px;
  width: calc((100% - 2 * 2.5rem) / 3);
  background: #fff;
  border: 1px dashed hsla(0, 0%, 64%, 0.6);
  border-radius: 12px;
  padding: 15px;

  transition: all 0.5s ease-in-out;

  &:hover img {
    transform: rotate(1deg);
  }

  &:hover {
    box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.25);
  }

  > a {
    text-decoration: none;
  }

  @media (max-width: 1200px) {
    width: calc((100% - 2 * 2.5rem) / 3);
  }

  @media (max-width: 992px) {
    width: calc((100% - 2.5rem) / 2);
    max-width: 500px;
  }
  @media (max-width: 576px) {
    width: 100%;
    max-width: 576px;
  }
`
interface PostProps {
  operator: IOperator
}

function OperatorCard({ operator }: PostProps) {
  return (
    <Card>
      <CardImg src={operator.img} width='360px' height='231px' alt='operator' />
      <CardTheme>{operator.tags}</CardTheme>

      <CardContainer>
        <CardCaption>{operator.title}</CardCaption>{' '}
        {/* <Link href={`/operator/${operator.title}`}> */}
        <ButtonPay operator={operator.title} /> {/* </Link> */}
      </CardContainer>

      <PostData>
        <PostDataAuthor>{operator.autor}</PostDataAuthor>
        <Dotted />
        <span>{operator.date}</span>
        <Dotted />
        <span>{operator.views}</span>
      </PostData>
      <CardText>{operator.text}</CardText>
    </Card>
  )
}

export default OperatorCard
