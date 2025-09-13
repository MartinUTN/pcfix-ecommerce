import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // --- Lógica de Conexión con el Backend (a implementar) ---
    // Aquí es donde, en el futuro, haríamos la llamada a nuestro backend de Deno.
    // Por ahora, simularemos una respuesta para ver cómo funciona el UI.
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === "usuario@pcfix.com" && password === "password") {
      // Simulación de éxito
      alert("¡Inicio de sesión exitoso!");
      // Aquí redirigiríamos al usuario, por ejemplo: window.location.href = '/perfil';
    } else {
      // Simulación de error
      setError('Correo o contraseña incorrectos.');
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">Iniciar Sesión</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Correo Electrónico
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Contraseña
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 transition-colors"
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        ¿No tienes una cuenta?{' '}
        <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Regístrate aquí
        </a>
      </p>
    </div>
  );
}
