import {
  Container,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Toolbar,
} from "@material-ui/core";
import Link from "ui/components/navigation/Link/Link";
import {
  ButtonsContainer,
  HeaderAppBar,
  HeaderDrawer,
  HeaderLogo,
} from "./Header.styles";
import RoundedButton from "../../inputs/RoundedButton/RoundedButton";
import useIsMobile from "data/hooks/useIsMobile";
import { useState, useEffect } from "react";
import { UserInterface, UserType } from "data/@types/UserInterface";
import UserHeaderMenu from "ui/components/navigation/UserHeaderMenu/UserHeaderMenu";
import UserProfilerAvatar from "ui/components/data-display/UserProfilerAvatar/UserProfilerAvatar";


export interface HeaderProps{
    user: UserInterface;
    onLogout?: () => void;
}
const Header: React.FC<HeaderProps> = (props) => {
  const isMobile = useIsMobile();
  return isMobile ? <HeaderMobile {...props}/> : <HeaderDesktop {...props} />;
};

const HeaderDesktop: React.FC<HeaderProps> = (props) => {

    const [isMenuOpen, setMenuOpen] = useState(false), 
    hasUser = props.user.nome_completo.length > 0,
    userType = props.user.tipo_usuario;


    useEffect(() => {
        if(!hasUser){
            setMenuOpen(false)
        }
    }, [hasUser])
    
  return (
      <HeaderAppBar>
          <Toolbar component={Container}>
              <Link href={'/'}>
                  <HeaderLogo
                      src={'/img/logos/logo.svg'}
                      alt={'e-diaristas'}
                  ></HeaderLogo>
              </Link>

              <ButtonsContainer>
                  {hasUser && (
                      <>
                          {userType === UserType.Diarista ? (
                              <Link
                                  href={'/oportunidades'}
                                  Component={RoundedButton}
                              >
                                  Oportunidades
                              </Link>
                          ) : (
                              <Link
                                  href={'/encontrar-diarista'}
                                  Component={RoundedButton}
                              >
                                  Encontrar Diarista
                              </Link>
                          )}
                          <Link href={'/diarias'} Component={RoundedButton}>
                              Diarias
                          </Link>
                          {userType == UserType.Diarista && (
                              <Link
                                  href={'/pagamentos'}
                                  Component={RoundedButton}
                              >
                                  Pagamentos
                              </Link>
                          )}
                      </>
                  )}
              </ButtonsContainer>

              <div>&nbsp;</div>

              {hasUser ? (
                  <UserHeaderMenu
                      user={props.user}
                      isMenuOpen={isMenuOpen}
                      onClick={() => setMenuOpen(true)}
                      onMenuClick={() => setMenuOpen(false)}
                      onMenuClose={() => {}}
                      onLogout={props.onLogout}
                  />
              ) : (
                  <ButtonsContainer>
                      <Link
                          href={'/cadastro/diarista'}
                          Component={RoundedButton}
                          mui={{ color: 'primary', variant: 'contained' }}
                      >
                          Seja um(a) diarista
                      </Link>
                      <Link
                          href={'/login'}
                          Component={RoundedButton}
                          mui={{ color: 'primary' }}
                      >
                          Login
                      </Link>
                  </ButtonsContainer>
              )}
          </Toolbar>
      </HeaderAppBar>
  );
};

const HeaderMobile: React.FC<HeaderProps> = (props) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const hasUser = props.user.nome_completo.length > 0,
      userType = props.user.tipo_usuario;
  return (
      <HeaderAppBar>
          <Toolbar component={Container}>
              <IconButton
                  edge={'start'}
                  color={'inherit'}
                  onClick={() => setDrawerOpen(true)}
              >
                  <i className={'twf-bars'} />
              </IconButton>

              <Link href={'/'}>
                  <HeaderLogo
                      src={'/img/logos/logo.svg'}
                      alt={'e-diaristas'}
                  ></HeaderLogo>
              </Link>

              <HeaderDrawer
                  open={isDrawerOpen}
                  onClose={() => setDrawerOpen(false)}
                  onClick={() => setDrawerOpen(false)}
              >
                  {hasUser ? (
                      <>
                          <UserProfilerAvatar user={props.user} />
                          <MenuList>
                              {userType === UserType.Diarista ? (
                                  <Link
                                      href={'/oportunidades'}
                                      Component={MenuItem}
                                  >
                                      Oportunidades
                                  </Link>
                              ) : (
                                  <Link
                                      href={'/encontrar-diarista'}
                                      Component={MenuItem}
                                  >
                                      Encontrar Diarista
                                  </Link>
                              )}
                              <Link href={'/diarias'} Component={MenuItem}>
                                  Diarias
                              </Link>
                              {userType == UserType.Diarista && (
                                  <Link
                                      href={'/pagamentos'}
                                      Component={MenuItem}
                                  >
                                      Pagamentos
                                  </Link>
                              )}
                              <Divider />
                              <Link
                                  href={'/alterar-dados'}
                                  Component={MenuItem}
                              >
                                  Alterar Dados
                              </Link>
                              <Link
                                  href={''}
                                  Component={MenuItem}
                                  onClick={props.onLogout}
                              >
                                  Sair
                              </Link>
                          </MenuList>
                      </>
                  ) : (
                      <MenuList>
                          <Link href={'/login'} Component={MenuItem}>
                              Login
                          </Link>
                          <Divider />
                          <Link
                              href={'/cadastro/diarista'}
                              Component={MenuItem}
                          >
                              Seja um(a) diarista
                          </Link>
                      </MenuList>
                  )}
              </HeaderDrawer>
          </Toolbar>
      </HeaderAppBar>
  );
};

export default Header;