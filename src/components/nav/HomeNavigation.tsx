import { Link } from 'react-router-dom';

export default function HomeNavigation() {
  return (
    <>
      <Link
        to={'/auth/login'}
        className="p-2 text-xs font-black text-white uppercase cursor-pointer"
      >
        Iniciar Sesión
      </Link>
      <Link
        to={'/auth/register'}
        className="p-2 text-xs font-black uppercase rounded-lg cursor-pointer bg-lime-500 text-slate-800"
      >
        Registrarme
      </Link>
    </>
  );
}
