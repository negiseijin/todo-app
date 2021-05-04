import React, {
  FormEvent,
  useCallback,
  Fragment,
  useRef,
  useState,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'

import { format } from 'date-fns'

import { Todo } from '@/types/todo'

type Props = {
  todo: Todo
  handleUpdate: (todo: Todo) => Promise<void>
  handleDelete: (id: string) => Promise<void>
}

type IFormInput = {
  updateTodo: string
}

export const TodoItem: React.VFC<Props> = ({
  todo: { id, todo, isComplete, date_at, uid },
  handleUpdate,
  handleDelete,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const cancelButtonRef = useRef()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      updateTodo: todo,
    },
  })

  const openModal = useCallback(() => {
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  const openDeleteModal = useCallback(() => {
    setOpenDelete(true)
  }, [])

  const closeDeleteModal = useCallback(() => {
    setOpenDelete(false)
  }, [])

  const handleUpdateTodo = useCallback(
    async (data: IFormInput, e: FormEvent) => {
      try {
        e.preventDefault()
        await handleUpdate({
          id,
          todo: data.updateTodo,
          isComplete: false,
          date_at,
          uid,
        })
        closeModal()
      } catch (error) {
        console.error(error)
      }
    },
    []
  )

  const handleDeleteTodo = useCallback((deleteId: string) => {
    console.error(deleteId)
    handleDelete(deleteId)
    closeDeleteModal()
  }, [])

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="checked:bg-blue-600 checked:border-transparent"
            checked={isComplete}
            onChange={() =>
              handleUpdate({
                id,
                todo,
                isComplete: !isComplete,
                date_at,
                uid,
              })
            }
          />
          <span
            className={`text-sm text-gray-900 ml-2 ${
              isComplete && 'line-through'
            }`}
          >
            {todo}
          </span>
        </label>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isComplete ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            Done
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
            Active
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {format(date_at, 'yyyy-MM-dd HH:mm:ss')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button
          className="w-4 transform hover:text-indigo-500 hover:scale-110"
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>

        <Transition show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            initialFocus={cancelButtonRef}
            static
            open={open}
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-baseline transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    todoを編集しますか？😃
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(handleUpdateTodo)}>
                      <input
                        type="text"
                        placeholder="todoを入力してください"
                        {...register('updateTodo', {
                          required: true,
                        })}
                        className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      />
                      {errors?.updateTodo?.type === 'required' && (
                        <p className="text-red-600 text-xs italic">
                          todoを入力してください
                        </p>
                      )}
                      <div className="mt-4 text-right">
                        <button
                          type="submit"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-indigo-500 text-white active:bg-indigo-600 border border-transparent rounded-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        >
                          変更
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button
          className="w-4 transform hover:text-red-500 hover:scale-110"
          onClick={openDeleteModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>

        <Transition show={openDelete} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            initialFocus={cancelButtonRef}
            static
            open={openDelete}
            onClose={closeDeleteModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-baseline transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-red-600"
                  >
                    todoを消しますか？🥺
                  </Dialog.Title>
                  <div className="mt-2">
                    <p>{todo}</p>
                    <div className="mt-4 text-right">
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-red-500 text-white active:bg-red-600 border border-transparent rounded-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                        onClick={() => handleDeleteTodo(id)}
                      >
                        消す
                      </button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </td>
    </tr>
  )
}
