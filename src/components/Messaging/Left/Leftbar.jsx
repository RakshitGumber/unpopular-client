import "./Leftbar.css";
import "../common.css";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
// <MessagingMain />;
function Leftbar() {
  const roomId = v4();
  return (
    <div className="msg-panel-wrapper">
      <Link to={`../home`}>back</Link>
      <Link to="">Close</Link>
      <Link to={`./${roomId}`}>room 1</Link>
    </div>
  );
}

export default Leftbar;
