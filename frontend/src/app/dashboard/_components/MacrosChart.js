import { PieChart } from "@mantine/charts"
import { useState, useEffect, useMemo } from 'react'
import { Skeleton } from "@mantine/core"

export default function MacrosChart({nutritionData}) {
    const [ showChart, setShowChart ] = useState(false)
    const data = useMemo(() => [
        { name: 'carbohydrates', value: nutritionData.carbohydrates, color: '#cb984d' },
        { name: 'proteins', value: nutritionData.proteins, color: '#4b9068' },
        { name: 'fat', value: nutritionData.fat, color: '#cf6a3d' }
    ], [nutritionData]);
    
    useEffect(() => {
        const totalNutrition = data.reduce((total, current) => total + current.value, 0);
        setShowChart(totalNutrition > 0);
    }, [data]);

    return ( showChart ? <PieChart
                size={320}
                data={data} 
                tooltipDataSource="segment"
                withLabels
                labelsType='percent'
            /> :
            <Skeleton circle height={320} />)
}
