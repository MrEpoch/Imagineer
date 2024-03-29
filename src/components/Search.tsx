'use client';

import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search as SearchSVG } from "lucide-react";
import { Input } from "@/comp-ui/ui/input";


export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value: query
        });

        router.push(newUrl, { scroll: false });
    } else {
      const newUrl = formUrlQuery({
        searchParams: searchParams.toString(),
        keysToRemove: ["query"]
      });

      router.push(newUrl, { scroll: false });
    }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query]);

  return (
    <div className="flex w-full rounded-2xl border-2 border-primary/20 dark:border-primary bg-white dark:bg-card px-4 shadow-sm shadow-primary/10 dark:shadow-primary/60 md:max-w-96">
      <SearchSVG className="w-6 h-6" />
      <Input
    className="border-0 bg-transparent text-gray-600 w-full placeholder:text-gray-400 h-12 text-sm font-medium focus-visible:ring-offset-0 p-3 focus-visible:ring-transparent"
    placeholder="Search"
    onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
