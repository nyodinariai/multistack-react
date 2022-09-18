import Advantages from "@partials/index/advantages/_advantages";
import FrequentQuestions from "@partials/index/frequent-questions/_frequent-questions";
import Presentation from "@partials/index/presentation/_presentation";
import { GetStaticProps } from "next";


export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "",
    },
  };
};

export default function Index() {

  return <div>
    <Presentation/>
    <Advantages/>
    <FrequentQuestions/>
  </div>;
}
