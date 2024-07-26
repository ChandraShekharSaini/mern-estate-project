import { useState } from "react";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import app from "../Firebase";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  const [imageUploadErrors, setImageUploadErrors] = useState(false);

  console.log(files);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadErrors(false);
        })

        .catch((error) => {
          setImageUploadErrors("Image upload failed (2 mb max per image)");
        });
    } else {
      setImageUploadErrors("You can only upload 6 images per listing");
    }
  };

  console.log("hvghvg", formData);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
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
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };


  const handleRemoveImage=(index)=>{
    console.log("Index--",index)
  
  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-semibold text-center">Create a Listing</h1>

        <form className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="62"
              minLength="10"
              required
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              maxLength="62"
              minLength="10"
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
            />

            <div className="flex gap-6 flex-wraP ">
              <div className="flex gap-2">
                <input type="checkbox" id="sell" className="w-5" />
                <span>Sell</span>
              </div>

              <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5" />
                <span>Rent</span>
              </div>

              <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5" />
                <span>Parking spot</span>
              </div>

              <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5" />
                <span>Furnished</span>
              </div>

              <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5" />
                <span>Offer</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border-gray-300 rounded-lg"
                  type="number"
                  id="beds"
                  min="1"
                  max="10"
                  required
                />
                <span>Beds</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  className="p-3 border-gray-300 rounded-lg"
                  type="number"
                  id="baths"
                  required
                />
                <span>Baths</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  className="p-3 border-gray-300 rounded-lg"
                  type="number"
                  id="regulatPrice"
                  min="1"
                  max="10"
                  required
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  <span className="text-xs">(Rs / Month)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  className="p-3 border-gray-300 rounded-lg"
                  type="number"
                  id="discountPrice"
                  min="1"
                  max="10"
                  required
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">(Rs / Month)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-4">
            <p className="font-bold">
              Images:
              <span className="font-semibold text-gray-600 ml-2">
                {" "}
                The first image will be the cover(max 6)
              </span>
            </p>

            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
                multiple
              ></input>
              <button
                onClick={handleImageSubmit}
                type="button"
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                Upload
              </button>
            </div>

            <p className="text-red-600 font-semibold">
              {imageUploadErrors && imageUploadErrors}
            </p>
            <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              Create Listing
            </button>

            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((urls,index) => {
              
            
          return <div key={index} className="flex justify-between p-3 border items-center">
               <img
                    src={urls}
                    // key={images}
                    className="rounded-sm brightness-75 w-3/5 object-contain "
                  />
                
               <button  onClick={handleRemoveImage(index)} className="text-red-500 font-semibold hover:text-red-600">Delete</button>
               </div>
          
             } )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateListing;
