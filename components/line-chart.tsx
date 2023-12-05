"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { TooltipProps } from 'recharts';

type DataItem = {
    DATE: string;
    ACTIVE_WALLETS?: number;
    TRANSACTIONS?: number;
};

interface LineChartProps {
    data: DataItem[];
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

const LChart: React.FC<LineChartProps> = ({ data }) => {
    // Determine the key for the data (either ACTIVE_WALLETS or TRANSACTIONS)
    const dataKey = data[0]?.ACTIVE_WALLETS !== undefined ? 'ACTIVE_WALLETS' : 'TRANSACTIONS';

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="DATE" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />

                {/* <Legend /> */}
                <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LChart;