import React from 'react'
import Modal from 'react-bootstrap/Modal';


const UpdateFormComponent = ({
    uploadDocument, conditionalRenderCases, uploadDocumentChangeHandler, uploadDocumentActionHandler, showOTPSectionActionHandler, hideDocumentPreviewActionHandler, confirmAddressActionHandler
}) => {
    if (conditionalRenderCases.showUserReKYCform) {
        return (
            <>

                <Modal show={conditionalRenderCases.showConfirmModel} onHide={hideDocumentPreviewActionHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm your details</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className='mb-3'>
                            <p>Name: {uploadDocument?.name}</p>
                            {uploadDocument?.address ? (
                                <p>Address: {uploadDocument?.address}</p>
                            ) : <></>}
                            {uploadDocument?.uid ? (
                                <p>Document ID No: {uploadDocument?.uid}</p>
                            ) : <></>}

                            <p>DOB: {uploadDocument?.dateOfBirth}</p>
                        </div>

                        {conditionalRenderCases.showConfirmAddressOTPSection ? (
                            <>
                                {conditionalRenderCases?.error && <p className='error-txt'>{conditionalRenderCases.error}</p>}

                                <div className='mb-3'>
                                    <label>OTP<span /></label>
                                    <input type="text" className='form-control'
                                        name="otpCode" value={uploadDocument?.otpCode}
                                        onChange={uploadDocumentChangeHandler}
                                    />
                                </div>

                                <button className='btn btn-primary' onClick={confirmAddressActionHandler}>Confirm</button>
                                <button className='btn margin-left' onClick={showOTPSectionActionHandler}>Resend</button>
                            </>
                        ) : (
                            <button className='btn btn-primary' onClick={showOTPSectionActionHandler}>Next</button>
                        )}
                    </Modal.Body>
                </Modal>



                <hr />
                <div className="user-update-data-container">

                    <div className="row g-2 mt-4">
                        <label className='col-md-6 col-12'>Proof of Address (Tick relevant and mention the details)<span /></label>
                        <div className="col-md-6 col-12">
                            <form onSubmit={uploadDocumentActionHandler}>

                                {[
                                    {
                                        label: "Aadhar Card",
                                        value: "aadhar"
                                    },
                                    {
                                        label: "PAN Card",
                                        value: "pan"
                                    },
                                    {
                                        label: "Passport",
                                        value: "passport"
                                    },
                                    {
                                        label: "Id card ",
                                        value: "id card"
                                    },
                                    {
                                        label: "Driving licence",
                                        value: "driving licence"
                                    },
                                    {
                                        label: "Job card issued by nrega duly signed by an officer of the state government",
                                        value: "job card issued by nrega duly signed by an officer of the state government"
                                    },
                                    {
                                        label: "Letter issued by national population register containing details of name and address",
                                        value: "letter issued by national population register containing details of name and address"
                                    },

                                ].map((d, idx) => {
                                    return (
                                        <div key={`poi__${idx}`} className='radio-input' >
                                            <input type="radio" required name="documentType" id={`pod__${idx}`}
                                                value={d.value}
                                                onChange={uploadDocumentChangeHandler}
                                            />
                                            <label htmlFor={`pod__${idx}`}>{d.label}</label>
                                        </div>
                                    )
                                })}

                                <div className='mt-2'>
                                    {!["aadhar", "pan"].includes(uploadDocument.documentType) ? <p className='optionmsg'>Kindly choose Aadhar or Pan</p> : <></>}
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="isAgreeAadharDec" id="agree-aadhar"
                                    />
                                    <label className='help-text' htmlFor="agree-aadhar">
                                        I, hereby submit voluntarily at my own discretion, self-certified physical copy of Aadhaar letter or downloaded Aadhaar (e-Aadhaar) or Aadhaar secure Quick Response (QR) code or offline electronic Aadhaar XML document as issued by Unique Identification Authority of India (UIDAI) to Shubham Housing finance company ltd  for the purpose of establishing my identification/ address proof, in individual capacity or as an authorized signatory in case of non-individual borrower, as the case may be and; hereby consent to the Company for offline verification of Aadhaar, without authentication, to establish its genuineness through such offline verification mode acceptable as per UIDAI or under any Act or law, from time to time. I, further confirm that the purpose of collecting Aadhaar has been explained to me and the Company has informed that my demographic information and any other information submitted to the Company herewith for offline verification shall not be used for any purpose other than for the purpose of verification, or as per requirements of law.

                                        I, further confirm that the Company has further informed about the following:

                                        nature of information that will be shared on submission of Aadhaar,
                                        the uses to which such information received during offline verification may be put to,
                                        Aadhaar number or biometric information will not be collected, used, or stored by the Company,
                                        Aadhaar number (first 8 digits) has been redacted or blacked out through appropriate means,
                                        this consent will be stored with the Company
                                        I, further agree to have been sufficiently informed by the Company about other alternative documents that can be submitted for establishing proof of identification and address.

                                        I, hereby declares that all the information voluntarily furnished by me is true, correct, and complete. I will not hold the Company or any of its officials responsible in case of any incorrect information is provided by me.
                                    </label>
                                </div>
                                <div className='mt-2'>
                                    <label>Mention ID No.<span /></label>
                                    <input type="text" className='form-control' required name="documentId" value={uploadDocument.documentId} onChange={uploadDocumentChangeHandler} />
                                </div>
                                <div className='mt-2'>
                                    <label>Upload (Front Side)<span /></label>
                                    <input type="file" className='form-control' required name="frontPage" onChange={uploadDocumentChangeHandler} />
                                    <p className='helpText'>Only PDF, PNG or JPEG files are accepted for upload.</p>
                                </div>
                                {uploadDocument.documentType === "aadhar" ? <div className='mt-2'>
                                    <label>Upload (Back Side)</label>
                                    <input type="file" className='form-control' name="backPage" onChange={uploadDocumentChangeHandler} />
                                    <p className='helpText'>Only PDF, PNG or JPEG files are accepted for upload.</p>
                                </div> : <></>}

                                <div className="mt-3 mb-3" >
                                    <button className='btn btn-secondary' type="submit">Preview</button>
                                </div>
                            </form>

                        </div>

                    </div>


                </div>
            </>

        )
    } else {
        return <></>
    }

}

export default UpdateFormComponent