import React from 'react'
import { formatISO } from 'date-fns'

import { Todo } from '@/types/todo'

type Props = {
  todo: Todo
  handleEdit: (todo: Todo) => Promise<unknown>
  handleDelete: (id: string) => Promise<unknown>
}

export const TodoItem: React.VFC<Props> = React.memo(
  ({
    todo: { id, todo, isComplete, date_at, uid },
    handleEdit,
    handleDelete,
  }) => {
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isComplete}
              onChange={() =>
                handleEdit({ id, todo, isComplete: !isComplete, date_at, uid })
              }
            />
            <span className="text-sm text-gray-900 ml-2">{todo}</span>
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
          {formatISO(date_at)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <button className="w-4 transform hover:text-indigo-500 hover:scale-110">
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
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <button
            className="w-4 transform hover:text-red-500 hover:scale-110"
            onClick={() => handleDelete(id)}
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
        </td>
      </tr>
    )
  }
)
