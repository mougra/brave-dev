import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import styled from 'styled-components'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import MaskedInput from 'react-input-mask'
import { VALIDATE_NUMBER, VALIDATE_SUM } from '../utils/validation'

const ButtonNavigate = styled.button`
  max-width: 280px;
  width: 100%;
  background: #95bff8;
  color: black;
  border: none;
  margin-top: 40px;
  padding: 10px 0;
  font-size: 1.5rem;
  font-weight: 100;
  letter-spacing: 5px;
  border-radius: 8px;
  transition: all 0.3s linear 0s;

  &:hover {
    background: #d45049;
    color: white;
  }
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`

const SpanModal = styled.span`
  font-size: 2rem;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(#95bff8, #d77ea6);
`

const FormContainer = styled.div`
  form {
    max-width: 500px;
    margin: 0 auto;
  }

  h1 {
    font-weight: 100;
    color: black;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(79, 98, 148);
  }

  .form {
    background: #0e101c;
    max-width: 400px;
    margin: 0 auto;
  }

  p {
    color: #bf1650;
  }

  p::before {
    display: inline;
    content: '⚠ ';
  }

  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #0e101c;
    padding: 10px 15px;
    font-size: 1rem;
  }

  label {
    line-height: 2;
    text-align: left;
    display: block;
    color: black;
    font-size: 1.5rem;
    font-weight: 200;
  }

  button[type='submit'],
  input[type='submit'] {
    max-width: 260px;
    margin: 0 auto;
    background: #d77ea6;
    color: black;
    border: none;
    margin-top: 40px;
    padding: 10px;
    font-size: 1.5rem;
    font-weight: 100;
    letter-spacing: 5px;
    transition: all 0.3s linear 0s;
  }

  button[type='submit']:hover,
  input[type='submit']:hover {
    background: #d45049;
    color: white;
  }

  button[type='submit']:active,
  input[type='button']:active,
  input[type='submit']:active {
    transition: 0.3s all;
    transform: translateY(3px);
    border: 1px solid transparent;
    opacity: 0.8;
  }

  input:disabled {
    opacity: 0.4;
  }

  input[type='button']:hover {
    transition: 0.3s all;
  }
`

type FormData = {
  sum: string
  phone: string
}

export default function Form() {
  const router = useRouter()
  const [isModalActive, setIsModalActive] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  interface DataType {
    payment: PaymentType
  }

  enum PaymentType {
    pending,
    resolve,
    reject,
  }

  const [formData, setData] = useState<DataType>({ payment: 0 })

  const onSubmit: SubmitHandler<FormData> = (dataSubmit) => {
    setData({ payment: 0 })
    getDataFromServer().then(
      (value: DataType) => setData(value),
      (value: DataType) => setData(value)
    )
    setIsModalActive(true)
  }

  function handleNavigate(isSuccess: boolean) {
    if (isSuccess) router.push('/')
    else setIsModalActive(false)
  }

  const getDataFromServer = async () => {
    return await new Promise<DataType>((resolve, reject) => {
      setTimeout(
        () =>
          Math.random() > 0.5
            ? resolve({ payment: 1 })
            : reject({ payment: 2 }),
        1000
      )
    })
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='sum'>Сумма*</label>
        <input
          id='sum'
          type='number'
          defaultValue='50'
          {...register('sum', VALIDATE_SUM)}
        />
        {errors.sum && <p>{errors.sum.message}</p>}

        <label htmlFor='number-phone'>Номер телефона*</label>
        <MaskedInput
          id='number-phone'
          type='tel'
          mask={'+7 (999) 999-99-99'}
          alwaysShowMask={false}
          placeholder='Ex: +7 (999) 999-99-99'
          {...register('phone', VALIDATE_NUMBER)}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
        <input
          type='submit'
          value='Пополнить'
          disabled={errors.phone || errors.sum || isModalActive ? true : false}
        />
      </form>

      <Modal isActive={isModalActive} setIsActive={setIsModalActive}>
        {formData.payment === 0 ? (
          <SpanModal>Loading...</SpanModal>
        ) : formData.payment === 1 ? (
          <>
            <SpanModal>Оплата прошла успешно</SpanModal>
            <ButtonNavigate onClick={() => handleNavigate(true)}>
              Вернуться на главную
            </ButtonNavigate>
          </>
        ) : (
          <>
            <SpanModal>Оплата не прошла</SpanModal>
            <ButtonNavigate onClick={() => handleNavigate(false)}>
              Попробовать ещё раз
            </ButtonNavigate>
          </>
        )}
      </Modal>
    </FormContainer>
  )
}
