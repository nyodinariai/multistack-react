import {
  Applist,
  FooterContainer,
  FooterGrid,
  FooterListItem,
  FooterSocialList,
  FooterTitle,
  SocialButton,
  SocialContainer,
} from "./Footer.styles";
import { List, Box, Typography } from "@material-ui/core";
import Link from "ui/components/navigation/Link/Link";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <div>
          <FooterTitle>Menu</FooterTitle>
          <List>
            <FooterListItem>
              <Link
                href="/encontrar-diarista"
                mui={{ color: "inherit", variant: "body2" }}
              >
                Encontrar uma Diaristas
              </Link>
            </FooterListItem>
            <FooterListItem>
              <Link
                href="/cadastro/diarista"
                mui={{ color: "inherit", variant: "body2" }}
              >
                Seja um(a) diarista
              </Link>
            </FooterListItem>
            <FooterListItem>
              <Link href="/" mui={{ color: "inherit", variant: "body2" }}>
                Por que usar o E-diaristas?
              </Link>
            </FooterListItem>
            <FooterListItem>
              <Link href="/" mui={{ color: "inherit", variant: "body2" }}>
                Principais Duvidas
              </Link>
            </FooterListItem>
          </List>
        </div>

        <Box sx={{ maxWidth: "400px" }}>
          <FooterTitle>Quem Somos</FooterTitle>
          <Typography variant={"body2"} sx={{ mt: 2 }}>
            E-diaristas te ajuda a encontrar um profissional perfeito para realizar a limpeza
            da sua casa. Garantimos o(a) melhor profissional com total segurança e praticidade!
            São milhares de clientes satisfeitos por todo o país.
          </Typography>
        </Box>

        <SocialContainer>
          <Box>
            <FooterTitle>Baixe nossos aplicativos</FooterTitle>
            <Applist>
              <li>
                <a href="" target={"_blank"} rel={"noopener noreferrer"}>
                  <img src={"/img/logos/app-store.png"} alt={"App Store"} />
                </a>
              </li>
              <li>
                <a href="" target={"_blank"} rel={"noopener noreferrer"}>
                  <img src={"/img/logos/google-play.png"} alt={"Google Play"} />
                </a>
              </li>
            </Applist>
          </Box>

          <div>
            <FooterTitle>Redes Sociais</FooterTitle>
            <FooterSocialList>
              <FooterListItem>
                <SocialButton href={"/"}>
                  <i className={"twf-facebook-f"} />
                </SocialButton>
                <SocialButton href={"/"}>
                  <i className={"twf-instagram"} />
                </SocialButton>
                <SocialButton href={"/"}>
                  <i className={"twf-youtube"} />
                </SocialButton>
              </FooterListItem>
            </FooterSocialList>
          </div>
        </SocialContainer>
      </FooterGrid>
    </FooterContainer>
  );
};

export default Footer;
