import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import socialNetworkApi from '#/api/socialNetworkApi';
import Spinner from '../Spin/Spinner';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
import { Link } from 'react-router-dom';

export default function AddSocialNetwork() {
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
  });
  const { loadSpin } = state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (id) {
      socialNetworkApi.getOne(id).then((ok) => {
        reset(ok);
      });
    }
  }, []);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    if (id) {
      await socialNetworkApi.editsocialNetwork({
        name: data.name,
        icon: data.icon,
        color: data.color,
        link: data.link,
        id: id,
      });
    } else {
      await socialNetworkApi.postsocialNetwork({
        name: data.name,
        icon: data.icon,
        color: data.color,
        link: data.link,
        status: 0,
      });
    }
    navigate('/Admin/SocialNetwork');
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/SocialNetwork">Mạng xã hội</BreadcrumbsItem>
      <BreadcrumbsItem to="/admin/SocialNetwork/AddSocialNetwork">
        {id ? `Sửa mạng xã hội : ${id}` : 'Thêm mạng xã hội'}
      </BreadcrumbsItem>
      <div className="CreateAdmin">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>{id ? `Sửa mạng xã hội` : 'Thêm mạng xã hội'}</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-admin">
            <label htmlFor="">Tên mạng xã hội</label>
            <input
              type="text"
              {...register('name', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 255, message: 'Vượt quá ký tự cho phép!' },
              })}
            />
            {errors.name && <span className="text-danger">{errors.name.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">
              icon{' '}
              <span style={{ color: '#637381' }}>
                (tham khảo tại:{' '}
                <Link to="https://www.svgrepo.com/" target="_blank">
                  https://www.svgrepo.com/
                </Link>
                )
              </span>
            </label>
            <input
              type="text"
              {...register('icon', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 2000, message: 'Vượt quá ký tự cho phép!' },
              })}
            />
            {errors.icon && <span className="text-danger">{errors.icon.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">Link liên kết</label>
            <input
              type="text"
              {...register('link', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 500, message: 'Vượt quá ký tự cho phép!' },
              })}
            />
            {errors.link && <span className="text-danger">{errors.link.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">
              Màu sắc{' '}
              <span style={{ color: '#637381' }}>
                (tham khảo tại:{' '}
                <Link to="https://flatuicolors.com/" target="_blank">
                  https://flatuicolors.com/
                </Link>
                )
              </span>
            </label>
            <input
              type="text"
              {...register('color', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 500, message: 'Vượt quá ký tự cho phép!' },
              })}
            />
            {errors.color && <span className="text-danger">{errors.color.message}</span>}
          </div>
          <div className="btn_submit">
            {loadSpin ? (
              <Spinner />
            ) : id ? (
              <input type="submit" value="Sửa socialNetwork" />
            ) : (
              <input type="submit" value="Thêm mới" />
            )}
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
