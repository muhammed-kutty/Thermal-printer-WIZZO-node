import jwt from 'jsonwebtoken'

const createToken = (data)=> jwt.sign({id:data.id} , 'test#print.jwt' ,{expiresIn:'24h'})
const verifyToken = (token)=> jwt.verify(token , 'test#print.jwt')

export  {createToken , verifyToken}