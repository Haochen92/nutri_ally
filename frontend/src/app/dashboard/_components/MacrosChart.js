import { PieChart } from "@mantine/charts"
import { useState, useEffect, useMemo } from 'react'
import { Skeleton } from "@mantine/core"

export default function MacrosChart({nutritionData}) {
    const [ showChart, setShowChart ] = useState(false)
    const data = useMemo(() => [
        { name: 'carbohydrates', value: nutritionData.carbohydrates, color: 'brown' },
        { name: 'proteins', value: nutritionData.proteins, color: 'orange' },
        { name: 'fat', value: nutritionData.fat, color: 'yellow' }
    ], [nutritionData]);
    
    useEffect(() => {
        const totalNutrition = data.reduce((total, current) => total + current.value, 0);
        setShowChart(totalNutrition > 0);
    }, [data]);

    return ( showChart ? <PieChart
                size={400}
                data={data} 
                tooltipDataSource="segment"
                withLabels
                labelsType='percent'
            /> :
            <Skeleton circle='true' height={400} />)
}