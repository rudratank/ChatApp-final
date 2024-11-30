import { userAppStore } from "@/Store";
import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useRef } from "react";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(); // Initialize socket reference
  const { userinfo } = userAppStore(); // Access user info from the store

  useEffect(() => {
    if (userinfo) {
      console.log("User Info:", userinfo);
      socket.current = io("http://localhost:8747", {
        withCredentials: true,
        query: { userId: userinfo.id },
      });
      socket.current.on("connect",()=>{
        console.log("Connected to socket server");
        
      });

      const handleReciveMessage=(message)=>{
          const {selectedChatType,selectedChatData,addMessage} = userAppStore.getState();

          if((selectedChatType !== undefined && selectedChatData._id===message.sender._id || selectedChatData._id === message.recipient._id))
          {
            console.log("message rcv",message);
            
              addMessage(message);
          }
      };

      socket.current.on("reciveMessage",handleReciveMessage);

      return ()=>{
        socket.current.disconnect();
      }
    }
  }, [userinfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
