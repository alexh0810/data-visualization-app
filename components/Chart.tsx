// components/Chart.tsx
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

interface DataRow {
  time: string;
  value: number;
  color: 'green' | 'red';
}

interface ChartProps {
  data: DataRow[];
  chartType: 'bar' | 'line';
  isNormalized: boolean;
}

const Chart: React.FC<ChartProps> = ({ data, chartType, isNormalized }) => {
  const normalizedData = isNormalized ? normalizeData(data) : data;
  console.log(chartType);

  const chartData = {
    labels: normalizedData.map((row) => new Date(row.time)),
    datasets: [
      {
        label: 'Value',
        data: normalizedData.map((row) => row.value),
        backgroundColor: normalizedData.map((row) =>
          row.color === 'green'
            ? 'rgba(0, 255, 0, 0.6)'
            : 'rgba(255, 0, 0, 0.6)'
        ),
        borderColor: normalizedData.map((row) =>
          row.color === 'green' ? 'rgba(0, 255, 0, 1)' : 'rgba(255, 0, 0, 1)'
        ),
        borderWidth: 1,
        fill: chartType === 'line',
      },
    ],
  };

  // Bar chart options
  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy-MM-dd',
          displayFormats: {
            day: 'yyyy MMM dd',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 4,
      },
    },

    plugins: {
      legend: {
        labels: {
          boxWidth: 20,
          boxHeight: 20,
          color: 'black',
          generateLabels: (chart) => {
            const legendItems: {
              text: string;
              fillStyle: string;
              strokeStyle: string;
              lineWidth: number;
            }[] = [];

            chart.data.datasets.forEach((dataset) => {
              const colors = dataset.backgroundColor as string[];
              const fillColors = new Set(colors);
              const strokeColors = new Set(dataset.borderColor as string[]);

              if (
                fillColors.has('rgba(0, 255, 0, 0.6)') &&
                fillColors.has('rgba(255, 0, 0, 0.6)')
              ) {
                legendItems.push({
                  text: 'Value under yearly average',
                  fillStyle: 'rgba(0, 255, 0, 0.6)',
                  strokeStyle: 'rgba(0, 255, 0, 1)',
                  lineWidth: 2,
                });
                legendItems.push({
                  text: 'Value above yearly average',
                  fillStyle: 'rgba(255, 0, 0, 0.6)',
                  strokeStyle: 'rgba(255, 0, 0, 1)',
                  lineWidth: 2,
                });
              } else {
                const color = fillColors.has('rgba(0, 255, 0, 0.6)')
                  ? 'green'
                  : 'red';
                const backgroundColor =
                  color === 'green'
                    ? 'rgba(0, 255, 0, 0.6)'
                    : 'rgba(255, 0, 0, 0.6)';
                const borderColor =
                  color === 'green'
                    ? 'rgba(0, 255, 0, 1)'
                    : 'rgba(255, 0, 0, 1)';

                legendItems.push({
                  text: `${color.charAt(0).toUpperCase() + color.slice(1)}`,
                  fillStyle: backgroundColor,
                  strokeStyle: borderColor,
                  lineWidth: 2,
                });
              }
            });

            return legendItems;
          },
        },
      },
    },
  };

  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
          displayFormats: {
            day: 'MMM dd',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    plugins: {
      legend: {
        labels: {
          boxWidth: 20,
          boxHeight: 20,
          color: 'black',
          generateLabels: (chart) => {
            const legendItems: {
              text: string;
              fillStyle: string;
              strokeStyle: string;
              lineWidth: number;
            }[] = [];

            chart.data.datasets.forEach((dataset) => {
              const colors = dataset.backgroundColor as string[];
              const fillColors = new Set(colors);
              const strokeColors = new Set(dataset.borderColor as string[]);

              if (
                fillColors.has('rgba(0, 255, 0, 0.6)') &&
                fillColors.has('rgba(255, 0, 0, 0.6)')
              ) {
                legendItems.push({
                  text: 'Value under yearly average',
                  fillStyle: 'rgba(0, 255, 0, 0.6)',
                  strokeStyle: 'rgba(0, 255, 0, 1)',
                  lineWidth: 2,
                });
                legendItems.push({
                  text: 'Value above yearly average',
                  fillStyle: 'rgba(255, 0, 0, 0.6)',
                  strokeStyle: 'rgba(255, 0, 0, 1)',
                  lineWidth: 2,
                });
              } else {
                const color = fillColors.has('rgba(0, 255, 0, 0.6)')
                  ? 'green'
                  : 'red';
                const backgroundColor =
                  color === 'green'
                    ? 'rgba(0, 255, 0, 0.6)'
                    : 'rgba(255, 0, 0, 0.6)';
                const borderColor =
                  color === 'green'
                    ? 'rgba(0, 255, 0, 1)'
                    : 'rgba(255, 0, 0, 1)';

                legendItems.push({
                  text: `${color.charAt(0).toUpperCase() + color.slice(1)}`,
                  fillStyle: backgroundColor,
                  strokeStyle: borderColor,
                  lineWidth: 2,
                });
              }
            });

            return legendItems;
          },
        },
      },
    },
  };

  return (
    <div>
      {chartType === 'bar' ? (
        <Bar data={chartData} options={barOptions} />
      ) : (
        <Line data={chartData} options={lineOptions} />
      )}
    </div>
  );
};

const normalizeData = (data: DataRow[]): DataRow[] => {
  const maxValue = Math.max(...data.map((row) => row.value));
  const normalizedData = data.map((row) => {
    const normalizedValue = (row.value / maxValue) * 100;
    const color: 'green' | 'red' = normalizedValue >= 50 ? 'green' : 'red';
    return {
      time: row.time,
      value: normalizedValue,
      color,
    };
  });
  return normalizedData;
};

export default Chart;
