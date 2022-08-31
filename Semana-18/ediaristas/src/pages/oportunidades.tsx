import React from 'react'; 
import { GetStaticProps } from 'next'; 
import useOportunidadesTrabalho from 'data/hooks/pages/useOportunidades.page';
import { Box, Container, Divider, Typography } from '@material-ui/core';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import DataList from 'ui/components/data-display/DataList/DataList';
import Table, { TableCell, TablePagination, TableRow } from 'ui/components/data-display/Table/Table';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import JobInformation from 'ui/components/data-display/JobInformation/JobInformation';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
// import {Component } from 'styles/pages/oportunidades.styled'; 




export const getStaticProps: GetStaticProps = async () => { 
  return {
    props: { title: 'Oportunidades', },
  }; 
 }; 

const Oportunidades: React.FC = () => { 
   const {
       isMobile,
       oportunidades,
       currentPage,
       setCurrentPage,
       totalPages,
       itemsPerPage,
       oportunidadeSelecionada,
       setOportunidadeSelecionada,
       seCandidatar,
   } = useOportunidadesTrabalho();
  return (
      <>
          <Container sx={{ mb: 5, p: 0 }}>
              <PageTitle title={'Oportunidades de trabalho'} />

              {oportunidades.length === 0 ? (
                  isMobile ? (
                      <>
                          <DataList
                              header={
                                  <>
                                      Data: 01/01/2000
                                      <br />
                                      Limpeza Pesada
                                      <br />
                                      R$140,00
                                  </>
                              }
                              body={
                                  <>
                                      Cidade: São Paulo
                                      <br />
                                      Numero de Cômodos: 2
                                  </>
                              }
                          />
                      </>
                  ) : (
                      <>
                          <Table
                              header={[
                                  'Data',
                                  'Tipo de Serviço',
                                  'Número de Cômodos',
                                  'Cidade',
                                  'Valor',
                                  '',
                              ]}
                              data={[]}
                              rowElement={() => (
                                  <TableRow>
                                      <TableCell>
                                          <strong>01/09/2022</strong>
                                      </TableCell>
                                      <TableCell>Limpeza Pesada</TableCell>
                                      <TableCell>3 cômodos</TableCell>
                                      <TableCell>São Paulo - SP</TableCell>
                                      <TableCell>R$140.00,</TableCell>
                                      <TableCell></TableCell>
                                  </TableRow>
                              )}
                          />
                          <TablePagination
                              count={totalPages}
                              page={currentPage}
                              onChange={(_event, nextPage) =>
                                  setCurrentPage(nextPage)
                              }
                          />
                      </>
                  )
              ) : (
                  <Typography align={'center'}>
                      Nenhuma oportunidade ainda
                  </Typography>
              )}
          </Container>

          {(oportunidadeSelecionada) && (
              <Dialog
                  isOpen={oportunidadeSelecionada !== undefined || true}
                  onClose={() => setOportunidadeSelecionada(undefined)}
                  onConfirm={() => seCandidatar(oportunidadeSelecionada)}
                  title={'Se candidatar à diaria'}
                  subtitle={
                      'Tem certeza que a deseja se candidatar à diaria abaixo?'
                  }
              >
                  <Box>
                      <JobInformation>
                          <>
                              <div>
                                  Data: <strong>01/01/2022</strong>
                              </div>
                              <div>Praça da sé, São Paulo - SP</div>
                              <div>
                                  <strong>Valor: R$140,00</strong>
                              </div>
                          </>
                      </JobInformation>
                      <UserInformation
                          name={'Akira'}
                          rating={3}
                          picture={'https://github.com/hanashiro.png'}
                      />
                  </Box>

                  <Divider />

                  {(oportunidadeSelecionada?.avaliacoes_cliente.length ||
                      true) > 0 && (
                      <>
                          <Typography sx={{p: 3, fontWeight: 'medium', bgcolor: 'grey.50'}}>Últimas avaliações do cliente</Typography>
                          <UserInformation
                              name={'Akira'}
                              rating={3}
                              picture={'https://github.com/hanashiro.png'}
                              isRating={true}
                              description={'Alguma coisa'}
                          />
                      </>
                  )}

                  <Typography variant={'subtitle2'} color={'textSecondary'} sx={{py: 2}}>
                    Ao se candidatar você ainda não é o(a) diarista escolhido(a) para 
                    realizar o trabalho. Vamos analisar suas qualificações e a distância 
                    para o local da diária. Caso você não seja a pessoa selecionada, 
                    receberá um e-mail avisando. Atente-se à a sua caixa de entrada
                  </Typography>
              </Dialog>
          )}
      </>
  ); 
}; 
export default Oportunidades;