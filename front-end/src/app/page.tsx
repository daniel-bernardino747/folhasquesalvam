"use client";
import { NavBar } from "@/components";

export default async function Home() {
  return (
    <main className="flex justify-center border-0 bg-[#305230]">
      <NavBar />
      <div className="container h-screen w-full border-0">
        <section className="flex h-[90%] min-h-[630px] items-center pb-12 xl:pt-24">
          <div className="h-96 w-screen xl:w-1/2 xl:min-w-[840px]">
            <p className="px-12 text-xl font-[700] text-white min-[425px]:text-5xl md:text-7xl xl:px-44">
              Transforme
            </p>
            <p className="px-12 text-xl font-[700] text-white min-[425px]:text-5xl md:text-7xl xl:px-44">
              à sua maneira, a sua rotina.
            </p>
            <p className="px-12 py-8 text-base font-[500] text-white min-[425px]:text-xl xl:px-44">
              Aprenda a adotar hábitos mais sustentáveis em sua rotina diária e
              contribua para um mundo melhor sendo uma das Folhas Que Salvam.
            </p>
            <div className="ml-12 flex w-[400px] flex-col justify-between gap-3 min-[425px]:flex-row xl:ml-44 xl:w-[460px]">
              <button className="h-14 w-48 rounded-lg border-2 border-white text-white">
                Explorar
              </button>
              <button className="h-14 w-48 rounded-lg bg-amber-300 font-[500] text-[#305230]">
                Faça parte
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
