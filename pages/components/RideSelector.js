import React from "react";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../../data/carList";

const RideSelector = (props) => {
  const [rideDuration, setRideDuration] = useState(0);
  const [rideDistance, setRideDistance] = useState(0);

  useEffect(() => {
    const pickupCoord = props.pickupCoordinate;
    const dropoffCoord = props.dropoffCoordinate;

    if (pickupCoord && dropoffCoord) {
      rideDurationf(props);
    }
  }, [props]);

  const rideDurationf = (props) => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${props.pickupCoordinate[0]},${props.pickupCoordinate[1]};${props.dropoffCoordinate[0]},${props.dropoffCoordinate[1]}?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoibWljdTAxIiwiYSI6ImNscjN4emk5bTAyODYycmw3eGl1ODJ6ZXUifQ.53Ou-aCAC_Kfp2yo9bjUOg",
        })
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.routes[0]) {
          let route = data.routes[0];
          setRideDuration(route.duration / 60);
          setRideDistance(route.distance / 1000);
        }
      });
  };

  return (
    <Wrapper>
      <Title>Choose a ride, or swipe for more</Title>
      <CarList>
        {carList.map((car) => (
          <div
            key={car.service}
            className="
          flex items-center cursor-pointer hover:bg-gray-200"
            onClick={() => {
              props.setSelectedService(car.service);
            }}
          >
            <CarImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>5 min away</Time>
            </CarDetails>
            <CarPrice>
              {"$" + (rideDuration * car.multiplier).toFixed(2)}
            </CarPrice>
          </div>
        ))}
      </CarList>
    </Wrapper>
  );
};

const Wrapper = tw.div`
 flex-1 flex flex-col flex flex-col
`;

const Title = tw.div`
text-center text-s text-gray-500 border-b py-2
`;
const CarList = tw.div`
border-b
`;

const Info = tw.div`
px-8
`;

const CarImage = tw.img`
h-20 px-4
`;

const CarDetails = tw.div`
flex-1 px-8
`;
const Service = tw.div`
font-semibold`;
const Time = tw.div`
text-blue-500 text-xs
`;

const CarPrice = tw.div`
px-4 text-sm
`;

export default RideSelector;
