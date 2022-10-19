import { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useStateValue } from "../../state/hooks";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const isMounted = useRef(false);
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  useEffect(() => {
    if (user) {
      if (!isMounted.current) {
        const uri = import.meta.env.VITE_APP_DREAMERCODES_RT;

        setSocket(
          io(uri, {
            reconnectionDelayMax: 10000,
            auth: {
              id: user?.id,
            },
          })
        );
        isMounted.current = true;
      }
    }

    return () => {
      socket?.disconnect();
    };
  }, [user?.id]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const { socket } = useContext(SocketContext);
  return socket;
}

export function useSocketEvent(event, callback) {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on(event, (data) => callback(data));
    }
  }, [socket]);
}

export function useOnlineStatus() {
  const { isOnline } = useStateValue();
  return isOnline;
}

export function useSocketActions() {
  const dispatch = useDispatch();
  function handleOnlineStatus() {
    dispatch({
      type: "ADD_ENTRIES",
      payload: true,
      context: "isOnline",
    });
  }

  return {
    handleOnlineStatus,
  };
}
