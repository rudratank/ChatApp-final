import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../../../../../../components/ui/tooltip";
  import { FaPlus } from "react-icons/fa";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { useEffect, useState } from "react";
  import { animationDefaultOption, getColor } from "@/lib/utils";
  import Lottie from "react-lottie";
  import axios from "axios";
  import { GET_ALL_CONTACT_ROUTES, HOST, SEACRCH_CONTACTS_ROUTES } from "@/utils/constants";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { Avatar, AvatarImage } from "@/components/ui/avatar";
  import { userAppStore } from "@/Store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/multipleselect";
  
  function CreateChannels() {
    const { setSelectedChatType, setSelectedChatData } = userAppStore();
    const [newChannelModal, setnewChannelModal] = useState(false);
    const [contactResults, setContactResults] = useState([]);
    const [searchError, setSearchError] = useState(false);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setselectedContacts] = useState([]);
    const [channelName, setchannelName] = useState("")

    useEffect(()=>{
        const getData=async()=>{
            const response=await axios.get(GET_ALL_CONTACT_ROUTES,{withCredentials:true});
            setAllContacts(response.data.contacts)
        }

        getData();
    },[])
  

  const craeteChannel = async()=>{

  }
  
    // Render fallback UI
    const renderFallback = () => (
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <Lottie
          isClickToPauseDisabled
          height={150}
          width={150}
          options={animationDefaultOption}
        />
        <h3 className="mt-4 text-white text-opacity-80 text-lg">
          Start by searching for a <span className="text-purple-500">Contact</span>!
        </h3>
      </div>
    );
  
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaPlus
                className="text-neutral-400 hover:text-white transition duration-300 cursor-pointer text-lg"
                onClick={() => setnewChannelModal(true)}
                aria-label="Create New Channel"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] text-white p-2">
              Create New Channels
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
  
        <Dialog
          open={newChannelModal}
          onOpenChange={() => setnewChannelModal(!newChannelModal)}
        >
          <DialogContent className="bg-[#181920] text-white w-full max-w-md p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle>Please Fillup the Details for new channel</DialogTitle>
              <DialogDescription>Search and select a contact to chat with.</DialogDescription>
            </DialogHeader>
  
            <Input
              placeholder="Channel Name"
              className="rounded-lg mt-4 p-3 bg-[#2c2e3b] border-none"
              onChange={(e) => setchannelName(e.target.value)}
              value={channelName}
            />  
            <div>
                <MultipleSelector className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white" 
                defaultOptions={allContacts}
                placeholder="Search Contacts"
                value={selectedContacts}
                onChange={setselectedContacts}
                emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600">No Results Found</p>
                }
                />
            </div>
            <Button className="w-full bg-purple-700 hover:bg-purple-900 duration-300 transition-all" onClick={craeteChannel}>
                Create Channel
            </Button>

          </DialogContent>
        </Dialog>
      </>
    );
  }
  
  export default CreateChannels;
  