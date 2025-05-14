//import react
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil"; // Missing import

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutDefault from "../../layouts/Default";

//import api
import Api from "../../api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";
import { editorState } from "../../store";
import Editor from "../../components/Editor"; // Missing import

export default function PostEdit() {
  //title page
  document.title = "Edit Post - NewsApp Administrator";

  //navigate
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useRecoilState(editorState);
  const [image, setImage] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  const fetchDataCategories = async () => {
    await Api.get("/api/v1/category/list/ACTIVE", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state "categories"
      setCategories(response.data.data);
    });
  };

  //function "fetchDataPost"
  const fetchDataPost = async () => {
    await Api.get(`/api/v1/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const data = response.data.data;
      setTitle(data.title || "");
      setContent(data.content || "");
      setImage(data.image || "");
      // Fix: Properly extract category_id from the response
      setCategoryId(data.category?.id || "");
    });
  };

  useEffect(() => {
    fetchDataCategories();
    fetchDataPost();
  }, []);

  //function "updatePost"
  const updatePost = async (e) => {
    e.preventDefault();
    await Api.put(
      `/api/v1/post/${id}`,
      {
        title,
        content,
        image,
        category_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        toast.success("Post updated successfully!", {
          position: "top-right",
          duration: 4000,
        });
        navigate("/posts");
      })
      .catch((error) => {
        setErrors(error.response?.data || {});
      });
  };

  const resetForm = () => {
    fetchDataCategories();
    fetchDataPost();
    setErrors({});
  };

  return (
    <LayoutDefault>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-12">
            <Link
              to="/posts"
              className="btn btn-md btn-tertiary border-0 shadow mb-3"
              type="button"
            >
              <i className="fa fa-long-arrow-alt-left me-2"></i> Back
            </Link>
            <div className="card border-0 shadow">
              <div className="card-body">
                <h6>
                  <i className="fa fa-user"></i> Edit Post
                </h6>
                <hr />
                <form onSubmit={updatePost}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter Title"
                        />
                      </div>
                      {errors.title && (
                        <div className="alert alert-danger">
                          {errors.title[0]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Image Link</label>
                        <input
                          type="text"
                          className="form-control"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                          placeholder="Enter Image Link"
                        />
                      </div>
                      {errors.image && (
                        <div className="alert alert-danger">
                          {errors.image[0]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Category</label>
                        <select
                          className="form-select"
                          value={category_id}
                          onChange={(e) => setCategoryId(e.target.value)}
                        >
                          <option value="">-- Select Category --</option>
                          {categories.map((category) => (
                            <option value={category.id} key={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.category_id && (
                        <div className="alert alert-danger">
                          {errors.category_id[0]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Content</label>
                        <Editor content={content} />
                      </div>
                      {errors.content && (
                        <div className="alert alert-danger">
                          {errors.content[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div>
                    <button
                      type="submit"
                      className="btn btn-md btn-tertiary me-2"
                    >
                      <i className="fa fa-save"></i> Update
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn btn-md btn-warning"
                    >
                      <i className="fa fa-redo"></i> Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}