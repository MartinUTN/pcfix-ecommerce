import { useState } from 'react';

// Esta función es un "helper" para navegar a otra página.
// En Astro, las redirecciones se manejan mejor a nivel de página o con JS nativo.
const navigate = (path: string) => {
  window.location.href = path;
};

export default function RegisterForm() {
  // Estados para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('');
  
  // Estados para manejar la comunicación con la API
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // --- Validación de Contraseñas ---
    if (contrasenia !== confirmarContrasenia) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    // --- Conexión con el Backend ---
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          mail,
          contrasenia,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si el servidor devuelve un error (ej: 409 - Conflicto)
        throw new Error(data.error || 'Ocurrió un error al registrar.');
      }
      
      // Si todo sale bien
      setSuccess('¡Registro exitoso! Serás redirigido para iniciar sesión.');
      setTimeout(() => {
        navigate('/login'); // Redirigir al login después de 2 segundos
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
        Crear una Cuenta
      </h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md" role="alert">
          <p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="nombre" className="block text-slate-700 text-sm font-bold mb-2">Nombre</label>
            <input
              type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="apellido" className="block text-slate-700 text-sm font-bold mb-2">Apellido</label>
            <input
              type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="mail" className="block text-slate-700 text-sm font-bold mb-2">Correo Electrónico</label>
          <input
            type="email" id="mail" value={mail} onChange={(e) => setMail(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contrasenia" className="block text-slate-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password" id="contrasenia" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmarContrasenia" className="block text-slate-700 text-sm font-bold mb-2">Confirmar Contraseña</label>
          <input
            type="password" id="confirmarContrasenia" value={confirmarContrasenia} onChange={(e) => setConfirmarContrasenia(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition-transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
          <div className="w-full flex items-center justify-center">
             <div className="flex-grow border-t border-slate-300"></div>
             <span className="flex-shrink mx-4 text-slate-500">o</span>
             <div className="flex-grow border-t border-slate-300"></div>
          </div>
          <a href="/login" className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition-transform hover:scale-105">
            Ya tengo una cuenta
          </a>
        </div>
      </form>
    </div>
  );
}

