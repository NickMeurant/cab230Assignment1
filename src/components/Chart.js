import { height } from "@mui/system";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

export default function BarChart(props) {
    const data = {
        labels: ['5km', '10km', '30km',
            '100km'],
        datasets: [
            {
                label: 'Population',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: props.data
            }
        ]
    }

    return (
        <Bar
            data={data}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: 'Population Around Volcano',
                        fontSize: 20,
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                },
                legend: {
                    display: true,
                    position: 'right'
                },
                scales: {
                    yAxes: {
                        type: 'logarithmic',
                        position: 'left', // `axis` is determined by the position as `'y'`
                    },

                }
            }}
        />
    );
};