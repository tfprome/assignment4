import mongoose from 'mongoose'
const DataSchema=mongoose.Schema({
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true},
    firstname:{type:String},
    lastname:{type:String},
    phone:{type:String}
},{
    timestamps:true,
    versionKey:false
})

const userModel=mongoose.model('users',DataSchema)
export default userModel