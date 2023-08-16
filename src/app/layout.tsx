import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ContractProvider } from './context/ContractContext'
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Token Vesting',
  description: 'Created by prince panwar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
     <ContractProvider>
        <body className={inter.className}>{children}</body>
      </ContractProvider>
     
    </html>
  )
}
