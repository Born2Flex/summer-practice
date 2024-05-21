import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler } from 'chart.js';


ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Filler);


const buildData = ({ chartData }: { chartData: any }) => ({
    type: 'line',
    labels: chartData.labels,
    datasets: [
        {
            label: '',
            data: chartData.data,
            backgroundColor: 'rgb(36, 36, 36)',
            borderColor: 'rgb(36, 36, 36)',
            pointBackgroundColor: 'rgb(36, 36, 36)',
            fill: 'start',
            tension: 0.4,
        },
    ],
});


const StockChart = ({ info }: { info: any }) => {
    const data = buildData(info);

    return (
        <>
            <div className="flex flex-1 bg-gray-100/80 rounded-lg p-4 shadow-xl overflow-hidden w-full md:flex" style={{ maxWidth: '900px' }}>
                <Line data={data} />
            </div>
        </>
    );
};

export default StockChart;