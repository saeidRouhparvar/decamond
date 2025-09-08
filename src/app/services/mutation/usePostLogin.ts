import axiosApiInstance from "@/app/api/axiosConfig";
import { endpoints } from "@/app/api/configs/mainConfig";
import {  LoginResponseType } from "@/app/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const fetchRandomUser = async (): Promise<LoginResponseType> => {
  const response = await axiosApiInstance.get<LoginResponseType>(endpoints.login);
  return response.data; 
};

export const useFetchRandomUser = () => {
  return useMutation<LoginResponseType, AxiosError, void>({
    mutationFn: fetchRandomUser,
  });
};
