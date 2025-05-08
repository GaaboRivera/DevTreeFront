import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileForm, User } from '../types';
import { updateProfile, uploadImage } from '../api/DevTreeAPI';
import { toast } from 'sonner';

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(['user'])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], (prevData: User) => {
        return {
          ...prevData,
          image: data.image,
        };
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleUserProfileForm = (formData: ProfileForm) => {
    const user: User = queryClient.getQueryData(['user'])!;
    user.description = formData.description;
    user.handle = formData.handle;
    updateProfileMutation.mutate(user);
  };

  return (
    <form
      className="p-10 space-y-5 bg-white rounded-lg"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-center text-slate-800">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="p-2 border-none rounded-lg bg-slate-100"
          placeholder="handle o Nombre de Usuario"
          {...register('handle', {
            required: 'El nombre de usuario es obligatorio',
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="p-2 border-none rounded-lg bg-slate-100"
          placeholder="Tu Descripción"
          {...register('description')}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="p-2 border-none rounded-lg bg-slate-100"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="w-full p-2 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600"
        value="Guardar Cambios"
      />
    </form>
  );
}
