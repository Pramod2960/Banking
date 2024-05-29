"use client";
import CountUp from "react-countup";
import React from "react";

export const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <>
    <div className="w-full">
      <CountUp 
      decimal=","
      prefix="₹"  
      duration={2}
      decimals={2}
      end={amount} />
    </div>
    </>
  );
};
