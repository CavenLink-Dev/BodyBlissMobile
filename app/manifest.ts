import type { MetadataRoute } from "next";

/*
  Web app manifest — makes the site installable from the browser on iPhone
  and Android ("Add to Home Screen") with the lotus icon and brand colours.
*/
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Body Bliss Mobile Massage",
    short_name: "Body Bliss",
    description:
      "Book a vetted massage therapist to your home, hotel or workplace in Adelaide.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F4EE",
    theme_color: "#F4F4EE",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
