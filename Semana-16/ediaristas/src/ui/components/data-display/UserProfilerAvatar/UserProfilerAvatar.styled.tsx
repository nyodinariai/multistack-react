import { styled } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { UserProfilerAvatarProps } from './UserProfilerAvatar';


export const UserAvatar = styled(Avatar)`
    border: 2px solid currentColor
`

export const AvatarIcon = styled('i')<UserProfilerAvatarProps>`
    font-size: 8px;
    vertical-align: middle;
    display: ${({user}) => (user?.nome_completo ? 'initital' : 'nome')};
`
    