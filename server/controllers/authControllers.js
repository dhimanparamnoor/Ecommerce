import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModels.js";
import  Jwt  from "jsonwebtoken";

export const registerController = async (req,res) =>{
    try {
        const {name,email,password,phone,address} = req.body;

        if(!name){
            return res.send({message:'Name is Required'})
        }
        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!password){
            return res.send({message:'password is Required'})
        }
        if(!phone){
            return res.send({message:'phone is Required'})
        }
        if(!address){
            return res.send({message:'address is Required'})
        }
        console.log("hiii");
        const existinguser = await userModel.findOne({email});
        
        if(existinguser){
            return res.status(200).send({
                success:false,
                message:'Already Register please login'
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save()

        res.status(201).send({
            success: true,
            message:'User Register Successfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registeration',
            error
        })
    }
};

export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: "Invalid email or password"
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }

        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }

        const token = Jwt.sign({
            _id: user._id 
        },process.env.JWT_SECRET,{
            expiresIn: "7d",
        });
        res.status(200)
        .send({
            success: true,
            message: 'login successfully',
            user:{
                name: user.name,
                email: user.email,
                phone:user.phone,
                address:user.address
            },
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in login',
            error
        })
    }
}


export const testController = (req,res) =>{
   res.send("Protected Route")
}