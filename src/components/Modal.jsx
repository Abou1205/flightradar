import axios from "axios";
import React, { useEffect, useState } from "react";
import { options2 } from "../constant";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { setTrail } from "../redux/slices/flightSlice";
import moment from "moment";

const Modal = ({ closeModal, detailId }) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(null);
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        options2
      )
      .then((res) => {
        dispatch(setTrail(res.data.trail));
        setData(res.data);
      });
  }, [detailId]);

  const formatDate = (time) => {
    const date = new Date(time * 1000).toUTCString();
    return moment(date).calendar();
  };

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <span onClick={closeModal}>Close</span>
        </p>

        {!data ? (
          <Loader />
        ) : !data.airport.origin || !data.airport.destination ? (
          <p>Uçuşun verileri gizlidir</p>
        ) : (
          <>
            <h2>{data.aircraft.model.text}</h2>
            <h2>{data.aircraft.model.code}</h2>

            <p>{data.aircraft.registration}</p>

            <img
              style={{
                height: "90px",
              }}
              src={data.aircraft.images.large[0]?.src}
            />

            <p>
              <span>Company: </span>
              <span>{data.airline.name}</span>
            </p>

            <p>
              <span>Departure:</span>
              <a href={data.airport.origin.website} target="_blank">
                {data.airport.origin.name}
              </a>
            </p>

            <p>
              <span>Target:</span>
              <a href={data.airport.destination.website} target="_blank">
                {data.airport.destination.name}
              </a>
            </p>

            <p>
              <span>Departure Time: </span>
              <span>{formatDate(data.time.scheduled.departure)}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
