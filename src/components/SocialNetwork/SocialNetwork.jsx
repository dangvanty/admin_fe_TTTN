import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import socialNetworkApi from '#/api/socialNetworkApi';
import { countPagination, formatDate } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import { add, statusOff, statusOn } from '#/assets/svg/IconSvg';
import Table from '../Table/Table';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function SocialNetwork() {
  const titleTable = [
    { title: 'Mạng xã hội', name: 'name' },
    { title: 'Icon', name: 'icon' },
    { title: 'Thời gian', name: 'time' },
    { title: 'action', name: 'action' },
  ];

  const [data, setdata] = useState(null);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    socialNetworkApi
      .getAll({ page: page })
      .then((ok) => {
        setdata(ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load, page]);
  const history = useNavigate();
  const onchangeEdit = (e) => {
    history(`/admin/SocialNetwork/AddSocialNetwork/${e}`);
  };
  const onchangeDelete = async (e) => {
    await socialNetworkApi.deletesocialNetwork(e);
    setLoad(!load);
  };
  const onchangeStatus = (e, id) => {
    setdata(null);
    if (e === 0) {
      socialNetworkApi.editsocialNetwork({ status: 1, id: id });
    } else {
      socialNetworkApi.editsocialNetwork({ status: 0, id: id });
    }
    setTimeout(() => {
      setLoad(!load);
    }, 500);
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/SocialNetwork">Mạng Xã hội</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Danh sách mạng xã hội</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="add-admin">
          <button>
            <Link to={`/admin/SocialNetwork/AddSocialNetwork`}>
              <div className="icon">{add}</div>
              <div className="text">Thêm mạng xã hội</div>
            </Link>
          </button>
        </div>
        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              onchangeDelete={onchangeDelete}
              onchangeEdit={onchangeEdit}
              urlHistory="/admin/SocialNetwork/AddSocialNetwork"
              dataSource={data.rows.map((ok, index) => ({
                key: ok.id,
                name: ok.name,
                icon: (
                  <div style={{ color: ok.color }}>
                    <div dangerouslySetInnerHTML={{ __html: ok.icon }} />{' '}
                  </div>
                ),
                time: formatDate(ok.createdAt),
                action:
                  ok.status !== 0 ? (
                    <div className="status-icon" onClick={() => onchangeStatus(1, ok.id)}>
                      {statusOn}
                    </div>
                  ) : (
                    <div className="status-icon" onClick={() => onchangeStatus(0, ok.id)}>
                      {statusOff}
                    </div>
                  ),
              }))}
            />
            <Pagination
              onChange={(e, i) => {
                setPage(i);
              }}
              count={countPagination(data.count)}
              color="secondary"
              variant="outlined"
              shape="rounded"
            />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </PageWrapper>
  );
}
