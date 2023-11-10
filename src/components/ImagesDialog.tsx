import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { CloseButton, Modal, rem } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";

interface ImagesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}
const ImagesDialog = ({ images, isOpen, onClose }: ImagesDialogProps) => {
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);

  const ref = useClickOutside(onClose);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  return (
    <Modal
      styles={{
        content: {
          backgroundColor: "transparent",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        header: {
          backgroundColor: "transparent",
        },
      }}
      fullScreen
      opened={isOpen}
      padding={0}
      centered
      withCloseButton={false}
      transitionProps={{ duration: TRANSITION_DURATION }}
      onClose={onClose}
    >
      <CloseButton className="absolute top-2 right-2" onClick={onClose} />
      <Carousel
        ref={ref}
        loop
        getEmblaApi={setEmbla}
        maw={500}
        slideGap={20}
        withIndicators={images.length > 1}
        withControls={images.length > 1}
        styles={{
          indicators: {
            bottom: 0,
          },
          indicator: {
            width: rem(12),
            height: rem(4),
            transition: "width 250ms ease",
            "&[data-active]": {
              width: rem(40),
            },
          },
        }}
      >
        {images.map((image, index) => (
          <Carousel.Slide key={index}>
            <img
              src={image}
              style={{
                width: rem(500),
                height: rem(700),
                objectFit: "contain",
              }}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Modal>
  );
};

export default ImagesDialog;
