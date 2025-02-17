import { createContext, useState, useRef, useEffect } from "react"

import { io } from 'socket.io-client'

export const AuthContext = createContext(null)

export default function AccountProvider({ children }) {
    const socket = useRef()
    const [account, setAccount] = useState(null)
    const [person, setPerson] = useState({})
    const [activeUsers, setActiveUsers] = useState([])
    const [newMsg, setNewMsg] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        socket.current = io('https://vchat-socket.onrender.com')

        socket.current.on("connect", () => {
            if (account) {
                socket.current.emit('addUser', account);
            }
        });

        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        });

    }, [account])
    return (
        <AuthContext.Provider value={{ account, setAccount, person, setPerson, socket, activeUsers, setActiveUsers, newMsg, setNewMsg, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}