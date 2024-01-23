"use client";

import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import numeral from 'numeral';
import { TooltipProps } from 'recharts';

type DataItem = {
    [key: string]: string;
};

interface LineChartProps {
    data: DataItem[];
    yaxis: string;
    usd: boolean;
    fill: string;
}

const formatDate = (date: string) => {
    return moment(date, 'YY-MM-DD').format('DD-MMM-YY');
};

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
                <p className="label">{`${moment(label, 'YY-MM-DD').format('DD-MMM-YY')}`}</p>
                <p style={{ color: '#8884d8' }}>{`VALUE: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const BarChartEcon: React.FC<LineChartProps> = ({ data, yaxis, usd, fill }) => {

    const transformedData = data.map(item => ({
        ...item,
        [yaxis]: parseFloat(item[yaxis])
    }));
    // console.log(data)

    const formatYAxisTick = (value: number) => {
        return numeral(value).format('0a'); // Formats the tick value
    };

    const axisLabelStyle = {
        fontSize: '0.8rem' // Adjust the font size as needed
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="DATE" tick={{ style: axisLabelStyle }} tickFormatter={formatDate} />
                <YAxis
                    domain={[0, 'dataMax']}
                    tick={{ style: axisLabelStyle }}
                    tickFormatter={(value) =>
                        usd ? `$${formatYAxisTick(value)}` : formatYAxisTick(value)
                    }

                />
                <Tooltip />
                <Bar type="monotone" dataKey={yaxis} fill={fill} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartEcon;