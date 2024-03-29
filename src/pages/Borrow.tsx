import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

export const Borrow: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Borrow items</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Borrow items</IonTitle>
                    </IonToolbar>
                </IonHeader>

            </IonContent>
        </IonPage>
    );
};
