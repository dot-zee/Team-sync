import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../api/employeesApi";

export const useEmployees = () => {
  const { data, isPending } = useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
    staleTime: 10000, // staleTime is set to 10 seconds, meaning the data will be considered fresh for 10 seconds before it needs to be refetched, meaning that if the data is requested again within 10 seconds, it will return the cached data instead of making a new API call. This can help reduce unnecessary network requests and improve performance. If set to infinity, the data will never be considered stale and will always be returned from the cache, which can be useful for data that doesn't change frequently. If set to 0, the data will always be considered stale and will always be refetched from the API, which can be useful for data that changes frequently. The default value is 0.
  });

  return {
    data,
    isPending,
  };
};
