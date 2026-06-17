import z from "zod";

const signupValidation = z.object({
    body : z.object({
        email : z.string({error : "Email is required"}),
        password : z.string({error : "Password is required"}),
        name : z.string({error : "Name is required"}),
        phoneNumber : z.string({error : "Phone Number is required"}),
    })
});

const loginValidation = z.object({
    body : z.object({
        email : z.string({error : "Email is required"}),
        password : z.string({error : "Password is required"}),
    })
});

const refreshTokenValidation = z.object({
    cookies : z.object({
        refreshToken : z.string({error : "Refresh Token is required"}),
    })
});

const forgotPasswordValidation = z.object({
    body : z.object({
        email : z.string({error : "Email is required"}),
    })
});

const resetTokenValidation = z.object({
    body : z.object({
        email : z.string({error : "Email is required"}),
        newPassword : z.string({error : "Enter your new password"})
    })
});


const changePasswordValidation = z.object({
    body : z.object({
        currentPassword : z.string({error : "Enter your current password"}),
        newPassword : z.string({error : "Enter your new password"})
    })
});




export const authValidation = {
    signupValidation,
    loginValidation,
    refreshTokenValidation,
    forgotPasswordValidation,
    resetTokenValidation,
    changePasswordValidation
}; 


