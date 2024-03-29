import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../chart';
import { useEffect, useState } from 'react';
import statisticalApi from '#/api/statistical';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.array,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteVisits({ handleYear, title, subheader, chartLabels, chartData, ...other }) {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        },
      },
    },
  });
  const [valueYear, setValueYear] = useState(null);
  useEffect(() => {
    statisticalApi.getAllYear().then((data) => {
      let arr = [];
      data.forEach((el) => {
        arr.push(el.year);
      });
      setValueYear(arr);
    });
  }, []);

  return (
    <Card {...other}>
      <CardHeader title={title} />
      <div style={{ marginLeft: '15px' }}>
        Năm
        <select onClick={(e) => handleYear(e.target.value)}>
          {valueYear && valueYear?.map((year) => <option value={year}>{year}</option>)}
        </select>
      </div>

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
