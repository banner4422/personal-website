import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-zinc-900">
      <Head>
        <title>Christian Krogh Nielsen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl text-white">Christian Krogh Nielsen</h1>
        <br />
        <p className="text-white">Coming soon...™️</p>
      </main>
    </div>
  )
}

export default Home
