function emailValidator () {
  return function email (value) {
    return (value && !!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || 'Please enter a valid email'
  }
}

function pwdSpecCharValidator () {
  return function SpecialChar (value) {
    let pwdRegex = /^.*[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?].*$/
    return (value && pwdRegex.test(value)) || 'Password requires special character (not a-Z, 0-9)'
  }
}
function requiredValidator () {
  return function required (value) {
    return (value !== undefined && value !== null && value !== '') || 'This field is required'
  }
}

export {
  emailValidator,
  pwdSpecCharValidator,
  requiredValidator
}
