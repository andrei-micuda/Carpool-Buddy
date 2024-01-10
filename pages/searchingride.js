import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { useRouter } from "next/router";
import RideSelector from "./components/RideSelector";
import { Button, Dialog, DialogTitle } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { hotjar } from 'react-hotjar'
import {event} from '../lib/gtag';

const SearchingRide = () => {
  const router = useRouter();
  const { pickuplocation, dropofflocation, service, minutes } = router.query;
  const [pickupCoordinate, setPickupCoordinate] = useState();
  const [dropoffCoordinate, setDropoffCoordinate] = useState();
  const [selectedService, setSelectedService] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    hotjar.identify(null, { pickuplocation, dropofflocation, service, minutes });
    hotjar.event("confirm_ride");
    event("confirm_ride", null, null, { pickuplocation, dropofflocation, service, minutes });
    setTimeout(() => {
      setOpen(true);
    }, 20000);
  }, []);

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
      <Dialog open={open}>
        <DialogTitle style={{ textAlign: "center" }}>
          We are sorry, there are no drivers available now. Try again later.
        </DialogTitle>
        <div style={{ padding: "0 2rem 2rem 2rem" }}>
          <Link href="/">
            <Button variant="outlined" fullWidth>
              Main page
            </Button>
          </Link>
        </div>
      </Dialog>
      <ButtonContainer>
        <Link href="/search" passHref>
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>

      {pickupCoordinate && dropoffCoordinate && (
        <Map
          style={{ filter: "brightness(0.5)" }}
          fullscreen={true}
          pickupCoordinate={pickupCoordinate}
          dropoffCoordinate={dropoffCoordinate}
        />
      )}
      {!open ? (
        <div className="p-4 absolute bottom-0 w-full rounded-t-lg bg-white flex items-center">
          <CircularProgress style={{ marginRight: "2rem" }} />
          We are searching for your ride. Please wait...{" "}
        </div>
      ) : (
        ""
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`
 flex flex-col h-screen 
`;

const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer
`;

const BackButton = tw.img`
h-full object-contain   
`;

export default SearchingRide;
