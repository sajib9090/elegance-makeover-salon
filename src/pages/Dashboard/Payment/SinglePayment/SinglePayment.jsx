import { useParams } from "react-router-dom";

const SinglePayment = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h1>single payment</h1>
    </div>
  );
};

export default SinglePayment;
