import { photos } from "../photos.js";

export default function Logo() {
  return (
    <a href="#top" className="inline-flex items-center" aria-label="The Barbell Ballerina home">
      <img src={photos.logo} alt="The Barbell Ballerina" className="h-8 w-auto sm:h-10" />
    </a>
  );
}

