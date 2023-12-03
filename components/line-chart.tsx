import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface ChartData {
    DATE: string;
    ACTIVE_WALLETS: number;
    // TRANSACTIONS?: number;
}

interface LineChartComponentProps {
    data: ChartData[];
}

const data = [{ "ACTIVE_WALLETS": 158388, "DATE": "13 Nov 23" }, { "ACTIVE_WALLETS": 121116, "DATE": "27 Nov 23" }, { "ACTIVE_WALLETS": 149528, "DATE": "20 Nov 23" }, { "ACTIVE_WALLETS": 7968, "DATE": "09 Oct 23" }, { "ACTIVE_WALLETS": 55267, "DATE": "16 Oct 23" }, { "ACTIVE_WALLETS": 398061, "DATE": "30 Oct 23" }, { "ACTIVE_WALLETS": 548589, "DATE": "06 Nov 23" }, { "ACTIVE_WALLETS": 164205, "DATE": "23 Oct 23" }]

const LChart: React.FC<LineChartComponentProps> = () => {
    // const valueType = data[0].ACTIVE_WALLETS !== undefined ? 'ACTIVE_WALLETS' : 'TRANSACTIONS';
    const valueType = 'ACTIVE_WALLETS'

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="DATE" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={valueType} stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LChart;
