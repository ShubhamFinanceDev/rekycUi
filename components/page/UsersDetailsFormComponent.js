import React from 'react'

const UsersDetailsFormComponent = ({ loanOrApplication, conditionalRenderCases, showUpdateFormActionHandler, ExitChangeHandler }) => {
    if (conditionalRenderCases.showUserDetails) {
        return (
            <>
                <hr />
                <div className="user-data-container">
                    {[
                        {
                            label: "Name",
                            name: "name"
                        },
                        {
                            label: "Mobile No.",
                            name: "maskedMobileNo"
                        },
                        {
                            label: "Address",
                            name: "address"
                        },
                        {
                            label: "PAN No.",
                            name: "panNo"
                        },
                        {
                            label: "Aadhar No.",
                            name: "aadharNo"
                        },
                    ].map((d, idx) => {
                        return (
                            <div className="row g-2 mb-2" key={`loadn-details__${idx}`}>
                                <label className="col-md-6 col-12">{d.label}</label>
                                <div className="col-md-6 col-12 d-flex">
                                    <input type="text" className='form-control' value={loanOrApplication[d.name]} readOnly />
                                </div>
                            </div>
                        )
                    })}

                    {conditionalRenderCases.showActionGroupBtn && <div className="row g-2 mt-4" >
                        <label className="col-md-6 col-12"><p>Do you want update Rekyc</p>
                        </label>
                        <label className="col-md-6 col-12">
                            <button className='btn btn-primary' onClick={showUpdateFormActionHandler}>Yes</button>
                            <button className='btn btn-secondary margin-left' onClick={ExitChangeHandler}>No</button>
                        </label>
                    </div>}
                </div>

            </>)
    } else {
        return <></>
    }
}

export default UsersDetailsFormComponent