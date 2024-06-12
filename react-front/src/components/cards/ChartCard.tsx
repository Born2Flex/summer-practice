import StockChart from '../elements/StockChart'
import BarChart from '../elements/BarChart'

//ChartCard component, displays the chart card with the stock chart and bar chart
function ChartCard() {
    return (
        <div className="flex flex-col gap-y-6 w-11/12 p-8 self-center bg-gray-100/70 my-6 rounded-lg">

            <div className='flex w-full'>
                <StockChart />
                <div className='w-1/3 p-6'>
                    <h2 className="text-5xl font-bold mb-6">Rapid Growth</h2>
                    <p className="text-3xl mb-4">Our platform's fanbase grows every minute!</p>
                    <p>Eventify has experienced significant growth in recent years, driven by several key factors:</p>
                    <ul className="max-w-md hidden lg:block mt-3 text-start space-y-1 list-disc list-inside">
                        <li><strong>Faster and more convenient usage</strong></li>
                        <li><strong>More events and activities</strong></li>
                        <li><strong>Ability to create private events</strong></li>
                        <li><strong>Faster technical support</strong></li>
                        <li><strong>User-Friendly Inteface</strong></li>
                        <li><strong>Ultimate Global Reach</strong></li>
                        <li><strong>Partnership Developments</strong></li>
                    </ul>
                </div>
            </div>
            <div className='flex w-full'>
                <div className='w-1/2 p-6'>
                    <h2 className="text-5xl font-bold mb-6">Eventify whole year round!</h2>
                    <p className="text-3xl mb-4">You will find something interesting at any time</p>
                    <p className='text-lg mt-10 hidden lg:block'>Our platform motivates uers to organize events regardless of the season. Creators of winter events earn <span className='font-semibold'>eventy-points</span> and have a
                        chance to win a prize. They also can spend these points on the platform to get access to paid events for free.
                        That's why we have a wide range of events available to our users throughout the year.
                    </p>
                </div>
                <BarChart />
            </div>
        </div>

    )
}

export default ChartCard