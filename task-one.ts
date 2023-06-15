function func(s: string, a: any, b: any) {
  if (s.length <= 1) return -1

  const sCurrect = s.slice(1) //первый символ не учитываетсяв предложенном варианте
  const aIndex = a === '' ? -1 : sCurrect.lastIndexOf(a) //тернарный опреатор нужен, если на входе будет пустая строка, а иначе получим длину строки
  const bIndex = b === '' ? -1 : sCurrect.lastIndexOf(b)

  if (aIndex == -1 && bIndex == -1) {
    return -1
  }

  return Math.max(aIndex, bIndex) + 1
}
