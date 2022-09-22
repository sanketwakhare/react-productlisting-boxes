import "./Box.css";
const Box = (props) => {
  const { value, show } = props;
  return (
    <div className="box" data-id={value}>
      {show && value}
    </div>
  );
};

export default Box;
