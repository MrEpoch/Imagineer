export declare type Transformations = {
  restore?: boolean;
  fillBackground?: boolean;
  remove?: {
    prompt: string;
    removeShadow?: boolean;
    multiple?: boolean;
  };
  recolor?: {
    prompt?: string;
    to: string;
    multiple?: boolean;
  };
  removeBackground?: boolean;
};

export declare type AspectRatioKeys = "16:9" | "4:3" | "1:1";

declare type AddImageParams = {
  image: {
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureUrl: string;
    transformationUrl: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
  path: string;
};
