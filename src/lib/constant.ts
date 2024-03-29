import {
  CreditCard,
  Home,
  Image,
  ImageOff,
  PaintBucket,
  Palette,
  ScanFace,
  User,
} from "lucide-react";

export const sidebar = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Image Restore",
    href: "/transformation/add/image-restore",
    icon: Image,
  },
  {
    title: "Generative Fill",
    href: "/transformation/add/generative-fill",
    icon: PaintBucket,
  },
  {
    title: "Object Remove",
    href: "/transformation/add/object-remove",
    icon: ScanFace,
  },
  {
    title: "Object Recolor",
    href: "/transformation/add/object-recolor",
    icon: Palette,
  },
  {
    title: "Background Remove",
    href: "/transformation/add/background-remove",
    icon: ImageOff,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Buy Credits",
    href: "/buy-credits",
    icon: CreditCard,
  },
];

export const transformationTypes = {
  "image-restore": {
    title: "Image Restore",
    description: "Restore the image to its original state",
    type: "restore",
    config: { restore: true },
  },
  "generative-fill": {
    title: "Generative Fill",
    description: "Fill blanks in the image",
    type: "fill",
    config: { fillBackground: true },
  },
  "object-remove": {
    title: "Object Remove",
    description: "Remove the object from the image",
    type: "remove",
    config: {
      remove: {
        prompt: "",
        multiple: true,
        removeShadow: true,
      },
    },
  },
  "object-recolor": {
    title: "Object Recolor",
    description: "Recolor the object in the image",
    type: "recolor",
    config: {
      recolor: {
        prompt: "",
        multiple: true,
        to: "",
      },
    },
  },
  "background-remove": {
    title: "Background Remove",
    description: "Remove the background from the image",
    type: "removeBackground",
    config: { removeBackground: true },
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const creditFee = -1;

export const collectionSvg = {
  removeBackground: ImageOff,
  restore: Image,
  fill: PaintBucket,
  recolor: Palette,
  remove: ScanFace,
};
