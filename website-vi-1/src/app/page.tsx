import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection";
import "./page.styles.css";
import "../styles/variables.scss";

export default function Home() {
  return (
    <div className="page">
      <Header />
      <TopSection />
    </div>
  );
}
