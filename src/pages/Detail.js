import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Details() {
    const [data, setData] = useState({ comments: [] });
    const { id } = useParams();
    const navigate = useNavigate();
    const [commentValue, setCommentValue] = useState('');
    const [editing, setEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        axios.get(`https://apitest.reachstar.io/blog/get/${id}`)
            .then(response => {
                setData(response.data);
                setEditDescription(response.data.description);
                setEditTitle(response.data.title);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        axios.put(`https://apitest.reachstar.io/blog/edit/${id}`, {
            title: editTitle,
            description: editDescription
        })
        .then(response => {
            console.log("Changes saved successfully:", response);
            setEditing(false);
            window.location.reload();
        })
        .catch(error => {
            console.error("Error saving changes:", error);
            window.alert("Error saving changes:", error);
        });
    };

    const addComment = (event) => {
        event.preventDefault();
        axios.post(`https://apitest.reachstar.io/comment/add/${id}`, {
            comment: commentValue
        })
        .then(response => {
            console.log("Comment added successfully");
            window.location.reload();
        })
        .catch(error => {
            console.error("Error adding comment:", error);
            window.alert("Error adding comment");
        });
    };

    const deleteBlog = (blogId) => {
        axios.delete(`https://apitest.reachstar.io/blog/delete/${blogId}`)
        .then(response => {
            console.log("Blog deleted successfully");
            navigate("/Home");
        })
        .catch(error => {
            console.error("Error deleting blog:", error);
            window.location.reload();
        });
    };

    const deleteComment = (commentId) => {
        axios.delete(`https://apitest.reachstar.io/comment/delete/${commentId}`)
        .then(response => {
            console.log("Comment deleted successfully");
            window.location.reload();
        })
        .catch(error => {
            console.error("Error deleting comment:", error);
            window.location.reload();
        });
    };

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 mt-1 mt-md-5">
                        <div className="card mb-2 mt-1 mt-md-5" style={{ borderStyle: "none" }}>
                            <div className="card-header mb-md-5" style={{ borderStyle: "none", backgroundColor: "white" }}>
                                {editing ? (
                                    <input
                                        type="text"
                                        style={{ width: "100%", textAlign: "center", outlineColor: "#EBEBEB" }}
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                    />
                                ) : (
                                    <h3
                                        className="card-title mt-1 mt-md-5"
                                        dangerouslySetInnerHTML={{ __html: data.title }}
                                        style={{ backgroundColor: "white", textAlign: "center" }}
                                    />
                                )}
                            </div>
                            <div className="card-body mb-1">
                                {editing ? (
                                    <ReactQuill theme="snow" value={editDescription} onChange={setEditDescription} />
                                ) : (
                                    <p
                                        className="ps-1 ps-md-5 pe-1 pe-md-5"
                                        dangerouslySetInnerHTML={{ __html: data.description }}
                                        style={{ borderLeftStyle: "solid", borderColor: "#D6D6D6", borderRightStyle: "solid", textAlign: "center" }}
                                    />
                                )}
                                {editing ? (
                                    <div className="d-flex justify-content-end mt-2 mt-md-4 pe-2 pe-md-4">
                                        <button
                                            className="btn bg-info pt-2 pb-2 ps-3 pe-3 ps-md-5 pe-md-5"
                                            id="buttonShadow"
                                            style={{ fontFamily: "JosefinSans-SemiBold", color: "white" }}
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-end mt-2 mt-md-4 pe-2 pe-md-4">
                                        <button
                                            className="btn bg-info pt-2 pb-2 ps-3 pe-3 me-1 me-md-3 ps-md-4 pe-md-4"
                                            id="buttonShadow"
                                            style={{ fontFamily: "JosefinSans-SemiBold", color: "white" }}
                                            onClick={handleEdit}
                                        >
                                            Edit Blog
                                        </button>
                                        <button
                                            className="btn bg-info pt-2 pb-2 ps-3 pe-3 ps-md-4 pe-md-4"
                                            id="buttonShadow"
                                            style={{ fontFamily: "JosefinSans-SemiBold", color: "white" }}
                                            onClick={() => deleteBlog(data.id)}
                                        >
                                            Delete Blog
                                        </button>
                                    </div>
                                )}
                            </div>
                            <form
                                onSubmit={addComment}
                                className="d-flex align-items-center justify-content-between ps-2 ps-md-4"
                                style={{ width: "100%", backgroundColor: "#EBEBEB" }}
                            >
                                <p className="m-0 p-0" style={{ color: "#818385", fontFamily: "JosefinSans-SemiBold" }}>Comments</p>
                                <p className="m-0 p-0" style={{ color: "#818385", fontFamily: "JosefinSans-SemiBold" }}> /</p>
                                <button
                                    type="submit"
                                    className="m-0 p-0"
                                    id="textShadow"
                                    style={{ color: "#818385", fontFamily: "JosefinSans-SemiBold", borderStyle: "none", outline: "none", width: "auto", backgroundColor: "transparent" }}
                                >
                                    Your comment
                                </button>
                                <ReactQuill style={{ width: "78%" }} theme="snow" value={commentValue} onChange={setCommentValue} />
                            </form>
                            <div className="card-footer mb-1 mb-md-5" style={{ backgroundColor: "#D6D6D6", borderTopStyle: "solid", borderTopColor: "#EBEBEB" }}>
                                {data.comments.map((item) => (
                                    <div key={item.id} id="comments" className="d-flex justify-content-between align-items-center mt-2 mt-md-4 ps-2 pe-2 ps-md-5 pe-md-5">
                                        <p className="p-0 m-0" style={{ width: "90%" }} dangerouslySetInnerHTML={{ __html: item.comment }}></p>
                                        <button
                                            className="pt-2 pb-2 ps-3 pe-3"
                                            id="buttonShadow"
                                            onClick={() => deleteComment(item.id)}
                                            type="button"
                                            style={{ fontFamily: "JosefinSans-SemiBold", fontWeight: "600", fontSize: "14px", color: "#818385", backgroundColor: "#EBEBEB", borderStyle: "none", outline: "none" }}
                                        >
                                            DELETE
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex justify-content-center" style={{ width: "100%" }}>
                                <div style={{ width: "50px", height: "0px", border: "0.5px solid #D6D6D6" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Details;
