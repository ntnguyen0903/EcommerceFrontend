import React, { useState } from 'react';
import axios from 'axios';
import swal from "sweetalert";
import { useHistory } from 'react-router-dom';
const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const data = {
      old_password: oldPassword,
      password: newPassword,
      confirm_password: confirmPassword
    };
    // console.log('URL yêu cầu:', '/change-password'); 
    axios.post('/api/change-password', data).then(response => {
        setMessage(response.data.message);
        setErrors({});
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        swal("Success", response.data.message, "Success");
        history.push('/customer/information');

      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrors(error.response.data.errors);
        }
      });
  }

  return (
    <div className='container'>
      <h1>Đổi mật khẩu</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="old_password">Nhập mật khẩu cũ:</label>
          <input type="password" id="old_password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          {errors.old_password && <span>{errors.old_password[0]}</span>}
        </div>
        <div>
          <label htmlFor="password">Nhập mật khẩu mới:</label>
          <input type="password" id="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          {errors.password && <span>{errors.password[0]}</span>}
        </div>
        <div>
          <label htmlFor="confirm_password">Nhập lại mật khẩu:</label>
          <input type="password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirm_password && <span>{errors.confirm_password[0]}</span>}
        </div>
        <button type="submit">Đổi mật khẩu</button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
