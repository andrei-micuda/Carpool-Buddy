"use client";

import { useEffect, useState } from "react";
import { uploadEmail } from "./firebase-setup";
// import image from "./beams-home.jpg";
// import phone from "./phone.png";
import Image from "next/image";
import Title from "antd/es/typography/Title";
import Countdown from "./Countdown";
import { Button, Form, Input, Space, Typography } from "antd";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

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
    <main className="flex flex-col items-center justify-center overflow-scroll text-text relative">
      <Image
        src="/beams-home.jpg"
        alt="background"
        fill={true}
        style={{ zIndex: -1, objectFit: "cover", layout: "fill" }}
      />
      <div className="flex items-center justify-center h-screen w-8/12">
        <div className="w-1/2">
          <Title>Carpool Buddy</Title>
          <Title level={5}>
            Navigați prin jungla urbană fără stres! Platforma noastră revoluționară 
            de carpooling construită pentru București transformă fiecare cursă
            din traficul haotic într-o experiență calmă și ecologică. Alăturați-vă
            inițiativei, reduceți timpul de deplasare și bucurați-vă de un viitor
            mai ecologic cu Carpool Bucharest – deoarece împreună putem face o schimbare!
          </Title>
          <Title level={5}>Lansare la ...</Title>
          <Countdown targetDate="2024-01-01T00:00:00" />
          <div className="p-4"></div>
          {!sent ? (
            <Form onFinish={onFinish}>
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  placeholder="Introduceți adresa de Email"
                  type="email"
                  value={email}
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
              Mulțumim pentru sprijin. Vă vom contacta imediat ce aplicația este lansată.
            </Typography>
          )}
        </div>
        <div className="w-1/2 relative aspect-square">
          <Image src="/render_square.png" fill alt="phone" />
        </div>
      </div>
      <div className="flex items-center justify-center h-screen w-8/12">
        <div className="w-1/3">
          <Image src="/prototype3.gif"  alt="phone" width={393} height={852} />
        </div>
        <div className="w-2/3">
        </div>
      </div>
    </main>
  );
}
