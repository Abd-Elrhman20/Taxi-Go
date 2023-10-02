import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import NavBar from '@/components/NavBar'


const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <NavBar />
          {children}
        </body>
      </html>

    </ClerkProvider>
  )
}
