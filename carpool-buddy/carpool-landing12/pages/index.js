"use client";

import { useEffect, useRef, useState } from "react";
import { uploadEmail } from "./api/firebase-setup";
// import image from "./beams-home.jpg";
// import phone from "./phone.png";
import Image from "next/image";
import Title from "antd/es/typography/Title";
import Countdown from "./Countdown";
import { DownOutlined } from "@ant-design/icons";

import {
  Button,
  Col,
  Form,
  Input,
  List,
  Row,
  Space,
  Steps,
  Typography,
} from "antd";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const pageTwo = useRef();

  const executeScroll = () => pageTwo.current.scrollIntoView();

  useEffect(() => {
    console.log(email);
  }, [email]);

  const onFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setSent(true);
    }, 1000);

    uploadEmail(email);
    setEmail("");
  };

  return (
    <>
      <div className="h-screen w-screen text-text fixed">
        <Image
          src="/beams-home.jpg"
          alt="background"
          fill={true}
          style={{
            zIndex: -1,
            objectFit: "cover",
            layout: "fill",
          }}
        />
      </div>
      <main className="flex justify-center min-h-screen text-text relative py-8">
        <Row justify={"center"} align={"middle"}>
          <Col xs={22} md={12} lg={10}>
            <Title>Carpool Buddy</Title>
            <Title level={5} style={{ textAlign: "justify" }}>
              Navigați prin jungla urbană fără stres! Platforma noastră
              revoluționară de carpooling construită pentru București transformă
              fiecare cursă din traficul haotic într-o experiență calmă și
              ecologică. Alăturați-vă inițiativei, reduceți timpul de deplasare
              și bucurați-vă de un viitor mai ecologic cu Carpool Bucharest –
              deoarece împreună putem face o schimbare!
            </Title>
            <Title level={5}>Lansare la ...</Title>
            <Countdown targetDate="2024-02-01T00:00:00" />
            <div className="p-4"></div>
            {!sent ? (
              <Form onFinish={onFinish}>
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    placeholder="Introduceți adresa de Email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                    style={{ background: "oklch(0.321785 0.02476 255.702)" }}
                  >
                    Get notified
                  </Button>
                </Space.Compact>
              </Form>
            ) : (
              <Typography>
                Mulțumim pentru sprijin. Vă vom contacta imediat ce aplicația
                este lansată.
              </Typography>
            )}
          </Col>
          <Col md={0} lg={10} xl={8}>
            <div className="relative aspect-square">
              <Image src="/render_square.png" fill alt="phone" />
            </div>
          </Col>
        </Row>
        <div className="absolute bottom-4" onClick={executeScroll}>
          <div className="scroll-button1"></div>
          <div className="scroll-button2"></div>
        </div>

        {/* <Button
          onClick={executeScroll}
          className="absolute bottom-4"
          size="large"
          icon={<DownOutlined />}
        >
          CUM FUNCTIONEAZA?
        </Button> */}
      </main>

      <main
        className="flex justify-center min-h-screentext-text relative"
        ref={pageTwo}
      >
        <Row justify={"center"} align={"middle"} className="w-screen">
          <Col
            md={8}
            className="h-screen flex justify-center"
            style={{ alignItems: "center" }}
          >
            <div
              className="h-2/3 relative rounded-3xl overflow-hidden border-8 border-stone-950"
              style={{ aspectRatio: "1/2.16" }}
            >
              <Image src="/prototype3.gif" alt="phone" fill={true} />
            </div>
          </Col>
          <Col md={8} className="p-2">
            <Title>Cum functioneaza?</Title>
            <Steps
              style={{ color: "black" }}
              direction="vertical"
              current={""}
              items={[
                {
                  title: "Alege destinatia.",
                },
                {
                  title:
                    "Alege distanta maxima pe care esti dispus sa o parcurgi.",
                },
                {
                  title: "Selecteaza soferul.",
                },
                {
                  title: "Intalneste-te cu soferul.",
                },
                {
                  title: "Carpool pe ruta determinata.",
                },
                {
                  title: "Mergi distanta ramasa pe jos.",
                },
              ]}
            />
          </Col>
        </Row>
      </main>
    </>
  );
}
