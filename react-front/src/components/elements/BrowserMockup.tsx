// Browser mockup component
function BrowserMockup() {
    return (
        <div className="flex flex-col max-w-2xl items-center">
            <div className="w-full h-11 rounded-t-lg bg-gray-200 flex justify-start items-center space-x-1.5 px-3">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
            </div>
            <div className="bg-gray-100 border-t-0 w-full h-fit">
                <iframe
                    width="624"
                    height="341"
                    // Video ID: BOG_CbEDhag
                    // loop=1 + playlist=ID → continuous looping
                    src="https://www.youtube.com/embed/BOG_CbEDhag?autoplay=1&mute=1&loop=1&playlist=BOG_CbEDhag"
                    title="Event Management Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    )
}

export default BrowserMockup