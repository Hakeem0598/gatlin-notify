import { object, string, number, boolean } from 'yup';

export const createProductSchema = object({
    body: object({
        name: string().required("Name is required"),
        interval: string().matches(/(day|month|week|year)/, "Interval must be one of month, year, week, or day").required("Interval is required"),
        interval_count: number().required("Interval count is required"),
        unit_amount: number().required("Unit amount is required"),
    })
});