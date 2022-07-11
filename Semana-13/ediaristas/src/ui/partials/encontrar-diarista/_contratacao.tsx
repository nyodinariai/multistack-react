import { Button, Paper, stepButtonClasses } from '@material-ui/core';
import useContratacao from 'data/hooks/pages/useContratacao.page';
import useIsMobile from 'data/hooks/useIsMobile';
import React from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import SideInformation from 'ui/components/data-display/SideInformation/SideInformation';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import { UserFormContainer } from 'ui/components/inputs/UserForm/UserForm';
import { PageFormContainer } from 'ui/components/inputs/UserForm/UserForm.styled';
import Breadcrumb from 'ui/components/navigation/Breadcrumb/Breadcrumb';
import { FormProvider } from 'react-hook-form';
import DetalhesServico from './_detalhes-servico';
import CadastroCliente from './_cadastro-cliente';
// import { Component } from './_contratacao.styled';


const Contratacao: React.FC = () => { 
    const isMobile = useIsMobile(),
    { step, setStep,breadcrumbItems, serviceForm, clientForm, onServiceFormSubmit, servicos, hasLogin, setHasLogin, onClientFormSubmit } = useContratacao();

    return (
        <div>
            {!isMobile && <SafeEnvironment />}
            <Breadcrumb
                selected={breadcrumbItems[step - 1]}
                items={breadcrumbItems}
            />
            {step === 1 && (
                <PageTitle title={'Nos conte um pouco sobre o serviço!'} />
            )}

            {step === 2 && (
                <PageTitle
                    title={'Precisamos conhecer um pouco sobre você'}
                    subtitle={
                        !hasLogin ? (
                            <span>
                                Caso já tenha cadastro,{' '}
                                <Button onClick={() => setHasLogin(true)}>
                                    clique aqui
                                </Button>
                            </span>
                        ) : (
                            <span>
                                Caso não tenha cadastro,{' '}
                                <Button onClick={() => setHasLogin(false)}>
                                    clique aqui
                                </Button>
                            </span>
                        )
                    }
                />
            )}

            <UserFormContainer>
                <PageFormContainer fullWidth={step === 4}>
                    <Paper sx={{ p: 4 }}>
                        <FormProvider {...serviceForm}>
                            <form
                                onSubmit={serviceForm.handleSubmit(
                                    onServiceFormSubmit
                                )}
                                hidden={step !== 1}
                            >
                                <DetalhesServico servicos={servicos} />
                            </form>
                        </FormProvider>

                        <FormProvider {...clientForm}>
                            <form
                                onSubmit={clientForm.handleSubmit(
                                    onClientFormSubmit
                                )}
                                hidden={step !== 2 || hasLogin}
                            >
                                <CadastroCliente onBack={()=> setStep(1)}/>
                            </form>
                        </FormProvider>
                    </Paper>
                    <SideInformation
                        title={'Detalhes'}
                        items={[
                            {
                                title: 'Tipo',
                                description: [''],
                                icon: 'twf-check-circle',
                            },
                            {
                                title: 'Tamanho',
                                description: [''],
                                icon: 'twf-check-circle',
                            },
                            {
                                title: 'Data',
                                description: [''],
                                icon: 'twf-check-circle',
                            },
                        ]}
                        footer={{
                            text: 'R$80,00',
                            icon: 'twf-credit-card',
                        }}
                    />
                </PageFormContainer>
            </UserFormContainer>
        </div>
    );

};
export default Contratacao;