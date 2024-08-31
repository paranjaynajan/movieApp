"use client";
import React from "react";
import PrimaryButton from "../components/ButtonPrimary/ButtonPrimary";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] gap-8 px-4 text-white ">
      <h1 className="text-[32px] md:text-[48px] text-center font-semibold leading-tight">
        Your movie list is empty
      </h1>
      <div className="w-full flex justify-center">
        <PrimaryButton
          type="button"
          onClick={() => router.push("/movies")}
          className="w-[70%] sm:w-auto px-8 py-4 text-center"
        >
          Add a new movie
        </PrimaryButton>
      </div>
    </div>
  );
}
