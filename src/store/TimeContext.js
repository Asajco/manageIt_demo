// TimerContext.js
import { createContext, useContext, useState } from 'react'

const TimerContext = createContext()

export const TimerProvider = ({ children }) => {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  return (
    <TimerContext.Provider
      value={{ elapsedTime, setElapsedTime, isRunning, setIsRunning }}
    >
      {children}
    </TimerContext.Provider>
  )
}

export const useTimer = () => {
  return useContext(TimerContext)
}
