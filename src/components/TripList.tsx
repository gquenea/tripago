import { useState } from "react";
import "./TripList.css";
import useFetch from "../hooks/useFetch";

export type Trip = {
  id: number;
  title: string;
  price: string;
  loc: string;
};

const TripList = () => {
  const [url, setUrl] = useState("http://localhost:3000/trips");
  const {
    data = [],
    isPending,
    error,
  } = useFetch({
    url,
  });

  return (
    <div className="trip-list">
      <h2>Trip List</h2>
      {isPending && <div>Loading Trips...</div>}
      {error && <div>{error}</div>}
      <ul>
        {data &&
          data.map((trip: Trip) => (
            <li key={trip.id}>
              <h3>{trip.title}</h3>
              <p>{trip.price}</p>
            </li>
          ))}
      </ul>
      <div className="filters">
        <button
          onClick={() => setUrl("http://localhost:3000/trips?loc=europe")}
        >
          European Trips
        </button>
        <button onClick={() => setUrl("http://localhost:3000/trips")}>
          All Trips
        </button>
      </div>
    </div>
  );
};

export default TripList;
