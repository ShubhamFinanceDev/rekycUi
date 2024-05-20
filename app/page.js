"use client"

import React from 'react'
import { env } from '@/env';
import useLogicHook from '@/hooks/useLogicHook';
import UpdateFormComponent from '@/components/page/UpdateFormComponent';
import UsersDetailsFormComponent from '@/components/page/UsersDetailsFormComponent';

const HomePage = () => {
    const useLogicHookMethods = useLogicHook()

    const { conditionalRenderCases, loanOrApplication, loanOrApplicationNoChangeHandler, validateLoanNoActionHandler, validateOTPActionHandler, completeKYCWithoutChangeActionHandler } = useLogicHookMethods
    const [showError, setShowError] = React.useState(false);

    const handleGetOtpClick = (e) => {
        e.preventDefault();

        if (loanOrApplication.loanOrApplicationNo.trim() === '' || !loanOrApplication.isAgreeOTPDec) {
            setShowError(true);
        } else {
            setShowError(false);
            validateLoanNoActionHandler(e);
        }
    };

    return (
        <div>


            <header>
                <img src={env.LOGO} alt="shubham finance logo" className='logo' />
                <h1>CUSTOMER UPDATION FORM FOR RE KYC</h1>
                <p>(field marked with * are mandatory)</p>
                {showError && (
                    <p className="error-txt">
                        Please select self-declaration
                    </p>
                )}
            </header>

            <main className='container mt-4'>
                {conditionalRenderCases?.error && <p className='error-txt'>{conditionalRenderCases.error}</p>}
                {conditionalRenderCases?.success && <p className='success-txt'>{conditionalRenderCases.success}</p>}

                {conditionalRenderCases?.showInitialForm && <div className='verify-user-cred-container'>
                    <form className="row g-2 mb-2" onSubmit={handleGetOtpClick}>
                        <label className="col-md-6 col-12">Loan/Application No.<span /></label>

                        <div className="col-md-6 col-12 d-flex">
                            <input type="text" className='form-control'
                                name="loanOrApplicationNo"
                                value={loanOrApplication.loanOrApplicationNo}
                                onChange={loanOrApplicationNoChangeHandler}
                                disabled={conditionalRenderCases.disableLoanNoInput}
                                required
                            />
                                      <button className='btn btn-primary margin-left' type="submit" disabled={conditionalRenderCases.disableLoanNoInput || !loanOrApplication.isAgreeOTPDec}>
GetOtp</button>

                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="isAgreeOTPDec" id="agree-otp"
                                value={loanOrApplication.isAgreeOTPDec}
                                onChange={loanOrApplicationNoChangeHandler}
                                // disabled={conditionalRenderCases.disableLoanNoInput}
                                disabled={conditionalRenderCases.disableLoanNoInput || loanOrApplication.isAgreeOTPDec}
                            />
                            <label className='help-text' htmlFor="agree-otp">
                                I authorize Shubham Housing finance company ltd. and its representatives to Call,
                                SMS or communicate via WhatsApp regarding my application.
                                This consent overrides any registration for DNC / NDNC.
                                I confirm I am in India, I am a major and a resident of India and
                                I have read and I accept Shubham Housing finance company ltd&apos;s Privacy Policy
                            </label>
                        </div>
                    </form>

                    {!conditionalRenderCases.disableOTPInput ? <form className="row g-2 mb-2" onSubmit={validateOTPActionHandler}>
                        <label className="col-md-6 col-12">One Time Password (OTP)<span /></label>
                        <div className="col-md-6 col-12 d-flex">
                            <input type="password" className='form-control'
                                name="otpCode"
                                value={loanOrApplication.otpCode}
                                onChange={loanOrApplicationNoChangeHandler}
                                disabled={conditionalRenderCases.disableOTPInput}
                                required
                                autoComplete=""
                            />
                            <button className='btn btn-primary margin-left' type="submit" disabled={conditionalRenderCases.disableOTPInput}>Submit</button>
                            <button className='btn btn-primary margin-left' type="submit"
                                disabled={conditionalRenderCases.disableOTPInput}
                                onClick={validateLoanNoActionHandler}>Resend</button>
                        </div>

                    </form> : <></>}
                </div>}

                <UsersDetailsFormComponent {...useLogicHookMethods} />

                {conditionalRenderCases?.showExitMsg &&
                    <div className="row">
                        <div className="col-md-6 col-12">
                        </div>
                        <div className="col-md-6 col-12">
                            <p className='mt-3 mb-3'>Declaration: I/We wish to inform you that there is no change in the KYC information registered with the Shubham Housing Development Finance Co Ltd for the under mentioned Loan Account(s)/Customer ID. I/We have checked our statement of account and find that my/our latest details including Name, Address, Contact Details, PAN & such other KYC details are correctly registered in the Shubham’s records.</p>
 
                            <p>I/We declare that the details furnished above are true to the best of my/our knowledge/belief.</p>
                            <button className='btn btn-primary mb-3 mt-3'
                                onClick={completeKYCWithoutChangeActionHandler}>
                                Confirm</button>
                        </div>
                    </div>}
                <UpdateFormComponent {...useLogicHookMethods} />
            </main>
        </div>
    )
}

export default HomePage