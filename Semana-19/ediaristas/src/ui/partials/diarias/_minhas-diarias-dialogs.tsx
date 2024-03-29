import { Typography } from "@mui/material";
import { DiariaInterface } from "data/@types/DiariaInterface";
import { DateService } from "data/services/DateService";
import { TextFormatService } from "data/services/TextFormatService";
import JobInformation from "ui/components/data-display/JobInformation/JobInformation";
import UserInformation from "ui/components/data-display/UserInformation/UserInformation";
import Dialog from "ui/components/feedback/Dialog/Dialog";

interface DialogProps{
    diaria: DiariaInterface;
    onConfirm: (diaria: DiariaInterface) => void;
    onCancel: () => void
}

const JobBox: React.FC<{diaria: DiariaInterface}> = ({diaria}) => {
    return (
        <JobInformation>
            <>
                <div>
                    Data: <strong>{TextFormatService.reverseDate(diaria.data_atendimento as string)}{' '} às {' '} {DateService.getTimeFromDate(diaria.data_atendimento as string)}</strong>
                </div>
                <div>
                    Endereço: { TextFormatService.getAddress(diaria)}
                </div>
                <div>
                    <strong>Varlor: {TextFormatService.currency(diaria.preco)}</strong>
                </div>
            </>
        </JobInformation>
    )
}

export const ConfirmDialog: React.FC<DialogProps> = (props) => {
    const diarista = props.diaria.diarista; 
    return (
        <Dialog
            isOpen={true}
            onClose={props.onCancel}
            onConfirm={() => props.onConfirm(props.diaria)}
            title={'Confirmar a presença da diarista'}
            subtitle={'Você confirma a presença da diarista na diária abaixo'}
        >
            <JobBox diaria={props.diaria} />
            <UserInformation
                name={diarista?.nome_completo || ''}
                rating={diarista?.reputacao || 1}
                description={
                    'Telefone: ' +
                    TextFormatService.formatPhoneNumber(
                        diarista?.telefone || ''
                    )
                }
                picture={diarista?.foto_usuario || ''}
            />

            <Typography
                sx={{ py: 2 }}
                variant={'subtitle2'}
                color={'textsencondary'}
            >
                Ao confirmar a presença do(a) diarista, você está definindo que
                o serviço foi realizado em sua residencia e autoriza a
                plataforma a fazer o repasse do valor para o profissional. Caso
                você tenha algum problema, pode entrar em contato com a nossa
                equipe pelo e-mail sac@e-diaristas.com.br
            </Typography>
        </Dialog>
    );
}