import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";

export default function Home() {
  return (
    <Wrapper>
      <Header>
        Carpool Buddy
      </Header>
      <div id="whereToBtn" className="px-4 mb-2">
        <Link href="/search" passHref>
          <InputButton>Where to ?</InputButton>
        </Link>
      </div>
      <Map />
      <ActionItems>
        <ActionButtons>
          <Link href="/search" passHref>
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              Carpool
            </ActionButton>
          </Link>
          <ActionButton className="text-red-600">
            <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
            Reserve (Not Available)
          </ActionButton>
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
 flex justify-between items-center
`;

const UberLogo = tw.img`
 h-28
`;

const ActionButtons = tw.div`
flex 
`;

const ActionButton = tw.div`
flex flex-col bg-gray-200 flex-1 m-1 h-32 items-center justify-center rounded-lg transform hover:scale-105 transition text-xl curson-pointer
`;

const ActionButtonImage = tw.img`
h-3/5
`;

const InputButton = tw.div`
h-20 bg-gray-200 text-2xl p-4 flex items-center justify-center rounded-lg transform hover:scale-105 transition mt-8
`;
