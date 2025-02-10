import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection";
import "./page.styles.scss";
import "../styles/variables.scss";
import mainImage from "../../public/Images/Designer.jpeg";

import Image from "next/image";
export default function Home() {
  return (
    <div className="page">
      <div>
        <Header />
      </div>
      <div className="body-home">
        <TopSection />
      </div>
    </div>
  );
}
