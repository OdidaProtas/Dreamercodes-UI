import { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const uri = import.meta.env.VITE_APP_DREAMERCODES_RT;
    const sock = io(uri, {
      reconnectionDelayMax: 10000,
    });

    setSocket(sock)

    return () => {
      if (sock) {
        sock.disconnect();
        socket?.disconnect();
      }
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}

export function useSocketEvent(event, callback) {
  const {socket} = useSocket();
  
  useEffect(() => {
    if (socket) {
      socket.on(event, (data) => callback(data));
    }
  }, [socket]);
}
