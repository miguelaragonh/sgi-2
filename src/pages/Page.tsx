import React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import "./Page.css";
import { useAuth } from "../components/UserContext";

interface PageProps {
  childComponent: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ childComponent }) => {
  const { datos, isAuthenticated } = useAuth();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {isAuthenticated && (
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          )}
          <IonTitle style={{ color: "#000000" }} slot="end">SGI</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>{childComponent}</IonContent>
    </IonPage>
  );
};

export default Page;
