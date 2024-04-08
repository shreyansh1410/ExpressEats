const Shimmer = () => {
    return (
      <div className="restaurant-list flex justify-between flex-wrap my-8 mx-[100px]" data-testid="shimmer">
        {Array(10)
          .fill("")
          .map((e, index) => (
            <div key={index} className="shimmer-card w-[400px] mx-3 my-8 h-[300px] p-8 bg-gray-300"></div>
          ))}
      </div>
    );
  };
  
  export default Shimmer;