import mongoose from 'mongoose';

const refreshTokenSchema= mongoose.Schema({
    token:{
        type:String,
        unique:true
    },
},{timestamps:false}) 

export const RefreshToken =new mongoose.model("RefreshTokenSchema",refreshTokenSchema)