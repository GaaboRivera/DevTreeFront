import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import { getUserByHandle } from '../api/DevTreeAPI';
import HandleData from '../components/HandleData';

export default function HandleView() {
  const params = useParams();
  const handle = params.handle!;

  const { data, isError, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ['handle', handle],
    retry: 1,
  });
  if (isLoading) return <p className="text-center text-white">Cargando...</p>;
  if (isError) return <Navigate to={'/404'} />;

  if (data) return <HandleData data={data} />;
}
