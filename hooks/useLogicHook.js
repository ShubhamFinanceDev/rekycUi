import React, { useState } from 'react'
import axios from '@/services/axios'
import { api } from '@/services/endpoint'
import base64 from 'base-64';
import Cookies from 'js-cookie';



const loanOrApplicationInitialState = {
    loanOrApplicationNo: "",
    otpCode: "",

    loanNo: "",
    mobileNo: "",
    name: "",
    aadharNo: "",
    panNo: "",
    address: "",
}

const uploadDocumentInitialState = {
    documentId: "",
    documentType: "aadhar",
    frontPage: {},
    backPage: {},

    otpCode: "",
    name: "",
    address: "",
    loanNo: "",
    mobileNo: "",
}


const conditionalRenderCasesInitialState = {
    showInitialForm: true,
    disableLoanNoInput: false,
    disableOTPInput: true,
    showUserDetails: false,
    showActionGroupBtn: true,
    showUserReKYCform: false,
    showConfirmModel: false,
    showExitMsg: false,
    showConfirmAddressOTPSection: false,

    error: "",
    success: "",
}
const maskMobileNumber = (mobileNumber) => {
    const visibleDigits = 4;
    const maskedDigits = '*'.repeat(mobileNumber.length - visibleDigits);
    return maskedDigits + mobileNumber.slice(-visibleDigits);
};

const useLogicHook = () => {

    const [conditionalRenderCases, setConditionalRenderCases] = useState({ ...conditionalRenderCasesInitialState })
    const [loanOrApplication, setloanOrApplication] = useState({ ...loanOrApplicationInitialState })
    const [uploadDocument, setUploadDocument] = useState({ ...uploadDocumentInitialState })


    const updateConditionRenderCases = (conditionCase = "ERROR", option = {}) => {
        switch (conditionCase) {
            case "ENABLE_OTP_INPUT":
                return setConditionalRenderCases((state) => ({
                    ...state, disableOTPInput: false, disableLoanNoInput: true,
                    success: `OTP sent on Registered Mobile No. ${option.mobile}`,
                    error: ""
                }))

            case "SHOW_USER_DETAIL_SECTION":
                return setConditionalRenderCases((state) => ({ ...state, disableOTPInput: true, showUserDetails: true, success: "", error: "" }))

            case "SHOW_USER_REKYC_FORM_SECTION":
                return setConditionalRenderCases((state) => ({ ...state, showUserReKYCform: true, showActionGroupBtn: false, showExitMsg: false }))

            case "ERROR":
                return setConditionalRenderCases((state) => ({
                    ...state, success: "", error: option.error
                }))

            case "SHOW_DOCUMENT_PREVIEW":
                return setConditionalRenderCases((state) => ({ ...state, error: "", showConfirmModel: true }))

            case "HIDE_DOCUMENT_PREVIEW":
                return setConditionalRenderCases((state) => ({ ...state, error: "", showConfirmModel: false, showConfirmAddressOTPSection: false }))

            case "SHOW_CONFIRM_ADDRESS_OTP_PREVIEW":
                return setConditionalRenderCases((state) => ({ ...state, error: "", showConfirmAddressOTPSection: true }))

            case "SHOW_NO_UPDATE_DEC":
                return setConditionalRenderCases((state) => ({ ...state, showExitMsg: true }))

            case "SUCCESS_MSG":
                setloanOrApplication({ ...loanOrApplicationInitialState });
                return setConditionalRenderCases({ ...conditionalRenderCasesInitialState, error: "", showInitialForm: false, success: "Thanks For Your Confirmation" })
            default:
                return
        }
    }
    const ExitChangeHandler = (e) => {
        updateConditionRenderCases("SHOW_NO_UPDATE_DEC")
    }

    const loanOrApplicationNoChangeHandler = (e) => {
        const { name, value } = e.target
        const prevState = { ...loanOrApplication }
        prevState[name] = value
        setloanOrApplication(prevState)
    }

    const uploadDocumentChangeHandler = (e) => {
        const { name, value, files } = e.target;
        const prevState = { ...uploadDocument };

        switch (name) {
            case "documentId":
                prevState[name] = value;
                setUploadDocument(prevState);
                break;
            case "documentType":
                prevState[name] = value;
                prevState.frontPage = {}
                prevState.backPage = {}
                setUploadDocument(prevState);
                break;

            case "otpCode":
                prevState[name] = value;
                setUploadDocument(prevState);
                break;

            default:
                let file = files?.[0];

                if (file.type === "application/pdf" || file.type === "image/jpeg" || file.type === "image/png"
                ) {
                    updateConditionRenderCases("ERROR", { error: "" })
                    let Base64Data;

                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const binaryData = e.target.result;
                        Base64Data = base64.encode(binaryData);

                        prevState[name] = {
                            base64String: Base64Data,
                            fileType: file.type,
                        };
                        setUploadDocument(prevState);
                    };
                    reader.readAsBinaryString(file);
                } else {
                    updateConditionRenderCases("ERROR", { error: "Invalid file type. Please upload a PDF, PNG or JPEG file to continue." })
                }
                break;
        }
    };


    const validateLoanNoActionHandler = async (e) => {
        e.preventDefault();
        try {
            const body = { loanNo: loanOrApplication.loanOrApplicationNo }
            const { data } = await axios.post(api.requestOTP(), body)

            if (data.code === "0000") {
                const { otpCode, mobile } = data
                setloanOrApplication((state) => ({ ...state, otpCode, mobileNo: mobile }))
                updateConditionRenderCases("ENABLE_OTP_INPUT", { mobile })
            } else {
                updateConditionRenderCases("ERROR", { error: "Invalid Loan/Application No. Given!" })
            }

        } catch (error) {
            updateConditionRenderCases("ERROR", { error: error.message })
        }
    }

    const validateOTPActionHandler = async (e) => {
        e.preventDefault();
        try {
            const { otpCode, mobileNo, loanOrApplicationNo: loanNo } = loanOrApplication
            const body = { otpCode, mobileNo, loanNo }
            const { data } = await axios.post(api.validateOTP(), body)


            if (data.code === "0000") {
                updateConditionRenderCases("SHOW_USER_DETAIL_SECTION")
                setloanOrApplication((state) => ({ ...state, ...data, maskedMobileNo: maskMobileNumber(data.mobileNo) }))
                Cookies.set("token", data?.jwtToken)
            } else {
                updateConditionRenderCases("ERROR", { error: "Invalid OTP!" })
            }

        } catch (error) {
            updateConditionRenderCases("ERROR", { error: error.message })
        }
    }

    const uploadDocumentActionHandler = async (e) => {
        e.preventDefault();
        try {
            const { documentId, documentType, frontPage, backPage } = uploadDocument
            const { loanNo } = loanOrApplication

            if (!frontPage?.fileType) {
                return
            }

            const body = {
                loanNo: loanNo,
                documentId: documentId,
                documentType: documentType,
                base64Data: [frontPage]
            }

            if (backPage?.fileType) {
                body.base64Data.push(backPage)
            }

            const { data } = await axios.post(api.uploadDocument(), body)
            if (data.code === "0000") {
                setUploadDocument((state) => ({ ...state, ...data }))
                updateConditionRenderCases("SHOW_DOCUMENT_PREVIEW")
            } else {
                updateConditionRenderCases("ERROR", { error: data.msg })
            }
        } catch (error) {
            updateConditionRenderCases("ERROR", { error: error?.response?.data || error.message })
        }
    }

    const confirmAddressActionHandler = async (e) => {
        e.preventDefault();
        try {
            const { documentId, documentType, address: updatedAddress, mobileNo, otpCode } = uploadDocument
            const { loanNo } = loanOrApplication

            const body = {
                loanNo, documentId, documentType, updatedAddress, mobileNo, otpCode
            }

            const { data } = await axios.post(api.confirmAddressUpdate(), body)

            if (data.code === "0000") {
                setUploadDocument({ ...uploadDocumentInitialState })
                updateConditionRenderCases("SUCCESS_MSG")
            } else {
                updateConditionRenderCases("ERROR", { error: data.msg })
            }
        } catch (error) {
            updateConditionRenderCases("ERROR", { error: error?.response?.data || error.message })
        }
    }

    const completeKYCWithoutChangeActionHandler = async () => {
        try {
            const { loanNo } = loanOrApplication
            const body = { loanNo }

            await axios.post(api.disableKycFlag(), body)
            updateConditionRenderCases("SUCCESS_MSG")

        } catch (error) {
            updateConditionRenderCases("ERROR", { error: error?.response?.data || error.message })
        }
    }

    const showOTPSectionActionHandler = async () => {
        try {
            const body = { loanNo: loanOrApplication.loanNo }
            const { data } = await axios.post(api.requestOTP(), body)

            if (data.code === "0000") {
                const { otpCode, mobile } = data
                setUploadDocument((state) => ({ ...state, otpCode, mobileNo: mobile }))
            }

            updateConditionRenderCases("SHOW_CONFIRM_ADDRESS_OTP_PREVIEW")

        } catch (error) {
            updateConditionRenderCases("ERROR", { error: error.message })
        }
    }

    return ({
        uploadDocument, loanOrApplication, conditionalRenderCases,

        loanOrApplicationNoChangeHandler, uploadDocumentChangeHandler,
        showOTPSectionActionHandler, confirmAddressActionHandler, ExitChangeHandler,


        validateLoanNoActionHandler, validateOTPActionHandler, uploadDocumentActionHandler, completeKYCWithoutChangeActionHandler,


        showUpdateFormActionHandler: () => updateConditionRenderCases("SHOW_USER_REKYC_FORM_SECTION"),
        hideDocumentPreviewActionHandler: () => updateConditionRenderCases("HIDE_DOCUMENT_PREVIEW"),
    })
}

export default useLogicHook