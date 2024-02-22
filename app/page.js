"use client"

import React from 'react'
import { env } from '@/env';
import useLogicHook from '@/hooks/useLogicHook';
import UpdateFormComponent from '@/components/page/UpdateFormComponent';
import UsersDetailsFormComponent from '@/components/page/UsersDetailsFormComponent';

const HomePage = () => {
    const useLogicHookMethods = useLogicHook()

    const { conditionalRenderCases, loanOrApplication, loanOrApplicationNoChangeHandler, validateLoanNoActionHandler, validateOTPActionHandler, completeKYCWithoutChangeActionHandler } = useLogicHookMethods

    return (
        <div>
            <header>
                <img src={env.LOGO} alt="shubham finance logo" className='logo' />
                <h1>CUSTOMER UPDATION FORM FOR RE KYC</h1>
                <p>(field marked with * are mandatory)</p>
            </header>


            <main className='container mt-4'>
                {conditionalRenderCases?.error && <p className='error-txt'>{conditionalRenderCases.error}</p>}
                {conditionalRenderCases?.success && <p className='success-txt'>{conditionalRenderCases.success}</p>}

                {conditionalRenderCases?.showInitialForm && <div className='verify-user-cred-container'>
                    <form className="row g-2 mb-2" onSubmit={validateLoanNoActionHandler}>
                        <label className="col-md-6 col-12">Loan/Application No.<span /></label>

                        <div className="col-md-6 col-12 d-flex">
                            <input type="text" className='form-control'
                                name="loanOrApplicationNo"
                                value={loanOrApplication.loanOrApplicationNo}
                                onChange={loanOrApplicationNoChangeHandler}
                                disabled={conditionalRenderCases.disableLoanNoInput}
                                required
                            />
                            <button className='btn btn-primary margin-left' type="submit"
                                disabled={conditionalRenderCases.disableLoanNoInput || !loanOrApplication.isAgreeOTPDec}
                            >GetOtp</button>
                        </div>
                    </form>

                    <form className="row g-2 mb-2" onSubmit={validateOTPActionHandler}>
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
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="isAgreeOTPDec" id="agree-otp"
                                value={loanOrApplication.isAgreeOTPDec}
                                onChange={loanOrApplicationNoChangeHandler}
                                disabled={conditionalRenderCases.disableLoanNoInput}
                            />
                            <label className='help-text' htmlFor="agree-otp">
                                I authorize Shubham Housing finance company ltd. and its representatives to Call,
                                SMS or communicate via WhatsApp regarding my application.
                                This consent overrides any registration for DNC / NDNC.
                                I confirm I am in India, I am a major and a resident of India and
                                I have read and I accept Shubham Housing finance company ltd's Privacy Policy
                            </label>
                        </div>
                    </form>
                </div>}

                <UsersDetailsFormComponent {...useLogicHookMethods} />

                {conditionalRenderCases?.showExitMsg &&
                    <div className="row">
                        <div className="col-md-6 col-12">
                        </div>
                        <div className="col-md-6 col-12">
                            <p className='mt-3 mb-3'>Declaration: I hereby declare that my documents are up to date</p>
                            <button className='btn btn-primary'
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