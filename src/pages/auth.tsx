import { NextPage } from 'next'
import { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'

export const Auth: NextPage = () => {
  const [signin, setSignin] = useState<boolean>(true)

  const roundedTop = 'rounded-t-md'
  const roundedBottom = 'rounded-b-md'
  1
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {signin ? 'ログイン' : '新規登録'}
          </h2>
          {signin && (
            <p className="mt-2 text-center text-sm text-gray-600">
              または{' '}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                匿名でログインする
              </a>
            </p>
          )}
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {!signin && (
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
                  !signin ? '' : roundedTop
                } appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="メールアドレス"
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
                  !signin ? '' : roundedBottom
                } appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="パスワード"
              />
            </div>
            {!signin && (
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
                  setSignin(!signin)
                }}
              >
                {signin
                  ? 'アカウントをお持ちではありませんか？新規登録する'
                  : 'アカウントをお持ちですか？ログインする'}
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              {signin ? 'ログイン' : '新規登録'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth
