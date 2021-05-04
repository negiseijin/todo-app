import React, { FormEvent, useCallback } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  uid: string
  createTodo: (uid: string, todo: string) => Promise<void>
}

type IFormInput = {
  todo: string
}

export const TodoInput: React.VFC<Props> = React.memo(({ uid, createTodo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      todo: '',
    },
  })

  const handleSubmitTodo = useCallback(
    async (data: IFormInput, e: FormEvent) => {
      try {
        e.preventDefault()
        await createTodo(uid, data.todo)
        reset()
      } catch (error) {
        console.error(error)
      }
    },
    []
  )

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitTodo)}
        className="flex flex-wrap justify-center items-center"
      >
        <div className="w-full lg:w-4/5">
          <input
            type="text"
            placeholder="todoを入力してください"
            {...register('todo', {
              required: true,
            })}
            className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
          />
          {errors?.todo?.type === 'required' && (
            <p className="text-red-600 text-xs italic">
              todoを入力してください
            </p>
          )}
        </div>
        <div className="w-full py-4 lg:w-1/5 lg:px-4">
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          >
            追加
          </button>
        </div>
      </form>
    </>
  )
})
