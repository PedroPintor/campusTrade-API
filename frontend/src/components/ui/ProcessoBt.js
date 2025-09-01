

export default function ProcessoBt({ onClick, children }) {
  return (
    <button className="btn btn-light border fw-bold" onClick={onClick}>
      {children}
    </button>
  );
}
