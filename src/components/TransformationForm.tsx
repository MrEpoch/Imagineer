"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/comp-ui/ui/button";
import { Form } from "@/comp-ui/ui/form";
import { Input } from "@/comp-ui/ui/input";
import CustomField from "./CustomField";
import { useState, useTransition } from "react";
import { aspectRatioOptions, transformationTypes } from "@/lib/constant";
import FillField from "./specific-form/Fill";
import Remove from "./specific-form/Remove";
import Recolor from "./specific-form/Recolor";
import { debounce, deepMergeObjects } from "@/lib/utils";
import { updateCredits } from "@/lib/actions/user.action";
import ImageUpload from "./specific-form/ImageUpload";

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initVal,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);
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
      // await updateCredits(userId, );
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

  return (
    <Form {...form}>
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
            form={form}
            setImage={setImage}
            image={image}
            type={type}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
            type="button"
            className="bg-gradient capitalize text-white font-bold bg-cover rounded-full py-4 px-6 p-16-semibold h-[50px] w-full md:h-[54px]"
          >
            {isTransforming ? "Transforming..." : "Apply transformation"}
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-gradient capitalize text-white font-bold bg-cover rounded-full py-4 px-6 p-16-semibold h-[50px] w-full md:h-[54px]"
          >
            {isSubmitting ? "Submitting..." : "Save Image"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
