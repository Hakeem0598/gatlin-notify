import { Discord, UserDocument } from '../models/user.types';
import { Strategy as DiscordStrategy, Profile } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';
import passport from 'passport';
import { findUserAndUpdate, findUserById } from '../services/user.services';

const verifyCallback = async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {          
        // Retrieve relevant details
        const { id, username, avatar, discriminator, email, fetchedAt } = profile;

        if (!email) return;

        // If the user doesn't have an avatar, use their default avatar
        const avatarURL = avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${parseInt(discriminator) % 5}.png`;

        const discord: Discord = { id, username, discriminator, email, avatarURL, fetchedAt };
    
        // Check if user exists, if they do update their details if required, if they don't create the new user.
        const user = await findUserAndUpdate({ 'discord.id': id }, { discord }, { new: true, upsert: true });

        return done(null, user as Express.User);
    } catch (error) {
        console.log(error);
        return done(error as Error)
    }
}

passport.use(new DiscordStrategy({
    callbackURL: '/api/auth/discord/callback',
    clientID: process.env.DISCORD_CLIENT_ID as string,
    clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    scope: ['identify', 'email']
}, verifyCallback));

// Include the user id in the session cookie
passport.serializeUser((user, done) => {
    done(null, (user as UserDocument)._id)
});


// If user is logged in attach user to request object
passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserById(id as string);
        if (user) done(null, user);
    } catch (error) {
        console.log(error)
        done(error)
    }
});

