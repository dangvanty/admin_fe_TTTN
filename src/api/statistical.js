import axiosClient from './axiosClient';

class Statistical {
  getAllTotal = () => {
    const url = '/statistical';
    return axiosClient.get(url).then((res) => {
      return res;
    });
  };

  getAllRevenueCustomer = () => {
    const url = '/statistical/revenue';
    return axiosClient.get(url).then((res) => {
      return res.result;
    });
  };
  getAllQuantityByTime = (params) => {
    const url = '/statistical/quantity';
    return axiosClient.get(url, { params }).then((res) => {
      return res;
    });
  };
}

const statisticalApi = new Statistical();
export default statisticalApi;
