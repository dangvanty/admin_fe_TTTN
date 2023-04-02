import { messageShowErr, messageShowSuccess } from '#/helper/sub-function';
import axiosClient from './axiosClient';

class CategoryApi {
  getAll = (params) => {
    const url = '/categories';
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/categories/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postcategory = (params) => {
    const url = '/categories';
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess('Thêm mới thành công!');
      })
      .catch((err) => {
        messageShowErr('Có lỗi xảy ra!');
      });
  };
  deletecategory = (id) => {
    const url = `/categories/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess('Xoá thành công!');
      })
      .catch((err) => {
        messageShowErr('Có lỗi xảy ra!');
      });
  };
  editcategory = (params) => {
    const url = `/categories/${params.id}`;
    return axiosClient
      .patch(url, params)
      .then((data) => {
        messageShowSuccess('Sửa thành công!');
      })
      .catch((err) => {
        messageShowErr('Có lỗi xảy ra!');
      });
  };
}
const categoryApi = new CategoryApi();
export default categoryApi;
