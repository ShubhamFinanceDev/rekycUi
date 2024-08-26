"use client";

import React from 'react'

const Footer = () => {
    let year = new Date()

    return (
        <>
        <span className="footer-span" />
        <footer className="footer">
          <p>
            Copyright@{year.getFullYear()} Shubham Housing Finance. All Rights Reserved.
            </p>
      </footer>
    </>
    )
}

export default Footer