import { useState, type FormEvent } from 'react'
import { z } from 'zod'
import { trpc, cx } from '@/utils'

export const createTodoSchema = z.object({
  content: z.string().min(1).max(100),
})

function TodoForm() {
  const [content, setContent] = useState('')

  const contentIsValid = createTodoSchema.safeParse({ content }).success

  const utils = trpc.useContext()
  const { mutateAsync } = trpc.todo.create.useMutation()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await mutateAsync({ content })
    utils.todo.invalidate()
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className='space-x-4'>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='rounded-md p-2 text-black outline-blue-400'
      />
      <button
        type='submit'
        disabled={!contentIsValid}
        className={cx(
          'rounded bg-white px-4 py-2 font-semibold text-black transition-colors',
          contentIsValid ? 'hover:bg-gray-200' : 'cursor-not-allowed'
        )}
      >
        Add
      </button>
    </form>
  )
}

export default TodoForm
