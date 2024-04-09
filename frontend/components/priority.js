const Priority = ({ level }) => {
  const colors = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-red-500",
  };

  return (
    <span className={`${colors[level] ?? "text-blue-500"}`}>
      [{level} priority]
    </span>
  );
};

export default Priority;
