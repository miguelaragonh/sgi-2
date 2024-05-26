import React from "react";
import { IonItem, IonLabel, IonList, IonPage } from "@ionic/react";

function Example() {
  return (
    <IonPage>
      <IonList>
        <IonItem>
          <IonLabel>Pokémon Yellow</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Mega Man X</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>The Legend of Zelda</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Pac-Man</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Super Mario World</IonLabel>
        </IonItem>
      </IonList>
    </IonPage>
  );
}
export default Example;
