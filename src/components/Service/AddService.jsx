import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import ServiceApi from '#/api/ServiceApi';
import Spinner from '../Spin/Spinner';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
import { act } from 'react-dom/test-utils';
import { Link } from 'react-router-dom';

export default function AddService() {
  const [icon, setIcon] = useState('');
  const [inputIcon, setinputIcon] = useState('');

  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
  });
  const { loadSpin } = state;

  const handleChangeInput = (e) => {
    setinputIcon(e.target.value);
    setIcon(inputIcon);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (id) {
      ServiceApi.getOne(id).then((ok) => {
        reset(ok);
        setIcon(ok.icon);
      });
    }
  }, []);
  const history = useNavigate();
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    if (id) {
      await ServiceApi.editService({
        name: data.name,
        icon: data.icon,
        description: data.description,
        id: id,
      });
    } else {
      await ServiceApi.postService({
        name: data.name,
        icon: data.icon,
        description: data.description,
        status: 0,
      });
    }
    history('/Admin/Service');
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Service">Dịch vụ</BreadcrumbsItem>
      <BreadcrumbsItem to="/admin/Service/addService">{id ? `Sửa dịch vụ : ${id}` : 'Thêm dịch vụ'}</BreadcrumbsItem>
      <div className="CreateAdmin">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3> {id ? 'Sửa dịch vụ' : 'Thêm dịch vụ'}</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-admin">
            <label htmlFor="">Tên dịch vụ</label>
            <input type="text" {...register('name', { required: 'Không được bỏ trống' })} />
            {errors.name && <span className="text-danger">{errors.name.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">
              Icon dịch vụ{' '}
              <span style={{ color: '#637381' }}>
                (tham khảo tại:{' '}
                <Link to="https://www.svgrepo.com/" target="_blank">
                  https://www.svgrepo.com/
                </Link>{' '}
                )
              </span>
            </label>
            <input
              type="text"
              onKeyDown={handleChangeInput}
              {...register('icon', {
                required: 'Không được bỏ trống',
                maxLength: { value: 2000, message: 'Vượt quá ký tự cho phép' },
              })}
            />
            {errors.icon && <span className="text-danger">{errors.icon.message}</span>}
          </div>
          {id ? <div style={{ width: '30px' }} dangerouslySetInnerHTML={{ __html: icon }} /> : ''}
          <div className="input-admin">
            <label htmlFor="">Mô tả dịch vụ</label>
            <textarea
              name=""
              id=""
              rows="5"
              {...register('description', {
                required: 'Không được bỏ trống',
                maxLength: { value: 1000, message: 'Vượt quá ký tự cho phép' },
              })}
            ></textarea>

            {errors.description && <span className="text-danger">{errors.description.message}</span>}
          </div>
          <div className="btn_submit">
            {loadSpin ? (
              <Spinner />
            ) : id ? (
              <input type="submit" value="Sửa dịch vụ" />
            ) : (
              <input type="submit" value="Thêm mới" />
            )}
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
