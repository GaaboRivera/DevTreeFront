import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route>
					<Route path="/auth/login" element={<LoginView />}></Route>
					<Route path="/auth/register" element={<RegisterView />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
