import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "react-bootstrap";
import pic from "./images/human.jpg";
import axios from "axios";

function App() {
  const hiddenFileInput = React.useRef(null);
  const [image, setImage] = React.useState(pic);
  const [flower, setFlower] = React.useState(null);
  const [resFlower, setResFlower] = React.useState("")

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setResFlower("Click upload Please...")
    setImage(URL.createObjectURL(event.target.files[0]));
    setFlower(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (flower) {
      var formData = new FormData();
      formData.append("file", flower);
       await axios
        .post("http://34.121.80.205:8000/prediction", formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Access-Control-Allow-Origin': '*'
          },
        })
        .then(function (res) {
          console.log("SUCCESS!!");
          console.log(res.data.prediction.flowers);
          setResFlower(res.data.prediction.flowers)

        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    
    }
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "black",
          padding: "20px",
        }}
      >
        <Row
          sm
          className="h-20 w-100 d-flex justify-content-center align-content-center"
          style={{ margin: 0 }}
        >
          <Col
            sm
            className="w-100 d-flex justify-content-center align-content-center"
          >
            <h1 style={{
          color: "white",}}
        >🌷🌸🌹🌺 FLOWERs API 🌼🥀💐🌻</h1>
          </Col>
        </Row>
        <div
          className="h-80 w-100 d-flex justify-content-center align-content-center"
          style={{ margin: 0 }}
        >
          <Row
            sm
            className="d-flex justify-content-center align-content-center"
            style={{ width: "1000px", height: "800px", padding: "20px" }}
          >
            <Col
              sm
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                backgroundColor: "#7FFF00",
                padding: "10px",
                boxShadow: "2px 3px 5px 0px rgba(158,158,158,1)",
              }}
            >
              <Row
                sm
                style={{
                  width: "100%",
                  height: "80%",
                  margin: 0,
                  paddingBottom: 20,
                }}
              >
                <Col
                  sm
                  className="d-flex justify-content-center align-content-center"
                  style={{ width: "100%", height: "100%", margin: 0, borderRadius: "50px",
                  backgroundColor: "black",
                  padding: "10px",
                  boxShadow: "2px 3px 5px 0px rgba(158,158,158,1)", }}
                  sm
            
                >
                  <img
                    src={image}
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    alt="pic"
                  />
                </Col>
              </Row>
             
              <Row
                sm
                className="w-100 h-10"
                style={{ margin: 0, paddingBottom: 20 }}
              >
                <Col sm className="w-100 h-100">
                  <Button
                    onClick={handleClick}
                    variant="info"
                    className="w-50 h-100"
                  >
                    CHOOSE YOUR FLOWER
                  </Button>
                  
                  <Button
                    onClick={uploadImage}
                    variant="danger"
                    className="w-50 h-100"
                  >
                    UPLOAD
                  </Button>
                  <input
                    onChange={handleChange}
                    type="file"
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                  />
                  <br/>
               <Row
                sm
                className="w-100 h-10"
                style={{ margin: 0, paddingTop: 20 }}
                >
                <Col sm className="w-100 h-100">
                <h5>💮 Flower  :</h5> <h4 style={{
          color: "red", textAlign: "center",}}>{"  "+resFlower}</h4>
                </Col>
              </Row>
                </Col>
              </Row>
              <Row
                sm
                className="w-100 h-10"
                style={{ margin: 0, paddingBottom: 20 }}
              >
                <Col sm className="w-100 h-100">
                  
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default App;
