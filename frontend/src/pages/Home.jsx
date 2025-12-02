import React from 'react'
import Header from '../components/Header'

const Home = () => {
  return (
    <div>
        <Header />
        <div className='w-full h-screen flex justify-center items-center text-8xl font-semibold bg-black text-amber-50'>
          <h1>My Notes</h1>
        </div>
    </div>
  )
}

export default Home