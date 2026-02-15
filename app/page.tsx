import { HomeSections } from "@/components/home/HomeSections";

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

export default function Home() {
  return <HomeSections />;
}
