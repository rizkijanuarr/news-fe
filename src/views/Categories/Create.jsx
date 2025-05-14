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

export default function CategoriesCreate() {

    //title page
    document.title = "Create  - NewsApp Administartor";

    //navigate
    const navigate = useNavigate();

    //define state for form
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});

    //token from cookies
    const token = Cookies.get('token');

    //function "storeCategory"
    const storeCategories = async (e) => {
        e.preventDefault();

        //sending data
        await Api.post('/api/v1/category/', {
            name,
            image
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            toast.success("Categories created successfully!", {
                position: "top-right",
                duration: 4000,
            });
            navigate('/categories');
        })
        .catch(error => {
            setErrors(error.response?.data || {});
        })
    }

    const resetForm = () => {
        setName('');
        setImage('');
        setErrors({});
    };

    return (
        <LayoutDefault>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/categories" className="btn btn-md btn-tertiary border-0 shadow mb-3" type="button"><i className="fa fa-long-arrow-alt-left me-2"></i> Back</Link>
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <h6><i className="fa fa-user"></i> Create Category</h6>
                                <hr/>
                                <form onSubmit={storeCategories}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Name</label>
                                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name"/>
                                            </div>
                                            {errors.name && (
                                                <div className="alert alert-danger">
                                                    {errors.name[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Image Link</label>
                                                <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter Image Link"/>
                                            </div>
                                            {errors.image && (
                                                <div className="alert alert-danger">
                                                    {errors.image[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    
                                    <hr/>
                                    
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