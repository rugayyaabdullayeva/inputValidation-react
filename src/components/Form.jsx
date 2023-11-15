import React, { useState } from 'react';

const InputValidation = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [submittedName, setSubmittedName] = useState('');
    const [submittedEmail, setSubmittedEmail] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Enter a valid email!' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
        }
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.[A-Z])(?=.{8,})/;
        if (!passwordRegex.test(password)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Must contain uppercase letters and be at least 8 characters long!',
            }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        validateEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        validatePassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== repeatPassword) {
            setErrors((prevErrors) => ({ ...prevErrors, repeatPassword: 'Passwords do not match' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, repeatPassword: undefined }));
            setSubmittedName(name);
            setSubmittedEmail(email);
        }
    };

    return (
        <form className="w-25 pt-3 m-auto" onSubmit={handleSubmit}>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Name:</label>
                <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={handleNameChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email:</label>
                <input type="email" className="form-control" placeholder="email@example.com" value={email} onChange={handleEmailChange} required />
                {errors.email && <p className='text-danger'>{errors.email}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Password:</label>
                <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={handlePasswordChange} required />
                {errors.password && <p className='text-danger'>{errors.password}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Repeat Password:</label>
                <input type="password" className="form-control" placeholder="Enter Repeat Password" value={repeatPassword} onChange={handleRepeatPasswordChange} required />
                {errors.repeatPassword && <p className='text-danger'>{errors.repeatPassword}</p>}
            </div>

            <button className="btn btn-danger w-100" type="submit">Submit</button>

            {submittedName && submittedEmail && (
                <div className="card mt-3 p-3 ">
                    <h4>Submitted Information:</h4>
                    <p><strong>Name:</strong> {submittedName}</p>
                    <p><strong>Email:</strong> {submittedEmail}</p>
                </div>
            )}
        </form>
    );
};

export default InputValidation;