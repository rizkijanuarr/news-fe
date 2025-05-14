//import react  
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate } from "react-router-dom";

//import layout
import LayoutDefault from '../../layouts/Default';

//import api
import Api from '../../api';

//import js cookie
import Cookies from 'js-cookie';

//import toast
import toast from 'react-hot-toast';

export default function UserCreate() {

    //title page
    document.title = "Create User - NewsApp Administartor";

    //navigate
    const navigate = useNavigate();

    //define state for form
    const [user_name, setUserName] = useState('');
    const [user_email, setUserEmail] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [user_phone, setUserPhone] = useState('');
    const [role, setRole] = useState('ADMIN');
    const [errors, setErrors] = useState({});

    //token from cookies
    const token = Cookies.get('token');

    //function "storeUser"
    const storeUser = async (e) => {
        e.preventDefault();

        //sending data
        await Api.post('/api/v1/user/', {
            user_name,
            user_email,
            user_password,
            user_phone,
            role
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            toast.success("User created successfully!", {
                position: "top-right",
                duration: 4000,
            });
            navigate('/users');
        })
        .catch(error => {
            setErrors(error.response?.data || {});
        })
    }

    const resetForm = () => {
        setUserName('');
        setUserEmail('');
        setUserPassword('');
        setUserPhone('');
        setRole('ADMIN');
        setErrors({});
    };

    return (
        <LayoutDefault>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/users" className="btn btn-md btn-tertiary border-0 shadow mb-3" type="button"><i className="fa fa-long-arrow-alt-left me-2"></i> Back</Link>
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <h6><i className="fa fa-user"></i> Create User</h6>
                                <hr/>
                                <form onSubmit={storeUser}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Full Name</label>
                                                <input type="text" className="form-control" value={user_name} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Full Name"/>
                                            </div>
                                            {errors.user_name && (
                                                <div className="alert alert-danger">
                                                    {errors.user_name[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Email Address</label>
                                                <input type="text" className="form-control" value={user_email} onChange={(e) => setUserEmail(e.target.value)} placeholder="Enter Email Address"/>
                                            </div>
                                            {errors.user_email && (
                                                <div className="alert alert-danger">
                                                    {errors.user_email[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Password</label>
                                                <input type="password" className="form-control" value={user_password} onChange={(e) => setUserPassword(e.target.value)} placeholder="Enter Password"/>
                                            </div>
                                            {errors.user_password && (
                                                <div className="alert alert-danger">
                                                    {errors.user_password[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Phone</label>
                                                <input type="text" className="form-control" value={user_phone} onChange={(e) => setUserPhone(e.target.value)} placeholder="Enter Phone Number"/>
                                            </div>
                                            {errors.user_phone && (
                                                <div className="alert alert-danger">
                                                    {errors.user_phone[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="mb-3">
                                        <label className="fw-bold">Role</label>
                                        <br/>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="role" id="role-admin" value="ADMIN" checked={role === 'ADMIN'} onChange={() => setRole('ADMIN')} />
                                            <label className="form-check-label" htmlFor="role-admin">ADMIN</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="role" id="role-author" value="AUTHOR" checked={role === 'AUTHOR'} onChange={() => setRole('AUTHOR')} />
                                            <label className="form-check-label" htmlFor="role-author">AUTHOR</label>
                                        </div>
                                        {errors.role && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.role[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-md btn-tertiary me-2"><i className="fa fa-save"></i> Save</button>
                                        <button type="reset" onClick={resetForm} className="btn btn-md btn-warning"><i className="fa fa-redo"></i> Reset</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDefault>
    )
}