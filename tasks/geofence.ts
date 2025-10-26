// tasks/geofence.ts
import { LocationGeofencingEventType } from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

export const GEOFENCING_TASK = 'GEOFENCING_TASK';

interface GeofencingData {
  eventType: LocationGeofencingEventType;
  region: {
    identifier: string;
  };
}

TaskManager.defineTask(
  GEOFENCING_TASK,
  async ({ data, error }: { data?: GeofencingData; error: TaskManager.TaskManagerError | null }) => {
    if (error) {
      console.error('Geofencing task error:', error);
      return;
    }

    if (!data) return;

    const { eventType, region } = data;

    let message: string | null = null;
    if (eventType === LocationGeofencingEventType.Enter) {
      message = `Entered geofence: ${region.identifier}`;
    } else if (eventType === LocationGeofencingEventType.Exit) {
      message = `Exited geofence: ${region.identifier}`;
    }

    if (message) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Geofence Alert',
            body: message,
            sound: true,
          },
          trigger: null, // triggers immediately
        });
      } catch (notifError) {
        console.error('Failed to send notification:', notifError);
      }
    }
  }
);
