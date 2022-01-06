import { DocumentDefinition } from "mongoose";
import { UserDocument } from "../models/user.types";
import sendEmail from "./email";
import generateLicense from "./generateLicense";

export const greetCustomer = (user: DocumentDefinition<UserDocument>) => {
    const license = generateLicense();

    user.license.key = license;
    user.license.activated = false;

    const emailOptions = {
        email: user.discord.email,
        subject: 'Gatlin Notify - Thank you for your recent purchase',
        message: `Welcome to Gatlin Notify, a premium cook-group to help you purchase sought after sneakers.
        To get started first click the link to join our discord server where you will be instructed to provide your license key (which can be found at the bottom of this email) in order to become verifed. After verification you will have full, unrestricted access to our control panel and updates until your membership runs out.
        We do not tolerate account sharing whatsoever, and this may result in a suspension if found doing so. This impacts on the services we deliver and can hamper performance for other paid users attempting to use their rightfully purchased products.

        License Key
        ${license}
        `
    }

    return sendEmail(emailOptions)
} 