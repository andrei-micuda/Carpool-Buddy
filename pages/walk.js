import { useEffect, useState, useContext } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { useRouter } from "next/router";
import RideSelector from "./components/RideSelector";
import { Button, Slider } from "@mui/material";
import AppContext from "../data/appContext";

const Walk = () => {
  const router = useRouter();
  // const [minutes, setMinutes] = useState(0);
  const { minutes, setMinutes } = useContext(AppContext);
  const { pickuplocation, dropofflocation } = router.query;
  const [pickupCoordinate, setPickupCoordinate] = useState();
  const [dropoffCoordinate, setDropoffCoordinate] = useState();
  const [selectedService, setSelectedService] = useState();

  const getPickupCoordinate = (pickuplocation) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickuplocation}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoibWljdTAxIiwiYSI6ImNscjN4emk5bTAyODYycmw3eGl1ODJ6ZXUifQ.53Ou-aCAC_Kfp2yo9bjUOg",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setPickupCoordinate(data.features[0].center);
      });
  };

  const getDropoffCoordinate = (dropofflocation) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropofflocation}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoibWljdTAxIiwiYSI6ImNscjN4emk5bTAyODYycmw3eGl1ODJ6ZXUifQ.53Ou-aCAC_Kfp2yo9bjUOg",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setDropoffCoordinate(data.features[0].center);
      });
  };

  useEffect(() => {
    if (pickuplocation && dropofflocation) {
      getPickupCoordinate(pickuplocation);
      getDropoffCoordinate(dropofflocation);
    }
  }, [pickuplocation, dropofflocation]);
  const marks = [
    {
      value: 0,
      label: "0 min",
    },
    {
      value: 10,
      label: "10 min",
    },
    {
      value: 20,
      label: "20 min",
    },
    {
      value: 30,
      label: "30 min",
    },
  ];

  function valuetext(value) {
    return `${value} min`;
  }

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search" passHref>
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>

      {pickupCoordinate && dropoffCoordinate && (
        <Map
          radius={minutes / 10}
          fullscreen={true}
          pickupCoordinate={pickupCoordinate}
          dropoffCoordinate={dropoffCoordinate}
        />
      )}
      <SliderContainer>
        <Title>
          Select how much you are willing to walk on foot to your destination
          point.
        </Title>
        <Slider
          aria-label="Custom marks"
          defaultValue={0}
          onChange={(e, newValue) => {
            setMinutes(newValue);
          }}
          getAriaValueText={valuetext}
          step={5}
          max={30}
          valueLabelDisplay="auto"
          marks={marks}
        />{" "}
        <Link
          href={{
            pathname: pickuplocation && dropofflocation ? "/confirm" : "",
            query: {
              pickuplocation: pickuplocation,
              dropofflocation: dropofflocation,
            },
          }}
          passHref
        >
          <div className="p-8">
            <Button variant="outlined" fullWidth>
              Confirm
            </Button>
          </div>
        </Link>
      </SliderContainer>
    </Wrapper>
  );
};

const SliderContainer = tw.div`
flex-1  h-1/2 flex flex-col p-8
`;

const Wrapper = tw.div`
 flex flex-col h-screen 
`;

const RideContainer = tw.div`
flex-1  h-1/2 flex flex-col
`;

const Title = tw.div`
text-center text-s text-gray-500 border-b py-2
`;

const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer
`;

const BackButton = tw.img`
h-full object-contain   
`;

export default Walk;
