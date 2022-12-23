import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email:joi.string().min(3).required(),
    password:joi.string().required(),
    confirmPassword:joi.string().required()
});