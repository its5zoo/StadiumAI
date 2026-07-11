import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('FAN');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      // Successful registration, navigate to login
      navigate('/login');
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Failed to fetch')) {
         setError('Backend is offline. Please run backend server to register.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
      <Link to="/" className="text-2xl font-bold text-primary mb-8">MatchDay AI</Link>
      
      <div className="w-full max-w-md">
        <Card title="Create an account">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-sm text-gray-400">Full Name</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-400">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm text-gray-400">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-400">Role</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
              >
                <option value="FAN">Fan</option>
                <option value="ORGANIZER">Organizer</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            
            <div className="text-center text-sm text-gray-400 mt-4">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
