"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  //Permite que você acesse os parâmetros da URL atual como um objeto { param: value, .... }.
  const searchParams = useSearchParams();
  //Permite que você leia o nome do caminho da URL atual.
  const pathname = usePathname();
  //Habilita a navegação entre rotas dentro de componentes do cliente programaticamente.
  const { replace } = useRouter();

  //Esta função encapsulará o conteúdo de handleSearch e executará o código somente após um tempo específico, quando o usuário parar de digitar (300 ms).
  const handleSearch = useDebouncedCallback((term: string) => {
    //URLSearchParams é uma API da Web que fornece métodos utilitários para manipular os parâmetros de consulta de URL. Em vez de criar uma string literal complexa, você pode usá-la para obter a string params como ?page=1&query=a.
    const params = new URLSearchParams(searchParams);
    //quando o usuário digitar uma nova consulta de pesquisa, você desejará redefinir o número da página para 1.
    params.set("page", "1");
    //Em seguida, set a string params com base na entrada do usuário. Se a entrada estiver vazia, você quer delete:
    if (term.trim()) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    //atualiza a URL com os dados de pesquisa do usuário.
    //A URL é atualizada sem recarregar a página, graças à navegação do lado do cliente do Next.j
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
