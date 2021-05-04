import React, { useEffect, useState } from 'react'
import { isBefore } from 'date-fns'

import { firestore } from '@/lib/firebase'
import { Todo } from '@/types/todo'
import { TodoItem } from './TodoItem'

type Props = {
  uid: string
  updateTodo: (todo: Todo) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
}

export const TodoList: React.VFC<Props> = React.memo(
  ({ uid, updateTodo, deleteTodo }) => {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
      firestore
        .collection('todos')
        .where('uid', '==', uid)
        .onSnapshot((collection) => {
          const data = collection.docs.map<Todo>((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            isComplete: doc.data().isComplete,
            date_at: doc.data().date_at.toDate(),
            uid: doc.data().uid,
          }))
          setTodos(data)
        })
    }, [])

    const sortedTodos = todos.sort((a, b) =>
      isBefore(a.date_at, b.date_at) ? 1 : -1
    )

    return (
      <>
        {todos.length <= 0 ? (
          <div className="w-full">登録されたTODOはありません。</div>
        ) : (
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Todo
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Edit
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedTodos.map((todo, index) => (
                        <TodoItem
                          key={index}
                          todo={todo}
                          handleUpdate={updateTodo}
                          handleDelete={deleteTodo}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
)
