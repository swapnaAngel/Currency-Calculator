import React from 'react'
import { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Line } from "react-chartjs-2";


import revenueData from './data/revenueData.json'
import sourceData from './data/sourceData.json'

defaults.maintainAspectRatio = true; 
defaults.responsive = true;


export default function Graph(props) {


    // date range  

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const [startDateInList, setStartDateInList] = useState('')
    const [endDateInList, setEndDateInList] = useState('')
    const [historicalAmount, setHistoricalAmount] = useState();
    const [historicalBase, setHistoricalBase] = useState();
    const [historicalRates, setHistoricalRates] = useState();
    const [isHistoricalRates, setIsHistoricalRates] = useState(false);


    const [amountInGraph, setAmountInGraph] = useState();
    const [baseInGraph, setBaseInGraph] = useState();
    const [axisInGraph, setAxisInGraph] = useState();
    const [graphXAxis, setGraphXAxis] = useState();
    const [graphYAxis, setGraphYAxis] = useState();


    console.log("....historicalRates...", historicalRates)
    // console.log("setSelectionRangeCom",   {selectionRange}  );
    // console.log("setSelectionRangeCom",   {selectionRange}  );

    useEffect(() => {
        console.log("useEffect running for dateRange...");
    }, [startDateInList])
    useEffect(() => {
        console.log("useEffect running for dateRange...");
    }, [endDateInList])

    const handleSelect = (ranges) => {
        setSelectionRange(ranges.selection);
        console.log("setSelectionRange", ranges.selection);

        const startDateRangePicker = props.handleDateFormat(ranges.selection.startDate);
        setStartDateInList(startDateRangePicker);
        console.log("startDateInList....1...." + startDateRangePicker)

        const endDateRangePicker = props.handleDateFormat(ranges.selection.endDate);
        setEndDateInList(endDateRangePicker);
        console.log("endDateInList....1...." + endDateRangePicker)
    };

    const historicalRatesForDatesGiven = () => {
        var fetchingDateRange = fetch(`https://api.frankfurter.app/${startDateInList}..${endDateInList}`)
        var fetchingDateRangeJson = fetchingDateRange.then((data) => data.json())
        fetchingDateRangeJson.then((data) => {
            console.log("jsondata for dataRange.....", data)
            const valuesOfdateRange = Object.values(data)
            console.log("valuesOfdateRange", valuesOfdateRange)

            const amountForDateRange = valuesOfdateRange[0]
            setHistoricalAmount(amountForDateRange)
            console.log("amountForDateRange", amountForDateRange)

            const baseForDateRange = valuesOfdateRange[1]
            setHistoricalBase(baseForDateRange)
            console.log("baseForDateRange", baseForDateRange)

            const historicalRatesForDateRange = Object.entries(valuesOfdateRange[4])
            setHistoricalRates(historicalRatesForDateRange)
            console.log("historicalRatesForDateRange", historicalRatesForDateRange)

            // {historicalRates.map(([key, value]) => {
            //     setHistoricalRatesKey(key)
            //     console.log("HistoricalRatesKey", historicalRatesKey)
            //     setHistoricalRatesValue(value)
            //     console.log("historicalRatesValue", historicalRatesValue)
            // })}

            var fetchingGraphRange = fetch(`https://api.frankfurter.app/${startDateInList}..${endDateInList}?to=USD`)
            var fetchingGraphRangeJson = fetchingGraphRange.then((data) => data.json())
            fetchingGraphRangeJson.then((data) => {
                console.log("jsondata for graphRange.....", data)
        
                const graphData = Object.entries(data)
                // setHistoricalRates(graphData)
                console.log("graphData", graphData)
        
                const graphDataAmount = graphData[0][1]
                console.log("graphDataAmount", graphDataAmount)
                setAmountInGraph(graphDataAmount)
                console.log("amountInGraph", amountInGraph)
        
                const graphDataBase = graphData[1][1]
                console.log("graphDataBase", graphDataBase)
                setBaseInGraph(graphDataBase)
                console.log("baseInGraph", baseInGraph)
        
        
                const graphDataAxis = Object.entries(graphData[4][1])
                console.log("graphDataAxis", graphDataAxis)
                setAxisInGraph(graphDataAxis)
                console.log("axisInGraph", axisInGraph)

            //     const Axis = () => {
                    
            //      } 
                
                
            //     (graphDataAxis).map(([XAxis, YAxis]) => {
            //          console.log("XAxis", XAxis)
            //         console.log("graphXAxis", graphXAxis)
            //         // setGraphXAxis(XAxis)
            //         // console.log("XAxis", XAxis)
            //         // console.log("graphXAxis", graphXAxis)
            //         setGraphYAxis(YAxis[1])
            //         console.log("YAxis", YAxis)
            //         console.log("graphYAxis", graphYAxis)

            //     }
                   
            //       )}
            // })

            setIsHistoricalRates(!isHistoricalRates)


            
        })
    
    })}

    // const historicalRatesInGraph = () => {
    // var fetchingGraphRange = fetch(`https://api.frankfurter.app/2020-01-01..?to=USD`)
    // var fetchingGraphRangeJson = fetchingGraphRange.then((data) => data.json())
    // fetchingGraphRangeJson.then((data) => {
    //     console.log("jsondata for graphRange.....", data)

    //     const graphData = Object.entries(data)
    //     // setHistoricalRates(graphData)
    //     console.log("graphData", graphData)

    //     const graphDataAmount = graphData[0][1]
    //     console.log("graphDataAmount", graphDataAmount)
    //     setAmountInGraph(graphDataAmount)
    //     console.log("amountInGraph", amountInGraph)

    //     const graphDataBase = graphData[1][1]
    //     console.log("graphDataBase", graphDataBase)
    //     setBaseInGraph(graphDataBase)
    //     console.log("baseInGraph", baseInGraph)


    //     const graphDataAxis = Object.entries(graphData[4][1])
    //     console.log("graphDataAxis", graphDataAxis)
    //     // const graphDataBase = 
    //     // const graphDataXAxis =
    //     // const graphDataYAxis =
    // })
    // }


    return (
        <div>
            <div class="dateRanges">

                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                />
                <div class="dateRangesList">
                    Dates between {startDateInList} and {endDateInList}

                    <button onClick={historicalRatesForDatesGiven}>Historical Rates In Graph</button>
                    {isHistoricalRates && (
                        
                        <>
                         <Line data={{
                        labels: axisInGraph.map(([key, value]) => key),
                        datasets: [
                            {
                                label: "Currency",
                                data: axisInGraph.map(([key, value]) => value.USD),
                                backgroundColor: "rgba(255, 122, 255)",
                                borderColor: "rgba(255, 132, 123)",
                            },
                        ]
                    }}
                    options={{
                        elements: {
                            line: {
                                tension: 0.5
                            }
                        }
                    }}
                    />
                        </>
                    )}

                </div>

            </div>
            {/* <div className='Line-Chart'>
                {isHistoricalRates && (

                   

                )}
            </div> */}
        </div>
    )
}