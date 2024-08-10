import { useEffect, useState, seRef } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaShare } from 'react-icons/fa';

const Listing = () => {
  const params = useParams();
  SwiperCore.use([Navigation]);
  const [listingData, setListingData] = useState(null);
  const [loadingEffect, setLoadingEffect] = useState(false);
  const [errorEffect, setErrorEffect] = useState(false);

  useEffect(() => {
    const fetchListingData = async () => {
      const listing = params.listingId;

      try {
        setLoadingEffect(true);
        let res = await fetch(`/api/listing/get/${listing}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let data = await res.json();
        console.log("data", data);

        if (data.success == false) {
          console.log(data.message);
          setErrorEffect(true);
          setLoadingEffect(false);
        }

        setListingData(data);
        setLoadingEffect(false);
        setErrorEffect(false);
      } catch (error) {
        console.log(error.message);
        setErrorEffect(true);
        setLoadingEffect(false);
      }
    };

    fetchListingData();
  }, []);

  return (
    <main>
      {loadingEffect && (
        <p className="h-screen bg-gray-500 flex items-center justify-center    text-center text-2xl text-white">
          Loading...
        </p>
      )}
      {errorEffect && (
        <p className="text-center my-52 text-2xl text-red-700">
          404: Server Not Responding
        </p>
      )}

      {listingData && !errorEffect && !loadingEffect && (
        <>
          <Swiper navigation>
            {listingData.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="flex justify-center w-screen bg-gray-200 my-1">
                <img
                    src={url}
                    alt="listing cover"
                    className="h-123 w-124"
                  />

                
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

             <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100">
              <FaShare  className="text-slate-500"/>
             </div>
        </>
      )}
    </main>
  );
};

export default Listing;
