export const VALIDATE_NUMBER = {
  required: {
    value: true,
    message: "Please add your mobile phone number, I won't call you, promise!",
  },
  pattern: {
    value: /^[0-9+-\s\(\)]+$/,
    message: 'This is not a valid mobile phone to me, try again!',
  },
  maxLength: {
    value: 18,
    message:
      "...And now it's too damn long, make sure the number is right, would you?",
  },
}
