import {
  IonHeader,
  IonItem,
  IonLabel,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import { auth } from "../../db";
import { signOut } from "firebase/auth";

const Menu: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Items Listining</IonTitle>
          </IonToolbar>
          <IonItem disabled href="#">
            <IonLabel>Borrowing process</IonLabel>
          </IonItem>

          <IonItem disabled href="#">
            <IonLabel>Lending history</IonLabel>
          </IonItem>

          <IonItem disabled href="#">
            <IonLabel>Communication</IonLabel>
          </IonItem>

          <IonItem disabled href="#">
            <IonLabel>User ratings</IonLabel>
          </IonItem>
          <IonItem href="/app">
            <IonLabel
              style={{
                color: "red",
              }}
              onClick={handleLogout}
            >Logout</IonLabel>
          </IonItem>
        </IonHeader>
      </IonMenu>
    </>
  );
};
export default Menu;
