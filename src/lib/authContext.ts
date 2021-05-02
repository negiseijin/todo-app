/* eslint-disable no-console */
import firebase from 'firebase/app'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'

type User = firebase.User

type AuthContextProps = {
  currentUser: User | null
  isLoggedin: boolean
  signIn: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>
  signInAnonymously: () => Promise<firebase.auth.UserCredential>
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>
  signOut: () => Promise<void>
}

function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined)
  function useCtx() {
    const c = useContext(ctx)
    if (!c) throw new Error('useCtx must be inside a Provider with a value')
    return c
  }
  return [useCtx, ctx.Provider] as const
}

export const [useAuth, AuthProvider] = createCtx<AuthContextProps>()

export const useAuthCtx = (): AuthContextProps => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const isLoggedin = currentUser !== null

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : setCurrentUser(null)
    })
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('signIn')
      return await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error, error.code, error.message)
    }
  }

  const signInAnonymously = async (): Promise<firebase.auth.UserCredential> => {
    try {
      console.log('signInAnonymously')
      return await firebase.auth().signInAnonymously()
    } catch (error) {
      console.log(error, error.code, error.message)
    }
  }

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      return await auth
        .createUserWithEmailAndPassword(email, password)
        .then((value) => {
          value.user.updateProfile({
            displayName: displayName,
          })
          auth.currentUser.sendEmailVerification()
        })
        .catch((err) => {
          console.error(err)
        })
    } catch (error) {
      console.log(error, error.code, error.message)
    }
  }
  const signOut = async () => {
    try {
      await auth.signOut()
      console.log('signOut')
    } catch (error) {
      console.log(error, error.code, error.message)
    }
  }

  return { currentUser, isLoggedin, signIn, signInAnonymously, signUp, signOut }
}
