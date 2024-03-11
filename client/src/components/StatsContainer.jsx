import StatItem from "./StatItem";
import styled from "styled-components";
import {
  kintone,
  powerplat,
  infra,
  webai,
} from "../assets/images/DepartmentIcons/dept-icons";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "kintone",
      count: defaultStats?.kintone || 0,
      icon: <img src={kintone} />,
      color: "var(--yellow)",
      bcg: "var(--light-yellow)",
    },
    {
      title: "power-platform",
      count: (defaultStats && defaultStats["power-platform"]) || 0,
      icon: <img src={powerplat} />,
      color: "var(--dark-green)",
      bcg: "var(--light-green)",
    },
    {
      title: "web-ai",
      count: (defaultStats && defaultStats["web-ai"]) || 0,
      icon: <img src={webai} />,
      color: "var(--pink)",
      bcg: "var(--light-pink)",
    },
    {
      title: "infrastructure",
      count: defaultStats?.infrastructure || 0,
      icon: <img src={infra} />,
      color: "var(--purple)",
      bcg: "var(--light-purple)",
    },
  ];

  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
