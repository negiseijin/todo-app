import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'

import { useAuth } from '@/lib/authContext'

type IFormInput = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export const Auth: NextPage = () => {
  const roundedTop = 'rounded-t-md'
  const roundedBottom = 'rounded-b-md'
  const router = useRouter()

  const [isLogin, setIslogin] = useState<boolean>(true)
  const [isbuttonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const { signIn, signInAnonymously, signUp, currentUser } = useAuth()

  const { register, watch, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const watchSignInFields = watch(['email', 'password'])
  const watchPasswordFields = watch(['password', 'confirmPassword'])

  useEffect(() => {
    // ログインと新規登録を切り替えたらフォームクリア
    reset()
  }, [isLogin])

  useEffect(() => {
    // ログイン成功で移動
    if (currentUser) {
      router.push('/todo')
    }
  }, [currentUser])

  useEffect(() => {
    setIsButtonDisabled(true)
    if (!isLogin) {
      // 新規登録
      if (watchPasswordFields[0].trim() === watchPasswordFields[1].trim()) {
        setIsButtonDisabled(false)
      }
    } else {
      // ログイン
      if (watchSignInFields[0].trim() && watchSignInFields[1].trim()) {
        setIsButtonDisabled(false)
      }
    }
  }, [watchSignInFields, watchPasswordFields])

  const handleSignIn = useCallback(async (data: IFormInput, e: FormEvent) => {
    try {
      e.preventDefault()
      await signIn(data.email, data.password)
    } catch (error) {
      alert(error)
    }
  }, [])

  const handleSignUp = useCallback(async (data: IFormInput, e: FormEvent) => {
    try {
      e.preventDefault()
      await signUp(
        data.email,
        data.password,
        `${data.lastName} ${data.firstName}`
      )
    } catch (error) {
      alert(error)
    }
  }, [])

  const handleSignInAnonymously = useCallback(async (e: FormEvent) => {
    try {
      e.preventDefault()
      await signInAnonymously()
    } catch (error) {
      alert(error)
    }
  }, [])

  return (
    <>
      <Head>
        <title>todo app ホーム</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {isLogin ? 'ログイン' : '新規登録'}
            </h2>
            {isLogin && (
              <p className="mt-2 text-center text-sm text-gray-600">
                または{' '}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={handleSignInAnonymously}
                >
                  匿名でログインする
                </a>
              </p>
            )}
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(isLogin ? handleSignIn : handleSignUp)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="first-name" className="sr-only">
                      名前
                    </label>
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="fname"
                      required
                      className="appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="名前"
                      {...register('firstName')}
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="lname"
                      required
                      className="appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="苗字"
                      {...register('lastName')}
                    />
                  </div>
                </>
              )}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  メールアドレス
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`${
                    !isLogin ? '' : roundedTop
                  } appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="メールアドレス"
                  {...register('email')}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`${
                    !isLogin ? '' : roundedBottom
                  } appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="パスワード"
                  {...register('password')}
                />
              </div>
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="確認パスワード"
                    {...register('confirmPassword')}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-row-reverse items-center">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => {
                    setIslogin(!isLogin)
                  }}
                >
                  {isLogin
                    ? 'アカウントをお持ちではありませんか？新規登録する'
                    : 'アカウントをお持ちですか？ログインする'}
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isbuttonDisabled}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                {isLogin ? 'ログイン' : '新規登録'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Auth
