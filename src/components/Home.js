import Notes from "./Notes";

const Home = (props) => {
  return (
    <div className="container mt-5">
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
