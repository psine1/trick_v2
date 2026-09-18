'use server';
import nodemailer from 'nodemailer';
import {  unstable_noStore as noStore  } from  "next/cache";
const sendEmailContact = async ({email, phone, subject, message, file}) => {
  noStore();
  try{
    const transporter = nodemailer.createTransport({
      service: process.env.NEXT_PUBLIC_NODEMAILER_SERVICE,
      host: process.env.NEXT_PUBLIC_NODEMAILER_HOST,
      port: process.env.NEXT_PUBLIC_NODEMAILER_PORT, 
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_NODEMAILER_AUTH_USER,
        pass: process.env.NEXT_PUBLIC_NODEMAILER_AUTH_PASS,
        
      },
    });
    const options = {
      from: `Contact Us <${process.env.NEXT_PUBLIC_NODEMAILER_FROM}>` ,
      to: process.env.NEXT_PUBLIC_NODEMAILER_TO,
      subject: subject,
      html: `<br> Emial: ${email} </br>
              <br> Phone: ${phone} </br>
              <br> Message: ${message} </br>`,
              attachments:file ? [{  
                path: file
            }] : []
    };
  
    return await transporter.sendMail(options)
      .then(result => {
        return result 
      })
      .catch(error => {
        return error.message 
      })
  }
  catch(error){
    return error.message
  }

};

export { sendEmailContact };

