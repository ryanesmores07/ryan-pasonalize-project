import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { LuArrowBigRightDash } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import setCanvasPreview from "./setCanvasPreview";
import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
  downloadBase64File,
} from "./ResuableUtils";
import styled, { keyframes } from "styled-components";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ type, name, onSubmit }) => {
  const imgRef = useRef(null);
  const inputRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [cropEnabled, setCropEnabled] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    setCropEnabled(false);
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleOnCropComplete = (crop, pixelCrop) => {
    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );
  };

  const handleDownloadClick = (e) => {
    e.preventDefault();
    const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
    const imageData64 = previewCanvasRef.current.toDataURL(
      "image/" + fileExtension
    );
    const myFileName = "croppedPhoto" + fileExtension;
    // File to be uploaded
    const myNewCroppedFile = base64StringtoFile(imageData64, myFileName);
    // download file
    downloadBase64File(imageData64, myFileName);
    setCropEnabled(false);
    setImgSrc("");
  };

  const handleCrop = (e) => {
    e.preventDefault();
    setCropEnabled(!cropEnabled);
  };

  return (
    <Wrapper className="image-upload-container">
      <label htmlFor={name} className="form-label">
        Select a profile photo (max 2MB):
      </label>
      <input
        ref={inputRef}
        type={type}
        id={name}
        name={name}
        onChange={onSelectFile}
        className="form-input"
        accept="image/*"
      />
      {error && <p style={{ color: "var(--red)" }}>{error}</p>}
      {imgSrc && (
        <div>
          <ReactCrop
            onComplete={handleOnCropComplete}
            crop={cropEnabled ? crop : ""}
            onChange={(percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              onClick={onImageLoad}
              ref={imgRef}
              src={imgSrc}
              alt="upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <br />
        </div>
      )}
      {imgSrc && (
        <>
          <button className="crop-button" onClick={handleCrop}>
            <LuArrowBigRightDash
              style={{ fontSize: "3rem", transform: "translateY(-3px)" }}
            />
            <span>イメージを切り取る</span>
          </button>
          <br />
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: 150,
              height: 150,
            }}
          />
          <br />

          <button className="btn" onClick={handleDownloadClick}>
            ダウンロード
          </button>
        </>
      )}
    </Wrapper>
  );
};

export default ImageCropper;

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Wrapper = styled.section`
  button {
    font-size: 1.5rem;
    background-color: var(--green);
    &:hover {
      background-color: var(--dark-green);
    }
  }
  .crop-button {
    display: flex;
    margin-right: 1rem;
    font-size: 1.7rem;
    font-weight: 700;
    cursor: pointer;
    color: var(--red);
    background-color: transparent;
    animation: ${blink} 1s ease-in-out infinite;
    transition: all 0.01s ease;
    &:hover {
      background-color: transparent;
      transform: scale(1.1);
      animation: none;
      color: var(--dark-red);

      filter: drop-shadow(0 5px 3px rgba(0, 0, 0, 0.5));
    }
  }
`;
