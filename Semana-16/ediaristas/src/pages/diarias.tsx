import React from "react";
import { GetStaticProps } from "next";
import { DiariaProvider } from "data/contexts/DiariasContext";
import MinhasDiarias from "@partials/diarias/_minhas-diarias";

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Diarias',
        }
    }
}

const Diarias: React.FC = () => {
    return (
        <DiariaProvider>
            <MinhasDiarias></MinhasDiarias>
        </DiariaProvider>
    )
}

export default Diarias;