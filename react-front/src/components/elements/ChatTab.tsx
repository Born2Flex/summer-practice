import { Link } from "react-router-dom"
import EmptyUser from "../../assets/empty-user.webp"
import ShortChat from "../../interfaces/ShortChatInterface"

function ChatTab({ chat }: { chat: ShortChat }) {
    console.log("chat in chat tab: ", chat)
    return (
        <Link to={`/chat/${chat.id}`} >
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
        </Link>
    )
}

export default ChatTab