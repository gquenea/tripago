import { useEffect, useState } from "react";
import { Trip } from "../components/TripList";

export type useFetchProps = {
  url: string;
};

const useFetch = (props: useFetchProps) => {
  const [data, setData] = useState<Trip[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);

      try {
        const res = await fetch(props.url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json: Trip[] = await res.json();
        setIsPending(false);
        setData(json);
        setError("");
      } catch (error: any) {
        if (error.message === "AbortError") {
          console.log("the fetch was abort");
        }
        setIsPending(false);
        setError("Could not fetch the data");
        console.log(error.message);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [props.url]);

  return { data, isPending, error };
};
export default useFetch;
