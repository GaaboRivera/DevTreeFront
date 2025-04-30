import { Link } from 'react-router-dom';

export default function LoginView() {
	return (
		<>
			<h1 className="text-4xl font-bold text-white">Iniciar sesión</h1>
			<nav className="mt-10">
				<Link
					className="block text-lg text-center text-white"
					to="/auth/register"
				>
					¿No tienes una cuenta? Crea una aquí
				</Link>
			</nav>
		</>
	);
}
