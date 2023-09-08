import React from "react";
import "./VTcontent.css";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

function VTcontent(props) {
  let data = props.data.expData;

  return (
    <div
      key={props.index}
      className="section__Jobs-styledContent"
      style={
        props.activeTabId === props.index
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <h4>{data.position}</h4>
      {/* <h5>{data.period}</h5> */}
      <div className="VTContnetContainer">
        <div className="VTContnetContainerSteps">
          {data.details.map((detail) => (
            <p className="section__Jobs-detail">{detail}</p>
            ))}
        </div>
        <div className="VTContnetContainerImg">
          <AutoplaySlider
            play={true}
            cancelOnInteraction={false}
            interval={5000}
            buttons={false}
          >
            {data.images.map((images) => (
            <div data-src={images} />
            ))}
          </AutoplaySlider>
        </div>
      </div>
    </div>
  );
}

export default VTcontent;
