import Papa from 'papaparse';

interface DataRow {
  time: string;
  value: number;
}
export async function loadCSV(filePath: string): Promise<DataRow[]> {
  const response = await fetch(filePath);
  const csvData = await response.text();

  const parsedData = Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  if (parsedData.errors.length) {
    console.error('Error parsing CSV:', parsedData.errors);
    return [];
  }

  return parsedData.data.map((row: any) => {
    return {
      time: row.Time,
      value: Number(row.Value),
    } as DataRow;
  });
}
