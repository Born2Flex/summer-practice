//Browser mockup component
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
                    width="624" height="341"
                    src="https://www.youtube.com/embed/IkCh8VfN2d4?autoplay=1&mute=1&loop=1&playlist=IkCh8VfN2d4"
                    title="Event Management Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                >
                </iframe>
                {/* <video autoPlay={true} playsInline={true} muted={true} className="lp-Hero-video lp-Hero-video--landscape hide-reduced-motion" width="1248" height="735" poster="https://vz-57aae6f4-e6e.b-cdn.net/7053d518-b153-43a2-875c-0bef7abf7f3f/preview.webp"><source src="https://iframe.mediadelivery.net/play/256129/7053d518-b153-43a2-875c-0bef7abf7f3f" type="video/mov; codecs=avc1.4d002a" /></video> */}

            </div>
        </div>
    )
}

export default BrowserMockup