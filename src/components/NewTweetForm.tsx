import React, { FormEvent, useCallback, useLayoutEffect, useRef, useState } from 'react'
import Button from './Button'
import ProfileImage from './ProfileImage'
import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return

  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`
}

function Form() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    textAreaRef.current = textArea
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current)
  }, [inputValue])


  if (session.status !== 'authenticated') return null;

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      console.log(newTweet);
      setInputValue("");
    }
  })
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createTweet.mutate({ content: inputValue })
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 border-b px-4 py-2'>
      <div className='flex gap-4'>
        <ProfileImage src={session.data.user.image} />
        <textarea
          ref={inputRef}
          className=' flex-grow resize-none overflow-hidden p-4 text-lg outline-none' placeholder='whats happening today?'
          style={{ height: 0 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <Button className='self-end'>Tweet</Button>
    </form>
  )
}


const NewTweetForm = () => {
  const session = useSession();
  if (session.status !== 'authenticated') return null;

  return <Form />;
}

export default NewTweetForm