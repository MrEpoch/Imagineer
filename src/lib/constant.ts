import { CreditCard, Home, Image, ImageOff, PaintBucket, Palette, ScanFace, User } from "lucide-react";

export const sidebar = [
  {
    title: 'Home',
    href: '/',
    icon: Home
  },
  {
    title: 'Image Restore',
    href: '/transformation/image-restore',
    icon: Image
  },
  {
    title: 'Generative Fill',
    href: '/transformation/generative-fill',
    icon: PaintBucket
  },
  {
    title: 'Object Remove',
    href: '/transformation/object-remove',
    icon: ScanFace
  },
  {
    title: 'Object Recolor',
    href: '/transformation/object-recolor',
    icon: Palette
  },
  {
    title: 'Background Remove',
    href: '/transformation/background-remove',
    icon: ImageOff
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: User
  },
  {
    title: 'Buy Credits',
    href: '/buy-credits',
    icon: CreditCard
  }
]

export const transformationTypes = {
  'image-restore': {
    title: 'Image Restore',
    description: 'Restore the image to its original state',
    type: "restore"
  },
  'generative-fill': {
    title: 'Generative Fill',
    description: 'Fill blanks in the image',    
    type: "fill"
  },
  'object-remove': {
    title: 'Object Remove',
    description: 'Remove the object from the image',
    type: "remove"
  },
  'object-recolor': {
    title: 'Object Recolor',
    description: 'Recolor the object in the image',    
    type: "recolor"
  },
  'background-remove': {
    title: 'Background Remove',
    description: 'Remove the background from the image',
    type: "removeBackground"
  }
}
