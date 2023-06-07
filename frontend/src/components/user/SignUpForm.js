import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const[username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    fetch( '/users', {
      method: 'post',
      body: formData
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

 
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
    //console.log(event.target.files[0]);

  }


  return (
    <form onSubmit={handleSubmit}>
      <header className="my-card">
        <h1>STUDY BUDDY</h1>
        <button className="my-btn">
          <span>Sign up</span>
        </button>
      </header>
      <div className="my-form-group">
        <div className="my-input-row">
          <div className="my-input-group">
            <input placeholder="Email" id="email" type="text" value={email} onChange={handleEmailChange} />
          </div>
          <div className="my-input-group">
            <input placeholder="Username" id="username" type="text" value={username} onChange={handleUsernameChange} />
          </div>
        </div>
        <div className="my-input-group">
          <input placeholder="Password" id="password" type="password" value={password} onChange={handlePasswordChange} />
        </div>
      </div>
      <div className="my-form-group">
        <input id="submit" type="submit" value="Submit" />
      </div>
    </form>
  );
  



      
    
  
   
}

export default SignUpForm;

