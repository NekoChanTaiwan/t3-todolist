import { trpc, cx } from '@/utils'
import { BsTrash } from 'react-icons/bs'
import { type MouseEvent } from 'react'

function TodoList() {
  const utils = trpc.useContext()
  const { data: todos, isFetching } = trpc.todo.list.useQuery()
  const { mutateAsync: updateChecked } = trpc.todo.checked.useMutation()
  const { mutateAsync: deleteTodo } = trpc.todo.delete.useMutation()

  async function handleChecked(id: string, checked: boolean) {
    await updateChecked({ id, checked })
    utils.todo.list.invalidate()
  }

  async function handleDelete(e: MouseEvent, id: string) {
    e.stopPropagation()
    await deleteTodo({ id })
    utils.todo.list.invalidate()
  }

  return (
    <ul className='container space-y-2 rounded-md bg-white px-4 py-8 text-black'>
      {todos?.length ? (
        todos.map(({ id, content, checked }) => (
          <li
            key={id}
            role='button'
            onClick={() => handleChecked(id, !checked)}
            className={cx(
              'group flex items-center justify-between gap-x-2 rounded-md border-b p-4 text-4xl transition-colors hover:bg-slate-300',
              checked && 'line-through'
            )}
          >
            <p>{content}</p>
            <button
              type='button'
              className='rounded-md px-4 py-2 opacity-0 transition-all hover:bg-slate-100 group-hover:opacity-100'
              onClick={(e) => handleDelete(e, id)}
            >
              <BsTrash />
            </button>
          </li>
        ))
      ) : (
        <p className='text-4xl'>{isFetching ? 'Loading...' : 'No todos yet'}</p>
      )}
    </ul>
  )
}

export default TodoList
