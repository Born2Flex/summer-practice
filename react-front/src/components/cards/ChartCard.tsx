import StockChart from '../elements/StockChart'

const data = {
    stockFullName: "SW Limited.",
    stockShortName: "ASX:SFW",
    price: {
        current: 2.32,
        open: 2.23,
        low: 2.215,
        high: 2.325,
        cap: 93765011,
        ratio: 20.1,
        dividend: 1.67,
    },
    chartData: {
        labels: [
            "10:00",
            "",
            "",
            "",
            "12:00",
            "",
            "",
            "",
            "2:00",
            "",
            "",
            "",
            "4:00",
        ],
        data: [
            2.23,
            2.215,
            2.22,
            2.25,
            2.245,
            2.27,
            2.28,
            2.29,
            2.3,
            2.29,
            2.325,
            2.325,
            2.32,
        ],
    },
};


function ChartCard() {
    return (
        <div className="flex w-11/12 p-8 self-center bg-gray-100/70 my-6 rounded-lg">

            <StockChart info={data} />
            <div className='w-1/3 p-6'>
                <h2 className="text-5xl font-bold mb-6">Great user rates</h2>
                <p className="text-3xl mb-4">Our platform's user base grows every minute!</p>
                <p>Eventify has experienced significant growth in recent years, driven by several key factors:</p>
                <ul className="max-w-md mt-3 text-start space-y-1 list-disc list-inside">
                    <li><strong>Rapid User Base Expansion</strong></li>
                    <li><strong>User-Friendly Inteface</strong></li>
                    <li><strong>Ultimate Global Reach</strong></li>
                    <li><strong>Partnership Developments</strong></li>
                </ul>
            </div>
        </div>

    )
}

export default ChartCard