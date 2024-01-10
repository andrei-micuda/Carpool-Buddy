import { useEffect, useState, useContext } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { useRouter } from "next/router";
import RideSelector from "./components/RideSelector";
import { Button } from "@mui/material";
import AppContext from "../data/appContext";

const Confirm = () => {
  const router = useRouter();
  const { pickuplocation, dropofflocation } = router.query;
  const [pickupCoordinate, setPickupCoordinate] = useState();
  const [dropoffCoordinate, setDropoffCoordinate] = useState();
  const [selectedService, setSelectedService] = useState();
  const [searching, setSearching] = useState(false);
  const { minutes } = useContext(AppContext);

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

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search" passHref>
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>

      {pickupCoordinate && dropoffCoordinate && (
        <Map
          fullscreen={true}
          pickupCoordinate={pickupCoordinate}
          dropoffCoordinate={dropoffCoordinate}
        />
      )}
      <RideContainer>
        <RideSelector
          minutes={minutes}
          setSelectedService={setSelectedService}
          pickupCoordinate={pickupCoordinate}
          dropoffCoordinate={dropoffCoordinate}
        />

        <Link
          href={{
            pathname: "/searchingride",
            query: {
              service: selectedService,
              pickuplocation: pickuplocation,
              dropofflocation: dropofflocation,
              minutes: minutes
            },
          }}
          passHref
        >
          <Button
            variant="outlined"
            className="flex text-xl  items-center py-4 mt-4 justify-center text-center m-4 transform transition cursor-pointer"
            disabled={selectedService ? false : true}
          >
            Confirm
          </Button>
        </Link>
      </RideContainer>
    </Wrapper>
  );
};

const Wrapper = tw.div`
 flex flex-col h-screen 
`;

const RideContainer = tw.div`
flex-1  h-1/2 flex flex-col
`;

const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer
`;

const BackButton = tw.img`
h-full object-contain   
`;

export default Confirm;
