import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import styled from 'styled-components'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import MaskedInput from 'react-input-mask'
import { VALIDATE_NUMBER } from '../constains/validateNumber'
import { VALIDATE_SUM } from '../constains/validateSum'

const ButtonNavigate = styled.button`
  max-width: 280px;
  width: 100%;
  background: #fe8c21;
  color: black;
  border: none;
  margin-top: 40px;
  padding: 20px;
  font-size: 1.5rem;
  font-weight: 100;
  letter-spacing: 5px;
  border-radius: 8px;

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
  background-image: linear-gradient(#fb0000, #ff85039f);
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
    margin-bottom: 20px;
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
    max-width: 280px;
    background: #fe8c21;
    color: black;
    border: none;
    margin-top: 40px;
    padding: 20px;
    font-size: 1.5rem;
    font-weight: 100;
    letter-spacing: 5px;
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
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  interface DataType {
    payment: 'pending' | 'resolve' | 'reject'
  }

  const [formData, setData] = useState<DataType>({ payment: 'pending' })

  const onSubmit: SubmitHandler<FormData> = (dataSubmit) => {
    setData({ payment: 'pending' })
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
            ? resolve({ payment: 'resolve' })
            : reject({ payment: 'reject' }),
        1000
      )
    })
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='sum'>Сумма</label>
        <input
          id='sum'
          type='number'
          defaultValue='50'
          {...register('sum', VALIDATE_SUM)}
        />
        {errors.sum && <p>{errors.sum.message}</p>}

        <label htmlFor='number-phone'>Номер телефона</label>
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
          disabled={errors.phone || errors.sum ? true : false}
        />
      </form>

      <Modal isActive={isModalActive} setIsActive={setIsModalActive}>
        {formData.payment === 'pending' ? (
          <SpanModal>Loading...</SpanModal>
        ) : formData.payment === 'resolve' ? (
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
