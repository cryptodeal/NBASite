export function routerVerify(token){
  return jwt.verify(token, signingKey, (err, verifiedJwt) => {
    if(err){
      return false
    }else{
      return verifiedJwt
    }
  })
}