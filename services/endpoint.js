export const api = {
    requestOTP: () => `/userKyc/send-otp`,
    validateOTP: () => `/userKyc/otp-verification`,

    uploadDocument: () => `/shubham/upload-preview`,
    confirmAddressUpdate: () => `/shubham/upload-kyc`,
    disableKycFlag: () => `/shubham/disable-kyc-flag`,
}