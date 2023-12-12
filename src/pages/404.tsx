import styled from 'styled-components'
import React from 'react'
// import '../app/globals.css'

const ErrorFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

function NotFound() {
  return <ErrorFound>404 | This page does not exist</ErrorFound>
}

export default NotFound
