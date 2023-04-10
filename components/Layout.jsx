import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

// wrapper for the whole page also containing metadata, navbar, main, footer etc..
// pass children so it renders it in the main
const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Helena's Web Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
      {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout