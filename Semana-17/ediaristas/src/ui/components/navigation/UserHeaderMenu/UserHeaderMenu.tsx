import { UserInterface } from "data/@types/UserInterface";
import React, { useRef } from "react";
import UserProfilerAvatar from "ui/components/data-display/UserProfilerAvatar/UserProfilerAvatar";
import Link from "../Link/Link";
import { UserHeaderMenuContainer, UserMenu } from "./UserHeaderMenu.styled";
//import { } from '@material-ui/core'
//import { Component } from './UserHeaderMenu.styled'

export interface UserHeaderMenuProps {
    user: UserInterface;
    isMenuOpen: boolean;
    onClick?: (event: React.MouseEvent) => void;
    onMenuClick?: (event: React.MouseEvent) => void;
    onMenuClose?: (event: React.MouseEvent) => void;
    onLogout?: () => void;
}

const UserHeaderMenu: React.FC<UserHeaderMenuProps> = (props) =>{
    const containerRef = useRef(null);
    return (
        <UserHeaderMenuContainer ref={containerRef}>
            <UserProfilerAvatar user={props.user} onClick={props.onClick} />

            <UserMenu
                open={props.isMenuOpen}
                anchorEl={containerRef.current}
                onClose={props.onMenuClose}
                onClick={props.onMenuClick}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <li>
                    <Link href={'/alterar-dados'} mui={{ color: 'inherit' }}>
                        Alterar Dados
                    </Link>
                </li>
                <li>
                    <Link
                        href={''}
                        mui={{ color: 'inherit' }}
                        onClick={props.onLogout}
                    >
                        Sair
                    </Link>
                </li>
            </UserMenu>
        </UserHeaderMenuContainer>
    );
}

export default UserHeaderMenu;

