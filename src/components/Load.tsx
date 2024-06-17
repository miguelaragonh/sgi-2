import { useIonLoading } from '@ionic/react';
import React from 'react'

export default function Load() {
    const [present, dismiss] = useIonLoading();
  return (
    present({
        message: 'Cargando...',
        duration: 1500,
      })
  )
}
