import { object, string } from 'yup';

export const createLifetimeUserSchema = object({
    body: object({
        email: string().email('Invalid email').required('Email is required')
    })
});
