import spinner from "../assets/jpg/spinner-2.gif";

function ProcessingSpinner({ imgStyle, imgContStyle }) {
  return (
    <div
      style={{
        backgroundColor: "transparent",
        height: "100px",
        width: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...imgContStyle,
      }}
    >
      <img
        style={{
          height: "inherit",
          width: "inherit",
          ...imgStyle,
        }}
        src={spinner}
        alt=""
      />
    </div>
  );
}

export default ProcessingSpinner;
