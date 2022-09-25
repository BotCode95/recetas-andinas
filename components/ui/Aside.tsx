import { FC } from "react";
import styled from '../../styles/UI.module.css'

export const Aside: FC = () => {
  return (
    <>
      <aside>
        <div className={styled.container_aside}></div>
      </aside>
      <style jsx>{`
        div {
          background: url("/img-recetas-short.jpg");
          min-height: 90vh;
          background-size: cover;
          border-radius: 0 0 100px 0;
        }
      `}</style>
    </>
  );
};
