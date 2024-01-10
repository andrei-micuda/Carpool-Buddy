import React, { useState, useEffect, useContext } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";
import { coordsToPlace, textToPlaces } from "../data/geocoding";
import AppContext from "../data/appContext";
import { Autocomplete, Button, TextField } from "@mui/material";
import Map from "./components/Map";

const Search = () => {
  const [pickuplocation, setPickuplocation] = useState("");
  const [dropofflocationInput, setdropofflocationInput] = useState("");
  const [selectedDropoff, setSelectedDropoff] = useState("");
  const [selectedPickup, setSelectedPickup] = useState("");
  const { coordinates } = useContext(AppContext);
  const [locationsList, setlocationsList] = useState([]);

  //setPickuplocation(coordsToPlace(coordinates));
  useEffect(() => {
    if (coordinates)
      coordsToPlace(coordinates).then((place) => setPickuplocation(place));
  }, [coordinates]);

  useEffect(async () => {
    if (coordinates) {
      // console.log(coordinates);
      const places = await textToPlaces(dropofflocationInput, coordinates);
      setlocationsList(places);
    }
  }, [dropofflocationInput]);

  useEffect(() => {
    console.log(locationsList);
  }, [locationsList]);

  useEffect(() => {
    console.log(selectedDropoff);
  }, [selectedDropoff]);

  return (
    <Wrapper>
      <Map></Map>
      <ButtonContainer>
        <Link href="/" passHref>
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <InputContainer>
        <FromToIcons>
          <CircleIcon src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
          <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
          <SquareIcon src="https://img.icons8.com/windows/50/000000/square-full.png" />
        </FromToIcons>
        <InputBoxes>
          <div className="p-2"></div>
          <Autocomplete
            placeholder="Enter pickup location"
            onChange={(event, newValue) => setSelectedPickup(newValue)}
            value={selectedPickup}
            id="pickup"
            filterOptions={(x) => x}
            autoComplete
            includeInputInList
            filterSelectedOptions
            options={
              pickuplocation
                ? [pickuplocation, ...locationsList]
                : locationsList
            }
            noOptionsText="Type to see suggestions"
            renderInput={(params) => (
              <TextField {...params} label="Choose starting location" />
            )}
            onInputChange={(event, newInputValue) => {
              setdropofflocationInput(newInputValue);
            }}
          />
          <div className="p-2"></div>
          <Autocomplete
            disablePortal
            onChange={(event, newValue) => setSelectedDropoff(newValue)}
            id="destination"
            filterOptions={(x) => x}
            autoComplete
            includeInputInList
            filterSelectedOptions
            options={locationsList}
            noOptionsText="Type to see suggestions"
            renderInput={(params) => (
              <TextField {...params} label="Where to?" />
            )}
            onInputChange={(event, newInputValue) => {
              setdropofflocationInput(newInputValue);
            }}
          />
          <div className="p-2"></div>
        </InputBoxes>
      </InputContainer>

      <ul>
        <li>
          <SavedPlaces className="text-red-600">
            <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
            Saved Places (Not available)
          </SavedPlaces>
        </li>
      </ul>

      <Link
        href={{
          pathname: selectedDropoff && selectedPickup ? "/walk" : "",
          query: {
            pickuplocation: selectedPickup,
            dropofflocation: selectedDropoff,
          },
        }}
        passHref
      >
        <div className="m-4 ">
          <Button variant="outlined" fullWidth>
            Confirm Locations
          </Button>
        </div>
      </Link>
    </Wrapper>
  );
};

export default Search;

const Wrapper = tw.div`
 bg-gray-200 h-screen
`;

const ButtonContainer = tw.div`
bg-white px-4 w-auto
`;
const InputContainer = tw.div`
bg-white flex items-center px-4 mb-2
`;

const FromToIcons = tw.div`
flex flex-col w-10 mr-2 items-center
`;

const BackButton = tw.img`
h-12 cursor-pointer
`;

const Options = tw.div`bg-white w-full`;

const Option = tw.div`bg-white flex text-l items-center px-4 py-2`;

const CircleIcon = tw.img`
h-2.5
`;

const Line = tw.img`
h-10
`;

const SquareIcon = tw.img`
h-3
`;

const InputBoxes = tw.div`
flex flex-col flex-1
`;

const Input = tw.input`
h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`;

const PlusIcon = tw.img`
h-10 w-10 bg-gray-200 rounded-full ml-3
`;

const StarIcon = tw.img`
rounded-full bg-gray-400 p-1 mr-2 h-7 w-7 
`;

const LocationIcon = tw.img`
rounded-full bg-gray-400 p-1 mr-2 h-7 w-7 
`;

const SavedPlaces = tw.div`
bg-white flex text-l items-center px-4 py-2
`;

const ConfirmButtonContainer = tw.div`
bg-black flex text-xl  items-center py-2 text-white mt-4 justify-center text-center m-12 transform hover:scale-105 transition cursor-pointer
`;
