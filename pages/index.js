import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <Wrapper>
      <Header>
        <UberLogo src="../logo.jpg"></UberLogo>
        <Typography variant="h6">Carpool Buddy</Typography>
      </Header>
      <div id="whereToBtn" className="px-4 mb-2">
        <Link href="/search" passHref>
          <Button variant="outlined" fullWidth>
            Where to ?
          </Button>
        </Link>
      </div>
      <Map />
      <ActionItems>
        <ActionButtons>
          <Link href="/search" passHref>
            <Button
              variant="outlined"
              className="flex flex-col"
              style={{ width: "45%" }}
            >
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              Carpool
            </Button>
          </Link>{" "}
          <Button
            variant="outlined"
            disabled
            className="flex flex-col"
            style={{ width: "45%" }}
          >
            <ActionButtonImage src="../booking.png" />
            Reserve (Not Available)
          </Button>
        </ActionButtons>
      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div`
 flex flex-col h-screen
`;

const ActionItems = tw.div`
 flex-1 p-4
`;

const Header = tw.div`
 flex items-center justify-center
`;

const UberLogo = tw.img`
 h-20
`;

const ActionButtons = tw.div`
flex justify-around	h-32
`;

const ActionButton = tw.div`
flex border-2	 flex-col border-blue-200 flex-1 m-1 h-32 items-center justify-center rounded-lg transform hover:scale-105 transition text-sm	curson-pointer text-blue-500
`;

const ActionButtonImage = tw.img`
h-3/5
`;

const InputButton = tw.div`
h-20  bg-blue-200 text-2xl p-4 flex items-center justify-center rounded-lg transform hover:scale-105 transition mt-8
`;
