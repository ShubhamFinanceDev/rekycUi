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
                                        label: "Aadhaar Card",
                                        value: "aadhar"
                                    },
                                    {
                                        label: "PAN Card",
                                        value: "pan"
                                    }
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