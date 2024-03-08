import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { useRef, useState } from "react";
import setCanvasPreview from "./setCanvasPreview";
import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
  downloadBase64File,
} from "./ResuableUtils";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ type, name }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
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
    console.log(myNewCroppedFile);
    // download file
    downloadBase64File(imageData64, myFileName);
    setImgSrc("");
  };

  return (
    <div className="image-upload-container">
      <label htmlFor={name} className="form-label">
        Select a profile photo (max 2MB):
      </label>
      <input
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
            crop={crop}
            onChange={(percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
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
          <button
            style={{ padding: "1rem", fontSize: "2rem" }}
            onClick={handleDownloadClick}
          >
            Download
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCropper;
