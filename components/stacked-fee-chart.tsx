"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import numeral from 'numeral';
import moment from 'moment';

interface DataProps {
    DATE: string;
    L1_FEE: number;
    L2_FEE: number;
}

type StackedFeeChartProps = {
    data: DataProps[];
};

const StackedFeeChart: React.FC<StackedFeeChartProps> = ({ data }) => {

    const axisLabelStyle = {
        fontSize: '0.8rem' // Adjust the font size as needed
    };

    const toPercent = (decimal: number) => `${(100 * decimal).toLocaleString()}%`;

    const formatDate = (date: string) => {
        return moment(date, 'YY-MM-DD').format('DD-MMM-YY');
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                height={300}
                data={data}
                stackOffset="expand"
                barCategoryGap={0}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="DATE" tick={{ style: axisLabelStyle }} tickFormatter={formatDate} />
                <YAxis tick={{ style: axisLabelStyle }} tickFormatter={toPercent} />
                <Tooltip />
                <Legend />
                <Bar dataKey="L1_FEE" stackId="a" fill="#8884d8" />
                <Bar dataKey="L2_FEE" stackId="a" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StackedFeeChart;