import React, { useEffect, useState } from 'react';
import './Login.css';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { login } from './../../api/api';
import CircularProgress from '@material-ui/core/CircularProgress';

function Login(props) {
  const [logined, setlogined] = useState({ islogin: false, id: null });
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  let history = useHistory();

  const [user, setuser] = useState('');
  const [pass, setpass] = useState('');
  const loginHandler = async () => {
    setloading(true);
    if (user === '') {
      seterror('Type valid username');
      setloading(false);
      return;
    }
    if (pass === '') {
      seterror('Type valid password');
      setloading(false);
      return;
    }
    const data = {
      username: user,
      password: pass,
    };
    const res = await login(data);
    if (res.data.status == 404) {
      seterror('Invalid credentials');
      setloading(false);
      return;
    } else {
      setlogined({ islogin: true, id: res.data.user_id });
      setloading(false);
      history.push('/dashboard');
    }
  };

  useEffect(() => {
    props.givestatus(logined);
  }, [logined]);

  return (
    <div className="login bg-light">
      <h6 style={{ color: 'red' }}>
        {error.trim().length !== 0 ? error : null}
      </h6>
      <h2 style={{ margin: '1rem' }}>Social Media Intelligence System</h2>
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <div className="form-content">
          <input
            value={user}
            onChange={(e) => setuser(e.target.value)}
            className="input"
            type="text"
            placeholder="Username"
          />
          <input
            value={pass}
            onChange={(e) => setpass(e.target.value)}
            className="input"
            type="password"
            placeholder="Password"
          />
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={loginHandler}>Login</Button>
        )}
      </div>
      <h6 className="extra">
        Categorized, Meaningful, Actionable, Real Time 
      </h6>
    </div>
  );
}

export default Login;
