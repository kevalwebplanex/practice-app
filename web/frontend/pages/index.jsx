import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
  CalloutCard,
} from "@shopify/polaris";

import { useTranslation, Trans } from "react-i18next";
import "bootstrap/dist/css/bootstrap.css";

import Users from "../components/Users";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <Layout>
        
        <Layout.Section>
          <Users/>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
