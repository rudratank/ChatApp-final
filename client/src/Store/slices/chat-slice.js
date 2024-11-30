export const createChatSlice=(set,get)=>({
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessages:[],
    directMessagesContacts:[],
    isUploding:false,
    isDownloading:false,
    fileUploadProgress:0,
    fileDownloadProgress:0,
    setIsUploding:(isUploding)=>set({isUploding}),
    setIsDownloading:(isDownloading)=>set({isDownloading}),
    setFileUploadProgress:(fileUploadProgress)=>set({fileUploadProgress}),
    setFileDownloadProgress:(fileDownloadProgress)=>set({fileDownloadProgress}),
    setSelectedChatType:(selectedChatType)=>set({selectedChatType}),
    setSelectedChatData:(selectedChatData)=>set({selectedChatData}),
    setSelectedChatMessages:(selectedChatMessages)=>set({selectedChatMessages}),
    setdirectMessagesContacts:(directMessagesContacts)=>set({directMessagesContacts}),
    closeChat:()=>set({selectedChatData:undefined,selectedChatType:undefined,selectedChatMessages:[]}),
    addMessage:(message)=>{
        const selectedChatMessages =get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages:[
                ...selectedChatMessages,{
                    ...message,
                    recipient: selectedChatType==="channel" ? message.recipient : message.recipient._id,
                    sender: selectedChatType==="channel" ? message.sender : message.sender._id,
                }
            ]
        })
    }

})