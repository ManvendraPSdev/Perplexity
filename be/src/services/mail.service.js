import nodemailer from "nodemailer";
import { google } from "googleapis";

let transport;

async function getTransport() {
    if (transport) {
        return transport;
    }

    const gmailUser = process.env.GOOGLE_USER;
    const gmailAppPassword = process.env.GOOGLE_APP_PASSWORD;
    const gmailClientId = process.env.GOOGLE_CLIENT_ID;
    const gmailClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const gmailRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (gmailUser && gmailAppPassword) {
        transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: gmailUser,
                pass: gmailAppPassword,
            },
        });
    } else if (gmailUser && gmailClientId && gmailClientSecret && gmailRefreshToken) {
        const oauth2Client = new google.auth.OAuth2(
            gmailClientId,
            gmailClientSecret,
            "https://developers.google.com/oauthplayground",
        );

        oauth2Client.setCredentials({ refresh_token: gmailRefreshToken });
        const accessTokenResponse = await oauth2Client.getAccessToken();

        if (!accessTokenResponse?.token) {
            throw new Error("Unable to create Gmail access token from refresh token.");
        }

        transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: gmailUser,
                clientId: gmailClientId,
                clientSecret: gmailClientSecret,
                refreshToken: gmailRefreshToken,
                accessToken: accessTokenResponse.token,
            },
        });
    } else {
        throw new Error(
            "Missing email configuration. Use GOOGLE_APP_PASSWORD or OAuth2 credentials.",
        );
    }

    try {
        await transport.verify();
        console.log("Email transporter is ready to send emails");
    } catch (err) {
        console.error("Email transporter verification failed:", err.message);
    }

    return transport;
}

export async function sendEmail({ to, subject, html, text }) {
    const transporter = await getTransport();
    const gmailUser = process.env.GOOGLE_USER;

    const mailOptions = {
        from: gmailUser,
        to,
        subject,
        html,
        text,
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details.messageId);
    return details;
}