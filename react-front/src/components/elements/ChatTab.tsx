import EmptyUser from "../../assets/empty-user.webp"

function ChatTab() {
    return (
        <div className="w-full flex flex-col border-gray-500 hover:bg-white/30 cursor-pointer">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <img src={EmptyUser} alt="User" className="w-12 h-12 rounded-full border border-black" />
                    <div>
                        <h3 className="font-semibold text-lg">User Name</h3>
                        <p className="text-sm text-gray-500">Hello, I was wondering if you could help me, I have some problems...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatTab