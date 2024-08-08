import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Listing = () => {
  const params = useParams();
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

        if (data.success == false) {
          console.log(data.message);
          setErrorEffect(true);
        setLoadingEffect(false);
        }

        setListingData(data);
        // setLoadingEffect(false);
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
        {loadingEffect && <p className="text-center text-2xl my-44">Loading...</p>}
    </main>
  );
};

export default Listing;
