import { axiosInstance } from "../../../../config/axiosInstance";

export const getAllEmployees = async () => {
  try {
    const res = await axiosInstance.get("/employee");
    console.log(res);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
