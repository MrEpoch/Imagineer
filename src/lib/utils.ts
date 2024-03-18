import qs from "qs";
import { handleError } from "./handleError";

function shimmer(w: number, h: number) {
  return `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(shimmer(1000, 1000))}`;

export function formUrlQuery({
  searchParams,
  key,
  value,
}: {
  searchParams: string;
  key: string;
  value: string;
}) {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };

  return `${window.location.pathname}?${qs.stringify(params, { skipNulls: true })}`;
}

export function removeKeysFromQuery({
  searchParams,
  keysToRemove,
}: {
  searchParams: string;
  keysToRemove: string[];
}) {
  const currentUrl = qs.parse(searchParams);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  Object.keys(currentUrl).forEach(
    (key) => currentUrl[key] == null && delete currentUrl[key],
  );

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
}

export function debounce(
  funcToDebounce: (...args: any[]) => void,
  delay: number,
) {
  let timeOutId: NodeJS.Timeout | null;

  return (...args: any[]) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => funcToDebounce.apply(null, args), delay);
  };
}

const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export function getImageSize(
  type: string,
  image: any,
  dimension: "width" | "height",
): number {
  if (type === "fill")
    return (
      aspectRatioOptions[
        image.aspectRatio as keyof typeof aspectRatioOptions
      ]?.[dimension] || 1000
    );
  return image?.[dimension] || 1000;
}

export function download(url: string, filename: string) {
  if (!url) handleError("image-download-failed", window.location.href);

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;

      if (filename && filename.length)
        a.download = `${filename.replace(" ", "_")}.png`;
      document.body.append(a);
      a.click();
    })
    .catch((err) => {
      console.error(err);
      handleError("image-download-failed", window.location.href);
    });
}

// I don't really wanna know how this thing will be used anyway

export const deepMergeObjects = (obj1: any, obj2: any) => {
  if (obj2 === null || obj2 === undefined) {
    return obj1;
  }

  let output = { ...obj2 };

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        obj2[key] &&
        typeof obj2[key] === "object"
      ) {
        output[key] = deepMergeObjects(obj1[key], obj2[key]);
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};
