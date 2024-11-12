import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from '../context/GlobalContext'
import success from '../assets/gifs/walking man.webp'
import download from '../assets/images/dwoload.svg'
import ReactConfetti from 'react-confetti'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { writeFile, utils } from 'xlsx'

const POST_DATA_ENDPOINT = 'https://quizproject/post-data'

type DataItem = {
  order: number[]
  title: string[]
  type: string[]
  answer: (string | string[])[]
}

export default function ResultPage() {
  const { t } = useTranslation()
  const { globalState, setGlobalState } = useGlobalContext()
  const answers = globalState?.answers
  const hateObjects = answers.hate.map((item) => t(item).slice(0, -2))
  const preferences = answers.preferences.map((item) => t(item).slice(0, -2))
  const [data] = useState<DataItem>({
    order: [1, 2, 3, 4, 5, 6],
    title: [
      'What is your prefered language?',
      'What gender do you identify with',
      'What us your age?',
      'What do you hate most in a book?',
      'What are your favorite topics?',
      'Email',
    ],
    type: ['single-select', 'single-select-image', 'single-select', 'multiple-select', 'buble', 'email'],
    answer: [
      t(answers.language),
      t(answers.gender).slice(0, -2),
      t(answers.age),
      hateObjects,
      preferences,
      t(answers.email),
    ],
  })

  const handleRetakeQuiz = () => {
    localStorage.removeItem('data')
    setGlobalState((prev) => ({
      ...prev,
      progress: 0,
      answers: { ...prev.answers, language: '', gender: '', age: '', hate: [], preferences: [], email: '' },
    }))
  }

  // restfull implementation. if used, add loading, succes and error state
  useEffect(() => {
    const pushData = async () => {
      try {
        const response = await axios.post(`${POST_DATA_ENDPOINT}`, { globalState })
        if (response.status == 200) {
          // set success
        }
      } catch (err) {
        console.error(err)
      }
    }
    pushData()
  }, [])

  const exportToCSV = () => {
    // Transforming data into a format suitable for CSV export
    const csvData = data.order.map((_, index) => ({
      order: data.order[index],
      title: data.title[index],
      type: data.type[index],
      answer: Array.isArray(data.answer[index]) ? (data.answer[index] as string[]).join(', ') : data.answer[index],
    }))

    // Creating a worksheet
    const worksheet = utils.json_to_sheet(csvData)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Data')

    // Exporting to CSV
    writeFile(workbook, 'data_export.csv')
  }

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="pt-10 pb-14 px-8 min-h-screen grid justify-items-center w-full"
    >
      {
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          gravity={0.3}
          wind={0.1}
          initialVelocityX={10}
          initialVelocityY={15}
          recycle={false}
          tweenDuration={1000}
        />
      }
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <div className="grid gap-2">
          <h1 className="text-center text-4xl font-bold">{t('thanks')}</h1>
          <p className="text-center text-md opacity-70">{t('comment')}</p>
        </div>
        <div className="w-full mt-10 flex items-center justify-center">
          <img src={success} alt="success" className="rounded-md" />
        </div>
      </div>
      <div className="mt-8 grid items-end w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <div className="flex items-center justify-center w-full gap-2 mb-8" onClick={() => exportToCSV()}>
          <img src={download} alt="download" className="size-8" />
          <h1 className="text-xl hover:text-slate-400">{t('download')}</h1>
        </div>
        <button
          className={`border rounded-lg w-full text-center text-3xl py-4 flex items-center justify-center transition-all duration-400 ease-in-out shadow-md hover:bg-slate-100`}
          onClick={() => handleRetakeQuiz()}
        >
          {t('retakeQuiz')}
        </button>
      </div>
    </motion.main>
  )
}
