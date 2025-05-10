"use state";
import { useEffect, useState } from "react";

export default function useGetAllDivisions() {
  const [divisions, setDivisions] = useState([]);
  useEffect(() => {
    async function getAllDivions() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BD_API}/division`
        );
        const data = await response.json();
        if (data.status === 200) {
          setDivisions(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllDivions();
  }, []);
  return divisions;
}
