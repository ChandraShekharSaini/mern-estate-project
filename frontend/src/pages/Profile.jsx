
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../Firebase";
import {
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
} from "../redux/user/userSlice";

import {
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
} from '../redux/user/userSlice'

import {signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart, } from '../redux/user/userSlice'

import {Link} from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser,loading,error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);
  console.log(file);
  console.log(filePerc);
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const changeHandle = (ev) => {
    setFormData({ ...formData, [ev.target.id]: ev.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };





  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const HandleSingnOut= async ()=>{
    try{
      dispatch(signOutUserStart());
       const res = await fetch(`api/auth/signout/${currentUser._id}`,{
        method: 'GET',
        
       });

       const data = await res.json();
       if(data.success==false){
          dispatch(signOutUserFailure(data.message))
       }

       dispatch(signOutUserSuccess(data));
       
    }catch(error){
     dispatch(signOutUserFailure(error.message))
    }
  }



  return (
    <div className="p-3 max-w-lg mx-auto shadow-xl ">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar ||currentUser.avatar }
          alt="image"
          className=" mt-5 rounded-full  w-24 h-24 object-cover self-center"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image Not Uploaded (image must be less than 10 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700"> {`Uploading ${filePerc} %`}</span>
          ) : filePerc == 100 ? (
            <span className="text-green-700"> Image Sucessfully uploaded</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          className="p-3 rounded-lg"
          id="username"
          defaultValue={currentUser.username}
          onChange={changeHandle}
        />
        <input
          type="email"
          placeholder="email"
          className="p-3 rounded-lg"
          id="email"
          defaultValue={currentUser.email}
          onChange={changeHandle}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 rounded-lg"
          id="password"
          defaultValue={currentUser.password}
          onChange={changeHandle}
        />

        <button  disabled={loading} className="bg-slate-900 text-white  rounded-lg p-3 uppercase disabled:opacity:80  hover:bg-slate-800 hover:scale-95">
          {loading ? 'Loading..':'update'}
        </button>
   
        <Link  className="bg-green-900 text-white text-center  rounded-lg p-3 uppercase disabled:opacity:80  hover:bg-green-700 hover:scale-95" to='/create-listing'>
           
                Create New Listing
              
          </Link>
         
      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700  text-lg hover:font-semibold cursor-pointer ">
          Delete Acccount
        </span>

        <span onClick={HandleSingnOut}  className="text-red-700 text-lg hover:font-semibold  cursor-pointer">
          Sign out
        </span>
      </div>

      <p className="text-green-700">{updateSuccess ? 'User Updated Successfully': ''}</p>
      {/* <p className="text-red-700 mt-5">{error ? error:''}</p> */}

    </div>
  );
};

export default Profile;
