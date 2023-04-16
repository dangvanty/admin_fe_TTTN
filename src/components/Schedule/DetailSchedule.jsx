import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import scheduleApi from '#/api/ScheduleApi';
import Spinner from '../Spin/Spinner';
import '#/assets/scss/ScheduleDetail.scss';
import { formatDate } from '#/helper/sub-function';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function ScheduleDetail() {
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    scheduleApi
      .getOne(id)
      .then((ok) => {
        console.log('ok', ok);
        setSchedule(ok);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Schedule">Đặt lịch</BreadcrumbsItem>
      <BreadcrumbsItem to={`/admin/Schedule/DetailSchedule/${id}1`}>Chi tiết đặt lịch : {id}</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Chi tiết đặt lịch</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="bill-detail">
          {schedule ? (
            <div className="container">
              <div className="schedule-detail">
                <div className="title">Loại dịch vụ: {schedule.typeService}</div>
                <div className="form">
                  <p>
                    <div className="text-bold">Tên khách hàng</div>: {schedule.name}
                  </p>
                  <p>
                    <div className="text-bold">Số điện thoại</div>: {schedule.phone}
                  </p>
                  <p>
                    <div className="text-bold">Địa chỉ</div>: {schedule.address}
                  </p>
                  <p>
                    <div className="text-bold">Loại thú cưng</div>: {schedule.typePet}
                  </p>
                  <p>
                    <div className="text-bold">Cân nặng</div>: {schedule.typeWeight}
                  </p>
                  <p>
                    <div className="text-bold">Thời gian</div>: {schedule.time}
                  </p>
                  <p>
                    <div className="text-bold">Ngày đặt</div>: {formatDate(schedule.date)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
