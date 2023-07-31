import logo from "./logo.svg";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import Map, { Marker, Popup } from "react-map-gl";
import myData from "./buildings_points.geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    description: "",
  });
  const [Markers, setMarkers] = useState([]);
  const markerRef = useRef();
  console.log(myData);

  // const popup = useMemo(() => {
  //   return mapboxgl.Popup().setText("Hello world!");
  // }, []);

  // const togglePopup = useCallback(() => {
  //   markerRef.current?.togglePopup();
  // }, []);
  const [popupOpen, setPopupOpen] = useState({});
  const [latestId, setLatestId] = useState(0);
  const handleAddMarker = () => {
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        ...formData,
        _id: latestId,
      },
    ]);

    setLatestId((prevId) => prevId + 1);
  };
  return (
    <div className="App">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={formData.longitude}
          onChange={(e) =>
            setFormData({ ...formData, longitude: e.target.value })
          }
          id="outlined-basic"
          label="Longitude"
          variant="outlined"
        />
        <TextField
          value={formData.latitude}
          onChange={(e) =>
            setFormData({ ...formData, latitude: e.target.value })
          }
          id="outlined-basic"
          label="Latitude"
          variant="outlined"
        />
        <TextField
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          id="outlined-basic"
          label="Description"
          variant="outlined"
        />
        <Button onClick={handleAddMarker} variant="contained">
          Validate
        </Button>
        <Map
          mapboxAccessToken="pk.eyJ1IjoiY3RvdXNpZ25hbnQiLCJhIjoiY2xrYzVqemZ6MGt4aDNmb2JxODdmb2s0bCJ9.bTsWPPYKCZHwqAi02wSKnQ"
          initialViewState={{
            longitude: 120,
            latitude: 37,
            zoom: 14,
          }}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {Markers
            ? Markers.map((data, index) => (
                <div key={data._id}>
                  <Marker
                    key={data._id}
                    longitude={data.longitude}
                    latitude={data.latitude}
                    anchor="bottom"
                    onClick={() =>
                      setPopupOpen({ ...popupOpen, [data._id]: true })
                    }
                  ></Marker>
                  {popupOpen[data._id] && (
                    <Popup
                      key={data._id}
                      latitude={data.latitude}
                      longitude={data.longitude}
                      onClose={() => setPopupOpen(false)}
                      closeButton={true}
                      offsetLeft={10}
                      closeOnClick={true}
                    >
                      <span
                        key={data._id}
                        style={{ fontSize: "1vw", fontFamily: "Poppins" }}
                      >
                        {data.description}
                      </span>
                    </Popup>
                  )}
                </div>
              ))
            : ""}
        </Map>
      </Box>
    </div>
  );
}

export default App;
