"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/comp-ui/ui/alert-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function InsufficientCreditsModal() {
  const router = useRouter();

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="items-center justify-between flex">
            <p className="p-16 font-semibold">Insufficient credits</p>
            <AlertDialogCancel className="border-0 p-0 hover:bg-transparent">
              <X className="w-6 h-6" />
            </AlertDialogCancel>
          </div>
          <div className="w-full flex justify-center items-center">
            <Image
              src="/coins.svg"
              alt="credit coins"
              width={300}
              height={122}
            />
          </div>
          <AlertDialogTitle>
            Oops... It looks like you don&apos;t have enough credits
          </AlertDialogTitle>

          <AlertDialogDescription>
            You can purchase more credits from our store to continue
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => router.push("/profile")}>
            No, cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => router.push("/credits")}>
            Yes, proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
