import { useEffect, useState } from "react";

// export function useFetchAddressDetails(address: string) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAddressDetails = async () => {
//       try {
//         const response = await fetch('address');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status ${response.status}`);
//         }
//         const results = await response.json();
//         setData(results);
//       } catch (error) {
//           setError(`Error: ${error}`);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAddressDetails();
//   }, [address]);
// }


// import { useState, useEffect } from "react";

function useFetchData(address: unknown) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(address);
        const response = await fetch('', {
          method: "GET",
          headers: {
            'Application': "json"
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(`Error: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address]); // Re-run effect if URL changes

  return { data, loading, error };
}

export default useFetchData;