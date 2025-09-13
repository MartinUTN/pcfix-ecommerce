import { useState } from 'react';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    
    setIsLoading(true);

    // --- Lógica de Conexión con el Backend (a implementar) ---
    // Simulamos una llamada para registrar al usuario.
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulación de éxito
    alert(`¡Registro exitoso para ${name}! Ahora serás redirigido para iniciar sesión.`);
    window.location.href = '/login';

    setIsLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">Crear Cuenta</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Nombre Completo
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Juan Pérez"
          />
        </div>
        <div>
          <label htmlFor="email-register" className="block text-sm font-medium text-slate-700">
            Correo Electrónico
          </label>
          <input
            id="email-register"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label htmlFor="password-register" className="block text-sm font-medium text-slate-700">
            Contraseña
          </label>
          <input
            id="password-register"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mínimo 6 caracteres"
          />
        </div>
         <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700">
            Confirmar Contraseña
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Repite tu contraseña"
          />
        </div>
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 transition-colors"
          >
            {isLoading ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </div>
      </form>
      
      {/* Separador y botón de acción para iniciar sesión */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-slate-500">¿Ya tienes una cuenta?</span>
          </div>
        </div>

        <div className="mt-6">
          <a
            href="/login"
            className="w-full flex items-center justify-center px-8 py-3 border border-slate-300 rounded-full shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            Inicia Sesión
          </a>
        </div>
      </div>
    </div>
  );
}

