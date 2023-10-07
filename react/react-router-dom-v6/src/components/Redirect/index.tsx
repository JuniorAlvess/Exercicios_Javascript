import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
    const [time, setTime] = useState(3)
    const timeout = useRef(0)
    const navigate = useNavigate()

    useEffect(() => {
        clearTimeout(timeout.current)

        timeout.current = setTimeout(() => {
            setTime((time) => time - 1)
        }, 1000)

        if (time <= 0) navigate('/', {
            state: `This is the state: ${Math.random()}`
        })

        return () => {
            clearTimeout(timeout.current)
        }
    }, [time])


    return (
        <div>
            <h1>Get out of here in: {time}</h1>
        </div>
    )
}

export default Redirect