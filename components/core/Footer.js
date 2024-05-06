"use client";

import React from 'react'

const Footer = () => {
    let year = new Date()

    return (
        <footer>
            Copyright@{year.getFullYear()} Shubham Housing Finance. All Rights Reserved.
        </footer>
    )
}

export default Footer