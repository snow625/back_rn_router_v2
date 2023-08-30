const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY, SENDER_EMAIL} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);


const sendMail = async (data)=> {
    const mail = {...data, from: `${SENDER_EMAIL}`};
    await sgMail.send(mail);
    return true;          
}

module.exports = sendMail;