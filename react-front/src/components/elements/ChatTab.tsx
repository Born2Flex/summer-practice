import { NavLink } from "react-router-dom"
import EmptyUser from "../../assets/empty-user.webp"
import ShortChat from "../../interfaces/ShortChatInterface"

//ChatTab component, displays the chat tab with the participant's image and name and the last message
function ChatTab({ chat }: { chat: ShortChat }) {
    return (
        <NavLink to={`/chat/${chat.id}`} >
            <div className="w-full flex flex-col border-gray-500 hover:bg-white/30 cursor-pointer">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <img src={chat.participant.imgUrl || EmptyUser} alt="User" className="w-12 h-12 rounded-full border border-black" />
                        <div>
                            <h3 className="font-semibold text-lg">{chat.participant.firstName} {chat.participant.lastName}</h3>
                            {chat.lastMessage && (<p className="text-sm text-gray-500">{chat.lastMessage.content.trim().length > 40 ? chat.lastMessage.content.slice(0, 40) + '...' : chat.lastMessage.content}</p>)}
                            {!chat.lastMessage && (<p className="text-sm text-gray-500">No messages yet</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default ChatTab