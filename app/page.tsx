"use client"
import { useEffect, useState } from "react";
import InputFieldPrimary from "./components/InputPrimary/InputPrimary";
import PrimaryButton from "./components/ButtonPrimary/ButtonPrimary";
import { useRouter } from "next/navigation";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setError] = useState({
    email: "",
    password: "",
  })
  const [storage, setStroage] = useState(true)
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, [router]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setError((prev) => { return { ...prev, [name]: "" } })
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };
    let isValid = true
    if (!formData.email) {
      isValid = false
      newErrors.email = "Email is required."
    }

    if (!formData.password) {
      isValid = false
      newErrors.password = "Password is required."
    }

    setError(newErrors)
    if (isValid) {
      console.log(formData)
      if (storage) {
        localStorage.setItem("token", formData.email);
      } else {
        sessionStorage.setItem("token", formData.email);
      }

      router.push("/home");

    }
  }
  return (
    <main className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-10 items-center w-auto xs:w-[400px] px-10">
          <h1 className="text-[32px] md:text-[48px] text-white font-[500]">
            Sign in
          </h1>
          <div className="w-full flex flex-col gap-3">
            <InputFieldPrimary
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              error={errors.email}
            />

            <InputFieldPrimary
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              error={errors.password}
            />
            <div className="flex justify-center items-center gap-4 mb-4">
              <input type="checkbox"
                onChange={() => setStroage(!storage)}
                className=" h-5 w-5 border
               border-gray-300 rounded-sm bg-white checked:bg-[#2BD17E] 
               checked:border-transparent focus:outline-none transition duration-200 
              align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"/>
              <span className="text-white">Remember Me</span>
            </div>
            <PrimaryButton type="submit">
              Sign Up
            </PrimaryButton>
          </div>
        </div>
      </form>
    </main>
  );
}
