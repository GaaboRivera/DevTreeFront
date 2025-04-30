import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export default function AuthLayout() {
	return (
		<>
			<Toaster richColors position="top-right" />
			<div className="min-h-screen bg-slate-800">
				<div className="max-w-lg px-5 pt-10 mx-auto">
					<img src="/logo.svg" alt="Logotipo" />
					<div className="py-10">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}
