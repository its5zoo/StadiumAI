import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Card from '../components/Card';

export default function Login() {
  const [email, setEmail] = useState('fan@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock logic calling the local backend if running, otherwise mock locally
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      login(data.data.token, data.data.user);
      
      // Redirect based on role
      if (data.data.user.role === 'ORGANIZER') {
        navigate('/organizer');
      } else {
        navigate('/fan');
      }
    } catch (err) {
      setError(err.message);
      // Fallback local mock if backend is not running during testing
      if (err.message.includes('Failed to fetch')) {
        if (email === 'fan@example.com') {
          login('mock-jwt-fan', { id: '1', role: 'FAN', name: 'John Fan' });
          navigate('/fan');
        } else if (email === 'org@example.com') {
          login('mock-jwt-org', { id: '2', role: 'ORGANIZER', name: 'Jane Org' });
          navigate('/organizer');
        } else {
          setError('Backend is offline and no local mock matched this email.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
      <Link to="/" className="text-2xl font-bold text-primary mb-8">MatchDay AI</Link>
      
      <div className="w-full max-w-md">
        <Card title="Login to your account">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded text-sm">
                {error}
              </div>
            )}
            
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
              />
            </div>

            <div className="text-xs text-gray-500">
              <p>Demo Fan: fan@example.com / password</p>
              <p>Demo Org: org@example.com / password</p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="text-center text-sm text-gray-400 mt-4">
              Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
