import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import categoryApi from '#/api/CategoryApi';
import { storage } from '#/helper/firebase';
import { messageShowErr } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import { camera } from '#/assets/svg/IconSvg';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
import '#/assets/scss/PublicAdmin.scss';
export default function AddCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
    linkImg: '',
    nameImg: '',
    img: '',
    imgId: '',
  });
  const { loadSpin, linkImg, nameImg, img, imgId } = state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      nameImg: e.target.files[0].name,
      img: e.target.files[0],
    });
  };

  useEffect(() => {
    if (id) {
      categoryApi.getOne(id).then((ok) => {
        reset(ok);
        setState({
          ...state,
          imgId: ok.avatar,
        });
      });
    }
  }, []);
  const onSubmit = async (data) => {
    if (img === '' && imgId === '') {
      messageShowErr('Chưa có ảnh!');
    } else {
      setState({ ...state, loadSpin: true });
      if (id) {
        if (img !== '') {
          await storage.ref(`imagesCategory/${img.name}`).put(img);
          const anh = await storage.ref('imagesCategory').child(img.name).getDownloadURL();
          await categoryApi.editcategory({
            name: data.name,
            description: data.description,
            avatar: anh,
            id: id,
          });
        } else {
          await categoryApi.editcategory({
            name: data.name,
            description: data.description,
            id: id,
          });
        }
      } else {
        await storage.ref(`imagesCategory/${img.name}`).put(img);
        const anh = await storage.ref('imagesCategory').child(img.name).getDownloadURL();
        await categoryApi.postcategory({
          name: data.name,
          description: data.description,
          avatar: anh,
          status: 0,
        });
      }

      navigate('/admin/Category');
    }
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Category">Danh mục sản phẩm</BreadcrumbsItem>
      <BreadcrumbsItem to={`/admin/Category/AddCategory`}>
        {id ? `Sửa danh mục sản phẩm : ${id}` : 'Thêm danh mục sản phẩm'}
      </BreadcrumbsItem>
      <div className="CreateAdmin">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>{id ? 'Sửa danh mục sản phẩm' : 'Thêm danh mục sản phẩm'}</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-admin">
            <label htmlFor="">Tên danh mục</label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 255, message: 'Nhập quá ký tự cho phép!' },
              })}
            />
            {errors.name && <span className="text-danger">{errors.name.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">Ảnh đại diện</label>
            <div className="update">
              <div className="icon-avatar">
                <label htmlFor="avatar">{camera}</label>
                <input type="file" name="" id="avatar" hidden onChange={hangdelimage} />
              </div>
              {linkImg ? (
                <img src={linkImg} className="img-update" height="150px" width="250px" alt="" />
              ) : imgId ? (
                <img src={imgId} className="img-update" height="150px" width="250px" alt="" />
              ) : (
                ''
              )}
              <br />
              <span>{nameImg}</span>
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">Mô tả</label>
            <textarea
              name=""
              id="description"
              rows="5"
              {...register('description', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 500, message: 'Nhập quá ký tự cho phép!' },
              })}
            ></textarea>
            {errors.description && <span className="text-danger">{errors.description.message}</span>}
          </div>

          <div className="btn_submit">
            {loadSpin ? (
              <Spinner />
            ) : id ? (
              <input type="submit" value="Sửa danh mục" />
            ) : (
              <input type="submit" value="Thêm mới" />
            )}
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
