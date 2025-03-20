import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import body from '../assets/body.png';
import Image from '../assets/image.png';

import Loader from '../components/loader/Loader';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || error.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />
      <br />
      <div className="login-hero">
        <div className="login-banneraera">

          <div className="login-banner-content">
            <h1>Saving By Age.</h1>
            <p>
              Find out the average amount people save in there 20s, 30s, 40s and beyond
              <br />
            </p>
            <button className="getoffer-login">
              Get Offer
            </button>
          </div>
        </div>
        <div className="login-form-area">
          <div className="login-box">
            {/* Error Message */}
            {errorMessage && (
              <p
                className="login-error-message"
                style={{
                  color: '#d32f2f',
                  fontSize: '14px',
                  marginTop: '10px',
                  textAlign: 'center',
                  padding: '12px',
                  backgroundColor: '#ffebee',
                  border: '1px solid #ffcdd2',
                  borderRadius: '8px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  width: '100%',
                  marginBottom:"20px",
                  boxSizing: 'border-box',
                }}
              >
                {errorMessage}
              </p>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>

              <h3>Login</h3>
              <div className="login-input-group">
                <p className='cstm-label'>username</p>
                <input
                  type="text"
                  className="login-input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>



              <div className="login-input-group">
                <p className='cstm-label'>Password</p>

                <input
                  type="password"
                  className="login-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>


              <br />

              <div className='btn-grop-login'>


                <button className="login-sign-in-btn" type="submit" disabled={loading}>
                  {loading ? <Loader /> : 'Sign in'}
                </button>
                <div className='checkbox-group'>

                  <input type="checkbox" name='check' />
                  <label htmlFor="check">Save username</label>
                </div>
              </div>
            </form>

            {/* Additional Links */}
            <div className="login-links">
              <p className='login-p'>forgot <a href="#">username</a>or <a href="#">password</a>?</p>
              <p className='login-p'><a href="#">create a profile</a>to manage your account online</p>

              <h4 className='login-h4'>More to do</h4>
              <p className="login-p">
                finish a <a href="#">Mortgage Application</a>
              </p>

              <strong>
                <p className='login-p'>
                  <a href="#">
                    Complete a saved auto refinance or lease buyout application
                  </a>
                </p>
              </strong>
            </div>
          </div>
        </div>
      </div>
      <br />
      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;