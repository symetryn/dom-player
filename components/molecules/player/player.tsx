import React, { useEffect, useRef, useState } from "react";
import Pixel from "../../atoms/pixel/pixel";

interface color {
  key: number;
  r: number;
  g: number;
  b: number;
  a: number;
}

const Player = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [colors, setColors] = useState<color[]>();
  const resizeConstant = 0.2;
  const resolution = 5;

  const initVideo = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas == null || video == null) return;

    const context = canvas.getContext("2d");

    const width = video.videoWidth * resizeConstant;
    const height = video.videoHeight * resizeConstant;
    canvas.width = width;
    canvas.height = height;

    if (context == null) return;
    context.drawImage(video, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;
    const length = data.length;

    console.log(length);

    const localColors: color[] = [];
    for (let i = 0; i < length; i += 4) {
      let result: color = {
        key: i,
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
        a: data[i + 3],
      };
      localColors.push(result);
    }

    setColors(localColors);

    video.play();
    window.requestAnimationFrame(() => {
      initVideo();
    });
  };

  return (
    <div>
      <video
        style={{ display: "none" }}
        ref={videoRef}
        src="../../../assets/video2.mp4"
        autoPlay={true}
        onLoadedData={initVideo}
      ></video>
      <canvas ref={canvasRef} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(${resolution}px, 1fr))`,
          width: "320px",
        }}
      >
        {colors &&
          colors.map((color, index) => {
            return (
              <Pixel key={color.key} color={color} resolution={resolution} />
            );
          })}
      </div>
    </div>
  );
};

export default Player;
