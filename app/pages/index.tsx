import TopSection from "@/components/TopSection/TopSection";
import "@/styles/index.styles.scss";
import "@/styles/variables.scss";

interface Mission {
  _id: string;
  heading: string;
  content: string[];
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mission`); 
    const missionData = await res.json();

    return {
      props: {
        missionData,
      },
    };
  } catch (error) {
    console.error("Error fetching mission data:", error);
    return {
      props: {
        missionData: [],
      },
    };
  }
}

export default function Home({ missionData }: { missionData: Mission[] }) {
  return (
    <div className="page">
      <div className="body-home">
        <TopSection missionData={missionData} />
      </div>
    </div>
  );
}
