import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface Props {
  children: React.ReactNode;
  title?: string;
}
export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Recetas Andinas"}</title>
        <meta
          name="description"
          content={`Información sobre ${title || "Recetas Andinas"} `}
        />
        <meta name="keywords" content="recetas,andinas,norte, comida" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
