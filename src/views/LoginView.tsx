import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { LoginForm } from '../types';
import api from '../config/axios';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

export default function LoginView() {
  const navigate = useNavigate();

  const initialValues: LoginForm = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post(`/auth/login`, formData);
      localStorage.setItem('AUTH_TOKEN', data);
      navigate('/admin');
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-white">Iniciar sesión</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="px-5 py-20 mt-10 space-y-10 bg-white rounded-lg"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register('email', {
              required: 'El Email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'E-mail no válido',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register('password', {
              required: 'El Password es obligatorio',
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="w-full p-3 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600"
          value="Iniciar Sesión"
        />
      </form>

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
