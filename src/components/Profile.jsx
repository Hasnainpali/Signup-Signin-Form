import React, { useEffect, useState } from 'react';
import useData from '../hooks/useData';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

export default function Profile() {
  const [myuser, setMyUser] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  
  const navigate = useNavigate();
  const { loginUser } = useData();

  useEffect(() => {
    axios.get("http://localhost:5000/profile")
      .then((res) => {
        const found = res.data.find((item) => item.userName === loginUser);
        if (found) {
          setMyUser(found);
        } else {
          navigate('/signin');
          alert("Please login first");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  function post() {
    if (editIndex !== null) {
      // If in edit mode, update the existing post
      axios.put("http://localhost:5000/posts", {
        userName: myuser.userName,
        index: editIndex,
        edit: newPost
      })
        .then((res) => {
          console.log(res.data);
          setMyUser(prevUser => {
            const updatedPosts = [...prevUser.posts];
            updatedPosts[editIndex] = newPost;
            return { ...prevUser, posts: updatedPosts };
          });
          setEditIndex(null); // Exit edit mode after updating
        })
        .catch(() => {
          console.log('Invalid');
        });
    } else {
      // If not in edit mode, create a new post
      axios.post("http://localhost:5000/posts", { userName: myuser.userName, post: newPost })
        .then((res) => {
          console.log(res.data);
          setMyUser(prevUser => ({ ...prevUser, posts: [...prevUser.posts, newPost] }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setNewPost("");
  }
  
  

  function deletePost(postIndex) {
    axios.delete("http://localhost:5000/posts", {
      data: {
        userName: myuser.userName,
        index: postIndex
      }
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editPost(postIndex) {
    setEditIndex(postIndex); // Set the index of the post being edited
    setNewPost(myuser.posts[postIndex]); // Set the content of the post to the input field
  }

  return (
    <div>
      <center>
        <br />
        <h1>{myuser.fullName}</h1>
        <br />
        <input
          type="text"
          placeholder={editIndex !== null ? 'Edit Post' : 'Create a Post'}
          style={{ width: "30vw", height: "40px" }}
          className='rounded'
          required=''
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button className='btn btn-success m-3' onClick={() => post()}>
          {editIndex !== null ? 'Update' : 'Post'}
        </button>
      </center>
      <div className='d-flex justify-content-around flex-wrap'>
        {Array.isArray(myuser.posts) && myuser.posts.length > 0 ? (
          myuser.posts.map((post, index) => (
            <div key={index} className="card mt-5" style={{ width: "18rem" }}>
              <div className="card-body d-flex justify-content-between">
                <p className="card-text">{post}</p>
                <div className="dropdown">
                  <p type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    ...
                  </p>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><button className="dropdown-item" onClick={() => deletePost(index)}>Delete</button></li>
                    <li><button className="dropdown-item" onClick={() => editPost(index)}>Edit</button></li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Posts Available</p>
        )}
      </div>
    </div>
  );
}
