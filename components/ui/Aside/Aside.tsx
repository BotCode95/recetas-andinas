import { FC } from "react";
import styled from '../../../styles/UI.module.css'

export const Aside: FC = () => {
  return (
    <>
      <aside className={styled.container_aside}>
        <div></div>
      </aside>
      <style jsx>{`
        div {
          background: url("/img-recetas-short.jpg");
          min-height: 90vh;
          height: '90%';
          width: '100%';
          background-size: cover;
          border-radius: 0 0 100px 0;
        }
      `}</style>
    </>
  );
};
