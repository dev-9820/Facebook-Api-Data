import React from 'react';
import css from './App.css'

function Login() {
    const handleLogin = () => {
        window.location.href = 'http://localhost:8000/index.php';
    };

    return (
        <div className={"App-header"}>
            <button className="bg-gray-500 p-2 rounded-2xl hover:bg-blue-300 hover:text-black transition-all shadow-black shadow-md" onClick={handleLogin}>Login with Facebook</button>
        </div>
    );
}

export default Login;
