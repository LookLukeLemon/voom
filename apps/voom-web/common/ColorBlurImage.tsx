/* eslint-disable jsx-a11y/alt-text */
import { ImageProps } from 'next/image';
import React from 'react';
import BaseImage from './BaseImage';

const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const ColorBlurImage = (props: ImageProps) => {
  return (
    <BaseImage
      placeholder="blur"
      blurDataURL={rgbDataURL(243, 244, 246)}
      {...props}
    />
  );
};

export default ColorBlurImage;
