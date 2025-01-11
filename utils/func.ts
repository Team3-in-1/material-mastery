function debounce(func: Function, timeout = 300) {
  let timer: any
  return (...args: any) => {
    if (!timer) {
      console.log('b')
      func.apply(null, args)
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
    }, timeout)
  }
}

export { debounce }
