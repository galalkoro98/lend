import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import { UserList } from "../components/UserList";

export const Lend: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class='ion-text-center'>Lend out items</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <UserList items={[]} />
            </IonContent>
        </IonPage>
    );
};
