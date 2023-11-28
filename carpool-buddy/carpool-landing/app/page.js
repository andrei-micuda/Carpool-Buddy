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
    <main className="flex items-center justify-center h-screen overflow-hidden text-text relative">
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
            Navigate the urban jungle stress-free! Introducing our revolutionary
            carpooling platform designed for Bucharest, where every shared ride
            transforms traffic chaos into a smooth, eco-friendly journey. Join
            the movement, cut down on commute times, and embrace a greener
            tomorrow with our Carpool Bucharest – because together, we drive
            change!
          </Title>
          <Title level={5}>Ready in ...</Title>
          <Countdown targetDate="2024-01-01T00:00:00" />
          <div className="p-4"></div>
          {!sent ? (
            <Form onFinish={onFinish}>
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  placeholder="Your email"
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
              Thank you for your support. You will be notified once we launch.
            </Typography>
          )}
        </div>
        <div className="w-1/2 relative aspect-square">
          <Image src="/phone.png" fill alt="phone" />
        </div>
      </div>
    </main>
  );
}
