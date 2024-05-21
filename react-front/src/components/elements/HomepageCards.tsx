import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';


ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);
const formatter = (number: number) => (number > 999999 ? (number / 1000000).toFixed(1) + 'M' : number);

const buildData = ({ chartData }: { chartData: any }) => ({
    type: 'line',
    labels: chartData.labels,
    datasets: [
        {
            label: '',
            data: chartData.data,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 1)',
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            labelsColor: 'rgba(255, 255, 255, 1)',
            fill: 'start',
            tension: 0.4,
        },
    ],
});



// const numberToFix = (number: any, fix: number) => (number || 0).toFixed(fix);

const StockChart = ({ info }: { info: any }) => {
    const data = buildData(info);

    return (
        <>
            <div className="rounded shadow-xl overflow-hidden w-full md:flex" style={{ maxWidth: '900px' }}>
                {/* <div className="flex w-full md:w-1/2 px-5 pb-4 pt-8 bg-indigo-500 text-white items-center"> */}
                <Line data={data} />
                {/* </div> */}

            </div>
        </>
    );
};

export default StockChart;