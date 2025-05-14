//import useState and useEffect
import { useState, useEffect } from "react";

//import Link from react router dom
import { Link } from "react-router-dom";

//import api
import Api from "../../api";

//import js cookie
import Cookies from "js-cookie";

//import layout
import LayoutDefault from "../../layouts/Default";

import { confirmAlert } from 'react-confirm-alert';

//import CSS react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';

import toast from 'react-hot-toast';

//import pagination component
import Pagination from "../../components/Pagination";

export default function CategoriesIndex() {
  //title page
  document.title = "Categories - NewsApp Administartor";

  //define state "categories"
  const [categories, setCategories] = useState([]);

  //define state "keywords"
  const [keywords, setKeywords] = useState("");
  
  //define pagination states
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPage: 0,
    totalData: 0,
    pageSize: 20
  });

  //token from cookies
  const token = Cookies.get("token");

  //function fetchData
  const fetchData = async (keywords = "", page = 0) => {
    await Api.get(`/api/v1/category/list/ACTIVE${keywords ? `?string_filter=${keywords}` : ''}${keywords ? '&' : '?'}page=${page}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "setUsers"
      setCategories(response.data.data);
      
      //set pagination data
      setPagination({
        currentPage: response.data.current_page,
        totalPage: response.data.total_page,
        totalData: response.data.total_data,
        pageSize: response.data.page_size
      });
    });
  };

  const deleteCategory = (id) => {
    //show confirm alert
    confirmAlert({
      title: 'Are You Sure ?',
      message: 'want to delete this data ?',
      buttons: [{
        label: 'YES',
        onClick: async () => {
          await Api.delete(`/api/v1/category/${id}`, {
            //header
            headers: {
              //header Bearer + Token
              Authorization: `Bearer ${token}`,
            }
          })
            .then(response => {
              //show toast
              toast.success("Categories deleted successfully!", {
                position: "top-right",
                duration: 4000,
              });

              //call function "fetchData"
              fetchData(keywords, pagination.currentPage);
            })
        }
      },
      {
        label: 'NO',
        onClick: () => {}
      }
      ]
    });
  }

  //useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();
  }, []);

  //function "searchData"
  const searchData = async (e) => {
    //set value to state "keywords"
    setKeywords(e.target.value);

    //call function "fetchData"
    fetchData(e.target.value, 0); // Reset to first page when searching
  };
  
  //function handle page change
  const handlePageChange = (pageNumber) => {
    fetchData(keywords, pageNumber);
  };

  return (
    <LayoutDefault>
      <div className="container-fluid mb-5 mt-5">
        {/* Breadcrumbs */}
        <div className="row mb-3">
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <ol className="mb-4 breadcrumb bg-transparent p-0 m-0 custom-breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Managament Categories
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-md-3 col-12 mb-2">
            <Link
              to="/categories/create"
              className="btn btn-md btn-tertiary border-0 shadow w-100"
              type="button"
            >
              <i className="fa fa-plus-circle"></i> Add New
            </Link>
          </div>
          <div className="col-md-9 col-12 mb-2">
            <div className="input-group" style={{ width: "100%" }}>
              <input
                type="text"
                className="form-control border-0 shadow"
                onChange={(e) => searchData(e)}
                placeholder="search here..."
                style={{ minWidth: 0 }}
              />
              <span className="input-group-text border-0 shadow bg-white" style={{ cursor: "pointer" }}>
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-md-12">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-centered mb-0 rounded">
                    <thead className="thead-dark">
                      <tr className="border-0">
                        <th className="border-0" style={{ width: "5%" }}>
                          No.
                        </th>
                        <th className="border-0">Name</th>
                        <th className="border-0">Slug</th>
                        <th className="border-0">Image</th>
                        <th className="border-0">Created Date</th>
                        <th className="border-0" style={{ width: "15%" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        //cek apakah data ada
                        categories.length > 0 ? (
                          //looping data "categories" dengan "map"
                          categories.map((category, index) => (
                            <tr key={index}>
                              <td className="fw-bold text-center">
                                {(pagination.currentPage * pagination.pageSize) + index + 1}
                              </td>
                              <td>{category.name}</td>
                              <td>{category.slug}</td>
                              <td className="text-center">
                                  <img src={category.image} width="70"/>
                              </td>
                              <td>{category.created_date}</td>
                              <td className="text-center">
                                <Link
                                  to={`/categories/edit/${category.id}`}
                                  className="btn btn-primary btn-sm me-2"
                                >
                                  <i className="fa fa-pencil-alt"></i>
                                </Link>
                                <button 
                                  onClick={() => deleteCategory(category.id)} 
                                  className="btn btn-danger btn-sm">
                                  <i className="fa fa-trash">
                                  </i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          //tampilkan pesan data belum tersedia
                          <tr>
                            <td colSpan={6}>
                              <div
                                className="alert alert-danger border-0 rounded shadow-sm w-100"
                                role="alert"
                              >
                                Data Belum Tersedia!
                              </div>
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
                
                {/* Add Pagination Component */}
                <div className="row mt-3">
                  <div className="col-md-12">
                    <Pagination
                      currentPage={pagination.currentPage}
                      total={pagination.totalData}
                      pageSize={pagination.pageSize}
                      onChange={handlePageChange}
                      position="end"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}