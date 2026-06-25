import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prashant Kumar Singh — Portfolio",
    short_name: "PK Portfolio",
    description:
      "Software Engineer & Applied AI Engineer building scalable software and intelligent systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
