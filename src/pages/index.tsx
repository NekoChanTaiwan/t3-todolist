import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'
import { type Session } from 'next-auth'

function Home() {
  const { data: session } = useSession()

  return (
    <main className='flex min-h-screen flex-col items-center gap-y-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] p-10 text-white'>
      {session ? <Authenticated session={session} /> : <Unauthenticated />}
    </main>
  )
}

function Authenticated({ session }: { session: Session }) {
  return (
    <>
      <h1 className='text-6xl font-bold'>Todo App</h1>
      <div className='flex items-center gap-x-2 text-xl'>
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={`${session.user?.name}'s profile picture`}
            width={32}
            height={32}
            className='rounded-full'
            draggable={false}
          />
        )}
        {session.user?.name},
        <button
          type='button'
          onClick={() => signOut()}
          className='font-semibold underline hover:text-gray-200'
        >
          Click here to logout
        </button>
      </div>
      <TodoForm />
      <TodoList />
    </>
  )
}

function Unauthenticated() {
  return (
    <>
      <h1 className='text-6xl font-bold'>Todo App</h1>
      <button
        type='button'
        onClick={() => signIn()}
        className='rounded-md bg-white px-4 py-2 font-semibold text-black'
      >
        Login
      </button>
    </>
  )
}

export default Home
