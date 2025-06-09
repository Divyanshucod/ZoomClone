import zod from 'zod'

export const userSignUpSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6),
    username:zod.string().min(3)
})

export const userSignInSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6),
})
