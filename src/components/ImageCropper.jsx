import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import getCroppedImg from "./cropImage";
import { Button, Image, Slider } from "antd";

const ImageCropper = ({ imageFile, aspect, setCropImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [visible, setVisible] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (imageFile) {
        const croppedImage = await getCroppedImg(imageFile, croppedAreaPixels, rotation);
        setCroppedImage(croppedImage);
        setCropImage(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);
  useEffect(() => {
    croppedAreaPixels?.height && showCroppedImage();
  }, [crop]);
  return (
    <ImageCropperCon>
      <Cropper
        image={imageFile}
        crop={crop}
        rotation={rotation}
        zoom={zoom}
        aspect={aspect || 3 / 5}
        onCropChange={setCrop}
        onRotationChange={setRotation}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <div>Rotation</div>
      <Slider value={rotation} min={0} max={360} onChange={(rotation) => setRotation(rotation)} />

      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
          showCroppedImage();
        }}
      >
        Preview
      </Button>
      <Image
        width={200}
        style={{
          display: "none",
        }}
        preview={{
          visible,
          src: croppedImage,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </ImageCropperCon>
  );
};

export default ImageCropper;

const ImageCropperCon = styled.div``;
