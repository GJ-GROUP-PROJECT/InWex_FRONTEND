import { Fraunces, Poppins } from "next/font/google";

export const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700"],
});

export const fraunces = Fraunces({
    variable: "--font-fraunces",
    weight: ["400", "500", "600", "700"],
});