import React from 'react'
import Button from './Button'
import ProfileImage from './ProfileImage'

const NewTweetForm = () => {
  return (
    <form className='flex flex-col gap-2 border-b px-4 py-2'>
      <div className='flex gap-4'>
        <ProfileImage />
        <textarea className=' flex-grow resize-none overflow-hidden p-4 text-lg outline-none' placeholder='whats happening today>'/>
      </div>
      <Button className='self-end'>Tweet</Button>
    </form>
  )
}

export default NewTweetForm