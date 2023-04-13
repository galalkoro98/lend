import React, { useState, useEffect } from 'react';
import { IonList, IonItem, IonItemDivider, IonLabel, IonIcon, IonModal, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { chevronForwardOutline, chevronBack } from 'ionicons/icons';
import './UserList.css';
import { get, child } from 'firebase/database';
import { dbRef } from '../db';

interface Item {
  id?: string;
  name: string;
  description: string;
  borrowerName: string;
  lendingDate: string;
  
}

interface UserListProps {
  items: Item[];
}

export const UserList: React.FC<UserListProps> = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [itemList, setItemList] = useState<Item[]>([]);

  useEffect(() => {
    const dbItemsRef = child(dbRef, 'items');
    get(dbItemsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const newItems: Item[] = [];
        snapshot.forEach((itemSnapshot) => {
          const itemId = itemSnapshot.key as string;
          const itemName = itemSnapshot.child('name').val();
          const itemDescription = itemSnapshot.child('description').val();
          const borrower = itemSnapshot.child('borrowerName').val();
          const lendDate = itemSnapshot.child('lendingDate').val();
          newItems.push({
            name: itemName,
            id: itemId,
            description: itemDescription,
            borrowerName: borrower,
            lendingDate: lendDate,
          });
        });
        setItemList(newItems);
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  // Create an object to group the items by their first letter
  const groupedItems: Record<string, Item[]> = {};
  itemList.forEach(item => {
    const firstLetter = item.name[0].toUpperCase();
    if (!groupedItems[firstLetter]) {
      groupedItems[firstLetter] = [];
    }
    groupedItems[firstLetter].push(item);
  });

  // Convert the object to an array of groups
  const groups = Object.entries(groupedItems).sort(([a], [b]) => a.localeCompare(b));
  // create Modal 
  const [showModal, setShowModal] = useState(false);

  const handleClick = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <IonList
      lines="full"
      className="ion-no-margin ion-no-padding"
      style={{ marginTop: '30px' }}>
      {groups.map(([letter, items]) => (
        <React.Fragment key={letter}>
          <IonItemDivider class="my-divider" sticky>
            {letter}
          </IonItemDivider>

          {items.map(item => (
            <IonItem key={item.name} onClick={() => handleClick(item)}>
              <IonLabel key={item.id}>
                {item.name}
              </IonLabel>
              <IonIcon icon={chevronForwardOutline} />
            </IonItem>

          ))}
          <IonModal isOpen={showModal} onDidDismiss={handleClose}>
            <IonButtons>
              <IonButton color="primary" onClick={handleClose}  >
                <IonIcon slot="start" icon={chevronBack} />
                Back
              </IonButton>
            </IonButtons>
            {
              selectedItem && (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{selectedItem.name}</IonCardTitle>
                    <IonCardSubtitle>Description:</IonCardSubtitle>
                    {selectedItem.description}
                  </IonCardHeader>
                  <IonCardContent>
                    To:{selectedItem.borrowerName}
                    <br />
                    When:{selectedItem.lendingDate}
                  </IonCardContent>
                </IonCard>
              )
            }
          </IonModal>
        </React.Fragment>
      ))}
    </IonList>
  );
};

