import Loader from "@/components/core/Loader"
import { Providers } from "@/redux/provider"
import Footer from '@/components/core/Footer'

import "@/style/style.map.scss"

export const metadata = {
  title: 'Shubham Housing Finance',
  description: "Shubham Housing Finance we provide affordable housing loan with a hassle-free documentation process and easy EMI's options for the low-income segment",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>
          <Loader />
          <div>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
