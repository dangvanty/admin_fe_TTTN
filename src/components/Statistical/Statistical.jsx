import PageWrapper from '#/PageWrapper';
import { Grid } from '@material-ui/core';
import { Container } from '@mui/material';
import React from 'react';
import AppWidgetSummary from './sub-componentStatistical/AppWidgetSummary';
import AppWebsiteVisits from './sub-componentStatistical/AppWebsiteVisits';
import { useTheme } from '@mui/material/styles';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
import { bills, cat, news, product, schedule, useCheck } from '#/assets/svg/IconSvg';
import AppCurrentVisits from './sub-componentStatistical/AppCurrentVisits';
import { useState } from 'react';
import { useEffect } from 'react';
import statisticalApi from '#/api/statistical';
export default function Statistical() {
  const theme = useTheme();
  const style = {
    width: '100%',
    display: 'flex',
    gap: '10px',
    padding: '10px',
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(33, 43, 54)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundImage: 'none',
    overFlow: 'hidden',
    boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
    borderRadius: '12px',
    position: 'relative',
    zIndex: 0,
    marginTop: '40px',
  };
  const [allTotalData, setAllTotalData] = useState(null);
  const [revenueCus, setRevenueCus] = useState([{ label: '', value: '' }]);

  const handleYear = (year) => {
    console.log('year:::', +year);
  };

  useEffect(() => {
    statisticalApi.getAllTotal().then((data) => {
      setAllTotalData(data);
    });
    statisticalApi.getAllRevenueCustomer().then((data) => {
      const formatArr = [];
      data.forEach((el) => {
        const item = {};
        item.label = el?.User?.firstName + ' ' + el?.User?.lastName;
        item.value = el?.total_price;
        formatArr.push(item);
      });
      setRevenueCus(formatArr);
    });
  }, []);

  console.log('data::::', allTotalData);
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/">Thống kê</BreadcrumbsItem>
      <Container maxWidth="xl">
        <Breadcrumb />
        <Grid container spacing={3}>
          <div style={style}>
            <Grid item xs={12} sm={6} md={2}>
              <AppWidgetSummary title="Người dùng" total={allTotalData?.user?.total || 0} icon={useCheck} />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <AppWidgetSummary
                title="Sản phẩm"
                total={allTotalData?.product?.total || 0}
                color="info"
                icon={product}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <AppWidgetSummary title="Thú cưng" total={allTotalData?.product?.total || 0} color="warning" icon={cat} />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <AppWidgetSummary title="Hóa đơn" total={allTotalData?.order?.total || 0} color="error" icon={bills} />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <AppWidgetSummary
                title="Đặt lịch"
                total={allTotalData?.schedules?.total || 0}
                color="primary"
                icon={schedule}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <AppWidgetSummary title="Tin tức" total={allTotalData?.news?.total} color="error" icon={news} />
            </Grid>
          </div>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Thống kê số lượng bán "
              subheader="năm 2023"
              handleYear={handleYear}
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Sản phẩm',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Dịch vụ',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Thú cưng',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Thống kê doanh thu theo khách hàng"
              subheader=""
              chartData={revenueCus}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}
