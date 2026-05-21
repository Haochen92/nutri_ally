import { PieChart } from '@mantine/charts';
import { useState, useEffect, useMemo } from 'react';
import { Skeleton } from '@mantine/core';

interface MacrosChartProps {
  nutritionData: Record<string, number>;
}

export default function MacrosChart({ nutritionData }: MacrosChartProps) {
  const [showChart, setShowChart] = useState(false);

  const data = useMemo(() => [
    { name: 'carbohydrates', value: nutritionData.carbohydrates, color: '#cb984d' },
    { name: 'proteins', value: nutritionData.proteins, color: '#4b9068' },
    { name: 'fat', value: nutritionData.fat, color: '#cf6a3d' },
  ], [nutritionData]);

  useEffect(() => {
    const total = data.reduce((sum, current) => sum + current.value, 0);
    setShowChart(total > 0);
  }, [data]);

  return showChart ? (
    <PieChart
      size={260}
      data={data}
      tooltipDataSource="segment"
      withLabels
      labelsType="percent"
    />
  ) : (
    <Skeleton circle height={260} />
  );
}
