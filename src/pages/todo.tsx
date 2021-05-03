import Head from 'next/head'
import { NextPage } from 'next'

import { firestore } from '@/lib/firebase'
import { useAuth } from '@/lib/authContext'
import { Todo as type } from '@/types/todo'
import { Layout } from '@/components/templates/Layout'
import { TodoInput } from '@/components/molecules/TodoInput'
import { TodoList } from '@/components/molecules/TodoList'

const addTodo = async (uid: string, todo: string) => {
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

const editTodo = async (todo: type) => {
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
          <div>読み込み中...</div>
        ) : (
          <>
            <TodoInput uid={currentUser.uid} onSubmit={addTodo} />
            <TodoList
              uid={currentUser.uid}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          </>
        )}
      </Layout>
    </>
  )
}

export default Todo
