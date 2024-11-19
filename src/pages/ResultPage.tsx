import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from '../context/GlobalContext'
import success from '../assets/gifs/walking man.webp'
import download from '../assets/images/dwoload.svg'
import ReactConfetti from 'react-confetti'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { writeFile, utils } from 'xlsx'
import { useOutletContext } from 'react-router-dom'

const POST_DATA_ENDPOINT = 'https://quizproject/post-data'

type DataItem = {
  order: number[]
  title: string[]
  type: string[]
  answer: (string | string[])[]
}

type OutletContextType = {
  screenHeight: number
}

export default function ResultPage() {
  const { t } = useTranslation()
  const { globalState, setGlobalState } = useGlobalContext()
  const answers = globalState?.answers
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
      t(answers.hate),
      t(answers.preferences),
      t(answers.email),
    ],
  })
  const { screenHeight } = useOutletContext<OutletContextType>()

  const handleRetakeQuiz = () => {
    localStorage.removeItem('data')
    setGlobalState((prev) => ({
      ...prev,
      progress: 0,
      answers: {
        ...prev.answers,
        language: 'English',
        gender: '',
        age: '',
        hate: [],
        preferences: [],
        email: '',
      },
    }))
  }

  // restfull implementation. if used, add loading, succes and error state
  useEffect(() => {
    const pushData = async () => {
      try {
        const response = await axios.post(`${POST_DATA_ENDPOINT}`, {
          globalState,
        })
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
      className="px-8 flex flex-col justify-around items-center w-full flex-grow"
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
          <h1 className={`text-center font-bold ${screenHeight < 750 ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
            {t('thanks')}
          </h1>
          <p className={`text-center opacity-70 ${screenHeight < 750 ? 'text-sm' : 'text-base'}`}>{t('comment')}</p>
        </div>
        <div className={`w-full flex justify-center mt-4 ${screenHeight < 750 ? 'size-96' : ''}`}>
          <img src={success} alt="success" className="rounded-md" />
        </div>
        <div
          className="mt-4 flex items-center justify-center w-full gap-2 cursor-pointer"
          onClick={() => exportToCSV()}
        >
          <img src={download} alt="download" className={`${screenHeight < 750 ? 'size-6' : 'size-7 md:size-8'}`} />
          <h1 className={`text-xl hover:text-slate-400 ${screenHeight < 750 ? 'text-base' : 'text-lg'}`}>
            {t('download')}
          </h1>
        </div>
      </div>
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <button
          className={`border rounded-lg w-full text-center flex items-center justify-center transition-all duration-400 ease-in-out shadow-md hover:bg-slate-100 ${
            screenHeight < 750 ? 'text-xl py-2' : 'py-3 md:py-4 text-2xl md:text-3xl'
          }`}
          onClick={() => handleRetakeQuiz()}
        >
          {t('retakeQuiz')}
        </button>
      </div>
    </motion.main>
  )
}
