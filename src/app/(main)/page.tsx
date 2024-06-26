import Collection from "@/components/Collection";
import { getAllImages } from "@/lib/actions/image.actions";
import { sidebar } from "@/lib/constant";
import Link from "next/link";

export default async function Home({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const images = await getAllImages({ page, searchQuery });

  return (
    <main className="min-h-screen w-full">
      <div className="max-w-screen-xl h-full mx-auto flex flex-col py-8 px-4">
        <div className="w-full border h-72 sm:flex hidden bg-cover bg-gradient bg-no-repeat shadow-inner p-10 bg-center flex-col gap-4 items-center justify-around relative rounded-[20px]">
          <h1 className="text-3xl font-bold max-w-lg text-center">
            Unleash your creativity with Imagineer
          </h1>
          <div className="flex gap-8">
            {sidebar.slice(0, 4).map((item) => (
              <NavigationProp
                key={item.title}
                title={item.title}
                link={item.href}
              >
                {item.icon && (
                  <item.icon className="w-6 h-6 group-hover:text-white text-gray-600" />
                )}
              </NavigationProp>
            ))}
          </div>
        </div>
        <div className="w-full sm:mt-12">
          <Collection hasSearch={true} totalPages={images?.totalPage} images={images?.data} />
        </div>
      </div>
    </main>
  );
}

interface NavigationPropProps {
  children: React.ReactNode;
  title: string;
  link: string;
}

function NavigationProp({ children, title, link }: NavigationPropProps) {
  return (
    <Link
      href={link}
      className="flex items-center justify-center flex-col gap-2 group"
    >
      <div className="flex text-gray-100 bg-white rounded-full w-12 h-12 p-2 flex-col group-hover:bg-primary items-center justify-center gap-2">
        {children}
      </div>
      <p className="text-sm font-semibold text-gray-200">{title}</p>
    </Link>
  );
}
