function BrowserMockup() {
    return (
        <div className="flex flex-col max-w-2xl items-center">
            <div className="w-full h-11 rounded-t-lg bg-gray-200 flex justify-start items-center space-x-1.5 px-3">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
            </div>
            <div className="bg-gray-100 border-t-0 w-full h-fit">
                <video autoPlay={true} playsInline={true} muted={true} className="lp-Hero-video lp-Hero-video--landscape hide-reduced-motion" width="1248" height="735" poster="https://github.githubassets.com/assets/hero-poster-18f705106687.webp"><source src="https://github.githubassets.com/assets/hero-lg-6a98e47708e8.mp4" type="video/mp4; codecs=avc1.4d002a" /></video>
            </div>
        </div>
    )
}

export default BrowserMockup