export const api = {
    requestOTP: () => `/userKyc/sendOtp`,
    validateOTP: () => `/userKyc/otpVerification`,

    uploadDocument: () => `/shubham/addressPreview`,
    confirmAddressUpdate: () => `/shubham/updateAddress`,
    disableKycFlag: () => `/shubham/disable-kyc-flag`,
}