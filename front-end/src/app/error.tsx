"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Vish, alguma coisa deu errada... que tal recarregar?</p>
    </div>
  );
}
