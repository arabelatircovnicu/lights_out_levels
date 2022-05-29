import styled from "styled-components";
import backgroundImageOn from "./Light_On.png";
import backgroundImageOff from "./Light_Off.png";

const lightOnStyle = {
  backgroundImage: `url(${backgroundImageOn})`,
  width: "100px",
  height: "100px",
  backgroundSize: "cover"
};

const lightOffStyle = {
  backgroundImage: `url(${backgroundImageOff})`,
  width: "100px",
  height: "100px",
  backgroundSize: "cover"
};

const Button = styled.button``;

function ToggleButton() {
  return (
    <button className="ToggleButtonStyle" type="button">
      Click Me!
    </button>
  );
}

function DisplayLights(lights) {
  return (
    <table>
      <tbody>
        {lights.map((items, index) => {
          return (
            <tr>
              {items.map((subItems, sIndex) => {
                if (subItems == 1) {
                  return (
                    <td>
                      <Button
                        style={lightOnStyle}
                        onClick={ToggleButton}
                      ></Button>
                    </td>
                  );
                } else {
                  return (
                    <td>
                      <Button
                        style={lightOffStyle}
                        onClick={ToggleButton}
                      ></Button>
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DisplayLights;
