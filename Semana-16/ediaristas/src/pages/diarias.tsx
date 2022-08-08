import React from "react";
import { GetStaticProps } from "next";
import { DiariaProvider } from "data/contexts/DiariasContext";
import MinhasDiarias from "@partials/diarias/_minhas-diarias";
import { useRouter } from "next/router";
import DetalhesDiaria from "@partials/diarias/_detalhes-diaria";

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Diarias',
        }
    }
}

const Diarias: React.FC = () => {

    const router = useRouter();

    if (router.query.id){
        return (
            <DiariaProvider>
                <DetalhesDiaria id={router.query.id as string}/>
            </DiariaProvider>
        );
    }
        return (
            <DiariaProvider>
                <MinhasDiarias />
            </DiariaProvider>
        );
}



export default Diarias;