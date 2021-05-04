import Head from 'next/head'
import { NextPage } from 'next'

import { firestore } from '@/lib/firebase'
import { useAuth } from '@/lib/authContext'
import { Todo as type } from '@/types/todo'
import { Layout } from '@/components/templates/Layout'
import { TodoInput } from '@/components/molecules/TodoInput'
import { TodoList } from '@/components/molecules/TodoList'

const createTodo = async (uid: string, todo: string) => {
  await firestore
    .collection('todos')
    .add({
      todo: todo,
      isComplete: false,
      date_at: new Date(),
      uid: uid,
    })
    .catch((error) => console.error(error))
}

const deleteTodo = async (id: string) => {
  await firestore
    .collection('todos')
    .doc(id)
    .delete()
    .catch((error) => console.error(error))
}

const updateTodo = async (todo: type) => {
  await firestore
    .collection('todos')
    .doc(todo.id)
    .update({
      todo: todo.todo,
      isComplete: todo.isComplete,
      date_at: new Date(),
      uid: todo.uid,
    })
    .catch((error) => console.error(error))
}

export const Todo: NextPage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <Head>
        <title>todo app todoする</title>
      </Head>

      <Layout>
        {!currentUser ? (
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-white text-xl font-semibold">
              読み込み中...
            </h2>
            <p className="w-1/3 text-center text-white">
              しばらくお待ち下さい...
            </p>
          </div>
        ) : (
          <>
            <TodoInput uid={currentUser.uid} createTodo={createTodo} />
            <TodoList
              uid={currentUser.uid}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          </>
        )}
      </Layout>
    </>
  )
}

export default Todo
