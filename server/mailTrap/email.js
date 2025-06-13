import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplets.js";
import { mailtrapClient, sender } from "./mailTrap.config.js";

export const sendVerificationEmail=async(email, verificationToken)=>{
    const recipient=[{email}];

    try{
        const res=await mailtrapClient.send({
        from: sender,
        to: recipient,
        subject: 'verify your email',
        html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
        category: 'Email verification'
    })
    console.log('Email sent Successfully : ', res);
    

    }catch(e){
        throw new Error('Error While sending email ', e.message)

    }

}

export const sendWelcomeEmail=async(email, name)=>{
    const recipient=[{email}];

    try{
        const res=await mailtrapClient.send({
        from: sender,
        to: recipient,
        template_uuid: "9d170b9b-1bda-4705-8576-827bedd448b4",
         template_variables: {
      "company_info_name": "Authentication company",
      "name": name
    }
    })
    console.log('Email sent Successfully : ', res);
    

    }catch(e){
        throw new Error('Error While sending email ', e.message)

    }

}

export const generateForgotEmail=async(email, forgotToken)=>{
    const recipient=[{email}];
    try{
        const res= await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Forgot Password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', `${process.env.CLIENT_URL}/forgot-password/${forgotToken}`),
             category: 'Forgot Password'
        })
        console.log(res);
        

    }catch(e){
        throw new Error('Error While sending email ', e.message)

    }
}

export const sendResetPasswordSuccess=async(email)=>{
    const recipient=[{email}];
    try{
        const res= await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset Password Successfully',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
             category: 'Reset Password Successfully'
        })
        console.log(res);
        

    }catch(e){
        throw new Error('Error While sending email ', e.message)

    }
}