"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/comp-ui/ui/button";
import { Form } from "@/comp-ui/ui/form";
import { Input } from "@/comp-ui/ui/input";
import CustomField from "./CustomField";
import { useEffect, useState, useTransition } from "react";
import {
  aspectRatioOptions,
  creditFee,
  transformationTypes,
} from "@/lib/constant";
import FillField from "./specific-form/Fill";
import Remove from "./specific-form/Remove";
import Recolor from "./specific-form/Recolor";
import { debounce, deepMergeObjects } from "@/lib/utils";
import { updateCredits } from "@/lib/actions/user.action";
import ImageUpload from "./specific-form/ImageUpload";
import { getCldImageUrl } from "next-cloudinary";
import { addImage, updateImage } from "@/lib/actions/image.actions";
import { useRouter } from "next/navigation";
import InsufficientCreditsModal from "./InsufficientCreditsModal";

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

export default function TransformationForm({
  action,
  data = null,
  userId,
  type,
  creditBalance,
  config = null,
}: any) {
  const transformationType =
    transformationTypes[type as keyof typeof transformationTypes];
  const initVal =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : {
          title: "",
          aspectRatio: "",
          color: "",
          prompt: "",
          publicId: "",
        };

  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState<any>(config);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initVal,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (data || image) {
      const transformationUrl = getCldImageUrl({
        src: image?.publicId,
        width: image?.width,
        height: image?.height,
        ...transformationConfig,
      });

      const imageData = {
        title: values.title,
        publicId: image?.publicId,
        transformationType: transformationType.type,
        width: image?.width,
        height: image?.height,
        config: transformationConfig,
        secureUrl: image?.secureUrl,
        transformationUrl: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      };

      if (action === "add") {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: "/",
          });

          if (newImage) {
            form.reset();
            setImage(data);
            router.push(`/transformation/${newImage.id}`);
          }
        } catch (e) {
          console.log(e);
        }
      }

      if (action === "update") {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              id: data.id,
            },
            userId,
            path: `/transformation/${data.id}`,
          });

          if (updatedImage) {
            router.push(`/transformation/${updatedImage.id}`);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    setIsSubmitting(false);
  }

  function onSelectFieldHandler(
    value: string,
    onChangeField: (value: string) => void,
  ) {
    const imageSize =
      aspectRatioOptions[value as keyof typeof aspectRatioOptions];

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransformation(transformationType.config);

    return onChangeField(value);
  }

  function onTransformHandler() {
    setIsTransforming(true);

    setTransformationConfig(
      deepMergeObjects(transformationConfig, newTransformation),
    );

    setNewTransformation(null);

    startTransition(async () => {
      await updateCredits(userId, creditFee);
    });
  }

  function onInputChangeHandler(
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void,
  ) {
    // I never before saw someone using square brackets for an object in this way

    debounce(() => {
      setNewTransformation((prevState: any) => ({
        prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
    }, 1000);
  }

  useEffect(() => {
    if (
      image &&
      (transformationType.type === "restore" ||
        transformationType.type === "removeBackground")
    )
      setNewTransformation(transformationType.config);
  }, [image, transformationType.config, transformationType.type]);

  return (
    <Form {...form}>
      {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input {...field} />}
        />
        {transformationType.type === "fill" && (
          <FillField form={form} onSelectFieldHandler={onSelectFieldHandler} />
        )}
        {(transformationType.type === "remove" || type === "recolor") && (
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
            <Remove
              form={form}
              type={transformationType.type}
              onInputChangeHandler={onInputChangeHandler}
            />
            {transformationType.type === "recolor" && (
              <Recolor
                form={form}
                onInputChangeHandler={onInputChangeHandler}
              />
            )}
          </div>
        )}

        <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-4 md:grid-cols-2">
          <ImageUpload
            isTransforming={isTransforming}
            form={form}
            setImage={setImage}
            image={image}
            type={type}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformationConfig}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
            type="button"
            className="bg-gradient capitalize text-white font-bold bg-cover rounded-full py-4 px-6 text-sm h-[50px] w-full md:h-[54px]"
          >
            {isTransforming ? "Transforming..." : "Apply transformation"}
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-gradient capitalize text-white font-bold bg-cover rounded-full py-4 px-6 text-sm h-[50px] w-full md:h-[54px]"
          >
            {isSubmitting ? "Submitting..." : "Save Image"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
