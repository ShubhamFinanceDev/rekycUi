import React from 'react'

const UsersDetailsFormComponent = ({ loanOrApplication, conditionalRenderCases, showUpdateFormActionHandler, ExitChangeHandler }) => {
    if (conditionalRenderCases.showUserDetails) {
        return (
            <>
                <hr />
                <div className="user-data-container">
                    {[
                        {
                            label: "Name.",
                            name: "name"
                        },
                        {
                            label: "Mobile No.",
                            name: "maskedMobileNo"
                        },
                        {
                            label: "PAN No.",
                            name: "panNo"
                        },
                        {
                            label: "Aadhar No.",
                            name: "aadharNo"
                        },
                        {
                            label: "Address.",
                            name: "address",
                        },
                    ].map((d, idx) => {
                        const isAddress = d.name === "address";
                        return (
                            <div className="row g-2 mb-2" key={`loadn-details__${idx}`}>
                                <label className="col-md-6 col-12">{d.label}</label>
                                <div className="col-md-6 col-12 d-flex">
                                 {isAddress ? (
                                     <textarea
                                         className="form-control textarea-like"
                                         value={loanOrApplication[d.name]}
                                         readOnly
                                     />
                                 ) : (
                                     <input
                                         type="text"
                                         className="form-control"
                                         value={loanOrApplication[d.name]}
                                         readOnly
                                     />
                                  )}
                             </div>

                            </div>
                        )
                    })}

                </div>
                     {conditionalRenderCases.showActionGroupBtn && 
                     <div className="row g-2 mt-4" >
                        <label className="col-md-6 col-12"><p>Do you want update Rekyc</p>
                        </label>
                            <button className='btn btn-primary col-md-1 col-12' onClick={showUpdateFormActionHandler}>Yes</button>
                            <button className='btn btn-secondary margin-left col-md-1 col-12' onClick={ExitChangeHandler}>No</button>
                    </div>}

            </>)
    } else {
        return <></>
    }
}

export default UsersDetailsFormComponent