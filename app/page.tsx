'use client';
import { useEffect, useState } from 'react';
import { loadCSV } from '../utils/dataProcessing';
import Chart from '@/components/Chart';
import { DatePicker } from '@/components/DatePicker';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LogoImage from '../public/logo.png';

interface DataRow {
  time: string;
  value: number;
  color: 'green' | 'red';
}

export default function Home() {
  const [data, setData] = useState<DataRow[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [isNormalized, setIsNormalized] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchData() {
      const csvData = await loadCSV('/Footfall1.csv');
      const processedData = processData(csvData);
      setData(processedData);
    }
    fetchData();
  }, []);

  const processData = (data: { time: string; value: number }[]): DataRow[] => {
    const yearlyAverage =
      data.reduce((sum, row) => sum + row.value, 0) / data.length;

    return data
      .map((row) => ({
        time: row.time,
        value: row.value,
        color: (row.value >= yearlyAverage ? 'green' : 'red') as
          | 'green'
          | 'red',
      }))
      .filter((row) => row.value !== 0); // Filter out rows with value 0
  };

  const filteredData = data.filter((row) => {
    const rowDate = new Date(row.time);
    return (
      (!startDate || rowDate >= startDate) && (!endDate || rowDate <= endDate)
    );
  });

  return (
    <div>
      <Image
        src={LogoImage}
        alt="Logo"
        width={120}
        height={40}
        className="mx-auto"
      />
      <div className="flex mt-2 mb-2 gap-4">
        <Button
          variant={chartType === 'bar' ? 'default' : 'outline'}
          onClick={() => setChartType('bar')}
        >
          Bar Chart
        </Button>
        <Button
          variant={chartType === 'line' ? 'default' : 'outline'}
          onClick={() => setChartType('line')}
        >
          Line Chart
        </Button>
      </div>

      <div className="mb-4 flex items-center">
        <label className="mr-2 mt-2 text-md">Normalized Data:</label>
        <Switch
          checked={isNormalized}
          onCheckedChange={() => setIsNormalized((prev) => !prev)}
          className="cursor-pointer"
        />
      </div>
      <div className="flex space-x-4">
        <label className="flex flex-col">
          Start Date
          <div className="mt-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date ?? null)}
            />
          </div>
        </label>
        <label className="flex flex-col">
          End Date
          <div className="mt-2">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date ?? null)}
            />
          </div>
        </label>
      </div>

      <Chart
        data={filteredData}
        chartType={chartType}
        isNormalized={isNormalized}
      />
    </div>
  );
}
