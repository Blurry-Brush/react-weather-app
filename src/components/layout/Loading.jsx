import React from 'react'
import spinner from '../Assets/reload-cat.gif'

function Loading() {
  return (
    <div className='w-100 mt-12'>
        <img className='h-auto text-center mx-auto w-52' src={spinner} alt="Loading..."></img>
    </div>
  )
}

export default Loading