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

export const meetingCreationSchema = zod.object({
    meetingId:zod.string().min(3),
    username:zod.string(),
    memberId:zod.string()
})
export type meetingCreation = zod.infer<typeof meetingCreationSchema>
