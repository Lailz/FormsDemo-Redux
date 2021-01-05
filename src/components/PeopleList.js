import PersonCard from "./PersonCard";
import { useSelector } from "react-redux";

const PeopleList = () => {
  const people = useSelector((state) => state.people);
  const cards = people.map((person) => (
    <PersonCard key={person.id} person={person} />
  ));
  return <div className="row my-5">{cards}</div>;
};

export default PeopleList;
