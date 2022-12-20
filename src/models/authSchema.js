import joi from "joi";

const authSchema = joi.object({
    name: joi.string().min(3).required(),
    email:joi.string().min(3).required(),
    password:joi.string().min(3).required(),
    confirmPassword:joi.string().required()
})