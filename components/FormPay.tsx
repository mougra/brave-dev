import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import styled from 'styled-components'
import Modal from './Modal'
import { useRouter } from 'next/navigation'

const ButtonNavigate = styled.button`
  padding: 10px;
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
  const [modalActive, setModalActive] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  interface DataType {
    payment?: string
  }

  const [data, setData] = useState<null | DataType>(null)

  const onSubmit: SubmitHandler<FormData> = (dataSubmit) => {
    setData(null)
    getDataFromServer().then(
      (value: any) => setData(value),
      (value: any) => setData(value)
    )
    setModalActive(true)
  }

  function NavigateHandler(data: any) {
    if (data) router.push('/')
    else setModalActive(false)
  }

  const getDataFromServer = async () => {
    return await new Promise((resolve, reject) => {
      setTimeout(
        () =>
          Math.random() > 0.5
            ? resolve({ payment: true })
            : reject({ payment: false }),
        1000
      )
    })
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Сумма</label>
        <input
          type='number'
          defaultValue='50'
          {...register('sum', {
            required: {
              value: true,
              message: 'Please add your sum',
            },
            min: {
              value: 1,
              message: '...Minimum payment amount 1',
            },
            max: {
              value: 1000,
              message: '...Minimum payment amount 1000',
            },
          })}
        />
        {errors.sum && <p>{errors.sum.message}</p>}

        <label>Номер телефона</label>
        <input
          type='tel'
          placeholder='8-912-0000001'
          {...register('phone', {
            required: {
              value: true,
              message:
                "Please add your mobile phone number, I won't call you, promise!",
            },
            pattern: {
              value: /^[0-9+-]+$/,
              message: 'This is not a valid mobile phone to me, try again!',
            },
            minLength: {
              value: 11,
              message: 'This number is too short, not gotta fly, try again',
            },
            maxLength: {
              value: 15,
              message:
                "...And now it's too damn long, make sure the number is right, would you?",
            },
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
        <input
          type='submit'
          value='Пополнить'
          disabled={errors.phone || errors.sum ? true : false}
        />
      </form>

      <Modal active={modalActive} setActive={setModalActive}>
        {data === null && <span>Loading...</span>}
        {data?.payment && data !== null && <span>Оплата прошла успешно</span>}
        {!data?.payment && data !== null && <span>Оплата не прошла</span>}
        {data !== null && (
          <ButtonNavigate onClick={() => NavigateHandler(data?.payment)}>
            {data?.payment ? 'Вернуться на главную' : 'Попробовать ещё раз'}
          </ButtonNavigate>
        )}
      </Modal>
    </FormContainer>
  )
}
